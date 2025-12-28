import {
  Component,
  inject,
  signal,
  computed,
  effect,
  HostListener,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule, SlicePipe, DatePipe, AsyncPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog } from '@angular/material/dialog';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, startWith, finalize } from 'rxjs/operators';

import { UnitService, UnitDataSetDto } from '../Unit/services/unit.service';
import { UnitTreeComponent } from '../Unit/UnitTree.component';
import { UnitTreeNode } from '../Unit/unit-tree-node.component';
import { JsonEditorDialogComponent } from '../DocumentTemplates/components/JsonEditorDialog.component';
import { ErrorHandler } from '../shared/models/ErrorHandler';
import { DictDroneModelService } from '../../ServerService/dictDroneModel.service';
import { LookupDto } from '../shared/models/lookup.models';
import { TemplateDataSetService } from '../DocumentTemplates/services/template-dataset.service';
import { TemplateDataSetCreateDto } from '../DocumentTemplates/models/template-dataset.models';
import {
  isCriticalStatus,
  isSevereStatus,
  isProblematicStatus,
  isRecoveryStatus,
} from '../Soldier/Soldier.constant';

@Component({
  selector: 'app-test-page',
  imports: [
    CommonModule,
    SlicePipe,
    DatePipe,
    AsyncPipe,
    ReactiveFormsModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatTableModule,
    MatSortModule,
    MatMenuModule,
    MatDividerModule,
    MatAutocompleteModule,
    UnitTreeComponent,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './Test.page.html',
  styleUrls: ['./Test.page.scss', '../Soldier/Soldier.component.scss'],
})
export class TestComponent implements AfterViewInit, OnDestroy {
  // --- Injected Dependencies ---
  private unitService = inject(UnitService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);
  private dictDroneModelService = inject(DictDroneModelService);
  private dataSetService = inject(TemplateDataSetService);
  breakpointObserver = inject(BreakpointObserver);

  // --- ViewChild References ---
  @ViewChild('containerRef') containerRef!: ElementRef<HTMLElement>;
  @ViewChild(UnitTreeComponent) unitTree!: UnitTreeComponent;

  // --- UI State Signals ---
  navPanelWidth = signal(this.getSavedNavPanelWidth());
  isDragging = signal(false);
  isNavPanelCollapsed = signal(this.getSavedNavPanelState());

  // --- Selected Units List with DataSets ---
  selectedUnits = signal<UnitDataSetDto[]>([]);

  // --- Document Info ---
  documentDate = signal<Date>(new Date());
  documentNumber = signal<string>('');

  // --- Save State ---
  isSaving = signal<boolean>(false);

  // --- Drone Model Autocomplete ---
  droneModelSearchControls = new Map<string, FormControl<LookupDto | string | null>>();
  filteredDroneModels = new Map<string, Observable<LookupDto[]>>();
  isLoadingDroneModels = new Map<string, boolean>();
  selectedDroneModels = new Map<string, LookupDto | null>();

  // --- Table Configuration ---
  displayedColumns = [
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

  // --- Computed Signals ---
  contentPanelWidth = computed(() => {
    const isCollapsed = this.isNavPanelCollapsed();
    const navWidth = this.navPanelWidth();

    // Если панель свернута, контент занимает всю ширину
    if (isCollapsed) {
      return 100;
    }

    // Если панель развернута, вычисляем оставшуюся ширину
    return 100 - navWidth;
  });

  isMobile = computed(() => this.breakpointObserver.isMatched([Breakpoints.Handset]));
  // Computed signal for tree loading state
  loading = computed(() => {
    return this.unitTree?.loading() ?? false;
  });

  // --- Constants ---
  private readonly SPLITTER_WIDTH_PX = 6;
  private readonly MIN_PANEL_WIDTH_PERCENT = 20;
  private readonly MAX_PANEL_WIDTH_PERCENT = 100 - this.MIN_PANEL_WIDTH_PERCENT;

  // --- Private Variables ---
  private lastNavPanelWidth = this.getSavedNavPanelWidth();
  private startX = 0;
  private startNavWidth = 0;
  private containerWidth = 0;

  // --- Event Handlers ---
  private onMouseMoveHandler = this.onMouseMove.bind(this);
  private onMouseUpHandler = this.onMouseUp.bind(this);

  // --- Constructor ---
  constructor() {
    // Закрываем навигационную панель на мобильных устройствах при старте
    effect(() => {
      if (this.isMobile() && !this.isNavPanelCollapsed()) {
        this.isNavPanelCollapsed.set(true);
      }
    });
  }

  // --- Lifecycle Hooks ---
  ngAfterViewInit(): void {
    // Initial width calculation
    this.updateContainerWidth();
  }

  ngOnDestroy(): void {
    // Ensure cleanup in case of component destruction during dragging
    if (this.isDragging()) {
      this.cleanupDragListeners();
      this.isDragging.set(false);
    }
  }

  // --- Public Methods ---

  /**
   * Начинает процесс перетаскивания разделителя панелей.
   * Инициализирует обработчики событий мыши и устанавливает начальные значения.
   * @param event - Событие mousedown
   */
  startDrag(event: MouseEvent) {
    // Не начинаем перетаскивание, если кликнули по кнопке
    if ((event.target as HTMLElement).closest('.toggle-btn')) {
      return;
    }

    // Не позволяем перетаскивать, если панель свернута
    if (this.isNavPanelCollapsed()) {
      return;
    }

    event.preventDefault();
    this.isDragging.set(true);

    // Recalculate container width at the start of drag
    this.updateContainerWidth();

    this.startX = event.clientX;
    this.startNavWidth = this.navPanelWidth();

    document.addEventListener('mousemove', this.onMouseMoveHandler);
    document.addEventListener('mouseup', this.onMouseUpHandler);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }

  /**
   * Переключает состояние навигационной панели (свернута/развернута).
   * Сохраняет состояние в localStorage.
   */
  toggleNavPanel(): void {
    if (this.isNavPanelCollapsed()) {
      // Разворачиваем панель
      this.navPanelWidth.set(this.lastNavPanelWidth);
      this.isNavPanelCollapsed.set(false);
      this.saveNavPanelState(false);
    } else {
      // Сворачиваем панель
      this.lastNavPanelWidth = this.navPanelWidth();
      this.saveNavPanelWidth(this.lastNavPanelWidth);
      this.navPanelWidth.set(0);
      this.isNavPanelCollapsed.set(true);
      this.saveNavPanelState(true);
    }
  }

  /**
   * Обработчик изменения размера окна.
   * Пересчитывает ширину контейнера и корректирует ширину панелей при необходимости.
   */
  @HostListener('window:resize')
  onWindowResize() {
    // Update container width on resize
    this.updateContainerWidth();

    // Re-clamp current width within fixed percentage bounds
    const currentNavWidth = this.navPanelWidth();
    const clampedNavWidth = Math.max(
      this.MIN_PANEL_WIDTH_PERCENT,
      Math.min(this.MAX_PANEL_WIDTH_PERCENT, currentNavWidth)
    );

    if (clampedNavWidth !== currentNavWidth) {
      this.navPanelWidth.set(clampedNavWidth);
    }
  }

  // --- Private Methods ---

  /**
   * Обновляет ширину контейнера, вычитая ширину разделителя.
   */
  private updateContainerWidth(): void {
    if (this.containerRef) {
      this.containerWidth = this.containerRef.nativeElement.offsetWidth - this.SPLITTER_WIDTH_PX;
    }
  }

  /**
   * Обработчик перемещения мыши во время перетаскивания.
   * Вычисляет новую ширину панели на основе смещения курсора.
   */
  private onMouseMove(event: MouseEvent) {
    if (!this.isDragging() || this.containerWidth <= 0) {
      return;
    }

    const deltaX = event.clientX - this.startX;
    const deltaPercent = (deltaX / this.containerWidth) * 100;
    let newNavWidth = this.startNavWidth + deltaPercent;

    // Use fixed percentage limits to avoid conflicts with CSS min-width
    newNavWidth = Math.max(
      this.MIN_PANEL_WIDTH_PERCENT,
      Math.min(this.MAX_PANEL_WIDTH_PERCENT, newNavWidth)
    );

    this.navPanelWidth.set(newNavWidth);
  }

  /**
   * Обработчик отпускания кнопки мыши после перетаскивания.
   * Завершает процесс перетаскивания и сохраняет новую ширину.
   */
  private onMouseUp() {
    this.isDragging.set(false);
    this.saveNavPanelWidth(this.navPanelWidth());
    this.cleanupDragListeners();
  }

  /**
   * Удаляет обработчики событий мыши и восстанавливает стандартный курсор.
   */
  private cleanupDragListeners(): void {
    document.removeEventListener('mousemove', this.onMouseMoveHandler);
    document.removeEventListener('mouseup', this.onMouseUpHandler);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }

  // --- LocalStorage Methods ---

  /**
   * Получает сохраненное состояние навигационной панели из localStorage.
   * @returns true если панель была свернута, false если развернута
   */
  private getSavedNavPanelState(): boolean {
    const saved = localStorage.getItem('testNavPanelCollapsed');
    return saved !== null ? saved === 'true' : false;
  }

  /**
   * Получает сохраненную ширину навигационной панели из localStorage.
   * @returns Ширина панели в процентах (по умолчанию 50%)
   */
  private getSavedNavPanelWidth(): number {
    const saved = localStorage.getItem('testNavPanelWidth');
    return saved !== null ? parseInt(saved, 10) : 50;
  }

  /**
   * Сохраняет состояние навигационной панели в localStorage.
   * @param collapsed - true если панель свернута, false если развернута
   */
  private saveNavPanelState(collapsed: boolean) {
    localStorage.setItem('testNavPanelCollapsed', collapsed.toString());
  }

  /**
   * Сохраняет ширину навигационной панели в localStorage.
   * @param width - Ширина панели в процентах
   */
  private saveNavPanelWidth(width: number) {
    localStorage.setItem('testNavPanelWidth', width.toString());
  }

  /**
   * Обновляет дерево подразделений
   */
  refresh() {
    this.unitTree?.refresh();
  }

  /**
   * Добавляет подразделение в список выбранных
   * Загружает полный DataSet с особовим складом через API
   */
  addUnitToSelection(node: UnitTreeNode) {
    const currentList = this.selectedUnits();
    // Проверяем, нет ли уже этого подразделения в списке
    if (currentList.find((u) => u.id === node.id)) {
      return;
    }

    // Загружаем полный DataSet подразделения через UnitService
    this.unitService.getUnitDataSet(node.id).subscribe({
      next: (unitDataSet) => {
        this.selectedUnits.set([...currentList, unitDataSet]);
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
    // TODO: Зберегти вибрану модель в дані підрозділу
    console.log(`Selected drone model for unit ${unitId}:`, selectedDroneModel);
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
    const dataToSave = {
      documentDate: this.documentDate().toISOString(),
      documentNumber: this.documentNumber(),
      units: this.selectedUnits().map((unit) => ({
        id: unit.id,
        shortName: unit.shortName,
        unitType: unit.unitType,
        parentShortName: unit.parentShortName,
        assignedShortName: unit.assignedShortName,
        comment: unit.comment,
        soldiers: unit.soldiers.map((soldier) => ({
          fio: soldier.fio,
          nickName: soldier.nickName,
          rankShortValue: soldier.rankShortValue,
          positionValue: soldier.positionValue,
          stateValue: soldier.stateValue,
          assignedUnitShortName: soldier.assignedUnitShortName,
          arrivedAt: soldier.arrivedAt,
          departedAt: soldier.departedAt,
          comment: soldier.comment,
        })),
        selectedDroneModel: this.selectedDroneModels.get(unit.id),
      })),
      savedAt: new Date().toISOString(),
    };

    const dataJson = JSON.stringify(dataToSave, null, 2);

    // Валідація JSON
    try {
      JSON.parse(dataJson);
    } catch (e) {
      const errorMessage = ErrorHandler.handleJsonError(e);
      this.snackBar.open(errorMessage, 'Закрити', { duration: 7000 });
      return;
    }

    // Генеруємо назву на основі дати та номера документа
    const dateStr = this.documentDate().toLocaleDateString('uk-UA');
    const docNum = this.documentNumber() || 'без номера';
    const dataSetName = `Дані документа від ${dateStr} № ${docNum}`;

    const createDto: TemplateDataSetCreateDto = {
      name: dataSetName,
      dataJson: dataJson,
      isPublished: false,
    };

    this.isSaving.set(true);

    this.dataSetService.createDataSet(createDto).subscribe({
      next: (createdDataSet) => {
        this.isSaving.set(false);
        this.snackBar.open(`Дані успішно збережено як набір "${createdDataSet.name}"`, 'Закрити', {
          duration: 5000,
        });
      },
      error: (error) => {
        this.isSaving.set(false);
        console.error('Error saving dataset:', error);
        const errorMessage = ErrorHandler.handleHttpError(error, 'Помилка збереження даних');
        this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
      },
    });
  }
}
