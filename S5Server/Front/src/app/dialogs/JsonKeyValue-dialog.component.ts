import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { S5App_ErrorHandler } from '../shared/models/ErrorHandler';

interface KeyValuePair {
  key: string;
  value: string;
}

interface JsonKeyValueDialogData {
  jsonString: string;
  title?: string;
}

@Component({
  selector: 'app-json-key-value-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./DialogShared.scss'],
  template: `
    <h2 mat-dialog-title>{{ data.title || 'Редагування JSON' }}</h2>
    <mat-dialog-content class="content">
      <div class="pairs-container">
        @for (pair of pairs; track pair.key) {
        <div class="pair-row">
          <mat-form-field appearance="outline" class="key-field">
            <mat-label>Ключ</mat-label>
            <input matInput [(ngModel)]="pair.key" required />
          </mat-form-field>

          <mat-form-field appearance="outline" class="value-field">
            <mat-label>Значення</mat-label>
            <textarea matInput [(ngModel)]="pair.value" rows="4" required></textarea>
          </mat-form-field>

          <button
            mat-icon-button
            color="warn"
            (click)="removePair($index)"
            [disabled]="pairs.length === 1"
          >
            <mat-icon>delete</mat-icon>
          </button>
        </div>
        }
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="start" class="actions">
      <button mat-raised-button (click)="addPair()">
        <mat-icon>add</mat-icon>
        Додати пару
      </button>
      <button mat-raised-button (click)="onCancel()">
        <mat-icon>close</mat-icon>
        Скасувати
      </button>
      <button mat-raised-button color="primary" (click)="onSave()" [disabled]="!isValid()">
        <mat-icon>save</mat-icon>
        Зберегти
      </button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      .pairs-container {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-bottom: 16px;
        max-height: 750px;
        overflow-y: auto;
        overflow-x: hidden;
        padding-top: 10px;
      }

      .pair-row {
        display: flex;
        gap: 12px;
        align-items: flex-start;
      }

      .key-field {
        flex: 0 0 200px;
      }

      .value-field {
        flex: 1;
      }

      mat-dialog-content {
        min-width: 900px;
        max-width: 1200px;
      }
    `,
  ],
})
export class JsonKeyValueDialogComponent {
  private snackBar = inject(MatSnackBar);
  pairs: KeyValuePair[] = [];

  constructor(
    public dialogRef: MatDialogRef<JsonKeyValueDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: JsonKeyValueDialogData
  ) {
    this.initializePairs();
  }

  private initializePairs(): void {
    try {
      if (!this.data.jsonString || this.data.jsonString.trim() === '') {
        // Пустая строка - создаем одну пустую пару
        this.pairs = [{ key: '', value: '' }];
        return;
      }

      const parsed = JSON.parse(this.data.jsonString);
      if (typeof parsed !== 'object' || Array.isArray(parsed)) {
        throw new Error("JSON має бути об'єктом");
      }

      // Преобразуем объект в массив пар
      this.pairs = Object.entries(parsed).map(([key, value]) => ({
        key,
        value: String(value),
      }));

      // Если нет пар, добавляем пустую
      if (this.pairs.length === 0) {
        this.pairs = [{ key: '', value: '' }];
      }
    } catch (error) {
      console.error('Помилка парсингу JSON:', error);
      const errorMessage = S5App_ErrorHandler.handleJsonError(error);
      this.snackBar.open(`Помилка парсингу JSON: ${errorMessage}`, 'Закрити', { duration: 5000 });
      // При ошибке создаем одну пустую пару
      this.pairs = [{ key: '', value: '' }];
    }
  }

  addPair(): void {
    this.pairs.push({ key: '', value: '' });
  }

  removePair(index: number): void {
    if (this.pairs.length > 1) {
      this.pairs.splice(index, 1);
    }
  }

  isValid(): boolean {
    // Проверяем что все ключи заполнены и уникальны
    const keys = this.pairs.map((p) => p.key.trim()).filter((k) => k !== '');
    const uniqueKeys = new Set(keys);

    if (keys.length !== uniqueKeys.size) {
      return false; // Есть дубликаты ключей
    }

    // Проверяем что хотя бы одна пара заполнена полностью
    return this.pairs.some((pair) => pair.key.trim() !== '' && pair.value.trim() !== '');
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (!this.isValid()) {
      this.snackBar.open(
        'Заповніть хоча б одну пару ключ-значення з унікальними ключами',
        'Закрити',
        {
          duration: 5000,
        }
      );
      return;
    }

    // Проверяем уникальность ключей еще раз
    const keys = this.pairs.map((p) => p.key.trim()).filter((k) => k !== '');
    const uniqueKeys = new Set(keys);
    if (keys.length !== uniqueKeys.size) {
      this.snackBar.open('Ключі мають бути унікальними', 'Закрити', { duration: 5000 });
      return;
    }

    // Создаем JSON объект из пар
    const jsonObject: Record<string, string> = {};
    this.pairs.forEach((pair) => {
      const key = pair.key.trim();
      const value = pair.value.trim();
      if (key !== '' && value !== '') {
        jsonObject[key] = value;
      }
    });

    // Возвращаем JSON строку
    const jsonString = JSON.stringify(jsonObject);
    this.dialogRef.close(jsonString);
  }
}
