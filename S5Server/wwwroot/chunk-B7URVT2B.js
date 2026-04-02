import {
  S5App_ErrorHandler
} from "./chunk-SWYNU52L.js";
import {
  HttpClient,
  HttpParams,
  Injectable,
  catchError,
  inject,
  of,
  setClassMetadata,
  signal,
  throwError,
  ɵɵdefineInjectable
} from "./chunk-WAYE7YII.js";

// src/ServerService/unit.service.ts
var UnitService = class _UnitService {
  http = inject(HttpClient);
  baseUrl = "/api/Unit";
  createItemsSignal() {
    return signal([]);
  }
  /**
   * Отримати всі підрозділи (з фільтрацією)
   * GET /api/Unit?search={search}&parentId={parentId}
   */
  getAll(search, parentId) {
    let params = new HttpParams();
    if (search) {
      params = params.set("search", search);
    }
    if (parentId) {
      params = params.set("parentId", parentId);
    }
    return this.http.get(this.baseUrl, { params }).pipe(catchError((error) => {
      const message = S5App_ErrorHandler.handleHttpError(error, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u043E\u0442\u0440\u0438\u043C\u0430\u0442\u0438 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0438");
      return throwError(() => new Error(message));
    }));
  }
  /**
   * Отримати елементи дерева з ленівим завантаженням
   * GET /api/Unit?search={search}&parentId={parentId}
   */
  getTreeItems(search, parentId) {
    let params = new HttpParams();
    if (search) {
      params = params.set("search", search);
    }
    if (parentId !== void 0) {
      params = params.set("parentId", parentId);
    }
    return this.http.get(this.baseUrl, { params }).pipe(catchError((error) => {
      const message = S5App_ErrorHandler.handleHttpError(error, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u043E\u0442\u0440\u0438\u043C\u0430\u0442\u0438 \u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0438 \u0434\u0435\u0440\u0435\u0432\u0430 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0456\u0432");
      return throwError(() => new Error(message));
    }));
  }
  /**
   * Отримати підрозділ за ID
   * GET /api/Unit/{id}
   */
  getById(id) {
    return this.http.get(`${this.baseUrl}/${id}`).pipe(catchError((error) => {
      const message = S5App_ErrorHandler.handleHttpError(error, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u043E\u0442\u0440\u0438\u043C\u0430\u0442\u0438 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B");
      return throwError(() => new Error(message));
    }));
  }
  /**
   * Створити підрозділ
   * POST /api/Unit
   */
  create(item) {
    return this.http.post(this.baseUrl, item).pipe(catchError((error) => {
      const message = S5App_ErrorHandler.handleHttpError(error, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u0441\u0442\u0432\u043E\u0440\u0438\u0442\u0438 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B");
      return throwError(() => new Error(message));
    }));
  }
  /**
   * Оновити підрозділ
   * PUT /api/Unit/{id}
   */
  update(id, item) {
    return this.http.put(`${this.baseUrl}/${id}`, item).pipe(catchError((error) => {
      const message = S5App_ErrorHandler.handleHttpError(error, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u043E\u043D\u043E\u0432\u0438\u0442\u0438 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B");
      return throwError(() => new Error(message));
    }));
  }
  /**
   * Видалити підрозділ
   * DELETE /api/Unit/{id}
   */
  delete(id) {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(catchError((error) => {
      const message = S5App_ErrorHandler.handleHttpError(error, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u0432\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B");
      return throwError(() => new Error(message));
    }));
  }
  /**
   * Перевірити наявність дочірніх підрозділів
   * GET /api/Unit/{id}/has-children
   */
  hasChildren(id) {
    return this.http.get(`${this.baseUrl}/${id}/has-children`).pipe(catchError((error) => {
      const message = S5App_ErrorHandler.handleHttpError(error, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u043F\u0435\u0440\u0435\u0432\u0456\u0440\u0438\u0442\u0438 \u043D\u0430\u044F\u0432\u043D\u0456\u0441\u0442\u044C \u0434\u043E\u0447\u0456\u0440\u043D\u0456\u0445 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0456\u0432");
      return throwError(() => new Error(message));
    }));
  }
  /**
   * Отримати дочірні підрозділи
   * GET /api/Unit/{id}/children
   */
  getChildren(id) {
    return this.http.get(`${this.baseUrl}/${id}/children`).pipe(catchError((error) => {
      const message = S5App_ErrorHandler.handleHttpError(error, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u043E\u0442\u0440\u0438\u043C\u0430\u0442\u0438 \u0434\u043E\u0447\u0456\u0440\u043D\u0456 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0438");
      return throwError(() => new Error(message));
    }));
  }
  /**
   * Перевірити наявність приданих підрозділів
   * GET /api/Unit/{id}/has-assigned
   */
  hasAssignedUnits(id) {
    return this.http.get(`${this.baseUrl}/${id}/has-assigned`).pipe(catchError((error) => {
      const message = S5App_ErrorHandler.handleHttpError(error, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u043F\u0435\u0440\u0435\u0432\u0456\u0440\u0438\u0442\u0438 \u043D\u0430\u044F\u0432\u043D\u0456\u0441\u0442\u044C \u043F\u0440\u0438\u0434\u0430\u043D\u0438\u0445 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0456\u0432");
      return throwError(() => new Error(message));
    }));
  }
  /**
   * Отримати придані підрозділи
   * GET /api/Unit/{id}/assigned
   */
  getAssignedUnits(id) {
    return this.http.get(`${this.baseUrl}/${id}/assigned`).pipe(catchError((error) => {
      const message = S5App_ErrorHandler.handleHttpError(error, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u043E\u0442\u0440\u0438\u043C\u0430\u0442\u0438 \u043F\u0440\u0438\u0434\u0430\u043D\u0456 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0438");
      return throwError(() => new Error(message));
    }));
  }
  /**
   * Додати існуючий дочірній підрозділ
   * POST /api/Unit/{parentId}/add-exists-child/{childId}
   */
  addExistingChild(parentId, childId) {
    return this.http.post(`${this.baseUrl}/${parentId}/add-exists-child/${childId}`, {}).pipe(catchError((error) => {
      const message = S5App_ErrorHandler.handleHttpError(error, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u0434\u043E\u0434\u0430\u0442\u0438 \u0434\u043E\u0447\u0456\u0440\u043D\u0456\u0439 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B");
      return throwError(() => new Error(message));
    }));
  }
  /**
   * Прибрати дочірній підрозділ
   * POST /api/Unit/{parentId}/remove-child/{childId}
   */
  removeChild(parentId, childId) {
    return this.http.post(`${this.baseUrl}/${parentId}/remove-child/${childId}`, {}).pipe(catchError((error) => {
      const message = S5App_ErrorHandler.handleHttpError(error, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u043F\u0440\u0438\u0431\u0440\u0430\u0442\u0438 \u0434\u043E\u0447\u0456\u0440\u043D\u0456\u0439 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B");
      return throwError(() => new Error(message));
    }));
  }
  /**
   * Додати приданий підрозділ
   * POST /api/Unit/{unitId}/add-assigned/{assignedId}
   */
  addAssignedUnit(unitId, assignedId) {
    return this.http.post(`${this.baseUrl}/${unitId}/add-assigned/${assignedId}`, {}).pipe(catchError((error) => {
      const message = S5App_ErrorHandler.handleHttpError(error, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u0434\u043E\u0434\u0430\u0442\u0438 \u043F\u0440\u0438\u0434\u0430\u043D\u0438\u0439 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B");
      return throwError(() => new Error(message));
    }));
  }
  /**
   * Прибрати приданий підрозділ
   * POST /api/Unit/{unitId}/remove-assigned/{assignedId}
   */
  removeAssignedUnit(unitId, assignedId) {
    return this.http.post(`${this.baseUrl}/${unitId}/remove-assigned/${assignedId}`, {}).pipe(catchError((error) => {
      const message = S5App_ErrorHandler.handleHttpError(error, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u043F\u0440\u0438\u0431\u0440\u0430\u0442\u0438 \u043F\u0440\u0438\u0434\u0430\u043D\u0438\u0439 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B");
      return throwError(() => new Error(message));
    }));
  }
  /**
   * Lookup для автокомпліту
   * GET /api/Unit/lookup?term={term}&isInvolved={isInvolved}
   */
  lookup(term, isInvolved) {
    if (!term?.trim()) {
      return of([]);
    }
    let params = new HttpParams();
    params = params.set("term", term);
    if (isInvolved !== void 0) {
      params = params.set("isInvolved", isInvolved.toString());
    }
    return this.http.get(`${this.baseUrl}/lookup`, { params }).pipe(catchError((error) => {
      const message = S5App_ErrorHandler.handleHttpError(error, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u0432\u0438\u043A\u043E\u043D\u0430\u0442\u0438 \u043F\u043E\u0448\u0443\u043A \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0456\u0432");
      return throwError(() => new Error(message));
    }));
  }
  /**
   * Отримати перелік для селекту
   * GET /api/Unit/sel_list
   */
  getSelectList() {
    return this.http.get(`${this.baseUrl}/sel_list`).pipe(catchError((error) => {
      const message = S5App_ErrorHandler.handleHttpError(error, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0438\u0442\u0438 \u0441\u043F\u0438\u0441\u043E\u043A \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0456\u0432");
      return throwError(() => new Error(message));
    }));
  }
  /**
   * Змінити порядок підрозділу (вгору/вниз)
   * POST /api/Unit/{id}/moveUpDown/{toUp}
   */
  moveUpDown(id, moveUp) {
    return this.http.post(`${this.baseUrl}/${id}/moveUpDown/${moveUp ? "true" : "false"}`, {}).pipe(catchError((error) => {
      const message = S5App_ErrorHandler.handleHttpError(error, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u0437\u043C\u0456\u043D\u0438\u0442\u0438 \u043F\u043E\u0440\u044F\u0434\u043E\u043A \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0443");
      return throwError(() => new Error(message));
    }));
  }
  static \u0275fac = function UnitService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UnitService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _UnitService, factory: _UnitService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UnitService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  UnitService
};
//# sourceMappingURL=chunk-B7URVT2B.js.map
