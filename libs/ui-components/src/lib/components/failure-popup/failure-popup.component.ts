import { Component, Inject, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActionButton } from '@org/shared';

export interface FailurePopupConfig {
  title: string;
  message?: string;
  icon?: string;
  buttons?: ActionButton[];
  allowSideClose?: boolean;
  autoClose?: boolean;
  autoCloseDuration?: number;
}

@Component({
  selector: 'lib-failure-popup',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="failure-popup" [class.clickable]="data.allowSideClose" (click)="onSideClick($event)">
      <div class="content" (click)="$event.stopPropagation()">
        <div class="icon-container">
          <mat-icon>{{ data.icon || 'error' }}</mat-icon>
        </div>
        <h2 mat-dialog-title>{{ data.title }}</h2>
        @if (data.message) {
          <mat-dialog-content>
            <p>{{ data.message }}</p>
          </mat-dialog-content>
        }
        <mat-dialog-actions align="center">
          @for (button of data.buttons || [{ label: 'Close', action: 'close', color: 'warn' }]; track button.label) {
            <button mat-raised-button [color]="button.color || 'warn'" (click)="onButtonClick(button)">
              {{ button.label }}
            </button>
          }
        </mat-dialog-actions>
      </div>
    </div>
  `,
  styles: [`
    .failure-popup { 
      position: relative; 
      text-align: center; 
      padding: 16px; 
    }
    .failure-popup.clickable {
      cursor: pointer;
    }
    .content { cursor: default; }
    .icon-container mat-icon { font-size: 64px; width: 64px; height: 64px; color: #f44336; }
    h2 { margin-bottom: 8px !important; }
    p { color: #666; }
    mat-dialog-actions { justify-content: center; gap: 8px; }
  `],
})
export class FailurePopupComponent {
  constructor(
    public dialogRef: MatDialogRef<FailurePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FailurePopupConfig
  ) {
    if (data.autoClose && data.autoCloseDuration) {
      setTimeout(() => this.dialogRef.close(), data.autoCloseDuration);
    }
  }

  onButtonClick(button: ActionButton): void {
    if (typeof button.action === 'function') {
      button.action();
    }
    this.dialogRef.close(button.action);
  }

  onSideClick(event: Event): void {
    if (this.data.allowSideClose) {
      this.dialogRef.close();
    }
  }
}
