import {
  SystemTimeService
} from "./chunk-IGYH6E5M.js";
import "./chunk-VIPTF2QV.js";
import {
  MatCard,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardModule,
  MatCardSubtitle,
  MatCardTitle
} from "./chunk-WOSA5N46.js";
import {
  AuthService
} from "./chunk-MKDEEZNH.js";
import "./chunk-RWBUJLBH.js";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-6M4I25T2.js";
import {
  Router
} from "./chunk-AY2LANKM.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-2EFRQAL5.js";
import {
  AsyncPipe,
  CommonModule,
  Component,
  DatePipe,
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  MatButton,
  MatButtonModule,
  MatError,
  MatFormField,
  MatFormFieldModule,
  MatInput,
  MatInputModule,
  MatLabel,
  MatSuffix,
  MaxLengthValidator,
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
} from "./chunk-IBDYQGEV.js";

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
function WelcomeComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 9);
  }
}
function WelcomeComponent_Conditional_20_Template(rf, ctx) {
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
  currentTime$ = this.timeService.utcTime$;
  onSubmit() {
    if (this.welcomeForm.invalid)
      return;
    const { code } = this.welcomeForm.value;
    if (!code)
      return;
    this.isLoading.set(true);
    this.error.set(null);
    this.auth.verifyTwoFactor(code).subscribe({
      next: (payload) => {
        if (payload.token && !payload.requiresTwoFactor) {
          window.location.href = "/DocumentDataSet";
        } else {
          this.error.set("\u041D\u0435\u0432\u0456\u0440\u043D\u0438\u0439 \u043A\u043E\u0434 \u043F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0436\u0435\u043D\u043D\u044F");
          this.isLoading.set(false);
        }
      },
      error: (err) => {
        this.error.set("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0430. \u0421\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u043F\u0456\u0437\u043D\u0456\u0448\u0435.");
        this.isLoading.set(false);
        console.error("2FA Error:", err);
      }
    });
  }
  static \u0275fac = function WelcomeComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _WelcomeComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _WelcomeComponent, selectors: [["app-welcome"]], decls: 29, vars: 11, consts: [[1, "welcome-container"], [1, "welcome-card"], [3, "ngSubmit", "formGroup"], ["appearance", "outline", 1, "otp-field"], ["matInput", "", "type", "text", "formControlName", "code", "placeholder", "000000", "autocomplete", "one-time-code", "maxlength", "6"], ["matSuffix", ""], [1, "error-message"], [1, "actions"], ["mat-flat-button", "", "color", "primary", "type", "submit", 3, "disabled"], ["diameter", "20"], [1, "clock-footer"], [1, "utc-clock"]], template: function WelcomeComponent_Template(rf, ctx) {
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
      \u0275\u0275elementStart(17, "div", 7)(18, "button", 8);
      \u0275\u0275conditionalCreate(19, WelcomeComponent_Conditional_19_Template, 1, 0, "mat-spinner", 9)(20, WelcomeComponent_Conditional_20_Template, 4, 0, "ng-container");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(21, "mat-card-footer", 10)(22, "div", 11)(23, "mat-icon");
      \u0275\u0275text(24, "schedule");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "span");
      \u0275\u0275text(26);
      \u0275\u0275pipe(27, "async");
      \u0275\u0275pipe(28, "date");
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
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.welcomeForm.invalid || ctx.isLoading());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isLoading() ? 19 : 20);
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(28, 8, \u0275\u0275pipeBind1(27, 6, ctx.currentTime$), "HH:mm:ss"), " UTC");
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
  ], styles: ['\n\n.welcome-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 100vh;\n  background:\n    radial-gradient(\n      circle at top right,\n      #1a237e 0%,\n      #121212 60%);\n  color: #fff;\n  padding: 16px;\n}\n.welcome-card[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 420px;\n  border-radius: 12px;\n  background-color: rgba(30, 30, 30, 0.95);\n  -webkit-backdrop-filter: blur(8px);\n  backdrop-filter: blur(8px);\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.8);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n}\n.welcome-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.welcome-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 500;\n  letter-spacing: -0.02em;\n}\n.welcome-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-subtitle[_ngcontent-%COMP%] {\n  color: rgba(255, 255, 255, 0.7);\n  margin-top: 4px;\n}\n.welcome-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.welcome-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .otp-field[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.welcome-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .otp-field[_ngcontent-%COMP%]     .mat-mdc-text-field-wrapper {\n  background-color: rgba(255, 255, 255, 0.05);\n}\n.welcome-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .otp-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  text-align: center;\n  font-family: "Roboto Mono", monospace;\n  font-size: 2rem;\n  letter-spacing: 0.5em;\n  padding-left: 0.5em;\n}\n.welcome-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  color: #f44336;\n  background: rgba(244, 67, 54, 0.1);\n  padding: 12px;\n  border-radius: 4px;\n  font-size: 0.85rem;\n}\n.welcome-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  margin-top: 16px;\n}\n.welcome-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 8px 24px;\n  font-size: 1rem;\n  border-radius: 8px;\n}\n.welcome-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  margin-right: 8px;\n}\n.welcome-card[_ngcontent-%COMP%]   .clock-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  padding: 12px;\n  border-top: 1px solid rgba(255, 255, 255, 0.1);\n  background: rgba(0, 0, 0, 0.2);\n}\n.welcome-card[_ngcontent-%COMP%]   .clock-footer[_ngcontent-%COMP%]   .utc-clock[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-family: "Roboto Mono", monospace;\n  color: rgba(255, 255, 255, 0.5);\n  font-size: 0.8rem;\n}\n.welcome-card[_ngcontent-%COMP%]   .clock-footer[_ngcontent-%COMP%]   .utc-clock[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}'] });
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
`, styles: ['/* src/app/pages/welcome/welcome.component.scss */\n.welcome-container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 100vh;\n  background:\n    radial-gradient(\n      circle at top right,\n      #1a237e 0%,\n      #121212 60%);\n  color: #fff;\n  padding: 16px;\n}\n.welcome-card {\n  width: 100%;\n  max-width: 420px;\n  border-radius: 12px;\n  background-color: rgba(30, 30, 30, 0.95);\n  -webkit-backdrop-filter: blur(8px);\n  backdrop-filter: blur(8px);\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.8);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n}\n.welcome-card mat-card-header {\n  margin-bottom: 24px;\n}\n.welcome-card mat-card-header mat-card-title {\n  font-size: 1.5rem;\n  font-weight: 500;\n  letter-spacing: -0.02em;\n}\n.welcome-card mat-card-header mat-card-subtitle {\n  color: rgba(255, 255, 255, 0.7);\n  margin-top: 4px;\n}\n.welcome-card mat-card-content form {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.welcome-card mat-card-content .otp-field {\n  width: 100%;\n}\n.welcome-card mat-card-content .otp-field ::ng-deep .mat-mdc-text-field-wrapper {\n  background-color: rgba(255, 255, 255, 0.05);\n}\n.welcome-card mat-card-content .otp-field input {\n  text-align: center;\n  font-family: "Roboto Mono", monospace;\n  font-size: 2rem;\n  letter-spacing: 0.5em;\n  padding-left: 0.5em;\n}\n.welcome-card mat-card-content .error-message {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  color: #f44336;\n  background: rgba(244, 67, 54, 0.1);\n  padding: 12px;\n  border-radius: 4px;\n  font-size: 0.85rem;\n}\n.welcome-card mat-card-content .actions {\n  display: flex;\n  justify-content: flex-end;\n  margin-top: 16px;\n}\n.welcome-card mat-card-content .actions button {\n  padding: 8px 24px;\n  font-size: 1rem;\n  border-radius: 8px;\n}\n.welcome-card mat-card-content .actions button mat-icon {\n  margin-right: 8px;\n}\n.welcome-card .clock-footer {\n  display: flex;\n  justify-content: center;\n  padding: 12px;\n  border-top: 1px solid rgba(255, 255, 255, 0.1);\n  background: rgba(0, 0, 0, 0.2);\n}\n.welcome-card .clock-footer .utc-clock {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-family: "Roboto Mono", monospace;\n  color: rgba(255, 255, 255, 0.5);\n  font-size: 0.8rem;\n}\n.welcome-card .clock-footer .utc-clock mat-icon {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(WelcomeComponent, { className: "WelcomeComponent", filePath: "app/pages/welcome/welcome.component.ts", lineNumber: 30 });
})();
export {
  WelcomeComponent
};
