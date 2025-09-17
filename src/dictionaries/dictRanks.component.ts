import { Component, inject, ViewChild, AfterViewInit, effect } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { DictRankDialogComponent } from './dialogs/DictRankDialog';
import { ConfirmDialogComponent } from "./dialogs/ConfirmDialog.component";
import { DictRankService, DictRankDto } from "../ServerService/dictRanks.service";

export type DictRank = DictRankDto;

@Component({
    selector: "page-dict-ranks",
    imports: [MatTableModule, MatButtonModule, MatSortModule, MatIconModule],
    template: `
        <h2>Військові звання</h2>
        <button mat-raised-button color="primary" (click)="reload()" style="margin-left: 1em;">Оновити</button>
        <button mat-raised-button color="primary" (click)="add()">Створити</button>
        <table mat-table [dataSource]="dataSource" matSort class="mat-elevation-z8" style="width:100%; margin-top: 1em;">
            <!-- Value Column -->
            <ng-container matColumnDef="value">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Значення </th>
                <td mat-cell *matCellDef="let area"> {{area.value}} </td>
            </ng-container>
            <ng-container matColumnDef="shortValue">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Скорочення </th>
                <td mat-cell *matCellDef="let area"> {{area.shortValue}} </td>
            </ng-container>
            <ng-container matColumnDef="natoCode">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Код NATO </th>
                <td mat-cell *matCellDef="let area"> {{area.natoCode}} </td>
            </ng-container>
            <ng-container matColumnDef="category">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Категорія </th>
                <td mat-cell *matCellDef="let area"> {{area.category}} </td>
            </ng-container>
            <ng-container matColumnDef="subCategory">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Підкатегорія </th>
                <td mat-cell *matCellDef="let area"> {{area.subCategory}} </td>
            </ng-container>
            <ng-container matColumnDef="orderVal">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Порядок </th>
                <td mat-cell *matCellDef="let area"> {{area.orderVal}} </td>
            </ng-container>

            <!-- Comment Column -->
            <ng-container matColumnDef="comment">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Коментар </th>
                <td mat-cell *matCellDef="let area"> {{area.comment}} </td>
            </ng-container>
            <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef> Дії </th>
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
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
    `,
})
export class dictRanks implements AfterViewInit {
    readonly api = '/api/DictRank';
    dictService = inject(DictRankService);
    items = this.dictService.createItemsSignal(this.api);
    dataSource = new MatTableDataSource<DictRank>([]);
    displayedColumns = ['value', 'shortValue', 'natoCode', 'category', 'subCategory', 'orderVal', 'comment', 'actions'];
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
        this.dictService.getAll(this.api).subscribe(items => this.items.set(items));
    }

    // CREATE
    add() {
        const dialogRef = this.dialog.open(DictRankDialogComponent, {
            width: '400px',
            //data: { value: '', shortValue: '', natoCode: '', category: '', subCategory: '', orderVal: '', comment: '' } // Передаем пустой объект для создания
            data: { value: '', shortValue: '', natoCode: '', category: '', subCategory: '', orderVal: '', comment: '' } // Передаем пустой объект для создания
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.dictService.create(this.api, result).subscribe(() => this.reload());
            }
        });
    }

    // UPDATE
    edit(value: DictRank) {
        const dialogRef = this.dialog.open(DictRankDialogComponent, {
            width: '400px',
            data: { ...value } // Передаем копию объекта для редактирования
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.dictService.update(this.api, result.id, result).subscribe(() => this.reload());
            }
        });
    }

    // DELETE
    delete(value: DictRank) {
        const ref = this.dialog.open(ConfirmDialogComponent, {
            width: '360px',
            maxWidth: '95vw',
            //disableClose: true,   // чтобы не закрывалось по клику вне/ESC
            autoFocus: false,
            data: {
                title: 'Видалення запису',
                message: `Ви впевнені, що хочете видалити запис "${value.value}"?`,
                confirmText: 'Видалити',
                cancelText: 'Відмінити',
                color: 'warn',
                icon: 'warning'
            }
        });
        ref.afterClosed().subscribe(confirmed => {
            if (confirmed) {
                this.dictService.delete(this.api, value.id).subscribe(() => this.reload());
            }
        });
    }
}
