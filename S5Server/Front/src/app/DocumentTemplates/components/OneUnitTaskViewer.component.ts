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
import { Subject/*, firstValueFrom*/ } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
//import { MatDialog } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { DatePipe } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

import {
  UnitTaskDto,
//  UnitTaskCreateDto,
  DroneModelTaskDto,
} from '../../DocumentDataSet/models/template-dataset.models';
import { DictUnitTasksService, DictUnitTask } from '../../../ServerService/dictUnitTasks.service';
import { DictAreasService, DictArea } from '../../../ServerService/dictAreas.service';
import { DroneModelTaskService } from '../../../ServerService/drone-model-task.service';
/*
import { UnitTaskService } from '../../../ServerService/unit-task.service';
import {
  DictDroneModelSelectDialogComponent,
  DictDroneModelWithQuantity,
} from '../../dialogs/DictDroneModelSelect-dialog.component';
*/
import {
  SoldierTaskService,
  SoldierTaskDto,
//  SoldierCountDto,
} from '../../../ServerService/soldierTask.service';
import { SoldierUtils } from '../../Soldier/soldier.utils';
import { DocTemplateUtils } from '../../DocumentTemplates/models/shared.models';
import { S5App_ErrorHandler } from '../../shared/models/ErrorHandler';
import { PPD_AREA_TYPE_GUID } from '../../Unit/unit.constants';

@Component({
  selector: 'app-one-unit-task-viewer',
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
  templateUrl: 'OneUnitTaskViewer.component.html',
  styleUrls: [
    './OneUnitTaskViewer.component.scss',
    '../../Unit/UnitContent.component.scss',
    '../../Soldier/Soldier.component.scss',
  ],
})
export class OneUnitTaskViewer implements OnInit, OnDestroy, AfterViewInit {
  private dictUnitTasksService = inject(DictUnitTasksService);
  private dictAreasService = inject(DictAreasService);
  private droneModelTaskService = inject(DroneModelTaskService);
//  private unitTaskService = inject(UnitTaskService);
  private soldierTaskService = inject(SoldierTaskService);
  private snackBar = inject(MatSnackBar);
//  private dialog = inject(MatDialog);
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
  // soldierCount = signal<number>(0);
  isLoadingSoldiers = signal<boolean>(false);
  soldiersPanelOpened = signal(false);

  // Дані засобів (Master-Detail)
  means = signal<DroneModelTaskDto[]>([]);
  meansDataSource = new MatTableDataSource<DroneModelTaskDto>([]);
  meansDisplayedColumns: string[] = ['droneModelValue', 'droneTypeName', 'quantity'];
  isLoadingMeans = signal<boolean>(false);

  // Стан збереження (для індикації процесу)
  isSaving = signal<boolean>(false);

  // Стан редагування засобів
  editingMeanId = signal<string | null>(null);
  editingMeanField = signal<'quantity' | null>(null);
  editingMeanValue = signal<number | undefined>(undefined);

  @ViewChild(MatSort) sort!: MatSort;

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
/*
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
*/
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
   * Завантажує кількість бійців для завдання
   */
  /*
  loadSoldierCount(): void {
    const unitTaskId = this.unitTask.id;
    if (!unitTaskId) {
      return;
    }

    this.soldierTaskService
      .getCount(unitTaskId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: SoldierCountDto) => {
          this.soldierCount.set(data.count);
        },
        error: (error: unknown) => {
          console.error('Помилка завантаження кількості бійців:', error);
        },
      });
  }
  */

  /**
   * Завантажує засоби (дрони) для завдання підрозділу (Master-Detail)
   */
  loadMeans(): void {
    const unitTaskId = this.unitTask.id;
    /*
    if (!unitTaskId) {
      // UnitTask ще не збережено - показуємо локально додані засоби
      if (this.unitTask.means && this.unitTask.means.length > 0) {
        this.means.set(this.unitTask.means);
        this.meansDataSource.data = this.unitTask.means;
      }
      return;
    }
    */

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
