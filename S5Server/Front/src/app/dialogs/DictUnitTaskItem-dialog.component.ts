import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

import { DictUnitTaskItemDto } from '../../ServerService/dictUnitTaskItems.service';
import { DictTemplateCategoriesService } from '../../ServerService/dictTemplateCategories.service';
import { LookupDto } from '../shared/models/lookup.models';

@Component({
  selector: 'app-dict-unit-task-item-dialog',
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
    <h2 mat-dialog-title>
      {{ data.id ? 'Редагування елемента завдання' : 'Створення елемента завдання' }}
    </h2>
    <mat-dialog-content class="content">
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Категорія документа</mat-label>
        <mat-select [(ngModel)]="data.templateCategoryId" required>
          @for (category of templateCategories$ | async; track category.id) {
          <mat-option [value]="category.id">{{ category.value }}</mat-option>
          }
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Текст завдання</mat-label>
        <textarea
          matInput
          [(ngModel)]="data.value"
          required
          rows="4"
          placeholder="Введіть текст завдання для даної категорії документів"
        ></textarea>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Коментар</mat-label>
        <textarea matInput [(ngModel)]="data.comment" rows="2"></textarea>
      </mat-form-field>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Відмінити</button>
      <button mat-raised-button color="primary" (click)="onSave()" [disabled]="!isValid()">
        {{ data.id ? 'Зберегти' : 'Створити' }}
      </button>
    </mat-dialog-actions>
  `,
})
export class DictUnitTaskItemDialogComponent {
  templateCategories$: Observable<LookupDto[]>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Partial<DictUnitTaskItemDto> & { unitTaskId: string },
    private dialogRef: MatDialogRef<DictUnitTaskItemDialogComponent>,
    private templateCategoriesService: DictTemplateCategoriesService,
    private snackBar: MatSnackBar
  ) {
    this.templateCategories$ = this.templateCategoriesService.getSelectList();
  }

  isValid(): boolean {
    return !!(this.data.value?.trim() && this.data.templateCategoryId && this.data.unitTaskId);
  }

  onSave(): void {
    if (!this.isValid()) {
      this.snackBar.open("Заповніть всі обов'язкові поля", 'Закрити', { duration: 3000 });
      return;
    }

    this.dialogRef.close(this.data);
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}
