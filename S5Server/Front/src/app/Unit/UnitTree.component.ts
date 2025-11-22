import {
  Component,
  inject,
  OnInit,
  signal,
  output,
  ContentChild,
  TemplateRef,
} from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTreeModule, MatTreeNestedDataSource } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { UnitService, UnitTreeItemDto } from './services/unit.service';
import { UnitDialogComponent } from '../dialogs/UnitDialog';
import { ConfirmDialogComponent } from '../dialogs/ConfirmDialog.component';
import { UnitTreeNodeComponent, UnitTreeNode } from './unit-tree-node.component';
import { NULL_GUID } from './unit.constants';
import { ErrorHandler } from '../shared/models/ErrorHandler';

@Component({
  selector: 'unit-tree',
  standalone: true,
  imports: [
    MatTreeModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    UnitTreeNodeComponent,
  ],
  templateUrl: './UnitTree.component.html',
  styleUrl: './UnitTree.component.scss',
})
export class UnitTreeComponent implements OnInit {
  private unitService = inject(UnitService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  // Content Projection: кастомный шаблон для действий узла
  @ContentChild('nodeActions') nodeActionsTemplate?: TemplateRef<{ $implicit: UnitTreeNode }>;

  // Output для выбора подразделения
  unitSelected = output<UnitTreeItemDto>();

  // Output для уведомления об обновлении подразделения
  unitUpdated = output<UnitTreeItemDto>();

  dataSource = new MatTreeNestedDataSource<UnitTreeNode>();
  loading = signal(false);
  expansionModel = new SelectionModel<string>(true);

  childrenAccessor = (node: UnitTreeNode) => node.children || [];
  expansionKey = (node: UnitTreeNode) => node.id;

  ngOnInit() {
    this.loadRootData();
  }

  hasChild = (_: number, node: UnitTreeNode) => node.hasChildren;

  async loadRootData() {
    this.loading.set(true);
    try {
      // Загружаем дочерние элементы корневого псевдо-подразделения (NULL_GUID)
      const rootItems = await firstValueFrom(this.unitService.getTreeItems(undefined, NULL_GUID));
      if (rootItems) {
        const treeNodes = rootItems.map(
          (item) =>
            ({
              ...item,
              children: item.hasChildren ? [] : undefined,
              isLoaded: false,
              isLoading: false,
              level: 0,
            } as UnitTreeNode)
        );
        this.dataSource.data = treeNodes;
      }
    } catch (error) {
      console.error('Помилка завантаження кореневих даних:', error);
      const errorMessage = ErrorHandler.handleHttpError(
        error,
        'Помилка завантаження кореневих даних'
      );
      this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
    } finally {
      this.loading.set(false);
    }
  }

  async toggleNode(node: UnitTreeNode) {
    if (this.expansionModel.isSelected(node.id)) {
      // Узел раскрыт, скрываем его
      this.expansionModel.deselect(node.id);
    } else {
      // Узел скрыт, раскрываем его
      this.expansionModel.select(node.id);

      // Если у узла есть дочерние элементы и они еще не загружены
      if (node.hasChildren && !node.isLoaded && !node.isLoading) {
        await this.loadChildren(node);
      }
    }
  }

  async loadChildren(parentNode: UnitTreeNode) {
    if (parentNode.isLoading || parentNode.isLoaded) {
      return;
    }
    parentNode.isLoading = true;
    try {
      const children = await firstValueFrom(
        this.unitService.getTreeItems(undefined, parentNode.id)
      );

      if (children) {
        const childNodes = children.map(
          (item) =>
            ({
              ...item,
              children: item.hasChildren ? [] : undefined,
              isLoaded: false,
              isLoading: false,
              level: parentNode.level + 1,
            } as UnitTreeNode)
        );

        parentNode.children = childNodes;
        parentNode.isLoaded = true;

        // Обновляем данные в дереве
        this.dataSource.data = [...this.dataSource.data];
      }
    } catch (error) {
      console.error('Помилка завантаження дочірніх елементів:', error);
      const errorMessage = ErrorHandler.handleHttpError(
        error,
        'Помилка завантаження дочірніх елементів'
      );
      this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
    } finally {
      parentNode.isLoading = false;
    }
  }

  refresh() {
    // Сбрасываем состояние expansion model
    this.expansionModel.clear();
    // Перезагружаем корневые данные
    this.loadRootData();
  }

  // Вспомогательные методы для локального обновления дерева
  /**
   * Универсальный метод для поиска узла по ID и выполнения callback-функции
   * @param nodeId ID узла для поиска
   * @param processor Callback-функция для обработки найденного узла
   * @param nodes Массив узлов для поиска (по умолчанию корневые узлы)
   * @returns Результат выполнения processor или null если узел не найден
   */
  private findAndProcessNodeById<T>(
    nodeId: string,
    processor: (node: UnitTreeNode) => T,
    nodes: UnitTreeNode[] = this.dataSource.data
  ): T | null {
    for (const node of nodes) {
      if (node.id === nodeId) {
        return processor(node);
      }
      if (node.children && node.children.length > 0) {
        const result = this.findAndProcessNodeById(nodeId, processor, node.children);
        if (result !== null) {
          return result;
        }
      }
    }
    return null;
  }

  /**
   * Универсальный метод для поиска и удаления узла с callback-паттерном
   * @param nodeId ID узла для удаления
   * @param nodes Массив узлов для поиска
   * @returns true если узел найден и удален
   */
  private removeNodeById(nodeId: string, nodes: UnitTreeNode[] = this.dataSource.data): boolean {
    return (
      this.findAndProcessNodesById(
        nodeId,
        (parentArray, index) => {
          parentArray.splice(index, 1);
          return true;
        },
        nodes
      ) ?? false
    );
  }

  /**
   * Специализированный метод для операций с массивами узлов (удаление, перемещение и т.д.)
   * @param nodeId ID узла для поиска
   * @param processor Callback-функция получающая родительский массив и индекс узла
   * @param nodes Массив узлов для поиска
   * @returns Результат выполнения processor или null если узел не найден
   */
  private findAndProcessNodesById<T>(
    nodeId: string,
    processor: (parentArray: UnitTreeNode[], index: number) => T,
    nodes: UnitTreeNode[] = this.dataSource.data
  ): T | null {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].id === nodeId) {
        return processor(nodes, i);
      }
      if (nodes[i].children && nodes[i].children!.length > 0) {
        const result = this.findAndProcessNodesById(nodeId, processor, nodes[i].children!);
        if (result !== null) {
          return result;
        }
      }
    }
    return null;
  }

  private updateNodeById(nodeId: string, updatedData: Partial<UnitTreeNode>): boolean {
    return (
      this.findAndProcessNodeById(nodeId, (node) => {
        Object.assign(node, updatedData);
        return true;
      }) ?? false
    );
  }

  private forceTreeUpdate() {
    // Принудительно обновляем дерево
    this.dataSource.data = [...this.dataSource.data];
  }

  selectUnit(node: UnitTreeNode) {
    this.unitSelected.emit({
      id: node.id,
      name: node.name,
      shortName: node.shortName,
      militaryNumber: node.militaryNumber,
      forceType: node.forceType,
      unitType: node.unitType,
      forceTypeId: node.forceTypeId,
      unitTypeId: node.unitTypeId,
      parentId: node.parentId,
      assignedUnitId: node.assignedUnitId,
      orderVal: node.orderVal,
      comment: node.comment,
      hasChildren: node.hasChildren,
    });
  }

  CreateUnit() {
    // Открываем диалог для создания корневого подразделения
    const dialogRef = this.dialog.open(UnitDialogComponent, {
      width: '600px',
      data: {
        id: '',
        name: '',
        shortName: '',
        militaryNumber: '',
        forceTypeId: undefined,
        unitTypeId: undefined,
        parentId: NULL_GUID, // Устанавливаем корневой родитель
        assignedUnitId: undefined,
        orderVal: 1,
        comment: '',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.unitService
          .create({
            name: result.name,
            shortName: result.shortName,
            militaryNumber: result.militaryNumber,
            forceTypeId: result.forceTypeId,
            unitTypeId: result.unitTypeId,
            parentId: result.parentId,
            assignedUnitId: result.assignedUnitId,
            orderVal: result.orderVal,
            comment: result.comment,
          })
          .subscribe({
            next: () => {
              // Перезагружаем корневые данные для отображения нового подразделения
              this.loadRootData();
              this.snackBar.open('Підрозділ успішно створено', 'Закрити', { duration: 3000 });
            },
            error: (error) => {
              console.error('Помилка створення підрозділу:', error);
              const errorMessage = ErrorHandler.handleHttpError(
                error,
                'Помилка створення підрозділу'
              );
              this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
            },
          });
      }
    });
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
        comment: '',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.unitService
          .create({
            name: result.name,
            shortName: result.shortName,
            militaryNumber: result.militaryNumber,
            forceTypeId: result.forceTypeId,
            unitTypeId: result.unitTypeId,
            parentId: result.parentId,
            assignedUnitId: result.assignedUnitId,
            orderVal: result.orderVal,
            comment: result.comment,
          })
          .subscribe({
            next: () => {
              // Эффективное локальное обновление
              if (parentNode.hasChildren) {
                // Если у родителя уже есть загруженные дети, перезагружаем их
                if (parentNode.isLoaded) {
                  parentNode.isLoaded = false; // Сбрасываем флаг загрузки
                  this.loadChildren(parentNode).then(() => {
                    this.expansionModel.select(parentNode.id); // Разворачиваем
                  });
                } else {
                  // Если дети не загружены, просто разворачиваем - loadChildren вызовется автоматически
                  this.expansionModel.select(parentNode.id);
                }
              } else {
                // Родитель стал иметь детей, обновляем его статус
                parentNode.hasChildren = true;
                parentNode.children = [];
                parentNode.isLoaded = false;
                this.forceTreeUpdate();
                this.expansionModel.select(parentNode.id);
              }
              this.snackBar.open('Дочірній підрозділ успішно створено', 'Закрити', {
                duration: 3000,
              });
            },
            error: (error) => {
              console.error('Помилка створення дочірнього підрозділу:', error);
              const errorMessage = ErrorHandler.handleHttpError(
                error,
                'Помилка створення дочірнього підрозділу'
              );
              this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
            },
          });
      }
    });
  }

  edit(node: UnitTreeNode) {
    const dialogRef = this.dialog.open(UnitDialogComponent, {
      width: '600px',
      data: { ...node },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const unit = result as UnitTreeItemDto;
        this.unitService.update(unit.id, unit).subscribe({
          next: () => {
            // Эффективное локальное обновление
            this.updateNodeById(unit.id, unit);
            this.forceTreeUpdate();

            // Уведомляем о том, что подразделение обновлено
            this.unitUpdated.emit(unit);
            this.snackBar.open('Підрозділ успішно оновлено', 'Закрити', { duration: 3000 });
          },
          error: (error) => {
            console.error('Помилка оновлення підрозділу:', error);
            const errorMessage = ErrorHandler.handleHttpError(
              error,
              'Помилка оновлення підрозділу'
            );
            this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
          },
        });
      }
    });
  }

  delete(node: UnitTreeNode) {
    if (node.hasChildren) {
      this.dialog.open(ConfirmDialogComponent, {
        width: '360px',
        data: {
          title: 'Неможливо видалити',
          message: `Підрозділ "${node.name}" має дочірні підрозділи. Спочатку видаліть або перемістіть дочірні підрозділи.`,
          confirmText: 'OK',
          cancelText: '',
          color: 'primary',
          icon: 'warning',
        },
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
        icon: 'warning',
      },
    });

    ref.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.unitService.delete(node.id).subscribe({
          next: () => {
            // Эффективное локальное удаление
            this.removeNodeById(node.id, this.dataSource.data);
            this.forceTreeUpdate();
            this.snackBar.open('Підрозділ успішно видалено', 'Закрити', { duration: 3000 });
          },
          error: (error) => {
            console.error('Помилка видалення підрозділу:', error);
            const errorMessage = ErrorHandler.handleHttpError(
              error,
              'Помилка видалення підрозділу'
            );
            this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
          },
        });
      }
    });
  }

  moveUpDown(node: UnitTreeNode, moveUp: boolean) {
    this.unitService.moveUpDown(node.id, moveUp).subscribe({
      next: () => {
        // Локальное обновление дерева
        // Если узел корневой (нет parentId или он равен NULL_GUID) — перезагружаем корень
        if (!node.parentId || node.parentId === NULL_GUID) {
          this.loadRootData();
          return;
        }

        // Иначе обновляем детей его родителя
        this.findAndProcessNodeById(node.parentId, (parentNode) => {
          parentNode.isLoaded = false; // Сбрасываем флаг загрузки
          this.loadChildren(parentNode).then(() => {
            this.expansionModel.select(parentNode.id); // Разворачиваем
          });
          return true;
        });
        this.snackBar.open(`Підрозділ успішно переміщено ${moveUp ? 'вгору' : 'вниз'}`, 'Закрити', {
          duration: 3000,
        });
      },
      error: (error) => {
        console.error('Помилка переміщення підрозділу:', error);
        const errorMessage = ErrorHandler.handleHttpError(error, 'Помилка переміщення підрозділу');
        this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
      },
    });
  }

  importSoldiers(node: UnitTreeNode) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) {
        return;
      }

      // Запускаємо імпорт
      this.unitService.importSoldiers(node.id, file).subscribe({
        next: (response) => {
          if (response.status === 'Failed') {
            this.snackBar.open(
              `Помилка імпорту: ${response.error || 'Невідома помилка'}`,
              'Закрити',
              { duration: 7000 }
            );
          } else {
            // Переходимо на сторінку прогресу імпорту
            this.router.navigate(['/unit/import']);
          }
        },
        error: (error) => {
          if (error.status === 423) {
            this.snackBar.open(
              'Імпорт вже виконується. Зачекайте завершення поточної операції.',
              'Закрити',
              { duration: 5000 }
            );
          } else {
            const errorMessage = ErrorHandler.handleHttpError(
              error,
              'Помилка імпорту особового складу'
            );
            this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
          }
        },
      });
    };

    input.click();
  }
}
