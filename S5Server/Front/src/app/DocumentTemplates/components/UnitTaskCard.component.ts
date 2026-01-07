import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, inject } from '@angular/core';
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
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UnitTaskDto } from '../models/template-dataset.models';
import { LookupDto } from '../../shared/models/lookup.models';
import { DictDroneModelService } from '../../../ServerService/dictDroneModel.service';
import {
  isCriticalStatus,
  isSevereStatus,
  isProblematicStatus,
  isRecoveryStatus,
} from '../../Soldier/Soldier.constant';
import { SoldiersComponent, UnitTag } from '../../Soldier/Soldier.component';
import { SoldierService, SoldierDto } from '../../Soldier/services/soldier.service';
import { ErrorHandler } from '../../shared/models/ErrorHandler';

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
    MatTooltipModule,
    SoldiersComponent,
  ],
  templateUrl: './UnitTaskCard.component.html',
  styleUrls: ['./UnitTaskCard.component.scss'],
})
export class UnitTaskCardComponent implements OnInit, OnDestroy {
  private soldierService = inject(SoldierService);
  private dictDroneModelService = inject(DictDroneModelService);
  private snackBar = inject(MatSnackBar);
  private destroy$ = new Subject<void>();

  @Input({ required: true }) unitTask!: UnitTaskDto;
  @Output() remove = new EventEmitter<string>();
  @Output() unitChange = new EventEmitter<UnitTaskDto>();

  // Form Controls
  protected taskControl = new FormControl<string | null>(null);
  protected areaControl = new FormControl<string | null>(null);
  protected droneModelControl = new FormControl<LookupDto | string | null>(null);

  // Drone Model Autocomplete
  protected filteredDroneModels$!: Observable<LookupDto[]>;
  protected isLoadingDroneModels = false;

  // Table Configuration
  /*
  protected soldiersDisplayedColumns = [
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
  */

  // Status check methods
  isCriticalStatus = isCriticalStatus;
  isSevereStatus = isSevereStatus;
  isProblematicStatus = isProblematicStatus;
  isRecoveryStatus = isRecoveryStatus;
  // UnitTag enum for SoldierComponent
  unitTag = UnitTag;

  ngOnInit(): void {
    // Ініціалізуємо значення FormControl з unit
    if (this.unitTask.TaskValue) {
      this.taskControl.setValue(this.unitTask.TaskValue);
    }
    if (this.unitTask.AreaValue) {
      this.areaControl.setValue(this.unitTask.AreaValue);
    }
    if (this.unitTask.Means && this.unitTask.Means.length > 0) {
      const droneModel: LookupDto = { id: '', value: this.unitTask.Means[0] };
      this.droneModelControl.setValue(droneModel);
    }

    // Підписуємося на зміни task
    this.taskControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => this.onTaskChange(value));

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
  private onTaskChange(taskValue: string | null): void {
    const updatedUnit = { ...this.unitTask, TaskValue: taskValue || '' };
    this.unitChange.emit(updatedUnit);
  }

  /**
   * Обробник зміни зони (РСП)
   */
  private onAreaChange(areaValue: string | null): void {
    const updatedUnit = { ...this.unitTask, AreaValue: areaValue || '' };
    this.unitChange.emit(updatedUnit);
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
          })
        );
      }),
      takeUntil(this.destroy$)
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

  /**
   * Перевірка дати прибуття (більше 14 днів тому)
   */
  isArrivedMoreThan14DaysAgo(arrivedAt: Date): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const arrived = new Date(arrivedAt);
    arrived.setHours(0, 0, 0, 0);

    const fourteenDaysAgo = new Date(today);
    fourteenDaysAgo.setDate(today.getDate() - 1);

    return arrived >= fourteenDaysAgo;
  }

  // Публічні методи для перезавантаження даних (викликаються з дочірнього компонента)
  reloadSoldiers(): void {
    if (this.unitTask.id) {
      this.soldierService.getAll(undefined, this.unitTask.id).subscribe({
        next: (data: SoldierDto[]) => (this.unitTask.soldiers = data),
        error: (error) => {
          console.error('Помилка завантаження особового складу:', error);
          const errorMessage = ErrorHandler.handleHttpError(
            error,
            'Помилка завантаження особового складу'
          );
          this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
        },
      });
    }
  }

  reloadAssignedSoldiers(): void {
    if (this.unitTask.id) {
      this.soldierService.getByAssigned(this.unitTask.id).subscribe({
        next: (data: SoldierDto[]) => (this.unitTask.assignedSoldiers = data),
        error: (error) => {
          console.error('Помилка завантаження приданих:', error);
          const errorMessage = ErrorHandler.handleHttpError(
            error,
            'Помилка завантаження приданих військовослужбовців'
          );
          this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
        },
      });
    }
  }

  reloadInvolvedSoldiers(): void {
    if (this.unitTask.id) {
      this.soldierService.getByInvolved(this.unitTask.id).subscribe({
        next: (data: SoldierDto[]) => (this.unitTask.involvedSoldiers = data),
        error: (error) => {
          console.error('Помилка завантаження оперативних:', error);
          const errorMessage = ErrorHandler.handleHttpError(
            error,
            'Помилка завантаження оперативних військовослужбовців'
          );
          this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
        },
      });
    }
  }
}
