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
  birthDate?: Date;
  nickName?: string;
  unitId: string;
  unitShortName: string;
  arrivedAt?: Date;
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
  changedBy: string;
  changedAt: Date;
}

export interface SoldierCreateDto {
  firstName: string;
  midleName?: string;
  lastName?: string;
  birthDate?: Date;
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
  providedIn: 'root',
})
export class SoldierService {
  readonly api = '/api/Soldier';
  private http = inject(HttpClient);

  createItemsSignal() {
    return signal<SoldierDto[]>([]);
  }

  // CRUD операции
  getAll(search?: string, unitId?: string): Observable<SoldierDto[]> {
    const params: Record<string, string> = {};
    if (search) {
      params['search'] = search;
    }
    if (unitId) {
      params['unitId'] = unitId;
    }

    return this.http.get<SoldierDto[]>(this.api, { params });
  }

  // Получить список по приданному подразделению
  getByAssigned(assignedUnitId: string, search?: string, limit?: number): Observable<SoldierDto[]> {
    const params: Record<string, string> = { assignedUnitId };
    if (search) {
      params['search'] = search;
    }
    if (limit) {
      params['limit'] = limit.toString();
    }

    return this.http.get<SoldierDto[]>(`${this.api}/by-assigned`, { params });
  }

  // Получить список по оперативному подразделению
  getByOperational(
    operationalUnitId: string,
    search?: string,
    limit?: number
  ): Observable<SoldierDto[]> {
    const params: Record<string, string> = { operationalUnitId };
    if (search) {
      params['search'] = search;
    }
    if (limit) {
      params['limit'] = limit.toString();
    }

    return this.http.get<SoldierDto[]>(`${this.api}/by-operational`, { params });
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
  /**
   * Назначает бойцу подразделение Приданий до...
   * @param id Soldier.id
   * @param unitId Unit.id
   * @returns void
   */
  assignAssigned(id: string, unitId: string | null): Observable<SoldierDto> {
    const targetId = unitId ?? '';
    return this.http.post<SoldierDto>(`${this.api}/${id}/assign-assigned/${targetId}`, {});
  }
  /**
   * Снимает назначение подразделения Приданий с бойца
   * @param id Soldier.id
   * @returns void
   */
  /*
  unassignAssigned(id: string): Observable<void> {
    return this.http.post<void>(`${this.api}/${id}/unassign-assigned`, {});
  }
*/
  /**
   * Назначает бойцу Оперативний підрозділ
   * @param id Soldier.id
   * @param unitId Unit.id
   * @returns void
   */
  assignOperational(id: string, unitId: string | null): Observable<SoldierDto> {
    const targetId = unitId ?? '';
    return this.http.post<SoldierDto>(`${this.api}/${id}/assign-operational/${targetId}`, {});
  }

  /**
   * Снимает назначение Оперативний підрозділ с бойца
   * @param id Soldier.id
   * @returns void
   */
  /*
  unassignOperational(id: string): Observable<void> {
    return this.http.post<void>(`${this.api}/${id}/unassign-operational`, {});
  }
  */
  move(id: string, newUnitId: string): Observable<SoldierDto> {
    return this.http.post<SoldierDto>(`${this.api}/${id}/move/${newUnitId}`, {});
  }
}
