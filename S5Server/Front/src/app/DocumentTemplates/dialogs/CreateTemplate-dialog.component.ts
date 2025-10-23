import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LookupDto } from '../../shared/models/lookup.models';
import { DictTemplateCategoriesService } from '../../../ServerService/dictTemplateCategories.service';
import { TemplateFormat, DocTemplateUtils } from '../models/shared.models';
import { 
  CreateTemplateDto,
  TemplateDto,
  TEMPLATE_FORMAT_OPTIONS 
} from '../models/document-template.models';

export interface CreateTemplateDialogData {
  mode: 'create' | 'edit';
  template?: TemplateDto;
}

export interface EditTemplateResult {
  template: TemplateDto;
  file?: File;
}

@Component({
  selector: 'app-create-template-dialog',
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    ReactiveFormsModule
  ],
  styleUrl: './CreateTemplate-dialog.component.scss',
  template: `
    <h2 mat-dialog-title>
      <mat-icon>{{ isCreateMode ? 'add' : 'edit' }}</mat-icon>
      {{ isCreateMode ? 'Створити шаблон' : 'Редагувати шаблон' }}
    </h2>

    <form [formGroup]="templateForm" (ngSubmit)="onSubmit()">
      <mat-dialog-content class="dialog-content">
        
        <!-- Template Name -->
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Назва шаблону</mat-label>
          <input matInput formControlName="name" placeholder="Введіть назву шаблону">
          @if (templateForm.get('name')?.hasError('required') && templateForm.get('name')?.touched) {
            <mat-error>Назва шаблону обов'язкова</mat-error>
          }
        </mat-form-field>

        <!-- Template Category -->
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Категорія шаблону</mat-label>
          <mat-select formControlName="templateCategoryId">
            @for (category of categoryOptions; track category.id) {
              <mat-option [value]="category.id">
                {{ category.value }}
              </mat-option>
            }
          </mat-select>
          @if (templateForm.get('templateCategoryId')?.hasError('required') && templateForm.get('templateCategoryId')?.touched) {
            <mat-error>Категорія обов'язкова</mat-error>
          }
        </mat-form-field>

        <!-- Format -->
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Формат</mat-label>
          <mat-select formControlName="format">
            @for (option of formatOptions; track option.value) {
              <mat-option [value]="option.value">
                <div class="format-option">
                  <span class="format-label">{{ option.label }}</span>
                  <span class="format-description">&nbsp;({{ option.description }})</span>
                </div>
              </mat-option>
            }
          </mat-select>
          @if (templateForm.get('format')?.hasError('required') && templateForm.get('format')?.touched) {
            <mat-error>Формат обов'язковий</mat-error>
          }
        </mat-form-field>

        <!-- File Upload -->
        <div class="file-upload-section">
          <div class="file-input-container">
            <input #fileInput
                   type="file"
                   (change)="onFileSelected($event)"
                   [accept]="getAcceptedFileTypes()"
                   class="file-input"
                   id="templateFile">

            <label for="templateFile" class="file-input-label" matRipple>
              <mat-icon>upload_file</mat-icon>
              {{ selectedFile ? selectedFile.name
                  : isCreateMode ? 'Оберіть файл шаблону'
                  : 'За потреби оберіть новий файл шаблону' }}
            </label>
          </div>

          @if (selectedFile) {
            <div class="file-details">
              <div class="file-detail">
                <strong>Файл:</strong> {{ selectedFile.name }}
              </div>
              <div class="file-detail">
                <strong>Розмір:</strong> {{ getFileSize(selectedFile.size) }}
              </div>
              <div class="file-detail">
                <strong>Тип:</strong> {{ selectedFile.type || 'Невідомо' }}
              </div>
            </div>
          }

          @if (fileError) {
            <div class="file-error">
              <mat-icon>error</mat-icon>
              {{ fileError }}
            </div>
          }

          <mat-expansion-panel class="format-hints">
            <mat-expansion-panel-header>
                Можливі формати шаблонів
            </mat-expansion-panel-header>
            <ul>
              <li><strong>HTML:</strong> .html, .htm - HTML шаблони з Handlebars синтаксисом</li>
              <li><strong>TXT:</strong> .txt - Текстові шаблони з змінними</li>
              <li><strong>DOCX:</strong> .docx - Microsoft Word документи з полями</li>
            </ul>
          </mat-expansion-panel>
        </div>

        <!-- Description -->
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Опис</mat-label>
          <textarea matInput formControlName="description"
                   placeholder="Опис шаблону (необов'язково)"
                   rows="3"></textarea>
        </mat-form-field>

        <!-- Published Checkbox -->
        <div class="publish-section">
          <mat-checkbox formControlName="isPublished">
            Опублікований
          </mat-checkbox>
        </div>

      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-button type="button" (click)="onCancel()">Скасувати</button>
        <button mat-raised-button color="primary" type="submit" 
                [disabled]="!isFormValid">
          <mat-icon>{{ isCreateMode ? 'add' : 'save' }}</mat-icon>
          {{ isCreateMode ? 'Створити шаблон' : 'Зберегти зміни' }}
        </button>
      </mat-dialog-actions>
    </form>
  `
})
export class CreateTemplateDialogComponent {
  private dialogRef = inject(MatDialogRef<CreateTemplateDialogComponent>);
  private data = inject<CreateTemplateDialogData>(MAT_DIALOG_DATA);
  private formBuilder = inject(FormBuilder);
  private dictTemplateCategoriesService = inject(DictTemplateCategoriesService);
  
  templateForm: FormGroup;
  formatOptions = TEMPLATE_FORMAT_OPTIONS;
  categoryOptions: LookupDto[] = [];
  selectedFile: File | null = null;
  selectedFileName = '';
  fileError = '';

  // Computed properties
  get isCreateMode(): boolean {
    return this.data.mode === 'create';
  }

  get isFormValid(): boolean {
    const isFormValid = this.templateForm.valid;
    const hasFile = this.isCreateMode ? this.selectedFile !== null : true;
    return isFormValid && hasFile && !this.fileError;
  }

  constructor() {
    this.templateForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(150)]],
      description: ['', [Validators.maxLength(300)]],
      format: [TemplateFormat.Html, [Validators.required]],
      templateCategoryId: ['', [Validators.required]],
      isPublished: [false]
    });
    
    this.initializeForm();
    this.loadCategories();
  }

  private initializeForm(): void {
    if (!this.isCreateMode && this.data.template) {
      const template = this.data.template;
      this.templateForm.patchValue({
        name: template.name,
        description: template.description || '',
        format: DocTemplateUtils.parseFormat(template.format),
        templateCategoryId: template.templateCategoryId || '',
        isPublished: template.isPublished
      });
    }
  }

  private loadCategories(): void {
    this.dictTemplateCategoriesService.getSelectList().subscribe({
      next: (categories: LookupDto[]) => {
        this.categoryOptions = categories;
      },
      error: (error: unknown) => {
        console.error('Error loading template categories:', error);
        this.categoryOptions = [];
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.fileError = '';
      
      // Validate file size (50MB limit)
      if (file.size > 50 * 1024 * 1024) {
        this.fileError = 'Розмір файлу не повинен перевищувати 50MB';
        this.selectedFile = null;
        this.selectedFileName = '';
        return;
      }
      if (file.size === 0) {
        this.fileError = 'Обрано порожній файл';
        this.selectedFile = null;
        this.selectedFileName = '';
        return;
      }

      // Validate file type based on selected format
      const format = this.templateForm.get('format')?.value;
      const selectedFormat = format as TemplateFormat;
      
      // Валидация расширения файла
      const validExtensions: Record<TemplateFormat, string[]> = {
        [TemplateFormat.Html]: ['.html', '.htm'],
        [TemplateFormat.Txt]: ['.txt'],
        [TemplateFormat.Docx]: ['.docx']
        /*,[TemplateFormat.Pdf]: ['.pdf']*/
      };

      if (selectedFormat && validExtensions[selectedFormat]) {
        const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
        if (!validExtensions[selectedFormat].includes(fileExtension)) {
          this.fileError = `Для формату ${DocTemplateUtils.formatToString(selectedFormat)} очікується файл з розширенням: ${validExtensions[selectedFormat].join(', ')}`;
          this.selectedFile = null;
          this.selectedFileName = '';
          return;
        }
      }

      this.selectedFile = file;
      this.selectedFileName = file.name;
    } else {
      this.selectedFile = null;
      this.selectedFileName = '';
    }
  }

  private validateFileType(file: File, format: TemplateFormat): boolean {
    const fileName = file.name.toLowerCase();
    const expectedExtension = DocTemplateUtils.getFileExtension(format);
    return fileName.endsWith(`.${expectedExtension}`);
  }

  getAcceptedFileTypes(): string {
    const selectedFormat = this.templateForm?.get('format')?.value as TemplateFormat;
    const acceptTypes: Record<TemplateFormat, string> = {
      [TemplateFormat.Html]: '.html,.htm',
      [TemplateFormat.Txt]: '.txt',
      [TemplateFormat.Docx]: '.docx',
      //[TemplateFormat.Pdf]: '.pdf'
    };
    return acceptTypes[selectedFormat] || '*';
  }

  getFileSize(bytes: number): string {
    if (bytes === 0) {return '0 Bytes';}
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  onSubmit(): void {
    if (!this.isFormValid) {
      this.markFormGroupTouched();
      return;
    }

    const formValue = this.templateForm.value;
    
    if (this.isCreateMode) {
      const createDto: CreateTemplateDto = {
        name: formValue.name,
        description: formValue.description || undefined,
        format: DocTemplateUtils.formatToString(formValue.format),
        templateCategoryId: formValue.templateCategoryId,
        isPublished: formValue.isPublished,
        file: this.selectedFile!
      };

      this.dialogRef.close(createDto);
    } else {
      // Update mode - возвращаем обновленный объект
      const updatedTemplate: TemplateDto = {
        ...this.data.template!,
        name: formValue.name,
        description: formValue.description || undefined,
        format: DocTemplateUtils.formatToString(formValue.format),
        templateCategoryId: formValue.templateCategoryId,
        isPublished: formValue.isPublished
      };

      // Если есть новый файл, включаем его в результат
      const result = {
        template: updatedTemplate,
        file: this.selectedFile || undefined
      };

      this.dialogRef.close(result);
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.templateForm.controls).forEach(key => {
      const control = this.templateForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}