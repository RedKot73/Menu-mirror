import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import {
  TemplateDataSetDto,
  TemplateDataSetCreateDto,
  TemplateDataSetListItem,
  TemplateDataSetUpdateDto,
  TemplateDataSetUtils
} from '../Models/template-dataset.models';
//import { DocTemplateUtils } from '../Models/shared.models';

@Injectable({
  providedIn: 'root'
})
export class TemplateDataSetService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/templ_data';

  // === CRUD операции для наборов данных ===

  /**
   * Получить список наборов данных для конкретного шаблона
   * GET /api/templ_data/{id}/data-sets
   */
  getDataSets(templateId: string): Observable<TemplateDataSetListItem[]> {
    return this.http.get<TemplateDataSetListItem[]>(`${this.baseUrl}/${templateId}/data-sets`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Создать новый набор данных
   * POST /api/templ_data/{id}/data-sets
   */
  createDataSet(templateId: string, dto: TemplateDataSetCreateDto): Observable<TemplateDataSetListItem> {
    // Валидация перед отправкой
    const validation = TemplateDataSetUtils.validate(dto);
    if (!validation.valid) {
      return throwError(() => new Error(`Ошибка валидации: ${validation.errors.join(', ')}`));
    }

    // Подготовка данных для отправки
    const serverDto = TemplateDataSetUtils.toServerDto(dto);

    return this.http.post<TemplateDataSetListItem>(`${this.baseUrl}/${templateId}/data-sets`, serverDto)
      .pipe(catchError(this.handleError));
  }

  /**
   * Получить конкретный набор данных по ID
   * GET /api/templ_data/data-sets/{dataSetId}
   */
  getDataSet(dataSetId: string): Observable<TemplateDataSetDto> {
    return this.http.get<TemplateDataSetDto>(`${this.baseUrl}/data-sets/${dataSetId}`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Удалить набор данных
   * DELETE /api/templ_data/data-sets/{dataSetId}
   */
  deleteDataSet(dataSetId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/data-sets/${dataSetId}`)
      .pipe(catchError(this.handleError));
  }

  // === Дополнительные методы (будущие расширения) ===

  /**
   * Обновить набор данных (если API будет расширен)
   * PUT /api/templ_data/data-sets/{dataSetId}
   */
  updateDataSet(dataSetId: string, dto: TemplateDataSetUpdateDto): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/data-sets/${dataSetId}`, dto)
      .pipe(catchError(this.handleError));
  }

  // === Утилитарные методы ===

  /**
   * Валидация JSON строки
   */
  /*
  isValidJson_(jsonString: string): boolean {
    return TemplateDataSetUtils.isValidJson(jsonString);
  }
*/
  /**
   * Форматирование JSON строки
   */
    /*
    formatJson_(jsonString: string, spaces: number = 2): string {
    return TemplateDataSetUtils.formatJson(jsonString, spaces);
  }
*/
  /**
   * Создание пустого набора данных для формы
   */
    /*
    createEmpty_(templateId: string): Partial<TemplateDataSetCreateDto> {
    return TemplateDataSetUtils.createEmpty(templateId);
  }
*/
  /**
   * Получение статуса публикации как строки
   */
    /*
    getStatusLabel_(isPublished: boolean): string {
        return DocTemplateUtils.getStatusLabel(isPublished);
  }
*/
  /**
   * Валидация набора данных перед отправкой
   */
    /*
  validate_(dataSet: TemplateDataSetCreateDto): { valid: boolean; errors: string[] } {
    return TemplateDataSetUtils.validate(dataSet);
  }
*/
  // === Работа с сигналами ===

  /**
   * Создает реактивный сигнал для списка наборов данных
   */
  createItemsSignal() {
    return signal<TemplateDataSetListItem[]>([]);
  }

  /**
   * Создает реактивный сигнал для текущего набора данных
   */
  createCurrentSignal() {
    return signal<TemplateDataSetDto | null>(null);
  }

  /**
   * Создает реактивный сигнал для состояния загрузки
   */
  createLoadingSignal() {
    return signal<boolean>(false);
  }

  // === Методы для работы с множественными операциями ===

  /**
   * Массовое удаление наборов данных
   */
    /*
  bulkDelete(dataSetIds: string[]): Observable<void[]> {
    const deleteOperations = dataSetIds.map(id => this.deleteDataSet(id));
    return new Observable(observer => {
      Promise.all(deleteOperations.map(op => op.toPromise()))
        .then(results => {
          observer.next(results);
          observer.complete();
        })
        .catch(error => observer.error(error));
    });
  }
  */

  /**
   * Клонирование набора данных
   */
  cloneDataSet(dataSetId: string, newName: string): Observable<TemplateDataSetListItem> {
    return new Observable(observer => {
      this.getDataSet(dataSetId).subscribe({
        next: (original) => {
          const cloneDto: TemplateDataSetCreateDto = {
            templateId: original.templateId,
            name: newName,
            dataJson: original.dataJson,
            isPublished: false // Клоны по умолчанию не опубликованы
          };

          this.createDataSet(original.templateId, cloneDto).subscribe({
            next: (result) => {
              observer.next(result);
              observer.complete();
            },
            error: (error) => observer.error(error)
          });
        },
        error: (error) => observer.error(error)
      });
    });
  }

  // === Обработка ошибок ===

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Произошла неизвестная ошибка';
    
    if (error.error instanceof ErrorEvent) {
      // Клиентская ошибка
      errorMessage = `Ошибка: ${error.error.message}`;
    } else {
      // Серверная ошибка
      switch (error.status) {
        case 400:
          errorMessage = 'Неверные данные запроса';
          if (error.error?.title) {
            errorMessage = error.error.title;
            if (error.error.detail) {
              errorMessage += `: ${error.error.detail}`;
            }
          }
          break;
        case 404:
          errorMessage = 'Набор данных не найден';
          if (error.error?.detail) {
            errorMessage += `: ${error.error.detail}`;
          }
          break;
        case 409:
          errorMessage = 'Конфликт данных (например, дублирование имени)';
          if (error.error?.detail) {
            errorMessage = error.error.detail;
          }
          break;
        case 499:
          errorMessage = 'Запрос отменен';
          break;
        case 500:
          errorMessage = 'Внутренняя ошибка сервера';
          break;
        default:
          errorMessage = `Ошибка сервера: ${error.status}`;
      }
    }
    
    console.error('TemplateDataSetService Error:', error);
    return throwError(() => new Error(errorMessage));
  }
}

// === Интерфейс для работы с сервисом ===

export interface TemplateDataSetServiceConfig {
  baseUrl?: string;
  timeout?: number;
  retryAttempts?: number;
}

// === Дополнительные типы для удобства ===

export type DataSetOperation = 'create' | 'update' | 'delete' | 'clone';

export interface DataSetOperationResult {
  success: boolean;
  message: string;
  data?: any;
  errors?: string[];
}

// === Константы ===

export const TEMPLATE_DATASET_CONSTANTS = {
  MAX_NAME_LENGTH: 150,
  DEFAULT_JSON: '{}',
  API_ENDPOINTS: {
    BASE: '/api/templ_data',
    LIST: (templateId: string) => `/api/templ_data/${templateId}/data-sets`,
    DETAIL: (dataSetId: string) => `/api/templ_data/data-sets/${dataSetId}`,
    CREATE: (templateId: string) => `/api/templ_data/${templateId}/data-sets`,
    DELETE: (dataSetId: string) => `/api/templ_data/data-sets/${dataSetId}`
  }
} as const;
