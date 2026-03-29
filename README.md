# Angular Monorepo UI Library

A production-grade Angular monorepo application using Nx, featuring reusable UI components, dynamic form engine, and dynamic table engine built with Angular Material.

## 📚 Documentation

For detailed usage examples and API reference, see:

- **[UI Components Guide](./docs/UI-COMPONENTS.md)** - Complete guide for all 13 UI components with examples
- **[Dynamic Form Engine](./docs/DYNAMIC-FORM.md)** - JSON-driven form generation  
- **[Dynamic Table Engine](./docs/DYNAMIC-TABLE.md)** - Configurable data tables with editing, sorting, filtering

## Quick Examples

### UI Components
```html
<lib-text-input label="Email" type="email"></lib-text-input>
<lib-single-select [options]="countries" [searchable]="true"></lib-single-select>
<lib-date-picker label="Birth Date"></lib-date-picker>
<lib-file-upload [config]="{ multiple: true }"></lib-file-upload>
```

### Dynamic Form
```typescript
const formConfig = {
  fields: [
    { key: 'name', label: 'Name', type: 'text' },
    { key: 'email', label: 'Email', type: 'email' }
  ]
};
```

### Dynamic Table
```typescript
const tableConfig = {
  columns: [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'status', label: 'Status', editable: true }
  ]
};
```

## Architecture Overview

```
angular-monorepo/
├── apps/
│   └── demo-app/          # Demo application showcasing all features
├── libs/
│   ├── core/              # Core services, interceptors, API abstraction
│   ├── shared/            # Shared utilities, models, constants
│   ├── ui-components/     # Reusable Material-based UI components
│   ├── dynamic-form/      # Config-driven form engine
│   └── dynamic-table/     # Config-driven table engine
```

## Key Features

### 1. Core Module (`@angular-monorepo/core`)
- **AuthService**: Token-based authentication with signals
- **ApiService**: HTTP client abstraction with CRUD operations
- **NotificationService**: Toast notifications
- **Interceptors**: Auth token, error handling, logging

### 2. Shared Module (`@angular-monorepo/shared`)
- **DateUtils**: Date formatting and manipulation
- **ValidationUtils**: Form validation validators
- **ObjectUtils**: Object manipulation utilities
- **Constants**: App-wide constants and error messages

### 3. UI Components (`@angular-monorepo/ui-components`)

#### Available Components:
1. **TextInputComponent** - Configurable text input
2. **TextareaComponent** - Multi-line text input
3. **SingleSelectComponent** - Searchable single select
4. **MultiSelectComponent** - Multi-select with select-all
5. **DatePickerComponent** - Date picker with range support
6. **CheckboxComponent** - Material checkbox
7. **RadioButtonComponent** - Radio button group
8. **ToggleComponent** - Yes/No toggle
9. **FileUploadComponent** - File upload with preview/download
10. **TabGroupComponent** - Tabbed interface
11. **DialogComponent** - Modal dialog
12. **SuccessPopupComponent** - Success notification
13. **FailurePopupComponent** - Error notification

### 4. Dynamic Form Engine (`@angular-monorepo/dynamic-form`)

#### Features:
- JSON-based form configuration
- Nested object binding (e.g., `moreInfo.address.pin`)
- Validation rules (required, min/max, pattern)
- Conditional field visibility
- Async data loading for dropdowns
- Theme configuration
- Multi-column layouts

#### Usage:
```typescript
import { DynamicFormComponent, FormConfig } from '@angular-monorepo/dynamic-form';

const config: FormConfig = {
  sections: [
    {
      title: 'Personal Info',
      columns: 2,
      fields: [
        {
          key: 'firstName',
          label: 'First Name',
          type: 'text',
          validations: [
            { type: 'required', message: 'Required' }
          ]
        }
      ]
    }
  ],
  showReset: true,
  submitLabel: 'Save'
};
```

### 5. Dynamic Table Engine (`@angular-monorepo/dynamic-table`)

#### Features:
- Config-driven column configuration
- Sorting, filtering, pagination
- Row selection (single/multi)
- Inline editing
- Custom cell rendering
- Row actions
- Nested data binding

#### Usage:
```typescript
import { DynamicTableComponent, TableConfig } from '@angular-monorepo/dynamic-table';

const config: TableConfig = {
  columns: [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', filterable: true },
  ],
  sortable: true,
  filterable: true,
  paginated: true,
  rowActions: [
    { label: 'Edit', icon: 'edit', action: 'edit' }
  ]
};
```

## Getting Started

### Prerequisites
- Node.js >= 18
- npm >= 9

### Installation
```bash
# Install dependencies
npm install

# Build all libraries
nx build core shared ui-components dynamic-form dynamic-table

# Run demo app
nx serve demo-app
```

### Building Libraries
```bash
# Build all libraries
nx run-many --target=build

# Build specific library
nx build ui-components
```

## Component Usage Examples

### Text Input
```html
<lib-text-input
  label="Username"
  placeholder="Enter username"
  [disabled]="false">
</lib-text-input>
```

### Single Select with Search
```html
<lib-single-select
  label="Country"
  [options]="countries"
  [searchable]="true">
</lib-single-select>
```

### Date Range Picker
```html
<lib-date-picker
  [rangeMode]="true"
  startLabel="From"
  endLabel="To"
  format="DD-MMMM-YYYY">
</lib-date-picker>
```

### Dynamic Form
```html
<lib-dynamic-form
  [config]="formConfig"
  (formSubmit)="onSubmit($event)">
</lib-dynamic-form>
```

### Dynamic Table
```html
<lib-dynamic-table
  [config]="tableConfig"
  [data]="tableData"
  (rowAction)="onAction($event)">
</lib-dynamic-table>
```

## Form Configuration

### Field Types
- `text`, `email`, `password`, `number`
- `textarea`, `select`, `multi-select`
- `date`, `date-range`
- `checkbox`, `radio`, `toggle`
- `file`, `hidden`

### Validation Rules
```typescript
validations: [
  { type: 'required', message: 'Required' },
  { type: 'email', message: 'Invalid email' },
  { type: 'minLength', value: 3, message: 'Too short' },
  { type: 'maxLength', value: 50, message: 'Too long' },
  { type: 'pattern', value: '^[A-Z]', message: 'Must start with capital' }
]
```

### Conditional Logic
```typescript
conditions: [
  {
    field: 'role',
    operator: 'equals',
    value: 'admin',
    action: 'show' // 'show' | 'hide' | 'enable' | 'disable'
  }
]
```

## Table Configuration

### Column Options
```typescript
{
  key: 'name',
  label: 'Full Name',
  type: 'text', // 'text' | 'number' | 'date' | 'boolean'
  sortable: true,
  filterable: true,
  visible: true,
  align: 'left', // 'left' | 'center' | 'right'
  transform: (value, row) => value.toUpperCase(),
  cellStyle: { color: 'red' },
  editable: true
}
```

### Row Actions
```typescript
rowActions: [
  {
    label: 'Edit',
    icon: 'edit',
    color: 'primary',
    action: 'edit' // or (row) => console.log(row)
  }
]
```

## Best Practices

### 1. Component Design
- Use standalone components
- Implement ControlValueAccessor for form controls
- Use signals for reactive state
- Follow single responsibility principle

### 2. Form Engine
- Define validation rules in config
- Use conditional logic sparingly
- Flatten nested objects for API compatibility
- Handle async options loading

### 3. Table Engine
- Configure columns declaratively
- Use templates for custom rendering
- Implement proper sorting/filtering logic
- Handle pagination on server for large datasets

### 4. Performance
- Lazy load modules
- Use OnPush change detection
- Virtualize long lists
- Debounce search inputs

## Testing

```bash
# Run all tests
nx test

# Run tests for specific library
nx test ui-components
nx test dynamic-form
```

## License

MIT
