import { Component, inject, signal, computed, effect, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { DocumentTemplateService } from '../services/document-template.service';
import { TemplateDto } from '../models/document-template.models';
import { DocTemplateUtils } from '../models/shared.models';
import { ANGULAR_EDITOR_BASE_CONFIG } from './angular-editor.config';

@Component({
    selector: 'app-template-editor',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        MatChipsModule,
        AngularEditorModule
    ],
    templateUrl: './TemplateEditor.component.html',
    styleUrl: './Editors.component.scss'
})
export class TemplateEditorComponent {
    private documentTemplateService = inject(DocumentTemplateService);
    private snackBar = inject(MatSnackBar);

    // Input signal для отримання шаблону ззовні
    template = input<TemplateDto | null>(null);

    // Стан завантаження та помилок
    isLoading = signal<boolean>(false);
    loadError = signal<string>('');

    // Контент редактора
    editorContent = signal<string>('');

    // Збереження оригінального контенту для порівняння
    private originalContent = signal<string>('');

    // Signal для відстеження змін
    formDirty = signal<boolean>(false);

    // Конфігурація Angular Editor (використовуємо базову конфігурацію)
    editorConfig = ANGULAR_EDITOR_BASE_CONFIG;

    // Обчислюване значення: чи є шаблон тільки для читання
    isReadonly = computed(() => {
        return this.template()!.isPublished;
            /*this.template() !== null*/
    });

    // Обчислюване значення: чи можна зберегти
    canSave = computed(() => {
        return this.template() !== null &&
            this.formDirty() &&
            !this.isLoading();
    });

    constructor() {
        // Реагуємо на зміну шаблону
        effect(() => {
            const currentTemplate = this.template();
            
            if (currentTemplate) {
                // Завантажуємо контент з сервера
                this.loadTemplateContent(currentTemplate);
            } else {
                this.clearEditor();
            }
        });
    }

    /**
     * Обробник зміни контенту в TinyMCE
     */
    onEditorContentChange(newContent: string): void {
        this.editorContent.set(newContent);
        
        // Перевіряємо, чи контент відрізняється від оригіналу
        if (newContent !== this.originalContent()) {
            this.formDirty.set(true);
        } else {
            this.formDirty.set(false);
        }
    }

    /**
     * Завантажує вміст шаблону з сервера
     */
    private loadTemplateContent(template: TemplateDto): void {
        // Перевіряємо, чи підтримується перегляд для цього формату
        if (!this.supportsEditing(template)) {
            this.loadError.set(`Формат "${template.format}" не підтримується для редагування`);
            this.clearEditor();
            return;
        }

        this.isLoading.set(true);
        this.loadError.set('');

        this.documentTemplateService.getTemplateContent(template.id).subscribe({
            next: (content: string) => {
                // Встановлюємо HTML контент
                this.editorContent.set(content);
                this.originalContent.set(content);
                this.formDirty.set(false);
                this.isLoading.set(false);
            },
            error: (error) => {
                console.error('Error loading template content:', error);
                const errorMessage = error?.error?.message || 'Помилка завантаження вмісту шаблону';
                this.loadError.set(errorMessage);
                this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
                this.isLoading.set(false);
            }
        });
    }

    /**
     * Зберігає відредагований вміст шаблону
     */
    saveTemplateContent(): void {
        const currentTemplate = this.template();

        if (!currentTemplate) {
            this.snackBar.open('Шаблон не вибрано для збереження', 'Закрити', { duration: 3000 });
            return;
        }

        if (!this.formDirty()) {
            this.snackBar.open('Немає змін для збереження', 'Закрити', { duration: 3000 });
            return;
        }

        // Отримуємо HTML контент для Handlebars
        const newContent = this.editorContent();
        this.isLoading.set(true);

        this.documentTemplateService.saveTemplateContent(currentTemplate.id, newContent).subscribe({
            next: () => {
                this.snackBar.open('Шаблон успішно збережено!', 'Закрити', { duration: 3000 });
                this.formDirty.set(false);
                this.originalContent.set(newContent);
                this.isLoading.set(false);
            },
            error: (error) => {
                console.error('Error saving template content:', error);
                const errorMessage = error?.error?.message || 'Помилка збереження шаблону';
                this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
                this.isLoading.set(false);
            }
        });
    }

    /**
     * Перезавантажує контент з сервера
     */
    reloadContent(): void {
        const currentTemplate = this.template();
        if (currentTemplate) {
            if (this.formDirty()) {
                const confirmed = confirm('У вас є незбережені зміни. Ви впевнені, що хочете перезавантажити?');
                if (!confirmed) {
                    return;
                }
            }
            this.loadTemplateContent(currentTemplate);
        }
    }

    /**
     * Очищує редактор
     */
    private clearEditor(): void {
        this.editorContent.set('');
        this.originalContent.set('');
        this.formDirty.set(false);
    }
    /**
     * Перевіряє, чи підтримується редагування для даного формату
     */
    private supportsEditing(template: TemplateDto): boolean {
        // Підтримуємо редагування тільки текстових форматів
        const editableFormats = ['html', 'txt', 'handlebars'];
        return editableFormats.includes(template.format.toLowerCase());
    }

    /**
     * Получает читаемое название статуса публикации
     */
    getStatusLabel(isPublished: boolean): string {
        return DocTemplateUtils.getStatusLabel(isPublished);
    }
}
