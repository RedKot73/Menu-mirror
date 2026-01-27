import { Component, inject, ViewChild, AfterViewInit, effect } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ShortDictDialogComponent } from '../app/dialogs/ShortDict-dialog.component';
import { ConfirmDialogComponent } from '../app/dialogs/ConfirmDialog.component';
import { DictAreaType, DictAreaTypeService } from '../ServerService/dictAreaType.service';
import { S5App_ErrorHandler } from '../app/shared/models/ErrorHandler';
import { VerticalLayoutComponent } from '../app/shared/components/VerticalLayout.component';

@Component({
  selector: 'dict-area-types',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatSortModule, MatIconModule, VerticalLayoutComponent],
  styleUrls: ['./dict-page.styles.scss'],
  template: `
    <app-vertical-layout>
      <!-- Action Panel (Top) -->
      <div actionPanel>
        <h2>Типи Району виконання завдань (РВЗ)</h2>
        <div class="action-buttons">
          <button mat-raised-button color="primary" (click)="reload()">
            <mat-icon>refresh</mat-icon>
            Оновити
          </button>
          <button mat-raised-button color="primary" (click)="add()">
            <mat-icon>add</mat-icon>
            Створити
          </button>
        </div>
      </div>

      <!-- Content Panel (Main) -->
      <div contentPanel>
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

          <tr mat-header-row *matHeaderRowDef="displayedColumns; sticky: true"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table>
      </div>
    </app-vertical-layout>
  `,
})
export class DictAreaTypeComponent implements AfterViewInit {
  dictAreaTypeService = inject(DictAreaTypeService);
  items = this.dictAreaTypeService.createItemsSignal();
  dataSource = new MatTableDataSource<DictAreaType>([]);
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
    this.reload();
  }

  reload() {
    this.dictAreaTypeService.getAll().subscribe({
      next: (items) => this.items.set(items),
      error: (error) => {
        console.error('Помилка завантаження районів виконання завдань (РВЗ):', error);
        const errorMessage = S5App_ErrorHandler.handleHttpError(
          error,
          'Помилка завантаження районів виконання завдань (РВЗ):',
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
        this.dictAreaTypeService.create(result).subscribe({
          next: () => {
            this.reload();
            this.snackBar.open('Район виконання завдань (РВЗ) успішно створено', 'Закрити', { duration: 3000 });
          },
          error: (error) => {
            console.error('Помилка створення району виконання завдань (РВЗ):', error);
            const errorMessage = S5App_ErrorHandler.handleHttpError(
              error,
              'Помилка створення району виконання завдань (РВЗ):',
            );
            this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
          },
        });
      }
    });
  }

  edit(areaType: DictAreaType) {
    const dialogRef = this.dialog.open(ShortDictDialogComponent, {
      width: '400px',
      data: { ...areaType },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dictAreaTypeService.update(result.id, result).subscribe({
          next: () => {
            this.reload();
            this.snackBar.open('Район виконання завдань (РВЗ) успішно оновлено', 'Закрити', { duration: 3000 });
          },
          error: (error) => {
            console.error('Помилка оновлення району виконання завдань (РВЗ):', error);
            const errorMessage = S5App_ErrorHandler.handleHttpError(
              error,
              'Помилка оновлення району виконання завдань (РВЗ):',
            );
            this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
          },
        });
      }
    });
  }

  delete(areaType: DictAreaType) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      width: '360px',
      maxWidth: '95vw',
      autoFocus: false,
      data: {
        title: 'Видалення запису',
        message: `Ви впевнені, що хочете видалити запис "${areaType.value}"?`,
        confirmText: 'Видалити',
        cancelText: 'Відмінити',
        color: 'warn',
        icon: 'warning',
      },
    });
    ref.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.dictAreaTypeService.delete(areaType.id).subscribe({
          next: () => {
            this.reload();
            this.snackBar.open('Район виконання завдань (РВЗ) успішно видалено', 'Закрити', { duration: 3000 });
          },
          error: (error) => {
            console.error('Помилка видалення району виконання завдань (РВЗ):', error);
            const errorMessage = S5App_ErrorHandler.handleHttpError(
              error,
              'Помилка видалення району виконання завдань (РВЗ):',
            );
            this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
          },
        });
      }
    });
  }
}
