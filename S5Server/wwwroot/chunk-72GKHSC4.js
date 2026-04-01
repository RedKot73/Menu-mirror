import {
  HttpClient,
  Injectable,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-IBDYQGEV.js";

// src/ServerService/shortDict.service.ts
var ShortDictService = class _ShortDictService {
  constructor(http) {
    this.http = http;
  }
  getAll(api) {
    return this.http.get(api);
  }
  get(api, id) {
    return this.http.get(`${api}/${id}`);
  }
  create(api, dto) {
    return this.http.post(api, dto);
  }
  update(api, id, dto) {
    return this.http.put(`${api}/${id}`, dto);
  }
  delete(api, id) {
    return this.http.delete(`${api}/${id}`);
  }
  //Работают по разному, не путать
  // GET /api/.../lookup - Получить список для автозаполнения
  // GET /api/.../sel_list - Получить список для селекта
  lookup(api, term, limit = 10) {
    return this.http.get(`${api}/lookup`, {
      params: { term, limit }
    });
  }
  //Работают по разному, не путать
  // GET /api/.../lookup - Получить список для автозаполнения
  // GET /api/.../sel_list - Получить список для селекта
  getSelectList(api) {
    return this.http.get(`${api}/sel_list`);
  }
  // Для каждого справочника создавайте отдельный сигнал через этот метод
  createItemsSignal(api) {
    const items = signal([], ...ngDevMode ? [{ debugName: "items" }] : []);
    this.getAll(api).subscribe(items.set);
    return items;
  }
  static \u0275fac = function ShortDictService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ShortDictService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ShortDictService, factory: _ShortDictService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ShortDictService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  ShortDictService
};
