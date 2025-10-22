import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';

import { UnitTreeItemDto } from "./services/unit.service";

export interface UnitTreeNode extends UnitTreeItemDto {
    level: number;
    children?: UnitTreeNode[];
    isLoading?: boolean;
    isLoaded?: boolean;
}

@Component({
    selector: 'unit-tree-node',
    standalone: true,
    imports: [
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        MatMenuModule
    ],
    styleUrl: './unit-tree-node.component.scss',
    template: `
        <div class="node-content" 
             [class.leaf-node]="!node().hasChildren"
             [style.padding-left.px]="node().level * 20">
            <!-- Кнопка разворачивания только для узлов с детьми -->
            @if (node().hasChildren) {
                <button mat-icon-button 
                        [attr.aria-label]="'Розгорнути/згорнути ' + node().name"
                        class="toggle-button"
                        (click)="onToggle()">
                    @if (node().isLoading) {
                        <mat-spinner diameter="20"></mat-spinner>
                    } @else {
                        <mat-icon class="mat-icon-rtl-mirror">
                            {{ isExpanded() ? 'expand_more' : 'chevron_right' }}
                        </mat-icon>
                    }
                </button>
            } @else {
                <!-- Отступ для листовых узлов теперь через padding-left -->
                <div class="leaf-spacer"></div>
            }
            
            <!-- Информация о подразделении -->
            <div class="unit-info" (click)="onSelect()">
                <div class="unit-main">
                    <span class="unit-name">{{ node().shortName }}</span>
                </div>
                <div class="unit-details">
                    @if (node().forceType) {
                        <span class="force-type">{{ node().forceType }}</span>
                    }
                    @if (node().unitType) {
                        <span class="unit-type">{{ node().unitType }}</span>
                    }
                    @if (node().assignedUnitId) {
                        <mat-icon class="assigned-icon" 
                                 matTooltip="Приданий підрозділ">assignment_ind</mat-icon>
                    }
                </div>
            </div>
            
            <!-- Меню действий с узлом -->
            <div class="node-actions">
                <button mat-icon-button 
                        [matMenuTriggerFor]="nodeMenu"
                        matTooltip="Дії з підрозділом"
                        (click)="$event.stopPropagation()">
                    <mat-icon>more_vert</mat-icon>
                </button>
                
                <mat-menu #nodeMenu="matMenu">
                    <button mat-menu-item (click)="onAddChild($event)">
                        <mat-icon color="primary">add</mat-icon>
                        <span>Додати дочірній підрозділ</span>
                    </button>
                    <button mat-menu-item (click)="onEdit($event)">
                        <mat-icon color="accent">edit</mat-icon>
                        <span>Редагувати</span>
                    </button>
                    <button mat-menu-item 
                            (click)="onDelete($event)"
                            [disabled]="node().hasChildren">
                        <mat-icon color="warn">delete</mat-icon>
                        <span>Видалити</span>
                    </button>
                </mat-menu>
            </div>
        </div>
    `
})
export class UnitTreeNodeComponent {
    // Входные данные
    node = input.required<UnitTreeNode>();
    isExpanded = input<boolean>(false);

    // События
    toggleNode = output<UnitTreeNode>();
    selectNode = output<UnitTreeNode>();
    addChild = output<UnitTreeNode>();
    editNode = output<UnitTreeNode>();
    deleteNode = output<UnitTreeNode>();

    onToggle() {
        this.toggleNode.emit(this.node());
    }

    onSelect() {
        this.selectNode.emit(this.node());
    }

    onAddChild(event: Event) {
        event.stopPropagation();
        this.addChild.emit(this.node());
    }

    onEdit(event: Event) {
        event.stopPropagation();
        this.editNode.emit(this.node());
    }

    onDelete(event: Event) {
        event.stopPropagation();
        this.deleteNode.emit(this.node());
    }
}