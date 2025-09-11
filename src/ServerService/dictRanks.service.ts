import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface DictRankDto {
    id: string;
    value: string;
    ShortValue: string;
    comment?: string | null;
    NatoCode?: string | null;
    Category?: string | null;
    SubCategory?: string | null;
    OrderVal: number;
}

export interface DictRankLookup {
    id: string;
    name: string;
}

@Injectable({ providedIn: 'root' })
export class DictRankService {
    constructor(private http: HttpClient) { }

    getAll(api: string) {
        return this.http.get<DictRankDto[]>(api);
    }

    get(api: string, id: string) {
        return this.http.get<DictRankDto>(`${api}/${id}`);
    }

    create(api: string, dto: Omit<DictRankDto, 'id'>) {
        return this.http.post<DictRankDto>(api, dto);
    }

    update(api: string, id: string, dto: Omit<DictRankDto, 'id'>) {
        return this.http.put(`${api}/${id}`, dto);
    }

    delete(api: string, id: string) {
        return this.http.delete(`${api}/${id}`);
    }

    lookup(api: string, term: string, limit = 10) {
        return this.http.get<DictRankLookup[]>(`${api}/lookup`, {
            params: { term, limit },
        });
    }

    // Для каждого справочника создавайте отдельный сигнал через этот метод
    createItemsSignal(api: string) {
        const items = signal<DictRankDto[]>([]);
        this.getAll(api).subscribe(items.set);
        return items;
    }
}
