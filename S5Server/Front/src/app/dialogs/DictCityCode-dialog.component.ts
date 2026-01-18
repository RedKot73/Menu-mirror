import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { CityCodeDto } from '../../ServerService/dictCityCode.service';
import { DictCityCategoryService } from '../../ServerService/dictCityCategory.service';
import { LookupDto } from '../shared/models/lookup.models';

@Component({
  selector: 'dict-city-code-dialog',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
  ],
  template: `
    <h2 mat-dialog-title>{{ data.id ? 'Редагування запису' : 'Створення запису' }}</h2>
    <mat-dialog-content>
      <div style="display: flex; flex-direction: column; gap: 16px; min-width: 500px;">
        <mat-form-field appearance="outline">
          <mat-label>Рівень 1 (області)</mat-label>
          <input matInput [(ngModel)]="data.level1" required />
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Рівень 2 (райони)</mat-label>
          <input matInput [(ngModel)]="data.level2" />
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Рівень 3 (громади)</mat-label>
          <input matInput [(ngModel)]="data.level3" />
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Рівень 4 (населені пункти)</mat-label>
          <input matInput [(ngModel)]="data.level4" />
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Розширений рівень (райони в містах)</mat-label>
          <input matInput [(ngModel)]="data.levelExt" />
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Категорія</mat-label>
          <mat-select [(ngModel)]="data.categoryId" required>
            <mat-option *ngFor="let cat of categories" [value]="cat.id">
              {{ cat.value }}
            </mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Назва</mat-label>
          <input matInput [(ngModel)]="data.value" required />
        </mat-form-field>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Відмінити</button>
      <button mat-raised-button color="primary" (click)="onSave()" [disabled]="!isValid()">
        Зберегти
      </button>
    </mat-dialog-actions>
  `,
})
export class DictCityCodeDialogComponent {
  dialogRef = inject(MatDialogRef<DictCityCodeDialogComponent>);
  data: CityCodeDto = inject(MAT_DIALOG_DATA);
  cityCategoryService = inject(DictCityCategoryService);
  categories: LookupDto[] = [];

  constructor() {
    this.loadCategories();
  }

  loadCategories() {
    this.cityCategoryService.getSelectList().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Помилка завантаження категорій:', error);
      },
    });
  }

  isValid(): boolean {
    return !!(this.data.level1?.trim() && this.data.categoryId?.trim() && this.data.value?.trim());
  }

  onSave() {
    if (this.isValid()) {
      this.dialogRef.close(this.data);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
