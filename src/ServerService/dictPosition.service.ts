import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LookupDto } from '../app/shared/models/lookup.models';
import { SimpleDictDto } from './simpleDict.service';

export type DictPosition = SimpleDictDto;

@Injectable({
    providedIn: 'root'
})
export class DictPositionService {
    readonly api = '/api/DictPosition';
    private http = inject(HttpClient);

    createItemsSignal() {
        return signal<DictPosition[]>([]);
    }

    getAll(): Observable<DictPosition[]> {
        return this.http.get<DictPosition[]>(this.api);
    }

    lookup(term: string, limit: number = 10): Observable<LookupDto[]> {
        const params = { term, limit: limit.toString() };
        return this.http.get<LookupDto[]>(`${this.api}/lookup`, { params });
    }

    getById(id: string): Observable<DictPosition> {
        return this.http.get<DictPosition>(`${this.api}/${id}`);
    }

    create(item: Omit<DictPosition, 'id'>): Observable<DictPosition> {
        return this.http.post<DictPosition>(this.api, item);
    }

    update(id: string, item: Omit<DictPosition, 'id'>): Observable<void> {
        return this.http.put<void>(`${this.api}/${id}`, item);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.api}/${id}`);
    }
}