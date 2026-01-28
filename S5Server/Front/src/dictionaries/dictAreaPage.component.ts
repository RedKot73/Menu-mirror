import { Component, inject, ViewChild, AfterViewInit, effect } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DictAreaDialogComponent } from '../app/dialogs/DictArea-dialog.component';
import { ConfirmDialogComponent } from '../app/dialogs/ConfirmDialog.component';
import { DictAreasService, DictArea, CityCodeInfo } from '../ServerService/dictAreas.service';
import { S5App_ErrorHandler } from '../app/shared/models/ErrorHandler';
import { VerticalLayoutComponent } from '../app/shared/components/VerticalLayout.component';

@Component({
  selector: 'dict-area',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatSortModule, MatIconModule, VerticalLayoutComponent],
  styleUrls: ['./dict-page.styles.scss'],
  styles: [
    `
      .coords-column {
        max-width: 150px;
        white-space: pre-wrap;
        word-break: break-word;
        line-height: 1.4;
      }
    `,
  ],
  template: `
    <app-vertical-layout>
      <!-- Action Panel (Top) -->
      <div actionPanel>
        <h2>Райони виконання завдань (РВЗ)</h2>
        <div class="action-buttons">
          <button mat-raised-button color="primary" (click)="reload()">
            <mat-icon>refresh</mat-icon>
            Оновити
          </button>
          <button mat-raised-button color="primary" (click)="add()">
            <mat-icon>add</mat-icon>
            Створити
          </button>
        </div>
      </div>

      <!-- Content Panel (Main) -->
      <div contentPanel>
        <table mat-table [dataSource]="dataSource" matSort class="mat-elevation-z8">
          <!-- Value Column -->
          <ng-container matColumnDef="value">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Назва</th>
            <td mat-cell *matCellDef="let item">{{ item.value }}</td>
          </ng-container>

          <!-- AreaType Column -->
          <ng-container matColumnDef="areaType">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Тип РВЗ</th>
            <td mat-cell *matCellDef="let item">{{ item.areaType }}</td>
          </ng-container>

          <!-- CityCode Column -->
          <ng-container matColumnDef="cityCode">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Кодифікатор</th>
            <td mat-cell *matCellDef="let item">{{ getCityCodeDisplay(item.cityCodeInfo) }}</td>
          </ng-container>

          <ng-container matColumnDef="coords">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Координати</th>
            <td mat-cell *matCellDef="let item" class="coords-column">{{ item.coords }}</td>
          </ng-container>

          <!-- Comment Column -->
          <ng-container matColumnDef="comment">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Коментар</th>
            <td mat-cell *matCellDef="let item">{{ item.comment }}</td>
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

          <tr mat-header-row *matHeaderRowDef="displayedColumns; sticky: true"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table>
      </div>
    </app-vertical-layout>
  `,
})
export class DictAreaPage implements AfterViewInit {
  dictAreasService = inject(DictAreasService);
  items = this.dictAreasService.createItemsSignal();
  dataSource = new MatTableDataSource<DictArea>([]);
  displayedColumns = ['value', 'areaType', 'cityCode', 'coords', 'comment', 'actions'];
  dialog = inject(MatDialog);
  snackBar = inject(MatSnackBar);

  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    effect(() => {
      this.dataSource.data = this.items();
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.reload();
  }

  reload() {
    this.dictAreasService.getAll().subscribe({
      next: (items) => this.items.set(items),
      error: (error) => {
        console.error('Помилка завантаження районів виконання завдань:', error);
        const errorMessage = S5App_ErrorHandler.handleHttpError(
          error,
          'Помилка завантаження районів виконання завдань',
        );
        this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
      },
    });
  }

  getCityCodeDisplay(cityCodeInfo: CityCodeInfo): string {
    return this.dictAreasService.buildCityCodeDisplayValue(cityCodeInfo);
  }

  add() {
    const dialogRef = this.dialog.open(DictAreaDialogComponent, {
      width: '600px',
      data: {
        value: '',
        comment: '',
        areaTypeId: '',
        cityCodeId: '',
        coords: '',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dictAreasService.create(result).subscribe({
          next: () => {
            this.reload();
            this.snackBar.open('РВЗ успішно створено', 'Закрити', { duration: 3000 });
          },
          error: (error) => {
            console.error('Помилка створення РВЗ:', error);
            const errorMessage = S5App_ErrorHandler.handleHttpError(error, 'Помилка створення РВЗ');
            this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
          },
        });
      }
    });
  }

  edit(area: DictArea) {
    const dialogRef = this.dialog.open(DictAreaDialogComponent, {
      width: '600px',
      data: { ...area },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dictAreasService.update(result.id, result).subscribe({
          next: () => {
            this.reload();
            this.snackBar.open('РВЗ успішно оновлено', 'Закрити', { duration: 3000 });
          },
          error: (error) => {
            console.error('Помилка оновлення РВЗ:', error);
            const errorMessage = S5App_ErrorHandler.handleHttpError(error, 'Помилка оновлення РВЗ');
            this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
          },
        });
      }
    });
  }

  delete(area: DictArea) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      width: '360px',
      maxWidth: '95vw',
      autoFocus: false,
      data: {
        title: 'Видалення запису',
        message: `Ви впевнені, що хочете видалити запис "${area.value}"?`,
        confirmText: 'Видалити',
        cancelText: 'Відмінити',
        color: 'warn',
        icon: 'warning',
      },
    });

    ref.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.dictAreasService.delete(area.id).subscribe({
          next: () => {
            this.reload();
            this.snackBar.open('РВЗ успішно видалено', 'Закрити', { duration: 3000 });
          },
          error: (error) => {
            console.error('Помилка видалення РВЗ:', error);
            const errorMessage = S5App_ErrorHandler.handleHttpError(error, 'Помилка видалення РВЗ');
            this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
          },
        });
      }
    });
  }
}
