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
  TabGroupComponent
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

  demoTabs = [
    { label: 'Tab 1', icon: 'home', content: 'Content for Tab 1 - Dashboard' },
    { label: 'Tab 2', icon: 'settings', content: 'Content for Tab 2 - Settings' },
    { label: 'Tab 3', icon: 'info', content: 'Content for Tab 3 - About' },
  ];

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
      { key: 'name', label: 'Name', sortable: true, filterable: true },
      { key: 'email', label: 'Email', filterable: true },
      { key: 'department', label: 'Department', filterable: true },
      { key: 'status', label: 'Status', filterable: true },
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

  // Advanced Table Configuration with nested data, conditional columns
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
        path: 'personal.name'
      },
      { 
        key: 'email', 
        label: 'Email',
        path: 'personal.email',
        filterable: true 
      },
      { 
        key: 'department', 
        label: 'Department',
        filterable: true,
        styleClass: (value: any, row: any) => `department-${row.department?.toLowerCase()}`
      },
      { 
        key: 'salary', 
        label: 'Salary', 
        type: 'number',
        align: 'right',
        transform: (value: any) => `$${Number(value).toLocaleString()}`,
        visible: true
      },
      { 
        key: 'status', 
        label: 'Status',
        filterable: true,
        transform: (value: any) => value?.charAt(0).toUpperCase() + value?.slice(1),
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
        key: 'attachments', 
        label: 'Attachments',
        type: 'custom',
        render: (value: any) => value ? `${value.length} file(s)` : 'None'
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
      attachments: [{ name: 'resume.pdf' }, { name: 'cert.pdf' }],
      reporting: { manager: 'Sarah Wilson' }
    },
    {
      id: 2,
      personal: { name: 'Jane Smith', email: 'jane@example.com' },
      department: 'Marketing',
      salary: 75000,
      status: 'inactive',
      startDate: '2024-02-20',
      attachments: [{ name: 'portfolio.pdf' }],
      reporting: { manager: 'Mike Brown' }
    },
    {
      id: 3,
      personal: { name: 'Bob Johnson', email: 'bob@example.com' },
      department: 'Engineering',
      salary: 110000,
      status: 'active',
      startDate: '2024-03-10',
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
      attachments: [{ name: 'cv.pdf' }, { name: 'references.pdf' }],
      reporting: { manager: 'Tom Davis' }
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
    }
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
