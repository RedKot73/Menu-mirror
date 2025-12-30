import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import {
    TemplateDataSetDto,
    TemplateDataSetCreateDto,
    TemplateDataSetUpdateDto,
    TemplateDataSetUtils
} from '../models/template-dataset.models';//'../Models/template-dataset.models';
import { ErrorHandler } from '../../shared/models/ErrorHandler';
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
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const message = ErrorHandler.handleHttpError(error, 'Не вдалося отримати набори даних');
          return throwError(() => new Error(message));
        })
      );
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
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const message = ErrorHandler.handleHttpError(error, 'Не вдалося створити набір даних');
          return throwError(() => new Error(message));
        })
      );
  }

  /**
   * Получить конкретный набор данных по ID
   * GET /api/templ_data/data-sets/{dataSetId}
   */
  getDataSetById(dataSetId: string): Observable<TemplateDataSetDto> {
    return this.http
      .get<TemplateDataSetDto>(`${this.baseUrl}/data-sets/${dataSetId}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const message = ErrorHandler.handleHttpError(error, 'Не вдалося отримати набір даних');
          return throwError(() => new Error(message));
        })
      );
  }

  /**
   * Удалить набор данных
   * DELETE /api/templ_data/data-sets/{dataSetId}
   */
  deleteDataSet(dataSetId: string): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/data-sets/${dataSetId}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const message = ErrorHandler.handleHttpError(error, 'Не вдалося видалити набір даних');
          return throwError(() => new Error(message));
        })
    );
  }

  // === Дополнительные методы (будущие расширения) ===

  /**
   * Обновить набор данных
   * PUT /api/templ_data/data-sets/{dataSetId}
   */
  updateDataSet(dataSetId: string, dto: TemplateDataSetUpdateDto): Observable<void> {
    return this.http
      .put<void>(`${this.baseUrl}/data-sets/${dataSetId}`, dto)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const message = ErrorHandler.handleHttpError(error, 'Не вдалося оновити набір даних');
          return throwError(() => new Error(message));
        })
    );
  }

  // === Работа с сигналами ===
  /**
   * Создает реактивный сигнал для списка наборов данных
   */
  /*
  createItemsSignal() {
    return signal<TemplateDataSetListItem[]>([]);
  }
*/
  /**
   * Создает реактивный сигнал для текущего набора данных
   */
  /*
  createCurrentSignal() {
    return signal<TemplateDataSetDto | null>(null);
  }
*/
  /**
   * Создает реактивный сигнал для состояния загрузки
   */
  /*
  createLoadingSignal() {
    return signal<boolean>(false);
  }
*/
  // === Методы для работы с множественными операциями ===

  /**
   * Клонирование набора данных
   */
/*  
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
*/

  publish(id: string, set_publish: boolean): Observable<void> {
    // POST /api/templ_data/{id}/publish/{set_publish}
    return this.http
      .post<void>(`${this.baseUrl}/${id}/publish/${set_publish ? 'true' : 'false'}`, {})
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const message = ErrorHandler.handleHttpError(
            error,
            'Не вдалося змінити статус публікації набору даних'
          );
          return throwError(() => new Error(message));
        })
      );
  }
}

// === Интерфейс для работы с сервисом ===
/*
export interface TemplateDataSetServiceConfig {
  baseUrl?: string;
  timeout?: number;
  retryAttempts?: number;
}
*/
// === Дополнительные типы для удобства ===

//export type DataSetOperation = 'create' | 'update' | 'delete' | 'clone';
/*
export interface DataSetOperationResult {
  success: boolean;
  message: string;
  data?: unknown;
  errors?: string[];
}
*/
// === Константы ===
/*
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
*/