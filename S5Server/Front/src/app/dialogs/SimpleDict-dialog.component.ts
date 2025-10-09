import { ChangeDetectionStrategy, Component, Inject, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { SimpleDictDto } from '../../ServerService/simpleDict.service';

@Component({
    selector: 'dict-dialog',
    standalone: true,
    imports: [MatFormFieldModule, MatInputModule, MatDialogModule, MatButtonModule, FormsModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <h2 mat-dialog-title>{{ data.id ? 'Редагувати' : 'Створити новий' }}</h2>
    <div mat-dialog-content class="content">
      <mat-form-field appearance="outline" floatLabel="always">
        <mat-label>Значення</mat-label>
        <input matInput [(ngModel)]="data.value" required>
      </mat-form-field>
      <mat-form-field appearance="outline" floatLabel="always">
        <mat-label>Коментар</mat-label>
        <input matInput [(ngModel)]="data.comment">
      </mat-form-field>
    </div>
    <div mat-dialog-actions align="end" class="actions">
      <button mat-button (click)="onCancel()">Відміна</button>
      <button mat-raised-button color="primary" (click)="onSave()" [disabled]="!data.value.trim()">Зберегти</button>
    </div>`,
    styles: [`
        .title { text-align: center; margin: 0; }
        .content {
            display: grid;
            gap: 12px;
            min-width: 280px;
            max-width: 520px;
            padding-top: 10px !important; /* убирает перекрытие заголовка и контента */
        }
        .content .mat-mdc-form-field { width: 100%; }
        .actions { gap: 8px; }
  `],
})
export class SimpleDictDialogComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: SimpleDictDto,
        private ref: MatDialogRef<SimpleDictDialogComponent>
    ) { }

    onCancel() { this.ref.close(); }
    onSave() { this.ref.close(this.data); }
}