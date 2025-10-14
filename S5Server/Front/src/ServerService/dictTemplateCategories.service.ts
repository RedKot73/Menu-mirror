import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShortDictDto } from './shortDict.service';
import { LookupDto } from '../app/shared/models/lookup.models';

export type DictTemplateCategory = ShortDictDto;

@Injectable({ providedIn: 'root' })
export class DictTemplateCategoriesService {
    readonly api = '/api/dict-template-categories';

    constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<ShortDictDto[]>(this.api);
  }

  get(id: string) {
      return this.http.get<ShortDictDto>(`${this.api}/${id}`);
  }

  create(dto: Omit<ShortDictDto, 'id'>) {
      return this.http.post<ShortDictDto>(this.api, dto);
  }

  update(id: string, dto: Omit<ShortDictDto, 'id'>) {
      return this.http.put<void>(`${this.api}/${id}`, dto);
  }

  delete(id: string) {
      return this.http.delete<void>(`${this.api}/${id}`);
  }

  lookup(term: string, limit = 10) {
      return this.http.get<LookupDto[]>(`${this.api}/lookup`, {
      params: { term, limit },
    });
  }

  // Создает сигнал для элементов справочника
  createItemsSignal() {
    return signal<ShortDictDto[]>([]);
  }
}