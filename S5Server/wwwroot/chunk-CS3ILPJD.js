import {
  HttpClient,
  Injectable,
  inject,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable
} from "./chunk-QBB2I2JI.js";

// src/ServerService/dictAreas.service.ts
var DictAreasService = class _DictAreasService {
  api = "/api/dict-areas";
  http = inject(HttpClient);
  createItemsSignal() {
    return signal([]);
  }
  getAll(search, areaTypeId, cityCodeId) {
    const params = {};
    if (search) {
      params["search"] = search;
    }
    if (areaTypeId) {
      params["areaTypeId"] = areaTypeId;
    }
    if (cityCodeId) {
      params["cityCodeId"] = cityCodeId;
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
  lookup(term, areaTypeId, limit = 10) {
    const params = { term, limit: limit.toString() };
    if (areaTypeId) {
      params["areaTypeId"] = areaTypeId;
    }
    return this.http.get(`${this.api}/lookup`, { params });
  }
  // Список для випадаючого списку (select)
  getSelectList(areaTypeId) {
    const params = {};
    if (areaTypeId) {
      params["areaTypeId"] = areaTypeId;
    }
    return this.http.get(`${this.api}/sel_list`, { params });
  }
  // Отримати райони за типом РВЗ
  getByAreaType(areaTypeId) {
    return this.http.get(`${this.api}/by-area-type/${areaTypeId}`);
  }
  // Отримати райони за кодифікатором
  getByCityCode(cityCodeId) {
    return this.http.get(`${this.api}/by-city-code/${cityCodeId}`);
  }
  buildCityCodeDisplayValue(info) {
    if (!info) {
      return "";
    }
    const parts = [];
    if (info.level4) {
      parts.push(info.level4Cat ? `${info.level4} ${info.level4Cat}` : info.level4);
    }
    if (info.level3) {
      parts.push(info.level3Cat ? `${info.level3} ${info.level3Cat}` : info.level3);
    }
    if (info.level2) {
      parts.push(info.level2Cat ? `${info.level2} ${info.level2Cat}` : info.level2);
    }
    if (info.level1) {
      parts.push(info.level1Cat ? `${info.level1} ${info.level1Cat}` : info.level1);
    }
    if (info.levelExt) {
      parts.push(info.levelExtCat ? `${info.levelExt} ${info.levelExtCat}` : `\u0420\u0430\u0439\u043E\u043D: ${info.levelExt}`);
    }
    return parts.length > 0 ? parts.join(", ") : info.cityCode || "";
  }
  static \u0275fac = function DictAreasService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DictAreasService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DictAreasService, factory: _DictAreasService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DictAreasService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  DictAreasService
};
//# sourceMappingURL=chunk-CS3ILPJD.js.map
