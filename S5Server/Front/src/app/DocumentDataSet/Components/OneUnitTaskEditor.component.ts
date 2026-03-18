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
  isLoadingMeans = signal<boolean>(false);

  // Стан збереження (для індикації процесу)
  isSaving = signal<boolean>(false);
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

    // Ініціалізуємо локально додані засоби (якщо є)
    if (this.unitTask.means && this.unitTask.means.length > 0) {
      this.means.set(this.unitTask.means);
      this.meansDataSource.data = this.unitTask.means;
    }
  }

  /**
   * Ініціалізує контроли значеннями з unitTask (без емітів подій)
   */
  private initializeControls(): void {
    const unitTask = this.unitTask;
    const tasks = this.unitTasks();

    // Ініціалізуємо засоби
    if (unitTask.means && unitTask.means.length > 0) {
      this.means.set(unitTask.means);
      this.meansDataSource.data = unitTask.means;
    }

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
            //this.soldierCount.set(soldiers.length);
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
      this.unitTaskSignal.set(updatedUnit);
      this.unitChange.emit(updatedUnit);
      this.areas.set([]);

      // ✅ Очищуємо засоби при скиданні завдання
      this.means.set([]);
      this.meansDataSource.data = [];
      return;
    }

    const updatedUnit: UnitTaskDto = {
      ...this.unitTask,
      taskId: task.id,
      taskValue: task.value,
    };
    this.unitTaskSignal.set(updatedUnit);
    this.unitChange.emit(updatedUnit);

    // ✅ Перевіряємо чи потрібні засоби для цього завдання
    if (!task.withMeans) {
      // Якщо засоби не використовуються - очищуємо список
      this.means.set([]);
      this.meansDataSource.data = [];
      const updatedUnitWithoutMeans = {
        ...updatedUnit,
        meansCount: 0,
        means: [],
      };
      this.unitChange.emit(updatedUnitWithoutMeans);
    }

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
  }

  /**
   * Завантажує області по areaTypeId
   * @param areaTypeId - ID типу області
   * @param isInitialization - true якщо це початкова ініціалізація (не емітити зміни)
   */
  private loadAreasByTask(areaTypeId: string, isInitialization: boolean = false): void {
    // Якщо це завдання типу ППД - використовуємо persistentLocationId як РВЗ
    if (areaTypeId === PPD_AREA_TYPE_GUID) {
      // Для ППД РВЗ береться з persistentLocationId підрозділу
      if (this.unitTask.persistentLocationId) {
        // Створюємо "віртуальний" DictArea об'єкт з persistentLocation
        const persistentArea: DictArea = {
          id: this.unitTask.persistentLocationId,
          value: this.unitTask.persistentLocationValue || 'ППД',
          areaTypeId: PPD_AREA_TYPE_GUID,
          areaType: 'ППД',
        };

        this.areas.set([persistentArea]);
        this.areaControl.setValue(persistentArea, { emitEvent: false });

        // Оновлюємо unitTask з persistentLocationId як areaId, тільки якщо НЕ ініціалізація
        if (!isInitialization && this.unitTask.areaId !== this.unitTask.persistentLocationId) {
          const updatedUnit: UnitTaskDto = {
            ...this.unitTask,
            areaId: this.unitTask.persistentLocationId,
            areaValue: this.unitTask.persistentLocationValue || 'ППД',
          };
          this.unitTaskSignal.set(updatedUnit);
          this.unitChange.emit(updatedUnit);
        }
      } else {
        // Якщо persistentLocationId відсутній - очищуємо
        this.areas.set([]);
        this.areaControl.setValue(null, { emitEvent: false });
        const errorMessage = 'Для підрозділу не вказано ППД. Спочатку вкажіть ППД підрозділу.';
        console.error(errorMessage);
        this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
      }
      return;
    }

    // Для інших типів завдань - завантажуємо області з сервера
    this.dictAreasService
      .getByAreaType(areaTypeId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (areas) => {
          this.areas.set(areas);

          // Якщо це ініціалізація і areaId вже встановлений - встановлюємо areaControl
          if (isInitialization && this.unitTask.areaId) {
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
  saveMeanFieldChange(mean: DroneModelTaskDto, field: 'quantity', event: Event): void {
    event.stopPropagation();

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

      // 3. Перезавантажуємо засоби з сервера (щоб отримати droneTypeName та інші поля)
      const savedMeans = await firstValueFrom(
        this.droneModelTaskService.getByUnitTask(this.unitTask.id),
      );
      this.means.set(savedMeans);
      this.meansDataSource.data = savedMeans;

      return true;
    } catch (error) {
      console.error('Помилка збереження UnitTask:', error);
      const errorMessage = S5App_ErrorHandler.handleHttpError(
        error,
        `Помилка збереження підрозділу "${this.unitTask.unitShortName}"`,
      );
      this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
      return false;
    } finally {
      this.isSaving.set(false);
    }
  }

  /**
   * Обробник зміни статусу публікації
   */
  onPublishStatusChange(isPublished: boolean): void {
    const currentUnitTask = this.unitTask;
    if (!currentUnitTask || !currentUnitTask.id) {
      this.publishStatusControl.setValue(currentUnitTask?.isPublished ?? false, {
        emitEvent: false,
      });
      this.snackBar.open('Неможливо змінити статус: завдання ще не збережено', 'Закрити', {
        duration: 3000,
      });
      return;
    }

    // Перевіряємо чи статус дійсно змінився
    if (currentUnitTask.isPublished === isPublished) {
      return;
    }

    this.publishStatusControl.setValue(currentUnitTask.isPublished, { emitEvent: false });
    this.isSaving.set(true);

    this.unitTaskService.publish(currentUnitTask.id, isPublished).subscribe({
      next: () => {
        this.isSaving.set(false);

        // Оновлюємо локальний unitTask з новим статусом
        const updatedUnitTask: UnitTaskDto = {
          ...currentUnitTask,
          isPublished: isPublished,
          publishedAtUtc: isPublished ? new Date().toISOString() : undefined,
        };

        // Оновлюємо внутрішній signal
        this.unitTaskSignal.set(updatedUnitTask);
        this.publishStatusControl.setValue(isPublished, { emitEvent: false });

        // ✅ Сповіщаємо батьківський компонент про зміну
        //this.unitChange.emit(updatedUnitTask);

        const statusText = isPublished ? 'опубліковано' : 'знято з публікації';
        this.snackBar.open(
          `Завдання підрозділу "${currentUnitTask.unitShortName}" ${statusText}`,
          'Закрити',
          { duration: 3000 },
        );
      },
      error: (error) => {
        this.isSaving.set(false);
        this.publishStatusControl.setValue(currentUnitTask.isPublished, { emitEvent: false });
        console.error('Error changing publish status:', error);
        const errorMessage = S5App_ErrorHandler.handleHttpError(
          error,
          'Помилка зміни статусу публікації',
        );
        this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
      },
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

  unitTagTitle(soldier: SoldierTaskDto): string {
    return SoldierUtils.getUnitTagLabel(
      SoldierUtils.getUnitTag(soldier, this.unitTask.unitId || ''),
    );
  }

  getRowClass(soldier: SoldierTaskDto): string {
    return SoldierUtils.getRowClass(soldier, this.unitTask.unitId || '');
  }
}
