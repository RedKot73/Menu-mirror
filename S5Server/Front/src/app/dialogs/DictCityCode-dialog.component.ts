import { Component, signal, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';

import { DictCityCodeComponent } from '../../dictionaries/CityCode/dictCityCode.component';
import { CityCodeTreeComponent } from '../../dictionaries/CityCode/CityCodeTree.component';
import { CityCodeDto } from '../../ServerService/dictCityCode.service';
import { CityCodeTreeNodeDto } from '../../ServerService/cityCodeTree.service';

type ViewMode = 'table' | 'tree';

@Component({
  selector: 'dict-city-code-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    FormsModule,
    DictCityCodeComponent,
    CityCodeTreeComponent,
  ],
  template: `
    <h2 mat-dialog-title>Вибір адміністративно-територіальної одиниці</h2>
    <mat-dialog-content>
      <div class="dialog-content">
        <!-- Панель управління -->
        <div class="action-panel">
          <mat-form-field appearance="outline" class="search-field">
            <mat-label>Пошук</mat-label>
            <input
              matInput
              [(ngModel)]="searchTerm"
              (keyup.enter)="onSearch()"
              placeholder="Введіть назву для пошуку"
            />
            <button mat-icon-button matSuffix (click)="onSearch()" [attr.aria-label]="'Пошук'">
              <mat-icon>search</mat-icon>
            </button>
            @if (searchTerm()) {
              <button
                mat-icon-button
                matSuffix
                (click)="clearSearch()"
                [attr.aria-label]="'Очистити пошук'"
              >
                <mat-icon>close</mat-icon>
              </button>
            }
          </mat-form-field>

          <button mat-raised-button color="primary" (click)="onRefresh()">
            <mat-icon>refresh</mat-icon>
            Оновити
          </button>

          <mat-button-toggle-group
            [value]="viewMode()"
            (change)="onViewModeChange($event.value)"
            class="view-toggle"
          >
            <mat-button-toggle value="table" matTooltip="Табличне представлення">
              <mat-icon>view_list</mat-icon>
            </mat-button-toggle>
            <mat-button-toggle value="tree" matTooltip="Деревоподібне представлення">
              <mat-icon>account_tree</mat-icon>
            </mat-button-toggle>
          </mat-button-toggle-group>
        </div>

        <!-- Контент -->
        <div class="content-panel">
          @if (viewMode() === 'table') {
            <dict-city-codes
              [selectionMode]="true"
              (itemSelected)="onItemSelected($event)"
            ></dict-city-codes>
          } @else {
            <dict-city-code-tree (nodeSelected)="onNodeSelected($event)"></dict-city-code-tree>
          }
        </div>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Відмінити</button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      .dialog-content {
        display: flex;
        flex-direction: column;
        gap: 16px;
        min-width: 800px;
        max-width: 95vw;
        height: 600px;
        max-height: 80vh;
      }

      .action-panel {
        display: flex;
        align-items: center;
        gap: 12px;
        flex-wrap: wrap;
      }

      .search-field {
        flex: 1;
        min-width: 250px;
      }

      .content-panel {
        flex: 1;
        overflow: auto;
        border: 1px solid #e0e0e0;
        border-radius: 4px;
      }

      mat-dialog-content {
        padding: 0 24px !important;
        overflow: hidden !important;
      }
    `,
  ],
})
export class DictCityCodeDialogComponent {
  dialogRef = inject(MatDialogRef<DictCityCodeDialogComponent>);
  data = inject(MAT_DIALOG_DATA, { optional: true });

  @ViewChild(DictCityCodeComponent) tableComponent!: DictCityCodeComponent;
  @ViewChild(CityCodeTreeComponent) treeComponent!: CityCodeTreeComponent;

  viewMode = signal<ViewMode>('table');
  searchTerm = signal('');

  onViewModeChange(mode: ViewMode) {
    this.viewMode.set(mode);
  }

  onSearch() {
    const search = this.searchTerm().trim();
    const mode = this.viewMode();

    if (mode === 'table' && this.tableComponent) {
      this.tableComponent.searchTerm = search;
      this.tableComponent.onSearchChange();
    } else if (mode === 'tree' && this.treeComponent) {
      this.treeComponent.searchText.set(search);
      this.treeComponent.onSearch();
    }
  }

  onRefresh() {
    const mode = this.viewMode();

    if (mode === 'table' && this.tableComponent) {
      this.tableComponent.reload();
    } else if (mode === 'tree' && this.treeComponent) {
      this.treeComponent.refresh();
    }
  }

  clearSearch() {
    this.searchTerm.set('');
    this.onSearch();
  }

  onItemSelected(item: CityCodeDto) {
    this.dialogRef.close(item);
  }

  onNodeSelected(node: CityCodeTreeNodeDto) {
    // Конвертируем узел дерева в CityCodeDto
    const cityCode: Partial<CityCodeDto> = {
      id: node.id,
      categoryId: node.categoryId || '',
      category: node.category || '',
      value: node.value,
      // Остальные поля будут undefined, но это нормально для выбора
    };
    this.dialogRef.close(cityCode);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
