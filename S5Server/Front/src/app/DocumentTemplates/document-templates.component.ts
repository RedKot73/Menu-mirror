import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { DocumentTemplateService } from '../DocumentTemplates/services/document-template.service';
import { TemplateDto } from '../DocumentTemplates/models/document-template.models';
import { TemplateEditorDialogComponent } from './dialogs/template-editor-dialog.component';
import { TemplatePreviewDialogComponent } from './dialogs/template-preview-dialog.component';
import { DataSetsDialogComponent } from './dialogs/data-sets-dialog.component';
import { ConfirmDialogComponent } from '../dialogs/ConfirmDialog.component';

@Component({
  selector: 'app-document-templates',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatChipsModule,
    MatMenuModule,
    MatDividerModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  template: `
    <div class="templates-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Шаблоны документов</mat-card-title>
          <div class="header-actions">
            <button mat-raised-button color="primary" (click)="createTemplate()">
              <mat-icon>add</mat-icon>
              Создать шаблон
            </button>
          </div>
        </mat-card-header>

        <mat-card-content>
          @if (loading()) {
            <div class="loading">Загрузка...</div>
          } @else if (templates().length === 0) {
            <div class="empty-state">
              <mat-icon>description</mat-icon>
              <h3>Нет шаблонов</h3>
              <p>Создайте первый шаблон документа</p>
            </div>
          } @else {
            <table mat-table [dataSource]="templates()" class="templates-table">
              <!-- Название -->
              <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef>Название</th>
                <td mat-cell *matCellDef="let template">
                  <div class="template-name">
                    <strong>{{ template.name }}</strong>
                    @if (template.description) {
                      <small>{{ template.description }}</small>
                    }
                  </div>
                </td>
              </ng-container>

              <!-- Формат -->
              <ng-container matColumnDef="format">
                <th mat-header-cell *matHeaderCellDef>Формат</th>
                <td mat-cell *matCellDef="let template">
                  <mat-chip [class]="'format-' + template.format">
                    {{ template.format.toUpperCase() }}
                  </mat-chip>
                </td>
              </ng-container>

              <!-- Дата обновления -->
              <ng-container matColumnDef="updatedAt">
                <th mat-header-cell *matHeaderCellDef>Обновлен</th>
                <td mat-cell *matCellDef="let template">
                  {{ template.updatedAtUtc | date:'dd.MM.yyyy HH:mm' }}
                </td>
              </ng-container>

              <!-- Действия -->
              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef>Действия</th>
                <td mat-cell *matCellDef="let template">
                  <button mat-icon-button [matMenuTriggerFor]="menu">
                    <mat-icon>more_vert</mat-icon>
                  </button>
                  <mat-menu #menu="matMenu">
                    <button mat-menu-item (click)="previewTemplate(template)">
                      <mat-icon>preview</mat-icon>
                      Предварительный просмотр!!!
                    </button>
                    <button mat-menu-item (click)="editTemplate(template)">
                      <mat-icon>edit</mat-icon>
                      Редактировать
                    </button>
                    <button mat-menu-item (click)="downloadTemplate(template)">
                      <mat-icon>download</mat-icon>
                      Скачать шаблон
                    </button>
                    <button mat-menu-item (click)="exportTemplate(template)">
                      <mat-icon>file_download</mat-icon>
                      Экспорт документа
                    </button>
                    <button mat-menu-item (click)="manageDataSets(template)">
                      <mat-icon>dataset</mat-icon>
                      Наборы данных
                    </button>
                    <mat-divider></mat-divider>
                    <button mat-menu-item (click)="deleteTemplate(template)" class="delete-action">
                      <mat-icon>delete</mat-icon>
                      Удалить
                    </button>
                  </mat-menu>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>
          }
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styleUrls: ['./document-templates.scss']
})
export class DocumentTemplatesComponent {
  private templateService = inject(DocumentTemplateService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  // Состояние компонента
  templates = signal<TemplateDto[]>([]);
  loading = signal(false);

  displayedColumns = ['name', 'format', 'updatedAt', 'actions'];

  constructor() {
    this.loadTemplates();
  }

  // === Загрузка данных ===

  loadTemplates(): void {
    this.loading.set(true);
    this.templateService.getList().subscribe({
      next: (templates: TemplateDto[]) => {
        this.templates.set(templates);
        this.loading.set(false);
      },
      error: (error: unknown) => {
        console.error('Ошибка загрузки шаблонов:', error);
        this.snackBar.open('Ошибка загрузки шаблонов', 'Закрыть', { duration: 5000 });
        this.loading.set(false);
      }
    });
  }

  // === Действия с шаблонами ===

  createTemplate(): void {
    const dialogRef = this.dialog.open(TemplateEditorDialogComponent, {
      width: '800px',
      maxHeight: '90vh',
      data: { mode: 'create' }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadTemplates();
        this.snackBar.open('Шаблон создан', 'Закрыть', { duration: 3000 });
      }
    });
  }

  editTemplate(template: TemplateDto): void {
    const dialogRef = this.dialog.open(TemplateEditorDialogComponent, {
      width: '800px',
      maxHeight: '90vh',
      data: { mode: 'edit', template }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadTemplates();
        this.snackBar.open('Шаблон обновлен', 'Закрыть', { duration: 3000 });
      }
    });
  }

  previewTemplate(template: TemplateDto): void {
    this.dialog.open(TemplatePreviewDialogComponent, {
      width: '90vw',
      maxWidth: '1200px',
      height: '90vh',
      data: { template }
    });
  }

  downloadTemplate(template: TemplateDto): void {
    this.templateService.downloadTemplate(template.id).subscribe({
      next: (blob: Blob) => {
        const fileName = `${template.name}.${template.format}`;
        this.templateService.downloadBlob(blob, fileName);
      },
      error: (error: unknown) => {
        console.error('Ошибка скачивания шаблона:', error);
        this.snackBar.open('Ошибка скачивания шаблона', 'Закрыть', { duration: 5000 });
      }
    });
  }

  exportTemplate(template: TemplateDto): void {
    // Открываем предпросмотр для экспорта с данными
    this.dialog.open(TemplatePreviewDialogComponent, {
      width: '90vw',
      maxWidth: '1200px',
      height: '90vh',
      data: { template }
    });
  }

  manageDataSets(template: TemplateDto): void {
    const dialogRef = this.dialog.open(DataSetsDialogComponent, {
      width: '800px',
      maxHeight: '90vh',
      data: { template }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.action === 'use') {
        // Можно открыть предпросмотр с выбранными данными
        this.snackBar.open('Набор данных выбран', 'Закрыть', { duration: 3000 });
      }
    });
  }

  deleteTemplate(template: TemplateDto): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Удаление шаблона',
        message: `Вы уверены, что хотите удалить шаблон "${template.name}"?`,
        confirmText: 'Удалить',
        cancelText: 'Отмена'
      }
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.templateService.delete(template.id).subscribe({
          next: () => {
            this.loadTemplates();
            this.snackBar.open('Шаблон удален', 'Закрыть', { duration: 3000 });
          },
          error: (error: unknown) => {
            console.error('Ошибка удаления шаблона:', error);
            this.snackBar.open('Ошибка удаления шаблона', 'Закрыть', { duration: 5000 });
          }
        });
      }
    });
  }
}