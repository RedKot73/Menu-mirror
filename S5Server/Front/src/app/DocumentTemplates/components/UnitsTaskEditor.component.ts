import {
  inject,
  signal,
  DestroyRef,
  HostListener,
  ViewChild,
  ElementRef,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDatepickerModule, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { TemplateDataSetUpSertDto, UnitTaskDto } from '../models/template-dataset.models';
import { TemplateDataSetService } from '../services/template-dataset.service';
import { UnitTaskService } from '../services/unit-task.service';
import { UnitService } from '../../../ServerService/unit.service';
import { UnitTaskCardComponent } from './UnitTaskCard.component';
import { S5App_ErrorHandler } from '../../shared/models/ErrorHandler';
import { TemplateDataSetDto } from '../models/template-dataset.models';
import { DocTemplateUtils } from '../models/shared.models';
import { VerticalLayoutComponent } from '../../shared/components/VerticalLayout.component';
import { DateMaskDirective } from '../../shared/directives/date-mask.directive';
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
    MatTooltipModule,
    DateMaskDirective,
  ],
  providers: [],
  templateUrl: './UnitsTaskEditor.component.html',
  styleUrls: ['./UnitsTaskEditor.component.scss'],
})
export class UnitsTaskEditorComponent {
  private destroyRef = inject(DestroyRef);
  private snackBar = inject(MatSnackBar);

  private dataSetService = inject(TemplateDataSetService);
  private unitService = inject(UnitService);
  private unitTaskService = inject(UnitTaskService);

  @ViewChild('parentDateInput') parentDateInput?: ElementRef<HTMLInputElement>;
  @ViewChild('parentNumberInput') parentNumberInput?: ElementRef<HTMLInputElement>;
  @ViewChild('dateInput') dateInput?: ElementRef<HTMLInputElement>;
  @ViewChild('numberInput') numberInput?: ElementRef<HTMLInputElement>;

  // Доступ до всіх карток підрозділів
  @ViewChildren(UnitTaskCardComponent) unitTaskCards!: QueryList<UnitTaskCardComponent>;

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
    const units = [...this.selectedUnits()];
    const unitIndex = units.findIndex((u) => u.id === updatedUnit.id);
    if (unitIndex !== -1) {
      units[unitIndex] = updatedUnit;
      this.selectedUnits.set(units);
      this.hasUnsavedChanges.set(true);
    }
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
    const inputElement = event.targetElement as HTMLInputElement;

    // Пытаемся распарсить то, что ввел пользователь вручную
    const manualDate = DocTemplateUtils.parseDateString(inputElement.value);

    // Если ручной парсинг удался — берем его, иначе берем то, что определил Material
    const finalDate = manualDate || event.value;

    this.parentDocumentDate.set(finalDate);
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
    const inputElement = event.targetElement as HTMLInputElement;

    // Пытаемся распарсить то, что ввел пользователь вручную
    const manualDate = DocTemplateUtils.parseDateString(inputElement.value);

    // Если ручной парсинг удался — берем его, иначе берем то, что определил Material
    const finalDate = manualDate || event.value;
    this.documentDate.set(finalDate);
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
    this.unitService
      .getById(unitId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
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
            meansCount: 0, // ✅ Кількість засобів (Master-Detail)
            means: [], // ✅ OPTIONAL: завантажується окремо
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

    this.dataSetService
      .getDataSetById(dataSetId)
      .pipe(
        tap((dataSet) => {
          // Зберігаємо інформацію про поточний DataSet
          this.dataSet.set(dataSet);

          // Оновлюємо дані документа старшого начальника
          this.isParentDocUsed.set(dataSet.isParentDocUsed);
          this.parentDocumentDate.set(
            dataSet.parentDocDate ? new Date(dataSet.parentDocDate) : null,
          );
          this.parentDocumentNumber.set(dataSet.parentDocNumber || '');

          // Оновлюємо дату та номер документа
          this.documentDate.set(new Date(dataSet.docDate));
          this.documentNumber.set(dataSet.docNumber);
        }),
        switchMap((dataSet) => this.unitTaskService.getAll({ dataSetId: dataSet.id })),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (unitTasks) => {
          this.selectedUnits.set(unitTasks);
          this.hasUnsavedChanges.set(false);
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
    const date = this.documentDate();
    const dateStr = date ? new Intl.DateTimeFormat('uk-UA').format(date) : '';
    const docNum = this.documentNumber().trim();
    const dataSetName = `Дані документа від ${dateStr} № ${docNum}`;

    this.isSaving.set(true);

    const currentDataSet = this.dataSet();

    // Формуємо DTO для створення або оновлення
    const dataSetDto: TemplateDataSetUpSertDto = {
      name: dataSetName,
      isParentDocUsed: this.isParentDocUsed(),
      parentDocNumber: this.isParentDocUsed() ? this.parentDocumentNumber() : null,
      parentDocDate: this.isParentDocUsed()
        ? this.parentDocumentDate()?.toISOString().split('T')[0] || null
        : null,
      docNumber: this.documentNumber(),
      docDate: this.documentDate()!.toISOString().split('T')[0],
      isPublished: currentDataSet?.isPublished || false,
    };

    if (currentDataSet) {
      // Оновлюємо існуючий DataSet
      this.dataSetService
        .updateDataSet(currentDataSet.id, dataSetDto)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            // Після оновлення DataSet зберігаємо UnitTask
            this.saveUnitTasks(currentDataSet.id);
          },
          error: (error) => {
            this.isSaving.set(false);
            console.error('Error updating dataset:', error);
            const errorMessage = S5App_ErrorHandler.handleHttpError(
              error,
              'Помилка оновлення даних',
            );
            this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
          },
        });
    } else {
      // Створюємо новий DataSet
      this.dataSetService
        .createDataSet(dataSetDto)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (createdDataSet) => {
            // Зберігаємо інформацію про новостворений DataSet
            this.dataSet.set(createdDataSet);

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
   * Координує збереження через виклик card.saveUnitTask()
   */
  private async saveUnitTasks(dataSetId: string): Promise<void> {
    const cards = this.unitTaskCards.toArray();

    if (cards.length === 0) {
      this.snackBar.open('Немає підрозділів для збереження', 'Закрити', { duration: 3000 });
      this.isSaving.set(false);
      return;
    }

    try {
      let successCount = 0;
      let failedCount = 0;

      // Зберігаємо кожну картку послідовно
      for (const card of cards) {
        const success = await card.saveUnitTask(dataSetId);
        if (success) {
          successCount++;
        } else {
          failedCount++;
        }
      }

      this.isSaving.set(false);

      if (failedCount === 0) {
        this.hasUnsavedChanges.set(false);
        this.snackBar.open(`Дані успішно збережено (${successCount} підрозділів)`, 'Закрити', {
          duration: 3000,
        });
      } else {
        this.snackBar.open(`Збережено: ${successCount}, Помилок: ${failedCount}`, 'Закрити', {
          duration: 5000,
        });
      }
    } catch (error) {
      this.isSaving.set(false);
      console.error('Помилка збереження завдань підрозділів:', error);
      const errorMessage = S5App_ErrorHandler.handleHttpError(
        error,
        'Помилка збереження завдань підрозділів',
      );
      this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
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

    this.dataSetService
      .publish(currentDataSet.id, isPublished)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.isSaving.set(false);
          // Оновлюємо статус в локальному signal
          this.dataSet.set({
            ...currentDataSet,
            isPublished: isPublished,
            publishedAtUtc: isPublished ? new Date().toISOString() : undefined,
            validFrom: new Date().toISOString(),
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

  /**
   * Отримує читабельну назву статусу публікації
   */
  getStatusLabel(isPublished: boolean): string {
    return DocTemplateUtils.getStatusLabel(isPublished);
  }

  formatDate(dateString: string): string {
    return DocTemplateUtils.formatDate(dateString);
  }
}
