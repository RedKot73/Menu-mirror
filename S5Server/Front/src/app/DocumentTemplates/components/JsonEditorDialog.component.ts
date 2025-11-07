import { Component, Inject, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

import { CodeMirrorEditorComponent } from './CodeMirrorEditor.component';

export interface JsonEditorDialogData {
  jsonContent: string;
  readOnly: boolean;
  title?: string;
}

@Component({
  selector: 'app-json-editor-dialog',
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
  templateUrl: './JsonEditorDialog.component.html',
  styleUrl: './JsonEditorDialog.component.scss',
})
export class JsonEditorDialogComponent {
  jsonContent = signal<string>('');
  isDirty = signal<boolean>(false);

  private originalContent: string;
  private snackBar = inject(MatSnackBar);

  constructor(
    public dialogRef: MatDialogRef<JsonEditorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: JsonEditorDialogData
  ) {
    this.jsonContent.set(this.doFormatJson(data.jsonContent));
    this.originalContent = data.jsonContent;
  }

  onContentChange(newContent: string): void {
    this.jsonContent.set(newContent);
    this.isDirty.set(newContent !== this.originalContent);
  }

  formatJson(): void {
    const formatted = this.doFormatJson(this.jsonContent());
    this.jsonContent.set(formatted);
    this.isDirty.set(formatted !== this.originalContent);
  }

  doFormatJson(json: string): string {
    // Форматирование JSON
    try {
      const parsed = JSON.parse(json);
      const formatted = JSON.stringify(parsed, null, 2);
      return formatted;
    } catch (error) {
      console.error('Error formatting JSON:', error);
      this.snackBar.open('Помилка форматування JSON', 'Закрити', { duration: 5000 });
      return json;
    }
  }

  validateJson(): void {
    try {
      JSON.parse(this.jsonContent());
      this.snackBar.open('JSON валідний ✓', 'Закрити', { duration: 3000 });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.snackBar.open(`Помилка: ${errorMessage}`, 'Закрити', { duration: 5000 });
    }
  }

  onSave(): void {
    this.dialogRef.close(this.jsonContent());
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
