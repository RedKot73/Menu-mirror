import {
    Component, inject, signal, computed,
    effect, input, OnInit, OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import {
  NgxEditorComponent,
  NgxEditorMenuComponent,
  Editor,
  NgxEditorModule,
  Toolbar,
} from 'ngx-editor';

import { DocumentTemplateService } from '../services/document-template.service';
import { TemplateDto } from '../models/document-template.models';
import { DocTemplateUtils } from '../models/shared.models';
import { NGX_EDITOR_TOOLBAR, NGX_EDITOR_TOOLBAR_READONLY } from './ngx-editor.config';
import { HtmlEditorDialogComponent } from './HtmlEditorDialog.component';

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
    NgxEditorModule,
    NgxEditorComponent,
    NgxEditorMenuComponent,
  ],
  templateUrl: './TemplateEditor.component.html',
  styleUrl: './Editors.component.scss',
})
export class TemplateEditorComponent implements OnInit, OnDestroy {
  private documentTemplateService = inject(DocumentTemplateService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  // Инстанс ngx-editor
  editor!: Editor;

  // Панель инструментов
  toolbar: Toolbar = NGX_EDITOR_TOOLBAR;

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

  // Обчислюване значення: чи є шаблон тільки для читання
  isReadonly = computed(() => {
    return this.template()!.isPublished;
    /*this.template() !== null*/
  });

  // Обчислюване значення: чи можна зберегти
  canSave = computed(() => {
    return this.template() !== null && this.formDirty() && !this.isLoading();
  });

  constructor() {
    // Создаем экземпляр редактора
    //this.editor = new Editor();

    // Реагуємо на зміну шаблону
    effect(() => {
      const currentTemplate = this.template();

      // Обновляем панель инструментов в зависимости от режима
      if (currentTemplate?.isPublished) {
        this.toolbar = NGX_EDITOR_TOOLBAR_READONLY;
      } else {
        this.toolbar = NGX_EDITOR_TOOLBAR;
      }

      if (currentTemplate) {
        // Завантажуємо контент з сервера
        this.loadTemplateContent(currentTemplate);
      } else {
        this.clearEditor();
      }
    });
  }

  ngOnInit(): void {
    this.editor = new Editor();
  }

  /**
   * Очистка ресурсов при уничтожении компонента
   */
  ngOnDestroy(): void {
    this.editor.destroy();
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
      },
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
      },
    });
  }

  /**
   * Перезавантажує контент з сервера
   */
  reloadContent(): void {
    const currentTemplate = this.template();
    if (currentTemplate) {
      if (this.formDirty()) {
        const confirmed = confirm(
          'У вас є незбережені зміни. Ви впевнені, що хочете перезавантажити?'
        );
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

  /**
   * Открывает диалог для редактирования HTML кода
   */
  editAsHTML(): void {
    const htmlContent = this.editorContent();

    const dialogRef = this.dialog.open(HtmlEditorDialogComponent, {
      width: '90vw',
      maxWidth: '1400px',
      height: '80vh',
      data: {
        htmlContent: htmlContent,
        readOnly: this.isReadonly(),
      },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result: string | undefined) => {
      if (result !== undefined && result !== htmlContent) {
        // Пользователь сохранил изменения
        this.editorContent.set(result);
        this.formDirty.set(true);
        this.snackBar.open('HTML код оновлено', 'Закрити', { duration: 3000 });
      }
    });
  }
}
