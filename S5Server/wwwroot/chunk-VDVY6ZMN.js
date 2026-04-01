import {
  DictDroneModelService
} from "./chunk-N3R4KAAZ.js";
import {
  MatSelect,
  MatSelectModule
} from "./chunk-ACLG7KVS.js";
import {
  MatOption
} from "./chunk-XKAE3JBC.js";
import {
  DictDroneTypeService
} from "./chunk-S3WRRX3B.js";
import {
  S5App_ErrorHandler
} from "./chunk-KWLRG6HK.js";
import {
  MatSnackBar
} from "./chunk-LVBT7O2R.js";
import {
  ConfirmDialogComponent
} from "./chunk-JL3NNENG.js";
import {
  MatSort,
  MatSortHeader,
  MatSortModule
} from "./chunk-ICKLGYXL.js";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
  MatTableModule
} from "./chunk-B6WYENQF.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-2EFRQAL5.js";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle
} from "./chunk-O3FG6F5X.js";
import "./chunk-GFPGE5B5.js";
import {
  ChangeDetectionStrategy,
  Component,
  DefaultValueAccessor,
  FormsModule,
  Inject,
  MatButton,
  MatButtonModule,
  MatFormField,
  MatFormFieldModule,
  MatIconButton,
  MatInput,
  MatInputModule,
  MatLabel,
  NgControlStatus,
  NgModel,
  RequiredValidator,
  ViewChild,
  __spreadValues,
  effect,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-IBDYQGEV.js";

// src/app/dialogs/DroneModel-dialog.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function DroneModelDialogComponent_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 4);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const type_r1 = ctx.$implicit;
    \u0275\u0275property("value", type_r1.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", type_r1.value, " ");
  }
}
var DroneModelDialogComponent = class _DroneModelDialogComponent {
  constructor(data, ref, droneTypeService) {
    this.data = data;
    this.ref = ref;
    this.droneTypeService = droneTypeService;
  }
  droneTypes = signal([], ...ngDevMode ? [{ debugName: "droneTypes" }] : []);
  ngOnInit() {
    this.droneTypeService.getSelectList().subscribe((types) => {
      this.droneTypes.set(types);
    });
  }
  onCancel() {
    this.ref.close();
  }
  onSave() {
    this.ref.close(this.data);
  }
  static \u0275fac = function DroneModelDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DroneModelDialogComponent)(\u0275\u0275directiveInject(MAT_DIALOG_DATA), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(DictDroneTypeService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DroneModelDialogComponent, selectors: [["app-drone-model-dialog"]], decls: 22, vars: 5, consts: [["mat-dialog-title", ""], ["mat-dialog-content", "", 1, "content"], ["appearance", "outline", "floatLabel", "always"], ["required", "", 3, "ngModelChange", "ngModel"], [3, "value"], ["matInput", "", "required", "", 3, "ngModelChange", "ngModel"], ["matInput", "", 3, "ngModelChange", "ngModel"], ["mat-dialog-actions", "", "align", "end", 1, "actions"], ["mat-button", "", 3, "click"], ["mat-raised-button", "", "color", "primary", 3, "click", "disabled"]], template: function DroneModelDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "h2", 0);
      \u0275\u0275text(1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(2, "div", 1)(3, "mat-form-field", 2)(4, "mat-label");
      \u0275\u0275text(5, "\u0422\u0438\u043F \u0411\u041F\u041B\u0410");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "mat-select", 3);
      \u0275\u0275twoWayListener("ngModelChange", function DroneModelDialogComponent_Template_mat_select_ngModelChange_6_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.data.droneTypeId, $event) || (ctx.data.droneTypeId = $event);
        return $event;
      });
      \u0275\u0275repeaterCreate(7, DroneModelDialogComponent_For_8_Template, 2, 2, "mat-option", 4, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "mat-form-field", 2)(10, "mat-label");
      \u0275\u0275text(11, "\u041C\u043E\u0434\u0435\u043B\u044C");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "input", 5);
      \u0275\u0275twoWayListener("ngModelChange", function DroneModelDialogComponent_Template_input_ngModelChange_12_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.data.value, $event) || (ctx.data.value = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(13, "mat-form-field", 2)(14, "mat-label");
      \u0275\u0275text(15, "\u041A\u043E\u043C\u0435\u043D\u0442\u0430\u0440");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "input", 6);
      \u0275\u0275twoWayListener("ngModelChange", function DroneModelDialogComponent_Template_input_ngModelChange_16_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.data.comment, $event) || (ctx.data.comment = $event);
        return $event;
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(17, "div", 7)(18, "button", 8);
      \u0275\u0275listener("click", function DroneModelDialogComponent_Template_button_click_18_listener() {
        return ctx.onCancel();
      });
      \u0275\u0275text(19, "\u0412\u0456\u0434\u043C\u0456\u043D\u0430");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "button", 9);
      \u0275\u0275listener("click", function DroneModelDialogComponent_Template_button_click_20_listener() {
        return ctx.onSave();
      });
      \u0275\u0275text(21, " \u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438 ");
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275textInterpolate(ctx.data.id ? "\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438" : "\u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438 \u043D\u043E\u0432\u0438\u0439");
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.data.droneTypeId);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.droneTypes());
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.data.value);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.data.comment);
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", !ctx.data.value.trim() || !ctx.data.droneTypeId);
    }
  }, dependencies: [MatFormFieldModule, MatFormField, MatLabel, MatInputModule, MatInput, MatDialogModule, MatDialogTitle, MatDialogActions, MatDialogContent, MatButtonModule, MatButton, MatSelectModule, MatSelect, MatOption, FormsModule, DefaultValueAccessor, NgControlStatus, RequiredValidator, NgModel], styles: ["\n\n.title[_ngcontent-%COMP%] {\n  text-align: center;\n  margin: 0;\n}\n.content[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 12px;\n  min-width: 280px;\n  max-width: 520px;\n  padding-top: 10px !important;\n}\n  .content .mat-mdc-form-field {\n  width: 100%;\n}\n.actions[_ngcontent-%COMP%] {\n  gap: 8px;\n}"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DroneModelDialogComponent, [{
    type: Component,
    args: [{ selector: "app-drone-model-dialog", standalone: true, imports: [
      MatFormFieldModule,
      MatInputModule,
      MatDialogModule,
      MatButtonModule,
      MatSelectModule,
      FormsModule
    ], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <h2 mat-dialog-title>{{ data.id ? '\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438' : '\u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438 \u043D\u043E\u0432\u0438\u0439' }}</h2>
    <div mat-dialog-content class="content">
      <mat-form-field appearance="outline" floatLabel="always">
        <mat-label>\u0422\u0438\u043F \u0411\u041F\u041B\u0410</mat-label>
        <mat-select [(ngModel)]="data.droneTypeId" required>
          @for (type of droneTypes(); track type.id) {
          <mat-option [value]="type.id">
            {{ type.value }}
          </mat-option>
          }
        </mat-select>
      </mat-form-field>
      <mat-form-field appearance="outline" floatLabel="always">
        <mat-label>\u041C\u043E\u0434\u0435\u043B\u044C</mat-label>
        <input matInput [(ngModel)]="data.value" required />
      </mat-form-field>
      <mat-form-field appearance="outline" floatLabel="always">
        <mat-label>\u041A\u043E\u043C\u0435\u043D\u0442\u0430\u0440</mat-label>
        <input matInput [(ngModel)]="data.comment" />
      </mat-form-field>
    </div>
    <div mat-dialog-actions align="end" class="actions">
      <button mat-button (click)="onCancel()">\u0412\u0456\u0434\u043C\u0456\u043D\u0430</button>
      <button
        mat-raised-button
        color="primary"
        (click)="onSave()"
        [disabled]="!data.value.trim() || !data.droneTypeId"
      >
        \u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438
      </button>
    </div>
  `, styles: ["/* src/app/dialogs/DialogShared.scss */\n.title {\n  text-align: center;\n  margin: 0;\n}\n.content {\n  display: grid;\n  gap: 12px;\n  min-width: 280px;\n  max-width: 520px;\n  padding-top: 10px !important;\n}\n::ng-deep .content .mat-mdc-form-field {\n  width: 100%;\n}\n.actions {\n  gap: 8px;\n}\n"] }]
  }], () => [{ type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }, { type: MatDialogRef }, { type: DictDroneTypeService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DroneModelDialogComponent, { className: "DroneModelDialogComponent", filePath: "app/dialogs/DroneModel-dialog.component.ts", lineNumber: 61 });
})();

// src/dictionaries/dictDroneModel.component.ts
var _forTrack02 = ($index, $item) => $item.id;
function DictDroneModelComponent_For_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 4);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const type_r1 = ctx.$implicit;
    \u0275\u0275property("value", type_r1.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", type_r1.value, " ");
  }
}
function DictDroneModelComponent_th_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 16);
    \u0275\u0275text(1, "\u041C\u043E\u0434\u0435\u043B\u044C");
    \u0275\u0275elementEnd();
  }
}
function DictDroneModelComponent_td_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r2.value);
  }
}
function DictDroneModelComponent_th_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 16);
    \u0275\u0275text(1, "\u0422\u0438\u043F \u0411\u041F\u041B\u0410");
    \u0275\u0275elementEnd();
  }
}
function DictDroneModelComponent_td_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r3.getDroneTypeName(item_r3.droneTypeId), " ");
  }
}
function DictDroneModelComponent_th_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 16);
    \u0275\u0275text(1, "\u041A\u043E\u043C\u0435\u043D\u0442\u0430\u0440");
    \u0275\u0275elementEnd();
  }
}
function DictDroneModelComponent_td_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r5.comment);
  }
}
function DictDroneModelComponent_th_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 18);
    \u0275\u0275text(1, "\u0414\u0456\u0457");
    \u0275\u0275elementEnd();
  }
}
function DictDroneModelComponent_td_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 17)(1, "button", 19);
    \u0275\u0275listener("click", function DictDroneModelComponent_td_28_Template_button_click_1_listener() {
      const item_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.edit(item_r7));
    });
    \u0275\u0275elementStart(2, "mat-icon");
    \u0275\u0275text(3, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "button", 20);
    \u0275\u0275listener("click", function DictDroneModelComponent_td_28_Template_button_click_4_listener() {
      const item_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.delete(item_r7));
    });
    \u0275\u0275elementStart(5, "mat-icon");
    \u0275\u0275text(6, "delete");
    \u0275\u0275elementEnd()()();
  }
}
function DictDroneModelComponent_tr_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 21);
  }
}
function DictDroneModelComponent_tr_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 22);
  }
}
var DictDroneModelComponent = class _DictDroneModelComponent {
  dictDroneModelService = inject(DictDroneModelService);
  dictDroneTypeService = inject(DictDroneTypeService);
  items = this.dictDroneModelService.createItemsSignal();
  dataSource = new MatTableDataSource([]);
  displayedColumns = ["value", "droneType", "comment", "actions"];
  dialog = inject(MatDialog);
  snackBar = inject(MatSnackBar);
  droneTypes = [];
  selectedDroneTypeId = null;
  sort;
  constructor() {
    effect(() => {
      this.dataSource.data = this.items();
    });
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.loadDroneTypes();
    this.reload();
  }
  loadDroneTypes() {
    this.dictDroneTypeService.getSelectList().subscribe({
      next: (types) => {
        this.droneTypes = types;
      },
      error: (error) => {
        console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u0442\u0438\u043F\u0456\u0432 \u0411\u041F\u041B\u0410:", error);
        const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u0442\u0438\u043F\u0456\u0432 \u0411\u041F\u041B\u0410:");
        this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
      }
    });
  }
  getDroneTypeName(droneTypeId) {
    const type = this.droneTypes.find((t) => t.id === droneTypeId);
    return type ? type.value : "";
  }
  onDroneTypeChange() {
    if (this.selectedDroneTypeId) {
      this.dictDroneModelService.getByDroneType(this.selectedDroneTypeId).subscribe({
        next: (items) => this.items.set(items),
        error: (error) => {
          console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u043C\u043E\u0434\u0435\u043B\u0435\u0439 \u0411\u041F\u041B\u0410:", error);
          const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u043C\u043E\u0434\u0435\u043B\u0435\u0439 \u0411\u041F\u041B\u0410:");
          this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
        }
      });
    } else {
      this.reload();
    }
  }
  reload() {
    this.dictDroneModelService.getAll().subscribe({
      next: (items) => this.items.set(items),
      error: (error) => {
        console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u043C\u043E\u0434\u0435\u043B\u0435\u0439 \u0411\u041F\u041B\u0410:", error);
        const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u043C\u043E\u0434\u0435\u043B\u0435\u0439 \u0411\u041F\u041B\u0410:");
        this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
      }
    });
  }
  add() {
    const dialogRef = this.dialog.open(DroneModelDialogComponent, {
      width: "400px",
      data: { value: "", comment: "", droneTypeId: this.selectedDroneTypeId || "" }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dictDroneModelService.create(result).subscribe({
          next: () => {
            this.reload();
            this.snackBar.open("\u041C\u043E\u0434\u0435\u043B\u044C \u0411\u041F\u041B\u0410 \u0443\u0441\u043F\u0456\u0448\u043D\u043E \u0441\u0442\u0432\u043E\u0440\u0435\u043D\u043E", "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 3e3 });
          },
          error: (error) => {
            console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0441\u0442\u0432\u043E\u0440\u0435\u043D\u043D\u044F \u043C\u043E\u0434\u0435\u043B\u0456 \u0411\u041F\u041B\u0410:", error);
            const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0441\u0442\u0432\u043E\u0440\u0435\u043D\u043D\u044F \u043C\u043E\u0434\u0435\u043B\u0456 \u0411\u041F\u041B\u0410:");
            this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
          }
        });
      }
    });
  }
  edit(droneModel) {
    const dialogRef = this.dialog.open(DroneModelDialogComponent, {
      width: "400px",
      data: __spreadValues({}, droneModel)
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dictDroneModelService.update(result.id, result).subscribe({
          next: () => {
            this.reload();
            this.snackBar.open("\u041C\u043E\u0434\u0435\u043B\u044C \u0411\u041F\u041B\u0410 \u0443\u0441\u043F\u0456\u0448\u043D\u043E \u043E\u043D\u043E\u0432\u043B\u0435\u043D\u043E", "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 3e3 });
          },
          error: (error) => {
            console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043E\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u044F \u043C\u043E\u0434\u0435\u043B\u0456 \u0411\u041F\u041B\u0410:", error);
            const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043E\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u044F \u043C\u043E\u0434\u0435\u043B\u0456 \u0411\u041F\u041B\u0410:");
            this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
          }
        });
      }
    });
  }
  delete(droneModel) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      width: "360px",
      maxWidth: "95vw",
      autoFocus: false,
      data: {
        title: "\u0412\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F \u0437\u0430\u043F\u0438\u0441\u0443",
        message: `\u0412\u0438 \u0432\u043F\u0435\u0432\u043D\u0435\u043D\u0456, \u0449\u043E \u0445\u043E\u0447\u0435\u0442\u0435 \u0432\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u0437\u0430\u043F\u0438\u0441 "${droneModel.value}"?`,
        confirmText: "\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438",
        cancelText: "\u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438",
        color: "warn",
        icon: "warning"
      }
    });
    ref.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.dictDroneModelService.delete(droneModel.id).subscribe({
          next: () => {
            this.reload();
            this.snackBar.open("\u041C\u043E\u0434\u0435\u043B\u044C \u0411\u041F\u041B\u0410 \u0443\u0441\u043F\u0456\u0448\u043D\u043E \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u043E", "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 3e3 });
          },
          error: (error) => {
            console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F \u043C\u043E\u0434\u0435\u043B\u0456 \u0411\u041F\u041B\u0410:", error);
            const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F \u043C\u043E\u0434\u0435\u043B\u0456 \u0411\u041F\u041B\u0410:");
            this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
          }
        });
      }
    });
  }
  static \u0275fac = function DictDroneModelComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DictDroneModelComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DictDroneModelComponent, selectors: [["dict-drone-models"]], viewQuery: function DictDroneModelComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(MatSort, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.sort = _t.first);
    }
  }, decls: 31, vars: 5, consts: [[1, "dict-page-container"], [1, "action-buttons"], [2, "width", "250px", "margin-right", "16px"], [3, "ngModelChange", "ngModel"], [3, "value"], ["mat-raised-button", "", "color", "primary", 3, "click"], ["mat-table", "", "matSort", "", 1, "mat-elevation-z8", 3, "dataSource"], ["matColumnDef", "value"], ["mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "droneType"], ["matColumnDef", "comment"], ["matColumnDef", "actions"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", "", "mat-sort-header", ""], ["mat-cell", ""], ["mat-header-cell", ""], ["mat-icon-button", "", "color", "accent", 3, "click"], ["mat-icon-button", "", "color", "warn", 3, "click"], ["mat-header-row", ""], ["mat-row", ""]], template: function DictDroneModelComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "h2");
      \u0275\u0275text(2, "\u041C\u043E\u0434\u0435\u043B\u0456 \u0411\u041F\u041B\u0410");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "div", 1)(4, "mat-form-field", 2)(5, "mat-label");
      \u0275\u0275text(6, "\u0424\u0456\u043B\u044C\u0442\u0440 \u043F\u043E \u0442\u0438\u043F\u0443 \u0411\u041F\u041B\u0410");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "mat-select", 3);
      \u0275\u0275twoWayListener("ngModelChange", function DictDroneModelComponent_Template_mat_select_ngModelChange_7_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.selectedDroneTypeId, $event) || (ctx.selectedDroneTypeId = $event);
        return $event;
      });
      \u0275\u0275listener("ngModelChange", function DictDroneModelComponent_Template_mat_select_ngModelChange_7_listener() {
        return ctx.onDroneTypeChange();
      });
      \u0275\u0275elementStart(8, "mat-option", 4);
      \u0275\u0275text(9, "\u0412\u0441\u0456 \u0442\u0438\u043F\u0438");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(10, DictDroneModelComponent_For_11_Template, 2, 2, "mat-option", 4, _forTrack02);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "button", 5);
      \u0275\u0275listener("click", function DictDroneModelComponent_Template_button_click_12_listener() {
        return ctx.reload();
      });
      \u0275\u0275text(13, "\u041E\u043D\u043E\u0432\u0438\u0442\u0438");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "button", 5);
      \u0275\u0275listener("click", function DictDroneModelComponent_Template_button_click_14_listener() {
        return ctx.add();
      });
      \u0275\u0275text(15, "\u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "table", 6);
      \u0275\u0275elementContainerStart(17, 7);
      \u0275\u0275template(18, DictDroneModelComponent_th_18_Template, 2, 0, "th", 8)(19, DictDroneModelComponent_td_19_Template, 2, 1, "td", 9);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(20, 10);
      \u0275\u0275template(21, DictDroneModelComponent_th_21_Template, 2, 0, "th", 8)(22, DictDroneModelComponent_td_22_Template, 2, 1, "td", 9);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(23, 11);
      \u0275\u0275template(24, DictDroneModelComponent_th_24_Template, 2, 0, "th", 8)(25, DictDroneModelComponent_td_25_Template, 2, 1, "td", 9);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(26, 12);
      \u0275\u0275template(27, DictDroneModelComponent_th_27_Template, 2, 0, "th", 13)(28, DictDroneModelComponent_td_28_Template, 7, 0, "td", 9);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275template(29, DictDroneModelComponent_tr_29_Template, 1, 0, "tr", 14)(30, DictDroneModelComponent_tr_30_Template, 1, 0, "tr", 15);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275twoWayProperty("ngModel", ctx.selectedDroneTypeId);
      \u0275\u0275advance();
      \u0275\u0275property("value", null);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.droneTypes);
      \u0275\u0275advance(6);
      \u0275\u0275property("dataSource", ctx.dataSource);
      \u0275\u0275advance(13);
      \u0275\u0275property("matHeaderRowDef", ctx.displayedColumns);
      \u0275\u0275advance();
      \u0275\u0275property("matRowDefColumns", ctx.displayedColumns);
    }
  }, dependencies: [
    MatTableModule,
    MatTable,
    MatHeaderCellDef,
    MatHeaderRowDef,
    MatColumnDef,
    MatCellDef,
    MatRowDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatSortModule,
    MatSort,
    MatSortHeader,
    MatIconModule,
    MatIcon,
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatInputModule,
    MatSelectModule,
    MatSelect,
    MatOption,
    FormsModule,
    NgControlStatus,
    NgModel
  ], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  height: 100%;\n}\ntable[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.mat-mdc-row[_ngcontent-%COMP%] {\n  cursor: pointer;\n  transition: background-color 0.2s;\n}\n.mat-mdc-row[_ngcontent-%COMP%]:hover {\n  background-color: #f5f5f5;\n}\n.mat-mdc-row.selected[_ngcontent-%COMP%] {\n  background-color: #e3f2fd !important;\n}\n.mat-mdc-row.selected[_ngcontent-%COMP%]:hover {\n  background-color: #bbdefb !important;\n}\n.dict-page-container[_ngcontent-%COMP%] {\n  height: calc(100vh - 64px);\n  overflow-y: auto;\n  padding: 16px;\n  padding-bottom: 32px;\n}\n.dict-page-container[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.dict-page-container[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.dict-page-container[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]    + button[_ngcontent-%COMP%] {\n  margin-left: 8px;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-top: 1em;\n  margin-bottom: 16px;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]   .value-text[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]   .edit-btn[_ngcontent-%COMP%] {\n  opacity: 0;\n  transition: opacity 0.2s;\n  width: 32px;\n  height: 32px;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]   .edit-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]:hover   .view-mode[_ngcontent-%COMP%]   .edit-btn[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .inline-input[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 4px 8px;\n  border: 1px solid #2196f3;\n  border-radius: 4px;\n  font-size: 14px;\n  background-color: #f5f5f5;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .inline-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #1976d2;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .save-btn[_ngcontent-%COMP%], \n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  flex-shrink: 0;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .save-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], \n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .save-btn[_ngcontent-%COMP%] {\n  color: #4caf50;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%] {\n  color: #f44336;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .clickable-row[_ngcontent-%COMP%] {\n  cursor: pointer;\n  transition: background-color 0.2s;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .clickable-row[_ngcontent-%COMP%]:hover {\n  background-color: #f5f5f5;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .clickable-row.selected[_ngcontent-%COMP%] {\n  background-color: #e3f2fd;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .clickable-row.selected[_ngcontent-%COMP%]:hover {\n  background-color: #bbdefb;\n}"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DictDroneModelComponent, [{
    type: Component,
    args: [{ selector: "dict-drone-models", imports: [
      MatTableModule,
      MatButtonModule,
      MatSortModule,
      MatIconModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      FormsModule
    ], template: `
    <div class="dict-page-container">
      <h2>\u041C\u043E\u0434\u0435\u043B\u0456 \u0411\u041F\u041B\u0410</h2>
      <div class="action-buttons">
        <mat-form-field style="width: 250px; margin-right: 16px;">
          <mat-label>\u0424\u0456\u043B\u044C\u0442\u0440 \u043F\u043E \u0442\u0438\u043F\u0443 \u0411\u041F\u041B\u0410</mat-label>
          <mat-select [(ngModel)]="selectedDroneTypeId" (ngModelChange)="onDroneTypeChange()">
            <mat-option [value]="null">\u0412\u0441\u0456 \u0442\u0438\u043F\u0438</mat-option>
            @for (type of droneTypes; track type.id) {
            <mat-option [value]="type.id">
              {{ type.value }}
            </mat-option>
            }
          </mat-select>
        </mat-form-field>
        <button mat-raised-button color="primary" (click)="reload()">\u041E\u043D\u043E\u0432\u0438\u0442\u0438</button>
        <button mat-raised-button color="primary" (click)="add()">\u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438</button>
      </div>
      <table mat-table [dataSource]="dataSource" matSort class="mat-elevation-z8">
        <!-- Value Column -->
        <ng-container matColumnDef="value">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>\u041C\u043E\u0434\u0435\u043B\u044C</th>
          <td mat-cell *matCellDef="let item">{{ item.value }}</td>
        </ng-container>
        <!-- DroneType Column -->
        <ng-container matColumnDef="droneType">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>\u0422\u0438\u043F \u0411\u041F\u041B\u0410</th>
          <td mat-cell *matCellDef="let item">
            {{ getDroneTypeName(item.droneTypeId) }}
          </td>
        </ng-container>
        <!-- Comment Column -->
        <ng-container matColumnDef="comment">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>\u041A\u043E\u043C\u0435\u043D\u0442\u0430\u0440</th>
          <td mat-cell *matCellDef="let item">{{ item.comment }}</td>
        </ng-container>
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>\u0414\u0456\u0457</th>
          <td mat-cell *matCellDef="let item">
            <button mat-icon-button color="accent" (click)="edit(item)">
              <mat-icon>edit</mat-icon>
            </button>
            <button mat-icon-button color="warn" (click)="delete(item)">
              <mat-icon>delete</mat-icon>
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>
    </div>
  `, styles: ["/* src/dictionaries/dict-page.styles.scss */\n:host {\n  display: block;\n  height: 100%;\n}\ntable {\n  width: 100%;\n}\n.mat-mdc-row {\n  cursor: pointer;\n  transition: background-color 0.2s;\n}\n.mat-mdc-row:hover {\n  background-color: #f5f5f5;\n}\n.mat-mdc-row.selected {\n  background-color: #e3f2fd !important;\n}\n.mat-mdc-row.selected:hover {\n  background-color: #bbdefb !important;\n}\n.dict-page-container {\n  height: calc(100vh - 64px);\n  overflow-y: auto;\n  padding: 16px;\n  padding-bottom: 32px;\n}\n.dict-page-container h2 {\n  margin-bottom: 16px;\n}\n.dict-page-container .action-buttons {\n  margin-bottom: 16px;\n}\n.dict-page-container .action-buttons button + button {\n  margin-left: 8px;\n}\n.dict-page-container table {\n  width: 100%;\n  margin-top: 1em;\n  margin-bottom: 16px;\n}\n.dict-page-container table .editable-cell .view-mode {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.dict-page-container table .editable-cell .view-mode .value-text {\n  flex: 1;\n}\n.dict-page-container table .editable-cell .view-mode .edit-btn {\n  opacity: 0;\n  transition: opacity 0.2s;\n  width: 32px;\n  height: 32px;\n}\n.dict-page-container table .editable-cell .view-mode .edit-btn mat-icon {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.dict-page-container table .editable-cell:hover .view-mode .edit-btn {\n  opacity: 1;\n}\n.dict-page-container table .editable-cell .edit-mode {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.dict-page-container table .editable-cell .edit-mode .inline-input {\n  flex: 1;\n  padding: 4px 8px;\n  border: 1px solid #2196f3;\n  border-radius: 4px;\n  font-size: 14px;\n  background-color: #f5f5f5;\n}\n.dict-page-container table .editable-cell .edit-mode .inline-input:focus {\n  outline: none;\n  border-color: #1976d2;\n}\n.dict-page-container table .editable-cell .edit-mode .save-btn,\n.dict-page-container table .editable-cell .edit-mode .cancel-btn {\n  width: 32px;\n  height: 32px;\n  flex-shrink: 0;\n}\n.dict-page-container table .editable-cell .edit-mode .save-btn mat-icon,\n.dict-page-container table .editable-cell .edit-mode .cancel-btn mat-icon {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.dict-page-container table .editable-cell .edit-mode .save-btn {\n  color: #4caf50;\n}\n.dict-page-container table .editable-cell .edit-mode .cancel-btn {\n  color: #f44336;\n}\n.dict-page-container table .clickable-row {\n  cursor: pointer;\n  transition: background-color 0.2s;\n}\n.dict-page-container table .clickable-row:hover {\n  background-color: #f5f5f5;\n}\n.dict-page-container table .clickable-row.selected {\n  background-color: #e3f2fd;\n}\n.dict-page-container table .clickable-row.selected:hover {\n  background-color: #bbdefb;\n}\n"] }]
  }], () => [], { sort: [{
    type: ViewChild,
    args: [MatSort]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DictDroneModelComponent, { className: "DictDroneModelComponent", filePath: "dictionaries/dictDroneModel.component.ts", lineNumber: 87 });
})();
export {
  DictDroneModelComponent
};
