import { Component, inject, signal, computed, input, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { QuillModule } from 'ngx-quill';

import { ErrorHandler } from '../../shared/models/ErrorHandler';
import { HandlebarsTemplateService } from '../services/handlebars-template.service';
import { DatasetData } from '../models/template.types';

@Component({
    selector: 'app-result-editor',
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
        QuillModule
    ],
    templateUrl: './ResultEditor.component.html',
    styleUrl: './TemplateEditor.component.scss'
})
export class ResultEditorComponent {
    private handlebarsTemplateService = inject(HandlebarsTemplateService);
    private snackBar = inject(MatSnackBar);

    // Input signals для отримання контенту з інших редакторів
    templateContent = input<string>('');
    dataSetContent = input<string>('');

    // Стан завантаження
    isProcessing = signal<boolean>(false);
    processError = signal<string>('');

    // Результат обробки
    resultContent = signal<string>('');

    // Конфігурація модулів Quill для readonly режиму
    editorModules = {
        toolbar: false // Вимикаємо toolbar для readonly
    };

    // Стили редактора
    editorStyles = {
        height: '100%'
    };

    // Обчислюване значення: чи є контент для обробки
    hasContent = computed(() => {
        return this.templateContent().trim() !== '' || 
               this.dataSetContent().trim() !== '';
    });

    // Обчислюване значення: чи можна обробити
    canProcess = computed(() => {
        return this.templateContent().trim() !== '' &&
               this.dataSetContent().trim() !== '' &&
               !this.isProcessing();
    });

    constructor() {
        // Реагуємо на зміну контенту
        effect(() => {
            const template = this.templateContent();
            const dataSet = this.dataSetContent();
            
            // Автоматично обробляємо при зміні контенту, якщо обидва поля заповнені
            if (template && dataSet) {
                this.processTemplate();
            } else {
                this.resultContent.set('');
                this.processError.set('');
            }
        });
    }

    /**
     * Обробляє шаблон з даними
     */
    processTemplate(): void {
        const template = this.templateContent();
        const dataSet = this.dataSetContent();

        if (!template || !dataSet) {
            this.snackBar.open('Необхідно заповнити шаблон і дані', 'Закрити', { duration: 3000 });
            return;
        }

        this.isProcessing.set(true);
        this.processError.set('');

        try {
            // Валідація JSON
            let data: DatasetData;
            try {
                data = JSON.parse(dataSet) as DatasetData;
            } catch(e) {
                const jsonError = ErrorHandler.handleJsonError(e);
                throw new Error(jsonError);
            }

            // Виклик API для обробки шаблону
            const result = this.handlebarsTemplateService.renderTemplate(template, data);
            
            this.resultContent.set(result.content || '');
            this.isProcessing.set(false);
        } catch (error) {
            //console.error('Error processing template:', error);
            const errorMessage = ErrorHandler.handleGenericError(error, 'Помилка обробки шаблону');
            this.processError.set(errorMessage);
            this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
            this.isProcessing.set(false);
        }
    }

    /**
     * Очищує результат
     */
    clearResult(): void {
        this.resultContent.set('');
        this.processError.set('');
    }
}
