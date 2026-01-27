import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DictUnitTaskDto } from '../../ServerService/dictUnitTasks.service';
import { DictAreaTypeService, DictAreaType } from '../../ServerService/dictAreaType.service';

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
    MatSelectModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./DialogShared.scss'],
  template: `
    <h2 mat-dialog-title>{{ data.id ? 'Редагування завдання' : 'Створення завдання' }}</h2>
    <mat-dialog-content class="content">
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Назва</mat-label>
        <input matInput [(ngModel)]="data.value" required />
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
      </div>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Тип Напрямку ЛБЗ/Тип РВЗ</mat-label>
        <mat-select [(ngModel)]="data.areaTypeId" required>
          <mat-option *ngFor="let areaType of areaTypes" [value]="areaType.id">
            {{ areaType.value }} ({{ areaType.shortValue }})
          </mat-option>
        </mat-select>
      </mat-form-field>
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
      .checkbox-group {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
    `,
  ],
})
export class DictUnitTaskDialogComponent {
  private snackBar = inject(MatSnackBar);
  private dictAreaTypeService = inject(DictAreaTypeService);
  areaTypes: DictAreaType[] = [];

  constructor(
    public dialogRef: MatDialogRef<DictUnitTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Partial<DictUnitTaskDto>,
  ) {
    // Установка значений по умолчанию
    if (this.data.withMeans === undefined) {
      this.data.withMeans = false;
    }

    // Загружаем справочник areaTypes
    this.loadAreaTypes();
  }

  loadAreaTypes() {
    this.dictAreaTypeService.getAll().subscribe({
      next: (types) => (this.areaTypes = types),
      error: (error) => {
        console.error('Помилка завантаження типів РВЗ:', error);
        this.snackBar.open('Помилка завантаження типів РВЗ', 'Закрити', { duration: 5000 });
      },
    });
  }

  isValid(): boolean {
    return !!(
      this.data.value?.trim() &&
      this.data.amount !== undefined &&
      this.data.amount >= 0 &&
      this.data.areaTypeId?.trim()
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (!this.isValid()) {
      return;
    }

    this.dialogRef.close(this.data);
  }
}
