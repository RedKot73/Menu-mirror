import { Injectable, inject, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { LookupDto } from '../app/shared/models/lookup.models';
import { ShortDictService, ShortDictDto } from './shortDict.service';

export type DictCityCategory = ShortDictDto;

@Injectable({
  providedIn: 'root',
})
export class DictCityCategoryService {
  readonly api = '/api/dict-city-categories';
  private shortDictService = inject(ShortDictService);

  createItemsSignal(): WritableSignal<DictCityCategory[]> {
    return this.shortDictService.createItemsSignal(this.api);
  }

  getAll(): Observable<DictCityCategory[]> {
    return this.shortDictService.getAll(this.api);
  }

  lookup(term: string, limit: number = 10): Observable<LookupDto[]> {
    return this.shortDictService.lookup(this.api, term, limit);
  }

  getById(id: string): Observable<DictCityCategory> {
    return this.shortDictService.get(this.api, id);
  }

  create(item: Omit<DictCityCategory, 'id'>): Observable<DictCityCategory> {
    return this.shortDictService.create(this.api, item);
  }

  update(id: string, item: Omit<DictCityCategory, 'id'>): Observable<DictCityCategory> {
    return this.shortDictService.update(this.api, id, item) as Observable<DictCityCategory>;
  }

  delete(id: string): Observable<object> {
    return this.shortDictService.delete(this.api, id);
  }

  getSelectList(): Observable<LookupDto[]> {
    return this.shortDictService.getSelectList(this.api);
  }
}
