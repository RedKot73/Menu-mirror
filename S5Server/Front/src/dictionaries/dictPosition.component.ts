import { Component, inject, ViewChild, AfterViewInit, effect } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { SimpleDictDialogComponent } from '../app/dialogs/SimpleDict-dialog.component';
import { ConfirmDialogComponent } from '../app/dialogs/ConfirmDialog.component';
import { SimpleDictService, SimpleDictDto } from '../ServerService/simpleDict.service';

export type DictArea = SimpleDictDto;

@Component({
  selector: 'dict-positions',
  imports: [MatTableModule, MatButtonModule, MatSortModule, MatIconModule],
  styleUrls: ['./dict-page.styles.scss'],
  template: `
    <div class="dict-page-container">
      <h2>Посади</h2>
      <div class="action-buttons">
        <button mat-raised-button color="primary" (click)="reload()">Оновити</button>
        <button mat-raised-button color="primary" (click)="add()">Створити</button>
      </div>
      <table mat-table [dataSource]="dataSource" matSort class="mat-elevation-z8">
        <!-- Value Column -->
        <ng-container matColumnDef="value">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Значення</th>
          <td mat-cell *matCellDef="let area">{{ area.value }}</td>
        </ng-container>
        <!-- Comment Column -->
        <ng-container matColumnDef="comment">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Коментар</th>
          <td mat-cell *matCellDef="let area">{{ area.comment }}</td>
        </ng-container>
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Дії</th>
          <td mat-cell *matCellDef="let area">
            <button mat-icon-button color="accent" (click)="edit(area)">
              <mat-icon>edit</mat-icon>
            </button>
            <button mat-icon-button color="warn" (click)="delete(area)">
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
export class dictPosition implements AfterViewInit {
  readonly api = '/api/dict-positions';
  dictService = inject(SimpleDictService);
  items = this.dictService.createItemsSignal(this.api);
  dataSource = new MatTableDataSource<DictArea>([]);
  displayedColumns = ['value', 'comment', 'actions'];
  dialog = inject(MatDialog);

  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    effect(() => {
      this.dataSource.data = this.items();
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  reload() {
    this.dictService.getAll(this.api).subscribe((items) => this.items.set(items));
  }

  // CREATE
  add() {
    const dialogRef = this.dialog.open(SimpleDictDialogComponent, {
      width: '400px',
      data: { value: '', comment: '' }, // Передаем пустой объект для создания
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dictService.create(this.api, result).subscribe(() => this.reload());
      }
    });
  }

  // UPDATE
  edit(area: DictArea) {
    const dialogRef = this.dialog.open(SimpleDictDialogComponent, {
      width: '400px',
      data: { ...area }, // Передаем копию объекта для редактирования
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dictService.update(this.api, result.id, result).subscribe(() => this.reload());
      }
    });
  }

  // DELETE
  delete(area: DictArea) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      width: '360px',
      maxWidth: '95vw',
      //disableClose: true,   // чтобы не закрывалось по клику вне/ESC
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
        this.dictService.delete(this.api, area.id).subscribe(() => this.reload());
      }
    });
  }
}
