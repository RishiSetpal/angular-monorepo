import { Component, Inject, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActionButton } from '@org/shared';

export interface SuccessPopupConfig {
  title: string;
  message?: string;
  icon?: string;
  buttons?: ActionButton[];
  autoClose?: boolean;
  autoCloseDuration?: number;
}

@Component({
  selector: 'lib-success-popup',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="success-popup">
      <div class="icon-container">
        <mat-icon>{{ data.icon || 'check_circle' }}</mat-icon>
      </div>
      <h2 mat-dialog-title>{{ data.title }}</h2>
      @if (data.message) {
        <mat-dialog-content>
          <p>{{ data.message }}</p>
        </mat-dialog-content>
      }
      <mat-dialog-actions align="center">
        @for (button of data.buttons || [{ label: 'OK', action: 'close', color: 'primary' }]; track button.label) {
          <button mat-raised-button [color]="button.color || 'primary'" (click)="onButtonClick(button)">
            {{ button.label }}
          </button>
        }
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .success-popup { text-align: center; padding: 16px; }
    .icon-container mat-icon { font-size: 64px; width: 64px; height: 64px; color: #4caf50; }
    h2 { margin-bottom: 8px !important; }
    p { color: #666; }
    mat-dialog-actions { justify-content: center; gap: 8px; }
  `],
})
export class SuccessPopupComponent {
  constructor(
    public dialogRef: MatDialogRef<SuccessPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SuccessPopupConfig
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
}
