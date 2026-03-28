import { Component, Input, forwardRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectOption } from '@org/shared';

@Component({
  selector: 'lib-multi-select',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatCheckboxModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectComponent),
      multi: true,
    },
  ],
  template: `
    <mat-form-field [appearance]="appearance" [class]="className">
      <mat-label>{{ label }}</mat-label>
      @if (searchable) {
        <input matInput [placeholder]="searchPlaceholder" [value]="searchTerm()" (input)="onSearch($event)" />
      }
      <mat-select [disabled]="disabled" [value]="value" multiple (selectionChange)="onSelectionChange($event.value)">
        @if (showSelectAll) {
          <mat-option [value]="'__select_all__'" (click)="toggleSelectAll($event)">
            <span [style.font-weight]="allSelected() ? 'bold' : 'normal'">
              {{ allSelected() ? 'Deselect All' : 'Select All' }}
            </span>
          </mat-option>
        }
        @for (option of filteredOptions(); track option.value) {
          <mat-option [value]="option.value" [disabled]="option.disabled">
            {{ option.label }}
          </mat-option>
        }
      </mat-select>
      @if (selectedCount() > 0 && showCount) {
        <mat-hint>{{ selectedCount() }} selected</mat-hint>
      }
    </mat-form-field>
  `,
  styles: [`
    :host { display: block; }
    mat-form-field { width: 100%; }
  `],
})
export class MultiSelectComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() options: SelectOption[] = [];
  @Input() searchable = false;
  @Input() showSelectAll = false;
  @Input() showCount = true;
  @Input() maxSelections?: number;
  @Input() searchPlaceholder = 'Search...';
  @Input() disabled = false;
  @Input() appearance: 'fill' | 'outline' = 'outline';
  @Input() className = '';

  value: any[] = [];
  searchTerm = signal('');
  filteredOptions = signal<SelectOption[]>([]);
  selectedCount = signal(0);

  private onChangeFn: (value: any[]) => void = () => {};
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

  allSelected(): boolean {
    return this.value.length === this.options.length;
  }

  toggleSelectAll(event?: Event): void {
    event?.stopPropagation();
    if (this.allSelected()) {
      this.value = [];
    } else {
      this.value = this.options.map(opt => opt.value);
    }
    this.updateSelectedCount();
    this.onChangeFn(this.value);
  }

  writeValue(value: any[]): void {
    this.value = value || [];
    this.updateSelectedCount();
  }

  registerOnChange(fn: (value: any[]) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onSelectionChange(values: any[]): void {
    if (this.maxSelections && values.length > this.maxSelections) {
      values = values.slice(0, this.maxSelections);
    }
    this.value = values;
    this.updateSelectedCount();
    this.onChangeFn(this.value);
    this.onTouchedFn();
  }

  updateSelectedCount() {
    this.selectedCount.set(this.value.length);
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
    this.updateFilteredOptions();
  }
}
