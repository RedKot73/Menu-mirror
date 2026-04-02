import {
  DictRankService
} from "./chunk-R66WZN6F.js";
import {
  ConfirmDialogComponent
} from "./chunk-6AFN5M3I.js";
import {
  MatSort,
  MatSortHeader,
  MatSortModule
} from "./chunk-5IF6W7DQ.js";
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
} from "./chunk-U4RBV7P6.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-QGPZ4K6F.js";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle
} from "./chunk-L6X5RZFZ.js";
import "./chunk-3KJHOMU2.js";
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
  NumberValueAccessor,
  RequiredValidator,
  ViewChild,
  __spreadValues,
  effect,
  inject,
  setClassMetadata,
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
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-QBB2I2JI.js";

// src/app/dialogs/DictRankDialog.ts
var DictRankDialogComponent = class _DictRankDialogComponent {
  data;
  ref;
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
  static \u0275fac = function DictRankDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DictRankDialogComponent)(\u0275\u0275directiveInject(MAT_DIALOG_DATA), \u0275\u0275directiveInject(MatDialogRef));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DictRankDialogComponent, selectors: [["dict-rank-dialog"]], decls: 36, vars: 9, consts: [["mat-dialog-title", ""], ["mat-dialog-content", "", 1, "content"], ["appearance", "outline", "floatLabel", "always"], ["matInput", "", "required", "", 3, "ngModelChange", "ngModel"], ["matInput", "", 3, "ngModelChange", "ngModel"], ["matInput", "", "type", "number", "required", "", 3, "ngModelChange", "ngModel"], ["mat-dialog-actions", "", "align", "end", 1, "actions"], ["mat-button", "", 3, "click"], ["mat-raised-button", "", "color", "primary", 3, "click", "disabled"]], template: function DictRankDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "h2", 0);
      \u0275\u0275text(1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(2, "div", 1)(3, "mat-form-field", 2)(4, "mat-label");
      \u0275\u0275text(5, "\u0417\u043D\u0430\u0447\u0435\u043D\u043D\u044F");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "input", 3);
      \u0275\u0275twoWayListener("ngModelChange", function DictRankDialogComponent_Template_input_ngModelChange_6_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.data.value, $event) || (ctx.data.value = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "mat-form-field", 2)(8, "mat-label");
      \u0275\u0275text(9, "\u0421\u043A\u043E\u0440\u043E\u0447\u0435\u043D\u043D\u044F");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "input", 3);
      \u0275\u0275twoWayListener("ngModelChange", function DictRankDialogComponent_Template_input_ngModelChange_10_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.data.shortValue, $event) || (ctx.data.shortValue = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "mat-form-field", 2)(12, "mat-label");
      \u0275\u0275text(13, "\u041A\u043E\u0434 NATO");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "input", 4);
      \u0275\u0275twoWayListener("ngModelChange", function DictRankDialogComponent_Template_input_ngModelChange_14_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.data.natoCode, $event) || (ctx.data.natoCode = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "mat-form-field", 2)(16, "mat-label");
      \u0275\u0275text(17, "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0456\u044F");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "input", 4);
      \u0275\u0275twoWayListener("ngModelChange", function DictRankDialogComponent_Template_input_ngModelChange_18_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.data.category, $event) || (ctx.data.category = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(19, "mat-form-field", 2)(20, "mat-label");
      \u0275\u0275text(21, "\u041F\u0456\u0434 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0456\u044F");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "input", 4);
      \u0275\u0275twoWayListener("ngModelChange", function DictRankDialogComponent_Template_input_ngModelChange_22_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.data.subCategory, $event) || (ctx.data.subCategory = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(23, "mat-form-field", 2)(24, "mat-label");
      \u0275\u0275text(25, "\u041F\u043E\u0440\u044F\u0434\u043E\u043A");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "input", 5);
      \u0275\u0275twoWayListener("ngModelChange", function DictRankDialogComponent_Template_input_ngModelChange_26_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.data.orderVal, $event) || (ctx.data.orderVal = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(27, "mat-form-field", 2)(28, "mat-label");
      \u0275\u0275text(29, "\u041A\u043E\u043C\u0435\u043D\u0442\u0430\u0440");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "input", 4);
      \u0275\u0275twoWayListener("ngModelChange", function DictRankDialogComponent_Template_input_ngModelChange_30_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.data.comment, $event) || (ctx.data.comment = $event);
        return $event;
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(31, "div", 6)(32, "button", 7);
      \u0275\u0275listener("click", function DictRankDialogComponent_Template_button_click_32_listener() {
        return ctx.onCancel();
      });
      \u0275\u0275text(33, "\u0412\u0456\u0434\u043C\u0456\u043D\u0430");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "button", 8);
      \u0275\u0275listener("click", function DictRankDialogComponent_Template_button_click_34_listener() {
        return ctx.onSave();
      });
      \u0275\u0275text(35, "\u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438");
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275textInterpolate(ctx.data.id ? "\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438" : "\u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438 \u043D\u043E\u0432\u0438\u0439");
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.data.value);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.data.shortValue);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.data.natoCode);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.data.category);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.data.subCategory);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.data.orderVal);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.data.comment);
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", !ctx.data.value.trim());
    }
  }, dependencies: [MatFormFieldModule, MatFormField, MatLabel, MatInputModule, MatInput, MatDialogModule, MatDialogTitle, MatDialogActions, MatDialogContent, MatButtonModule, MatButton, FormsModule, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, RequiredValidator, NgModel], styles: ["\n\n.title[_ngcontent-%COMP%] {\n  text-align: center;\n  margin: 0;\n}\n.content[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 12px;\n  min-width: 280px;\n  max-width: 520px;\n  padding-top: 10px !important;\n}\n  .content .mat-mdc-form-field {\n  width: 100%;\n}\n.actions[_ngcontent-%COMP%] {\n  gap: 8px;\n}\n/*# sourceMappingURL=DialogShared.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DictRankDialogComponent, [{
    type: Component,
    args: [{ selector: "dict-rank-dialog", standalone: true, imports: [MatFormFieldModule, MatInputModule, MatDialogModule, MatButtonModule, FormsModule], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <h2 mat-dialog-title>{{ data.id ? '\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438' : '\u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438 \u043D\u043E\u0432\u0438\u0439' }}</h2>
    <div mat-dialog-content class="content">
      <mat-form-field appearance="outline" floatLabel="always">
        <mat-label>\u0417\u043D\u0430\u0447\u0435\u043D\u043D\u044F</mat-label>
        <input matInput [(ngModel)]="data.value" required>
      </mat-form-field>
      <mat-form-field appearance="outline" floatLabel="always">
        <mat-label>\u0421\u043A\u043E\u0440\u043E\u0447\u0435\u043D\u043D\u044F</mat-label>
        <input matInput [(ngModel)]="data.shortValue" required>
      </mat-form-field>
      <mat-form-field appearance="outline" floatLabel="always">
        <mat-label>\u041A\u043E\u0434 NATO</mat-label>
        <input matInput [(ngModel)]="data.natoCode" >
      </mat-form-field>
      <mat-form-field appearance="outline" floatLabel="always">
        <mat-label>\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0456\u044F</mat-label>
        <input matInput [(ngModel)]="data.category" >
      </mat-form-field>
      <mat-form-field appearance="outline" floatLabel="always">
        <mat-label>\u041F\u0456\u0434 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0456\u044F</mat-label>
        <input matInput [(ngModel)]="data.subCategory" >
      </mat-form-field>
      <mat-form-field appearance="outline" floatLabel="always">
        <mat-label>\u041F\u043E\u0440\u044F\u0434\u043E\u043A</mat-label>
        <input matInput [(ngModel)]="data.orderVal" type="number" required>
      </mat-form-field>
      <mat-form-field appearance="outline" floatLabel="always">
        <mat-label>\u041A\u043E\u043C\u0435\u043D\u0442\u0430\u0440</mat-label>
        <input matInput [(ngModel)]="data.comment">
      </mat-form-field>
    </div>
    <div mat-dialog-actions align="end" class="actions">
      <button mat-button (click)="onCancel()">\u0412\u0456\u0434\u043C\u0456\u043D\u0430</button>
      <button mat-raised-button color="primary" (click)="onSave()" [disabled]="!data.value.trim()">\u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438</button>
    </div>`, styles: ["/* src/app/dialogs/DialogShared.scss */\n.title {\n  text-align: center;\n  margin: 0;\n}\n.content {\n  display: grid;\n  gap: 12px;\n  min-width: 280px;\n  max-width: 520px;\n  padding-top: 10px !important;\n}\n::ng-deep .content .mat-mdc-form-field {\n  width: 100%;\n}\n.actions {\n  gap: 8px;\n}\n/*# sourceMappingURL=DialogShared.css.map */\n"] }]
  }], () => [{ type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }, { type: MatDialogRef }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DictRankDialogComponent, { className: "DictRankDialogComponent", filePath: "app/dialogs/DictRankDialog.ts", lineNumber: 53 });
})();

// src/dictionaries/dictRanks.component.ts
function DictRanksComponent_th_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 17);
    \u0275\u0275text(1, "\u0417\u043D\u0430\u0447\u0435\u043D\u043D\u044F");
    \u0275\u0275elementEnd();
  }
}
function DictRanksComponent_td_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const area_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(area_r1.value);
  }
}
function DictRanksComponent_th_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 17);
    \u0275\u0275text(1, "\u0421\u043A\u043E\u0440\u043E\u0447\u0435\u043D\u043D\u044F");
    \u0275\u0275elementEnd();
  }
}
function DictRanksComponent_td_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const area_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(area_r2.shortValue);
  }
}
function DictRanksComponent_th_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 17);
    \u0275\u0275text(1, "\u041A\u043E\u0434 NATO");
    \u0275\u0275elementEnd();
  }
}
function DictRanksComponent_td_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const area_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(area_r3.natoCode);
  }
}
function DictRanksComponent_th_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 17);
    \u0275\u0275text(1, "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0456\u044F");
    \u0275\u0275elementEnd();
  }
}
function DictRanksComponent_td_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const area_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(area_r4.category);
  }
}
function DictRanksComponent_th_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 17);
    \u0275\u0275text(1, "\u041F\u0456\u0434\u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0456\u044F");
    \u0275\u0275elementEnd();
  }
}
function DictRanksComponent_td_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const area_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(area_r5.subCategory);
  }
}
function DictRanksComponent_th_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 17);
    \u0275\u0275text(1, "\u041F\u043E\u0440\u044F\u0434\u043E\u043A");
    \u0275\u0275elementEnd();
  }
}
function DictRanksComponent_td_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const area_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(area_r6.orderVal);
  }
}
function DictRanksComponent_th_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 17);
    \u0275\u0275text(1, "\u041A\u043E\u043C\u0435\u043D\u0442\u0430\u0440");
    \u0275\u0275elementEnd();
  }
}
function DictRanksComponent_td_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const area_r7 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(area_r7.comment);
  }
}
function DictRanksComponent_th_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 19);
    \u0275\u0275text(1, "\u0414\u0456\u0457");
    \u0275\u0275elementEnd();
  }
}
function DictRanksComponent_td_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 18)(1, "button", 20);
    \u0275\u0275listener("click", function DictRanksComponent_td_32_Template_button_click_1_listener() {
      const area_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r9 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r9.edit(area_r9));
    });
    \u0275\u0275elementStart(2, "mat-icon");
    \u0275\u0275text(3, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "button", 21);
    \u0275\u0275listener("click", function DictRanksComponent_td_32_Template_button_click_4_listener() {
      const area_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r9 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r9.delete(area_r9));
    });
    \u0275\u0275elementStart(5, "mat-icon");
    \u0275\u0275text(6, "delete");
    \u0275\u0275elementEnd()()();
  }
}
function DictRanksComponent_tr_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 22);
  }
}
function DictRanksComponent_tr_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 23);
  }
}
var DictRanksComponent = class _DictRanksComponent {
  dictService = inject(DictRankService);
  items = this.dictService.createItemsSignal();
  dataSource = new MatTableDataSource([]);
  displayedColumns = [
    "value",
    "shortValue",
    "natoCode",
    "category",
    "subCategory",
    "orderVal",
    "comment",
    "actions"
  ];
  dialog = inject(MatDialog);
  sort;
  constructor() {
    effect(() => {
      this.dataSource.data = this.items();
    });
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  reload() {
    this.dictService.getAll().subscribe((items) => this.items.set(items));
  }
  // CREATE
  add() {
    const dialogRef = this.dialog.open(DictRankDialogComponent, {
      width: "400px",
      data: {
        value: "",
        shortValue: "",
        natoCode: "",
        category: "",
        subCategory: "",
        orderVal: "",
        comment: ""
      }
      // Передаем пустой объект для создания
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dictService.create(result).subscribe(() => this.reload());
      }
    });
  }
  // UPDATE
  edit(value) {
    const dialogRef = this.dialog.open(DictRankDialogComponent, {
      width: "400px",
      data: __spreadValues({}, value)
      // Передаем копию объекта для редактирования
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dictService.update(result.id, result).subscribe(() => this.reload());
      }
    });
  }
  // DELETE
  delete(value) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      width: "360px",
      maxWidth: "95vw",
      //disableClose: true,   // чтобы не закрывалось по клику вне/ESC
      autoFocus: false,
      data: {
        title: "\u0412\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F \u0437\u0430\u043F\u0438\u0441\u0443",
        message: `\u0412\u0438 \u0432\u043F\u0435\u0432\u043D\u0435\u043D\u0456, \u0449\u043E \u0445\u043E\u0447\u0435\u0442\u0435 \u0432\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u0437\u0430\u043F\u0438\u0441 "${value.value}"?`,
        confirmText: "\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438",
        cancelText: "\u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438",
        color: "warn",
        icon: "warning"
      }
    });
    ref.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.dictService.delete(value.id).subscribe(() => this.reload());
      }
    });
  }
  static \u0275fac = function DictRanksComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DictRanksComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DictRanksComponent, selectors: [["dict-ranks"]], viewQuery: function DictRanksComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(MatSort, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.sort = _t.first);
    }
  }, decls: 35, vars: 3, consts: [[1, "dict-page-container"], [1, "action-buttons"], ["mat-raised-button", "", "color", "primary", 3, "click"], ["mat-table", "", "matSort", "", 1, "mat-elevation-z8", 3, "dataSource"], ["matColumnDef", "value"], ["mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "shortValue"], ["matColumnDef", "natoCode"], ["matColumnDef", "category"], ["matColumnDef", "subCategory"], ["matColumnDef", "orderVal"], ["matColumnDef", "comment"], ["matColumnDef", "actions"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", "", "mat-sort-header", ""], ["mat-cell", ""], ["mat-header-cell", ""], ["mat-icon-button", "", "color", "accent", 3, "click"], ["mat-icon-button", "", "color", "warn", 3, "click"], ["mat-header-row", ""], ["mat-row", ""]], template: function DictRanksComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "h2");
      \u0275\u0275text(2, "\u0412\u0456\u0439\u0441\u044C\u043A\u043E\u0432\u0456 \u0437\u0432\u0430\u043D\u043D\u044F");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "div", 1)(4, "button", 2);
      \u0275\u0275listener("click", function DictRanksComponent_Template_button_click_4_listener() {
        return ctx.reload();
      });
      \u0275\u0275text(5, "\u041E\u043D\u043E\u0432\u0438\u0442\u0438");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "button", 2);
      \u0275\u0275listener("click", function DictRanksComponent_Template_button_click_6_listener() {
        return ctx.add();
      });
      \u0275\u0275text(7, "\u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "table", 3);
      \u0275\u0275elementContainerStart(9, 4);
      \u0275\u0275template(10, DictRanksComponent_th_10_Template, 2, 0, "th", 5)(11, DictRanksComponent_td_11_Template, 2, 1, "td", 6);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(12, 7);
      \u0275\u0275template(13, DictRanksComponent_th_13_Template, 2, 0, "th", 5)(14, DictRanksComponent_td_14_Template, 2, 1, "td", 6);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(15, 8);
      \u0275\u0275template(16, DictRanksComponent_th_16_Template, 2, 0, "th", 5)(17, DictRanksComponent_td_17_Template, 2, 1, "td", 6);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(18, 9);
      \u0275\u0275template(19, DictRanksComponent_th_19_Template, 2, 0, "th", 5)(20, DictRanksComponent_td_20_Template, 2, 1, "td", 6);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(21, 10);
      \u0275\u0275template(22, DictRanksComponent_th_22_Template, 2, 0, "th", 5)(23, DictRanksComponent_td_23_Template, 2, 1, "td", 6);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(24, 11);
      \u0275\u0275template(25, DictRanksComponent_th_25_Template, 2, 0, "th", 5)(26, DictRanksComponent_td_26_Template, 2, 1, "td", 6);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(27, 12);
      \u0275\u0275template(28, DictRanksComponent_th_28_Template, 2, 0, "th", 5)(29, DictRanksComponent_td_29_Template, 2, 1, "td", 6);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(30, 13);
      \u0275\u0275template(31, DictRanksComponent_th_31_Template, 2, 0, "th", 14)(32, DictRanksComponent_td_32_Template, 7, 0, "td", 6);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275template(33, DictRanksComponent_tr_33_Template, 1, 0, "tr", 15)(34, DictRanksComponent_tr_34_Template, 1, 0, "tr", 16);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(8);
      \u0275\u0275property("dataSource", ctx.dataSource);
      \u0275\u0275advance(25);
      \u0275\u0275property("matHeaderRowDef", ctx.displayedColumns);
      \u0275\u0275advance();
      \u0275\u0275property("matRowDefColumns", ctx.displayedColumns);
    }
  }, dependencies: [MatTableModule, MatTable, MatHeaderCellDef, MatHeaderRowDef, MatColumnDef, MatCellDef, MatRowDef, MatHeaderCell, MatCell, MatHeaderRow, MatRow, MatButtonModule, MatButton, MatIconButton, MatSortModule, MatSort, MatSortHeader, MatIconModule, MatIcon], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  height: 100%;\n}\ntable[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.mat-mdc-row[_ngcontent-%COMP%] {\n  cursor: pointer;\n  transition: background-color 0.2s;\n}\n.mat-mdc-row[_ngcontent-%COMP%]:hover {\n  background-color: #f5f5f5;\n}\n.mat-mdc-row.selected[_ngcontent-%COMP%] {\n  background-color: #e3f2fd !important;\n}\n.mat-mdc-row.selected[_ngcontent-%COMP%]:hover {\n  background-color: #bbdefb !important;\n}\n.dict-page-container[_ngcontent-%COMP%] {\n  height: calc(100vh - 64px);\n  overflow-y: auto;\n  padding: 16px;\n  padding-bottom: 32px;\n}\n.dict-page-container[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.dict-page-container[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.dict-page-container[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]    + button[_ngcontent-%COMP%] {\n  margin-left: 8px;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-top: 1em;\n  margin-bottom: 16px;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]   .value-text[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]   .edit-btn[_ngcontent-%COMP%] {\n  opacity: 0;\n  transition: opacity 0.2s;\n  width: 32px;\n  height: 32px;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]   .edit-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]:hover   .view-mode[_ngcontent-%COMP%]   .edit-btn[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .inline-input[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 4px 8px;\n  border: 1px solid #2196f3;\n  border-radius: 4px;\n  font-size: 14px;\n  background-color: #f5f5f5;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .inline-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #1976d2;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .save-btn[_ngcontent-%COMP%], \n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  flex-shrink: 0;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .save-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], \n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .save-btn[_ngcontent-%COMP%] {\n  color: #4caf50;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%] {\n  color: #f44336;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .clickable-row[_ngcontent-%COMP%] {\n  cursor: pointer;\n  transition: background-color 0.2s;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .clickable-row[_ngcontent-%COMP%]:hover {\n  background-color: #f5f5f5;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .clickable-row.selected[_ngcontent-%COMP%] {\n  background-color: #e3f2fd;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .clickable-row.selected[_ngcontent-%COMP%]:hover {\n  background-color: #bbdefb;\n}\n/*# sourceMappingURL=dict-page.styles.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DictRanksComponent, [{
    type: Component,
    args: [{ selector: "dict-ranks", imports: [MatTableModule, MatButtonModule, MatSortModule, MatIconModule], template: `
    <div class="dict-page-container">
      <h2>\u0412\u0456\u0439\u0441\u044C\u043A\u043E\u0432\u0456 \u0437\u0432\u0430\u043D\u043D\u044F</h2>
      <div class="action-buttons">
        <button mat-raised-button color="primary" (click)="reload()">\u041E\u043D\u043E\u0432\u0438\u0442\u0438</button>
        <button mat-raised-button color="primary" (click)="add()">\u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438</button>
      </div>
      <table mat-table [dataSource]="dataSource" matSort class="mat-elevation-z8">
        <!-- Value Column -->
        <ng-container matColumnDef="value">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>\u0417\u043D\u0430\u0447\u0435\u043D\u043D\u044F</th>
          <td mat-cell *matCellDef="let area">{{ area.value }}</td>
        </ng-container>
        <ng-container matColumnDef="shortValue">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>\u0421\u043A\u043E\u0440\u043E\u0447\u0435\u043D\u043D\u044F</th>
          <td mat-cell *matCellDef="let area">{{ area.shortValue }}</td>
        </ng-container>
        <ng-container matColumnDef="natoCode">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>\u041A\u043E\u0434 NATO</th>
          <td mat-cell *matCellDef="let area">{{ area.natoCode }}</td>
        </ng-container>
        <ng-container matColumnDef="category">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0456\u044F</th>
          <td mat-cell *matCellDef="let area">{{ area.category }}</td>
        </ng-container>
        <ng-container matColumnDef="subCategory">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>\u041F\u0456\u0434\u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0456\u044F</th>
          <td mat-cell *matCellDef="let area">{{ area.subCategory }}</td>
        </ng-container>
        <ng-container matColumnDef="orderVal">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>\u041F\u043E\u0440\u044F\u0434\u043E\u043A</th>
          <td mat-cell *matCellDef="let area">{{ area.orderVal }}</td>
        </ng-container>

        <!-- Comment Column -->
        <ng-container matColumnDef="comment">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>\u041A\u043E\u043C\u0435\u043D\u0442\u0430\u0440</th>
          <td mat-cell *matCellDef="let area">{{ area.comment }}</td>
        </ng-container>
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>\u0414\u0456\u0457</th>
          <td mat-cell *matCellDef="let area">
            <button mat-icon-button color="accent" (click)="edit(area)">
              <mat-icon>edit</mat-icon>
            </button>
            <button mat-icon-button color="warn" (click)="delete(area)">
              <mat-icon>delete</mat-icon>
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>
    </div>
  `, styles: ["/* src/dictionaries/dict-page.styles.scss */\n:host {\n  display: block;\n  height: 100%;\n}\ntable {\n  width: 100%;\n}\n.mat-mdc-row {\n  cursor: pointer;\n  transition: background-color 0.2s;\n}\n.mat-mdc-row:hover {\n  background-color: #f5f5f5;\n}\n.mat-mdc-row.selected {\n  background-color: #e3f2fd !important;\n}\n.mat-mdc-row.selected:hover {\n  background-color: #bbdefb !important;\n}\n.dict-page-container {\n  height: calc(100vh - 64px);\n  overflow-y: auto;\n  padding: 16px;\n  padding-bottom: 32px;\n}\n.dict-page-container h2 {\n  margin-bottom: 16px;\n}\n.dict-page-container .action-buttons {\n  margin-bottom: 16px;\n}\n.dict-page-container .action-buttons button + button {\n  margin-left: 8px;\n}\n.dict-page-container table {\n  width: 100%;\n  margin-top: 1em;\n  margin-bottom: 16px;\n}\n.dict-page-container table .editable-cell .view-mode {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.dict-page-container table .editable-cell .view-mode .value-text {\n  flex: 1;\n}\n.dict-page-container table .editable-cell .view-mode .edit-btn {\n  opacity: 0;\n  transition: opacity 0.2s;\n  width: 32px;\n  height: 32px;\n}\n.dict-page-container table .editable-cell .view-mode .edit-btn mat-icon {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.dict-page-container table .editable-cell:hover .view-mode .edit-btn {\n  opacity: 1;\n}\n.dict-page-container table .editable-cell .edit-mode {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.dict-page-container table .editable-cell .edit-mode .inline-input {\n  flex: 1;\n  padding: 4px 8px;\n  border: 1px solid #2196f3;\n  border-radius: 4px;\n  font-size: 14px;\n  background-color: #f5f5f5;\n}\n.dict-page-container table .editable-cell .edit-mode .inline-input:focus {\n  outline: none;\n  border-color: #1976d2;\n}\n.dict-page-container table .editable-cell .edit-mode .save-btn,\n.dict-page-container table .editable-cell .edit-mode .cancel-btn {\n  width: 32px;\n  height: 32px;\n  flex-shrink: 0;\n}\n.dict-page-container table .editable-cell .edit-mode .save-btn mat-icon,\n.dict-page-container table .editable-cell .edit-mode .cancel-btn mat-icon {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.dict-page-container table .editable-cell .edit-mode .save-btn {\n  color: #4caf50;\n}\n.dict-page-container table .editable-cell .edit-mode .cancel-btn {\n  color: #f44336;\n}\n.dict-page-container table .clickable-row {\n  cursor: pointer;\n  transition: background-color 0.2s;\n}\n.dict-page-container table .clickable-row:hover {\n  background-color: #f5f5f5;\n}\n.dict-page-container table .clickable-row.selected {\n  background-color: #e3f2fd;\n}\n.dict-page-container table .clickable-row.selected:hover {\n  background-color: #bbdefb;\n}\n/*# sourceMappingURL=dict-page.styles.css.map */\n"] }]
  }], () => [], { sort: [{
    type: ViewChild,
    args: [MatSort]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DictRanksComponent, { className: "DictRanksComponent", filePath: "dictionaries/dictRanks.component.ts", lineNumber: 73 });
})();
export {
  DictRanksComponent
};
//# sourceMappingURL=chunk-GUFZKSBT.js.map
