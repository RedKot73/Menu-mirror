import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  inject,
  //computed,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject, firstValueFrom } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { DatePipe } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

import {
  UnitTaskDto,
  UnitTaskCreateDto,
  DroneModelTaskDto,
} from '../models/template-dataset.models';
import { DictUnitTasksService, DictUnitTask } from '../../../ServerService/dictUnitTasks.service';
import { DictAreasService, DictArea } from '../../../ServerService/dictAreas.service';
import { DroneModelTaskService } from '../services/drone-model-task.service';
import { UnitTaskService } from '../services/unit-task.service';
import { DictDroneModelSelectDialogComponent } from '../../dialogs/DictDroneModelSelect-dialog.component';
import { DictDroneModel } from '../../../ServerService/dictDroneModel.service';
//import { UnitDto } from '../../Unit/services/unit.service';
import { SoldierService, SoldierDto } from '../../Soldier/services/soldier.service';
import {
  isCriticalStatus,
  isSevereStatus,
  isProblematicStatus,
  isRecoveryStatus,
} from '../../Soldier/Soldier.constant';
import { S5App_ErrorHandler } from '../../shared/models/ErrorHandler';

@Component({
  selector: 'app-unit-task-card',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatTableModule,
    MatSortModule,
    DatePipe,
    MatTooltipModule,
  ],
  templateUrl: './UnitTaskCard.component.html',
  styleUrls: [
    './UnitTaskCard.component.scss',
    '../../Unit/UnitContent.component.scss',
    '../../Soldier/Soldier.component.scss',
  ],
})
export class UnitTaskCardComponent implements OnInit, OnDestroy, AfterViewInit {
  private dictUnitTasksService = inject(DictUnitTasksService);
  private dictAreasService = inject(DictAreasService);
  private droneModelTaskService = inject(DroneModelTaskService);
  private unitTaskService = inject(UnitTaskService);
  private soldierService = inject(SoldierService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);
  private destroy$ = new Subject<void>();

  // Сигнал для реактивного відстеження змін unitTask
  private unitTaskSignal = signal<UnitTaskDto | null>(null);

  // Перелік завдань з довідника
  protected unitTasks = signal<DictUnitTask[]>([]);
  // Перелік областей (РВЗ)
  protected areas = signal<DictArea[]>([]);

  // Дані особового складу
  soldiers = signal<SoldierDto[]>([]);
  soldierDataSource = new MatTableDataSource<SoldierDto>([]);
  soldierDisplayedColumns: string[] = [
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

  // Дані засобів (Master-Detail)
  means = signal<DroneModelTaskDto[]>([]);
  meansDataSource = new MatTableDataSource<DroneModelTaskDto>([]);
  meansDisplayedColumns: string[] = ['actions', 'droneModelValue', 'quantity'];
  isLoadingMeans = signal<boolean>(false);

  @ViewChild(MatSort) sort!: MatSort;

  // Методи для перевірки статусів
  isCriticalStatus = isCriticalStatus;
  isSevereStatus = isSevereStatus;
  isProblematicStatus = isProblematicStatus;
  isRecoveryStatus = isRecoveryStatus;

  @Input({ required: true })
  set unitTask(value: UnitTaskDto) {
    this.unitTaskSignal.set(value);
  }
  get unitTask(): UnitTaskDto {
    return this.unitTaskSignal()!;
  }

  @Output() remove = new EventEmitter<string>();
  @Output() unitChange = new EventEmitter<UnitTaskDto>();

  // Form Controls
  protected taskControl = new FormControl<DictUnitTask | null>(null);
  protected areaControl = new FormControl<DictArea | null>(null);

  ngOnInit(): void {
    // Завантажуємо повний список завдань (з areaTypeId)
    this.dictUnitTasksService.getAll().subscribe({
      next: (tasks) => {
        this.unitTasks.set(tasks);
        // Після завантаження списку ініціалізуємо значення taskControl
        if (this.unitTask.taskId) {
          const task = tasks.find((t) => t.id === this.unitTask.taskId);
          if (task) {
            // Використовуємо emitEvent: false щоб не спрацювали обробники при ініціалізації
            this.taskControl.setValue(task, { emitEvent: false });
          }
        }
      },
      error: (error) => {
        console.error('Помилка завантаження завдань:', error);
        const errorMessage = S5App_ErrorHandler.handleHttpError(
          error,
          'Помилка завантаження завдань',
        );
        this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
      },
    });

    // Завантажуємо особовий склад
    this.reloadSoldiers();

    // ✅ Ініціалізуємо локально додані засоби (якщо є)
    if (this.unitTask.means && this.unitTask.means.length > 0) {
      this.means.set(this.unitTask.means);
      this.meansDataSource.data = this.unitTask.means;
    }
  }

  ngAfterViewInit(): void {
    this.soldierDataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Завантажує особовий склад підрозділу
   */
  reloadSoldiers(): void {
    const unitId = this.unitTask.unitId;
    if (!unitId) {
      return;
    }

    this.soldierService
      .getAll(undefined, unitId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (soldiers: SoldierDto[]) => {
          this.soldiers.set(soldiers);
          this.soldierDataSource.data = soldiers;
        },
        error: (error: unknown) => {
          console.error('Помилка завантаження особового складу:', error);
          const errorMessage = S5App_ErrorHandler.handleHttpError(
            error,
            'Помилка завантаження особового складу',
          );
          this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
        },
      });
  }

  /**
   * Завантажує засоби (дрони) для завдання підрозділу (Master-Detail)
   */
  loadMeans(): void {
    const unitTaskId = this.unitTask.id;
    if (!unitTaskId) {
      // UnitTask ще не збережено - показуємо локально додані засоби
      if (this.unitTask.means && this.unitTask.means.length > 0) {
        this.means.set(this.unitTask.means);
        this.meansDataSource.data = this.unitTask.means;
      }
      return;
    }

    // Якщо вже завантажено - не перезавантажуємо
    if (this.means().length > 0) {
      return;
    }

    this.isLoadingMeans.set(true);
    this.droneModelTaskService
      .getByUnitTask(unitTaskId)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.isLoadingMeans.set(false)),
      )
      .subscribe({
        next: (means: DroneModelTaskDto[]) => {
          this.means.set(means);
          this.meansDataSource.data = means;
        },
        error: (error: unknown) => {
          console.error('Помилка завантаження засобів:', error);
          const errorMessage = S5App_ErrorHandler.handleHttpError(
            error,
            'Помилка завантаження засобів',
          );
          this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
        },
      });
  }

  /**
   * Обробник натискання кнопки видалення
   */
  onRemoveClick(): void {
    this.remove.emit(this.unitTask.id);
  }

  /**
   * Обробник зміни завдання (викликається при selectionChange)
   */
  onTaskChange(task: DictUnitTask | null): void {
    if (!task) {
      const updatedUnit: UnitTaskDto = {
        ...this.unitTask,
        taskId: '',
        taskValue: '',
        areaId: '',
        areaValue: '',
      };
      this.unitChange.emit(updatedUnit);
      this.areas.set([]);
      return;
    }

    const updatedUnit: UnitTaskDto = {
      ...this.unitTask,
      taskId: task.id,
      taskValue: task.value,
    };
    this.unitChange.emit(updatedUnit);

    // Завантажуємо області для обраного завдання (використовуємо areaTypeId з кешованого об'єкта)
    if (task.areaTypeId) {
      this.loadAreasByTask(task.areaTypeId);
    }
  }

  /**
   * Обробник зміни області (РВЗ)
   */
  onAreaChange(area: DictArea | null): void {
    if (!area) {
      const updatedUnit: UnitTaskDto = {
        ...this.unitTask,
        areaId: '',
        areaValue: '',
      };
      this.unitChange.emit(updatedUnit);
      return;
    }

    const updatedUnit: UnitTaskDto = {
      ...this.unitTask,
      areaId: area.id,
      areaValue: area.value,
    };
    this.unitChange.emit(updatedUnit);
  }

  /**
   * Завантажує області по areaTypeId
   */
  private loadAreasByTask(areaTypeId: string): void {
    // Завантажуємо області відфільтровані по areaTypeId
    this.dictAreasService
      .getByAreaType(areaTypeId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (areas) => {
          this.areas.set(areas);
          // Ініціалізуємо значення areaControl якщо є збережена область
          if (this.unitTask.areaId) {
            const area = areas.find((a) => a.id === this.unitTask.areaId);
            if (area) {
              this.areaControl.setValue(area, { emitEvent: false });
            }
          }
        },
        error: (error) => {
          console.error('Помилка завантаження областей:', error);
          const errorMessage = S5App_ErrorHandler.handleHttpError(
            error,
            'Помилка завантаження областей',
          );
          this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
          this.areas.set([]);
        },
      });
  }

  /**
   * Відкриває діалог вибору моделі БПЛА та додає її до списку засобів
   */
  addMean(): void {
    const dialogRef = this.dialog.open(DictDroneModelSelectDialogComponent, {
      width: '800px',
      data: {
        title: 'Оберіть модель БПЛА',
      },
    });

    dialogRef.afterClosed().subscribe((selectedDrone: DictDroneModel | undefined) => {
      if (selectedDrone) {
        // Перевіряємо чи немає вже такого дрона
        const existingMean = this.means().find((m) => m.droneModelId === selectedDrone.id);

        if (existingMean) {
          this.snackBar.open('Ця модель БПЛА вже додана до списку', 'Закрити', { duration: 3000 });
          return;
        }

        // Додаємо локально (збереження буде через saveUnitTask)
        const newMean: DroneModelTaskDto = {
          id: '', // Буде створено при збереженні
          unitTaskId: this.unitTask.id || '',
          droneModelId: selectedDrone.id,
          droneModelValue: selectedDrone.value,
          quantity: 1,
        };

        const updatedMeans = [...this.means(), newMean];
        this.means.set(updatedMeans);
        this.meansDataSource.data = updatedMeans;

        // Синхронізуємо з батьківським компонентом
        const updatedUnit = {
          ...this.unitTask,
          meansCount: updatedMeans.length,
          means: updatedMeans,
        };
        this.unitChange.emit(updatedUnit);
      }
    });
  }

  /**
   * Видаляє засіб зі списку
   */
  deleteMean(mean: DroneModelTaskDto): void {
    // Локальне видалення (збереження буде через saveUnitTask)
    const updatedMeans = this.means().filter((m) =>
      m.id ? m.id !== mean.id : m.droneModelId !== mean.droneModelId,
    );
    this.means.set(updatedMeans);
    this.meansDataSource.data = updatedMeans;

    // Синхронізуємо з батьківським компонентом
    const updatedUnit = {
      ...this.unitTask,
      meansCount: updatedMeans.length,
      means: updatedMeans,
    };
    this.unitChange.emit(updatedUnit);
  }

  /**
   * ✅ ПУБЛІЧНИЙ МЕТОД: Зберігає UnitTask + його засоби (means)
   * Викликається з батьківського компонента при загальному збереженні
   */
  async saveUnitTask(dataSetId: string): Promise<boolean> {
    try {
      // 1. Створюємо або оновлюємо UnitTask
      if (this.unitTask.id) {
        // Оновлюємо існуючий
        await firstValueFrom(this.unitTaskService.update(this.unitTask.id, this.unitTask));
      } else {
        // Створюємо новий
        const createDto: UnitTaskCreateDto = {
          dataSetId: dataSetId,
          unitId: this.unitTask.unitId,
          taskId: this.unitTask.taskId,
          areaId: this.unitTask.areaId,
        };
        const result = await firstValueFrom(this.unitTaskService.create(createDto));
        this.unitTask.id = result.id; // Оновлюємо ID локально

        // Синхронізуємо ID з батьківським компонентом
        this.unitChange.emit({ ...this.unitTask, id: result.id });
      }

      // 2. Зберігаємо засоби через bulkSave
      const meansToSave = this.means().map((mean) => ({
        unitTaskId: this.unitTask.id,
        droneModelId: mean.droneModelId,
        quantity: mean.quantity,
      }));

      await firstValueFrom(this.droneModelTaskService.bulkSave(this.unitTask.id, meansToSave));

      return true;
    } catch (error) {
      console.error('Помилка збереження UnitTask:', error);
      const errorMessage = S5App_ErrorHandler.handleHttpError(
        error,
        `Помилка збереження підрозділу "${this.unitTask.unitShortName}"`,
      );
      this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
      return false;
    }
  }
}
