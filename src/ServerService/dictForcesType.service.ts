import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SimpleDictDto, SimpleDictLookup } from './simpleDict.service';

export type DictForcesType = SimpleDictDto;

@Injectable({ providedIn: 'root' })
export class DictForcesTypeService {
    readonly api = '/api/dict-forces-types';

    constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<SimpleDictDto[]>(this.api);
  }

  get(id: string) {
      return this.http.get<SimpleDictDto>(`${this.api}/${id}`);
  }

  create(dto: Omit<SimpleDictDto, 'id'>) {
      return this.http.post<SimpleDictDto>(this.api, dto);
  }

  update(id: string, dto: Omit<SimpleDictDto, 'id'>) {
      return this.http.put<void>(`${this.api}/${id}`, dto);
  }

  delete(id: string) {
      return this.http.delete<void>(`${this.api}/${id}`);
  }

  lookup(term: string, limit = 10) {
      return this.http.get<SimpleDictLookup[]>(`${this.api}/lookup`, {
      params: { term, limit },
    });
  }

  // Создает сигнал для элементов справочника
  createItemsSignal() {
    return signal<SimpleDictDto[]>([]);
  }
}
