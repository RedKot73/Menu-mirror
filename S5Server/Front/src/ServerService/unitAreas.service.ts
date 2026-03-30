import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  getAll(unitId?: string, areaId?: string): Observable<UnitAreasDto[]> {
    const params: Record<string, string> = {};
    if (unitId) { params['unitId'] = unitId; }
    if (areaId) { params['areaId'] = areaId; }
    return this.http.get<UnitAreasDto[]>(this.api, { params });
  }

  getById(id: string): Observable<UnitAreasDto> {
    return this.http.get<UnitAreasDto>(`${this.api}/${id}`);
  }

  getByUnit(unitId: string): Observable<UnitAreasDto[]> {
    return this.http.get<UnitAreasDto[]>(`${this.api}/by-unit/${unitId}`);
  }

  getByArea(areaId: string): Observable<UnitAreasDto[]> {
    return this.http.get<UnitAreasDto[]>(`${this.api}/by-area/${areaId}`);
  }

  getAdjacent(unitId: string): Observable<UnitAreasDto[]> {
    return this.http.get<UnitAreasDto[]>(`${this.api}/adjacent/${unitId}`);
  }

  create(dto: UnitAreasUpsertDto): Observable<UnitAreasDto> {
    return this.http.post<UnitAreasDto>(this.api, dto);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
