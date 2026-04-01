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
  Component,
  DefaultValueAccessor,
  FormsModule,
  HttpClient,
  Inject,
  Injectable,
  MatButton,
  MatButtonModule,
  MatFormField,
  MatFormFieldModule,
  MatInput,
  MatInputModule,
  MatLabel,
  NgControlStatus,
  NgModel,
  RequiredValidator,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵinject,
  ɵɵlistener,
  ɵɵproperty,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-IBDYQGEV.js";

// src/app/dialogs/SimpleDict-dialog.component.ts
var SimpleDictDialogComponent = class _SimpleDictDialogComponent {
  constructor(data, ref) {
    this.data = data;
    this.ref = ref;
  }
  onCancel() {
    this.ref.close();
  }
  onSave() {
    this.ref.close(this.data);
  }
  static \u0275fac = function SimpleDictDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SimpleDictDialogComponent)(\u0275\u0275directiveInject(MAT_DIALOG_DATA), \u0275\u0275directiveInject(MatDialogRef));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SimpleDictDialogComponent, selectors: [["dict-dialog"]], decls: 16, vars: 4, consts: [["mat-dialog-title", ""], ["mat-dialog-content", "", 1, "content"], ["appearance", "outline", "floatLabel", "always"], ["matInput", "", "required", "", 3, "ngModelChange", "ngModel"], ["matInput", "", 3, "ngModelChange", "ngModel"], ["mat-dialog-actions", "", "align", "end", 1, "actions"], ["mat-button", "", 3, "click"], ["mat-raised-button", "", "color", "primary", 3, "click", "disabled"]], template: function SimpleDictDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "h2", 0);
      \u0275\u0275text(1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(2, "div", 1)(3, "mat-form-field", 2)(4, "mat-label");
      \u0275\u0275text(5, "\u0417\u043D\u0430\u0447\u0435\u043D\u043D\u044F");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "input", 3);
      \u0275\u0275twoWayListener("ngModelChange", function SimpleDictDialogComponent_Template_input_ngModelChange_6_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.data.value, $event) || (ctx.data.value = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "mat-form-field", 2)(8, "mat-label");
      \u0275\u0275text(9, "\u041A\u043E\u043C\u0435\u043D\u0442\u0430\u0440");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "input", 4);
      \u0275\u0275twoWayListener("ngModelChange", function SimpleDictDialogComponent_Template_input_ngModelChange_10_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.data.comment, $event) || (ctx.data.comment = $event);
        return $event;
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(11, "div", 5)(12, "button", 6);
      \u0275\u0275listener("click", function SimpleDictDialogComponent_Template_button_click_12_listener() {
        return ctx.onCancel();
      });
      \u0275\u0275text(13, "\u0412\u0456\u0434\u043C\u0456\u043D\u0430");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "button", 7);
      \u0275\u0275listener("click", function SimpleDictDialogComponent_Template_button_click_14_listener() {
        return ctx.onSave();
      });
      \u0275\u0275text(15, "\u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438");
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275textInterpolate(ctx.data.id ? "\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438" : "\u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438 \u043D\u043E\u0432\u0438\u0439");
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.data.value);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.data.comment);
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", !ctx.data.value.trim());
    }
  }, dependencies: [MatFormFieldModule, MatFormField, MatLabel, MatInputModule, MatInput, MatDialogModule, MatDialogTitle, MatDialogActions, MatDialogContent, MatButtonModule, MatButton, FormsModule, DefaultValueAccessor, NgControlStatus, RequiredValidator, NgModel], styles: ["\n\n.title[_ngcontent-%COMP%] {\n  text-align: center;\n  margin: 0;\n}\n.content[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 12px;\n  min-width: 280px;\n  max-width: 520px;\n  padding-top: 10px !important;\n}\n  .content .mat-mdc-form-field {\n  width: 100%;\n}\n.actions[_ngcontent-%COMP%] {\n  gap: 8px;\n}"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SimpleDictDialogComponent, [{
    type: Component,
    args: [{ selector: "dict-dialog", standalone: true, imports: [MatFormFieldModule, MatInputModule, MatDialogModule, MatButtonModule, FormsModule], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <h2 mat-dialog-title>{{ data.id ? '\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438' : '\u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438 \u043D\u043E\u0432\u0438\u0439' }}</h2>
    <div mat-dialog-content class="content">
      <mat-form-field appearance="outline" floatLabel="always">
        <mat-label>\u0417\u043D\u0430\u0447\u0435\u043D\u043D\u044F</mat-label>
        <input matInput [(ngModel)]="data.value" required>
      </mat-form-field>
      <mat-form-field appearance="outline" floatLabel="always">
        <mat-label>\u041A\u043E\u043C\u0435\u043D\u0442\u0430\u0440</mat-label>
        <input matInput [(ngModel)]="data.comment">
      </mat-form-field>
    </div>
    <div mat-dialog-actions align="end" class="actions">
      <button mat-button (click)="onCancel()">\u0412\u0456\u0434\u043C\u0456\u043D\u0430</button>
      <button mat-raised-button color="primary" (click)="onSave()" [disabled]="!data.value.trim()">\u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438</button>
    </div>`, styles: ["/* src/app/dialogs/DialogShared.scss */\n.title {\n  text-align: center;\n  margin: 0;\n}\n.content {\n  display: grid;\n  gap: 12px;\n  min-width: 280px;\n  max-width: 520px;\n  padding-top: 10px !important;\n}\n::ng-deep .content .mat-mdc-form-field {\n  width: 100%;\n}\n.actions {\n  gap: 8px;\n}\n"] }]
  }], () => [{ type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }, { type: MatDialogRef }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SimpleDictDialogComponent, { className: "SimpleDictDialogComponent", filePath: "app/dialogs/SimpleDict-dialog.component.ts", lineNumber: 33 });
})();

// src/ServerService/simpleDict.service.ts
var SimpleDictService = class _SimpleDictService {
  constructor(http) {
    this.http = http;
  }
  getAll(api) {
    return this.http.get(api);
  }
  get(api, id) {
    return this.http.get(`${api}/${id}`);
  }
  create(api, dto) {
    return this.http.post(api, dto);
  }
  update(api, id, dto) {
    return this.http.put(`${api}/${id}`, dto);
  }
  delete(api, id) {
    return this.http.delete(`${api}/${id}`);
  }
  //Работают по разному, не путать
  // GET /api/.../lookup - Получить список для автозаполнения
  // GET /api/.../sel_list - Получить список для селекта
  lookup(api, term, limit = 10) {
    return this.http.get(`${api}/lookup`, {
      params: { term, limit }
    });
  }
  //Работают по разному, не путать
  // GET /api/.../lookup - Получить список для автозаполнения
  // GET /api/.../sel_list - Получить список для селекта
  getSelectList(api) {
    return this.http.get(`${api}/sel_list`);
  }
  // Для каждого справочника создавайте отдельный сигнал через этот метод
  createItemsSignal(api) {
    const items = signal([], ...ngDevMode ? [{ debugName: "items" }] : []);
    this.getAll(api).subscribe(items.set);
    return items;
  }
  static \u0275fac = function SimpleDictService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SimpleDictService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _SimpleDictService, factory: _SimpleDictService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SimpleDictService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  SimpleDictDialogComponent,
  SimpleDictService
};
