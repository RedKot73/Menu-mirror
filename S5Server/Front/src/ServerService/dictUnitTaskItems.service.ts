import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LookupDto } from '../app/shared/models/lookup.models';

export interface DictUnitTaskItemDto {
  id: string;
  value: string;
  comment?: string;
  templateCategoryId: string;
  templateCategory: string;
  unitTaskId: string;
}

export interface DictUnitTaskItemCreateDto {
  value: string;
  comment?: string;
  templateCategoryId: string;
  unitTaskId: string;
}

export type DictUnitTaskItem = DictUnitTaskItemDto;

@Injectable({
  providedIn: 'root',
})
export class DictUnitTaskItemsService {
  readonly api = '/api/dict-unit-task-items';
  private http = inject(HttpClient);

  createItemsSignal() {
    return signal<DictUnitTaskItem[]>([]);
  }

  /**
   * Отримати список елементів завдань підрозділів
   */
  getAll(
    search?: string,
    unitTaskId?: string,
    templateCategoryId?: string
  ): Observable<DictUnitTaskItem[]> {
    const params: Record<string, string> = {};
    if (search) {
      params['search'] = search;
    }
    if (unitTaskId) {
      params['unitTaskId'] = unitTaskId;
    }
    if (templateCategoryId) {
      params['templateCategoryId'] = templateCategoryId;
    }
    return this.http.get<DictUnitTaskItem[]>(this.api, { params });
  }

  /**
   * Отримати елемент завдання підрозділу за ID
   */
  getById(id: string): Observable<DictUnitTaskItem> {
    return this.http.get<DictUnitTaskItem>(`${this.api}/${id}`);
  }

  /**
   * Створити новий елемент завдання підрозділу
   */
  create(item: DictUnitTaskItemCreateDto): Observable<DictUnitTaskItem> {
    return this.http.post<DictUnitTaskItem>(this.api, item);
  }

  /**
   * Оновити елемент завдання підрозділу
   */
  update(id: string, item: DictUnitTaskItemDto): Observable<void> {
    return this.http.put<void>(`${this.api}/${id}`, item);
  }

  /**
   * Видалити елемент завдання підрозділу
   */
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

  /**
   * Отримати елементи завдання за UnitTaskId
   */
  getByUnitTask(unitTaskId: string): Observable<DictUnitTaskItem[]> {
    return this.http.get<DictUnitTaskItem[]>(`${this.api}/by-unit-task/${unitTaskId}`);
  }

  /**
   * Отримати елементи завдання за TemplateCategoryId
   */
  getByTemplateCategory(templateCategoryId: string): Observable<DictUnitTaskItem[]> {
    return this.http.get<DictUnitTaskItem[]>(
      `${this.api}/by-template-category/${templateCategoryId}`
    );
  }

  /**
   * Отримати елемент завдання за UnitTaskId та TemplateCategoryId
   */
  getTaskByTemplate(unitTaskId: string, templateCategoryId: string): Observable<DictUnitTaskItem> {
    return this.http.get<DictUnitTaskItem>(
      `${this.api}/by-task-and-template/${unitTaskId}/${templateCategoryId}`
    );
  }

  /**
   * Автокомпліт для пошуку елементів завдань
   */
  lookup(
    term: string,
    limit: number = 10,
    unitTaskId?: string,
    templateCategoryId?: string
  ): Observable<LookupDto[]> {
    const params: Record<string, string> = { term, limit: limit.toString() };
    if (unitTaskId) {
      params['unitTaskId'] = unitTaskId;
    }
    if (templateCategoryId) {
      params['templateCategoryId'] = templateCategoryId;
    }
    return this.http.get<LookupDto[]>(`${this.api}/lookup`, { params });
  }

  /**
   * Список для випадаючого списку (select) по конкретній категорії та завданню
   */
  getSelectList(unitTaskId?: string, templateCategoryId?: string): Observable<LookupDto[]> {
    const params: Record<string, string> = {};
    if (unitTaskId) {
      params['unitTaskId'] = unitTaskId;
    }
    if (templateCategoryId) {
      params['templateCategoryId'] = templateCategoryId;
    }
    return this.http.get<LookupDto[]>(`${this.api}/sel_list`, { params });
  }
}
