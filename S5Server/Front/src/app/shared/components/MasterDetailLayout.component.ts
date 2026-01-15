import {
  Component,
  Input,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  HostListener,
  signal,
  computed,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

/**
 * Переиспользуемый компонент для Master-Detail разметки
 * Left panel + Resizable Splitter + Right panel
 */
@Component({
  selector: 'app-master-detail-layout',
  standalone: true,
  imports: [CommonModule, MatTooltipModule],
  template: `
    <div class="master-detail-container" #containerRef>
      <!-- Left Panel (Master) -->
      <div
        class="panel nav-panel"
        [style.width.%]="navPanelWidth()"
        [class.collapsed]="isNavPanelCollapsed()"
      >
        <ng-content select="[leftPanel]"></ng-content>
      </div>

      <!-- Resizable Splitter -->
      <div class="splitter" [class.dragging]="isDragging()" (mousedown)="startDrag($event)">
        <div class="splitter-handle"></div>
        <div class="splitter-controls">
          <button
            class="toggle-btn"
            (click)="toggleNavPanel()"
            [matTooltip]="isNavPanelCollapsed() ? 'Показати' : 'Приховати'"
            [matTooltipPosition]="'above'"
          >
            <span class="arrow" [class.collapsed]="isNavPanelCollapsed()">
              {{ isNavPanelCollapsed() ? '▶' : '◀' }}
            </span>
          </button>
        </div>
      </div>

      <!-- Right Panel (Detail) -->
      <div class="panel content-panel" [style.width.%]="contentPanelWidth()">
        <ng-content select="[rightPanel]"></ng-content>
      </div>
    </div>
  `,
  styles: [
    `
      .master-detail-container {
        display: flex;
        height: 100%;
        width: 100%;
        overflow: hidden;
        position: relative;
      }

      .panel {
        height: 100%;
        overflow: hidden;
        position: relative;
        transition: width 0.3s ease;
      }

      .nav-panel {
        background: #fafafa;
        border-right: 1px solid #e0e0e0;
        min-width: 0;
        display: flex;
        flex-direction: column;
      }

      .nav-panel.collapsed {
        width: 0 !important;
        min-width: 0;
        border-right: none;
      }

      .content-panel {
        flex: 1;
        background: white;
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }

      .splitter {
        width: 6px;
        background: #e0e0e0;
        cursor: col-resize;
        position: relative;
        flex-shrink: 0;
        z-index: 10;
        transition: background-color 0.2s;
      }

      .splitter:hover {
        background: #bdbdbd;
      }

      .splitter.dragging {
        background: #2196f3;
      }

      .splitter-handle {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .splitter-controls {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 11;
      }

      .toggle-btn {
        width: 24px;
        height: 32px;
        padding: 0;
        background: white;
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: all 0.2s;
      }

      .toggle-btn:hover {
        background: #f5f5f5;
        border-color: #bdbdbd;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      }

      .toggle-btn:active {
        transform: scale(0.95);
      }

      .arrow {
        font-size: 12px;
        color: #666;
        transition: transform 0.2s;
      }

      @media (max-width: 768px) {
        .splitter {
          width: 4px;
        }

        .toggle-btn {
          width: 20px;
          height: 28px;
        }
      }
    `,
  ],
})
export class MasterDetailLayoutComponent implements AfterViewInit, OnDestroy {
  /**
   * Уникальный ключ для сохранения состояния в localStorage
   */
  @Input() storageKey: string = 'masterDetail';

  /**
   * Начальная ширина левой панели в процентах (по умолчанию 50%)
   */
  @Input() initialNavWidth: number = 50;

  /**
   * Минимальная ширина панелей в процентах (по умолчанию 20%)
   */
  @Input() minPanelWidth: number = 20;

  @ViewChild('containerRef') containerRef!: ElementRef<HTMLElement>;

  // Signals
  navPanelWidth = signal(this.initialNavWidth);
  contentPanelWidth = computed(() => {
    const isCollapsed = this.isNavPanelCollapsed();
    const navWidth = this.navPanelWidth();

    if (isCollapsed) {
      return 100;
    }

    return 100 - navWidth;
  });
  isDragging = signal(false);
  isNavPanelCollapsed = signal(false);

  // Private properties
  private readonly SPLITTER_WIDTH_PX = 6;
  private maxPanelWidth = 100;
  private lastNavPanelWidth = this.initialNavWidth;
  private startX = 0;
  private startNavWidth = 0;
  private containerWidth = 0;

  // Event handlers
  private onMouseMoveHandler = this.onMouseMove.bind(this);
  private onMouseUpHandler = this.onMouseUp.bind(this);

  // Mobile detection
  isMobile = computed(() => this.breakpointObserver.isMatched([Breakpoints.Handset]));

  constructor(private breakpointObserver: BreakpointObserver) {
    // Автоматически сворачиваем панель на мобильных устройствах
    effect(() => {
      if (this.isMobile() && !this.isNavPanelCollapsed()) {
        this.isNavPanelCollapsed.set(true);
      }
    });
  }

  ngAfterViewInit(): void {
    // Загружаем сохраненное состояние
    this.loadSavedState();
    this.updateContainerWidth();
  }

  ngOnDestroy(): void {
    if (this.isDragging()) {
      this.cleanupDragListeners();
      this.isDragging.set(false);
    }
  }

  private updateContainerWidth(): void {
    if (this.containerRef) {
      this.containerWidth = this.containerRef.nativeElement.offsetWidth - this.SPLITTER_WIDTH_PX;
    }
  }

  startDrag(event: MouseEvent): void {
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
    this.updateContainerWidth();

    this.startX = event.clientX;
    this.startNavWidth = this.navPanelWidth();

    document.addEventListener('mousemove', this.onMouseMoveHandler);
    document.addEventListener('mouseup', this.onMouseUpHandler);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }

  private onMouseMove(event: MouseEvent): void {
    if (!this.isDragging() || this.containerWidth <= 0) {
      return;
    }

    const deltaX = event.clientX - this.startX;
    const deltaPercent = (deltaX / this.containerWidth) * 100;
    let newNavWidth = this.startNavWidth + deltaPercent;

    // Ограничиваем ширину
    this.maxPanelWidth = 100 - this.minPanelWidth;
    newNavWidth = Math.max(this.minPanelWidth, Math.min(this.maxPanelWidth, newNavWidth));

    this.navPanelWidth.set(newNavWidth);
  }

  private onMouseUp(): void {
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

  @HostListener('window:resize')
  onWindowResize(): void {
    this.updateContainerWidth();

    const currentNavWidth = this.navPanelWidth();
    this.maxPanelWidth = 100 - this.minPanelWidth;
    const clampedNavWidth = Math.max(
      this.minPanelWidth,
      Math.min(this.maxPanelWidth, currentNavWidth)
    );

    if (clampedNavWidth !== currentNavWidth) {
      this.navPanelWidth.set(clampedNavWidth);
    }
  }

  // LocalStorage methods
  private loadSavedState(): void {
    const collapsed = this.getSavedNavPanelState();
    const width = this.getSavedNavPanelWidth();

    this.isNavPanelCollapsed.set(collapsed);
    if (!collapsed) {
      this.navPanelWidth.set(width);
    }
    this.lastNavPanelWidth = width;
  }

  private getSavedNavPanelState(): boolean {
    const saved = localStorage.getItem(`${this.storageKey}_collapsed`);
    return saved !== null ? saved === 'true' : false;
  }

  private getSavedNavPanelWidth(): number {
    const saved = localStorage.getItem(`${this.storageKey}_width`);
    return saved !== null ? parseInt(saved, 10) : this.initialNavWidth;
  }

  private saveNavPanelState(collapsed: boolean): void {
    localStorage.setItem(`${this.storageKey}_collapsed`, collapsed.toString());
  }

  private saveNavPanelWidth(width: number): void {
    localStorage.setItem(`${this.storageKey}_width`, width.toString());
  }
}
