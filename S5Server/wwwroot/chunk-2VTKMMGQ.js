import {
  ChangePasswordDialogComponent,
  UsersService
} from "./chunk-B6DEHOUL.js";
import {
  SystemTimeService
} from "./chunk-Q7EPCLWK.js";
import "./chunk-G7ZXRTEY.js";
import {
  MatCheckbox,
  MatCheckboxModule
} from "./chunk-NVGSKVFD.js";
import "./chunk-W5GTBRLP.js";
import {
  AuthService
} from "./chunk-UA4BGHXS.js";
import "./chunk-WUTFOUQH.js";
import "./chunk-WAACRMV7.js";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-QPOXXU4H.js";
import {
  Router
} from "./chunk-G7RKRMVR.js";
import "./chunk-SWYNU52L.js";
import {
  MatSnackBar,
  MatSnackBarModule
} from "./chunk-4WDEZQCM.js";
import "./chunk-OWDCNZN3.js";
import {
  MatDialog,
  MatDialogModule
} from "./chunk-PALKAU2I.js";
import "./chunk-KRVND5CP.js";
import {
  AsyncPipe,
  Component,
  DatePipe,
  DefaultValueAccessor,
  FormControl,
  FormControlName,
  FormGroup,
  FormGroupDirective,
  MatButton,
  MatButtonModule,
  MatError,
  MatFormField,
  MatFormFieldModule,
  MatInput,
  MatInputModule,
  MatLabel,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators,
  inject,
  setClassMetadata,
  signal,
  ɵNgNoValidate,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind3,
  ɵɵproperty,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-WAYE7YII.js";

// src/Login/LoginPage.component.ts
function LoginPage_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.errorMessage());
  }
}
function LoginPage_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "\u041B\u043E\u0433\u0456\u043D \u043E\u0431\u043E\u0432'\u044F\u0437\u043A\u043E\u0432\u0438\u0439");
    \u0275\u0275elementEnd();
  }
}
function LoginPage_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "\u041F\u0430\u0440\u043E\u043B\u044C \u043E\u0431\u043E\u0432'\u044F\u0437\u043A\u043E\u0432\u0438\u0439");
    \u0275\u0275elementEnd();
  }
}
function LoginPage_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 8);
  }
}
function LoginPage_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u0423\u0432\u0456\u0439\u0442\u0438 ");
  }
}
var LoginPage = class _LoginPage {
  auth = inject(AuthService);
  router = inject(Router);
  dialog = inject(MatDialog);
  snackBar = inject(MatSnackBar);
  usersService = inject(UsersService);
  systemTimeService = inject(SystemTimeService);
  isLoading = signal(false, ...ngDevMode ? [{ debugName: "isLoading" }] : []);
  errorMessage = signal("", ...ngDevMode ? [{ debugName: "errorMessage" }] : []);
  utcTime$ = this.systemTimeService.utcTime$;
  loginForm = new FormGroup({
    login: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
    rememberMe: new FormControl(false)
  });
  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.isLoading.set(true);
    this.errorMessage.set("");
    const { login, password, rememberMe } = this.loginForm.value;
    console.log("[DEBUG] LoginPage onSubmit started");
    this.auth.login({
      userName: login,
      password,
      rememberMe: rememberMe ?? false
    }).subscribe({
      next: (payload) => {
        console.log("[DEBUG] Login successful", payload);
        this.isLoading.set(false);
        if (payload.requiresTwoFactor) {
          console.log("[DEBUG] Navigating to /welcome");
          this.router.navigate(["/welcome"]);
        } else if (payload.token) {
          window.location.href = "/DocumentDataSet";
        } else {
          this.errorMessage.set("\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u043B\u043E\u0433\u0456\u043D \u0430\u0431\u043E \u043F\u0430\u0440\u043E\u043B\u044C");
        }
      },
      error: (err) => {
        console.error("[DEBUG] Login error", err);
        this.isLoading.set(false);
        if (err.status === 403 && err.error?.requirePasswordChange) {
          this.openForceChangePassword(err.error.userId, login);
        } else if (err.status === 401 || err.error?.errors && err.error.errors.some((e) => e.message?.includes("Unauthorized"))) {
          this.errorMessage.set("\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u043B\u043E\u0433\u0456\u043D \u0430\u0431\u043E \u043F\u0430\u0440\u043E\u043B\u044C");
        } else if (err.status === 423) {
          const detail = err.error?.detail ?? "\u041E\u0431\u043B\u0456\u043A\u043E\u0432\u0438\u0439 \u0437\u0430\u043F\u0438\u0441 \u0437\u0430\u0431\u043B\u043E\u043A\u043E\u0432\u0430\u043D\u0438\u0439";
          this.errorMessage.set(detail);
        } else {
          const gqlError = err.error?.errors?.[0]?.message;
          if (gqlError) {
            this.errorMessage.set(gqlError);
          } else {
            this.errorMessage.set("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437'\u0454\u0434\u043D\u0430\u043D\u043D\u044F \u0437 \u0441\u0435\u0440\u0432\u0435\u0440\u043E\u043C");
          }
        }
      }
    });
  }
  openForceChangePassword(userId, userName) {
    this.errorMessage.set("\u041D\u0435\u043E\u0431\u0445\u0456\u0434\u043D\u043E \u0437\u043C\u0456\u043D\u0438\u0442\u0438 \u043F\u0430\u0440\u043E\u043B\u044C \u0434\u043B\u044F \u043F\u0440\u043E\u0434\u043E\u0432\u0436\u0435\u043D\u043D\u044F \u0440\u043E\u0431\u043E\u0442\u0438");
    const dialogRef = this.dialog.open(ChangePasswordDialogComponent, {
      width: "400px",
      disableClose: true,
      data: { userName }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.isLoading.set(true);
        this.usersService.changePassword(userId, result).subscribe({
          next: () => {
            this.errorMessage.set("");
            this.snackBar.open("\u041F\u0430\u0440\u043E\u043B\u044C \u0443\u0441\u043F\u0456\u0448\u043D\u043E \u0437\u043C\u0456\u043D\u0435\u043D\u043E. \u0423\u0432\u0456\u0439\u0434\u0456\u0442\u044C \u0437 \u043D\u043E\u0432\u0438\u043C \u043F\u0430\u0440\u043E\u043B\u0435\u043C.", "OK", {
              duration: 5e3
            });
            this.loginForm.patchValue({ password: result.newPassword });
            this.isLoading.set(false);
            this.onSubmit();
          },
          error: (err) => {
            this.isLoading.set(false);
            const msg = err.error?.detail || "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u043C\u0456\u043D\u0438 \u043F\u0430\u0440\u043E\u043B\u044F";
            this.errorMessage.set(msg);
          }
        });
      }
    });
  }
  static \u0275fac = function LoginPage_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LoginPage)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginPage, selectors: [["s5-page-login"]], decls: 26, vars: 13, consts: [[1, "login-container"], [1, "error-message"], [3, "ngSubmit", "formGroup"], ["appearance", "outline"], ["matInput", "", "formControlName", "login", "autocomplete", "username"], ["matInput", "", "formControlName", "password", "type", "password", "autocomplete", "current-password"], ["formControlName", "rememberMe"], ["mat-raised-button", "", "color", "primary", "type", "submit", 3, "disabled"], ["diameter", "20"], [1, "version-info"], [1, "utc-clock"]], template: function LoginPage_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "h2");
      \u0275\u0275text(2, "\u0412\u0445\u0456\u0434 \u0432 \u0441\u0438\u0441\u0442\u0435\u043C\u0443");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(3, LoginPage_Conditional_3_Template, 2, 1, "div", 1);
      \u0275\u0275elementStart(4, "form", 2);
      \u0275\u0275listener("ngSubmit", function LoginPage_Template_form_ngSubmit_4_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementStart(5, "mat-form-field", 3)(6, "mat-label");
      \u0275\u0275text(7, "\u041B\u043E\u0433\u0456\u043D");
      \u0275\u0275elementEnd();
      \u0275\u0275element(8, "input", 4);
      \u0275\u0275conditionalCreate(9, LoginPage_Conditional_9_Template, 2, 0, "mat-error");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "mat-form-field", 3)(11, "mat-label");
      \u0275\u0275text(12, "\u041F\u0430\u0440\u043E\u043B\u044C");
      \u0275\u0275elementEnd();
      \u0275\u0275element(13, "input", 5);
      \u0275\u0275conditionalCreate(14, LoginPage_Conditional_14_Template, 2, 0, "mat-error");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "mat-checkbox", 6);
      \u0275\u0275text(16, "\u0417\u0430\u043F\u0430\u043C'\u044F\u0442\u0430\u0442\u0438 \u043C\u0435\u043D\u0435");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "button", 7);
      \u0275\u0275conditionalCreate(18, LoginPage_Conditional_18_Template, 1, 0, "mat-spinner", 8)(19, LoginPage_Conditional_19_Template, 1, 0);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(20, "div", 9);
      \u0275\u0275text(21, "\u0412\u0435\u0440\u0441\u0456\u044F: 1.0.0");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "div", 10);
      \u0275\u0275text(23);
      \u0275\u0275pipe(24, "async");
      \u0275\u0275pipe(25, "date");
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.errorMessage() ? 3 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("formGroup", ctx.loginForm);
      \u0275\u0275advance(5);
      \u0275\u0275conditional(ctx.loginForm.controls.login.hasError("required") ? 9 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275conditional(ctx.loginForm.controls.password.hasError("required") ? 14 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275property("disabled", ctx.loginForm.invalid || ctx.isLoading());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isLoading() ? 18 : 19);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1("UTC: ", \u0275\u0275pipeBind3(25, 9, \u0275\u0275pipeBind1(24, 7, ctx.utcTime$), "yyyy-MM-dd HH:mm:ss", "UTC"));
    }
  }, dependencies: [
    ReactiveFormsModule,
    \u0275NgNoValidate,
    DefaultValueAccessor,
    NgControlStatus,
    NgControlStatusGroup,
    FormGroupDirective,
    FormControlName,
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatError,
    MatInputModule,
    MatInput,
    MatButtonModule,
    MatButton,
    MatCheckboxModule,
    MatCheckbox,
    MatProgressSpinnerModule,
    MatProgressSpinner,
    MatDialogModule,
    MatSnackBarModule,
    AsyncPipe,
    DatePipe
  ], styles: ['\n\n.utc-clock[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 10px;\n  left: 50%;\n  transform: translateX(-50%);\n  font-size: 12px;\n  font-weight: 500;\n  font-family: "Roboto", sans-serif;\n  color: rgba(63, 81, 181, 0.75);\n  letter-spacing: 0.5px;\n  white-space: nowrap;\n}\n.login-container[_ngcontent-%COMP%] {\n  max-width: 400px;\n  margin: 80px auto;\n  padding: 24px;\n}\nform[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.error-message[_ngcontent-%COMP%] {\n  color: #f44336;\n  background: #ffebee;\n  padding: 8px 12px;\n  border-radius: 4px;\n  margin-bottom: 8px;\n}\nbutton[mat-raised-button][_ngcontent-%COMP%] {\n  height: 48px;\n  font-size: 16px;\n  margin-top: 8px;\n}\n.version-info[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 10px;\n  right: 10px;\n  font-size: 12px;\n  color: #aaa;\n}\n/*# sourceMappingURL=LoginPage.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoginPage, [{
    type: Component,
    args: [{ selector: "s5-page-login", standalone: true, template: `
    <div class="login-container">
      <h2>\u0412\u0445\u0456\u0434 \u0432 \u0441\u0438\u0441\u0442\u0435\u043C\u0443</h2>

      @if (errorMessage()) {
        <div class="error-message">{{ errorMessage() }}</div>
      }

      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <mat-form-field appearance="outline">
          <mat-label>\u041B\u043E\u0433\u0456\u043D</mat-label>
          <input matInput formControlName="login" autocomplete="username" />
          @if (loginForm.controls.login.hasError('required')) {
            <mat-error>\u041B\u043E\u0433\u0456\u043D \u043E\u0431\u043E\u0432'\u044F\u0437\u043A\u043E\u0432\u0438\u0439</mat-error>
          }
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>\u041F\u0430\u0440\u043E\u043B\u044C</mat-label>
          <input
            matInput
            formControlName="password"
            type="password"
            autocomplete="current-password"
          />
          @if (loginForm.controls.password.hasError('required')) {
            <mat-error>\u041F\u0430\u0440\u043E\u043B\u044C \u043E\u0431\u043E\u0432'\u044F\u0437\u043A\u043E\u0432\u0438\u0439</mat-error>
          }
        </mat-form-field>

        <mat-checkbox formControlName="rememberMe">\u0417\u0430\u043F\u0430\u043C'\u044F\u0442\u0430\u0442\u0438 \u043C\u0435\u043D\u0435</mat-checkbox>

        <button
          mat-raised-button
          color="primary"
          type="submit"
          [disabled]="loginForm.invalid || isLoading()"
        >
          @if (isLoading()) {
            <mat-spinner diameter="20"></mat-spinner>
          } @else {
            \u0423\u0432\u0456\u0439\u0442\u0438
          }
        </button>
      </form>
    </div>
    <div class="version-info">\u0412\u0435\u0440\u0441\u0456\u044F: 1.0.0</div>
    <div class="utc-clock">UTC: {{ utcTime$ | async | date:'yyyy-MM-dd HH:mm:ss':'UTC' }}</div>`, imports: [
      ReactiveFormsModule,
      AsyncPipe,
      DatePipe,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatCheckboxModule,
      MatProgressSpinnerModule,
      MatDialogModule,
      MatSnackBarModule
    ], styles: ['/* angular:styles/component:css;dfff04ad0b2b9606f7b2bcbc57fa37ca61b9e8e6afa179400e346301565c5bb2;/home/havrok/projects/work/411/s5/s5app/Menu/S5Server/Front/src/Login/LoginPage.component.ts */\n.utc-clock {\n  position: fixed;\n  bottom: 10px;\n  left: 50%;\n  transform: translateX(-50%);\n  font-size: 12px;\n  font-weight: 500;\n  font-family: "Roboto", sans-serif;\n  color: rgba(63, 81, 181, 0.75);\n  letter-spacing: 0.5px;\n  white-space: nowrap;\n}\n.login-container {\n  max-width: 400px;\n  margin: 80px auto;\n  padding: 24px;\n}\nform {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.error-message {\n  color: #f44336;\n  background: #ffebee;\n  padding: 8px 12px;\n  border-radius: 4px;\n  margin-bottom: 8px;\n}\nbutton[mat-raised-button] {\n  height: 48px;\n  font-size: 16px;\n  margin-top: 8px;\n}\n.version-info {\n  position: fixed;\n  bottom: 10px;\n  right: 10px;\n  font-size: 12px;\n  color: #aaa;\n}\n/*# sourceMappingURL=LoginPage.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginPage, { className: "LoginPage", filePath: "Login/LoginPage.component.ts", lineNumber: 129 });
})();
export {
  LoginPage
};
//# sourceMappingURL=chunk-2VTKMMGQ.js.map
