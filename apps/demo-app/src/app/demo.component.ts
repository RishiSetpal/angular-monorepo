import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { DynamicFormComponent, FormConfig } from '@org/dynamic-form';
import { DynamicTableComponent, TableConfig } from '@org/dynamic-table';
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
        <mat-tab label="UI Components">
          <div class="tab-content">
            <h2>Reusable UI Components</h2>
            <div class="components-grid">
              <mat-card class="component-card">
                <mat-card-header><mat-card-title>Text Input</mat-card-title></mat-card-header>
                <mat-card-content>
                  <lib-text-input label="Username" placeholder="Enter username"></lib-text-input>
                </mat-card-content>
              </mat-card>
              <mat-card class="component-card">
                <mat-card-header><mat-card-title>Textarea</mat-card-title></mat-card-header>
                <mat-card-content>
                  <lib-textarea label="Bio" placeholder="Write about yourself"></lib-textarea>
                </mat-card-content>
              </mat-card>
              <mat-card class="component-card">
                <mat-card-header><mat-card-title>Single Select</mat-card-title></mat-card-header>
                <mat-card-content>
                  <lib-single-select label="Country" [options]="countryOptions" [searchable]="true"></lib-single-select>
                </mat-card-content>
              </mat-card>
              <mat-card class="component-card">
                <mat-card-header><mat-card-title>Multi Select</mat-card-title></mat-card-header>
                <mat-card-content>
                  <lib-multi-select label="Skills" [options]="skillOptions" [showSelectAll]="true"></lib-multi-select>
                </mat-card-content>
              </mat-card>
              <mat-card class="component-card">
                <mat-card-header><mat-card-title>Date Picker</mat-card-title></mat-card-header>
                <mat-card-content>
                  <lib-date-picker label="Birth Date" [rangeMode]="true"></lib-date-picker>
                </mat-card-content>
              </mat-card>
              <mat-card class="component-card">
                <mat-card-header><mat-card-title>Checkbox</mat-card-title></mat-card-header>
                <mat-card-content>
                  <lib-checkbox label="I agree to terms"></lib-checkbox>
                </mat-card-content>
              </mat-card>
            </div>
          </div>
        </mat-tab>

        <mat-tab label="Dynamic Form">
          <div class="tab-content">
            <h2>Config-Driven Form Engine</h2>
            <lib-dynamic-form [config]="formConfig" (formSubmit)="onFormSubmit($event)"></lib-dynamic-form>
          </div>
        </mat-tab>

        <mat-tab label="Dynamic Table">
          <div class="tab-content">
            <h2>Config-Driven Table Engine</h2>
            <lib-dynamic-table 
              [config]="tableConfig" 
              [data]="tableData"
              (rowAction)="onTableAction($event)">
            </lib-dynamic-table>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    .demo-container {
      padding: 24px;
      max-width: 1400px;
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
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 16px;
    }
    .component-card {
      padding: 16px;
    }
    h2 { margin-bottom: 24px; }
  `],
})
export class DemoComponent {
  countryOptions = [
    { label: 'United States', value: 'us' },
    { label: 'Canada', value: 'ca' },
    { label: 'United Kingdom', value: 'uk' },
    { label: 'India', value: 'in' },
    { label: 'Australia', value: 'au' },
  ];

  skillOptions = [
    { label: 'Angular', value: 'angular' },
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'TypeScript', value: 'ts' },
    { label: 'JavaScript', value: 'js' },
  ];

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
            validations: [{ type: 'required', message: 'First name is required' }],
          },
          {
            key: 'lastName',
            label: 'Last Name',
            type: 'text',
            placeholder: 'Enter last name',
            validations: [{ type: 'required', message: 'Last name is required' }],
          },
          {
            key: 'email',
            label: 'Email',
            type: 'email',
            placeholder: 'Enter email',
            validations: [
              { type: 'required', message: 'Email is required' },
              { type: 'email', message: 'Invalid email format' },
            ],
          },
          {
            key: 'phone',
            label: 'Phone',
            type: 'text',
            placeholder: 'Enter phone number',
          },
        ],
      },
      {
        title: 'Preferences',
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
        ],
      },
    ],
    showReset: true,
    submitLabel: 'Save',
    resetLabel: 'Clear',
  };

  tableConfig: TableConfig = {
    columns: [
      { key: 'id', label: 'ID', width: '80px', sortable: true },
      { key: 'name', label: 'Name', sortable: true, filterable: true },
      { key: 'email', label: 'Email', filterable: true },
      { key: 'status', label: 'Status', filterable: true },
      { key: 'createdAt', label: 'Created', type: 'date' },
    ],
    sortable: true,
    filterable: true,
    paginated: true,
    selectable: true,
    pageSize: 10,
    pageSizeOptions: [5, 10, 25, 50],
    rowActions: [
      { label: 'Edit', icon: 'edit', action: 'edit' },
      { label: 'Delete', icon: 'delete', color: 'warn', action: 'delete' },
      { label: 'View', icon: 'visibility', action: 'view' },
    ],
    striped: true,
    hoverable: true,
  };

  tableData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', createdAt: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive', createdAt: '2024-01-20' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Active', createdAt: '2024-02-10' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', status: 'Pending', createdAt: '2024-02-15' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', status: 'Active', createdAt: '2024-03-01' },
  ];

  onFormSubmit(data: any): void {
    console.log('Form submitted:', data);
    alert('Form submitted! Check console for data.');
  }

  onTableAction(event: { action: any; row: any }): void {
    console.log('Table action:', event);
    alert(`Action: ${event.action.action} on row: ${event.row.name}`);
  }
}
