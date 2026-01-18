import { Component, inject, ViewChild, AfterViewInit, effect } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ShortDictDialogComponent } from '../app/dialogs/ShortDict-dialog.component';
import { ConfirmDialogComponent } from '../app/dialogs/ConfirmDialog.component';
import {
  DictCityCategoryService,
  DictCityCategory,
} from '../ServerService/dictCityCategory.service';
import { S5App_ErrorHandler } from '../app/shared/models/ErrorHandler';

@Component({
  selector: 'dict-city-categories',
  imports: [MatTableModule, MatButtonModule, MatSortModule, MatIconModule],
  styleUrls: ['./dict-page.styles.scss'],
  template: `
    <div class="dict-page-container">
      <h2>Категорії об'єктів адміністративно-територіальних одиниць</h2>
      <div class="action-buttons">
        <button mat-raised-button color="primary" (click)="reload()">Оновити</button>
        <button mat-raised-button color="primary" (click)="add()">Створити</button>
      </div>
      <table mat-table [dataSource]="dataSource" matSort class="mat-elevation-z8">
        <!-- Value Column -->
        <ng-container matColumnDef="value">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Значення</th>
          <td mat-cell *matCellDef="let item">{{ item.value }}</td>
        </ng-container>
        <ng-container matColumnDef="shortValue">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Скорочення</th>
          <td mat-cell *matCellDef="let item">{{ item.shortValue }}</td>
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
export class DictCityCategoryComponent implements AfterViewInit {
  dictCityCategoryService = inject(DictCityCategoryService);
  items = this.dictCityCategoryService.createItemsSignal();
  dataSource = new MatTableDataSource<DictCityCategory>([]);
  displayedColumns = ['value', 'shortValue', 'comment', 'actions'];
  dialog = inject(MatDialog);
  snackBar = inject(MatSnackBar);

  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    effect(() => {
      this.dataSource.data = this.items();
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  reload() {
    this.dictCityCategoryService.getAll().subscribe({
      next: (items) => this.items.set(items),
      error: (error) => {
        console.error("Помилка завантаження категорій об'єктів:", error);
        const errorMessage = S5App_ErrorHandler.handleHttpError(
          error,
          "Помилка завантаження категорій об'єктів:"
        );
        this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
      },
    });
  }

  add() {
    const dialogRef = this.dialog.open(ShortDictDialogComponent, {
      width: '400px',
      data: { value: '', shortValue: '', comment: '' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dictCityCategoryService.create(result).subscribe({
          next: () => {
            this.reload();
            this.snackBar.open("Категорію об'єкта успішно створено", 'Закрити', { duration: 3000 });
          },
          error: (error) => {
            console.error("Помилка створення категорії об'єкта:", error);
            const errorMessage = S5App_ErrorHandler.handleHttpError(
              error,
              "Помилка створення категорії об'єкта:"
            );
            this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
          },
        });
      }
    });
  }

  edit(cityCategory: DictCityCategory) {
    const dialogRef = this.dialog.open(ShortDictDialogComponent, {
      width: '400px',
      data: { ...cityCategory },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dictCityCategoryService.update(result.id, result).subscribe({
          next: () => {
            this.reload();
            this.snackBar.open("Категорію об'єкта успішно оновлено", 'Закрити', { duration: 3000 });
          },
          error: (error) => {
            console.error("Помилка оновлення категорії об'єкта:", error);
            const errorMessage = S5App_ErrorHandler.handleHttpError(
              error,
              "Помилка оновлення категорії об'єкта:"
            );
            this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
          },
        });
      }
    });
  }

  delete(cityCategory: DictCityCategory) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      width: '360px',
      maxWidth: '95vw',
      autoFocus: false,
      data: {
        title: 'Видалення запису',
        message: `Ви впевнені, що хочете видалити запис "${cityCategory.value}"?`,
        confirmText: 'Видалити',
        cancelText: 'Відмінити',
        color: 'warn',
        icon: 'warning',
      },
    });
    ref.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.dictCityCategoryService.delete(cityCategory.id).subscribe({
          next: () => {
            this.reload();
            this.snackBar.open("Категорію об'єкта успішно видалено", 'Закрити', { duration: 3000 });
          },
          error: (error) => {
            console.error("Помилка видалення категорії об'єкта:", error);
            const errorMessage = S5App_ErrorHandler.handleHttpError(
              error,
              "Помилка видалення категорії об'єкта:"
            );
            this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
          },
        });
      }
    });
  }
}
