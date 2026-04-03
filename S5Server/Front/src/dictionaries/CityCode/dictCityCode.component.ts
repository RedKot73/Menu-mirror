import {
  Component,
  inject,
  ViewChild,
  AfterViewInit,
  effect,
  signal,
  output,
  input,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

import {
  DictCityCodeService,
  CityCodeDto,
  CityCodeFilter,
} from '../../ServerService/dictCityCode.service';
import { S5App_ErrorHandler } from '../../app/shared/models/ErrorHandler';

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
      .selectable-row {
        cursor: pointer;
      }
      .selectable-row:hover {
        background-color: rgba(0, 0, 0, 0.04);
      }
    `,
  ],
})
export class DictCityCodeComponent implements AfterViewInit {
  dictCityCodeService = inject(DictCityCodeService);
  items = this.dictCityCodeService.createItemsSignal();
  dataSource = new MatTableDataSource<CityCodeDto>([]);

  // Input: режим выбора (скрывает кнопки действий, разрешает выбор)
  selectionMode = input<boolean>(false);

  // Output: событие выбора записи
  itemSelected = output<CityCodeDto>();

  displayedColumns = [
    //'parentId',
    'level1',
    'level2',
    'level3',
    'level4',
    'levelExt',
    'category',
    'value',
  ];
  snackBar = inject(MatSnackBar);
  searchTerm = '';
  private searchTimeout: number | undefined;

  // Пагинация
  totalCount = signal(0);
  pageSize = signal(100);
  pageIndex = signal(0);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

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
    this.searchTimeout = window.setTimeout(() => {
      this.pageIndex.set(0);
      this.reload();
    }, 500);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.reload();
  }

  selectItem(item: CityCodeDto) {
    this.itemSelected.emit(item);
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
}
