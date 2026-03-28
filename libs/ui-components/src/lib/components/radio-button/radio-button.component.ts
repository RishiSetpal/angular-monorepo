import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { SelectOption } from '@org/shared';

@Component({
  selector: 'lib-radio-button',
  standalone: true,
  imports: [CommonModule, FormsModule, MatRadioModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioButtonComponent),
      multi: true,
    },
  ],
  template: `
    <mat-radio-group [value]="value" [disabled]="disabled" (change)="onChange($event.value)">
      @for (option of options; track option.value) {
        <mat-radio-button [value]="option.value" [color]="color">
          {{ option.label }}
        </mat-radio-button>
      }
    </mat-radio-group>
  `,
  styles: [`
    :host { display: block; }
    mat-radio-button { margin-right: 16px; }
  `],
})
export class RadioButtonComponent implements ControlValueAccessor {
  @Input() options: SelectOption[] = [];
  @Input() disabled = false;
  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';

  value: any = null;
  private onChangeFn: (value: any) => void = () => {};
  private onTouchedFn: () => void = () => {};

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

  onChange(value: any): void {
    this.value = value;
    this.onChangeFn(value);
    this.onTouchedFn();
  }
}
