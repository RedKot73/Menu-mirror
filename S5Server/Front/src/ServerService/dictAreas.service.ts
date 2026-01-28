import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LookupDto } from '../app/shared/models/lookup.models';

/** Інформація про кодифікатор адміністративно-територіальних одиниць */
export interface CityCodeInfo {
  cityCodeId?: string;
  cityCode?: string;
  level1?: string;      // Область
  level2?: string;      // Район
  level3?: string;      // Громада
  level4?: string;      // Населений пункт
  levelExt?: string;    // Район у місті
}

export interface DictAreaDto {
  id: string;
  value: string;
  comment?: string;
  /** Тип Району виконання завдань (РВЗ) */
  areaTypeId: string;
  /** Тип Району виконання завдань (РВЗ) */
  areaType: string;
  /** Координати/Перелік координат РВЗ */
  coords?: string;
  /** Інформація про кодифікатор */
  cityCodeInfo?: CityCodeInfo;
}

export interface DictAreaCreateDto {
  value: string;
  comment?: string;
  /** Тип Району виконання завдань (РВЗ) */
  areaTypeId: string;
  /** Кодифікатор адмін-територіальних одиниць (опціонально) */
  cityCodeId?: string;
  /** Координати/Перелік координат РВЗ */
  coords?: string;
}

export type DictArea = DictAreaDto;

@Injectable({
  providedIn: 'root',
})
export class DictAreasService {
  readonly api = '/api/dict-areas';
  private http = inject(HttpClient);

  createItemsSignal() {
    return signal<DictArea[]>([]);
  }

  getAll(search?: string, areaTypeId?: string, cityCodeId?: string): Observable<DictArea[]> {
    const params: Record<string, string> = {};
    if (search) {
      params['search'] = search;
    }
    if (areaTypeId) {
      params['areaTypeId'] = areaTypeId;
    }
    if (cityCodeId) {
      params['cityCodeId'] = cityCodeId;
    }
    return this.http.get<DictArea[]>(this.api, { params });
  }

  getById(id: string): Observable<DictArea> {
    return this.http.get<DictArea>(`${this.api}/${id}`);
  }

  create(item: DictAreaCreateDto): Observable<DictArea> {
    return this.http.post<DictArea>(this.api, item);
  }

  update(id: string, item: DictAreaDto): Observable<void> {
    return this.http.put<void>(`${this.api}/${id}`, item);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

  // Lookup для автокомпліта
  lookup(term: string, areaTypeId?: string, limit: number = 10): Observable<LookupDto[]> {
    const params: Record<string, string> = { term, limit: limit.toString() };
    if (areaTypeId) {
      params['areaTypeId'] = areaTypeId;
    }
    return this.http.get<LookupDto[]>(`${this.api}/lookup`, { params });
  }

  // Список для випадаючого списку (select)
  getSelectList(areaTypeId?: string): Observable<LookupDto[]> {
    const params: Record<string, string> = {};
    if (areaTypeId) {
      params['areaTypeId'] = areaTypeId;
    }
    return this.http.get<LookupDto[]>(`${this.api}/sel_list`, { params });
  }

  // Отримати райони за типом РВЗ
  getByAreaType(areaTypeId: string): Observable<DictArea[]> {
    return this.http.get<DictArea[]>(`${this.api}/by-area-type/${areaTypeId}`);
  }

  // Отримати райони за кодифікатором
  getByCityCode(cityCodeId: string): Observable<DictArea[]> {
    return this.http.get<DictArea[]>(`${this.api}/by-city-code/${cityCodeId}`);
  }

  buildCityCodeDisplayValue(info: CityCodeInfo): string {
    if(!info) {
      return '';
    }
    const parts = [];
    if (info.level4) {
      parts.push(info.level4);
    }
    if (info.level3) {
      parts.push(info.level3);
    }
    if (info.level2) {
      parts.push(info.level2);
    }
    if (info.level1) {
      parts.push(info.level1);
    }
    if (info.levelExt) {
      parts.push(`(Район: ${info.levelExt})`);
    }
    return parts.length > 0 ? parts.join(', ') : info.cityCode || '';
  }
}
