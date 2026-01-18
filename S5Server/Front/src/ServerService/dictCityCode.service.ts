import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LookupDto } from '../app/shared/models/lookup.models';

export interface CityCodeDto {
  id: string;
  level1: string;
  level2: string;
  level3: string;
  level4: string;
  levelExt: string;
  categoryId: string;
  value: string;
}

export interface CityCodeCreateDto {
  level1: string;
  level2: string;
  level3: string;
  level4: string;
  levelExt: string;
  categoryId: string;
  value: string;
}

export interface CityCodeFilter {
  search?: string;
  cityCategoryId?: string;
  level1?: string;
  level2?: string;
  level3?: string;
}

@Injectable({
  providedIn: 'root',
})
export class DictCityCodeService {
  readonly api = '/api/dict-city-codes';
  private http = inject(HttpClient);

  createItemsSignal() {
    return signal<CityCodeDto[]>([]);
  }

  getAll(filter?: CityCodeFilter): Observable<CityCodeDto[]> {
    let params = new HttpParams();

    if (filter?.search) {
      params = params.set('search', filter.search);
    }
    if (filter?.cityCategoryId) {
      params = params.set('cityCategoryId', filter.cityCategoryId);
    }
    if (filter?.level1) {
      params = params.set('level1', filter.level1);
    }
    if (filter?.level2) {
      params = params.set('level2', filter.level2);
    }
    if (filter?.level3) {
      params = params.set('level3', filter.level3);
    }

    return this.http.get<CityCodeDto[]>(this.api, { params });
  }

  getById(id: string): Observable<CityCodeDto> {
    return this.http.get<CityCodeDto>(`${this.api}/${id}`);
  }

  create(item: CityCodeCreateDto): Observable<CityCodeDto> {
    return this.http.post<CityCodeDto>(this.api, item);
  }

  update(id: string, item: CityCodeDto): Observable<CityCodeDto> {
    return this.http.put<CityCodeDto>(`${this.api}/${id}`, item);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

  lookup(term: string, cityCategoryId?: string, limit: number = 10): Observable<LookupDto[]> {
    let params = new HttpParams().set('term', term).set('limit', limit.toString());

    if (cityCategoryId) {
      params = params.set('cityCategoryId', cityCategoryId);
    }

    return this.http.get<LookupDto[]>(`${this.api}/lookup`, { params });
  }

  getSelectList(cityCategoryId?: string): Observable<LookupDto[]> {
    let params = new HttpParams();

    if (cityCategoryId) {
      params = params.set('cityCategoryId', cityCategoryId);
    }

    return this.http.get<LookupDto[]>(`${this.api}/sel_list`, { params });
  }

  getByCategory(cityCategoryId: string): Observable<CityCodeDto[]> {
    return this.http.get<CityCodeDto[]>(`${this.api}/by-category/${cityCategoryId}`);
  }

  getByLevel1(level1: string): Observable<CityCodeDto[]> {
    return this.http.get<CityCodeDto[]>(`${this.api}/by-level1/${level1}`);
  }
}
