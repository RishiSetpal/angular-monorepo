import { Component, Input, Output, EventEmitter, ContentChildren, QueryList, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';

export interface TabItem {
  label: string;
  icon?: string;
  disabled?: boolean;
  content?: any;
  template?: TemplateRef<any>;
}

@Component({
  selector: 'lib-tab-group',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatIconModule],
  template: `
    <mat-tab-group
      [selectedIndex]="selectedIndex"
      [animationDuration]="animationDuration"
      [headerPosition]="headerPosition"
      (selectedIndexChange)="onSelectedIndexChange($event)"
    >
      @for (tab of tabs; track tab.label; let i = $index) {
        <mat-tab [disabled]="tab.disabled">
          <ng-template mat-tab-label>
            @if (tab.icon) {
              <mat-icon>{{ tab.icon }}</mat-icon>
            }
            {{ tab.label }}
          </ng-template>
          @if (tab.template) {
            <ng-container *ngTemplateOutlet="tab.template"></ng-container>
          } @else {
            {{ tab.content }}
          }
        </mat-tab>
      }
    </mat-tab-group>
  `,
  styles: [`
    :host { display: block; }
    mat-icon { margin-right: 8px; }
  `],
})
export class TabGroupComponent {
  @Input() tabs: TabItem[] = [];
  @Input() selectedIndex = 0;
  @Input() animationDuration = '500ms';
  @Input() headerPosition: 'above' | 'below' = 'above';

  @Output() tabChanged = new EventEmitter<number>();

  onSelectedIndexChange(index: number): void {
    this.selectedIndex = index;
    this.tabChanged.emit(index);
  }
}
