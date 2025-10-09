import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LookupDto } from '../app/shared/models/lookup.models';

export interface SimpleDictDto {
  id: string;
  value: string;
  comment?: string | null;
}

@Injectable({ providedIn: 'root' })
export class SimpleDictService {
  constructor(private http: HttpClient) {}

  getAll(api: string) {
    return this.http.get<SimpleDictDto[]>(api);
  }

  get(api: string, id: string) {
    return this.http.get<SimpleDictDto>(`${api}/${id}`);
  }

  create(api: string, dto: Omit<SimpleDictDto, 'id'>) {
    return this.http.post<SimpleDictDto>(api, dto);
  }

  update(api: string, id: string, dto: Omit<SimpleDictDto, 'id'>) {
    return this.http.put(`${api}/${id}`, dto);
  }

  delete(api: string, id: string) {
    return this.http.delete(`${api}/${id}`);
  }

  lookup(api: string, term: string, limit = 10) {
    return this.http.get<LookupDto[]>(`${api}/lookup`, {
      params: { term, limit },
    });
  }

  // Для каждого справочника создавайте отдельный сигнал через этот метод
  createItemsSignal(api: string) {
    const items = signal<SimpleDictDto[]>([]);
    this.getAll(api).subscribe(items.set);
    return items;
  }
}
