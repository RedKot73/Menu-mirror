import {
  HttpClient,
  Injectable,
  inject,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable
} from "./chunk-IBDYQGEV.js";

// src/ServerService/dictUnitTasks.service.ts
var DictUnitTasksService = class _DictUnitTasksService {
  api = "/api/dict-unit-tasks";
  http = inject(HttpClient);
  createItemsSignal() {
    return signal([]);
  }
  getAll(search) {
    const params = {};
    if (search) {
      params["search"] = search;
    }
    return this.http.get(this.api, { params });
  }
  getById(id) {
    return this.http.get(`${this.api}/${id}`);
  }
  create(item) {
    return this.http.post(this.api, item);
  }
  update(id, item) {
    return this.http.put(`${this.api}/${id}`, item);
  }
  delete(id) {
    return this.http.delete(`${this.api}/${id}`);
  }
  // Lookup для автокомпліта
  lookup(term, limit = 10) {
    const params = { term, limit: limit.toString() };
    return this.http.get(`${this.api}/lookup`, { params });
  }
  // Список для випадаючого списку (select)
  getSelectList() {
    return this.http.get(`${this.api}/sel_list`);
  }
  static \u0275fac = function DictUnitTasksService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DictUnitTasksService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DictUnitTasksService, factory: _DictUnitTasksService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DictUnitTasksService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  DictUnitTasksService
};
