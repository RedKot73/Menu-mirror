import { Component, inject, ViewChild, effect, signal, output, OnInit } from '@angular/core';
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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TemplateDataSetService } from '../services/template-dataset.service';
import { TemplateDataSetListItem } from '../models/template-dataset.models';
import { ConfirmDialogComponent } from '../../dialogs/ConfirmDialog.component';
import { DocTemplateUtils } from '../models/shared.models';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    MatDividerModule,
    MatDialogModule,
  ],
})
export class DataSetTableComponent implements OnInit {
  private _sort: MatSort | null = null;

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this._sort = sort;
    if (sort) {
      this.dataSource.sort = sort;
    }
  }

  private templateDataSetService = inject(TemplateDataSetService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  // Output для передачі вибраного набору даних
  dataSetSelected = output<TemplateDataSetListItem | null>();

  // Signals
  dataSets = signal<TemplateDataSetListItem[]>([]);
  selectedDataSet = signal<TemplateDataSetListItem | null>(null);
  isLoading = signal(false);

  // Table configuration
  displayedColumns: string[] = ['menu', 'name', 'isPublished', 'createdAtUtc', 'updatedAtUtc'];
  dataSource = new MatTableDataSource<TemplateDataSetListItem>([]);

  constructor() {
    // Обновляем dataSource при изменении данных
    effect(() => {
      this.dataSource.data = this.dataSets();
    });
  }

  ngOnInit(): void {
    // Загружаем наборы данных при инициализации
    this.loadDataSets();
  }

  /**
   * Загружает наборы данных для шаблона
   */
  loadDataSets(): void {
    this.isLoading.set(true);
    this.templateDataSetService.getDataSets().subscribe({
      next: (datasets) => {
        this.dataSets.set(datasets);
        this.dataSource.sort = this._sort;
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading datasets:', error);
        this.dataSets.set([]);
        this.snackBar.open('Помилка завантаження наборів даних', 'Закрити', { duration: 5000 });
        this.isLoading.set(false);
      },
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
  /*
  createDataSet(): void {
    const dialogRef = this.dialog.open(CreateDataSetDialogComponent, {
      width: '700px',
      maxWidth: '90vw',
      disableClose: true,
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.refreshDataSets();
      }
    });
  }

  /**
   * Клонирует набор данных
   */
  /*
  cloneDataSet(dataSet: TemplateDataSetListItem): void {
    const newName = `${dataSet.name} (копія)`;
    this.isLoading.set(true);

    this.templateDataSetService.cloneDataSet(dataSet.id, newName).subscribe({
      next: () => {
        this.loadDataSets();
            this.snackBar.open('Набір даних клоновано успішно', 'Закрити', { duration: 3000 });
      },
      error: (error) => {
        console.error('Error cloning dataset:', error);
        this.snackBar.open('Помилка клонування набору даних', 'Закрити', { duration: 5000 });
        this.isLoading.set(false);
      },
    });
  }
  */

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
        icon: 'warning',
      },
    });

    ref.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.isLoading.set(true);
        this.templateDataSetService.deleteDataSet(dataSet.id).subscribe({
          next: () => {
            if (this.selectedDataSet()?.id === dataSet.id) {
              this.selectedDataSet.set(null);
            }
            this.loadDataSets();
            this.snackBar.open('Набір даних видалено успішно', 'Закрити', { duration: 3000 });
          },
          error: (error) => {
            console.error('Error deleting dataset:', error);
            this.snackBar.open('Помилка видалення набору даних', 'Закрити', { duration: 5000 });
            this.isLoading.set(false);
          },
        });
      }
    });
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
