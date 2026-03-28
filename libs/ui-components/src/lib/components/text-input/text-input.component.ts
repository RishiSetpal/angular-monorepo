import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'lib-text-input',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatIconModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true,
    },
  ],
  template: `
    <mat-form-field [appearance]="appearance" [class]="className">
      <mat-label>{{ label }}</mat-label>
      <input
        matInput
        [type]="type"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [readonly]="readonly"
        [value]="value"
        (input)="onInput($event)"
        (blur)="onTouched()"
      />
      @if (icon) {
        <mat-icon matSuffix>{{ icon }}</mat-icon>
      }
    </mat-form-field>
  `,
  styles: [`
    :host { display: block; }
    mat-form-field { width: 100%; }
  `],
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type = 'text';
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() icon?: string;
  @Input() appearance: 'fill' | 'outline' = 'outline';
  @Input() className = '';

  value = '';
  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
  }
}
