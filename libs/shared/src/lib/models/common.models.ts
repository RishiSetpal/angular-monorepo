export interface SelectOption {
  label: string;
  value: any;
  disabled?: boolean;
  group?: string;
  description?: string;
}

export interface FileUploadConfig {
  accept?: string;
  maxSize?: number;
  multiple?: boolean;
  showPreview?: boolean;
  showDownload?: boolean;
  editable?: boolean;
}

export interface FileItem {
  file?: File;
  name: string;
  size?: number;
  type?: string;
  url?: string;
  progress?: number;
  status?: 'uploading' | 'complete' | 'error';
}

export interface ActionButton {
  label: string;
  icon?: string;
  color?: 'primary' | 'accent' | 'warn' | 'basic' | 'mat-primary' | 'mat-accent' | 'mat-warn';
  disabled?: boolean;
  visible?: boolean;
  action: string | ((...args: any[]) => void);
}

export interface DialogConfig {
  title: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  width?: string;
  disableClose?: boolean;
  htmlContent?: boolean;
}

export interface ToastConfig {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  action?: string;
}

export interface ColumnConfig {
  key: string;
  label: string;
  type?: 'text' | 'number' | 'date' | 'boolean' | 'custom';
  width?: string;
  sortable?: boolean;
  filterable?: boolean;
  visible?: boolean;
  align?: 'left' | 'center' | 'right';
  format?: string;
  template?: string;
}

export interface SortState {
  active: string;
  direction: 'asc' | 'desc';
}

export interface FilterState {
  [key: string]: any;
}
