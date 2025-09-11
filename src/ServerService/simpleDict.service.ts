import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface SimpleDictDto {
  id: string;
  value: string;
  comment?: string | null;
}

export interface SimpleDictLookup {
  id: string;
  name: string;
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
    return this.http.get<SimpleDictLookup[]>(`${api}/lookup`, {
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
