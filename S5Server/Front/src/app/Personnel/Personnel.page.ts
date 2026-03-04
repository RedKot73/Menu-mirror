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

import {
  SoldierDialogComponent,
  SoldierDialogData,
  SoldierDialogResult,
} from '../dialogs/SoldierDialog.component';
import { ConfirmDialogComponent } from '../dialogs/ConfirmDialog.component';
import { SoldierService, SoldierDto } from '../Soldier/services/soldier.service';
import { UnitService } from '../Unit/services/unit.service';
import { LookupDto } from '../shared/models/lookup.models';
import { S5App_ErrorHandler } from '../shared/models/ErrorHandler';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  isSevereStatus,
  isProblematicStatus,
  isRecoveryStatus,
  UnitTag,
} from '../Soldier/Soldier.constant';
import { SoldierUtils } from '../Soldier/soldier.utils';
import { InlineEditManager, EditColumn } from '../Soldier/InlineEditManager.class';

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
  styleUrls: ['./Personnel.page.scss', '../Soldier/Soldier.component.scss'],
})
export class PersonnelPage implements AfterViewInit {
  soldierService = inject(SoldierService);
  unitService = inject(UnitService);
  dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  items = this.soldierService.createItemsSignal();
  dataSource = new MatTableDataSource<SoldierDto>([]);
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

  inlineEdit = new InlineEditManager((column: EditColumn, term: string) =>
    this.unitService.lookup(term, column === UnitTag.InvolvedId),
  );

  displayLookupFn = (unit: LookupDto | null): string => (unit ? unit.value : '');

  // Методы для проверки статусов
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
        model: {
          firstName: '',
          unitId: '',
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
            console.error('Помилка видалення бійця:', error);
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

  // === Inline edit helpers (single-mode per row) ===
  isEditing(soldierId: string, column: EditColumn): boolean {
    return this.inlineEdit.isMode(soldierId, column);
  }

  startEditing(soldier: SoldierDto, column: EditColumn) {
    this.inlineEdit.clearOthers(soldier.id);
    this.inlineEdit.ensure(soldier.id, column, this.getInitialValue(soldier, column));
  }

  cancelEditing(soldierId: string) {
    this.inlineEdit.clear(soldierId);
  }

  getControl(soldier: SoldierDto, column: EditColumn): FormControl<string | LookupDto | null> {
    return this.inlineEdit.ensure(soldier.id, column, this.getInitialValue(soldier, column)).control;
  }

  getOptions(soldierId: string): Observable<LookupDto[]> {
    return this.inlineEdit.options(soldierId);
  }

  isLoading(soldierId: string): boolean {
    return this.inlineEdit.loading(soldierId);
  }

  onSelect(soldier: SoldierDto, column: EditColumn, event: MatAutocompleteSelectedEvent) {
    const selectedUnit: LookupDto | null = event.option.value;
    let successMessage = '';
    let operation: Observable<SoldierDto> | null = null;

    switch (column) {
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
        this.applyRow(updated);
        this.inlineEdit.clear(soldier.id);
        this.snackBar.open(successMessage, 'Закрити', { duration: 2000 });
      },
      error: (error) => {
        console.error('Помилка оновлення підрозділу:', error);
        const errorMessage = S5App_ErrorHandler.handleHttpError(
          error,
          'Помилка оновлення підрозділу',
        );
        this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
      },
    });
  }

  private applyRow(updated: SoldierDto) {
    const next = this.items().map((s) => (s.id === updated.id ? updated : s));
    this.items.set(next);
    this.dataSource.data = next;
  }

  private getInitialValue(soldier: SoldierDto, column: EditColumn): string | null {
    switch (column) {
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

  formatFIO(item: SoldierDto): string {
    return SoldierUtils.formatFIO(item.firstName, item.midleName, item.lastName);
  }
}
