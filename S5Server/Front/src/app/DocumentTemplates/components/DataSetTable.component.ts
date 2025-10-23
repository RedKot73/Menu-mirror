import { Component, inject, ViewChild, effect, signal, input, output, AfterViewInit } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TemplateDataSetService } from '../services/template-dataset.service';
import { TemplateDataSetListItem } from '../models/template-dataset.models';
import { TemplateDto } from '../models/document-template.models';
import { CreateDataSetDialogComponent } from '../dialogs/CreateDataSet-dialog.component';
import { ConfirmDialogComponent } from "../../dialogs/ConfirmDialog.component";
import { DocTemplateUtils } from '../models/shared.models';
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-template-dataset-table',
  standalone: true,
  templateUrl: './DataSetTable.component.html',
  styleUrl: './DataSetTable.component.scss',
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatMenuModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatDividerModule
  ]
})
export class DataSetTableComponent implements AfterViewInit {
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  private templateDataSetService = inject(TemplateDataSetService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  // Input від родительського компонента
  selectedTemplate = input<TemplateDto | null>(null);
  
  // Output для передачі вибраного набору даних
  dataSetSelected = output<TemplateDataSetListItem | null>();

  // Signals
  dataSets = signal<TemplateDataSetListItem[]>([]);
  selectedDataSet = signal<TemplateDataSetListItem | null>(null);
  isLoading = signal(false);

  // Table configuration
  displayedColumns: string[] = ['name', 'isPublished', 'createdAtUtc', 'updatedAtUtc', 'actions'];
  dataSource = new MatTableDataSource<TemplateDataSetListItem>([]);

  constructor() {
    // Отслеживаем изменения выбранного шаблона
    effect(() => {
      const template = this.selectedTemplate();
      if (template) {
        this.loadDataSets(template.id);
      } else {
        this.dataSets.set([]);
        this.dataSource.data = [];
        this.selectedDataSet.set(null);
      }
    });

    // Обновляем dataSource при изменении данных
    effect(() => {
      this.dataSource.data = this.dataSets();
      if (this.sort) {
        this.dataSource.sort = this.sort;
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  /**
   * Загружает наборы данных для шаблона
   */
  private loadDataSets(templateId: string): void {
    this.isLoading.set(true);
    this.templateDataSetService.getDataSets(templateId).subscribe({
      next: (datasets) => {
        this.dataSets.set(datasets);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading datasets:', error);
        this.dataSets.set([]);
        this.snackBar.open('Помилка завантаження наборів даних', 'Закрити', { duration: 5000 });
        this.isLoading.set(false);
      }
    });
  }

  /**
   * Выбирает набор данных
   */
  selectDataSet(dataSet: TemplateDataSetListItem): void {
    this.selectedDataSet.set(dataSet);
    this.dataSetSelected.emit(dataSet);
  }

  /**
   * Создает новый набор данных
   */
  createDataSet(): void {
    const template = this.selectedTemplate();
    if (!template) {return;}
    
    const dialogRef = this.dialog.open(CreateDataSetDialogComponent, {
      width: '700px',
      maxWidth: '90vw',
      disableClose: true,
      data: {
        templateId: template.id,
        templateName: template.name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Dataset created successfully:', result);
        this.refreshDataSets();
      }
    });
  }

  /**
   * Редактирует набор данных
   */
  editDataSet(dataSet: TemplateDataSetListItem): void {
    const template = this.selectedTemplate();
    if (!template) {return;}
    
    // Сначала загружаем полные данные набора
    this.isLoading.set(true);
    this.templateDataSetService.getDataSet(dataSet.id).subscribe({
      next: (fullDataSet) => {
        this.isLoading.set(false);
        
        const dialogRef = this.dialog.open(CreateDataSetDialogComponent, {
          width: '700px',
          maxWidth: '90vw',
          disableClose: true,
          data: {
            templateId: template.id,
            templateName: template.name,
            dataSet: fullDataSet  // Передаем полные данные для редактирования
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            console.log('Dataset updated successfully:', result);
            this.refreshDataSets();
          }
        });
      },
      error: (error) => {
        this.isLoading.set(false);
        console.error('Error loading dataset for edit:', error);
        this.snackBar.open('Помилка завантаження наборів даних', 'Закрити', { duration: 5000 });
      }
    });
  }

  /**
   * Клонирует набор данных
   */
  cloneDataSet(dataSet: TemplateDataSetListItem): void {
    const newName = `${dataSet.name} (копія)`;
    this.isLoading.set(true);
    
    this.templateDataSetService.cloneDataSet(dataSet.id, newName).subscribe({
      next: (clonedDataSet) => {
        console.log('Dataset cloned successfully:', clonedDataSet);
        this.refreshDataSets();
      },
      error: (error) => {
        console.error('Error cloning dataset:', error);
        this.snackBar.open('Помилка клонування набору даних', 'Закрити', { duration: 5000 });
        this.isLoading.set(false);
      }
    });
  }

  /**
   * Удаляет набор данных
   */
  deleteDataSet(dataSet: TemplateDataSetListItem): void {
        const ref = this.dialog.open(ConfirmDialogComponent, {
            width: '400px',
            maxWidth: '95vw',
            autoFocus: false,
            data: {
                title: 'Видалення даних',
                message: `Ви впевнені, що хочете видалити дані "${dataSet.name}"?`,
                confirmText: 'Видалити',
                cancelText: 'Відмінити',
                color: 'warn',
                icon: 'warning'
            }
        });
        
        ref.afterClosed().subscribe(confirmed => {
            if (confirmed) {
              this.isLoading.set(true);
              this.templateDataSetService.deleteDataSet(dataSet.id).subscribe({
                next: () => {
                  console.log('Dataset deleted successfully');
                  if (this.selectedDataSet()?.id === dataSet.id) {
                    this.selectedDataSet.set(null);
                  }
                  this.refreshDataSets();
                },
                error: (error) => {
                  console.error('Error deleting dataset:', error);
                  this.snackBar.open('Помилка видалення набору даних', 'Закрити', { duration: 5000 });
                  this.isLoading.set(false);
                }
              });
            }
        });
  }

  /**
   * Обновляет список наборов данных
   */
  refreshDataSets(): void {
    const template = this.selectedTemplate();
    if (template) {
      this.loadDataSets(template.id);
    }
  }

  /**
   * Получает читаемое название формата
   */
  getFormatLabel(format: string): string {
    return DocTemplateUtils.getFormatLabel(format);
  }

  /**
     * Получает читаемое название статуса публикации
     */
  getStatusLabel(isPublished: boolean): string {
    return DocTemplateUtils.getStatusLabel(isPublished);
  }

  /**
   * Форматирует дату для отображения
   */
  formatDate(dateString: string): string {
    return DocTemplateUtils.formatDate(dateString);
  }
}