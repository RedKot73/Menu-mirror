import { Component, Inject, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import * as beautify from 'js-beautify';

import { CodeMirrorEditorComponent } from './CodeMirrorEditor.component';

export interface HtmlEditorDialogData {
    htmlContent: string;
    readOnly: boolean;
}

@Component({
    selector: 'app-html-editor-dialog',
    standalone: true,
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        FormsModule,
        CodeMirrorEditorComponent
    ],
    template: `
    <h2 mat-dialog-title>
      <mat-icon>code</mat-icon>
      Редагування HTML коду
    </h2>
    
    <mat-dialog-content class="html-editor-dialog-content">
      <div class="editor-toolbar">
        <button mat-icon-button
                (click)="formatHtml()"
                [disabled]="data.readOnly"
                matTooltip="Форматувати HTML код">
          <mat-icon>auto_fix_high</mat-icon>
        </button>
      </div>
      
      <app-codemirror-editor
        [content]="htmlContent()"
        [language]="'html'"
        [readOnly]="data.readOnly"
        (contentChange)="onContentChange($event)"
        class="html-editor">
      </app-codemirror-editor>
      
      @if (isDirty()) {
        <div class="dirty-indicator">
          <mat-icon>edit</mat-icon>
          <span>Є незбережені зміни</span>
        </div>
      }
    </mat-dialog-content>
    
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">
        <mat-icon>close</mat-icon>
        Скасувати
      </button>
      
      <button mat-raised-button 
              color="primary" 
              (click)="onSave()"
              [disabled]="!isDirty() || data.readOnly">
        <mat-icon>save</mat-icon>
        Застосувати
      </button>
    </mat-dialog-actions>
  `,
    styles: [`
    .html-editor-dialog-content {
      width: 80vw;
      max-width: 1200px;
      height: 70vh;
      padding: 0;
      display: flex;
      flex-direction: column;
      position: relative;
    }
    
    .editor-toolbar {
      display: flex;
      gap: 8px;
      padding: 8px;
      background-color: #f5f5f5;
      border-bottom: 1px solid #e0e0e0;
    }
    
    .html-editor {
      flex: 1;
      min-height: 0;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
    }
    
    .dirty-indicator {
      position: absolute;
      bottom: 16px;
      right: 16px;
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 12px;
      background-color: #fff3cd;
      border: 1px solid #ffc107;
      border-radius: 4px;
      color: #856404;
      font-size: 12px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      z-index: 10;
      
      mat-icon {
        font-size: 16px;
        width: 16px;
        height: 16px;
      }
    }
    
    mat-dialog-actions {
      padding: 16px 24px;
      gap: 8px;
    }
    
    h2[mat-dialog-title] {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 0;
      padding: 16px 24px;
      
      mat-icon {
        color: #1976d2;
      }
    }
  `]
})
export class HtmlEditorDialogComponent {
    htmlContent = signal<string>('');
    isDirty = signal<boolean>(false);

    private originalContent: string;
    private snackBar = inject(MatSnackBar);

    constructor(
        public dialogRef: MatDialogRef<HtmlEditorDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: HtmlEditorDialogData
    ) {
        this.htmlContent.set(this.doFormatHtml(data.htmlContent));
        this.originalContent = data.htmlContent;
    }

    onContentChange(newContent: string): void {
        this.htmlContent.set(newContent);
        this.isDirty.set(newContent !== this.originalContent);
    }

    formatHtml(): void {
        const formatted = this.doFormatHtml(this.htmlContent());
        this.htmlContent.set(formatted);
        this.isDirty.set(formatted !== this.originalContent);
    }

    doFormatHtml(html: string): string {
        // Форматирование HTML с помощью js-beautify
        try {
            const formatted = beautify.html(html, {
                indent_size: 2,
                indent_char: ' ',
                max_preserve_newlines: 2,
                preserve_newlines: true,
                indent_handlebars: true,
                wrap_line_length: 120,
                end_with_newline: true,
                unformatted: ['code', 'pre'],
                content_unformatted: ['pre', 'textarea']
            });
            return formatted;
        } catch (error) {
            console.error('Error formatting HTML:', error);
            this.snackBar.open('Помилка форматування HTML коду',
                'Закрити', { duration: 5000 });
            return html;
        }
    }

    onSave(): void {
        this.dialogRef.close(this.htmlContent());
    }

    onCancel(): void {
        if (this.isDirty()) {
            const confirmed = confirm('У вас є незбережені зміни. Ви впевнені, що хочете закрити?');
            if (!confirmed) {
                return;
            }
        }
        this.dialogRef.close();
    }
}
