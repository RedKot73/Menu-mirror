import { Component, inject, signal, computed, effect, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';

import { DocumentTemplateService } from '../services/document-template.service';
import { TemplateDto } from '../models/document-template.models';
import { CodeMirrorEditorComponent } from './CodeMirrorEditor.component';
import { DocTemplateUtils } from '../models/shared.models';

@Component({
    selector: 'app-template-editor',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        MatChipsModule,
        CodeMirrorEditorComponent
    ],
    templateUrl: './TemplateEditor.component.html',
    styleUrl: './TemplateEditor.component.scss'
})
export class TemplateEditorComponent {
    private documentTemplateService = inject(DocumentTemplateService);
    private snackBar = inject(MatSnackBar);

    // Input signal для отримання шаблону ззовні
    template = input<TemplateDto | null>(null);

    // Стан завантаження та помилок
    isLoading = signal<boolean>(false);
    loadError = signal<string>('');

    // FormControl для редагування контенту
    templateContentControl = new FormControl<string>('', { nonNullable: true });

    // Збереження оригінального контенту для порівняння
    private originalContent = signal<string>('');

    // Signal для відстеження стану форми
    private formDirty = signal<boolean>(false);

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
     * Обробник зміни контенту в CodeMirror редакторі
     */
    onEditorContentChange(newContent: string): void {
        this.templateContentControl.setValue(newContent);
        this.templateContentControl.markAsDirty();
        this.formDirty.set(true);
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
                // Встановлюємо значення
                this.templateContentControl.setValue(content);
                this.templateContentControl.markAsPristine();
                this.templateContentControl.markAsUntouched();
                this.formDirty.set(false);
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

        if (!this.templateContentControl.dirty) {
            this.snackBar.open('Немає змін для збереження', 'Закрити', { duration: 3000 });
            return;
        }

        const newContent = this.templateContentControl.value;
        this.isLoading.set(true);

        this.documentTemplateService.saveTemplateContent(currentTemplate.id, newContent).subscribe({
            next: () => {
                this.snackBar.open('Шаблон успішно збережено!', 'Закрити', { duration: 3000 });
                this.templateContentControl.markAsPristine();
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
            if (this.templateContentControl.dirty) {
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
        this.templateContentControl.setValue('');
        this.templateContentControl.markAsPristine();
        this.templateContentControl.markAsUntouched();
        this.formDirty.set(false);
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
