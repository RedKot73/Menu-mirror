import {
  inject,
  signal,
  DestroyRef,
  HostListener,
  ViewChild,
  ElementRef,
  ViewChildren,
  QueryList,
  output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule } from '@angular/forms';
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
import { firstValueFrom, map, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { S5App_ErrorHandler } from '../../shared/models/ErrorHandler';
import { VerticalLayoutComponent } from '../../shared/components/VerticalLayout.component';
import { DateMaskDirective } from '../../shared/directives/date-mask.directive';
import { formatDate, parseDateString } from '../../shared/utils/date.utils';
import { UnitSelectDialogComponent } from '../../dialogs/UnitSelect-dialog.component';
import { ErrorListSnackBarComponent } from '../../dialogs/ErrorListSnackbar.component';
import {
  TemplateDataSetCreateDto,
  TemplateDataSetDto,
} from '../models/template-dataset.models';
import { TemplateDataSetService } from '../../../ServerService/template-dataset.service';
import { UnitTaskDto, UnitTaskService } from '../../../ServerService/unit-task.service';
import { OneUnitTaskEditor } from './OneUnitTaskEditor.component';
import { DocTemplateUtils } from '../../DocumentTemplates/models/shared.models';
import {
  CreateDataSetDialogComponent,
} from '../../dialogs/CreateDataSet-dialog.component';

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
    OneUnitTaskEditor,
    VerticalLayoutComponent,
    MatTooltipModule,
    DateMaskDirective,
  ],
  providers: [],
  templateUrl: './UnitsTaskEditor.component.html',
  styleUrls: ['./UnitsTaskEditor.component.scss'],
})
export class UnitsTaskEditor {
  private destroyRef = inject(DestroyRef);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  private dataSetService = inject(TemplateDataSetService);
  private unitTaskService = inject(UnitTaskService);

  @ViewChild('parentDateInput') parentDateInput?: ElementRef<HTMLInputElement>;
  @ViewChild('parentNumberInput') parentNumberInput?: ElementRef<HTMLInputElement>;
  @ViewChild('dateInput') dateInput?: ElementRef<HTMLInputElement>;
  @ViewChild('numberInput') numberInput?: ElementRef<HTMLInputElement>;

  // Доступ до всіх карток підрозділів
  @ViewChildren(OneUnitTaskEditor) unitTaskCards!: QueryList<OneUnitTaskEditor>;

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
  /** Множина UnitTask ID з незбереженими змінами */
  protected unitsWithUnsavedChanges = signal<Set<string>>(new Set());
  /** Контрол для статусу публікації
   * Предотвращает переключение визуального контрола
   * при ошибках в изменении статуса публикации из-за
   * асинхронного обновления unitTask после сохранения.
   */
  protected publishStatusControl = new FormControl<boolean>(false, { nonNullable: true });

  /** Emits the updated TemplateDataSetDto after a successful save or publish */
  dataSetChanged = output<TemplateDataSetDto>();

  /**
   * Обробник зміни підрозділу з дочірнього компонента
   */
  onUnitChange(updatedUnit: UnitTaskDto): void {
    const units = [...this.selectedUnits()];
    const unitIndex = units.findIndex((u) => u.id === updatedUnit.id);
    if (unitIndex !== -1) {
      units[unitIndex] = updatedUnit;
      this.selectedUnits.set(units);
      // hasUnsavedChanges НЕ встановлюємо тут — OneUnitTaskEditor сам управляє цим статусом
      // через hasUnsavedChanges.set() → effect → unsavedChangesChange.emit() → onUnitUnsavedChanges()
    }
  }

  /**
   * Обробник зміни стану збереження з дочірнього компонента OneUnitTaskEditor
   * Відстежує які карточки мають незбережені зміни
   */
  onUnitUnsavedChanges(unitId: string, hasUnsaved: boolean): void {
    const unsavedUnits = new Set(this.unitsWithUnsavedChanges());

    if (hasUnsaved) {
      unsavedUnits.add(unitId);
      this.hasUnsavedChanges.set(true);
    } else {
      unsavedUnits.delete(unitId);
    }

    this.unitsWithUnsavedChanges.set(unsavedUnits);
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
    const manualDate = parseDateString(inputElement.value);

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
    this.parentDocumentNumber.set(input.value.trim());
    this.hasUnsavedChanges.set(true);
  }

  /**
   * Обробник зміни дати документа
   */
  onDocumentDateChange(event: MatDatepickerInputEvent<Date>): void {
    const inputElement = event.targetElement as HTMLInputElement;

    // Пытаемся распарсить то, что ввел пользователь вручную
    const manualDate = parseDateString(inputElement.value);

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
    this.documentNumber.set(input.value.trim());
    this.hasUnsavedChanges.set(true);
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

  // ── Вибір підрозділу через діалог ─────
  private openUnitSelectDialog(onSelected: (unit: UnitTaskDto) => void): void {
    const titles: Record<string, string> = {
      unit: 'Вибір підрозділу',
      assigned: 'Приданий до підрозділу',
      involved: 'Екіпаж/Група',
    };

    const dialogRef = this.dialog.open(UnitSelectDialogComponent, {
      width: '900px',
      maxHeight: '90vh',
      data: { title: titles['unit'] },
    });

    dialogRef.afterClosed().subscribe((unit: UnitTaskDto | undefined) => {
      if (unit) {
        onSelected(unit);
      }
    });
  }

  openUnitSelect(): void {
    this.openUnitSelectDialog((unit) => {
      this.addUnitToSelection(unit.id);
    });
  }

  /**
   * Додає підрозділ до списку вибраних
   */
  addUnitToSelection(unitId: string) {
    const currentList = this.selectedUnits();
    // Перевіряємо, чи немає вже цього підрозділу в списку
    if (currentList.find((u) => u.unitId === unitId)) {
      this.snackBar.open('Цей підрозділ вже додано до переліку', 'Закрити', { duration: 3000 });
      return;
    }

    const dataSetId = this.dataSet()?.id;

    if (!dataSetId) {
      this.snackBar.open('Спочатку збережіть набір даних', 'Закрити', { duration: 3000 });
      return;
    }

    this.unitTaskService
      .createDefault(dataSetId, unitId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (unitTask) => {
          this.selectedUnits.set([...currentList, unitTask]);
        },
        error: (error) => {
          console.error('Помилка отримання чернетки завдання підрозділу:', error);
          const errorMessage = S5App_ErrorHandler.handleHttpError(
            error,
            'Помилка отримання чернетки завдання підрозділу',
          );
          this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
        },
      });
  }

  /**
   * Удаляет подразделение из списка выбранных
   * Изменение сохраняется автоматически в OneUnitTaskEditor
   * при удалении карточки, поэтому здесь просто обновляем список
   */
  removeUnitFromSelection(nodeId: string) {
    const currentList = this.selectedUnits();
    this.selectedUnits.set(currentList.filter((u) => u.id !== nodeId));
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
        switchMap((dataSet) =>
          this.unitTaskService
            .getAll({ dataSetId: dataSet.id })
            .pipe(map((unitTasks) => ({ dataSet, unitTasks }))),
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: ({ dataSet, unitTasks }) => {
          this.setDataSet(dataSet);
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
  async saveSelectedUnitsAsDataSet(): Promise<boolean> {
    if (this.selectedUnits().length === 0) {
      this.snackBar.open('Немає вибраних підрозділів для збереження', 'Закрити', {
        duration: 3000,
      });
      return false;
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
        return false;
      }

      if (
        !this.checkRequiredField(
          this.parentDocumentNumber(),
          this.parentNumberInput,
          'Заповніть номер документа старшого начальника',
        )
      ) {
        return false;
      }
    }

    if (!this.checkRequiredField(this.documentDate(), this.dateInput, 'Заповніть дату документа')) {
      return false;
    }

    if (
      !this.checkRequiredField(this.documentNumber(), this.numberInput, 'Заповніть номер документа')
    ) {
      return false;
    }

    // Генеруємо назву на основі дати та номера документа
    const dateStr = new Intl.DateTimeFormat('uk-UA').format(this.documentDate()!);
    const dataSetName = `Дані документа від ${dateStr} № ${this.documentNumber()}`;

    this.isSaving.set(true);

    // dataSet гарантовано існує на сервері: або завантажений через loadDataSet(),
    // або щойно створений через createNewDataSet() — мертва гілка "create" видалена.
    const currentDataSet = this.dataSet()!;

    const updateDto: TemplateDataSetDto = {
      ...currentDataSet,
      name: dataSetName,
      isParentDocUsed: this.isParentDocUsed(),
      parentDocNumber: this.isParentDocUsed() ? this.parentDocumentNumber() : null,
      parentDocDate: this.isParentDocUsed() ? this.parentDocumentDate() : null,
      docNumber: this.documentNumber(),
      docDate: this.documentDate()!,
    };

    try {
      const savedDto = await firstValueFrom(
        this.dataSetService
          .updateDataSet(currentDataSet.id, updateDto)
          .pipe(takeUntilDestroyed(this.destroyRef)),
      );
      //Зберігаємо картки підрозділів тільки після успішного збереження даних набору,
      // щоб не втратити зміни через асинхронне оновлення після збереження
      const saved = await this.saveUnitTasks();
      if (saved) {
        this.dataSet.set(savedDto);
        this.dataSetChanged.emit(savedDto);
      }
      return saved;
    } catch (error) {
      this.isSaving.set(false);
      console.error('Error saving dataset:', error);
      const errorMessage = S5App_ErrorHandler.handleHttpError(error, 'Помилка збереження даних');
      this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
      return false;
    }
  }

  /**
   * Зберігає UnitTask для кожного підрозділу
   * Координує збереження через виклик card.saveUnitTask()
   */
  private async saveUnitTasks(): Promise<boolean> {
    const cards = this.unitTaskCards.toArray();

    if (cards.length === 0) {
      this.snackBar.open('Немає підрозділів для збереження', 'Закрити', { duration: 3000 });
      this.isSaving.set(false);
      return false;
    }

    try {
      let successCount = 0;
      const errors: string[] = [];

      // Зберігаємо кожну картку послідовно
      for (const card of cards) {
        const [success, errorMsg] = await card.saveUnitTask();
        if (success) {
          successCount++;
        } else {
          if (errorMsg) {
            errors.push(errorMsg);
          }
        }
      }

      this.isSaving.set(false);

      if (errors.length === 0) {
        this.hasUnsavedChanges.set(false);
        this.unitsWithUnsavedChanges.set(new Set()); // Очищуємо множину не збережених карточек
        this.snackBar.open(`Дані ${successCount} підрозділів збережено`, 'Закрити', {
          duration: 3000,
        });
        return true;
      } else {
        this.snackBar.openFromComponent(ErrorListSnackBarComponent, {
          data: errors,
          duration: 10000,
        });
        return false;
      }
    } catch (error) {
      this.isSaving.set(false);
      console.error('Помилка збереження завдань підрозділів:', error);
      const errorMessage = S5App_ErrorHandler.handleHttpError(
        error,
        'Помилка збереження завдань підрозділів',
      );
      this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
      return false;
    }
  }

  /**
   * Створює новий набір даних і відкриває діалог вибору підрозділу для першого додавання
   */
  createNewDataSet(): void {
    // Перевіряємо наявність незбережених змін
    if (!this.checkUnsavedChanges()) {
      return;
    }

    /**
     * Відкриваємо діалог створення нового набору даних (дата та номер документа)
     */
    const dialogRef = this.dialog.open(CreateDataSetDialogComponent, {
      width: '480px',
      maxHeight: '90vh',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result: TemplateDataSetCreateDto | undefined) => {
      if (!result) { return; }

      this.setDataSet(null);
      this.selectedUnits.set([]);

      this.openUnitSelectDialog((unit) => {
        this.dataSetService
          .createDataSet(result)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: (newDataSet) => {
              this.setDataSet(newDataSet);
              this.dataSetChanged.emit(newDataSet);
              this.addUnitToSelection(unit.id);
              this.snackBar.open('Створено новий набір даних і додано підрозділ', 'Закрити', {
                duration: 3000,
              });
            },
            error: (error) => {
              console.error('Помилка створення нового набору даних:', error);
              const errorMessage = S5App_ErrorHandler.handleHttpError(
                error,
                'Помилка створення нового набору даних',
              );
              this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
            },
          });
      });
    });
  }

  /**
   * Обробник зміни статусу публікації
   */
  async onPublishStatusChange(isPublished: boolean): Promise<void> {
    const initialDataSet = this.dataSet();
    if (!initialDataSet) {
      this.publishStatusControl.setValue(false, { emitEvent: false });
      this.snackBar.open('Набір даних не завантажено', 'Закрити', { duration: 3000 });
      return;
    }
    const oldStatus = initialDataSet.isPublished;
    const cards = this.unitTaskCards.toArray();
    if (cards.length === 0) {
      this.publishStatusControl.setValue(oldStatus, { emitEvent: false });
      this.snackBar.open('У наборі даних відсутні підрозділи', 'Закрити', { duration: 3000 });
      return;
    }

    //Если необходимо - сохраняем изменения перед публикацией,
    // чтобы не потерять данные из-за асинхронного обновления после сохранения
    if (this.hasUnsavedChanges()) {
      const saveSuccess = await this.saveSelectedUnitsAsDataSet();
      if (!saveSuccess) {
        // Если сохранение не удалось, возвращаем переключатель в исходное состояние
        this.publishStatusControl.setValue(oldStatus, { emitEvent: false });
        return;
      }
    }

    this.isSaving.set(true);
    try {
      // Координуємо зміну статусу публікації з кожною карткою підрозділу
      const publishErrors: string[] = [];
      for (const card of cards) {
        const [success, errorMsg] = await card.publishUnitTask(isPublished);
        if (!success && errorMsg) {
          publishErrors.push(errorMsg);
        }
      }
      if (publishErrors.length > 0) {
        this.publishStatusControl.setValue(oldStatus, { emitEvent: false });
        this.snackBar.openFromComponent(ErrorListSnackBarComponent, {
          data: publishErrors,
          duration: 10000,
        });
        return;
      }

      // После сохранения данных набора тут не может быть null
      const currentDataSet = this.dataSet()!;
      const updatedDataSet = await firstValueFrom(
        this.dataSetService
          .publish(currentDataSet.id, isPublished)
          .pipe(takeUntilDestroyed(this.destroyRef)),
      );

      this.setDataSet(updatedDataSet);
      this.dataSetChanged.emit(updatedDataSet);

      const statusText = isPublished ? 'опубліковано' : 'знято з публікації';
      this.snackBar.open(`Набір "${currentDataSet.name}" ${statusText}`, 'Закрити', {
        duration: 3000,
      });
    } catch (error) {
      this.publishStatusControl.setValue(oldStatus, { emitEvent: false });
      console.error('Error changing publish status:', error);
      const errorMessage = S5App_ErrorHandler.handleHttpError(
        error,
        'Помилка зміни статусу публікації',
      );
      this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
    } finally {
      this.isSaving.set(false);
    }
  }

  /**
   * Встановлює поточний DataSet і синхронізує всі поля форми.
   * При null — скидає форму до значень за замовчуванням.
   */
  private setDataSet(dataSet: TemplateDataSetDto | null): void {
    this.dataSet.set(dataSet);

    if (!dataSet) {
      this.isParentDocUsed.set(false);
      this.parentDocumentDate.set(null);
      this.parentDocumentNumber.set('');
      this.documentDate.set(new Date());
      this.documentNumber.set('');
      this.publishStatusControl.setValue(false, { emitEvent: false });
      return;
    }

    this.isParentDocUsed.set(dataSet.isParentDocUsed);
    this.parentDocumentDate.set(dataSet.parentDocDate ?? null);
    this.parentDocumentNumber.set(dataSet.parentDocNumber || '');
    this.documentDate.set(dataSet.docDate ?? new Date());
    this.documentNumber.set(dataSet.docNumber || '');
    this.publishStatusControl.setValue(dataSet.isPublished, { emitEvent: false });
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
  /**
   * Форматує дату у читабельний формат
   */
  formatDate(date: Date | string | null | undefined): string {
    return formatDate(date);
  }
}
