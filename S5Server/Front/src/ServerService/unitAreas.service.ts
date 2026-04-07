import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LookupDto } from '../app/shared/models/lookup.models';

export interface UnitAreasDto {
  id: string;
  unitId: string;
  unitShortName: string;
  areaId: string;
  areaValue: string;
  areaTypeValue: string;
  validFrom: string;
}

export interface UnitAreasUpsertDto {
  unitId: string;
  areaId: string;
}

@Injectable({
  providedIn: 'root',
})
export class UnitAreasService {
  readonly api = '/api/unit-areas';
  private http = inject(HttpClient);
/** Отримати всі зв'язки підрозділів та РВЗ з можливістю фільтрації */
  getAll(unitId?: string, areaId?: string): Observable<UnitAreasDto[]> {
    const params: Record<string, string> = {};
    if (unitId) { params['unitId'] = unitId; }
    if (areaId) { params['areaId'] = areaId; }
    return this.http.get<UnitAreasDto[]>(this.api, { params });
  }
/** Отримати зв'язок Unit-Area за ID */
  getById(id: string): Observable<UnitAreasDto> {
    return this.http.get<UnitAreasDto>(`${this.api}/${id}`);
  }
/** Отримати всі РВЗ для конкретного підрозділу */
  getByUnit(unitId: string): Observable<UnitAreasDto[]> {
    return this.http.get<UnitAreasDto[]>(`${this.api}/by-unit/${unitId}`);
  }
/** Отримати всі підрозділи для конкретного РВЗ (крім підрозділу unitId) */
  getByArea(areaId: string, unitId?: string): Observable<UnitAreasDto[]> {
    const params: Record<string, string> = {};
    params['areaId'] = areaId;
    if (unitId) { params['unitId'] = unitId; }
    return this.http.get<UnitAreasDto[]>(`${this.api}/by-area/${areaId}`, { params });
  }
/** Отримати суміжні підрозділи — ті, що мають хоча б один спільний РВЗ з вказаним підрозділом
 * Параметр unitId використовується для виключення самого підрозділу зі списку суміжних
 */
  getAdjacent(unitId: string): Observable<UnitAreasDto[]> {
    return this.http.get<UnitAreasDto[]>(`${this.api}/adjacent/${unitId}`);
  }
/** Отримати суміжні підрозділи у вигляді лукапа (id/value) —
 * дедуплікація виключена на сервері
 */
  getAdjacentLookup(unitId: string): Observable<LookupDto[]> {
    return this.http.get<LookupDto[]>(`${this.api}/adjacent-lookup/${unitId}`);
  }
/** Створити зв'язок підрозділ — РВЗ */
  create(dto: UnitAreasUpsertDto): Observable<UnitAreasDto> {
    return this.http.post<UnitAreasDto>(this.api, dto);
  }
/** Видалити зв'язок підрозділ — РВЗ */
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
