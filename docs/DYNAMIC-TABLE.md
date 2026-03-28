# Dynamic Table Engine

A powerful, config-driven table component for Angular with sorting, filtering, pagination, and more.

## Overview

The Dynamic Table Engine renders Material tables from JSON configuration, providing a declarative way to display data with advanced features like sorting, filtering, inline editing, and custom rendering.

## Installation

```typescript
import { DynamicTableComponent } from '@angular-monorepo/dynamic-table';
```

## Basic Usage

```typescript
import { Component } from '@angular/core';
import { TableConfig } from '@angular-monorepo/dynamic-table';

@Component({
  selector: 'app-example',
  template: `
    <lib-dynamic-table
      [config]="tableConfig"
      [data]="tableData"
      (rowAction)="onAction($event)">
    </lib-dynamic-table>
  `
})
export class ExampleComponent {
  tableConfig: TableConfig = {
    columns: [
      { key: 'name', label: 'Name', sortable: true },
      { key: 'email', label: 'Email', filterable: true }
    ]
  };

  tableData = [
    { id: 1, name: 'John', email: 'john@example.com' },
    { id: 2, name: 'Jane', email: 'jane@example.com' }
  ];

  onAction(event: any) {
    console.log('Action:', event);
  }
}
```

## Table Configuration

### TableConfig Interface

```typescript
interface TableConfig {
  // Column definitions
  columns: TableColumn[];
  
  // Data array (can be static or loaded dynamically)
  data: any[];
  
  // Features
  sortable?: boolean;
  filterable?: boolean;
  paginated?: boolean;
  selectable?: boolean;
  expandable?: boolean;
  inlineEditable?: boolean;
  
  // Pagination settings
  pageSize?: number;
  pageSizeOptions?: number[];
  
  // Actions
  rowActions?: TableAction[];
  headerActions?: TableAction[];
  
  // Styling
  striped?: boolean;
  bordered?: boolean;
  hoverable?: boolean;
  className?: string;
  
  // Messages
  noDataMessage?: string;
  loadingMessage?: string;
  
  // Event handlers
  onRowClick?: (row: any, event?: Event) => void;
  onSelectionChange?: (selected: any[]) => void;
  onSort?: (sort: SortState) => void;
  onFilter?: (filters: Record<string, any>) => void;
  onPage?: (page: PageState) => void;
}
```

## Column Configuration

### TableColumn Interface

```typescript
interface TableColumn {
  // Data key or path
  key: string;
  
  // Display header label
  label: string;
  
  // Cell value type
  type?: 'text' | 'number' | 'date' | 'boolean' | 'custom' | 'template';
  
  // Column width
  width?: string;
  minWidth?: string;
  
  // Enable sorting
  sortable?: boolean;
  
  // Enable filtering
  filterable?: boolean;
  
  // Show/hide column
  visible?: boolean;
  
  // Text alignment
  align?: 'left' | 'center' | 'right';
  
  // Date format (for type: 'date')
  format?: string;
  
  // Template reference (for type: 'template')
  template?: string;
  
  // Nested data binding
  path?: string; // e.g., 'address.city'
  
  // Conditional styling
  styleClass?: string | ((value: any, row: any) => string);
  cellStyle?: Record<string, any> | ((value: any, row: any) => Record<string, any>);
  
  // Inline editing
  editable?: boolean;
  editorType?: 'text' | 'select' | 'date' | 'number';
  editorOptions?: any;
  
  // Value transformation
  transform?: (value: any, row: any) => string;
  
  // Custom rendering
  render?: (value: any, row: any) => any;
}
```

## Column Examples

### Basic Column
```typescript
{ key: 'name', label: 'Name' }
```

### Sortable Column
```typescript
{ key: 'createdAt', label: 'Created', sortable: true }
```

### Formatted Date
```typescript
{
  key: 'date',
  label: 'Date',
  type: 'date',
  format: 'DD-MMM-YYYY'
}
```

### Boolean Display
```typescript
{
  key: 'isActive',
  label: 'Active',
  type: 'boolean'
}
```

### Custom Transform
```typescript
{
  key: 'status',
  label: 'Status',
  transform: (value) => {
    return `<span class="status-${value}">${value}</span>`;
  }
}
```

### Conditional Styling
```typescript
{
  key: 'priority',
  label: 'Priority',
  cellStyle: (value) => {
    const colors: Record<string, string> = {
      high: 'red',
      medium: 'orange',
      low: 'green'
    };
    return { color: colors[value] || 'black' };
  }
}
```

### Nested Data Binding
```typescript
{
  key: 'city',
  label: 'City',
  path: 'address.city'
}
```

### Inline Editable
```typescript
{
  key: 'name',
  label: 'Name',
  editable: true,
  editorType: 'text'
}
```

## Row Actions

### TableAction Interface

```typescript
interface TableAction {
  // Display label
  label: string;
  
  // Material icon name
  icon?: string;
  
  // Button color
  color?: 'primary' | 'accent' | 'warn' | 'basic';
  
  // Visibility
  visible?: boolean | ((row: any) => boolean);
  
  // Disabled state
  disabled?: boolean | ((row: any) => boolean);
  
  // Action handler
  action: string | ((row: any, event?: Event) => void);
  
  // Custom CSS class
  className?: string;
}
```

### Action Examples

```typescript
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
  {
    label: 'View',
    icon: 'visibility',
    action: 'view'
  },
  {
    label: 'Approve',
    icon: 'check_circle',
    color: 'accent',
    visible: (row) => row.status === 'pending',
    action: 'approve'
  }
]
```

## Complete Example

```typescript
const tableConfig: TableConfig = {
  columns: [
    {
      key: 'id',
      label: 'ID',
      width: '80px',
      sortable: true
    },
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      filterable: true
    },
    {
      key: 'email',
      label: 'Email',
      filterable: true,
      transform: (value) => value.toLowerCase()
    },
    {
      key: 'status',
      label: 'Status',
      filterable: true,
      cellStyle: (value) => ({
        color: value === 'active' ? 'green' : 'red'
      })
    },
    {
      key: 'createdAt',
      label: 'Created',
      type: 'date',
      sortable: true
    }
  ],
  sortable: true,
  filterable: true,
  paginated: true,
  selectable: true,
  pageSize: 10,
  pageSizeOptions: [5, 10, 25, 50],
  rowActions: [
    {
      label: 'Edit',
      icon: 'edit',
      action: 'edit'
    },
    {
      label: 'Delete',
      icon: 'delete',
      color: 'warn',
      action: 'delete'
    }
  ],
  headerActions: [
    {
      label: 'Add New',
      icon: 'add',
      action: 'add'
    },
    {
      label: 'Export',
      icon: 'download',
      action: 'export'
    }
  ],
  striped: true,
  hoverable: true,
  noDataMessage: 'No users found',
  onRowClick: (row) => console.log('Row clicked:', row),
  onSelectionChange: (selected) => console.log('Selected:', selected)
};
```

## Events

### rowAction
Emitted when a row action is clicked.

```typescript
onAction(event: { action: TableAction; row: any }) {
  console.log('Action:', event.action.label);
  console.log('Row:', event.row);
}
```

### sortChange
Emitted when sort changes.

```typescript
onSort(sort: SortState) {
  console.log('Sort:', sort);
}
```

### filterChange
Emitted when filter changes.

```typescript
onFilter(filters: Record<string, any>) {
  console.log('Filters:', filters);
}
```

### pageChange
Emitted when pagination changes.

```typescript
onPage(page: PageState) {
  console.log('Page:', page);
}
```

### selectionChange
Emitted when row selection changes.

```typescript
onSelection(selected: any[]) {
  console.log('Selected rows:', selected);
}
```

## Cell Editing

Enable inline editing for columns:

```typescript
{
  key: 'name',
  label: 'Name',
  editable: true,
  editorType: 'text'
}
```

Handle cell edits:

```html
<lib-dynamic-table
  [config]="config"
  [data]="data"
  (cellEdit)="onCellEdit($event)">
</lib-dynamic-table>
```

```typescript
onCellEdit(event: { row: any; column: TableColumn; value: any }) {
  console.log('Edit:', event);
}
```

## Selection

Enable row selection:

```typescript
config = {
  selectable: true,
  onSelectionChange: (selected) => {
    console.log('Selected:', selected);
  }
};
```

Get selected rows programmatically:

```typescript
@ViewChild(DynamicTableComponent) table!: DynamicTableComponent;

getSelectedRows() {
  return this.table.getSelectedRows();
}

clearSelection() {
  this.table.clearSelection();
}
```

## Nested Data Binding

Access nested object properties using dot notation:

```typescript
columns: [
  { key: 'city', path: 'address.city', label: 'City' },
  { key: 'country', path: 'address.country.name', label: 'Country' },
  { key: 'zip', path: 'address.details.zip', label: 'Zip Code' }
]
```

## Best Practices

1. **Column Keys:** Use unique, meaningful keys
2. **Sorting/Filtering:** Enable only where needed
3. **Pagination:** Use for large datasets (> 100 rows)
4. **Actions:** Keep actions simple and intuitive
5. **Responsive:** Define proper widths and min-widths
6. **Empty States:** Provide clear no-data messages
7. **Performance:** Virtualize for very large datasets

## Performance Tips

1. **Pagination:** Always paginate large datasets
2. **Server-side:** For huge data, implement server-side operations
3. **OnPush:** Components support OnPush change detection
4. **TrackBy:** Use trackBy functions where applicable
5. **Memoization:** Cache computed values
