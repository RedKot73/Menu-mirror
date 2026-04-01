import {
  MatIcon,
  MatIconModule
} from "./chunk-2EFRQAL5.js";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle
} from "./chunk-O3FG6F5X.js";
import {
  ChangeDetectionStrategy,
  CommonModule,
  Component,
  Inject,
  MatButton,
  MatButtonModule,
  NgClass,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-IBDYQGEV.js";

// src/app/dialogs/ConfirmDialog.component.ts
function ConfirmDialogComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 1);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", ctx_r0.data.color || "warn");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.data.icon);
  }
}
var ConfirmDialogComponent = class _ConfirmDialogComponent {
  constructor(ref, data) {
    this.ref = ref;
    this.data = data;
  }
  close(result) {
    this.ref.close(result);
  }
  static \u0275fac = function ConfirmDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ConfirmDialogComponent)(\u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ConfirmDialogComponent, selectors: [["app-confirm-dialog"]], decls: 10, vars: 6, consts: [["mat-dialog-title", "", 1, "title"], [1, "icon", 3, "ngClass"], ["mat-dialog-content", "", 1, "content"], ["mat-dialog-actions", "", "align", "end"], ["mat-button", "", 3, "click"], ["mat-raised-button", "", "cdkFocusInitial", "", 3, "click", "color"]], template: function ConfirmDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "h2", 0);
      \u0275\u0275conditionalCreate(1, ConfirmDialogComponent_Conditional_1_Template, 2, 2, "mat-icon", 1);
      \u0275\u0275text(2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "div", 2);
      \u0275\u0275text(4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "div", 3)(6, "button", 4);
      \u0275\u0275listener("click", function ConfirmDialogComponent_Template_button_click_6_listener() {
        return ctx.close(false);
      });
      \u0275\u0275text(7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "button", 5);
      \u0275\u0275listener("click", function ConfirmDialogComponent_Template_button_click_8_listener() {
        return ctx.close(true);
      });
      \u0275\u0275text(9);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.data.icon ? 1 : -1);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.data.title || "\u041F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0436\u0435\u043D\u043D\u044F", " ");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.data.message, " ");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.data.cancelText || "\u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438");
      \u0275\u0275advance();
      \u0275\u0275property("color", ctx.data.color || "warn");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.data.confirmText || "\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438", " ");
    }
  }, dependencies: [CommonModule, NgClass, MatDialogModule, MatDialogTitle, MatDialogActions, MatDialogContent, MatButtonModule, MatButton, MatIconModule, MatIcon], styles: ["\n\n.title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin: 0;\n}\n.icon[_ngcontent-%COMP%] {\n  font-size: 22px;\n  height: 22px;\n  width: 22px;\n}\n.content[_ngcontent-%COMP%] {\n  white-space: pre-line;\n}"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ConfirmDialogComponent, [{
    type: Component,
    args: [{ selector: "app-confirm-dialog", standalone: true, imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <h2 mat-dialog-title class="title">
        @if(data.icon){
            <mat-icon class="icon" [ngClass]="data.color || 'warn'">{{ data.icon }}</mat-icon>
        }
      {{ data.title || '\u041F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0436\u0435\u043D\u043D\u044F' }}
    </h2>

    <div mat-dialog-content class="content">
      {{ data.message }}
    </div>

    <div mat-dialog-actions align="end">
      <button mat-button (click)="close(false)">{{ data.cancelText || '\u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438' }}</button>
      <button mat-raised-button [color]="data.color || 'warn'" (click)="close(true)" cdkFocusInitial>
        {{ data.confirmText || '\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438' }}
      </button>
    </div>
  `, styles: ["/* angular:styles/component:css;2fb02ea0232d57f6159dc1cc9544cf15d830546870df75d86ae5609ed8e6897e;/home/havrok/projects/work/411/s5/s5app/Menu/S5Server/Front/src/app/dialogs/ConfirmDialog.component.ts */\n.title {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin: 0;\n}\n.icon {\n  font-size: 22px;\n  height: 22px;\n  width: 22px;\n}\n.content {\n  white-space: pre-line;\n}\n"] }]
  }], () => [{ type: MatDialogRef }, { type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ConfirmDialogComponent, { className: "ConfirmDialogComponent", filePath: "app/dialogs/ConfirmDialog.component.ts", lineNumber: 46 });
})();

export {
  ConfirmDialogComponent
};
