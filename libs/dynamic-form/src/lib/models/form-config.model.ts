import { SelectOption } from '@org/shared';

export type FieldType = 
  | 'text'
  | 'textarea'
  | 'number'
  | 'email'
  | 'password'
  | 'select'
  | 'multi-select'
  | 'date'
  | 'date-range'
  | 'checkbox'
  | 'radio'
  | 'toggle'
  | 'file'
  | 'hidden';

export interface ValidationRule {
  type: 'required' | 'minLength' | 'maxLength' | 'min' | 'max' | 'pattern' | 'email' | 'custom';
  value?: any;
  message: string;
}

export interface ConditionalLogic {
  field: string;
  operator: 'equals' | 'notEquals' | 'contains' | 'greaterThan' | 'lessThan';
  value: any;
  action: 'show' | 'hide' | 'enable' | 'disable';
}

export interface FieldConfig {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  defaultValue?: any;
  disabled?: boolean;
  readonly?: boolean;
  visible?: boolean;
  order?: number;
  
  // Options for select, radio, multi-select
  options?: SelectOption[];
  asyncOptions?: string; // API endpoint
  searchable?: boolean;
  multiple?: boolean;
  showSelectAll?: boolean;
  maxSelections?: number;
  
  // Date picker specific
  minDate?: Date | string;
  maxDate?: Date | string;
  dateFormat?: string;
  
  // File upload specific
  accept?: string;
  maxFileSize?: number;
  allowMultiple?: boolean;
  
  // Validation
  validations?: ValidationRule[];
  errorMessages?: Record<string, string>;
  
  // Conditional logic
  conditions?: ConditionalLogic[];
  
  // Styling
  className?: string;
  appearance?: 'fill' | 'outline';
  
  // Nested object binding
  path?: string; // e.g., 'moreInfo.address.pin'
}

export interface FormSection {
  title?: string;
  fields: FieldConfig[];
  className?: string;
  columns?: number; // For grid layout
}

export interface FormConfig {
  sections?: FormSection[];
  fields?: FieldConfig[];
  layout?: 'vertical' | 'horizontal' | 'grid';
  showReset?: boolean;
  submitLabel?: string;
  resetLabel?: string;
  theme?: FormTheme;
}

export interface FormTheme {
  primaryColor?: string;
  accentColor?: string;
  backgroundColor?: string;
  labelColor?: string;
  errorColor?: string;
}

export interface FormValue {
  [key: string]: any;
}

export interface FormState {
  values: FormValue;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  dirty: boolean;
  valid: boolean;
}
