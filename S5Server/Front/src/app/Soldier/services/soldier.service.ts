import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LookupDto } from '../../shared/models/lookup.models';

export interface SoldierDto {
    id: string;
    firstName: string;
    midleName?: string;
    lastName?: string;
    fio: string;
    nickName?: string;
    unitId: string;
    unitShortName: string;
    arrivedAt: Date;
    departedAt?: Date;
    assignedUnitId?: string;
    assignedUnitShortName?: string;
    operationalUnitId?: string;
    operationalUnitShortName?: string;
    rankId: string;
    rankShortValue: string;
    positionId: string;
    positionValue: string;
    stateId: string;
    stateValue: string;
    comment?: string;
}

export interface SoldierCreateDto {
    firstName: string;
    midleName?: string;
    lastName?: string;
    nickName?: string;
    unitId: string;
    arrivedAt: Date;
    departedAt?: Date;
    assignedUnitId?: string;
    operationalUnitId?: string;
    rankId: string;
    positionId: string;
    stateId: string;
    comment?: string;
}

@Injectable({
    providedIn: 'root'
})
export class SoldierService {
    readonly api = '/api/Soldier';
    private http = inject(HttpClient);

    createItemsSignal() {
        return signal<SoldierDto[]>([]);
    }

    // CRUD операции
    getAll(search?: string, unitId?: string, assignedUnitId?: string): Observable<SoldierDto[]> {
        const params: Record<string, string> = {};
        if (search) {params['search'] = search;}
        if (unitId) {params['unitId'] = unitId;}
        if (assignedUnitId) {params['assignedUnitId'] = assignedUnitId;}
        
        return this.http.get<SoldierDto[]>(this.api, { params });
    }

    // Lookup для автокомплита
    lookup(term: string, limit: number = 10): Observable<LookupDto[]> {
        const params = { term, limit: limit.toString() };
        return this.http.get<LookupDto[]>(`${this.api}/lookup`, { params });
    }

    getById(id: string): Observable<SoldierDto> {
        return this.http.get<SoldierDto>(`${this.api}/${id}`);
    }

    create(item: SoldierCreateDto): Observable<SoldierDto> {
        return this.http.post<SoldierDto>(this.api, item);
    }

    update(id: string, item: SoldierDto): Observable<void> {
        return this.http.put<void>(`${this.api}/${id}`, item);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.api}/${id}`);
    }

    // Методы для управления назначениями
    assign(id: string, unitId: string): Observable<void> {
        return this.http.post<void>(`${this.api}/${id}/assign/${unitId}`, {});
    }

    unassign(id: string): Observable<void> {
        return this.http.post<void>(`${this.api}/${id}/unassign`, {});
    }

    move(id: string, newUnitId: string): Observable<void> {
        return this.http.post<void>(`${this.api}/${id}/move/${newUnitId}`, {});
    }
}