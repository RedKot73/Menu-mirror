import { Component, inject, ViewChild, AfterViewInit, effect } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { ShortDictDialogComponent } from '../app/dialogs/ShortDict-dialog.component';
import { ConfirmDialogComponent } from "../app/dialogs/ConfirmDialog.component";
import { DictForcesTypeService, DictForcesType } from "../ServerService/dictForcesType.service";


@Component({
    selector: "page-dict-forces-types",
    imports: [MatTableModule, MatButtonModule, MatSortModule, MatIconModule],
    template: `
        <h2>Види збройних сил</h2>
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
export class DictForcesTypeComponent implements AfterViewInit {
    // API endpoint перенесен в сервис
    dictForcesTypeService = inject(DictForcesTypeService);
    items = this.dictForcesTypeService.createItemsSignal();
    dataSource = new MatTableDataSource<DictForcesType>([]);
    displayedColumns = ['value', 'shortValue', 'comment', 'actions'];
    dialog = inject(MatDialog);

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
        this.dictForcesTypeService.getAll().subscribe(items => this.items.set(items));
    }

    // CREATE
    add() {
        const dialogRef = this.dialog.open(ShortDictDialogComponent, {
            width: '400px',
            data: { value: '', comment: '' } // Передаем пустой объект для создания
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.dictForcesTypeService.create(result).subscribe(() => this.reload());
            }
        });
    }

    // UPDATE
    edit(forcesType: DictForcesType) {
        const dialogRef = this.dialog.open(ShortDictDialogComponent, {
            width: '400px',
            data: { ...forcesType } // Передаем копию объекта для редактирования
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.dictForcesTypeService.update(result.id, result).subscribe(() => this.reload());
            }
        });
    }

    // DELETE
    delete(forcesType: DictForcesType) {
        const ref = this.dialog.open(ConfirmDialogComponent, {
            width: '360px',
            maxWidth: '95vw',
            //disableClose: true,   // чтобы не закрывалось по клику вне/ESC
            autoFocus: false,
            data: {
                title: 'Видалення запису',
                message: `Ви впевнені, що хочете видалити запис "${forcesType.value}"?`,
                confirmText: 'Видалити',
                cancelText: 'Відмінити',
                color: 'warn',
                icon: 'warning'
            }
        });
        ref.afterClosed().subscribe(confirmed => {
            if (confirmed) {
                this.dictForcesTypeService.delete(forcesType.id).subscribe(() => this.reload());
            }
        });
    }
}
