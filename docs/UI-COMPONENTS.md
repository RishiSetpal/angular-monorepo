# UI Components Library

Complete documentation for all reusable UI components built with Angular Material.

## Installation

Import individual components as needed:

```typescript
import { TextInputComponent } from '@org/ui-components';
```

Or import all components:

```typescript
import { 
  TextInputComponent, 
  TextareaComponent, 
  SingleSelectComponent, 
  MultiSelectComponent,
  DatePickerComponent,
  CheckboxComponent,
  RadioButtonComponent,
  ToggleComponent,
  FileUploadComponent,
  DialogComponent,
  SuccessPopupComponent,
  FailurePopupComponent,
  TabGroupComponent
} from '@org/ui-components';
```

---

## Components

### 1. Text Input Component

**Selector:** `lib-text-input`

**Inputs:**
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `label` | string | '' | Field label |
| `placeholder` | string | '' | Placeholder text |
| `type` | string | 'text' | Input type (text, email, password, number) |
| `disabled` | boolean | false | Disable the input |
| `readonly` | boolean | false | Make input read-only |
| `icon` | string | '' | Material icon to show |
| `appearance` | 'fill' \| 'outline' | 'outline' | Material appearance style |

**Outputs:**
- `valueChange` - Emits when value changes

**Usage:**

```typescript
// Basic usage
<lib-text-input
  label="Email"
  type="email"
  placeholder="Enter email"
  icon="email">
</lib-text-input>

// With reactive form
<lib-text-input
  formControlName="email"
  label="Email"
  type="email"
  icon="email">
</lib-text-input>
```

```typescript
// Component code
@Component({...})
export class ExampleComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
}
```

---

### 2. Textarea Component

**Selector:** `lib-textarea`

**Inputs:**
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `label` | string | '' | Field label |
| `placeholder` | string | '' | Placeholder text |
| `rows` | number | 3 | Number of visible rows |
| `disabled` | boolean | false | Disable the textarea |
| `readonly` | boolean | false | Make textarea read-only |
| `appearance` | 'fill' \| 'outline' | 'outline' | Material appearance style |

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
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `label` | string | '' | Field label |
| `options` | SelectOption[] | [] | Array of options |
| `searchable` | boolean | false | Enable search filter |
| `searchPlaceholder` | string | 'Search...' | Search placeholder |
| `disabled` | boolean | false | Disable the select |
| `appearance` | 'fill' \| 'outline' | 'outline' | Material appearance style |
| `asyncData` | SelectOption[] | null | Async data source |

**SelectOption Interface:**
```typescript
interface SelectOption {
  label: string;       // Display text
  value: any;         // Value to submit
  disabled?: boolean;  // Disable this option
  group?: string;      // Option group
  description?: string; // Additional description
}
```

**Usage:**

```typescript
// Define options
countries = [
  { label: 'United States', value: 'us' },
  { label: 'Canada', value: 'ca' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'India', value: 'in' }
];
```

```html
<!-- Basic single select -->
<lib-single-select
  label="Country"
  [options]="countries">
</lib-single-select>

<!-- Searchable single select -->
<lib-single-select
  label="Country"
  [options]="countries"
  [searchable]="true"
  searchPlaceholder="Search country...">
</lib-single-select>
```

---

### 4. Multi-Select Component

**Selector:** `lib-multi-select`

**Inputs:**
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `label` | string | '' | Field label |
| `options` | SelectOption[] | [] | Array of options |
| `searchable` | boolean | false | Enable search filter |
| `showSelectAll` | boolean | false | Show select all option |
| `showCount` | boolean | true | Show selected count |
| `maxSelections` | number | undefined | Limit number of selections |
| `disabled` | boolean | false | Disable the select |
| `appearance` | 'fill' \| 'outline' | 'outline' | Material appearance style |

**Usage:**

```typescript
// Define options
skills = [
  { label: 'Angular', value: 'angular' },
  { label: 'React', value: 'react' },
  { label: 'Vue.js', value: 'vue' },
  { label: 'TypeScript', value: 'ts' },
  { label: 'JavaScript', value: 'js' },
  { label: 'Node.js', value: 'node' }
];
```

```html
<!-- Basic multi-select -->
<lib-multi-select
  label="Skills"
  [options]="skills">
</lib-multi-select>

<!-- Multi-select with select all -->
<lib-multi-select
  label="Skills"
  [options]="skills"
  [showSelectAll]="true"
  [showCount]="true">
</lib-multi-select>

<!-- With max selections -->
<lib-multi-select
  label="Skills"
  [options]="skills"
  [showSelectAll]="true"
  [maxSelections]="3">
</lib-multi-select>
```

---

### 5. Date Picker Component

**Selector:** `lib-date-picker`

**Inputs:**
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `label` | string | '' | Field label (single mode) |
| `startLabel` | string | 'From' | Label for start date (range mode) |
| `endLabel` | string | 'To' | Label for end date (range mode) |
| `rangeMode` | boolean | false | Enable date range selection |
| `minDate` | Date | undefined | Minimum selectable date |
| `maxDate` | Date | undefined | Maximum selectable date |
| `format` | string | 'DD-MMM-YYYY' | Date format string |
| `disabled` | boolean | false | Disable the picker |
| `appearance` | 'fill' \| 'outline' | 'outline' | Material appearance style |
| `placeholder` | string | 'DD-MMM-YYYY' | Input placeholder |
| `strictValidation` | boolean | true | Enable strict date validation |

**Outputs:**
- `dateInvalid` - Emits when invalid date is entered

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
  label="Project Duration"
  [rangeMode]="true"
  startLabel="Start Date"
  endLabel="End Date">
</lib-date-picker>
```

```typescript
// Component code
@Component({...})
export class ExampleComponent {
  minDate = new Date(2020, 0, 1);
  maxDate = new Date(2030, 11, 31);
  
  // For range mode, the value is an array
  dateRange: string[] = [];
}
```

---

### 6. Checkbox Component

**Selector:** `lib-checkbox`

**Inputs:**
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `label` | string | '' | Checkbox label |
| `disabled` | boolean | false | Disable the checkbox |
| `color` | 'primary' \| 'accent' \| 'warn' | 'primary' | Material color |

**Usage:**

```html
<lib-checkbox
  label="I agree to terms and conditions"
  [disabled]="false">
</lib-checkbox>

<lib-checkbox
  label="Subscribe to newsletter"
  color="accent">
</lib-checkbox>
```

---

### 7. Radio Button Component

**Selector:** `lib-radio-button`

**Inputs:**
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `options` | SelectOption[] | [] | Array of radio options |
| `disabled` | boolean | false | Disable all radio buttons |
| `color` | 'primary' \| 'accent' \| 'warn' | 'primary' | Material color |

**Usage:**

```typescript
genderOptions = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' }
];
```

```html
<lib-radio-button
  [options]="genderOptions">
</lib-radio-button>
```

---

### 8. Toggle Component

**Selector:** `lib-toggle`

**Inputs:**
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `label` | string | '' | Toggle label |
| `disabled` | boolean | false | Disable the toggle |
| `color` | 'primary' \| 'accent' \| 'warn' | 'primary' | Material color |

**Usage:**

```html
<lib-toggle
  label="Enable notifications"
  color="primary">
</lib-toggle>

<lib-toggle
  label="Dark Mode"
  color="accent">
</lib-toggle>
```

---

### 9. File Upload Component

**Selector:** `lib-file-upload`

**Inputs:**
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `config` | FileUploadConfig | {} | File upload configuration |
| `disabled` | boolean | false | Disable the uploader |

**FileUploadConfig:**
```typescript
interface FileUploadConfig {
  accept?: string;           // File MIME types (e.g., 'image/*,.pdf')
  maxSize?: number;          // Max file size in bytes
  multiple?: boolean;        // Allow multiple files
  showPreview?: boolean;     // Show file preview
  showDownload?: boolean;    // Show download button
  editable?: boolean;        // Allow editing/replacing
}
```

**Outputs:**
- `fileChange` - Emits selected file(s)
- `filePreview` - Emits file for preview

**Usage:**

```typescript
// Single file upload config
singleFileConfig = {
  accept: '*',
  maxSize: 10 * 1024 * 1024, // 10MB
  multiple: false,
  showPreview: true,
  showDownload: true,
  editable: true,
};

// Multiple file upload config
multipleFileConfig = {
  accept: 'image/*,.pdf,.doc,.docx',
  maxSize: 25 * 1024 * 1024, // 25MB
  multiple: true,
  showPreview: true,
  showDownload: true,
  editable: true,
};

// Document upload (PDF, Word, Excel)
documentConfig = {
  accept: '.pdf,.doc,.docx,.xls,.xlsx',
  maxSize: 25 * 1024 * 1024,
  multiple: false,
  showPreview: true,
  showDownload: true,
  editable: true,
};
```

```html
<!-- Single File Upload -->
<lib-file-upload
  [config]="singleFileConfig"
  (fileChange)="onFileSelected($event)">
</lib-file-upload>

<!-- Multiple File Upload -->
<lib-file-upload
  [config]="multipleFileConfig"
  (fileChange)="onFilesSelected($event)"
  (filePreview)="onPreviewFile($event)">
</lib-file-upload>
```

---

### 10. Tab Group Component

**Selector:** `lib-tab-group`

**Inputs:**
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `tabs` | TabItem[] | [] | Array of tab configurations |
| `selectedIndex` | number | 0 | Currently selected tab index |
| `animationDuration` | string | '500ms' | Tab animation duration |
| `headerPosition` | 'above' \| 'below' | 'above' | Header position |

**TabItem Interface:**
```typescript
interface TabItem {
  label: string;                    // Tab label
  icon?: string;                    // Material icon
  disabled?: boolean;               // Disable tab
  content?: any;                    // Tab content
  template?: TemplateRef<any>;       // Custom template
}
```

**Outputs:**
- `tabChanged` - Emits selected tab index

**Usage:**

```typescript
demoTabs = [
  { label: 'Tab 1', icon: 'home', content: 'Content for Tab 1' },
  { label: 'Tab 2', icon: 'settings', content: 'Content for Tab 2' },
  { label: 'Tab 3', icon: 'info', content: 'Content for Tab 3' },
];
```

```html
<lib-tab-group
  [tabs]="demoTabs"
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
  title: string;           // Dialog title
  message?: string;        // Dialog message
  confirmText?: string;    // Confirm button text
  cancelText?: string;      // Cancel button text
  width?: string;          // Dialog width (e.g., '500px')
  disableClose?: boolean;  // Disable close on backdrop click
  htmlContent?: boolean;    // Allow HTML in message
}
```

**Usage:**

```typescript
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@org/ui-components';

constructor(private dialog: MatDialog) {}

openDialog() {
  const dialogRef = this.dialog.open(DialogComponent, {
    data: {
      title: 'Confirm Action',
      message: 'Are you sure you want to proceed?',
      confirmText: 'Yes',
      cancelText: 'No'
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('Dialog result:', result);
  });
}

// With HTML content
openPreviewDialog(file: any) {
  this.dialog.open(DialogComponent, {
    data: {
      title: `Preview: ${file.name}`,
      message: `<iframe src="${file.url}" style="width: 100%; height: 500px;"></iframe>`,
      confirmText: 'Download',
      cancelText: 'Close',
      htmlContent: true,
      width: '800px'
    }
  });
}
```

---

### 12. Success Popup Component

**Selector:** `lib-success-popup`

**SuccessPopupConfig:**
```typescript
interface SuccessPopupConfig {
  title: string;                    // Popup title
  message?: string;                 // Success message
  icon?: string;                    // Material icon (default: 'check_circle')
  buttons?: ActionButton[];          // Custom buttons
  autoClose?: boolean;             // Auto close popup
  autoCloseDuration?: number;       // Close after X milliseconds
}
```

**Usage:**

```typescript
import { MatDialog } from '@angular/material/dialog';
import { SuccessPopupComponent } from '@org/ui-components';

constructor(private dialog: MatDialog) {}

// Basic success popup
this.dialog.open(SuccessPopupComponent, {
  data: {
    title: 'Success!',
    message: 'Your changes have been saved.',
    icon: 'check_circle'
  }
});

// With auto-close
this.dialog.open(SuccessPopupComponent, {
  data: {
    title: 'Saved',
    message: 'Data saved successfully.',
    autoClose: true,
    autoCloseDuration: 3000  // 3 seconds
  }
});

// With custom buttons
this.dialog.open(SuccessPopupComponent, {
  data: {
    title: 'Operation Complete',
    message: 'What would you like to do next?',
    buttons: [
      { label: 'View Details', action: 'view', color: 'primary' },
      { label: 'Close', action: 'close', color: 'basic' }
    ]
  }
});
```

---

### 13. Failure Popup Component

**Selector:** `lib-failure-popup`

**FailurePopupConfig:**
```typescript
interface FailurePopupConfig {
  title: string;                    // Popup title
  message?: string;                 // Error message
  icon?: string;                    // Material icon (default: 'error')
  buttons?: ActionButton[];         // Custom buttons
  allowSideClose?: boolean;         // Allow closing by clicking backdrop
  autoClose?: boolean;              // Auto close popup
  autoCloseDuration?: number;       // Close after X milliseconds
}
```

**Usage:**

```typescript
import { MatDialog } from '@angular/material/dialog';
import { FailurePopupComponent } from '@org/ui-components';

constructor(private dialog: MatDialog) {}

// Basic error popup
this.dialog.open(FailurePopupComponent, {
  data: {
    title: 'Error',
    message: 'Something went wrong. Please try again.',
    icon: 'error'
  }
});

// With actions
this.dialog.open(FailurePopupComponent, {
  data: {
    title: 'Delete Confirmation',
    message: 'Are you sure you want to delete this item?',
    icon: 'warning',
    allowSideClose: true,
    buttons: [
      { label: 'Delete', action: 'delete', color: 'warn' },
      { label: 'Cancel', action: 'cancel', color: 'basic' }
    ]
  }
});
```

---

## Control Value Accessor

All form components implement `ControlValueAccessor`, making them fully compatible with Angular Reactive Forms:

### FormGroup Example

```typescript
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({...})
export class ExampleComponent {
  constructor(private fb: FormBuilder) {}

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    description: [''],
    country: [''],
    skills: [[]],
    birthDate: [null],
    termsAccepted: [false],
    gender: ['male']
  });

  onSubmit() {
    console.log('Form value:', this.form.value);
  }
}
```

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <lib-text-input
    formControlName="name"
    label="Full Name"
    icon="person">
  </lib-text-input>

  <lib-text-input
    formControlName="email"
    label="Email"
    type="email"
    icon="email">
  </lib-text-input>

  <lib-textarea
    formControlName="description"
    label="Description"
    [rows]="4">
  </lib-textarea>

  <lib-single-select
    formControlName="country"
    label="Country"
    [options]="countries"
    [searchable]="true">
  </lib-single-select>

  <lib-multi-select
    formControlName="skills"
    label="Skills"
    [options]="skills"
    [showSelectAll]="true">
  </lib-multi-select>

  <lib-date-picker
    formControlName="birthDate"
    label="Birth Date">
  </lib-date-picker>

  <lib-checkbox
    formControlName="termsAccepted"
    label="I agree to terms">
  </lib-checkbox>

  <lib-radio-button
    formControlName="gender"
    [options]="genderOptions">
  </lib-radio-button>

  <button mat-raised-button color="primary" type="submit">
    Submit
  </button>
</form>
```

---

## Form Integration: Reactive Forms vs Template-Driven

### Which to Use? (Industry Standard)

**Reactive Forms ✅ RECOMMENDED** - Industry standard for Angular enterprise applications

| Scenario | Recommended |
|----------|-------------|
| Complex forms | Reactive Forms |
| Dynamic fields | Reactive Forms |
| Large applications | Reactive Forms |
| Enterprise apps | Reactive Forms |
| Simple forms (login, search) | Template-Driven OK |

### Why Reactive Forms?

1. **Centralized validation** - All validation in one place
2. **Unit testable** - Easy to test form logic
3. **Type safe** - Full TypeScript support
4. **Scalable** - Works great with large forms
5. **Industry standard** - Used in most Angular enterprise apps

### Reactive Forms Example

```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <lib-text-input 
        formControlName="name" 
        label="Full Name"
        icon="person">
      </lib-text-input>

      <lib-text-input 
        formControlName="email" 
        label="Email"
        type="email">
      </lib-text-input>

      <lib-single-select 
        formControlName="country" 
        label="Country"
        [options]="countries"
        [searchable]="true">
      </lib-single-select>

      <lib-multi-select 
        formControlName="skills" 
        label="Skills"
        [options]="skills"
        [showSelectAll]="true">
      </lib-multi-select>

      <lib-date-picker 
        formControlName="birthDate" 
        label="Birth Date">
      </lib-date-picker>

      <lib-checkbox 
        formControlName="terms" 
        label="I agree to terms">
      </lib-checkbox>

      <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">
        Submit
      </button>
    </form>
  `
})
export class UserFormComponent {
  countries = [
    { label: 'United States', value: 'us' },
    { label: 'Canada', value: 'ca' },
    { label: 'United Kingdom', value: 'uk' }
  ];

  skills = [
    { label: 'Angular', value: 'angular' },
    { label: 'React', value: 'react' },
    { label: 'TypeScript', value: 'ts' },
    { label: 'Node.js', value: 'node' }
  ];

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      country: [''],
      skills: [[]],
      birthDate: [null],
      terms: [false, Validators.requiredTrue]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form data:', this.form.value);
      // { name: '', email: '', country: '', skills: [], birthDate: null, terms: false }
    }
  }
}
```

### Template-Driven Example (Simple Forms Only)

```typescript
@Component({
  template: `
    <form #simpleForm="ngForm">
      <lib-text-input 
        [(ngModel)]="user.name" 
        name="name"
        label="Name">
      </lib-text-input>

      <lib-checkbox 
        [(ngModel)]="user.agreed" 
        name="agreed"
        label="I agree">
      </lib-checkbox>
    </form>
  `
})
export class SimpleFormComponent {
  user = { name: '', agreed: false };
}
```

---

## Best Practices

1. **Use Standalone Components:** All components are standalone for tree-shaking - import only what you need

2. **Use Reactive Forms:** Industry standard for enterprise Angular applications

3. **Material Appearance:** Use consistent appearance across all form fields
   ```html
   <lib-text-input appearance="outline" ...></lib-text-input>
   ```

4. **Validation:** Always provide clear error messages with reactive forms
   ```typescript
   email: ['', [Validators.required, Validators.email]]
   ```

5. **Accessibility:** Components support ARIA attributes automatically

6. **Lazy Loading:** Import components only where needed for better performance

7. **Type Safety:** Use proper TypeScript types for options and configs

8. **Error Handling:** Use FailurePopupComponent for user-facing errors

9. **User Feedback:** Use SuccessPopupComponent with autoClose for quick notifications

---

## Integration Example

### Saving Form Data to API

```typescript
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { SuccessPopupComponent, FailurePopupComponent } from '@org/ui-components';

@Component({...})
export class ExampleComponent {
  constructor(
    private http: HttpClient,
    private dialog: MatDialog
  ) {}

  onFormSubmit(data: any): void {
    // Save to API
    this.http.post('/api/forms/submit', data).subscribe({
      next: () => {
        this.dialog.open(SuccessPopupComponent, {
          data: {
            title: 'Success!',
            message: 'Form saved successfully.',
            autoClose: true,
            autoCloseDuration: 3000
          }
        });
      },
      error: () => {
        this.dialog.open(FailurePopupComponent, {
          data: {
            title: 'Error',
            message: 'Failed to save form. Please try again.'
          }
        });
      }
    });
  }
}
```

### Saving Table Data to API

```typescript
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({...})
export class ExampleComponent {
  constructor(private http: HttpClient) {}

  onCellEdit(event: { row: any; column: any; value: any }): void {
    event.row[event.column.key] = event.value;
    
    this.http.put(`/api/items/${event.row.id}`, event.row).subscribe({
      next: () => console.log('Updated'),
      error: (err) => console.error('Update failed', err)
    });
  }

  onRowAction(event: { action: any; row: any }): void {
    switch (event.action.action) {
      case 'edit':
        this.http.post(`/api/items/${event.row.id}/edit`, event.row).subscribe();
        break;
      case 'delete':
        this.http.delete(`/api/items/${event.row.id}`).subscribe();
        break;
    }
  }
}
```
