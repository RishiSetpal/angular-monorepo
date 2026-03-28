import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DynamicFormComponent, FormConfig } from '@org/dynamic-form';
import { DynamicTableComponent, TableConfig } from '@org/dynamic-table';
import { SuccessPopupComponent } from '@org/ui-components';
import { FailurePopupComponent } from '@org/ui-components';
import { DialogComponent } from '@org/ui-components';
import { 
  TextInputComponent, 
  TextareaComponent, 
  SingleSelectComponent, 
  MultiSelectComponent,
  DatePickerComponent,
  CheckboxComponent,
  RadioButtonComponent,
  ToggleComponent,
  TabGroupComponent,
  FileUploadComponent
} from '@org/ui-components';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    DynamicFormComponent,
    DynamicTableComponent,
    TextInputComponent,
    TextareaComponent,
    SingleSelectComponent,
    MultiSelectComponent,
    DatePickerComponent,
    CheckboxComponent,
    RadioButtonComponent,
    ToggleComponent,
    TabGroupComponent,
    FileUploadComponent,
  ],
  template: `
    <div class="demo-container">
      <header class="demo-header">
        <h1>Angular Monorepo UI Library</h1>
        <p>Production-grade reusable components, Dynamic Form & Table engines</p>
      </header>

      <mat-tab-group animationDuration="500ms">
        <!-- UI COMPONENTS TAB -->
        <mat-tab label="UI Components">
          <div class="tab-content">
            <h2>Reusable UI Components</h2>
            <div class="components-grid">
              <!-- Text Input -->
              <mat-card class="component-card">
                <mat-card-header><mat-card-title>Text Input</mat-card-title></mat-card-header>
                <mat-card-content>
                  <lib-text-input 
                    label="Username" 
                    placeholder="Enter username"
                    icon="person">
                  </lib-text-input>
                </mat-card-content>
              </mat-card>

              <!-- Textarea -->
              <mat-card class="component-card">
                <mat-card-header><mat-card-title>Textarea</mat-card-title></mat-card-header>
                <mat-card-content>
                  <lib-textarea 
                    label="Description" 
                    placeholder="Enter description"
                    [rows]="4">
                  </lib-textarea>
                </mat-card-content>
              </mat-card>

              <!-- Single Select -->
              <mat-card class="component-card">
                <mat-card-header><mat-card-title>Single Select</mat-card-title></mat-card-header>
                <mat-card-content>
                  <lib-single-select 
                    label="Country" 
                    [options]="countryOptions" 
                    [searchable]="true"
                    placeholder="Select country">
                  </lib-single-select>
                </mat-card-content>
              </mat-card>

              <!-- Multi Select -->
              <mat-card class="component-card">
                <mat-card-header><mat-card-title>Multi Select</mat-card-title></mat-card-header>
                <mat-card-content>
                  <lib-multi-select 
                    label="Skills" 
                    [options]="skillOptions" 
                    [showSelectAll]="true"
                    [maxSelections]="3">
                  </lib-multi-select>
                </mat-card-content>
              </mat-card>

              <!-- Date Picker -->
              <mat-card class="component-card">
                <mat-card-header><mat-card-title>Single Date</mat-card-title></mat-card-header>
                <mat-card-content>
                  <lib-date-picker label="Select Date"></lib-date-picker>
                </mat-card-content>
              </mat-card>

              <!-- Date Range Picker -->
              <mat-card class="component-card">
                <mat-card-header><mat-card-title>Date Range</mat-card-title></mat-card-header>
                <mat-card-content>
                  <lib-date-picker 
                    label="Select Range" 
                    [rangeMode]="true"
                    startLabel="From" 
                    endLabel="To">
                  </lib-date-picker>
                </mat-card-content>
              </mat-card>

              <!-- Checkbox -->
              <mat-card class="component-card">
                <mat-card-header><mat-card-title>Checkbox</mat-card-title></mat-card-header>
                <mat-card-content>
                  <lib-checkbox label="I agree to terms and conditions"></lib-checkbox>
                  <lib-checkbox label="Subscribe to newsletter" color="accent"></lib-checkbox>
                </mat-card-content>
              </mat-card>

              <!-- Radio Button -->
              <mat-card class="component-card">
                <mat-card-header><mat-card-title>Radio Button</mat-card-title></mat-card-header>
                <mat-card-content>
                  <lib-radio-button 
                    [options]="genderOptions" 
                    label="Gender">
                  </lib-radio-button>
                </mat-card-content>
              </mat-card>

              <!-- Toggle -->
              <mat-card class="component-card">
                <mat-card-header><mat-card-title>Toggle</mat-card-title></mat-card-header>
                <mat-card-content>
                  <lib-toggle label="Enable notifications"></lib-toggle>
                  <lib-toggle label="Dark mode" color="accent"></lib-toggle>
                </mat-card-content>
              </mat-card>

              <!-- Tab Group -->
              <mat-card class="component-card">
                <mat-card-header><mat-card-title>Tabs</mat-card-title></mat-card-header>
                <mat-card-content>
                  <lib-tab-group [tabs]="demoTabs"></lib-tab-group>
                </mat-card-content>
              </mat-card>

              <!-- Single File Upload -->
              <mat-card class="component-card">
                <mat-card-header><mat-card-title>Single File Upload</mat-card-title></mat-card-header>
                <mat-card-content>
                  <lib-file-upload 
                    #singleUpload
                    [config]="singleFileConfig"
                    (fileChange)="onSingleFileChange($event)"
                    (filePreview)="onFilePreview($event)">
                  </lib-file-upload>
                </mat-card-content>
              </mat-card>

              <!-- Multiple File Upload -->
              <mat-card class="component-card">
                <mat-card-header><mat-card-title>Multiple File Upload</mat-card-title></mat-card-header>
                <mat-card-content>
                  <lib-file-upload 
                    #multipleUpload
                    [config]="multipleFileConfig"
                    (fileChange)="onMultipleFileChange($event)"
                    (filePreview)="onFilePreview($event)">
                  </lib-file-upload>
                </mat-card-content>
              </mat-card>

              <!-- File Upload with Custom Accept -->
              <mat-card class="component-card">
                <mat-card-header><mat-card-title>Document Upload (PDF, Word, Excel)</mat-card-title></mat-card-header>
                <mat-card-content>
                  <lib-file-upload 
                    #documentUpload
                    [config]="documentFileConfig"
                    (fileChange)="onDocumentFileChange($event)"
                    (filePreview)="onFilePreview($event)">
                  </lib-file-upload>
                </mat-card-content>
              </mat-card>
            </div>
          </div>
        </mat-tab>

        <!-- DYNAMIC FORM TAB -->
        <mat-tab label="Dynamic Form">
          <div class="tab-content">
            <h2>Config-Driven Form Engine</h2>
            <lib-dynamic-form 
              [config]="formConfig" 
              [initialValues]="initialFormValues"
              (formSubmit)="onFormSubmit($event)"
              (formChange)="onFormChange($event)">
            </lib-dynamic-form>
          </div>
        </mat-tab>

        <!-- DYNAMIC TABLE TAB -->
        <mat-tab label="Dynamic Table">
          <div class="tab-content">
            <h2>Config-Driven Table Engine</h2>
            <div class="table-actions">
              <button mat-raised-button color="primary" (click)="addNewRow()">
                <mat-icon>add</mat-icon> Add New Row
              </button>
              <button mat-raised-button color="accent" (click)="toggleColumns()">
                <mat-icon>view_column</mat-icon> Toggle Columns
              </button>
              <button mat-raised-button color="warn" (click)="deleteSelectedRows()">
                <mat-icon>delete</mat-icon> Delete Selected
              </button>
            </div>
            <lib-dynamic-table 
              [config]="tableConfig" 
              [data]="tableData"
              (rowAction)="onTableAction($event)"
              (selectionChange)="onSelectionChange($event)"
              (cellEdit)="onCellEdit($event)">
            </lib-dynamic-table>
          </div>
        </mat-tab>

        <!-- ADVANCED TABLE TAB -->
        <mat-tab label="Advanced Table">
          <div class="tab-content">
            <h2>Advanced Table Features</h2>
            <p style="margin-bottom: 16px;">Nested data, conditional styling, attachments, custom rendering</p>
            <lib-dynamic-table 
              [config]="advancedTableConfig" 
              [data]="advancedTableData"
              (rowAction)="onAdvancedTableAction($event)">
            </lib-dynamic-table>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    .demo-container {
      padding: 24px;
      max-width: 1600px;
      margin: 0 auto;
    }
    .demo-header {
      text-align: center;
      margin-bottom: 40px;
    }
    .demo-header h1 {
      font-size: 2.5rem;
      margin-bottom: 8px;
      color: #3f51b5;
    }
    .tab-content {
      padding: 24px 0;
    }
    .components-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 16px;
    }
    .component-card {
      padding: 16px;
    }
    h2 { 
      margin-bottom: 24px;
      color: #333;
    }
    .table-actions {
      display: flex;
      gap: 12px;
      margin-bottom: 16px;
    }
    .table-actions button {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .attachment-badge {
      display: inline-flex;
      align-items: center;
      background: #e3f2fd;
      padding: 2px 8px;
      border-radius: 4px;
      margin: 2px;
      font-size: 12px;
      cursor: pointer;
    }
    .no-attachments {
      color: #999;
      font-style: italic;
    }
  `],
})
export class DemoComponent {
  private dialog = inject(MatDialog);

  // Options data
  countryOptions = [
    { label: 'United States', value: 'us' },
    { label: 'Canada', value: 'ca' },
    { label: 'United Kingdom', value: 'uk' },
    { label: 'India', value: 'in' },
    { label: 'Australia', value: 'au' },
    { label: 'Germany', value: 'de' },
    { label: 'France', value: 'fr' },
  ];

  skillOptions = [
    { label: 'Angular', value: 'angular' },
    { label: 'React', value: 'react' },
    { label: 'Vue.js', value: 'vue' },
    { label: 'TypeScript', value: 'ts' },
    { label: 'JavaScript', value: 'js' },
    { label: 'Node.js', value: 'node' },
    { label: 'Python', value: 'python' },
    { label: 'Java', value: 'java' },
  ];

  statusOptions = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
    { label: 'Pending', value: 'pending' },
    { label: 'Suspended', value: 'suspended' },
  ];

  genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ];

  departmentOptions = [
    { label: 'Engineering', value: 'Engineering' },
    { label: 'Marketing', value: 'Marketing' },
    { label: 'HR', value: 'HR' },
    { label: 'Finance', value: 'Finance' },
    { label: 'Sales', value: 'Sales' },
    { label: 'Operations', value: 'Operations' },
  ];

  getFileIcon(type?: string): string {
    if (!type) return '📄 ';
    if (type.includes('pdf')) return '📕 ';
    if (type.includes('word') || type.includes('document')) return '📘 ';
    if (type.includes('excel') || type.includes('sheet') || type.includes('spreadsheet')) return '📗 ';
    if (type.includes('image')) return '🖼️ ';
    if (type.includes('text')) return '📝 ';
    return '📄 ';
  }

  demoTabs = [
    { label: 'Tab 1', icon: 'home', content: 'Content for Tab 1 - Dashboard' },
    { label: 'Tab 2', icon: 'settings', content: 'Content for Tab 2 - Settings' },
    { label: 'Tab 3', icon: 'info', content: 'Content for Tab 3 - About' },
  ];

  singleFileConfig = {
    accept: '*',
    maxSize: 10 * 1024 * 1024,
    multiple: false,
    showPreview: true,
    showDownload: true,
    editable: true,
  };

  multipleFileConfig = {
    accept: '*',
    maxSize: 10 * 1024 * 1024,
    multiple: true,
    showPreview: true,
    showDownload: true,
    editable: true,
  };

  documentFileConfig = {
    accept: '.pdf,.doc,.docx,.xls,.xlsx',
    maxSize: 25 * 1024 * 1024,
    multiple: false,
    showPreview: true,
    showDownload: true,
    editable: true,
  };

  onSingleFileChange(file: any): void {
    console.log('Single file selected:', file);
    this.dialog.open(SuccessPopupComponent, {
      data: {
        title: 'File Selected',
        message: `File: ${file?.name}\nSize: ${(file?.size / 1024).toFixed(2)} KB\nType: ${file?.type}`,
        icon: 'attach_file'
      }
    });
  }

  onMultipleFileChange(files: any): void {
    console.log('Multiple files selected:', files);
  }

  onDocumentFileChange(file: any): void {
    console.log('Document file selected:', file);
  }

  onFilePreview(file: any): void {
    const fileType = file.type || '';
    const hasUrl = file.url || file.file;
    
    if (!hasUrl) {
      this.dialog.open(FailurePopupComponent, {
        data: {
          title: 'Preview Not Available',
          message: 'File preview is not available. You can still download the file.',
          icon: 'info'
        }
      });
      return;
    }

    let previewContent = '';
    const isImage = fileType.startsWith('image/');
    const isPdf = fileType.includes('pdf');
    const isWord = fileType.includes('word') || fileType.includes('document');
    const isExcel = fileType.includes('excel') || fileType.includes('sheet') || fileType.includes('spreadsheet');
    const url = file.url || URL.createObjectURL(file.file);

    if (isImage) {
      previewContent = `<div style="text-align: center;"><img src="${url}" alt="${file.name}" style="max-width: 100%; max-height: 400px; object-fit: contain;"></div>`;
    } else if (isPdf) {
      previewContent = `<iframe src="${url}" style="width: 100%; height: 500px; border: none;"></iframe>`;
    } else {
      previewContent = `
        <div style="text-align: center; padding: 40px;">
          <mat-icon style="font-size: 64px; width: 64px; height: 64px; color: #666;">
            ${isWord ? 'description' : isExcel ? 'table_chart' : 'insert_drive_file'}
          </mat-icon>
          <p style="margin: 16px 0;">${file.name}</p>
          <p style="color: #666; font-size: 14px;">${this.formatFileSize(file.size)}</p>
        </div>
      `;
    }

    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: `File: ${file.name}`,
        message: previewContent,
        confirmText: 'Download',
        cancelText: 'Close',
        htmlContent: true,
        width: isPdf ? '800px' : '500px'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const link = document.createElement('a');
        link.href = url;
        link.download = file.name;
        link.click();
      }
    });
  }

  formatFileSize(bytes?: number): string {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Form Configuration
  formConfig: FormConfig = {
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
              { type: 'required', message: 'First name is required' },
              { type: 'minLength', value: 2, message: 'Minimum 2 characters required' }
            ],
          },
          {
            key: 'lastName',
            label: 'Last Name',
            type: 'text',
            placeholder: 'Enter last name',
            validations: [
              { type: 'required', message: 'Last name is required' }
            ],
          },
          {
            key: 'email',
            label: 'Email Address',
            type: 'email',
            placeholder: 'Enter email address',
            validations: [
              { type: 'required', message: 'Email is required' },
              { type: 'email', message: 'Please enter a valid email' }
            ],
          },
          {
            key: 'phone',
            label: 'Phone Number',
            type: 'text',
            placeholder: '+1 (555) 000-0000',
          },
        ],
      },
      {
        title: 'Address Information',
        columns: 1,
        fields: [
          {
            key: 'street',
            label: 'Street Address',
            type: 'text',
            placeholder: 'Enter street address',
          },
          {
            key: 'city',
            label: 'City',
            type: 'text',
            placeholder: 'Enter city',
          },
          {
            key: 'country',
            label: 'Country',
            type: 'select',
            placeholder: 'Select country',
            options: this.countryOptions,
          },
          {
            key: 'dateRange',
            label: 'Available From - To',
            type: 'date',
            rangeMode: true,
            startLabel: 'From',
            endLabel: 'To',
          },
        ],
      },
      {
        title: 'Skills & Preferences',
        columns: 2,
        fields: [
          {
            key: 'skills',
            label: 'Technical Skills',
            type: 'multi-select',
            options: this.skillOptions,
            showSelectAll: true,
            maxSelections: 5,
          },
          {
            key: 'status',
            label: 'Current Status',
            type: 'select',
            options: this.statusOptions,
          },
          {
            key: 'bio',
            label: 'Bio / Notes',
            type: 'textarea',
            placeholder: 'Tell us about yourself...',
          },
        ],
      },
      {
        title: 'Additional Options',
        fields: [
          {
            key: 'subscribe',
            label: 'Subscribe to newsletter',
            type: 'checkbox',
          },
          {
            key: 'notifications',
            label: 'Enable notifications',
            type: 'toggle',
          },
          {
            key: 'gender',
            label: 'Gender',
            type: 'radio',
            options: this.genderOptions,
          },
        ],
      },
    ],
    showReset: true,
    submitLabel: 'Save',
    resetLabel: 'Clear',
  };

  initialFormValues = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    country: 'us',
    skills: ['angular', 'typescript'],
    status: 'active',
    subscribe: true,
    notifications: true,
  };

  // Basic Table Configuration
  tableConfig: TableConfig = {
    columns: [
      { key: 'id', label: 'ID', width: '60px', sortable: true },
      { key: 'name', label: 'Name', sortable: true, filterable: true, editable: true },
      { key: 'email', label: 'Email', filterable: true, editable: true },
      { key: 'department', label: 'Department', filterable: true, editable: true },
      { key: 'status', label: 'Status', filterable: true, editable: true },
      { key: 'joinDate', label: 'Join Date', type: 'date' },
    ],
    sortable: true,
    filterable: true,
    paginated: true,
    selectable: true,
    pageSize: 10,
    pageSizeOptions: [5, 10, 25, 50],
    rowActions: [
      { label: 'Edit', icon: 'edit', color: 'primary', action: 'edit' },
      { label: 'Delete', icon: 'delete', color: 'warn', action: 'delete' },
      { label: 'View', icon: 'visibility', action: 'view' },
    ],
    headerActions: [
      { label: 'Add', icon: 'add', action: 'add' },
      { label: 'Export', icon: 'download', action: 'export' },
    ],
    striped: true,
    hoverable: true,
  };

  tableData = [
    { 
      id: 1, 
      name: 'John Doe', 
      email: 'john@example.com', 
      department: 'Engineering',
      status: 'active',
      joinDate: '2024-01-15',
      address: { city: 'New York', country: 'USA' }
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      email: 'jane@example.com', 
      department: 'Marketing',
      status: 'inactive',
      joinDate: '2024-02-20',
      address: { city: 'Los Angeles', country: 'USA' }
    },
    { 
      id: 3, 
      name: 'Bob Johnson', 
      email: 'bob@example.com', 
      department: 'Engineering',
      status: 'active',
      joinDate: '2024-03-10',
      address: { city: 'San Francisco', country: 'USA' }
    },
    { 
      id: 4, 
      name: 'Alice Brown', 
      email: 'alice@example.com', 
      department: 'HR',
      status: 'pending',
      joinDate: '2024-03-15',
      address: { city: 'Chicago', country: 'USA' }
    },
    { 
      id: 5, 
      name: 'Charlie Wilson', 
      email: 'charlie@example.com', 
      department: 'Finance',
      status: 'active',
      joinDate: '2024-04-01',
      address: { city: 'Boston', country: 'USA' }
    },
  ];

  // Advanced Table Configuration with nested data, conditional columns, attachments, selects
  advancedTableConfig: TableConfig = {
    columns: [
      { 
        key: 'id', 
        label: 'ID', 
        width: '60px',
        sortable: true 
      },
      { 
        key: 'name', 
        label: 'Employee', 
        sortable: true, 
        filterable: true,
        path: 'personal.name',
        editable: true
      },
      { 
        key: 'email', 
        label: 'Email',
        path: 'personal.email',
        filterable: true,
        editable: true
      },
      { 
        key: 'department', 
        label: 'Department',
        filterable: true,
        editable: true,
        editorType: 'select',
        editorOptions: { options: this.departmentOptions },
        transform: (value: any) => value || '-',
        cellStyle: (value: any) => ({
          color: value === 'Engineering' ? '#1976d2' : value === 'Marketing' ? '#e91e63' : value === 'HR' ? '#4caf50' : '#666'
        })
      },
      { 
        key: 'salary', 
        label: 'Salary', 
        type: 'number',
        align: 'right',
        transform: (value: any) => `$${Number(value).toLocaleString()}`,
        visible: true,
        editable: true
      },
      { 
        key: 'status', 
        label: 'Status',
        filterable: true,
        transform: (value: any) => value?.charAt(0).toUpperCase() + value?.slice(1),
        editorType: 'select',
        editorOptions: { options: this.statusOptions },
        cellStyle: (value: any) => ({
          color: value === 'active' ? 'green' : value === 'inactive' ? 'red' : 'orange',
          fontWeight: 'bold'
        })
      },
      { 
        key: 'startDate', 
        label: 'Start Date', 
        type: 'date',
        format: 'DD-MMM-YYYY'
      },
      { 
        key: 'skills', 
        label: 'Skills',
        transform: (value: any) => value ? value.join(', ') : '-'
      },
      { 
        key: 'country', 
        label: 'Country',
        transform: (value: any) => value || '-'
      },
      { 
        key: 'attachments', 
        label: 'Attachments',
        type: 'attachment',
        transform: (value: any) => value ? `${value.length} file(s)` : 'None',
        render: (value: any, row: any) => {
          if (!value || value.length === 0) return '<span class="no-attachments">None</span>';
          return value.map((f: any) => 
            `<span class="attachment-badge">${this.getFileIcon(f.type)}${f.name}</span>`
          ).join('');
        }
      },
      { 
        key: 'manager', 
        label: 'Reports To',
        path: 'reporting.manager'
      },
      { 
        key: 'actions', 
        label: 'Actions',
        width: '150px'
      },
    ],
    sortable: true,
    filterable: true,
    paginated: true,
    selectable: true,
    pageSize: 10,
    rowActions: [
      { 
        label: 'Edit', 
        icon: 'edit', 
        color: 'primary', 
        action: 'edit' 
      },
      { 
        label: 'Preview', 
        icon: 'visibility', 
        action: 'preview',
        visible: (row: any) => row.attachments && row.attachments.length > 0
      },
      { 
        label: 'Download', 
        icon: 'download', 
        action: 'download',
        visible: (row: any) => row.attachments && row.attachments.length > 0
      },
      { 
        label: 'Delete', 
        icon: 'delete', 
        color: 'warn', 
        action: 'delete' 
      },
    ],
    inlineEditable: true,
    striped: true,
    hoverable: true,
    noDataMessage: 'No employee records found',
  };

  advancedTableData = [
    {
      id: 1,
      personal: { name: 'John Doe', email: 'john@example.com' },
      department: 'Engineering',
      salary: 95000,
      status: 'active',
      startDate: '2024-01-15',
      skills: ['Angular', 'TypeScript', 'Node.js'],
      country: 'United States',
      attachments: [
        { name: 'resume.pdf', type: 'application/pdf', size: 245000, url: '/assets/resume.pdf' },
        { name: 'cert.pdf', type: 'application/pdf', size: 120000, url: '/assets/cert.pdf' }
      ],
      reporting: { manager: 'Sarah Wilson' }
    },
    {
      id: 2,
      personal: { name: 'Jane Smith', email: 'jane@example.com' },
      department: 'Marketing',
      salary: 75000,
      status: 'inactive',
      startDate: '2024-02-20',
      skills: ['SEO', 'Content Marketing', 'Analytics'],
      country: 'Canada',
      attachments: [
        { name: 'portfolio.pdf', type: 'application/pdf', size: 350000, url: '/assets/portfolio.pdf' }
      ],
      reporting: { manager: 'Mike Brown' }
    },
    {
      id: 3,
      personal: { name: 'Bob Johnson', email: 'bob@example.com' },
      department: 'Engineering',
      salary: 110000,
      status: 'active',
      startDate: '2024-03-10',
      skills: ['React', 'Python', 'AWS', 'Docker'],
      country: 'United States',
      attachments: [],
      reporting: { manager: 'Sarah Wilson' }
    },
    {
      id: 4,
      personal: { name: 'Alice Brown', email: 'alice@example.com' },
      department: 'HR',
      salary: 65000,
      status: 'pending',
      startDate: '2024-03-15',
      skills: ['Recruiting', 'Training', 'Employee Relations'],
      country: 'United Kingdom',
      attachments: [
        { name: 'cv.pdf', type: 'application/pdf', size: 180000, url: '/assets/cv.pdf' },
        { name: 'references.docx', type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', size: 95000, url: '/assets/references.docx' }
      ],
      reporting: { manager: 'Tom Davis' }
    },
    {
      id: 5,
      personal: { name: 'Charlie Wilson', email: 'charlie@example.com' },
      department: 'Finance',
      salary: 85000,
      status: 'active',
      startDate: '2024-04-01',
      skills: ['Excel', 'Financial Modeling', 'SAP'],
      country: 'Germany',
      attachments: [
        { name: 'report.xlsx', type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', size: 520000, url: '/assets/report.xlsx' }
      ],
      reporting: { manager: 'Emma Davis' }
    },
  ];

  selectedRows: any[] = [];
  columnVisibility: Record<string, boolean> = {};

  // Form handlers
  onFormSubmit(data: any): void {
    console.log('Form submitted:', data);
    
    const dialogRef = this.dialog.open(SuccessPopupComponent, {
      data: {
        title: 'Success!',
        message: `Form submitted successfully!\n\nName: ${data.firstName} ${data.lastName}\nEmail: ${data.email}`,
        icon: 'check_circle',
        autoClose: true,
        autoCloseDuration: 5000,
        buttons: [
          { label: 'View JSON', action: 'view', color: 'primary' },
          { label: 'Close', action: 'close', color: 'basic' }
        ]
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'view') {
        console.log('Form data:', JSON.stringify(data, null, 2));
      }
    });
  }

  onFormChange(state: any): void {
    console.log('Form state changed:', state);
  }

  // Table handlers
  onTableAction(event: { action: any; row: any }): void {
    console.log('Table action:', event);
    
    switch (event.action.action) {
      case 'edit':
        this.showConfirmDialog('Edit Record', `Edit ${event.row.name}?`, 'edit');
        break;
      case 'delete':
        this.showConfirmDialog('Delete Record', `Delete ${event.row.name}?`, 'delete');
        break;
      case 'view':
        this.dialog.open(SuccessPopupComponent, {
          data: {
            title: 'View Record',
            message: `Viewing details for: ${event.row.name}\nEmail: ${event.row.email}\nDepartment: ${event.row.department}`,
            icon: 'info'
          }
        });
        break;
      case 'add':
        this.addNewRow();
        break;
      case 'export':
        this.exportData();
        break;
    }
  }

  onSelectionChange(selected: any[]): void {
    this.selectedRows = selected;
    console.log('Selected rows:', selected);
  }

  onCellEdit(event: { row: any; column: any; value: any }): void {
    console.log('Cell edited:', event);
    event.row[event.column.key] = event.value;
  }

  onAdvancedTableAction(event: { action: any; row: any }): void {
    console.log('Advanced table action:', event);
    
    if (event.action.action === 'edit') {
      this.dialog.open(DialogComponent, {
        data: {
          title: 'Edit Employee',
          message: `Edit employee: ${event.row.personal?.name || event.row.name}`,
          confirmText: 'Save',
          cancelText: 'Cancel'
        }
      });
    } else if (event.action.action === 'delete') {
      this.dialog.open(FailurePopupComponent, {
        data: {
          title: 'Delete Employee',
          message: `Are you sure you want to delete ${event.row.personal?.name || event.row.name}?`,
          icon: 'warning',
          allowSideClose: true,
          buttons: [
            { label: 'Delete', action: 'delete', color: 'warn' },
            { label: 'Cancel', action: 'cancel', color: 'basic' }
          ]
        }
      });
    } else if (event.action.action === 'download') {
      this.downloadAttachment(event.row);
    } else if (event.action.action === 'preview') {
      this.previewAttachment(event.row);
    }
  }

  downloadAttachment(row: any): void {
    const attachments = row.attachments || [];
    if (attachments.length === 0) return;
    
    attachments.forEach((file: any) => {
      if (file.url) {
        const link = document.createElement('a');
        link.href = file.url;
        link.download = file.name;
        link.click();
      }
    });
    
    this.dialog.open(SuccessPopupComponent, {
      data: {
        title: 'Download Started',
        message: `Downloading ${attachments.length} file(s)`,
        icon: 'download'
      }
    });
  }

  previewAttachment(row: any): void {
    const attachments = row.attachments || [];
    if (attachments.length === 0) return;
    
    const file = attachments[0];
    const fileType = file.type || '';
    
    let content = '';
    if (fileType.includes('pdf')) {
      content = `<iframe src="${file.url}" style="width: 100%; height: 500px; border: none;"></iframe>`;
    } else if (fileType.includes('image')) {
      content = `<img src="${file.url}" alt="${file.name}" style="max-width: 100%;">`;
    } else if (fileType.includes('word') || fileType.includes('document')) {
      content = `<p>Word document preview not available. <a href="${file.url}" download>Download</a></p>`;
    } else if (fileType.includes('excel') || fileType.includes('sheet')) {
      content = `<p>Excel preview not available. <a href="${file.url}" download>Download</a></p>`;
    } else {
      content = `<p>Preview not available for this file type. <a href="${file.url}" download>Download</a></p>`;
    }

    this.dialog.open(DialogComponent, {
      data: {
        title: `Preview: ${file.name}`,
        message: content,
        confirmText: 'Download',
        cancelText: 'Close',
        htmlContent: true
      }
    });
  }

  // Helper methods
  addNewRow(): void {
    const newId = Math.max(...this.tableData.map(r => r.id)) + 1;
    const newRow = {
      id: newId,
      name: `New Employee ${newId}`,
      email: `employee${newId}@example.com`,
      department: 'New',
      status: 'pending',
      joinDate: new Date().toISOString().split('T')[0],
      address: { city: 'Unknown', country: 'Unknown' }
    };
    this.tableData = [newRow, ...this.tableData];
    
    this.dialog.open(SuccessPopupComponent, {
      data: {
        title: 'Row Added',
        message: `New row added with ID: ${newId}`,
        icon: 'add_circle'
      }
    });
  }

  deleteSelectedRows(): void {
    if (this.selectedRows.length === 0) {
      this.dialog.open(FailurePopupComponent, {
        data: {
          title: 'No Selection',
          message: 'Please select rows to delete',
          icon: 'info'
        }
      });
      return;
    }

    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: 'Confirm Deletion',
        message: `Delete ${this.selectedRows.length} selected row(s)?`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        const selectedIds = this.selectedRows.map(r => r.id);
        this.tableData = this.tableData.filter(r => !selectedIds.includes(r.id));
        this.selectedRows = [];
        
        this.dialog.open(SuccessPopupComponent, {
          data: {
            title: 'Deleted',
            message: `${selectedIds.length} row(s) deleted successfully`,
            icon: 'delete'
          }
        });
      }
    });
  }

  toggleColumns(): void {
    const columns = ['department', 'status', 'joinDate'];
    columns.forEach(col => {
      this.columnVisibility[col] = !this.columnVisibility[col];
    });
    
    this.dialog.open(SuccessPopupComponent, {
      data: {
        title: 'Columns Toggled',
        message: 'Column visibility has been updated',
        icon: 'view_column'
      }
    });
  }

  exportData(): void {
    this.dialog.open(SuccessPopupComponent, {
      data: {
        title: 'Export Started',
        message: 'Data export has been initiated. Check your downloads folder.',
        icon: 'download'
      }
    });
  }

  showConfirmDialog(title: string, message: string, action: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title,
        message,
        confirmText: 'Confirm',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.dialog.open(SuccessPopupComponent, {
          data: {
            title: 'Success',
            message: `${action} action completed`,
            icon: 'check_circle'
          }
        });
      }
    });
  }
}
