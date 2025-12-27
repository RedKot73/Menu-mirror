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
import { Observable } from 'rxjs';

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
  UnitTag,
} from '../Soldier/Soldier.constant';
import { InlineEditManager, EditMode } from '../Soldier/InlineEditManager.class';

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

  readonly UnitTag = UnitTag;

  inlineEdit = new InlineEditManager((mode: EditMode, term: string) =>
    this.unitService.lookup(term, 20)
  );

  displayLookupFn = (unit: LookupDto | null): string => (unit ? unit.value : '');

  // Методы для проверки статусов
  isCriticalStatus = isCriticalStatus;
  isSevereStatus = isSevereStatus;
  isProblematicStatus = isProblematicStatus;
  isRecoveryStatus = isRecoveryStatus;

  @ViewChild(MatSort) sort!: MatSort;

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

  // === Inline edit helpers (single-mode per row) ===
  isEditing(soldierId: string, mode: EditMode): boolean {
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
      case UnitTag.OperationalId:
        successMessage = 'Екіпаж/Група оновлено';
        operation = this.soldierService.assignOperational(soldier.id, selectedUnit?.id || null);
        break;
    }

    if (!operation) {
      return;
    }

    operation.subscribe({
      next: (updated) => {
        this.applyRow(updated);
        this.inlineEdit.clear(soldier.id);
        this.snackBar.open(successMessage, 'Закрити', { duration: 2000 });
      },
      error: (error) => {
        console.error('Помилка оновлення підрозділу:', error);
        const errorMessage = ErrorHandler.handleHttpError(error, 'Помилка оновлення підрозділу');
        this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
      },
    });
  }

  private applyRow(updated: SoldierDto) {
    const next = this.items().map((s) => (s.id === updated.id ? updated : s));
    this.items.set(next);
    this.dataSource.data = next;
  }

  private getInitialValue(soldier: Soldier, mode: EditMode): string | null {
    switch (mode) {
      case UnitTag.UnitId:
        return soldier.unitShortName || '';
      case UnitTag.AssignedId:
        return soldier.assignedUnitShortName || '';
      case UnitTag.OperationalId:
        return soldier.operationalUnitShortName || '';
      default:
        return '';
    }
  }
}
