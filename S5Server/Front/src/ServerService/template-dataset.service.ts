import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {
  TemplateDataSetDto,
  TemplateDataSetUtils,
  RawTemplateDataSetDto,
  RawTemplateDataSetUpSertDto,
  TemplateDataSetCreateDto,
} from '../app/DocumentDataSet/models/template-dataset.models';
import { S5App_ErrorHandler } from '../app/shared/models/ErrorHandler';
import { parseDateOnly, toDateOnly } from '../app/shared/utils/date.utils';

@Injectable({
  providedIn: 'root',
})
export class TemplateDataSetService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/templ_data';

  /** Десеріалізує сирий JSON-об'єкт з сервера у TemplateDataSetDto з полями Date */
  private mapDto(raw: RawTemplateDataSetDto): TemplateDataSetDto {
    return {
      id: raw.id,
      name: raw.name,
      isParentDocUsed: raw.isParentDocUsed,
      parentDocNumber: raw.parentDocNumber,
      parentDocDate: parseDateOnly(raw.parentDocDate),
      docNumber: raw.docNumber,
      docDate: parseDateOnly(raw.docDate)!,
      isPublished: raw.isPublished,
      publishedAtUtc: raw.publishedAtUtc ? new Date(raw.publishedAtUtc) : undefined,
      createdAtUtc: new Date(raw.createdAtUtc),
      validFrom: new Date(raw.validFrom),
    };
  }

  /** Серіалізує TemplateDataSetCreateDto для відправки: Date → 'yyyy-MM-dd' */
  private serializeCreateDto(dto: TemplateDataSetCreateDto): RawTemplateDataSetUpSertDto {
    return {
      name: dto.name,
      isParentDocUsed: dto.isParentDocUsed,
      parentDocNumber: dto.parentDocNumber,
      parentDocDate: toDateOnly(dto.parentDocDate),
      docNumber: dto.docNumber,
      docDate: toDateOnly(dto.docDate)!,
      isPublished: dto.isPublished,
    };
  }

  /** Серіалізує повний TemplateDataSetDto для відправки на PUT: Date → рядки */
  private serializeDto(dto: TemplateDataSetDto): RawTemplateDataSetDto {
    return {
      id: dto.id,
      name: dto.name,
      isParentDocUsed: dto.isParentDocUsed,
      parentDocNumber: dto.parentDocNumber ?? null,
      parentDocDate: toDateOnly(dto.parentDocDate) ?? null,
      docNumber: dto.docNumber,
      docDate: toDateOnly(dto.docDate)!,
      isPublished: dto.isPublished,
      publishedAtUtc: dto.publishedAtUtc?.toISOString() ?? null,
      createdAtUtc: dto.createdAtUtc.toISOString(),
      validFrom: dto.validFrom.toISOString(),
    };
  }


  /**
   * Получить список наборов данных
   * GET /api/templ_data/data-sets
   */
  getDataSets(): Observable<TemplateDataSetDto[]> {
    return this.http.get<RawTemplateDataSetDto[]>(`${this.baseUrl}/data-sets`).pipe(
      map((raws) => raws.map((r) => this.mapDto(r))),
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
  createDataSet(dto: TemplateDataSetCreateDto): Observable<TemplateDataSetDto> {
    // Валидация перед отправкой
    const validation = TemplateDataSetUtils.validate(dto);
    if (!validation.valid) {
      return throwError(() => new Error(`Помилка валідації: ${validation.errors.join(', ')}`));
    }

    return this.http.post<RawTemplateDataSetDto>(`${this.baseUrl}/data-sets`, this.serializeCreateDto(dto)).pipe(
      map((raw) => this.mapDto(raw)),
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
    return this.http.get<RawTemplateDataSetDto>(`${this.baseUrl}/data-sets/${dataSetId}`).pipe(
      map((raw) => this.mapDto(raw)),
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
  updateDataSet(dataSetId: string, dto: TemplateDataSetDto): Observable<TemplateDataSetDto> {
    return this.http.put<RawTemplateDataSetDto>(`${this.baseUrl}/data-sets/${dataSetId}`, this.serializeDto(dto)).pipe(
      map((raw) => this.mapDto(raw)),
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
      .post<RawTemplateDataSetDto>(`${this.baseUrl}/data-sets/${id}/publish/${set_publish ? 'true' : 'false'}`, {})
      .pipe(
        map((raw) => this.mapDto(raw)),
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
