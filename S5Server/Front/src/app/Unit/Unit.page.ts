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
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';

import { UnitService, UnitDto, UnitTreeItemDto } from '../../ServerService/unit.service';
import { UnitTreeComponent } from './UnitTree.component';
import { UnitTableComponent } from './UnitTable.component';
import { UnitContentComponent } from './UnitContent.component';
import { UnitTreeNode } from './unit-tree-node.component';
import { UnitDialogComponent } from '../dialogs/UnitDialog';
import { InvolvedUnitDialogComponent } from '../dialogs/InvolvedUnitDialog';
import { ConfirmDialogComponent } from '../dialogs/ConfirmDialog.component';
import { S5App_ErrorHandler } from '../shared/models/ErrorHandler';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Crew_GUID, NULL_GUID } from './unit.constants';

export type Unit = UnitDto;

@Component({
  selector: 'app-units-page',
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatDividerModule,
    MatTooltipModule,
    UnitTreeComponent,
    UnitTableComponent,
    UnitContentComponent,
  ],
  templateUrl: './Unit.page.html',
  styleUrl: './Unit.page.scss',
})
export class UnitsComponent implements AfterViewInit, OnDestroy {
  unitService = inject(UnitService);
  dialog = inject(MatDialog);
  breakpointObserver = inject(BreakpointObserver);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  // ViewChild references
  @ViewChild('containerRef') containerRef!: ElementRef<HTMLElement>;
  @ViewChild(UnitTreeComponent) unitTree!: UnitTreeComponent;

  // State signals
  selectedUnit = signal<UnitDto | null>(null);
  viewMode = signal<'tree' | 'table'>(this.getSavedViewMode());

  // Panel signals (replacing sidenav signals)
  navPanelWidth = signal(this.getSavedNavPanelWidth());
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
  isDragging = signal(false);
  isNavPanelCollapsed = signal(this.getSavedNavPanelState());

  // Panel constants
  private readonly SPLITTER_WIDTH_PX = 6;
  private readonly MIN_PANEL_WIDTH_PERCENT = 20;
  private readonly MAX_PANEL_WIDTH_PERCENT = 100 - this.MIN_PANEL_WIDTH_PERCENT;

  private lastNavPanelWidth = this.getSavedNavPanelWidth();
  private startX = 0;
  private startNavWidth = 0;
  private containerWidth = 0;

  // Event handlers
  private onMouseMoveHandler = this.onMouseMove.bind(this);
  private onMouseUpHandler = this.onMouseUp.bind(this);

  // Computed signals
  selectedUnitTitle = computed(() => {
    const unit = this.selectedUnit();
    return unit ? `${unit.name} (${unit.shortName})` : 'Підрозділи';
  });

  // Computed signal for tree loading state
  loading = computed(() => {
    return this.unitTree?.loading() ?? false;
  });

  isMobile = computed(() => this.breakpointObserver.isMatched([Breakpoints.Handset]));

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

  // --- Methods ---

  /** Updates the width of the container, minus the splitter width. */
  private updateContainerWidth(): void {
    if (this.containerRef) {
      this.containerWidth = this.containerRef.nativeElement.offsetWidth - this.SPLITTER_WIDTH_PX;
    }
  }

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
      Math.min(this.MAX_PANEL_WIDTH_PERCENT, newNavWidth),
    );

    this.navPanelWidth.set(newNavWidth);
  }

  private onMouseUp() {
    this.isDragging.set(false);
    this.saveNavPanelWidth(this.navPanelWidth());
    this.cleanupDragListeners();
  }

  private cleanupDragListeners(): void {
    document.removeEventListener('mousemove', this.onMouseMoveHandler);
    document.removeEventListener('mouseup', this.onMouseUpHandler);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }

  private getSavedNavPanelState(): boolean {
    const saved = localStorage.getItem('unitNavPanelCollapsed');
    return saved !== null ? saved === 'true' : false;
  }

  private getSavedNavPanelWidth(): number {
    const saved = localStorage.getItem('unitNavPanelWidth');
    return saved !== null ? parseInt(saved, 10) : 50;
  }

  private saveNavPanelState(collapsed: boolean) {
    localStorage.setItem('unitNavPanelCollapsed', collapsed.toString());
  }

  private saveNavPanelWidth(width: number) {
    localStorage.setItem('unitNavPanelWidth', width.toString());
  }

  private getSavedViewMode(): 'tree' | 'table' {
    const saved = localStorage.getItem('unitViewMode');
    return (saved === 'table' ? 'table' : 'tree') as 'tree' | 'table';
  }

  private saveViewMode(mode: 'tree' | 'table'): void {
    localStorage.setItem('unitViewMode', mode);
  }

  onViewModeChange(mode: 'tree' | 'table'): void {
    this.viewMode.set(mode);
    this.saveViewMode(mode);
  }

  /** Переключает состояние навигационной панели (свернута/развернута) */
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
   * Recalculate container width on window resize to ensure correct boundary checks
   * and percentage calculations on the next drag operation.
   */
  @HostListener('window:resize')
  onWindowResize() {
    // Update container width on resize
    this.updateContainerWidth();

    // Re-clamp current width within fixed percentage bounds
    const currentNavWidth = this.navPanelWidth();
    const clampedNavWidth = Math.max(
      this.MIN_PANEL_WIDTH_PERCENT,
      Math.min(this.MAX_PANEL_WIDTH_PERCENT, currentNavWidth),
    );

    if (clampedNavWidth !== currentNavWidth) {
      this.navPanelWidth.set(clampedNavWidth);
    }
  }

  onUnitSelected(unit: UnitTreeItemDto | UnitDto) {
    // Получаем полную информацию о подразделении
    this.unitService.getById(unit.id).subscribe((fullUnit) => {
      this.selectedUnit.set(fullUnit);

      // Закрываем навигационную панель на мобильных после выбора
      if (this.isMobile()) {
        this.isNavPanelCollapsed.set(true);
      }
    });
  }

  onUnitUpdated(unit?: UnitTreeItemDto) {
    // Если обновленное подразделение - это текущее выбранное, обновляем его
    const currentSelected = this.selectedUnit();
    if (unit && currentSelected && currentSelected.id === unit.id) {
      // Получаем полную обновленную информацию
      this.unitService.getById(unit.id).subscribe((fullUnit) => {
        this.selectedUnit.set(fullUnit);
      });
    }
  }

  /**
   * Обновляет дерево подразделений
   */
  refresh() {
    this.unitTree?.refresh();
  }

  /**
   * Открывает диалог создания нового корневого подразделения
   */
  CreateUnit() {
    const dialogRef = this.dialog.open(UnitDialogComponent, {
      width: '600px',
      data: {
        id: '',
        name: '',
        shortName: '',
        militaryNumber: '',
        forceTypeId: undefined,
        unitTypeId: undefined,
        parentId: NULL_GUID,
        assignedUnitId: undefined,
        orderVal: 1,
        isInvolved: false,
        comment: '',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.unitService
          .create({
            name: result.name,
            shortName: result.shortName,
            militaryNumber: result.militaryNumber,
            forceTypeId: result.forceTypeId,
            unitTypeId: result.unitTypeId,
            parentId: result.parentId,
            assignedUnitId: result.assignedUnitId,
            orderVal: result.orderVal,
            isInvolved: result.isInvolved,
            comment: result.comment,
          })
          .subscribe({
            next: () => {
              if (this.unitTree) {
                this.unitTree.refresh();
              }
              this.onUnitUpdated();
              this.snackBar.open('Підрозділ успішно створено', 'Закрити', { duration: 3000 });
            },
            error: (error) => {
              console.error('Помилка створення підрозділу:', error);
              const errorMessage = S5App_ErrorHandler.handleHttpError(
                error,
                'Помилка створення підрозділу',
              );
              this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
            },
          });
      }
    });
  }

  /**
   * Добавляет дочерний подразделение к узлу
   */
  addChild(node: UnitTreeNode | UnitDto) {
    const dialogRef = this.dialog.open(UnitDialogComponent, {
      width: '600px',
      data: {
        id: '',
        name: '',
        shortName: '',
        militaryNumber: '',
        forceTypeId: node.forceTypeId,
        unitTypeId: undefined,
        parentId: node.id,
        assignedUnitId: undefined,
        orderVal: 1,
        isInvolved: false,
        comment: '',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.unitService
          .create({
            name: result.name,
            shortName: result.shortName,
            militaryNumber: result.militaryNumber,
            forceTypeId: result.forceTypeId,
            unitTypeId: result.unitTypeId,
            parentId: result.parentId,
            assignedUnitId: result.assignedUnitId,
            orderVal: result.orderVal,
            isInvolved: result.isInvolved,
            comment: result.comment,
          })
          .subscribe({
            next: () => {
              if (this.unitTree) {
                this.unitTree.refresh();
              }
              this.onUnitUpdated();
              this.snackBar.open('Дочірній підрозділ успішно створено', 'Закрити', {
                duration: 3000,
              });
            },
            error: (error) => {
              console.error('Помилка створення дочірнього підрозділу:', error);
              const errorMessage = S5App_ErrorHandler.handleHttpError(
                error,
                'Помилка створення дочірнього підрозділу',
              );
              this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
            },
          });
      }
    });
  }

  /**
   * Додає оперативний підрозділ до вузла
   */
  addInvolvedChild(node: UnitTreeNode | UnitDto) {
    const dialogRef = this.dialog.open(InvolvedUnitDialogComponent, {
      width: '600px',
      data: {
        id: '',
        name: '',
        shortName: '',
        militaryNumber: '',
        forceTypeId: node.forceTypeId,
        unitTypeId: Crew_GUID,
        parentId: node.id,
        assignedUnitId: undefined,
        orderVal: 1,
        isInvolved: true,
        comment: '',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.unitService
          .create({
            name: result.shortName,
            shortName: result.shortName,
            militaryNumber: '',
            forceTypeId: node.forceTypeId,
            unitTypeId: Crew_GUID,
            parentId: node.id,
            assignedUnitId: undefined,
            orderVal: result.orderVal,
            isInvolved: true,
            comment: result.comment,
          })
          .subscribe({
            next: () => {
              if (this.unitTree) {
                this.unitTree.refresh();
              }
              this.onUnitUpdated();
              this.snackBar.open('Екіпаж/Група успішно створено', 'Закрити', {
                duration: 3000,
              });
            },
            error: (error) => {
              console.error('Помилка створення Екіпаж/Група:', error);
              const errorMessage = S5App_ErrorHandler.handleHttpError(
                error,
                'Помилка створення Екіпаж/Група',
              );
              this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
            },
          });
      }
    });
  }

  /**
   * Редактирует подразделение
   */
  edit(node: UnitTreeNode | UnitDto) {
    if (node.isInvolved) {
      this.editInvolvedUnit(node);
      return;
    }
    this.editRegularUnit(node);
  }

  /**
   * Редактирует обычное подразделение
   */
  private editRegularUnit(node: UnitTreeNode | UnitDto) {
    const dialogRef = this.dialog.open(UnitDialogComponent, {
      width: '600px',
      data: { ...node },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const unit = result as UnitDto; //UnitTreeItemDto;
        this.unitService.update(unit.id, unit).subscribe({
          next: () => {
            // Обновляем дерево если оно доступно
            if (this.unitTree) {
              this.unitTree.refresh();
            }

            // Уведомляем о том, что подразделение обновлено
            this.onUnitUpdated();
            this.snackBar.open('Підрозділ успішно оновлено', 'Закрити', { duration: 3000 });
          },
          error: (error) => {
            console.error('Помилка оновлення підрозділу:', error);
            const errorMessage = S5App_ErrorHandler.handleHttpError(
              error,
              'Помилка оновлення підрозділу',
            );
            this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
          },
        });
      }
    });
  }

  /**
   * Редагує оперативний підрозділ
   */
  private editInvolvedUnit(node: UnitTreeNode | UnitDto) {
    const dialogRef = this.dialog.open(InvolvedUnitDialogComponent, {
      width: '600px',
      data: { ...node },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const unit = result as UnitDto;
        this.unitService.update(unit.id, unit).subscribe({
          next: () => {
            // Обновляем дерево если оно доступно
            if (this.unitTree) {
              this.unitTree.refresh();
            }

            // Уведомляем о том, что подразделение обновлено
            this.onUnitUpdated();
            this.snackBar.open('Підрозділ успішно оновлено', 'Закрити', { duration: 3000 });
          },
          error: (error) => {
            console.error('Помилка оновлення підрозділу:', error);
            const errorMessage = S5App_ErrorHandler.handleHttpError(
              error,
              'Помилка оновлення підрозділу',
            );
            this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
          },
        });
      }
    });
  }

  /**
   * Удаляет подразделение
   */
  delete(node: UnitTreeNode | UnitDto) {
    const hasChildren = (node as UnitTreeNode).hasChildren || false;

    if (hasChildren) {
      this.dialog.open(ConfirmDialogComponent, {
        width: '360px',
        data: {
          title: 'Неможливо видалити',
          message: `Підрозділ "${node.name}" має дочірні підрозділи. Спочатку видаліть або перемістіть дочірні підрозділи.`,
          confirmText: 'OK',
          cancelText: '',
          color: 'primary',
          icon: 'warning',
        },
      });
      return;
    }

    const ref = this.dialog.open(ConfirmDialogComponent, {
      width: '360px',
      autoFocus: false,
      data: {
        title: 'Видалення підрозділу',
        message: `Ви впевнені, що хочете видалити підрозділ "${node.name}"?`,
        confirmText: 'Видалити',
        cancelText: 'Відмінити',
        color: 'warn',
        icon: 'warning',
      },
    });

    ref.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.unitService.delete(node.id).subscribe({
          next: () => {
            if (this.unitTree) {
              this.unitTree.refresh();
            }
            this.onUnitUpdated();
            this.snackBar.open('Підрозділ успішно видалено', 'Закрити', { duration: 3000 });
          },
          error: (error) => {
            console.error('Помилка видалення підрозділу:', error);
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

  moveUpDown(node: UnitTreeNode | UnitDto, moveUp: boolean) {
    this.unitService.moveUpDown(node.id, moveUp).subscribe({
      next: () => {
        if (this.unitTree) {
          this.unitTree.refresh();
        }
        this.onUnitUpdated();
        this.snackBar.open(`Підрозділ успішно переміщено ${moveUp ? 'вгору' : 'вниз'}`, 'Закрити', {
          duration: 3000,
        });
      },
      error: (error) => {
        console.error('Помилка переміщення підрозділу:', error);
        const errorMessage = S5App_ErrorHandler.handleHttpError(
          error,
          'Помилка переміщення підрозділу',
        );
        this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
      },
    });
  }

  importSoldiers(node: UnitTreeNode | UnitDto) {
    // Навігація на сторінку імпорту з передачею unitId як query параметра
    this.router.navigate(['/unit/import'], {
      queryParams: { unitId: node.id },
    });
  }
}
