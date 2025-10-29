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

    /**
     * Експортує результат у Word (.doc)
     * Використовуємо експорт HTML, який Word може відкрити
     */
    async exportToWord(): Promise<void> {
        const content = this.resultContent();
        
        if (!content) {
            this.snackBar.open('Немає контенту для експорту', 'Закрити', { duration: 3000 });
            return;
        }

        try {
            // Динамічний імпорт file-saver
            const { saveAs } = await import('file-saver');

            // Створюємо HTML документ з правильним форматуванням для Word
            const htmlContent = `
<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
    <meta charset="utf-8">
    <title>Результат обробки шаблону</title>
    <!--[if gte mso 9]>
    <xml>
        <w:WordDocument>
            <w:View>Print</w:View>
            <w:Zoom>100</w:Zoom>
            <w:DoNotOptimizeForBrowser/>
        </w:WordDocument>
    </xml>
    <![endif]-->
    <style>
        @page WordSection1 {
            size: 595.3pt 841.9pt;
            margin: 72pt 90pt 72pt 90pt;
        }
        div.WordSection1 { page: WordSection1; }
        body {
            font-family: 'Calibri', sans-serif;
            font-size: 11pt;
            line-height: 1.15;
        }
        p { margin: 0; padding: 0; }
        table { border-collapse: collapse; }
        table, th, td { border: 1px solid black; }
    </style>
</head>
<body>
    <div class="WordSection1">
        ${content}
    </div>
</body>
</html>`;

            // Створюємо Blob з HTML контентом
            const blob = new Blob([htmlContent], { 
                type: 'application/vnd.ms-word;charset=utf-8' 
            });

            // Генеруємо ім'я файлу з датою
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
            const fileName = `template_result_${timestamp}.doc`;

            // Зберігаємо файл
            saveAs(blob, fileName);

            this.snackBar.open(`Файл ${fileName} збережено!`, 'Закрити', { duration: 3000 });
        } catch (error) {
            console.error('Error exporting to Word:', error);
            const errorMessage = ErrorHandler.handleGenericError(error, 'Помилка експорту в Word');
            this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
        }
    }

    /**
     * Експортує результат у RTF формат
     * RTF добре підтримується Word та іншими редакторами
     */
    async exportToRtf(): Promise<void> {
        const content = this.resultContent();
        
        if (!content) {
            this.snackBar.open('Немає контенту для експорту', 'Закрити', { duration: 3000 });
            return;
        }

        try {
            // Динамічний імпорт file-saver
            const { saveAs } = await import('file-saver');

            // Конвертуємо HTML в RTF
            const rtfContent = this.convertHtmlToRtf(content);

            // Створюємо Blob з RTF контентом
            const blob = new Blob([rtfContent], { 
                type: 'application/rtf' 
            });

            // Генеруємо ім'я файлу з датою
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
            const fileName = `template_result_${timestamp}.rtf`;

            // Зберігаємо файл
            saveAs(blob, fileName);

            this.snackBar.open(`Файл ${fileName} збережено!`, 'Закрити', { duration: 3000 });
        } catch (error) {
            console.error('Error exporting to RTF:', error);
            const errorMessage = ErrorHandler.handleGenericError(error, 'Помилка експорту в RTF');
            this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
        }
    }

    /**
     * Конвертує HTML в RTF формат (базова реалізація)
     */
    private convertHtmlToRtf(html: string): string {
        // Створюємо тимчасовий елемент для парсингу HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;

        // Заголовок RTF документа
        let rtf = '{\\rtf1\\ansi\\deff0\n';
        
        // Таблиця шрифтів
        rtf += '{\\fonttbl{\\f0\\fnil\\fcharset204 Calibri;}}\n';
        
        // Таблиця кольорів
        rtf += '{\\colortbl;\\red0\\green0\\blue0;\\red255\\green0\\blue0;}\n';
        
        // Основний контент
        rtf += '\\viewkind4\\uc1\\pard\\lang1058\\f0\\fs22\n';

        // Обробляємо вузли
        rtf += this.processNodeToRtf(tempDiv);

        // Закриваємо документ
        rtf += '\n}';

        return rtf;
    }

    /**
     * Рекурсивно обробляє HTML вузли в RTF
     */
    private processNodeToRtf(node: Node): string {
        let rtf = '';

        if (node.nodeType === Node.TEXT_NODE) {
            // Текстовий вузол - екрануємо спецсимволи RTF
            const text = node.textContent || '';
            rtf += this.escapeRtf(text);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as HTMLElement;
            const tagName = element.tagName.toLowerCase();

            switch (tagName) {
                case 'p':
                    rtf += this.processInlineRtf(element);
                    rtf += '\\par\n';
                    break;

                case 'br':
                    rtf += '\\line\n';
                    break;

                case 'strong':
                case 'b':
                    rtf += '{\\b ';
                    rtf += this.processInlineRtf(element);
                    rtf += '}';
                    break;

                case 'em':
                case 'i':
                    rtf += '{\\i ';
                    rtf += this.processInlineRtf(element);
                    rtf += '}';
                    break;

                case 'u':
                    rtf += '{\\ul ';
                    rtf += this.processInlineRtf(element);
                    rtf += '}';
                    break;

                case 'h1':
                    rtf += '{\\b\\fs32 ';
                    rtf += this.processInlineRtf(element);
                    rtf += '}\\par\n';
                    break;

                case 'h2':
                    rtf += '{\\b\\fs28 ';
                    rtf += this.processInlineRtf(element);
                    rtf += '}\\par\n';
                    break;

                case 'h3':
                    rtf += '{\\b\\fs24 ';
                    rtf += this.processInlineRtf(element);
                    rtf += '}\\par\n';
                    break;

                case 'ul':
                case 'ol':
                    Array.from(element.children).forEach((li, index) => {
                        if (li.tagName.toLowerCase() === 'li') {
                            const bullet = tagName === 'ul' ? '\\bullet' : `${index + 1}.`;
                            rtf += `${bullet}\\tab `;
                            rtf += this.processInlineRtf(li);
                            rtf += '\\par\n';
                        }
                    });
                    break;

                case 'div':
                    // Обробляємо вкладені елементи
                    Array.from(element.childNodes).forEach(child => {
                        rtf += this.processNodeToRtf(child);
                    });
                    break;

                default:
                    // Для інших тегів обробляємо дочірні вузли
                    Array.from(element.childNodes).forEach(child => {
                        rtf += this.processNodeToRtf(child);
                    });
                    break;
            }
        }

        return rtf;
    }

    /**
     * Обробляє inline елементи (жирний, курсив тощо)
     */
    private processInlineRtf(element: Element): string {
        let rtf = '';
        
        Array.from(element.childNodes).forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                rtf += this.escapeRtf(node.textContent || '');
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                rtf += this.processNodeToRtf(node);
            }
        });

        return rtf;
    }

    /**
     * Екранує спеціальні символи для RTF
     */
    private escapeRtf(text: string): string {
        return text
            .replace(/\\/g, '\\\\')
            .replace(/{/g, '\\{')
            .replace(/}/g, '\\}')
            .replace(/\n/g, '\\par\n')
            .replace(/[\u0080-\uffff]/g, (char) => {
                return '\\u' + char.charCodeAt(0) + '?';
            });
    }
}
