import { Component, signal, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { UnitDto } from '../Unit/services/unit.service';
import { UnitTableComponent } from '../Unit/UnitTable.component';

export interface UnitSelectDialogData {
  /** Заголовок діалогу (опціонально) */
  title?: string;
}

@Component({
  selector: 'unit-select-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, UnitTableComponent],
  template: `
    <h2 mat-dialog-title>{{ dialogTitle() }}</h2>
    <mat-dialog-content>
      <div class="dialog-content">
        <unit-table (unitSelected)="selectUnit($event)"></unit-table>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Відмінити</button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }

      .dialog-content {
        display: flex;
        flex-direction: column;
        height: 70vh;
        max-height: 70vh;
        min-height: 400px;
      }
    `,
  ],
})
export class UnitSelectDialogComponent {
  private dialogRef = inject(MatDialogRef<UnitSelectDialogComponent>);
  private data = inject<UnitSelectDialogData | null>(MAT_DIALOG_DATA, { optional: true });

  dialogTitle = signal(this.data?.title ?? 'Вибір підрозділу');

  selectUnit(unit: UnitDto): void {
    this.dialogRef.close(unit);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
