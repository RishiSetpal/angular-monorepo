import { Component, Input, forwardRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { SelectOption } from '@org/shared';

@Component({
  selector: 'lib-single-select',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SingleSelectComponent),
      multi: true,
    },
  ],
  template: `
    <mat-form-field [appearance]="appearance" [class]="className">
      <mat-label>{{ label }}</mat-label>
      @if (searchable) {
        <input matInput [placeholder]="searchPlaceholder" [value]="searchTerm()" (input)="onSearch($event)" />
      }
      <mat-select [disabled]="disabled" [value]="value" (selectionChange)="onSelectionChange($event.value)">
        @for (option of filteredOptions(); track option.value) {
          <mat-option [value]="option.value" [disabled]="option.disabled">
            {{ option.label }}
          </mat-option>
        }
      </mat-select>
    </mat-form-field>
  `,
  styles: [`
    :host { display: block; }
    mat-form-field { width: 100%; }
  `],
})
export class SingleSelectComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() options: SelectOption[] = [];
  @Input() searchable = false;
  @Input() searchPlaceholder = 'Search...';
  @Input() disabled = false;
  @Input() appearance: 'fill' | 'outline' = 'outline';
  @Input() className = '';
  @Input() set asyncData(data: SelectOption[] | null) {
    if (data) {
      this.options = data;
      this.updateFilteredOptions();
    }
  }

  value: any = null;
  searchTerm = signal('');
  filteredOptions = signal<SelectOption[]>([]);

  private onChangeFn: (value: any) => void = () => {};
  private onTouchedFn: () => void = () => {};

  ngOnInit() {
    this.updateFilteredOptions();
  }

  ngOnChanges() {
    this.updateFilteredOptions();
  }

  updateFilteredOptions() {
    const term = this.searchTerm().toLowerCase();
    const filtered = term
      ? this.options.filter(opt => opt.label.toLowerCase().includes(term))
      : this.options;
    this.filteredOptions.set(filtered);
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onSelectionChange(value: any): void {
    this.value = value;
    this.onChangeFn(value);
    this.onTouchedFn();
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
    this.updateFilteredOptions();
  }
}
