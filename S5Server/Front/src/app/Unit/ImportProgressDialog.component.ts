import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { signal } from '@angular/core';

import { UnitService, ImportProgress } from './services/unit.service';

@Component({
  selector: 'app-import-progress-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule
],
  template: `
    <h2 mat-dialog-title>
      <mat-icon>cloud_upload</mat-icon>
      Імпорт особового складу
    </h2>

    <mat-dialog-content>
      @if (currentSheet()) {
      <div class="sheet-info"><strong>Поточний аркуш:</strong> {{ currentSheet() }}</div>
      } @if (totalRows() > 0) {
      <div class="progress-info">
        <div class="progress-text">
          Оброблено: {{ processedRows() }} з {{ totalRows() }} ({{ progressPercent() }}%)
        </div>
        <mat-progress-bar mode="determinate" [value]="progressPercent()"> </mat-progress-bar>
      </div>
      } @else {
      <div class="progress-info">
        <mat-progress-bar mode="indeterminate"></mat-progress-bar>
        <div class="progress-text">Підготовка до імпорту...</div>
      </div>
      } @if (message()) {
      <div class="status-message">{{ message() }}</div>
      } @if (completedSheets().length > 0) {
      <div class="completed-sheets">
        <strong>Завершені аркуші:</strong>
        <ul>
          @for (sheet of completedSheets(); track sheet) {
          <li>{{ sheet }}</li>
          }
        </ul>
      </div>
      }
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      @if (canClose()) {
      <button mat-raised-button color="primary" (click)="close()">Закрити</button>
      } @else {
      <button mat-button disabled>Обробка...</button>
      }
    </mat-dialog-actions>
  `,
  styles: [
    `
      mat-dialog-content {
        min-width: 400px;
        padding: 20px;
      }

      .sheet-info {
        margin-bottom: 16px;
        font-size: 14px;
      }

      .progress-info {
        margin: 16px 0;
      }

      .progress-text {
        margin-bottom: 8px;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.6);
      }

      .status-message {
        margin-top: 16px;
        padding: 12px;
        background: #e3f2fd;
        border-radius: 4px;
        font-size: 13px;
      }

      .completed-sheets {
        margin-top: 16px;
        padding: 12px;
        background: #f5f5f5;
        border-radius: 4px;

        ul {
          margin: 8px 0 0 20px;
          padding: 0;
        }

        li {
          color: #4caf50;
          font-size: 13px;
        }
      }

      mat-dialog-title {
        display: flex;
        align-items: center;
        gap: 8px;
      }
    `,
  ],
})
export class ImportProgressDialogComponent {
  private dialogRef = inject(MatDialogRef<ImportProgressDialogComponent>);
  private unitService = inject(UnitService);

  currentSheet = signal<string | null>(null);
  processedRows = signal(0);
  totalRows = signal(0);
  message = signal<string | null>(null);
  completedSheets = signal<string[]>([]);
  canClose = signal(false);

  progressPercent = () => {
    const total = this.totalRows();
    const processed = this.processedRows();
    return total > 0 ? Math.round((processed / total) * 100) : 0;
  };

  private progressSubscription = this.unitService.subscribeToImportProgress().subscribe({
    next: (progress: ImportProgress) => {
      this.handleProgress(progress);
    },
    error: (error) => {
      console.error('SSE connection error:', error);
      this.message.set("Втрачено з'єднання з сервером");
      this.canClose.set(true);
    },
  });

  private handleProgress(progress: ImportProgress) {
    if (progress.message === 'start') {
      this.message.set('Імпорт розпочато...');
      this.canClose.set(false);
    } else if (progress.message === 'sheet-start') {
      this.currentSheet.set(progress.sheet || null);
      this.processedRows.set(0);
      this.totalRows.set(progress.total);
      this.message.set(`Обробка аркушу: ${progress.sheet}`);
    } else if (progress.message === 'sheet-done') {
      if (progress.sheet) {
        this.completedSheets.update((sheets) => [...sheets, progress.sheet!]);
      }
    } else if (progress.message === 'done') {
      this.message.set('Імпорт завершено успішно!');
      this.canClose.set(true);
    } else if (progress.message === 'failed') {
      this.message.set('Помилка імпорту');
      this.canClose.set(true);
    } else if (progress.sheet) {
      // Оновлення прогресу
      this.currentSheet.set(progress.sheet);
      this.processedRows.set(progress.processed);
      //this.totalRows.set(progress.total);
    }
  }

  close() {
    this.progressSubscription.unsubscribe();
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.progressSubscription.unsubscribe();
  }
}
