import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SelectionModel } from '@angular/cdk/collections';
import { 
  TableConfig, 
  TableColumn, 
  SortState, 
  SortDirection,
  PageState,
  TableAction,
  TableState 
} from '../models/table-config.model';
import { DynamicTableService } from '../services/dynamic-table.service';

@Component({
  selector: 'lib-dynamic-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule,
  ],
  template: `
    <div class="table-container" [class]="config.className">
      @if (config.headerActions && config.headerActions.length > 0) {
        <div class="header-actions">
          @for (action of config.headerActions; track action.label) {
            @if (isActionVisible(action)) {
              <button mat-raised-button [color]="action.color || 'primary'" 
                      (click)="onHeaderAction(action, $event)">
                @if (action.icon) {
                  <mat-icon>{{ action.icon }}</mat-icon>
                }
                {{ action.label }}
              </button>
            }
          }
        </div>
      }

      @if (config.filterable) {
        <mat-form-field appearance="outline" class="filter-field">
          <mat-label>Filter</mat-label>
          <input matInput [value]="filterValue()" (input)="onFilterChange($event)" 
                 [placeholder]="'Filter ' + getVisibleColumns().length + ' columns...'">
          <mat-icon matSuffix>search</mat-icon>
        </mat-form-field>
      }

      <div class="table-wrapper">
        <table mat-table [dataSource]="displayedData()" matSort (matSortChange)="onSortChange($event)">
          @if (config.selectable) {
            <ng-container matColumnDef="select">
              <th mat-header-cell *matHeaderCellDef>
                <mat-checkbox (change)="toggleAllRows()"
                              [checked]="selection.hasValue() && isAllSelected()"
                              [indeterminate]="selection.hasValue() && !isAllSelected()">
                </mat-checkbox>
              </th>
              <td mat-cell *matCellDef="let row">
                <mat-checkbox (click)="$event.stopPropagation()"
                              (change)="toggleRow(row)"
                              [checked]="selection.isSelected(row)">
                </mat-checkbox>
              </td>
            </ng-container>
          }

          @for (column of getVisibleColumns(); track column.key) {
            <ng-container [matColumnDef]="column.key">
              <th mat-header-cell *matHeaderCellDef 
                  [mat-sort-header]="column.sortable !== false ? column.key : ''"
                  [style.text-align]="column.align || 'left'"
                  [style.width]="column.width">
                {{ column.label }}
              </th>
              <td mat-cell *matCellDef="let row"
                  [style.text-align]="column.align || 'left'"
                  [ngClass]="getCellClass(row, column)"
                  [ngStyle]="getCellStyle(row, column)">
                @if (isCellEditable(row, column)) {
                  <input matInput [value]="getCellValue(row, column)" 
                         (blur)="onCellEdit(row, column, $event)" />
                } @else {
                  {{ formatCellValue(row, column) }}
                }
              </td>
            </ng-container>
          }

          @if (config.rowActions && config.rowActions.length > 0) {
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef style="width: 150px;">Actions</th>
              <td mat-cell *matCellDef="let row">
                @for (action of config.rowActions; track action.label) {
                  @if (isRowActionVisible(action, row)) {
                    <button mat-icon-button [color]="action.color || 'basic'"
                            [matTooltip]="action.label"
                            (click)="onRowAction(action, row, $event)">
                      <mat-icon>{{ action.icon || 'more_vert' }}</mat-icon>
                    </button>
                  }
                }
              </td>
            </ng-container>
          }

          <tr mat-header-row *matHeaderRowDef="displayedColumns()"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns();"
              [class.striped]="config.striped"
              [class.bordered]="config.bordered"
              [class.hoverable]="config.hoverable"
              [class.selected]="selection.isSelected(row)"
              (click)="onRowClick(row, $event)">
          </tr>

          @if (displayedData().length === 0) {
            <tr class="mat-row" *matNoDataRow>
              <td class="mat-cell no-data" [attr.colspan]="displayedColumns().length">
                {{ config.noDataMessage || 'No data found' }}
              </td>
            </tr>
          }
        </table>
      </div>

      @if (config.paginated) {
        <mat-paginator
          [length]="totalItems()"
          [pageSize]="pageState().pageSize"
          [pageSizeOptions]="config.pageSizeOptions || [5, 10, 25, 50]"
          [pageIndex]="pageState().pageIndex"
          (page)="onPageChange($event)"
          showFirstLastButtons>
        </mat-paginator>
      }
    </div>
  `,
  styles: [`
    .table-container { padding: 16px; }
    .header-actions { display: flex; gap: 8px; margin-bottom: 16px; }
    .filter-field { width: 100%; max-width: 400px; margin-bottom: 16px; }
    .table-wrapper { overflow-x: auto; }
    table { width: 100%; }
    .striped tr:nth-child(even) { background-color: #f5f5f5; }
    .hoverable tr:hover { background-color: #f0f0f0; cursor: pointer; }
    .selected { background-color: #e3f2fd !important; }
    .no-data { text-align: center; padding: 40px !important; color: #999; }
    mat-icon { font-size: 18px; width: 18px; height: 18px; }
    input { border: none; background: transparent; width: 100%; }
  `],
})
export class DynamicTableComponent implements OnInit, OnChanges {
  @Input() config!: TableConfig;
  @Input() data: any[] = [];
  
  @Output() sortChange = new EventEmitter<SortState>();
  @Output() filterChange = new EventEmitter<Record<string, any>>();
  @Output() pageChange = new EventEmitter<PageState>();
  @Output() selectionChange = new EventEmitter<any[]>();
  @Output() rowAction = new EventEmitter<{ action: TableAction; row: any }>();
  @Output() cellEdit = new EventEmitter<{ row: any; column: TableColumn; value: any }>();

  private tableService = inject(DynamicTableService);
  selection = new SelectionModel<any>(true, []);
  
  displayedData = signal<any[]>([]);
  displayedColumns = signal<string[]>([]);
  totalItems = signal(0);
  pageState = signal<PageState>({ pageIndex: 0, pageSize: 10, length: 0 });
  filterValue = signal('');
  sortState = signal<SortState>({ active: '', direction: '' });

  ngOnInit(): void {
    this.processData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['config']) {
      this.processData();
    }
  }

  private processData(): void {
    let processedData = [...this.data];

    // Apply filter
    const filterVal = this.filterValue();
    if (filterVal) {
      const columns = this.tableService.getVisibleColumns(this.config);
      processedData = processedData.filter((row) =>
        columns.some((col) => {
          const value = this.tableService.getCellValue(row, col);
          return String(value).toLowerCase().includes(filterVal.toLowerCase());
        })
      );
    }

    // Apply sort
    const sort = this.sortState();
    if (sort.active && sort.direction) {
      processedData = this.tableService.sortData(processedData, sort);
    }

    // Apply pagination
    const page = this.pageState();
    if (this.config.paginated) {
      const startIndex = page.pageIndex * page.pageSize;
      processedData = processedData.slice(startIndex, startIndex + page.pageSize);
    }

    this.totalItems.set(processedData.length);
    this.displayedData.set(processedData);

    // Set displayed columns
    const columns = this.tableService.getVisibleColumns(this.config);
    let columnKeys = columns.map((c) => c.key);
    
    if (this.config.selectable) {
      columnKeys = ['select', ...columnKeys];
    }
    
    if (this.config.rowActions && this.config.rowActions.length > 0) {
      columnKeys.push('actions');
    }
    
    this.displayedColumns.set(columnKeys);
  }

  getVisibleColumns(): TableColumn[] {
    return this.tableService.getVisibleColumns(this.config);
  }

  onSortChange(sort: Sort): void {
    const sortState: SortState = {
      active: sort.active,
      direction: sort.direction as SortDirection,
    };
    this.sortState.set(sortState);
    this.processData();
    this.sortChange.emit(sortState);
  }

  onFilterChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.filterValue.set(input.value);
    this.pageState.update((p) => ({ ...p, pageIndex: 0 }));
    this.processData();
    this.filterChange.emit({ filter: input.value });
  }

  onPageChange(event: PageEvent): void {
    const pageState: PageState = {
      pageIndex: event.pageIndex,
      pageSize: event.pageSize,
      length: this.totalItems(),
    };
    this.pageState.set(pageState);
    this.processData();
    this.pageChange.emit(pageState);
  }

  toggleRow(row: any): void {
    this.selection.toggle(row);
    this.emitSelectionChange();
  }

  toggleAllRows(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.data.forEach((row) => this.selection.select(row));
    }
    this.emitSelectionChange();
  }

  isAllSelected(): boolean {
    return this.selection.selected.length === this.data.length;
  }

  private emitSelectionChange(): void {
    this.selectionChange.emit(this.selection.selected);
  }

  onRowClick(row: any, event: Event): void {
    if (this.config.onRowClick) {
      this.config.onRowClick(row, event);
    }
  }

  onRowAction(action: TableAction, row: any, event: Event): void {
    event.stopPropagation();
    if (typeof action.action === 'function') {
      action.action(row, event);
    }
    this.rowAction.emit({ action, row });
  }

  onHeaderAction(action: TableAction, event: Event): void {
    if (typeof action.action === 'function') {
      action.action(null, event);
    }
    this.rowAction.emit({ action, row: null });
  }

  isRowActionVisible(action: TableAction, row: any): boolean {
    if (typeof action.visible === 'function') {
      return action.visible(row);
    }
    return action.visible !== false;
  }

  isActionVisible(action: TableAction): boolean {
    return action.visible !== false;
  }

  getCellValue(row: any, column: TableColumn): any {
    return this.tableService.getCellValue(row, column);
  }

  formatCellValue(row: any, column: TableColumn): string {
    const value = this.tableService.getCellValue(row, column);
    return this.tableService.formatCellValue(value, column);
  }

  getCellStyle(row: any, column: TableColumn): Record<string, any> {
    return this.tableService.getCellStyle(row, column);
  }

  getCellClass(row: any, column: TableColumn): string {
    return this.tableService.getCellClass(row, column);
  }

  isCellEditable(row: any, column: TableColumn): boolean {
    return !!(this.config.inlineEditable && column.editable);
  }

  onCellEdit(row: any, column: TableColumn, event: Event): void {
    const input = event.target as HTMLInputElement;
    this.cellEdit.emit({ row, column, value: input.value });
  }

  getSelectedRows(): any[] {
    return this.selection.selected;
  }

  clearSelection(): void {
    this.selection.clear();
    this.emitSelectionChange();
  }
}
