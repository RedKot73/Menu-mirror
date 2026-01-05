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
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';

import { UnitTreeComponent } from '../Unit/UnitTree.component';
import { UnitTreeNode } from '../Unit/unit-tree-node.component';
import { DataSetTableComponent } from '../DocumentTemplates/components/DataSetTable.component';
import { TemplateDataSetListItem } from '../DocumentTemplates/models/template-dataset.models';
import { UnitsTaskEditorComponent } from '../DocumentTemplates/components/UnitsTaskEditor.component';

@Component({
  selector: 'app-test-page',
  imports: [
    CommonModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatMenuModule,
    MatDividerModule,
    MatTabsModule,
    UnitTreeComponent,
    DataSetTableComponent,
    UnitsTaskEditorComponent,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './DocumentDataSet.page.html',
  styleUrls: ['./DocumentDataSet.page.scss', '../Soldier/Soldier.component.scss'],
})
export class TestComponent implements AfterViewInit, OnDestroy {
  breakpointObserver = inject(BreakpointObserver);

  // --- ViewChild References ---
  @ViewChild('containerRef') containerRef!: ElementRef<HTMLElement>;
  @ViewChild(UnitTreeComponent) unitTree!: UnitTreeComponent;
  @ViewChild('unitsTaskEditor') unitsTaskEditor!: UnitsTaskEditorComponent;

  // --- UI State Signals ---
  navPanelWidth = signal(this.getSavedNavPanelWidth());
  isDragging = signal(false);
  isNavPanelCollapsed = signal(this.getSavedNavPanelState());

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
  loadUnitTree() {
    this.unitTree?.refresh();
  }

  /**
   * Добавляет подразделение в список выбранных
   */
  addUnitToSelection(node: UnitTreeNode) {
    this.unitsTaskEditor.addUnitToSelection(node.id);
  }

  /**
   * Загружает полный DataSet с особовим складом через API
   */
  onDataSetSelected(dataSet: TemplateDataSetListItem | null) {
    if (!dataSet) {
      return;
    }
    this.unitsTaskEditor.loadDataSet(dataSet.id);
  }

  /**
   * Створює новий набір даних (очищає форму)
   */
  createNewDataSet(): void {
    this.unitsTaskEditor.createNewDataSet();
  }
}
