import { Component, inject, ViewChild, AfterViewInit, effect } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { DictUnitTaskDialogComponent } from '../app/dialogs/DictUnitTask-dialog.component';
import { ConfirmDialogComponent } from '../app/dialogs/ConfirmDialog.component';
import { DictUnitTasksService, DictUnitTask } from '../ServerService/dictUnitTasks.service';
import { DictUnitTaskItemsService } from '../ServerService/dictUnitTaskItems.service';
import { S5App_ErrorHandler } from '../app/shared/models/ErrorHandler';

@Component({
  selector: 'dict-unit-tasks',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatSortModule,
    MatIconModule,
    MatCheckboxModule,
    MatTooltipModule,
  ],
  styleUrls: ['./dict-page.styles.scss'],
  template: `
    <div class="dict-page-container">
      <h2>Завдання підрозділів</h2>
      <div class="action-buttons">
        <button mat-raised-button color="primary" (click)="reload()">Оновити</button>
        <button mat-raised-button color="primary" (click)="add()">Створити</button>
      </div>
      <table mat-table [dataSource]="dataSource" matSort class="mat-elevation-z8">
        <!-- Caption Column -->
        <ng-container matColumnDef="caption">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Назва</th>
          <td mat-cell *matCellDef="let item">{{ item.caption }}</td>
        </ng-container>

        <!-- Amount Column -->
        <ng-container matColumnDef="amount">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Сума (грн)</th>
          <td mat-cell *matCellDef="let item">{{ item.amount }}</td>
        </ng-container>

        <!-- WithMeans Column -->
        <ng-container matColumnDef="withMeans">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>З засобами</th>
          <td mat-cell *matCellDef="let item">
            <mat-checkbox [checked]="item.withMeans" disabled></mat-checkbox>
          </td>
        </ng-container>

        <!-- AtPermanentPoint Column -->
        <ng-container matColumnDef="atPermanentPoint">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>На ППД</th>
          <td mat-cell *matCellDef="let item">
            <mat-checkbox [checked]="item.atPermanentPoint" disabled></mat-checkbox>
          </td>
        </ng-container>

        <!-- Comment Column -->
        <ng-container matColumnDef="comment">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Коментар</th>
          <td mat-cell *matCellDef="let item">{{ item.comment }}</td>
        </ng-container>

        <!-- Task Items Column -->
        <ng-container matColumnDef="taskItems">
          <th mat-header-cell *matHeaderCellDef>Елементи завдання</th>
          <td mat-cell *matCellDef="let item">
            <button
              mat-stroked-button
              color="primary"
              (click)="viewTaskItems(item); $event.stopPropagation()"
              matTooltip="Переглянути елементи (тексти для різних категорій)"
            >
              <mat-icon>list</mat-icon>
              Елементи
            </button>
          </td>
        </ng-container>

        <!-- Actions Column -->
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
  `,
  styles: [
    `
      .dict-page-container {
        padding: 16px;
      }
    `,
  ],
})
export class DictUnitTaskComponent implements AfterViewInit {
  dictUnitTasksService = inject(DictUnitTasksService);
  dictUnitTaskItemsService = inject(DictUnitTaskItemsService);
  items = this.dictUnitTasksService.createItemsSignal();
  dataSource = new MatTableDataSource<DictUnitTask>([]);
  displayedColumns = [
    'caption',
    'amount',
    'withMeans',
    'atPermanentPoint',
    'comment',
    'taskItems',
    'actions',
  ];
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
    this.dictUnitTasksService.getAll().subscribe({
      next: (items) => this.items.set(items),
      error: (error) => {
        console.error('Помилка завантаження завдань підрозділів:', error);
        const errorMessage = S5App_ErrorHandler.handleHttpError(
          error,
          'Помилка завантаження завдань підрозділів'
        );
        this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
      },
    });
  }

  add() {
    const dialogRef = this.dialog.open(DictUnitTaskDialogComponent, {
      width: '600px',
      data: {
        caption: '',
        comment: '',
        amount: 0,
        withMeans: false,
        atPermanentPoint: true,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dictUnitTasksService.create(result).subscribe({
          next: () => {
            this.reload();
            this.snackBar.open('Завдання успішно створено', 'Закрити', { duration: 3000 });
          },
          error: (error) => {
            console.error('Помилка створення завдання:', error);
            const errorMessage = S5App_ErrorHandler.handleHttpError(
              error,
              'Помилка створення завдання'
            );
            this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
          },
        });
      }
    });
  }

  edit(unitTask: DictUnitTask) {
    const dialogRef = this.dialog.open(DictUnitTaskDialogComponent, {
      width: '600px',
      data: { ...unitTask },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dictUnitTasksService.update(result.id, result).subscribe({
          next: () => {
            this.reload();
            this.snackBar.open('Завдання успішно оновлено', 'Закрити', { duration: 3000 });
          },
          error: (error) => {
            console.error('Помилка оновлення завдання:', error);
            const errorMessage = S5App_ErrorHandler.handleHttpError(
              error,
              'Помилка оновлення завдання'
            );
            this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
          },
        });
      }
    });
  }

  delete(unitTask: DictUnitTask) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      width: '360px',
      maxWidth: '95vw',
      autoFocus: false,
      data: {
        title: 'Видалення запису',
        message: `Ви впевнені, що хочете видалити завдання "${unitTask.caption}"?`,
        confirmText: 'Видалити',
        cancelText: 'Відмінити',
        color: 'warn',
        icon: 'warning',
      },
    });

    ref.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.dictUnitTasksService.delete(unitTask.id).subscribe({
          next: () => {
            this.reload();
            this.snackBar.open('Завдання успішно видалено', 'Закрити', { duration: 3000 });
          },
          error: (error) => {
            console.error('Помилка видалення завдання:', error);
            const errorMessage = S5App_ErrorHandler.handleHttpError(
              error,
              'Помилка видалення завдання'
            );
            this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
          },
        });
      }
    });
  }

  viewTaskItems(unitTask: DictUnitTask) {
    // Завантажуємо елементи завдання
    this.dictUnitTaskItemsService.getByUnitTask(unitTask.id).subscribe({
      next: (items) => {
        if (items.length === 0) {
          this.snackBar.open(
            'У цього завдання немає елементів. Створіть їх у відповідному довіднику.',
            'Закрити',
            { duration: 5000 }
          );
          return;
        }

        // Формуємо текст для відображення
        const itemsText = items
          .map(
            (item, index) =>
              `${index + 1}. Категорія: ${
                item.templateCategory || item.templateCategoryId
              }\n   Текст: ${item.value}${item.comment ? '\n   Коментар: ' + item.comment : ''}`
          )
          .join('\n\n');

        const message = `Завдання: ${unitTask.caption}\n\nЕлементи завдання:\n\n${itemsText}`;

        this.dialog.open(ConfirmDialogComponent, {
          width: '800px',
          maxWidth: '95vw',
          data: {
            title: 'Елементи завдання',
            message: message,
            confirmText: 'Закрити',
            cancelText: '',
            color: 'primary',
            icon: 'info',
          },
        });
      },
      error: (error) => {
        console.error('Помилка завантаження елементів завдання:', error);
        const errorMessage = S5App_ErrorHandler.handleHttpError(
          error,
          'Помилка завантаження елементів завдання'
        );
        this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
      },
    });
  }
}
