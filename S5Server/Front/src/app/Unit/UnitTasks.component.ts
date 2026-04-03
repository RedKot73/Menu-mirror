import { Component, inject, ViewChild, AfterViewInit, effect, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';

import { UnitTaskDto, UnitTaskService } from '../../ServerService/unit-task.service';
import { S5App_ErrorHandler } from '../shared/models/ErrorHandler';

@Component({
  selector: 'app-unit-tasks',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatSortModule,
    MatIconModule,
    MatTooltipModule,
    DatePipe,
  ],
  templateUrl: './UnitTasks.component.html',
  styleUrl: './UnitTasks.component.scss',
})
export class UnitTasksComponent implements AfterViewInit {
  private unitTaskService = inject(UnitTaskService);
  private snackBar = inject(MatSnackBar);

  unitId = input<string | null>(null);

  items = signal<UnitTaskDto[]>([]);
  dataSource = new MatTableDataSource<UnitTaskDto>([]);

  readonly displayedColumns: string[] = ['taskValue', 'areaValue', 'publishedAtUtc'];

  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    effect(() => {
      const id = this.unitId();
      if (id) {
        this.loadTasks(id);
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
      this.loadTasks(id);
    }
  }

  private loadTasks(unitId: string) {
    this.unitTaskService.getByUnit(unitId).subscribe({
      next: (data) => {
        this.items.set(data);
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        const errorMessage = S5App_ErrorHandler.handleHttpError(
          error,
          'Помилка завантаження бойових завдань підрозділу',
        );
        this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
      },
    });
  }
}
