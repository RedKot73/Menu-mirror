import {
  inject,
  Component,
  signal,
  ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DocTemplatesTableComponent } from './components/DocTemplatesTable.component';
import { DocDataSetsTableComponent } from '../DocumentDataSet/Components/DocDataSetsTable.component';
import { TemplateEditorComponent } from './components/TemplateEditor.component';
import { ResultEditorComponent } from './components/ResultEditor.component';
import { TemplateDto } from './models/document-template.models';
import { TemplateDataSetDto } from '../DocumentDataSet/models/template-dataset.models';
import { UnitsTaskViewer } from './components/UnitsTaskViewer.component'; //'../DocumentDataSet/Components/UnitsTaskEditor.component';
import { MasterDetailLayoutComponent } from '../shared/components/MasterDetailLayout.component';

@Component({
  selector: 'app-doc-templates-page',
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    MasterDetailLayoutComponent,
    DocTemplatesTableComponent,
    DocDataSetsTableComponent,
    TemplateEditorComponent,
    ResultEditorComponent,
    UnitsTaskViewer,
  ],
  styleUrls: ['./DocTemplates.page.scss'],
  templateUrl: './DocTemplates.page.html',
})
export class DocTemplatesTree {
  private snackBar = inject(MatSnackBar);

  @ViewChild('templateEditor') templateEditor?: TemplateEditorComponent;
  @ViewChild('resultEditor') resultEditor?: ResultEditorComponent;
  @ViewChild('unitsTaskViewer') unitsTaskViewer!: UnitsTaskViewer;

  selectedTemplate = signal<TemplateDto | null>(null);
  selectedDataSet = signal<TemplateDataSetDto | null>(null);

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
  onDataSetSelected(dataSet: TemplateDataSetDto | null): void {
    if (!dataSet) {
      return;
    }
    this.unitsTaskViewer.loadDataSet(dataSet.id);
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
      const templateCategoryId: string = this.selectedTemplate()?.templateCategoryId || '';
          if (!templateCategoryId) {
            this.snackBar.open('Не визначено тип шаблону', 'Закрити', { duration: 3000 });
            return;
          }

      this.unitsTaskViewer.getDataSetContent(templateCategoryId).subscribe((content) => {
        this.dataSetContent.set(content);
      });
    }
  }
}
