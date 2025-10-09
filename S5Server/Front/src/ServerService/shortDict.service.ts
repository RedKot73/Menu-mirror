import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LookupDto } from '../app/shared/models/lookup.models';

export interface ShortDictDto {
    id: string;
    value: string;
    shortValue: string;
    comment?: string | null;
}

@Injectable({ providedIn: 'root' })
export class ShortDictService {
    constructor(private http: HttpClient) { }

    getAll(api: string) {
        return this.http.get<ShortDictDto[]>(api);
    }

    get(api: string, id: string) {
        return this.http.get<ShortDictDto>(`${api}/${id}`);
    }

    create(api: string, dto: Omit<ShortDictDto, 'id'>) {
        return this.http.post<ShortDictDto>(api, dto);
    }

    update(api: string, id: string, dto: Omit<ShortDictDto, 'id'>) {
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
        const items = signal<ShortDictDto[]>([]);
        this.getAll(api).subscribe(items.set);
        return items;
    }
}
