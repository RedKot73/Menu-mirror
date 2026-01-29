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
import { MatSelectModule } from '@angular/material/select';

import { DictUnitTaskDialogComponent } from '../../app/dialogs/DictUnitTask-dialog.component';
import { ConfirmDialogComponent } from '../../app/dialogs/ConfirmDialog.component';
import { DictUnitTasksService, DictUnitTask } from '../../ServerService/dictUnitTasks.service';
import { DictAreaTypeService, DictAreaType } from '../../ServerService/dictAreaType.service';
import { S5App_ErrorHandler } from '../../app/shared/models/ErrorHandler';
import { VerticalLayoutComponent } from '../../app/shared/components/VerticalLayout.component';

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
    MatSelectModule,
    VerticalLayoutComponent,
  ],
  templateUrl: './dictUnitTask.component.html',
  styleUrls: ['../dict-page.styles.scss'],
  styles: [
    `
      :host {
        display: block;
        height: 100%;
      }

      table {
        width: 100%;
      }

      .inline-select {
        width: 150px;
        font-size: 14px;
      }

      .inline-select ::ng-deep .mat-mdc-form-field-infix {
        min-height: 40px;
      }
    `,
  ],
})
export class DictUnitTaskComponent implements AfterViewInit {
  @Output() taskSelected = new EventEmitter<DictUnitTask | null>();

  dictUnitTasksService = inject(DictUnitTasksService);
  dictAreaTypeService = inject(DictAreaTypeService);
  items = this.dictUnitTasksService.createItemsSignal();
  areaTypes = signal<DictAreaType[]>([]);
  dataSource = new MatTableDataSource<DictUnitTask>([]);
  displayedColumns = ['value', 'amount', 'withMeans', 'areaType', 'comment', 'actions'];
  selectedTaskId = signal<string | null>(null);
  editingTaskId = signal<string | null>(null);
  editingField = signal<'amount' | 'withMeans' | 'areaTypeId' | null>(null);
  editingValue = signal<string | number | boolean | undefined>(undefined);
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
    this.loadAreaTypes();
    this.reload();
  }

  loadAreaTypes() {
    this.dictAreaTypeService.getAll().subscribe({
      next: (types) => this.areaTypes.set(types),
      error: (error) => {
        console.error('Помилка завантаження типів РВЗ:', error);
        const errorMessage = S5App_ErrorHandler.handleHttpError(
          error,
          'Помилка завантаження типів РВЗ',
        );
        this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
      },
    });
  }

  reload() {
    this.dictUnitTasksService.getAll().subscribe({
      next: (items) => this.items.set(items),
      error: (error) => {
        console.error('Помилка завантаження завдань підрозділів:', error);
        const errorMessage = S5App_ErrorHandler.handleHttpError(
          error,
          'Помилка завантаження завдань підрозділів',
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
        areaTypeId: '',
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
              'Помилка створення завдання',
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
              'Помилка оновлення завдання',
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
              'Помилка видалення завдання',
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

  getAreaTypeShortValue(areaTypeId: string): string {
    const areaType = this.areaTypes().find((at) => at.id === areaTypeId);
    return areaType?.shortValue || '';
  }

  isEditing(taskId: string, field: 'amount' | 'withMeans' | 'areaTypeId'): boolean {
    return this.editingTaskId() === taskId && this.editingField() === field;
  }

  startEditing(task: DictUnitTask, field: 'amount' | 'withMeans' | 'areaTypeId', event: Event) {
    event.stopPropagation();
    this.editingTaskId.set(task.id);
    this.editingField.set(field);
    // Для areaTypeId сохраняем значение areaTypeId
    if (field === 'areaTypeId') {
      this.editingValue.set(task.areaTypeId);
    } else {
      this.editingValue.set(task[field]);
    }
  }

  cancelEditing(event: Event) {
    event.stopPropagation();
    this.editingTaskId.set(null);
    this.editingField.set(null);
    this.editingValue.set(undefined);
  }

  saveFieldChange(task: DictUnitTask, field: 'amount' | 'withMeans' | 'areaTypeId', event: Event) {
    event.stopPropagation();

    const updatedTask: DictUnitTask = { ...task, [field]: this.editingValue() };

    this.dictUnitTasksService.update(task.id, updatedTask).subscribe({
      next: () => {
        // Оновлюємо значення в таблиці
        if (field === 'areaTypeId') {
          task.areaTypeId = this.editingValue() as string;
          // Оновлюємо також shortValue
          const areaType = this.areaTypes().find((at) => at.id === this.editingValue());
          if (areaType) {
            task.areaType = areaType.shortValue;
          }
        } else {
          Object.assign(task, { [field]: this.editingValue() });
        }
        this.snackBar.open('Зміни збережено', 'Закрити', { duration: 2000 });
        this.cancelEditing(event);
      },
      error: (error) => {
        console.error('Помилка оновлення завдання:', error);
        const errorMessage = S5App_ErrorHandler.handleHttpError(
          error,
          'Помилка оновлення завдання',
        );
        this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
        this.cancelEditing(event);
      },
    });
  }

  updateEditingValue(value: string | number | boolean) {
    this.editingValue.set(value);
  }
}
