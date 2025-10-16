import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

import {
  TemplateDataSetCreateDto, 
  TemplateDataSetUpdateDto } from '../DocTemplates1/Models/template-dataset.models';
import { TemplateDataSetService } from '../DocTemplates1/ServerServices/template-dataset.service';

@Component({
    selector: 'app-data-sets-dialog',
    standalone: true,
    styleUrl: './CreateDataSet-dialog.component.scss',
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatProgressBarModule,
        MatIconModule
    ],
    template: `
      <!-- Dialog Header -->
      <div mat-dialog-title class="dialog-header">
        <h2>{{ dialogTitle }}</h2>
        <p class="dialog-subtitle">
          Для шаблона: "{{ data.templateName }}"
        </p>
      </div>

      <div class="create-section">
        <form [formGroup]="createForm" class="create-form">
          <div class="form-row">
            <mat-form-field appearance="outline" class="name-field">
              <mat-label>Название набора</mat-label>
              <input matInput
                     formControlName="name"
                     placeholder="Введите название"
                     maxlength="255">
              @if (createForm.get('name')?.hasError('required')) {
                <mat-error>Название обязательно</mat-error>
              }
            </mat-form-field>
          </div>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>JSON данные</mat-label>
            <textarea matInput
                      formControlName="dataJson"
                      placeholder='{ "name": "Значение", "date": "2024-01-01" }'
                      rows="6"
                      class="json-textarea">
            </textarea>
            <mat-hint>Формат: валидный JSON</mat-hint>
            @if (createForm.get('dataJson')?.hasError('required')) {
              <mat-error>JSON данные обязательны</mat-error>
            }
            @if (createForm.get('dataJson')?.hasError('invalidJson')) {
              <mat-error>Невалидный JSON формат</mat-error>
            }
          </mat-form-field>

          <div class="publish-section">
            <mat-checkbox formControlName="isPublished">
              Опубликовать набор данных
            </mat-checkbox>
          </div>

          <div class="json-actions">
            <button mat-button (click)="loadSampleData()" type="button">
              <mat-icon>lightbulb</mat-icon>
              {{ isEditMode ? 'Заменить примером' : 'Пример данных' }}
            </button>
            <button mat-button (click)="formatJson()" type="button">
              <mat-icon>code</mat-icon>
              Форматировать
            </button>
          </div>
        </form>

        @if (loading()) {
          <mat-progress-bar mode="indeterminate"></mat-progress-bar>
        }
      </div>

      <!-- Dialog Actions -->
      <div mat-dialog-actions class="dialog-actions">
        <button mat-button (click)="cancel()" [disabled]="loading()">
          Отмена
        </button>
        <button mat-raised-button 
                color="primary" 
                (click)="submitForm()"
                [disabled]="createForm.invalid || loading()">
          @if (loading()) {
            <mat-icon>hourglass_empty</mat-icon>
          } @else {
            <mat-icon>save</mat-icon>
          }
          {{ submitButtonText }}
        </button>
      </div>
`
})
export class CreateDataSetDialogComponent implements OnInit {
  dialogRef = inject(MatDialogRef<CreateDataSetDialogComponent>);
  data = inject(MAT_DIALOG_DATA);
  fb = inject(FormBuilder);
  snackBar = inject(MatSnackBar);
  templateDataSetService = inject(TemplateDataSetService);

  loading = signal(false);
  createForm!: FormGroup;
  
  // Определяем режим диалога
  get isEditMode(): boolean {
    return !!this.data.dataSet;
  }
  
  get dialogTitle(): string {
    return this.isEditMode ? 'Редактировать набор данных' : 'Создать набор данных';
  }
  
  get submitButtonText(): string {
    return this.isEditMode ? 'Сохранить' : 'Создать';
  }

  ngOnInit(): void {
    // Инициализируем форму с данными из набора, если это режим редактирования
    const initialData = this.isEditMode && this.data.dataSet ? {
      name: this.data.dataSet.name,
      dataJson: this.data.dataSet.dataJson || '{\n  "name": "Значение",\n  "date": "2024-01-01"\n}',
      isPublished: this.data.dataSet.isPublished
    } : {
      name: '',
      dataJson: '{\n  "name": "Значение",\n  "date": "2024-01-01"\n}',
      isPublished: false
    };

    this.createForm = this.fb.group({
      name: [initialData.name, [Validators.required, Validators.maxLength(150)]],
      dataJson: [initialData.dataJson, [Validators.required, this.jsonValidator]],
      isPublished: [initialData.isPublished]
    });
  }

  /**
   * Валидатор для JSON
   */
  private jsonValidator(control: any) {
    if (!control.value) {return null;}
    
    try {
      JSON.parse(control.value);
      return null;
    } catch (e) {
      return { invalidJson: true };
    }
  }

  /**
   * Загружает пример данных
   */
  loadSampleData(): void {
    const sampleData = {
      "title": "Образец документа",
      "date": new Date().toISOString().split('T')[0],
      "author": "Система",
      "content": "Пример содержимого документа",
      "tags": ["пример", "тест"],
      "metadata": {
        "version": "1.0",
        "department": "IT отдел"
      }
    };
    
    this.createForm.patchValue({
      dataJson: JSON.stringify(sampleData, null, 2)
    });
  }

  /**
   * Форматирует JSON
   */
  formatJson(): void {
    const jsonControl = this.createForm.get('dataJson');
    if (!jsonControl?.value) {return;}

    try {
      const parsed = JSON.parse(jsonControl.value);
      const formatted = JSON.stringify(parsed, null, 2);
      jsonControl.setValue(formatted);
    } catch (e) {
      this.snackBar.open('Невалидный JSON для форматирования', 'Закрыть', { duration: 3000 });
    }
  }

  /**
   * Универсальный метод отправки формы
   */
  submitForm(): void {
    if (this.isEditMode) {
      this.updateDataSet();
    } else {
      this.createDataSet();
    }
  }

  /**
   * Создает новый набор данных
   */
  createDataSet(): void {
    if (this.createForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.loading.set(true);
    const formValue = this.createForm.value;
    
    const createDto: TemplateDataSetCreateDto = {
      templateId: this.data.templateId,
      name: formValue.name.trim(),
      dataJson: formValue.dataJson.trim(),
      isPublished: formValue.isPublished
    };

    this.templateDataSetService.createDataSet(this.data.templateId, createDto).subscribe({
      next: (createdDataSet) => {
        this.loading.set(false);
        this.snackBar.open('Набор данных создан успешно', 'Закрыть', { duration: 3000 });
        this.dialogRef.close(createdDataSet);
      },
      error: (error) => {
        this.loading.set(false);
        console.error('Error creating dataset:', error);
        this.snackBar.open('Ошибка при создании набора данных', 'Закрыть', { duration: 5000 });
      }
    });
  }

  /**
   * Обновляет существующий набор данных
   */
  updateDataSet(): void {
    if (this.createForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.loading.set(true);
    const formValue = this.createForm.value;
    const dataSetId = this.data.dataSet.id;
    
    const updateDto: TemplateDataSetUpdateDto = {
      templateId: this.data.templateId,
      name: formValue.name.trim(),
      dataJson: formValue.dataJson.trim(),
      isPublished: formValue.isPublished
    };

    this.templateDataSetService.updateDataSet(dataSetId, updateDto).subscribe({
      next: (updatedDataSet) => {
        this.loading.set(false);
        this.snackBar.open('Набор данных обновлен успешно', 'Закрыть', { duration: 3000 });
        this.dialogRef.close(updatedDataSet);
      },
      error: (error) => {
        this.loading.set(false);
        console.error('Error updating dataset:', error);
        this.snackBar.open('Ошибка при обновлении набора данных', 'Закрыть', { duration: 5000 });
      }
    });
  }

  /**
   * Помечает все поля формы как touched для отображения ошибок
   */
  private markFormGroupTouched(): void {
    Object.keys(this.createForm.controls).forEach(key => {
      const control = this.createForm.get(key);
      control?.markAsTouched();
    });
  }

  /**
   * Закрывает диалог без сохранения
   */
  cancel(): void {
    this.dialogRef.close();
  }
}