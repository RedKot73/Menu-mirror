import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import Quill from 'quill';

@Component({
    selector: 'app-quill-demo',
    standalone: true,
    styleUrls: ['./QuillDemo.component.scss'],
    imports: [
        CommonModule,
        FormsModule,
        QuillModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatDividerModule,
        MatSlideToggleModule
    ],
    templateUrl: './QuillDemo.component.html'
})
export class QuillDemoComponent {
    // Используем Delta (JSON) вместо HTML для лучшей совместимости
    editorContent = signal<any>({
        ops: [
            { insert: 'Вітаємо! Це приклад використання ' },
            { insert: 'Quill', attributes: { bold: true } },
            { insert: ' WYSIWYG редактора.\n' }
        ]
    });

    // Режим только для чтения
    readOnly = signal(false);

    // Конфигурация модулей Quill
    editorModules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ align: [] }],
            [{ color: [] }, { background: [] }],
            ['link', 'image', 'video'],
            ['blockquote', 'code-block'],
            ['clean']
        ]
    };

    // Стили редактора
    editorStyles = {
        height: '400px'
    };

    // Инстанс редактора Quill
    private quillEditor: Quill | null = null;

    /**
     * Вызывается при создании редактора
     */
    onEditorCreated(quill: Quill): void {
        //console.log('Quill editor created:', quill);
        this.quillEditor = quill;
    }

    /**
     * Вызывается при изменении контента
     */
    onContentChanged(event: any): void {
        /*
        console.log('Content changed:', {
            delta: event.delta,
            source: event.source,
            text: event.text,
            html: event.html
        });
        */
    }

    /**
     * Вызывается при изменении выделения
     */
    onSelectionChanged(event: any): void {
        /*
        console.log('Selection changed:', {
            range: event.range,
            oldRange: event.oldRange,
            source: event.source
        });
        */
    }

    /**
     * Получить HTML представление контента
     */
    getHtmlContent(): string {
        if (this.quillEditor) {
            // Используем getSemanticHTML() для Quill v2
            return this.quillEditor.getSemanticHTML();
        }
        return '';
    }

    /**
     * Получить Delta (JSON) представление контента
     */
    getDeltaContent(): any {
        if (this.quillEditor) {
            return this.quillEditor.getContents();
        }
        return null;
    }

    /**
     * Получить текст без форматирования
     */
    getTextContent(): string {
        if (this.quillEditor) {
            return this.quillEditor.getText();
        }
        return '';
    }

    /**
     * Очистить содержимое редактора
     */
    clearContent(): void {
        this.editorContent.set({ ops: [] });
    }

    /**
     * Загрузить пример контента
     */
    loadSample(): void {
        this.editorContent.set({
            ops: [
                { insert: 'Заголовок 1\n', attributes: { header: 1 } },
                { insert: 'Заголовок 2\n', attributes: { header: 2 } },
                { insert: 'Заголовок 3\n', attributes: { header: 3 } },
                { insert: '\nЦе параграф з ' },
                { insert: 'жирним', attributes: { bold: true } },
                { insert: ', ' },
                { insert: 'курсивом', attributes: { italic: true } },
                { insert: ', ' },
                { insert: 'підкресленим', attributes: { underline: true } },
                { insert: ' та ' },
                { insert: 'закресленим', attributes: { strike: true } },
                { insert: ' текстом.\n\n' },
                { insert: 'Цей текст вирівняний по центру\n', attributes: { align: 'center' } },
                { insert: 'Цей текст вирівняний справа\n', attributes: { align: 'right' } },
                { insert: '\nЦе цитата. Quill дозволяє легко форматувати текст.\n', attributes: { blockquote: true } },
                { insert: '\nНумерований список:\n' },
                { insert: 'Перший пункт\n', attributes: { list: 'ordered' } },
                { insert: 'Другий пункт\n', attributes: { list: 'ordered' } },
                { insert: 'Третій пункт\n', attributes: { list: 'ordered' } },
                { insert: '\nМаркований список:\n' },
                { insert: 'Пункт A\n', attributes: { list: 'bullet' } },
                { insert: 'Пункт B\n', attributes: { list: 'bullet' } },
                { insert: 'Пункт C\n', attributes: { list: 'bullet' } },
                { insert: '\n' },
                { insert: 'Посилання на Quill', attributes: { link: 'https://quilljs.com' } },
                { insert: '\n\nБлок коду:\n' },
                { insert: '// Приклад коду\nfunction example() {\n  console.log("Hello Quill!");\n}\n', attributes: { 'code-block': true } },
                { insert: '\n' },
                { insert: 'Червоний текст', attributes: { color: '#e60000' } },
                { insert: ', ' },
                { insert: 'синій текст', attributes: { color: '#0066cc' } },
                { insert: ', ' },
                { insert: 'текст з жовтим фоном', attributes: { background: '#ffff00' } },
                { insert: '\n' }
            ]
        });
    }

    /**
     * Переключити режим только для чтения
     */
    toggleReadOnly(): void {
        this.readOnly.update(value => !value);
    }

    /**
     * Логирование контента в консоль
     */
    logContent(): void {
        console.log('=== Quill Content ===');
        console.log('Delta (JSON):', this.getDeltaContent());
        console.log('HTML:', this.getHtmlContent());
        console.log('Text:', this.getTextContent());
    }
}
