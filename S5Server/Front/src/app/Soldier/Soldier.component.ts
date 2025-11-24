import { Component, inject, ViewChild, AfterViewInit, effect, signal, input } from '@angular/core';
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
import { FormsModule } from '@angular/forms';
import { SlicePipe, DatePipe } from '@angular/common';

import { SoldierDialogComponent } from '../dialogs/SoldierDialog';
import { ConfirmDialogComponent } from '../dialogs/ConfirmDialog.component';
import { SoldierService, SoldierDto, SoldierCreateDto } from './services/soldier.service';
import { UnitService, UnitDto } from '../Unit/services/unit.service';
import {
  isCriticalStatus,
  isSevereStatus,
  isProblematicStatus,
  isRecoveryStatus,
} from './Soldier.constant';

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
    FormsModule,
    SlicePipe,
    DatePipe,
  ],
  templateUrl: './Soldier.component.html',
  styleUrl: './Soldier.component.scss',
})
export class SoldiersComponent implements AfterViewInit {
  soldierService = inject(SoldierService);
  unitService = inject(UnitService);

  // Input для фильтрации по подразделению
  filterByUnitId = input<string | null>(null);

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
    'assignedUnitShortName',
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

  constructor() {
    effect(() => {
      this.dataSource.data = this.items();
    });

    // Автоматически перезагружаем данные при изменении фильтра подразделения
    effect(() => {
      const unitFilter = this.filterByUnitId();
      if (unitFilter !== null) {
        this.reload();
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    /*
    // Загружаем все подразделения для фильтров
    this.unitService.getAll().subscribe((units) => {
      this.allUnits.set(units);
    });
*/
    // Загружаем начальные данные
    this.reload();
  }

  reload() {
    // Определяем параметры для сервера
    const unitId = this.filterByUnitId() === '' ? undefined : this.filterByUnitId() || undefined;
    /*
    const assignedUnitId =
      this.selectedAssignedUnitId === ''
        ? undefined
        : this.selectedAssignedUnitId === 'null'
        ? 'null'
        : this.selectedAssignedUnitId || undefined;
        */

    //this.soldierService.getAll(this.searchText, unitId, assignedUnitId).subscribe((items) => {
    this.soldierService.getAll(undefined, unitId, undefined).subscribe((items) => {
      this.items.set(items);
    });
  }

  /*
  onSearchChange(searchText: string) {
    this.searchText = searchText;
    this.reload();
  }

  onAssignedUnitFilterChange(assignedUnitId: string | null) {
    this.selectedAssignedUnitId = assignedUnitId;
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
          unitId: this.filterByUnitId() || '',
          unitShortName: '',
          arrivedAt: new Date(),
          departedAt: undefined,
          assignedUnitId: undefined,
          assignedUnitShortName: undefined,
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
            rankId: result.data.rankId,
            positionId: result.data.positionId,
            stateId: result.data.stateId,
            comment: result.data.comment,
          };

          this.soldierService.create(createDto).subscribe(() => {
            this.reload();

            // Если нужно продолжить, открываем диалог снова
            if (result.continue) {
              setTimeout(() => openDialog(), 100);
            }
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
        this.soldierService.update(result.data.id, result.data).subscribe(() => this.reload());
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
        this.soldierService.delete(soldier.id).subscribe(() => this.reload());
      }
    });
  }

  // Придать к подразделению
  assign(soldier: Soldier) {
    // Здесь можно открыть диалог выбора подразделения
    // Для простоты сейчас покажем уведомление
    this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      autoFocus: false,
      data: {
        title: 'Придання бійця',
        message: `Функція придання бійця "${soldier.fio}" до підрозділу буде реалізована пізніше.`,
        confirmText: 'OK',
        cancelText: '',
        color: 'primary',
        icon: 'info',
      },
    });
  }

  // Переместить в другое подразделение
  move(soldier: Soldier) {
    // Здесь можно открыть диалог выбора подразделения
    // Для простоты сейчас покажем уведомление
    this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      autoFocus: false,
      data: {
        title: 'Переміщення бійця',
        message: `Функція переміщення бійця "${soldier.fio}" до іншого підрозділу буде реалізована пізніше.`,
        confirmText: 'OK',
        cancelText: '',
        color: 'primary',
        icon: 'info',
      },
    });
  }
}
