import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { 
  FormConfig, 
  FieldConfig, 
  FormSection, 
  FormValue, 
  FieldType,
  ValidationRule 
} from '../models/form-config.model';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { ObjectUtils } from '@org/shared';

@Injectable({
  providedIn: 'root',
})
export class DynamicFormService {
  private http = inject(HttpClient);

  createFormGroup(config: FormConfig): FormGroup {
    const fields = this.getAllFields(config);
    const group: Record<string, FormControl> = {};

    fields.forEach((field) => {
      if (field.type !== 'hidden') {
        const validators = this.createValidators(field);
        const defaultValue = field.defaultValue ?? (field.multiple ? [] : null);
        group[field.key] = new FormControl(
          { value: defaultValue, disabled: field.disabled },
          { validators }
        );
      }
    });

    return new FormGroup(group);
  }

  createValidators(field: FieldConfig): ValidatorFn[] {
    const validators: ValidatorFn[] = [];
    
    if (field.validations) {
      field.validations.forEach((rule) => {
        switch (rule.type) {
          case 'required':
            validators.push(Validators.required);
            break;
          case 'email':
            validators.push(Validators.email);
            break;
          case 'minLength':
            validators.push(Validators.minLength(rule.value));
            break;
          case 'maxLength':
            validators.push(Validators.maxLength(rule.value));
            break;
          case 'min':
            validators.push(Validators.min(rule.value));
            break;
          case 'max':
            validators.push(Validators.max(rule.value));
            break;
          case 'pattern':
            validators.push(Validators.pattern(rule.value));
            break;
        }
      });
    }

    return validators;
  }

  getAllFields(config: FormConfig): FieldConfig[] {
    const fields: FieldConfig[] = [];
    
    if (config.fields) {
      fields.push(...config.fields);
    }
    
    if (config.sections) {
      config.sections.forEach((section) => {
        fields.push(...section.fields);
      });
    }
    
    return fields.sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  getFieldConfig(config: FormConfig, key: string): FieldConfig | undefined {
    return this.getAllFields(config).find((f) => f.key === key);
  }

  setFieldValue(form: FormGroup, path: string, value: any): void {
    ObjectUtils.setNestedValue(form.value, path, value);
  }

  getFieldValue(form: FormGroup, path: string): any {
    return ObjectUtils.getNestedValue(form.value, path);
  }

  loadAsyncOptions(endpoint: string): Observable<any[]> {
    return this.http.get<any[]>(endpoint).pipe(
      map((response) => response || [])
    );
  }

  isFieldVisible(field: FieldConfig, form: FormGroup): boolean {
    if (!field.conditions || field.conditions.length === 0) {
      return field.visible !== false;
    }

    return field.conditions.every((condition) => {
      const fieldValue = form.get(condition.field)?.value;
      let isConditionMet = false;

      switch (condition.operator) {
        case 'equals':
          isConditionMet = fieldValue === condition.value;
          break;
        case 'notEquals':
          isConditionMet = fieldValue !== condition.value;
          break;
        case 'contains':
          isConditionMet = String(fieldValue).includes(condition.value);
          break;
        case 'greaterThan':
          isConditionMet = Number(fieldValue) > condition.value;
          break;
        case 'lessThan':
          isConditionMet = Number(fieldValue) < condition.value;
          break;
      }

      return condition.action === 'show' || condition.action === 'enable'
        ? isConditionMet
        : !isConditionMet;
    });
  }

  getErrorMessage(field: FieldConfig, errorKey: string): string {
    if (field.errorMessages && field.errorMessages[errorKey]) {
      return field.errorMessages[errorKey];
    }

    const defaultMessages: Record<string, string> = {
      required: 'This field is required',
      email: 'Please enter a valid email',
      minlength: `Minimum ${field.validations?.find(v => v.type === 'minLength')?.value} characters required`,
      maxlength: `Maximum ${field.validations?.find(v => v.type === 'maxLength')?.value} characters allowed`,
      min: `Minimum value is ${field.validations?.find(v => v.type === 'min')?.value}`,
      max: `Maximum value is ${field.validations?.find(v => v.type === 'max')?.value}`,
      pattern: 'Invalid format',
    };

    return defaultMessages[errorKey] || 'Invalid value';
  }

  flattenFormValues(form: FormGroup): Record<string, any> {
    return ObjectUtils.flatten(form.value);
  }

  unflattenFormValues(flatValues: Record<string, any>): FormValue {
    return ObjectUtils.unflatten(flatValues);
  }
}
