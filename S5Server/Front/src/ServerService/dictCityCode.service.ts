import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LookupDto } from '../app/shared/models/lookup.models';

export interface CityCodeDto {
  id: string;
  parentId: string;
  level1: string;
  level2: string;
  level3: string;
  level4: string;
  levelExt: string;
  categoryId: string;
  category: string;
  value: string;
}

export interface CityCodeCreateDto {
  parentId: string;
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
  page?: number;
  pageSize?: number;
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export enum CityCodesProgressStatus {
  Start = 0,
  Done = 1,
  Failed = 2,
}

export interface ImportCityCodesProgress {
  status: CityCodesProgressStatus;
  processed: number;
  total: number;
  message?: string;
}

export interface ImportCityCodesResponse {
  started: boolean;
  status: CityCodesProgressStatus;
  error?: string;
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

  getAll(filter?: CityCodeFilter): Observable<PagedResult<CityCodeDto>> {
    let params = new HttpParams();

    if (filter?.search) {
      params = params.set('search', filter.search);
    }
    if (filter?.page) {
      params = params.set('page', filter.page.toString());
    }
    if (filter?.pageSize) {
      params = params.set('pageSize', filter.pageSize.toString());
    }

    return this.http.get<PagedResult<CityCodeDto>>(this.api, { params });
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

  /**
   * Імпорт записів кодифікатора з xlsx файлу
   */
  importCityCodes(file: File): Observable<ImportCityCodesResponse> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<ImportCityCodesResponse>(`${this.api}/importCityCodes`, formData);
  }

  /**
   * Підписка на Server-Sent Events для моніторингу прогресу імпорту
   */
  subscribeToImportProgress(): Observable<ImportCityCodesProgress> {
    return new Observable<ImportCityCodesProgress>((observer) => {
      const eventSource = new EventSource(`${this.api}/imports/stream`);

      eventSource.onmessage = (event) => {
        try {
          const progress: ImportCityCodesProgress = JSON.parse(event.data);
          observer.next(progress);
        } catch (error) {
          console.error('Помилка парсингу SSE події:', error);
        }
      };

      eventSource.onerror = (error) => {
        console.error('SSE connection error:', error);
        eventSource.close();
        observer.error(error);
      };

      // Cleanup при відписці
      return () => {
        eventSource.close();
      };
    });
  }
}
