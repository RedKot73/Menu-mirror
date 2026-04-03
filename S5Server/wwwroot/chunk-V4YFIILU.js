import {
  HttpClient,
  Injectable,
  inject,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable
} from "./chunk-IKDNLDBK.js";

// src/ServerService/dictDroneModel.service.ts
var DictDroneModelService = class _DictDroneModelService {
  api = "/api/dict-drone-models";
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
  getByDroneType(droneTypeId) {
    return this.http.get(`${this.api}/by-type/${droneTypeId}`);
  }
  lookupByType(droneTypeId, term = "", limit = 10) {
    const params = { droneTypeId, term, limit: limit.toString() };
    return this.http.get(`${this.api}/lookup-by-type`, { params });
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
  static \u0275fac = function DictDroneModelService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DictDroneModelService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DictDroneModelService, factory: _DictDroneModelService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DictDroneModelService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  DictDroneModelService
};
//# sourceMappingURL=chunk-V4YFIILU.js.map
