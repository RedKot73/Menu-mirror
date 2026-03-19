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
  signal,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Subject, firstValueFrom } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

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

import {
  UnitTaskDto,
  UnitTaskCreateDto,
  DroneModelTaskDto,
} from '../../DocumentTemplates/models/template-dataset.models';
import { DictUnitTasksService, DictUnitTask } from '../../../ServerService/dictUnitTasks.service';
import { DictAreasService, DictArea } from '../../../ServerService/dictAreas.service';
import { DroneModelTaskService } from '../../../ServerService/drone-model-task.service';
import { UnitTaskService } from '../../../ServerService/unit-task.service';
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
import { PPD_AREA_TYPE_GUID } from '../../Unit/unit.constants';
import { ConfirmDialogComponent } from '../../dialogs/ConfirmDialog.component';

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
export class OneUnitTaskEditor implements OnInit, OnDestroy, AfterViewInit {
  private dictUnitTasksService = inject(DictUnitTasksService);
  private dictAreasService = inject(DictAreasService);
  private droneModelTaskService = inject(DroneModelTaskService);
  private unitTaskService = inject(UnitTaskService);
  private soldierTaskService = inject(SoldierTaskService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);
  private destroy$ = new Subject<void>();

  @Output() remove = new EventEmitter<string>();
  @Output() unitChange = new EventEmitter<UnitTaskDto>();
  /** Еміт події при зміні стану незбережених змін */
  @Output() unsavedChangesChange = new EventEmitter<boolean>();

  // Сигнал для реактивного відстеження змін unitTask
  private unitTaskSignal = signal<UnitTaskDto | null>(null);

  // Перелік завдань з довідника
  protected unitTasks = signal<DictUnitTask[]>([]);
  // Перелік областей (РВЗ)
  protected areas = signal<DictArea[]>([]);

  // Дані особового складу (замінено на SoldierTaskDto)
  soldiers = signal<SoldierTaskDto[]>([]);
  soldierDataSource = new MatTableDataSource<SoldierTaskDto>([]);
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
  //  soldierCount = signal<number>(0);
  isLoadingSoldiers = signal<boolean>(false);
  soldiersPanelOpened = signal(false);

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
  }, { allowSignalWrites: true });
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

  @ViewChild(MatSort) sort!: MatSort;

  @Input({ required: true })
  set unitTask(value: UnitTaskDto) {
    this.unitTaskSignal.set(value);
    this.publishStatusControl.setValue(value.isPublished, { emitEvent: false });
  }
  get unitTask(): UnitTaskDto {
    return this.unitTaskSignal()!;
  }

  // Form Controls
  protected taskControl = new FormControl<DictUnitTask | null>(null);
  protected areaControl = new FormControl<DictArea | null>(null);

  ngOnInit(): void {
    // Завантажуємо повний список завдань (з areaTypeId)
    this.dictUnitTasksService.getAll().subscribe({
      next: (tasks) => {
        this.unitTasks.set(tasks);
        // Ініціалізуємо контроли після завантаження довідника
        this.initializeControls();
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
  }

  /**
   * Ініціалізує контроли значеннями з unitTask (без емітів подій)
   */
  private initializeControls(): void {
    const unitTask = this.unitTask;
    const tasks = this.unitTasks();

    // Ініціалізуємо taskControl якщо завдання вже обрано
    if (unitTask.taskId && tasks.length > 0) {
      const task = tasks.find((t) => t.id === unitTask.taskId);
      if (task) {
        this.taskControl.setValue(task, { emitEvent: false });

        // Завантажуємо області для обраного завдання (без емітів)
        // areaControl буде встановлено в loadAreasByTask після завантаження областей
        if (task.areaTypeId) {
          this.loadAreasByTask(task.areaTypeId, true);
        }
      }
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
    const unitTaskId = this.unitTask.id;

    if (!unitTaskId) {
      const unitId = this.unitTask.unitId;
      // Якщо завдання ще не збережено - завантажуємо актуальний склад підрозділу
      if (!unitId) {
        this.snackBar.open('Не вказано підрозділ', 'Закрити', { duration: 3000 });
        return;
      }

      this.isLoadingSoldiers.set(true);
      this.soldierTaskService
        .getByUnit(unitId)
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
            console.error('Помилка завантаження особового складу підрозділу:', error);
            const errorMessage = S5App_ErrorHandler.handleHttpError(
              error,
              'Помилка завантаження особового складу підрозділу',
            );
            this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
          },
        });
      return;
    }

    // Якщо завдання збережено - завантажуємоSnapshot
    this.isLoadingSoldiers.set(true);
    this.soldierTaskService
      .getByUnitTask(unitTaskId)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.isLoadingSoldiers.set(false)),
      )
      .subscribe({
        next: (soldiers: SoldierTaskDto[]) => {
          this.soldiers.set(soldiers);
          this.soldierDataSource.data = soldiers;
          this.soldierDataSource.sort = this.sort;
          //this.soldierCount.set(soldiers.length);
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
        if(!unit.id) {
          this.remove.emit(unit.id);
          return;
        }
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

  /**
   * Обробник зміни завдання
   */
  onTaskChange(task: DictUnitTask | null): void {
    if (!task) {
      const updatedUnit: UnitTaskDto = {
        ...this.unitTask,
        taskId: '',
        taskValue: '',
        areaId: '',
        areaValue: '',
        means: [],
      };

      this.means.set([]);
      this.meansDataSource.data = [];
      this.areas.set([]);
      this.unitTaskSignal.set(updatedUnit);
      this.unitChange.emit(updatedUnit);
      this.hasUnsavedChanges.set(true);
      return;
    }

    let updatedUnit: UnitTaskDto = {
      ...this.unitTask,
      taskId: task.id,
      taskValue: task.value,
    };

    // ✅ Перевіряємо чи потрібні засоби для цього завдання
    if (!task.withMeans) {
      // Якщо засоби не використовуються - очищуємо список
      this.means.set([]);
      this.meansDataSource.data = [];
      updatedUnit = {
        ...updatedUnit,
        means: [],
      };
    }

    this.unitTaskSignal.set(updatedUnit);
    this.unitChange.emit(updatedUnit);
    this.hasUnsavedChanges.set(true);

    // Завантажуємо області для обраного завдання (використовуємо areaTypeId з кешованого об'єкта)
    if (task.areaTypeId) {
      this.loadAreasByTask(task.areaTypeId);
    }
  }

  /**
   * Обробник зміни області (РВЗ)
   */
  onAreaChange(area: DictArea | null): void {
    const updatedUnit: UnitTaskDto = {
      ...this.unitTask,
      areaId: area ? area.id : '',
      areaValue: area ? area.value : '',
    };
    this.unitTaskSignal.set(updatedUnit);
    this.unitChange.emit(updatedUnit);
    this.hasUnsavedChanges.set(true);
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
      this.unitChange.emit(updatedUnit);
    }
  }

  private loadAreasFromServer(areaTypeId: string, isInitialization: boolean): void {
    this.dictAreasService
      .getByAreaType(areaTypeId)
      .pipe(takeUntil(this.destroy$))
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
          unitTaskId: this.unitTask.id || '',
          droneModelId: selectedDrone.id,
          droneModelValue: selectedDrone.value,
          droneTypeName: selectedDrone.droneTypeName,
          quantity: selectedDrone.quantity, // ✅ Використовуємо кількість з діалогу
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

    // Синхронізуємо з батьківським компонентом
    const updatedUnit = {
      ...this.unitTask,
      means: updatedMeans,
    };
    this.unitTaskSignal.set(updatedUnit);
    this.unitChange.emit(updatedUnit);
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

    // Синхронізуємо з батьківським компонентом
    const updatedUnit = {
      ...this.unitTask,
      meansCount: updatedMeans.length,
      means: updatedMeans,
    };
    this.unitChange.emit(updatedUnit);
    this.hasUnsavedChanges.set(true);

    try {
      await this.saveAndReloadMeans(this.unitTask.id);
    } catch {
      return;
    }
  }

  /**
   * Зберігає UnitTask + його засоби (means)
   * Викликається з батьківського компонента при загальному збереженні
   */
  async saveUnitTask(dataSetId: string): Promise<[boolean, string]> {
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
        // Оновлюємо ID
        this.unitTaskSignal.set({...this.unitTask, id: result.id})

        // Синхронізуємо ID з батьківським компонентом
        this.unitChange.emit({ ...this.unitTask, id: result.id });
      }

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

  private async saveAndReloadMeans(unitTaskId: string): Promise<void> {
    if (!unitTaskId) {
      return;
    }

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
    if (!currentUnitTask.id) {
      return [false, `Підрозділ "${currentUnitTask.unitShortName}": завдання не збережено`];
    }

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
      const [saved, errorMsg] = await this.saveUnitTask(this.unitTask.dataSetId ?? '');
      if (!saved) {
        this.snackBar.open(errorMsg || 'Помилка збереження', 'Закрити', { duration: 5000 });
        this.publishStatusControl.setValue(this.unitTask.isPublished, { emitEvent: false });
        return;
      }
    }

    if (!this.unitTask.id) {
      this.publishStatusControl.setValue(this.unitTask.isPublished, { emitEvent: false });
      this.snackBar.open('Неможливо змінити статус: завдання не збережено', 'Закрити', {
        duration: 3000,
      });
      return;
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
   * Отримує читабельну назву статусу публікації
   */
  getStatusLabel(isPublished: boolean): string {
    return DocTemplateUtils.getStatusLabel(isPublished);
  }

  getSoldierFIO(soldier: SoldierTaskDto): string {
    return SoldierUtils.formatFIO(soldier.firstName, soldier.midleName, soldier.lastName);
  }

  unitTagTitle(soldier: SoldierTaskDto): string {
    return SoldierUtils.getUnitTagLabel(
      SoldierUtils.getUnitTag(soldier, this.unitTask.unitId || ''),
    );
  }

  getRowClass(soldier: SoldierTaskDto): string {
    return SoldierUtils.getRowClass(soldier, this.unitTask.unitId || '');
  }
}
