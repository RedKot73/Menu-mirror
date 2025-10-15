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

import { DocumentTemplateService } from '../../ServerService/document-template.service';
import { TemplateListItem, TemplateDataSetListItem, DataSetCreateDto, TemplateDataSetDto } from '../../models/document-template.models';

export interface DataSetsDialogData {
  template: TemplateListItem;
}

@Component({
  selector: 'app-data-sets-dialog',
  standalone: true,
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
    <h2 mat-dialog-title>
      <mat-icon>dataset</mat-icon>
      Наборы данных: {{ data.template.name }}
    </h2>

    <div mat-dialog-content class="dialog-content medium">
      <!-- Секция создания нового набора -->
      <div class="create-section">
        <h3>Создать новый набор данных</h3>
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
            
            <button mat-raised-button 
                    color="primary" 
                    (click)="createDataSet()" 
                    [disabled]="createForm.invalid || loading()"
                    class="create-button">
              <mat-icon>add</mat-icon>
              Создать
            </button>
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
              Пример данных
            </button>
            <button mat-button (click)="formatJson()" type="button">
              <mat-icon>code</mat-icon>
              Форматировать
            </button>
          </div>
        </form>
      </div>

      <!-- Список существующих наборов -->
      <div class="list-section">
        <div class="section-header">
          <h3>Сохранённые наборы данных</h3>
          <button mat-button (click)="loadDataSets()">
            <mat-icon>refresh</mat-icon>
            Обновить
          </button>
        </div>

        @if (loading()) {
          <mat-progress-bar mode="indeterminate"></mat-progress-bar>
        } @else if (dataSets().length === 0) {
          <div class="empty-state">
            <mat-icon>dataset_linked</mat-icon>
            <h4>Нет сохранённых наборов данных</h4>
            <p>Создайте первый набор данных выше</p>
          </div>
        } @else {
          <div class="data-sets-list">
            @for (dataSet of dataSets(); track dataSet.id) {
              <div class="data-set-item">
                <div class="data-set-info">
                  <div class="data-set-name">{{ dataSet.name }}</div>
                  <div class="data-set-meta">
                    <span class="data-set-date">{{ formatDate(dataSet.createdAtUtc) }}</span>
                    @if (dataSet.isPublished) {
                      <span class="published-badge">Опубликован</span>
                    } @else {
                      <span class="draft-badge">Черновик</span>
                    }
                  </div>
                </div>
                <div class="data-set-actions">
                  <button mat-button (click)="loadDataSet(dataSet.id)">
                    <mat-icon>upload</mat-icon>
                    Загрузить
                  </button>
                  <button mat-button color="warn" (click)="deleteDataSet(dataSet.id)">
                    <mat-icon>delete</mat-icon>
                    Удалить
                  </button>
                </div>
              </div>
            }
          </div>
        }
      </div>
    </div>

    <div mat-dialog-actions align="end" class="dialog-actions">
      <button mat-button (click)="onClose()">
        Закрыть
      </button>
    </div>
  `,
  styleUrls: ['./dialogs-shared.scss', '../document-templates.scss'],
  styles: [`
    .publish-section {
      margin: 16px 0;
    }
    
    .data-set-meta {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    
    .published-badge, .draft-badge {
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
    }
    
    .published-badge {
      background-color: #e8f5e8;
      color: #2e7d32;
    }
    
    .draft-badge {
      background-color: #fff3e0;
      color: #f57c00;
    }
  `]
})
export class DataSetsDialogComponent implements OnInit {
  private dialogRef = inject(MatDialogRef<DataSetsDialogComponent>);
  public data = inject<DataSetsDialogData>(MAT_DIALOG_DATA);
  private templateService = inject(DocumentTemplateService);
  private snackBar = inject(MatSnackBar);
  private fb = inject(FormBuilder);

  createForm!: FormGroup;
  loading = signal(false);
  dataSets = signal<TemplateDataSetListItem[]>([]);

  ngOnInit(): void {
    this.initializeForm();
    this.loadDataSets();
    this.setupFormValidation();
  }

  private initializeForm(): void {
    this.createForm = this.fb.group({
      name: ['', [Validators.required]],
      dataJson: ['{}', [Validators.required]],
      isPublished: [false]
    });
  }

  private setupFormValidation(): void {
    this.createForm.get('dataJson')?.valueChanges.subscribe(value => {
      this.validateJson(value);
    });
  }

  private validateJson(jsonString: string): void {
    const control = this.createForm.get('dataJson');
    if (!jsonString || !jsonString.trim()) {
      return; // Пусть обычная валидация required сработает
    }

    try {
      JSON.parse(jsonString);
      control?.setErrors(null);
    } catch (error) {
      control?.setErrors({ invalidJson: true });
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

    this.createForm.patchValue({
      dataJson: JSON.stringify(sampleData, null, 2)
    });
  }

  formatJson(): void {
    const jsonValue = this.createForm.get('dataJson')?.value;
    if (!jsonValue) return;

    try {
      const parsed = JSON.parse(jsonValue);
      const formatted = JSON.stringify(parsed, null, 2);
      this.createForm.patchValue({
        dataJson: formatted
      });
    } catch (error) {
      this.snackBar.open('Невозможно отформатировать невалидный JSON', 'Закрыть', { duration: 3000 });
    }
  }

  loadDataSets(): void {
    this.loading.set(true);
    this.templateService.getDataSets(this.data.template.id).subscribe({
      next: (dataSets: TemplateDataSetListItem[]) => {
        this.dataSets.set(dataSets);
        this.loading.set(false);
      },
      error: (error: any) => {
        console.error('Ошибка загрузки наборов данных:', error);
        this.snackBar.open('Ошибка загрузки наборов данных', 'Закрыть', { duration: 5000 });
        this.loading.set(false);
      }
    });
  }

  createDataSet(): void {
    if (this.createForm.invalid) {
      this.snackBar.open('Заполните все обязательные поля', 'Закрыть', { duration: 3000 });
      return;
    }

    const formValue = this.createForm.value;
    let parsedData: any;

    try {
      parsedData = JSON.parse(formValue.dataJson);
    } catch (error) {
      this.snackBar.open('Ошибка парсинга JSON данных', 'Закрыть', { duration: 3000 });
      return;
    }

    this.loading.set(true);
    
    const createDto: DataSetCreateDto = {
      templateId: this.data.template.id,
      name: formValue.name,
      dataJson: formValue.dataJson,
      isPublished: formValue.isPublished || false
    };
    
    this.templateService.createDataSet(createDto).subscribe({
      next: (dataSet: TemplateDataSetListItem) => {
        this.dataSets.update(sets => [...sets, dataSet]);
        this.createForm.reset({
          name: '',
          dataJson: '{}',
          isPublished: false
        });
        this.snackBar.open('Набор данных создан', 'Закрыть', { duration: 3000 });
        this.loading.set(false);
      },
      error: (error: any) => {
        console.error('Ошибка создания набора данных:', error);
        this.snackBar.open('Ошибка создания набора данных', 'Закрыть', { duration: 5000 });
        this.loading.set(false);
      }
    });
  }

  loadDataSet(dataSetId: string): void {
    this.templateService.getDataSet(dataSetId).subscribe({
      next: (dataSet: TemplateDataSetDto) => {
        this.createForm.patchValue({
          name: dataSet.name,
          dataJson: dataSet.dataJson,
          isPublished: dataSet.isPublished
        });
        this.snackBar.open('Набор данных загружен', 'Закрыть', { duration: 3000 });
      },
      error: (error: any) => {
        console.error('Ошибка загрузки набора данных:', error);
        this.snackBar.open('Ошибка загрузки набора данных', 'Закрыть', { duration: 5000 });
      }
    });
  }

  deleteDataSet(dataSetId: string): void {
    if (!confirm('Вы уверены, что хотите удалить этот набор данных?')) {
      return;
    }

    this.templateService.deleteDataSet(dataSetId).subscribe({
      next: () => {
        this.dataSets.update(sets => sets.filter(s => s.id !== dataSetId));
        this.snackBar.open('Набор данных удалён', 'Закрыть', { duration: 3000 });
      },
      error: (error: any) => {
        console.error('Ошибка удаления набора данных:', error);
        this.snackBar.open('Ошибка удаления набора данных', 'Закрыть', { duration: 5000 });
      }
    });
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString('ru-RU');
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
