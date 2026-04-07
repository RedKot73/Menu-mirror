import {
  HttpClient,
  Injectable,
  inject,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable
} from "./chunk-6223PFVC.js";

// src/ServerService/dictDroneType.service.ts
var DictDroneTypeService = class _DictDroneTypeService {
  api = "/api/dict-drone-types";
  http = inject(HttpClient);
  createItemsSignal() {
    return signal([]);
  }
  getAll() {
    return this.http.get(this.api);
  }
  lookup(term, limit = 10) {
    const params = { term, limit: limit.toString() };
    return this.http.get(`${this.api}/lookup`, { params });
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
  getSelectList() {
    return this.http.get(`${this.api}/sel_list`);
  }
  static \u0275fac = function DictDroneTypeService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DictDroneTypeService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DictDroneTypeService, factory: _DictDroneTypeService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DictDroneTypeService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  DictDroneTypeService
};
//# sourceMappingURL=chunk-YQOQZVE5.js.map
