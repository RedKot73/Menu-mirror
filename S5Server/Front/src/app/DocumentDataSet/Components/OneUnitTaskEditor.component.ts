import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  inject,
  signal,
  computed,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Subject, firstValueFrom, of } from 'rxjs';
import { finalize, takeUntil, tap } from 'rxjs/operators';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
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

import { UnitDto } from '../../../ServerService/unit.service';
import {
  DictUnitTasksService,
  DictUnitTask
} from '../../../ServerService/dictUnitTasks.service';
import { DictAreasService, DictArea } from '../../../ServerService/dictAreas.service';
import {
  DroneModelTaskDto,
  DroneModelTaskService
} from '../../../ServerService/drone-model-task.service';
import {
  UnitTaskDto,
  UnitTaskService
} from '../../../ServerService/unit-task.service';
import { UnitAreasService } from '../../../ServerService/unitAreas.service';
import {
  DictDroneModelSelectDialogComponent,
  DictDroneModelWithQuantity,
} from '../../dialogs/DictDroneModelSelect-dialog.component';
import {
  SoldierTaskService,
  SoldierTaskDto,
  // SoldierCountDto,
} from '../../../ServerService/soldierTask.service';
import { SoldierUtils } from '../../Soldier/soldier.utils';
import { DocTemplateUtils } from '../../DocumentTemplates/models/shared.models';
import { S5App_ErrorHandler } from '../../shared/models/ErrorHandler';
import { LookupDto } from '../../shared/models/lookup.models';
import { PPD_AREA_TYPE_GUID } from '../../Unit/unit.constants';
import { ConfirmDialogComponent } from '../../dialogs/ConfirmDialog.component';
import { UnitSelectDialogComponent } from '../../dialogs/UnitSelect-dialog.component';

@Component({
  selector: 'app-one-unit-task-editor',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
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
    MatButtonToggleModule,
  ],
  templateUrl: './OneUnitTaskEditor.component.html',
  styleUrls: [
    './OneUnitTaskEditor.component.scss',
    '../../Unit/UnitContent.component.scss',
    '../../Soldier/Soldier.component.scss',
  ],
})
export class OneUnitTaskEditor implements OnDestroy, AfterViewInit {
  private dictUnitTasksService = inject(DictUnitTasksService);
  private dictAreasService = inject(DictAreasService);
  private droneModelTaskService = inject(DroneModelTaskService);
  private unitTaskService = inject(UnitTaskService);
  private soldierTaskService = inject(SoldierTaskService);
  private unitAreasService = inject(UnitAreasService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);
  private destroy$ = new Subject<void>();

  @Output() remove = new EventEmitter<string>();
  /** Еміт події при зміні стану незбережених змін */
  @Output() unsavedChangesChange = new EventEmitter<boolean>();

  // Сигнал для реактивного відстеження змін unitTask
  private unitTaskSignal = signal<UnitTaskDto | null>(null);

  // Перелік завдань з довідника
  isLoadingTasks = signal<boolean>(false);
  protected unitTasks = signal<DictUnitTask[]>([]);
  // Перелік областей (РВЗ)
  isLoadingAreas = signal<boolean>(false);
  protected areas = signal<DictArea[]>([]);

  /** Суміжні підрозділи */
  adjacentUnits = signal<LookupDto[]>([]);
  isLoadingAdjacentUnits = signal<boolean>(false);

  protected taskSelectState = computed(() => {
    if (this.isLoadingTasks()) { return 'loading'; }
    if (this.unitTasks().length > 0) { return 'loaded'; }
    return this.taskControl.value ? 'value' : 'empty';
  });
  protected areaSelectState = computed(() => {
    if (this.isLoadingAreas()) { return 'loading'; }
    if (this.areas().length > 0) { return 'loaded'; }
    return this.areaControl.value ? 'value' : 'empty';
  });
  protected adjacentUnitsSelectState = computed(() => {
    if (this.isLoadingAdjacentUnits()) { return 'loading'; }
    if (this.adjacentUnits().length === 0 && this.adjacentUnitsControl.value) { return 'value'; }
    return 'loaded';
  });

  // Дані особового складу
  soldiersPanelOpened = signal(false);
  isLoadingSoldiers = signal<boolean>(false);
  soldiers = signal<SoldierTaskDto[]>([]);
  soldierDataSource = new MatTableDataSource<SoldierTaskDto>([]);
  /** Сортування таблиці особового складу */
  @ViewChild(MatSort) sort!: MatSort;
  soldierDisplayedColumns: string[] = [
    'unitTag',
    'fio',
    'nickName',
    'rankShortValue',
    'positionValue',
    'stateValue',
    'unitShortName',
    'assignedUnitShortName',
    'arrivedAt',
    'departedAt',
    'involvedUnitShortName',
    'comment',
  ];

  // Дані засобів (Master-Detail)
  means = signal<DroneModelTaskDto[]>([]);
  meansDataSource = new MatTableDataSource<DroneModelTaskDto>([]);
  meansDisplayedColumns: string[] = ['actions', 'droneModelValue', 'droneTypeName', 'quantity'];
  /** Сигнал для відстеження стану завантаження засобів */
  isLoadingMeans = signal<boolean>(false);
  /** Сигнал для відстеження стану збереження засобів */
  isSavingMeans = signal<boolean>(false);

  // Стан збереження (для індикації процесу)
  isSaving = signal<boolean>(false);
  protected hasUnsavedChanges = signal<boolean>(false);
  
  // Effect для відстеження змін hasUnsavedChanges і емітування батьківському компоненту
  private unsavedChangesEffect = effect(() => {
    this.unsavedChangesChange.emit(this.hasUnsavedChanges());
  });
  /** Контрол для статусу публікації
   * Предотвращает переключение визуального контрола
   * при ошибках в изменении статуса публикации из-за
   * асинхронного обновления unitTask после сохранения.
   */
  protected publishStatusControl = new FormControl<boolean>(false, { nonNullable: true });

  // Стан редагування засобів
  editingMeanId = signal<string | null>(null);
  editingMeanField = signal<'quantity' | null>(null);
  editingMeanValue = signal<number | undefined>(undefined);

  /** Прапорець: чи завантажено список завдань з довідника */
  private unitTasksLoaded = false;

  // Form Controls
  protected taskControl = new FormControl<{ id: string; value: string; withMeans: boolean } | null>(null);
  protected areaControl = new FormControl<LookupDto | null>(null);
  protected adjacentUnitsControl = new FormControl<LookupDto | null>(null);
  protected adjacentUnitsCtrlBtn = new FormControl<boolean>(false);

  /** Вхідний параметр для компонента — завдання підрозділу */
  @Input({ required: true })
  set unitTask(value: UnitTaskDto) {
    // Reset areas if task changed
    if (value.taskId !== this.taskControl.value?.id) {
      this.areas.set([]);
    }

    this.unitTaskSignal.set(value);
    this.publishStatusControl.setValue(value.isPublished, { emitEvent: false });

    if (value.isPublished) {
      this.taskControl.disable();
      this.areaControl.disable();
      this.adjacentUnitsControl.disable();
      this.adjacentUnitsCtrlBtn.disable();
    } else {
      this.taskControl.enable();
      this.areaControl.enable();
      this.adjacentUnitsControl.enable();
      this.adjacentUnitsCtrlBtn.enable();
    }

    // Встановлюємо заглушки-значення з DTO для відображення поточних значень
    // до завантаження повних списків. compareWith по id забезпечить коректне зіставлення.
    this.taskControl.setValue(
      value.taskId ? { id: value.taskId, value: value.taskValue, withMeans: value.taskWithMeans } : null,
      { emitEvent: false },
    );
    this.areaControl.setValue(
      value.areaId ? { id: value.areaId, value: value.areaValue ?? '' } : null,
      { emitEvent: false },
    );
    this.adjacentUnitsControl.setValue(
      value.adjactedUnitId ? { id: value.adjactedUnitId, value: value.adjactedShortName ?? '' } : null,
      { emitEvent: false },
    );
  }
  get unitTask(): UnitTaskDto {
    return this.unitTaskSignal()!;
  }

  /** Порівняння опцій за полем id (для taskControl та areaControl) */
  protected compareById = (a: LookupDto | null, b: LookupDto | null): boolean =>
    a?.id === b?.id;

  /** Порівняння суміжних підрозділів за id */
  protected compareByUnitId = (a: LookupDto | null, b: LookupDto | null): boolean =>
    a?.id === b?.id;

  /**
   * Завантажує список завдань якщо ще не завантажено.
   * Повертає кешований результат при повторних викликах.
   */
  private ensureUnitTasksLoaded() {
    if (this.unitTasksLoaded) { return of(this.unitTasks()); }
    return this.dictUnitTasksService.getAll().pipe(
      tap((tasks) => {
        this.unitTasks.set(tasks);
        this.unitTasksLoaded = true;
      }),
    );
  }

  /** Обробник відкриття дропдауну «Завдання» — ледаче завантаження довідника */
  onTaskDropdownOpened(opened: boolean): void {
    if (!opened || this.unitTasksLoaded) { return; }
    this.isLoadingTasks.set(true);
    this.ensureUnitTasksLoaded()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.isLoadingTasks.set(false)),
      )
      .subscribe((tasks) => {
        const task = tasks.find((t) => t.id === this.unitTask.taskId);
        if (task) { this.taskControl.setValue(task, { emitEvent: false }); }
      });
  }

  /** Обробник відкриття дропдауну «РВЗ» — ледаче завантаження списку областей */
  onAreaDropdownOpened(opened: boolean): void {
    if (!opened || this.areas().length > 0) { return; }
    const taskId = this.unitTask.taskId;
    if (!taskId) { return; }

    this.ensureUnitTasksLoaded()
      .pipe(takeUntil(this.destroy$))
      .subscribe((tasks) => {
        const task = tasks.find((t) => t.id === taskId);
        if (task?.areaTypeId) {
          this.loadAreasByTask(task.areaTypeId, true);
        }
      });
  }

  /** Обробник відкриття дропдауну «Суміжний підрозділ» — ледаче завантаження */
  onAdjacentUnitsDropdownOpened(opened: boolean): void {
    if (!opened || this.adjacentUnits().length > 0) { return; }
    const unitId = this.unitTask.unitId;
    if (!unitId) { return; }//Вопрос как сбросить старое значение в NUULL при открытии

    this.isLoadingAdjacentUnits.set(true);
    this.unitAreasService
      .getAdjacentLookup(unitId)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.isLoadingAdjacentUnits.set(false)),
      )
      .subscribe({
        next: (units) => {
          this.adjacentUnits.set(units);
          const adjId = this.unitTask.adjactedUnitId;
          if (adjId) {
            const unit = units.find((u) => u.id === adjId);
            if (unit) { this.adjacentUnitsControl.setValue(unit, { emitEvent: false }); }
          }
        },
        error: (error: unknown) => {
          console.error('Помилка завантаження суміжних підрозділів:', error);
          const errorMessage = S5App_ErrorHandler.handleHttpError(
            error,
            'Помилка завантаження суміжних підрозділів',
          );
          this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
        },
      });
  }

  ngAfterViewInit(): void {
    this.soldierDataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Обробник відкриття панелі особового складу (ленива ініціалізація)
   */
  onSoldiersPanelOpened(): void {
    this.soldiersPanelOpened.set(true);
    this.reloadSoldiers();
  }

  /**
   * Завантажує особовий склад підрозділу для завдання
   */
  reloadSoldiers(): void {
    this.isLoadingSoldiers.set(true);
    this.soldierTaskService
      .getByUnitTask(this.unitTask.id)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.isLoadingSoldiers.set(false)),
      )
      .subscribe({
        next: (soldiers: SoldierTaskDto[]) => {
          this.soldiers.set(soldiers);
          this.soldierDataSource.data = soldiers;
          this.soldierDataSource.sort = this.sort;
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
  onMeansPanelOpened(): void {
    // Якщо вже завантажено - не перезавантажуємо
    if (this.means().length > 0) {
      return;
    }

    this.isLoadingMeans.set(true);
    this.droneModelTaskService
      .getByUnitTask(this.unitTask.id)
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
    const unit = this.unitTask;

    const ref = this.dialog.open(ConfirmDialogComponent, {
      width: '360px',
      maxWidth: '95vw',
      autoFocus: false,
      data: {
        title: 'Видалення підрозділу із завдання',
        message: `Ви впевнені, що хочете видалити "${unit.unitShortName}" зі списку?`,
        confirmText: 'Видалити',
        cancelText: 'Відмінити',
        color: 'warn',
        icon: 'warning',
      },
    });

    ref.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.unitTaskService.delete(unit.id).subscribe({
          next: () => {
            this.remove.emit(unit.id);
          },
          error: (error: unknown) => {
            console.error('Помилка в видаленні підрозділу:', error);
            const errorMessage = S5App_ErrorHandler.handleHttpError(
              error,
              'Помилка видалення підрозділу',
            );
            this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
          },
        });
      }
    });
  }

  onTaskChange(task: { id: string; value: string; withMeans: boolean } | null): void {
    if (!task) {
      const updatedUnit: UnitTaskDto = {
        ...this.unitTask,
        taskId: '',
        taskValue: '',
        taskWithMeans: false,
        areaId: '',
        areaValue: '',
        means: [],
      };

      this.means.set([]);
      this.meansDataSource.data = [];
      this.areas.set([]);
      this.areaControl.setValue(null, { emitEvent: false });
      this.adjacentUnits.set([]);
      this.adjacentUnitsControl.setValue(null, { emitEvent: false });
      this.unitTaskSignal.set(updatedUnit);
      this.hasUnsavedChanges.set(true);
      return;
    }

    // При зміні завдання тип РВЗ міг змінитися — скидаємо вибір
    this.areaControl.setValue(null, { emitEvent: false });
    this.areas.set([]);

    // Засоби завжди скидаємо при зміні завдання —
    // будуть перезавантажені при відкритті панелі (loadMeans)
    this.means.set([]);
    this.meansDataSource.data = [];

    const updatedUnit: UnitTaskDto = {
      ...this.unitTask,
      taskId: task.id,
      taskValue: task.value,
      taskWithMeans: task.withMeans,
      areaId: '',    // скидаємо — буде обрано після завантаження нового списку РВЗ
      areaValue: '',
      means: [],
    };

    this.unitTaskSignal.set(updatedUnit);
    this.hasUnsavedChanges.set(true);

    // Завантажуємо РВЗ для обраного завдання безпосередньо, а не ледачно —
    // бо користувач вже відкрив завдання і очікує список РВЗ
    const areaTypeId = this.unitTasks().find((t) => t.id === task.id)?.areaTypeId;
    if (areaTypeId) {
      this.loadAreasByTask(areaTypeId);
    }
  }

  /**
   * Обробник зміни області (РВЗ)
   * Автоматично зберігає на сервері якщо всі обов'язкові поля заповнені
   */
  async onAreaChange(area: LookupDto | null): Promise<void> {
    const updatedUnit: UnitTaskDto = {
      ...this.unitTask,
      areaId: area ? area.id : '',
      areaValue: area ? area.value : '',
    };
    this.unitTaskSignal.set(updatedUnit);

    // Зберігаємо автоматично тільки якщо обидва обов'язкові поля заповнені.
    // hasUnsavedChanges НЕ виставляємо тут — saveUnitTask() сам скине в false при успіху
    // або поверне в true при помилці, щоб кнопка "Зберегти" батька не активувалась даремно.
    if (area && this.unitTask.taskId) {
      const [success, errorMsg] = await this.saveUnitTask();
      if (success) {
        this.snackBar.open('Збережено', 'Закрити', { duration: 2000 });
      } else if (errorMsg) {
        this.snackBar.open(errorMsg, 'Закрити', { duration: 5000 });
      }
    } else {
      // Неможливо зберегти (area = null або taskId не вибрано) — позначаємо як незбережено
      this.hasUnsavedChanges.set(true);
    }

    // Скидаємо суміжні підрозділи — будуть завантажені ледачно при відкритті дропдауну
    this.adjacentUnits.set([]);
    this.adjacentUnitsControl.setValue(null, { emitEvent: false });
  }

  /**
   * Завантажує області по areaTypeId
   * @param areaTypeId - ID типу області
   * @param isInitialization - true якщо це початкова ініціалізація (не емітити зміни)
   */
  private loadAreasByTask(areaTypeId: string, isInitialization: boolean = false): void {
    if (areaTypeId === PPD_AREA_TYPE_GUID) {
      this.handlePpdAreaType(isInitialization);
      return;
    }

    this.loadAreasFromServer(areaTypeId, isInitialization);
  }

  private handlePpdAreaType(isInitialization: boolean): void {
    const persistentLocationId = this.unitTask.persistentLocationId;
    if (!persistentLocationId) {
      this.areas.set([]);
      this.areaControl.setValue(null, { emitEvent: false });
      const errorMessage = 'Для підрозділу не вказано ППД. Спочатку вкажіть ППД підрозділу.';
      console.error(errorMessage);
      this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
      return;
    }

    const persistentArea: DictArea = {
      id: persistentLocationId,
      value: this.unitTask.persistentLocationValue || 'ППД',
      areaTypeId: PPD_AREA_TYPE_GUID,
      areaType: 'ППД',
    };

    this.areas.set([persistentArea]);
    this.areaControl.setValue(persistentArea, { emitEvent: false });

    if (!isInitialization && this.unitTask.areaId !== persistentLocationId) {
      const updatedUnit: UnitTaskDto = {
        ...this.unitTask,
        areaId: persistentLocationId,
        areaValue: this.unitTask.persistentLocationValue || 'ППД',
      };
      this.unitTaskSignal.set(updatedUnit);
    }
  }

  private loadAreasFromServer(areaTypeId: string, isInitialization: boolean): void {
    this.isLoadingAreas.set(true);
    this.dictAreasService
      .getByAreaType(areaTypeId)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.isLoadingAreas.set(false)),
      )
      .subscribe({
        next: (areas) => {
          this.areas.set(areas);
          if (isInitialization) {
            this.applyInitialAreaSelection(areas);
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

  private applyInitialAreaSelection(areas: DictArea[]): void {
    if (!this.unitTask.areaId) {
      return;
    }

    const area = areas.find((a) => a.id === this.unitTask.areaId);
    if (area) {
      this.areaControl.setValue(area, { emitEvent: false });
      return;
    }

    // Якщо areaId не знайдено в отриманому списку - очищуємо локальний стан картки
    const errorMessage = `Область ${this.unitTask.areaValue}\n ${this.unitTask.areaId}
    не знайдена в отриманому переліку.`;
    const updatedUnit: UnitTaskDto = {
      ...this.unitTask,
      areaId: '',
      areaValue: '',
    };
    this.unitTaskSignal.set(updatedUnit);
    this.areaControl.setValue(null, { emitEvent: false });
    this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
    this.hasUnsavedChanges.set(true);
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

    dialogRef.afterClosed().subscribe((selectedDrone: DictDroneModelWithQuantity | undefined) => {
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
          unitTaskId: this.unitTask.id,
          droneModelId: selectedDrone.id,
          droneModelValue: selectedDrone.value,
          droneTypeName: selectedDrone.droneTypeName,
          quantity: selectedDrone.quantity, // ✅ Використовуємо кількість з діалогу
        };

        const updatedMeans = [...this.means(), newMean];
        this.means.set(updatedMeans);
        this.meansDataSource.data = updatedMeans;

        this.hasUnsavedChanges.set(true);
      }
    });
  }

  /**
   * Перевіряє чи редагується конкретне поле засобу
   */
  isEditingMean(meanId: string, field: 'quantity'): boolean {
    return this.editingMeanId() === meanId && this.editingMeanField() === field;
  }

  /**
   * Починає редагування поля засобу
   */
  startEditingMean(mean: DroneModelTaskDto, field: 'quantity', event: Event): void {
    event.stopPropagation();
    if (this.isSavingMeans()) {
      return;
    }

    // Використовуємо droneModelId як унікальний ідентифікатор для локально доданих засобів
    const meanId = mean.id || mean.droneModelId;
    this.editingMeanId.set(meanId);
    this.editingMeanField.set(field);
    this.editingMeanValue.set(mean.quantity);
  }

  /**
   * Скасовує редагування
   */
  cancelEditingMean(event: Event): void {
    event.stopPropagation();
    this.editingMeanId.set(null);
    this.editingMeanField.set(null);
    this.editingMeanValue.set(undefined);
  }

  /**
   * Зберігає зміни поля засобу
   */
  async saveMeanFieldChange(mean: DroneModelTaskDto, field: 'quantity', event: Event): Promise<void> {
    event.stopPropagation();
    if (this.isSavingMeans()) {
      return;
    }

    const newValue = this.editingMeanValue();
    if (newValue === undefined || newValue <= 0) {
      this.snackBar.open('Кількість має бути більше 0', 'Закрити', { duration: 3000 });
      return;
    }

    // Оновлюємо локальне значення
    const updatedMeans = this.means().map((m) => {
      const mId = m.id || m.droneModelId;
      const meanId = mean.id || mean.droneModelId;
      if (mId === meanId) {
        return { ...m, quantity: newValue };
      }
      return m;
    });

    this.means.set(updatedMeans);
    this.meansDataSource.data = updatedMeans;

    const updatedUnit = {
      ...this.unitTask,
      means: updatedMeans,
    };
    this.unitTaskSignal.set(updatedUnit);
    this.hasUnsavedChanges.set(true);

    try {
      await this.saveAndReloadMeans(this.unitTask.id);
    } catch {
      return;
    }

    // Скидаємо стан редагування
    this.cancelEditingMean(event);
  }

  /**
   * Оновлює значення при редагуванні
   */
  updateEditingMeanValue(value: number): void {
    this.editingMeanValue.set(value);
  }

  /**
   * Видаляє засіб зі списку
   */
  async deleteMean(mean: DroneModelTaskDto): Promise<void> {
    if (this.isSavingMeans()) {
      return;
    }

    const updatedMeans = this.means().filter((m) =>
      m.id ? m.id !== mean.id : m.droneModelId !== mean.droneModelId,
    );
    this.means.set(updatedMeans);
    this.meansDataSource.data = updatedMeans;

    this.hasUnsavedChanges.set(true);

    await this.saveAndReloadMeans(this.unitTask.id);
  }

  /**
   * Зберігає UnitTask + його засоби (means)
   * Викликається з батьківського компонента при загальному збереженні
   */
  async saveUnitTask(): Promise<[boolean, string]> {
    // Перевіряємо обов'язкові поля перед збереженням
    if (!this.unitTask.taskId) {
      const msg = `Підрозділ "${this.unitTask.unitShortName}": заповніть завдання`;
      return [false, msg];
    }

    if (!this.unitTask.areaId) {
      const msg = `Підрозділ "${this.unitTask.unitShortName}": заповніть район виконання завдань (РВЗ)`;
      return [false, msg];
    }
    
    this.isSaving.set(true);

    try {
      await firstValueFrom(this.unitTaskService.update(this.unitTask.id, this.unitTask));
      await this.saveAndReloadMeans(this.unitTask.id);
      this.hasUnsavedChanges.set(false);

      return [true, ''];
    } catch (error) {
      this.hasUnsavedChanges.set(true);
      console.error('Помилка збереження UnitTask:', error);
      const errorMessage = S5App_ErrorHandler.handleHttpError(
        error,
        `Помилка збереження підрозділу "${this.unitTask.unitShortName}"`,
      );
      return [false, errorMessage];
    } finally {
      this.isSaving.set(false);
    }
  }

  /** Зберігаємо засоби */
  private async saveAndReloadMeans(unitTaskId: string): Promise<void> {
    this.isSavingMeans.set(true);
    try {
      // 2. Зберігаємо засоби через bulkSave
      const meansToSave = this.means().map((mean) => ({
        unitTaskId,
        droneModelId: mean.droneModelId,
        quantity: mean.quantity,
      }));

      await firstValueFrom(this.droneModelTaskService.bulkSave(unitTaskId, meansToSave));

      // Перезавантажуємо засоби з сервера (щоб отримати droneTypeName та інші поля)
      const savedMeans = await firstValueFrom(this.droneModelTaskService.getByUnitTask(unitTaskId));
      this.means.set(savedMeans);
      this.meansDataSource.data = savedMeans;
    } catch (error) {
      console.error('Помилка збереження засобів:', error);
      const errorMessage = S5App_ErrorHandler.handleHttpError(error, 'Помилка збереження засобів');
      this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
      throw error;
    } finally {
      this.isSavingMeans.set(false);
    }
  }

  /**
   * Публікує/знімає з публікації UnitTask.
   * Повертає [true, ''] при успіху або [false, errorMsg] при помилці.
   * Викликається з батьківського компонента або з onPublishStatusChange.
   */
  async publishUnitTask(isPublished: boolean): Promise<[boolean, string]> {
    const currentUnitTask = this.unitTask;
    if (currentUnitTask.isPublished === isPublished) {
      return [true, ''];
    }

    this.isSaving.set(true);
    try {
      await firstValueFrom(this.unitTaskService.publish(currentUnitTask.id, isPublished));

      const updatedUnitTask: UnitTaskDto = {
        ...currentUnitTask,
        isPublished,
        publishedAtUtc: isPublished ? new Date().toISOString() : undefined,
      };
      this.unitTaskSignal.set(updatedUnitTask);
      this.publishStatusControl.setValue(isPublished, { emitEvent: false });

      if (isPublished) {
        this.taskControl.disable();
        this.areaControl.disable();
        this.adjacentUnitsControl.disable();
      } else {
        this.taskControl.enable();
        this.areaControl.enable();
        this.adjacentUnitsControl.enable();
      }

      return [true, ''];
    } catch (error) {
      console.error('Error changing publish status:', error);
      const errorMessage = S5App_ErrorHandler.handleHttpError(
        error,
        `Помилка зміни статусу публікації підрозділу "${currentUnitTask.unitShortName}"`,
      );
      return [false, errorMessage];
    } finally {
      this.isSaving.set(false);
    }
  }

  /**
   * Обробник зміни статусу публікації (викликається з шаблону)
   */
  async onPublishStatusChange(isPublished: boolean): Promise<void> {
    // Якщо є незбережені зміни — спочатку зберігаємо
    if (this.hasUnsavedChanges()) {
      const [saved, errorMsg] = await this.saveUnitTask();
      if (!saved) {
        this.snackBar.open(errorMsg || 'Помилка збереження', 'Закрити', { duration: 5000 });
        this.publishStatusControl.setValue(this.unitTask.isPublished, { emitEvent: false });
        return;
      }
    }

    // Превентивно скидаємо контрол до поточного стану — publishUnitTask оновить при успіху
    this.publishStatusControl.setValue(this.unitTask.isPublished, { emitEvent: false });

    const [success, errorMsg] = await this.publishUnitTask(isPublished);
    if (success) {
      const statusText = this.getStatusLabel(isPublished);
      this.snackBar.open(
        `Завдання підрозділу "${this.unitTask.unitShortName}" ${statusText}`,
        'Закрити',
        { duration: 3000 },
      );
    } else {
      this.publishStatusControl.setValue(this.unitTask.isPublished, { emitEvent: false });
      this.snackBar.open(errorMsg, 'Закрити', { duration: 5000 });
    }
  }

  /**
   * Оновлює інформацію про суміжні підрозділи
   */
  async updateAdjacentUnits(unit: LookupDto | null): Promise<boolean> {
    const updatedUnit: UnitTaskDto = {
      ...this.unitTask,
      adjactedUnitId: unit?.id ?? undefined,
      adjactedShortName: unit?.value ?? undefined,
    };
    this.unitTaskSignal.set(updatedUnit);

    const [success, errorMsg] = await this.saveUnitTask();
    if (success) {
      this.snackBar.open('Збережено', 'Закрити', { duration: 2000 });
    } else if (errorMsg) {
      this.snackBar.open(errorMsg, 'Закрити', { duration: 5000 });
    }
    return success;
  }

  /** Обробник зміни підрозділу
   * (викликається з LookUp-List)
   * */
  async onAdjacentUnitChange(unit: LookupDto | null): Promise<void> {
    await this.updateAdjacentUnits(unit);
  }

  /** Обробник вибору підрозділу
   * (викликається за кнопкою "Додати підрозділ")
   * */
  async adjacentUnitSelect(): Promise<void> {
    const dialogRef = this.dialog.open(UnitSelectDialogComponent, {
      width: '900px',
      maxHeight: '90vh',
      data: { title: 'Вибір підрозділу' },
    });

    dialogRef.afterClosed().subscribe(async (unit: UnitDto | undefined) => {
      if (unit) {
        const adjUnit: LookupDto = { id: unit.id, value: unit.shortName || unit.name };
        await this.updateAdjacentUnits(adjUnit);
      }
    });
  }

  /**
   * Отримує читабельну назву статусу публікації
   */
  getStatusLabel(isPublished: boolean): string {
    return DocTemplateUtils.getStatusLabel(isPublished);
  }

  getSoldierFIO(soldier: SoldierTaskDto): string {
    return SoldierUtils.formatFIO(soldier.firstName, soldier.midleName, soldier.lastName);
  }
/** Отримати назву підрозділу відносно
 * основного підрозділу солдата Приданий/Залучений/Відряджений */
  unitTagTitle(soldier: SoldierTaskDto): string {
    return SoldierUtils.getUnitTagLabel(
      SoldierUtils.getUnitTag(soldier, this.unitTask.unitId || ''),
    );
  }

/** Отримати кольоровий статус підрозділу відносно
 * основного підрозділу солдата Приданий/Залучений/Відряджений */
  getRowClass(soldier: SoldierTaskDto): string {
    return SoldierUtils.getRowClass(soldier, this.unitTask.unitId || '');
  }
}
