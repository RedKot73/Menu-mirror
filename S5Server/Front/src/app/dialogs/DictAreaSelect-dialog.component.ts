import { Component, signal, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

import { DictAreasService, DictArea } from '../../ServerService/dictAreas.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { S5App_ErrorHandler } from '../shared/models/ErrorHandler';
import { CityCodeInfo } from '../../ServerService/dictCityCode.service';

export interface DictAreaSelectDialogData {
  /** Фільтр по типу РВЗ (опціонально) */
  areaTypeId?: string;
  /** Заголовок діалогу (опціонально) */
  title?: string;
}

@Component({
  selector: 'dict-area-select-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatTableModule,
    MatSortModule,
    FormsModule,
  ],
  template: `
    <h2 mat-dialog-title>{{ dialogTitle() }}</h2>
    <mat-dialog-content>
      <div class="dialog-content">
        <!-- Панель пошуку -->
        <div class="action-panel">
          <mat-form-field appearance="outline" class="search-field">
            <mat-label>Пошук</mat-label>
            <input
              matInput
              [(ngModel)]="searchTerm"
              (ngModelChange)="onSearchChange()"
              placeholder="Введіть назву для пошуку"
            />
            <button mat-icon-button matSuffix [attr.aria-label]="'Пошук'">
              <mat-icon>search</mat-icon>
            </button>
            @if (searchTerm()) {
              <button
                mat-icon-button
                matSuffix
                (click)="clearSearch()"
                [attr.aria-label]="'Очистити пошук'"
              >
                <mat-icon>close</mat-icon>
              </button>
            }
          </mat-form-field>

          <button mat-raised-button color="primary" (click)="reload()">
            <mat-icon>refresh</mat-icon>
            Оновити
          </button>
        </div>

        <!-- Таблиця -->
        <div class="table-container">
          @if (isLoading()) {
            <div class="loading-container">
              <mat-icon class="loading-spinner">refresh</mat-icon>
              <p>Завантаження...</p>
            </div>
          } @else {
            <table mat-table [dataSource]="dataSource" matSort class="selection-table">
              <!-- Value Column -->
              <ng-container matColumnDef="value">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Назва</th>
                <td mat-cell *matCellDef="let item">{{ item.value }}</td>
              </ng-container>

              <!-- AreaType Column -->
              <ng-container matColumnDef="areaType">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Тип РВЗ</th>
                <td mat-cell *matCellDef="let item">{{ item.areaType }}</td>
              </ng-container>

              <!-- CityCode Column -->
              <ng-container matColumnDef="cityCode">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Кодифікатор</th>
                <td mat-cell *matCellDef="let item">{{ getCityCodeDisplay(item.cityCodeInfo) }}</td>
              </ng-container>

              <!-- Coords Column -->
              <ng-container matColumnDef="coords">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Координати</th>
                <td mat-cell *matCellDef="let item" class="coords-column">{{ item.coords }}</td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns; sticky: true"></tr>
              <tr
                mat-row
                *matRowDef="let row; columns: displayedColumns"
                (click)="selectArea(row)"
                class="selectable-row"
              ></tr>
            </table>

            @if (items().length === 0) {
              <div class="no-data">
                <mat-icon>folder_open</mat-icon>
                <p>Райони не знайдено</p>
              </div>
            }
          }
        </div>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Відмінити</button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }

      .dialog-content {
        display: flex;
        flex-direction: column;
        height: 70vh;
        max-height: 70vh;
        min-height: 400px;
      }

      .action-panel {
        display: flex;
        gap: 12px;
        align-items: center;
        margin-bottom: 16px;
        padding: 8px;
        background-color: #fafafa;
        border-radius: 4px;
      }

      .search-field {
        flex: 1;
        max-width: 400px;
      }

      .table-container {
        flex: 1;
        overflow: auto;
        border: 1px solid #e0e0e0;
        border-radius: 4px;
      }

      .selection-table {
        width: 100%;
      }

      .selectable-row {
        cursor: pointer;
        transition: background-color 0.2s;
      }

      .selectable-row:hover {
        background-color: #f5f5f5;
      }

      .coords-column {
        max-width: 200px;
        white-space: pre-wrap;
        word-break: break-word;
        line-height: 1.4;
      }

      .loading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 40px;
        gap: 16px;

        .loading-spinner {
          font-size: 48px;
          width: 48px;
          height: 48px;
          animation: spin 1s linear infinite;
          color: #1976d2;
        }

        p {
          color: #666;
        }
      }

      .no-data {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 40px;
        color: #666;

        mat-icon {
          font-size: 48px;
          width: 48px;
          height: 48px;
          color: #ccc;
          margin-bottom: 16px;
        }
      }

      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class DictAreaSelectDialogComponent {
  private dictAreasService = inject(DictAreasService);
  private snackBar = inject(MatSnackBar);

  items = signal<DictArea[]>([]);
  dataSource = new MatTableDataSource<DictArea>([]);
  displayedColumns = ['value', 'areaType', 'cityCode', 'coords'];
  isLoading = signal(false);
  searchTerm = signal('');
  dialogTitle = signal('Вибір району виконання завдань');

  private searchTimeout: number | undefined;

  constructor(
    public dialogRef: MatDialogRef<DictAreaSelectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: DictAreaSelectDialogData,
  ) {
    if (data?.title) {
      this.dialogTitle.set(data.title);
    }
    this.reload();
  }

  reload() {
    this.isLoading.set(true);
    const search = this.searchTerm() || undefined;
    const areaTypeId = this.data?.areaTypeId;

    this.dictAreasService.getAll(search, areaTypeId).subscribe({
      next: (areas) => {
        this.items.set(areas);
        this.dataSource.data = areas;
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Помилка завантаження районів:', error);
        const errorMessage = S5App_ErrorHandler.handleHttpError(
          error,
          'Помилка завантаження районів',
        );
        this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
        this.isLoading.set(false);
      },
    });
  }

  onSearchChange() {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    this.searchTimeout = setTimeout(() => {
      this.reload();
    }, 500);
  }

  clearSearch() {
    this.searchTerm.set('');
    this.reload();
  }

  selectArea(area: DictArea) {
    this.dialogRef.close(area);
  }

  getCityCodeDisplay(cityCodeInfo: CityCodeInfo): string {
    return this.dictAreasService.buildCityCodeDisplayValue(cityCodeInfo);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
