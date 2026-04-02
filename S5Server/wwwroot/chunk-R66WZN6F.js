import {
  HttpClient,
  Injectable,
  inject,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable
} from "./chunk-QBB2I2JI.js";

// src/ServerService/dictRanks.service.ts
var DictRankService = class _DictRankService {
  api = "/api/DictRank";
  http = inject(HttpClient);
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
  createItemsSignal() {
    return signal([]);
  }
  get(api, id) {
    return this.http.get(`${api}/${id}`);
  }
  //Работают по разному, не путать
  // GET /api/dict-ranks/lookup - Получить список для автозаполнения
  // GET /api/dict-ranks/sel_list - Получить список для селекта
  getSelectList() {
    return this.http.get(`${this.api}/sel_list`);
  }
  static \u0275fac = function DictRankService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DictRankService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DictRankService, factory: _DictRankService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DictRankService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  DictRankService
};
//# sourceMappingURL=chunk-R66WZN6F.js.map
