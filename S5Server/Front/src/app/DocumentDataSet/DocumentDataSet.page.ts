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

import { DocDataSetsTableComponent } from './Components/DocDataSetsTable.component';
import { TemplateDataSetDto } from '../DocumentTemplates/models/template-dataset.models';
import { UnitsTaskEditor } from './Components/UnitsTaskEditor.component';
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
    DocDataSetsTableComponent,
    UnitsTaskEditor,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './DocumentDataSet.page.html',
  styleUrls: ['./DocumentDataSet.page.scss'],
})
export class DocumentDataSetComponent {
  @ViewChild('unitsTaskEditor') unitsTaskEditor!: UnitsTaskEditor;
  @ViewChild('dataSetTable') dataSetTable!: DocDataSetsTableComponent;

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

  /** Оновлю таблицю наборів даних */
  loadDataSets(): void {
    this.dataSetTable.loadDataSets();
  }

  /** Оновлює рядок таблиці після збереження/публікації в редакторі */
  onDataSetChanged(dataSet: TemplateDataSetDto): void {
    this.dataSetTable.updateDataSetRow(dataSet);
  }
}
