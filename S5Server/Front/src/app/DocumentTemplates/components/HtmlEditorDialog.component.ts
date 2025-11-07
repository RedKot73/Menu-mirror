import { Component, Inject, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import beautify from 'js-beautify';

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
    CodeMirrorEditorComponent,
  ],
  templateUrl: './HtmlEditorDialog.component.html',
  styleUrl: './HtmlEditorDialog.component.scss',
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
        content_unformatted: ['pre', 'textarea'],
      });
      return formatted;
    } catch (error) {
      console.error('Error formatting HTML:', error);
      this.snackBar.open('Помилка форматування HTML коду', 'Закрити', { duration: 5000 });
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
