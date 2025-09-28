import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface UnitDto {
    id: string;
    parentId?: string;
    assignedUnitId?: string;
    name: string;
    shortName?: string;
    militaryNumber?: string;
    forceTypeId?: string;
    unitTypeId?: string;
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
    private http = inject(HttpClient);

    createItemsSignal(apiUrl: string) {
        return signal<UnitDto[]>([]);
    }

    // CRUD операции
    getAll(apiUrl: string, search?: string, parentId?: string): Observable<UnitDto[]> {
        let params: any = {};
        if (search) params.search = search;
        if (parentId) params.parentId = parentId;
        
        return this.http.get<UnitDto[]>(apiUrl, { params });
    }

    getById(apiUrl: string, id: string): Observable<UnitDto> {
        return this.http.get<UnitDto>(`${apiUrl}/${id}`);
    }

    create(apiUrl: string, item: UnitCreateDto): Observable<UnitDto> {
        return this.http.post<UnitDto>(apiUrl, item);
    }

    update(apiUrl: string, id: string, item: UnitDto): Observable<void> {
        return this.http.put<void>(`${apiUrl}/${id}`, item);
    }

    delete(apiUrl: string, id: string): Observable<void> {
        return this.http.delete<void>(`${apiUrl}/${id}`);
    }

    // Методы для работы с иерархией
    hasChildren(apiUrl: string, id: string): Observable<boolean> {
        return this.http.get<boolean>(`${apiUrl}/${id}/has-children`);
    }

    getChildren(apiUrl: string, id: string): Observable<UnitDto[]> {
        return this.http.get<UnitDto[]>(`${apiUrl}/${id}/children`);
    }

    hasAssignedUnits(apiUrl: string, id: string): Observable<boolean> {
        return this.http.get<boolean>(`${apiUrl}/${id}/has-assigned`);
    }

    getAssignedUnits(apiUrl: string, id: string): Observable<UnitDto[]> {
        return this.http.get<UnitDto[]>(`${apiUrl}/${id}/assigned`);
    }

    // Методы для управления дочерними подразделениями
    addExistingChild(apiUrl: string, parentId: string, childId: string): Observable<void> {
        return this.http.post<void>(`${apiUrl}/${parentId}/add-exists-child/${childId}`, {});
    }

    removeChild(apiUrl: string, parentId: string, childId: string): Observable<void> {
        return this.http.post<void>(`${apiUrl}/${parentId}/remove-child/${childId}`, {});
    }

    // Методы для управления приданными подразделениями
    addAssignedUnit(apiUrl: string, unitId: string, assignedId: string): Observable<void> {
        return this.http.post<void>(`${apiUrl}/${unitId}/add-assigned/${assignedId}`, {});
    }

    removeAssignedUnit(apiUrl: string, unitId: string, assignedId: string): Observable<void> {
        return this.http.post<void>(`${apiUrl}/${unitId}/remove-assigned/${assignedId}`, {});
    }
}