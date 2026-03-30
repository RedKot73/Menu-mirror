import { Component, inject, ViewChild, effect, signal, output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
import { MatSnackBar } from '@angular/material/snack-bar';

import { TemplateDataSetService } from '../../../ServerService/template-dataset.service';
import { TemplateDataSetDto } from '../models/template-dataset.models';
import { ConfirmDialogComponent } from '../../dialogs/ConfirmDialog.component';
import { DocTemplateUtils } from '../../DocumentTemplates/models/shared.models';
import { formatDate } from '../../shared/utils/date.utils';

@Component({
  selector: 'app-template-dataset-table',
  standalone: true,
  templateUrl: './DocDataSetsTable.component.html',
  styleUrls: ['./DocDataSetsTable.component.scss'],
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
/** Компонент для відображення таблиці наборів даних */
export class DocDataSetsTableComponent implements OnInit {
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
  dataSetSelected = output<TemplateDataSetDto | null>();

  // Signals
  dataSets = signal<TemplateDataSetDto[]>([]);
  selectedDataSet = signal<TemplateDataSetDto | null>(null);
  isLoading = signal(false);

  // Table configuration
  displayedColumns: string[] = [
    'menu',
    //'name',
    'parentDocNumber',
    'parentDocDate',
    'docNumber',
    'docDate',
    'isPublished',
    'createdAtUtc',
    'validFrom',
  ];
  dataSource = new MatTableDataSource<TemplateDataSetDto>([]);

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
   * Загружает наборы данных.
   * @param selectId — если передан, после загрузки выбирает строку с этим id
   */
  loadDataSets(selectId?: string): void {
    this.isLoading.set(true);
    this.templateDataSetService.getDataSets().subscribe({
      next: (datasets) => {
        this.dataSets.set(datasets);
        this.dataSource.sort = this._sort;
        this.isLoading.set(false);
        if (selectId) {
          const found = datasets.find((item) => item.id === selectId);
          if (found) {
            this.selectedDataSet.set(found);
            this.dataSetSelected.emit(found);
          }
        }
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
  selectDataSet(dataSet: TemplateDataSetDto): void {
    this.selectedDataSet.set(dataSet);
    this.dataSetSelected.emit(dataSet);
  }

  /**
   * Клонирует набор данных
   */
  /*
  cloneDataSet(dataSet: TemplateDataSetDto): void {
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
  deleteDataSet(dataSet: TemplateDataSetDto): void {
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
   * Оновлює таблицю після збереження/публікації та виділяє оновлений рядок
   */
  updateDataSetRow(updated: TemplateDataSetDto): void {
    this.loadDataSets(updated.id);
  }

  /**
   * Получает читаемое название статуса публикации
   */
  getStatusLabel(isPublished: boolean): string {
    return DocTemplateUtils.getStatusLabel(isPublished);
  }

  /**
   * Форматує дату для відображення
   */
  formatDate(date: Date | string | null | undefined): string {
    return formatDate(date);
  }

  cloneDataSet(_dataSet: TemplateDataSetDto) {
    this.snackBar.open('Method not implemented.', 'Закрити', { duration: 5000 });
    /*
  cloneDataSet(dataSet: TemplateDataSetDto): void {
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
  }
}
