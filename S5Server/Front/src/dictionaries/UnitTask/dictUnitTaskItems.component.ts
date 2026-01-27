import { Component, Input, ViewChild, AfterViewInit, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import {//
  DictUnitTaskItemsService,
  DictUnitTaskItemDto,
} from '../../ServerService/dictUnitTaskItems.service';
import { DictUnitTaskDto } from '../../ServerService/dictUnitTasks.service';
import { ConfirmDialogComponent } from '../../app/dialogs/ConfirmDialog.component';
import { DictUnitTaskItemDialogComponent } from '../../app/dialogs/DictUnitTaskItem-dialog.component';
import { S5App_ErrorHandler } from '../../app/shared/models/ErrorHandler';

@Component({
  selector: 'dict-unit-task-items',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './dictUnitTaskItems.component.html',
  styleUrls: ['./dictUnitTaskItems.component.scss'],
})
export class DictUnitTaskItemsComponent implements AfterViewInit {
  @Input() set task(value: DictUnitTaskDto | null) {
    this.selectedTask.set(value);
  }

  selectedTask = signal<DictUnitTaskDto | null>(null);
  items = signal<DictUnitTaskItemDto[]>([]);
  isLoading = signal(false);
  dataSource = new MatTableDataSource<DictUnitTaskItemDto>([]);
  displayedColumns = ['templateCategory', 'value', 'comment', 'actions'];

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dictUnitTaskItemsService: DictUnitTaskItemsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    // Оновлюємо dataSource при зміні items
    effect(() => {
      this.dataSource.data = this.items();
    });

    // Завантажуємо елементи при зміні вибраного завдання
    effect(() => {
      const task = this.selectedTask();
      if (task) {
        this.loadItems(task.id);
      } else {
        this.items.set([]);
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  private loadItems(unitTaskId: string) {
    this.isLoading.set(true);
    this.dictUnitTaskItemsService.getByUnitTask(unitTaskId).subscribe({
      next: (items) => {
        this.items.set(items);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Помилка завантаження елементів завдання:', error);
        const errorMessage = S5App_ErrorHandler.handleHttpError(
          error,
          'Помилка завантаження елементів завдання'
        );
        this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
        this.isLoading.set(false);
      },
    });
  }

  reload() {
    const task = this.selectedTask();
    if (task) {
      this.loadItems(task.id);
    }
  }

  add() {
    const task = this.selectedTask();
    if (!task) {
      return;
    }

    const dialogRef = this.dialog.open(DictUnitTaskItemDialogComponent, {
      width: '600px',
      data: {
        unitTaskId: task.id,
        value: '',
        comment: '',
        templateCategoryId: '',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dictUnitTaskItemsService.create(result).subscribe({
          next: () => {
            this.reload();
            this.snackBar.open('Елемент успішно створено', 'Закрити', { duration: 3000 });
          },
          error: (error) => {
            console.error('Помилка створення елемента:', error);
            const errorMessage = S5App_ErrorHandler.handleHttpError(
              error,
              'Помилка створення елемента'
            );
            this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
          },
        });
      }
    });
  }

  edit(item: DictUnitTaskItemDto) {
    const dialogRef = this.dialog.open(DictUnitTaskItemDialogComponent, {
      width: '600px',
      data: item,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dictUnitTaskItemsService.update(result.id, result).subscribe({
          next: () => {
            this.reload();
            this.snackBar.open('Елемент успішно оновлено', 'Закрити', { duration: 3000 });
          },
          error: (error) => {
            console.error('Помилка оновлення елемента:', error);
            const errorMessage = S5App_ErrorHandler.handleHttpError(
              error,
              'Помилка оновлення елемента'
            );
            this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
          },
        });
      }
    });
  }

  delete(item: DictUnitTaskItemDto) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      width: '360px',
      maxWidth: '95vw',
      autoFocus: false,
      data: {
        title: 'Видалення елемента',
        message: `Ви впевнені, що хочете видалити елемент для категорії "${
          item.templateCategory || item.templateCategoryId
        }"?`,
        confirmText: 'Видалити',
        cancelText: 'Відмінити',
        color: 'warn',
        icon: 'warning',
      },
    });

    ref.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.dictUnitTaskItemsService.delete(item.id).subscribe({
          next: () => {
            this.reload();
            this.snackBar.open('Елемент успішно видалено', 'Закрити', { duration: 3000 });
          },
          error: (error) => {
            console.error('Помилка видалення елемента:', error);
            const errorMessage = S5App_ErrorHandler.handleHttpError(
              error,
              'Помилка видалення елемента'
            );
            this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
          },
        });
      }
    });
  }
}
