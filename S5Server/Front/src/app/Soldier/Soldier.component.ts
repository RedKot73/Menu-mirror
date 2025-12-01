import { Component, inject, ViewChild, AfterViewInit, effect, input } from '@angular/core';
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
import { debounceTime, switchMap, startWith } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { SoldierDialogComponent } from '../dialogs/SoldierDialog';
import { ConfirmDialogComponent } from '../dialogs/ConfirmDialog.component';
import { SoldierService, SoldierDto, SoldierCreateDto } from './services/soldier.service';
import { UnitService /*, UnitDto*/ } from '../Unit/services/unit.service';
import { LookupDto } from '../shared/models/lookup.models';
import { ErrorHandler } from '../shared/models/ErrorHandler';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  isCriticalStatus,
  isSevereStatus,
  isProblematicStatus,
  isRecoveryStatus,
  UnitTag,
} from './Soldier.constant';

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

  items = this.soldierService.createItemsSignal();
  //allUnits = signal<UnitDto[]>([]);
  dataSource = new MatTableDataSource<Soldier>([]);
  displayedColumns = [
    'menu',
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
  dialog = inject(MatDialog);

  // Фильтры
  //searchText = '';
  //selectedAssignedUnitId: string | null = null;

  // Методы для проверки статусов (делаем доступными в шаблоне)
  isCriticalStatus = isCriticalStatus;
  isSevereStatus = isSevereStatus;
  isProblematicStatus = isProblematicStatus;
  isRecoveryStatus = isRecoveryStatus;

  @ViewChild(MatSort) sort!: MatSort;

  // Autocomplete для inline редактирования assignedUnit
  assignedUnitControls = new Map<string, FormControl>();
  filteredAssignedUnits = new Map<string, Observable<LookupDto[]>>();
  isLoadingAssignedMap = new Map<string, boolean>();
  // Отслеживание режима редактирования для каждого солдата
  editingAssignedUnit = new Map<string, boolean>();

  // Autocomplete для inline редактирования unit (основний підрозділ)
  unitControls = new Map<string, FormControl>();
  filteredUnits = new Map<string, Observable<LookupDto[]>>();
  isLoadingUnitMap = new Map<string, boolean>();
  editingUnit = new Map<string, boolean>();

  // Autocomplete для inline редактирования operationalUnit (оперативний підрозділ)
  operationalUnitControls = new Map<string, FormControl>();
  filteredOperationalUnits = new Map<string, Observable<LookupDto[]>>();
  isLoadingOperationalMap = new Map<string, boolean>();
  editingOperationalUnit = new Map<string, boolean>();

  constructor() {
    effect(() => {
      this.dataSource.data = this.items();
    });

    // Автоматически перезагружаем данные при изменении unitId или currentUnitTab
    effect(() => {
      const currentUnitId = this.unitId();
      // Следим за изменением вкладки для перезагрузки данных
      this.currentUnitTab();

      if (currentUnitId !== null) {
        this.reload();
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    // Загружаем начальные данные
    this.reload();
  }

  reload() {
    const currentUnitId = this.unitId() === '' ? undefined : this.unitId() || undefined;

    if (!currentUnitId) {
      // Если нет unitId, загружаем все записи
      this.soldierService.getAll().subscribe((items) => {
        this.items.set(items);
      });
      return;
    }

    // Определяем какой метод API использовать на основе currentUnitTab
    switch (this.currentUnitTab()) {
      case UnitTag.OperationalId:
        this.soldierService.getByOperational(currentUnitId).subscribe((items) => {
          this.items.set(items);
        });
        break;
      case UnitTag.AssignedId:
        this.soldierService.getByAssigned(currentUnitId).subscribe((items) => {
          this.items.set(items);
        });
        break;
      case UnitTag.UnitId:
      default:
        this.soldierService.getAll(undefined, currentUnitId).subscribe((items) => {
          this.items.set(items);
        });
        break;
    }
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
          operationalUnitId: undefined,
          operationalUnitShortName: undefined,
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
            operationalUnitId: result.data.operationalUnitId,
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
              const errorMessage = ErrorHandler.handleHttpError(error, 'Помилка створення бійця');
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
            const errorMessage = ErrorHandler.handleHttpError(error, 'Помилка оновлення бійця');
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
            const errorMessage = ErrorHandler.handleHttpError(error, 'Помилка видалення бійця');
            this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
          },
        });
      }
    });
  }

  unassign(soldier: Soldier) {
    if (this.currentUnitTab() === UnitTag.AssignedId) {
      this.unassignAssigned(soldier);
    } else {
      this.unassignOperational(soldier);
    }
  }

  /**
   *
   * @param soldier
   */
  unassignAssigned(soldier: Soldier) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      width: '360px',
      maxWidth: '95vw',
      autoFocus: false,
      data: {
        title: 'Вилучення бійця',
        message: `Ви впевнені, що хочете вилучити бійця "${soldier.fio}" з переліку?`,
        confirmText: 'Вилучити',
        cancelText: 'Відмінити',
        color: 'warn',
        icon: 'warning',
      },
    });

    ref.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.soldierService.unassignAssigned(soldier.id).subscribe({
          next: () => {
            this.reload();
            this.snackBar.open('Бійця вилучено з переліку приданих', 'Закрити', { duration: 3000 });
          },
          error: (error) => {
            console.error('Помилка вилучення бійця:', error);
            const errorMessage = ErrorHandler.handleHttpError(error, 'Помилка вилучення бійця');
            this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
          },
        });
      }
    });
  }

  /**
   * Вилучити призначення оперативного підрозділу
   */
  unassignOperational(soldier: Soldier) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      width: '360px',
      maxWidth: '95vw',
      autoFocus: false,
      data: {
        title: 'Вилучення бійця',
        message: `Ви впевнені, що хочете вилучити бійця "${soldier.fio}" з переліку?`,
        confirmText: 'Вилучити',
        cancelText: 'Відмінити',
        color: 'warn',
        icon: 'warning',
      },
    });

    ref.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.soldierService.unassignOperational(soldier.id).subscribe({
          next: () => {
            this.reload();
            this.snackBar.open('Бійця вилучено з оперативного підрозділу', 'Закрити', {
              duration: 3000,
            });
          },
          error: (error) => {
            console.error('Помилка вилучення бійця:', error);
            const errorMessage = ErrorHandler.handleHttpError(error, 'Помилка вилучення бійця');
            this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
          },
        });
      }
    });
  }

  // Проверить, находится ли поле assignedUnit в режиме редактирования
  isEditingAssignedUnit(soldierId: string): boolean {
    return this.editingAssignedUnit.get(soldierId) || false;
  }

  // Начать редактирование assignedUnit
  startEditingAssignedUnit(soldier: Soldier) {
    this.editingAssignedUnit.set(soldier.id, true);
    // Инициализируем control если еще не создан
    this.getAssignedUnitControl(soldier);
  }

  // Отменить редактирование assignedUnit
  cancelEditingAssignedUnit(soldier: Soldier) {
    this.editingAssignedUnit.set(soldier.id, false);
    // Восстанавливаем оригинальное значение
    const control = this.assignedUnitControls.get(soldier.id);
    if (control) {
      control.setValue(soldier.assignedUnitShortName || '');
    }
  }

  // Получить FormControl для assignedUnit (создать если не существует)
  getAssignedUnitControl(soldier: Soldier): FormControl {
    if (!this.assignedUnitControls.has(soldier.id)) {
      const control = new FormControl(soldier.assignedUnitShortName || '');
      this.assignedUnitControls.set(soldier.id, control);

      // Настраиваем фильтрацию
      const filtered$ = control.valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        switchMap((value: string | LookupDto | null) => {
          let searchTerm = '';
          if (typeof value === 'string') {
            searchTerm = value;
          } else if (value && typeof value === 'object' && 'value' in value) {
            searchTerm = value.value;
          }

          if (searchTerm.length < 2) {
            return of([]);
          }
          this.isLoadingAssignedMap.set(soldier.id, true);
          return this.unitService.lookup(searchTerm, 20);
        })
      );

      // Сохраняем Observable для использования в шаблоне
      this.filteredAssignedUnits.set(soldier.id, filtered$);
    }

    return this.assignedUnitControls.get(soldier.id)!;
  }

  // Получить отфильтрованные подразделения
  getFilteredAssignedUnits(soldierId: string): Observable<LookupDto[]> {
    return this.filteredAssignedUnits.get(soldierId) || of([]);
  }

  // Проверить состояние загрузки
  isLoadingAssigned(soldierId: string): boolean {
    return this.isLoadingAssignedMap.get(soldierId) || false;
  }

  // Отобразить значение в autocomplete
  displayAssignedFn = (unit: LookupDto | null): string => {
    return unit ? unit.value : '';
  };

  // Обработка выбора подразделения
  onAssignedUnitSelected(soldier: Soldier, event: MatAutocompleteSelectedEvent) {
    this.isLoadingAssignedMap.set(soldier.id, false);
    const selectedUnit: LookupDto | null = event.option.value;

    // Используем специализированные методы API
    const operation = selectedUnit
      ? this.soldierService.assignAssigned(soldier.id, selectedUnit.id)
      : this.soldierService.unassignAssigned(soldier.id);

    operation.subscribe({
      next: () => {
        // Перезагружаем данные
        this.reload();
        // Выходим из режима редактирования
        this.editingAssignedUnit.set(soldier.id, false);
        this.snackBar.open('Придання оновлено', 'Закрити', { duration: 2000 });
      },
      error: (error) => {
        console.error('Помилка оновлення придання:', error);
        const errorMessage = ErrorHandler.handleHttpError(error, 'Помилка оновлення придання');
        this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
      },
    });
  }

  // ============= Методы для редактирования основного подразделения (unitShortName) =============

  // Проверить, находится ли поле unit в режиме редактирования
  isEditingUnit(soldierId: string): boolean {
    return this.editingUnit.get(soldierId) || false;
  }

  // Начать редактирование unit
  startEditingUnit(soldier: Soldier) {
    this.editingUnit.set(soldier.id, true);
    this.getUnitControl(soldier);
  }

  // Отменить редактирование unit
  cancelEditingUnit(soldier: Soldier) {
    this.editingUnit.set(soldier.id, false);
    const control = this.unitControls.get(soldier.id);
    if (control) {
      control.setValue(soldier.unitShortName || '');
    }
  }

  // Получить FormControl для unit
  getUnitControl(soldier: Soldier): FormControl {
    if (!this.unitControls.has(soldier.id)) {
      const control = new FormControl(soldier.unitShortName || '');
      this.unitControls.set(soldier.id, control);

      const filtered$ = control.valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        switchMap((value: string | LookupDto | null) => {
          let searchTerm = '';
          if (typeof value === 'string') {
            searchTerm = value;
          } else if (value && typeof value === 'object' && 'value' in value) {
            searchTerm = value.value;
          }

          if (searchTerm.length < 2) {
            return of([]);
          }
          this.isLoadingUnitMap.set(soldier.id, true);
          return this.unitService.lookup(searchTerm, 20);
        })
      );

      this.filteredUnits.set(soldier.id, filtered$);
    }

    return this.unitControls.get(soldier.id)!;
  }

  // Получить отфильтрованные подразделения
  getFilteredUnits(soldierId: string): Observable<LookupDto[]> {
    return this.filteredUnits.get(soldierId) || of([]);
  }

  // Проверить состояние загрузки
  isLoadingUnit(soldierId: string): boolean {
    return this.isLoadingUnitMap.get(soldierId) || false;
  }

  // Отобразить значение в autocomplete
  displayUnitFn = (unit: LookupDto | null): string => {
    return unit ? unit.value : '';
  };

  // Обработка выбора основного подразделения
  onUnitSelected(soldier: Soldier, event: MatAutocompleteSelectedEvent) {
    this.isLoadingUnitMap.set(soldier.id, false);
    const selectedUnit: LookupDto | null = event.option.value;

    if (!selectedUnit) {
      return;
    }

    // Используем метод move для перемещения в другое подразделение
    this.soldierService.move(soldier.id, selectedUnit.id).subscribe({
      next: () => {
        // Перезагружаем данные
        this.reload();
        // Выходим из режима редактирования
        this.editingUnit.set(soldier.id, false);
        this.snackBar.open('Підрозділ оновлено', 'Закрити', { duration: 2000 });
      },
      error: (error) => {
        console.error('Помилка переміщення бійця:', error);
        const errorMessage = ErrorHandler.handleHttpError(error, 'Помилка переміщення бійця');
        this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
      },
    });
  }

  // ============= Методы для редактирования оперативного подразделения (operationalUnitShortName) =============

  // Проверить, находится ли поле operationalUnit в режиме редактирования
  isEditingOperationalUnit(soldierId: string): boolean {
    return this.editingOperationalUnit.get(soldierId) || false;
  }

  // Начать редактирование operationalUnit
  startEditingOperationalUnit(soldier: Soldier) {
    this.editingOperationalUnit.set(soldier.id, true);
    this.getOperationalUnitControl(soldier);
  }

  // Отменить редактирование operationalUnit
  cancelEditingOperationalUnit(soldier: Soldier) {
    this.editingOperationalUnit.set(soldier.id, false);
    const control = this.operationalUnitControls.get(soldier.id);
    if (control) {
      control.setValue(soldier.operationalUnitShortName || '');
    }
  }

  // Получить FormControl для operationalUnit
  getOperationalUnitControl(soldier: Soldier): FormControl {
    if (!this.operationalUnitControls.has(soldier.id)) {
      const control = new FormControl(soldier.operationalUnitShortName || '');
      this.operationalUnitControls.set(soldier.id, control);

      const filtered$ = control.valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        switchMap((value: string | LookupDto | null) => {
          let searchTerm = '';
          if (typeof value === 'string') {
            searchTerm = value;
          } else if (value && typeof value === 'object' && 'value' in value) {
            searchTerm = value.value;
          }

          if (searchTerm.length < 2) {
            return of([]);
          }
          this.isLoadingOperationalMap.set(soldier.id, true);
          return this.unitService.lookup(searchTerm, 20);
        })
      );

      this.filteredOperationalUnits.set(soldier.id, filtered$);
    }

    return this.operationalUnitControls.get(soldier.id)!;
  }

  // Получить отфильтрованные оперативные подразделения
  getFilteredOperationalUnits(soldierId: string): Observable<LookupDto[]> {
    return this.filteredOperationalUnits.get(soldierId) || of([]);
  }

  // Проверить состояние загрузки
  isLoadingOperational(soldierId: string): boolean {
    return this.isLoadingOperationalMap.get(soldierId) || false;
  }

  // Отобразить значение в autocomplete
  displayOperationalFn = (unit: LookupDto | null): string => {
    return unit ? unit.value : '';
  };

  // Обработка выбора оперативного подразделения
  onOperationalUnitSelected(soldier: Soldier, event: MatAutocompleteSelectedEvent) {
    this.isLoadingOperationalMap.set(soldier.id, false);
    const selectedUnit: LookupDto | null = event.option.value;

    // Используем специализированные методы API
    const operation = selectedUnit
      ? this.soldierService.assignOperational(soldier.id, selectedUnit.id)
      : this.soldierService.unassignOperational(soldier.id);

    operation.subscribe({
      next: () => {
        // Перезагружаем данные
        this.reload();
        // Выходим из режима редактирования
        this.editingOperationalUnit.set(soldier.id, false);
        this.snackBar.open('Оперативний підрозділ оновлено', 'Закрити', { duration: 2000 });
      },
      error: (error) => {
        console.error('Помилка оновлення оперативного підрозділу:', error);
        const errorMessage = ErrorHandler.handleHttpError(
          error,
          'Помилка оновлення оперативного підрозділу'
        );
        this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
      },
    });
  }
}
