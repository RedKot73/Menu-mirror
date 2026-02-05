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
  computed,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  startWith,
  finalize,
  takeUntil,
} from 'rxjs/operators';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { DatePipe } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

import { UnitTaskDto } from '../models/template-dataset.models';
import { LookupDto } from '../../shared/models/lookup.models';
import { DictDroneModelService } from '../../../ServerService/dictDroneModel.service';
import { DictUnitTasksService, DictUnitTask } from '../../../ServerService/dictUnitTasks.service';
import { DictAreasService, DictArea } from '../../../ServerService/dictAreas.service';
import { S5App_ErrorHandler } from '../../shared/models/ErrorHandler';
//import { UnitContentComponent } from '../../Unit/UnitContent.component';
import { UnitDto } from '../../Unit/services/unit.service';
import { UnitTag } from '../../Soldier/Soldier.component';
import { SoldierService, SoldierDto } from '../../Soldier/services/soldier.service';
import {
  isCriticalStatus,
  isSevereStatus,
  isProblematicStatus,
  isRecoveryStatus,
} from '../../Soldier/Soldier.constant';

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
    //UnitContentComponent,
  ],
  templateUrl: './UnitTaskCard.component.html',
  styleUrls: [
    './UnitTaskCard.component.scss',
    '../../Unit/UnitContent.component.scss',
    '../../Soldier/Soldier.component.scss',
  ],
})
export class UnitTaskCardComponent implements OnInit, OnDestroy, AfterViewInit {
  private dictDroneModelService = inject(DictDroneModelService);
  private dictUnitTasksService = inject(DictUnitTasksService);
  private dictAreasService = inject(DictAreasService);
  private soldierService = inject(SoldierService);
  private snackBar = inject(MatSnackBar);
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

  @ViewChild(MatSort) sort!: MatSort;

  // Методи для перевірки статусів
  isCriticalStatus = isCriticalStatus;
  isSevereStatus = isSevereStatus;
  isProblematicStatus = isProblematicStatus;
  isRecoveryStatus = isRecoveryStatus;

  // Для доступу до enum в шаблоні
  readonly unitTag = UnitTag;

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
  protected droneModelControl = new FormControl<LookupDto | string | null>(null);

  // Drone Model Autocomplete
  protected filteredDroneModels$!: Observable<LookupDto[]>;
  protected isLoadingDroneModels = false;

  // Перетворюємо UnitTaskDto в UnitDto для UnitContent компонента
  unitForContent = computed<UnitDto>(() => {
    const task = this.unitTaskSignal();
    if (!task) {
      return {} as UnitDto;
    }
    return {
      id: task.unitId,
      parentId: task.parentId,
      parentShortName: task.parentShortName,
      assignedUnitId: task.assignedUnitId,
      assignedShortName: task.assignedShortName,
      name: task.unitShortName,
      shortName: task.unitShortName,
      militaryNumber: '',
      forceTypeId: undefined,
      forceType: undefined,
      unitTypeId: task.unitTypeId,
      unitType: task.unitTypeName,
      isInvolved: task.isInvolved,
      orderVal: 0,
      persistentLocationId: task.persistentLocationId,
      persistentLocation: task.persistentLocationValue,
      comment: undefined,
      changedBy: task.changedBy,
      validFrom: task.validFrom,
    } as UnitDto;
  });

  ngOnInit(): void {
    // Завантажуємо повний список завдань (з areaTypeId)
    this.dictUnitTasksService.getAll().subscribe({
      next: (tasks) => {
        this.unitTasks.set(tasks);
        // Після завантаження списку ініціалізуємо значення taskControl
        if (this.unitTask.taskId) {
          const task = tasks.find((t) => t.id === this.unitTask.taskId);
          if (task) {
            this.taskControl.setValue(task);
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

    // Ініціалізуємо значення DroneModel
    if (this.unitTask.means && this.unitTask.means.length > 0) {
      // TODO: Відобразити список засобів БПЛА
    }

    // Підписуємося на зміни task
    this.taskControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((task) => {
      this.onTaskChange(task);
    });

    // Підписуємося на зміни area
    this.areaControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((area) => {
      this.onAreaChange(area);
    });

    // Ініціалізуємо автокомпліт для БПЛА
    this.initDroneModelAutocomplete();
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
   * Обробник натискання кнопки видалення
   */
  onRemoveClick(): void {
    this.remove.emit(this.unitTask.id);
  }

  /**
   * Обробник зміни завдання
   */
  private onTaskChange(task: DictUnitTask | null): void {
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
   * Ініціалізує автокомпліт для моделі БПЛА
   */
  private initDroneModelAutocomplete(): void {
    this.filteredDroneModels$ = this.droneModelControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((value) => {
        const searchTerm = typeof value === 'string' ? value : value?.value || '';
        if (searchTerm.length < 2) {
          return of([]);
        }

        this.isLoadingDroneModels = true;
        return this.dictDroneModelService.lookup(searchTerm, 10).pipe(
          finalize(() => {
            this.isLoadingDroneModels = false;
          }),
        );
      }),
      takeUntil(this.destroy$),
    );
  }

  /**
   * Відображення назви моделі БПЛА в автокомпліті
   */
  displayDroneModelFn = (droneModel: LookupDto | null): string => {
    return droneModel ? droneModel.value : '';
  };

  /**
   * Обробник вибору моделі БПЛА
   */
  onDroneModelSelected(event: MatAutocompleteSelectedEvent): void {
    const selectedDroneModel = event.option.value as LookupDto | null;

    // TODO: Додати логіку для роботи з means (DroneModelTask[])
    // Потрібно створити окремий сервіс DroneModelTaskService
    // та відображення списку засобів

    const updatedUnit = {
      ...this.unitTask,
      means: selectedDroneModel
        ? [
            {
              id: '',
              unitTaskId: this.unitTask.id,
              droneModelId: selectedDroneModel.id,
              droneModelValue: selectedDroneModel.value,
              quantity: 1,
            },
          ]
        : [],
    };
    this.unitChange.emit(updatedUnit);
  }
}
