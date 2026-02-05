import { inject, signal, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatDatepickerModule, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import {
  TemplateDataSetCreateDto,
  TemplateDataSetUpdateDto,
  UnitTaskDto,
  UnitTaskCreateDto,
} from '../models/template-dataset.models';
import { TemplateDataSetService } from '../services/template-dataset.service';
import { UnitTaskService } from '../services/unit-task.service';
import { UnitService } from '../../Unit/services/unit.service';
import { JsonEditorDialogComponent } from '../components/JsonEditorDialog.component';
import { UnitTaskCardComponent } from './UnitTaskCard.component';
import { S5App_ErrorHandler } from '../../shared/models/ErrorHandler';
import { TemplateDataSetDto } from '../models/template-dataset.models';
import { DocTemplateUtils } from '../models/shared.models';
import { VerticalLayoutComponent } from '../../shared/components/VerticalLayout.component';

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
    VerticalLayoutComponent,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './UnitsTaskEditor.component.html',
  styleUrls: ['./UnitsTaskEditor.component.scss'],
})
export class UnitsTaskEditorComponent {
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  private dataSetService = inject(TemplateDataSetService);
  private unitTaskService = inject(UnitTaskService);
  private unitService = inject(UnitService);

  @ViewChild('parentDateInput') parentDateInput?: ElementRef<HTMLInputElement>;
  @ViewChild('parentNumberInput') parentNumberInput?: ElementRef<HTMLInputElement>;
  @ViewChild('dateInput') dateInput?: ElementRef<HTMLInputElement>;
  @ViewChild('numberInput') numberInput?: ElementRef<HTMLInputElement>;

  // --- Selected Units List with DataSets ---
  protected selectedUnits = signal<UnitTaskDto[]>([]);

  // --- Current Loaded DataSet ---
  protected dataSet = signal<TemplateDataSetDto | null>(null);

  // --- Document Info ---
  // Документ старшого начальника
  protected isParentDocUsed = signal<boolean>(false);
  protected parentDocumentDate = signal<Date | null>(null);
  protected parentDocumentNumber = signal<string>('');

  // Основний документ
  protected documentDate = signal<Date | null>(new Date());
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
    const jsonString = JSON.stringify(this.selectedUnits(), null, 2);

    this.dialog.open(JsonEditorDialogComponent, {
      data: {
        jsonContent: jsonString,
        readOnly: true,
        title: 'Дані документа - Вибрані підрозділи',
      },
      width: '90vw',
      maxWidth: '1400px',
      height: '80vh',
      disableClose: false,
    });
  }

  /**
   * Обробник зміни прапорця "Чи існує документ старшого начальника"
   */
  onParentDocUsedChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.isParentDocUsed.set(input.checked);
    this.hasUnsavedChanges.set(true);
  }

  /**
   * Обробник зміни дати документа старшого начальника
   */
  onParentDocumentDateChange(event: MatDatepickerInputEvent<Date>): void {
    this.parentDocumentDate.set(event.value || null);
    this.hasUnsavedChanges.set(true);
  }

  /**
   * Обробник зміни номера документа старшого начальника
   */
  onParentDocumentNumberChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.parentDocumentNumber.set(input.value);
    this.hasUnsavedChanges.set(true);
  }

  /**
   * Обробник зміни дати документа
   */
  onDocumentDateChange(event: MatDatepickerInputEvent<Date>): void {
    this.documentDate.set(event.value || null);
    this.hasUnsavedChanges.set(true);
  }

  /**
   * Обробник зміни номера документа
   */
  onDocumentNumberChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.documentNumber.set(input.value);
    this.hasUnsavedChanges.set(true);
  }

  /**
   * Повертає контент DataSet у форматі JSON для ResultEditor
   */
  getDataSetContent(): string {
    const units = this.selectedUnits();
    if (units.length === 0) {
      return '';
    }

    return JSON.stringify(units, null, 2);
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
          'Продовжити?',
      );
      return confirmed;
    }
    return true;
  }

  /**
   * Додає підрозділ до списку вибраних
   * Завантажує Unit через UnitService
   */
  addUnitToSelection(unitId: string) {
    const currentList = this.selectedUnits();
    // Перевіряємо, чи немає вже цього підрозділу в списку
    if (currentList.find((u) => u.unitId === unitId)) {
      this.snackBar.open('Цей підрозділ вже додано до списку', 'Закрити', { duration: 3000 });
      return;
    }

    // Завантажуємо дані підрозділу через UnitService
    this.unitService.getById(unitId).subscribe({
      next: (unit) => {
        // Створюємо новий UnitTask (ще не збережений на сервері)
        const unitTask: UnitTaskDto = {
          id: '', // Ще не створено на сервері
          unitId: unit.id,
          unitShortName: unit.shortName || '',
          parentId: unit.parentId,
          parentShortName: unit.parentShortName || '',
          assignedUnitId: unit.assignedUnitId,
          assignedShortName: unit.assignedShortName,
          unitTypeId: unit.unitTypeId,
          unitTypeName: unit.unitType,
          isInvolved: false,
          persistentLocationId: unit.persistentLocationId,
          persistentLocationValue: unit.persistentLocation,
          taskId: '', // Користувач має вибрати
          taskValue: '',
          areaId: '', // Користувач має вибрати РВЗ
          areaValue: '',
          means: [],
          isPublished: false,
          publishedAtUtc: undefined,
          changedBy: '',
          validFrom: new Date().toISOString(),
        };

        this.selectedUnits.set([...currentList, unitTask]);
        this.hasUnsavedChanges.set(true);
      },
      error: (error) => {
        console.error('Помилка завантаження даних підрозділу:', error);
        const errorMessage = S5App_ErrorHandler.handleHttpError(
          error,
          'Помилка завантаження даних підрозділу',
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

  /**
   * Завантажує DataSet та список UnitTask
   */
  loadDataSet(dataSetId: string): void {
    if (this.dataSet()?.id === dataSetId) {
      return; // Вже завантажено
    }

    // Перевіряємо чи немає незбережених змін
    if (!this.checkUnsavedChanges()) {
      return;
    }

    this.dataSetService.getDataSetById(dataSetId).subscribe({
      next: (dataSet) => {
        // Зберігаємо інформацію про поточний DataSet
        this.dataSet.set(dataSet);

        // Оновлюємо дані документа старшого начальника
        this.isParentDocUsed.set(dataSet.isParentDocUsed);
        this.parentDocumentDate.set(dataSet.parentDocDate ? new Date(dataSet.parentDocDate) : null);
        this.parentDocumentNumber.set(dataSet.parentDocNumber || '');

        // Оновлюємо дату та номер документа
        this.documentDate.set(new Date(dataSet.docDate));
        this.documentNumber.set(dataSet.docNumber);

        // Завантажуємо список UnitTask для цього DataSet
        this.unitTaskService.getAll({ dataSetId: dataSet.id }).subscribe({
          next: (unitTasks) => {
            this.selectedUnits.set(unitTasks);
            this.hasUnsavedChanges.set(false);
            this.snackBar.open(
              `Завантажено набір "${dataSet.name}" з ${unitTasks.length} підрозділами`,
              'Закрити',
              { duration: 3000 },
            );
          },
          error: (error) => {
            console.error('Помилка завантаження завдань підрозділів:', error);
            const errorMessage = S5App_ErrorHandler.handleHttpError(
              error,
              'Помилка завантаження завдань підрозділів',
            );
            this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
          },
        });
      },
      error: (error) => {
        console.error('Помилка завантаження набору даних:', error);
        const errorMessage = S5App_ErrorHandler.handleHttpError(
          error,
          'Помилка завантаження набору даних',
        );
        this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
      },
    });
  }

  /**
   * Перевіряє обов'язкове поле та показує помилку
   */
  private checkRequiredField(
    value: string | Date | null | undefined,
    input: ElementRef<HTMLInputElement> | undefined,
    errorMessage: string,
  ): boolean {
    const isEmpty = !value || (typeof value === 'string' && value.trim() === '');

    if (isEmpty) {
      this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
      this.focusInvalidField(input);
      return false;
    }
    return true;
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

    // Перевірка обов'язкових полів
    if (this.isParentDocUsed()) {
      if (
        !this.checkRequiredField(
          this.parentDocumentDate(),
          this.parentDateInput,
          'Заповніть дату документа старшого начальника',
        )
      ) {
        return;
      }

      if (
        !this.checkRequiredField(
          this.parentDocumentNumber(),
          this.parentNumberInput,
          'Заповніть номер документа старшого начальника',
        )
      ) {
        return;
      }
    }

    if (!this.checkRequiredField(this.documentDate(), this.dateInput, 'Заповніть дату документа')) {
      return;
    }

    if (
      !this.checkRequiredField(this.documentNumber(), this.numberInput, 'Заповніть номер документа')
    ) {
      return;
    }

    // Перевірка обов'язкових полів для кожного підрозділу
    const units = this.selectedUnits();
    for (let i = 0; i < units.length; i++) {
      const unit = units[i];

      if (!unit.taskId) {
        this.snackBar.open(
          `Підрозділ "${unit.unitShortName}" (${i + 1}): заповніть завдання`,
          'Закрити',
          { duration: 5000 },
        );
        return;
      }

      if (!unit.areaId) {
        this.snackBar.open(
          `Підрозділ "${unit.unitShortName}" (${i + 1}): заповніть район виконання завдань (РВЗ)`,
          'Закрити',
          { duration: 5000 },
        );
        return;
      }
    }

    // Генеруємо назву на основі дати та номера документа
    const dateStr = this.documentDate()?.toLocaleDateString('uk-UA') || '';
    const docNum = this.documentNumber().trim();
    const dataSetName = `Дані документа від ${dateStr} № ${docNum}`;

    this.isSaving.set(true);

    const currentDataSet = this.dataSet();

    if (currentDataSet) {
      // Оновлюємо існуючий DataSet
      const updateDto: TemplateDataSetUpdateDto = {
        name: dataSetName,
        isParentDocUsed: this.isParentDocUsed(),
        parentDocNumber: this.parentDocumentNumber(),
        parentDocDate: this.parentDocumentDate()?.toISOString() || new Date().toISOString(),
        docNumber: this.documentNumber(),
        docDate: this.documentDate()!.toISOString(),
        isPublished: currentDataSet.isPublished,
      };

      this.dataSetService.updateDataSet(currentDataSet.id, updateDto).subscribe({
        next: () => {
          // Після оновлення DataSet зберігаємо UnitTask
          this.saveUnitTasks(currentDataSet.id);
        },
        error: (error) => {
          this.isSaving.set(false);
          console.error('Error updating dataset:', error);
          const errorMessage = S5App_ErrorHandler.handleHttpError(error, 'Помилка оновлення даних');
          this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
        },
      });
    } else {
      // Створюємо новий DataSet
      const createDto: TemplateDataSetCreateDto = {
        name: dataSetName,
        isParentDocUsed: this.isParentDocUsed(),
        parentDocNumber: this.parentDocumentNumber(),
        parentDocDate: this.parentDocumentDate()?.toISOString() || new Date().toISOString(),
        docNumber: this.documentNumber(),
        docDate: this.documentDate()!.toISOString(),
        isPublished: false,
      };

      this.dataSetService.createDataSet(createDto).subscribe({
        next: (createdDataSet) => {
          // Зберігаємо інформацію про новостворений DataSet
          this.dataSet.set({
            id: createdDataSet.id,
            name: createdDataSet.name,
            isParentDocUsed: createdDataSet.isParentDocUsed,
            parentDocNumber: createdDataSet.parentDocNumber,
            parentDocDate: createdDataSet.parentDocDate,
            docNumber: createdDataSet.docNumber,
            docDate: createdDataSet.docDate,
            isPublished: createdDataSet.isPublished,
            createdAtUtc: createdDataSet.createdAtUtc,
            updatedAtUtc: createdDataSet.updatedAtUtc,
            publishedAtUtc: createdDataSet.publishedAtUtc,
          });

          // Після створення DataSet зберігаємо UnitTask
          this.saveUnitTasks(createdDataSet.id);
        },
        error: (error) => {
          this.isSaving.set(false);
          console.error('Error creating dataset:', error);
          const errorMessage = S5App_ErrorHandler.handleHttpError(
            error,
            'Помилка збереження даних',
          );
          this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
        },
      });
    }
  }

  /**
   * Зберігає UnitTask для кожного підрозділу
   */
  private saveUnitTasks(dataSetId: string): void {
    const units = this.selectedUnits();
    const saveObservables = units.map((unit) => {
      if (unit.id) {
        // Оновлюємо існуючий UnitTask
        return this.unitTaskService.update(unit.id, unit);
      } else {
        // Створюємо новий UnitTask (snapshot)
        const createDto: UnitTaskCreateDto = {
          dataSetId: dataSetId,
          unitId: unit.unitId,
          taskId: unit.taskId,
          areaId: unit.areaId,
        };
        return this.unitTaskService.create(createDto);
      }
    });

    forkJoin(saveObservables).subscribe({
      next: () => {
        this.isSaving.set(false);
        this.hasUnsavedChanges.set(false);
        this.snackBar.open('Дані успішно збережено', 'Закрити', { duration: 3000 });

        // Перезавантажуємо DataSet для оновлення даних
        this.loadDataSet(dataSetId);
      },
      error: (error) => {
        this.isSaving.set(false);
        console.error('Помилка збереження завдань підрозділів:', error);
        const errorMessage = S5App_ErrorHandler.handleHttpError(
          error,
          'Помилка збереження завдань підрозділів',
        );
        this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
      },
    });
  }

  /**
   * Створює новий набір даних (очищає форму)
   */
  createNewDataSet(): void {
    // Перевіряємо наявність незбережених змін
    if (!this.checkUnsavedChanges()) {
      return;
    }

    // Очищаємо поточний DataSet
    this.dataSet.set(null);

    // Очищуємо всі дані
    this.selectedUnits.set([]);
    this.isParentDocUsed.set(false);
    this.parentDocumentDate.set(null);
    this.parentDocumentNumber.set('');
    this.documentDate.set(new Date());
    this.documentNumber.set('');

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
        const errorMessage = S5App_ErrorHandler.handleHttpError(
          error,
          'Помилка зміни статусу публікації',
        );
        this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
      },
    });
  }

  /**
   * Фокусує невалідне поле та додає візуальне виділення
   */
  private focusInvalidField(inputRef?: ElementRef<HTMLInputElement>): void {
    if (inputRef?.nativeElement) {
      setTimeout(() => {
        inputRef.nativeElement.focus();
        inputRef.nativeElement.select();
      }, 100);
    }
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
