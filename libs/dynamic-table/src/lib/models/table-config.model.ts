export type ColumnType = 'text' | 'number' | 'date' | 'boolean' | 'custom' | 'template' | 'attachment';
export type CellAlign = 'left' | 'center' | 'right';
export type SortDirection = 'asc' | 'desc' | '';

export interface TableColumn {
  key: string;
  label: string;
  type?: ColumnType;
  width?: string;
  minWidth?: string;
  sortable?: boolean;
  filterable?: boolean;
  visible?: boolean;
  align?: CellAlign;
  format?: string;
  template?: string;
  
  // Nested data binding
  path?: string; // e.g., 'address.city'
  
  // Conditional styling
  styleClass?: string | ((value: any, row: any) => string);
  cellStyle?: Record<string, any> | ((value: any, row: any) => Record<string, any>);
  
  // Inline editing
  editable?: boolean;
  editorType?: 'text' | 'select' | 'date' | 'number' | 'checkbox';
  editorOptions?: any;
  
  // Value transformation
  transform?: (value: any, row: any) => string;
  
  // Custom rendering
  render?: (value: any, row: any) => any;
}

export interface TableAction {
  label: string;
  icon?: string;
  color?: 'primary' | 'accent' | 'warn' | 'basic';
  visible?: boolean | ((row: any) => boolean);
  disabled?: boolean | ((row: any) => boolean);
  action: string | ((row: any, event?: Event) => void);
  className?: string;
}

export interface TableConfig {
  columns: TableColumn[];
  data?: any[];
  
  // Features
  sortable?: boolean;
  filterable?: boolean;
  paginated?: boolean;
  selectable?: boolean;
  expandable?: boolean;
  inlineEditable?: boolean;
  
  // Pagination
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
  
  // Localization
  noDataMessage?: string;
  loadingMessage?: string;
  
  // Events
  onRowClick?: (row: any, event?: Event) => void;
  onSelectionChange?: (selected: any[]) => void;
  onSort?: (sort: SortState) => void;
  onFilter?: (filters: Record<string, any>) => void;
  onPage?: (page: PageState) => void;
}

export interface SortState {
  active: string;
  direction: SortDirection;
}

export interface PageState {
  pageIndex: number;
  pageSize: number;
  length: number;
}

export interface FilterState {
  [key: string]: any;
}

export interface RowExpansion {
  [key: string]: boolean;
}

export interface SelectionState {
  selected: any[];
  allSelected: boolean;
  indeterminate: boolean;
}

export interface TableState {
  data: any[];
  filteredData: any[];
  sort: SortState;
  filter: FilterState;
  page: PageState;
  selection: SelectionState;
  expansion: RowExpansion;
  loading: boolean;
}
