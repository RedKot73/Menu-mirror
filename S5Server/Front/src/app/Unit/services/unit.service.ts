import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LookupDto } from '../../shared/models/lookup.models';
import { SoldierDto } from '../../Soldier/services/soldier.service';
import { S5App_ErrorHandler } from '../../shared/models/ErrorHandler';

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

export type HttpGetParams = Record<string, string | number | boolean>;

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  readonly api = '/api/Unit';
  private http = inject(HttpClient);

  createItemsSignal() {
    return signal<UnitDto[]>([]);
  }

  // CRUD операции
  getAll(search?: string, parentId?: string): Observable<UnitDto[]> {
    const params: HttpGetParams = {};
    if (search) {
      params['search'] = search;
    }
    if (parentId) {
      params['parentId'] = parentId;
    }

    return this.http.get<UnitDto[]>(this.api, { params }).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(error, 'Не вдалося отримати підрозділи');
        return throwError(() => new Error(message));
      }),
    );
  }

  // Специальный метод для дерева с ленивой загрузкой
  getTreeItems(search?: string, parentId?: string): Observable<UnitTreeItemDto[]> {
    const params: HttpGetParams = {};
    if (search) {
      params['search'] = search;
    }
    if (parentId !== undefined) {
      params['parentId'] = parentId;
    }

    return this.http.get<UnitTreeItemDto[]>(this.api, { params }).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося отримати елементи дерева підрозділів',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  getById(id: string): Observable<UnitDto> {
    return this.http.get<UnitDto>(`${this.api}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(error, 'Не вдалося отримати підрозділ');
        return throwError(() => new Error(message));
      }),
    );
  }

  create(item: UnitCreateDto): Observable<UnitDto> {
    return this.http.post<UnitDto>(this.api, item).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(error, 'Не вдалося створити підрозділ');
        return throwError(() => new Error(message));
      }),
    );
  }

  update(id: string, item: UnitDto): Observable<void> {
    return this.http.put<void>(`${this.api}/${id}`, item).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(error, 'Не вдалося оновити підрозділ');
        return throwError(() => new Error(message));
      }),
    );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(error, 'Не вдалося видалити підрозділ');
        return throwError(() => new Error(message));
      }),
    );
  }

  // Методы для работы с иерархией
  hasChildren(id: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.api}/${id}/has-children`).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося перевірити наявність дочірніх підрозділів',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  getChildren(id: string): Observable<UnitDto[]> {
    return this.http.get<UnitDto[]>(`${this.api}/${id}/children`).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося отримати дочірні підрозділи',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  hasAssignedUnits(id: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.api}/${id}/has-assigned`).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося перевірити наявність приданих підрозділів',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  getAssignedUnits(id: string): Observable<UnitDto[]> {
    return this.http.get<UnitDto[]>(`${this.api}/${id}/assigned`).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося отримати придані підрозділи',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  // Методы для управления дочерними подразделениями
  addExistingChild(parentId: string, childId: string): Observable<void> {
    return this.http.post<void>(`${this.api}/${parentId}/add-exists-child/${childId}`, {}).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося додати дочірній підрозділ',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  removeChild(parentId: string, childId: string): Observable<void> {
    return this.http.post<void>(`${this.api}/${parentId}/remove-child/${childId}`, {}).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося прибрати дочірній підрозділ',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  // Методы для управления приданными подразделениями
  addAssignedUnit(unitId: string, assignedId: string): Observable<void> {
    return this.http.post<void>(`${this.api}/${unitId}/add-assigned/${assignedId}`, {}).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося додати приданий підрозділ',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  removeAssignedUnit(unitId: string, assignedId: string): Observable<void> {
    return this.http.post<void>(`${this.api}/${unitId}/remove-assigned/${assignedId}`, {}).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося прибрати приданий підрозділ',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  //Работают по разному, не путать
  // GET /api/.../lookup - Получить список для автозаполнения
  // GET /api/.../sel_list - Получить список для селекта
  lookup(term: string, limit: number = 10): Observable<LookupDto[]> {
    const params = { term, limit: limit.toString() };
    return this.http.get<LookupDto[]>(`${this.api}/lookup`, { params }).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(error, 'Не вдалося завантажити список');
        return throwError(() => new Error(message));
      }),
    );
  }

  //Работают по разному, не путать
  // GET /api/.../lookup - Получить список для автозаполнения
  // GET /api/.../sel_list - Получить список для селекта
  getSelectList(): Observable<LookupDto[]> {
    return this.http.get<LookupDto[]>(`${this.api}/sel_list`).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(error, 'Не вдалося завантажити список');
        return throwError(() => new Error(message));
      }),
    );
  }

  moveUpDown(id: string, moveUp: boolean): Observable<void> {
    // POST /api/Unit/{unitId}/moveUpDown/{toUp}
    return this.http
      .post<void>(`${this.api}/${id}/moveUpDown/${moveUp ? 'true' : 'false'}`, {})
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
