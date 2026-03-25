import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

import { DateMaskDirective } from '../shared/directives/date-mask.directive';
import { parseDateString } from '../shared/utils/date.utils';
import { TemplateDataSetCreateDto } from '../DocumentDataSet/models/template-dataset.models';

@Component({
  selector: 'app-create-dataset-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatDatepickerModule,
    DateMaskDirective,
  ],
  providers: [provideNativeDateAdapter()],
  styleUrls: ['./DialogShared.scss'],
  styles: [`
    .checkbox-row {
      display: flex;
      align-items: center;
      padding: 4px 0 8px;
    }
  `],
  template: `
    <h2 mat-dialog-title>Новий набір даних</h2>

    <mat-dialog-content class="content">

      <mat-form-field appearance="outline">
        <mat-label>Дата документа</mat-label>
        <input
          matInput
          appDateMask
          placeholder="дд.мм.рррр"
          [matDatepicker]="docPicker"
          [value]="documentDate"
          (dateChange)="onDocumentDateChange($event)"
          required
        />
        <mat-datepicker-toggle matIconSuffix [for]="docPicker"></mat-datepicker-toggle>
        <mat-datepicker #docPicker></mat-datepicker>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Номер документа</mat-label>
        <input
          matInput
          type="text"
          [(ngModel)]="documentNumber"
          placeholder="Введіть номер"
          required
        />
      </mat-form-field>

      <div class="checkbox-row">
        <mat-checkbox [(ngModel)]="isParentDocUsed" color="primary">
          Чи існує документ старшого начальника
        </mat-checkbox>
      </div>

      @if (isParentDocUsed) {
        <mat-form-field appearance="outline">
          <mat-label>Дата документа старшого начальника</mat-label>
          <input
            matInput
            appDateMask
            placeholder="дд.мм.рррр"
            [matDatepicker]="parentPicker"
            [value]="parentDocDate"
            (dateChange)="onParentDocDateChange($event)"
            required
          />
          <mat-datepicker-toggle matIconSuffix [for]="parentPicker"></mat-datepicker-toggle>
          <mat-datepicker #parentPicker></mat-datepicker>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Номер документа старшого начальника</mat-label>
          <input
            matInput
            type="text"
            [(ngModel)]="parentDocNumber"
            placeholder="Введіть номер"
            required
          />
        </mat-form-field>
      }

    </mat-dialog-content>

    <mat-dialog-actions align="end" class="actions">
      <button mat-button (click)="cancel()">Скасувати</button>
      <button mat-raised-button color="primary" [disabled]="!isValid()" (click)="confirm()">
        <mat-icon>arrow_forward</mat-icon>
        Далі
      </button>
    </mat-dialog-actions>
  `,
})
export class CreateDataSetDialogComponent {
  private dialogRef = inject(
    MatDialogRef<CreateDataSetDialogComponent, TemplateDataSetCreateDto | undefined>,
  );

  documentDate: Date | null = new Date();
  documentNumber = '';

  isParentDocUsed = false;
  parentDocDate: Date | null = null;
  parentDocNumber = '';

  onDocumentDateChange(event: MatDatepickerInputEvent<Date>): void {
    const manualDate = parseDateString((event.targetElement as HTMLInputElement).value);
    this.documentDate = manualDate ?? event.value;
  }

  onParentDocDateChange(event: MatDatepickerInputEvent<Date>): void {
    const manualDate = parseDateString((event.targetElement as HTMLInputElement).value);
    this.parentDocDate = manualDate ?? event.value;
  }

  isValid(): boolean {
    if (!this.documentDate || !this.documentNumber.trim()) { return false; }
    if (this.isParentDocUsed) {
      return !!this.parentDocDate && !!this.parentDocNumber.trim();
    }
    return true;
  }

  confirm(): void {
    if (!this.isValid()) { return; }
    const dateStr = this.documentDate ? new Intl.DateTimeFormat('uk-UA').format(this.documentDate) : '';
    const docNum = this.documentNumber.trim();
    this.dialogRef.close({
      isParentDocUsed: this.isParentDocUsed,
      parentDocDate: this.isParentDocUsed ? this.parentDocDate : null,
      parentDocNumber: this.isParentDocUsed ? this.parentDocNumber : null,
      docDate: this.documentDate!,
      docNumber: this.documentNumber,
      name: `Дані документа від ${dateStr} № ${docNum}`,
      isPublished: false,
    });
  }

  cancel(): void {
    this.dialogRef.close(undefined);
  }
}
