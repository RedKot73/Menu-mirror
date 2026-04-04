import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-2DRDDSRF.js";
import {
  MatTooltip,
  MatTooltipModule
} from "./chunk-TKT7GR2R.js";
import {
  S5App_ErrorHandler
} from "./chunk-NPKDGQEZ.js";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle
} from "./chunk-6JIBB4FG.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MatFormField,
  MatFormFieldModule,
  MatIcon,
  MatIconModule,
  MatInput,
  MatInputModule,
  MatLabel,
  MatSuffix,
  NgControlStatus,
  NgModel,
  RequiredValidator
} from "./chunk-Z4Z6CI4E.js";
import {
  Component,
  HttpClient,
  HttpParams,
  Injectable,
  MatButton,
  MatButtonModule,
  Subject,
  catchError,
  debounceTime,
  distinctUntilChanged,
  inject,
  setClassMetadata,
  takeUntil,
  throwError,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-CK6AJVHQ.js";

// src/app/auth/users.service.ts
var UsersService = class _UsersService {
  http = inject(HttpClient);
  baseUrl = "/api/account";
  // ── Users ───────────────────────────────
  /**
   * Отримати всіх користувачів
   * GET /api/account?includeInactive={includeInactive}
   */
  getAll(includeInactive = false) {
    let params = new HttpParams();
    if (includeInactive) {
      params = params.set("includeInactive", "true");
    }
    return this.http.get(this.baseUrl, { params }).pipe(catchError((error) => {
      const message = S5App_ErrorHandler.handleHttpError(error, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u043E\u0442\u0440\u0438\u043C\u0430\u0442\u0438 \u0441\u043F\u0438\u0441\u043E\u043A \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0456\u0432");
      return throwError(() => new Error(message));
    }));
  }
  /**
   * Отримати користувача за ID
   * GET /api/account/{id}
   */
  getById(id) {
    return this.http.get(`${this.baseUrl}/${id}`).pipe(catchError((error) => {
      const message = S5App_ErrorHandler.handleHttpError(error, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u043E\u0442\u0440\u0438\u043C\u0430\u0442\u0438 \u0434\u0430\u043D\u0456 \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0430");
      return throwError(() => new Error(message));
    }));
  }
  /**
   * Отримати користувача за ID військовослужбовця
   * GET /api/account/by-soldier/{soldierId}
   */
  getBySoldierId(soldierId) {
    return this.http.get(`${this.baseUrl}/by-soldier/${soldierId}`).pipe(catchError((error) => {
      const message = S5App_ErrorHandler.handleHttpError(error, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u0437\u043D\u0430\u0439\u0442\u0438 \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0430 \u0437\u0430 \u0432\u0456\u0439\u0441\u044C\u043A\u043E\u0432\u043E\u0441\u043B\u0443\u0436\u0431\u043E\u0432\u0446\u0435\u043C");
      return throwError(() => new Error(message));
    }));
  }
  /**
   * Створити користувача
   * POST /api/account
   */
  create(dto) {
    return this.http.post(this.baseUrl, dto).pipe(catchError((error) => {
      const message = S5App_ErrorHandler.handleHttpError(error, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u0441\u0442\u0432\u043E\u0440\u0438\u0442\u0438 \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0430");
      return throwError(() => new Error(message));
    }));
  }
  /**
   * Видалити користувача
   * DELETE /api/account/{id}
   */
  delete(id) {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(catchError((error) => {
      const message = S5App_ErrorHandler.handleHttpError(error, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u0432\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0430");
      return throwError(() => new Error(message));
    }));
  }
  /**
   * Змінити пароль користувача
   * POST /api/account/{id}/change-password
   */
  changePassword(id, dto) {
    return this.http.post(`${this.baseUrl}/${id}/change-password`, dto).pipe(catchError((error) => {
      const message = S5App_ErrorHandler.handleHttpError(error, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u0437\u043C\u0456\u043D\u0438\u0442\u0438 \u043F\u0430\u0440\u043E\u043B\u044C \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0430");
      return throwError(() => new Error(message));
    }));
  }
  /**
   * Змінити ім'я користувача
   * POST /api/account/{id}/change-username
   */
  changeUsername(id, dto) {
    return this.http.post(`${this.baseUrl}/${id}/change-username`, dto).pipe(catchError((error) => {
      const message = S5App_ErrorHandler.handleHttpError(error, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u0437\u043C\u0456\u043D\u0438\u0442\u0438 \u043B\u043E\u0433\u0456\u043D \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0430");
      return throwError(() => new Error(message));
    }));
  }
  /**
   * Встановити блокування користувача
   * POST /api/account/{id}/lockout
   */
  setLockout(id, dto) {
    return this.http.post(`${this.baseUrl}/${id}/lockout`, dto).pipe(catchError((error) => {
      const message = S5App_ErrorHandler.handleHttpError(error, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u0437\u043C\u0456\u043D\u0438\u0442\u0438 \u0441\u0442\u0430\u043D \u0431\u043B\u043E\u043A\u0443\u0432\u0430\u043D\u043D\u044F \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0430");
      return throwError(() => new Error(message));
    }));
  }
  // ── Admin ───────────────────────────────
  /**
   * [АДМІН] Скинути пароль користувача без знання поточного
   * POST /api/account/{id}/admin-reset-password
   */
  adminResetPassword(id, dto) {
    return this.http.post(`${this.baseUrl}/${id}/admin-reset-password`, dto).pipe(catchError((error) => {
      const message = S5App_ErrorHandler.handleHttpError(error, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u0441\u043A\u0438\u043D\u0443\u0442\u0438 \u043F\u0430\u0440\u043E\u043B\u044C \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0430");
      return throwError(() => new Error(message));
    }));
  }
  /**
   * [АДМІН] Змінити ім'я користувача без знання пароля
   * POST /api/account/{id}/admin-change-username
   */
  adminChangeUsername(id, dto) {
    return this.http.post(`${this.baseUrl}/${id}/admin-change-username`, dto).pipe(catchError((error) => {
      const message = S5App_ErrorHandler.handleHttpError(error, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u0437\u043C\u0456\u043D\u0438\u0442\u0438 \u043B\u043E\u0433\u0456\u043D \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0430");
      return throwError(() => new Error(message));
    }));
  }
  // ── Roles ───────────────────────────────
  /**
   * Отримати всі ролі
   * GET /api/account/roles
   */
  getAllRoles() {
    return this.http.get(`${this.baseUrl}/roles`).pipe(catchError((error) => {
      const message = S5App_ErrorHandler.handleHttpError(error, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u043E\u0442\u0440\u0438\u043C\u0430\u0442\u0438 \u0441\u043F\u0438\u0441\u043E\u043A \u0440\u043E\u043B\u0435\u0439");
      return throwError(() => new Error(message));
    }));
  }
  /**
   * Створити роль
   * POST /api/account/roles
   */
  createRole(dto) {
    return this.http.post(`${this.baseUrl}/roles`, dto).pipe(catchError((error) => {
      const message = S5App_ErrorHandler.handleHttpError(error, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u0441\u0442\u0432\u043E\u0440\u0438\u0442\u0438 \u0440\u043E\u043B\u044C");
      return throwError(() => new Error(message));
    }));
  }
  /**
   * Додати роль користувачу
   * POST /api/account/{userId}/roles/{roleName}
   */
  addUserToRole(userId, roleName) {
    return this.http.post(`${this.baseUrl}/${userId}/roles/${roleName}`, {}).pipe(catchError((error) => {
      const message = S5App_ErrorHandler.handleHttpError(error, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u0434\u043E\u0434\u0430\u0442\u0438 \u0440\u043E\u043B\u044C \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0443");
      return throwError(() => new Error(message));
    }));
  }
  /**
   * Видалити роль у користувача
   * DELETE /api/account/{userId}/roles/{roleName}
   */
  removeUserFromRole(userId, roleName) {
    return this.http.delete(`${this.baseUrl}/${userId}/roles/${roleName}`).pipe(catchError((error) => {
      const message = S5App_ErrorHandler.handleHttpError(error, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u0432\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u0440\u043E\u043B\u044C \u0443 \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0430");
      return throwError(() => new Error(message));
    }));
  }
  // ── Validation ──────────────────────────
  /**
   * Отримати вимоги до пароля
   * GET /api/account/password-requirements
   */
  getPasswordRequirements() {
    return this.http.get(`${this.baseUrl}/password-requirements`).pipe(catchError((error) => {
      const message = S5App_ErrorHandler.handleHttpError(error, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u043E\u0442\u0440\u0438\u043C\u0430\u0442\u0438 \u0432\u0438\u043C\u043E\u0433\u0438 \u0434\u043E \u043F\u0430\u0440\u043E\u043B\u044F");
      return throwError(() => new Error(message));
    }));
  }
  /**
   * Перевірити пароль на відповідність вимогам
   * POST /api/account/validate-password
   */
  validatePassword(password, userName, email) {
    return this.http.post(`${this.baseUrl}/validate-password`, {
      password,
      userName: userName ?? "",
      email
    }).pipe(catchError((error) => {
      const message = S5App_ErrorHandler.handleHttpError(error, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u043F\u0435\u0440\u0435\u0432\u0456\u0440\u0438\u0442\u0438 \u043F\u0430\u0440\u043E\u043B\u044C");
      return throwError(() => new Error(message));
    }));
  }
  /**
   * Перевірити доступність імені користувача
   * POST /api/account/check-username
   */
  checkUsername(userName, excludeUserId) {
    return this.http.post(`${this.baseUrl}/check-username`, {
      userName,
      excludeUserId
    }).pipe(catchError((error) => {
      const message = S5App_ErrorHandler.handleHttpError(error, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u043F\u0435\u0440\u0435\u0432\u0456\u0440\u0438\u0442\u0438 \u0456\u043C'\u044F \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0430");
      return throwError(() => new Error(message));
    }));
  }
  /**
   * Перевірити доступність email
   * POST /api/account/check-email
   */
  checkEmail(email, excludeUserId) {
    return this.http.post(`${this.baseUrl}/check-email`, {
      email,
      excludeUserId
    }).pipe(catchError((error) => {
      const message = S5App_ErrorHandler.handleHttpError(error, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u043F\u0435\u0440\u0435\u0432\u0456\u0440\u0438\u0442\u0438 email");
      return throwError(() => new Error(message));
    }));
  }
  static \u0275fac = function UsersService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UsersService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _UsersService, factory: _UsersService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UsersService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/Login/dialogs/ChangePasswordDialog.component.ts
function ChangePasswordDialogComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-form-field", 2)(1, "mat-label");
    \u0275\u0275text(2, "\u041F\u0430\u0440\u043E\u043B\u044C \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0430");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 3);
    \u0275\u0275twoWayListener("ngModelChange", function ChangePasswordDialogComponent_Conditional_7_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.model.currentPassword, $event) || (ctx_r1.model.currentPassword = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.model.currentPassword);
  }
}
function ChangePasswordDialogComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 4);
  }
}
function ChangePasswordDialogComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 5);
    \u0275\u0275text(1, "error");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("matTooltip", ctx_r1.passwordErrors.join("\n"));
  }
}
function ChangePasswordDialogComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 6);
    \u0275\u0275text(1, "check_circle");
    \u0275\u0275elementEnd();
  }
}
function ChangePasswordDialogComponent_Conditional_15_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const err_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(err_r3);
  }
}
function ChangePasswordDialogComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275repeaterCreate(1, ChangePasswordDialogComponent_Conditional_15_For_2_Template, 2, 1, "p", 9, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.passwordErrors);
  }
}
function ChangePasswordDialogComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.passwordHints);
  }
}
function ChangePasswordDialogComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 9);
    \u0275\u0275text(1, "\u041F\u0430\u0440\u043E\u043B\u0456 \u043D\u0435 \u0437\u0431\u0456\u0433\u0430\u044E\u0442\u044C\u0441\u044F");
    \u0275\u0275elementEnd();
  }
}
var ChangePasswordDialogComponent = class _ChangePasswordDialogComponent {
  dialogRef = inject(MatDialogRef);
  usersService = inject(UsersService);
  data = inject(MAT_DIALOG_DATA);
  model = { currentPassword: "", newPassword: "" };
  confirmPassword = "";
  // Validation state
  checkingPassword = false;
  passwordValid = false;
  passwordErrors = [];
  passwordHints = "";
  passwordSubject = new Subject();
  destroy$ = new Subject();
  ngOnInit() {
    this.usersService.getPasswordRequirements().subscribe((req) => {
      this.passwordHints = this.buildRequirementsHint(req);
    });
    this.passwordSubject.pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.destroy$)).subscribe((value) => {
      if (!value) {
        this.checkingPassword = false;
        this.passwordValid = false;
        this.passwordErrors = [];
        return;
      }
      this.checkingPassword = true;
      this.usersService.validatePassword(value, this.data.userName).subscribe({
        next: (res) => {
          this.checkingPassword = false;
          this.passwordValid = res.isValid;
          this.passwordErrors = res.errors ?? [];
        },
        error: () => {
          this.checkingPassword = false;
          this.passwordValid = true;
          this.passwordErrors = [];
        }
      });
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onPasswordChange(value) {
    this.passwordValid = false;
    this.passwordErrors = [];
    this.passwordSubject.next(value);
  }
  get passwordMismatch() {
    return !!this.confirmPassword && this.model.newPassword !== this.confirmPassword;
  }
  get canSave() {
    if (this.checkingPassword)
      return false;
    const passwordOk = this.data.adminChange || !!this.model.currentPassword;
    return passwordOk && !!this.model.newPassword && this.passwordValid && this.model.newPassword === this.confirmPassword;
  }
  save() {
    if (this.canSave) {
      this.dialogRef.close(this.model);
    }
  }
  buildRequirementsHint(req) {
    const parts = [];
    if (req.requiredLength > 0) {
      parts.push(`\u043C\u0456\u043D. ${req.requiredLength} \u0441\u0438\u043C\u0432\u043E\u043B\u0456\u0432`);
    }
    if (req.requireDigit) {
      parts.push("\u0446\u0438\u0444\u0440\u0430");
    }
    if (req.requireLowercase) {
      parts.push("\u043C\u0430\u043B\u0435\u043D\u044C\u043A\u0430 \u043B\u0456\u0442\u0435\u0440\u0430");
    }
    if (req.requireUppercase) {
      parts.push("\u0432\u0435\u043B\u0438\u043A\u0430 \u043B\u0456\u0442\u0435\u0440\u0430");
    }
    if (req.requireNonAlphanumeric) {
      parts.push("\u0441\u043F\u0435\u0446\u0441\u0438\u043C\u0432\u043E\u043B");
    }
    return parts.length ? "\u0412\u0438\u043C\u043E\u0433\u0438: " + parts.join(", ") : "";
  }
  static \u0275fac = function ChangePasswordDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ChangePasswordDialogComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ChangePasswordDialogComponent, selectors: [["app-change-password-dialog"]], decls: 27, vars: 9, consts: [["mat-dialog-title", ""], [1, "dialog-content"], ["appearance", "outline", 1, "full-width"], ["matInput", "", "type", "password", "required", "", 3, "ngModelChange", "ngModel"], ["matSuffix", "", "diameter", "18"], ["matSuffix", "", "color", "warn", 3, "matTooltip"], ["matSuffix", "", "matTooltip", "\u041F\u0430\u0440\u043E\u043B\u044C \u0432\u0456\u0434\u043F\u043E\u0432\u0456\u0434\u0430\u0454 \u0432\u0438\u043C\u043E\u0433\u0430\u043C", 1, "icon-success"], [1, "validation-errors"], [1, "hint-text"], [1, "error-text"], ["align", "end"], ["mat-button", "", "mat-dialog-close", ""], ["mat-flat-button", "", "color", "primary", 3, "click", "disabled"]], template: function ChangePasswordDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "h2", 0);
      \u0275\u0275text(1, "\u0417\u043C\u0456\u043D\u0438\u0442\u0438 \u043F\u0430\u0440\u043E\u043B\u044C");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(2, "mat-dialog-content", 1)(3, "p");
      \u0275\u0275text(4, " \u041A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447: ");
      \u0275\u0275elementStart(5, "strong");
      \u0275\u0275text(6);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(7, ChangePasswordDialogComponent_Conditional_7_Template, 4, 1, "mat-form-field", 2);
      \u0275\u0275elementStart(8, "mat-form-field", 2)(9, "mat-label");
      \u0275\u0275text(10, "\u041D\u043E\u0432\u0438\u0439 \u043F\u0430\u0440\u043E\u043B\u044C");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "input", 3);
      \u0275\u0275twoWayListener("ngModelChange", function ChangePasswordDialogComponent_Template_input_ngModelChange_11_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.model.newPassword, $event) || (ctx.model.newPassword = $event);
        return $event;
      });
      \u0275\u0275listener("ngModelChange", function ChangePasswordDialogComponent_Template_input_ngModelChange_11_listener($event) {
        return ctx.onPasswordChange($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(12, ChangePasswordDialogComponent_Conditional_12_Template, 1, 0, "mat-spinner", 4)(13, ChangePasswordDialogComponent_Conditional_13_Template, 2, 1, "mat-icon", 5)(14, ChangePasswordDialogComponent_Conditional_14_Template, 2, 0, "mat-icon", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(15, ChangePasswordDialogComponent_Conditional_15_Template, 3, 0, "div", 7);
      \u0275\u0275conditionalCreate(16, ChangePasswordDialogComponent_Conditional_16_Template, 2, 1, "p", 8);
      \u0275\u0275elementStart(17, "mat-form-field", 2)(18, "mat-label");
      \u0275\u0275text(19, "\u041F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0436\u0435\u043D\u043D\u044F \u043F\u0430\u0440\u043E\u043B\u044F");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "input", 3);
      \u0275\u0275twoWayListener("ngModelChange", function ChangePasswordDialogComponent_Template_input_ngModelChange_20_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.confirmPassword, $event) || (ctx.confirmPassword = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(21, ChangePasswordDialogComponent_Conditional_21_Template, 2, 0, "p", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "mat-dialog-actions", 10)(23, "button", 11);
      \u0275\u0275text(24, "\u0421\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "button", 12);
      \u0275\u0275listener("click", function ChangePasswordDialogComponent_Template_button_click_25_listener() {
        return ctx.save();
      });
      \u0275\u0275text(26, " \u0417\u043C\u0456\u043D\u0438\u0442\u0438 ");
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.data.userName);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.data.adminChange ? 7 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.model.newPassword);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.checkingPassword ? 12 : ctx.passwordErrors.length ? 13 : ctx.model.newPassword && ctx.passwordValid ? 14 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.passwordErrors.length ? 15 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.passwordHints ? 16 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.confirmPassword);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.passwordMismatch ? 21 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", !ctx.canSave);
    }
  }, dependencies: [FormsModule, DefaultValueAccessor, NgControlStatus, RequiredValidator, NgModel, MatDialogModule, MatDialogClose, MatDialogTitle, MatDialogActions, MatDialogContent, MatFormFieldModule, MatFormField, MatLabel, MatSuffix, MatInputModule, MatInput, MatButtonModule, MatButton, MatIconModule, MatIcon, MatProgressSpinnerModule, MatProgressSpinner, MatTooltipModule, MatTooltip], styles: ["\n\n.dialog-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  min-width: 320px;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.error-text[_ngcontent-%COMP%] {\n  color: var(--mat-warn-color, #f44336);\n  font-size: 12px;\n  margin: -4px 0 4px 0;\n}\n.hint-text[_ngcontent-%COMP%] {\n  color: #666;\n  font-size: 12px;\n  margin: -4px 0 8px 0;\n}\n.validation-errors[_ngcontent-%COMP%] {\n  margin: -4px 0 4px 0;\n}\n.icon-success[_ngcontent-%COMP%] {\n  color: #4caf50;\n}\n/*# sourceMappingURL=dialog-shared.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChangePasswordDialogComponent, [{
    type: Component,
    args: [{ selector: "app-change-password-dialog", imports: [
      FormsModule,
      MatDialogModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatIconModule,
      MatProgressSpinnerModule,
      MatTooltipModule
    ], template: `
    <h2 mat-dialog-title>\u0417\u043C\u0456\u043D\u0438\u0442\u0438 \u043F\u0430\u0440\u043E\u043B\u044C</h2>
    <mat-dialog-content class="dialog-content">
      <p>
        \u041A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447: <strong>{{ data.userName }}</strong>
      </p>

      @if (!data.adminChange) {
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>\u041F\u0430\u0440\u043E\u043B\u044C \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0430</mat-label>
          <input matInput type="password" [(ngModel)]="model.currentPassword" required />
        </mat-form-field>
      }

      <!-- \u041D\u043E\u0432\u0438\u0439 \u043F\u0430\u0440\u043E\u043B\u044C \u0437 \u043F\u0435\u0440\u0435\u0432\u0456\u0440\u043A\u043E\u044E \u0432\u0438\u043C\u043E\u0433 -->
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>\u041D\u043E\u0432\u0438\u0439 \u043F\u0430\u0440\u043E\u043B\u044C</mat-label>
        <input
          matInput
          type="password"
          [(ngModel)]="model.newPassword"
          required
          (ngModelChange)="onPasswordChange($event)"
        />
        @if (checkingPassword) {
          <mat-spinner matSuffix diameter="18"></mat-spinner>
        } @else if (passwordErrors.length) {
          <mat-icon matSuffix color="warn" [matTooltip]="passwordErrors.join('\\n')"
            >error</mat-icon
          >
        } @else if (model.newPassword && passwordValid) {
          <mat-icon matSuffix class="icon-success" matTooltip="\u041F\u0430\u0440\u043E\u043B\u044C \u0432\u0456\u0434\u043F\u043E\u0432\u0456\u0434\u0430\u0454 \u0432\u0438\u043C\u043E\u0433\u0430\u043C"
            >check_circle</mat-icon
          >
        }
      </mat-form-field>
      @if (passwordErrors.length) {
        <div class="validation-errors">
          @for (err of passwordErrors; track err) {
            <p class="error-text">{{ err }}</p>
          }
        </div>
      }
      @if (passwordHints) {
        <p class="hint-text">{{ passwordHints }}</p>
      }

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>\u041F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0436\u0435\u043D\u043D\u044F \u043F\u0430\u0440\u043E\u043B\u044F</mat-label>
        <input matInput type="password" [(ngModel)]="confirmPassword" required />
      </mat-form-field>

      @if (passwordMismatch) {
        <p class="error-text">\u041F\u0430\u0440\u043E\u043B\u0456 \u043D\u0435 \u0437\u0431\u0456\u0433\u0430\u044E\u0442\u044C\u0441\u044F</p>
      }
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>\u0421\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438</button>
      <button mat-flat-button color="primary" [disabled]="!canSave" (click)="save()">
        \u0417\u043C\u0456\u043D\u0438\u0442\u0438
      </button>
    </mat-dialog-actions>
  `, styles: ["/* src/Login/dialogs/dialog-shared.scss */\n.dialog-content {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  min-width: 320px;\n}\n.full-width {\n  width: 100%;\n}\n.error-text {\n  color: var(--mat-warn-color, #f44336);\n  font-size: 12px;\n  margin: -4px 0 4px 0;\n}\n.hint-text {\n  color: #666;\n  font-size: 12px;\n  margin: -4px 0 8px 0;\n}\n.validation-errors {\n  margin: -4px 0 4px 0;\n}\n.icon-success {\n  color: #4caf50;\n}\n/*# sourceMappingURL=dialog-shared.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ChangePasswordDialogComponent, { className: "ChangePasswordDialogComponent", filePath: "Login/dialogs/ChangePasswordDialog.component.ts", lineNumber: 100 });
})();

export {
  UsersService,
  ChangePasswordDialogComponent
};
//# sourceMappingURL=chunk-KCD47CQG.js.map
