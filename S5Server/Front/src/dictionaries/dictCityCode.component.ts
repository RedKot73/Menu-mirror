import { Component, inject, ViewChild, AfterViewInit, effect, ElementRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

import { ConfirmDialogComponent } from '../app/dialogs/ConfirmDialog.component';
import {
  DictCityCodeService,
  CityCodeDto,
  CityCodeFilter,
} from '../ServerService/dictCityCode.service';
import { S5App_ErrorHandler } from '../app/shared/models/ErrorHandler';
import { DictCityCodeDialogComponent } from '../app/dialogs/DictCityCode-dialog.component';
import { ImportCityCodesDialogComponent } from '../app/dialogs/ImportCityCodes-dialog.component';

@Component({
  selector: 'dict-city-codes',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatSortModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  styleUrls: ['./dict-page.styles.scss'],
  template: `
    <div class="dict-page-container">
      <!-- Прихований input для вибору файлу -->
      <input
        #fileInput
        type="file"
        accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        style="display: none"
        (change)="onFileSelected($event)"
      />

      <h2>Кодифікатор адміністративно-територіальних одиниць</h2>
      <div class="action-buttons">
        <mat-form-field appearance="outline" style="width: 300px; margin-right: 16px;">
          <mat-label>Пошук</mat-label>
          <input
            matInput
            [(ngModel)]="searchTerm"
            (ngModelChange)="onSearchChange()"
            placeholder="Введіть назву для пошуку"
          />
        </mat-form-field>
        <button mat-raised-button color="primary" (click)="reload()">
          <mat-icon>refresh</mat-icon>
          Оновити
        </button>
        <button mat-raised-button color="primary" (click)="add()">
          <mat-icon>add</mat-icon>
          Створити
        </button>
        <button mat-raised-button color="accent" (click)="openFileDialog()">
          <mat-icon>upload_file</mat-icon>
          Імпортувати
        </button>
      </div>
      <table mat-table [dataSource]="dataSource" matSort class="mat-elevation-z8">
        <!-- Level1 Column -->
        <ng-container matColumnDef="level1">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Рівень 1</th>
          <td mat-cell *matCellDef="let item">{{ item.level1 }}</td>
        </ng-container>
        <!-- Level2 Column -->
        <ng-container matColumnDef="level2">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Рівень 2</th>
          <td mat-cell *matCellDef="let item">{{ item.level2 }}</td>
        </ng-container>
        <!-- Level3 Column -->
        <ng-container matColumnDef="level3">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Рівень 3</th>
          <td mat-cell *matCellDef="let item">{{ item.level3 }}</td>
        </ng-container>
        <!-- Level4 Column -->
        <ng-container matColumnDef="level4">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Рівень 4</th>
          <td mat-cell *matCellDef="let item">{{ item.level4 }}</td>
        </ng-container>
        <!-- CategoryId Column -->
        <ng-container matColumnDef="categoryId">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Категорія</th>
          <td mat-cell *matCellDef="let item">{{ item.categoryId }}</td>
        </ng-container>
        <!-- Value Column -->
        <ng-container matColumnDef="value">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Назва</th>
          <td mat-cell *matCellDef="let item">{{ item.value }}</td>
        </ng-container>
        <!-- Actions Column -->
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Дії</th>
          <td mat-cell *matCellDef="let item">
            <button mat-icon-button color="accent" (click)="edit(item)">
              <mat-icon>edit</mat-icon>
            </button>
            <button mat-icon-button color="warn" (click)="delete(item)">
              <mat-icon>delete</mat-icon>
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>
    </div>
  `,
})
export class DictCityCodeComponent implements AfterViewInit {
  dictCityCodeService = inject(DictCityCodeService);
  items = this.dictCityCodeService.createItemsSignal();
  dataSource = new MatTableDataSource<CityCodeDto>([]);
  displayedColumns = ['level1', 'level2', 'level3', 'level4', 'categoryId', 'value', 'actions'];
  dialog = inject(MatDialog);
  snackBar = inject(MatSnackBar);
  searchTerm = '';
  private searchTimeout: number | undefined;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor() {
    effect(() => {
      this.dataSource.data = this.items();
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.reload();
  }

  onSearchChange() {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    this.searchTimeout = setTimeout(() => {
      this.reload();
    }, 500);
  }

  reload() {
    const filter: CityCodeFilter = {};
    if (this.searchTerm) {
      filter.search = this.searchTerm;
    }

    this.dictCityCodeService.getAll(filter).subscribe({
      next: (items) => this.items.set(items),
      error: (error) => {
        console.error('Помилка завантаження кодифікатора:', error);
        const errorMessage = S5App_ErrorHandler.handleHttpError(
          error,
          'Помилка завантаження кодифікатора:'
        );
        this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
      },
    });
  }

  add() {
    const dialogRef = this.dialog.open(DictCityCodeDialogComponent, {
      width: '600px',
      data: {
        level1: '',
        level2: '',
        level3: '',
        level4: '',
        levelExt: '',
        categoryId: '',
        value: '',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dictCityCodeService.create(result).subscribe({
          next: () => {
            this.reload();
            this.snackBar.open('Запис успішно створено', 'Закрити', { duration: 3000 });
          },
          error: (error) => {
            console.error('Помилка створення запису:', error);
            const errorMessage = S5App_ErrorHandler.handleHttpError(
              error,
              'Помилка створення запису:'
            );
            this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
          },
        });
      }
    });
  }

  edit(cityCode: CityCodeDto) {
    const dialogRef = this.dialog.open(DictCityCodeDialogComponent, {
      width: '600px',
      data: { ...cityCode },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dictCityCodeService.update(result.id, result).subscribe({
          next: () => {
            this.reload();
            this.snackBar.open('Запис успішно оновлено', 'Закрити', { duration: 3000 });
          },
          error: (error) => {
            console.error('Помилка оновлення запису:', error);
            const errorMessage = S5App_ErrorHandler.handleHttpError(
              error,
              'Помилка оновлення запису:'
            );
            this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
          },
        });
      }
    });
  }

  delete(cityCode: CityCodeDto) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      width: '360px',
      maxWidth: '95vw',
      autoFocus: false,
      data: {
        title: 'Видалення запису',
        message: `Ви впевнені, що хочете видалити запис "${cityCode.value}"?`,
        confirmText: 'Видалити',
        cancelText: 'Відмінити',
        color: 'warn',
        icon: 'warning',
      },
    });
    ref.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.dictCityCodeService.delete(cityCode.id).subscribe({
          next: () => {
            this.reload();
            this.snackBar.open('Запис успішно видалено', 'Закрити', { duration: 3000 });
          },
          error: (error) => {
            console.error('Помилка видалення запису:', error);
            const errorMessage = S5App_ErrorHandler.handleHttpError(
              error,
              'Помилка видалення запису:'
            );
            this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
          },
        });
      }
    });
  }

  /**
   * Відкриває діалог вибору файлу для імпорту
   */
  openFileDialog() {
    if (this.fileInput) {
      this.fileInput.nativeElement.click();
    }
  }

  /**
   * Обробка вибору файлу для імпорту
   */
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    // Перевірка розширення файлу
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (ext !== 'xlsx') {
      this.snackBar.open('Підтримується тільки формат .xlsx', 'Закрити', { duration: 5000 });
      input.value = '';
      return;
    }

    // Відкриваємо діалог імпорту з прогресом
    const dialogRef = this.dialog.open(ImportCityCodesDialogComponent, {
      width: '500px',
      disableClose: true,
      data: file,
    });

    dialogRef.afterClosed().subscribe((success: boolean) => {
      if (success) {
        this.reload();
        this.snackBar.open('Імпорт успішно завершено', 'Закрити', { duration: 3000 });
      }
    });

    // Очищаємо input для можливості повторного вибору того ж файлу
    input.value = '';
  }
}
