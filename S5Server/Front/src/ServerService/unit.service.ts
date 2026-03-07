import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { LookupDto } from '../app/shared/models/lookup.models';
import { SoldierDto } from './soldier.service';
import { S5App_ErrorHandler } from '../app/shared/models/ErrorHandler';

export interface UnitDto {
  id: string;
  parentId?: string;
  parentShortName?: string;
  assignedUnitId?: string;
  assignedShortName?: string;
  name: string;
  shortName?: string;
  militaryNumber?: string;
  forceTypeId?: string;
  forceType?: string;
  unitTypeId?: string;
  unitType?: string;
  orderVal: number;
  /**
   * Оперативний/Тимчасовий підрозділ - Команда
   */
  isInvolved: boolean;
  /**
   * ППД (Пункт постійної дислокації) - ID кодифікатора
   */
  persistentLocationId?: string;
  /**
   * ППД (Пункт постійної дислокації) - відображуване значення
   */
  persistentLocation?: string;
  comment?: string;
}

export interface UnitTreeItemDto extends UnitDto {
  hasChildren: boolean;
}

export interface UnitCreateDto {
  parentId?: string;
  assignedUnitId?: string;
  name: string;
  shortName: string;
  militaryNumber?: string;
  forceTypeId?: string;
  unitTypeId?: string;
  orderVal: number;
  /**
   * Оперативний/Тимчасовий підрозділ - Команда
   */
  isInvolved: boolean;
  /**
   * ППД (Пункт постійної дислокації) - ID кодифікатора
   */
  persistentLocationId?: string;
  comment?: string;
}

export interface UnitDataSetDto {
  id: string;
  parentId?: string;
  parentShortName?: string;
  assignedShortName?: string;
  shortName: string;
  unitTypeId?: string;
  unitType?: string;
  /** Чи залучений підрозділ/екіпаж/група */
  isInvolved?: boolean;
  comment?: string;
  /** Військовослужбовці підрозділу */
  soldiers: SoldierDto[];
  /** Придані військовослужбовці */
  assignedSoldiers: SoldierDto[];
  /** Задіяні військовослужбовці */
  involvedSoldiers: SoldierDto[];
}

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/Unit';

  createItemsSignal() {
    return signal<UnitDto[]>([]);
  }

  /**
   * Отримати всі підрозділи (з фільтрацією)
   * GET /api/Unit?search={search}&parentId={parentId}
   */
  getAll(search?: string, parentId?: string): Observable<UnitDto[]> {
    let params = new HttpParams();
    if (search) {
      params = params.set('search', search);
    }
    if (parentId) {
      params = params.set('parentId', parentId);
    }

    return this.http.get<UnitDto[]>(this.baseUrl, { params }).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(error, 'Не вдалося отримати підрозділи');
        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * Отримати елементи дерева з ленівим завантаженням
   * GET /api/Unit?search={search}&parentId={parentId}
   */
  getTreeItems(search?: string, parentId?: string): Observable<UnitTreeItemDto[]> {
    let params = new HttpParams();
    if (search) {
      params = params.set('search', search);
    }
    if (parentId !== undefined) {
      params = params.set('parentId', parentId);
    }

    return this.http.get<UnitTreeItemDto[]>(this.baseUrl, { params }).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося отримати елементи дерева підрозділів',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * Отримати підрозділ за ID
   * GET /api/Unit/{id}
   */
  getById(id: string): Observable<UnitDto> {
    return this.http.get<UnitDto>(`${this.baseUrl}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(error, 'Не вдалося отримати підрозділ');
        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * Створити підрозділ
   * POST /api/Unit
   */
  create(item: UnitCreateDto): Observable<UnitDto> {
    return this.http.post<UnitDto>(this.baseUrl, item).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(error, 'Не вдалося створити підрозділ');
        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * Оновити підрозділ
   * PUT /api/Unit/{id}
   */
  update(id: string, item: UnitDto): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, item).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(error, 'Не вдалося оновити підрозділ');
        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * Видалити підрозділ
   * DELETE /api/Unit/{id}
   */
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(error, 'Не вдалося видалити підрозділ');
        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * Перевірити наявність дочірніх підрозділів
   * GET /api/Unit/{id}/has-children
   */
  hasChildren(id: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/${id}/has-children`).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося перевірити наявність дочірніх підрозділів',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * Отримати дочірні підрозділи
   * GET /api/Unit/{id}/children
   */
  getChildren(id: string): Observable<UnitDto[]> {
    return this.http.get<UnitDto[]>(`${this.baseUrl}/${id}/children`).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося отримати дочірні підрозділи',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * Перевірити наявність приданих підрозділів
   * GET /api/Unit/{id}/has-assigned
   */
  hasAssignedUnits(id: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/${id}/has-assigned`).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося перевірити наявність приданих підрозділів',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * Отримати придані підрозділи
   * GET /api/Unit/{id}/assigned
   */
  getAssignedUnits(id: string): Observable<UnitDto[]> {
    return this.http.get<UnitDto[]>(`${this.baseUrl}/${id}/assigned`).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося отримати придані підрозділи',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * Додати існуючий дочірній підрозділ
   * POST /api/Unit/{parentId}/add-exists-child/{childId}
   */
  addExistingChild(parentId: string, childId: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${parentId}/add-exists-child/${childId}`, {}).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося додати дочірній підрозділ',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * Прибрати дочірній підрозділ
   * POST /api/Unit/{parentId}/remove-child/{childId}
   */
  removeChild(parentId: string, childId: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${parentId}/remove-child/${childId}`, {}).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося прибрати дочірній підрозділ',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * Додати приданий підрозділ
   * POST /api/Unit/{unitId}/add-assigned/{assignedId}
   */
  addAssignedUnit(unitId: string, assignedId: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${unitId}/add-assigned/${assignedId}`, {}).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося додати приданий підрозділ',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * Прибрати приданий підрозділ
   * POST /api/Unit/{unitId}/remove-assigned/{assignedId}
   */
  removeAssignedUnit(unitId: string, assignedId: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${unitId}/remove-assigned/${assignedId}`, {}).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося прибрати приданий підрозділ',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * Lookup для автокомпліту
   * GET /api/Unit/lookup?term={term}&isInvolved={isInvolved}
   */
  lookup(term: string, isInvolved?: boolean): Observable<LookupDto[]> {
    if (!term?.trim()) {
      return of([]);
    }

    let params = new HttpParams();
    params = params.set('term', term);
    if (isInvolved !== undefined) {
      params = params.set('isInvolved', isInvolved.toString());
    }

    return this.http.get<LookupDto[]>(`${this.baseUrl}/lookup`, { params }).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося виконати пошук підрозділів',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * Отримати перелік для селекту
   * GET /api/Unit/sel_list
   */
  getSelectList(): Observable<LookupDto[]> {
    return this.http.get<LookupDto[]>(`${this.baseUrl}/sel_list`).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося завантажити список підрозділів',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * Змінити порядок підрозділу (вгору/вниз)
   * POST /api/Unit/{id}/moveUpDown/{toUp}
   */
  moveUpDown(id: string, moveUp: boolean): Observable<void> {
    return this.http
      .post<void>(`${this.baseUrl}/${id}/moveUpDown/${moveUp ? 'true' : 'false'}`, {})
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const message = S5App_ErrorHandler.handleHttpError(
            error,
            'Не вдалося змінити порядок підрозділу',
          );
          return throwError(() => new Error(message));
        }),
      );
  }
}
