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

import { TemplateDataSetService } from '../services/template-dataset.service';
import { TemplateDataSetListItem, TemplateDataSetDto } from '../models/template-dataset.models';
import { CodeMirrorEditorComponent } from './CodeMirrorEditor.component';
import { DocTemplateUtils } from '../models/shared.models';

@Component({
    selector: 'app-dataset-editor',
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
    templateUrl: './DataSetEditor.component.html',
    styleUrl: './TemplateEditor.component.scss'
})
export class DataSetEditorComponent {
    private dataSetService = inject(TemplateDataSetService);
    private snackBar = inject(MatSnackBar);

    // Input signal для отримання набору даних ззовні
    dataSet = input<TemplateDataSetListItem | null>(null);

    // Стан завантаження та помилок
    isLoading = signal<boolean>(false);
    loadError = signal<string>('');

    // Повні дані набору
    private fullDataSet = signal<TemplateDataSetDto | null>(null);

    // FormControl для редагування JSON контенту
    dataJsonControl = new FormControl<string>('', { nonNullable: true });

    // Збереження оригінального контенту для порівняння
    private originalContent = signal<string>('');

    // Signal для відстеження стану форми
    private formDirty = signal<boolean>(false);

    // Обчислюване значення: чи є набір даних тільки для читання
    isReadonly = computed(() => {
        return this.dataSet() !== null &&
            this.dataSet()!.isPublished;
    });

    // Обчислюване значення: чи можна зберегти
    canSave = computed(() => {
        return this.dataSet() !== null &&
            this.formDirty() &&
            !this.isLoading();
    });

    constructor() {
        // Реагуємо на зміну набору даних
        effect(() => {
            const currentDataSet = this.dataSet();
            if (currentDataSet) {
                this.loadDataSetContent(currentDataSet);
            } else {
                this.clearEditor();
            }
        });

        // Відслідковуємо зміни у формі
        this.dataJsonControl.valueChanges.subscribe(() => {
            this.formDirty.set(this.dataJsonControl.dirty);
        });
    }

    /**
     * Обробник зміни контенту в CodeMirror редакторі
     */
    onEditorContentChange(newContent: string): void {
        this.dataJsonControl.setValue(newContent);
        this.dataJsonControl.markAsDirty();
        this.formDirty.set(true);
    }

    /**
     * Завантажує повний вміст набору даних з сервера
     */
    private loadDataSetContent(dataSet: TemplateDataSetListItem): void {
        this.isLoading.set(true);
        this.loadError.set('');

        this.dataSetService.getDataSet(dataSet.id).subscribe({
            next: (fullData: TemplateDataSetDto) => {
                this.fullDataSet.set(fullData);
                
                // Встановлюємо значення у форму
                this.dataJsonControl.setValue(fullData.dataJson);
                this.dataJsonControl.markAsPristine();
                this.dataJsonControl.markAsUntouched();
                this.formDirty.set(false);
                this.originalContent.set(fullData.dataJson);
                this.isLoading.set(false);
            },
            error: (error) => {
                console.error('Error loading dataset content:', error);
                const errorMessage = error?.error?.message || 'Помилка завантаження вмісту набору даних';
                this.loadError.set(errorMessage);
                this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
                this.isLoading.set(false);
            }
        });
    }

    /**
     * Зберігає відредагований вміст набору даних
     */
    saveDataSetContent(): void {
        const currentDataSet = this.dataSet();
        const fullData = this.fullDataSet();

        if (!currentDataSet || !fullData) {
            this.snackBar.open('Набір даних не вибрано для збереження', 'Закрити', { duration: 3000 });
            return;
        }

        if (!this.dataJsonControl.dirty) {
            this.snackBar.open('Немає змін для збереження', 'Закрити', { duration: 3000 });
            return;
        }

        // Валідація JSON
        const dataJson = this.dataJsonControl.value;
        try {
            JSON.parse(dataJson);
        } catch {
            this.snackBar.open('Невалідний JSON формат', 'Закрити', { duration: 5000 });
            return;
        }

        const updateData = {
            ...fullData,
            dataJson: dataJson
        };

        this.isLoading.set(true);

        this.dataSetService.updateDataSet(currentDataSet.id, updateData).subscribe({
            next: () => {
                this.snackBar.open('Набір даних успішно збережено!', 'Закрити', { duration: 3000 });
                this.dataJsonControl.markAsPristine();
                this.formDirty.set(false);
                this.originalContent.set(dataJson);
                this.isLoading.set(false);
            },
            error: (error) => {
                console.error('Error saving dataset content:', error);
                const errorMessage = error?.error?.message || 'Помилка збереження набору даних';
                this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
                this.isLoading.set(false);
            }
        });
    }

    /**
     * Перезавантажує контент з сервера
     */
    reloadContent(): void {
        const currentDataSet = this.dataSet();
        if (currentDataSet) {
            if (this.dataJsonControl.dirty) {
                const confirmed = confirm('У вас є незбережені зміни. Ви впевнені, що хочете перезавантажити?');
                if (!confirmed) {
                    return;
                }
            }
            this.loadDataSetContent(currentDataSet);
        }
    }

    /**
     * Очищує редактор
     */
    private clearEditor(): void {
        this.dataJsonControl.setValue('');
        this.dataJsonControl.markAsPristine();
        this.dataJsonControl.markAsUntouched();
        this.formDirty.set(false);
        this.originalContent.set('');
        this.fullDataSet.set(null);
    }

    /**
     * Форматує JSON для кращого відображення
     */
    formatJson(): void {
        const dataJson = this.dataJsonControl.value;
        try {
            const parsed = JSON.parse(dataJson);
            const formatted = JSON.stringify(parsed, null, 2);
            this.dataJsonControl.setValue(formatted);
            this.dataJsonControl.markAsDirty();
            this.formDirty.set(true);
        } catch {
            this.snackBar.open('Невалідний JSON формат', 'Закрити', { duration: 3000 });
        }
    }

    /**
     * Отримує читабельну назву статусу публікації
     */
    getStatusLabel(isPublished: boolean): string {
        return DocTemplateUtils.getStatusLabel(isPublished);
    }
}
