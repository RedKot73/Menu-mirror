import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
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

import { UnitTaskDto } from '../models/template-dataset.models';
import { LookupDto } from '../../shared/models/lookup.models';
import { DictDroneModelService } from '../../../ServerService/dictDroneModel.service';
import { DictUnitTasksService } from '../../../ServerService/dictUnitTasks.service';
import { DictUnitTaskItemsService } from '../../../ServerService/dictUnitTaskItems.service';
import { DictAreasService, DictArea } from '../../../ServerService/dictAreas.service';
import { S5App_ErrorHandler } from '../../shared/models/ErrorHandler';
import { UnitContentComponent } from '../../Unit/UnitContent.component';
import { UnitDto } from '../../Unit/services/unit.service';

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
    UnitContentComponent,
  ],
  templateUrl: './UnitTaskCard.component.html',
  styleUrls: ['./UnitTaskCard.component.scss'],
})
export class UnitTaskCardComponent implements OnInit, OnDestroy {
  private dictDroneModelService = inject(DictDroneModelService);
  private dictUnitTasksService = inject(DictUnitTasksService);
  private dictUnitTaskItemsService = inject(DictUnitTaskItemsService);
  private dictAreasService = inject(DictAreasService);
  private snackBar = inject(MatSnackBar);
  private destroy$ = new Subject<void>();

  // Используем сигнал для реактивного отслеживания изменений unitTask
  private unitTaskSignal = signal<UnitTaskDto | null>(null);

  // Список завдань з справочника
  protected unitTasks = signal<LookupDto[]>([]);

  // Список областей (РСП), відфільтрований по areaTypeId з обраного завдання
  protected areas = signal<DictArea[]>([]);

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
  protected taskControl = new FormControl<LookupDto | null>(null);
  protected areaControl = new FormControl<DictArea | null>(null);
  protected droneModelControl = new FormControl<LookupDto | string | null>(null);

  // Drone Model Autocomplete
  protected filteredDroneModels$!: Observable<LookupDto[]>;
  protected isLoadingDroneModels = false;

  // Перетворюємо UnitTaskDto в UnitDto для UnitContent компонента
  // Используем computed() чтобы избежать создания нового объекта при каждом change detection
  unitForContent = computed<UnitDto>(() => {
    const task = this.unitTaskSignal();
    if (!task) {
      return {} as UnitDto;
    }
    return {
      ...task,
      name: task.shortName,
      orderVal: 0,
    } as UnitDto;
  });

  ngOnInit(): void {
    // Завантажуємо список завдань
    this.dictUnitTasksService.getSelectList().subscribe({
      next: (tasks) => {
        this.unitTasks.set(tasks);
        // Після завантаження списку ініціалізуємо значення taskControl
        if (this.unitTask.TaskId) {
          const task = tasks.find((t) => t.id === this.unitTask.TaskId);
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

    // Ініціалізуємо значення FormControl з unit
    if (this.unitTask.AreaValue) {
      // TODO: Завантажити повний об'єкт DictArea по AreaValue
      // Поки що залишаємо порожнім, оскільки в unitTask зберігається тільки AreaValue (string)
    }
    if (this.unitTask.Means && this.unitTask.Means.length > 0) {
      const droneModel: LookupDto = { id: '', value: this.unitTask.Means[0] };
      this.droneModelControl.setValue(droneModel);
    }

    // Підписуємося на зміни task - завантажуємо області при зміні завдання
    this.taskControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((task) => {
      this.onTaskChange(task);
      // Завантажуємо області з фільтром по areaTypeId обраного завдання
      if (task?.id) {
        this.loadAreasByTask(task.id);
      } else {
        this.areas.set([]);
      }
    });

    // Підписуємося на зміни area
    this.areaControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => this.onAreaChange(value));

    // Ініціалізуємо автокомпліт для БПЛА
    this.initDroneModelAutocomplete();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
  private onTaskChange(task: LookupDto | null): void {
    if (!task) {
      const updatedUnit: UnitTaskDto = {
        ...this.unitTask,
        TaskId: '',
        TaskItems: [],
      };
      this.unitChange.emit(updatedUnit);
      return;
    }

    // Завантажуємо всі елементи завдання (для різних категорій документів)
    this.dictUnitTaskItemsService
      .getByUnitTask(task.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (taskItems) => {
          const updatedUnit: UnitTaskDto = {
            ...this.unitTask,
            TaskId: task.id,
            TaskItems: taskItems,
          };
          this.unitChange.emit(updatedUnit);
        },
        error: (error) => {
          console.error('Помилка завантаження елементів завдання:', error);
          const errorMessage = S5App_ErrorHandler.handleHttpError(
            error,
            'Помилка завантаження елементів завдання',
          );
          this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });

          // Встановлюємо порожній масив елементів
          const updatedUnit: UnitTaskDto = {
            ...this.unitTask,
            TaskId: task.id,
            TaskItems: [],
          };
          this.unitChange.emit(updatedUnit);
        },
      });
  }

  /**
   * Обробник зміни зони (РСП)
   */
  private onAreaChange(area: DictArea | null): void {
    const updatedUnit = { ...this.unitTask, AreaValue: area?.value || '' };
    this.unitChange.emit(updatedUnit);
  }

  /**
   * Завантажує області по areaTypeId з обраного завдання
   */
  private loadAreasByTask(taskId: string): void {
    // Спочатку отримуємо повну інформацію про завдання, щоб дізнатися areaTypeId
    this.dictUnitTasksService
      .getById(taskId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (task) => {
          if (task.areaTypeId) {
            // Завантажуємо області відфільтровані по areaTypeId
            this.dictAreasService
              .getByAreaType(task.areaTypeId)
              .pipe(takeUntil(this.destroy$))
              .subscribe({
                next: (areas) => this.areas.set(areas),
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
          } else {
            this.areas.set([]);
          }
        },
        error: (error) => {
          console.error('Помилка завантаження завдання:', error);
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
    const updatedUnit = {
      ...this.unitTask,
      Means: selectedDroneModel ? [selectedDroneModel.value] : [],
    };
    this.unitChange.emit(updatedUnit);
  }
}
