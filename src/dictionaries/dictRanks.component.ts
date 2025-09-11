import { Component, inject, ViewChild, AfterViewInit, effect } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { DictRankService, DictRankDto } from "../ServerService/dictRanks.service";
export type DictRank = DictRankDto;

@Component({
    selector: "page-dict-ranks",
    template: `
        <h2>Військові звання</h2>
        <button mat-raised-button color="primary" (click)="reload()">Обновить</button>
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
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Код НАТО </th>
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

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
    `,
    imports: [MatTableModule, MatButtonModule, MatSortModule],
})
export class dictRanks implements AfterViewInit {
    readonly api = '/api/DictRank';
    dictService = inject(DictRankService);
    items = this.dictService.createItemsSignal(this.api);
    dataSource = new MatTableDataSource<DictRank>([]);
    displayedColumns = ['value', 'shortValue', 'natoCode', 'category', 'subCategory', 'orderVal', 'comment'];

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
}
