import { Component, inject, signal, computed, effect } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { UnitDialogComponent } from '../dialogs/UnitDialog';
import { ConfirmDialogComponent } from "../dialogs/ConfirmDialog.component";
import { UnitService, UnitDto, UnitCreateDto } from "../../ServerService/unit.service";
import { UnitTreeComponent } from './UnitTree.component';

export type Unit = UnitDto;

@Component({
    selector: "page-units",
    imports: [
        MatButtonModule,
        MatSidenavModule,
        MatToolbarModule, 
        MatIconModule,
        MatCardModule,
        MatDividerModule,
        MatChipsModule,
        UnitTreeComponent
    ],
    styleUrl: './Unit.component.scss',
    template: `
        <mat-sidenav-container class="unit-container">
            <!-- Левая панель с деревом подразделений -->
            <mat-sidenav 
                #sidenav 
                [mode]="sidenavMode()"
                [opened]="sidenavOpen()"
                class="unit-sidenav">
                
                <div class="sidenav-header">
                    <button mat-icon-button (click)="toggleSidenav()">
                        <mat-icon>close</mat-icon>
                    </button>
                </div>
                
                <!-- Дерево подразделений -->
                <unit-tree 
                    (unitSelected)="onUnitSelected($event)"
                    class="unit-tree">
                </unit-tree>
                
                <!-- Разделитель для изменения размера -->
                @if (!isMobile() && sidenavMode() === 'side') {
                    <div class="sidenav-resizer" 
                         [class.resizing]="isResizing()"
                         (mousedown)="onResizeStart($event)">
                    </div>
                }
            </mat-sidenav>

            <!-- Основной контент -->
            <mat-sidenav-content class="unit-content">
                <!-- Toolbar с кнопкой toggle -->
                <mat-toolbar color="primary" class="unit-toolbar">
                    <button 
                        mat-icon-button 
                        (click)="toggleSidenav()"
                        [class.hidden]="sidenavOpen() && !isMobile()">
                        <mat-icon>menu</mat-icon>
                    </button>
                </mat-toolbar>

                <!-- Основное содержимое -->
                <div class="main-content">
                    @if (selectedUnit(); as unit) {
                        <!-- Детальная информация о подразделении -->
                        <mat-card class="unit-details-card">
                            <mat-card-header>
                                <mat-card-title>{{ unit.name }}</mat-card-title>
                                <mat-card-subtitle>{{ unit.shortName }}</mat-card-subtitle>
                            </mat-card-header>
                            
                            <mat-card-content>
                                <div class="unit-info-grid">
                                    <div class="info-item">
                                        <strong>Військова частина:</strong>
                                        <span>{{ unit.militaryNumber || 'Не вказано' }}</span>
                                    </div>
                                    
                                    <div class="info-item">
                                        <strong>Тип сил:</strong>
                                        <span>{{ unit.forceType || 'Не вказано' }}</span>
                                    </div>
                                    
                                    <div class="info-item">
                                        <strong>Тип підрозділу:</strong>
                                        <span>{{ unit.unitType || 'Не вказано' }}</span>
                                    </div>
                                    
                                    <div class="info-item">
                                        <strong>Порядок:</strong>
                                        <span>{{ unit.orderVal }}</span>
                                    </div>
                                    
                                    @if (unit.parentShortName) {
                                        <div class="info-item">
                                            <strong>Батьківський підрозділ:</strong>
                                            <span>{{ unit.parentShortName }}</span>
                                        </div>
                                    }
                                    
                                    @if (unit.assignedShortName) {
                                        <div class="info-item">
                                            <strong>Приданий до:</strong>
                                            <span>{{ unit.assignedShortName }}</span>
                                        </div>
                                    }
                                    
                                    @if (unit.comment) {
                                        <div class="info-item full-width">
                                            <strong>Коментар:</strong>
                                            <span>{{ unit.comment }}</span>
                                        </div>
                                    }
                                </div>
                                
                                <!-- Статусы и индикаторы -->
                                <div class="unit-status-chips">
                                    @if (unit.parentId) {
                                        <mat-chip-set>
                                            <mat-chip>
                                                <mat-icon matChipAvatar>subdirectory_arrow_right</mat-icon>
                                                Дочірній підрозділ
                                            </mat-chip>
                                        </mat-chip-set>
                                    }
                                    @if (unit.assignedUnitId) {
                                        <mat-chip-set>
                                            <mat-chip>
                                                <mat-icon matChipAvatar>assignment_ind</mat-icon>
                                                Приданий підрозділ
                                            </mat-chip>
                                        </mat-chip-set>
                                    }
                                </div>
                            </mat-card-content>
                            
                            <mat-card-actions>
                                <button mat-button (click)="showChildren(unit)">
                                    <mat-icon>account_tree</mat-icon>
                                    Дочірні підрозділи
                                </button>
                                <button mat-button (click)="showAssigned(unit)">
                                    <mat-icon>assignment_ind</mat-icon>
                                    Придані підрозділи
                                </button>
                            </mat-card-actions>
                        </mat-card>
                    } @else {
                        <!-- Состояние когда ничего не выбрано -->
                        <div class="empty-state">
                            <mat-icon class="empty-icon">account_tree</mat-icon>
                            <h2>Оберіть підрозділ</h2>
                            <p>Виберіть підрозділ у дереві ліворуч для перегляду детальної інформації</p>
                            @if (!sidenavOpen()) {
                                <button mat-raised-button color="primary" (click)="toggleSidenav()">
                                    <mat-icon>menu</mat-icon>
                                    Показати дерево підрозділів
                                </button>
                            }
                        </div>
                    }
                </div>
            </mat-sidenav-content>
        </mat-sidenav-container>
    `
})
export class UnitsComponent {
    unitService = inject(UnitService);
    dialog = inject(MatDialog);
    breakpointObserver = inject(BreakpointObserver);
    
    // State signals
    selectedUnit = signal<UnitDto | null>(null);
    sidenavOpen = signal<boolean>(this.getSavedSidenavState());
    sidenavWidth = signal<number>(this.getSavedSidenavWidth());
    isResizing = signal<boolean>(false);
    
    // Computed signals
    selectedUnitTitle = computed(() => {
        const unit = this.selectedUnit();
        return unit ? `${unit.name} (${unit.shortName})` : 'Підрозділи';
    });
    
    isMobile = computed(() => 
        this.breakpointObserver.isMatched([Breakpoints.Handset])
    );
    
    sidenavMode = computed(() => 
        this.isMobile() ? 'over' : 'side'
    );

    constructor() {
        // Закрываем sidenav на мобильных устройствах при старте
        effect(() => {
            if (this.isMobile() && this.sidenavOpen()) {
                this.sidenavOpen.set(false);
            }
        });

        // Применяем ширину sidenav через CSS переменную
        effect(() => {
            document.documentElement.style.setProperty(
                '--sidenav-width', 
                `${this.sidenavWidth()}px`
            );
        });
    }

    // Обработчики изменения размера
    onResizeStart(event: MouseEvent) {
        event.preventDefault();
        this.isResizing.set(true);
        
        const startX = event.clientX;
        const startWidth = this.sidenavWidth();
        
        const onMouseMove = (e: MouseEvent) => {
            const deltaX = e.clientX - startX;
            const newWidth = Math.min(600, Math.max(250, startWidth + deltaX));
            this.sidenavWidth.set(newWidth);
        };
        
        const onMouseUp = () => {
            this.isResizing.set(false);
            this.saveSidenavWidth(this.sidenavWidth());
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        };
        
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
    }

    private getSavedSidenavState(): boolean {
        const saved = localStorage.getItem('unitSidenavOpen');
        return saved !== null ? saved === 'true' : true;
    }

    private getSavedSidenavWidth(): number {
        const saved = localStorage.getItem('unitSidenavWidth');
        return saved !== null ? parseInt(saved, 10) : 350;
    }

    private saveSidenavState(open: boolean) {
        localStorage.setItem('unitSidenavOpen', open.toString());
    }

    private saveSidenavWidth(width: number) {
        localStorage.setItem('unitSidenavWidth', width.toString());
    }

    toggleSidenav() {
        const newState = !this.sidenavOpen();
        this.sidenavOpen.set(newState);
        this.saveSidenavState(newState);
    }

    onUnitSelected(unit: any) {
        // Получаем полную информацию о подразделении
        this.unitService.getById(unit.id).subscribe(fullUnit => {
            this.selectedUnit.set(fullUnit);
            
            // Закрываем sidenav на мобильных после выбора
            if (this.isMobile()) {
                this.sidenavOpen.set(false);
            }
        });
    }

    addUnit() {
        const dialogRef = this.dialog.open(UnitDialogComponent, {
            width: '600px',
            data: { 
                id: '',
                name: '', 
                shortName: '', 
                militaryNumber: '', 
                forceTypeId: undefined,
                unitTypeId: undefined,
                parentId: this.selectedUnit()?.id || undefined,
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
                this.unitService.create(createDto).subscribe(() => {
                    // TODO: Обновить дерево подразделений
                });
            }
        });
    }

    editUnit() {
        const unit = this.selectedUnit();
        if (!unit) return;

        const dialogRef = this.dialog.open(UnitDialogComponent, {
            width: '600px',
            data: { ...unit }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.unitService.update(result.id, result).subscribe(() => {
                    this.selectedUnit.set(result);
                    // TODO: Обновить дерево подразделений
                });
            }
        });
    }

    deleteUnit() {
        const unit = this.selectedUnit();
        if (!unit) return;

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
                this.unitService.delete(unit.id).subscribe(() => {
                    this.selectedUnit.set(null);
                    // TODO: Обновить дерево подразделений
                });
            }
        });
    }

    showChildren(unit: UnitDto) {
        this.unitService.getChildren(unit.id).subscribe(children => {
            if (children.length === 0) {
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
                const childrenNames = children.map(c => `• ${c.name} (${c.shortName})`).join('\n');
                this.dialog.open(ConfirmDialogComponent, {
                    width: '400px',
                    autoFocus: false,
                    data: {
                        title: `Дочірні підрозділи "${unit.shortName}"`,
                        message: childrenNames,
                        confirmText: 'OK',
                        cancelText: '',
                        color: 'primary',
                        icon: 'account_tree'
                    }
                });
            }
        });
    }

    showAssigned(unit: UnitDto) {
        this.unitService.getAssignedUnits(unit.id).subscribe(assigned => {
            if (assigned.length === 0) {
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