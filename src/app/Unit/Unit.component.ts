import { Component, inject, ViewChild, AfterViewInit, effect, signal } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';

import { UnitDialogComponent } from '../../dictionaries/dialogs/UnitDialog';
import { ConfirmDialogComponent } from "../../dictionaries/dialogs/ConfirmDialog.component";
import { UnitService, UnitDto, UnitCreateDto } from "../../ServerService/unit.service";

export type Unit = UnitDto;

@Component({
    selector: "page-units",
    imports: [
        MatTableModule, 
        MatButtonModule, 
        MatSortModule, 
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatOptionModule,
        FormsModule
    ],
    template: `
        <h2>Підрозділи</h2>
        
        <!-- Фильтры -->
        <div class="filters">
            <mat-form-field appearance="outline">
                <mat-label>Пошук</mat-label>
                <input matInput [(ngModel)]="searchText" (input)="onSearchChange()" placeholder="Назва або скорочення">
            </mat-form-field>
            
            <mat-form-field appearance="outline">
                <mat-label>Фільтр по батьківському підрозділу</mat-label>
                <mat-select [(ngModel)]="selectedParentId" (selectionChange)="onParentFilterChange()">
                    <mat-option [value]="null">Всі підрозділи</mat-option>
                    <mat-option value="">Тільки кореневі підрозділи</mat-option>
                    @for (unit of allUnits(); track unit.id) {
                        <mat-option [value]="unit.id">{{ unit.name }} ({{ unit.shortName }})</mat-option>
                    }
                </mat-select>
            </mat-form-field>
            
            <button mat-raised-button color="primary" (click)="reload()">Оновити</button>
            <button mat-raised-button color="primary" (click)="add()">Створити</button>
        </div>

        <table mat-table [dataSource]="dataSource" matSort class="mat-elevation-z8" style="width:100%; margin-top: 1em;">
            <!-- Name Column -->
            <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Назва </th>
                <td mat-cell *matCellDef="let unit"> 
                    <div class="unit-name">
                        <span>{{ unit.name }}</span>
                        @if (unit.parentId) {
                            <mat-icon class="hierarchy-icon" title="Дочірній підрозділ">subdirectory_arrow_right</mat-icon>
                        }
                        @if (unit.assignedUnitId) {
                            <mat-icon class="assigned-icon" title="Приданий підрозділ">assignment_ind</mat-icon>
                        }
                    </div>
                </td>
            </ng-container>
            
            <!-- ShortName Column -->
            <ng-container matColumnDef="shortName">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Скорочення </th>
                <td mat-cell *matCellDef="let unit"> {{unit.shortName}} </td>
            </ng-container>
            
            <!-- MilitaryNumber Column -->
            <ng-container matColumnDef="militaryNumber">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> В/Ч </th>
                <td mat-cell *matCellDef="let unit"> {{unit.militaryNumber}} </td>
            </ng-container>
            
            <!-- OrderVal Column -->
            <ng-container matColumnDef="orderVal">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Порядок </th>
                <td mat-cell *matCellDef="let unit"> {{unit.orderVal}} </td>
            </ng-container>

            <!-- Comment Column -->
            <ng-container matColumnDef="comment">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Коментар </th>
                <td mat-cell *matCellDef="let unit"> {{unit.comment}} </td>
            </ng-container>
            
            <!-- Actions Column -->
            <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef> Дії </th>
                <td mat-cell *matCellDef="let unit">
                    <button mat-icon-button color="primary" (click)="showChildren(unit)" 
                            title="Показати дочірні підрозділи">
                        <mat-icon>account_tree</mat-icon>
                    </button>
                    <button mat-icon-button color="primary" (click)="showAssigned(unit)" 
                            title="Показати придані підрозділи">
                        <mat-icon>assignment_ind</mat-icon>
                    </button>
                    <button mat-icon-button color="accent" (click)="edit(unit)">
                        <mat-icon>edit</mat-icon>
                    </button>
                    <button mat-icon-button color="warn" (click)="delete(unit)">
                        <mat-icon>delete</mat-icon>
                    </button>
                </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
    `,
    styles: [`
        .filters {
            display: flex;
            gap: 16px;
            align-items: center;
            margin-bottom: 16px;
            flex-wrap: wrap;
        }
        .filters mat-form-field {
            min-width: 200px;
        }
        .unit-name {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .hierarchy-icon {
            color: #1976d2;
            font-size: 18px;
            width: 18px;
            height: 18px;
        }
        .assigned-icon {
            color: #388e3c;
            font-size: 18px;
            width: 18px;
            height: 18px;
        }
        .mat-mdc-table {
            width: 100%;
        }
        .mat-mdc-row:hover {
            background-color: #f5f5f5;
        }
    `]
})
export class UnitsComponent implements AfterViewInit {
    readonly api = '/api/Unit';
    unitService = inject(UnitService);
    items = this.unitService.createItemsSignal(this.api);
    allUnits = signal<UnitDto[]>([]);
    dataSource = new MatTableDataSource<Unit>([]);
    displayedColumns = ['name', 'shortName', 'militaryNumber', 'orderVal', 'comment', 'actions'];
    dialog = inject(MatDialog);
    
    // Фильтры
    searchText = '';
    selectedParentId: string | null = null;

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
        this.unitService.getAll(this.api, this.searchText, this.selectedParentId || undefined)
            .subscribe(items => {
                this.items.set(items);
            });
            
        // Также загружаем все подразделения для фильтра
        this.unitService.getAll(this.api).subscribe(allUnits => {
            this.allUnits.set(allUnits);
        });
    }

    onSearchChange() {
        // Применяем фильтр с задержкой
        setTimeout(() => this.reload(), 300);
    }

    onParentFilterChange() {
        this.reload();
    }

    // CREATE
    add() {
        const dialogRef = this.dialog.open(UnitDialogComponent, {
            width: '600px',
            data: { 
                id: '',
                name: '', 
                shortName: '', 
                militaryNumber: '', 
                forceTypeId: '',
                unitTypeId: '',
                parentId: undefined,
                assignedUnitId: undefined,
                orderVal: 1, 
                comment: '' 
            } as UnitDto
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                const createDto: UnitCreateDto = {
                    name: result.name,
                    shortName: result.shortName,
                    militaryNumber: result.militaryNumber,
                    forceTypeId: result.forceTypeId,
                    unitTypeId: result.unitTypeId,
                    parentId: result.parentId,
                    assignedUnitId: result.assignedUnitId,
                    orderVal: result.orderVal,
                    comment: result.comment
                };
                this.unitService.create(this.api, createDto).subscribe(() => this.reload());
            }
        });
    }

    // UPDATE
    edit(unit: Unit) {
        const dialogRef = this.dialog.open(UnitDialogComponent, {
            width: '600px',
            data: { ...unit } // Передаем копию объекта для редактирования
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.unitService.update(this.api, result.id, result).subscribe(() => this.reload());
            }
        });
    }

    // DELETE
    delete(unit: Unit) {
        const ref = this.dialog.open(ConfirmDialogComponent, {
            width: '360px',
            maxWidth: '95vw',
            autoFocus: false,
            data: {
                title: 'Видалення підрозділу',
                message: `Ви впевнені, що хочете видалити підрозділ "${unit.name}"?`,
                confirmText: 'Видалити',
                cancelText: 'Відмінити',
                color: 'warn',
                icon: 'warning'
            }
        });
        
        ref.afterClosed().subscribe(confirmed => {
            if (confirmed) {
                this.unitService.delete(this.api, unit.id).subscribe(() => this.reload());
            }
        });
    }

    // Показать дочерние подразделения
    showChildren(unit: Unit) {
        this.unitService.getChildren(this.api, unit.id).subscribe(children => {
            if (children.length === 0) {
                // Показать уведомление, что дочерних подразделений нет
                this.dialog.open(ConfirmDialogComponent, {
                    width: '360px',
                    autoFocus: false,
                    data: {
                        title: 'Дочірні підрозділи',
                        message: `У підрозділі "${unit.name}" немає дочірніх підрозділів.`,
                        confirmText: 'OK',
                        cancelText: '',
                        color: 'primary',
                        icon: 'info'
                    }
                });
            } else {
                // Фильтруем таблицу, чтобы показать только дочерние подразделения
                this.selectedParentId = unit.id;
                this.reload();
            }
        });
    }

    // Показать приданные подразделения
    showAssigned(unit: Unit) {
        this.unitService.getAssignedUnits(this.api, unit.id).subscribe(assigned => {
            if (assigned.length === 0) {
                // Показать уведомление, что приданных подразделений нет
                this.dialog.open(ConfirmDialogComponent, {
                    width: '360px',
                    autoFocus: false,
                    data: {
                        title: 'Придані підрозділи',
                        message: `До підрозділу "${unit.name}" не придано жодного підрозділу.`,
                        confirmText: 'OK',
                        cancelText: '',
                        color: 'primary',
                        icon: 'info'
                    }
                });
            } else {
                // Показать диалог со списком приданных подразделений
                const assignedNames = assigned.map(a => `• ${a.name} (${a.shortName})`).join('\n');
                this.dialog.open(ConfirmDialogComponent, {
                    width: '400px',
                    autoFocus: false,
                    data: {
                        title: `Придані підрозділи до "${unit.shortName}"`,
                        message: assignedNames,
                        confirmText: 'OK',
                        cancelText: '',
                        color: 'primary',
                        icon: 'assignment_ind'
                    }
                });
            }
        });
    }
}