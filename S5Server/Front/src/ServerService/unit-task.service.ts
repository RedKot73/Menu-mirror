import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import {
  UnitTaskDto,
  // UnitTaskFullDto,
  UnitTaskCreateDto,
} from '../app/DocumentDataSet/models/template-dataset.models';
import { S5App_ErrorHandler } from '../app/shared/models/ErrorHandler';

@Injectable({
  providedIn: 'root',
})
export class UnitTaskService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/unit-tasks';

  /**
   * Отримати всі UnitTask (з фільтрацією по DataSet та статусу публікації)
   * GET /api/unit-tasks?dataSetId={id}&isPublished={bool}
   */
  getAll(filters?: { dataSetId?: string; isPublished?: boolean }): Observable<UnitTaskDto[]> {
    let params = new HttpParams();

    if (filters?.dataSetId) {
      params = params.set('dataSetId', filters.dataSetId);
    }
    if (filters?.isPublished !== undefined) {
      params = params.set('isPublished', filters.isPublished.toString());
    }

    return this.http.get<UnitTaskDto[]>(this.baseUrl, { params }).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося отримати список завдань підрозділів',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * Отримати всі опубліковані завдання для вказаного підрозділу
   * GET /api/unit-tasks/by-unit/{unitId}
   */
  getByUnit(unitId: string): Observable<UnitTaskDto[]> {
    return this.http.get<UnitTaskDto[]>(`${this.baseUrl}/by-unit/${unitId}`).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося отримати завдання підрозділу',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * Отримати UnitTask за ID
   * GET /api/unit-tasks/{id}
   */
  getById(id: string): Observable<UnitTaskDto> {
    return this.http.get<UnitTaskDto>(`${this.baseUrl}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося отримати завдання підрозділу',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * Створити завдання підрозділу
   * POST /api/unit-tasks
   */
  create(dto: UnitTaskCreateDto): Observable<UnitTaskDto> {
    return this.http.post<UnitTaskDto>(this.baseUrl, dto).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося створити завдання підрозділу',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * Оновити завдання підрозділу
   * PUT /api/unit-tasks/{id}
   * 200 OK + UnitTaskDto — оновлено; 204 NoContent — змін немає
   */
  update(id: string, dto: UnitTaskDto): Observable<UnitTaskDto | null> {
    return this.http.put<UnitTaskDto | null>(`${this.baseUrl}/${id}`, dto).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося оновити завдання підрозділу',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * Видалити завдання підрозділу
   * DELETE /api/unit-tasks/{id}
   */
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося видалити завдання підрозділу',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * Змінити статус публікації завдання
   * POST /api/unit-tasks/{id}/publish/{set_publish}
   */
  publish(id: string, setPublish: boolean): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${id}/publish/${setPublish}`, {}).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося змінити статус публікації завдання',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * Отримати чернетку нового UnitTask для підрозділу
   * POST /api/unit-tasks/create-default?dataSetId={dataSetId}&unitId={unitId}
   */
  createDefault(dataSetId: string, unitId: string): Observable<UnitTaskDto> {
    const params = new HttpParams()
      .set('dataSetId', dataSetId)
      .set('unitId', unitId);
    return this.http.post<UnitTaskDto>(`${this.baseUrl}/create-default`, {}, { params })
    .pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося отримати чернетку завдання підрозділу',
        );
        return throwError(() => new Error(message));
      }),
    );
  }
}
