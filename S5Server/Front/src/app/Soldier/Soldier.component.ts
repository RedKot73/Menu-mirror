import {
  Component,
  inject,
  ViewChild,
  AfterViewInit,
  effect,
  input,
  model,
  output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { SlicePipe, DatePipe, AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

import { SoldierDialogComponent } from '../dialogs/SoldierDialog';
import { ConfirmDialogComponent } from '../dialogs/ConfirmDialog.component';
import { SoldierService, SoldierDto, SoldierCreateDto } from './services/soldier.service';
import { UnitService } from '../Unit/services/unit.service';
import { LookupDto } from '../shared/models/lookup.models';
import { S5App_ErrorHandler } from '../shared/models/ErrorHandler';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  isCriticalStatus,
  isSevereStatus,
  isProblematicStatus,
  isRecoveryStatus,
  UnitTag,
} from './Soldier.constant';
import { InlineEditManager, EditMode } from './InlineEditManager.class';

// Re-export для использования в других компонентах
export { UnitTag };

export type Soldier = SoldierDto;

@Component({
  selector: 'app-page-soldiers',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatSortModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
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
  soldierService = inject(SoldierService);
  unitService = inject(UnitService);
  private snackBar = inject(MatSnackBar);

  // Делаем UnitTag доступным в шаблоне
  readonly UnitTag = UnitTag;

  //Поточна вкладка підрозділу
  currentUnitTab = input<number>(UnitTag.UnitId);
  // Input для ID подразделения (единый для всех вкладок)
  unitId = input<string | null>(null);
  // Режим тільки для читання
  isReadOnly = input<boolean>(false);
  // Дані для відображення (двостороння прив'язка)
  items = model<SoldierDto[]>([]);
  // Подія для запиту перезавантаження даних батьківським компонентом
  reloadRequested = output<void>();

  dataSource = new MatTableDataSource<Soldier>([]);
  displayedColumns: string[] = [];
  dialog = inject(MatDialog);

  inlineEdit = new InlineEditManager((mode: EditMode, term: string) =>
    this.unitService.lookup(term, 20)
  );

  displayLookupFn = (unit: LookupDto | null): string => (unit ? unit.value : '');

  // Фильтры
  //searchText = '';
  //selectedAssignedUnitId: string | null = null;

  // Методы для проверки статусов (делаем доступными в шаблоне)
  isCriticalStatus = isCriticalStatus;
  isSevereStatus = isSevereStatus;
  isProblematicStatus = isProblematicStatus;
  isRecoveryStatus = isRecoveryStatus;

  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    // Обновляем displayedColumns на основе isReadOnly
    effect(() => {
      const baseColumns = [
        'fio',
        'nickName',
        'rankShortValue',
        'positionValue',
        'stateValue',
        'unitShortName',
        'assignedUnitShortName',
        'operationalUnitShortName',
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
    // Уведомляємо батьківський компонент про необхідність перезавантаження
    this.reloadRequested.emit();
  }

  /*
  onSearchChange(searchText: string) {
    this.searchText = searchText;
    this.reload();
  }
*/
  // CREATE
  add() {
    const openDialog = () => {
      const dialogRef = this.dialog.open(SoldierDialogComponent, {
        width: '600px',
        data: {
          id: '',
          firstName: '',
          midleName: '',
          lastName: '',
          fio: '',
          nickName: '',
          unitId: this.unitId() || '',
          unitShortName: '',
          arrivedAt: new Date(),
          departedAt: undefined,
          assignedUnitId: undefined,
          assignedUnitShortName: undefined,
          involvedUnitId: undefined,
          involvedUnitShortName: undefined,
          rankId: '',
          rankShortValue: '',
          positionId: '',
          positionValue: '',
          stateId: '',
          stateValue: '',
          comment: '',
        } as SoldierDto,
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result && result.data) {
          const createDto: SoldierCreateDto = {
            firstName: result.data.firstName,
            midleName: result.data.midleName,
            lastName: result.data.lastName,
            nickName: result.data.nickName,
            unitId: result.data.unitId,
            arrivedAt: result.data.arrivedAt,
            departedAt: result.data.departedAt,
            assignedUnitId: result.data.assignedUnitId,
            involvedUnitId: result.data.involvedUnitId,
            rankId: result.data.rankId,
            positionId: result.data.positionId,
            stateId: result.data.stateId,
            comment: result.data.comment,
          };

          this.soldierService.create(createDto).subscribe({
            next: () => {
              this.reload();
              this.snackBar.open('Бійця успішно створено', 'Закрити', { duration: 3000 });

              // Если нужно продолжить, открываем диалог снова
              if (result.continue) {
                setTimeout(() => openDialog(), 100);
              }
            },
            error: (error) => {
              console.error('Помилка створення бійця:', error);
              const errorMessage = S5App_ErrorHandler.handleHttpError(
                error,
                'Помилка створення бійця'
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
  edit(soldier: Soldier) {
    const dialogRef = this.dialog.open(SoldierDialogComponent, {
      width: '600px',
      data: { ...soldier }, // Передаем копию объекта для редактирования
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.data) {
        this.soldierService.update(result.data.id, result.data).subscribe({
          next: () => {
            this.reload();
            this.snackBar.open('Бійця успішно оновлено', 'Закрити', { duration: 3000 });
          },
          error: (error) => {
            console.error('Помилка оновлення бійця:', error);
            const errorMessage = S5App_ErrorHandler.handleHttpError(
              error,
              'Помилка оновлення бійця'
            );
            this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
          },
        });
      }
    });
  }

  // DELETE
  delete(soldier: Soldier) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      width: '360px',
      maxWidth: '95vw',
      autoFocus: false,
      data: {
        title: 'Видалення бійця',
        message: `Ви впевнені, що хочете видалити бійця "${soldier.fio}"?`,
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
            console.error('Помилка видалення бійця:', error);
            const errorMessage = S5App_ErrorHandler.handleHttpError(
              error,
              'Помилка видалення бійця'
            );
            this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
          },
        });
      }
    });
  }

  unassign(soldier: Soldier) {
    // Clear assignment based on current tab
    const isAssignedTab = this.currentUnitTab() === UnitTag.AssignedId;
    const title = 'Вилучення бійця';
    const message = `Ви впевнені, що хочете вилучити бійця "${soldier.fio}" з переліку?`;

    const ref = this.dialog.open(ConfirmDialogComponent, {
      width: '360px',
      maxWidth: '95vw',
      autoFocus: false,
      data: {
        title,
        message,
        confirmText: 'Вилучити',
        cancelText: 'Відмінити',
        color: 'warn',
        icon: 'warning',
      },
    });

    ref.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        const operation = isAssignedTab
          ? this.soldierService.assignAssigned(soldier.id, null)
          : this.soldierService.assignInvolved(soldier.id, null);

        operation.subscribe({
          next: (updated) => {
            this.updateRow(updated);
            const success = isAssignedTab
              ? 'Бійця вилучено з переліку приданих'
              : 'Бійця вилучено з оперативного підрозділу';
            this.snackBar.open(success, 'Закрити', { duration: 3000 });
          },
          error: (error) => {
            console.error('Помилка вилучення бійця:', error);
            const errorMessage = S5App_ErrorHandler.handleHttpError(
              error,
              'Помилка вилучення бійця'
            );
            this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
          },
        });
      }
    });
  }

  // === Inline edit helpers (single-mode per row) ===
  isEditing(soldierId: string, mode: EditMode): boolean {
    // В режимі readonly редагування неможливе
    if (this.isReadOnly()) {
      return false;
    }
    return this.inlineEdit.isMode(soldierId, mode);
  }

  startEditing(soldier: Soldier, mode: EditMode) {
    this.inlineEdit.clearOthers(soldier.id);
    this.inlineEdit.ensure(soldier.id, mode, this.getInitialValue(soldier, mode));
  }

  cancelEditing(soldier: Soldier) {
    this.inlineEdit.clear(soldier.id);
  }

  getControl(soldier: Soldier, mode: EditMode): FormControl<string | LookupDto | null> {
    return this.inlineEdit.ensure(soldier.id, mode, this.getInitialValue(soldier, mode)).control;
  }

  getOptions(soldierId: string): Observable<LookupDto[]> {
    return this.inlineEdit.options(soldierId);
  }

  isLoading(soldierId: string): boolean {
    return this.inlineEdit.loading(soldierId);
  }

  onSelect(soldier: Soldier, mode: EditMode, event: MatAutocompleteSelectedEvent) {
    const selectedUnit: LookupDto | null = event.option.value;
    let successMessage = '';
    let operation: Observable<SoldierDto> | null = null;

    switch (mode) {
      case UnitTag.UnitId:
        if (!selectedUnit) {
          return;
        }
        successMessage = 'Підрозділ оновлено';
        operation = this.soldierService.move(soldier.id, selectedUnit.id);
        break;
      case UnitTag.AssignedId:
        successMessage = 'Придання оновлено';
        operation = this.soldierService.assignAssigned(soldier.id, selectedUnit?.id || null);
        break;
      case UnitTag.InvolvedId:
        successMessage = 'Екіпаж/Група оновлено';
        operation = this.soldierService.assignInvolved(soldier.id, selectedUnit?.id || null);
        break;
    }

    if (!operation) {
      return;
    }

    operation.subscribe({
      next: (updated) => {
        this.updateRow(updated);
        this.inlineEdit.clear(soldier.id);
        this.snackBar.open(successMessage, 'Закрити', { duration: 2000 });
      },
      error: (error) => {
        console.error('Помилка оновлення підрозділу:', error);
        const errorMessage = S5App_ErrorHandler.handleHttpError(
          error,
          'Помилка оновлення підрозділу'
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

  private getInitialValue(soldier: Soldier, mode: EditMode): string | null {
    switch (mode) {
      case UnitTag.UnitId:
        return soldier.unitShortName || '';
      case UnitTag.AssignedId:
        return soldier.assignedUnitShortName || '';
      case UnitTag.InvolvedId:
        return soldier.involvedUnitShortName || '';
      default:
        return '';
    }
  }
}
