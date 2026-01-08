import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LookupDto } from '../app/shared/models/lookup.models';

export interface DictUnitTaskDto {
  id: string;
  caption: string;
  value: string;
  comment?: string;
  amount: number;
  withMeans: boolean;
  atPermanentPoint: boolean;
}

export interface DictUnitTaskCreateDto {
  caption: string;
  value: string;
  comment?: string;
  amount: number;
  withMeans?: boolean;
  atPermanentPoint?: boolean;
}

export type DictUnitTask = DictUnitTaskDto;

@Injectable({
  providedIn: 'root',
})
export class DictUnitTasksService {
  readonly api = '/api/dict-unit-tasks';
  private http = inject(HttpClient);

  createItemsSignal() {
    return signal<DictUnitTask[]>([]);
  }

  getAll(search?: string): Observable<DictUnitTask[]> {
    const params: Record<string, string> = {};
    if (search) {
      params['search'] = search;
    }
    return this.http.get<DictUnitTask[]>(this.api, { params });
  }

  getById(id: string): Observable<DictUnitTask> {
    return this.http.get<DictUnitTask>(`${this.api}/${id}`);
  }

  create(item: DictUnitTaskCreateDto): Observable<DictUnitTask> {
    return this.http.post<DictUnitTask>(this.api, item);
  }

  update(id: string, item: DictUnitTaskDto): Observable<void> {
    return this.http.put<void>(`${this.api}/${id}`, item);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

  // Lookup для автокомпліта
  lookup(term: string, limit: number = 10): Observable<LookupDto[]> {
    const params = { term, limit: limit.toString() };
    return this.http.get<LookupDto[]>(`${this.api}/lookup`, { params });
  }

  // Список для випадаючого списку (select)
  getSelectList(): Observable<LookupDto[]> {
    return this.http.get<LookupDto[]>(`${this.api}/sel_list`);
  }
}
