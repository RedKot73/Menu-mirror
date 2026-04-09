import { Component, inject, ViewChild, AfterViewInit, effect, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UnitAreasService, UnitAreasDto } from '../../ServerService/unitAreas.service';
import { S5App_ErrorHandler } from '../shared/models/ErrorHandler';

@Component({
  selector: 'app-unit-adjacent',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatSortModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './UnitAdjacent.component.html',
  styleUrl: './UnitAdjacent.component.scss',
})
export class UnitAdjacentComponent implements AfterViewInit {
  private unitAreasService = inject(UnitAreasService);
  private snackBar = inject(MatSnackBar);

  unitId = input<string | null>(null);

  items = signal<UnitAreasDto[]>([]);
  dataSource = new MatTableDataSource<UnitAreasDto>([]);

  readonly displayedColumns: string[] = ['unitShortName', 'areaValue', 'areaTypeValue'];

  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    effect(() => {
      const id = this.unitId();
      if (id) {
        this.loadAdjacent(id);
      } else {
        this.items.set([]);
      }
    });

    effect(() => {
      this.dataSource.data = this.items();
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  reload() {
    const id = this.unitId();
    if (id) {
      this.loadAdjacent(id);
    }
  }

  private loadAdjacent(unitId: string) {
    this.unitAreasService.getAdjacent(unitId).subscribe({
      next: (data) => this.items.set(data),
      error: (error) => {
        const errorMessage = S5App_ErrorHandler.handleHttpError(
          error,
          'Помилка завантаження суміжних підрозділів',
        );
        this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
      },
    });
  }
}
