import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { TemplateListItem } from '../models/document-template.models';

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
  styleUrls: ['./document-templates-shared.scss'],
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
                      Предварительный просмотр
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
})
export class DocumentTemplatesComponent {
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  // Состояние компонента
  templates = signal<TemplateListItem[]>([]);
  loading = signal(false);

  displayedColumns = ['name', 'format', 'updatedAt', 'actions'];

  constructor() {
    // Заглушка данных для демонстрации
    this.templates.set([
      {
        id: '1',
        name: 'Приказ о приеме на работу',
        description: 'Стандартный приказ о приеме сотрудника',
        format: 'docx' as const,
        createdAtUtc: '2024-01-01T10:00:00Z',
        updatedAtUtc: '2024-01-15T14:30:00Z'
      },
      {
        id: '2', 
        name: 'Справка о доходах',
        description: 'Справка для налоговой',
        format: 'html' as const,
        createdAtUtc: '2024-01-05T09:00:00Z',
        updatedAtUtc: '2024-01-20T16:45:00Z'
      }
    ]);
  }

  // === Действия с шаблонами ===

  createTemplate(): void {
    this.snackBar.open('Функция создания шаблона - в разработке', 'Закрыть', { duration: 3000 });
  }

  editTemplate(template: TemplateListItem): void {
    this.snackBar.open(`Редактирование шаблона "${template.name}" - в разработке`, 'Закрыть', { duration: 3000 });
  }

  previewTemplate(template: TemplateListItem): void {
    this.snackBar.open(`Предпросмотр шаблона "${template.name}" - в разработке`, 'Закрыть', { duration: 3000 });
  }

  downloadTemplate(template: TemplateListItem): void {
    this.snackBar.open(`Скачивание шаблона "${template.name}" - в разработке`, 'Закрыть', { duration: 3000 });
  }

  exportTemplate(template: TemplateListItem): void {
    this.snackBar.open(`Экспорт документа "${template.name}" - в разработке`, 'Закрыть', { duration: 3000 });
  }

  manageDataSets(template: TemplateListItem): void {
    this.snackBar.open(`Управление наборами данных для "${template.name}" - в разработке`, 'Закрыть', { duration: 3000 });
  }

  deleteTemplate(template: TemplateListItem): void {
    this.snackBar.open(`Удаление шаблона "${template.name}" - в разработке`, 'Закрыть', { duration: 3000 });
  }
}