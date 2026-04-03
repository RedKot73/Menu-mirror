import {
  ShortDictService
} from "./chunk-3X3FZO67.js";
import {
  Injectable,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-IKDNLDBK.js";

// src/ServerService/dictAreaType.service.ts
var DictAreaTypeService = class _DictAreaTypeService {
  api = "/api/dict-area-types";
  shortDictService = inject(ShortDictService);
  createItemsSignal() {
    return this.shortDictService.createItemsSignal(this.api);
  }
  getAll() {
    return this.shortDictService.getAll(this.api);
  }
  lookup(term, limit = 10) {
    return this.shortDictService.lookup(this.api, term, limit);
  }
  getById(id) {
    return this.shortDictService.get(this.api, id);
  }
  create(item) {
    return this.shortDictService.create(this.api, item);
  }
  update(id, item) {
    return this.shortDictService.update(this.api, id, item);
  }
  delete(id) {
    return this.shortDictService.delete(this.api, id);
  }
  getSelectList() {
    return this.shortDictService.getSelectList(this.api);
  }
  static \u0275fac = function DictAreaTypeService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DictAreaTypeService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DictAreaTypeService, factory: _DictAreaTypeService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DictAreaTypeService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  DictAreaTypeService
};
//# sourceMappingURL=chunk-SNWEUFQ2.js.map
