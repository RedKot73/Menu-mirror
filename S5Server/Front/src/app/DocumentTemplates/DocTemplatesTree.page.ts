import { Component, inject, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';

import { DocTemplateComponent } from './components/DocTemplate.component';
import { DataSetTableComponent } from './components/DataSetTable.component';
import { TemplateEditorComponent } from './components/TemplateEditor.component';
import { ResultEditorComponent } from './components/ResultEditor.component';
import { TemplateDto } from '../DocumentTemplates/models/document-template.models';
import { TemplateDataSetListItem } from '../DocumentTemplates/models/template-dataset.models';
import { UnitsTaskEditorComponent } from '../DocumentTemplates/components/UnitsTaskEditor.component';
import { MasterDetailLayoutComponent } from '../shared/components/MasterDetailLayout.component';

@Component({
  selector: 'app-doc-templates-page',
  imports: [
    CommonModule,
    MatTabsModule,
    MasterDetailLayoutComponent,
    DocTemplateComponent,
    DataSetTableComponent,
    TemplateEditorComponent,
    ResultEditorComponent,
    UnitsTaskEditorComponent,
  ],
  styleUrl: './DocTemplatesTree.page.scss',
  templateUrl: './DocTemplatesTree.page.html',
})
export class DocTemplatesTree {
  @ViewChild('templateEditor') templateEditor?: TemplateEditorComponent;
  @ViewChild('resultEditor') resultEditor?: ResultEditorComponent;
  @ViewChild('unitsTaskEditor') unitsTaskEditor!: UnitsTaskEditorComponent;

  selectedTemplate = signal<TemplateDto | null>(null);
  selectedDataSet = signal<TemplateDataSetListItem | null>(null);

  // Signals для контенту редакторів (для ResultEditor)
  templateContent = signal<string>('');
  dataSetContent = signal<string>('');

  // --- Methods ---

  /**
   * Обработчик выбора шаблона из DocTemplate компонента
   */
  onTemplateSelected(template: TemplateDto | null): void {
    this.selectedTemplate.set(template);
  }

  /**
   * Обработчик выбора набора данных из DataSetTable компонента
   */
  onDataSetSelected(dataSet: TemplateDataSetListItem | null): void {
    if (!dataSet) {
      return;
    }
    this.unitsTaskEditor.loadDataSet(dataSet.id);
  }

  /**
   * Обробник зміни вкладки в правій панелі
   * Оновлює контент для ResultEditor
   */
  onTabChange(index: number): void {
    // Отримуємо HTML контент з TemplateEditor
    const templateContent = this.templateEditor?.editorContent() || '';
    this.templateContent.set(templateContent);

    // Якщо переходимо на вкладку результату, також оновлюємо дані
    if (index === 2) {
      const dataSetContent = this.unitsTaskEditor.getDataSetContent();
      this.dataSetContent.set(dataSetContent);
    }
  }
}
