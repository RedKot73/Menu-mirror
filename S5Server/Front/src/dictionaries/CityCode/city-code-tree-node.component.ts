import { Component, input, output, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CityCodeTreeNodeDto } from '../../ServerService/cityCodeTree.service';

export interface CityCodeTreeNode extends CityCodeTreeNodeDto {
  level: number;
  isLoading?: boolean;
  isLoaded?: boolean;
}

@Component({
  selector: 'dict-city-code-tree-node',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
  ],
  templateUrl: './city-code-tree-node.component.html',
  styleUrls: ['./city-code-tree-node.component.scss'],
})
export class CityCodeTreeNodeComponent {
  // Входні дані
  node = input.required<CityCodeTreeNode>();
  isExpanded = input<boolean>(false);

  // Content Projection: шаблон для дій вузла (необов'язковий)
  nodeActionsTemplate = input<TemplateRef<{ $implicit: CityCodeTreeNode }> | undefined>(undefined);

  // Події
  toggleNode = output<CityCodeTreeNode>();
  selectNode = output<CityCodeTreeNode>();

  onToggle() {
    this.toggleNode.emit(this.node());
  }

  onSelect() {
    this.selectNode.emit(this.node());
  }
}
