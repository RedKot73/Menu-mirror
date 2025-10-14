import { Component, inject, signal, computed, effect,
    HostListener, ElementRef, ViewChild, AfterViewInit, OnDestroy } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';

import { UnitDialogComponent } from '../dialogs/UnitDialog';
import { ConfirmDialogComponent } from "../dialogs/ConfirmDialog.component";
import { UnitService, UnitDto, UnitCreateDto, UnitTreeItemDto } from "../../ServerService/unit.service";
import { UnitTreeComponent } from './UnitTree.component';
import { UnitContentComponent } from './UnitContent.component';

export type Unit = UnitDto;

@Component({
    selector: "page-units",
    imports: [
        CommonModule,
        MatCardModule,
        MatChipsModule,
        UnitTreeComponent,
        UnitContentComponent
    ],
    styleUrl: './Unit.component.scss',
    template: `
        <div class="container" #containerRef>
            <div class="panel nav-panel" [style.width.%]="navPanelWidth()" [class.collapsed]="isNavPanelCollapsed()">
                <div class="panel-header" [class.hidden]="isNavPanelCollapsed()">
                    <h3>Дерево підрозділів</h3>
                </div>
                <div class="panel-content" [class.hidden]="isNavPanelCollapsed()">
                    <!-- Дерево подразделений -->
                    <unit-tree 
                        (unitSelected)="onUnitSelected($event)"
                        (unitUpdated)="onUnitUpdated($event)"
                        class="unit-tree">
                    </unit-tree>
                </div>
            </div>
            
            <div 
                class="splitter"
                [class.dragging]="isDragging()"
                (mousedown)="startDrag($event)">
                <div class="splitter-handle"></div>
                <div class="splitter-controls">
                    <button 
                        class="toggle-btn"
                        (click)="toggleNavPanel()"
                        [title]="isNavPanelCollapsed() ? 'Показати дерево підрозділів' : 'Приховати дерево підрозділів'">
                        <span class="arrow" [class.collapsed]="isNavPanelCollapsed()">
                            {{ isNavPanelCollapsed() ? '▶' : '◀' }}
                        </span>
                    </button>
                </div>
            </div>
            
            <div class="panel content-panel" [style.width.%]="contentPanelWidth()">
                <div class="panel-header">
                    <!-- Toolbar с заголовком -->
                    <div class="unit-toolbar">
                        <h3>{{ selectedUnitTitle() }}</h3>
                    </div>
                </div>
                <div class="panel-content">
                    <!-- Основное содержимое -->
                    <unit-content 
                        [selectedUnit]="selectedUnit()"
                        [sidenavOpen]="!isNavPanelCollapsed()"
                        (showSidenav)="toggleNavPanel()">
                    </unit-content>
                </div>
            </div>
        </div>
    `
})
export class UnitsComponent implements AfterViewInit, OnDestroy {
    unitService = inject(UnitService);
    dialog = inject(MatDialog);
    breakpointObserver = inject(BreakpointObserver);

    // ViewChild for container reference
    @ViewChild('containerRef') containerRef!: ElementRef<HTMLElement>;

    // State signals
    selectedUnit = signal<UnitDto | null>(null);
    
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

    isMobile = computed(() =>
        this.breakpointObserver.isMatched([Breakpoints.Handset])
    );

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
        if (!this.isDragging() || this.containerWidth <= 0) return;

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
            Math.min(this.MAX_PANEL_WIDTH_PERCENT, currentNavWidth)
        );

        if (clampedNavWidth !== currentNavWidth) {
            this.navPanelWidth.set(clampedNavWidth);
        }
    }

    onUnitSelected(unit: UnitTreeItemDto) {
        // Получаем полную информацию о подразделении
        this.unitService.getById(unit.id).subscribe(fullUnit => {
            this.selectedUnit.set(fullUnit);

            // Закрываем навигационную панель на мобильных после выбора
            if (this.isMobile()) {
                this.isNavPanelCollapsed.set(true);
            }
        });
    }

    onUnitUpdated(unit: UnitTreeItemDto) {
        // Если обновленное подразделение - это текущее выбранное, обновляем его
        const currentSelected = this.selectedUnit();
        if (currentSelected && currentSelected.id === unit.id) {
            // Получаем полную обновленную информацию
            this.unitService.getById(unit.id).subscribe(fullUnit => {
                this.selectedUnit.set(fullUnit);
            });
        }
    }
}