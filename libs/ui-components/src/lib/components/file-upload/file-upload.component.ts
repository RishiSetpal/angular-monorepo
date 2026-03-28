import { Component, Input, forwardRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FileUploadConfig, FileItem } from '@org/shared';

@Component({
  selector: 'lib-file-upload',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatIconModule, MatProgressBarModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true,
    },
  ],
  template: `
    <div [class]="className">
      @if (config.showPreview && currentFile()) {
        <div class="preview-container">
          @if (isImage(currentFile()!.type)) {
            <img [src]="currentFile()!.url || getObjectURL(currentFile()!.file)" [alt]="currentFile()!.name" />
          } @else {
            <div class="file-icon">
              <mat-icon>description</mat-icon>
              <span>{{ currentFile()!.name }}</span>
            </div>
          }
          @if (config.editable) {
            <button mat-icon-button (click)="triggerFileInput()">
              <mat-icon>edit</mat-icon>
            </button>
          }
          @if (config.showDownload && currentFile()!.url) {
            <button mat-icon-button (click)="downloadFile()">
              <mat-icon>download</mat-icon>
            </button>
          }
        </div>
      } @else {
        <div class="upload-area" (click)="triggerFileInput()" (dragover)="onDragOver($event)" (drop)="onDrop($event)">
          <input #fileInput type="file" [accept]="config.accept" [multiple]="config.multiple" 
                 (change)="onFileSelect($event)" style="display: none;" />
          <mat-icon>cloud_upload</mat-icon>
          <p>Drag & drop files or click to browse</p>
          @if (currentFile()) {
            <p class="file-name">{{ currentFile()!.name }}</p>
          }
        </div>
      }
      @if (uploading()) {
        <mat-progress-bar mode="determinate" [value]="uploadProgress()"></mat-progress-bar>
      }
    </div>
  `,
  styles: [`
    :host { display: block; }
    .preview-container {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 16px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    .preview-container img {
      max-width: 200px;
      max-height: 200px;
      object-fit: contain;
    }
    .file-icon {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .upload-area {
      border: 2px dashed #ccc;
      border-radius: 8px;
      padding: 32px;
      text-align: center;
      cursor: pointer;
      transition: border-color 0.3s;
    }
    .upload-area:hover { border-color: #3f51b5; }
    .upload-area mat-icon { font-size: 48px; width: 48px; height: 48px; }
    .file-name { font-weight: bold; margin-top: 8px; }
  `],
})
export class FileUploadComponent implements ControlValueAccessor {
  @Input() config: FileUploadConfig = {
    accept: '*',
    maxSize: 5 * 1024 * 1024,
    multiple: false,
    showPreview: true,
    showDownload: true,
    editable: true,
  };
  @Input() className = '';
  @Input() disabled = false;

  currentFile = signal<FileItem | null>(null);
  uploading = signal(false);
  uploadProgress = signal(0);

  private onChangeFn: (value: FileItem | null) => void = () => {};
  private onTouchedFn: () => void = () => {};

  writeValue(value: FileItem | null): void {
    this.currentFile.set(value);
  }

  registerOnChange(fn: (value: FileItem | null) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  triggerFileInput(): void {
    if (!this.disabled) {
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      input?.click();
    }
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.processFile(input.files[0]);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
      this.processFile(event.dataTransfer.files[0]);
    }
  }

  processFile(file: File): void {
    if (file.size > this.config.maxSize!) {
      alert(`File size exceeds ${this.config.maxSize! / 1024 / 1024}MB`);
      return;
    }

    const fileItem: FileItem = {
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'uploading',
    };

    this.currentFile.set(fileItem);
    this.uploading.set(true);
    this.uploadProgress.set(0);

    const interval = setInterval(() => {
      const progress = this.uploadProgress() + 10;
      if (progress >= 100) {
        clearInterval(interval);
        fileItem.status = 'complete';
        fileItem.progress = 100;
        this.uploading.set(false);
        this.onChangeFn(fileItem);
        this.onTouchedFn();
      } else {
        this.uploadProgress.set(progress);
        fileItem.progress = progress;
      }
    }, 100);
  }

  downloadFile(): void {
    const file = this.currentFile();
    if (file?.url) {
      const link = document.createElement('a');
      link.href = file.url;
      link.download = file.name;
      link.click();
    }
  }

  getObjectURL(file?: File): string {
    return file ? URL.createObjectURL(file) : '';
  }

  isImage(type?: string): boolean {
    return type?.startsWith('image/') || false;
  }
}
