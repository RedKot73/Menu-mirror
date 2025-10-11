import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import { DocumentTemplateService } from '../../ServerService/document-template.service';
import { TemplateListItem, CreateTemplateDto, SUPPORTED_FORMATS } from '../../models/document-template.models';

export interface TemplateEditorDialogData {
  mode: 'create' | 'edit';
  template?: TemplateListItem;
}

@Component({
  selector: 'app-template-editor-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressBarModule,
    MatIconModule,
    MatTabsModule
  ],
  template: `
    <h2 mat-dialog-title>
      <mat-icon>{{ isCreateMode() ? 'add' : 'edit' }}</mat-icon>
      {{ isCreateMode() ? 'Создание шаблона' : 'Редактирование шаблона' }}
    </h2>

    <div mat-dialog-content class="dialog-content small">
      <form [formGroup]="templateForm" class="template-form">
        
        <mat-tab-group class="editor-tabs">
          <!-- Вкладка: Основные данные -->
          <mat-tab label="Основные данные">
            <div class="tab-content">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Название шаблона</mat-label>
                <input matInput 
                       formControlName="name"
                       placeholder="Введите название шаблона"
                       maxlength="255">
                @if (templateForm.get('name')?.hasError('required')) {
                  <mat-error>Название обязательно</mat-error>
                }
                @if (templateForm.get('name')?.hasError('maxlength')) {
                  <mat-error>Максимум 255 символов</mat-error>
                }
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Описание</mat-label>
                <textarea matInput 
                          formControlName="description"
                          placeholder="Описание шаблона (необязательно)"
                          rows="3"
                          maxlength="1000">
                </textarea>
                <mat-hint>{{ descriptionLength() }}/1000</mat-hint>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Формат</mat-label>
                <mat-select formControlName="format">
                  @for (format of supportedFormats; track format) {
                    <mat-option [value]="format">
                      {{ getFormatDisplayName(format) }}
                    </mat-option>
                  }
                </mat-select>
                @if (templateForm.get('format')?.hasError('required')) {
                  <mat-error>Выберите формат</mat-error>
                }
              </mat-form-field>
            </div>
          </mat-tab>

          <!-- Вкладка: Файл шаблона -->
          <mat-tab label="Файл шаблона">
            <div class="tab-content">
              <div class="file-upload-section">
                <h3>{{ isCreateMode() ? 'Загрузка файла шаблона' : 'Обновление файла шаблона' }}</h3>
                
                @if (!isCreateMode()) {
                  <p class="file-info">
                    <mat-icon>info</mat-icon>
                    Если не выберете новый файл, текущий шаблон останется без изменений
                  </p>
                }

                <div class="file-input-container">
                  <input #fileInput
                         type="file"
                         (change)="onFileSelected($event)"
                         [accept]="getAcceptedFileTypes()"
                         class="file-input"
                         id="templateFile">
                  
                  <label for="templateFile" class="file-input-label" matRipple>
                    <mat-icon>upload_file</mat-icon>
                    {{ selectedFile() ? selectedFile()!.name : 'Выберите файл шаблона' }}
                  </label>
                </div>

                @if (selectedFile()) {
                  <div class="file-details">
                    <div class="file-detail">
                      <strong>Имя файла:</strong> {{ selectedFile()!.name }}
                    </div>
                    <div class="file-detail">
                      <strong>Размер:</strong> {{ getFileSize(selectedFile()!.size) }}
                    </div>
                    <div class="file-detail">
                      <strong>Тип:</strong> {{ selectedFile()!.type || 'Неизвестно' }}
                    </div>
                  </div>
                }

                @if (fileError()) {
                  <div class="file-error">
                    <mat-icon>error</mat-icon>
                    {{ fileError() }}
                  </div>
                }

                <div class="format-hints">
                  <h4>Поддерживаемые форматы:</h4>
                  <ul>
                    <li><strong>HTML:</strong> .html, .htm - HTML шаблоны с Handlebars синтаксисом</li>
                    <li><strong>TXT:</strong> .txt - Текстовые шаблоны с переменными</li>
                    <li><strong>DOCX:</strong> .docx - Microsoft Word документы с полями</li>
                  </ul>
                </div>
              </div>
            </div>
          </mat-tab>
        </mat-tab-group>
      </form>

      @if (loading()) {
        <mat-progress-bar mode="indeterminate"></mat-progress-bar>
      }
    </div>

    <div mat-dialog-actions align="end" class="dialog-actions">
      <button mat-button (click)="onCancel()" [disabled]="loading()">
        Отмена
      </button>
      <button mat-raised-button 
              color="primary" 
              (click)="onSave()" 
              [disabled]="!canSave() || loading()">
        <mat-icon>{{ isCreateMode() ? 'add' : 'save' }}</mat-icon>
        {{ isCreateMode() ? 'Создать' : 'Сохранить' }}
      </button>
    </div>
  `,
  styleUrls: ['./dialogs-shared.scss', '../document-templates-shared.scss']
})
export class TemplateEditorDialogComponent implements OnInit {
  private dialogRef = inject(MatDialogRef<TemplateEditorDialogComponent>);
  private data = inject<TemplateEditorDialogData>(MAT_DIALOG_DATA);
  private templateService = inject(DocumentTemplateService);
  private snackBar = inject(MatSnackBar);
  private fb = inject(FormBuilder);

  templateForm!: FormGroup;
  loading = signal(false);
  selectedFile = signal<File | null>(null);
  fileError = signal<string | null>(null);

  supportedFormats = SUPPORTED_FORMATS;

  // Computed properties
  isCreateMode = computed(() => this.data.mode === 'create');
  
  descriptionLength = computed(() => {
    const description = this.templateForm?.get('description')?.value || '';
    return description.length;
  });

  canSave = computed(() => {
    if (!this.templateForm) return false;
    
    const isFormValid = this.templateForm.valid;
    const hasFile = this.isCreateMode() ? this.selectedFile() !== null : true;
    const noFileError = this.fileError() === null;
    
    return isFormValid && hasFile && noFileError;
  });

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    const template = this.data.template;
    
    this.templateForm = this.fb.group({
      name: [template?.name || '', [Validators.required, Validators.maxLength(255)]],
      description: [template?.description || '', [Validators.maxLength(1000)]],
      format: [template?.format || 'html', [Validators.required]]
    });
  }

  getFormatDisplayName(format: string): string {
    const formatNames: Record<string, string> = {
      'html': 'HTML (веб-страница)',
      'txt': 'TXT (текстовый файл)', 
      'docx': 'DOCX (Microsoft Word)'
    };
    return formatNames[format] || format.toUpperCase();
  }

  getAcceptedFileTypes(): string {
    const selectedFormat = this.templateForm?.get('format')?.value;
    const acceptTypes: Record<string, string> = {
      'html': '.html,.htm',
      'txt': '.txt',
      'docx': '.docx'
    };
    return acceptTypes[selectedFormat] || '*';
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    
    this.fileError.set(null);
    
    if (!file) {
      this.selectedFile.set(null);
      return;
    }

    // Валидация размера файла (50MB)
    const maxSize = 50 * 1024 * 1024;
    if (file.size > maxSize) {
      this.fileError.set('Размер файла не должен превышать 50MB');
      this.selectedFile.set(null);
      return;
    }

    // Валидация расширения файла
    const selectedFormat = this.templateForm.get('format')?.value;
    const validExtensions: Record<string, string[]> = {
      'html': ['.html', '.htm'],
      'txt': ['.txt'],
      'docx': ['.docx']
    };

    if (selectedFormat && validExtensions[selectedFormat]) {
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      if (!validExtensions[selectedFormat].includes(fileExtension)) {
        this.fileError.set(`Для формата ${selectedFormat.toUpperCase()} ожидается файл с расширением: ${validExtensions[selectedFormat].join(', ')}`);
        this.selectedFile.set(null);
        return;
      }
    }

    this.selectedFile.set(file);
  }

  getFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  onSave(): void {
    if (!this.canSave()) return;

    this.loading.set(true);
    const formValue = this.templateForm.value;
    
    const dto: CreateTemplateDto = {
      name: formValue.name.trim(),
      description: formValue.description?.trim() || undefined,
      format: formValue.format
    };

    if (this.isCreateMode()) {
      this.templateService.createTemplate(dto, this.selectedFile()!).subscribe({
        next: (result: TemplateListItem) => {
          this.loading.set(false);
          this.snackBar.open('Шаблон создан успешно', 'Закрыть', { duration: 3000 });
          this.dialogRef.close(result);
        },
        error: (error: any) => {
          this.loading.set(false);
          console.error('Ошибка создания шаблона:', error);
          this.snackBar.open(`Ошибка: ${error.message}`, 'Закрыть', { duration: 5000 });
        }
      });
    } else {
      this.templateService.updateTemplate(this.data.template!.id, dto, this.selectedFile() || undefined).subscribe({
        next: () => {
          this.loading.set(false);
          this.snackBar.open('Шаблон обновлен успешно', 'Закрыть', { duration: 3000 });
          this.dialogRef.close(true);
        },
        error: (error: any) => {
          this.loading.set(false);
          console.error('Ошибка обновления шаблона:', error);
          this.snackBar.open(`Ошибка: ${error.message}`, 'Закрыть', { duration: 5000 });
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}