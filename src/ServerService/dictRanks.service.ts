import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LookupDto } from '../app/shared/models/lookup.models';

export interface DictRank {
    id: string;
    value: string;
    shortValue: string;
    comment?: string;
    natoCode?: string;
    category?: string;
    subCategory?: string;
    orderVal: number;
}

@Injectable({ 
    providedIn: 'root' 
})
export class DictRankService {
    readonly api = '/api/DictRank';
    private http = inject(HttpClient);

    getAll(): Observable<DictRank[]> {
        return this.http.get<DictRank[]>(this.api);
    }

    lookup(term: string, limit: number = 10): Observable<LookupDto[]> {
        const params = { term, limit: limit.toString() };
        return this.http.get<LookupDto[]>(`${this.api}/lookup`, { params });
    }

    getById(id: string): Observable<DictRank> {
        return this.http.get<DictRank>(`${this.api}/${id}`);
    }

    create(item: Omit<DictRank, 'id'>): Observable<DictRank> {
        return this.http.post<DictRank>(this.api, item);
    }

    update(id: string, item: Omit<DictRank, 'id'>): Observable<void> {
        return this.http.put<void>(`${this.api}/${id}`, item);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.api}/${id}`);
    }

    createItemsSignal(): any {
        return signal<DictRank[]>([]);
    }

    get(api: string, id: string) {
        return this.http.get<DictRank>(`${api}/${id}`);
    }
}