import {
  toDateOnly
} from "./chunk-W4R4MX4T.js";
import {
  S5App_ErrorHandler
} from "./chunk-KWLRG6HK.js";
import {
  HttpClient,
  HttpParams,
  Injectable,
  __spreadProps,
  __spreadValues,
  catchError,
  inject,
  setClassMetadata,
  signal,
  throwError,
  ɵɵdefineInjectable
} from "./chunk-IBDYQGEV.js";

// src/ServerService/soldier.service.ts
var SoldierService = class _SoldierService {
  http = inject(HttpClient);
  baseUrl = "/api/Soldier";
  /** Підготовка DTO до відправки: Date → DateOnly string */
  prepareForServer(dto) {
    return __spreadProps(__spreadValues({}, dto), {
      birthDate: toDateOnly(dto.birthDate),
      arrivedAt: toDateOnly(dto.arrivedAt),
      departedAt: toDateOnly(dto.departedAt)
    });
  }
  createItemsSignal() {
    return signal([]);
  }
  /**
   * Отримати всіх військовослужбовців (з фільтрацією)
   * GET /api/Soldier?search={search}&unitId={unitId}
   */
  getAll(search, unitId) {
    let params = new HttpParams();
    if (search) {
      params = params.set("search", search);
    }
    if (unitId) {
      params = params.set("unitId", unitId);
    }
    return this.http.get(this.baseUrl, { params }).pipe(catchError((error) => {
      const message = S5App_ErrorHandler.handleHttpError(error, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u043E\u0442\u0440\u0438\u043C\u0430\u0442\u0438 \u0441\u043F\u0438\u0441\u043E\u043A \u0432\u0456\u0439\u0441\u044C\u043A\u043E\u0432\u043E\u0441\u043B\u0443\u0436\u0431\u043E\u0432\u0446\u0456\u0432");
      return throwError(() => new Error(message));
    }));
  }
  /**
   * Об'єднаний перелік військовослужбовців за підрозділом
   * GET /api/Soldier/by-unit?unitId={unitId}
   */
  getByUnit(unitId) {
    let params = new HttpParams();
    params = params.set("unitId", unitId);
    return this.http.get(`${this.baseUrl}/by-unit`, { params }).pipe(catchError((error) => {
      const message = S5App_ErrorHandler.handleHttpError(error, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u043E\u0442\u0440\u0438\u043C\u0430\u0442\u0438 \u043F\u0435\u0440\u0435\u043B\u0456\u043A \u0432\u0456\u0439\u0441\u044C\u043A\u043E\u0432\u043E\u0441\u043B\u0443\u0436\u0431\u043E\u0432\u0446\u0456\u0432 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0443");
      return throwError(() => new Error(message));
    }));
  }
  /**
   * Отримати перелік за приданим підрозділом
   * GET /api/Soldier/by-assigned?assignedUnitId={id}&search={search}&limit={limit}
   */
  getByAssigned(assignedUnitId, search, limit) {
    let params = new HttpParams();
    params = params.set("assignedUnitId", assignedUnitId);
    if (search) {
      params = params.set("search", search);
    }
    if (limit) {
      params = params.set("limit", limit.toString());
    }
    return this.http.get(`${this.baseUrl}/by-assigned`, { params }).pipe(catchError((error) => {
      const message = S5App_ErrorHandler.handleHttpError(error, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u043E\u0442\u0440\u0438\u043C\u0430\u0442\u0438 \u043F\u0440\u0438\u0434\u0430\u043D\u0438\u0445 \u0432\u0456\u0439\u0441\u044C\u043A\u043E\u0432\u043E\u0441\u043B\u0443\u0436\u0431\u043E\u0432\u0446\u0456\u0432");
      return throwError(() => new Error(message));
    }));
  }
  /**
   * Отримати перелік за оперативним підрозділом
   * GET /api/Soldier/by-involved?involvedUnitId={id}&search={search}&limit={limit}
   */
  getByInvolved(involvedUnitId, search, limit) {
    let params = new HttpParams();
    params = params.set("involvedUnitId", involvedUnitId);
    if (search) {
      params = params.set("search", search);
    }
    if (limit) {
      params = params.set("limit", limit.toString());
    }
    return this.http.get(`${this.baseUrl}/by-involved`, { params }).pipe(catchError((error) => {
      const message = S5App_ErrorHandler.handleHttpError(error, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u043E\u0442\u0440\u0438\u043C\u0430\u0442\u0438 \u0437\u0430\u0434\u0456\u044F\u043D\u0438\u0445 \u0432\u0456\u0439\u0441\u044C\u043A\u043E\u0432\u043E\u0441\u043B\u0443\u0436\u0431\u043E\u0432\u0446\u0456\u0432");
      return throwError(() => new Error(message));
    }));
  }
  /**
   * Lookup для автокомпліту
   * GET /api/Soldier/lookup?term={term}&limit={limit}
   */
  lookup(term, limit = 10) {
    let params = new HttpParams();
    params = params.set("term", term);
    params = params.set("limit", limit.toString());
    return this.http.get(`${this.baseUrl}/lookup`, { params }).pipe(catchError((error) => {
      const message = S5App_ErrorHandler.handleHttpError(error, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u0432\u0438\u043A\u043E\u043D\u0430\u0442\u0438 \u043F\u043E\u0448\u0443\u043A \u0432\u0456\u0439\u0441\u044C\u043A\u043E\u0432\u043E\u0441\u043B\u0443\u0436\u0431\u043E\u0432\u0446\u0456\u0432");
      return throwError(() => new Error(message));
    }));
  }
  /**
   * Отримати військовослужбовця за ID
   * GET /api/Soldier/{id}
   */
  getById(id) {
    return this.http.get(`${this.baseUrl}/${id}`).pipe(catchError((error) => {
      const message = S5App_ErrorHandler.handleHttpError(error, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u043E\u0442\u0440\u0438\u043C\u0430\u0442\u0438 \u0434\u0430\u043D\u0456 \u0432\u0456\u0439\u0441\u044C\u043A\u043E\u0432\u043E\u0441\u043B\u0443\u0436\u0431\u043E\u0432\u0446\u044F");
      return throwError(() => new Error(message));
    }));
  }
  /**
   * Створити військовослужбовця
   * POST /api/Soldier
   */
  create(item) {
    return this.http.post(this.baseUrl, this.prepareForServer(item)).pipe(catchError((error) => {
      const message = S5App_ErrorHandler.handleHttpError(error, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u0441\u0442\u0432\u043E\u0440\u0438\u0442\u0438 \u0432\u0456\u0439\u0441\u044C\u043A\u043E\u0432\u043E\u0441\u043B\u0443\u0436\u0431\u043E\u0432\u0446\u044F");
      return throwError(() => new Error(message));
    }));
  }
  /**
   * Оновити військовослужбовця
   * PUT /api/Soldier/{id}
   */
  update(id, item) {
    return this.http.put(`${this.baseUrl}/${id}`, this.prepareForServer(item)).pipe(catchError((error) => {
      const message = S5App_ErrorHandler.handleHttpError(error, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u043E\u043D\u043E\u0432\u0438\u0442\u0438 \u0434\u0430\u043D\u0456 \u0432\u0456\u0439\u0441\u044C\u043A\u043E\u0432\u043E\u0441\u043B\u0443\u0436\u0431\u043E\u0432\u0446\u044F");
      return throwError(() => new Error(message));
    }));
  }
  /**
   * Видалити військовослужбовця
   * DELETE /api/Soldier/{id}
   */
  delete(id) {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(catchError((error) => {
      const message = S5App_ErrorHandler.handleHttpError(error, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u0432\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u0432\u0456\u0439\u0441\u044C\u043A\u043E\u0432\u043E\u0441\u043B\u0443\u0436\u0431\u043E\u0432\u0446\u044F");
      return throwError(() => new Error(message));
    }));
  }
  /**
   * Призначити бійцю підрозділ «Приданий до»
   * POST /api/Soldier/{id}/assign-assigned/{unitId}
   */
  assignAssigned(id, unitId) {
    const targetId = unitId ?? "";
    return this.http.post(`${this.baseUrl}/${id}/assign-assigned/${targetId}`, {}).pipe(catchError((error) => {
      const message = S5App_ErrorHandler.handleHttpError(error, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u043F\u0440\u0438\u0437\u043D\u0430\u0447\u0438\u0442\u0438 \u043F\u0440\u0438\u0434\u0430\u043D\u0438\u0439 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B");
      return throwError(() => new Error(message));
    }));
  }
  /**
   * Призначити бійцю оперативний підрозділ
   * POST /api/Soldier/{id}/assign-involved/{unitId}
   */
  assignInvolved(id, unitId) {
    const targetId = unitId ?? "";
    return this.http.post(`${this.baseUrl}/${id}/assign-involved/${targetId}`, {}).pipe(catchError((error) => {
      const message = S5App_ErrorHandler.handleHttpError(error, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u043F\u0440\u0438\u0437\u043D\u0430\u0447\u0438\u0442\u0438 \u043E\u043F\u0435\u0440\u0430\u0442\u0438\u0432\u043D\u0438\u0439 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B");
      return throwError(() => new Error(message));
    }));
  }
  /**
   * Перемістити бійця до іншого підрозділу
   * POST /api/Soldier/{id}/move/{newUnitId}
   */
  move(id, newUnitId) {
    return this.http.post(`${this.baseUrl}/${id}/move/${newUnitId}`, {}).pipe(catchError((error) => {
      const message = S5App_ErrorHandler.handleHttpError(error, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u043F\u0435\u0440\u0435\u043C\u0456\u0441\u0442\u0438\u0442\u0438 \u0432\u0456\u0439\u0441\u044C\u043A\u043E\u0432\u043E\u0441\u043B\u0443\u0436\u0431\u043E\u0432\u0446\u044F");
      return throwError(() => new Error(message));
    }));
  }
  static \u0275fac = function SoldierService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SoldierService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _SoldierService, factory: _SoldierService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SoldierService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  SoldierService
};
