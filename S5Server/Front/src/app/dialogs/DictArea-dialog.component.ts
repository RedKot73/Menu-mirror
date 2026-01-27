import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DictAreaDto } from '../../ServerService/dictAreas.service';
import { DictAreaTypeService, DictAreaType } from '../../ServerService/dictAreaType.service';

@Component({
  selector: 'app-dict-area-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./DialogShared.scss'],
  template: `
    <h2 mat-dialog-title>{{ data.id ? 'Редагування РВЗ' : 'Створення РВЗ' }}</h2>
    <mat-dialog-content class="content">
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Назва</mat-label>
        <input matInput [(ngModel)]="data.value" required />
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Тип РВЗ</mat-label>
        <mat-select [(ngModel)]="data.areaTypeId" required>
          <mat-option *ngFor="let areaType of areaTypes" [value]="areaType.id">
            {{ areaType.value }} ({{ areaType.shortValue }})
          </mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Коментар</mat-label>
        <textarea matInput [(ngModel)]="data.comment" rows="2"></textarea>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end" class="actions">
      <button mat-button (click)="onCancel()">Скасувати</button>
      <button mat-raised-button color="primary" (click)="onSave()" [disabled]="!isValid()">
        Зберегти
      </button>
    </mat-dialog-actions>
  `,
})
export class DictAreaDialogComponent {
  private snackBar = inject(MatSnackBar);
  private dictAreaTypeService = inject(DictAreaTypeService);
  areaTypes: DictAreaType[] = [];

  constructor(
    public dialogRef: MatDialogRef<DictAreaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Partial<DictAreaDto>,
  ) {
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
    return !!(this.data.value?.trim() && this.data.areaTypeId?.trim());
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
