import { Component, HostListener, signal, computed, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test',
  imports: [CommonModule],
  styleUrl: './Test.component.scss',
  template: `
    <div class="container" #containerRef>
      <div class="panel nav-panel" [style.width.%]="navPanelWidth()">
        <div class="panel-header">
          <h3>Навігаційна панель</h3>
        </div>
        <div class="panel-content">
          <p>Контент навігаційної панелі</p>
          <ul>
            <li>Елемент 1</li>
            <li>Елемент 2</li>
            <li>Елемент 3</li>
          </ul>
        </div>
      </div>
      
      <div 
        class="splitter"
        [class.dragging]="isDragging()"
        (mousedown)="startDrag($event)">
        <div class="splitter-handle"></div>
      </div>
      
      <div class="panel content-panel" [style.width.%]="contentPanelWidth()">
        <div class="panel-header">
          <h3>Панель контенту</h3>
        </div>
        <div class="panel-content">
          <p>Контент основної панелі</p>
          <div class="content-box">
            <p>Тут може бути будь-який контент</p>
            <button>Кнопка</button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class TestComponent implements AfterViewInit, OnDestroy {
  // --- Properties and Signals ---
  @ViewChild('containerRef') containerRef!: ElementRef<HTMLElement>;
  
  navPanelWidth = signal(50);
  contentPanelWidth = computed(() => 100 - this.navPanelWidth());
  isDragging = signal(false);

  private readonly SPLITTER_WIDTH_PX = 6;
  private readonly MIN_PANEL_WIDTH_PERCENT = 20;
  private readonly MAX_PANEL_WIDTH_PERCENT = 100 - this.MIN_PANEL_WIDTH_PERCENT;
  
  private startX = 0;
  private startNavWidth = 0;
  private containerWidth = 0; // The current width of the container

  // Event handlers need to be class properties (arrow functions) to maintain 'this' context
  // when added and removed from the document.
  private onMouseMoveHandler = this.onMouseMove.bind(this);
  private onMouseUpHandler = this.onMouseUp.bind(this);

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
    this.cleanupDragListeners();
  }

  private cleanupDragListeners(): void {
    document.removeEventListener('mousemove', this.onMouseMoveHandler);
    document.removeEventListener('mouseup', this.onMouseUpHandler);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }

  /**
   * Recalculate container width on window resize to ensure correct boundary checks
   * and percentage calculations on the next drag operation.
   * If you want to continuously enforce the min-width percentage constraint 
   * (e.g., if the window shrinks below the minimum size), you'd also call 
   * a resizing/clamping function here.
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
}