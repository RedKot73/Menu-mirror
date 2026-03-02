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
import { MatSnackBar } from '@angular/material/snack-bar';

import { S5App_ErrorHandler } from '../shared/models/ErrorHandler';
import { SoldierDto, SoldierService } from '../Soldier/services/soldier.service';
import { SoldierUtils } from '../Soldier/soldier.utils';

export interface SoldierSelectDialogData {
  /** Фільтр по підрозділу (опціонально) */
  unitId?: string;
  /** Заголовок діалогу (опціонально) */
  title?: string;
}

@Component({
  selector: 'soldier-select-dialog',
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
              placeholder="Прізвище, ім'я або позивний"
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
              <ng-container matColumnDef="rankShortValue">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Звання</th>
                <td mat-cell *matCellDef="let item">{{ item.rankShortValue }}</td>
              </ng-container>

              <ng-container matColumnDef="fio">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>ПІБ</th>
                <td mat-cell *matCellDef="let item">{{ formatFIO(item) }}</td>
              </ng-container>

              <ng-container matColumnDef="nickName">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Позивний</th>
                <td mat-cell *matCellDef="let item">{{ item.nickName }}</td>
              </ng-container>

              <ng-container matColumnDef="unitShortName">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Підрозділ</th>
                <td mat-cell *matCellDef="let item">{{ item.unitShortName }}</td>
              </ng-container>

              <ng-container matColumnDef="positionValue">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Посада</th>
                <td mat-cell *matCellDef="let item">{{ item.positionValue }}</td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns; sticky: true"></tr>
              <tr
                mat-row
                *matRowDef="let row; columns: displayedColumns"
                (click)="selectSoldier(row)"
                class="selectable-row"
              ></tr>
            </table>

            @if (items().length === 0) {
              <div class="no-data">
                <mat-icon>people_outline</mat-icon>
                <p>Військовослужбовців не знайдено</p>
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
export class SoldierSelectDialogComponent {
  private soldierService = inject(SoldierService);
  private snackBar = inject(MatSnackBar);

  items = signal<SoldierDto[]>([]);
  dataSource = new MatTableDataSource<SoldierDto>([]);
  displayedColumns = ['rankShortValue', 'fio', 'nickName', 'unitShortName', 'positionValue'];
  isLoading = signal(false);
  searchTerm = signal('');
  dialogTitle = signal('Вибір військовослужбовця');

  private searchTimeout: number | undefined;

  constructor(
    public dialogRef: MatDialogRef<SoldierSelectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: SoldierSelectDialogData,
  ) {
    if (data?.title) {
      this.dialogTitle.set(data.title);
    }
    this.reload();
  }

  reload() {
    this.isLoading.set(true);
    const search = this.searchTerm() || undefined;
    const unitId = this.data?.unitId;

    this.soldierService.getAll(search, unitId).subscribe({
      next: (soldiers) => {
        this.items.set(soldiers);
        this.dataSource.data = soldiers;
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Помилка завантаження військовослужбовців:', error);
        const errorMessage = S5App_ErrorHandler.handleHttpError(
          error,
          'Помилка завантаження військовослужбовців',
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

  selectSoldier(soldier: SoldierDto) {
    this.dialogRef.close(soldier);
  }

  onCancel() {
    this.dialogRef.close();
  }

  formatFIO(item: SoldierDto): string {
    return SoldierUtils.formatFIO(item.firstName, item.midleName, item.lastName);
  }
}
