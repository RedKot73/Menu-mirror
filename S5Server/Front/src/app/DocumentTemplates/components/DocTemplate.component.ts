import {
    Component,
    inject,
    ViewChild,
    AfterViewInit,
    effect,
    signal,
    input,
    output } from "@angular/core";
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
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DocumentTemplateService } from '../services/document-template.service';
import { DocTemplateUtils } from '../models/shared.models';
import { TemplateDto } from '../models/document-template.models';
import {
    CreateTemplateDialogComponent,
    EditTemplateResult
} from '../../test/CreateTemplate-dialog.component';
import { ConfirmDialogComponent } from "../../dialogs/ConfirmDialog.component";
import { MatSnackBar } from "@angular/material/snack-bar";

export type DocumentTemplate = TemplateDto;

@Component({
    selector: "app-page-doc-templates",
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
        MatDividerModule,
        CommonModule,
        FormsModule
    ],
    styleUrl: './DocTemplate.component.scss',
    template: `
        <div class="doc-templates-header">
<!--            
            <h3>Шаблони документів</h3>
-->
            <div class="header-actions">
                <button
                    mat-icon-button
                    (click)="reload()"
                    matTooltip="Оновити перелік">
                    <mat-icon>refresh</mat-icon>
                </button>
                <button
                    mat-raised-button
                    color="primary"
                    (click)="add()"
                    matTooltip="Створити шаблон">
                    <mat-icon>add</mat-icon>
                    Створити шаблон
                </button>
            </div>
        </div>

        @if (isLoading()) {
            <div class="loading-indicator">Загрузка шаблонов...</div>
        } @else if (items().length === 0) {
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
                                <span>Завантажити шаблон</span>
                            </button>
                            @if (supportsPreview(template)) {
                                <button mat-menu-item (click)="previewTemplate(template)">
                                    <mat-icon color="primary">visibility</mat-icon>
                                    <span>Попередній перегляд</span>
                                </button>
                            }
                            @if (!template.isPublished) {
                                <button mat-menu-item (click)="publish(template)">
                                    <mat-icon color="primary">published</mat-icon>
                                    <span>Опублікувати</span>
                                </button>
                            } @else {
                                <button mat-menu-item (click)="unpublish(template)">
                                    <mat-icon color="accent">unpublished</mat-icon>
                                    <span>Зняти з публікації</span>
                                </button>
                            }
                            <button mat-menu-item (click)="edit(template)">
                                <mat-icon color="accent">edit</mat-icon>
                                <span>Редагувати</span>
                            </button>
                            <mat-divider></mat-divider>
                            <button mat-menu-item (click)="delete(template)" class="delete-action">
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

            <!-- Comment Column -->
            <ng-container matColumnDef="comment">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Коментар </th>
                <td mat-cell *matCellDef="let template" class="comment-cell">
                    <span class="comment-text"
                          [matTooltip]="template.comment && template.comment.length > 50 ? template.comment : ''"
                          [title]="template.comment && template.comment.length > 50 ? template.comment : ''">
                        {{ template.comment ? (template.comment.length > 50 ? (template.comment | slice:0:50) + '...' : template.comment) : '-' }}
                    </span>
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
                <tr mat-row *matRowDef="let row; columns: displayedColumns;" 
                    (click)="selectTemplate(row)"
                    [class.selected]="selectedTemplate()?.id === row.id"
                    style="cursor: pointer;"></tr>
            </table>
        }
    `
})
export class DocTemplateComponent implements AfterViewInit {
    @ViewChild(MatSort) sort!: MatSort;

    documentTemplateService = inject(DocumentTemplateService);
    dialog = inject(MatDialog);
    private snackBar = inject(MatSnackBar);
    
    // Input/Output для работы с родительским компонентом
    selectedTemplate = input<DocumentTemplate | null>(null);
    templateSelected = output<DocumentTemplate | null>();
    
    items = signal<DocumentTemplate[]>([]);
    isLoading = signal(false);
    
    dataSource = new MatTableDataSource<DocumentTemplate>([]);
    displayedColumns = ['menu', 'name', 'format', 'status', 'category', 'comment', 'created', 'updated'];

    constructor() {
        effect(() => {
            this.dataSource.data = this.items();
        });
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        
        // Загружаем начальные данные
        this.reload();
    }

    reload() {
        this.isLoading.set(true);
        this.documentTemplateService.getTemplates().subscribe({
            next: (templates) => {
                this.items.set(templates);
                this.isLoading.set(false);
            },
            error: (error) => {
                console.error('Error loading templates:', error);
                this.snackBar.open('Ошибка загрузки шаблонов', 'Закрыть', { duration: 5000 });
                this.isLoading.set(false);
            }
        });
    }

    /**
     * Выбирает шаблон и эмитит событие для родительского компонента
     */
    selectTemplate(template: DocumentTemplate): void {
        this.templateSelected.emit(template);
    }

    // CREATE
    add() {
        const dialogRef = this.dialog.open(CreateTemplateDialogComponent, {
            width: '600px',
            maxWidth: '90vw',
            disableClose: true,
            data: { mode: 'create' }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                // result - это CreateTemplateDto
                this.documentTemplateService.createTemplate(result).subscribe({
                    next: () => {
                        this.reload();
                    },
                    error: (error) => {
                        console.error('Error creating template:', error);
                        this.snackBar.open('Помилка створення шаблону', 'Закрити', { duration: 5000 });
                    }
                });
            }
        });
    }

    // UPDATE
    edit(template: DocumentTemplate) {
        const dialogRef = this.dialog.open(CreateTemplateDialogComponent, {
            width: '600px',
            maxWidth: '90vw',
            disableClose: true,
            data: { 
                mode: 'edit',
                template: template
            }
        });

        dialogRef.afterClosed().subscribe((result: EditTemplateResult) => {
            if (result) {
                // result содержит обновленный template и опционально file
                const updateData = {
                    name: result.template.name,
                    description: result.template.description,
                    format: result.template.format,
                    templateCategoryId: result.template.templateCategoryId,
                    isPublished: result.template.isPublished,
                    file: result.file
                };

                this.documentTemplateService.updateTemplate(template.id, updateData).subscribe({
                    next: () => {
                        this.reload();
                    },
                    error: (error) => {
                        console.error('Error updating template:', error);
                        this.snackBar.open('Помилка оновлення шаблону', 'Закрити', { duration: 5000 });
                    }
                });
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
                this.documentTemplateService.deleteTemplate(template.id).subscribe({
                    next: () => {
                        this.reload();
                    },
                    error: (error) => {
                        console.error('Error deleting template:', error);
                        this.snackBar.open('Помилка видалення шаблону', 'Закрити', { duration: 5000 });
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
        this.documentTemplateService.downloadFile(template.id).subscribe({
            next: (blob) => {
                this.documentTemplateService.downloadBlob(blob, `${template.name}.${template.format}`);
            },
            error: (error) => {
                console.error('Error downloading template:', error);
                this.snackBar.open('Помилка завантаження шаблону', 'Закрити', { duration: 5000 });
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
        this.documentTemplateService.getTemplateContent(template.id).subscribe({
            next: (content) => {
            },
            error: (error) => {
                console.error('Error getting template content:', error);
                this.snackBar.open('Помилка отримання вмісту шаблону', 'Закрити', { duration: 5000 });
            }
        });
    }

    /**
     * Публикует шаблон
     */
    publish(template: DocumentTemplate): void {
        this.documentTemplateService.publishTemplate(template.id).subscribe({
            next: () => {
                this.reload();
            },
            error: (error) => {
                console.error('Error publishing template:', error);
                this.snackBar.open('Помилка публікації шаблону', 'Закрити', { duration: 5000 });
            }
        });
    }

    /**
     * Снимает шаблон с публикации
     */
    unpublish(template: DocumentTemplate): void {
        this.documentTemplateService.unpublishTemplate(template.id).subscribe({
            next: () => {
                this.reload();
            },
            error: (error) => {
                console.error('Error unpublishing template:', error);
                this.snackBar.open('Помилка зняття шаблону з публікації', 'Закрити', { duration: 5000 });
            }
        });
    }

    /**
     * Получает читаемое название формата
     */
    getFormatLabel(format: string): string {
        return DocTemplateUtils.getFormatLabel(format);
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
        const templateFormat = DocTemplateUtils.parseFormat(template.format);
        return DocTemplateUtils.supportsClientRendering(templateFormat);
    }

    /**
     * Получает расширение файла по формату
     */
    private getFileExtension(format: string): string {
        const templateFormat = DocTemplateUtils.parseFormat(format);
        return DocTemplateUtils.getFileExtension(templateFormat);
    }
}
