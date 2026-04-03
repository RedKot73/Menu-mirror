import { Component, signal, Inject, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';

import { DictDroneModelService, DictDroneModel } from '../../ServerService/dictDroneModel.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { S5App_ErrorHandler } from '../shared/models/ErrorHandler';

export interface DictDroneModelSelectDialogData {
  /** Фільтр по типу дрона (опціонально) */
  droneTypeId?: string;
  /** Заголовок діалогу (опціонально) */
  title?: string;
}

/** Розширений тип для відображення і редагування моделі з кількістю */
export interface DictDroneModelWithQuantity extends DictDroneModel {
  quantity: number;
}

@Component({
  selector: 'dict-drone-model-select-dialog',
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
        <div class="table-container" [hidden]="isLoading()">
          <table mat-table [dataSource]="dataSource" matSort class="selection-table">
            <!-- Value Column -->
            <ng-container matColumnDef="value">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Назва моделі БПЛА</th>
              <td mat-cell *matCellDef="let item">{{ item.value }}</td>
            </ng-container>

            <!-- Drone Type Column -->
            <ng-container matColumnDef="droneTypeName">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Тип дрона</th>
              <td mat-cell *matCellDef="let item">{{ item.droneTypeName || '-' }}</td>
            </ng-container>

            <!-- Quantity Column -->
            <ng-container matColumnDef="quantity">
              <th mat-header-cell *matHeaderCellDef style="width: 120px">Кількість</th>
              <td mat-cell *matCellDef="let item">
                <mat-form-field appearance="outline" class="quantity-field">
                  <input
                    matInput
                    type="number"
                    [(ngModel)]="item.quantity"
                    min="1"
                    (click)="$event.stopPropagation()"
                    placeholder="0"
                  />
                </mat-form-field>
              </td>
            </ng-container>

            <!-- Actions Column -->
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef style="width: 100px">Дії</th>
              <td mat-cell *matCellDef="let item">
                <button
                  mat-raised-button
                  color="primary"
                  (click)="selectDroneModel(item); $event.stopPropagation()"
                  [disabled]="!item.quantity || item.quantity < 1"
                >
                  Вибрати
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns; sticky: true"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns" class="selectable-row"></tr>
          </table>
        </div>
        @if (this.isLoading()) {
          <div class="loading-container">
            <mat-icon class="loading-spinner">refresh</mat-icon>
            <p>Завантаження...</p>
          </div>
        }
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
        height: 60vh;
        max-height: 60vh;
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

      .quantity-field {
        width: 80px;
        margin: 0;
      }

      .quantity-field ::ng-deep .mat-mdc-form-field-infix {
        min-height: 40px;
        padding: 4px 0;
      }

      .quantity-field ::ng-deep .mat-mdc-text-field-wrapper {
        padding: 0;
      }

      .selectable-row {
        cursor: default;
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
export class DictDroneModelSelectDialogComponent {
  private dictDroneModelService = inject(DictDroneModelService);
  private snackBar = inject(MatSnackBar);

  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  items = signal<DictDroneModelWithQuantity[]>([]);
  dataSource = new MatTableDataSource<DictDroneModelWithQuantity>([]);
  displayedColumns = ['value', 'droneTypeName', 'quantity', 'actions'];
  isLoading = signal(false);
  searchTerm = signal('');
  dialogTitle = signal('Вибір моделі БПЛА');

  private searchTimeout: number | undefined;

  constructor(
    public dialogRef: MatDialogRef<DictDroneModelSelectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: DictDroneModelSelectDialogData,
  ) {
    if (data?.title) {
      this.dialogTitle.set(data.title);
    }

    this.reload();
  }

  reload() {
    this.isLoading.set(true);

    this.dictDroneModelService.getAll().subscribe({
      next: (droneModels) => {
        // Конвертуємо в DictDroneModelWithQuantity
        const modelsWithQuantity: DictDroneModelWithQuantity[] = droneModels.map((model) => ({
          ...model,
          quantity: 1, // За замовчуванням 1
        }));
        const filtered = this.filterBySearchTerm(modelsWithQuantity);
        this.items.set(filtered);
        this.dataSource.data = filtered;
        this.dataSource.sort = this.sort;
        this.isLoading.set(false);
      },
      error: (error) => {
        this.handleError(error);
      },
    });
  }

  private filterBySearchTerm(
    items: DictDroneModelWithQuantity[],
  ): DictDroneModelWithQuantity[] {
    const search = this.searchTerm().toLowerCase().trim();
    if (!search) {
      return items;
    }
    return items.filter((item) => item.value.toLowerCase().includes(search));
  }

  private handleError(error: unknown) {
    console.error('Помилка завантаження моделей БПЛА:', error);
    const errorMessage = S5App_ErrorHandler.handleHttpError(
      error,
      'Помилка завантаження моделей БПЛА',
    );
    this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
    this.isLoading.set(false);
  }

  onSearchChange() {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    this.searchTimeout = window.setTimeout(() => {
      this.reload();
    }, 500);
  }

  clearSearch() {
    this.searchTerm.set('');
    this.reload();
  }

  selectDroneModel(droneModel: DictDroneModelWithQuantity) {
    if (!droneModel.quantity || droneModel.quantity < 1) {
      this.snackBar.open('Будь ласка, вкажіть кількість', 'Закрити', { duration: 3000 });
      return;
    }
    this.dialogRef.close(droneModel);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
