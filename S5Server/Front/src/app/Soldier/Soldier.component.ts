import { Component, inject, ViewChild, AfterViewInit, effect, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlicePipe, DatePipe, AsyncPipe } from '@angular/common';

import { ConfirmDialogComponent } from '../dialogs/ConfirmDialog.component';
import { UnitService } from '../Unit/services/unit.service';
import { S5App_ErrorHandler } from '../shared/models/ErrorHandler';
import { InlineEditManager, EditColumn, resolveUnitOperation } from './InlineEditManager.class';
import {
  SoldierDialogComponent,
  SoldierDialogData,
  SoldierDialogResult,
} from '../dialogs/SoldierDialog.component';
import { SoldierService, SoldierDto } from './services/soldier.service';
import { SoldierUtils } from '../Soldier/soldier.utils';
import { isSevereStatus, isProblematicStatus, isRecoveryStatus, UnitTag } from './Soldier.constant';

// Re-export для использования в других компонентах
export { UnitTag };

@Component({
  selector: 'app-page-soldiers',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatSortModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatMenuModule,
    MatDividerModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    SlicePipe,
    DatePipe,
    AsyncPipe,
  ],
  templateUrl: './Soldier.component.html',
  styleUrl: './Soldier.component.scss',
})
export class SoldiersComponent implements AfterViewInit {
  private soldierService = inject(SoldierService);
  private unitService = inject(UnitService);

  // Делаем UnitTag доступным в шаблоне
  readonly UnitTag = UnitTag;

  private snackBar = inject(MatSnackBar);

  // Input для ID подразделения
  unitId = input<string | null>(null);
  // Режим тільки для читання
  isReadOnly = input<boolean>(false);
  // Дані для відображення
  items = signal<SoldierDto[]>([]);

  dataSource = new MatTableDataSource<SoldierDto>([]);
  displayedColumns: string[] = [];
  dialog = inject(MatDialog);

  inlineEdit = new InlineEditManager((column: EditColumn, term: string) =>
    this.unitService.lookup(term, column === UnitTag.InvolvedId),
  );

  // Методы для проверки статусов (делаем доступными в шаблоне)
  isSevereStatus = isSevereStatus;
  isProblematicStatus = isProblematicStatus;
  isRecoveryStatus = isRecoveryStatus;

  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    // Завантажуємо дані при зміні підрозділу
    effect(() => {
      const id = this.unitId();
      if (id) {
        this.loadSoldiers(id);
      } else {
        this.items.set([]);
      }
    });

    // Оновлюємо displayedColumns на основі isReadOnly
    effect(() => {
      const baseColumns = [
        'unitTag',
        'fio',
        'nickName',
        'rankShortValue',
        'positionValue',
        'stateValue',
        'unitShortName',
        'assignedUnitShortName',
        'involvedUnitShortName',
        'arrivedAt',
        'departedAt',
        'comment',
      ];

      this.displayedColumns = this.isReadOnly() ? baseColumns : ['menu', ...baseColumns];
    });

    effect(() => {
      this.dataSource.data = this.items();
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  reload() {
    const id = this.unitId();
    if (id) {
      this.loadSoldiers(id);
    }
  }

  private loadSoldiers(unitId: string) {
    this.soldierService.getByUnit(unitId).subscribe({
      next: (data) => this.items.set(data),
      error: (error) => {
        const errorMessage = S5App_ErrorHandler.handleHttpError(
          error,
          'Помилка завантаження особового складу',
        );
        this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
      },
    });
  }

  // CREATE
  add() {
    const openDialog = () => {
      const dialogRef = this.dialog.open(SoldierDialogComponent, {
        width: '600px',
        data: {
          model: {
            firstName: '',
            midleName: '',
            lastName: '',
            nickName: '',
            unitId: this.unitId() || '',
            arrivedAt: new Date(),
            rankId: '',
            positionId: '',
            stateId: '',
          },
        } as SoldierDialogData,
      });

      dialogRef.afterClosed().subscribe((result: SoldierDialogResult | undefined) => {
        if (result) {
          this.soldierService.create(result.model).subscribe({
            next: () => {
              this.reload();
              this.snackBar.open('Бійця успішно створено', 'Закрити', { duration: 3000 });

              if (result.continue) {
                setTimeout(() => openDialog(), 100);
              }
            },
            error: (error) => {
              const errorMessage = S5App_ErrorHandler.handleHttpError(
                error,
                'Помилка створення бійця',
              );
              this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
            },
          });
        }
      });
    };

    openDialog();
  }

  // UPDATE
  edit(soldier: SoldierDto) {
    const dialogRef = this.dialog.open(SoldierDialogComponent, {
      width: '600px',
      data: {
        id: soldier.id,
        model: {
          firstName: soldier.firstName,
          midleName: soldier.midleName,
          lastName: soldier.lastName,
          nickName: soldier.nickName,
          unitId: soldier.unitId,
          arrivedAt: soldier.arrivedAt,
          departedAt: soldier.departedAt,
          assignedUnitId: soldier.assignedUnitId,
          involvedUnitId: soldier.involvedUnitId,
          rankId: soldier.rankId,
          positionId: soldier.positionId,
          stateId: soldier.stateId,
          comment: soldier.comment,
        },
      } as SoldierDialogData,
    });

    dialogRef.afterClosed().subscribe((result: SoldierDialogResult | undefined) => {
      if (result) {
        this.soldierService.update(soldier.id, result.model).subscribe({
          next: () => {
            this.reload();
            this.snackBar.open('Бійця успішно оновлено', 'Закрити', { duration: 3000 });
          },
          error: (error) => {
            const errorMessage = S5App_ErrorHandler.handleHttpError(
              error,
              'Помилка оновлення бійця',
            );
            this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
          },
        });
      }
    });
  }

  // DELETE
  delete(soldier: SoldierDto) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      width: '360px',
      maxWidth: '95vw',
      autoFocus: false,
      data: {
        title: 'Видалення бійця',
        message: `Ви впевнені, що хочете видалити бійця "${this.formatFIO(soldier)}"?`,
        confirmText: 'Видалити',
        cancelText: 'Відмінити',
        color: 'warn',
        icon: 'warning',
      },
    });

    ref.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.soldierService.delete(soldier.id).subscribe({
          next: () => {
            this.reload();
            this.snackBar.open('Бійця успішно видалено', 'Закрити', { duration: 3000 });
          },
          error: (error) => {
            const errorMessage = S5App_ErrorHandler.handleHttpError(
              error,
              'Помилка видалення бійця',
            );
            this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
          },
        });
      }
    });
  }

  unitTagTitle(soldier: SoldierDto): string {
    switch (this.unitId()) {
      case soldier.unitId:
        return '';
      case soldier.assignedUnitId:
        return 'Приданий';
      case soldier.involvedUnitId:
        return 'Задіяний';
      default:
        return ''; // За замовчуванням
    }
  }

  // === Inline edit helpers ===
  isEditing(soldierId: string, column: EditColumn): boolean {
    return !this.isReadOnly() && this.inlineEdit.isMode(soldierId, column);
  }

  startEditing(soldier: SoldierDto, column: EditColumn) {
    this.inlineEdit.startEdit(
      soldier.id,
      column,
      InlineEditManager.getInitialValue(soldier, column),
    );
  }

  getControl(soldier: SoldierDto, column: EditColumn) {
    return this.inlineEdit.getFormControl(
      soldier.id,
      column,
      InlineEditManager.getInitialValue(soldier, column),
    );
  }

  onSelect(soldier: SoldierDto, column: EditColumn, event: MatAutocompleteSelectedEvent) {
    const result = resolveUnitOperation(
      this.soldierService,
      soldier.id,
      column,
      event.option.value,
    );
    if (!result) {
      return;
    }

    result.operation.subscribe({
      next: (updated) => {
        this.updateRow(updated);
        this.inlineEdit.clear(soldier.id);
        this.reload();
        this.snackBar.open(result.message, 'Закрити', { duration: 2000 });
      },
      error: (error) => {
        const errorMessage = S5App_ErrorHandler.handleHttpError(
          error,
          'Помилка оновлення підрозділу',
        );
        this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
      },
    });
  }

  private updateRow(updated: SoldierDto) {
    const current = this.items();
    const next = current.map((s) => (s.id === updated.id ? updated : s));
    this.items.set(next);
  }

  formatFIO(item: SoldierDto): string {
    return SoldierUtils.formatFIO(item.firstName, item.midleName, item.lastName);
  }
}
