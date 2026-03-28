# Dynamic Form Engine

A powerful, config-driven form engine for Angular that renders forms from JSON configuration.

## Overview

The Dynamic Form Engine allows you to create complex, validated forms without writing HTML templates. Simply define your form structure in JSON and let the engine handle rendering, validation, and data binding.

## Installation

```typescript
import { DynamicFormComponent } from '@angular-monorepo/dynamic-form';
```

## Basic Usage

```typescript
import { Component } from '@angular/core';
import { FormConfig } from '@angular-monorepo/dynamic-form';

@Component({
  selector: 'app-example',
  template: `
    <lib-dynamic-form
      [config]="formConfig"
      (formSubmit)="onSubmit($event)">
    </lib-dynamic-form>
  `
})
export class ExampleComponent {
  formConfig: FormConfig = {
    fields: [
      {
        key: 'name',
        label: 'Full Name',
        type: 'text'
      }
    ]
  };

  onSubmit(data: any) {
    console.log('Form data:', data);
  }
}
```

## Form Configuration

### FormConfig Interface

```typescript
interface FormConfig {
  // Form fields organized in sections
  sections?: FormSection[];
  
  // Flat array of fields (alternative to sections)
  fields?: FieldConfig[];
  
  // Layout style: 'vertical', 'horizontal', 'grid'
  layout?: 'vertical' | 'horizontal' | 'grid';
  
  // Show reset button
  showReset?: boolean;
  
  // Submit button label
  submitLabel?: string;
  
  // Reset button label
  resetLabel?: string;
  
  // Theme configuration
  theme?: FormTheme;
}

interface FormSection {
  title?: string;
  fields: FieldConfig[];
  className?: string;
  columns?: number; // Grid columns
}

interface FormTheme {
  primaryColor?: string;
  accentColor?: string;
  backgroundColor?: string;
  labelColor?: string;
  errorColor?: string;
}
```

## Field Configuration

### FieldConfig Interface

```typescript
interface FieldConfig {
  // Unique identifier for the field
  key: string;
  
  // Display label
  label: string;
  
  // Field type
  type: FieldType;
  
  // Placeholder text
  placeholder?: string;
  
  // Default value
  defaultValue?: any;
  
  // Disable the field
  disabled?: boolean;
  
  // Make field read-only
  readonly?: boolean;
  
  // Show/hide field
  visible?: boolean;
  
  // Field order in form
  order?: number;
  
  // For select, radio, multi-select
  options?: SelectOption[];
  asyncOptions?: string;
  searchable?: boolean;
  multiple?: boolean;
  showSelectAll?: boolean;
  maxSelections?: number;
  
  // For date picker
  minDate?: Date | string;
  maxDate?: Date | string;
  dateFormat?: string;
  
  // Validation rules
  validations?: ValidationRule[];
  errorMessages?: Record<string, string>;
  
  // Conditional logic
  conditions?: ConditionalLogic[];
  
  // Styling
  className?: string;
  appearance?: 'legacy' | 'standard' | 'filled' | 'outline';
  
  // Nested object binding
  path?: string;
}

type FieldType = 
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
```

## Validation

### Validation Rules

```typescript
validations: [
  {
    type: 'required',
    message: 'This field is required'
  },
  {
    type: 'email',
    message: 'Please enter a valid email'
  },
  {
    type: 'minLength',
    value: 3,
    message: 'Minimum 3 characters required'
  },
  {
    type: 'maxLength',
    value: 50,
    message: 'Maximum 50 characters allowed'
  },
  {
    type: 'min',
    value: 18,
    message: 'Minimum age is 18'
  },
  {
    type: 'max',
    value: 100,
    message: 'Maximum value is 100'
  },
  {
    type: 'pattern',
    value: '^[A-Z][a-z]+$',
    message: 'Must start with capital letter'
  }
]
```

### Custom Error Messages

```typescript
errorMessages: {
  required: 'Please fill in this field',
  email: 'Enter a valid email address',
  minlength: 'Too short!',
  maxlength: 'Too long!'
}
```

## Conditional Logic

Show/hide or enable/disable fields based on other field values:

```typescript
fields: [
  {
    key: 'isAdmin',
    label: 'Is Admin?',
    type: 'checkbox'
  },
  {
    key: 'adminPanel',
    label: 'Access Admin Panel',
    type: 'checkbox',
    conditions: [
      {
        field: 'isAdmin',
        operator: 'equals',
        value: true,
        action: 'show' // 'show' | 'hide' | 'enable' | 'disable'
      }
    ]
  }
]
```

### Available Operators

- `equals` - Field value equals condition value
- `notEquals` - Field value not equals condition value
- `contains` - Field value contains condition value
- `greaterThan` - Field value greater than condition value
- `lessThan` - Field value less than condition value

## Async Options

Load options from an API endpoint:

```typescript
{
  key: 'country',
  label: 'Country',
  type: 'select',
  asyncOptions: '/api/countries'
}
```

## Nested Object Binding

Bind fields to nested objects using dot notation:

```typescript
fields: [
  {
    key: 'street',
    label: 'Street Address',
    path: 'address.street'
  },
  {
    key: 'city',
    label: 'City',
    path: 'address.city'
  },
  {
    key: 'pincode',
    label: 'Pincode',
    path: 'address.details.pin'
  }
]
```

## Complete Example

```typescript
const formConfig: FormConfig = {
  sections: [
    {
      title: 'Personal Information',
      columns: 2,
      fields: [
        {
          key: 'firstName',
          label: 'First Name',
          type: 'text',
          placeholder: 'Enter first name',
          validations: [
            { type: 'required', message: 'Required' }
          ]
        },
        {
          key: 'lastName',
          label: 'Last Name',
          type: 'text',
          placeholder: 'Enter last name',
          validations: [
            { type: 'required', message: 'Required' }
          ]
        },
        {
          key: 'email',
          label: 'Email',
          type: 'email',
          placeholder: 'Enter email',
          validations: [
            { type: 'required', message: 'Required' },
            { type: 'email', message: 'Invalid email' }
          ]
        },
        {
          key: 'phone',
          label: 'Phone',
          type: 'text',
          placeholder: 'Enter phone number'
        }
      ]
    },
    {
      title: 'Address',
      fields: [
        {
          key: 'street',
          label: 'Street',
          type: 'text',
          path: 'address.street'
        },
        {
          key: 'city',
          label: 'City',
          type: 'select',
          path: 'address.city',
          options: [
            { label: 'New York', value: 'ny' },
            { label: 'Los Angeles', value: 'la' }
          ]
        }
      ]
    },
    {
      title: 'Preferences',
      fields: [
        {
          key: 'subscribe',
          label: 'Subscribe to newsletter',
          type: 'checkbox'
        }
      ]
    }
  ],
  showReset: true,
  submitLabel: 'Save',
  resetLabel: 'Clear',
  theme: {
    primaryColor: '#3f51b5'
  }
};
```

## Events

### formSubmit
Emitted when form is submitted and valid.

```html
<lib-dynamic-form
  [config]="config"
  (formSubmit)="onSubmit($event)">
</lib-dynamic-form>
```

```typescript
onSubmit(data: any) {
  console.log('Form values:', data);
}
```

### formChange
Emitted on any form value change.

```typescript
onFormChange(state: FormState) {
  console.log('Form state:', state);
}
```

### formReset
Emitted when form is reset.

```typescript
onFormReset() {
  console.log('Form was reset');
}
```

## Theme Customization

```typescript
theme: {
  primaryColor: '#1976d2',
  accentColor: '#ff4081',
  backgroundColor: '#f5f5f5',
  labelColor: '#333',
  errorColor: '#f44336'
}
```

## Best Practices

1. **Use Sections:** Organize fields into logical sections
2. **Validation:** Always provide custom error messages
3. **Conditional Logic:** Keep conditions simple and test thoroughly
4. **Async Options:** Handle loading and error states
5. **Nested Paths:** Flatten data for API compatibility
6. **Default Values:** Set sensible defaults where applicable
7. **Accessibility:** Use proper labels and ARIA attributes

## Performance Tips

1. **Debounce:** Form changes are debounced (100ms)
2. **Lazy Load:** Only import components you need
3. **OnPush:** Components support OnPush change detection
4. **Async Pipe:** Use async pipe with observables
