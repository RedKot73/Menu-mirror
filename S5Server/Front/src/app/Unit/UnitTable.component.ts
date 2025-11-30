import {
  Component,
  inject,
  ViewChild,
  AfterViewInit,
  output,
  signal,
  effect,
  input,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { UnitService, UnitDto } from './services/unit.service';

@Component({
  selector: 'unit-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
  ],
  templateUrl: './UnitTable.component.html',
  styleUrl: './UnitTable.component.scss',
})
export class UnitTableComponent implements AfterViewInit {
  unitService = inject(UnitService);

  // Outputs
  unitSelected = output<UnitDto>();
  unitUpdated = output<void>();

  // Inputs
  nodeActionsTemplate = input<TemplateRef<{ $implicit: UnitDto }> | undefined>(undefined);
  filterMode = signal<'all' | 'regular' | 'operational'>('all');

  // State
  units = signal<UnitDto[]>([]);
  loading = signal(false);
  dataSource = new MatTableDataSource<UnitDto>([]);
  searchText = signal('');

  displayedColumns = [
    'actions',
    'shortName',
    //'name',
    'parentShortName',
    'forceType',
    'unitType',
    //'militaryNumber',
    //'isOperational',
  ];

  @ViewChild(MatSort) sort!: MatSort;

  /**
   * Применяет фильтр по типу подразделения
   */
  private applyFilter(units: UnitDto[]): UnitDto[] {
    const mode = this.filterMode();

    switch (mode) {
      case 'regular':
        return units.filter((u) => !u.isOperational);
      case 'operational':
        return units.filter((u) => u.isOperational);
      case 'all':
      default:
        return units;
    }
  }

  constructor() {
    // Объединенный effect для фильтрации по типу и поиску
    effect(() => {
      // Сначала фильтруем по типу (all/regular/operational)
      const filteredUnits = this.applyFilter(this.units());
      this.dataSource.data = filteredUnits;

      // Затем применяем текстовый поиск
      const search = this.searchText().toLowerCase();
      this.dataSource.filter = search;
    });
  }

  ngAfterViewInit() {
    //this.dataSource.sort = this.sort;

    // Настройка кастомной фильтрации
    this.dataSource.filterPredicate = (data: UnitDto, filter: string) => {
      const searchStr = filter.toLowerCase();
      return (
        data.shortName?.toLowerCase().includes(searchStr) ||
        //data.name.toLowerCase().includes(searchStr) ||
        data.parentShortName?.toLowerCase().includes(searchStr) ||
        //data.forceType?.toLowerCase().includes(searchStr) ||
        //data.unitType?.toLowerCase().includes(searchStr) ||
        //data.militaryNumber?.toLowerCase().includes(searchStr) ||
        false
      );
    };

    this.loadData();
  }

  loadData() {
    this.loading.set(true);
    this.unitService.getAll().subscribe({
      next: (units) => {
        this.units.set(units);
        this.dataSource.sort = this.sort;
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading units:', err);
        this.loading.set(false);
      },
    });
  }

  onSearchChange(value: string) {
    this.searchText.set(value);
  }

  selectUnit(unit: UnitDto) {
    this.unitSelected.emit(unit);
  }

  refresh() {
    this.loadData();
    this.unitUpdated.emit();
  }
}
