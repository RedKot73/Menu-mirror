import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { DocumentTemplateService } from '../services/document-template.service';
import { HandlebarsTemplateService } from '../services/handlebars-template.service';
import { TemplateDto/*, RenderRequest*/ } from '../models/document-template.models';
import { EXPORT_FORMATS } from '../models/shared.models';

export interface TemplatePreviewDialogData {
  template: TemplateDto;
}

@Component({
  selector: 'app-template-preview-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatIconModule,
    MatTabsModule,
    MatMenuModule
  ],
  template: `
    <h2 mat-dialog-title>
      <mat-icon>preview</mat-icon>
      Предварительный просмотр: {{ data.template.name }}
    </h2>

    <div mat-dialog-content class="dialog-content large">
      <mat-tab-group class="preview-tabs">
        
        <!-- Вкладка: Данные для заполнения -->
        <mat-tab label="Данные">
          <div class="tab-content">
            <form [formGroup]="dataForm" class="data-form">
              <h3>JSON данные для заполнения шаблона</h3>
              <p class="help-text">
                Введите JSON данные, которые будут использованы для заполнения переменных в шаблоне.
              </p>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>JSON данные</mat-label>
                <textarea matInput 
                          formControlName="dataJson"
                          placeholder='{ "name": "Значение", "date": "2024-01-01" }'
                          rows="10"
                          class="json-textarea">
                </textarea>
                <mat-hint>Формат: валидный JSON</mat-hint>
                @if (jsonError()) {
                  <mat-error>{{ jsonError() }}</mat-error>
                }
              </mat-form-field>

              <div class="data-actions">
                <button mat-button (click)="loadSampleData()" type="button">
                  <mat-icon>lightbulb</mat-icon>
                  Загрузить пример данных
                </button>
                <button mat-button (click)="formatJson()" type="button">
                  <mat-icon>code</mat-icon>
                  Форматировать JSON
                </button>
                <button mat-raised-button 
                        color="primary" 
                        (click)="updatePreview()" 
                        [disabled]="loading() || !!jsonError()"
                        type="button">
                  <mat-icon>refresh</mat-icon>
                  Обновить предпросмотр
                </button>
              </div>
            </form>
          </div>
        </mat-tab>

        <!-- Вкладка: Предварительный просмотр -->
        <mat-tab label="Предпросмотр">
          <div class="tab-content">
            <div class="preview-header">
              <h3>Предварительный просмотр документа</h3>
              <div class="preview-actions">
                <button mat-button [matMenuTriggerFor]="exportMenu">
                  <mat-icon>file_download</mat-icon>
                  Экспорт
                </button>
                <mat-menu #exportMenu="matMenu">
                  @for (format of exportFormats; track format) {
                    <button mat-menu-item (click)="exportDocument(format)">
                      <mat-icon>{{ getExportIcon(format) }}</mat-icon>
                      {{ getExportDisplayName(format) }}
                    </button>
                  }
                </mat-menu>
              </div>
            </div>

            @if (loading()) {
              <div class="loading-container">
                <mat-progress-bar mode="indeterminate"></mat-progress-bar>
                <p>Генерация предварительного просмотра...</p>
              </div>
            } @else if (previewError()) {
              <div class="error-container">
                <mat-icon>error</mat-icon>
                <h4>Ошибка генерации предпросмотра</h4>
                <p>{{ previewError() }}</p>
                <button mat-button (click)="updatePreview()">
                  <mat-icon>refresh</mat-icon>
                  Попробовать снова
                </button>
              </div>
            } @else if (previewHtml()) {
              <div class="preview-container">
                <iframe #previewFrame
                        class="preview-iframe"
                        [srcdoc]="getPreviewContent()"
                        sandbox="allow-same-origin">
                </iframe>
              </div>
            } @else {
              <div class="empty-preview">
                <mat-icon>visibility_off</mat-icon>
                <h4>Предпросмотр не загружен</h4>
                <p>Нажмите "Обновить предпросмотр" для генерации</p>
              </div>
            }
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>

    <div mat-dialog-actions align="end" class="dialog-actions">
      <button mat-button (click)="onClose()">
        Закрыть
      </button>
      <button mat-raised-button 
              color="primary" 
              (click)="updatePreview()" 
              [disabled]="loading() || !!jsonError()">
        <mat-icon>refresh</mat-icon>
        Обновить
      </button>
    </div>
  `,
  styleUrls: ['./dialogs-shared.scss', '../document-templates.scss']
})
export class TemplatePreviewDialogComponent implements OnInit {
  private dialogRef = inject(MatDialogRef<TemplatePreviewDialogComponent>);
  public data = inject<TemplatePreviewDialogData>(MAT_DIALOG_DATA);
  private templateService = inject(DocumentTemplateService);
  private handlebarsService = inject(HandlebarsTemplateService);
  private snackBar = inject(MatSnackBar);
  private fb = inject(FormBuilder);
  private sanitizer = inject(DomSanitizer);

  dataForm!: FormGroup;
  loading = signal(false);
  previewHtml = signal<string | null>(null);
  previewError = signal<string | null>(null);
  jsonError = signal<string | null>(null);
  
  // Новые свойства для гибридного рендеринга
  templateContent = signal<string>('');
  supportsClientRendering = signal(false);

  exportFormats = EXPORT_FORMATS;

  ngOnInit(): void {
    this.initializeForm();
    this.setupFormValidation();
    this.checkRenderingCapabilities();
    this.loadInitialData();
  }

  private initializeForm(): void {
    this.dataForm = this.fb.group({
      dataJson: ['{}']
    });
  }

  private setupFormValidation(): void {
    this.dataForm.get('dataJson')?.valueChanges.subscribe(value => {
      this.validateJson(value);
    });
  }

  /**
   * Проверяет возможности рендеринга для данного шаблона
   */
  private checkRenderingCapabilities(): void {
    this.supportsClientRendering.set(this.templateService.supportsClientRendering(this.data.template));
  }

  /**
   * Загружает начальные данные и содержимое шаблона
   */
  private loadInitialData(): void {
    // Генерируем начальные примеры данных
    this.loadSampleData();

    // Если поддерживается клиентский рендеринг, загружаем содержимое шаблона
    if (this.supportsClientRendering()) {
      this.loadTemplateContent();
    }
  }

  /**
   * Загружает содержимое шаблона для клиентского рендеринга
   */
  private loadTemplateContent(): void {
    this.templateService.getTemplateContent(this.data.template.id).subscribe({
      next: (content: string) => {
        this.templateContent.set(content);
        this.generateSampleDataFromTemplate(content);
        this.updatePreview(); // Автоматически обновляем предпросмотр
      },
      error: (error: unknown) => {
        console.error('Ошибка загрузки содержимого шаблона:', error);
        this.previewError.set('Не удалось загрузить содержимое шаблона');
      }
    });
  }

  /**
   * Генерирует примеры данных на основе переменных в шаблоне
   */
  private generateSampleDataFromTemplate(templateContent: string): void {
    try {
      const sampleData = this.handlebarsService.generateSampleData(templateContent);
      this.dataForm.patchValue({
        dataJson: JSON.stringify(sampleData, null, 2)
      });
    } catch (error) {
      console.warn('Не удалось сгенерировать примеры данных:', error);
    }
  }

  private validateJson(jsonString: string): void {
    if (!jsonString.trim()) {
      this.jsonError.set('JSON данные обязательны');
      return;
    }

    try {
      JSON.parse(jsonString);
      this.jsonError.set(null);
    } catch (error) {
      this.jsonError.set('Невалидный JSON формат');
    }
  }

  loadSampleData(): void {
    const sampleData = {
      name: "Иван Иванов",
      position: "Разработчик",
      date: new Date().toISOString().split('T')[0],
      company: "ООО 'Пример'",
      amount: 50000
    };

    this.dataForm.patchValue({
      dataJson: JSON.stringify(sampleData, null, 2)
    });
  }

  formatJson(): void {
    const jsonValue = this.dataForm.get('dataJson')?.value;
    if (!jsonValue) {return;}

    try {
      const parsed = JSON.parse(jsonValue);
      const formatted = JSON.stringify(parsed, null, 2);
      this.dataForm.patchValue({
        dataJson: formatted
      });
    } catch (error) {
      this.snackBar.open('Невозможно отформатировать невалидный JSON', 'Закрыть', { duration: 3000 });
    }
  }

  updatePreview(): void {
    if (this.jsonError()) {
      this.snackBar.open('Исправьте ошибки в JSON данных', 'Закрыть', { duration: 3000 });
      return;
    }

    this.loading.set(true);
    this.previewError.set(null);

    const jsonData = this.dataForm.get('dataJson')?.value;
    let parsedData: any;

    try {
      parsedData = JSON.parse(jsonData);
    } catch (error) {
      this.loading.set(false);
      this.previewError.set('Ошибка парсинга JSON данных');
      return;
    }

    const format = this.data.template.format;

    if (this.supportsClientRendering() && this.templateContent()) {
      // Клиентский рендеринг для HTML/TXT
      this.renderClientSide(parsedData, format as 'html' | 'txt');
    } else {
      // Серверный рендеринг для всех остальных случаев
      this.renderServerSide(parsedData);
    }
  }

  /**
   * Клиентский рендеринг с Handlebars
   */
  private renderClientSide(data: any, format: 'html' | 'txt'): void {
    try {
      const result = this.handlebarsService.renderTemplate(
        this.templateContent(), 
        data, 
        format
      );

      if (result.success) {
        this.previewHtml.set(result.content || '');
        this.previewError.set(null);
      } else {
        this.previewHtml.set(null);
        this.previewError.set(result.error || 'Ошибка клиентского рендеринга');
      }
    } catch (error: any) {
      this.previewHtml.set(null);
      this.previewError.set(`Ошибка рендеринга: ${error.message}`);
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Серверный рендеринг (fallback для DOCX и старых шаблонов)
   */
    private renderServerSide(data: any): void {
        /*
        const request: RenderRequest = {
            dataJson = this.dataForm.get('dataJson')?.value,
            export = this.data.template.format
        };
        this.templateService.previewHtml(this.data.template.id, request, JSON.stringify(data)).subscribe({
      next: (html: string) => {
        this.previewHtml.set(html);
        this.loading.set(false);
      },
      error: (error: any) => {
        console.error('Ошибка серверного рендеринга:', error);
        this.previewError.set(error.error?.message || 'Ошибка генерации предпросмотра');
        this.loading.set(false);
      }
        });
    */
        console.error('Ошибка серверного рендеринга: Не реализовано');
        this.previewError.set('Ошибка генерации предпросмотра: Не реализовано');
  }

    exportDocument(format: string): void {
      /*
    if (this.jsonError()) {
      this.snackBar.open('Исправьте ошибки в JSON данных', 'Закрыть', { duration: 3000 });
      return;
    }

    const jsonData = this.dataForm.get('dataJson')?.value;
    let parsedData: any;

    try {
      parsedData = JSON.parse(jsonData);
    } catch (error) {
      this.snackBar.open('Ошибка парсинга JSON данных', 'Закрыть', { duration: 3000 });
      return;
    }

    this.templateService.exportTemplate(
      this.data.template.id, 
      JSON.stringify(parsedData), 
      format as 'html' | 'txt' | 'docx' | 'pdf'
    ).subscribe({
      next: (result: string | Blob) => {
        if (typeof result === 'string') {
          // Строковый результат (HTML/TXT) - создаем Blob для скачивания
          const blob = new Blob([result], { 
            type: format === 'html' ? 'text/html' : 'text/plain' 
          });
          const fileName = `${this.data.template.name}.${format}`;
          this.templateService.downloadBlob(blob, fileName);
        } else {
          // Blob результат (DOCX/PDF)
          const fileName = `${this.data.template.name}.${format}`;
          this.templateService.downloadBlob(result, fileName);
        }
        
        this.snackBar.open(`Документ экспортирован в формате ${format.toUpperCase()}`, 'Закрыть', { duration: 3000 });
      },
      error: (error: any) => {
        console.error('Ошибка экспорта:', error);
        this.snackBar.open(error.message || 'Ошибка экспорта документа', 'Закрыть', { duration: 5000 });
      }
    });
    */
      console.error('Ошибка экспорта: Не реализовано');
      this.previewError.set('Ошибка экспорта: Не реализовано');
  }

  getExportIcon(format: string): string {
    const icons: { [key: string]: string } = {
      'pdf': 'picture_as_pdf',
      'docx': 'description',
      'html': 'code',
      'txt': 'text_fields'
    };
    return icons[format] || 'file_download';
  }

  getExportDisplayName(format: string): string {
    const names: { [key: string]: string } = {
      'pdf': 'PDF',
      'docx': 'Word (DOCX)',
      'html': 'HTML',
      'txt': 'Текст (TXT)'
    };
    return names[format] || format.toUpperCase();
  }

  getPreviewContent(): SafeHtml {
    const html = this.previewHtml();
    return html ? this.sanitizer.bypassSecurityTrustHtml(html) : '';
  }

  onClose(): void {
    this.dialogRef.close();
  }
}