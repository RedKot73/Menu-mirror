import { Component, inject, ViewChild, AfterViewInit, effect, signal, input } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';

import { SoldierDialogComponent } from '../dialogs/SoldierDialog';
import { ConfirmDialogComponent } from "../dialogs/ConfirmDialog.component";
import { SoldierService, SoldierDto, SoldierCreateDto } from "../../ServerService/soldier.service";
import { UnitService, UnitDto } from "../../ServerService/unit.service";
import { SoldierFiltersComponent } from './soldier-filters.component';

export type Soldier = SoldierDto;

@Component({
    selector: "page-soldiers",
    imports: [
        MatTableModule, 
        MatButtonModule, 
        MatSortModule, 
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatOptionModule,
        MatTooltipModule,
        FormsModule,
        SoldierFiltersComponent
    ],
    styleUrl: './Soldier.component.scss',
    template: `
        <soldier-filters 
            [allUnits]="allUnits()"
            (searchChanged)="onSearchChange($event)"
            (assignedUnitFilterChanged)="onAssignedUnitFilterChange($event)"
            (reload)="reload()"
            (add)="add()">
        </soldier-filters>

        <table mat-table [dataSource]="dataSource" matSort class="mat-elevation-z8" style="width:100%; margin-top: 1em;">
            <!-- FIO Column -->
            <ng-container matColumnDef="fio">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> ПІБ </th>
                <td mat-cell *matCellDef="let soldier">
                    <span class="fio">{{ soldier.fio }}</span>
                </td>
            </ng-container>
            
            <ng-container matColumnDef="nickName">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Позивний </th>
                <td mat-cell *matCellDef="let soldier"> {{ soldier.nickName }} </td>
            </ng-container>

            <!-- Rank Column -->
            <ng-container matColumnDef="rankShortValue">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Звання </th>
                <td mat-cell *matCellDef="let soldier"> {{ soldier.rankShortValue }} </td>
            </ng-container>
            
            <!-- Position Column -->
            <ng-container matColumnDef="positionValue">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Посада </th>
                <td mat-cell *matCellDef="let soldier"> {{ soldier.positionValue }} </td>
            </ng-container>
            
            <!-- State Column -->
            <ng-container matColumnDef="stateValue">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Статус </th>
                <td mat-cell *matCellDef="let soldier"> 
                    <span class="state-badge">{{ soldier.stateValue }}</span>
                </td>
            </ng-container>

            <!-- Assigned Unit Column -->
            <ng-container matColumnDef="assignedUnitShortName">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Приданий до </th>
                <td mat-cell *matCellDef="let soldier"> {{ soldier.assignedUnitShortName || '-' }} </td>
            </ng-container>

            <!-- Comment Column -->
            <ng-container matColumnDef="comment">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Коментар </th>
                <td mat-cell *matCellDef="let soldier"> {{ soldier.comment || '-' }} </td>
            </ng-container>
            
            <!-- Actions Column -->
            <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef> Дії </th>
                <td mat-cell *matCellDef="let soldier">
                    <button mat-icon-button color="primary" 
                            (click)="assign(soldier)" 
                            matTooltip="Придати до підрозділу">
                        <mat-icon>assignment_ind</mat-icon>
                    </button>
                    <button mat-icon-button color="primary" 
                            (click)="move(soldier)" 
                            matTooltip="Перемістити до іншого підрозділу">
                        <mat-icon>swap_horiz</mat-icon>
                    </button>
                    <button mat-icon-button color="accent" 
                            (click)="edit(soldier)"
                            matTooltip="Редагувати">
                        <mat-icon>edit</mat-icon>
                    </button>
                    <button mat-icon-button color="warn" 
                            (click)="delete(soldier)"
                            matTooltip="Видалити">
                        <mat-icon>delete</mat-icon>
                    </button>
                </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
    `
})
export class SoldiersComponent implements AfterViewInit {
    soldierService = inject(SoldierService);
    unitService = inject(UnitService);
    
    // Input для фильтрации по подразделению
    filterByUnitId = input<string | null>(null);
    
    items = this.soldierService.createItemsSignal();
    allUnits = signal<UnitDto[]>([]);
    dataSource = new MatTableDataSource<Soldier>([]);
    displayedColumns = ['fio', 'nickName', 'rankShortValue', 'positionValue',
        'stateValue', 'assignedUnitShortName', 'comment', 'actions'];
    dialog = inject(MatDialog);
    
    // Фильтры
    searchText = '';
    selectedAssignedUnitId: string | null = null;

    @ViewChild(MatSort) sort!: MatSort;

    constructor() {
        effect(() => {
            this.dataSource.data = this.items();
        });
        
        // Автоматически перезагружаем данные при изменении фильтра подразделения
        effect(() => {
            const unitFilter = this.filterByUnitId();
            if (unitFilter !== null) {
                this.reload();
            }
        });
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        
        // Загружаем все подразделения для фильтров
        this.unitService.getAll().subscribe(units => {
            this.allUnits.set(units);
        });
        
        // Загружаем начальные данные
        this.reload();
    }

    reload() {
        // Определяем параметры для сервера
        const unitId = this.filterByUnitId() === '' ? undefined : this.filterByUnitId() || undefined;
        const assignedUnitId = this.selectedAssignedUnitId === '' ? undefined : 
                              this.selectedAssignedUnitId === 'null' ? 'null' : 
                              this.selectedAssignedUnitId || undefined;

        this.soldierService.getAll(this.searchText, unitId, assignedUnitId)
            .subscribe(items => {
                this.items.set(items);
            });
    }

    onSearchChange(searchText: string) {
        this.searchText = searchText;
        this.reload();
    }

    onAssignedUnitFilterChange(assignedUnitId: string | null) {
        this.selectedAssignedUnitId = assignedUnitId;
        this.reload();
    }

    // CREATE
    add() {
        const dialogRef = this.dialog.open(SoldierDialogComponent, {
            width: '600px',
            data: { 
                id: '',
                firstName: '', 
                midleName: '', 
                lastName: '', 
                fio: '',
                nickName: '', 
                unitId: this.filterByUnitId(),
                unitShortName: '',
                assignedUnitId: undefined,
                assignedUnitShortName: undefined,
                rankId: '',
                rankShortValue: '',
                positionId: '',
                positionValue: '',
                stateId: '',
                stateValue: '',
                comment: '' 
            } as SoldierDto
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                const createDto: SoldierCreateDto = {
                    firstName: result.firstName,
                    midleName: result.midleName,
                    lastName: result.lastName,
                    nickName: result.nickName,
                    unitId: result.unitId,
                    assignedUnitId: result.assignedUnitId,
                    rankId: result.rankId,
                    positionId: result.positionId,
                    stateId: result.stateId,
                    comment: result.comment
                };
                this.soldierService.create(createDto).subscribe(() => this.reload());
            }
        });
    }

    // UPDATE
    edit(soldier: Soldier) {
        const dialogRef = this.dialog.open(SoldierDialogComponent, {
            width: '600px',
            data: { ...soldier } // Передаем копию объекта для редактирования
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.soldierService.update(result.id, result).subscribe(() => this.reload());
            }
        });
    }

    // DELETE
    delete(soldier: Soldier) {
        const ref = this.dialog.open(ConfirmDialogComponent, {
            width: '360px',
            maxWidth: '95vw',
            autoFocus: false,
            data: {
                title: 'Видалення бійця',
                message: `Ви впевнені, що хочете видалити бійця "${soldier.fio}"?`,
                confirmText: 'Видалити',
                cancelText: 'Відмінити',
                color: 'warn',
                icon: 'warning'
            }
        });
        
        ref.afterClosed().subscribe(confirmed => {
            if (confirmed) {
                this.soldierService.delete(soldier.id).subscribe(() => this.reload());
            }
        });
    }

    // Придать к подразделению
    assign(soldier: Soldier) {
        // Здесь можно открыть диалог выбора подразделения
        // Для простоты сейчас покажем уведомление
        this.dialog.open(ConfirmDialogComponent, {
            width: '400px',
            autoFocus: false,
            data: {
                title: 'Придання бійця',
                message: `Функція придання бійця "${soldier.fio}" до підрозділу буде реалізована пізніше.`,
                confirmText: 'OK',
                cancelText: '',
                color: 'primary',
                icon: 'info'
            }
        });
    }

    // Переместить в другое подразделение
    move(soldier: Soldier) {
        // Здесь можно открыть диалог выбора подразделения
        // Для простоты сейчас покажем уведомление
        this.dialog.open(ConfirmDialogComponent, {
            width: '400px',
            autoFocus: false,
            data: {
                title: 'Переміщення бійця',
                message: `Функція переміщення бійця "${soldier.fio}" до іншого підрозділу буде реалізована пізніше.`,
                confirmText: 'OK',
                cancelText: '',
                color: 'primary',
                icon: 'info'
            }
        });
    }
}