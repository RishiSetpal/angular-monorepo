import { Component, Input, forwardRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { DateUtils } from '@org/shared';

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
          <input matStartDate [placeholder]="startLabel" [value]="startValue()" (dateChange)="onStartDateChange($event)" />
          <input matEndDate [placeholder]="endLabel" [value]="endValue()" (dateChange)="onEndDateChange($event)" />
        </mat-date-range-input>
        <mat-datepicker-toggle matIconSuffix [for]="rangePicker"></mat-datepicker-toggle>
        <mat-date-range-picker #rangePicker></mat-date-range-picker>
        @if (getRangeDisplay()) {
          <mat-hint>{{ getRangeDisplay() }}</mat-hint>
        }
      </mat-form-field>
    } @else {
      <mat-form-field [appearance]="appearance" [class]="className">
        <mat-label>{{ label }}</mat-label>
        <input matInput [matDatepicker]="picker" [min]="minDate" [max]="maxDate" 
               [value]="value()" (dateChange)="onDateChange($event)" />
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
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
  @Input() format = 'DD-MMMM-YYYY';
  @Input() disabled = false;
  @Input() appearance: 'fill' | 'outline' = 'outline';
  @Input() className = '';

  value = signal<Date | null>(null);
  startValue = signal<Date | null>(null);
  endValue = signal<Date | null>(null);

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

  onDateChange(event: any): void {
    const date = event.value;
    this.value.set(date);
    const formatted = date ? DateUtils.formatDate(date, this.format) : null;
    this.onChangeFn(formatted);
    this.onTouchedFn();
  }

  onStartDateChange(event: any): void {
    const date = event.value;
    this.startValue.set(date);
    this.emitRangeChange();
    this.onTouchedFn();
  }

  onEndDateChange(event: any): void {
    const date = event.value;
    this.endValue.set(date);
    this.emitRangeChange();
    this.onTouchedFn();
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
