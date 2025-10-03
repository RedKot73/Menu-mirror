import { Component, inject, OnInit, signal } from '@angular/core';
import { MatTreeModule, MatTreeNestedDataSource } from '@angular/material/tree';
import { SelectionModel } from '@angular/cdk/collections';
import { MatButtonModule } from '@angular/material/button';
import { firstValueFrom } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

import { UnitService, UnitDto } from "../../ServerService/unit.service";
import { UnitDialogComponent } from '../dialogs/UnitDialog';
import { ConfirmDialogComponent } from "../dialogs/ConfirmDialog.component";

interface UnitTreeNode extends UnitDto {
    children?: UnitTreeNode[];
    level?: number;
    isExpanded?: boolean;
}

@Component({
    selector: 'unit-tree',
    standalone: true,
    imports: [
        MatTreeModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatTooltipModule
    ],
    styleUrl: './UnitTree.component.scss',
    template: `
        <div class="tree-container">
            <div class="tree-header">
                <h3>Дерево підрозділів</h3>
                <button mat-raised-button color="primary" (click)="refresh()" [disabled]="loading()">
                    <mat-icon>refresh</mat-icon>
                    Оновити
                </button>
            </div>

            @if (loading()) {
                <div class="loading-container">
                    <mat-spinner diameter="40"></mat-spinner>
                    <span>Завантаження дерева підрозділів...</span>
                </div>
            } @else {
                <mat-tree [dataSource]="dataSource" [childrenAccessor]="childrenAccessor" [expansionKey]="expansionKey" class="unit-tree">
                    <!-- Узел с дочерними элементами -->
                    <mat-tree-node *matTreeNodeDef="let node; when: hasChild" matTreeNodeToggle class="tree-node">
                        <li class="mat-tree-node">
                            <div class="node-content">
                                <button mat-icon-button matTreeNodeToggle 
                                        [attr.aria-label]="'Розгорнути/згорнути ' + node.name"
                                        class="toggle-button">
                                    <mat-icon class="mat-icon-rtl-mirror">
                                        {{expansionModel.isSelected(node.id) ? 'expand_more' : 'chevron_right'}}
                                    </mat-icon>
                                </button>
                                
                                <div class="unit-info">
                                    <div class="unit-main">
                                        <span class="unit-name">{{ node.name }}</span>
                                        <span class="unit-short">{{ node.shortName }}</span>
                                        @if (node.militaryNumber) {
                                            <span class="military-number">В/Ч {{ node.militaryNumber }}</span>
                                        }
                                    </div>
                                    <div class="unit-details">
                                        @if (node.forceType) {
                                            <span class="force-type">{{ node.forceType }}</span>
                                        }
                                        @if (node.unitType) {
                                            <span class="unit-type">{{ node.unitType }}</span>
                                        }
                                        @if (node.assignedUnitId) {
                                            <mat-icon class="assigned-icon" 
                                                     matTooltip="Приданий підрозділ">assignment_ind</mat-icon>
                                        }
                                    </div>
                                </div>
                                
                                <div class="node-actions">
                                    <button mat-icon-button color="primary" 
                                            (click)="addChild(node); $event.stopPropagation()"
                                            matTooltip="Додати дочірній підрозділ">
                                        <mat-icon>add</mat-icon>
                                    </button>
                                    <button mat-icon-button color="accent" 
                                            (click)="edit(node); $event.stopPropagation()"
                                            matTooltip="Редагувати">
                                        <mat-icon>edit</mat-icon>
                                    </button>
                                    <button mat-icon-button color="warn" 
                                            (click)="delete(node); $event.stopPropagation()"
                                            matTooltip="Видалити"
                                            [disabled]="hasChildren(node)">
                                        <mat-icon>delete</mat-icon>
                                    </button>
                                </div>
                            </div>
                        </li>
                    </mat-tree-node>

                    <!-- Листовой узел -->
                    <mat-tree-node *matTreeNodeDef="let node" class="tree-node">
                        <li class="mat-tree-node">
                            <div class="node-content leaf-node">
                                <div class="leaf-spacer"></div>
                                
                                <div class="unit-info">
                                    <div class="unit-main">
                                        <span class="unit-name">{{ node.name }}</span>
                                        <span class="unit-short">{{ node.shortName }}</span>
                                        @if (node.militaryNumber) {
                                            <span class="military-number">В/Ч {{ node.militaryNumber }}</span>
                                        }
                                    </div>
                                    <div class="unit-details">
                                        @if (node.forceType) {
                                            <span class="force-type">{{ node.forceType }}</span>
                                        }
                                        @if (node.unitType) {
                                            <span class="unit-type">{{ node.unitType }}</span>
                                        }
                                        @if (node.assignedUnitId) {
                                            <mat-icon class="assigned-icon" 
                                                     matTooltip="Приданий підрозділ">assignment_ind</mat-icon>
                                        }
                                    </div>
                                </div>
                                
                                <div class="node-actions">
                                    <button mat-icon-button color="primary" 
                                            (click)="addChild(node)"
                                            matTooltip="Додати дочірній підрозділ">
                                        <mat-icon>add</mat-icon>
                                    </button>
                                    <button mat-icon-button color="accent" 
                                            (click)="edit(node)"
                                            matTooltip="Редагувати">
                                        <mat-icon>edit</mat-icon>
                                    </button>
                                    <button mat-icon-button color="warn" 
                                            (click)="delete(node)"
                                            matTooltip="Видалити">
                                        <mat-icon>delete</mat-icon>
                                    </button>
                                </div>
                            </div>
                        </li>
                    </mat-tree-node>
                </mat-tree>
            }
        </div>
    `
})
export class UnitTreeComponent implements OnInit {
    private unitService = inject(UnitService);
    private dialog = inject(MatDialog);

    dataSource = new MatTreeNestedDataSource<UnitTreeNode>();
    loading = signal(false);
    expansionModel = new SelectionModel<string>(true);
    
    childrenAccessor = (node: UnitTreeNode) => node.children || [];
    expansionKey = (node: UnitTreeNode) => node.id;

    ngOnInit() {
        this.loadTreeData();
    }

    hasChild = (_: number, node: UnitTreeNode) => !!node.children && node.children.length > 0;
    hasChildren = (node: UnitTreeNode) => !!node.children && node.children.length > 0;

    async loadTreeData() {
        this.loading.set(true);
        try {
            const allUnits = await firstValueFrom(this.unitService.getAll());
            if (allUnits) {
                const treeData = this.buildTree(allUnits);
                this.dataSource.data = treeData;
            }
        } catch (error) {
            console.error('Помилка завантаження даних дерева:', error);
        } finally {
            this.loading.set(false);
        }
    }

    private buildTree(units: UnitDto[]): UnitTreeNode[] {
        const unitMap = new Map<string, UnitTreeNode>();
        const rootNodes: UnitTreeNode[] = [];

        // Создаем мапу всех узлов
        units.forEach(unit => {
            unitMap.set(unit.id, { ...unit, children: [] });
        });

        // Строим дерево
        units.forEach(unit => {
            const node = unitMap.get(unit.id)!;
            
            if (unit.parentId && unitMap.has(unit.parentId)) {
                // Добавляем как дочерний элемент
                const parent = unitMap.get(unit.parentId)!;
                if (!parent.children) {
                    parent.children = [];
                }
                parent.children.push(node);
            } else {
                // Корневой элемент
                rootNodes.push(node);
            }
        });

        // Сортируем на каждом уровне
        this.sortTreeNodes(rootNodes);
        return rootNodes;
    }

    private sortTreeNodes(nodes: UnitTreeNode[]) {
        nodes.sort((a, b) => {
            // Сначала по orderVal, потом по имени
            if (a.orderVal !== b.orderVal) {
                return a.orderVal - b.orderVal;
            }
            return a.name.localeCompare(b.name);
        });

        // Рекурсивно сортируем дочерние элементы
        nodes.forEach(node => {
            if (node.children && node.children.length > 0) {
                this.sortTreeNodes(node.children);
            }
        });
    }

    refresh() {
        this.loadTreeData();
    }

    addChild(parentNode: UnitTreeNode) {
        const dialogRef = this.dialog.open(UnitDialogComponent, {
            width: '600px',
            data: { 
                id: '',
                name: '', 
                shortName: '', 
                militaryNumber: '', 
                forceTypeId: parentNode.forceTypeId,
                unitTypeId: undefined,
                parentId: parentNode.id, // Устанавливаем родителя
                assignedUnitId: undefined,
                orderVal: 1, 
                comment: '' 
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.unitService.create({
                    name: result.name,
                    shortName: result.shortName,
                    militaryNumber: result.militaryNumber,
                    forceTypeId: result.forceTypeId,
                    unitTypeId: result.unitTypeId,
                    parentId: result.parentId,
                    assignedUnitId: result.assignedUnitId,
                    orderVal: result.orderVal,
                    comment: result.comment
                }).subscribe(() => {
                    this.refresh();
                    // Разворачиваем родительский узел
                    this.expansionModel.select(parentNode.id);
                });
            }
        });
    }

    edit(node: UnitTreeNode) {
        const dialogRef = this.dialog.open(UnitDialogComponent, {
            width: '600px',
            data: { ...node }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.unitService.update(result.id, result).subscribe(() => {
                    this.refresh();
                });
            }
        });
    }

    delete(node: UnitTreeNode) {
        if (this.hasChildren(node)) {
            this.dialog.open(ConfirmDialogComponent, {
                width: '360px',
                data: {
                    title: 'Неможливо видалити',
                    message: `Підрозділ "${node.name}" має дочірні підрозділи. Спочатку видаліть або перемістіть дочірні підрозділи.`,
                    confirmText: 'OK',
                    cancelText: '',
                    color: 'primary',
                    icon: 'warning'
                }
            });
            return;
        }

        const ref = this.dialog.open(ConfirmDialogComponent, {
            width: '360px',
            autoFocus: false,
            data: {
                title: 'Видалення підрозділу',
                message: `Ви впевнені, що хочете видалити підрозділ "${node.name}"?`,
                confirmText: 'Видалити',
                cancelText: 'Відмінити',
                color: 'warn',
                icon: 'warning'
            }
        });
        
        ref.afterClosed().subscribe(confirmed => {
            if (confirmed) {
                this.unitService.delete(node.id).subscribe(() => {
                    this.refresh();
                });
            }
        });
    }
}
