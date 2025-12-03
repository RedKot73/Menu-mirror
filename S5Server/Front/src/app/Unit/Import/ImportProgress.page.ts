import { Component, inject, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import {
  UnitService,
  ImportProgress,
  ImportProgressStatus,
  ImportUnit,
} from '../services/unit.service';
import { ErrorHandler } from '../../shared/models/ErrorHandler';

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
  styleUrls: ['./ImportProgress.page.scss', '../../Soldier/Soldier.component.scss'],
})
export class ImportProgressPage implements OnInit, OnDestroy {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private unitService = inject(UnitService);
  private snackBar = inject(MatSnackBar);

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  displayedColumns: string[] = ['externId', 'rank', 'fullName', 'birthDate', 'position', 'status'];

  private unitId: string | null = null;

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
    // Спочатку підключаємося до SSE
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

    // Після підписки на SSE, отримуємо unitId та запускаємо імпорт
    // Невеликий таймаут гарантує, що SSE з'єднання встановлено
    setTimeout(() => {
      this.route.queryParams.pipe(take(1)).subscribe((params) => {
        this.unitId = params['unitId'] || null;
        if (!this.unitId) {
          // Якщо немає unitId, показуємо помилку та повертаємось
          this.snackBar.open('Не вказано підрозділ для імпорту', 'Закрити', { duration: 5000 });
          this.goBack();
          return;
        }
        // Якщо є unitId, викликаємо вибір файлу
        this.openFileDialog();
      });
    }, 100);
  }

  ngOnDestroy() {
    // Відключаємося від SSE при виході зі сторінки
    if (this.progressSubscription) {
      this.progressSubscription.unsubscribe();
    }
  }

  /**
   * Відкриває діалог вибору файлу
   */
  openFileDialog() {
    if (this.fileInput) {
      this.fileInput.nativeElement.click();
    }
  }

  /**
   * Обробка вибору файлу
   */
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      // Якщо файл не вибрано, повертаємось назад
      this.goBack();
      return;
    }

    // unitId перевірено при відкритті форми, тут він гарантовано є
    this.unitService.importSoldiers(this.unitId!, file).subscribe({
      next: (response) => {
        if (response.status === 'Failed') {
          this.snackBar.open(
            `Помилка імпорту: ${response.error || 'Невідома помилка'}`,
            'Закрити',
            { duration: 7000 }
          );
          this.hasFailed.set(true);
        }
        // Якщо успішно, SSE подія оновить UI
      },
      error: (error) => {
        if (error.status === 423) {
          this.snackBar.open(
            'Імпорт вже виконується. Зачекайте завершення поточної операції.',
            'Закрити',
            { duration: 5000 }
          );
        } else {
          const errorMessage = ErrorHandler.handleHttpError(
            error,
            'Помилка імпорту особового складу'
          );
          this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
        }
        this.hasFailed.set(true);
      },
    });

    // Очищаємо input для можливості повторного вибору того ж файлу
    input.value = '';
  }

  private handleProgress(progress: ImportProgress) {
    switch (progress.status) {
      case ImportProgressStatus.Start:
        this.message.set('Імпорт розпочато...');
        this.isCompleted.set(false);
        this.hasFailed.set(false);
        this.completedSheets.set([]);
        this.currentSheet.set(null);
        this.processedRows.set(0);
        this.totalRows.set(0);
        break;

      case ImportProgressStatus.SheetStart:
        this.currentSheet.set(progress.sheet || null);
        this.processedRows.set(0);
        this.totalRows.set(progress.total);
        this.message.set(`Обробка аркушу: ${progress.sheet}`);
        break;

      case ImportProgressStatus.RecordDone:
        // Оновлення прогресу обробки записів
        this.currentSheet.set(progress.sheet || null);
        this.processedRows.set(progress.processed);
        this.totalRows.set(progress.total);
        break;

      case ImportProgressStatus.SheetDone:
        if (progress.sheet) {
          // Отримуємо повну інформацію про імпорт
          this.unitService.getImportStatus().subscribe({
            next: (importStatus) => {
              if (importStatus.result) {
                this.completedSheets.set(importStatus.result);
              }
            },
            error: (error) => {
              console.error('Помилка отримання статусу імпорту:', error);
              this.message.set('Помилка отримання статусу імпорту: ' + error.message);
            },
          });
        }
        break;

      case ImportProgressStatus.Done:
        this.message.set('Імпорт завершено успішно!');
        this.isCompleted.set(true);
        break;

      case ImportProgressStatus.Failed:
        this.message.set(progress.message || 'Помилка імпорту');
        this.hasFailed.set(true);
        this.isCompleted.set(true);
        break;

      case ImportProgressStatus.UnitNotFound:
        // Обробка випадку, коли підрозділ не знайдено
        this.message.set(`Підрозділ "${progress.sheet}" не знайдено в базі даних`);
        //this.hasFailed.set(true);
        //this.isCompleted.set(true);
        break;

      default:
        console.warn('Невідомий статус прогресу:', progress.status);
        break;
    }
  }

  goBack() {
    this.router.navigate(['/units']);
  }
}
