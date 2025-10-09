import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LookupDto } from '../app/shared/models/lookup.models';
import { SimpleDictDto } from './simpleDict.service';

export type DictSoldierStates = SimpleDictDto;

@Injectable({
    providedIn: 'root'
})
export class DictSoldierStatesService {
    readonly api = '/api/dict-soldier-states';
    private http = inject(HttpClient);

    createItemsSignal() {
        return signal<DictSoldierStates[]>([]);
    }

    getAll(): Observable<DictSoldierStates[]> {
        return this.http.get<DictSoldierStates[]>(this.api);
    }

    lookup(term: string, limit: number = 10): Observable<LookupDto[]> {
        const params = { term, limit: limit.toString() };
        return this.http.get<LookupDto[]>(`${this.api}/lookup`, { params });
    }

    getById(id: string): Observable<DictSoldierStates> {
        return this.http.get<DictSoldierStates>(`${this.api}/${id}`);
    }

    create(item: Omit<DictSoldierStates, 'id'>): Observable<DictSoldierStates> {
        return this.http.post<DictSoldierStates>(this.api, item);
    }

    update(id: string, item: Omit<DictSoldierStates, 'id'>): Observable<void> {
        return this.http.put<void>(`${this.api}/${id}`, item);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.api}/${id}`);
    }

    getSelectList(): Observable<LookupDto[]> {
        return this.http.get<LookupDto[]>(`${this.api}/sel_list`);
    }
}