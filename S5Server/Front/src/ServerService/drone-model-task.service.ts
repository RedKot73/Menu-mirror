import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

//import { DroneModelTaskDto } from '../app/DocumentDataSet/models/template-dataset.models';
import { S5App_ErrorHandler } from '../app/shared/models/ErrorHandler';

/**
 * DTO для моделі БПЛА в завданні підрозділу
 */
export interface DroneModelTaskDto {
  id: string;
  unitTaskId: string;
  droneModelId: string;
  droneModelValue: string;
  droneTypeName: string;
  quantity: number;
}

/**
 * DTO для оновлення DroneModelTask
 */
export interface DroneModelTaskUpSertDto {
  unitTaskId: string;
  droneModelId: string;
  quantity: number;
}

/**
 * Результат масового збереження
 */
export interface BulkSaveResult {
  success: boolean;
  created: number;
  updated: number;
  deleted: number;
  total: number;
}

@Injectable({
  providedIn: 'root',
})
export class DroneModelTaskService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/drone-model-tasks';

  /**
   * Отримати всі моделі БПЛА для завдання підрозділу
   * GET /api/drone-model-tasks?unitTaskId={id}
   */
  getByUnitTask(unitTaskId: string): Observable<DroneModelTaskDto[]> {
    const params = new HttpParams().set('unitTaskId', unitTaskId);

    return this.http.get<DroneModelTaskDto[]>(this.baseUrl, { params }).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося отримати список засобів для завдання',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * Отримати модель БПЛА за ID
   * GET /api/drone-model-tasks/{id}
   */
  getById(id: string): Observable<DroneModelTaskDto> {
    return this.http.get<DroneModelTaskDto>(`${this.baseUrl}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося отримати модель БПЛА',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * Створити модель БПЛА для завдання
   * POST /api/drone-model-tasks
   */
  create(dto: DroneModelTaskUpSertDto): Observable<DroneModelTaskDto> {
    return this.http.post<DroneModelTaskDto>(this.baseUrl, dto).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося створити модель БПЛА',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * Оновити модель БПЛА
   * PUT /api/drone-model-tasks/{id}
   */
  update(id: string, dto: DroneModelTaskUpSertDto): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, dto).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(error, 'Не вдалося оновити модель БПЛА');
        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * Видалити модель БПЛА
   * DELETE /api/drone-model-tasks/{id}
   */
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося видалити модель БПЛА',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * Масове збереження засобів для завдання підрозділу
   * POST /api/drone-model-tasks/bulk-save/{unitTaskId}
   *
   * Автоматично:
   * - Створює нові засоби
   * - Оновлює існуючі
   * - Видаляє ті, що відсутні в списку
   */
  bulkSave(unitTaskId: string, dtos: DroneModelTaskUpSertDto[]): Observable<BulkSaveResult> {
    return this.http.post<BulkSaveResult>(`${this.baseUrl}/bulk-save/${unitTaskId}`, dtos).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося зберегти засоби для завдання',
        );
        return throwError(() => new Error(message));
      }),
    );
  }
}
