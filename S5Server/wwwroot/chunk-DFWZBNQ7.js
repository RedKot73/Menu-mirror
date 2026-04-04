import {
  GraphqlDataService
} from "./chunk-FTXZ36WV.js";
import {
  Injectable,
  catchError,
  inject,
  map,
  of,
  setClassMetadata,
  shareReplay,
  switchMap,
  take,
  timer,
  ɵɵdefineInjectable
} from "./chunk-CK6AJVHQ.js";

// src/app/core/services/system-time.service.ts
var SystemTimeService = class _SystemTimeService {
  graphqlDataService = inject(GraphqlDataService);
  utcTime$;
  constructor() {
    this.utcTime$ = this.graphqlDataService.getServerTime().pipe(
      take(1),
      catchError(() => of((/* @__PURE__ */ new Date()).toISOString())),
      // fallback to local time on error
      switchMap((serverTimeStr) => {
        const serverTime = new Date(serverTimeStr);
        const serverTimeMs = serverTime.getTime();
        const startTime = Date.now();
        return timer(0, 1e3).pipe(map(() => {
          const elapsed = Date.now() - startTime;
          return new Date(serverTimeMs + elapsed);
        }));
      }),
      shareReplay(1)
    );
  }
  static \u0275fac = function SystemTimeService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SystemTimeService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _SystemTimeService, factory: _SystemTimeService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SystemTimeService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();

export {
  SystemTimeService
};
//# sourceMappingURL=chunk-DFWZBNQ7.js.map
