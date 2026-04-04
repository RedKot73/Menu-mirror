import {
  DictDroneTypeService
} from "./chunk-MTH6INWB.js";
import {
  MatSnackBar,
  S5App_ErrorHandler
} from "./chunk-NPKDGQEZ.js";
import {
  ShortDictDialogComponent
} from "./chunk-GUU7767C.js";
import {
  ConfirmDialogComponent
} from "./chunk-5PAFCFZS.js";
import {
  MatSort,
  MatSortHeader,
  MatSortModule
} from "./chunk-ZAFJFBI5.js";
import {
  MatDialog
} from "./chunk-6JIBB4FG.js";
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
} from "./chunk-4VUQ3EJZ.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-Z4Z6CI4E.js";
import "./chunk-N27GZOTW.js";
import {
  Component,
  MatButton,
  MatButtonModule,
  MatIconButton,
  ViewChild,
  __spreadValues,
  effect,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
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
  ɵɵviewQuery
} from "./chunk-CK6AJVHQ.js";

// src/dictionaries/dictDroneType.component.ts
function DictDroneTypeComponent_th_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 13);
    \u0275\u0275text(1, "\u0417\u043D\u0430\u0447\u0435\u043D\u043D\u044F");
    \u0275\u0275elementEnd();
  }
}
function DictDroneTypeComponent_td_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r1.value);
  }
}
function DictDroneTypeComponent_th_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 13);
    \u0275\u0275text(1, "\u0421\u043A\u043E\u0440\u043E\u0447\u0435\u043D\u043D\u044F");
    \u0275\u0275elementEnd();
  }
}
function DictDroneTypeComponent_td_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r2.shortValue);
  }
}
function DictDroneTypeComponent_th_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 13);
    \u0275\u0275text(1, "\u041A\u043E\u043C\u0435\u043D\u0442\u0430\u0440");
    \u0275\u0275elementEnd();
  }
}
function DictDroneTypeComponent_td_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r3.comment);
  }
}
function DictDroneTypeComponent_th_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 15);
    \u0275\u0275text(1, "\u0414\u0456\u0457");
    \u0275\u0275elementEnd();
  }
}
function DictDroneTypeComponent_td_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 14)(1, "button", 16);
    \u0275\u0275listener("click", function DictDroneTypeComponent_td_20_Template_button_click_1_listener() {
      const item_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r5 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r5.edit(item_r5));
    });
    \u0275\u0275elementStart(2, "mat-icon");
    \u0275\u0275text(3, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "button", 17);
    \u0275\u0275listener("click", function DictDroneTypeComponent_td_20_Template_button_click_4_listener() {
      const item_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r5 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r5.delete(item_r5));
    });
    \u0275\u0275elementStart(5, "mat-icon");
    \u0275\u0275text(6, "delete");
    \u0275\u0275elementEnd()()();
  }
}
function DictDroneTypeComponent_tr_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 18);
  }
}
function DictDroneTypeComponent_tr_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 19);
  }
}
var DictDroneTypeComponent = class _DictDroneTypeComponent {
  dictDroneTypeService = inject(DictDroneTypeService);
  items = this.dictDroneTypeService.createItemsSignal();
  dataSource = new MatTableDataSource([]);
  displayedColumns = ["value", "shortValue", "comment", "actions"];
  dialog = inject(MatDialog);
  snackBar = inject(MatSnackBar);
  sort;
  constructor() {
    effect(() => {
      this.dataSource.data = this.items();
    });
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.reload();
  }
  reload() {
    this.dictDroneTypeService.getAll().subscribe({
      next: (items) => this.items.set(items),
      error: (error) => {
        console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u0442\u0438\u043F\u0456\u0432 \u0411\u041F\u041B\u0410:", error);
        const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u0442\u0438\u043F\u0456\u0432 \u0411\u041F\u041B\u0410:");
        this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
      }
    });
  }
  add() {
    const dialogRef = this.dialog.open(ShortDictDialogComponent, {
      width: "400px",
      data: { value: "", shortValue: "", comment: "" }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dictDroneTypeService.create(result).subscribe({
          next: () => {
            this.reload();
            this.snackBar.open("\u0422\u0438\u043F \u0411\u041F\u041B\u0410 \u0443\u0441\u043F\u0456\u0448\u043D\u043E \u0441\u0442\u0432\u043E\u0440\u0435\u043D\u043E", "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 3e3 });
          },
          error: (error) => {
            console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0441\u0442\u0432\u043E\u0440\u0435\u043D\u043D\u044F \u0442\u0438\u043F\u0443 \u0411\u041F\u041B\u0410:", error);
            const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0441\u0442\u0432\u043E\u0440\u0435\u043D\u043D\u044F \u0442\u0438\u043F\u0443 \u0411\u041F\u041B\u0410:");
            this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
          }
        });
      }
    });
  }
  edit(droneType) {
    const dialogRef = this.dialog.open(ShortDictDialogComponent, {
      width: "400px",
      data: __spreadValues({}, droneType)
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dictDroneTypeService.update(result.id, result).subscribe({
          next: () => {
            this.reload();
            this.snackBar.open("\u0422\u0438\u043F \u0411\u041F\u041B\u0410 \u0443\u0441\u043F\u0456\u0448\u043D\u043E \u043E\u043D\u043E\u0432\u043B\u0435\u043D\u043E", "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 3e3 });
          },
          error: (error) => {
            console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043E\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u044F \u0442\u0438\u043F\u0443 \u0411\u041F\u041B\u0410:", error);
            const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043E\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u044F \u0442\u0438\u043F\u0443 \u0411\u041F\u041B\u0410:");
            this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
          }
        });
      }
    });
  }
  delete(droneType) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      width: "360px",
      maxWidth: "95vw",
      autoFocus: false,
      data: {
        title: "\u0412\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F \u0437\u0430\u043F\u0438\u0441\u0443",
        message: `\u0412\u0438 \u0432\u043F\u0435\u0432\u043D\u0435\u043D\u0456, \u0449\u043E \u0445\u043E\u0447\u0435\u0442\u0435 \u0432\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u0437\u0430\u043F\u0438\u0441 "${droneType.value}"?`,
        confirmText: "\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438",
        cancelText: "\u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438",
        color: "warn",
        icon: "warning"
      }
    });
    ref.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.dictDroneTypeService.delete(droneType.id).subscribe({
          next: () => {
            this.reload();
            this.snackBar.open("\u0422\u0438\u043F \u0411\u041F\u041B\u0410 \u0443\u0441\u043F\u0456\u0448\u043D\u043E \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u043E", "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 3e3 });
          },
          error: (error) => {
            console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F \u0442\u0438\u043F\u0443 \u0411\u041F\u041B\u0410:", error);
            const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F \u0442\u0438\u043F\u0443 \u0411\u041F\u041B\u0410:");
            this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
          }
        });
      }
    });
  }
  static \u0275fac = function DictDroneTypeComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DictDroneTypeComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DictDroneTypeComponent, selectors: [["dict-drone-types"]], viewQuery: function DictDroneTypeComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(MatSort, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.sort = _t.first);
    }
  }, decls: 23, vars: 3, consts: [[1, "dict-page-container"], [1, "action-buttons"], ["mat-raised-button", "", "color", "primary", 3, "click"], ["mat-table", "", "matSort", "", 1, "mat-elevation-z8", 3, "dataSource"], ["matColumnDef", "value"], ["mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "shortValue"], ["matColumnDef", "comment"], ["matColumnDef", "actions"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", "", "mat-sort-header", ""], ["mat-cell", ""], ["mat-header-cell", ""], ["mat-icon-button", "", "color", "accent", 3, "click"], ["mat-icon-button", "", "color", "warn", 3, "click"], ["mat-header-row", ""], ["mat-row", ""]], template: function DictDroneTypeComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "h2");
      \u0275\u0275text(2, "\u0422\u0438\u043F\u0438 \u0411\u041F\u041B\u0410");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "div", 1)(4, "button", 2);
      \u0275\u0275listener("click", function DictDroneTypeComponent_Template_button_click_4_listener() {
        return ctx.reload();
      });
      \u0275\u0275text(5, "\u041E\u043D\u043E\u0432\u0438\u0442\u0438");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "button", 2);
      \u0275\u0275listener("click", function DictDroneTypeComponent_Template_button_click_6_listener() {
        return ctx.add();
      });
      \u0275\u0275text(7, "\u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "table", 3);
      \u0275\u0275elementContainerStart(9, 4);
      \u0275\u0275template(10, DictDroneTypeComponent_th_10_Template, 2, 0, "th", 5)(11, DictDroneTypeComponent_td_11_Template, 2, 1, "td", 6);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(12, 7);
      \u0275\u0275template(13, DictDroneTypeComponent_th_13_Template, 2, 0, "th", 5)(14, DictDroneTypeComponent_td_14_Template, 2, 1, "td", 6);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(15, 8);
      \u0275\u0275template(16, DictDroneTypeComponent_th_16_Template, 2, 0, "th", 5)(17, DictDroneTypeComponent_td_17_Template, 2, 1, "td", 6);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(18, 9);
      \u0275\u0275template(19, DictDroneTypeComponent_th_19_Template, 2, 0, "th", 10)(20, DictDroneTypeComponent_td_20_Template, 7, 0, "td", 6);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275template(21, DictDroneTypeComponent_tr_21_Template, 1, 0, "tr", 11)(22, DictDroneTypeComponent_tr_22_Template, 1, 0, "tr", 12);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(8);
      \u0275\u0275property("dataSource", ctx.dataSource);
      \u0275\u0275advance(13);
      \u0275\u0275property("matHeaderRowDef", ctx.displayedColumns);
      \u0275\u0275advance();
      \u0275\u0275property("matRowDefColumns", ctx.displayedColumns);
    }
  }, dependencies: [MatTableModule, MatTable, MatHeaderCellDef, MatHeaderRowDef, MatColumnDef, MatCellDef, MatRowDef, MatHeaderCell, MatCell, MatHeaderRow, MatRow, MatButtonModule, MatButton, MatIconButton, MatSortModule, MatSort, MatSortHeader, MatIconModule, MatIcon], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  height: 100%;\n}\ntable[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.mat-mdc-row[_ngcontent-%COMP%] {\n  cursor: pointer;\n  transition: background-color 0.2s;\n}\n.mat-mdc-row[_ngcontent-%COMP%]:hover {\n  background-color: #f5f5f5;\n}\n.mat-mdc-row.selected[_ngcontent-%COMP%] {\n  background-color: #e3f2fd !important;\n}\n.mat-mdc-row.selected[_ngcontent-%COMP%]:hover {\n  background-color: #bbdefb !important;\n}\n.dict-page-container[_ngcontent-%COMP%] {\n  height: calc(100vh - 64px);\n  overflow-y: auto;\n  padding: 16px;\n  padding-bottom: 32px;\n}\n.dict-page-container[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.dict-page-container[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.dict-page-container[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]    + button[_ngcontent-%COMP%] {\n  margin-left: 8px;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-top: 1em;\n  margin-bottom: 16px;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]   .value-text[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]   .edit-btn[_ngcontent-%COMP%] {\n  opacity: 0;\n  transition: opacity 0.2s;\n  width: 32px;\n  height: 32px;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]   .edit-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]:hover   .view-mode[_ngcontent-%COMP%]   .edit-btn[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .inline-input[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 4px 8px;\n  border: 1px solid #2196f3;\n  border-radius: 4px;\n  font-size: 14px;\n  background-color: #f5f5f5;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .inline-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #1976d2;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .save-btn[_ngcontent-%COMP%], \n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  flex-shrink: 0;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .save-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], \n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .save-btn[_ngcontent-%COMP%] {\n  color: #4caf50;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%] {\n  color: #f44336;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .clickable-row[_ngcontent-%COMP%] {\n  cursor: pointer;\n  transition: background-color 0.2s;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .clickable-row[_ngcontent-%COMP%]:hover {\n  background-color: #f5f5f5;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .clickable-row.selected[_ngcontent-%COMP%] {\n  background-color: #e3f2fd;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .clickable-row.selected[_ngcontent-%COMP%]:hover {\n  background-color: #bbdefb;\n}\n/*# sourceMappingURL=dict-page.styles.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DictDroneTypeComponent, [{
    type: Component,
    args: [{ selector: "dict-drone-types", imports: [MatTableModule, MatButtonModule, MatSortModule, MatIconModule], template: `
    <div class="dict-page-container">
      <h2>\u0422\u0438\u043F\u0438 \u0411\u041F\u041B\u0410</h2>
      <div class="action-buttons">
        <button mat-raised-button color="primary" (click)="reload()">\u041E\u043D\u043E\u0432\u0438\u0442\u0438</button>
        <button mat-raised-button color="primary" (click)="add()">\u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438</button>
      </div>
      <table mat-table [dataSource]="dataSource" matSort class="mat-elevation-z8">
        <!-- Value Column -->
        <ng-container matColumnDef="value">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>\u0417\u043D\u0430\u0447\u0435\u043D\u043D\u044F</th>
          <td mat-cell *matCellDef="let item">{{ item.value }}</td>
        </ng-container>
        <ng-container matColumnDef="shortValue">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>\u0421\u043A\u043E\u0440\u043E\u0447\u0435\u043D\u043D\u044F</th>
          <td mat-cell *matCellDef="let item">{{ item.shortValue }}</td>
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
  `, styles: ["/* src/dictionaries/dict-page.styles.scss */\n:host {\n  display: block;\n  height: 100%;\n}\ntable {\n  width: 100%;\n}\n.mat-mdc-row {\n  cursor: pointer;\n  transition: background-color 0.2s;\n}\n.mat-mdc-row:hover {\n  background-color: #f5f5f5;\n}\n.mat-mdc-row.selected {\n  background-color: #e3f2fd !important;\n}\n.mat-mdc-row.selected:hover {\n  background-color: #bbdefb !important;\n}\n.dict-page-container {\n  height: calc(100vh - 64px);\n  overflow-y: auto;\n  padding: 16px;\n  padding-bottom: 32px;\n}\n.dict-page-container h2 {\n  margin-bottom: 16px;\n}\n.dict-page-container .action-buttons {\n  margin-bottom: 16px;\n}\n.dict-page-container .action-buttons button + button {\n  margin-left: 8px;\n}\n.dict-page-container table {\n  width: 100%;\n  margin-top: 1em;\n  margin-bottom: 16px;\n}\n.dict-page-container table .editable-cell .view-mode {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.dict-page-container table .editable-cell .view-mode .value-text {\n  flex: 1;\n}\n.dict-page-container table .editable-cell .view-mode .edit-btn {\n  opacity: 0;\n  transition: opacity 0.2s;\n  width: 32px;\n  height: 32px;\n}\n.dict-page-container table .editable-cell .view-mode .edit-btn mat-icon {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.dict-page-container table .editable-cell:hover .view-mode .edit-btn {\n  opacity: 1;\n}\n.dict-page-container table .editable-cell .edit-mode {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.dict-page-container table .editable-cell .edit-mode .inline-input {\n  flex: 1;\n  padding: 4px 8px;\n  border: 1px solid #2196f3;\n  border-radius: 4px;\n  font-size: 14px;\n  background-color: #f5f5f5;\n}\n.dict-page-container table .editable-cell .edit-mode .inline-input:focus {\n  outline: none;\n  border-color: #1976d2;\n}\n.dict-page-container table .editable-cell .edit-mode .save-btn,\n.dict-page-container table .editable-cell .edit-mode .cancel-btn {\n  width: 32px;\n  height: 32px;\n  flex-shrink: 0;\n}\n.dict-page-container table .editable-cell .edit-mode .save-btn mat-icon,\n.dict-page-container table .editable-cell .edit-mode .cancel-btn mat-icon {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.dict-page-container table .editable-cell .edit-mode .save-btn {\n  color: #4caf50;\n}\n.dict-page-container table .editable-cell .edit-mode .cancel-btn {\n  color: #f44336;\n}\n.dict-page-container table .clickable-row {\n  cursor: pointer;\n  transition: background-color 0.2s;\n}\n.dict-page-container table .clickable-row:hover {\n  background-color: #f5f5f5;\n}\n.dict-page-container table .clickable-row.selected {\n  background-color: #e3f2fd;\n}\n.dict-page-container table .clickable-row.selected:hover {\n  background-color: #bbdefb;\n}\n/*# sourceMappingURL=dict-page.styles.css.map */\n"] }]
  }], () => [], { sort: [{
    type: ViewChild,
    args: [MatSort]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DictDroneTypeComponent, { className: "DictDroneTypeComponent", filePath: "dictionaries/dictDroneType.component.ts", lineNumber: 58 });
})();
export {
  DictDroneTypeComponent
};
//# sourceMappingURL=chunk-354MFVHW.js.map
