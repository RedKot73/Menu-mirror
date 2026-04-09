import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { LookupDto } from '../app/shared/models/lookup.models';
import { S5App_ErrorHandler } from '../app/shared/models/ErrorHandler';
import { toDateOnly } from '../app/shared/utils/date.utils';

export interface SoldierDto {
  id: string;
  firstName: string;
  midleName?: string | null;
  lastName?: string | null;
  nickName?: string | null;
  unitId: string;
  unitShortName: string;
  arrivedAt?: Date;
  departedAt?: Date;
  assignedUnitId?: string | null;
  assignedUnitShortName?: string | null;
  involvedUnitId?: string | null;
  involvedUnitShortName?: string | null;
  rankId: string;
  rankShortValue: string;
  positionId: string;
  positionValue: string;
  stateId: string;
  stateValue: string;
  comment?: string | null;
  birthDate?: Date;
  changedBy: string;
  validFrom: Date;
}

export interface SoldierCreateDto {
  firstName: string;
  midleName?: string | null;
  lastName?: string | null;
  birthDate?: Date;
  nickName?: string | null;
  unitId: string;
  arrivedAt: Date;
  departedAt?: Date;
  assignedUnitId?: string | null;
  involvedUnitId?: string | null;
  rankId: string;
  positionId: string;
  stateId: string;
  ExternId?: number;
  comment?: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class SoldierService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/Soldier';

  /** Підготовка DTO до відправки: Date → DateOnly string */
  private prepareForServer(dto: SoldierCreateDto): Record<string, unknown> {
    return {
      ...dto,
      birthDate: toDateOnly(dto.birthDate),
      arrivedAt: toDateOnly(dto.arrivedAt),
      departedAt: toDateOnly(dto.departedAt),
    };
  }

  createItemsSignal() {
    return signal<SoldierDto[]>([]);
  }

  /**
   * Отримати всех військовослужбовців (з фільтрацією)
   * GET /api/Soldier?search={search}&unitId={unitId}&excludeHasUser={excludeHasUser}
   */
  getAll(search?: string, unitId?: string, excludeHasUser?: boolean): Observable<SoldierDto[]> {
    let params = new HttpParams();
    if (search) {
      params = params.set('search', search);
    }
    if (unitId) {
      params = params.set('unitId', unitId);
    }
    if (excludeHasUser) {
      params = params.set('excludeHasUser', 'true');
    }

    return this.http.get<SoldierDto[]>(this.baseUrl, { params }).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося отримати список військовослужбовців',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * Об'єднаний перелік військовослужбовців за підрозділом
   * GET /api/Soldier/by-unit?unitId={unitId}
   */
  getByUnit(unitId: string): Observable<SoldierDto[]> {
    let params = new HttpParams();
    params = params.set('unitId', unitId);

    return this.http.get<SoldierDto[]>(`${this.baseUrl}/by-unit`, { params }).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося отримати перелік військовослужбовців підрозділу',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * Отримати перелік за приданим підрозділом
   * GET /api/Soldier/by-assigned?assignedUnitId={id}&search={search}&limit={limit}
   */
  getByAssigned(assignedUnitId: string, search?: string, limit?: number): Observable<SoldierDto[]> {
    let params = new HttpParams();
    params = params.set('assignedUnitId', assignedUnitId);
    if (search) {
      params = params.set('search', search);
    }
    if (limit) {
      params = params.set('limit', limit.toString());
    }

    return this.http.get<SoldierDto[]>(`${this.baseUrl}/by-assigned`, { params }).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося отримати приданих військовослужбовців',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * Отримати перелік за оперативним підрозділом
   * GET /api/Soldier/by-involved?involvedUnitId={id}&search={search}&limit={limit}
   */
  getByInvolved(involvedUnitId: string, search?: string, limit?: number): Observable<SoldierDto[]> {
    let params = new HttpParams();
    params = params.set('involvedUnitId', involvedUnitId);
    if (search) {
      params = params.set('search', search);
    }
    if (limit) {
      params = params.set('limit', limit.toString());
    }

    return this.http.get<SoldierDto[]>(`${this.baseUrl}/by-involved`, { params }).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося отримати задіяних військовослужбовців',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * Lookup для автокомпліту
   * GET /api/Soldier/lookup?term={term}&limit={limit}
   */
  lookup(term: string, limit: number = 10): Observable<LookupDto[]> {
    let params = new HttpParams();
    params = params.set('term', term);
    params = params.set('limit', limit.toString());

    return this.http.get<LookupDto[]>(`${this.baseUrl}/lookup`, { params }).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося виконати пошук військовослужбовців',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * Отримати військовослужбовця за ID
   * GET /api/Soldier/{id}
   */
  getById(id: string): Observable<SoldierDto> {
    return this.http.get<SoldierDto>(`${this.baseUrl}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося отримати дані військовослужбовця',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * Створити військовослужбовця
   * POST /api/Soldier
   */
  create(item: SoldierCreateDto): Observable<SoldierDto> {
    return this.http.post<SoldierDto>(this.baseUrl, this.prepareForServer(item)).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося створити військовослужбовця',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * Оновити військовослужбовця
   * PUT /api/Soldier/{id}
   */
  update(id: string, item: SoldierCreateDto): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, this.prepareForServer(item)).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося оновити дані військовослужбовця',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * Видалити військовослужбовця
   * DELETE /api/Soldier/{id}
   */
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося видалити військовослужбовця',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * Призначити бійцю підрозділ «Приданий до»
   * POST /api/Soldier/{id}/assign-assigned/{unitId}
   */
  assignAssigned(id: string, unitId: string | null): Observable<SoldierDto> {
    const targetId = unitId ?? '';
    return this.http.post<SoldierDto>(`${this.baseUrl}/${id}/assign-assigned/${targetId}`, {}).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося призначити приданий підрозділ',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * Призначити бійцю оперативний підрозділ
   * POST /api/Soldier/{id}/assign-involved/{unitId}
   */
  assignInvolved(id: string, unitId: string | null): Observable<SoldierDto> {
    const targetId = unitId ?? '';
    return this.http.post<SoldierDto>(`${this.baseUrl}/${id}/assign-involved/${targetId}`, {}).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося призначити оперативний підрозділ',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * Перемістити бійця до іншого підрозділу
   * POST /api/Soldier/{id}/move/{newUnitId}
   */
  move(id: string, newUnitId: string): Observable<SoldierDto> {
    return this.http.post<SoldierDto>(`${this.baseUrl}/${id}/move/${newUnitId}`, {}).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося перемістити військовослужбовця',
        );
        return throwError(() => new Error(message));
      }),
    );
  }
}
