import { Component, inject, ViewChild, AfterViewInit, effect, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { DictAreaSelectDialogComponent } from '../dialogs/DictAreaSelect-dialog.component';
import { UnitAreasService, UnitAreasDto } from '../../ServerService/unitAreas.service';
import { S5App_ErrorHandler } from '../shared/models/ErrorHandler';
import { DictArea } from '../../ServerService/dictAreas.service';
import { ConfirmDialogComponent } from '../dialogs/ConfirmDialog.component';

@Component({
  selector: 'app-unit-areas',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatSortModule,
    MatIconModule,
    MatTooltipModule,
    DatePipe,
  ],
  templateUrl: './UnitAreas.component.html',
  styleUrls: ['./UnitAreas.component.scss'],
})
export class UnitAreasComponent implements AfterViewInit {
  private unitAreasService = inject(UnitAreasService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  unitId = input<string | null>(null);
  isReadOnly = input<boolean>(false);

  items = signal<UnitAreasDto[]>([]);
  dataSource = new MatTableDataSource<UnitAreasDto>([]);

  readonly displayedColumns: string[] = ['menu', 'areaValue', 'areaTypeValue', 'validFrom'];

  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    effect(() => {
      const id = this.unitId();
      if (id) {
        this.loadAreas(id);
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
      this.loadAreas(id);
    }
  }

  private loadAreas(unitId: string) {
    this.unitAreasService.getByUnit(unitId).subscribe({
      next: (data) => this.items.set(data),
      error: (error) => {
        const errorMessage = S5App_ErrorHandler.handleHttpError(
          error,
          'Помилка завантаження районів виконання завдань',
        );
        this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
      },
    });
  }

  add() {
    const dialogRef = this.dialog.open(DictAreaSelectDialogComponent, {
      width: '900px',
      data: {
        areaTypeId: null,
        title: 'Вибір району виконання завдань (РВЗ)',
      },
    });

    dialogRef.afterClosed().subscribe((result: DictArea | undefined) => {
      if (result) {
        this.unitAreasService.create({
          unitId: this.unitId()!,
          areaId: result.id,
        }).subscribe({
          next: () => this.reload(),
          error: (error) => {
            const errorMessage = S5App_ErrorHandler.handleHttpError(
              error,
              'Помилка створення району виконання завдань',
            );
            this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
          },
        });
    }
    });
  }

  delete(unitArea: UnitAreasDto) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      width: '360px',
      maxWidth: '95vw',
      autoFocus: false,
      data: {
        title: 'Видалення району виконання завдань',
        message: `Ви впевнені, що хочете видалити ЗВЗ "${unitArea.areaValue}"?`,
        confirmText: 'Видалити',
        cancelText: 'Відмінити',
        color: 'warn',
        icon: 'warning',
      },
    });

    ref.afterClosed().subscribe((confirmed) => {
        if (confirmed) {
            this.unitAreasService.delete(unitArea.id).subscribe({
            next: () => this.reload(),
            error: (error) => {
                const errorMessage = S5App_ErrorHandler.handleHttpError(
                error,
                'Помилка видалення району виконання завдань',
                );
                this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
            },
            }); 
        }});
  }
}
