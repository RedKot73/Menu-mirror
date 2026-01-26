import { Component, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';

import { VerticalLayoutComponent } from '../../app/shared/components/VerticalLayout.component';
import { DictCityCodeComponent } from './dictCityCode.component';
import { CityCodeTreeComponent } from './CityCodeTree.component';

type ViewMode = 'table' | 'tree';

@Component({
  selector: 'dict-city-code-page',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    FormsModule,
    VerticalLayoutComponent,
    DictCityCodeComponent,
    CityCodeTreeComponent,
  ],
  templateUrl: './CityCodePage.component.html',
  styleUrls: ['./CityCodePage.component.scss'],
})
export class CityCodePageComponent {
  @ViewChild(DictCityCodeComponent) tableComponent!: DictCityCodeComponent;
  @ViewChild(CityCodeTreeComponent) treeComponent!: CityCodeTreeComponent;

  viewMode = signal<ViewMode>(this.getSavedViewMode());
  searchTerm = signal('');

  private readonly VIEW_MODE_STORAGE_KEY = 'cityCodeViewMode';

  onViewModeChange(mode: ViewMode) {
    this.viewMode.set(mode);
    this.saveViewMode(mode);
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

  private getSavedViewMode(): ViewMode {
    const saved = localStorage.getItem(this.VIEW_MODE_STORAGE_KEY);
    return (saved as ViewMode) || 'table';
  }

  private saveViewMode(mode: ViewMode): void {
    localStorage.setItem(this.VIEW_MODE_STORAGE_KEY, mode);
  }
}
