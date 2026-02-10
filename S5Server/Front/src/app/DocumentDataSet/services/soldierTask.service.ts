import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SoldierTaskDto {
  id: string;
  unitTaskId: string;
  soldierId: string;
  externId: number | null;
  firstName: string;
  midleName: string | null;
  lastName: string | null;
  fio: string;
  nickName: string | null;
  unitId: string;
  unitShortName: string;
  arrivedAt: string | null; // DateOnly as ISO string
  departedAt: string | null; // DateOnly as ISO string
  assignedUnitId: string | null;
  assignedUnitShortName: string | null;
  involvedUnitId: string | null;
  involvedUnitShortName: string | null;
  rankId: string;
  rankShortValue: string;
  positionId: string;
  positionValue: string;
  stateId: string;
  stateValue: string;
  comment: string | null;
  changedBy: string;
  validFrom: string; // DateTime as ISO string
}

export interface SoldierCountDto {
  unitTaskId: string;
  count: number;
}

@Injectable({
  providedIn: 'root',
})
export class SoldierTaskService {
  readonly api = '/api/soldier-tasks';
  private http = inject(HttpClient);

  /**
   * Отримати бійця за ID (всі його завдання)
   */
  get(id: string): Observable<SoldierTaskDto[]> {
    return this.http.get<SoldierTaskDto[]>(`${this.api}/${id}`);
  }

  /**
   * Отримати всіх бійців для конкретного завдання підрозділу
   * GET /api/soldier-tasks?unitTaskId={unitTaskId}
   */
  getByUnitTask(unitTaskId: string): Observable<SoldierTaskDto[]> {
    const params = new HttpParams().set('unitTaskId', unitTaskId);
    return this.http.get<SoldierTaskDto[]>(this.api, { params });
  }

  /**
   * Отримати всіх бійців для підрозділу (для незбереженого UnitTask)
   * GET /api/soldier-tasks/by-unit/{unitId}
   */
  getByUnit(unitId: string): Observable<SoldierTaskDto[]> {
    return this.http.get<SoldierTaskDto[]>(`${this.api}/by-unit/${unitId}`);
  }

  /**
   * Видалити всіх бійців для конкретного завдання
   * DELETE /api/soldier-tasks/by-unit-task/{unitTaskId}
   */
  deleteByUnitTask(unitTaskId: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/by-unit-task/${unitTaskId}`);
  }

  /**
   * Отримати кількість бійців для завдання
   * GET /api/soldier-tasks/count/{unitTaskId}
   */
  getCount(unitTaskId: string): Observable<SoldierCountDto> {
    return this.http.get<SoldierCountDto>(`${this.api}/count/${unitTaskId}`);
  }
}
