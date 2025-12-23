import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LookupDto } from '../app/shared/models/lookup.models';

export interface DictDroneType {
  id: string;
  value: string;
  shortValue: string;
  comment?: string;
}

@Injectable({
  providedIn: 'root',
})
export class DictDroneTypeService {
  readonly api = '/api/dict-drone-types';
  private http = inject(HttpClient);

  createItemsSignal() {
    return signal<DictDroneType[]>([]);
  }

  getAll(): Observable<DictDroneType[]> {
    return this.http.get<DictDroneType[]>(this.api);
  }

  lookup(term: string, limit: number = 10): Observable<LookupDto[]> {
    const params = { term, limit: limit.toString() };
    return this.http.get<LookupDto[]>(`${this.api}/lookup`, { params });
  }

  getById(id: string): Observable<DictDroneType> {
    return this.http.get<DictDroneType>(`${this.api}/${id}`);
  }

  create(item: Omit<DictDroneType, 'id'>): Observable<DictDroneType> {
    return this.http.post<DictDroneType>(this.api, item);
  }

  update(id: string, item: Omit<DictDroneType, 'id'>): Observable<void> {
    return this.http.put<void>(`${this.api}/${id}`, item);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

  getSelectList(): Observable<LookupDto[]> {
    return this.http.get<LookupDto[]>(`${this.api}/sel_list`);
  }
}
