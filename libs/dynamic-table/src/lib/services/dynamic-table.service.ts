import { Injectable, signal } from '@angular/core';
import { 
  TableConfig, 
  TableColumn, 
  SortState, 
  FilterState, 
  PageState,
  TableState,
  SortDirection 
} from '../models/table-config.model';
import { ObjectUtils } from '@org/shared';

@Injectable({
  providedIn: 'root',
})
export class DynamicTableService {
  sortData(data: any[], sort: SortState): any[] {
    if (!sort.active || !sort.direction) return data;

    return [...data].sort((a, b) => {
      const aVal = this.getNestedValue(a, sort.active);
      const bVal = this.getNestedValue(b, sort.active);

      if (aVal === bVal) return 0;
      
      const comparison = aVal < bVal ? -1 : 1;
      return sort.direction === 'asc' ? comparison : -comparison;
    });
  }

  filterData(data: any[], filters: FilterState): any[] {
    if (!filters || Object.keys(filters).length === 0) return data;

    return data.filter((row) => {
      return Object.entries(filters).every(([key, value]) => {
        if (value === null || value === undefined || value === '') return true;
        
        const cellValue = this.getNestedValue(row, key);
        if (Array.isArray(cellValue)) {
          return cellValue.includes(value);
        }
        
        if (typeof cellValue === 'string') {
          return cellValue.toLowerCase().includes(value.toString().toLowerCase());
        }
        
        return cellValue === value;
      });
    });
  }

  paginateData(data: any[], page: PageState): any[] {
    const startIndex = page.pageIndex * page.pageSize;
    return data.slice(startIndex, startIndex + page.pageSize);
  }

  getNestedValue(obj: any, path: string): any {
    if (!path.includes('.')) return obj[path];
    return ObjectUtils.getNestedValue(obj, path);
  }

  getVisibleColumns(config: TableConfig): TableColumn[] {
    return config.columns.filter((col) => col.visible !== false);
  }

  getSortableColumns(config: TableConfig): TableColumn[] {
    if (!config.sortable) return [];
    return config.columns.filter((col) => col.sortable !== false);
  }

  getFilterableColumns(config: TableConfig): TableColumn[] {
    if (!config.filterable) return [];
    return config.columns.filter((col) => col.filterable !== false);
  }

  createInitialState(config: TableConfig): TableState {
    return {
      data: config.data || [],
      filteredData: config.data || [],
      sort: { active: '', direction: '' },
      filter: {},
      page: {
        pageIndex: 0,
        pageSize: config.pageSize || 10,
        length: config.data?.length || 0,
      },
      selection: {
        selected: [],
        allSelected: false,
        indeterminate: false,
      },
      expansion: {},
      loading: false,
    };
  }

  toggleSort(currentSort: SortState, columnKey: string): SortState {
    if (currentSort.active !== columnKey) {
      return { active: columnKey, direction: 'asc' };
    }
    
    if (currentSort.direction === 'asc') {
      return { active: columnKey, direction: 'desc' };
    }
    
    return { active: '', direction: '' };
  }

  isRowVisible(config: TableConfig, row: any): boolean {
    return true; // Can be extended for custom row visibility logic
  }

  getCellValue(row: any, column: TableColumn): any {
    const value = column.path 
      ? this.getNestedValue(row, column.path) 
      : row[column.key];

    if (column.transform) {
      return column.transform(value, row);
    }

    if (column.render) {
      return column.render(value, row);
    }

    return value;
  }

  formatCellValue(value: any, column: TableColumn): string {
    if (value === null || value === undefined) return '';

    switch (column.type) {
      case 'date':
        return this.formatDate(value, column.format);
      case 'boolean':
        return value ? 'Yes' : 'No';
      case 'number':
        return Number(value).toLocaleString();
      case 'custom':
        if (column.render) {
          return String(column.render(value, null));
        }
        return String(value);
      default:
        return String(value);
    }
  }

  formatDate(value: any, format?: string): string {
    if (!value) return '';
    const date = new Date(value);
    if (isNaN(date.getTime())) return '';

    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthsShort = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const day = date.getDate().toString().padStart(2, '0');
    const dayNoPad = date.getDate();
    const month = months[date.getMonth()];
    const monthShort = monthsShort[date.getMonth()];
    const year = date.getFullYear();
    const yearShort = year.toString().slice(-2);

    if (!format) {
      return `${day}-${month}-${year}`;
    }

    return format
      .replace(/DD/g, day)
      .replace(/D/g, dayNoPad.toString())
      .replace(/MMMM/g, month)
      .replace(/MMM/g, monthShort)
      .replace(/MM/g, (date.getMonth() + 1).toString().padStart(2, '0'))
      .replace(/M/g, (date.getMonth() + 1).toString())
      .replace(/YYYY/g, year.toString())
      .replace(/YY/g, yearShort);
  }

  getCellStyle(row: any, column: TableColumn): Record<string, any> {
    if (!column.cellStyle) return {};

    if (typeof column.cellStyle === 'function') {
      return column.cellStyle(this.getCellValue(row, column), row);
    }

    return column.cellStyle;
  }

  getCellClass(row: any, column: TableColumn): string {
    if (!column.styleClass) return '';

    if (typeof column.styleClass === 'function') {
      return column.styleClass(this.getCellValue(row, column), row);
    }

    return column.styleClass;
  }
}
