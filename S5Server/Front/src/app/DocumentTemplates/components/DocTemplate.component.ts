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
    templateUrl: './DocTemplate.component.html',
    styleUrl: './DocTemplate.component.scss'
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
    displayedColumns = ['menu', 'name', 'format', 'status', 'category', 'description', 'created', 'updated'];

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
