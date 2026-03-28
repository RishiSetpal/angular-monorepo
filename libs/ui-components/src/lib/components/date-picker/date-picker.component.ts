import { Component, Input, forwardRef, signal, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { DateUtils } from '@org/shared';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD-MMM-YYYY',
  },
  display: {
    dateInput: 'DD-MMM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD-MMM-YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'lib-date-picker',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatFormFieldModule, 
    MatDatepickerModule, 
    MatInputModule, 
    MatNativeDateModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true,
    },
  ],
  template: `
    @if (rangeMode) {
      <mat-form-field [appearance]="appearance" [class]="className">
        <mat-label>{{ label || 'Select Date Range' }}</mat-label>
        <mat-date-range-input [rangePicker]="rangePicker">
          <input matStartDate [placeholder]="startLabel" [value]="startValue()" (dateChange)="onStartDateChange($event)" (input)="onInputChange($event, 'start')" />
          <input matEndDate [placeholder]="endLabel" [value]="endValue()" (dateChange)="onEndDateChange($event)" (input)="onInputChange($event, 'end')" />
        </mat-date-range-input>
        <mat-datepicker-toggle matIconSuffix [for]="rangePicker"></mat-datepicker-toggle>
        <mat-date-range-picker #rangePicker></mat-date-range-picker>
        @if (errorMessage()) {
          <mat-error>{{ errorMessage() }}</mat-error>
        }
        @if (getRangeDisplay() && !errorMessage()) {
          <mat-hint>{{ getRangeDisplay() }}</mat-hint>
        }
      </mat-form-field>
    } @else {
      <mat-form-field [appearance]="appearance" [class]="className">
        <mat-label>{{ label }}</mat-label>
        <input matInput [matDatepicker]="picker" [min]="minDate" [max]="maxDate" 
               [value]="value()" (dateChange)="onDateChange($event)" (input)="onInputChange($event, 'single')" 
               [placeholder]="placeholder" />
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
        @if (errorMessage()) {
          <mat-error>{{ errorMessage() }}</mat-error>
        }
      </mat-form-field>
    }
  `,
  styles: [`
    :host { display: block; }
    mat-form-field { width: 100%; }
  `],
})
export class DatePickerComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() startLabel = 'From';
  @Input() endLabel = 'To';
  @Input() rangeMode = false;
  @Input() minDate?: Date;
  @Input() maxDate?: Date;
  @Input() format = 'DD-MMM-YYYY';
  @Input() disabled = false;
  @Input() appearance: 'fill' | 'outline' = 'outline';
  @Input() className = '';
  @Input() placeholder = 'DD-MMM-YYYY';
  @Input() strictValidation = true;

  @Output() dateInvalid = new EventEmitter<{ value: string; message: string }>();

  value = signal<Date | null>(null);
  startValue = signal<Date | null>(null);
  endValue = signal<Date | null>(null);
  errorMessage = signal('');

  private onChangeFn: (value: any) => void = () => {};
  private onTouchedFn: () => void = () => {};

  writeValue(value: any): void {
    if (this.rangeMode) {
      if (Array.isArray(value) && value.length === 2) {
        this.startValue.set(value[0] ? new Date(value[0]) : null);
        this.endValue.set(value[1] ? new Date(value[1]) : null);
      }
    } else {
      this.value.set(value ? new Date(value) : null);
    }
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

  onInputChange(event: Event, type: 'single' | 'start' | 'end'): void {
    const input = event.target as HTMLInputElement;
    const inputValue = input.value;

    if (!inputValue) {
      this.errorMessage.set('');
      return;
    }

    if (!this.isValidDateFormat(inputValue)) {
      if (this.strictValidation) {
        this.errorMessage.set('Invalid date format. Use DD-MMM-YYYY');
        this.dateInvalid.emit({ value: inputValue, message: 'Invalid date format. Use DD-MMM-YYYY' });
      }
    } else {
      this.errorMessage.set('');
    }
  }

  private isValidDateFormat(value: string): boolean {
    const datePattern = /^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/;
    const monthNames = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    
    const match = value.toLowerCase().match(datePattern);
    if (!match) {
      const parts = value.split(/[-/\s]/);
      if (parts.length === 3) {
        const day = parseInt(parts[0]);
        const month = parts[1];
        const year = parseInt(parts[2]);
        
        if (monthNames.includes(month) && day >= 1 && day <= 31 && year >= 1900 && year <= 2100) {
          return true;
        }
      }
      return false;
    }

    const [, day, month, year] = match;
    const monthIndex = monthNames.findIndex(m => m === month.toLowerCase().substring(0, 3));
    
    if (monthIndex === -1) return false;
    
    const dayNum = parseInt(day);
    const yearNum = parseInt(year);
    
    if (dayNum < 1 || dayNum > 31 || yearNum < 1900 || yearNum > 2100) return false;
    
    const daysInMonth = [31, yearNum % 4 === 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (dayNum > daysInMonth[monthIndex]) return false;
    
    return true;
  }

  onDateChange(event: any): void {
    const date = event.value;
    
    if (date && this.isInvalidDate(date)) {
      this.errorMessage.set('Invalid date selected');
      this.dateInvalid.emit({ value: date.toISOString(), message: 'Invalid date selected' });
      return;
    }

    this.errorMessage.set('');
    this.value.set(date);
    const formatted = date ? DateUtils.formatDate(date, this.format) : null;
    this.onChangeFn(formatted);
    this.onTouchedFn();
  }

  onStartDateChange(event: any): void {
    const date = event.value;
    this.startValue.set(date);
    this.validateRange();
    this.emitRangeChange();
    this.onTouchedFn();
  }

  onEndDateChange(event: any): void {
    const date = event.value;
    this.endValue.set(date);
    this.validateRange();
    this.emitRangeChange();
    this.onTouchedFn();
  }

  private validateRange(): void {
    const start = this.startValue();
    const end = this.endValue();
    
    if (start && end && start > end) {
      this.errorMessage.set('End date must be after start date');
      this.dateInvalid.emit({ value: '', message: 'End date must be after start date' });
    } else {
      this.errorMessage.set('');
    }
  }

  private isInvalidDate(date: Date): boolean {
    return isNaN(date.getTime());
  }

  getRangeDisplay(): string {
    const start = this.startValue();
    const end = this.endValue();
    if (start && end) {
      return `${DateUtils.formatDate(start, this.format)} - ${DateUtils.formatDate(end, this.format)}`;
    } else if (start) {
      return `From: ${DateUtils.formatDate(start, this.format)}`;
    }
    return '';
  }

  private emitRangeChange(): void {
    const start = this.startValue();
    const end = this.endValue();
    const formatted = [
      start ? DateUtils.formatDate(start, this.format) : null,
      end ? DateUtils.formatDate(end, this.format) : null,
    ];
    this.onChangeFn(formatted);
  }
}
