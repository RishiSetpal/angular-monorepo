import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subject, takeUntil, debounceTime } from 'rxjs';
import { 
  FormConfig, 
  FieldConfig, 
  FormSection, 
  FormValue,
  FormState 
} from '../models/form-config.model';
import { DynamicFormService } from '../services/dynamic-form.service';
import { DynamicFieldComponent } from './dynamic-field.component';
import { SelectOption } from '@org/shared';

@Component({
  selector: 'lib-dynamic-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    DynamicFieldComponent,
  ],
  template: `
    <form [formGroup]="form" [class]="config.theme ? 'themed-form' : ''" 
          [ngStyle]="getThemeStyles()" (ngSubmit)="onSubmit()">
      @if (loading()) {
        <mat-spinner></mat-spinner>
      } @else {
        @if (config.sections) {
          @for (section of config.sections; track section.title; let i = $index) {
            @if (section.title) {
              <h3>{{ section.title }}</h3>
            }
            <div class="section" [class]="section.className" 
                 [style.display]="'grid'"
                 [style.gridTemplateColumns]="'repeat(' + (section.columns || 1) + ', 1fr)'"
                 [style.gap]="'16px'">
              @for (field of section.fields; track field.key) {
                @if (isFieldVisible(field)) {
                  <div [class]="field.className || 'field-wrapper'" [style.gridColumn]="'span 1'">
                    <lib-dynamic-field [field]="field" [form]="form" 
                                       [asyncOptions]="asyncOptionsMap()[field.key]"
                                       (optionsLoaded)="onOptionsLoaded(field.key, $event)">
                    </lib-dynamic-field>
                  </div>
                }
              }
            </div>
          }
        } @else if (config.fields) {
          <div class="fields-container" [class]="config.layout === 'horizontal' ? 'horizontal' : ''">
            @for (field of config.fields; track field.key) {
              @if (isFieldVisible(field)) {
                <div [class]="field.className || 'field-wrapper'">
                  <lib-dynamic-field [field]="field" [form]="form"
                                     [asyncOptions]="asyncOptionsMap()[field.key]"
                                     (optionsLoaded)="onOptionsLoaded(field.key, $event)">
                  </lib-dynamic-field>
                </div>
              }
            }
          </div>
        }
        
        <div class="form-actions">
          @if (config.showReset) {
            <button mat-button type="button" (click)="onReset()">
              {{ config.resetLabel || 'Reset' }}
            </button>
          }
          <button mat-raised-button color="primary" type="submit" [disabled]="!form.valid">
            {{ config.submitLabel || 'Submit' }}
          </button>
        </div>
      }
    </form>
  `,
  styles: [`
    form { padding: 16px; }
    .themed-form { background-color: white; border-radius: 8px; }
    .fields-container { display: flex; flex-direction: column; gap: 16px; }
    .fields-container.horizontal { flex-direction: row; flex-wrap: wrap; }
    .fields-container.horizontal .field-wrapper { flex: 1 1 45%; }
    .section { padding: 16px 0; }
    h3 { margin: 16px 0; font-weight: 500; }
    .form-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 24px; }
    mat-spinner { margin: 40px auto; }
  `],
})
export class DynamicFormComponent implements OnInit, OnDestroy {
  @Input() config!: FormConfig;
  @Input() initialValues?: FormValue;
  @Input() disabled = false;
  
  @Output() formSubmit = new EventEmitter<FormValue>();
  @Output() formChange = new EventEmitter<FormState>();
  @Output() formReset = new EventEmitter<void>();

  form!: FormGroup;
  loading = signal(false);
  asyncOptionsMap = signal<Record<string, SelectOption[]>>({});

  private formService = inject(DynamicFormService);
  private destroy$ = new Subject<void>();
  private formState$ = new Subject<FormState>();

  ngOnInit(): void {
    this.form = this.formService.createFormGroup(this.config);
    
    if (this.initialValues) {
      this.form.patchValue(this.initialValues, { emitEvent: false });
    }

    if (this.disabled) {
      this.form.disable();
    }

    this.setupValueChanges();
    this.loadAsyncOptions();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupValueChanges(): void {
    this.form.valueChanges
      .pipe(debounceTime(100), takeUntil(this.destroy$))
      .subscribe((values) => {
        const state: FormState = {
          values,
          errors: this.getAllErrors(),
          touched: this.getTouchedFields(),
          dirty: this.form.dirty,
          valid: this.form.valid,
        };
        this.formChange.emit(state);
        this.formState$.next(state);
      });
  }

  private loadAsyncOptions(): void {
    const fields = this.formService.getAllFields(this.config);
    
    fields.forEach((field) => {
      if (field.asyncOptions) {
        this.loading.set(true);
        this.formService.loadAsyncOptions(field.asyncOptions).pipe(
          takeUntil(this.destroy$)
        ).subscribe({
          next: (options) => {
            this.updateAsyncOptions(field.key, options);
            this.loading.set(false);
          },
          error: () => {
            this.loading.set(false);
          }
        });
      }
    });
  }

  private updateAsyncOptions(key: string, options: any[]): void {
    this.asyncOptionsMap.update((current) => ({
      ...current,
      [key]: options,
    }));
  }

  onOptionsLoaded(key: string, options: SelectOption[]): void {
    this.updateAsyncOptions(key, options);
  }

  isFieldVisible(field: FieldConfig): boolean {
    return this.formService.isFieldVisible(field, this.form);
  }

  getAllErrors(): Record<string, string> {
    const errors: Record<string, string> = {};
    const fields = this.formService.getAllFields(this.config);
    
    fields.forEach((field) => {
      const control = this.form.get(field.key);
      if (control && control.errors) {
        const firstErrorKey = Object.keys(control.errors)[0];
        errors[field.key] = this.formService.getErrorMessage(field, firstErrorKey);
      }
    });
    
    return errors;
  }

  getTouchedFields(): Record<string, boolean> {
    const touched: Record<string, boolean> = {};
    Object.keys(this.form.controls).forEach((key) => {
      touched[key] = this.form.get(key)?.touched || false;
    });
    return touched;
  }

  getThemeStyles(): Record<string, string> {
    if (!this.config.theme) return {};
    const theme = this.config.theme;
    return {
      '--primary-color': theme.primaryColor || '#3f51b5',
      '--accent-color': theme.accentColor || '#ff4081',
      '--background-color': theme.backgroundColor || '#ffffff',
      '--label-color': theme.labelColor || 'rgba(0,0,0,0.87)',
      '--error-color': theme.errorColor || '#f44336',
    };
  }

  onSubmit(): void {
    if (this.form.valid) {
      const values = this.formService.flattenFormValues(this.form);
      this.formSubmit.emit(values);
    } else {
      this.markAllAsTouched();
    }
  }

  onReset(): void {
    this.form.reset();
    this.formReset.emit();
  }

  private markAllAsTouched(): void {
    Object.keys(this.form.controls).forEach((key) => {
      this.form.get(key)?.markAsTouched();
    });
  }

  getFormGroup(): FormGroup {
    return this.form;
  }
}
