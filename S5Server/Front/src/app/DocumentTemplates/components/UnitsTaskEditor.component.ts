import { inject, signal, HostListener } from '@angular/core';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { debounceTime, distinctUntilChanged, switchMap, startWith, finalize } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatDatepickerModule, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';

import { UnitService } from '../../Unit/services/unit.service';
import {
  DocumentDataSet,
  TemplateDataSetCreateDto,
  TemplateDataSetUpdateDto,
} from '../models/template-dataset.models';
import { TemplateDataSetService } from '../services/template-dataset.service';
import { JsonEditorDialogComponent } from '../components/JsonEditorDialog.component';
import { ErrorHandler } from '../../shared/models/ErrorHandler';
import { DictDroneModelService } from '../../../ServerService/dictDroneModel.service';
import { LookupDto } from '../../shared/models/lookup.models';
import { UnitDataSetDto } from '../../Unit/services/unit.service';
import { TemplateDataSetListItem } from '../models/template-dataset.models';
import { DocTemplateUtils } from '../models/shared.models';
import {
  isCriticalStatus,
  isSevereStatus,
  isProblematicStatus,
  isRecoveryStatus,
} from '../../Soldier/Soldier.constant';

@Component({
  selector: 'app-units-task-editor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatIconModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatSelectModule,
    MatExpansionModule,
    MatTableModule,
    MatSortModule,
    MatTooltipModule,
  ],
  templateUrl: './UnitsTaskEditor.component.html',
  styleUrls: ['./UnitsTaskEditor.component.scss'],
})
export class UnitsTaskEditorComponent {
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  private unitService = inject(UnitService);
  private dataSetService = inject(TemplateDataSetService);
  private dictDroneModelService = inject(DictDroneModelService);
  private breakpointObserver = inject(BreakpointObserver);

  // --- Selected Units List with DataSets ---
  protected selectedUnits = signal<UnitDataSetDto[]>([]);

  // --- Current Loaded DataSet ---
  protected dataSet = signal<TemplateDataSetListItem | null>(null);

  // --- Document Info ---
  protected documentDate = signal<Date>(new Date());
  protected documentNumber = signal<string>('');

  // --- Save State ---
  protected isSaving = signal<boolean>(false);
  protected hasUnsavedChanges = signal<boolean>(false);

  // --- Drone Model Autocomplete ---
  private droneModelSearchControls = new Map<string, FormControl<LookupDto | string | null>>();
  private filteredDroneModels = new Map<string, Observable<LookupDto[]>>();
  private isLoadingDroneModels = new Map<string, boolean>();
  private selectedDroneModels = new Map<string, LookupDto | null>();

  // --- Soldiers Table Configuration ---
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
  // Методы для проверки статусов (делаем доступными в шаблоне)
  isCriticalStatus = isCriticalStatus;
  isSevereStatus = isSevereStatus;
  isProblematicStatus = isProblematicStatus;
  isRecoveryStatus = isRecoveryStatus;

  // Проверка даты прибытия (более 14 дней назад)
  isArrivedMoreThan14DaysAgo(arrivedAt: Date): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Сброс времени для корректного сравнения дат

    const arrived = new Date(arrivedAt);
    arrived.setHours(0, 0, 0, 0);

    const fourteenDaysAgo = new Date(today);
    fourteenDaysAgo.setDate(today.getDate() - 14);

    return arrived >= fourteenDaysAgo;
  }

  /**
   * Відкриває діалог редагування JSON
   */
  openJsonEditor(): void {
    const units = this.selectedUnits();
    const jsonString = JSON.stringify(units, null, 2);

    const dialogRef = this.dialog.open(JsonEditorDialogComponent, {
      data: {
        jsonContent: jsonString,
        readOnly: false,
        title: 'Дані документа - Вибрані підрозділи',
      },
      width: '90vw',
      maxWidth: '1400px',
      height: '80vh',
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        try {
          const updatedUnits = JSON.parse(result);
          this.selectedUnits.set(updatedUnits);
          this.hasUnsavedChanges.set(true);
          this.snackBar.open('Дані успішно оновлено', 'Закрити', { duration: 3000 });
        } catch (error) {
          console.error('Error parsing JSON:', error);
          this.snackBar.open('Помилка парсингу JSON', 'Закрити', { duration: 5000 });
        }
      }
    });
  }

  /**
   * Обробник зміни дати документа
   */
  onDocumentDateChange(event: MatDatepickerInputEvent<Date>): void {
    if (event.value) {
      this.documentDate.set(event.value);
    }
  }

  /**
   * Обробник зміни номера документа
   */
  onDocumentNumberChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.documentNumber.set(input.value);
  }

  /**
   * Ініціалізує автокомпліт для моделі БПЛА для конкретного підрозділу
   */
  initDroneModelAutocomplete(unitId: string): void {
    if (!this.droneModelSearchControls.has(unitId)) {
      const control = new FormControl<LookupDto | string | null>(null);
      this.droneModelSearchControls.set(unitId, control);
      this.isLoadingDroneModels.set(unitId, false);
      this.selectedDroneModels.set(unitId, null);

      const filtered = control.valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((value) => {
          const searchTerm =
            typeof value === 'string'
              ? value
              : value && typeof value === 'object' && 'value' in value
              ? value.value
              : '';
          if (searchTerm && searchTerm.length >= 2) {
            this.isLoadingDroneModels.set(unitId, true);
            return this.dictDroneModelService
              .lookup(searchTerm, 10)
              .pipe(finalize(() => this.isLoadingDroneModels.set(unitId, false)));
          }
          return of([]);
        })
      );
      this.filteredDroneModels.set(unitId, filtered);
    }
  }

  /**
   * Отримує FormControl для пошуку моделі БПЛА
   */
  getDroneModelControl(unitId: string): FormControl<LookupDto | string | null> {
    this.initDroneModelAutocomplete(unitId);
    return this.droneModelSearchControls.get(unitId)!;
  }

  /**
   * Отримує Observable для фільтрованих моделей БПЛА
   */
  getFilteredDroneModels(unitId: string): Observable<LookupDto[]> {
    this.initDroneModelAutocomplete(unitId);
    return this.filteredDroneModels.get(unitId)!;
  }

  /**
   * Перевіряє, чи завантажуються моделі БПЛА
   */
  isLoadingDroneModel(unitId: string): boolean {
    return this.isLoadingDroneModels.get(unitId) || false;
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
  onDroneModelSelected(unitId: string, event: MatAutocompleteSelectedEvent): void {
    const selectedDroneModel = event.option.value as LookupDto | null;
    this.selectedDroneModels.set(unitId, selectedDroneModel);
  }

  /**
   * Удаляет подразделение из списка выбранных
   */
  removeUnitFromSelection(nodeId: string) {
    const currentList = this.selectedUnits();
    this.selectedUnits.set(currentList.filter((u) => u.id !== nodeId));
    // Позначаємо що є незбережені зміни
    this.hasUnsavedChanges.set(true);
  }

  /**
   * Зберігає вибрані підрозділи як набір даних
   */
  saveSelectedUnitsAsDataSet(): void {
    if (this.selectedUnits().length === 0) {
      this.snackBar.open('Немає вибраних підрозділів для збереження', 'Закрити', {
        duration: 3000,
      });
      return;
    }

    // Формуємо дані для збереження
    const dataToSave: DocumentDataSet = {
      documentDate: this.documentDate().toISOString(),
      documentNumber: this.documentNumber(),
      units: this.selectedUnits(),
      savedAt: new Date().toISOString(),
    };

    const dataJson = JSON.stringify(dataToSave, null, 2);
    // Генеруємо назву на основі дати та номера документа
    const dateStr = this.documentDate().toLocaleDateString('uk-UA');
    const docNum = this.documentNumber();
    const dataSetName = docNum || `Дані документа від ${dateStr} № ${docNum}`;

    this.isSaving.set(true);

    // Перевіряємо чи є поточний завантажений DataSet
    const currentDataSet = this.dataSet();

    if (currentDataSet) {
      // Оновлюємо існуючий DataSet
      const updateDto: TemplateDataSetUpdateDto = {
        name: dataSetName,
        dataJson: dataJson,
        isPublished: currentDataSet.isPublished,
      };

      this.dataSetService.updateDataSet(currentDataSet.id, updateDto).subscribe({
        next: () => {
          this.isSaving.set(false);
          this.hasUnsavedChanges.set(false);
          this.snackBar.open(`Набір "${dataSetName}" успішно оновлено`, 'Закрити', {
            duration: 5000,
          });
        },
        error: (error) => {
          this.isSaving.set(false);
          console.error('Error updating dataset:', error);
          const errorMessage = ErrorHandler.handleHttpError(error, 'Помилка оновлення даних');
          this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
        },
      });
    } else {
      // Створюємо новий DataSet
      const createDto: TemplateDataSetCreateDto = {
        name: dataSetName,
        dataJson: dataJson,
        isPublished: false,
      };

      this.dataSetService.createDataSet(createDto).subscribe({
        next: (createdDataSet) => {
          this.isSaving.set(false);
          this.hasUnsavedChanges.set(false);
          // Зберігаємо інформацію про новостворений DataSet
          this.dataSet.set({
            id: createdDataSet.id,
            name: createdDataSet.name,
            isPublished: createdDataSet.isPublished,
            createdAtUtc: createdDataSet.createdAtUtc,
            updatedAtUtc: createdDataSet.updatedAtUtc,
            publishedAtUtc: createdDataSet.publishedAtUtc,
          });
          this.snackBar.open(
            `Дані успішно збережено як набір "${createdDataSet.name}"`,
            'Закрити',
            {
              duration: 5000,
            }
          );
        },
        error: (error) => {
          this.isSaving.set(false);
          console.error('Error creating dataset:', error);
          const errorMessage = ErrorHandler.handleHttpError(error, 'Помилка збереження даних');
          this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
        },
      });
    }
  }

  /**
   * Перевіряє наявність незбережених змін і запитує підтвердження
   * @returns true якщо можна продовжити, false якщо користувач скасував
   */
  checkUnsavedChanges(): boolean {
    if (this.hasUnsavedChanges()) {
      const confirmed = confirm(
        '⚠️ У вас є незбережені зміни!\n\n' +
          'Якщо ви продовжите, всі незбережені дані будуть втрачені.\n\n' +
          'Продовжити?'
      );
      return confirmed;
    }
    return true;
  }

  /**
   * Створює новий набір даних (очищає форму)
   */
  createNewDataSet(): void {
    // Перевіряємо наявність незбережених змін
    if (!this.checkUnsavedChanges()) {
      return;
    }

    // Очищаємо поточний DataSet (переходимо в режим створення нового)
    this.dataSet.set(null);

    // Очищуємо всі дані
    this.selectedUnits.set([]);
    this.documentDate.set(new Date());
    this.documentNumber.set('');
    this.selectedDroneModels.clear();
    this.droneModelSearchControls.clear();
    this.filteredDroneModels.clear();
    this.isLoadingDroneModels.clear();

    // Скидаємо прапорець стану
    this.hasUnsavedChanges.set(false);

    this.snackBar.open('Створено новий набір даних', 'Закрити', { duration: 3000 });
  }

  /**
   * Отримує читабельну назву статусу публікації
   */
  getStatusLabel(isPublished: boolean): string {
    return DocTemplateUtils.getStatusLabel(isPublished);
  }

  /**
   * Обробник зміни статусу публікації
   */
  onPublishStatusChange(isPublished: boolean): void {
    const currentDataSet = this.dataSet();
    if (!currentDataSet) {
      this.snackBar.open('Немає завантаженого набору даних', 'Закрити', { duration: 3000 });
      return;
    }

    // Перевіряємо чи статус дійсно змінився
    if (currentDataSet.isPublished === isPublished) {
      return;
    }

    this.isSaving.set(true);

    this.dataSetService.publish(currentDataSet.id, isPublished).subscribe({
      next: () => {
        this.isSaving.set(false);
        // Оновлюємо статус в локальному signal
        this.dataSet.set({
          ...currentDataSet,
          isPublished: isPublished,
          publishedAtUtc: isPublished ? new Date().toISOString() : undefined,
          updatedAtUtc: new Date().toISOString(),
        });

        const statusText = isPublished ? 'опубліковано' : 'знято з публікації';
        this.snackBar.open(`Набір "${currentDataSet.name}" ${statusText}`, 'Закрити', {
          duration: 3000,
        });
      },
      error: (error) => {
        this.isSaving.set(false);
        console.error('Error changing publish status:', error);
        const errorMessage = ErrorHandler.handleHttpError(
          error,
          'Помилка зміни статусу публікації'
        );
        this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
      },
    });
  }

  /**
   * Перевіряє перед закриттям сторінки
   */
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: BeforeUnloadEvent): void {
    if (this.hasUnsavedChanges()) {
      $event.preventDefault();
    }
  }
}
