import { Component, inject, ViewChild, AfterViewInit, effect } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ShortDictService, ShortDictDto } from "../ServerService/shortDict.service";
export type DictArea = ShortDictDto;

@Component({
    selector: "page-dict-unit-types",
    template: `
        <h2>Типи підрозділів</h2>
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
export class dictUnitTypes implements AfterViewInit {
    readonly api = 'api/dict-unit-types';
    dictService = inject(ShortDictService);
    items = this.dictService.createItemsSignal(this.api);
    dataSource = new MatTableDataSource<DictArea>([]);
    displayedColumns = ['value', 'shortValue', 'comment'];

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
