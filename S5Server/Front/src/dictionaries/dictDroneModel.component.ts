import { Component, inject, ViewChild, AfterViewInit, effect } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DroneModelDialogComponent } from '../app/dialogs/DroneModel-dialog.component';
import { ConfirmDialogComponent } from '../app/dialogs/ConfirmDialog.component';
import { DictDroneModelService, DictDroneModel } from '../ServerService/dictDroneModel.service';
import { DictDroneTypeService } from '../ServerService/dictDroneType.service';
import { LookupDto } from '../app/shared/models/lookup.models';
import { ErrorHandler } from '../app/shared/models/ErrorHandler';

@Component({
  selector: 'dict-drone-models',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatSortModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
  ],
  styleUrls: ['./dict-page.styles.scss'],
  template: `
    <div class="dict-page-container">
      <h2>Моделі БПЛА</h2>
      <div class="action-buttons">
        <mat-form-field style="width: 250px; margin-right: 16px;">
          <mat-label>Фільтр по типу БПЛА</mat-label>
          <mat-select [(ngModel)]="selectedDroneTypeId" (ngModelChange)="onDroneTypeChange()">
            <mat-option [value]="null">Всі типи</mat-option>
            @for (type of droneTypes; track type.id) {
            <mat-option [value]="type.id">
              {{ type.value }}
            </mat-option>
            }
          </mat-select>
        </mat-form-field>
        <button mat-raised-button color="primary" (click)="reload()">Оновити</button>
        <button mat-raised-button color="primary" (click)="add()">Створити</button>
      </div>
      <table mat-table [dataSource]="dataSource" matSort class="mat-elevation-z8">
        <!-- Value Column -->
        <ng-container matColumnDef="value">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Модель</th>
          <td mat-cell *matCellDef="let item">{{ item.value }}</td>
        </ng-container>
        <!-- DroneType Column -->
        <ng-container matColumnDef="droneType">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Тип БПЛА</th>
          <td mat-cell *matCellDef="let item">
            {{ getDroneTypeName(item.droneTypeId) }}
          </td>
        </ng-container>
        <!-- Comment Column -->
        <ng-container matColumnDef="comment">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Коментар</th>
          <td mat-cell *matCellDef="let item">{{ item.comment }}</td>
        </ng-container>
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Дії</th>
          <td mat-cell *matCellDef="let item">
            <button mat-icon-button color="accent" (click)="edit(item)">
              <mat-icon>edit</mat-icon>
            </button>
            <button mat-icon-button color="warn" (click)="delete(item)">
              <mat-icon>delete</mat-icon>
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>
    </div>
  `,
})
export class DictDroneModelComponent implements AfterViewInit {
  dictDroneModelService = inject(DictDroneModelService);
  dictDroneTypeService = inject(DictDroneTypeService);
  items = this.dictDroneModelService.createItemsSignal();
  dataSource = new MatTableDataSource<DictDroneModel>([]);
  displayedColumns = ['value', 'droneType', 'comment', 'actions'];
  dialog = inject(MatDialog);
  snackBar = inject(MatSnackBar);

  droneTypes: LookupDto[] = [];
  selectedDroneTypeId: string | null = null;

  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    effect(() => {
      this.dataSource.data = this.items();
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.loadDroneTypes();
    this.reload();
  }

  loadDroneTypes() {
    this.dictDroneTypeService.getSelectList().subscribe({
      next: (types) => {
        this.droneTypes = types;
      },
      error: (error) => {
        console.error('Помилка завантаження типів БПЛА:', error);
        const errorMessage = ErrorHandler.handleHttpError(
          error,
          'Помилка завантаження типів БПЛА:'
        );
        this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
      },
    });
  }

  getDroneTypeName(droneTypeId: string): string {
    const type = this.droneTypes.find((t) => t.id === droneTypeId);
    return type ? type.value : '';
  }

  onDroneTypeChange() {
    if (this.selectedDroneTypeId) {
      this.dictDroneModelService.getByDroneType(this.selectedDroneTypeId).subscribe({
        next: (items) => this.items.set(items as DictDroneModel[]),
        error: (error) => {
          console.error('Помилка завантаження моделей БПЛА:', error);
          const errorMessage = ErrorHandler.handleHttpError(
            error,
            'Помилка завантаження моделей БПЛА:'
          );
          this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
        },
      });
    } else {
      this.reload();
    }
  }

  reload() {
    this.dictDroneModelService.getAll().subscribe({
      next: (items) => this.items.set(items),
      error: (error) => {
        console.error('Помилка завантаження моделей БПЛА:', error);
        const errorMessage = ErrorHandler.handleHttpError(
          error,
          'Помилка завантаження моделей БПЛА:'
        );
        this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
      },
    });
  }

  add() {
    const dialogRef = this.dialog.open(DroneModelDialogComponent, {
      width: '400px',
      data: { value: '', comment: '', droneTypeId: this.selectedDroneTypeId || '' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dictDroneModelService.create(result).subscribe({
          next: () => {
            this.reload();
            this.snackBar.open('Модель БПЛА успішно створено', 'Закрити', { duration: 3000 });
          },
          error: (error) => {
            console.error('Помилка створення моделі БПЛА:', error);
            const errorMessage = ErrorHandler.handleHttpError(
              error,
              'Помилка створення моделі БПЛА:'
            );
            this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
          },
        });
      }
    });
  }

  edit(droneModel: DictDroneModel) {
    const dialogRef = this.dialog.open(DroneModelDialogComponent, {
      width: '400px',
      data: { ...droneModel },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dictDroneModelService.update(result.id, result).subscribe({
          next: () => {
            this.reload();
            this.snackBar.open('Модель БПЛА успішно оновлено', 'Закрити', { duration: 3000 });
          },
          error: (error) => {
            console.error('Помилка оновлення моделі БПЛА:', error);
            const errorMessage = ErrorHandler.handleHttpError(
              error,
              'Помилка оновлення моделі БПЛА:'
            );
            this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
          },
        });
      }
    });
  }

  delete(droneModel: DictDroneModel) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      width: '360px',
      maxWidth: '95vw',
      autoFocus: false,
      data: {
        title: 'Видалення запису',
        message: `Ви впевнені, що хочете видалити запис "${droneModel.value}"?`,
        confirmText: 'Видалити',
        cancelText: 'Відмінити',
        color: 'warn',
        icon: 'warning',
      },
    });
    ref.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.dictDroneModelService.delete(droneModel.id).subscribe({
          next: () => {
            this.reload();
            this.snackBar.open('Модель БПЛА успішно видалено', 'Закрити', { duration: 3000 });
          },
          error: (error) => {
            console.error('Помилка видалення моделі БПЛА:', error);
            const errorMessage = ErrorHandler.handleHttpError(
              error,
              'Помилка видалення моделі БПЛА:'
            );
            this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
          },
        });
      }
    });
  }
}
