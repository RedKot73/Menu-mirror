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
} from '../models/template-dataset.models';//'../Models/template-dataset.models';
//import { DocTemplateUtils } from '../Models/shared.models';

@Injectable({
  providedIn: 'root',
})
export class TemplateDataSetService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/templ_data';

  // === CRUD операции для наборов данных ===

  /**
   * Получить список наборов данных
   * GET /api/templ_data/data-sets
   */
  getDataSets(): Observable<TemplateDataSetDto[]> {
    return this.http
      .get<TemplateDataSetDto[]>(`${this.baseUrl}/data-sets`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Создать новый набор данных
   * POST /api/templ_data/data-sets
   */
  createDataSet(dto: TemplateDataSetCreateDto): Observable<TemplateDataSetDto> {
    // Валидация перед отправкой
    const validation = TemplateDataSetUtils.validate(dto);
    if (!validation.valid) {
      return throwError(() => new Error(`Ошибка валидации: ${validation.errors.join(', ')}`));
    }

    // Подготовка данных для отправки
    //const serverDto = TemplateDataSetUtils.toServerDto(dto);

    return this.http
      .post<TemplateDataSetDto>(`${this.baseUrl}/data-sets`, dto)
      .pipe(catchError(this.handleError));
  }

  /**
   * Получить конкретный набор данных по ID
   * GET /api/templ_data/data-sets/{dataSetId}
   */
  getDataSetById(dataSetId: string): Observable<TemplateDataSetDto> {
    return this.http
      .get<TemplateDataSetDto>(`${this.baseUrl}/data-sets/${dataSetId}`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Удалить набор данных
   * DELETE /api/templ_data/data-sets/{dataSetId}
   */
  deleteDataSet(dataSetId: string): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/data-sets/${dataSetId}`)
      .pipe(catchError(this.handleError));
  }

  // === Дополнительные методы (будущие расширения) ===

  /**
   * Обновить набор данных
   * PUT /api/templ_data/data-sets/{dataSetId}
   */
  updateDataSet(dataSetId: string, dto: TemplateDataSetUpdateDto): Observable<void> {
    return this.http
      .put<void>(`${this.baseUrl}/data-sets/${dataSetId}`, dto)
      .pipe(catchError(this.handleError));
  }

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
   * Клонирование набора данных
   */
  cloneDataSet(dataSetId: string, newName: string): Observable<TemplateDataSetListItem> {
    return new Observable((observer) => {
      this.getDataSetById(dataSetId).subscribe({
        next: (original) => {
          const cloneDto: TemplateDataSetCreateDto = {
            name: newName,
            dataJson: original.dataJson,
            isPublished: false, // Клоны по умолчанию не опубликованы
          };

          this.createDataSet(cloneDto).subscribe({
            next: (result) => {
              observer.next(result);
              observer.complete();
            },
            error: (error) => observer.error(error),
          });
        },
        error: (error) => observer.error(error),
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
  data?: unknown;
  errors?: string[];
}

// === Константы ===

export const TEMPLATE_DATASET_CONSTANTS = {
  MAX_NAME_LENGTH: 150,
  DEFAULT_JSON: '{}',
  API_ENDPOINTS: {
    BASE: '/api/templ_data',
    LIST: '/api/templ_data/data-sets',
    DETAIL: (dataSetId: string) => `/api/templ_data/data-sets/${dataSetId}`,
    CREATE: '/api/templ_data/data-sets',
    UPDATE: (dataSetId: string) => `/api/templ_data/data-sets/${dataSetId}`,
    DELETE: (dataSetId: string) => `/api/templ_data/data-sets/${dataSetId}`
  }
} as const;
