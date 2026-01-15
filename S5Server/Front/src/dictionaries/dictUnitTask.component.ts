import {
  Component,
  inject,
  ViewChild,
  AfterViewInit,
  effect,
  Output,
  EventEmitter,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { DictUnitTaskDialogComponent } from '../app/dialogs/DictUnitTask-dialog.component';
import { ConfirmDialogComponent } from '../app/dialogs/ConfirmDialog.component';
import { DictUnitTasksService, DictUnitTask } from '../ServerService/dictUnitTasks.service';
import { S5App_ErrorHandler } from '../app/shared/models/ErrorHandler';

@Component({
  selector: 'dict-unit-tasks',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatSortModule,
    MatIconModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './dictUnitTask.component.html',
  styleUrls: ['./dict-page.styles.scss'],
})
export class DictUnitTaskComponent implements AfterViewInit {
  @Output() taskSelected = new EventEmitter<DictUnitTask | null>();

  dictUnitTasksService = inject(DictUnitTasksService);
  items = this.dictUnitTasksService.createItemsSignal();
  dataSource = new MatTableDataSource<DictUnitTask>([]);
  displayedColumns = ['value', 'amount', 'withMeans', 'atPermanentPoint', 'comment', 'actions'];
  selectedTaskId = signal<string | null>(null);
  editingTaskId = signal<string | null>(null);
  editingField = signal<'amount' | 'withMeans' | 'atPermanentPoint' | null>(null);
  editingValue = signal<any>(null);
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
        value: '',
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
        message: `Ви впевнені, що хочете видалити завдання "${unitTask.value}"?`,
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

  selectTask(task: DictUnitTask) {
    this.selectedTaskId.set(task.id);
    this.taskSelected.emit(task);
  }

  isEditing(taskId: string, field: 'amount' | 'withMeans' | 'atPermanentPoint'): boolean {
    return this.editingTaskId() === taskId && this.editingField() === field;
  }

  startEditing(
    task: DictUnitTask,
    field: 'amount' | 'withMeans' | 'atPermanentPoint',
    event: Event
  ) {
    event.stopPropagation();
    this.editingTaskId.set(task.id);
    this.editingField.set(field);
    this.editingValue.set(task[field]);
  }

  cancelEditing(event: Event) {
    event.stopPropagation();
    this.editingTaskId.set(null);
    this.editingField.set(null);
    this.editingValue.set(null);
  }

  saveFieldChange(
    task: DictUnitTask,
    field: 'amount' | 'withMeans' | 'atPermanentPoint',
    event: Event
  ) {
    event.stopPropagation();

    const updatedTask = { ...task, [field]: this.editingValue() };

    this.dictUnitTasksService.update(task.id, updatedTask).subscribe({
      next: () => {
        // Оновлюємо значення в таблиці
        Object.assign(task, { [field]: this.editingValue() });
        this.snackBar.open('Зміни збережено', 'Закрити', { duration: 2000 });
        this.cancelEditing(event);
      },
      error: (error) => {
        console.error('Помилка оновлення завдання:', error);
        const errorMessage = S5App_ErrorHandler.handleHttpError(
          error,
          'Помилка оновлення завдання'
        );
        this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
        this.cancelEditing(event);
      },
    });
  }

  updateEditingValue(value: any) {
    this.editingValue.set(value);
  }
}
