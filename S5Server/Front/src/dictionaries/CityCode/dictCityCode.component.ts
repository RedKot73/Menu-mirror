import {
  Component,
  inject,
  ViewChild,
  AfterViewInit,
  effect,
  ElementRef,
  signal,
//  input,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

import { ConfirmDialogComponent } from '../../app/dialogs/ConfirmDialog.component';
import {
  DictCityCodeService,
  CityCodeDto,
  CityCodeFilter,
} from '../../ServerService/dictCityCode.service';
import { S5App_ErrorHandler } from '../../app/shared/models/ErrorHandler';
import { DictCityCodeDialogComponent } from '../../app/dialogs/DictCityCode-dialog.component';
import { ImportCityCodesDialogComponent } from '../../app/dialogs/ImportCityCodes-dialog.component';
//import { VerticalLayoutComponent } from '../../app/shared/components/VerticalLayout.component';

@Component({
  selector: 'dict-city-codes',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
//    VerticalLayoutComponent,
  ],
  templateUrl: './dictCityCode.component.html',
  styleUrls: ['../dict-page.styles.scss'],
  styles: [
    `
      :host {
        display: block;
        height: 100%;
      }

      table {
        width: 100%;
      }
      .paginator {
        min-height: 128px;
      }
    `,
  ],
})
export class DictCityCodeComponent implements AfterViewInit {
  dictCityCodeService = inject(DictCityCodeService);
  items = this.dictCityCodeService.createItemsSignal();
  dataSource = new MatTableDataSource<CityCodeDto>([]);
  displayedColumns = [
    //'parentId',
    'level1',
    'level2',
    'level3',
    'level4',
    'levelExt',
    'category',
    'value',
    'actions',
  ];
  dialog = inject(MatDialog);
  snackBar = inject(MatSnackBar);
  searchTerm = '';
  private searchTimeout: number | undefined;

  // Пагинация
  totalCount = signal(0);
  pageSize = signal(100);
  pageIndex = signal(0);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
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
      this.pageIndex.set(0);
      this.reload();
    }, 500);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.reload();
  }

  reload() {
    const filter: CityCodeFilter = {
      page: this.pageIndex() + 1,
      pageSize: this.pageSize(),
    };
    if (this.searchTerm) {
      filter.search = this.searchTerm;
    }

    this.dictCityCodeService.getAll(filter).subscribe({
      next: (result) => {
        this.items.set(result.items);
        this.totalCount.set(result.totalCount);
        this.pageIndex.set(result.page - 1);
        this.pageSize.set(result.pageSize);
      },
      error: (error) => {
        console.error('Помилка завантаження кодифікатора:', error);
        const errorMessage = S5App_ErrorHandler.handleHttpError(
          error,
          'Помилка завантаження кодифікатора:',
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
              'Помилка створення запису:',
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
              'Помилка оновлення запису:',
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
              'Помилка видалення запису:',
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
