import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'lib-textarea',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true,
    },
  ],
  template: `
    <mat-form-field [appearance]="appearance" [class]="className">
      <mat-label>{{ label }}</mat-label>
      <textarea
        matInput
        [placeholder]="placeholder"
        [disabled]="disabled"
        [readonly]="readonly"
        [rows]="rows"
        [value]="value"
        (input)="onInput($event)"
        (blur)="onTouched()"
      ></textarea>
    </mat-form-field>
  `,
  styles: [`
    :host { display: block; }
    mat-form-field { width: 100%; }
  `],
})
export class TextareaComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() rows = 3;
  @Input() disabled = false;
  @Input() readonly = false;
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
    const textarea = event.target as HTMLTextAreaElement;
    this.value = textarea.value;
    this.onChange(this.value);
  }
}
