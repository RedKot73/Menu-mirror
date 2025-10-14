import {
  Component, inject, signal, computed, effect,
  HostListener, ElementRef, ViewChild, AfterViewInit, OnDestroy
} from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatOptionModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { SlicePipe } from '@angular/common';

import { DocumentTemplateService } from '../DocTemplates1/ServerServices/document-template.service';
import { TemplateDetailsDto, TemplateFormat, DocumentTemplateUtils, CreateTemplateDto, TEMPLATE_FORMAT_OPTIONS } from '../DocTemplates1/Models/document-template.models';
import { CreateTemplateDialogComponent } from './create-template-dialog.component';

@Component({
  selector: 'app-test',
  imports: [
    CommonModule,

    MatTableModule,
    MatButtonModule,
    MatSortModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatTooltipModule,
    MatMenuModule,

    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatChipsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    ReactiveFormsModule
  ],
  styleUrl: './Test.component.scss',
  template: `
        <div class="container" #containerRef>
            <div class="panel nav-panel" [style.width.%]="navPanelWidth()" [class.collapsed]="isNavPanelCollapsed()">
                <div class="panel-header" [class.hidden]="isNavPanelCollapsed()">
                    <h3>Шаблоны документов</h3>
                    <div class="header-actions">
                        <button mat-icon-button (click)="refreshTemplates()" matTooltip="Обновить список">
                            <mat-icon>refresh</mat-icon>
                        </button>
                        <button mat-raised-button color="primary" (click)="createTemplate()" matTooltip="Создать новый шаблон">
                            <mat-icon>add</mat-icon>
                            Створити шаблон
                        </button>
                    </div>
                </div>
                <div class="panel-content" [class.hidden]="isNavPanelCollapsed()">
                    <!-- Templates table -->
                    <div class="templates-container">
                        @if (isLoading()) {
                            <div class="loading-indicator">Загрузка...</div>
                        } @else if (templates().length === 0) {
                            <div class="no-data">Нет доступных шаблонов</div>
                        } @else {
                            <table mat-table [dataSource]="dataSource" matSort class="mat-elevation-z8">
                                <!-- Actions Column -->
                                <ng-container matColumnDef="actions">
                                    <th mat-header-cell *matHeaderCellDef style="width: 60px;"> Дії </th>
                                    <td mat-cell *matCellDef="let template">
                                        <button mat-icon-button
                                                [matMenuTriggerFor]="templateMenu"
                                                matTooltip="Дії"
                                                (click)="$event.stopPropagation()">
                                            <mat-icon>more_vert</mat-icon>
                                        </button>

                                        <mat-menu #templateMenu="matMenu">
                                                            <button mat-icon-button
                                                                    (click)="downloadTemplate(template); $event.stopPropagation()"
                                                                    matTooltip="Скачать шаблон">
                                                                <mat-icon>download</mat-icon>
                                                            </button>
                                                            @if (supportsPreview(template)) {
                                                                <button mat-icon-button
                                                                        (click)="previewTemplate(template); $event.stopPropagation()"
                                                                        matTooltip="Предпросмотр">
                                                                    <mat-icon>visibility</mat-icon>
                                                                </button>
                                                            }
                                                            <button mat-icon-button
                                                                    (click)="editTemplate(template); $event.stopPropagation()"
                                                                    matTooltip="Редактировать">
                                                                <mat-icon>edit</mat-icon>
                                                            </button>
                                        </mat-menu>
                                    </td>
                                </ng-container>

                                <!-- Name Column -->
                                <ng-container matColumnDef="name">
                                    <th mat-header-cell *matHeaderCellDef mat-sort-header>Назва</th>
                                    <td mat-cell *matCellDef="let template" 
                                        (click)="selectTemplate(template)"
                                        [class.selected]="selectedTemplate()?.id === template.id"
                                        class="clickable-cell">
                                        <div class="template-name">{{ template.name }}</div>
                                        @if (template.description) {
                                            <div class="template-description">{{ template.description }}</div>
                                        }
                                    </td>
                                </ng-container>

                                <!-- Format Column -->
                                <ng-container matColumnDef="format">
                                    <th mat-header-cell *matHeaderCellDef mat-sort-header>Формат</th>
                                    <td mat-cell *matCellDef="let template">
                                        <mat-chip class="format-chip" [class]="'format-' + template.format">
                                            {{ getFormatLabel(template.format) }}
                                        </mat-chip>
                                    </td>
                                </ng-container>

                                <!-- Status Column -->
                                <ng-container matColumnDef="status">
                                    <th mat-header-cell *matHeaderCellDef mat-sort-header>Статус</th>
                                    <td mat-cell *matCellDef="let template">
                                        @if (template.isPublished) {
                                            <mat-chip class="status-published">
                                                <mat-icon>check_circle</mat-icon>
                                                Опубліковано
                                            </mat-chip>
                                        } @else {
                                            <mat-chip class="status-draft">
                                                <mat-icon>edit</mat-icon>
                                                Чернетка
                                            </mat-chip>
                                        }
                                    </td>
                                </ng-container>

                                <!-- Category Column -->
                                <ng-container matColumnDef="category">
                                    <th mat-header-cell *matHeaderCellDef mat-sort-header>Категория</th>
                                    <td mat-cell *matCellDef="let template">
                                        {{ template.templateCategoryName || '---' }}
                                    </td>
                                </ng-container>

                                <!-- Description Column -->
                                <ng-container matColumnDef="description">
                                    <th mat-header-cell *matHeaderCellDef> Опис </th>
                                    <td mat-cell *matCellDef="let template" class="comment-cell">
                                        <span class="comment-text"
                                              [matTooltip]="template.description && template.description.length > 50 ? template.description : ''"
                                              [title]="template.description && template.description.length > 50 ? template.description : ''">
                                            {{ template.description ? (template.description.length > 50 ? (template.description | slice:0:50) + '...' : template.description) : '-' }}
                                        </span>
                                    </td>
                                </ng-container>

                                <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                                <tr mat-row *matRowDef="let row; columns: displayedColumns;" 
                                    [class.selected-row]="selectedTemplate()?.id === row.id"></tr>
                            </table>
                        }
                    </div>
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
                        [title]="isNavPanelCollapsed() ? 'Показати шаблони документів' : 'Приховати шаблони документів'">
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
                        <h3>
                            @if (selectedTemplate()) {
                                {{ selectedTemplate()!.name }}
                            } @else {
                                Выберите шаблон
                            }
                        </h3>
                        @if (selectedTemplate()) {
                            <div class="template-info">
                                <span class="format-info">{{ getFormatLabel(selectedTemplate()!.format) }}</span>
                                <span class="status-info" [class.published]="selectedTemplate()!.isPublished">
                                    {{ selectedTemplate()!.isPublished ? 'Опубликован' : 'Черновик' }}
                                </span>
                            </div>
                        }
                    </div>
                </div>
                <div class="panel-content">
                    <!-- Основное содержимое -->
                    @if (selectedTemplate()) {
                        <div class="template-details">
                            <h4>Детали шаблона</h4>
                            <p><strong>ID:</strong> {{ selectedTemplate()!.id }}</p>
                            <p><strong>Описание:</strong> {{ selectedTemplate()!.description || 'Нет описания' }}</p>
                            <p><strong>Формат:</strong> {{ getFormatLabel(selectedTemplate()!.format) }}</p>
                            <p><strong>Категория:</strong> {{ selectedTemplate()!.templateCategoryName || 'Без категории' }}</p>
                            <p><strong>Создан:</strong> {{ selectedTemplate()!.createdAtUtc | date:'medium' }}</p>
                            <p><strong>Обновлен:</strong> {{ selectedTemplate()!.updatedAtUtc | date:'medium' }}</p>
                            @if (selectedTemplate()!.publishedAtUtc) {
                                <p><strong>Опубликован:</strong> {{ selectedTemplate()!.publishedAtUtc | date:'medium' }}</p>
                            }
                        </div>
                    } @else {
                        <div class="no-selection">
                            <mat-icon>description</mat-icon>
                            <p>Выберите шаблон из списка слева для просмотра деталей</p>
                        </div>
                    }
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
  dialog = inject(MatDialog);
  breakpointObserver = inject(BreakpointObserver);
  documentTemplateService = inject(DocumentTemplateService);
  formBuilder = inject(FormBuilder);

  // ViewChild for container reference
  @ViewChild('containerRef') containerRef!: ElementRef<HTMLElement>;
  @ViewChild(MatSort) sort!: MatSort;

  // Template management signals
  templates = signal<TemplateDetailsDto[]>([]);
  selectedTemplate = signal<TemplateDetailsDto | null>(null);
  isLoading = signal(false);
  dataSource = new MatTableDataSource<TemplateDetailsDto>([]);
  displayedColumns = ['actions', 'name', 'format', 'status', 'category', 'description'];

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

    // Обновляем dataSource при изменении списка шаблонов
    effect(() => {
      this.dataSource.data = this.templates();
    });

    // Загружаем шаблоны при инициализации
    this.refreshTemplates();
  }

  // --- Lifecycle Hooks ---
  ngAfterViewInit(): void {
    // Initial width calculation
    this.updateContainerWidth();
    
    // Setup table sorting
    this.dataSource.sort = this.sort;
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

  // ===== TEMPLATE MANAGEMENT METHODS =====

  /**
   * Обновляет список шаблонов с сервера
   */
  refreshTemplates(): void {
    this.isLoading.set(true);
    this.documentTemplateService.getList().subscribe({
      next: (templates) => {
        // Получаем детали для каждого шаблона
        const detailsRequests = templates.map(template =>
          this.documentTemplateService.getDetails(template.id)
        );

        Promise.all(detailsRequests.map(req => req.toPromise())).then(details => {
          this.templates.set(details.filter(d => d !== undefined) as TemplateDetailsDto[]);
          this.isLoading.set(false);
        }).catch(error => {
          console.error('Error loading template details:', error);
          this.isLoading.set(false);
        });
      },
      error: (error) => {
        console.error('Error loading templates:', error);
        this.isLoading.set(false);
      }
    });
  }

  /**
   * Выбирает шаблон для отображения в правой панели
   */
  selectTemplate(template: TemplateDetailsDto): void {
    this.selectedTemplate.set(template);
  }

  /**
   * Получает читаемое название формата
   */
  getFormatLabel(format: string): string {
    const templateFormat = DocumentTemplateUtils.parseFormat(format);
    switch (templateFormat) {
      case TemplateFormat.Html:
        return 'HTML';
      case TemplateFormat.Txt:
        return 'Текст';
      case TemplateFormat.Docx:
        return 'Word';
      case TemplateFormat.Pdf:
        return 'PDF';
      default:
        return format.toUpperCase();
    }
  }

  /**
   * Проверяет, поддерживается ли предпросмотр для шаблона
   */
  supportsPreview(template: TemplateDetailsDto): boolean {
    const templateFormat = DocumentTemplateUtils.parseFormat(template.format);
    return DocumentTemplateUtils.supportsClientRendering(templateFormat);
  }

  /**
   * Скачивает файл шаблона
   */
  downloadTemplate(template: TemplateDetailsDto): void {
    const fileName = `${template.name}.${this.getFileExtension(template.format)}`;
    this.documentTemplateService.downloadFile(template.id, fileName).subscribe({
      next: () => {
        console.log('Template downloaded successfully');
      },
      error: (error) => {
        console.error('Error downloading template:', error);
      }
    });
  }

  /**
   * Открывает предпросмотр шаблона
   */
  previewTemplate(template: TemplateDetailsDto): void {
    if (!this.supportsPreview(template)) {
      return;
    }

    this.documentTemplateService.previewHtml(template.id).subscribe({
      next: (html) => {
        // Открываем HTML в новом окне для предпросмотра
        const previewWindow = window.open('', '_blank');
        if (previewWindow) {
          previewWindow.document.write(html);
          previewWindow.document.close();
        }
      },
      error: (error) => {
        console.error('Error previewing template:', error);
      }
    });
  }

  /**
   * Открывает редактор шаблона (заглушка)
   */
  editTemplate(template: TemplateDetailsDto): void {
    console.log('Edit template:', template);
    // TODO: Реализовать открытие диалога редактирования
  }

  /**
   * Получает расширение файла по формату
   */
  private getFileExtension(format: string): string {
    const templateFormat = DocumentTemplateUtils.parseFormat(format);
    return DocumentTemplateUtils.getFileExtension(templateFormat);
  }

  /**
   * Открывает диалог создания нового шаблона
   */
  createTemplate(): void {
    const dialogRef = this.dialog.open(CreateTemplateDialogComponent, {
      width: '600px',
      maxWidth: '90vw',
      disableClose: true,
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.documentTemplateService.create(result).subscribe({
          next: (template) => {
            console.log('Template created successfully:', template);
            this.refreshTemplates();
            // Выбираем созданный шаблон
            this.documentTemplateService.getDetails(template.id).subscribe({
              next: (details) => {
                this.selectedTemplate.set(details);
              },
              error: (error) => {
                console.error('Error loading template details:', error);
              }
            });
          },
          error: (error) => {
            console.error('Error creating template:', error);
          }
        });
      }
    });
  }
} 