import {
  SystemTimeService
} from "./chunk-6TTLTCX5.js";
import "./chunk-A2W3N2LY.js";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-HFCL4LX6.js";
import {
  MatCard,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardModule,
  MatCardSubtitle,
  MatCardTitle
} from "./chunk-ZWWMZKX6.js";
import {
  AuthService
} from "./chunk-BQ4QHUOF.js";
import "./chunk-6HY5KKDU.js";
import {
  Router
} from "./chunk-3EEZP2Q7.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  MatError,
  MatFormField,
  MatFormFieldModule,
  MatIcon,
  MatIconModule,
  MatInput,
  MatInputModule,
  MatLabel,
  MatSuffix,
  MaxLengthValidator,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-IC3HW47I.js";
import {
  AsyncPipe,
  CommonModule,
  Component,
  DatePipe,
  MatButton,
  MatButtonModule,
  inject,
  interval,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-IKDNLDBK.js";

// src/app/pages/welcome/welcome.component.ts
function WelcomeComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "\u041A\u043E\u0434 \u043C\u0430\u0454 \u0441\u043A\u043B\u0430\u0434\u0430\u0442\u0438\u0441\u044F \u0437 6 \u0446\u0438\u0444\u0440");
    \u0275\u0275elementEnd();
  }
}
function WelcomeComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "mat-icon");
    \u0275\u0275text(2, "error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.error());
  }
}
function WelcomeComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7)(1, "mat-icon");
    \u0275\u0275text(2, "timer");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("\u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u043D\u0438\u0439 \u0432\u0445\u0456\u0434 \u0447\u0435\u0440\u0435\u0437 ", ctx_r0.countdown(), " \u0441\u0435\u043A...");
  }
}
function WelcomeComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 10);
  }
}
function WelcomeComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "verified_user");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " \u041F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0438 ");
    \u0275\u0275elementContainerEnd();
  }
}
var WelcomeComponent = class _WelcomeComponent {
  fb = inject(FormBuilder);
  auth = inject(AuthService);
  router = inject(Router);
  timeService = inject(SystemTimeService);
  welcomeForm = this.fb.group({
    code: ["", [Validators.required, Validators.pattern(/^\d{6}$/)]]
  });
  error = signal(null, ...ngDevMode ? [{ debugName: "error" }] : []);
  isLoading = signal(false, ...ngDevMode ? [{ debugName: "isLoading" }] : []);
  countdown = signal(10, ...ngDevMode ? [{ debugName: "countdown" }] : []);
  currentTime$ = this.timeService.utcTime$;
  timerSub;
  ngOnInit() {
    if (this.auth.twoFactorMode() === "soft") {
      this.startTimer();
    } else {
      this.countdown.set(0);
    }
  }
  ngOnDestroy() {
    this.timerSub?.unsubscribe();
  }
  startTimer() {
    this.timerSub = interval(1e3).subscribe(() => {
      if (this.countdown() > 0) {
        this.countdown.update((c) => c - 1);
      } else {
        this.timerSub?.unsubscribe();
        this.autoSubmit();
      }
    });
  }
  autoSubmit() {
    console.log("[DEBUG] 2FA Timer expired. Auto-submitting...");
    const code = this.welcomeForm.value.code || "000000";
    this.submitCode(code);
  }
  onSubmit() {
    if (this.welcomeForm.invalid)
      return;
    const { code } = this.welcomeForm.value;
    if (!code)
      return;
    if (this.auth.twoFactorMode() !== "soft") {
      this.timerSub?.unsubscribe();
    } else {
      this.error.set("\u041E\u0447\u0456\u043A\u0443\u0432\u0430\u043D\u043D\u044F \u043F\u0435\u0440\u0435\u0432\u0456\u0440\u043A\u0438...");
    }
    this.submitCode(code);
  }
  submitCode(code) {
    this.isLoading.set(true);
    this.error.set(null);
    this.auth.verifyTwoFactor(code).subscribe({
      next: (payload) => {
        if (payload.token && !payload.requiresTwoFactor) {
          console.log("[DEBUG] 2FA Success. Navigating to /DocumentDataSet via SPA router.");
          this.router.navigate(["/DocumentDataSet"]);
        } else {
          this.error.set("\u041D\u0435\u0432\u0456\u0440\u043D\u0438\u0439 \u043A\u043E\u0434 \u043F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0436\u0435\u043D\u043D\u044F");
          this.isLoading.set(false);
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        const gqlError = err.error?.errors?.[0]?.message;
        if (gqlError) {
          this.error.set(gqlError);
        } else {
          this.error.set("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0430. \u0421\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u043F\u0456\u0437\u043D\u0456\u0448\u0435.");
        }
        console.error("2FA Error:", err);
      }
    });
  }
  static \u0275fac = function WelcomeComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _WelcomeComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _WelcomeComponent, selectors: [["app-welcome"]], decls: 30, vars: 12, consts: [[1, "welcome-container"], [1, "welcome-card"], [3, "ngSubmit", "formGroup"], ["appearance", "outline", 1, "otp-field"], ["matInput", "", "type", "text", "formControlName", "code", "placeholder", "000000", "autocomplete", "one-time-code", "maxlength", "6"], ["matSuffix", ""], [1, "error-message"], [1, "timer-info"], [1, "actions"], ["mat-flat-button", "", "color", "primary", "type", "submit", 3, "disabled"], ["diameter", "20"], [1, "clock-footer"], [1, "utc-clock"]], template: function WelcomeComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "mat-card", 1)(2, "mat-card-header")(3, "mat-card-title");
      \u0275\u0275text(4, "\u0414\u0432\u043E\u0444\u0430\u043A\u0442\u043E\u0440\u043D\u0430 \u0430\u0432\u0442\u0435\u043D\u0442\u0438\u0444\u0456\u043A\u0430\u0446\u0456\u044F");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "mat-card-subtitle");
      \u0275\u0275text(6, "\u0412\u0432\u0435\u0434\u0456\u0442\u044C 6-\u0437\u043D\u0430\u0447\u043D\u0438\u0439 \u043A\u043E\u0434 \u0456\u0437 \u0432\u0430\u0448\u043E\u0433\u043E \u0434\u043E\u0434\u0430\u0442\u043A\u0443");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "mat-card-content")(8, "form", 2);
      \u0275\u0275listener("ngSubmit", function WelcomeComponent_Template_form_ngSubmit_8_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementStart(9, "mat-form-field", 3)(10, "mat-label");
      \u0275\u0275text(11, "\u041A\u043E\u0434 \u043F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0436\u0435\u043D\u043D\u044F");
      \u0275\u0275elementEnd();
      \u0275\u0275element(12, "input", 4);
      \u0275\u0275elementStart(13, "mat-icon", 5);
      \u0275\u0275text(14, "lock");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(15, WelcomeComponent_Conditional_15_Template, 2, 0, "mat-error");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(16, WelcomeComponent_Conditional_16_Template, 5, 1, "div", 6);
      \u0275\u0275conditionalCreate(17, WelcomeComponent_Conditional_17_Template, 5, 1, "div", 7);
      \u0275\u0275elementStart(18, "div", 8)(19, "button", 9);
      \u0275\u0275conditionalCreate(20, WelcomeComponent_Conditional_20_Template, 1, 0, "mat-spinner", 10)(21, WelcomeComponent_Conditional_21_Template, 4, 0, "ng-container");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(22, "mat-card-footer", 11)(23, "div", 12)(24, "mat-icon");
      \u0275\u0275text(25, "schedule");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "span");
      \u0275\u0275text(27);
      \u0275\u0275pipe(28, "async");
      \u0275\u0275pipe(29, "date");
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      let tmp_1_0;
      \u0275\u0275advance(8);
      \u0275\u0275property("formGroup", ctx.welcomeForm);
      \u0275\u0275advance(7);
      \u0275\u0275conditional(((tmp_1_0 = ctx.welcomeForm.get("code")) == null ? null : tmp_1_0.hasError("pattern")) ? 15 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.error() ? 16 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.countdown() > 0 && !ctx.isLoading() ? 17 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.welcomeForm.invalid || ctx.isLoading());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isLoading() ? 20 : 21);
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(29, 9, \u0275\u0275pipeBind1(28, 7, ctx.currentTime$), "HH:mm:ss"), " UTC");
    }
  }, dependencies: [
    CommonModule,
    ReactiveFormsModule,
    \u0275NgNoValidate,
    DefaultValueAccessor,
    NgControlStatus,
    NgControlStatusGroup,
    MaxLengthValidator,
    FormGroupDirective,
    FormControlName,
    MatCardModule,
    MatCard,
    MatCardContent,
    MatCardFooter,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatError,
    MatSuffix,
    MatInputModule,
    MatInput,
    MatButtonModule,
    MatButton,
    MatIconModule,
    MatIcon,
    MatProgressSpinnerModule,
    MatProgressSpinner,
    AsyncPipe,
    DatePipe
  ], styles: ['\n\n.welcome-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 100vh;\n  background:\n    radial-gradient(\n      circle at top right,\n      #1a237e 0%,\n      #121212 60%);\n  color: #fff;\n  padding: 16px;\n}\n.welcome-card[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 420px;\n  border-radius: 12px;\n  background-color: rgba(30, 30, 30, 0.95);\n  -webkit-backdrop-filter: blur(8px);\n  backdrop-filter: blur(8px);\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.8);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n}\n.welcome-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.welcome-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 500;\n  letter-spacing: -0.02em;\n}\n.welcome-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-subtitle[_ngcontent-%COMP%] {\n  color: rgba(255, 255, 255, 0.7);\n  margin-top: 4px;\n}\n.welcome-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.welcome-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .otp-field[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.welcome-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .otp-field[_ngcontent-%COMP%]     .mat-mdc-text-field-wrapper {\n  background-color: rgba(255, 255, 255, 0.05);\n}\n.welcome-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .otp-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  text-align: center;\n  font-family: "Roboto Mono", monospace;\n  font-size: 2rem;\n  letter-spacing: 0.5em;\n  padding-left: 0.5em;\n}\n.welcome-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .timer-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  color: #ffd740;\n  background: rgba(255, 215, 64, 0.1);\n  padding: 12px;\n  border-radius: 4px;\n  font-size: 0.9rem;\n  font-weight: 500;\n  margin-top: 16px;\n  border: 1px dashed rgba(255, 215, 64, 0.3);\n}\n.welcome-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .timer-info[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n}\n.welcome-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  color: #f44336;\n  background: rgba(244, 67, 54, 0.1);\n  padding: 12px;\n  border-radius: 4px;\n  font-size: 0.85rem;\n}\n.welcome-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  margin-top: 16px;\n}\n.welcome-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 8px 24px;\n  font-size: 1rem;\n  border-radius: 8px;\n}\n.welcome-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  margin-right: 8px;\n}\n.welcome-card[_ngcontent-%COMP%]   .clock-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  padding: 12px;\n  border-top: 1px solid rgba(255, 255, 255, 0.1);\n  background: rgba(0, 0, 0, 0.2);\n}\n.welcome-card[_ngcontent-%COMP%]   .clock-footer[_ngcontent-%COMP%]   .utc-clock[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-family: "Roboto Mono", monospace;\n  color: rgba(255, 255, 255, 0.5);\n  font-size: 0.8rem;\n}\n.welcome-card[_ngcontent-%COMP%]   .clock-footer[_ngcontent-%COMP%]   .utc-clock[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n/*# sourceMappingURL=welcome.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(WelcomeComponent, [{
    type: Component,
    args: [{ selector: "app-welcome", standalone: true, imports: [
      CommonModule,
      ReactiveFormsModule,
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatIconModule,
      MatProgressSpinnerModule
    ], template: `<div class="welcome-container">
  <mat-card class="welcome-card">
    <mat-card-header>
      <mat-card-title>\u0414\u0432\u043E\u0444\u0430\u043A\u0442\u043E\u0440\u043D\u0430 \u0430\u0432\u0442\u0435\u043D\u0442\u0438\u0444\u0456\u043A\u0430\u0446\u0456\u044F</mat-card-title>
      <mat-card-subtitle>\u0412\u0432\u0435\u0434\u0456\u0442\u044C 6-\u0437\u043D\u0430\u0447\u043D\u0438\u0439 \u043A\u043E\u0434 \u0456\u0437 \u0432\u0430\u0448\u043E\u0433\u043E \u0434\u043E\u0434\u0430\u0442\u043A\u0443</mat-card-subtitle>
    </mat-card-header>

    <mat-card-content>
      <form [formGroup]="welcomeForm" (ngSubmit)="onSubmit()">
        <mat-form-field appearance="outline" class="otp-field">
          <mat-label>\u041A\u043E\u0434 \u043F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0436\u0435\u043D\u043D\u044F</mat-label>
          <input matInput 
                 type="text" 
                 formControlName="code" 
                 placeholder="000000" 
                 autocomplete="one-time-code"
                 maxlength="6">
          <mat-icon matSuffix>lock</mat-icon>
          @if (welcomeForm.get('code')?.hasError('pattern')) {
            <mat-error>\u041A\u043E\u0434 \u043C\u0430\u0454 \u0441\u043A\u043B\u0430\u0434\u0430\u0442\u0438\u0441\u044F \u0437 6 \u0446\u0438\u0444\u0440</mat-error>
          }
        </mat-form-field>

        @if (error()) {
          <div class="error-message">
            <mat-icon>error</mat-icon>
            <span>{{ error() }}</span>
          </div>
        }

        @if (countdown() > 0 && !isLoading()) {
          <div class="timer-info">
            <mat-icon>timer</mat-icon>
            <span>\u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u043D\u0438\u0439 \u0432\u0445\u0456\u0434 \u0447\u0435\u0440\u0435\u0437 {{ countdown() }} \u0441\u0435\u043A...</span>
          </div>
        }

        <div class="actions">
          <button mat-flat-button 
                  color="primary" 
                  type="submit" 
                  [disabled]="welcomeForm.invalid || isLoading()">
            @if (isLoading()) {
              <mat-spinner diameter="20" />
            } @else {
              <ng-container>
                <mat-icon>verified_user</mat-icon>
                \u041F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0438
              </ng-container>
            }
          </button>
        </div>
      </form>
    </mat-card-content>

    <mat-card-footer class="clock-footer">
      <div class="utc-clock">
        <mat-icon>schedule</mat-icon>
        <span>{{ currentTime$ | async | date:'HH:mm:ss' }} UTC</span>
      </div>
    </mat-card-footer>
  </mat-card>
</div>
`, styles: ['/* src/app/pages/welcome/welcome.component.scss */\n.welcome-container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 100vh;\n  background:\n    radial-gradient(\n      circle at top right,\n      #1a237e 0%,\n      #121212 60%);\n  color: #fff;\n  padding: 16px;\n}\n.welcome-card {\n  width: 100%;\n  max-width: 420px;\n  border-radius: 12px;\n  background-color: rgba(30, 30, 30, 0.95);\n  -webkit-backdrop-filter: blur(8px);\n  backdrop-filter: blur(8px);\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.8);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n}\n.welcome-card mat-card-header {\n  margin-bottom: 24px;\n}\n.welcome-card mat-card-header mat-card-title {\n  font-size: 1.5rem;\n  font-weight: 500;\n  letter-spacing: -0.02em;\n}\n.welcome-card mat-card-header mat-card-subtitle {\n  color: rgba(255, 255, 255, 0.7);\n  margin-top: 4px;\n}\n.welcome-card mat-card-content form {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.welcome-card mat-card-content .otp-field {\n  width: 100%;\n}\n.welcome-card mat-card-content .otp-field ::ng-deep .mat-mdc-text-field-wrapper {\n  background-color: rgba(255, 255, 255, 0.05);\n}\n.welcome-card mat-card-content .otp-field input {\n  text-align: center;\n  font-family: "Roboto Mono", monospace;\n  font-size: 2rem;\n  letter-spacing: 0.5em;\n  padding-left: 0.5em;\n}\n.welcome-card mat-card-content .timer-info {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  color: #ffd740;\n  background: rgba(255, 215, 64, 0.1);\n  padding: 12px;\n  border-radius: 4px;\n  font-size: 0.9rem;\n  font-weight: 500;\n  margin-top: 16px;\n  border: 1px dashed rgba(255, 215, 64, 0.3);\n}\n.welcome-card mat-card-content .timer-info mat-icon {\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n}\n.welcome-card mat-card-content .error-message {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  color: #f44336;\n  background: rgba(244, 67, 54, 0.1);\n  padding: 12px;\n  border-radius: 4px;\n  font-size: 0.85rem;\n}\n.welcome-card mat-card-content .actions {\n  display: flex;\n  justify-content: flex-end;\n  margin-top: 16px;\n}\n.welcome-card mat-card-content .actions button {\n  padding: 8px 24px;\n  font-size: 1rem;\n  border-radius: 8px;\n}\n.welcome-card mat-card-content .actions button mat-icon {\n  margin-right: 8px;\n}\n.welcome-card .clock-footer {\n  display: flex;\n  justify-content: center;\n  padding: 12px;\n  border-top: 1px solid rgba(255, 255, 255, 0.1);\n  background: rgba(0, 0, 0, 0.2);\n}\n.welcome-card .clock-footer .utc-clock {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-family: "Roboto Mono", monospace;\n  color: rgba(255, 255, 255, 0.5);\n  font-size: 0.8rem;\n}\n.welcome-card .clock-footer .utc-clock mat-icon {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n/*# sourceMappingURL=welcome.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(WelcomeComponent, { className: "WelcomeComponent", filePath: "app/pages/welcome/welcome.component.ts", lineNumber: 31 });
})();
export {
  WelcomeComponent
};
//# sourceMappingURL=chunk-W4BRWASZ.js.map
