import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface UnitDto {
    id: string;
    parentId?: string;
    //parentName?: string,
    parentShortName?: string,
    assignedUnitId?: string;
    name: string;
    shortName?: string;
    militaryNumber?: string;
    forceTypeId?: string;
    forceType?: string;
    unitTypeId?: string;
    unitType?: string;
    orderVal: number;
    comment?: string;
}

export interface UnitCreateDto {
    parentId?: string;
    assignedUnitId?: string;
    name: string;
    shortName: string;
    militaryNumber?: string;
    forceTypeId?: string;
    unitTypeId?: string;
    orderVal: number;
    comment?: string;
}

@Injectable({
    providedIn: 'root'
})
export class UnitService {
    readonly api = '/api/Unit';
    private http = inject(HttpClient);

    createItemsSignal() {
        return signal<UnitDto[]>([]);
    }

    // CRUD операции
    getAll(search?: string, parentId?: string): Observable<UnitDto[]> {
        let params: any = {};
        if (search) params.search = search;
        if (parentId) params.parentId = parentId;
        
        return this.http.get<UnitDto[]>(this.api, { params });
    }

    getById(id: string): Observable<UnitDto> {
        return this.http.get<UnitDto>(`${this.api}/${id}`);
    }

    create(item: UnitCreateDto): Observable<UnitDto> {
        return this.http.post<UnitDto>(this.api, item);
    }

    update(id: string, item: UnitDto): Observable<void> {
        return this.http.put<void>(`${this.api}/${id}`, item);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.api}/${id}`);
    }

    // Методы для работы с иерархией
    hasChildren(id: string): Observable<boolean> {
        return this.http.get<boolean>(`${this.api}/${id}/has-children`);
    }

    getChildren(id: string): Observable<UnitDto[]> {
        return this.http.get<UnitDto[]>(`${this.api}/${id}/children`);
    }

    hasAssignedUnits(id: string): Observable<boolean> {
        return this.http.get<boolean>(`${this.api}/${id}/has-assigned`);
    }

    getAssignedUnits(id: string): Observable<UnitDto[]> {
        return this.http.get<UnitDto[]>(`${this.api}/${id}/assigned`);
    }

    // Методы для управления дочерними подразделениями
    addExistingChild(parentId: string, childId: string): Observable<void> {
        return this.http.post<void>(`${this.api}/${parentId}/add-exists-child/${childId}`, {});
    }

    removeChild(parentId: string, childId: string): Observable<void> {
        return this.http.post<void>(`${this.api}/${parentId}/remove-child/${childId}`, {});
    }

    // Методы для управления приданными подразделениями
    addAssignedUnit(unitId: string, assignedId: string): Observable<void> {
        return this.http.post<void>(`${this.api}/${unitId}/add-assigned/${assignedId}`, {});
    }

    removeAssignedUnit(unitId: string, assignedId: string): Observable<void> {
        return this.http.post<void>(`${this.api}/${unitId}/remove-assigned/${assignedId}`, {});
    }
}