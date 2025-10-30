import { Component, inject, signal, computed, effect, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { QuillModule } from 'ngx-quill';
import Quill from 'quill';
import { html as beautifyHtml } from 'js-beautify';
import { CodeMirrorEditorComponent } from './CodeMirrorEditor.component';

import { DocumentTemplateService } from '../services/document-template.service';
import { TemplateDto } from '../models/document-template.models';
import { DocTemplateUtils } from '../models/shared.models';

@Component({
    selector: 'app-template-editor',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        MatChipsModule,
        MatSlideToggleModule,
        QuillModule,
        CodeMirrorEditorComponent
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

    // FormControl для синхронізації між редакторами
    templateContentControl = new FormControl<string>('');

    // Signal для відображення в Quill (використовуємо FormControl.value)
    editorContent = signal<string>('');

    // Режим редактора: false = Text (Quill), true = HTML (CodeMirror)
    isHtmlMode = signal<boolean>(false);

    // Збереження оригінального контенту для порівняння
    private originalContent = signal<string>('');

    // Signal для відстеження стану форми
    formDirty = computed(() => this.templateContentControl.dirty);

    // Інстанс Quill редактора
    private quillEditor: Quill | null = null;

    // Конфігурація модулів Quill
    editorModules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ align: [] }],
            [{ color: [] }, { background: [] }],
            ['link'],
            ['blockquote', 'code-block'],
            ['clean']
        ]
    };

    // Обчислюване значення: чи є шаблон тільки для читання
    isReadonly = computed(() => {
        return this.template() !== null &&
            this.template()!.isPublished;
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
                this.loadTemplateContent(currentTemplate);
            } else {
                this.clearEditor();
            }
        });
    }

    /**
     * Викликається при створенні Quill редактора
     */
    onEditorCreated(quill: Quill): void {
        this.quillEditor = quill;
    }

    /**
     * Обробник зміни контенту в Quill редакторі
     */
    onEditorContentChange(_event: unknown): void {
        // FormControl.dirty автоматично оновлюється
        // Синхронізуємо з signal
        this.editorContent.set(this.templateContentControl.value || '');
    }

    /**
     * Обробник зміни контенту в CodeMirror редакторі
     */
    onCodeMirrorContentChange(newContent: string): void {
        this.templateContentControl.setValue(newContent);
        this.templateContentControl.markAsDirty();
    }

    /**
     * Перемикач між Text (Quill) та HTML (CodeMirror) режимами
     */
    toggleEditorMode(): void {
        const currentContent = this.templateContentControl.value || '';
        this.isHtmlMode.update(mode => !mode);
        
        // Синхронізуємо контент при перемиканні
        if (this.isHtmlMode()) {
            // Переходимо в HTML режим - форматуємо HTML для читабельності
            const formattedHtml = this.formatHtml(currentContent);
            this.templateContentControl.setValue(formattedHtml);
        } else {
            // Переходимо в Text режим - оновлюємо signal для Quill
            this.editorContent.set(currentContent);
        }
    }

    /**
     * Форматує HTML для кращої читабельності
     */
    private formatHtml(html: string): string {
        if (!html || html.trim() === '') {
            return html;
        }

        try {
            return beautifyHtml(html, {
                indent_size: 2,
                indent_char: ' ',
                max_preserve_newlines: 2,
                preserve_newlines: true,
                end_with_newline: false,
                wrap_line_length: 0,
                indent_inner_html: true,
                unformatted: ['code', 'pre'],
                content_unformatted: ['pre', 'textarea'],
                extra_liners: []
            });
        } catch (error) {
            console.error('Помилка форматування HTML:', error);
            return html;
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
                // Встановлюємо HTML контент в FormControl
                this.templateContentControl.setValue(content, { emitEvent: false });
                this.templateContentControl.markAsPristine();
                this.editorContent.set(content);
                this.originalContent.set(content);
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
        const newContent = this.templateContentControl.value || '';
        this.isLoading.set(true);

        this.documentTemplateService.saveTemplateContent(currentTemplate.id, newContent).subscribe({
            next: () => {
                this.snackBar.open('Шаблон успішно збережено!', 'Закрити', { duration: 3000 });
                this.templateContentControl.markAsPristine();
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
        this.templateContentControl.reset('', { emitEvent: false });
        this.originalContent.set('');
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
