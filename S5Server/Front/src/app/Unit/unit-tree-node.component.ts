import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

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
        MatMenuModule,
        MatDividerModule
    ],
    templateUrl: './unit-tree-node.component.html',
    styleUrl: './unit-tree-node.component.scss'
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