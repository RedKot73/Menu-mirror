import { Component, input, output, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

import { UnitTreeItemDto } from './services/unit.service';

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
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
  ],
  templateUrl: './unit-tree-node.component.html',
  styleUrl: './unit-tree-node.component.scss',
})
export class UnitTreeNodeComponent {
  // Входные данные
  node = input.required<UnitTreeNode>();
  isExpanded = input<boolean>(false);

  // Content Projection: шаблон для действий узла (необязательный)
  nodeActionsTemplate = input<TemplateRef<{ $implicit: UnitTreeNode }> | undefined>(undefined);

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
