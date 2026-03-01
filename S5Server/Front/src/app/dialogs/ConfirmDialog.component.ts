import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

export interface ConfirmDialogData {
    title?: string;
    message: string;
    confirmText?: string;   // за замовчуванням: 'ОК' / 'Видалити'
    cancelText?: string;    // за замовчуванням: 'Відмінити'
    color?: 'primary' | 'accent' | 'warn'; // колір кнопки підтвердження
    icon?: string;          // наприклад: 'warning'
}

@Component({
    selector: 'app-confirm-dialog',
    standalone: true,
    imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <h2 mat-dialog-title class="title">
        @if(data.icon){
            <mat-icon class="icon" [ngClass]="data.color || 'warn'">{{ data.icon }}</mat-icon>
        }
      {{ data.title || 'Підтвердження' }}
    </h2>

    <div mat-dialog-content class="content">
      {{ data.message }}
    </div>

    <div mat-dialog-actions align="end">
      <button mat-button (click)="close(false)">{{ data.cancelText || 'Відмінити' }}</button>
      <button mat-raised-button [color]="data.color || 'warn'" (click)="close(true)" cdkFocusInitial>
        {{ data.confirmText || 'Видалити' }}
      </button>
    </div>
  `,
    styles: [`
    .title { display: flex; align-items: center; gap: 8px; margin: 0; }
    .icon { font-size: 22px; height: 22px; width: 22px; }
    .content { white-space: pre-line; }
  `]
})
export class ConfirmDialogComponent {
    constructor(
        private ref: MatDialogRef<ConfirmDialogComponent, boolean>,
        @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
    ) { }

    close(result: boolean) {
        this.ref.close(result);
    }
}