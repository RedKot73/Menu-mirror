import {
  DateMaskDirective,
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle,
  UnitSelectDialogComponent
} from "./chunk-MJM6ET7F.js";
import {
  UnitService
} from "./chunk-3ARLYWIN.js";
import {
  MatTooltip,
  MatTooltipModule
} from "./chunk-TKT7GR2R.js";
import {
  provideNativeDateAdapter
} from "./chunk-SNKAS4TF.js";
import {
  MatSelect,
  MatSelectModule
} from "./chunk-5336NQQD.js";
import {
  MatOption
} from "./chunk-MGHM5LON.js";
import {
  DictRankService
} from "./chunk-VVIVTAJ6.js";
import {
  MAT_DIALOG_DATA,
  MatDialog,
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
  Injectable,
  MatButton,
  MatButtonModule,
  MatIconButton,
  __spreadValues,
  forkJoin,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵProvidersFeature,
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
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-CK6AJVHQ.js";

// src/ServerService/dictPosition.service.ts
var DictPositionService = class _DictPositionService {
  api = "/api/dict-positions";
  http = inject(HttpClient);
  createItemsSignal() {
    return signal([]);
  }
  getAll() {
    return this.http.get(this.api);
  }
  lookup(term, limit = 10) {
    const params = { term, limit: limit.toString() };
    return this.http.get(`${this.api}/lookup`, { params });
  }
  getById(id) {
    return this.http.get(`${this.api}/${id}`);
  }
  create(item) {
    return this.http.post(this.api, item);
  }
  update(id, item) {
    return this.http.put(`${this.api}/${id}`, item);
  }
  delete(id) {
    return this.http.delete(`${this.api}/${id}`);
  }
  //Работают по разному, не путать
  // GET /api/.../lookup - Получить список для автозаполнения
  // GET /api/.../sel_list - Получить список для селекта
  getSelectList() {
    return this.http.get(`${this.api}/sel_list`);
  }
  static \u0275fac = function DictPositionService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DictPositionService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DictPositionService, factory: _DictPositionService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DictPositionService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/ServerService/dictSoldierStates.service.ts
var DictSoldierStatesService = class _DictSoldierStatesService {
  api = "/api/dict-soldier-states";
  http = inject(HttpClient);
  createItemsSignal() {
    return signal([]);
  }
  getAll() {
    return this.http.get(this.api);
  }
  lookup(term, limit = 10) {
    const params = { term, limit: limit.toString() };
    return this.http.get(`${this.api}/lookup`, { params });
  }
  getById(id) {
    return this.http.get(`${this.api}/${id}`);
  }
  create(item) {
    return this.http.post(this.api, item);
  }
  update(id, item) {
    return this.http.put(`${this.api}/${id}`, item);
  }
  delete(id) {
    return this.http.delete(`${this.api}/${id}`);
  }
  //Работают по разному, не путать
  // GET /api/.../lookup - Получить список для автозаполнения
  // GET /api/.../sel_list - Получить список для селекта
  getSelectList() {
    return this.http.get(`${this.api}/sel_list`);
  }
  static \u0275fac = function DictSoldierStatesService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DictSoldierStatesService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DictSoldierStatesService, factory: _DictSoldierStatesService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DictSoldierStatesService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/dialogs/SoldierDialog.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function SoldierDialogComponent_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 21);
    \u0275\u0275listener("click", function SoldierDialogComponent_Conditional_33_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.clearUnit("assigned"));
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "close");
    \u0275\u0275elementEnd()();
  }
}
function SoldierDialogComponent_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 21);
    \u0275\u0275listener("click", function SoldierDialogComponent_Conditional_41_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.clearUnit("involved"));
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "close");
    \u0275\u0275elementEnd()();
  }
}
function SoldierDialogComponent_For_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const rank_r5 = ctx.$implicit;
    \u0275\u0275property("value", rank_r5.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(rank_r5.value);
  }
}
function SoldierDialogComponent_For_67_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const pos_r6 = ctx.$implicit;
    \u0275\u0275property("value", pos_r6.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(pos_r6.value);
  }
}
function SoldierDialogComponent_For_73_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const state_r7 = ctx.$implicit;
    \u0275\u0275property("value", state_r7.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(state_r7.value);
  }
}
function SoldierDialogComponent_Conditional_83_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 22);
    \u0275\u0275listener("click", function SoldierDialogComponent_Conditional_83_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.save(true));
    });
    \u0275\u0275text(1, " \u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438 \u0456 \u043F\u0440\u043E\u0434\u043E\u0432\u0436\u0438\u0442\u0438 ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", !ctx_r2.isFormValid);
  }
}
var SoldierDialogComponent = class _SoldierDialogComponent {
  dialogRef = inject(MatDialogRef);
  dialog = inject(MatDialog);
  unitService = inject(UnitService);
  dictRankService = inject(DictRankService);
  dictPositionService = inject(DictPositionService);
  dictStatesService = inject(DictSoldierStatesService);
  data = inject(MAT_DIALOG_DATA);
  model;
  // Довідники
  dictRanks = [];
  dictPositions = [];
  dictStates = [];
  // Назви підрозділів для відображення
  unitDisplay = "";
  assignedUnitDisplay = "";
  involvedUnitDisplay = "";
  constructor() {
    this.model = __spreadValues({}, this.data.model);
  }
  ngOnInit() {
    this.loadDictionaries();
    this.loadExistingUnits();
  }
  // ── Довідники ─────────────────────────
  loadDictionaries() {
    forkJoin({
      ranks: this.dictRankService.getSelectList(),
      positions: this.dictPositionService.getSelectList(),
      states: this.dictStatesService.getSelectList()
    }).subscribe(({ ranks, positions, states }) => {
      this.dictRanks = ranks;
      this.dictPositions = positions;
      this.dictStates = states;
    });
  }
  /** Завантажити назви підрозділів для режиму редагування */
  loadExistingUnits() {
    if (this.model.unitId) {
      this.unitService.getById(this.model.unitId).subscribe((unit) => {
        this.unitDisplay = unit.shortName || unit.name;
      });
    }
    if (this.model.assignedUnitId) {
      this.unitService.getById(this.model.assignedUnitId).subscribe((unit) => {
        this.assignedUnitDisplay = unit.shortName || unit.name;
      });
    }
    if (this.model.involvedUnitId) {
      this.unitService.getById(this.model.involvedUnitId).subscribe((unit) => {
        this.involvedUnitDisplay = unit.shortName || unit.name;
      });
    }
  }
  // ── Вибір підрозділу через діалог ─────
  openUnitSelect(field) {
    const titles = {
      unit: "\u0412\u0438\u0431\u0456\u0440 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0443",
      assigned: "\u041F\u0440\u0438\u0434\u0430\u043D\u0438\u0439 \u0434\u043E \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0443",
      involved: "\u0415\u043A\u0456\u043F\u0430\u0436/\u0413\u0440\u0443\u043F\u0430"
    };
    const dialogRef = this.dialog.open(UnitSelectDialogComponent, {
      width: "900px",
      maxHeight: "90vh",
      data: { title: titles[field] }
    });
    dialogRef.afterClosed().subscribe((unit) => {
      if (unit) {
        const display = unit.shortName || unit.name;
        switch (field) {
          case "unit":
            this.model.unitId = unit.id;
            this.unitDisplay = display;
            break;
          case "assigned":
            this.model.assignedUnitId = unit.id;
            this.assignedUnitDisplay = display;
            break;
          case "involved":
            this.model.involvedUnitId = unit.id;
            this.involvedUnitDisplay = display;
            break;
        }
      }
    });
  }
  clearUnit(field) {
    if (field === "assigned") {
      this.model.assignedUnitId = void 0;
      this.assignedUnitDisplay = "";
    } else {
      this.model.involvedUnitId = void 0;
      this.involvedUnitDisplay = "";
    }
  }
  // ── Дати ──────────────────────────────
  onArrivedAtChange(event) {
    if (event.value) {
      this.model.arrivedAt = event.value;
    }
  }
  onDepartedAtChange(event) {
    this.model.departedAt = event.value || void 0;
  }
  // ── Валідація та збереження ────────────
  get isFormValid() {
    return !!(this.model.firstName?.trim() && this.model.unitId && this.model.rankId && this.model.positionId && this.model.stateId);
  }
  save(andContinue) {
    if (this.isFormValid) {
      this.dialogRef.close({ model: this.model, continue: andContinue });
    }
  }
  static \u0275fac = function SoldierDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SoldierDialogComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SoldierDialogComponent, selectors: [["app-soldier-dialog"]], features: [\u0275\u0275ProvidersFeature([provideNativeDateAdapter()])], decls: 84, vars: 22, consts: [["arrivedPicker", ""], ["departedPicker", ""], ["mat-dialog-title", ""], [1, "dialog-content"], ["appearance", "outline", 1, "full-width"], ["matInput", "", "required", "", 3, "ngModelChange", "ngModel"], ["matInput", "", 3, "ngModelChange", "ngModel"], ["matInput", "", "readonly", "", "required", "", 3, "value"], ["mat-icon-button", "", "matSuffix", "", "color", "primary", "matTooltip", "\u0412\u0438\u0431\u0440\u0430\u0442\u0438 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B", 3, "click"], ["matInput", "", "readonly", "", 3, "value"], ["mat-icon-button", "", "matSuffix", "", "matTooltip", "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u0438"], ["matInput", "", "appDateMask", "", "required", "", 3, "dateChange", "matDatepicker", "value"], ["matIconSuffix", "", 3, "for"], ["matInput", "", "appDateMask", "", 3, "dateChange", "matDatepicker", "value"], ["required", "", 3, "ngModelChange", "ngModel"], [3, "value"], ["matInput", "", "rows", "3", 3, "ngModelChange", "ngModel"], ["align", "end"], ["mat-button", "", "mat-dialog-close", ""], ["mat-flat-button", "", "color", "primary", 3, "click", "disabled"], ["mat-flat-button", "", "color", "accent", 3, "disabled"], ["mat-icon-button", "", "matSuffix", "", "matTooltip", "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u0438", 3, "click"], ["mat-flat-button", "", "color", "accent", 3, "click", "disabled"]], template: function SoldierDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "h2", 2);
      \u0275\u0275text(1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(2, "mat-dialog-content", 3)(3, "mat-form-field", 4)(4, "mat-label");
      \u0275\u0275text(5, "\u041F\u0440\u0456\u0437\u0432\u0438\u0449\u0435");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "input", 5);
      \u0275\u0275twoWayListener("ngModelChange", function SoldierDialogComponent_Template_input_ngModelChange_6_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.model.firstName, $event) || (ctx.model.firstName = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "mat-form-field", 4)(8, "mat-label");
      \u0275\u0275text(9, "\u0406\u043C'\u044F");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "input", 6);
      \u0275\u0275twoWayListener("ngModelChange", function SoldierDialogComponent_Template_input_ngModelChange_10_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.model.midleName, $event) || (ctx.model.midleName = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "mat-form-field", 4)(12, "mat-label");
      \u0275\u0275text(13, "\u041F\u043E \u0431\u0430\u0442\u044C\u043A\u043E\u0432\u0456");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "input", 6);
      \u0275\u0275twoWayListener("ngModelChange", function SoldierDialogComponent_Template_input_ngModelChange_14_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.model.lastName, $event) || (ctx.model.lastName = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "mat-form-field", 4)(16, "mat-label");
      \u0275\u0275text(17, "\u041F\u043E\u0437\u0438\u0432\u043D\u0438\u0439");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "input", 6);
      \u0275\u0275twoWayListener("ngModelChange", function SoldierDialogComponent_Template_input_ngModelChange_18_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.model.nickName, $event) || (ctx.model.nickName = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(19, "mat-form-field", 4)(20, "mat-label");
      \u0275\u0275text(21, "\u041F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B");
      \u0275\u0275elementEnd();
      \u0275\u0275element(22, "input", 7);
      \u0275\u0275elementStart(23, "button", 8);
      \u0275\u0275listener("click", function SoldierDialogComponent_Template_button_click_23_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.openUnitSelect("unit"));
      });
      \u0275\u0275elementStart(24, "mat-icon");
      \u0275\u0275text(25, "domain");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(26, "mat-form-field", 4)(27, "mat-label");
      \u0275\u0275text(28, "\u041F\u0440\u0438\u0434\u0430\u043D\u0438\u0439 \u0434\u043E \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0443");
      \u0275\u0275elementEnd();
      \u0275\u0275element(29, "input", 9);
      \u0275\u0275elementStart(30, "button", 8);
      \u0275\u0275listener("click", function SoldierDialogComponent_Template_button_click_30_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.openUnitSelect("assigned"));
      });
      \u0275\u0275elementStart(31, "mat-icon");
      \u0275\u0275text(32, "domain");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(33, SoldierDialogComponent_Conditional_33_Template, 3, 0, "button", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "mat-form-field", 4)(35, "mat-label");
      \u0275\u0275text(36, "\u0415\u043A\u0456\u043F\u0430\u0436/\u0413\u0440\u0443\u043F\u0430");
      \u0275\u0275elementEnd();
      \u0275\u0275element(37, "input", 9);
      \u0275\u0275elementStart(38, "button", 8);
      \u0275\u0275listener("click", function SoldierDialogComponent_Template_button_click_38_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.openUnitSelect("involved"));
      });
      \u0275\u0275elementStart(39, "mat-icon");
      \u0275\u0275text(40, "domain");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(41, SoldierDialogComponent_Conditional_41_Template, 3, 0, "button", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(42, "mat-form-field", 4)(43, "mat-label");
      \u0275\u0275text(44, "\u041F\u0440\u0438\u0431\u0443\u0432 \u0434\u043E \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0443");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(45, "input", 11);
      \u0275\u0275listener("dateChange", function SoldierDialogComponent_Template_input_dateChange_45_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onArrivedAtChange($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275element(46, "mat-datepicker-toggle", 12)(47, "mat-datepicker", null, 0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(49, "mat-form-field", 4)(50, "mat-label");
      \u0275\u0275text(51, "\u0412\u0438\u0431\u0443\u0432 \u0437 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0443");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(52, "input", 13);
      \u0275\u0275listener("dateChange", function SoldierDialogComponent_Template_input_dateChange_52_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onDepartedAtChange($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275element(53, "mat-datepicker-toggle", 12)(54, "mat-datepicker", null, 1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(56, "mat-form-field", 4)(57, "mat-label");
      \u0275\u0275text(58, "\u0417\u0432\u0430\u043D\u043D\u044F");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(59, "mat-select", 14);
      \u0275\u0275twoWayListener("ngModelChange", function SoldierDialogComponent_Template_mat_select_ngModelChange_59_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.model.rankId, $event) || (ctx.model.rankId = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275repeaterCreate(60, SoldierDialogComponent_For_61_Template, 2, 2, "mat-option", 15, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(62, "mat-form-field", 4)(63, "mat-label");
      \u0275\u0275text(64, "\u041F\u043E\u0441\u0430\u0434\u0430");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(65, "mat-select", 14);
      \u0275\u0275twoWayListener("ngModelChange", function SoldierDialogComponent_Template_mat_select_ngModelChange_65_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.model.positionId, $event) || (ctx.model.positionId = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275repeaterCreate(66, SoldierDialogComponent_For_67_Template, 2, 2, "mat-option", 15, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(68, "mat-form-field", 4)(69, "mat-label");
      \u0275\u0275text(70, "\u0421\u0442\u0430\u0442\u0443\u0441");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(71, "mat-select", 14);
      \u0275\u0275twoWayListener("ngModelChange", function SoldierDialogComponent_Template_mat_select_ngModelChange_71_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.model.stateId, $event) || (ctx.model.stateId = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275repeaterCreate(72, SoldierDialogComponent_For_73_Template, 2, 2, "mat-option", 15, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(74, "mat-form-field", 4)(75, "mat-label");
      \u0275\u0275text(76, "\u041A\u043E\u043C\u0435\u043D\u0442\u0430\u0440");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(77, "textarea", 16);
      \u0275\u0275twoWayListener("ngModelChange", function SoldierDialogComponent_Template_textarea_ngModelChange_77_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.model.comment, $event) || (ctx.model.comment = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(78, "mat-dialog-actions", 17)(79, "button", 18);
      \u0275\u0275text(80, "\u0412\u0456\u0434\u043C\u0456\u043D\u0430");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(81, "button", 19);
      \u0275\u0275listener("click", function SoldierDialogComponent_Template_button_click_81_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.save(false));
      });
      \u0275\u0275text(82, " \u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438 ");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(83, SoldierDialogComponent_Conditional_83_Template, 2, 1, "button", 20);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      const arrivedPicker_r9 = \u0275\u0275reference(48);
      const departedPicker_r10 = \u0275\u0275reference(55);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate(ctx.data.id ? "\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438 \u0431\u0456\u0439\u0446\u044F" : "\u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438 \u043D\u043E\u0432\u043E\u0433\u043E \u0431\u0456\u0439\u0446\u044F");
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.model.firstName);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.model.midleName);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.model.lastName);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.model.nickName);
      \u0275\u0275advance(4);
      \u0275\u0275property("value", ctx.unitDisplay);
      \u0275\u0275advance(7);
      \u0275\u0275property("value", ctx.assignedUnitDisplay);
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.model.assignedUnitId ? 33 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275property("value", ctx.involvedUnitDisplay);
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.model.involvedUnitId ? 41 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275property("matDatepicker", arrivedPicker_r9)("value", ctx.model.arrivedAt);
      \u0275\u0275advance();
      \u0275\u0275property("for", arrivedPicker_r9);
      \u0275\u0275advance(6);
      \u0275\u0275property("matDatepicker", departedPicker_r10)("value", ctx.model.departedAt);
      \u0275\u0275advance();
      \u0275\u0275property("for", departedPicker_r10);
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.model.rankId);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.dictRanks);
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.model.positionId);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.dictPositions);
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.model.stateId);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.dictStates);
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.model.comment);
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", !ctx.isFormValid);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.data.id ? 83 : -1);
    }
  }, dependencies: [FormsModule, DefaultValueAccessor, NgControlStatus, RequiredValidator, NgModel, MatDialogModule, MatDialogClose, MatDialogTitle, MatDialogActions, MatDialogContent, MatFormFieldModule, MatFormField, MatLabel, MatSuffix, MatInputModule, MatInput, MatButtonModule, MatButton, MatIconButton, MatSelectModule, MatSelect, MatOption, MatIconModule, MatIcon, MatTooltipModule, MatTooltip, MatDatepickerModule, MatDatepicker, MatDatepickerInput, MatDatepickerToggle, DateMaskDirective], styles: ["\n\n.dialog-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  min-width: 320px;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.error-text[_ngcontent-%COMP%] {\n  color: var(--mat-warn-color, #f44336);\n  font-size: 12px;\n  margin: -4px 0 4px 0;\n}\n.hint-text[_ngcontent-%COMP%] {\n  color: #666;\n  font-size: 12px;\n  margin: -4px 0 8px 0;\n}\n.validation-errors[_ngcontent-%COMP%] {\n  margin: -4px 0 4px 0;\n}\n.icon-success[_ngcontent-%COMP%] {\n  color: #4caf50;\n}\n/*# sourceMappingURL=dialog-shared.css.map */", "\n\n.dialog-content[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 4px;\n  min-width: 420px;\n  max-width: 600px;\n}\ntextarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  min-height: 60px;\n}\n/*# sourceMappingURL=SoldierDialog.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SoldierDialogComponent, [{
    type: Component,
    args: [{ selector: "app-soldier-dialog", imports: [
      FormsModule,
      MatDialogModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatSelectModule,
      MatIconModule,
      MatTooltipModule,
      MatDatepickerModule,
      DateMaskDirective
    ], providers: [provideNativeDateAdapter()], template: `
    <h2 mat-dialog-title>{{ data.id ? '\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438 \u0431\u0456\u0439\u0446\u044F' : '\u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438 \u043D\u043E\u0432\u043E\u0433\u043E \u0431\u0456\u0439\u0446\u044F' }}</h2>
    <mat-dialog-content class="dialog-content">
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>\u041F\u0440\u0456\u0437\u0432\u0438\u0449\u0435</mat-label>
        <input matInput [(ngModel)]="model.firstName" required />
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>\u0406\u043C'\u044F</mat-label>
        <input matInput [(ngModel)]="model.midleName" />
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>\u041F\u043E \u0431\u0430\u0442\u044C\u043A\u043E\u0432\u0456</mat-label>
        <input matInput [(ngModel)]="model.lastName" />
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>\u041F\u043E\u0437\u0438\u0432\u043D\u0438\u0439</mat-label>
        <input matInput [(ngModel)]="model.nickName" />
      </mat-form-field>

      <!-- \u041F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B -->
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>\u041F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B</mat-label>
        <input matInput [value]="unitDisplay" readonly required />
        <button
          mat-icon-button
          matSuffix
          color="primary"
          (click)="openUnitSelect('unit')"
          matTooltip="\u0412\u0438\u0431\u0440\u0430\u0442\u0438 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B"
        >
          <mat-icon>domain</mat-icon>
        </button>
      </mat-form-field>

      <!-- \u041F\u0440\u0438\u0434\u0430\u043D\u0438\u0439 \u0434\u043E \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0443 -->
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>\u041F\u0440\u0438\u0434\u0430\u043D\u0438\u0439 \u0434\u043E \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0443</mat-label>
        <input matInput [value]="assignedUnitDisplay" readonly />
        <button
          mat-icon-button
          matSuffix
          color="primary"
          (click)="openUnitSelect('assigned')"
          matTooltip="\u0412\u0438\u0431\u0440\u0430\u0442\u0438 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B"
        >
          <mat-icon>domain</mat-icon>
        </button>
        @if (model.assignedUnitId) {
          <button mat-icon-button matSuffix (click)="clearUnit('assigned')" matTooltip="\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u0438">
            <mat-icon>close</mat-icon>
          </button>
        }
      </mat-form-field>

      <!-- \u0415\u043A\u0456\u043F\u0430\u0436/\u0413\u0440\u0443\u043F\u0430 -->
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>\u0415\u043A\u0456\u043F\u0430\u0436/\u0413\u0440\u0443\u043F\u0430</mat-label>
        <input matInput [value]="involvedUnitDisplay" readonly />
        <button
          mat-icon-button
          matSuffix
          color="primary"
          (click)="openUnitSelect('involved')"
          matTooltip="\u0412\u0438\u0431\u0440\u0430\u0442\u0438 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B"
        >
          <mat-icon>domain</mat-icon>
        </button>
        @if (model.involvedUnitId) {
          <button mat-icon-button matSuffix (click)="clearUnit('involved')" matTooltip="\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u0438">
            <mat-icon>close</mat-icon>
          </button>
        }
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>\u041F\u0440\u0438\u0431\u0443\u0432 \u0434\u043E \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0443</mat-label>
        <input
          matInput
          appDateMask
          [matDatepicker]="arrivedPicker"
          [value]="model.arrivedAt"
          (dateChange)="onArrivedAtChange($event)"
          required
        />
        <mat-datepicker-toggle matIconSuffix [for]="arrivedPicker"></mat-datepicker-toggle>
        <mat-datepicker #arrivedPicker></mat-datepicker>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>\u0412\u0438\u0431\u0443\u0432 \u0437 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0443</mat-label>
        <input
          matInput
          appDateMask
          [matDatepicker]="departedPicker"
          [value]="model.departedAt"
          (dateChange)="onDepartedAtChange($event)"
        />
        <mat-datepicker-toggle matIconSuffix [for]="departedPicker"></mat-datepicker-toggle>
        <mat-datepicker #departedPicker></mat-datepicker>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>\u0417\u0432\u0430\u043D\u043D\u044F</mat-label>
        <mat-select [(ngModel)]="model.rankId" required>
          @for (rank of dictRanks; track rank.id) {
            <mat-option [value]="rank.id">{{ rank.value }}</mat-option>
          }
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>\u041F\u043E\u0441\u0430\u0434\u0430</mat-label>
        <mat-select [(ngModel)]="model.positionId" required>
          @for (pos of dictPositions; track pos.id) {
            <mat-option [value]="pos.id">{{ pos.value }}</mat-option>
          }
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>\u0421\u0442\u0430\u0442\u0443\u0441</mat-label>
        <mat-select [(ngModel)]="model.stateId" required>
          @for (state of dictStates; track state.id) {
            <mat-option [value]="state.id">{{ state.value }}</mat-option>
          }
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>\u041A\u043E\u043C\u0435\u043D\u0442\u0430\u0440</mat-label>
        <textarea matInput [(ngModel)]="model.comment" rows="3"></textarea>
      </mat-form-field>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>\u0412\u0456\u0434\u043C\u0456\u043D\u0430</button>
      <button mat-flat-button color="primary" [disabled]="!isFormValid" (click)="save(false)">
        \u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438
      </button>
      @if (!data.id) {
        <button mat-flat-button color="accent" [disabled]="!isFormValid" (click)="save(true)">
          \u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438 \u0456 \u043F\u0440\u043E\u0434\u043E\u0432\u0436\u0438\u0442\u0438
        </button>
      }
    </mat-dialog-actions>
  `, styles: ["/* src/Login/dialogs/dialog-shared.scss */\n.dialog-content {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  min-width: 320px;\n}\n.full-width {\n  width: 100%;\n}\n.error-text {\n  color: var(--mat-warn-color, #f44336);\n  font-size: 12px;\n  margin: -4px 0 4px 0;\n}\n.hint-text {\n  color: #666;\n  font-size: 12px;\n  margin: -4px 0 8px 0;\n}\n.validation-errors {\n  margin: -4px 0 4px 0;\n}\n.icon-success {\n  color: #4caf50;\n}\n/*# sourceMappingURL=dialog-shared.css.map */\n", "/* angular:styles/component:css;14d08d2025307268fe1fec73a3ca58d958651388f0baf670cd56cd143e9fae62;/home/havrok/projects/work/411/s5/s5app/Menu/S5Server/Front/src/app/dialogs/SoldierDialog.component.ts */\n.dialog-content {\n  display: grid;\n  gap: 4px;\n  min-width: 420px;\n  max-width: 600px;\n}\ntextarea {\n  resize: vertical;\n  min-height: 60px;\n}\n/*# sourceMappingURL=SoldierDialog.component.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SoldierDialogComponent, { className: "SoldierDialogComponent", filePath: "app/dialogs/SoldierDialog.component.ts", lineNumber: 223 });
})();

export {
  SoldierDialogComponent
};
//# sourceMappingURL=chunk-HHSPZOUC.js.map
