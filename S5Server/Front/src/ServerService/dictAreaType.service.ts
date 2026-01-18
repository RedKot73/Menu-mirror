import { Injectable, inject, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { LookupDto } from '../app/shared/models/lookup.models';
import { ShortDictService, ShortDictDto } from './shortDict.service';

export type DictAreaType = ShortDictDto

@Injectable({
  providedIn: 'root',
})
export class DictAreaTypeService {
  readonly api = '/api/dict-area-types';
  private shortDictService = inject(ShortDictService);

  createItemsSignal(): WritableSignal<DictAreaType[]> {
    return this.shortDictService.createItemsSignal(this.api);
  }

  getAll(): Observable<DictAreaType[]> {
    return this.shortDictService.getAll(this.api);
  }

  lookup(term: string, limit: number = 10): Observable<LookupDto[]> {
    return this.shortDictService.lookup(this.api, term, limit);
  }

  getById(id: string): Observable<DictAreaType> {
    return this.shortDictService.get(this.api, id);
  }

  create(item: Omit<DictAreaType, 'id'>): Observable<DictAreaType> {
    return this.shortDictService.create(this.api, item);
  }

  update(id: string, item: Omit<DictAreaType, 'id'>): Observable<DictAreaType> {
    return this.shortDictService.update(this.api, id, item) as Observable<DictAreaType>;
  }

  delete(id: string): Observable<object> {
    return this.shortDictService.delete(this.api, id);
  }

  getSelectList(): Observable<LookupDto[]> {
    return this.shortDictService.getSelectList(this.api);
  }
}
