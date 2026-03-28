import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class ValidationUtils {
  static email(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(control.value) ? null : { email: true };
    };
  }

  static phone(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
      return phoneRegex.test(control.value) ? null : { phone: true };
    };
  }

  static url(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      try {
        new URL(control.value);
        return null;
      } catch {
        return { url: true };
      }
    };
  }

  static minLength(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      return control.value.length >= min ? null : { minlength: { requiredLength: min, actualLength: control.value.length } };
    };
  }

  static maxLength(max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      return control.value.length <= max ? null : { maxlength: { requiredLength: max, actualLength: control.value.length } };
    };
  }

  static minValue(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value === null || control.value === undefined || control.value === '') return null;
      return Number(control.value) >= min ? null : { min: { min, actual: control.value } };
    };
  }

  static maxValue(max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value === null || control.value === undefined || control.value === '') return null;
      return Number(control.value) <= max ? null : { max: { max, actual: control.value } };
    };
  }

  static pattern(pattern: string | RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const regex = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
      return regex.test(control.value) ? null : { pattern: { requiredPattern: pattern.toString(), actualValue: control.value } };
    };
  }

  static requiredWhen(condition: (control: AbstractControl) => boolean): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (condition(control)) {
        return control.value ? null : { required: true };
      }
      return null;
    };
  }

  static custom(validator: (value: any) => boolean, errorKey = 'custom'): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      return validator(control.value) ? null : { [errorKey]: true };
    };
  }
}
