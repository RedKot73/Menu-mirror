import {
  inject,
  signal,
  DestroyRef,
  ViewChild,
  ElementRef,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of, switchMap, tap } from 'rxjs';
import { map as rxMap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { TemplateDataSetService } from '../../../ServerService/template-dataset.service';
import { UnitTaskDto, UnitTaskService } from '../../../ServerService/unit-task.service';
import { OneUnitTaskViewer } from './OneUnitTaskViewer.component';
import { S5App_ErrorHandler } from '../../shared/models/ErrorHandler';
import { TemplateDataSetDto } from '../../DocumentDataSet/models/template-dataset.models';
import { DocTemplateUtils } from '../../DocumentTemplates/models/shared.models';
import { VerticalLayoutComponent } from '../../shared/components/VerticalLayout.component';
import { JsonEditorDialogComponent } from './JsonEditorDialog.component';
import { GraphqlDataService } from '../../../ServerService/graphql-data.service';
import { formatDate } from '../../shared/utils/date.utils';

@Component({
  selector: 'app-units-task-viewer',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatTooltipModule,
    OneUnitTaskViewer,
    VerticalLayoutComponent,
  ],
  providers: [],
  templateUrl: './UnitsTaskViewer.component.html',
  styleUrls: ['./UnitsTaskViewer.component.scss'],
})
export class UnitsTaskViewer {
  private destroyRef = inject(DestroyRef);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  private dataSetService = inject(TemplateDataSetService);
  private unitTaskService = inject(UnitTaskService);
  private graphqlDataService = inject(GraphqlDataService);

  @ViewChild('parentDateInput') parentDateInput?: ElementRef<HTMLInputElement>;
  @ViewChild('parentNumberInput') parentNumberInput?: ElementRef<HTMLInputElement>;
  @ViewChild('dateInput') dateInput?: ElementRef<HTMLInputElement>;
  @ViewChild('numberInput') numberInput?: ElementRef<HTMLInputElement>;

  // Доступ до всіх карток підрозділів
  @ViewChildren(OneUnitTaskViewer) unitTaskCards!: QueryList<OneUnitTaskViewer>;

  // --- Selected Units List with DataSets ---
  protected selectedUnits = signal<UnitTaskDto[]>([]);

  // --- Current Loaded DataSet ---
  protected dataSet = signal<TemplateDataSetDto | null>(null);

  // --- Document Info ---
  // Документ старшого начальника
  protected isParentDocUsed = signal<boolean>(false);
  protected parentDocumentDate = signal<Date | null>(null);
  protected parentDocumentNumber = signal<string>('');

  // Основний документ
  protected documentDate = signal<Date | null>(new Date());
  protected documentNumber = signal<string>('');

  /**
   * Обробник зміни підрозділу з дочірнього компонента
   */
  onUnitChange(updatedUnit: UnitTaskDto): void {
    const units = [...this.selectedUnits()];
    const unitIndex = units.findIndex((u) => u.id === updatedUnit.id);
    if (unitIndex !== -1) {
      units[unitIndex] = updatedUnit;
      this.selectedUnits.set(units);
    }
  }

  /**
   * Загальний метод: завантажує DataSet через GraphQL та повертає JSON-рядок
    * @param templateCategoryId Ідентифікатор категорії шаблону БР/БД....
   */
  private fetchDataSetJson(templateCategoryId: string): Observable<string> {
    const dataSetId = this.dataSet()?.id;
    if (!dataSetId) {
      return of('');
    }

    return this.graphqlDataService
      .getCompleteDataSet(dataSetId, templateCategoryId)
      .pipe(rxMap((data) =>
         (data ? JSON.stringify(data, null, 2) : '')
    ));
  }

  /**
   * Повертає контент DataSet у форматі JSON для підстановки в шаблон
    * @param templateCategoryId Ідентифікатор категорії шаблону БР/БД....
   */
  getDataSetContent(templateCategoryId: string): Observable<string> {
    return this.fetchDataSetJson(templateCategoryId);
  }

  /**
   * Завантажує DataSet через GraphQL та відображає JSON у діалозі
   */
  loadDataSetJson(): void {
    // Використовуємо фіксований ID категорії для отримання повного DataSet
    this.fetchDataSetJson('3c787c14-a0ed-4e88-ba9e-2b1c6648dc0d') 
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (jsonContent) => {
          if (!jsonContent) {
            this.snackBar.open('Немає даних для перегляду', 'Закрити', { duration: 3000 });
            return;
          }
          this.dialog.open(JsonEditorDialogComponent, {
            width: '80vw',
            maxWidth: '1200px',
            maxHeight: '90vh',
            data: { jsonContent, readOnly: true, title: 'Дані підрозділів (JSON)' },
          });
        },
        error: (error) => {
          console.error('Помилка завантаження даних:', error);
          const errorMessage = S5App_ErrorHandler.handleHttpError(
            error,
            'Помилка завантаження даних',
          );
          this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
        },
      });
  }

  /**
   * Завантажує DataSet та список UnitTask
   */
  loadDataSet(dataSetId: string): void {
    if (this.dataSet()?.id === dataSetId) {
      return; // Вже завантажено
    }

    this.dataSetService
      .getDataSetById(dataSetId)
      .pipe(
        tap((dataSet) => {
          // Зберігаємо інформацію про поточний DataSet
          this.dataSet.set(dataSet);

          // Оновлюємо дані документа старшого начальника
          this.isParentDocUsed.set(dataSet.isParentDocUsed);
          this.parentDocumentDate.set(
            dataSet.parentDocDate ? new Date(dataSet.parentDocDate) : null,
          );
          this.parentDocumentNumber.set(dataSet.parentDocNumber || '');

          // Оновлюємо дату та номер документа
          this.documentDate.set(new Date(dataSet.docDate));
          this.documentNumber.set(dataSet.docNumber);
        }),
        switchMap((dataSet) => this.unitTaskService.getAll({ dataSetId: dataSet.id })),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (unitTasks) => {
          this.selectedUnits.set(unitTasks);
        },
        error: (error) => {
          console.error('Помилка завантаження набору даних:', error);
          const errorMessage = S5App_ErrorHandler.handleHttpError(
            error,
            'Помилка завантаження набору даних',
          );
          this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
        },
      });
  }

  /**
   * Отримує читабельну назву статусу публікації
   */
  getStatusLabel(isPublished: boolean): string {
    return DocTemplateUtils.getStatusLabel(isPublished);
  }

  formatDate(dateString: string): string {
    return formatDate(dateString);
  }

  showJson(): void {
    this.loadDataSetJson();
  }
}
