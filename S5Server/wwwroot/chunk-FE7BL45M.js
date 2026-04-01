import {
  HttpClient,
  Injectable,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-IBDYQGEV.js";

// src/ServerService/dictForcesType.service.ts
var DictForcesTypeService = class _DictForcesTypeService {
  constructor(http) {
    this.http = http;
  }
  api = "/api/dict-forces-types";
  getAll() {
    return this.http.get(this.api);
  }
  get(id) {
    return this.http.get(`${this.api}/${id}`);
  }
  create(dto) {
    return this.http.post(this.api, dto);
  }
  update(id, dto) {
    return this.http.put(`${this.api}/${id}`, dto);
  }
  delete(id) {
    return this.http.delete(`${this.api}/${id}`);
  }
  //Работают по разному, не путать
  // GET /api/.../lookup - Получить список для автозаполнения
  // GET /api/.../sel_list - Получить список для селекта
  lookup(term, limit = 10) {
    return this.http.get(`${this.api}/lookup`, {
      params: { term, limit }
    });
  }
  // Создает сигнал для элементов справочника
  createItemsSignal() {
    return signal([]);
  }
  static \u0275fac = function DictForcesTypeService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DictForcesTypeService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DictForcesTypeService, factory: _DictForcesTypeService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DictForcesTypeService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  DictForcesTypeService
};
