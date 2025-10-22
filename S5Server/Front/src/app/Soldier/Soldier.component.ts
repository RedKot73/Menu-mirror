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
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { SlicePipe } from '@angular/common';

import { SoldierDialogComponent } from '../dialogs/SoldierDialog';
import { ConfirmDialogComponent } from "../dialogs/ConfirmDialog.component";
import { SoldierService, SoldierDto, SoldierCreateDto } from "./services/soldier.service";
import { UnitService, UnitDto } from "../Unit/services/unit.service";
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
        MatMenuModule,
        FormsModule,
        SlicePipe,
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
            <!-- Menu Column -->
            <ng-container matColumnDef="menu">
                <th mat-header-cell *matHeaderCellDef style="width: 60px;"> Дії </th>
                <td mat-cell *matCellDef="let soldier">
                    <button mat-icon-button 
                            [matMenuTriggerFor]="soldierMenu"
                            matTooltip="Дії з бійцем"
                            (click)="$event.stopPropagation()">
                        <mat-icon>more_vert</mat-icon>
                    </button>
                    
                    <mat-menu #soldierMenu="matMenu">
                        <button mat-menu-item (click)="assign(soldier)">
                            <mat-icon color="primary">assignment_ind</mat-icon>
                            <span>Придати до підрозділу</span>
                        </button>
                        <button mat-menu-item (click)="move(soldier)">
                            <mat-icon color="primary">swap_horiz</mat-icon>
                            <span>Перемістити до іншого підрозділу</span>
                        </button>
                        <button mat-menu-item (click)="edit(soldier)">
                            <mat-icon color="accent">edit</mat-icon>
                            <span>Редагувати</span>
                        </button>
                        <button mat-menu-item (click)="delete(soldier)">
                            <mat-icon color="warn">delete</mat-icon>
                            <span>Видалити</span>
                        </button>
                    </mat-menu>
                </td>
            </ng-container>

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
                <td mat-cell *matCellDef="let soldier" class="comment-cell"> 
                    <span class="comment-text" 
                          [matTooltip]="soldier.comment && soldier.comment.length > 50 ? soldier.comment : ''"
                          [title]="soldier.comment && soldier.comment.length > 50 ? soldier.comment : ''">
                        {{ soldier.comment ? (soldier.comment.length > 50 ? (soldier.comment | slice:0:50) + '...' : soldier.comment) : '-' }}
                    </span>
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
    displayedColumns = ['menu', 'fio', 'nickName', 'rankShortValue', 'positionValue',
        'stateValue', 'assignedUnitShortName', 'comment'];
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
        const openDialog = () => {
            const dialogRef = this.dialog.open(SoldierDialogComponent, {
                width: '600px',
                data: { 
                    id: '',
                    firstName: '', 
                    midleName: '', 
                    lastName: '', 
                    fio: '',
                    nickName: '', 
                    unitId: this.filterByUnitId() || '',
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
                if (result && result.data) {
                    const createDto: SoldierCreateDto = {
                        firstName: result.data.firstName,
                        midleName: result.data.midleName,
                        lastName: result.data.lastName,
                        nickName: result.data.nickName,
                        unitId: result.data.unitId,
                        assignedUnitId: result.data.assignedUnitId,
                        rankId: result.data.rankId,
                        positionId: result.data.positionId,
                        stateId: result.data.stateId,
                        comment: result.data.comment
                    };
                    
                    this.soldierService.create(createDto).subscribe(() => {
                        this.reload();
                        
                        // Если нужно продолжить, открываем диалог снова
                        if (result.continue) {
                            setTimeout(() => openDialog(), 100);
                        }
                    });
                }
            });
        };

        openDialog();
    }

    // UPDATE
    edit(soldier: Soldier) {
        const dialogRef = this.dialog.open(SoldierDialogComponent, {
            width: '600px',
            data: { ...soldier } // Передаем копию объекта для редактирования
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result && result.data) {
                this.soldierService.update(result.data.id, result.data).subscribe(() => this.reload());
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