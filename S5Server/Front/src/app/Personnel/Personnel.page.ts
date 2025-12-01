import { Component, inject, ViewChild, AfterViewInit } from '@angular/core';
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
import { SoldierService, SoldierDto } from '../Soldier/services/soldier.service';
import { UnitService } from '../Unit/services/unit.service';
import { LookupDto } from '../shared/models/lookup.models';
import { ErrorHandler } from '../shared/models/ErrorHandler';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  isCriticalStatus,
  isSevereStatus,
  isProblematicStatus,
  isRecoveryStatus,
} from '../Soldier/Soldier.constant';

export type Soldier = SoldierDto;

@Component({
  selector: 'app-personnel-page',
  standalone: true,
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
  templateUrl: './Personnel.page.html',
  styleUrl: './Personnel.page.scss',
})
export class PersonnelPage implements AfterViewInit {
  soldierService = inject(SoldierService);
  unitService = inject(UnitService);
  dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  items = this.soldierService.createItemsSignal();
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

  // Методы для проверки статусов
  isCriticalStatus = isCriticalStatus;
  isSevereStatus = isSevereStatus;
  isProblematicStatus = isProblematicStatus;
  isRecoveryStatus = isRecoveryStatus;

  @ViewChild(MatSort) sort!: MatSort;

  // Autocomplete для inline редактирования assignedUnit
  assignedUnitControls = new Map<string, FormControl>();
  filteredAssignedUnits = new Map<string, Observable<LookupDto[]>>();
  isLoadingAssignedMap = new Map<string, boolean>();
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

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.reload();
  }

  reload() {
    // Завантажуємо всіх бійців без фільтрів
    this.soldierService.getAll().subscribe((soldiers) => {
      this.items.set(soldiers);
      this.dataSource.data = soldiers;
    });
  }

  // CREATE
  add() {
    const dialogRef = this.dialog.open(SoldierDialogComponent, {
      width: '600px',
      data: {
        id: '',
        fio: '',
        nickName: '',
        rankId: undefined,
        positionId: undefined,
        stateId: undefined,
        unitId: undefined,
        assignedUnitId: undefined,
        operationalUnitId: undefined,
        arrivedAt: new Date(),
        departedAt: null,
        comment: '',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.soldierService.create(result).subscribe({
          next: () => {
            this.reload();
            this.snackBar.open('Бійця успішно створено', 'Закрити', { duration: 3000 });
          },
          error: (error) => {
            console.error('Помилка створення бійця:', error);
            const errorMessage = ErrorHandler.handleHttpError(error, 'Помилка створення бійця');
            this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
          },
        });
      }
    });
  }

  // UPDATE
  edit(soldier: Soldier) {
    const dialogRef = this.dialog.open(SoldierDialogComponent, {
      width: '600px',
      data: { ...soldier },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.soldierService.update(soldier.id, result).subscribe({
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

  // ============= Методы для редактирования assignedUnit =============

  isEditingAssignedUnit(soldierId: string): boolean {
    return this.editingAssignedUnit.get(soldierId) || false;
  }

  startEditingAssignedUnit(soldier: Soldier) {
    this.editingAssignedUnit.set(soldier.id, true);
    this.getAssignedUnitControl(soldier);
  }

  cancelEditingAssignedUnit(soldier: Soldier) {
    this.editingAssignedUnit.set(soldier.id, false);
    const control = this.assignedUnitControls.get(soldier.id);
    if (control) {
      control.setValue(
        soldier.assignedUnitId
          ? { id: soldier.assignedUnitId, value: soldier.assignedUnitShortName || '' }
          : null
      );
    }
  }

  getAssignedUnitControl(soldier: Soldier): FormControl {
    if (!this.assignedUnitControls.has(soldier.id)) {
      const control = new FormControl(
        soldier.assignedUnitId
          ? { id: soldier.assignedUnitId, value: soldier.assignedUnitShortName || '' }
          : null
      );

      this.assignedUnitControls.set(soldier.id, control);

      const filtered$ = control.valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        switchMap((value) => {
          const searchText = typeof value === 'string' ? value : value?.value || '';
          if (!searchText || searchText.length < 2) {
            return of([]);
          }

          this.isLoadingAssignedMap.set(soldier.id, true);
          return this.unitService.lookup(searchText, 20).pipe(
            switchMap((results) => {
              this.isLoadingAssignedMap.set(soldier.id, false);
              return of(results);
            })
          );
        })
      );

      this.filteredAssignedUnits.set(soldier.id, filtered$);
    }

    return this.assignedUnitControls.get(soldier.id)!;
  }

  getFilteredAssignedUnits(soldierId: string): Observable<LookupDto[]> {
    return this.filteredAssignedUnits.get(soldierId) || of([]);
  }

  isLoadingAssigned(soldierId: string): boolean {
    return this.isLoadingAssignedMap.get(soldierId) || false;
  }

  displayAssignedFn = (unit: LookupDto | null): string => {
    return unit ? unit.value : '';
  };

  onAssignedUnitSelected(soldier: Soldier, event: MatAutocompleteSelectedEvent) {
    const selectedUnit: LookupDto | null = event.option.value;
    const assignedUnitId = selectedUnit?.id || undefined;

    this.soldierService.update(soldier.id, { ...soldier, assignedUnitId }).subscribe({
      next: () => {
        this.editingAssignedUnit.set(soldier.id, false);
        this.reload();
        this.snackBar.open('Придання оновлено', 'Закрити', { duration: 2000 });
      },
      error: (error) => {
        console.error('Помилка оновлення придання:', error);
        const errorMessage = ErrorHandler.handleHttpError(error, 'Помилка оновлення придання');
        this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
      },
    });
  }

  // ============= Методы для редактирования unit =============

  isEditingUnit(soldierId: string): boolean {
    return this.editingUnit.get(soldierId) || false;
  }

  startEditingUnit(soldier: Soldier) {
    this.editingUnit.set(soldier.id, true);
    this.getUnitControl(soldier);
  }

  cancelEditingUnit(soldier: Soldier) {
    this.editingUnit.set(soldier.id, false);
    const control = this.unitControls.get(soldier.id);
    if (control) {
      control.setValue(
        soldier.unitId ? { id: soldier.unitId, value: soldier.unitShortName || '' } : null
      );
    }
  }

  getUnitControl(soldier: Soldier): FormControl {
    if (!this.unitControls.has(soldier.id)) {
      const control = new FormControl(
        soldier.unitId ? { id: soldier.unitId, value: soldier.unitShortName || '' } : null
      );

      this.unitControls.set(soldier.id, control);

      const filtered$ = control.valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        switchMap((value) => {
          const searchText = typeof value === 'string' ? value : value?.value || '';
          if (!searchText || searchText.length < 2) {
            return of([]);
          }

          this.isLoadingUnitMap.set(soldier.id, true);
          return this.unitService.lookup(searchText, 20).pipe(
            switchMap((results) => {
              this.isLoadingUnitMap.set(soldier.id, false);
              return of(results);
            })
          );
        })
      );

      this.filteredUnits.set(soldier.id, filtered$);
    }

    return this.unitControls.get(soldier.id)!;
  }

  getFilteredUnits(soldierId: string): Observable<LookupDto[]> {
    return this.filteredUnits.get(soldierId) || of([]);
  }

  isLoadingUnit(soldierId: string): boolean {
    return this.isLoadingUnitMap.get(soldierId) || false;
  }

  displayUnitFn = (unit: LookupDto | null): string => {
    return unit ? unit.value : '';
  };

  onUnitSelected(soldier: Soldier, event: MatAutocompleteSelectedEvent) {
    const selectedUnit: LookupDto | null = event.option.value;
    const unitId = selectedUnit?.id || null;

    if (unitId) {
      this.soldierService.update(soldier.id, { ...soldier, unitId }).subscribe({
        next: () => {
          this.editingUnit.set(soldier.id, false);
          this.reload();
          this.snackBar.open('Підрозділ оновлено', 'Закрити', { duration: 2000 });
        },
        error: (error) => {
          console.error('Помилка оновлення підрозділу:', error);
          const errorMessage = ErrorHandler.handleHttpError(error, 'Помилка оновлення підрозділу');
          this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
        },
      });
    }
  }

  // ============= Методы для редактирования operationalUnit =============

  isEditingOperationalUnit(soldierId: string): boolean {
    return this.editingOperationalUnit.get(soldierId) || false;
  }

  startEditingOperationalUnit(soldier: Soldier) {
    this.editingOperationalUnit.set(soldier.id, true);
    this.getOperationalUnitControl(soldier);
  }

  cancelEditingOperationalUnit(soldier: Soldier) {
    this.editingOperationalUnit.set(soldier.id, false);
    const control = this.operationalUnitControls.get(soldier.id);
    if (control) {
      control.setValue(
        soldier.operationalUnitId
          ? { id: soldier.operationalUnitId, value: soldier.operationalUnitShortName || '' }
          : null
      );
    }
  }

  getOperationalUnitControl(soldier: Soldier): FormControl {
    if (!this.operationalUnitControls.has(soldier.id)) {
      const control = new FormControl(
        soldier.operationalUnitId
          ? { id: soldier.operationalUnitId, value: soldier.operationalUnitShortName || '' }
          : null
      );

      this.operationalUnitControls.set(soldier.id, control);

      const filtered$ = control.valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        switchMap((value) => {
          const searchText = typeof value === 'string' ? value : value?.value || '';
          if (!searchText || searchText.length < 2) {
            return of([]);
          }

          this.isLoadingOperationalMap.set(soldier.id, true);
          return this.unitService.lookup(searchText, 20).pipe(
            switchMap((results) => {
              this.isLoadingOperationalMap.set(soldier.id, false);
              return of(results);
            })
          );
        })
      );

      this.filteredOperationalUnits.set(soldier.id, filtered$);
    }

    return this.operationalUnitControls.get(soldier.id)!;
  }

  getFilteredOperationalUnits(soldierId: string): Observable<LookupDto[]> {
    return this.filteredOperationalUnits.get(soldierId) || of([]);
  }

  isLoadingOperational(soldierId: string): boolean {
    return this.isLoadingOperationalMap.get(soldierId) || false;
  }

  displayOperationalFn = (unit: LookupDto | null): string => {
    return unit ? unit.value : '';
  };

  onOperationalUnitSelected(soldier: Soldier, event: MatAutocompleteSelectedEvent) {
    const selectedUnit: LookupDto | null = event.option.value;
    const operationalUnitId = selectedUnit?.id || undefined;

    this.soldierService.update(soldier.id, { ...soldier, operationalUnitId }).subscribe({
      next: () => {
        this.editingOperationalUnit.set(soldier.id, false);
        this.reload();
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
