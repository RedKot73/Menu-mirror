import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LookupDto } from '../shared/models/lookup.models';
import { DictTemplateCategoriesService } from '../../ServerService/dictTemplateCategories.service';
import { 
  TemplateFormat, 
  DocumentTemplateUtils, 
  CreateTemplateDto, 
  TEMPLATE_FORMAT_OPTIONS 
} from '../DocTemplates1/Models/document-template.models';

@Component({
  selector: 'create-template-dialog',
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  template: `
    <h2 mat-dialog-title>
      <mat-icon>add</mat-icon>
      Створити новий шаблон
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

        <!-- File Upload -->
        <div class="file-upload-section">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Файл шаблону *</mat-label>
            <input matInput [value]="selectedFileName" readonly placeholder="Оберіть файл">
            <button mat-icon-button matSuffix type="button" (click)="fileInput.click()">
              <mat-icon>attach_file</mat-icon>
            </button>
          </mat-form-field>
          <input #fileInput type="file" (change)="onFileSelected($event)" style="display: none;">
          @if (fileError) {
            <mat-error class="file-error">{{ fileError }}</mat-error>
          }
        </div>

        <!-- Description -->
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Опис</mat-label>
          <textarea matInput formControlName="description"
                   placeholder="Опис шаблону (необов'язково)"
                   rows="3"></textarea>
        </mat-form-field>

        <!-- Published Checkbox -->
        <div class="checkbox-section">
          <mat-checkbox formControlName="isPublished">
            Опублікувати шаблон одразу
          </mat-checkbox>
        </div>

      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-button type="button" (click)="onCancel()">Скасувати</button>
        <button mat-raised-button color="primary" type="submit" 
                [disabled]="!templateForm.valid || !selectedFile">
          <mat-icon>save</mat-icon>
          Створити шаблон
        </button>
      </mat-dialog-actions>
    </form>
  `,
  styles: [`
    .dialog-content {
      display: flex;
      flex-direction: column;
      gap: 16px;
      min-width: 500px;
      max-height: 70vh;
      overflow-y: auto;
    }

    .full-width {
      width: 100%;
    }

    .format-option {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .format-label {
      font-weight: 500;
    }

    .format-description {
      font-size: 12px;
      color: #666;
      font-style: italic;
    }

    .file-upload-section {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .file-error {
      color: #f44336;
      font-size: 12px;
    }

    .checkbox-section {
      margin-top: 8px;
    }

    h2[mat-dialog-title] {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 0;
    }
  `]
})
export class CreateTemplateDialogComponent {
  dialogRef = inject(MatDialogRef<CreateTemplateDialogComponent>);
  formBuilder = inject(FormBuilder);
  dictTemplateCategoriesService = inject(DictTemplateCategoriesService);
  
  templateForm: FormGroup;
  formatOptions = TEMPLATE_FORMAT_OPTIONS;
  categoryOptions: LookupDto[] = [];
  selectedFile: File | null = null;
  selectedFileName = '';
  fileError = '';

  constructor() {
    this.templateForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(150)]],
      description: ['', [Validators.maxLength(300)]],
      format: [TemplateFormat.Html, [Validators.required]],
      templateCategoryId: ['', [Validators.required]],
      isPublished: [false]
    });
    // Загружаем список категорий
    this.loadCategories();
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
      if (!this.validateFileType(file, format)) {
        this.fileError = `Файл повинен відповідати обраному формату (${DocumentTemplateUtils.formatToString(format)})`;
        this.selectedFile = null;
        this.selectedFileName = '';
        return;
      }

      this.selectedFile = file;
      this.selectedFileName = file.name;
      this.fileError = '';
    }
  }

  private validateFileType(file: File, format: TemplateFormat): boolean {
    const fileName = file.name.toLowerCase();
    const expectedExtension = DocumentTemplateUtils.getFileExtension(format);
    return fileName.endsWith(`.${expectedExtension}`);
  }

  onSubmit(): void {
    if (this.templateForm.valid && this.selectedFile) {
      const formValue = this.templateForm.value;
      
      const createDto: CreateTemplateDto = {
        name: formValue.name,
        description: formValue.description || undefined,
        format: DocumentTemplateUtils.formatToString(formValue.format),
        templateCategoryId: formValue.templateCategoryId,
        isPublished: formValue.isPublished,
        file: this.selectedFile
      };

      this.dialogRef.close(createDto);
    } else {
      if (!this.templateForm.valid) {
        Object.keys(this.templateForm.controls).forEach(key => {
          const control = this.templateForm.get(key);
          if (control && !control.valid) {
            console.error(`Field ${key} errors:`, control.errors);
          }
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}