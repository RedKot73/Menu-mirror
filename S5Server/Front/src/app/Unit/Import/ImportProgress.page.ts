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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { signal } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { take, finalize } from 'rxjs/operators';

import {
  ImportProgress,
  ImportProgressStatus,
  ImportUnit,
  ImportUnitService,
  ImportSoldierStatus,
} from '../Import/import.service';

import { SoldierService, SoldierDto } from '../../Soldier/services/soldier.service';
import { UnitService } from '../services/unit.service';
import { LookupDto } from '../../shared/models/lookup.models';
import { InlineEditManager, EditMode } from '../../Soldier/InlineEditManager.class';
import { UnitTag } from '../../Soldier/Soldier.constant';

import { S5App_ErrorHandler } from '../../shared/models/ErrorHandler';
import { HttpErrorResponse } from '@angular/common/http';

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
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
  templateUrl: './ImportProgress.page.html',
  styleUrls: ['./ImportProgress.page.scss', '../../Soldier/Soldier.component.scss'],
})
export class ImportProgressPage implements OnInit, OnDestroy {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private importUnitService = inject(ImportUnitService);
  private snackBar = inject(MatSnackBar);
  private soldierService = inject(SoldierService);
  private unitService = inject(UnitService);

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  displayedColumns = [
    'operation',
    'fio',
    'nickName',
    'rankShortValue',
    'positionValue',
    'stateValue',
    'unitShortName',
    'assignedUnitShortName',
    'operationalUnitShortName',
    'arrivedAt',
    'departedAt',
    'birthDate',
    'comment',
  ];

  private unitId: string | null = null;
  private isLoadingUnits = false;

  currentSheet = signal<string | null>(null);
  processedRows = signal(0);
  totalRows = signal(0);
  message = signal<string | null>(null);
  completedSheets = signal<ImportUnit[]>([]);
  isCompleted = signal(false);
  hasFailed = signal(false);

  readonly UnitTag = UnitTag;

  inlineEdit = new InlineEditManager((mode: EditMode, term: string) =>
    this.unitService.lookup(term, 20)
  );

  displayLookupFn = (unit: LookupDto | null): string => (unit ? unit.value : '');

  // Експортуємо enum для використання в шаблоні
  ImportProgressStatus = ImportProgressStatus;
  ImportSoldierStatus = ImportSoldierStatus;

  progressPercent = () => {
    const total = this.totalRows();
    const processed = this.processedRows();
    return total > 0 ? Math.round((processed / total) * 100) : 0;
  };

  private progressSubscription?: Subscription;

  ngOnInit() {
    this.route.queryParams.pipe(take(1)).subscribe((params) => {
      this.unitId = params['unitId'] || null;
      if (!this.unitId) {
        // Якщо немає unitId, показуємо помилку та повертаємось
        this.snackBar.open('Відсутній підрозділ для імпорту', 'Закрити', { duration: 5000 });
        this.goBack();
        return;
      }
    });
    // Спочатку підключаємося до SSE
    this.progressSubscription = this.importUnitService.subscribeToImportProgress().subscribe({
      next: (progress: ImportProgress) => {
        this.handleProgress(progress);
      },
      error: (error: Event) => {
        console.error('SSE connection error:', error);
        this.message.set("Втрачено з'єднання з сервером");
        this.hasFailed.set(true);
      },
    });

    // Після підписки на SSE, обираємо файл та запускаємо його імпорт
    // Невеликий таймаут гарантує, що SSE з'єднання встановлено
    setTimeout(() => {
      this.openFileDialog();
    }, 100);
  }

  ngOnDestroy() {
    // Відключаємося від SSE при виході зі сторінки
    if (this.progressSubscription) {
      this.progressSubscription.unsubscribe();
    }
  }

  /**
   * Обробка прогресу імпорту
   * @param progress
   */
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

      case ImportProgressStatus.UnitStart:
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

      case ImportProgressStatus.UnitDone:
      case ImportProgressStatus.UnitNotFound:
        if (progress.sheet && !this.isLoadingUnits) {
          this.isLoadingUnits = true;

          this.importUnitService
            .getLastUnits()
            .pipe(
              finalize(() => {
                // Завжди скидаємо флаг, незалежно від результату
                this.isLoadingUnits = false;
              })
            )
            .subscribe({
              next: (units: string[]) => {
                // Отримуємо список вже завантажених підрозділів
                const loadedUnitNames = this.completedSheets().map((sheet) => sheet.name);

                // Знаходимо різницю - підрозділи, які оброблені сервером, але ще не отримані клієнтом
                const newUnits = units.filter((unitName) => !loadedUnitNames.includes(unitName));
                if (newUnits.length > 0) {
                  // Завантажуємо відсутні підрозділи через API
                  this.importUnitService.getUnits(newUnits).subscribe({
                    next: (newLoadedUnits: ImportUnit[]) => {
                      // Об'єднуємо нові підрозділи з уже завантаженими
                      const currentSheets = this.completedSheets();
                      this.completedSheets.set([...currentSheets, ...newLoadedUnits]);
                    },
                    error: (error) => {
                      console.error('Помилка завантаження підрозділів:', error);
                      this.snackBar.open('Помилка завантаження деяких підрозділів', 'Закрити', {
                        duration: 3000,
                      });
                    },
                  });
                }
              },
              error: (error) => {
                console.error('Помилка отримання списку підрозділів:', error);
                this.snackBar.open('Помилка отримання списку підрозділів', 'Закрити', {
                  duration: 3000,
                });
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

      default:
        console.warn('Невідомий статус прогресу:', progress.status);
        break;
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
    this.importUnitService.importSoldiers(this.unitId!, file).subscribe({
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
      error: (error: HttpErrorResponse) => {
        if (error.status === 423) {
          this.snackBar.open(
            'Імпорт вже виконується. Зачекайте завершення поточної операції.',
            'Закрити',
            { duration: 5000 }
          );
        } else {
          const errorMessage = S5App_ErrorHandler.handleHttpError(
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

  goBack() {
    this.router.navigate(['/units']);
  }

  // === Inline edit helpers (одна колонка / рядок за раз) ===
  isEditing(soldierId: string, mode: EditMode): boolean {
    return this.inlineEdit.isMode(soldierId, mode);
  }

  startEditing(soldierId: string, mode: EditMode, initialValue: string | null) {
    this.inlineEdit.clearOthers(soldierId);
    this.inlineEdit.ensure(soldierId, mode, initialValue);
  }

  cancelEditing(soldierId: string) {
    this.inlineEdit.clear(soldierId);
  }

  getControl(soldierId: string, mode: EditMode, initialValue: string | null): FormControl {
    return this.inlineEdit.ensure(soldierId, mode, initialValue).control;
  }

  getOptions(soldierId: string): Observable<LookupDto[]> {
    return this.inlineEdit.options(soldierId);
  }

  isLoading(soldierId: string): boolean {
    return this.inlineEdit.loading(soldierId);
  }

  onSelect(
    soldierId: string,
    mode: EditMode,
    event: MatAutocompleteSelectedEvent,
    soldier: { id: string }
  ) {
    const selectedUnit: LookupDto | null = event.option.value;
    let successMessage = '';
    let operation: Observable<SoldierDto> | null = null;

    switch (mode) {
      case UnitTag.UnitId:
        if (!selectedUnit) {
          return;
        }
        successMessage = 'Підрозділ оновлено';
        operation = this.soldierService.move(soldier.id, selectedUnit.id);
        break;
      case UnitTag.AssignedId:
        successMessage = 'Придання оновлено';
        operation = this.soldierService.assignAssigned(soldier.id, selectedUnit?.id || null);
        break;
      case UnitTag.InvolvedId:
        successMessage = 'Екіпаж/Група оновлено';
        operation = this.soldierService.assignInvolved(soldier.id, selectedUnit?.id || null);
        break;
    }

    if (!operation) {
      return;
    }

    operation.subscribe({
      next: (updated) => {
        this.inlineEdit.clear(soldierId);
        this.patchSoldier(updated);
        this.snackBar.open(successMessage, 'Закрити', { duration: 2000 });
      },
      error: (error) => {
        console.error('Помилка оновлення підрозділу:', error);
        const errorMessage = S5App_ErrorHandler.handleHttpError(
          error,
          'Помилка оновлення підрозділу'
        );
        this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
      },
    });
  }

  getInitialValue(
    soldier: {
      unitShortName?: string;
      assignedUnitShortName?: string;
      involvedUnitShortName?: string;
    },
    mode: EditMode
  ): string {
    switch (mode) {
      case UnitTag.UnitId:
        return soldier.unitShortName || '';
      case UnitTag.AssignedId:
        return soldier.assignedUnitShortName || '';
      case UnitTag.InvolvedId:
        return soldier.involvedUnitShortName || '';
      default:
        return '';
    }
  }

  private patchSoldier(updated: SoldierDto) {
    const next = this.completedSheets().map((unit) => ({
      ...unit,
      importedSoldiers: unit.importedSoldiers.map((entry) =>
        entry.soldier.id === updated.id ? { ...entry, soldier: updated } : entry
      ),
    }));

    this.completedSheets.set(next);
  }
}
