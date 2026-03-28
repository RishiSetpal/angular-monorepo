import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'lib-checkbox',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCheckboxModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
  template: `
    <mat-checkbox
      [checked]="value"
      [disabled]="disabled"
      [color]="color"
      (change)="onChange($event.checked)"
      (blur)="onTouchedFn()"
    >
      {{ label }}
    </mat-checkbox>
  `,
  styles: [`
    :host { display: inline-block; }
  `],
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() disabled = false;
  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';

  value = false;
  private onChangeFn: (value: boolean) => void = () => {};
  onTouchedFn: () => void = () => {};

  writeValue(value: boolean): void {
    this.value = value || false;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onChange(checked: boolean): void {
    this.value = checked;
    this.onChangeFn(checked);
    this.onTouchedFn();
  }
}
