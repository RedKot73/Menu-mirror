import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LookupDto } from '../app/shared/models/lookup.models';
import { SimpleDictDto } from './simpleDict.service';

export interface DictDroneModel extends SimpleDictDto {
  droneTypeId: string;
  droneTypeName: string;
}

@Injectable({
  providedIn: 'root',
})
export class DictDroneModelService {
  readonly api = '/api/dict-drone-models';
  private http = inject(HttpClient);

  createItemsSignal() {
    return signal<DictDroneModel[]>([]);
  }

  getAll(): Observable<DictDroneModel[]> {
    return this.http.get<DictDroneModel[]>(this.api);
  }

  lookup(term: string, limit: number = 10): Observable<LookupDto[]> {
    const params = { term, limit: limit.toString() };
    return this.http.get<LookupDto[]>(`${this.api}/lookup`, { params });
  }

  getById(id: string): Observable<DictDroneModel> {
    return this.http.get<DictDroneModel>(`${this.api}/${id}`);
  }

  getByDroneType(droneTypeId: string): Observable<SimpleDictDto[]> {
    return this.http.get<SimpleDictDto[]>(`${this.api}/by-type/${droneTypeId}`);
  }

  lookupByType(
    droneTypeId: string,
    term: string = '',
    limit: number = 10,
  ): Observable<LookupDto[]> {
    const params = { droneTypeId, term, limit: limit.toString() };
    return this.http.get<LookupDto[]>(`${this.api}/lookup-by-type`, { params });
  }

  create(item: Omit<DictDroneModel, 'id'>): Observable<DictDroneModel> {
    return this.http.post<DictDroneModel>(this.api, item);
  }

  update(id: string, item: Omit<DictDroneModel, 'id'>): Observable<void> {
    return this.http.put<void>(`${this.api}/${id}`, item);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

  getSelectList(): Observable<LookupDto[]> {
    return this.http.get<LookupDto[]>(`${this.api}/sel_list`);
  }
}
