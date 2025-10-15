import { Component, inject, ViewChild, AfterViewInit, effect, signal } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DocumentTemplateService } from '../DocTemplates1/ServerServices/document-template.service';
import { 
    TemplateDto,
    TemplateFormat, 
    DocumentTemplateUtils,
    CreateTemplateDto 
} from '../DocTemplates1/Models/document-template.models';
import { DocTemplateUtils } from '../DocTemplates1/Models/shared.models';
import { CreateTemplateDialogComponent } from './create-template-dialog.component';
import { ConfirmDialogComponent } from "../dialogs/ConfirmDialog.component";

export type DocumentTemplate = TemplateDto;

@Component({
    selector: "page-doc-templates",
    imports: [
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
        MatChipsModule,
        CommonModule,
        FormsModule
    ],
    styleUrl: './DocTemplate.component.scss',
    template: `
        <div class="doc-templates-header">
            <h2>Шаблоны документов</h2>
            <div class="header-actions">
                <button mat-icon-button (click)="reload()" matTooltip="Обновить список">
                    <mat-icon>refresh</mat-icon>
                </button>
                <button mat-raised-button color="primary" (click)="add()" matTooltip="Создать новый шаблон">
                    <mat-icon>add</mat-icon>
                    Створити шаблон
                </button>
            </div>
        </div>

        <div class="filters-section">
            <mat-form-field appearance="outline">
                <mat-label>Поиск по названию</mat-label>
                <input matInput 
                       [(ngModel)]="searchText" 
                       (ngModelChange)="onSearchChange()"
                       placeholder="Введите название шаблона">
                <mat-icon matSuffix>search</mat-icon>
            </mat-form-field>
        </div>

        @if (isLoading()) {
            <div class="loading-indicator">Загрузка шаблонов...</div>
        } @else if (filteredItems().length === 0) {
            <div class="no-data">Нет доступных шаблонов</div>
        } @else {
            <table mat-table [dataSource]="dataSource" matSort class="mat-elevation-z8" style="width:100%; margin-top: 1em;">
                <!-- Menu Column -->
                <ng-container matColumnDef="menu">
                    <th mat-header-cell *matHeaderCellDef style="width: 60px;"> Дії </th>
                    <td mat-cell *matCellDef="let template">
                        <button mat-icon-button 
                                [matMenuTriggerFor]="templateMenu"
                                matTooltip="Дії з шаблоном"
                                (click)="$event.stopPropagation()">
                            <mat-icon>more_vert</mat-icon>
                        </button>
                        
                        <mat-menu #templateMenu="matMenu">
                            <button mat-menu-item (click)="downloadTemplate(template)">
                                <mat-icon color="primary">download</mat-icon>
                                <span>Скачать шаблон</span>
                            </button>
                            @if (supportsPreview(template)) {
                                <button mat-menu-item (click)="previewTemplate(template)">
                                    <mat-icon color="primary">visibility</mat-icon>
                                    <span>Предпросмотр</span>
                                </button>
                            }
                            <button mat-menu-item (click)="setCategory(template)">
                                <mat-icon color="accent">category</mat-icon>
                                <span>Установить категорию</span>
                            </button>
                            @if (!template.isPublished) {
                                <button mat-menu-item (click)="publish(template)">
                                    <mat-icon color="primary">publish</mat-icon>
                                    <span>Опубликовать</span>
                                </button>
                            } @else {
                                <button mat-menu-item (click)="unpublish(template)">
                                    <mat-icon color="accent">unpublished</mat-icon>
                                    <span>Снять с публикации</span>
                                </button>
                            }
                            <button mat-menu-item (click)="edit(template)">
                                <mat-icon color="accent">edit</mat-icon>
                                <span>Редагувати</span>
                            </button>
                            <button mat-menu-item (click)="delete(template)">
                                <mat-icon color="warn">delete</mat-icon>
                                <span>Видалити</span>
                            </button>
                        </mat-menu>
                    </td>
                </ng-container>

                <!-- Name Column -->
                <ng-container matColumnDef="name">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header> Назва </th>
                    <td mat-cell *matCellDef="let template">
                        <div class="template-name">{{ template.name }}</div>
                        @if (template.description) {
                            <div class="template-description">{{ template.description }}</div>
                        }
                    </td>
                </ng-container>
                
                <!-- Format Column -->
                <ng-container matColumnDef="format">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header> Формат </th>
                    <td mat-cell *matCellDef="let template">
                        <mat-chip class="format-chip" [class]="'format-' + template.format">
                            {{ getFormatLabel(template.format) }}
                        </mat-chip>
                    </td>
                </ng-container>

                <!-- Status Column -->
                <ng-container matColumnDef="status">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header> Статус </th>
                    <td mat-cell *matCellDef="let template">
                        @if (template.isPublished) {
                            <mat-chip class="status-published">
                                <mat-icon>check_circle</mat-icon>
                                {{ getStatusLabel(template.isPublished) }}
                            </mat-chip>
                        } @else {
                            <mat-chip class="status-draft">
                                <mat-icon>edit</mat-icon>
                                {{ getStatusLabel(template.isPublished) }}
                            </mat-chip>
                        }
                    </td>
                </ng-container>

                <!-- Category Column -->
                <ng-container matColumnDef="category">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header> Категория </th>
                    <td mat-cell *matCellDef="let template"> 
                        {{ template.templateCategoryName || '---' }}
                    </td>
                </ng-container>

                <!-- Created Column -->
                <ng-container matColumnDef="created">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header> Создан </th>
                    <td mat-cell *matCellDef="let template"> 
                        {{ template.createdAtUtc | date:'dd.MM.yyyy HH:mm' }}
                    </td>
                </ng-container>

                <!-- Updated Column -->
                <ng-container matColumnDef="updated">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header> Обновлен </th>
                    <td mat-cell *matCellDef="let template"> 
                        {{ template.updatedAtUtc | date:'dd.MM.yyyy HH:mm' }}
                    </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>
        }
    `
})
export class DocTemplateComponent implements AfterViewInit {
    documentTemplateService = inject(DocumentTemplateService);
    dialog = inject(MatDialog);
    
    items = signal<DocumentTemplate[]>([]);
    isLoading = signal(false);
    searchText = '';
    
    dataSource = new MatTableDataSource<DocumentTemplate>([]);
    displayedColumns = ['menu', 'name', 'format', 'status', 'category', 'created', 'updated'];

    @ViewChild(MatSort) sort!: MatSort;

    // Фильтрованные элементы
    filteredItems = signal<DocumentTemplate[]>([]);

    constructor() {
        // Обновляем dataSource при изменении отфильтрованных данных
        effect(() => {
            this.dataSource.data = this.filteredItems();
        });
        
        // Фильтруем данные при изменении поискового запроса или основных данных
        effect(() => {
            const allItems = this.items();
            const search = this.searchText.toLowerCase().trim();
            
            if (!search) {
                this.filteredItems.set(allItems);
            } else {
                const filtered = allItems.filter(item => 
                    item.name.toLowerCase().includes(search) ||
                    (item.description && item.description.toLowerCase().includes(search)) ||
                    (item.templateCategoryName && item.templateCategoryName.toLowerCase().includes(search))
                );
                this.filteredItems.set(filtered);
            }
        });
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        
        // Загружаем начальные данные
        this.reload();
    }

    reload() {
        this.isLoading.set(true);
        this.documentTemplateService.getList().subscribe({
            next: (templates) => {
                this.items.set(templates);
                this.isLoading.set(false);
            },
            error: (error) => {
                console.error('Error loading templates:', error);
                this.isLoading.set(false);
            }
        });
    }

    onSearchChange() {
        // Фильтрация срабатывает автоматически через effect
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
     * Получает читаемое название статуса публикации
     */
    getStatusLabel(isPublished: boolean): string {
        return DocTemplateUtils.getStatusLabel(isPublished);
    }

    /**
     * Проверяет, поддерживается ли предпросмотр для шаблона
     */
    supportsPreview(template: DocumentTemplate): boolean {
        const templateFormat = DocumentTemplateUtils.parseFormat(template.format);
        return DocumentTemplateUtils.supportsClientRendering(templateFormat);
    }

    // CREATE
    add() {
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
                        this.reload();
                    },
                    error: (error) => {
                        console.error('Error creating template:', error);
                    }
                });
            }
        });
    }

    // UPDATE
    edit(template: DocumentTemplate) {
        // TODO: Реализовать диалог редактирования
        this.dialog.open(ConfirmDialogComponent, {
            width: '400px',
            autoFocus: false,
            data: {
                title: 'Редагування шаблону',
                message: `Функція редагування шаблону "${template.name}" буде реалізована пізніше.`,
                confirmText: 'OK',
                cancelText: '',
                color: 'primary',
                icon: 'info'
            }
        });
    }

    // DELETE
    delete(template: DocumentTemplate) {
        const ref = this.dialog.open(ConfirmDialogComponent, {
            width: '400px',
            maxWidth: '95vw',
            autoFocus: false,
            data: {
                title: 'Видалення шаблону',
                message: `Ви впевнені, що хочете видалити шаблон "${template.name}"?`,
                confirmText: 'Видалити',
                cancelText: 'Відмінити',
                color: 'warn',
                icon: 'warning'
            }
        });
        
        ref.afterClosed().subscribe(confirmed => {
            if (confirmed) {
                this.documentTemplateService.delete(template.id).subscribe({
                    next: () => {
                        console.log('Template deleted successfully');
                        this.reload();
                    },
                    error: (error) => {
                        console.error('Error deleting template:', error);
                    }
                });
            }
        });
    }

    // TEMPLATE-SPECIFIC ACTIONS

    /**
     * Скачивает файл шаблона
     */
    downloadTemplate(template: DocumentTemplate): void {
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
    previewTemplate(template: DocumentTemplate): void {
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
     * Публикует шаблон
     */
    publish(template: DocumentTemplate): void {
        this.documentTemplateService.publish(template.id).subscribe({
            next: () => {
                console.log('Template published successfully');
                this.reload();
            },
            error: (error) => {
                console.error('Error publishing template:', error);
            }
        });
    }

    /**
     * Снимает шаблон с публикации
     */
    unpublish(template: DocumentTemplate): void {
        this.documentTemplateService.unpublish(template.id).subscribe({
            next: () => {
                console.log('Template unpublished successfully');
                this.reload();
            },
            error: (error) => {
                console.error('Error unpublishing template:', error);
            }
        });
    }

    /**
     * Устанавливает категорию шаблона
     */
    setCategory(template: DocumentTemplate): void {
        // TODO: Реализовать диалог выбора категории
        this.dialog.open(ConfirmDialogComponent, {
            width: '400px',
            autoFocus: false,
            data: {
                title: 'Установка категории',
                message: `Функція установки категории для шаблону "${template.name}" буде реалізована пізніше.`,
                confirmText: 'OK',
                cancelText: '',
                color: 'primary',
                icon: 'info'
            }
        });
    }

    /**
     * Получает расширение файла по формату
     */
    private getFileExtension(format: string): string {
        const templateFormat = DocumentTemplateUtils.parseFormat(format);
        return DocumentTemplateUtils.getFileExtension(templateFormat);
    }
}
