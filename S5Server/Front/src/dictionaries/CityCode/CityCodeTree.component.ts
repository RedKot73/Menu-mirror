import { Component, inject, OnInit, signal, output, input, TemplateRef } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTreeModule, MatTreeNestedDataSource } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

import { CityCodeTreeService, CityCodeTreeNodeDto } from '../../ServerService/cityCodeTree.service';
import { CityCodeTreeNodeComponent, CityCodeTreeNode } from './city-code-tree-node.component';
import { S5App_ErrorHandler } from '../../app/shared/models/ErrorHandler';

@Component({
  selector: 'dict-city-code-tree',
  standalone: true,
  imports: [
    MatTreeModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CityCodeTreeNodeComponent,
  ],
  templateUrl: './CityCodeTree.component.html',
  styleUrls: ['./CityCodeTree.component.scss'],
})
export class CityCodeTreeComponent implements OnInit {
  private cityCodeTreeService = inject(CityCodeTreeService);
  private snackBar = inject(MatSnackBar);

  // Input: кастомний шаблон для дій вузла
  nodeActionsTemplate = input<TemplateRef<{ $implicit: CityCodeTreeNode }> | undefined>(undefined);

  // Inputs для налаштування
  maxDepth = input<number>(0); // 0 = без обмежень
  showSearch = input<boolean>(true);

  // Output для вибору вузла
  nodeSelected = output<CityCodeTreeNodeDto>();

  dataSource = new MatTreeNestedDataSource<CityCodeTreeNode>();
  loading = signal(false);
  expansionModel = new SelectionModel<string>(true);
  searchText = signal('');

  childrenAccessor = (node: CityCodeTreeNode): CityCodeTreeNode[] =>
    (node.children || []) as CityCodeTreeNode[];
  expansionKey = (node: CityCodeTreeNode) => node.id;

  ngOnInit() {
    this.loadRootData();
  }

  hasChild = (_: number, node: CityCodeTreeNode) => node.hasChildren;

  async loadRootData() {
    this.loading.set(true);
    try {
      const rootItems = await firstValueFrom(
        this.cityCodeTreeService.getTree(undefined, this.maxDepth()),
      );
      if (rootItems) {
        const treeNodes = this.mapToTreeNodes(rootItems, 0);
        this.dataSource.data = treeNodes;
      }
    } catch (error) {
      console.error('Помилка завантаження кореневих даних:', error);
      const errorMessage = S5App_ErrorHandler.handleHttpError(
        error,
        'Помилка завантаження кореневих даних',
      );
      this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
    } finally {
      this.loading.set(false);
    }
  }

  private mapToTreeNodes(items: CityCodeTreeNodeDto[], level: number): CityCodeTreeNode[] {
    return items.map((item) => ({
      ...item,
      level,
      children: item.children?.length > 0 ? this.mapToTreeNodes(item.children, level + 1) : [],
      isLoaded: item.children?.length > 0,
      isLoading: false,
    }));
  }

  async toggleNode(node: CityCodeTreeNode) {
    if (this.expansionModel.isSelected(node.id)) {
      // Вузол розгорнуто, згортаємо його
      this.expansionModel.deselect(node.id);
    } else {
      // Вузол згорнуто, розгортаємо його
      this.expansionModel.select(node.id);

      // Якщо у вузла є дочірні елементи і вони ще не завантажені
      if (node.hasChildren && !node.isLoaded && !node.isLoading) {
        await this.loadChildren(node);
      }
    }
  }

  async loadChildren(parentNode: CityCodeTreeNode) {
    if (parentNode.isLoading || parentNode.isLoaded) {
      return;
    }
    parentNode.isLoading = true;
    try {
      const subtree = await firstValueFrom(
        this.cityCodeTreeService.getTree(parentNode.id, this.maxDepth()),
      );

      if (subtree && subtree.length > 0) {
        const childNodes = this.mapToTreeNodes(subtree, parentNode.level + 1);
        parentNode.children = childNodes;
        parentNode.isLoaded = true;

        // Оновлюємо дані в дереві
        this.dataSource.data = [...this.dataSource.data];
      }
    } catch (error) {
      console.error('Помилка завантаження дочірніх елементів:', error);
      const errorMessage = S5App_ErrorHandler.handleHttpError(
        error,
        'Помилка завантаження дочірніх елементів',
      );
      this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
    } finally {
      parentNode.isLoading = false;
    }
  }

  async onSearch() {
    const searchValue = this.searchText().trim();
    if (!searchValue) {
      await this.loadRootData();
      return;
    }

    this.loading.set(true);
    try {
      const results = await firstValueFrom(this.cityCodeTreeService.search(searchValue));
      if (results) {
        const treeNodes = this.mapToTreeNodes(results, 0);
        this.dataSource.data = treeNodes;

        // Автоматично розгортаємо всі вузли при пошуку
        this.expandAll();
      }
    } catch (error) {
      console.error('Помилка пошуку:', error);
      const errorMessage = S5App_ErrorHandler.handleHttpError(error, 'Помилка пошуку');
      this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
    } finally {
      this.loading.set(false);
    }
  }

  clearSearch() {
    this.searchText.set('');
    this.loadRootData();
  }

  refresh() {
    // Скидаємо стан expansion model
    this.expansionModel.clear();
    this.searchText.set('');
    // Перезавантажуємо кореневі дані
    this.loadRootData();
  }

  expandAll() {
    this.forEachNode((node) => {
      if (node.hasChildren) {
        this.expansionModel.select(node.id);
      }
    });
  }

  collapseAll() {
    this.expansionModel.clear();
  }

  selectNode(node: CityCodeTreeNode) {
    this.nodeSelected.emit({
      id: node.id,
      parentId: node.parentId,
      categoryId: node.categoryId,
      category: node.category,
      value: node.value,
      hasChildren: node.hasChildren,
      children: node.children,
    });
  }

  // Допоміжні методи
  private forEachNode(
    processor: (node: CityCodeTreeNode) => void,
    nodes: CityCodeTreeNode[] = this.dataSource.data,
  ) {
    nodes.forEach((node) => {
      processor(node);
      if (node.children && node.children.length > 0) {
        this.forEachNode(processor, node.children as CityCodeTreeNode[]);
      }
    });
  }
}
