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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlicePipe, DatePipe, AsyncPipe } from '@angular/common';

import {
  SoldierDialogComponent,
  SoldierDialogData,
  SoldierDialogResult,
} from '../dialogs/SoldierDialog.component';
import { ConfirmDialogComponent } from '../dialogs/ConfirmDialog.component';
import { SoldierService, SoldierDto } from '../../ServerService/soldier.service';
import { UnitService } from '../../ServerService/unit.service';
import { S5App_ErrorHandler } from '../shared/models/ErrorHandler';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  isSevereStatus,
  isProblematicStatus,
  isRecoveryStatus,
  UnitTag,
} from '../Soldier/Soldier.constant';
import { SoldierUtils } from '../Soldier/soldier.utils';
import {
  InlineEditManager,
  EditColumn,
  resolveUnitOperation,
} from '../Soldier/InlineEditManager.class';

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
  private soldierService = inject(SoldierService);
  private unitService = inject(UnitService);
  private dialog = inject(MatDialog);
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
    'involvedUnitShortName',
    'arrivedAt',
    'departedAt',
    'comment',
  ];

  readonly UnitTag = UnitTag;

  inlineEdit = new InlineEditManager((column: EditColumn, term: string) =>
    this.unitService.lookup(term, column === UnitTag.InvolvedId),
  );

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

  // === Inline edit helpers ===
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
        this.applyRow(updated);
        this.inlineEdit.clear(soldier.id);
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

  private applyRow(updated: SoldierDto) {
    const next = this.items().map((s) => (s.id === updated.id ? updated : s));
    this.items.set(next);
    this.dataSource.data = next;
  }

  formatFIO(item: SoldierDto): string {
    return SoldierUtils.formatFIO(item.firstName, item.midleName, item.lastName);
  }
}
