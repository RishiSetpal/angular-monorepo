import { Component, Input, forwardRef, signal, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FileUploadConfig, FileItem } from '@org/shared';

@Component({
  selector: 'lib-file-upload',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatIconModule, MatProgressBarModule, MatChipsModule, MatTooltipModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true,
    },
  ],
  template: `
    <div [class]="className">
      @if (config.multiple) {
        <!-- Multiple File Upload -->
        <div class="upload-section">
          <div class="upload-area" (click)="triggerFileInput()" (dragover)="onDragOver($event)" (drop)="onDrop($event)">
            <input #fileInput type="file" [accept]="config.accept" [multiple]="true" 
                   (change)="onFileSelect($event)" style="display: none;" />
            <mat-icon>cloud_upload</mat-icon>
            <p>Drag & drop files or click to browse</p>
            <span class="hint">Allowed: {{ config.accept }}</span>
          </div>
          
          @if (files().length > 0) {
            <div class="files-list">
              @for (file of files(); track file.name; let i = $index) {
                <div class="file-item" [class.uploading]="file.status === 'uploading'" [class.error]="file.status === 'error'">
                  <div class="file-icon" (click)="previewFile(file)">
                    @if (isImage(file.type)) {
                      <img [src]="file.url || getObjectURL(file.file)" [alt]="file.name" />
                    } @else {
                      <mat-icon>{{ getFileTypeIcon(file.type) }}</mat-icon>
                    }
                  </div>
                  <div class="file-details">
                    <span class="file-name" [matTooltip]="file.name">{{ file.name }}</span>
                    <span class="file-size">{{ formatFileSize(file.size) }}</span>
                    @if (file.status === 'uploading') {
                      <mat-progress-bar mode="determinate" [value]="file.progress"></mat-progress-bar>
                    }
                  </div>
                  <div class="file-actions">
                    <button mat-icon-button (click)="previewFile(file)" matTooltip="Preview">
                      <mat-icon>visibility</mat-icon>
                    </button>
                    @if (config.showDownload && file.url) {
                      <button mat-icon-button (click)="downloadFile(file)" matTooltip="Download">
                        <mat-icon>download</mat-icon>
                      </button>
                    }
                    <button mat-icon-button (click)="removeFile(i)" matTooltip="Remove">
                      <mat-icon>close</mat-icon>
                    </button>
                  </div>
                </div>
              }
            </div>
          }
        </div>
      } @else {
        <!-- Single File Upload -->
        @if (currentFile()) {
          <div class="preview-container">
            <div class="file-preview" (click)="previewFile(currentFile()!)">
              @if (isImage(currentFile()!.type)) {
                <img [src]="currentFile()!.url || getObjectURL(currentFile()!.file)" [alt]="currentFile()!.name" />
              } @else {
                <div class="file-icon-large">
                  <mat-icon>{{ getFileTypeIcon(currentFile()!.type) }}</mat-icon>
                  <span>{{ getFileExtension(currentFile()!.name) }}</span>
                </div>
              }
            </div>
            <div class="file-info">
              <span class="file-name" [matTooltip]="currentFile()!.name">{{ currentFile()!.name }}</span>
              <span class="file-size">{{ formatFileSize(currentFile()!.size) }}</span>
            </div>
            <div class="file-actions">
              @if (config.showDownload && currentFile()!.url) {
                <button mat-icon-button (click)="downloadFile(currentFile()!)" matTooltip="Download">
                  <mat-icon>download</mat-icon>
                </button>
              }
              @if (config.editable) {
                <button mat-icon-button (click)="triggerFileInput()" matTooltip="Replace">
                  <mat-icon>edit</mat-icon>
                </button>
              }
              <button mat-icon-button (click)="clearFile()" matTooltip="Remove">
                <mat-icon>delete</mat-icon>
              </button>
            </div>
            <input #fileInput type="file" [accept]="config.accept" [multiple]="false" 
                   (change)="onFileSelect($event)" style="display: none;" />
          </div>
        } @else {
          <div class="upload-area" (click)="triggerFileInput()" (dragover)="onDragOver($event)" (drop)="onDrop($event)">
            <input #fileInput type="file" [accept]="config.accept" [multiple]="false" 
                   (change)="onFileSelect($event)" style="display: none;" />
            <mat-icon>cloud_upload</mat-icon>
            <p>Drag & drop file or click to browse</p>
            <span class="hint">Allowed: {{ config.accept }}</span>
          </div>
        }
      }
      
      @if (uploading()) {
        <mat-progress-bar mode="determinate" [value]="uploadProgress()"></mat-progress-bar>
      }
    </div>
  `,
  styles: [`
    :host { display: block; }
    .upload-area {
      border: 2px dashed #ccc;
      border-radius: 8px;
      padding: 32px;
      text-align: center;
      cursor: pointer;
      transition: border-color 0.3s, background-color 0.3s;
    }
    .upload-area:hover { border-color: #3f51b5; background-color: #f8f9fa; }
    .upload-area mat-icon { font-size: 48px; width: 48px; height: 48px; color: #666; }
    .upload-area p { margin: 8px 0 4px; color: #333; }
    .upload-area .hint { font-size: 12px; color: #999; }
    
    .preview-container {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      background: #fafafa;
    }
    .file-preview {
      width: 80px;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border-radius: 4px;
      overflow: hidden;
      background: white;
    }
    .file-preview img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
    .file-icon-large {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #666;
    }
    .file-icon-large mat-icon { font-size: 40px; width: 40px; height: 40px; }
    .file-icon-large span { font-size: 10px; font-weight: bold; }
    
    .file-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
      min-width: 0;
    }
    .file-name {
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 200px;
    }
    .file-size { font-size: 12px; color: #666; }
    .file-actions { display: flex; gap: 4px; }
    
    .files-list {
      margin-top: 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .file-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      background: #fafafa;
    }
    .file-item.uploading { border-color: #2196f3; }
    .file-item.error { border-color: #f44336; }
    .file-item .file-icon {
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border-radius: 4px;
      background: white;
    }
    .file-item .file-icon img { max-width: 100%; max-height: 100%; object-fit: contain; }
    .file-item .file-icon mat-icon { font-size: 32px; width: 32px; height: 32px; color: #666; }
    .file-item .file-details {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
      min-width: 0;
    }
    .file-item .file-actions { display: flex; gap: 2px; }
  `],
})
export class FileUploadComponent implements ControlValueAccessor {
  @Input() config: FileUploadConfig = {
    accept: '*',
    maxSize: 10 * 1024 * 1024,
    multiple: false,
    showPreview: true,
    showDownload: true,
    editable: true,
  };
  @Input() className = '';
  @Input() disabled = false;

  @Output() fileChange = new EventEmitter<FileItem | FileItem[] | null>();
  @Output() filePreview = new EventEmitter<FileItem>();

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  currentFile = signal<FileItem | null>(null);
  files = signal<FileItem[]>([]);
  uploading = signal(false);
  uploadProgress = signal(0);

  private onChangeFn: (value: FileItem | FileItem[] | null) => void = () => {};
  private onTouchedFn: () => void = () => {};

  writeValue(value: FileItem | FileItem[] | null): void {
    if (this.config.multiple) {
      if (Array.isArray(value)) {
        this.files.set(value);
      } else {
        this.files.set(value ? [value] : []);
      }
    } else {
      if (Array.isArray(value)) {
        this.currentFile.set(value.length > 0 ? value[0] : null);
      } else {
        this.currentFile.set(value);
      }
    }
  }

  registerOnChange(fn: (value: FileItem | FileItem[] | null) => void): void {
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
      this.fileInput.nativeElement.click();
    }
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    if (this.config.multiple) {
      Array.from(input.files).forEach(file => this.processFile(file));
    } else {
      if (input.files[0]) {
        this.processFile(input.files[0]);
      }
    }
    input.value = '';
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    if (!event.dataTransfer?.files) return;

    if (this.config.multiple) {
      Array.from(event.dataTransfer.files).forEach(file => this.processFile(file));
    } else {
      if (event.dataTransfer.files[0]) {
        this.processFile(event.dataTransfer.files[0]);
      }
    }
  }

  processFile(file: File): void {
    if (this.config.maxSize && file.size > this.config.maxSize) {
      alert(`File size exceeds ${this.config.maxSize / 1024 / 1024}MB`);
      return;
    }

    const fileItem: FileItem = {
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'uploading',
    };

    if (this.config.multiple) {
      this.files.update(f => [...f, fileItem]);
    } else {
      this.currentFile.set(fileItem);
    }

    this.simulateUpload(fileItem);
  }

  private simulateUpload(fileItem: FileItem): void {
    this.uploading.set(true);
    this.uploadProgress.set(0);

    const interval = setInterval(() => {
      const progress = this.uploadProgress() + 15;
      if (progress >= 100) {
        clearInterval(interval);
        fileItem.status = 'complete';
        fileItem.progress = 100;
        this.uploading.set(false);
        this.uploadProgress.set(0);
        
        if (this.config.multiple) {
          this.onChangeFn(this.files());
        } else {
          this.onChangeFn(this.currentFile());
        }
        this.fileChange.emit(this.config.multiple ? this.files() : this.currentFile());
        this.onTouchedFn();
      } else {
        this.uploadProgress.set(progress);
        fileItem.progress = progress;
      }
    }, 100);
  }

  removeFile(index: number): void {
    this.files.update(f => f.filter((_, i) => i !== index));
    this.onChangeFn(this.files());
    this.fileChange.emit(this.files());
  }

  clearFile(): void {
    this.currentFile.set(null);
    this.onChangeFn(null);
    this.fileChange.emit(null);
  }

  previewFile(file: FileItem): void {
    this.filePreview.emit(file);
    
    if (file.url || file.file) {
      const url = file.url || this.getObjectURL(file.file);
      if (this.isImage(file.type)) {
        window.open(url, '_blank');
      } else {
        window.open(url, '_blank');
      }
    }
  }

  downloadFile(file: FileItem): void {
    if (file.url) {
      const link = document.createElement('a');
      link.href = file.url;
      link.download = file.name;
      link.click();
    } else if (file.file) {
      const url = this.getObjectURL(file.file);
      const link = document.createElement('a');
      link.href = url;
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

  getFileTypeIcon(type?: string): string {
    if (!type) return 'description';
    if (type.includes('pdf')) return 'picture_as_pdf';
    if (type.includes('word') || type.includes('document')) return 'description';
    if (type.includes('excel') || type.includes('sheet') || type.includes('spreadsheet')) return 'table_chart';
    if (type.includes('image')) return 'image';
    if (type.includes('text')) return 'text_snippet';
    if (type.includes('zip') || type.includes('rar') || type.includes('archive')) return 'folder_zip';
    return 'description';
  }

  getFileExtension(filename: string): string {
    return filename.split('.').pop()?.toUpperCase() || '';
  }

  formatFileSize(bytes?: number): string {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
