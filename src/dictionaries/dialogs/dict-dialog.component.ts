import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
    MatDialogModule,
    MAT_DIALOG_DATA,
    MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; 
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { SimpleDictDto } from '../../ServerService/simpleDict.service';

@Component({
    selector: 'dict-dialog',
    template: `
    <h2 mat-dialog-title>{{ data.id ? 'Редагувати' : 'Створити новий' }}</h2>
    <div mat-dialog-content>
      <mat-form-field appearance="outline">
        <mat-label>Значення</mat-label>
        <input matInput [(ngModel)]="data.value" required>
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>Коментар</mat-label>
        <input matInput [(ngModel)]="data.comment">
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onCancel()">Відміна</button>
      <button mat-raised-button color="primary" (click)="onSave()" [disabled]="!data.value.trim()" cdkFocusInitial>Зберегти</button>
    </div>`,
    styles: [],
    imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule, FormsModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class DictDialogComponent {
    dialogRef = inject(MatDialogRef<DictDialogComponent>);
    data: SimpleDictDto;

    constructor() {
        // Создаём копию объекта, чтобы не мутировать оригинал
        this.data = { ...inject(MAT_DIALOG_DATA) };
    }

    onSave(): void {
        if (this.data.value?.trim()) {
            this.dialogRef.close(this.data);
        }
    }

    onCancel(): void {
        this.dialogRef.close();
    }
}