import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LookupDto } from '../app/shared/models/lookup.models';

export interface UnitDto {
    id: string;
    parentId?: string;
    parentShortName?: string;
    assignedUnitId?: string;
    assignedShortName?: string;
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

export interface UnitTreeItemDto extends UnitDto {
    hasChildren: boolean;
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
        const params: any = {};
        if (search) {params.search = search;}
        if (parentId) {params.parentId = parentId;}
        
        return this.http.get<UnitDto[]>(this.api, { params });
    }

    // Специальный метод для дерева с ленивой загрузкой
    getTreeItems(search?: string, parentId?: string): Observable<UnitTreeItemDto[]> {
        const params: any = {};
        if (search) {params.search = search;}
        if (parentId !== undefined) {params.parentId = parentId;}
        
        return this.http.get<UnitTreeItemDto[]>(this.api, { params });
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

    //Работают по разному, не путать
    // GET /api/.../lookup - Получить список для автозаполнения
    // GET /api/.../sel_list - Получить список для селекта
    lookup(term: string, limit: number = 10): Observable<LookupDto[]> {
        const params = { term, limit: limit.toString() };
        return this.http.get<LookupDto[]>(`${this.api}/lookup`, { params });
    }

    //Работают по разному, не путать
    // GET /api/.../lookup - Получить список для автозаполнения
    // GET /api/.../sel_list - Получить список для селекта
    getSelectList(): Observable<LookupDto[]> {
        return this.http.get<LookupDto[]>(`${this.api}/sel_list`);
    }
}