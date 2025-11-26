import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { signal } from '@angular/core';
import { Subscription } from 'rxjs';

import { UnitService, ImportProgress, ImportUnit } from './services/unit.service';

@Component({
  selector: 'app-import-progress-page',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatTableModule,
    MatCardModule,
    MatTooltipModule,
  ],
  templateUrl: './ImportProgress.page.html',
  styleUrls: ['./ImportProgress.page.scss', '../Soldier/Soldier.component.scss'],
})
export class ImportProgressPage implements OnInit, OnDestroy {
  private router = inject(Router);
  private unitService = inject(UnitService);

  displayedColumns: string[] = ['externId', 'rank', 'fullName', 'birthDate', 'position', 'status'];

  currentSheet = signal<string | null>(null);
  processedRows = signal(0);
  totalRows = signal(0);
  message = signal<string | null>(null);
  completedSheets = signal<ImportUnit[]>([]);
  isCompleted = signal(false);
  hasFailed = signal(false);

  progressPercent = () => {
    const total = this.totalRows();
    const processed = this.processedRows();
    return total > 0 ? Math.round((processed / total) * 100) : 0;
  };

  private progressSubscription?: Subscription;

  ngOnInit() {
    // Підключаємося до SSE
    this.progressSubscription = this.unitService.subscribeToImportProgress().subscribe({
      next: (progress: ImportProgress) => {
        this.handleProgress(progress);
      },
      error: (error) => {
        console.error('SSE connection error:', error);
        this.message.set("Втрачено з'єднання з сервером");
        this.hasFailed.set(true);
      },
    });
  }

  ngOnDestroy() {
    // Відключаємося від SSE при виході зі сторінки
    if (this.progressSubscription) {
      this.progressSubscription.unsubscribe();
    }
  }

  private handleProgress(progress: ImportProgress) {
    if (progress.message === 'start') {
      this.message.set('Імпорт розпочато...');
      this.isCompleted.set(false);
      this.hasFailed.set(false);
      this.completedSheets.set([]); // Очищаємо попередні результати
    } else if (progress.message === 'sheet-start') {
      this.currentSheet.set(progress.sheet || null);
      this.processedRows.set(0);
      this.totalRows.set(progress.total);
      this.message.set(`Обробка аркушу: ${progress.sheet}`);
    } else if (progress.message === 'sheet-done') {
      if (progress.sheet) {
        // Отримуємо повну інформацію про імпорт
        this.unitService.getImportStatus().subscribe({
          next: (importStatus) => {
            if (importStatus.result) {
              this.completedSheets.set([]); // Очищаємо попередні результати
              this.completedSheets.set(importStatus.result);
            }
          },
          error: (error) => {
            console.error('Помилка отримання статусу імпорту:', error);
          },
        });
      }
    } else if (progress.message === 'done') {
      this.message.set('Імпорт завершено успішно!');
      this.isCompleted.set(true);
    } else if (progress.message === 'failed') {
      this.message.set('Помилка імпорту');
      this.hasFailed.set(true);
      this.isCompleted.set(true);
    } else if (progress.sheet) {
      // Оновлення прогресу
      this.currentSheet.set(progress.sheet);
      this.processedRows.set(progress.processed);
      this.totalRows.set(progress.total);
    }
  }

  goBack() {
    this.router.navigate(['/units']);
  }
}
