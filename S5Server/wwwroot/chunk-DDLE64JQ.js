import {
  DictForcesTypeService
} from "./chunk-6SR2RTVJ.js";
import {
  ShortDictDialogComponent
} from "./chunk-NV4XPKRD.js";
import {
  ConfirmDialogComponent
} from "./chunk-HZZ5364W.js";
import {
  MatSort,
  MatSortHeader,
  MatSortModule
} from "./chunk-M6BC2PYI.js";
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
} from "./chunk-BZXRQG5G.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-OWDCNZN3.js";
import {
  MatDialog
} from "./chunk-PALKAU2I.js";
import "./chunk-KRVND5CP.js";
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
} from "./chunk-WAYE7YII.js";

// src/dictionaries/dictForcesType.component.ts
function DictForcesTypeComponent_th_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 13);
    \u0275\u0275text(1, "\u0417\u043D\u0430\u0447\u0435\u043D\u043D\u044F");
    \u0275\u0275elementEnd();
  }
}
function DictForcesTypeComponent_td_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const area_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(area_r1.value);
  }
}
function DictForcesTypeComponent_th_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 13);
    \u0275\u0275text(1, "\u0421\u043A\u043E\u0440\u043E\u0447\u0435\u043D\u043D\u044F");
    \u0275\u0275elementEnd();
  }
}
function DictForcesTypeComponent_td_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const area_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(area_r2.shortValue);
  }
}
function DictForcesTypeComponent_th_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 13);
    \u0275\u0275text(1, "\u041A\u043E\u043C\u0435\u043D\u0442\u0430\u0440");
    \u0275\u0275elementEnd();
  }
}
function DictForcesTypeComponent_td_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const area_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(area_r3.comment);
  }
}
function DictForcesTypeComponent_th_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 15);
    \u0275\u0275text(1, "\u0414\u0456\u0457");
    \u0275\u0275elementEnd();
  }
}
function DictForcesTypeComponent_td_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 14)(1, "button", 16);
    \u0275\u0275listener("click", function DictForcesTypeComponent_td_20_Template_button_click_1_listener() {
      const area_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r5 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r5.edit(area_r5));
    });
    \u0275\u0275elementStart(2, "mat-icon");
    \u0275\u0275text(3, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "button", 17);
    \u0275\u0275listener("click", function DictForcesTypeComponent_td_20_Template_button_click_4_listener() {
      const area_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r5 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r5.delete(area_r5));
    });
    \u0275\u0275elementStart(5, "mat-icon");
    \u0275\u0275text(6, "delete");
    \u0275\u0275elementEnd()()();
  }
}
function DictForcesTypeComponent_tr_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 18);
  }
}
function DictForcesTypeComponent_tr_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 19);
  }
}
var DictForcesTypeComponent = class _DictForcesTypeComponent {
  // API endpoint перенесен в сервис
  // сервис является общим для нескольких модулей,
  // поэтому его функционал вынесен в отдельный сервис
  dictForcesTypeService = inject(DictForcesTypeService);
  items = this.dictForcesTypeService.createItemsSignal();
  dataSource = new MatTableDataSource([]);
  displayedColumns = ["value", "shortValue", "comment", "actions"];
  dialog = inject(MatDialog);
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
    this.dictForcesTypeService.getAll().subscribe((items) => this.items.set(items));
  }
  // CREATE
  add() {
    const dialogRef = this.dialog.open(ShortDictDialogComponent, {
      width: "400px",
      data: { value: "", comment: "" }
      // Передаем пустой объект для создания
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dictForcesTypeService.create(result).subscribe(() => this.reload());
      }
    });
  }
  // UPDATE
  edit(forcesType) {
    const dialogRef = this.dialog.open(ShortDictDialogComponent, {
      width: "400px",
      data: __spreadValues({}, forcesType)
      // Передаем копию объекта для редактирования
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dictForcesTypeService.update(result.id, result).subscribe(() => this.reload());
      }
    });
  }
  // DELETE
  delete(forcesType) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      width: "360px",
      maxWidth: "95vw",
      //disableClose: true,   // чтобы не закрывалось по клику вне/ESC
      autoFocus: false,
      data: {
        title: "\u0412\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F \u0437\u0430\u043F\u0438\u0441\u0443",
        message: `\u0412\u0438 \u0432\u043F\u0435\u0432\u043D\u0435\u043D\u0456, \u0449\u043E \u0445\u043E\u0447\u0435\u0442\u0435 \u0432\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u0437\u0430\u043F\u0438\u0441 "${forcesType.value}"?`,
        confirmText: "\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438",
        cancelText: "\u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438",
        color: "warn",
        icon: "warning"
      }
    });
    ref.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.dictForcesTypeService.delete(forcesType.id).subscribe(() => this.reload());
      }
    });
  }
  static \u0275fac = function DictForcesTypeComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DictForcesTypeComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DictForcesTypeComponent, selectors: [["dict-forces-types"]], viewQuery: function DictForcesTypeComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(MatSort, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.sort = _t.first);
    }
  }, decls: 23, vars: 3, consts: [[1, "dict-page-container"], [1, "action-buttons"], ["mat-raised-button", "", "color", "primary", 3, "click"], ["mat-table", "", "matSort", "", 1, "mat-elevation-z8", 3, "dataSource"], ["matColumnDef", "value"], ["mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "shortValue"], ["matColumnDef", "comment"], ["matColumnDef", "actions"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", "", "mat-sort-header", ""], ["mat-cell", ""], ["mat-header-cell", ""], ["mat-icon-button", "", "color", "accent", 3, "click"], ["mat-icon-button", "", "color", "warn", 3, "click"], ["mat-header-row", ""], ["mat-row", ""]], template: function DictForcesTypeComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "h2");
      \u0275\u0275text(2, "\u0412\u0438\u0434\u0438 \u0437\u0431\u0440\u043E\u0439\u043D\u0438\u0445 \u0441\u0438\u043B");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "div", 1)(4, "button", 2);
      \u0275\u0275listener("click", function DictForcesTypeComponent_Template_button_click_4_listener() {
        return ctx.reload();
      });
      \u0275\u0275text(5, "\u041E\u043D\u043E\u0432\u0438\u0442\u0438");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "button", 2);
      \u0275\u0275listener("click", function DictForcesTypeComponent_Template_button_click_6_listener() {
        return ctx.add();
      });
      \u0275\u0275text(7, "\u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "table", 3);
      \u0275\u0275elementContainerStart(9, 4);
      \u0275\u0275template(10, DictForcesTypeComponent_th_10_Template, 2, 0, "th", 5)(11, DictForcesTypeComponent_td_11_Template, 2, 1, "td", 6);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(12, 7);
      \u0275\u0275template(13, DictForcesTypeComponent_th_13_Template, 2, 0, "th", 5)(14, DictForcesTypeComponent_td_14_Template, 2, 1, "td", 6);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(15, 8);
      \u0275\u0275template(16, DictForcesTypeComponent_th_16_Template, 2, 0, "th", 5)(17, DictForcesTypeComponent_td_17_Template, 2, 1, "td", 6);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(18, 9);
      \u0275\u0275template(19, DictForcesTypeComponent_th_19_Template, 2, 0, "th", 10)(20, DictForcesTypeComponent_td_20_Template, 7, 0, "td", 6);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275template(21, DictForcesTypeComponent_tr_21_Template, 1, 0, "tr", 11)(22, DictForcesTypeComponent_tr_22_Template, 1, 0, "tr", 12);
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
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DictForcesTypeComponent, [{
    type: Component,
    args: [{ selector: "dict-forces-types", imports: [MatTableModule, MatButtonModule, MatSortModule, MatIconModule], template: `
    <div class="dict-page-container">
      <h2>\u0412\u0438\u0434\u0438 \u0437\u0431\u0440\u043E\u0439\u043D\u0438\u0445 \u0441\u0438\u043B</h2>
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DictForcesTypeComponent, { className: "DictForcesTypeComponent", filePath: "dictionaries/dictForcesType.component.ts", lineNumber: 56 });
})();
export {
  DictForcesTypeComponent
};
//# sourceMappingURL=chunk-DDLE64JQ.js.map
