import {
  HttpClient,
  Injectable,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-6223PFVC.js";

// src/ServerService/dictTemplateCategories.service.ts
var DictTemplateCategoriesService = class _DictTemplateCategoriesService {
  http;
  api = "/api/dict-template-categories";
  constructor(http) {
    this.http = http;
  }
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
  //Работают по разному, не путать
  // GET /api/.../lookup - Получить список для автозаполнения
  // GET /api/.../sel_list - Получить список для селекта
  getSelectList() {
    return this.http.get(`${this.api}/sel_list`);
  }
  // Создает сигнал для элементов справочника
  createItemsSignal() {
    return signal([]);
  }
  static \u0275fac = function DictTemplateCategoriesService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DictTemplateCategoriesService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DictTemplateCategoriesService, factory: _DictTemplateCategoriesService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DictTemplateCategoriesService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  DictTemplateCategoriesService
};
//# sourceMappingURL=chunk-B4CHDVDK.js.map
