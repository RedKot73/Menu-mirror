import { ChangeDetectionStrategy, Component, Inject, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CityCodeInfo, DictAreaDto, DictAreasService } from '../../ServerService/dictAreas.service';
import { DictAreaTypeService, DictAreaType } from '../../ServerService/dictAreaType.service';
import { DictCityCodeDialogComponent } from './DictCityCode-dialog.component';
import { CityCodeDto } from '../../ServerService/dictCityCode.service';

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
    MatIconModule,
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
          @for (areaType of areaTypes(); track areaType.id) {
            <mat-option [value]="areaType.id">
              {{ areaType.value }} ({{ areaType.shortValue }})
            </mat-option>
          }
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Кодифікатор адмін-територіальних одиниць</mat-label>
        <input
          matInput
          [value]="cityCodeValue()"
          readonly
          placeholder="Натисніть кнопку для вибору..."
        />
        <button mat-icon-button matSuffix (click)="openCityCodeDialog()" type="button">
          <mat-icon>search</mat-icon>
        </button>
        @if (data.cityCodeInfo?.cityCodeId) {
          <button mat-icon-button matSuffix (click)="clearCityCode()" type="button">
            <mat-icon>close</mat-icon>
          </button>
        }
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Координати РВЗ</mat-label>
        <textarea matInput [(ngModel)]="data.coords" rows="3"></textarea>
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
  private dictAreasService = inject(DictAreasService);
  private dialog = inject(MatDialog);

  areaTypes = signal<DictAreaType[]>([]);
  cityCodeValue = signal<string>('');

  constructor(
    public dialogRef: MatDialogRef<DictAreaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Partial<DictAreaDto>,
  ) {
    this.loadAreaTypes();

    // Ініціалізуємо signal значенням з cityCodeInfo
    if (this.data.cityCodeInfo?.cityCode) {
      this.cityCodeValue.set(
        this.dictAreasService.buildCityCodeDisplayValue(this.data.cityCodeInfo),
      );
    }
  }

  loadAreaTypes() {
    this.dictAreaTypeService.getAll().subscribe({
      next: (types) => this.areaTypes.set(types),
      error: (error) => {
        console.error('Помилка завантаження типів РВЗ:', error);
        this.snackBar.open('Помилка завантаження типів РВЗ', 'Закрити', { duration: 5000 });
      },
    });
  }

  openCityCodeDialog() {
    const dialogRef = this.dialog.open(DictCityCodeDialogComponent, {
      width: '900px',
      maxWidth: '95vw',
      maxHeight: '90vh',
    });

    dialogRef.afterClosed().subscribe((result: CityCodeDto | undefined) => {
      if (result) {
        // Створюємо cityCodeInfo з вибраного CityCodeDto
        this.data.cityCodeInfo = {
          cityCodeId: result.id,
          cityCode: result.value,
          level1: result.level1, // Поки використовуємо доступні дані
          level2: result.level2,
          level3: result.level3,
          level4: result.level4,
          levelExt: result.levelExt,
        };
        this.cityCodeValue.set(result.value);
      }
    });
  }

  clearCityCode() {
    this.data.cityCodeInfo = undefined;
    this.cityCodeValue.set('');
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
