import { Component, Inject, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DialogConfig } from '@org/shared';

@Component({
  selector: 'lib-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content>
      <p>{{ data.message }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      @if (!data.disableClose) {
        <button mat-button mat-dialog-close>Cancel</button>
      }
      <button mat-raised-button [color]="confirmColor" [mat-dialog-close]="true" cdkFocusInitial>
        {{ data.confirmText || 'Confirm' }}
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    mat-dialog-actions { padding: 16px; }
    p { margin: 0; }
  `],
})
export class DialogComponent {
  confirmColor: 'primary' | 'accent' | 'warn' = 'primary';

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogConfig
  ) {}
}
