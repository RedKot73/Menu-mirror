import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';

import { UnitTreeComponent } from '../Unit/UnitTree.component';
import { UnitTreeNode } from '../Unit/unit-tree-node.component';
import { DataSetTableComponent } from '../DocumentTemplates/components/DataSetTable.component';
import { TemplateDataSetDto } from '../DocumentTemplates/models/template-dataset.models';
import { UnitsTaskEditorComponent } from '../DocumentTemplates/components/UnitsTaskEditor.component';
import { MasterDetailLayoutComponent } from '../shared/components/MasterDetailLayout.component';

@Component({
  selector: 'app-document-data-set-page',
  imports: [
    CommonModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatMenuModule,
    MatDividerModule,
    MatTabsModule,
    MasterDetailLayoutComponent,
    UnitTreeComponent,
    DataSetTableComponent,
    UnitsTaskEditorComponent,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './DocumentDataSet.page.html',
  styleUrls: ['./DocumentDataSet.page.scss', '../Soldier/Soldier.component.scss'],
})
export class DocumentDataSetComponent {
  @ViewChild(UnitTreeComponent) unitTree!: UnitTreeComponent;
  @ViewChild('unitsTaskEditor') unitsTaskEditor!: UnitsTaskEditorComponent;

  // --- Public Methods ---

  /**
   * Обновляет дерево подразделений
   */
  loadUnitTree() {
    this.unitTree?.refresh();
  }

  /**
   * Добавляет подразделение в список выбранных
   */
  addUnitToSelection(node: UnitTreeNode) {
    this.unitsTaskEditor.addUnitToSelection(node.id);
  }

  /**
   * Загружает полный DataSet с особовим складом через API
   */
  onDataSetSelected(dataSet: TemplateDataSetDto | null) {
    if (!dataSet) {
      return;
    }
    this.unitsTaskEditor.loadDataSet(dataSet.id);
  }

  /**
   * Створює новий набір даних (очищає форму)
   */
  createNewDataSet(): void {
    this.unitsTaskEditor.createNewDataSet();
  }
}
