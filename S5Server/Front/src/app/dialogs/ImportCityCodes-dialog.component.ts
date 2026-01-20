import { Component, inject, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';

import {
  DictCityCodeService,
  CityCodesProgressStatus,
  ImportCityCodesProgress,
} from '../../ServerService/dictCityCode.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-import-city-codes-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatProgressBarModule, MatIconModule],
  template: `
    <h2 mat-dialog-title>
      <mat-icon>cloud_upload</mat-icon>
      Імпорт кодифікатора
    </h2>

    <mat-dialog-content>
      <div class="import-progress">
        @if (isCompleted()) {
        <div class="status-message" [class.success]="!hasFailed()" [class.error]="hasFailed()">
          @if (!hasFailed()) {
          <mat-icon>check_circle</mat-icon>
          } @else {
          <mat-icon>error</mat-icon>
          }
          <span>{{ message() }}</span>
        </div>
        } @else { @if (totalRows() > 0) {
        <div class="progress-info">
          <div class="progress-text">Оброблено: {{ processedRows() }} з {{ totalRows() }}</div>
          <mat-progress-bar mode="determinate" [value]="progressPercent()"></mat-progress-bar>
        </div>
        } @else {
        <div class="progress-info">
          <mat-progress-bar mode="indeterminate"></mat-progress-bar>
          <div class="progress-text">Підготовка до імпорту...</div>
        </div>
        } @if (message()) {
        <div class="status-message info">
          <mat-icon>info</mat-icon>
          <span>{{ message() }}</span>
        </div>
        } }
      </div>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      @if (isCompleted()) {
      <button mat-raised-button color="primary" (click)="close()">Закрити</button>
      } @else {
      <button mat-button (click)="close()">Скасувати</button>
      }
    </mat-dialog-actions>
  `,
  styles: [
    `
      .import-progress {
        min-width: 400px;
        padding: 20px 0;
      }

      .progress-info {
        margin-bottom: 16px;
      }

      .progress-text {
        margin-bottom: 8px;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.6);
      }

      .status-message {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px;
        border-radius: 4px;
        margin-top: 16px;

        &.success {
          background-color: #e8f5e9;
          color: #2e7d32;
        }

        &.error {
          background-color: #ffebee;
          color: #c62828;
        }

        &.info {
          background-color: #e3f2fd;
          color: #1565c0;
        }

        mat-icon {
          font-size: 20px;
          width: 20px;
          height: 20px;
        }

        span {
          flex: 1;
        }
      }
    `,
  ],
})
export class ImportCityCodesDialogComponent implements OnDestroy {
  private dialogRef = inject(MatDialogRef<ImportCityCodesDialogComponent>);
  private cityCodeService = inject(DictCityCodeService);
  private file: File = inject(MAT_DIALOG_DATA);

  processedRows = signal(0);
  totalRows = signal(0);
  message = signal('');
  isCompleted = signal(false);
  hasFailed = signal(false);

  private progressSubscription?: Subscription;

  progressPercent = () => {
    const total = this.totalRows();
    const processed = this.processedRows();
    return total > 0 ? Math.round((processed / total) * 100) : 0;
  };

  constructor() {
    this.startImport();
  }

  private startImport() {
    // Спочатку підключаємося до SSE
    this.progressSubscription = this.cityCodeService.subscribeToImportProgress().subscribe({
      next: (progress: ImportCityCodesProgress) => {
        this.handleProgress(progress);
      },
      error: (error: Event) => {
        console.error('SSE connection error:', error);
        this.message.set('Втрачено зʼєднання з сервером');
        this.hasFailed.set(true);
        this.isCompleted.set(true);
      },
    });

    // Після підписки на SSE, запускаємо імпорт
    setTimeout(() => {
      this.cityCodeService.importCityCodes(this.file).subscribe({
        next: (response) => {
          if (!response.started) {
            this.hasFailed.set(true);
            this.isCompleted.set(true);
            this.message.set(response.error || 'Не вдалося розпочати імпорт');
            this.unsubscribe();
          }
        },
        error: (error) => {
          console.error('Import error:', error);
          this.hasFailed.set(true);
          this.isCompleted.set(true);
          this.message.set(error.message || 'Помилка при імпорті');
          this.unsubscribe();
        },
      });
    }, 100);
  }

  private handleProgress(progress: ImportCityCodesProgress) {
    this.processedRows.set(progress.processed);
    this.totalRows.set(progress.total);

    if (progress.message) {
      this.message.set(progress.message);
    }

    switch (progress.status) {
      case CityCodesProgressStatus.Start:
        this.message.set('Імпорт розпочато...');
        this.isCompleted.set(false);
        this.hasFailed.set(false);
        break;

      case CityCodesProgressStatus.Done:
        this.isCompleted.set(true);
        this.hasFailed.set(false);
        this.message.set('Імпорт успішно завершено');
        this.unsubscribe();
        break;

      case CityCodesProgressStatus.Failed:
        this.isCompleted.set(true);
        this.hasFailed.set(true);
        if (!this.message()) {
          this.message.set('Помилка під час імпорту');
        }
        this.unsubscribe();
        break;

      default:
        console.warn('Невідомий статус прогресу:', progress.status);
        break;
    }
  }

  private unsubscribe() {
    if (this.progressSubscription) {
      this.progressSubscription.unsubscribe();
      this.progressSubscription = undefined;
    }
  }

  close() {
    this.unsubscribe();
    this.dialogRef.close(this.isCompleted() && !this.hasFailed());
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
