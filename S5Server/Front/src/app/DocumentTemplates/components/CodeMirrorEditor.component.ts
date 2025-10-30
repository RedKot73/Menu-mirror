import { 
  Component, 
  ElementRef, 
  ViewChild, 
  AfterViewInit, 
  Input, 
  Output, 
  EventEmitter, 
  OnChanges, 
  SimpleChanges,
  OnDestroy 
} from '@angular/core';
import { EditorState } from '@codemirror/state';
import { EditorView, basicSetup } from 'codemirror';
import { html } from '@codemirror/lang-html';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { keymap } from '@codemirror/view';
import { defaultKeymap } from '@codemirror/commands';

@Component({
  selector: 'app-codemirror-editor',
  standalone: true,
  template: `
    <div #editorContainer class="codemirror-wrapper"></div>
  `,
  styles: [`
    .codemirror-wrapper {
      height: 100%;
      width: 100%;
    }
    
    :host {
      display: block;
      height: 100%;
      width: 100%;
    }
  `]
})
export class CodeMirrorEditorComponent implements AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('editorContainer', { static: true }) editorRef!: ElementRef<HTMLDivElement>;
  
  @Input() content: string = '';
  @Input() language: string = 'html'; // Підтримувані: 'html', 'javascript', 'txt', 'handlebars'
  @Input() readOnly: boolean = false;
  
  @Output() contentChange = new EventEmitter<string>();
  @Output() save = new EventEmitter<void>(); // Подія для Ctrl+S

  private view: EditorView | null = null;
  private isInitialized = false;

  ngAfterViewInit(): void {
    this.initializeEditor();
    this.isInitialized = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Оновлення контенту, якщо він змінився ззовні
    if (changes['content'] && !changes['content'].firstChange && this.view && this.isInitialized) {
      const currentValue = changes['content'].currentValue || '';
      const editorContent = this.view.state.doc.toString();
      
      // Оновлюємо тільки якщо контент відрізняється
      if (editorContent !== currentValue) {
        this.updateEditorContent(currentValue);
      }
    }

    // Перестворюємо редактор, якщо змінилася мова
    if (changes['language'] && !changes['language'].firstChange && this.view && this.isInitialized) {
      this.destroyEditor();
      this.initializeEditor();
    }

    // Оновлюємо readOnly режим
    if (changes['readOnly'] && !changes['readOnly'].firstChange && this.view && this.isInitialized) {
      // Для зміни readOnly краще перестворити редактор
      this.destroyEditor();
      this.initializeEditor();
    }
  }

  private initializeEditor(): void {
    const extensions = [
      basicSetup,
      EditorView.lineWrapping, // Автоматичне перенесення довгих рядків
      this.getLanguageExtension(),
      oneDark,
      keymap.of(defaultKeymap),
      keymap.of([
        {
          key: 'Ctrl-s',
          mac: 'Cmd-s',
          run: () => {
            this.save.emit();
            return true;
          }
        }
      ]),
      EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          const newContent = update.state.doc.toString();
          this.contentChange.emit(newContent);
        }
      }),
      EditorView.theme({
        '&': { height: '100%' },
        '.cm-scroller': { overflow: 'auto' },
        '.cm-content': { minHeight: '100%' }
      }),
      EditorState.readOnly.of(this.readOnly)
    ];

    const startState = EditorState.create({
      doc: this.content || '',
      extensions: extensions
    });

    this.view = new EditorView({
      state: startState,
      parent: this.editorRef.nativeElement
    });
  }

  private getLanguageExtension() {
    switch (this.language.toLowerCase()) {
      case 'html':
        return html();
      case 'handlebars':
        return html(); // Handlebars схожий на HTML
      case 'javascript':
      case 'json':
        return javascript();
      case 'txt':
      default:
        return [];
    }
  }

  private updateEditorContent(newContent: string): void {
    if (!this.view) {
      return;
    }

    const transaction = this.view.state.update({
      changes: { 
        from: 0, 
        to: this.view.state.doc.length, 
        insert: newContent 
      }
    });
    
    this.view.dispatch(transaction);
  }

  private destroyEditor(): void {
    if (this.view) {
      this.view.destroy();
      this.view = null;
    }
  }

  ngOnDestroy(): void {
    this.destroyEditor();
  }

  // Публічний метод для отримання поточного контенту
  public getContent(): string {
    return this.view?.state.doc.toString() || '';
  }

  // Публічний метод для програмного оновлення контенту
  public setContent(content: string): void {
    this.updateEditorContent(content);
  }

  // Публічний метод для фокусу на редакторі
  public focus(): void {
    this.view?.focus();
  }
}
