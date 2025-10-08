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
import { UnitService, UnitDto, UnitCreateDto, UnitTreeItemDto } from "../../ServerService/unit.service";
import { UnitTreeComponent } from './UnitTree.component';
import { UnitContentComponent } from './UnitContent.component';

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
        UnitTreeComponent,
        UnitContentComponent
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
                    (unitUpdated)="onUnitUpdated($event)"
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
                <unit-content 
                    [selectedUnit]="selectedUnit()"
                    [sidenavOpen]="sidenavOpen()"
                    (showSidenav)="toggleSidenav()">
                </unit-content>
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

    onUnitSelected(unit: UnitTreeItemDto) {
        // Получаем полную информацию о подразделении
        this.unitService.getById(unit.id).subscribe(fullUnit => {
            this.selectedUnit.set(fullUnit);

            // Закрываем sidenav на мобильных после выбора
            if (this.isMobile()) {
                this.sidenavOpen.set(false);
            }
        });
    }

    onUnitUpdated(unit: UnitTreeItemDto) {
        // Если обновленное подразделение - это текущее выбранное, обновляем его
        const currentSelected = this.selectedUnit();
        if (currentSelected && currentSelected.id === unit.id) {
            // Получаем полную обновленную информацию
            this.unitService.getById(unit.id).subscribe(fullUnit => {
                this.selectedUnit.set(fullUnit);
            });
        }
    }
}