import { inject, signal, HostListener } from '@angular/core';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import {
  MatDatepickerModule,
  MatDatepickerInputEvent,
} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import {
  DocumentDataSet,
  TemplateDataSetCreateDto,
  TemplateDataSetUpdateDto,
  UnitTaskDto,
} from '../models/template-dataset.models';
import { TemplateDataSetService } from '../services/template-dataset.service';
import { JsonEditorDialogComponent } from '../components/JsonEditorDialog.component';
import { UnitTaskCardComponent } from './UnitTaskCard.component';
import { ErrorHandler } from '../../shared/models/ErrorHandler';
import { TemplateDataSetListItem } from '../models/template-dataset.models';
import { DocTemplateUtils } from '../models/shared.models';

@Component({
  selector: 'app-units-task-editor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDatepickerModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    UnitTaskCardComponent,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './UnitsTaskEditor.component.html',
  styleUrls: ['./UnitsTaskEditor.component.scss'],
})
export class UnitsTaskEditorComponent {
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  private dataSetService = inject(TemplateDataSetService);

  // --- Selected Units List with DataSets ---
  protected selectedUnits = signal<UnitTaskDto[]>([]);

  // --- Current Loaded DataSet ---
  protected dataSet = signal<TemplateDataSetListItem | null>(null);

  // --- Document Info ---
  protected documentDate = signal<Date>(new Date());
  protected documentNumber = signal<string>('');

  // --- Save State ---
  protected isSaving = signal<boolean>(false);
  protected hasUnsavedChanges = signal<boolean>(false);

  /**
   * Обробник зміни підрозділу з дочірнього компонента
   */
  onUnitChange(updatedUnit: UnitTaskDto): void {
    const units = this.selectedUnits();
    const unitIndex = units.findIndex((u) => u.id === updatedUnit.id);
    if (unitIndex !== -1) {
      units[unitIndex] = updatedUnit;
      this.selectedUnits.set([...units]);
      this.hasUnsavedChanges.set(true);
    }
  }

  /**
   * Відкриває діалог редагування JSON
   */
  openJsonEditor(): void {
    const jsonString = this.getDataSetContent(null, 2);

    this.dialog.open(JsonEditorDialogComponent, {
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
  /*
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
*/
  /**
   * Отримує FormControl для пошуку моделі БПЛА
   */
  /*
  getDroneModelControl(unitId: string): FormControl<LookupDto | string | null> {
    this.initDroneModelAutocomplete(unitId);
    return this.droneModelSearchControls.get(unitId)!;
  }
*/
  /**
   * Отримує Observable для фільтрованих моделей БПЛА
   */
  /*
  getFilteredDroneModels(unitId: string): Observable<LookupDto[]> {
    this.initDroneModelAutocomplete(unitId);
    return this.filteredDroneModels.get(unitId)!;
  }
*/
  /**
   * Перевіряє, чи завантажуються моделі БПЛА
   */
  /*
  isLoadingDroneModel(unitId: string): boolean {
    return this.isLoadingDroneModels.get(unitId) || false;
  }
*/
  /**
   * Відображення назви моделі БПЛА в автокомпліті
   */
  /*
  displayDroneModelFn = (droneModel: LookupDto | null): string => {
    return droneModel ? droneModel.value : '';
  };
*/
  /**
   * Обробник вибору моделі БПЛА
   */
  /*
  onDroneModelSelected(unitId: string, event: MatAutocompleteSelectedEvent): void {
    const selectedDroneModel = event.option.value as LookupDto | null;
    this.selectedDroneModels.set(unitId, selectedDroneModel);

    // Оновлюємо Means в UnitTaskDto
    const units = this.selectedUnits();
    const unitIndex = units.findIndex((u) => u.id === unitId);
    if (unitIndex !== -1) {
      const updatedUnit = { ...units[unitIndex] };
      updatedUnit.Means = selectedDroneModel ? [selectedDroneModel.value] : [];
      units[unitIndex] = updatedUnit;
      this.selectedUnits.set([...units]);
      this.hasUnsavedChanges.set(true);
    }
  }
*/
  /**
   * Отримує FormControl для вибору завдання
   */
  /*
  getTaskControl(unitId: string): FormControl<string | null> {
    if (!this.taskSelectionControls.has(unitId)) {
      const control = new FormControl<string | null>(null);
      this.taskSelectionControls.set(unitId, control);

      // Підписуємося на зміни
      control.valueChanges.subscribe((value) => {
        this.onTaskChange(unitId, value);
      });
    }
    return this.taskSelectionControls.get(unitId)!;
  }
*/
  /**
   * Отримує FormControl для вибору зони (РСП)
   */
  /*
  getAreaControl(unitId: string): FormControl<string | null> {
    if (!this.areaSelectionControls.has(unitId)) {
      const control = new FormControl<string | null>(null);
      this.areaSelectionControls.set(unitId, control);

      // Підписуємося на зміни
      control.valueChanges.subscribe((value) => {
        this.onAreaChange(unitId, value);
      });
    }
    return this.areaSelectionControls.get(unitId)!;
  }
*/
  /**
   * Обробник зміни завдання
   */
  /*
  private onTaskChange(unitId: string, taskValue: string | null): void {
    const units = this.selectedUnits();
    const unitIndex = units.findIndex((u) => u.id === unitId);
    if (unitIndex !== -1) {
      const updatedUnit = { ...units[unitIndex] };
      updatedUnit.TaskValue = taskValue || '';
      units[unitIndex] = updatedUnit;
      this.selectedUnits.set([...units]);
      this.hasUnsavedChanges.set(true);
    }
  }
*/
  /**
   * Обробник зміни зони (РСП)
   */
  /*
  private onAreaChange(unitId: string, areaValue: string | null): void {
    const units = this.selectedUnits();
    const unitIndex = units.findIndex((u) => u.id === unitId);
    if (unitIndex !== -1) {
      const updatedUnit = { ...units[unitIndex] };
      updatedUnit.AreaValue = areaValue || '';
      units[unitIndex] = updatedUnit;
      this.selectedUnits.set([...units]);
      this.hasUnsavedChanges.set(true);
    }
  }
*/
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
   * Добавляет подразделение в список выбранных
   * Загружает полный DataSet с особовим складом через API
   */
  addUnitToSelection(unitId: string) {
    const currentList = this.selectedUnits();
    // Проверяем, нет ли уже этого подразделения в списке
    if (currentList.find((u) => u.id === unitId)) {
      return;
    }

    // Загружаем полный DataSet подразделения
    this.dataSetService.getUnitDataSet(unitId).subscribe({
      next: (unitDataSet) => {
        // Створюємо UnitTaskDto з порожніми значеннями завдань
        const unitTask: UnitTaskDto = {
          ...unitDataSet,
          TaskId: '',
          TaskValue: '',
          AreaId: '',
          AreaValue: '',
          Means: [],
        };

        this.selectedUnits.set([...currentList, unitTask]);
        // Позначаємо що є незбережені зміни
        this.hasUnsavedChanges.set(true);
      },
      error: (error) => {
        console.error('Помилка завантаження даних підрозділу:', error);
        const errorMessage = ErrorHandler.handleHttpError(
          error,
          'Помилка завантаження даних підрозділу:'
        );
        this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
      },
    });
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

  loadDataSet(dataSetId: string): void {
    if (this.dataSet()?.id === dataSetId) {
      return; // Вже завантажено
    }
    // Перевіряємо чи немає незбережених змін перед завантаженням нового набору
    if (!this.checkUnsavedChanges()) {
      return; // Користувач скасував завантаження
    }

    this.dataSetService.getDataSetById(dataSetId).subscribe({
      next: (dataSet) => {
        let documentData: DocumentDataSet;
        try {
          documentData = JSON.parse(dataSet.dataJson) as DocumentDataSet;
        } catch (error) {
          const errorMessage = ErrorHandler.handleJsonError(error);
          this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
          return;
        }

        if (!documentData || !documentData.unitsTask) {
          this.snackBar.open('Набір даних не містить інформації про підрозділи', 'Закрити', {
            duration: 5000,
          });
          return;
        }

        // Зберігаємо інформацію про поточний завантажений DataSet
        this.dataSet.set(dataSet);

        // Оновлюємо дату та номер документа
        this.documentDate.set(new Date(documentData.documentDate));
        this.documentNumber.set(documentData.documentNumber);

        // Оновлюємо вибрані підрозділи
        this.selectedUnits.set(documentData.unitsTask);

        // Скидаємо прапорець незбережених змін (ми щойно завантажили збережені дані)
        this.hasUnsavedChanges.set(false);

        this.snackBar.open(`Завантажено набір "${dataSet.name}"`, 'Закрити', { duration: 3000 });
      },
      error: (error) => {
        console.error('Помилка завантаження набору даних:', error);
        const errorMessage = ErrorHandler.handleHttpError(
          error,
          'Помилка завантаження набору даних:'
        );
        this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
      },
    });
  }

  getDataSetContent(
    replacer?: (string | number)[] | null | undefined,
    space?: string | number | undefined
  ): string
  {
    // Формуємо дані для збереження
    const dataToSave: DocumentDataSet = {
      documentDate: this.documentDate().toISOString(),
      documentNumber: this.documentNumber(),
      unitsTask: this.selectedUnits(),
      savedAt: new Date().toISOString(),
    };

    const dataJson = JSON.stringify(dataToSave, replacer, space);
    return dataJson;
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

    const dataJson = this.getDataSetContent();
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
    /*
    this.selectedDroneModels.clear();
    this.droneModelSearchControls.clear();
    this.filteredDroneModels.clear();
    this.isLoadingDroneModels.clear();
    */

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
