import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * DTO для вузла дерева кодифікатора
 */
export interface CityCodeTreeNodeDto {
  id: string;
  parentId?: string;
  categoryId: string;
  category?: string;
  value: string;
  hasChildren: boolean;
  children: CityCodeTreeNodeDto[];
}

/**
 * Статистика дерева кодифікатора
 */
export interface CityCodeTreeStats {
  totalNodes: number;
  maxDepth: number;
  nodesByCategory: Record<string, number>;
}

/**
 * Контекст вузла дерева
 */
export interface CityCodeTreeNodeContext {
  node: CityCodeTreeNodeDto;
  parents?: CityCodeTreeNodeDto[];
  children?: CityCodeTreeNodeDto[];
}

/**
 * Сервіс для роботи з деревом кодифікатора адміністративно-територіальних одиниць
 */
@Injectable({
  providedIn: 'root',
})
export class CityCodeTreeService {
  private http = inject(HttpClient);
  private readonly api = '/api/city-code-tree';

  /**
   * Отримати повне дерево кодифікатора або піддерево з вказаного вузла
   * @param parentId ID батьківського вузла (null = з кореня)
   * @param maxDepth Максимальна глибина дерева (0 = без обмежень)
   */
  getTree(parentId?: string, maxDepth?: number): Observable<CityCodeTreeNodeDto[]> {
    let params = new HttpParams();
    if (parentId) {
      params = params.set('parentId', parentId);
    }
    if (maxDepth && maxDepth > 0) {
      params = params.set('maxDepth', maxDepth.toString());
    }

    return this.http.get<CityCodeTreeNodeDto[]>(this.api, { params });
  }

  /**
   * Отримати піддерево для конкретного вузла
   * @param id ID вузла
   * @param maxDepth Максимальна глибина (0 = без обмежень)
   */
  getSubtree(id: string, maxDepth?: number): Observable<CityCodeTreeNodeDto> {
    let params = new HttpParams();
    if (maxDepth && maxDepth > 0) {
      params = params.set('maxDepth', maxDepth.toString());
    }

    return this.http.get<CityCodeTreeNodeDto>(`${this.api}/${id}`, { params });
  }

  /**
   * Отримати шлях (breadcrumb) до вузла від кореня
   * @param id ID вузла
   */
  getPath(id: string): Observable<CityCodeTreeNodeDto[]> {
    return this.http.get<CityCodeTreeNodeDto[]>(`${this.api}/${id}/path`);
  }

  /**
   * Пошук у дереві за текстом
   * @param search Текст для пошуку
   * @param categoryId Фільтр за категорією (опціонально)
   */
  search(search: string, categoryId?: string): Observable<CityCodeTreeNodeDto[]> {
    let params = new HttpParams().set('search', search);
    if (categoryId) {
      params = params.set('categoryId', categoryId);
    }

    return this.http.get<CityCodeTreeNodeDto[]>(`${this.api}/search`, { params });
  }

  /**
   * Отримати плоский список всіх вузлів дерева
   * @param parentId ID батьківського вузла (null = з кореня)
   */
  getFlat(parentId?: string): Observable<CityCodeTreeNodeDto[]> {
    let params = new HttpParams();
    if (parentId) {
      params = params.set('parentId', parentId);
    }

    return this.http.get<CityCodeTreeNodeDto[]>(`${this.api}/flat`, { params });
  }

  /**
   * Отримати статистику дерева
   * @param parentId ID батьківського вузла (null = з кореня)
   */
  getStats(parentId?: string): Observable<CityCodeTreeStats> {
    let params = new HttpParams();
    if (parentId) {
      params = params.set('parentId', parentId);
    }

    return this.http.get<CityCodeTreeStats>(`${this.api}/stats`, { params });
  }

  /**
   * Знайти вузол за ID і повернути його з контекстом (батьки + діти)
   * @param id ID вузла
   * @param includeParents Включити батьківські вузли (шлях)
   * @param includeChildren Включити дочірні вузли
   * @param childrenDepth Глибина дочірніх вузлів (0 = всі)
   */
  getNodeContext(
    id: string,
    includeParents: boolean = true,
    includeChildren: boolean = true,
    childrenDepth: number = 1
  ): Observable<CityCodeTreeNodeContext> {
    const params = new HttpParams()
      .set('includeParents', includeParents.toString())
      .set('includeChildren', includeChildren.toString())
      .set('childrenDepth', childrenDepth.toString());

    return this.http.get<CityCodeTreeNodeContext>(`${this.api}/${id}/context`, { params });
  }
}
