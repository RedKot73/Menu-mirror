import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DictUnitTaskDto } from '../../ServerService/dictUnitTasks.service';
import { ErrorHandler } from '../../app/shared/models/ErrorHandler';

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

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Опис (JSON)</mat-label>
        <textarea matInput [(ngModel)]="data.value" rows="4" required></textarea>
      </mat-form-field>

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
})
export class DictUnitTaskDialogComponent {
  private snackBar = inject(MatSnackBar);

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

  onSave(): void {
    if (!this.isValid()) {
      return;
    }

    // Валідація JSON перед збереженням
    if (this.data.value?.trim()) {
      try {
        JSON.parse(this.data.value);
      } catch (error) {
        const errorMessage = ErrorHandler.handleJsonError(error);
        this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
        return;
      }
    }

    this.dialogRef.close(this.data);
  }
}
