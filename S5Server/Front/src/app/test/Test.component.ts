import {
  Component, inject, signal, computed, effect,
  HostListener, ElementRef, ViewChild, AfterViewInit, OnDestroy
} from "@angular/core";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';

import { DocTemplateComponent } from './DocTemplate.component';
import { DataSetTableComponent } from './DataSetTable.component';
import { TemplateDto } from '../DocTemplates1/Models/document-template.models';

@Component({
  selector: 'app-test',
  imports: [
    CommonModule,
    DocTemplateComponent,
    DataSetTableComponent
  ],
  styleUrl: './Test.component.scss',
  template: `
        <div class="container" #containerRef>
            <div class="panel nav-panel" [style.width.%]="navPanelWidth()" [class.collapsed]="isNavPanelCollapsed()">
                <div class="panel-content" [class.hidden]="isNavPanelCollapsed()">
                    <!-- DocTemplate Component -->
                    <app-page-doc-templates 
                        [selectedTemplate]="selectedTemplate()"
                        (templateSelected)="onTemplateSelected($event)">
                    </app-page-doc-templates>
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
                        [title]="isNavPanelCollapsed() ? 'Показати управління шаблонами' : 'Приховати управління шаблонами'">
                        <span class="arrow" [class.collapsed]="isNavPanelCollapsed()">
                            {{ isNavPanelCollapsed() ? '▶' : '◀' }}
                        </span>
                    </button>
                </div>
            </div>

            <div class="panel content-panel" [style.width.%]="contentPanelWidth()">
                <div class="panel-header">
                    <!-- Toolbar с заголовком -->
                </div>
                <div class="panel-content">
                    <!-- DataSetTable Component -->
                    <template-dataset-table 
                        [selectedTemplate]="selectedTemplate()">
                    </template-dataset-table>
                </div>
            </div>
        </div>
  `,
  styles: [`
    .header-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  `]
})
export class TestComponent implements AfterViewInit, OnDestroy {
  breakpointObserver = inject(BreakpointObserver);

  // ViewChild for container reference
  @ViewChild('containerRef') containerRef!: ElementRef<HTMLElement>;
  selectedTemplate = signal<TemplateDto | null>(null);

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
  }  ngOnDestroy(): void {
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
    if (!this.isDragging() || this.containerWidth <= 0) {return;}

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

  /**
   * Обработчик выбора шаблона из DocTemplate компонента
   */
  onTemplateSelected(template: TemplateDto | null): void {
    this.selectedTemplate.set(template);
  }
} 