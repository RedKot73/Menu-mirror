import {
  CityCodeTreeComponent,
  DictCityCodeComponent,
  DictCityCodeService
} from "./chunk-LFIPNHVB.js";
import {
  DictAreaTypeService
} from "./chunk-WNS2T5KX.js";
import "./chunk-72GKHSC4.js";
import {
  VerticalLayoutComponent
} from "./chunk-JM2RLTDB.js";
import {
  DictAreasService
} from "./chunk-2GKY6SHC.js";
import "./chunk-ZFFHFAJV.js";
import {
  MatButtonToggle,
  MatButtonToggleGroup,
  MatButtonToggleModule
} from "./chunk-MSWNGD75.js";
import {
  MatTooltip,
  MatTooltipModule
} from "./chunk-ROBCPIX2.js";
import "./chunk-6M4I25T2.js";
import {
  MatSelect,
  MatSelectModule
} from "./chunk-ACLG7KVS.js";
import {
  MatOption
} from "./chunk-XKAE3JBC.js";
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
  CommonModule,
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
  MatSuffix,
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
  ɵɵattribute,
  ɵɵconditional,
  ɵɵconditionalCreate,
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
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-IBDYQGEV.js";

// src/app/dialogs/DictCityCode-dialog.component.ts
function DictCityCodeDialogComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 5);
    \u0275\u0275listener("click", function DictCityCodeDialogComponent_Conditional_12_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.clearSearch());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "close");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275attribute("aria-label", "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u0438 \u043F\u043E\u0448\u0443\u043A");
  }
}
function DictCityCodeDialogComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "dict-city-codes", 15);
    \u0275\u0275listener("itemSelected", function DictCityCodeDialogComponent_Conditional_25_Template_dict_city_codes_itemSelected_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onItemSelected($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275property("selectionMode", true);
  }
}
function DictCityCodeDialogComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "dict-city-code-tree", 16);
    \u0275\u0275listener("nodeSelected", function DictCityCodeDialogComponent_Conditional_26_Template_dict_city_code_tree_nodeSelected_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onNodeSelected($event));
    });
    \u0275\u0275elementEnd();
  }
}
var DictCityCodeDialogComponent = class _DictCityCodeDialogComponent {
  dialogRef = inject(MatDialogRef);
  data = inject(MAT_DIALOG_DATA, { optional: true });
  tableComponent;
  treeComponent;
  viewMode = signal("table", ...ngDevMode ? [{ debugName: "viewMode" }] : []);
  searchTerm = signal("", ...ngDevMode ? [{ debugName: "searchTerm" }] : []);
  onViewModeChange(mode) {
    this.viewMode.set(mode);
  }
  onSearch() {
    const search = this.searchTerm().trim();
    const mode = this.viewMode();
    if (mode === "table" && this.tableComponent) {
      this.tableComponent.searchTerm = search;
      this.tableComponent.onSearchChange();
    } else if (mode === "tree" && this.treeComponent) {
      this.treeComponent.searchText.set(search);
      this.treeComponent.onSearch();
    }
  }
  onRefresh() {
    const mode = this.viewMode();
    if (mode === "table" && this.tableComponent) {
      this.tableComponent.reload();
    } else if (mode === "tree" && this.treeComponent) {
      this.treeComponent.refresh();
    }
  }
  clearSearch() {
    this.searchTerm.set("");
    this.onSearch();
  }
  onItemSelected(item) {
    this.dialogRef.close(item);
  }
  onNodeSelected(node) {
    const cityCode = {
      id: node.id,
      categoryId: node.categoryId || "",
      category: node.category || "",
      value: node.value
      // Остальные поля будут undefined, но это нормально для выбора
    };
    this.dialogRef.close(cityCode);
  }
  onCancel() {
    this.dialogRef.close();
  }
  static \u0275fac = function DictCityCodeDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DictCityCodeDialogComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DictCityCodeDialogComponent, selectors: [["dict-city-code-dialog"]], viewQuery: function DictCityCodeDialogComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(DictCityCodeComponent, 5)(CityCodeTreeComponent, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.tableComponent = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.treeComponent = _t.first);
    }
  }, decls: 30, vars: 5, consts: [["mat-dialog-title", ""], [1, "dialog-content"], [1, "action-panel"], ["appearance", "outline", 1, "search-field"], ["matInput", "", "placeholder", "\u0412\u0432\u0435\u0434\u0456\u0442\u044C \u043D\u0430\u0437\u0432\u0443 \u0434\u043B\u044F \u043F\u043E\u0448\u0443\u043A\u0443", 3, "ngModelChange", "keyup.enter", "ngModel"], ["mat-icon-button", "", "matSuffix", "", 3, "click"], ["mat-icon-button", "", "matSuffix", ""], ["mat-raised-button", "", "color", "primary", 3, "click"], [1, "view-toggle", 3, "change", "value"], ["value", "table", "matTooltip", "\u0422\u0430\u0431\u043B\u0438\u0447\u043D\u0435 \u043F\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u043D\u044F"], ["value", "tree", "matTooltip", "\u0414\u0435\u0440\u0435\u0432\u043E\u043F\u043E\u0434\u0456\u0431\u043D\u0435 \u043F\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u043D\u044F"], [1, "content-panel"], [3, "selectionMode"], ["align", "end"], ["mat-button", "", 3, "click"], [3, "itemSelected", "selectionMode"], [3, "nodeSelected"]], template: function DictCityCodeDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "h2", 0);
      \u0275\u0275text(1, "\u0412\u0438\u0431\u0456\u0440 \u0430\u0434\u043C\u0456\u043D\u0456\u0441\u0442\u0440\u0430\u0442\u0438\u0432\u043D\u043E-\u0442\u0435\u0440\u0438\u0442\u043E\u0440\u0456\u0430\u043B\u044C\u043D\u043E\u0457 \u043E\u0434\u0438\u043D\u0438\u0446\u0456");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(2, "mat-dialog-content")(3, "div", 1)(4, "div", 2)(5, "mat-form-field", 3)(6, "mat-label");
      \u0275\u0275text(7, "\u041F\u043E\u0448\u0443\u043A");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "input", 4);
      \u0275\u0275twoWayListener("ngModelChange", function DictCityCodeDialogComponent_Template_input_ngModelChange_8_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event);
        return $event;
      });
      \u0275\u0275listener("keyup.enter", function DictCityCodeDialogComponent_Template_input_keyup_enter_8_listener() {
        return ctx.onSearch();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "button", 5);
      \u0275\u0275listener("click", function DictCityCodeDialogComponent_Template_button_click_9_listener() {
        return ctx.onSearch();
      });
      \u0275\u0275elementStart(10, "mat-icon");
      \u0275\u0275text(11, "search");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(12, DictCityCodeDialogComponent_Conditional_12_Template, 3, 1, "button", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "button", 7);
      \u0275\u0275listener("click", function DictCityCodeDialogComponent_Template_button_click_13_listener() {
        return ctx.onRefresh();
      });
      \u0275\u0275elementStart(14, "mat-icon");
      \u0275\u0275text(15, "refresh");
      \u0275\u0275elementEnd();
      \u0275\u0275text(16, " \u041E\u043D\u043E\u0432\u0438\u0442\u0438 ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "mat-button-toggle-group", 8);
      \u0275\u0275listener("change", function DictCityCodeDialogComponent_Template_mat_button_toggle_group_change_17_listener($event) {
        return ctx.onViewModeChange($event.value);
      });
      \u0275\u0275elementStart(18, "mat-button-toggle", 9)(19, "mat-icon");
      \u0275\u0275text(20, "view_list");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(21, "mat-button-toggle", 10)(22, "mat-icon");
      \u0275\u0275text(23, "account_tree");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(24, "div", 11);
      \u0275\u0275conditionalCreate(25, DictCityCodeDialogComponent_Conditional_25_Template, 1, 1, "dict-city-codes", 12)(26, DictCityCodeDialogComponent_Conditional_26_Template, 1, 0, "dict-city-code-tree");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(27, "mat-dialog-actions", 13)(28, "button", 14);
      \u0275\u0275listener("click", function DictCityCodeDialogComponent_Template_button_click_28_listener() {
        return ctx.onCancel();
      });
      \u0275\u0275text(29, "\u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438");
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(8);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchTerm);
      \u0275\u0275advance();
      \u0275\u0275attribute("aria-label", "\u041F\u043E\u0448\u0443\u043A");
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.searchTerm() ? 12 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275property("value", ctx.viewMode());
      \u0275\u0275advance(8);
      \u0275\u0275conditional(ctx.viewMode() === "table" ? 25 : 26);
    }
  }, dependencies: [
    CommonModule,
    MatDialogModule,
    MatDialogTitle,
    MatDialogActions,
    MatDialogContent,
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatIconModule,
    MatIcon,
    MatButtonToggleModule,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatSuffix,
    MatInputModule,
    MatInput,
    MatTooltipModule,
    MatTooltip,
    FormsModule,
    DefaultValueAccessor,
    NgControlStatus,
    NgModel,
    DictCityCodeComponent,
    CityCodeTreeComponent
  ], styles: ["\n\n.dialog-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  min-width: 800px;\n  max-width: 95vw;\n  height: 600px;\n  max-height: 80vh;\n}\n.action-panel[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n.search-field[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 250px;\n}\n.content-panel[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow: auto;\n  border: 1px solid #e0e0e0;\n  border-radius: 4px;\n}\nmat-dialog-content[_ngcontent-%COMP%] {\n  padding: 0 24px !important;\n  overflow: hidden !important;\n}"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DictCityCodeDialogComponent, [{
    type: Component,
    args: [{ selector: "dict-city-code-dialog", standalone: true, imports: [
      CommonModule,
      MatDialogModule,
      MatButtonModule,
      MatIconModule,
      MatButtonToggleModule,
      MatFormFieldModule,
      MatInputModule,
      MatTooltipModule,
      FormsModule,
      DictCityCodeComponent,
      CityCodeTreeComponent
    ], template: `
    <h2 mat-dialog-title>\u0412\u0438\u0431\u0456\u0440 \u0430\u0434\u043C\u0456\u043D\u0456\u0441\u0442\u0440\u0430\u0442\u0438\u0432\u043D\u043E-\u0442\u0435\u0440\u0438\u0442\u043E\u0440\u0456\u0430\u043B\u044C\u043D\u043E\u0457 \u043E\u0434\u0438\u043D\u0438\u0446\u0456</h2>
    <mat-dialog-content>
      <div class="dialog-content">
        <!-- \u041F\u0430\u043D\u0435\u043B\u044C \u0443\u043F\u0440\u0430\u0432\u043B\u0456\u043D\u043D\u044F -->
        <div class="action-panel">
          <mat-form-field appearance="outline" class="search-field">
            <mat-label>\u041F\u043E\u0448\u0443\u043A</mat-label>
            <input
              matInput
              [(ngModel)]="searchTerm"
              (keyup.enter)="onSearch()"
              placeholder="\u0412\u0432\u0435\u0434\u0456\u0442\u044C \u043D\u0430\u0437\u0432\u0443 \u0434\u043B\u044F \u043F\u043E\u0448\u0443\u043A\u0443"
            />
            <button mat-icon-button matSuffix (click)="onSearch()" [attr.aria-label]="'\u041F\u043E\u0448\u0443\u043A'">
              <mat-icon>search</mat-icon>
            </button>
            @if (searchTerm()) {
              <button
                mat-icon-button
                matSuffix
                (click)="clearSearch()"
                [attr.aria-label]="'\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u0438 \u043F\u043E\u0448\u0443\u043A'"
              >
                <mat-icon>close</mat-icon>
              </button>
            }
          </mat-form-field>

          <button mat-raised-button color="primary" (click)="onRefresh()">
            <mat-icon>refresh</mat-icon>
            \u041E\u043D\u043E\u0432\u0438\u0442\u0438
          </button>

          <mat-button-toggle-group
            [value]="viewMode()"
            (change)="onViewModeChange($event.value)"
            class="view-toggle"
          >
            <mat-button-toggle value="table" matTooltip="\u0422\u0430\u0431\u043B\u0438\u0447\u043D\u0435 \u043F\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u043D\u044F">
              <mat-icon>view_list</mat-icon>
            </mat-button-toggle>
            <mat-button-toggle value="tree" matTooltip="\u0414\u0435\u0440\u0435\u0432\u043E\u043F\u043E\u0434\u0456\u0431\u043D\u0435 \u043F\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u043D\u044F">
              <mat-icon>account_tree</mat-icon>
            </mat-button-toggle>
          </mat-button-toggle-group>
        </div>

        <!-- \u041A\u043E\u043D\u0442\u0435\u043D\u0442 -->
        <div class="content-panel">
          @if (viewMode() === 'table') {
            <dict-city-codes
              [selectionMode]="true"
              (itemSelected)="onItemSelected($event)"
            ></dict-city-codes>
          } @else {
            <dict-city-code-tree (nodeSelected)="onNodeSelected($event)"></dict-city-code-tree>
          }
        </div>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">\u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438</button>
    </mat-dialog-actions>
  `, styles: ["/* angular:styles/component:css;68b94b95be9b301488d132c754ac46849f6fd8aba50565c70ca6fa71bc949c06;/home/havrok/projects/work/411/s5/s5app/Menu/S5Server/Front/src/app/dialogs/DictCityCode-dialog.component.ts */\n.dialog-content {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  min-width: 800px;\n  max-width: 95vw;\n  height: 600px;\n  max-height: 80vh;\n}\n.action-panel {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n.search-field {\n  flex: 1;\n  min-width: 250px;\n}\n.content-panel {\n  flex: 1;\n  overflow: auto;\n  border: 1px solid #e0e0e0;\n  border-radius: 4px;\n}\nmat-dialog-content {\n  padding: 0 24px !important;\n  overflow: hidden !important;\n}\n"] }]
  }], null, { tableComponent: [{
    type: ViewChild,
    args: [DictCityCodeComponent]
  }], treeComponent: [{
    type: ViewChild,
    args: [CityCodeTreeComponent]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DictCityCodeDialogComponent, { className: "DictCityCodeDialogComponent", filePath: "app/dialogs/DictCityCode-dialog.component.ts", lineNumber: 138 });
})();

// src/app/dialogs/DictArea-dialog.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function DictAreaDialogComponent_For_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 5);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const areaType_r1 = ctx.$implicit;
    \u0275\u0275property("value", areaType_r1.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", areaType_r1.value, " (", areaType_r1.shortValue, ") ");
  }
}
function DictAreaDialogComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 7);
    \u0275\u0275listener("click", function DictAreaDialogComponent_Conditional_20_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.clearCityCode());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "close");
    \u0275\u0275elementEnd()();
  }
}
var DictAreaDialogComponent = class _DictAreaDialogComponent {
  constructor(dialogRef, data) {
    this.dialogRef = dialogRef;
    this.data = data;
    this.loadAreaTypes();
    if (this.data.cityCodeInfo?.cityCode) {
      this.cityCodeValue.set(this.dictAreasService.buildCityCodeDisplayValue(this.data.cityCodeInfo));
    }
  }
  snackBar = inject(MatSnackBar);
  dictCityCodeService = inject(DictCityCodeService);
  dictAreaTypeService = inject(DictAreaTypeService);
  dictAreasService = inject(DictAreasService);
  dialog = inject(MatDialog);
  areaTypes = signal([], ...ngDevMode ? [{ debugName: "areaTypes" }] : []);
  cityCodeValue = signal("", ...ngDevMode ? [{ debugName: "cityCodeValue" }] : []);
  loadAreaTypes() {
    this.dictAreaTypeService.getAll().subscribe({
      next: (types) => this.areaTypes.set(types),
      error: (error) => {
        console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u0442\u0438\u043F\u0456\u0432 \u0420\u0412\u0417:", error);
        this.snackBar.open("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u0442\u0438\u043F\u0456\u0432 \u0420\u0412\u0417", "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
      }
    });
  }
  openCityCodeDialog() {
    const dialogRef = this.dialog.open(DictCityCodeDialogComponent, {
      width: "900px",
      maxWidth: "95vw",
      maxHeight: "90vh"
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dictCityCodeService.getCityCodeInfo(result.id).subscribe({
          next: (item) => {
            if (item) {
              this.data.cityCodeInfo = item;
              this.cityCodeValue.set(this.dictAreasService.buildCityCodeDisplayValue(this.data.cityCodeInfo));
            }
          },
          error: (error) => {
            console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u043A\u043E\u0434\u0438\u0444\u0456\u043A\u0430\u0442\u043E\u0440\u0430:", error);
            const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u043A\u043E\u0434\u0438\u0444\u0456\u043A\u0430\u0442\u043E\u0440\u0430");
            this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
          }
        });
      }
    });
  }
  clearCityCode() {
    this.data.cityCodeInfo = void 0;
    this.cityCodeValue.set("");
  }
  isValid() {
    return !!(this.data.value?.trim() && this.data.areaTypeId?.trim());
  }
  onCancel() {
    this.dialogRef.close();
  }
  onSave() {
    if (!this.isValid()) {
      return;
    }
    this.dialogRef.close(this.data);
  }
  static \u0275fac = function DictAreaDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DictAreaDialogComponent)(\u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DictAreaDialogComponent, selectors: [["app-dict-area-dialog"]], decls: 34, vars: 8, consts: [["mat-dialog-title", ""], [1, "content"], ["appearance", "outline", 1, "full-width"], ["matInput", "", "required", "", 3, "ngModelChange", "ngModel"], ["required", "", 3, "ngModelChange", "ngModel"], [3, "value"], ["matInput", "", "readonly", "", "placeholder", "\u041D\u0430\u0442\u0438\u0441\u043D\u0456\u0442\u044C \u043A\u043D\u043E\u043F\u043A\u0443 \u0434\u043B\u044F \u0432\u0438\u0431\u043E\u0440\u0443...", 3, "value"], ["mat-icon-button", "", "matSuffix", "", "type", "button", 3, "click"], ["mat-icon-button", "", "matSuffix", "", "type", "button"], ["matInput", "", "rows", "3", 3, "ngModelChange", "ngModel"], ["matInput", "", "rows", "2", 3, "ngModelChange", "ngModel"], ["align", "end", 1, "actions"], ["mat-button", "", 3, "click"], ["mat-raised-button", "", "color", "primary", 3, "click", "disabled"]], template: function DictAreaDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "h2", 0);
      \u0275\u0275text(1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(2, "mat-dialog-content", 1)(3, "mat-form-field", 2)(4, "mat-label");
      \u0275\u0275text(5, "\u041D\u0430\u0437\u0432\u0430");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "input", 3);
      \u0275\u0275twoWayListener("ngModelChange", function DictAreaDialogComponent_Template_input_ngModelChange_6_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.data.value, $event) || (ctx.data.value = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "mat-form-field", 2)(8, "mat-label");
      \u0275\u0275text(9, "\u0422\u0438\u043F \u0420\u0412\u0417");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "mat-select", 4);
      \u0275\u0275twoWayListener("ngModelChange", function DictAreaDialogComponent_Template_mat_select_ngModelChange_10_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.data.areaTypeId, $event) || (ctx.data.areaTypeId = $event);
        return $event;
      });
      \u0275\u0275repeaterCreate(11, DictAreaDialogComponent_For_12_Template, 2, 3, "mat-option", 5, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(13, "mat-form-field", 2)(14, "mat-label");
      \u0275\u0275text(15, "\u041A\u043E\u0434\u0438\u0444\u0456\u043A\u0430\u0442\u043E\u0440 \u0430\u0434\u043C\u0456\u043D-\u0442\u0435\u0440\u0438\u0442\u043E\u0440\u0456\u0430\u043B\u044C\u043D\u0438\u0445 \u043E\u0434\u0438\u043D\u0438\u0446\u044C");
      \u0275\u0275elementEnd();
      \u0275\u0275element(16, "input", 6);
      \u0275\u0275elementStart(17, "button", 7);
      \u0275\u0275listener("click", function DictAreaDialogComponent_Template_button_click_17_listener() {
        return ctx.openCityCodeDialog();
      });
      \u0275\u0275elementStart(18, "mat-icon");
      \u0275\u0275text(19, "search");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(20, DictAreaDialogComponent_Conditional_20_Template, 3, 0, "button", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "mat-form-field", 2)(22, "mat-label");
      \u0275\u0275text(23, "\u041A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442\u0438 \u0420\u0412\u0417");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "textarea", 9);
      \u0275\u0275twoWayListener("ngModelChange", function DictAreaDialogComponent_Template_textarea_ngModelChange_24_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.data.coords, $event) || (ctx.data.coords = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(25, "mat-form-field", 2)(26, "mat-label");
      \u0275\u0275text(27, "\u041A\u043E\u043C\u0435\u043D\u0442\u0430\u0440");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "textarea", 10);
      \u0275\u0275twoWayListener("ngModelChange", function DictAreaDialogComponent_Template_textarea_ngModelChange_28_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.data.comment, $event) || (ctx.data.comment = $event);
        return $event;
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(29, "mat-dialog-actions", 11)(30, "button", 12);
      \u0275\u0275listener("click", function DictAreaDialogComponent_Template_button_click_30_listener() {
        return ctx.onCancel();
      });
      \u0275\u0275text(31, "\u0421\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "button", 13);
      \u0275\u0275listener("click", function DictAreaDialogComponent_Template_button_click_32_listener() {
        return ctx.onSave();
      });
      \u0275\u0275text(33, " \u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438 ");
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275textInterpolate(ctx.data.id ? "\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u043D\u043D\u044F \u0420\u0412\u0417" : "\u0421\u0442\u0432\u043E\u0440\u0435\u043D\u043D\u044F \u0420\u0412\u0417");
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.data.value);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.data.areaTypeId);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.areaTypes());
      \u0275\u0275advance(5);
      \u0275\u0275property("value", ctx.cityCodeValue());
      \u0275\u0275advance(4);
      \u0275\u0275conditional((ctx.data.cityCodeInfo == null ? null : ctx.data.cityCodeInfo.cityCodeId) ? 20 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.data.coords);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.data.comment);
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", !ctx.isValid());
    }
  }, dependencies: [
    CommonModule,
    FormsModule,
    DefaultValueAccessor,
    NgControlStatus,
    RequiredValidator,
    NgModel,
    MatDialogModule,
    MatDialogTitle,
    MatDialogActions,
    MatDialogContent,
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatSuffix,
    MatInputModule,
    MatInput,
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatSelectModule,
    MatSelect,
    MatOption,
    MatIconModule,
    MatIcon
  ], styles: ["\n\n.title[_ngcontent-%COMP%] {\n  text-align: center;\n  margin: 0;\n}\n.content[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 12px;\n  min-width: 280px;\n  max-width: 520px;\n  padding-top: 10px !important;\n}\n  .content .mat-mdc-form-field {\n  width: 100%;\n}\n.actions[_ngcontent-%COMP%] {\n  gap: 8px;\n}"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DictAreaDialogComponent, [{
    type: Component,
    args: [{ selector: "app-dict-area-dialog", standalone: true, imports: [
      CommonModule,
      FormsModule,
      MatDialogModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatSelectModule,
      MatIconModule
    ], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <h2 mat-dialog-title>{{ data.id ? '\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u043D\u043D\u044F \u0420\u0412\u0417' : '\u0421\u0442\u0432\u043E\u0440\u0435\u043D\u043D\u044F \u0420\u0412\u0417' }}</h2>
    <mat-dialog-content class="content">
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>\u041D\u0430\u0437\u0432\u0430</mat-label>
        <input matInput [(ngModel)]="data.value" required />
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>\u0422\u0438\u043F \u0420\u0412\u0417</mat-label>
        <mat-select [(ngModel)]="data.areaTypeId" required>
          @for (areaType of areaTypes(); track areaType.id) {
            <mat-option [value]="areaType.id">
              {{ areaType.value }} ({{ areaType.shortValue }})
            </mat-option>
          }
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>\u041A\u043E\u0434\u0438\u0444\u0456\u043A\u0430\u0442\u043E\u0440 \u0430\u0434\u043C\u0456\u043D-\u0442\u0435\u0440\u0438\u0442\u043E\u0440\u0456\u0430\u043B\u044C\u043D\u0438\u0445 \u043E\u0434\u0438\u043D\u0438\u0446\u044C</mat-label>
        <input
          matInput
          [value]="cityCodeValue()"
          readonly
          placeholder="\u041D\u0430\u0442\u0438\u0441\u043D\u0456\u0442\u044C \u043A\u043D\u043E\u043F\u043A\u0443 \u0434\u043B\u044F \u0432\u0438\u0431\u043E\u0440\u0443..."
        />
        <button mat-icon-button matSuffix (click)="openCityCodeDialog()" type="button">
          <mat-icon>search</mat-icon>
        </button>
        @if (data.cityCodeInfo?.cityCodeId) {
          <button mat-icon-button matSuffix (click)="clearCityCode()" type="button">
            <mat-icon>close</mat-icon>
          </button>
        }
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>\u041A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442\u0438 \u0420\u0412\u0417</mat-label>
        <textarea matInput [(ngModel)]="data.coords" rows="3"></textarea>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>\u041A\u043E\u043C\u0435\u043D\u0442\u0430\u0440</mat-label>
        <textarea matInput [(ngModel)]="data.comment" rows="2"></textarea>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end" class="actions">
      <button mat-button (click)="onCancel()">\u0421\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438</button>
      <button mat-raised-button color="primary" (click)="onSave()" [disabled]="!isValid()">
        \u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438
      </button>
    </mat-dialog-actions>
  `, styles: ["/* src/app/dialogs/DialogShared.scss */\n.title {\n  text-align: center;\n  margin: 0;\n}\n.content {\n  display: grid;\n  gap: 12px;\n  min-width: 280px;\n  max-width: 520px;\n  padding-top: 10px !important;\n}\n::ng-deep .content .mat-mdc-form-field {\n  width: 100%;\n}\n.actions {\n  gap: 8px;\n}\n"] }]
  }], () => [{ type: MatDialogRef }, { type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DictAreaDialogComponent, { className: "DictAreaDialogComponent", filePath: "app/dialogs/DictArea-dialog.component.ts", lineNumber: 92 });
})();

// src/dictionaries/dictAreaPage.component.ts
function DictAreaPage_th_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 17);
    \u0275\u0275text(1, "\u041D\u0430\u0437\u0432\u0430");
    \u0275\u0275elementEnd();
  }
}
function DictAreaPage_td_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r1.value);
  }
}
function DictAreaPage_th_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 17);
    \u0275\u0275text(1, "\u0422\u0438\u043F \u0420\u0412\u0417");
    \u0275\u0275elementEnd();
  }
}
function DictAreaPage_td_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r2.areaType);
  }
}
function DictAreaPage_th_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 17);
    \u0275\u0275text(1, "\u041A\u043E\u0434\u0438\u0444\u0456\u043A\u0430\u0442\u043E\u0440");
    \u0275\u0275elementEnd();
  }
}
function DictAreaPage_td_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r3.getCityCodeDisplay(item_r3.cityCodeInfo));
  }
}
function DictAreaPage_th_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 17);
    \u0275\u0275text(1, "\u041A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442\u0438");
    \u0275\u0275elementEnd();
  }
}
function DictAreaPage_td_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 19);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r5.coords);
  }
}
function DictAreaPage_th_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 17);
    \u0275\u0275text(1, "\u041A\u043E\u043C\u0435\u043D\u0442\u0430\u0440");
    \u0275\u0275elementEnd();
  }
}
function DictAreaPage_td_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r6.comment);
  }
}
function DictAreaPage_th_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 20);
    \u0275\u0275text(1, "\u0414\u0456\u0457");
    \u0275\u0275elementEnd();
  }
}
function DictAreaPage_td_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 18)(1, "button", 21);
    \u0275\u0275listener("click", function DictAreaPage_td_32_Template_button_click_1_listener() {
      const item_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.edit(item_r8));
    });
    \u0275\u0275elementStart(2, "mat-icon");
    \u0275\u0275text(3, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "button", 22);
    \u0275\u0275listener("click", function DictAreaPage_td_32_Template_button_click_4_listener() {
      const item_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.delete(item_r8));
    });
    \u0275\u0275elementStart(5, "mat-icon");
    \u0275\u0275text(6, "delete");
    \u0275\u0275elementEnd()()();
  }
}
function DictAreaPage_tr_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 23);
  }
}
function DictAreaPage_tr_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 24);
  }
}
var DictAreaPage = class _DictAreaPage {
  dictAreasService = inject(DictAreasService);
  items = this.dictAreasService.createItemsSignal();
  dataSource = new MatTableDataSource([]);
  displayedColumns = ["value", "areaType", "cityCode", "coords", "comment", "actions"];
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
    this.dictAreasService.getAll().subscribe({
      next: (items) => this.items.set(items),
      error: (error) => {
        console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u0440\u0430\u0439\u043E\u043D\u0456\u0432 \u0432\u0438\u043A\u043E\u043D\u0430\u043D\u043D\u044F \u0437\u0430\u0432\u0434\u0430\u043D\u044C:", error);
        const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u0440\u0430\u0439\u043E\u043D\u0456\u0432 \u0432\u0438\u043A\u043E\u043D\u0430\u043D\u043D\u044F \u0437\u0430\u0432\u0434\u0430\u043D\u044C");
        this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
      }
    });
  }
  getCityCodeDisplay(cityCodeInfo) {
    return this.dictAreasService.buildCityCodeDisplayValue(cityCodeInfo);
  }
  add() {
    const dialogRef = this.dialog.open(DictAreaDialogComponent, {
      width: "600px",
      data: {
        value: "",
        comment: "",
        areaTypeId: "",
        cityCodeId: "",
        coords: ""
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dictAreasService.create(result).subscribe({
          next: () => {
            this.reload();
            this.snackBar.open("\u0420\u0412\u0417 \u0443\u0441\u043F\u0456\u0448\u043D\u043E \u0441\u0442\u0432\u043E\u0440\u0435\u043D\u043E", "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 3e3 });
          },
          error: (error) => {
            console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0441\u0442\u0432\u043E\u0440\u0435\u043D\u043D\u044F \u0420\u0412\u0417:", error);
            const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0441\u0442\u0432\u043E\u0440\u0435\u043D\u043D\u044F \u0420\u0412\u0417");
            this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
          }
        });
      }
    });
  }
  edit(area) {
    const dialogRef = this.dialog.open(DictAreaDialogComponent, {
      width: "600px",
      data: __spreadValues({}, area)
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dictAreasService.update(result.id, result).subscribe({
          next: () => {
            this.reload();
            this.snackBar.open("\u0420\u0412\u0417 \u0443\u0441\u043F\u0456\u0448\u043D\u043E \u043E\u043D\u043E\u0432\u043B\u0435\u043D\u043E", "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 3e3 });
          },
          error: (error) => {
            console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043E\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u044F \u0420\u0412\u0417:", error);
            const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043E\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u044F \u0420\u0412\u0417");
            this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
          }
        });
      }
    });
  }
  delete(area) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      width: "360px",
      maxWidth: "95vw",
      autoFocus: false,
      data: {
        title: "\u0412\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F \u0437\u0430\u043F\u0438\u0441\u0443",
        message: `\u0412\u0438 \u0432\u043F\u0435\u0432\u043D\u0435\u043D\u0456, \u0449\u043E \u0445\u043E\u0447\u0435\u0442\u0435 \u0432\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u0437\u0430\u043F\u0438\u0441 "${area.value}"?`,
        confirmText: "\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438",
        cancelText: "\u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438",
        color: "warn",
        icon: "warning"
      }
    });
    ref.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.dictAreasService.delete(area.id).subscribe({
          next: () => {
            this.reload();
            this.snackBar.open("\u0420\u0412\u0417 \u0443\u0441\u043F\u0456\u0448\u043D\u043E \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u043E", "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 3e3 });
          },
          error: (error) => {
            console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F \u0420\u0412\u0417:", error);
            const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F \u0420\u0412\u0417");
            this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
          }
        });
      }
    });
  }
  static \u0275fac = function DictAreaPage_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DictAreaPage)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DictAreaPage, selectors: [["dict-area"]], viewQuery: function DictAreaPage_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(MatSort, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.sort = _t.first);
    }
  }, decls: 35, vars: 4, consts: [["actionPanel", ""], [1, "action-buttons"], ["mat-raised-button", "", "color", "primary", 3, "click"], ["contentPanel", ""], ["mat-table", "", "matSort", "", 1, "mat-elevation-z8", 3, "dataSource"], ["matColumnDef", "value"], ["mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "areaType"], ["matColumnDef", "cityCode"], ["matColumnDef", "coords"], ["mat-cell", "", "class", "coords-column", 4, "matCellDef"], ["matColumnDef", "comment"], ["matColumnDef", "actions"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-header-row", "", 4, "matHeaderRowDef", "matHeaderRowDefSticky"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", "", "mat-sort-header", ""], ["mat-cell", ""], ["mat-cell", "", 1, "coords-column"], ["mat-header-cell", ""], ["mat-icon-button", "", "color", "accent", 3, "click"], ["mat-icon-button", "", "color", "warn", 3, "click"], ["mat-header-row", ""], ["mat-row", ""]], template: function DictAreaPage_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "app-vertical-layout")(1, "div", 0)(2, "h2");
      \u0275\u0275text(3, "\u0420\u0430\u0439\u043E\u043D\u0438 \u0432\u0438\u043A\u043E\u043D\u0430\u043D\u043D\u044F \u0437\u0430\u0432\u0434\u0430\u043D\u044C (\u0420\u0412\u0417)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 1)(5, "button", 2);
      \u0275\u0275listener("click", function DictAreaPage_Template_button_click_5_listener() {
        return ctx.reload();
      });
      \u0275\u0275elementStart(6, "mat-icon");
      \u0275\u0275text(7, "refresh");
      \u0275\u0275elementEnd();
      \u0275\u0275text(8, " \u041E\u043D\u043E\u0432\u0438\u0442\u0438 ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "button", 2);
      \u0275\u0275listener("click", function DictAreaPage_Template_button_click_9_listener() {
        return ctx.add();
      });
      \u0275\u0275elementStart(10, "mat-icon");
      \u0275\u0275text(11, "add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(12, " \u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438 ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(13, "div", 3)(14, "table", 4);
      \u0275\u0275elementContainerStart(15, 5);
      \u0275\u0275template(16, DictAreaPage_th_16_Template, 2, 0, "th", 6)(17, DictAreaPage_td_17_Template, 2, 1, "td", 7);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(18, 8);
      \u0275\u0275template(19, DictAreaPage_th_19_Template, 2, 0, "th", 6)(20, DictAreaPage_td_20_Template, 2, 1, "td", 7);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(21, 9);
      \u0275\u0275template(22, DictAreaPage_th_22_Template, 2, 0, "th", 6)(23, DictAreaPage_td_23_Template, 2, 1, "td", 7);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(24, 10);
      \u0275\u0275template(25, DictAreaPage_th_25_Template, 2, 0, "th", 6)(26, DictAreaPage_td_26_Template, 2, 1, "td", 11);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(27, 12);
      \u0275\u0275template(28, DictAreaPage_th_28_Template, 2, 0, "th", 6)(29, DictAreaPage_td_29_Template, 2, 1, "td", 7);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(30, 13);
      \u0275\u0275template(31, DictAreaPage_th_31_Template, 2, 0, "th", 14)(32, DictAreaPage_td_32_Template, 7, 0, "td", 7);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275template(33, DictAreaPage_tr_33_Template, 1, 0, "tr", 15)(34, DictAreaPage_tr_34_Template, 1, 0, "tr", 16);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(14);
      \u0275\u0275property("dataSource", ctx.dataSource);
      \u0275\u0275advance(19);
      \u0275\u0275property("matHeaderRowDef", ctx.displayedColumns)("matHeaderRowDefSticky", true);
      \u0275\u0275advance();
      \u0275\u0275property("matRowDefColumns", ctx.displayedColumns);
    }
  }, dependencies: [MatTableModule, MatTable, MatHeaderCellDef, MatHeaderRowDef, MatColumnDef, MatCellDef, MatRowDef, MatHeaderCell, MatCell, MatHeaderRow, MatRow, MatButtonModule, MatButton, MatIconButton, MatSortModule, MatSort, MatSortHeader, MatIconModule, MatIcon, VerticalLayoutComponent], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  height: 100%;\n}\ntable[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.mat-mdc-row[_ngcontent-%COMP%] {\n  cursor: pointer;\n  transition: background-color 0.2s;\n}\n.mat-mdc-row[_ngcontent-%COMP%]:hover {\n  background-color: #f5f5f5;\n}\n.mat-mdc-row.selected[_ngcontent-%COMP%] {\n  background-color: #e3f2fd !important;\n}\n.mat-mdc-row.selected[_ngcontent-%COMP%]:hover {\n  background-color: #bbdefb !important;\n}\n.dict-page-container[_ngcontent-%COMP%] {\n  height: calc(100vh - 64px);\n  overflow-y: auto;\n  padding: 16px;\n  padding-bottom: 32px;\n}\n.dict-page-container[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.dict-page-container[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.dict-page-container[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]    + button[_ngcontent-%COMP%] {\n  margin-left: 8px;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-top: 1em;\n  margin-bottom: 16px;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]   .value-text[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]   .edit-btn[_ngcontent-%COMP%] {\n  opacity: 0;\n  transition: opacity 0.2s;\n  width: 32px;\n  height: 32px;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]   .edit-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]:hover   .view-mode[_ngcontent-%COMP%]   .edit-btn[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .inline-input[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 4px 8px;\n  border: 1px solid #2196f3;\n  border-radius: 4px;\n  font-size: 14px;\n  background-color: #f5f5f5;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .inline-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #1976d2;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .save-btn[_ngcontent-%COMP%], \n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  flex-shrink: 0;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .save-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], \n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .save-btn[_ngcontent-%COMP%] {\n  color: #4caf50;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%] {\n  color: #f44336;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .clickable-row[_ngcontent-%COMP%] {\n  cursor: pointer;\n  transition: background-color 0.2s;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .clickable-row[_ngcontent-%COMP%]:hover {\n  background-color: #f5f5f5;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .clickable-row.selected[_ngcontent-%COMP%] {\n  background-color: #e3f2fd;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .clickable-row.selected[_ngcontent-%COMP%]:hover {\n  background-color: #bbdefb;\n}", "\n\n.coords-column[_ngcontent-%COMP%] {\n  max-width: 150px;\n  white-space: pre-wrap;\n  word-break: break-word;\n  line-height: 1.4;\n}"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DictAreaPage, [{
    type: Component,
    args: [{ selector: "dict-area", standalone: true, imports: [MatTableModule, MatButtonModule, MatSortModule, MatIconModule, VerticalLayoutComponent], template: `
    <app-vertical-layout>
      <!-- Action Panel (Top) -->
      <div actionPanel>
        <h2>\u0420\u0430\u0439\u043E\u043D\u0438 \u0432\u0438\u043A\u043E\u043D\u0430\u043D\u043D\u044F \u0437\u0430\u0432\u0434\u0430\u043D\u044C (\u0420\u0412\u0417)</h2>
        <div class="action-buttons">
          <button mat-raised-button color="primary" (click)="reload()">
            <mat-icon>refresh</mat-icon>
            \u041E\u043D\u043E\u0432\u0438\u0442\u0438
          </button>
          <button mat-raised-button color="primary" (click)="add()">
            <mat-icon>add</mat-icon>
            \u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438
          </button>
        </div>
      </div>

      <!-- Content Panel (Main) -->
      <div contentPanel>
        <table mat-table [dataSource]="dataSource" matSort class="mat-elevation-z8">
          <!-- Value Column -->
          <ng-container matColumnDef="value">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>\u041D\u0430\u0437\u0432\u0430</th>
            <td mat-cell *matCellDef="let item">{{ item.value }}</td>
          </ng-container>

          <!-- AreaType Column -->
          <ng-container matColumnDef="areaType">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>\u0422\u0438\u043F \u0420\u0412\u0417</th>
            <td mat-cell *matCellDef="let item">{{ item.areaType }}</td>
          </ng-container>

          <!-- CityCode Column -->
          <ng-container matColumnDef="cityCode">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>\u041A\u043E\u0434\u0438\u0444\u0456\u043A\u0430\u0442\u043E\u0440</th>
            <td mat-cell *matCellDef="let item">{{ getCityCodeDisplay(item.cityCodeInfo) }}</td>
          </ng-container>

          <ng-container matColumnDef="coords">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>\u041A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442\u0438</th>
            <td mat-cell *matCellDef="let item" class="coords-column">{{ item.coords }}</td>
          </ng-container>

          <!-- Comment Column -->
          <ng-container matColumnDef="comment">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>\u041A\u043E\u043C\u0435\u043D\u0442\u0430\u0440</th>
            <td mat-cell *matCellDef="let item">{{ item.comment }}</td>
          </ng-container>

          <!-- Actions Column -->
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

          <tr mat-header-row *matHeaderRowDef="displayedColumns; sticky: true"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table>
      </div>
    </app-vertical-layout>
  `, styles: ["/* src/dictionaries/dict-page.styles.scss */\n:host {\n  display: block;\n  height: 100%;\n}\ntable {\n  width: 100%;\n}\n.mat-mdc-row {\n  cursor: pointer;\n  transition: background-color 0.2s;\n}\n.mat-mdc-row:hover {\n  background-color: #f5f5f5;\n}\n.mat-mdc-row.selected {\n  background-color: #e3f2fd !important;\n}\n.mat-mdc-row.selected:hover {\n  background-color: #bbdefb !important;\n}\n.dict-page-container {\n  height: calc(100vh - 64px);\n  overflow-y: auto;\n  padding: 16px;\n  padding-bottom: 32px;\n}\n.dict-page-container h2 {\n  margin-bottom: 16px;\n}\n.dict-page-container .action-buttons {\n  margin-bottom: 16px;\n}\n.dict-page-container .action-buttons button + button {\n  margin-left: 8px;\n}\n.dict-page-container table {\n  width: 100%;\n  margin-top: 1em;\n  margin-bottom: 16px;\n}\n.dict-page-container table .editable-cell .view-mode {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.dict-page-container table .editable-cell .view-mode .value-text {\n  flex: 1;\n}\n.dict-page-container table .editable-cell .view-mode .edit-btn {\n  opacity: 0;\n  transition: opacity 0.2s;\n  width: 32px;\n  height: 32px;\n}\n.dict-page-container table .editable-cell .view-mode .edit-btn mat-icon {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.dict-page-container table .editable-cell:hover .view-mode .edit-btn {\n  opacity: 1;\n}\n.dict-page-container table .editable-cell .edit-mode {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.dict-page-container table .editable-cell .edit-mode .inline-input {\n  flex: 1;\n  padding: 4px 8px;\n  border: 1px solid #2196f3;\n  border-radius: 4px;\n  font-size: 14px;\n  background-color: #f5f5f5;\n}\n.dict-page-container table .editable-cell .edit-mode .inline-input:focus {\n  outline: none;\n  border-color: #1976d2;\n}\n.dict-page-container table .editable-cell .edit-mode .save-btn,\n.dict-page-container table .editable-cell .edit-mode .cancel-btn {\n  width: 32px;\n  height: 32px;\n  flex-shrink: 0;\n}\n.dict-page-container table .editable-cell .edit-mode .save-btn mat-icon,\n.dict-page-container table .editable-cell .edit-mode .cancel-btn mat-icon {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.dict-page-container table .editable-cell .edit-mode .save-btn {\n  color: #4caf50;\n}\n.dict-page-container table .editable-cell .edit-mode .cancel-btn {\n  color: #f44336;\n}\n.dict-page-container table .clickable-row {\n  cursor: pointer;\n  transition: background-color 0.2s;\n}\n.dict-page-container table .clickable-row:hover {\n  background-color: #f5f5f5;\n}\n.dict-page-container table .clickable-row.selected {\n  background-color: #e3f2fd;\n}\n.dict-page-container table .clickable-row.selected:hover {\n  background-color: #bbdefb;\n}\n", "/* angular:styles/component:css;99d1b4e1fbf0edda2f0e937fe33e4b59473169a23bc0fc9692ef8f91c7e4de8c;/home/havrok/projects/work/411/s5/s5app/Menu/S5Server/Front/src/dictionaries/dictAreaPage.component.ts */\n.coords-column {\n  max-width: 150px;\n  white-space: pre-wrap;\n  word-break: break-word;\n  line-height: 1.4;\n}\n"] }]
  }], () => [], { sort: [{
    type: ViewChild,
    args: [MatSort]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DictAreaPage, { className: "DictAreaPage", filePath: "dictionaries/dictAreaPage.component.ts", lineNumber: 100 });
})();
export {
  DictAreaPage
};
