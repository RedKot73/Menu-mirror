import { Component, inject, ViewChild, effect, signal, computed, input, AfterViewInit } from "@angular/core";
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

import { TemplateDataSetService } from '../DocTemplates1/ServerServices/template-dataset.service';
import { TemplateDataSetListItem } from '../DocTemplates1/Models/template-dataset.models';
import { TemplateDto } from '../DocTemplates1/Models/document-template.models';
import { CreateDataSetDialogComponent } from './CreateDataSet-dialog.component';
import { ConfirmDialogComponent } from "../dialogs/ConfirmDialog.component";
import { DocTemplateUtils } from '../DocTemplates1/Models/shared.models';

@Component({
  selector: 'app-template-dataset-table',
  standalone: true,
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
  ],
  template: `
      <!-- Header -->
      <div class="panel-header">
        <h3>Набори даних</h3>
        @if (selectedTemplate()) {
            <div class="header-actions">
                <button
                  mat-icon-button
                  (click)="refreshDataSets()"
                  matTooltip="Оновити перелік">
                    <mat-icon>refresh</mat-icon>
                </button>
                <button
                  mat-raised-button
                  color="primary"
                  (click)="createDataSet()"
                  matTooltip="Створити набір">
                    <mat-icon>add</mat-icon>
                    Створити набір
                </button>
            </div>
        }
      </div>

      @if (selectedTemplate()) {
        <!-- Template Info -->
        <div class="template-info">
          <mat-chip-set>
            <mat-chip>{{ selectedTemplate()?.name }}</mat-chip>
            <mat-chip>{{ getFormatLabel(selectedTemplate()?.format || '') }}</mat-chip>
          </mat-chip-set>
        </div>

        <!-- Loading -->
        @if (isLoading()) {
          <div class="loading-container">
            <mat-spinner diameter="40"></mat-spinner>
            <p>Завантаження наборів даних...</p>
          </div>
        } @else {
          <!-- Data Table -->
          <div class="table-container">
            <table mat-table [dataSource]="dataSource" matSort class="datasets-table">
              
              <!-- Name Column -->
              <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Назва</th>
                <td mat-cell *matCellDef="let dataSet">
                  <span class="dataset-name">{{ dataSet.name }}</span>
                </td>
              </ng-container>

              <!-- Status Column -->
              <ng-container matColumnDef="isPublished">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Статус</th>
                <td mat-cell *matCellDef="let dataSet">
                  <mat-chip [color]="dataSet.isPublished ? 'primary' : 'basic'">
                    {{ getStatusLabel(dataSet.isPublished) }}
                  </mat-chip>
                </td>
              </ng-container>

              <!-- Created Date Column -->
              <ng-container matColumnDef="createdAtUtc">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Створено</th>
                <td mat-cell *matCellDef="let dataSet">
                  {{ formatDate(dataSet.createdAtUtc) }}
                </td>
              </ng-container>

              <!-- Updated Date Column -->
              <ng-container matColumnDef="updatedAtUtc">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Оновлено</th>
                <td mat-cell *matCellDef="let dataSet">
                  {{ formatDate(dataSet.updatedAtUtc) }}
                </td>
              </ng-container>

              <!-- Actions Column -->
              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef>Дії</th>
                <td mat-cell *matCellDef="let dataSet">
                  <button 
                    mat-icon-button 
                    [matMenuTriggerFor]="actionsMenu"
                    [matMenuTriggerData]="{ dataSet: dataSet }"
                    matTooltip="Действия">
                    <mat-icon>more_vert</mat-icon>
                  </button>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;" 
                  (click)="selectDataSet(row)"
                  [class.selected]="selectedDataSet()?.id === row.id"></tr>
            </table>

            <!-- No Data -->
            @if (dataSets().length === 0) {
              <div class="no-data">
                <mat-icon>folder_open</mat-icon>
                <p>Набори даних не знайдено</p>
              </div>
            }
          </div>
        }
      } @else {
        <!-- No Template Selected -->
        <div class="no-template">
          <mat-icon>info</mat-icon>
          <p>Выберите шаблон в левой панели для просмотра наборов данных</p>
        </div>
      }

      <!-- Actions Menu -->
      <mat-menu #actionsMenu="matMenu">
        <ng-template matMenuContent let-dataSet="dataSet">
          <button mat-menu-item (click)="viewDataSet(dataSet)">
            <mat-icon>visibility</mat-icon>
            <span>Просмотр</span>
          </button>
          <button mat-menu-item (click)="editDataSet(dataSet)">
            <mat-icon>edit</mat-icon>
            <span>Редактировать</span>
          </button>
          <button mat-menu-item (click)="cloneDataSet(dataSet)">
            <mat-icon>content_copy</mat-icon>
            <span>Клонировать</span>
          </button>
          <mat-divider></mat-divider>
          <button mat-menu-item (click)="deleteDataSet(dataSet)" class="delete-action">
            <mat-icon>delete</mat-icon>
            <span>Удалить</span>
          </button>
        </ng-template>
      </mat-menu>
  `
})
export class DataSetTableComponent implements AfterViewInit {
  private templateDataSetService = inject(TemplateDataSetService);
  private dialog = inject(MatDialog);

  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  // Input от родительского компонента
  selectedTemplate = input<TemplateDto | null>(null);

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
        this.isLoading.set(false);
      }
    });
  }

  /**
   * Выбирает набор данных
   */
  selectDataSet(dataSet: TemplateDataSetListItem): void {
    this.selectedDataSet.set(dataSet);
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
                  this.isLoading.set(false);
                }
              });
            }
        });
  }

  /**
   * Просматривает набор данных
   */
  viewDataSet(dataSet: TemplateDataSetListItem): void {
    console.log('View dataset:', dataSet);
    // TODO: Открыть диалог просмотра набора данных
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
    switch (format?.toLowerCase()) {
      case 'html':
        return 'HTML';
      case 'txt':
        return 'Текст';
      case 'docx':
        return 'Word';
      case 'pdf':
        return 'PDF';
      default:
        return format?.toUpperCase() || '';
    }
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
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  }
}