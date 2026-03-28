# UI Components Library

Complete documentation for all reusable UI components built with Angular Material.

## Installation

Import individual components as needed:

```typescript
import { TextInputComponent } from '@angular-monorepo/ui-components';
```

## Components

### 1. Text Input Component

**Selector:** `lib-text-input`

**Inputs:**
- `label` - Field label
- `placeholder` - Placeholder text
- `type` - Input type (text, email, password, number)
- `disabled` - Disable the input
- `readonly` - Make input read-only
- `icon` - Material icon to show
- `appearance` - Material appearance style

**Usage:**
```html
<lib-text-input
  label="Email"
  type="email"
  placeholder="Enter email"
  [disabled]="false">
</lib-text-input>
```

---

### 2. Textarea Component

**Selector:** `lib-textarea`

**Inputs:**
- `label` - Field label
- `placeholder` - Placeholder text
- `rows` - Number of visible rows (default: 3)
- `disabled` - Disable the textarea
- `readonly` - Make textarea read-only
- `appearance` - Material appearance style

**Usage:**
```html
<lib-textarea
  label="Description"
  [rows]="5"
  placeholder="Enter description">
</lib-textarea>
```

---

### 3. Single Select Component

**Selector:** `lib-single-select`

**Inputs:**
- `label` - Field label
- `options` - Array of `SelectOption`
- `searchable` - Enable search filter
- `searchPlaceholder` - Placeholder for search
- `disabled` - Disable the select
- `appearance` - Material appearance style
- `asyncData` - Async data source

**SelectOption Interface:**
```typescript
interface SelectOption {
  label: string;
  value: any;
  disabled?: boolean;
  group?: string;
  description?: string;
}
```

**Usage:**
```html
<lib-single-select
  label="Country"
  [options]="countries"
  [searchable]="true">
</lib-single-select>
```

---

### 4. Multi-Select Component

**Selector:** `lib-multi-select`

**Inputs:**
- `label` - Field label
- `options` - Array of `SelectOption`
- `searchable` - Enable search filter
- `showSelectAll` - Show select all option
- `showCount` - Show selected count
- `maxSelections` - Limit number of selections
- `disabled` - Disable the select

**Usage:**
```html
<lib-multi-select
  label="Skills"
  [options]="skills"
  [showSelectAll]="true"
  [maxSelections]="5">
</lib-multi-select>
```

---

### 5. Date Picker Component

**Selector:** `lib-date-picker`

**Inputs:**
- `label` - Field label (for single mode)
- `startLabel` - Label for start date (range mode)
- `endLabel` - Label for end date (range mode)
- `rangeMode` - Enable date range selection
- `minDate` - Minimum selectable date
- `maxDate` - Maximum selectable date
- `format` - Date format string (default: 'DD-MMMM-YYYY')
- `disabled` - Disable the picker

**Usage:**
```html
<!-- Single Date -->
<lib-date-picker
  label="Birth Date"
  [minDate]="minDate"
  [maxDate]="maxDate">
</lib-date-picker>

<!-- Date Range -->
<lib-date-picker
  [rangeMode]="true"
  startLabel="From"
  endLabel="To">
</lib-date-picker>
```

---

### 6. Checkbox Component

**Selector:** `lib-checkbox`

**Inputs:**
- `label` - Checkbox label
- `disabled` - Disable the checkbox
- `color` - Material color (primary, accent, warn)

**Usage:**
```html
<lib-checkbox
  label="I agree to terms"
  [disabled]="false">
</lib-checkbox>
```

---

### 7. Radio Button Component

**Selector:** `lib-radio-button`

**Inputs:**
- `options` - Array of `SelectOption`
- `disabled` - Disable all radio buttons
- `color` - Material color

**Usage:**
```html
<lib-radio-button
  [options]="genderOptions">
</lib-radio-button>
```

---

### 8. Toggle Component

**Selector:** `lib-toggle`

**Inputs:**
- `label` - Toggle label
- `disabled` - Disable the toggle
- `color` - Material color

**Usage:**
```html
<lib-toggle
  label="Enable notifications"
  [color]="'primary'">
</lib-toggle>
```

---

### 9. File Upload Component

**Selector:** `lib-file-upload`

**Inputs:**
- `config` - File upload configuration
- `disabled` - Disable the uploader

**FileUploadConfig:**
```typescript
interface FileUploadConfig {
  accept?: string;           // File MIME types
  maxSize?: number;          // Max file size in bytes
  multiple?: boolean;         // Allow multiple files
  showPreview?: boolean;     // Show file preview
  showDownload?: boolean;    // Show download button
  editable?: boolean;         // Allow editing/replacing
}
```

**Usage:**
```html
<lib-file-upload
  [config]="{
    accept: 'image/*,.pdf',
    maxSize: 5242880,
    showPreview: true,
    editable: true
  }">
</lib-file-upload>
```

---

### 10. Tab Group Component

**Selector:** `lib-tab-group`

**Inputs:**
- `tabs` - Array of tab configurations
- `selectedIndex` - Currently selected tab index
- `animationDuration` - Tab animation duration
- `headerPosition` - Header position (above/below)

**TabItem Interface:**
```typescript
interface TabItem {
  label: string;
  icon?: string;
  disabled?: boolean;
  content?: any;
  template?: TemplateRef<any>;
}
```

**Outputs:**
- `tabChanged` - Emits selected tab index

**Usage:**
```html
<lib-tab-group
  [tabs]="tabs"
  [selectedIndex]="0"
  (tabChanged)="onTabChange($event)">
</lib-tab-group>
```

---

### 11. Dialog Component

**Selector:** `lib-dialog`

**DialogConfig:**
```typescript
interface DialogConfig {
  title: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  width?: string;
  disableClose?: boolean;
}
```

**Usage:**
```typescript
const dialogRef = this.dialog.open(DialogComponent, {
  data: {
    title: 'Confirm Action',
    message: 'Are you sure?',
    confirmText: 'Yes',
    cancelText: 'No'
  }
});
```

---

### 12. Success Popup Component

**Selector:** `lib-success-popup`

**SuccessPopupConfig:**
```typescript
interface SuccessPopupConfig {
  title: string;
  message?: string;
  icon?: string;
  buttons?: ActionButton[];
  autoClose?: boolean;
  autoCloseDuration?: number;
}
```

**Usage:**
```typescript
this.dialog.open(SuccessPopupComponent, {
  data: {
    title: 'Success!',
    message: 'Your action was completed.',
    autoClose: true,
    autoCloseDuration: 3000
  }
});
```

---

### 13. Failure Popup Component

**Selector:** `lib-failure-popup`

**FailurePopupConfig:**
```typescript
interface FailurePopupConfig {
  title: string;
  message?: string;
  icon?: string;
  buttons?: ActionButton[];
  allowSideClose?: boolean;
  autoClose?: boolean;
  autoCloseDuration?: number;
}
```

**Usage:**
```typescript
this.dialog.open(FailurePopupComponent, {
  data: {
    title: 'Error',
    message: 'Something went wrong.',
    allowSideClose: true,
    buttons: [
      { label: 'Retry', action: 'retry', color: 'primary' },
      { label: 'Cancel', action: 'cancel', color: 'warn' }
    ]
  }
});
```

---

## Control Value Accessor

All form components implement `ControlValueAccessor`, making them compatible with Reactive Forms:

```typescript
// Example with FormGroup
this.form = this.fb.group({
  name: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]]
});
```

```html
<form [formGroup]="form">
  <lib-text-input formControlName="name" label="Name"></lib-text-input>
  <lib-text-input formControlName="email" label="Email" type="email"></lib-text-input>
</form>
```

---

## Best Practices

1. **Use Standalone Components:** All components are standalone for tree-shaking
2. **Material Appearance:** Use consistent appearance across all form fields
3. **Validation:** Always provide clear error messages
4. **Accessibility:** Components support ARIA attributes automatically
5. **Lazy Loading:** Import components only where needed
