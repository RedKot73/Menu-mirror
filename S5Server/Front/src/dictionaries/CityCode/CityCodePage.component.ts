import { Component, signal, ViewChild, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

import { VerticalLayoutComponent } from '../../app/shared/components/VerticalLayout.component';
import { DictCityCodeComponent } from './dictCityCode.component';
import { CityCodeTreeComponent } from './CityCodeTree.component';
import { DictCityCodeService } from '../../ServerService/dictCityCode.service';
import { ImportCityCodesDialogComponent } from '../../app/dialogs/ImportCityCodes-dialog.component';

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
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  dialog = inject(MatDialog);
  snackBar = inject(MatSnackBar);
  dictCityCodeService = inject(DictCityCodeService);

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

  /**
   * Відкриває діалог вибору файлу для імпорту
   */
  openFileDialog() {
    if (this.fileInput) {
      this.fileInput.nativeElement.click();
    }
  }

  /**
   * Обробка вибору файлу для імпорту
   */
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    // Перевірка розширення файлу
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (ext !== 'xlsx') {
      this.snackBar.open('Підтримується тільки формат .xlsx', 'Закрити', { duration: 5000 });
      input.value = '';
      return;
    }

    // Відкриваємо діалог імпорту з прогресом
    const dialogRef = this.dialog.open(ImportCityCodesDialogComponent, {
      width: '500px',
      disableClose: true,
      data: file,
    });

    dialogRef.afterClosed().subscribe((success: boolean) => {
      if (success) {
        // Оновлюємо дані в активному компоненті
        if (this.viewMode() === 'table' && this.tableComponent) {
          this.tableComponent.reload();
        } else if (this.viewMode() === 'tree' && this.treeComponent) {
          this.treeComponent.refresh();
        }
        this.snackBar.open('Імпорт успішно завершено', 'Закрити', { duration: 3000 });
      }
    });

    // Очищаємо input для можливості повторного вибору того ж файлу
    input.value = '';
  }

  private getSavedViewMode(): ViewMode {
    const saved = localStorage.getItem(this.VIEW_MODE_STORAGE_KEY);
    return (saved as ViewMode) || 'table';
  }

  private saveViewMode(mode: ViewMode): void {
    localStorage.setItem(this.VIEW_MODE_STORAGE_KEY, mode);
  }
}
