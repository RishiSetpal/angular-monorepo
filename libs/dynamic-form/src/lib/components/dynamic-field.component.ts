import { Component, Input, OnInit, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { FieldConfig } from '../models/form-config.model';
import { SelectOption } from '@org/shared';
import { DateUtils } from '@org/shared';

@Component({
  selector: 'lib-dynamic-field',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
  ],
  template: `
    @switch (field.type) {
      @case ('text') {
        <mat-form-field [appearance]="field.appearance || 'outline'">
          <mat-label>{{ field.label }}</mat-label>
          <input matInput [formControlName]="field.key" [placeholder]="field.placeholder || ''" />
          @if (hasError()) {
            <mat-error>{{ errorMessage }}</mat-error>
          }
        </mat-form-field>
      }
      @case ('email') {
        <mat-form-field [appearance]="field.appearance || 'outline'">
          <mat-label>{{ field.label }}</mat-label>
          <input matInput type="email" [formControlName]="field.key" [placeholder]="field.placeholder || ''" />
          @if (hasError()) {
            <mat-error>{{ errorMessage }}</mat-error>
          }
        </mat-form-field>
      }
      @case ('number') {
        <mat-form-field [appearance]="field.appearance || 'outline'">
          <mat-label>{{ field.label }}</mat-label>
          <input matInput type="number" [formControlName]="field.key" [placeholder]="field.placeholder || ''" />
          @if (hasError()) {
            <mat-error>{{ errorMessage }}</mat-error>
          }
        </mat-form-field>
      }
      @case ('textarea') {
        <mat-form-field [appearance]="field.appearance || 'outline'">
          <mat-label>{{ field.label }}</mat-label>
          <textarea matInput [formControlName]="field.key" [placeholder]="field.placeholder || ''" rows="3"></textarea>
          @if (hasError()) {
            <mat-error>{{ errorMessage }}</mat-error>
          }
        </mat-form-field>
      }
      @case ('select') {
        <mat-form-field [appearance]="field.appearance || 'outline'">
          <mat-label>{{ field.label }}</mat-label>
          <mat-select [formControlName]="field.key">
            @for (option of getOptions(); track option.value) {
              <mat-option [value]="option.value">{{ option.label }}</mat-option>
            }
          </mat-select>
          @if (hasError()) {
            <mat-error>{{ errorMessage }}</mat-error>
          }
        </mat-form-field>
      }
      @case ('multi-select') {
        <mat-form-field [appearance]="field.appearance || 'outline'">
          <mat-label>{{ field.label }}</mat-label>
          <mat-select [formControlName]="field.key" multiple>
            @for (option of getOptions(); track option.value) {
              <mat-option [value]="option.value">{{ option.label }}</mat-option>
            }
          </mat-select>
          @if (hasError()) {
            <mat-error>{{ errorMessage }}</mat-error>
          }
        </mat-form-field>
      }
      @case ('date') {
        <mat-form-field [appearance]="field.appearance || 'outline'">
          <mat-label>{{ field.label }}</mat-label>
          <input matInput [matDatepicker]="picker" [formControlName]="field.key" />
          <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
          @if (hasError()) {
            <mat-error>{{ errorMessage }}</mat-error>
          }
        </mat-form-field>
      }
      @case ('date-range') {
        <mat-form-field [appearance]="field.appearance || 'outline'">
          <mat-label>{{ field.label || 'Select Date Range' }}</mat-label>
          <mat-date-range-input [rangePicker]="rangePicker">
            <input matStartDate [placeholder]="field.startLabel || 'From'" [formControlName]="field.key + 'Start'" />
            <input matEndDate [placeholder]="field.endLabel || 'To'" [formControlName]="field.key + 'End'" />
          </mat-date-range-input>
          <mat-datepicker-toggle matIconSuffix [for]="rangePicker"></mat-datepicker-toggle>
          <mat-date-range-picker #rangePicker></mat-date-range-picker>
        </mat-form-field>
      }
      @case ('checkbox') {
        <mat-checkbox [formControlName]="field.key" color="primary">
          {{ field.label }}
        </mat-checkbox>
      }
      @case ('radio') {
        <mat-radio-group [formControlName]="field.key">
          <label>{{ field.label }}</label>
          @for (option of getOptions(); track option.value) {
            <mat-radio-button [value]="option.value">{{ option.label }}</mat-radio-button>
          }
        </mat-radio-group>
      }
      @case ('toggle') {
        <mat-slide-toggle [formControlName]="field.key" color="primary">
          {{ field.label }}
        </mat-slide-toggle>
      }
      @default {
        <mat-form-field [appearance]="field.appearance || 'outline'">
          <mat-label>{{ field.label }}</mat-label>
          <input matInput [formControlName]="field.key" [placeholder]="field.placeholder || ''" />
        </mat-form-field>
      }
    }
  `,
  styles: [`
    :host { display: block; }
    mat-form-field { width: 100%; }
    mat-radio-group { display: flex; flex-direction: column; gap: 8px; }
    mat-radio-button { margin-right: 16px; }
    mat-checkbox { display: block; margin-top: 16px; }
    mat-slide-toggle { display: block; margin-top: 16px; }
    label { font-weight: 500; margin-bottom: 8px; display: block; }
  `],
})
export class DynamicFieldComponent implements OnInit {
  @Input() field!: FieldConfig;
  @Input() form!: FormGroup;
  @Input() asyncOptions?: SelectOption[];
  
  @Output() optionsLoaded = new EventEmitter<SelectOption[]>();

  errorMessage = '';

  ngOnInit(): void {
    if (this.asyncOptions) {
      this.optionsLoaded.emit(this.asyncOptions);
    }
    
    const control = this.form.get(this.field.key);
    if (control) {
      control.statusChanges.subscribe(() => {
        this.updateErrorMessage();
      });
    }
  }

  getOptions(): SelectOption[] {
    return this.asyncOptions || this.field.options || [];
  }

  hasError(): boolean {
    const control = this.form.get(this.field.key);
    return !!(control && control.invalid && control.touched);
  }

  private updateErrorMessage(): void {
    const control = this.form.get(this.field.key);
    if (control && control.errors && this.field.errorMessages) {
      const firstErrorKey = Object.keys(control.errors)[0];
      this.errorMessage = this.field.errorMessages[firstErrorKey] || this.getDefaultErrorMessage(firstErrorKey);
    } else {
      this.errorMessage = '';
    }
  }

  private getDefaultErrorMessage(errorKey: string): string {
    const messages: Record<string, string> = {
      required: 'This field is required',
      email: 'Please enter a valid email',
      minlength: 'Value is too short',
      maxlength: 'Value is too long',
      min: 'Value is too low',
      max: 'Value is too high',
      pattern: 'Invalid format',
    };
    return messages[errorKey] || 'Invalid value';
  }
}
