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
import { HandlebarsTemplateService } from '../services/handlebars-template.service';
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

          <!-- Вкладка: Live Preview (только для HTML/TXT) -->
          @if (supportsClientRendering()) {
            <mat-tab label="Live Preview" [disabled]="!canShowLivePreview()">
              <div class="tab-content">
                @if (!canShowLivePreview()) {
                  <div class="empty-state">
                    <mat-icon>preview</mat-icon>
                    <h4>Предпросмотр недоступен</h4>
                    <p>Сначала выберите файл HTML или TXT шаблона</p>
                  </div>
                } @else {
                  <div class="preview-controls">
                    <button mat-raised-button 
                            color="primary" 
                            (click)="toggleLivePreview()"
                            [disabled]="!templateContent()">
                      <mat-icon>{{ showLivePreview() ? 'visibility_off' : 'visibility' }}</mat-icon>
                      {{ showLivePreview() ? 'Скрыть предпросмотр' : 'Показать предпросмотр' }}
                    </button>
                    
                    <button mat-button 
                            (click)="validateTemplate()"
                            [disabled]="!templateContent()">
                      <mat-icon>check_circle</mat-icon>
                      Проверить шаблон
                    </button>
                  </div>

                  @if (showLivePreview()) {
                    <div class="preview-section">
                      <h4>Тестовые данные (JSON):</h4>
                      <mat-form-field appearance="outline" class="full-width">
                        <mat-label>JSON данные для предпросмотра</mat-label>
                        <textarea matInput 
                                  [value]="sampleData()"
                                  (input)="updateSampleData($event)"
                                  class="json-textarea"
                                  rows="8"
                                  placeholder='{"name": "Пример", "date": "2024-01-01"}'>
                        </textarea>
                        <mat-hint>Измените данные для тестирования шаблона</mat-hint>
                      </mat-form-field>

                      <h4>Результат:</h4>
                      @if (previewError()) {
                        <div class="error-container">
                          <mat-icon>error</mat-icon>
                          <h4>Ошибка рендеринга</h4>
                          <p>{{ previewError() }}</p>
                        </div>
                      } @else if (previewContent()) {
                        <div class="preview-result" 
                             [class.html-preview]="templateForm.get('format')?.value === 'html'"
                             [class.txt-preview]="templateForm.get('format')?.value === 'txt'">
                          @if (templateForm.get('format')?.value === 'html') {
                            <div [innerHTML]="previewContent()"></div>
                          } @else {
                            <pre>{{ previewContent() }}</pre>
                          }
                        </div>
                      } @else {
                        <div class="empty-preview">
                          <mat-icon>description</mat-icon>
                          <h4>Предпросмотр пуст</h4>
                          <p>Проверьте шаблон и данные</p>
                        </div>
                      }
                    </div>
                  }
                }
              </div>
            </mat-tab>
          }
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
  styleUrls: ['./dialogs-shared.scss', '../document-templates.scss']
})
export class TemplateEditorDialogComponent implements OnInit {
  private dialogRef = inject(MatDialogRef<TemplateEditorDialogComponent>);
  private data = inject<TemplateEditorDialogData>(MAT_DIALOG_DATA);
  private templateService = inject(DocumentTemplateService);
  private handlebarsService = inject(HandlebarsTemplateService);
  private snackBar = inject(MatSnackBar);
  private fb = inject(FormBuilder);

  templateForm!: FormGroup;
  loading = signal(false);
  selectedFile = signal<File | null>(null);
  fileError = signal<string | null>(null);
  
  // Новые свойства для Handlebars поддержки
  templateContent = signal<string>('');
  sampleData = signal<string>('{}');
  previewContent = signal<string>('');
  previewError = signal<string | null>(null);
  showLivePreview = signal(false);

  supportedFormats = SUPPORTED_FORMATS;

  // Computed properties
  isCreateMode = computed(() => this.data.mode === 'create');
  
  // Проверяем, поддерживает ли выбранный формат клиентский рендеринг
  supportsClientRendering = computed(() => {
    const format = this.templateForm?.get('format')?.value;
    return format && this.templateService.supportsClientRendering(format);
  });
  
  // Можно ли показывать live preview
  canShowLivePreview = computed(() => {
    return this.supportsClientRendering() && this.templateContent().length > 0;
  });
  
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

  // === Методы для поддержки Handlebars ===

  /**
   * Чтение содержимого файла для live preview
   */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    
    this.fileError.set(null);
    this.templateContent.set('');
    this.previewContent.set('');
    this.previewError.set(null);
    
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

    // Читаем содержимое файла для HTML/TXT шаблонов
    if (this.templateService.supportsClientRendering(selectedFormat)) {
      this.readFileContent(file);
    }
  }

  /**
   * Чтение содержимого файла для предпросмотра
   */
  private readFileContent(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const content = e.target.result;
      this.templateContent.set(content);
      this.generateSampleDataFromTemplate(content);
      this.updatePreview();
    };
    reader.onerror = () => {
      this.fileError.set('Ошибка чтения файла');
    };
    reader.readAsText(file);
  }

  /**
   * Генерация примера данных на основе шаблона
   */
  private generateSampleDataFromTemplate(templateContent: string): void {
    try {
      const sampleData = this.handlebarsService.generateSampleData(templateContent);
      this.sampleData.set(JSON.stringify(sampleData, null, 2));
    } catch (error) {
      console.warn('Не удалось сгенерировать пример данных:', error);
      this.sampleData.set('{\n  "name": "Пример значения",\n  "date": "2024-01-01",\n  "amount": 1000\n}');
    }
  }

  /**
   * Обновление предпросмотра
   */
  updatePreview(): void {
    if (!this.showLivePreview() || !this.templateContent()) {
      return;
    }

    const format = this.templateForm.get('format')?.value;
    if (!this.templateService.supportsClientRendering(format)) {
      return;
    }

    try {
      const data = JSON.parse(this.sampleData());
      const result = this.handlebarsService.renderTemplate(
        this.templateContent(), 
        data, 
        format as 'html' | 'txt'
      );

      if (result.success) {
        this.previewContent.set(result.content || '');
        this.previewError.set(null);
      } else {
        this.previewContent.set('');
        this.previewError.set(result.error || 'Ошибка рендеринга');
      }
    } catch (error: any) {
      this.previewContent.set('');
      this.previewError.set(`Ошибка в JSON данных: ${error.message}`);
    }
  }

  /**
   * Переключение отображения предпросмотра
   */
  toggleLivePreview(): void {
    this.showLivePreview.set(!this.showLivePreview());
    if (this.showLivePreview()) {
      this.updatePreview();
    }
  }

  /**
   * Обновление данных для предпросмотра (обработчик события input)
   */
  updateSampleData(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    if (target) {
      this.onSampleDataChange(target.value);
    }
  }

  /**
   * Обновление данных для предпросмотра
   */
  onSampleDataChange(newData: string): void {
    this.sampleData.set(newData);
    if (this.showLivePreview()) {
      this.updatePreview();
    }
  }

  /**
   * Валидация Handlebars шаблона
   */
  validateTemplate(): void {
    if (!this.templateContent()) {
      this.snackBar.open('Сначала выберите файл шаблона', 'Закрыть', { duration: 3000 });
      return;
    }

    const validation = this.handlebarsService.validateTemplate(this.templateContent());
    if (validation.isValid) {
      this.snackBar.open('Шаблон корректен!', 'Закрыть', { duration: 3000 });
      this.previewError.set(null);
    } else {
      const errorMessage = validation.errors.join('; ');
      this.snackBar.open(`Ошибки в шаблоне: ${errorMessage}`, 'Закрыть', { duration: 5000 });
      this.previewError.set(errorMessage);
    }
  }
}