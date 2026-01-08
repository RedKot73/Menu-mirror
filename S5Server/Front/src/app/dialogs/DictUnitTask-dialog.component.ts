import { ChangeDetectionStrategy, Component, Inject, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DictUnitTaskDto } from '../../ServerService/dictUnitTasks.service';
import { S5App_ErrorHandler } from '../../app/shared/models/ErrorHandler';
import { JsonKeyValueDialogComponent } from './JsonKeyValue-dialog.component';

@Component({
  selector: 'app-dict-unit-task-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatTableModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./DialogShared.scss'],
  template: `
    <h2 mat-dialog-title>{{ data.id ? 'Редагування завдання' : 'Створення завдання' }}</h2>
    <mat-dialog-content class="content">
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Назва</mat-label>
        <input matInput [(ngModel)]="data.caption" required />
      </mat-form-field>

      <div class="json-section">
        <div class="json-header">
          <h3>Опис (JSON)</h3>
          <button mat-raised-button color="primary" (click)="openJsonEditor()" type="button">
            <mat-icon>edit</mat-icon>
            Редагувати
          </button>
        </div>
        @if (keyValuePairs().length > 0) {
          <table mat-table [dataSource]="keyValuePairs()" class="json-table">
            <ng-container matColumnDef="key">
              <th mat-header-cell *matHeaderCellDef>Ключ</th>
              <td mat-cell *matCellDef="let pair">{{ pair.key }}</td>
            </ng-container>
            <ng-container matColumnDef="value">
              <th mat-header-cell *matHeaderCellDef>Значення</th>
              <td mat-cell *matCellDef="let pair" class="value-cell">
                <div class="value-text">{{ pair.value }}</div>
              </td>
            </ng-container>
            <tr mat-header-row *matHeaderRowDef="['key', 'value']"></tr>
            <tr mat-row *matRowDef="let row; columns: ['key', 'value']"></tr>
          </table>
        } @else {
          <p class="empty-message">Немає даних. Натисніть "Редагувати" для додавання.</p>
        }
      </div>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Сума (грн)</mat-label>
        <input matInput type="number" [(ngModel)]="data.amount" required />
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Коментар</mat-label>
        <textarea matInput [(ngModel)]="data.comment" rows="2"></textarea>
      </mat-form-field>

      <div class="checkbox-group">
        <mat-checkbox [(ngModel)]="data.withMeans">
          Використовуються засоби ураження (БПЛА)
        </mat-checkbox>

        <mat-checkbox [(ngModel)]="data.atPermanentPoint">
          Завдання на ППД (постійному пункті дислокації)
        </mat-checkbox>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end" class="actions">
      <button mat-button (click)="onCancel()">Скасувати</button>
      <button mat-raised-button color="primary" (click)="onSave()" [disabled]="!isValid()">
        Зберегти
      </button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      .json-section {
        width: 100%;
        margin-bottom: 16px;
      }

      .json-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
      }

      .json-header h3 {
        margin: 0;
        font-size: 14px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.6);
      }

      .json-table {
        width: 100%;
        border: 1px solid rgba(0, 0, 0, 0.12);
        border-radius: 4px;
      }

      .value-cell {
        max-width: 400px;
      }

      .value-text {
        white-space: pre-wrap;
        word-break: break-word;
      }

      .empty-message {
        padding: 16px;
        text-align: center;
        color: rgba(0, 0, 0, 0.6);
        font-style: italic;
      }
    `,
  ],
})
export class DictUnitTaskDialogComponent {
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);
  private jsonValueSignal = signal<string>('');

  keyValuePairs = computed(() => {
    const jsonString = this.jsonValueSignal();
    if (!jsonString || jsonString.trim() === '' || jsonString === '{}') {
      return [];
    }
    try {
      const parsed = JSON.parse(jsonString);
      if (typeof parsed === 'object' && !Array.isArray(parsed)) {
        return Object.entries(parsed).map(([key, value]) => ({
          key,
          value: String(value),
        }));
      }
    } catch (error) {
      console.error('Помилка парсингу JSON:', error);
    }
    return [];
  });

  constructor(
    public dialogRef: MatDialogRef<DictUnitTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Partial<DictUnitTaskDto>
  ) {
    // Установка значений по умолчанию
    if (this.data.withMeans === undefined) {
      this.data.withMeans = false;
    }
    if (this.data.atPermanentPoint === undefined) {
      this.data.atPermanentPoint = true;
    }
    if(this.data.value === undefined || this.data.value.trim() === '') {
      this.data.value = '{}';
    }
    /*
    if (this.data.amount === undefined) {
      this.data.amount = 0;
    }
    */
    // Инициализируем сигнал значением из data
    this.jsonValueSignal.set(this.data.value || '{}');
  }

  isValid(): boolean {
    return !!(
      this.data.caption?.trim() &&
      this.data.value?.trim() &&
      this.data.amount !== undefined &&
      this.data.amount >= 0
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  openJsonEditor(): void {
    const dialogRef = this.dialog.open(JsonKeyValueDialogComponent, {
      width: '1200px',
      data: {
        jsonString: this.jsonValueSignal(),
        title: 'Редагування опису завдання',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.data.value = result;
        this.jsonValueSignal.set(result);
      }
    });
  }

  onSave(): void {
    if (!this.isValid()) {
      return;
    }

    // Валідація JSON перед збереженням
    if (this.data.value?.trim()) {
      try {
        JSON.parse(this.data.value);
      } catch (error) {
        const errorMessage = S5App_ErrorHandler.handleJsonError(error);
        this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
        return;
      }
    }

    this.dialogRef.close(this.data);
  }
}
