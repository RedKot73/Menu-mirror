import { Component, inject, ViewChild, AfterViewInit, effect } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { ShortDictDialogComponent } from '../app/dialogs/ShortDict-dialog.component';
import { ConfirmDialogComponent } from "../app/dialogs/ConfirmDialog.component";
import { DictTemplateCategoriesService, DictTemplateCategory } from "../ServerService/dictTemplateCategories.service";


@Component({
    selector: "page-dict-template-categories",
    imports: [MatTableModule, MatButtonModule, MatSortModule, MatIconModule],
    template: `
        <h2>Категорії шаблонів документів</h2>
        <button mat-raised-button color="primary" (click)="reload()" style="margin-left: 1em;">Обновить</button>
        <button mat-raised-button color="primary" (click)="add()">Создать</button>
        <table mat-table [dataSource]="dataSource" matSort class="mat-elevation-z8" style="width:100%; margin-top: 1em;">
            <!-- Value Column -->
            <ng-container matColumnDef="value">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Название </th>
                <td mat-cell *matCellDef="let category"> {{category.value}} </td>
            </ng-container>
            <ng-container matColumnDef="shortValue">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Сокращение </th>
                <td mat-cell *matCellDef="let category"> {{category.shortValue}} </td>
            </ng-container>
            <!-- Comment Column -->
            <ng-container matColumnDef="comment">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Комментарий </th>
                <td mat-cell *matCellDef="let category"> {{category.comment}} </td>
            </ng-container>
            <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef> Действия </th>
                <td mat-cell *matCellDef="let category">
                    <button mat-icon-button color="accent" (click)="edit(category)">
                        <mat-icon>edit</mat-icon>
                    </button>
                    <button mat-icon-button color="warn" (click)="delete(category)">
                        <mat-icon>delete</mat-icon>
                    </button>
                </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
    `,
})
export class DictTemplateCategoriesComponent implements AfterViewInit {
    dictTemplateCategoriesService = inject(DictTemplateCategoriesService);
    items = this.dictTemplateCategoriesService.createItemsSignal();
    dataSource = new MatTableDataSource<DictTemplateCategory>([]);
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
        this.dictTemplateCategoriesService.getAll().subscribe(items => this.items.set(items));
    }

    // CREATE
    add() {
        const dialogRef = this.dialog.open(ShortDictDialogComponent, {
            width: '400px',
            data: { value: '', comment: '' } // Передаем пустой объект для создания
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.dictTemplateCategoriesService.create(result).subscribe(() => this.reload());
            }
        });
    }

    // UPDATE
    edit(category: DictTemplateCategory) {
        const dialogRef = this.dialog.open(ShortDictDialogComponent, {
            width: '400px',
            data: { ...category } // Передаем копию объекта для редактирования
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.dictTemplateCategoriesService.update(result.id, result).subscribe(() => this.reload());
            }
        });
    }

    // DELETE
    delete(category: DictTemplateCategory) {
        const ref = this.dialog.open(ConfirmDialogComponent, {
            width: '360px',
            maxWidth: '95vw',
            //disableClose: true,   // чтобы не закрывалось по клику вне/ESC
            autoFocus: false,
            data: {
                title: 'Удаление записи',
                message: `Вы уверены, что хотите удалить запись "${category.value}"?`,
                confirmText: 'Удалить',
                cancelText: 'Отменить',
                color: 'warn',
                icon: 'warning'
            }
        });
        ref.afterClosed().subscribe(confirmed => {
            if (confirmed) {
                this.dictTemplateCategoriesService.delete(category.id).subscribe(() => this.reload());
            }
        });
    }
}