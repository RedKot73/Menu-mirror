import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import {
  TemplateDataSetDto,
  TemplateDataSetUpSertDto,
  TemplateDataSetUtils,
} from '../app/DocumentTemplates/models/template-dataset.models';
import { S5App_ErrorHandler } from '../app/shared/models/ErrorHandler';

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
    return this.http.get<TemplateDataSetDto[]>(`${this.baseUrl}/data-sets`).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося отримати набори даних',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * Создать новый набор данных
   * POST /api/templ_data/data-sets
   */
  createDataSet(dto: TemplateDataSetUpSertDto): Observable<TemplateDataSetDto> {
    // Валидация перед отправкой
    const validation = TemplateDataSetUtils.validate(dto);
    if (!validation.valid) {
      return throwError(() => new Error(`Помилка валідації: ${validation.errors.join(', ')}`));
    }

    return this.http.post<TemplateDataSetDto>(`${this.baseUrl}/data-sets`, dto).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося створити набір даних',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * Получить конкретный набор данных по ID
   * GET /api/templ_data/data-sets/{dataSetId}
   */
  getDataSetById(dataSetId: string): Observable<TemplateDataSetDto> {
    return this.http.get<TemplateDataSetDto>(`${this.baseUrl}/data-sets/${dataSetId}`).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося отримати набір даних',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * Удалить набор данных
   * DELETE /api/templ_data/data-sets/{dataSetId}
   */
  deleteDataSet(dataSetId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/data-sets/${dataSetId}`).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося видалити набір даних',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * Обновить набор данных
   * PUT /api/templ_data/data-sets/{dataSetId}
   */
  updateDataSet(dataSetId: string, dto: TemplateDataSetUpSertDto): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/data-sets/${dataSetId}`, dto).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(error, 'Не вдалося оновити набір даних');
        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * Змінити статус публікації
   * POST /api/templ_data/data-sets/{id}/publish/{set_publish}
   */
  publish(id: string, set_publish: boolean): Observable<TemplateDataSetDto> {
    return this.http
      .post<TemplateDataSetDto>(`${this.baseUrl}/data-sets/${id}/publish/${set_publish ? 'true' : 'false'}`, {})
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const message = S5App_ErrorHandler.handleHttpError(
            error,
            'Не вдалося змінити статус публікації набору даних',
          );
          return throwError(() => new Error(message));
        }),
      );
  }
}
