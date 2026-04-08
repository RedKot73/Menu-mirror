import {
  DocDataSetsTableComponent,
  DocTemplateUtils,
  DroneModelTaskService,
  MatTabsModule,
  SoldierTaskService,
  TemplateDataSetService,
  UnitTaskService,
  takeUntilDestroyed
} from "./chunk-XBKRSLH4.js";
import {
  DictUnitTasksService
} from "./chunk-IZYV5H2Z.js";
import {
  MasterDetailLayoutComponent
} from "./chunk-PYTIHWKN.js";
import {
  MatCheckbox,
  MatCheckboxModule
} from "./chunk-W4NOFEVX.js";
import {
  VerticalLayoutComponent
} from "./chunk-YKIDVNWZ.js";
import {
  DateMaskDirective,
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle,
  UnitSelectDialogComponent
} from "./chunk-HUN6VZ56.js";
import {
  PPD_AREA_TYPE_GUID
} from "./chunk-3ZAQBUCH.js";
import "./chunk-PT4WDAF6.js";
import {
  MatDividerModule
} from "./chunk-RWT4ZOKS.js";
import {
  DictAreasService
} from "./chunk-5BH2V5IP.js";
import {
  MatButtonToggle,
  MatButtonToggleGroup,
  MatButtonToggleModule
} from "./chunk-2JNHTRBG.js";
import "./chunk-TBM54MBO.js";
import "./chunk-ZWF6LIG2.js";
import {
  MatAccordion,
  MatExpansionModule,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "./chunk-2AF2PV5A.js";
import {
  MatAutocompleteModule
} from "./chunk-BCSMKRCP.js";
import {
  SoldierUtils,
  formatDate,
  parseDateString
} from "./chunk-WYAI2G6S.js";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardTitle
} from "./chunk-6E7OFEBJ.js";
import {
  MatTooltip,
  MatTooltipModule
} from "./chunk-5FRFCUEI.js";
import {
  MatMenuModule,
  provideNativeDateAdapter
} from "./chunk-OJBPKYH5.js";
import "./chunk-JGYX5BI4.js";
import {
  DictDroneModelService
} from "./chunk-GEBJNR4W.js";
import {
  MatSelect,
  MatSelectModule
} from "./chunk-ZMUYL3KJ.js";
import {
  MatOption
} from "./chunk-S3MSKHER.js";
import {
  S5App_ErrorHandler
} from "./chunk-OPSAHF56.js";
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBar,
  MatSnackBarModule,
  MatSnackBarRef
} from "./chunk-USFCJNJC.js";
import {
  ConfirmDialogComponent
} from "./chunk-6PNJ2KVB.js";
import {
  MatSort,
  MatSortHeader,
  MatSortModule
} from "./chunk-L4T3VSAU.js";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle
} from "./chunk-GK72CHMD.js";
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
} from "./chunk-LWBTTYJE.js";
import {
  DefaultValueAccessor,
  FormControl,
  FormControlDirective,
  FormsModule,
  MatFormField,
  MatFormFieldModule,
  MatIcon,
  MatIconModule,
  MatInput,
  MatInputModule,
  MatLabel,
  MatSuffix,
  MinValidator,
  NgControlStatus,
  NgModel,
  NumberValueAccessor,
  ReactiveFormsModule,
  RequiredValidator
} from "./chunk-GX6V5MPD.js";
import {
  CommonModule,
  Component,
  DatePipe,
  DestroyRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  MatButton,
  MatButtonModule,
  MatIconButton,
  Output,
  Subject,
  ViewChild,
  ViewChildren,
  __async,
  __spreadProps,
  __spreadValues,
  effect,
  finalize,
  firstValueFrom,
  inject,
  map,
  output,
  setClassMetadata,
  signal,
  switchMap,
  takeUntil,
  ɵsetClassDebugInfo,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdeclareLet,
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
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵreadContextLet,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵresolveWindow,
  ɵɵrestoreView,
  ɵɵstoreLet,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-6223PFVC.js";

// src/app/dialogs/ErrorListSnackbar.component.ts
function ErrorListSnackBarComponent_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const error_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(error_r1);
  }
}
function ErrorListSnackBarComponent_ForEmpty_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1, "\u041D\u0435\u0432\u0456\u0434\u043E\u043C\u0430 \u043F\u043E\u043C\u0438\u043B\u043A\u0430");
    \u0275\u0275elementEnd();
  }
}
var ErrorListSnackBarComponent = class _ErrorListSnackBarComponent {
  // Вместо конструктора
  snackBarRef = inject(MatSnackBarRef);
  data = inject(MAT_SNACK_BAR_DATA);
  static \u0275fac = function ErrorListSnackBarComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ErrorListSnackBarComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ErrorListSnackBarComponent, selectors: [["app-error-list-snackbar"]], decls: 13, vars: 1, consts: [[1, "error-snackbar-container"], [1, "error-header"], ["color", "warn"], [1, "error-title"], [1, "error-list"], [1, "error-actions"], ["mat-button", "", 3, "click"]], template: function ErrorListSnackBarComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "mat-icon", 2);
      \u0275\u0275text(3, "error_outline");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "span", 3);
      \u0275\u0275text(5, "\u041F\u043E\u043C\u0438\u043B\u043A\u0438 \u0437\u0431\u0435\u0440\u0435\u0436\u0435\u043D\u043D\u044F:");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "ul", 4);
      \u0275\u0275repeaterCreate(7, ErrorListSnackBarComponent_For_8_Template, 2, 1, "li", null, \u0275\u0275repeaterTrackByIndex, false, ErrorListSnackBarComponent_ForEmpty_9_Template, 2, 0, "li");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "div", 5)(11, "button", 6);
      \u0275\u0275listener("click", function ErrorListSnackBarComponent_Template_button_click_11_listener() {
        return ctx.snackBarRef.dismissWithAction();
      });
      \u0275\u0275text(12, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275repeater(ctx.data);
    }
  }, dependencies: [CommonModule, MatButtonModule, MatButton, MatSnackBarModule, MatIconModule, MatIcon], styles: ["\n\n.error-snackbar-container[_ngcontent-%COMP%] {\n  color: white;\n}\n.error-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-bottom: 8px;\n  font-weight: bold;\n}\n.error-list[_ngcontent-%COMP%] {\n  margin: 0;\n  padding-left: 24px;\n  max-height: 200px;\n  overflow-y: auto;\n  font-size: 13px;\n}\n.error-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  margin-bottom: 4px;\n}\n.error-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  margin-top: 8px;\n}\n.error-title[_ngcontent-%COMP%] {\n  color: #ffab40;\n}\n/*# sourceMappingURL=ErrorListSnackbar.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ErrorListSnackBarComponent, [{
    type: Component,
    args: [{ selector: "app-error-list-snackbar", standalone: true, imports: [CommonModule, MatButtonModule, MatSnackBarModule, MatIconModule], template: `
    <div class="error-snackbar-container">
      <div class="error-header">
        <mat-icon color="warn">error_outline</mat-icon>
        <span class="error-title">\u041F\u043E\u043C\u0438\u043B\u043A\u0438 \u0437\u0431\u0435\u0440\u0435\u0436\u0435\u043D\u043D\u044F:</span>
      </div>

      <ul class="error-list">
        @for (error of data; track $index) {
          <li>{{ error }}</li>
        } @empty {
          <li>\u041D\u0435\u0432\u0456\u0434\u043E\u043C\u0430 \u043F\u043E\u043C\u0438\u043B\u043A\u0430</li>
        }
      </ul>

      <div class="error-actions">
        <button mat-button (click)="snackBarRef.dismissWithAction()">\u0417\u0430\u043A\u0440\u0438\u0442\u0438</button>
      </div>
    </div>
  `, styles: ["/* angular:styles/component:css;003ee1e8cbc8f457ab7d1545f7316e4f7e51d9f5e71f6fa24b804b5fc03270d8;/home/havrok/projects/work/411/s5/s5app/Menu/S5Server/Front/src/app/dialogs/ErrorListSnackbar.component.ts */\n.error-snackbar-container {\n  color: white;\n}\n.error-header {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-bottom: 8px;\n  font-weight: bold;\n}\n.error-list {\n  margin: 0;\n  padding-left: 24px;\n  max-height: 200px;\n  overflow-y: auto;\n  font-size: 13px;\n}\n.error-list li {\n  margin-bottom: 4px;\n}\n.error-actions {\n  display: flex;\n  justify-content: flex-end;\n  margin-top: 8px;\n}\n.error-title {\n  color: #ffab40;\n}\n/*# sourceMappingURL=ErrorListSnackbar.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ErrorListSnackBarComponent, { className: "ErrorListSnackBarComponent", filePath: "app/dialogs/ErrorListSnackbar.component.ts", lineNumber: 64 });
})();

// src/app/dialogs/DictDroneModelSelect-dialog.component.ts
function DictDroneModelSelectDialogComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 22);
    \u0275\u0275listener("click", function DictDroneModelSelectDialogComponent_Conditional_12_Template_button_click_0_listener() {
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
function DictDroneModelSelectDialogComponent_th_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 23);
    \u0275\u0275text(1, "\u041D\u0430\u0437\u0432\u0430 \u043C\u043E\u0434\u0435\u043B\u0456 \u0411\u041F\u041B\u0410");
    \u0275\u0275elementEnd();
  }
}
function DictDroneModelSelectDialogComponent_td_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r3.value);
  }
}
function DictDroneModelSelectDialogComponent_th_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 23);
    \u0275\u0275text(1, "\u0422\u0438\u043F \u0434\u0440\u043E\u043D\u0430");
    \u0275\u0275elementEnd();
  }
}
function DictDroneModelSelectDialogComponent_td_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r4.droneTypeName || "-");
  }
}
function DictDroneModelSelectDialogComponent_th_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 25);
    \u0275\u0275text(1, "\u041A\u0456\u043B\u044C\u043A\u0456\u0441\u0442\u044C");
    \u0275\u0275elementEnd();
  }
}
function DictDroneModelSelectDialogComponent_td_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 24)(1, "mat-form-field", 26)(2, "input", 27);
    \u0275\u0275twoWayListener("ngModelChange", function DictDroneModelSelectDialogComponent_td_27_Template_input_ngModelChange_2_listener($event) {
      const item_r6 = \u0275\u0275restoreView(_r5).$implicit;
      \u0275\u0275twoWayBindingSet(item_r6.quantity, $event) || (item_r6.quantity = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("click", function DictDroneModelSelectDialogComponent_td_27_Template_input_click_2_listener($event) {
      \u0275\u0275restoreView(_r5);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r6 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", item_r6.quantity);
  }
}
function DictDroneModelSelectDialogComponent_th_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 28);
    \u0275\u0275text(1, "\u0414\u0456\u0457");
    \u0275\u0275elementEnd();
  }
}
function DictDroneModelSelectDialogComponent_td_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 24)(1, "button", 29);
    \u0275\u0275listener("click", function DictDroneModelSelectDialogComponent_td_30_Template_button_click_1_listener($event) {
      const item_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.selectDroneModel(item_r8);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275text(2, " \u0412\u0438\u0431\u0440\u0430\u0442\u0438 ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r8 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !item_r8.quantity || item_r8.quantity < 1);
  }
}
function DictDroneModelSelectDialogComponent_tr_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 30);
  }
}
function DictDroneModelSelectDialogComponent_tr_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 31);
  }
}
function DictDroneModelSelectDialogComponent_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19)(1, "mat-icon", 32);
    \u0275\u0275text(2, "refresh");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F...");
    \u0275\u0275elementEnd()();
  }
}
var DictDroneModelSelectDialogComponent = class _DictDroneModelSelectDialogComponent {
  dialogRef;
  data;
  dictDroneModelService = inject(DictDroneModelService);
  snackBar = inject(MatSnackBar);
  sort;
  items = signal([], ...ngDevMode ? [{ debugName: "items" }] : []);
  dataSource = new MatTableDataSource([]);
  displayedColumns = ["value", "droneTypeName", "quantity", "actions"];
  isLoading = signal(false, ...ngDevMode ? [{ debugName: "isLoading" }] : []);
  searchTerm = signal("", ...ngDevMode ? [{ debugName: "searchTerm" }] : []);
  dialogTitle = signal("\u0412\u0438\u0431\u0456\u0440 \u043C\u043E\u0434\u0435\u043B\u0456 \u0411\u041F\u041B\u0410", ...ngDevMode ? [{ debugName: "dialogTitle" }] : []);
  searchTimeout;
  constructor(dialogRef, data) {
    this.dialogRef = dialogRef;
    this.data = data;
    if (data?.title) {
      this.dialogTitle.set(data.title);
    }
    this.reload();
  }
  reload() {
    this.isLoading.set(true);
    this.dictDroneModelService.getAll().subscribe({
      next: (droneModels) => {
        const modelsWithQuantity = droneModels.map((model) => __spreadProps(__spreadValues({}, model), {
          quantity: 1
          // За замовчуванням 1
        }));
        const filtered = this.filterBySearchTerm(modelsWithQuantity);
        this.items.set(filtered);
        this.dataSource.data = filtered;
        this.dataSource.sort = this.sort;
        this.isLoading.set(false);
      },
      error: (error) => {
        this.handleError(error);
      }
    });
  }
  filterBySearchTerm(items) {
    const search = this.searchTerm().toLowerCase().trim();
    if (!search) {
      return items;
    }
    return items.filter((item) => item.value.toLowerCase().includes(search));
  }
  handleError(error) {
    console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u043C\u043E\u0434\u0435\u043B\u0435\u0439 \u0411\u041F\u041B\u0410:", error);
    const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u043C\u043E\u0434\u0435\u043B\u0435\u0439 \u0411\u041F\u041B\u0410");
    this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
    this.isLoading.set(false);
  }
  onSearchChange() {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    this.searchTimeout = window.setTimeout(() => {
      this.reload();
    }, 500);
  }
  clearSearch() {
    this.searchTerm.set("");
    this.reload();
  }
  selectDroneModel(droneModel) {
    if (!droneModel.quantity || droneModel.quantity < 1) {
      this.snackBar.open("\u0411\u0443\u0434\u044C \u043B\u0430\u0441\u043A\u0430, \u0432\u043A\u0430\u0436\u0456\u0442\u044C \u043A\u0456\u043B\u044C\u043A\u0456\u0441\u0442\u044C", "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 3e3 });
      return;
    }
    this.dialogRef.close(droneModel);
  }
  onCancel() {
    this.dialogRef.close();
  }
  static \u0275fac = function DictDroneModelSelectDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DictDroneModelSelectDialogComponent)(\u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DictDroneModelSelectDialogComponent, selectors: [["dict-drone-model-select-dialog"]], viewQuery: function DictDroneModelSelectDialogComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(MatSort, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.sort = _t.first);
    }
  }, decls: 37, vars: 10, consts: [["mat-dialog-title", ""], [1, "dialog-content"], [1, "action-panel"], ["appearance", "outline", 1, "search-field"], ["matInput", "", "placeholder", "\u0412\u0432\u0435\u0434\u0456\u0442\u044C \u043D\u0430\u0437\u0432\u0443 \u0434\u043B\u044F \u043F\u043E\u0448\u0443\u043A\u0443", 3, "ngModelChange", "ngModel"], ["mat-icon-button", "", "matSuffix", ""], ["mat-raised-button", "", "color", "primary", 3, "click"], [1, "table-container", 3, "hidden"], ["mat-table", "", "matSort", "", 1, "selection-table", 3, "dataSource"], ["matColumnDef", "value"], ["mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "droneTypeName"], ["matColumnDef", "quantity"], ["mat-header-cell", "", "style", "width: 120px", 4, "matHeaderCellDef"], ["matColumnDef", "actions"], ["mat-header-cell", "", "style", "width: 100px", 4, "matHeaderCellDef"], ["mat-header-row", "", 4, "matHeaderRowDef", "matHeaderRowDefSticky"], ["mat-row", "", "class", "selectable-row", 4, "matRowDef", "matRowDefColumns"], [1, "loading-container"], ["align", "end"], ["mat-button", "", 3, "click"], ["mat-icon-button", "", "matSuffix", "", 3, "click"], ["mat-header-cell", "", "mat-sort-header", ""], ["mat-cell", ""], ["mat-header-cell", "", 2, "width", "120px"], ["appearance", "outline", 1, "quantity-field"], ["matInput", "", "type", "number", "min", "1", "placeholder", "0", 3, "ngModelChange", "click", "ngModel"], ["mat-header-cell", "", 2, "width", "100px"], ["mat-raised-button", "", "color", "primary", 3, "click", "disabled"], ["mat-header-row", ""], ["mat-row", "", 1, "selectable-row"], [1, "loading-spinner"]], template: function DictDroneModelSelectDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "h2", 0);
      \u0275\u0275text(1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(2, "mat-dialog-content")(3, "div", 1)(4, "div", 2)(5, "mat-form-field", 3)(6, "mat-label");
      \u0275\u0275text(7, "\u041F\u043E\u0448\u0443\u043A");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "input", 4);
      \u0275\u0275twoWayListener("ngModelChange", function DictDroneModelSelectDialogComponent_Template_input_ngModelChange_8_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event);
        return $event;
      });
      \u0275\u0275listener("ngModelChange", function DictDroneModelSelectDialogComponent_Template_input_ngModelChange_8_listener() {
        return ctx.onSearchChange();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "button", 5)(10, "mat-icon");
      \u0275\u0275text(11, "search");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(12, DictDroneModelSelectDialogComponent_Conditional_12_Template, 3, 1, "button", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "button", 6);
      \u0275\u0275listener("click", function DictDroneModelSelectDialogComponent_Template_button_click_13_listener() {
        return ctx.reload();
      });
      \u0275\u0275elementStart(14, "mat-icon");
      \u0275\u0275text(15, "refresh");
      \u0275\u0275elementEnd();
      \u0275\u0275text(16, " \u041E\u043D\u043E\u0432\u0438\u0442\u0438 ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "div", 7)(18, "table", 8);
      \u0275\u0275elementContainerStart(19, 9);
      \u0275\u0275template(20, DictDroneModelSelectDialogComponent_th_20_Template, 2, 0, "th", 10)(21, DictDroneModelSelectDialogComponent_td_21_Template, 2, 1, "td", 11);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(22, 12);
      \u0275\u0275template(23, DictDroneModelSelectDialogComponent_th_23_Template, 2, 0, "th", 10)(24, DictDroneModelSelectDialogComponent_td_24_Template, 2, 1, "td", 11);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(25, 13);
      \u0275\u0275template(26, DictDroneModelSelectDialogComponent_th_26_Template, 2, 0, "th", 14)(27, DictDroneModelSelectDialogComponent_td_27_Template, 3, 1, "td", 11);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(28, 15);
      \u0275\u0275template(29, DictDroneModelSelectDialogComponent_th_29_Template, 2, 0, "th", 16)(30, DictDroneModelSelectDialogComponent_td_30_Template, 3, 1, "td", 11);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275template(31, DictDroneModelSelectDialogComponent_tr_31_Template, 1, 0, "tr", 17)(32, DictDroneModelSelectDialogComponent_tr_32_Template, 1, 0, "tr", 18);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(33, DictDroneModelSelectDialogComponent_Conditional_33_Template, 5, 0, "div", 19);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(34, "mat-dialog-actions", 20)(35, "button", 21);
      \u0275\u0275listener("click", function DictDroneModelSelectDialogComponent_Template_button_click_35_listener() {
        return ctx.onCancel();
      });
      \u0275\u0275text(36, "\u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438");
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275textInterpolate(ctx.dialogTitle());
      \u0275\u0275advance(7);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchTerm);
      \u0275\u0275advance();
      \u0275\u0275attribute("aria-label", "\u041F\u043E\u0448\u0443\u043A");
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.searchTerm() ? 12 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275property("hidden", ctx.isLoading());
      \u0275\u0275advance();
      \u0275\u0275property("dataSource", ctx.dataSource);
      \u0275\u0275advance(13);
      \u0275\u0275property("matHeaderRowDef", ctx.displayedColumns)("matHeaderRowDefSticky", true);
      \u0275\u0275advance();
      \u0275\u0275property("matRowDefColumns", ctx.displayedColumns);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isLoading() ? 33 : -1);
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
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatSuffix,
    MatInputModule,
    MatInput,
    MatTooltipModule,
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
    MatSortModule,
    MatSort,
    MatSortHeader,
    FormsModule,
    DefaultValueAccessor,
    NumberValueAccessor,
    NgControlStatus,
    MinValidator,
    NgModel
  ], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n.dialog-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 60vh;\n  max-height: 60vh;\n  min-height: 400px;\n}\n.action-panel[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n  margin-bottom: 16px;\n  padding: 8px;\n  background-color: #fafafa;\n  border-radius: 4px;\n}\n.search-field[_ngcontent-%COMP%] {\n  flex: 1;\n  max-width: 400px;\n}\n.table-container[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow: auto;\n  border: 1px solid #e0e0e0;\n  border-radius: 4px;\n}\n.selection-table[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.quantity-field[_ngcontent-%COMP%] {\n  width: 80px;\n  margin: 0;\n}\n.quantity-field[_ngcontent-%COMP%]     .mat-mdc-form-field-infix {\n  min-height: 40px;\n  padding: 4px 0;\n}\n.quantity-field[_ngcontent-%COMP%]     .mat-mdc-text-field-wrapper {\n  padding: 0;\n}\n.selectable-row[_ngcontent-%COMP%] {\n  cursor: default;\n}\n.loading-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 40px;\n  gap: 16px;\n}\n.loading-container[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%] {\n  font-size: 48px;\n  width: 48px;\n  height: 48px;\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n  color: #1976d2;\n}\n.loading-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #666;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n/*# sourceMappingURL=DictDroneModelSelect-dialog.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DictDroneModelSelectDialogComponent, [{
    type: Component,
    args: [{ selector: "dict-drone-model-select-dialog", standalone: true, imports: [
      CommonModule,
      MatDialogModule,
      MatButtonModule,
      MatIconModule,
      MatFormFieldModule,
      MatInputModule,
      MatTooltipModule,
      MatTableModule,
      MatSortModule,
      FormsModule
    ], template: `
    <h2 mat-dialog-title>{{ dialogTitle() }}</h2>
    <mat-dialog-content>
      <div class="dialog-content">
        <!-- \u041F\u0430\u043D\u0435\u043B\u044C \u043F\u043E\u0448\u0443\u043A\u0443 -->
        <div class="action-panel">
          <mat-form-field appearance="outline" class="search-field">
            <mat-label>\u041F\u043E\u0448\u0443\u043A</mat-label>
            <input
              matInput
              [(ngModel)]="searchTerm"
              (ngModelChange)="onSearchChange()"
              placeholder="\u0412\u0432\u0435\u0434\u0456\u0442\u044C \u043D\u0430\u0437\u0432\u0443 \u0434\u043B\u044F \u043F\u043E\u0448\u0443\u043A\u0443"
            />
            <button mat-icon-button matSuffix [attr.aria-label]="'\u041F\u043E\u0448\u0443\u043A'">
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

          <button mat-raised-button color="primary" (click)="reload()">
            <mat-icon>refresh</mat-icon>
            \u041E\u043D\u043E\u0432\u0438\u0442\u0438
          </button>
        </div>

        <!-- \u0422\u0430\u0431\u043B\u0438\u0446\u044F -->
        <div class="table-container" [hidden]="isLoading()">
          <table mat-table [dataSource]="dataSource" matSort class="selection-table">
            <!-- Value Column -->
            <ng-container matColumnDef="value">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>\u041D\u0430\u0437\u0432\u0430 \u043C\u043E\u0434\u0435\u043B\u0456 \u0411\u041F\u041B\u0410</th>
              <td mat-cell *matCellDef="let item">{{ item.value }}</td>
            </ng-container>

            <!-- Drone Type Column -->
            <ng-container matColumnDef="droneTypeName">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>\u0422\u0438\u043F \u0434\u0440\u043E\u043D\u0430</th>
              <td mat-cell *matCellDef="let item">{{ item.droneTypeName || '-' }}</td>
            </ng-container>

            <!-- Quantity Column -->
            <ng-container matColumnDef="quantity">
              <th mat-header-cell *matHeaderCellDef style="width: 120px">\u041A\u0456\u043B\u044C\u043A\u0456\u0441\u0442\u044C</th>
              <td mat-cell *matCellDef="let item">
                <mat-form-field appearance="outline" class="quantity-field">
                  <input
                    matInput
                    type="number"
                    [(ngModel)]="item.quantity"
                    min="1"
                    (click)="$event.stopPropagation()"
                    placeholder="0"
                  />
                </mat-form-field>
              </td>
            </ng-container>

            <!-- Actions Column -->
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef style="width: 100px">\u0414\u0456\u0457</th>
              <td mat-cell *matCellDef="let item">
                <button
                  mat-raised-button
                  color="primary"
                  (click)="selectDroneModel(item); $event.stopPropagation()"
                  [disabled]="!item.quantity || item.quantity < 1"
                >
                  \u0412\u0438\u0431\u0440\u0430\u0442\u0438
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns; sticky: true"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns" class="selectable-row"></tr>
          </table>
        </div>
        @if (this.isLoading()) {
          <div class="loading-container">
            <mat-icon class="loading-spinner">refresh</mat-icon>
            <p>\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F...</p>
          </div>
        }
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">\u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438</button>
    </mat-dialog-actions>
  `, styles: ["/* angular:styles/component:css;52cda80f9e470e01e44fa58bd9d3374ae75dc940cbabe52a1ffd1752ccef0b79;/home/havrok/projects/work/411/s5/s5app/Menu/S5Server/Front/src/app/dialogs/DictDroneModelSelect-dialog.component.ts */\n:host {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n.dialog-content {\n  display: flex;\n  flex-direction: column;\n  height: 60vh;\n  max-height: 60vh;\n  min-height: 400px;\n}\n.action-panel {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n  margin-bottom: 16px;\n  padding: 8px;\n  background-color: #fafafa;\n  border-radius: 4px;\n}\n.search-field {\n  flex: 1;\n  max-width: 400px;\n}\n.table-container {\n  flex: 1;\n  overflow: auto;\n  border: 1px solid #e0e0e0;\n  border-radius: 4px;\n}\n.selection-table {\n  width: 100%;\n}\n.quantity-field {\n  width: 80px;\n  margin: 0;\n}\n.quantity-field ::ng-deep .mat-mdc-form-field-infix {\n  min-height: 40px;\n  padding: 4px 0;\n}\n.quantity-field ::ng-deep .mat-mdc-text-field-wrapper {\n  padding: 0;\n}\n.selectable-row {\n  cursor: default;\n}\n.loading-container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 40px;\n  gap: 16px;\n}\n.loading-container .loading-spinner {\n  font-size: 48px;\n  width: 48px;\n  height: 48px;\n  animation: spin 1s linear infinite;\n  color: #1976d2;\n}\n.loading-container p {\n  color: #666;\n}\n@keyframes spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n/*# sourceMappingURL=DictDroneModelSelect-dialog.component.css.map */\n"] }]
  }], () => [{ type: MatDialogRef }, { type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }], { sort: [{
    type: ViewChild,
    args: [MatSort, { static: false }]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DictDroneModelSelectDialogComponent, { className: "DictDroneModelSelectDialogComponent", filePath: "app/dialogs/DictDroneModelSelect-dialog.component.ts", lineNumber: 234 });
})();

// src/app/DocumentDataSet/Components/OneUnitTaskEditor.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function OneUnitTaskEditor_Conditional_1_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "groups");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "\u0415\u043A\u0456\u043F\u0430\u0436/\u0413\u0440\u0443\u043F\u0430");
    \u0275\u0275elementEnd();
  }
}
function OneUnitTaskEditor_Conditional_1_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 16);
    \u0275\u0275text(1, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "\u041E\u043F\u0443\u0431\u043B\u0456\u043A\u043E\u0432\u0430\u043D\u043E");
    \u0275\u0275elementEnd();
  }
}
function OneUnitTaskEditor_Conditional_1_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 5);
    \u0275\u0275text(1, "edit");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "\u0427\u0435\u0440\u043D\u0435\u0442\u043A\u0430");
    \u0275\u0275elementEnd();
  }
}
function OneUnitTaskEditor_Conditional_1_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "strong");
    \u0275\u0275text(2, "\u0411\u0430\u0442\u044C\u043A\u0456\u0432\u0441\u044C\u043A\u0438\u0439:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const unit_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(unit_r3.parentShortName);
  }
}
function OneUnitTaskEditor_Conditional_1_Conditional_16_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "strong");
    \u0275\u0275text(2, "\u041F\u0440\u0438\u0434\u0430\u043D\u0438\u0439 \u0434\u043E:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const unit_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(unit_r3.assignedShortName);
  }
}
function OneUnitTaskEditor_Conditional_1_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, OneUnitTaskEditor_Conditional_1_Conditional_16_Conditional_0_Template, 5, 1, "div", 2);
  }
  if (rf & 2) {
    const unit_r3 = \u0275\u0275nextContext();
    \u0275\u0275conditional(unit_r3.assignedShortName ? 0 : -1);
  }
}
function OneUnitTaskEditor_Conditional_1_For_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const task_r4 = ctx.$implicit;
    \u0275\u0275property("value", task_r4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate3("", task_r4.value, " (", task_r4.areaType, " ", task_r4.withMeans ? "\u0417\u0430\u0441\u043E\u0431\u0438" : "", ")");
  }
}
function OneUnitTaskEditor_Conditional_1_For_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const area_r5 = ctx.$implicit;
    \u0275\u0275property("value", area_r5);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(area_r5.value);
  }
}
function OneUnitTaskEditor_Conditional_1_Conditional_38_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21)(1, "mat-icon");
    \u0275\u0275text(2, "hourglass_empty");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " \u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F... ");
    \u0275\u0275elementEnd();
  }
}
function OneUnitTaskEditor_Conditional_1_Conditional_38_Conditional_14_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22)(1, "mat-icon");
    \u0275\u0275text(2, "flight");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u0417\u0430\u0441\u043E\u0431\u0438 \u043D\u0435 \u0434\u043E\u0434\u0430\u043D\u043E");
    \u0275\u0275elementEnd()();
  }
}
function OneUnitTaskEditor_Conditional_1_Conditional_38_Conditional_14_Conditional_1_th_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 34);
    \u0275\u0275text(1, "\u0414\u0456\u0457");
    \u0275\u0275elementEnd();
  }
}
function OneUnitTaskEditor_Conditional_1_Conditional_38_Conditional_14_Conditional_1_td_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 35)(1, "button", 36);
    \u0275\u0275listener("click", function OneUnitTaskEditor_Conditional_1_Conditional_38_Conditional_14_Conditional_1_td_3_Template_button_click_1_listener() {
      const mean_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.deleteMean(mean_r8));
    });
    \u0275\u0275elementStart(2, "mat-icon");
    \u0275\u0275text(3, "delete");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    \u0275\u0275nextContext(4);
    const readOnly_r9 = \u0275\u0275readContextLet(0);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.isSavingMeans() || readOnly_r9);
  }
}
function OneUnitTaskEditor_Conditional_1_Conditional_38_Conditional_14_Conditional_1_th_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 37);
    \u0275\u0275text(1, "\u041C\u043E\u0434\u0435\u043B\u044C \u0411\u041F\u041B\u0410");
    \u0275\u0275elementEnd();
  }
}
function OneUnitTaskEditor_Conditional_1_Conditional_38_Conditional_14_Conditional_1_td_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 35);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const mean_r10 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(mean_r10.droneModelValue);
  }
}
function OneUnitTaskEditor_Conditional_1_Conditional_38_Conditional_14_Conditional_1_th_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 37);
    \u0275\u0275text(1, "\u0422\u0438\u043F");
    \u0275\u0275elementEnd();
  }
}
function OneUnitTaskEditor_Conditional_1_Conditional_38_Conditional_14_Conditional_1_td_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 35);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const mean_r11 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(mean_r11.droneTypeName);
  }
}
function OneUnitTaskEditor_Conditional_1_Conditional_38_Conditional_14_Conditional_1_th_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 37);
    \u0275\u0275text(1, "\u041A\u0456\u043B\u044C\u043A\u0456\u0441\u0442\u044C");
    \u0275\u0275elementEnd();
  }
}
function OneUnitTaskEditor_Conditional_1_Conditional_38_Conditional_14_Conditional_1_td_12_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 39)(1, "input", 41);
    \u0275\u0275twoWayListener("ngModelChange", function OneUnitTaskEditor_Conditional_1_Conditional_38_Conditional_14_Conditional_1_td_12_Conditional_1_Template_input_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext(6);
      \u0275\u0275twoWayBindingSet(ctx_r1.editingMeanValue, $event) || (ctx_r1.editingMeanValue = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function OneUnitTaskEditor_Conditional_1_Conditional_38_Conditional_14_Conditional_1_td_12_Conditional_1_Template_input_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext(6);
      return \u0275\u0275resetView(ctx_r1.updateEditingMeanValue($event));
    })("click", function OneUnitTaskEditor_Conditional_1_Conditional_38_Conditional_14_Conditional_1_td_12_Conditional_1_Template_input_click_1_listener($event) {
      \u0275\u0275restoreView(_r12);
      return \u0275\u0275resetView($event.stopPropagation());
    })("keydown.enter", function OneUnitTaskEditor_Conditional_1_Conditional_38_Conditional_14_Conditional_1_td_12_Conditional_1_Template_input_keydown_enter_1_listener($event) {
      \u0275\u0275restoreView(_r12);
      const mean_r13 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.saveMeanFieldChange(mean_r13, "quantity", $event));
    })("keydown.escape", function OneUnitTaskEditor_Conditional_1_Conditional_38_Conditional_14_Conditional_1_td_12_Conditional_1_Template_input_keydown_escape_1_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext(6);
      return \u0275\u0275resetView(ctx_r1.cancelEditingMean($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 42);
    \u0275\u0275listener("click", function OneUnitTaskEditor_Conditional_1_Conditional_38_Conditional_14_Conditional_1_td_12_Conditional_1_Template_button_click_2_listener($event) {
      \u0275\u0275restoreView(_r12);
      const mean_r13 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.saveMeanFieldChange(mean_r13, "quantity", $event));
    });
    \u0275\u0275elementStart(3, "mat-icon");
    \u0275\u0275text(4, "check");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "button", 43);
    \u0275\u0275listener("click", function OneUnitTaskEditor_Conditional_1_Conditional_38_Conditional_14_Conditional_1_td_12_Conditional_1_Template_button_click_5_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext(6);
      return \u0275\u0275resetView(ctx_r1.cancelEditingMean($event));
    });
    \u0275\u0275elementStart(6, "mat-icon");
    \u0275\u0275text(7, "close");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(6);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.editingMeanValue);
    \u0275\u0275property("disabled", ctx_r1.isSavingMeans());
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.isSavingMeans());
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r1.isSavingMeans());
  }
}
function OneUnitTaskEditor_Conditional_1_Conditional_38_Conditional_14_Conditional_1_td_12_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 40)(1, "span", 44);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 45);
    \u0275\u0275listener("click", function OneUnitTaskEditor_Conditional_1_Conditional_38_Conditional_14_Conditional_1_td_12_Conditional_2_Template_button_click_3_listener($event) {
      \u0275\u0275restoreView(_r14);
      const mean_r13 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.startEditingMean(mean_r13, "quantity", $event));
    });
    \u0275\u0275elementStart(4, "mat-icon");
    \u0275\u0275text(5, "edit");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const mean_r13 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275nextContext(4);
    const readOnly_r9 = \u0275\u0275readContextLet(0);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(mean_r13.quantity);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", readOnly_r9 || ctx_r1.isSavingMeans());
  }
}
function OneUnitTaskEditor_Conditional_1_Conditional_38_Conditional_14_Conditional_1_td_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 38);
    \u0275\u0275conditionalCreate(1, OneUnitTaskEditor_Conditional_1_Conditional_38_Conditional_14_Conditional_1_td_12_Conditional_1_Template, 8, 4, "div", 39)(2, OneUnitTaskEditor_Conditional_1_Conditional_38_Conditional_14_Conditional_1_td_12_Conditional_2_Template, 6, 2, "div", 40);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const mean_r13 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isEditingMean(mean_r13.id || mean_r13.droneModelId, "quantity") ? 1 : 2);
  }
}
function OneUnitTaskEditor_Conditional_1_Conditional_38_Conditional_14_Conditional_1_tr_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 46);
  }
}
function OneUnitTaskEditor_Conditional_1_Conditional_38_Conditional_14_Conditional_1_tr_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 47);
  }
}
function OneUnitTaskEditor_Conditional_1_Conditional_38_Conditional_14_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 23);
    \u0275\u0275elementContainerStart(1, 24);
    \u0275\u0275template(2, OneUnitTaskEditor_Conditional_1_Conditional_38_Conditional_14_Conditional_1_th_2_Template, 2, 0, "th", 25)(3, OneUnitTaskEditor_Conditional_1_Conditional_38_Conditional_14_Conditional_1_td_3_Template, 4, 1, "td", 26);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(4, 27);
    \u0275\u0275template(5, OneUnitTaskEditor_Conditional_1_Conditional_38_Conditional_14_Conditional_1_th_5_Template, 2, 0, "th", 28)(6, OneUnitTaskEditor_Conditional_1_Conditional_38_Conditional_14_Conditional_1_td_6_Template, 2, 1, "td", 26);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(7, 29);
    \u0275\u0275template(8, OneUnitTaskEditor_Conditional_1_Conditional_38_Conditional_14_Conditional_1_th_8_Template, 2, 0, "th", 28)(9, OneUnitTaskEditor_Conditional_1_Conditional_38_Conditional_14_Conditional_1_td_9_Template, 2, 1, "td", 26);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(10, 30);
    \u0275\u0275template(11, OneUnitTaskEditor_Conditional_1_Conditional_38_Conditional_14_Conditional_1_th_11_Template, 2, 0, "th", 28)(12, OneUnitTaskEditor_Conditional_1_Conditional_38_Conditional_14_Conditional_1_td_12_Template, 3, 1, "td", 31);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(13, OneUnitTaskEditor_Conditional_1_Conditional_38_Conditional_14_Conditional_1_tr_13_Template, 1, 0, "tr", 32)(14, OneUnitTaskEditor_Conditional_1_Conditional_38_Conditional_14_Conditional_1_tr_14_Template, 1, 0, "tr", 33);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275property("dataSource", ctx_r1.meansDataSource);
    \u0275\u0275advance(13);
    \u0275\u0275property("matHeaderRowDef", ctx_r1.meansDisplayedColumns);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r1.meansDisplayedColumns);
  }
}
function OneUnitTaskEditor_Conditional_1_Conditional_38_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, OneUnitTaskEditor_Conditional_1_Conditional_38_Conditional_14_Conditional_0_Template, 5, 0, "div", 22)(1, OneUnitTaskEditor_Conditional_1_Conditional_38_Conditional_14_Conditional_1_Template, 15, 3, "table", 23);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275conditional(ctx_r1.means().length === 0 ? 0 : 1);
  }
}
function OneUnitTaskEditor_Conditional_1_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-expansion-panel", 15);
    \u0275\u0275listener("opened", function OneUnitTaskEditor_Conditional_1_Conditional_38_Template_mat_expansion_panel_opened_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.loadMeans());
    });
    \u0275\u0275elementStart(1, "mat-expansion-panel-header")(2, "mat-panel-title")(3, "mat-icon", 16);
    \u0275\u0275text(4, "flight");
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " \u0417\u0430\u0441\u043E\u0431\u0438 ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 17)(7, "div", 18)(8, "div", 19)(9, "button", 20);
    \u0275\u0275listener("click", function OneUnitTaskEditor_Conditional_1_Conditional_38_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.addMean());
    });
    \u0275\u0275elementStart(10, "mat-icon");
    \u0275\u0275text(11, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(12, " \u0414\u043E\u0434\u0430\u0442\u0438 \u0437\u0430\u0441\u0456\u0431 ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(13, OneUnitTaskEditor_Conditional_1_Conditional_38_Conditional_13_Template, 4, 0, "div", 21)(14, OneUnitTaskEditor_Conditional_1_Conditional_38_Conditional_14_Template, 2, 1);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const readOnly_r9 = \u0275\u0275readContextLet(0);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275property("disabled", readOnly_r9);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r1.isLoadingMeans() ? 13 : 14);
  }
}
function OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21)(1, "mat-icon");
    \u0275\u0275text(2, "hourglass_empty");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " \u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F... ");
    \u0275\u0275elementEnd();
  }
}
function OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_8_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22)(1, "mat-icon");
    \u0275\u0275text(2, "group");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u041E\u0441\u043E\u0431\u043E\u0432\u0438\u0439 \u0441\u043A\u043B\u0430\u0434 \u0432\u0456\u0434\u0441\u0443\u0442\u043D\u0456\u0439");
    \u0275\u0275elementEnd()();
  }
}
function OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_8_Conditional_1_th_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 65);
    \u0275\u0275text(1, "?");
    \u0275\u0275elementEnd();
  }
}
function OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_8_Conditional_1_td_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 35);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const soldier_r16 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.unitTagTitle(soldier_r16), " ");
  }
}
function OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_8_Conditional_1_th_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 65);
    \u0275\u0275text(1, "\u041F\u0406\u0411");
    \u0275\u0275elementEnd();
  }
}
function OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_8_Conditional_1_td_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 35)(1, "span", 66);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const soldier_r17 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getSoldierFIO(soldier_r17));
  }
}
function OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_8_Conditional_1_th_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 65);
    \u0275\u0275text(1, "\u041F\u043E\u0437\u0438\u0432\u043D\u0438\u0439");
    \u0275\u0275elementEnd();
  }
}
function OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_8_Conditional_1_td_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 35);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const soldier_r18 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(soldier_r18.nickName || "-");
  }
}
function OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_8_Conditional_1_th_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 65);
    \u0275\u0275text(1, "\u0417\u0432\u0430\u043D\u043D\u044F");
    \u0275\u0275elementEnd();
  }
}
function OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_8_Conditional_1_td_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 35);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const soldier_r19 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(soldier_r19.rankShortValue);
  }
}
function OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_8_Conditional_1_th_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 65);
    \u0275\u0275text(1, "\u041F\u043E\u0441\u0430\u0434\u0430");
    \u0275\u0275elementEnd();
  }
}
function OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_8_Conditional_1_td_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 35);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const soldier_r20 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(soldier_r20.positionValue);
  }
}
function OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_8_Conditional_1_th_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 65);
    \u0275\u0275text(1, "\u0421\u0442\u0430\u0442\u0443\u0441");
    \u0275\u0275elementEnd();
  }
}
function OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_8_Conditional_1_td_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 35)(1, "span", 67);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const soldier_r21 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(soldier_r21.stateValue);
  }
}
function OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_8_Conditional_1_th_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 65);
    \u0275\u0275text(1, "\u041F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B");
    \u0275\u0275elementEnd();
  }
}
function OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_8_Conditional_1_td_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 35)(1, "span", 68);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const soldier_r22 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(soldier_r22.unitShortName);
  }
}
function OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_8_Conditional_1_th_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 65);
    \u0275\u0275text(1, "\u041F\u0440\u0438\u0434\u0430\u043D\u0438\u0439 \u0434\u043E");
    \u0275\u0275elementEnd();
  }
}
function OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_8_Conditional_1_td_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 35)(1, "span", 68);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const soldier_r23 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(soldier_r23.assignedUnitShortName || "-");
  }
}
function OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_8_Conditional_1_th_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 65);
    \u0275\u0275text(1, "\u0415\u043A\u0456\u043F\u0430\u0436/\u0413\u0440\u0443\u043F\u0430");
    \u0275\u0275elementEnd();
  }
}
function OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_8_Conditional_1_td_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 35)(1, "span", 68);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const soldier_r24 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(soldier_r24.involvedUnitShortName || "-");
  }
}
function OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_8_Conditional_1_th_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 65);
    \u0275\u0275text(1, "\u041F\u0440\u0438\u0431\u0443\u0432");
    \u0275\u0275elementEnd();
  }
}
function OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_8_Conditional_1_td_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 35);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const soldier_r25 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, soldier_r25.arrivedAt, "dd.MM.yyyy"), " ");
  }
}
function OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_8_Conditional_1_th_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 65);
    \u0275\u0275text(1, "\u0412\u0438\u0431\u0443\u0432");
    \u0275\u0275elementEnd();
  }
}
function OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_8_Conditional_1_td_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 35);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const soldier_r26 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", soldier_r26.departedAt ? \u0275\u0275pipeBind2(2, 1, soldier_r26.departedAt, "dd.MM.yyyy") : "-", " ");
  }
}
function OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_8_Conditional_1_th_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 65);
    \u0275\u0275text(1, "\u041A\u043E\u043C\u0435\u043D\u0442\u0430\u0440");
    \u0275\u0275elementEnd();
  }
}
function OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_8_Conditional_1_td_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 69)(1, "span", 70);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const soldier_r27 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("matTooltip", soldier_r27.comment && soldier_r27.comment.length > 50 ? soldier_r27.comment : "")("title", soldier_r27.comment && soldier_r27.comment.length > 50 ? soldier_r27.comment : "");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", soldier_r27.comment || "", " ");
  }
}
function OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_8_Conditional_1_tr_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 46);
  }
}
function OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_8_Conditional_1_tr_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 47);
  }
  if (rf & 2) {
    const row_r28 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275classMap(ctx_r1.getRowClass(row_r28));
  }
}
function OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_8_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 49);
    \u0275\u0275elementContainerStart(1, 50);
    \u0275\u0275template(2, OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_8_Conditional_1_th_2_Template, 2, 0, "th", 51)(3, OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_8_Conditional_1_td_3_Template, 2, 1, "td", 26);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(4, 52);
    \u0275\u0275template(5, OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_8_Conditional_1_th_5_Template, 2, 0, "th", 51)(6, OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_8_Conditional_1_td_6_Template, 3, 1, "td", 26);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(7, 53);
    \u0275\u0275template(8, OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_8_Conditional_1_th_8_Template, 2, 0, "th", 51)(9, OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_8_Conditional_1_td_9_Template, 2, 1, "td", 26);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(10, 54);
    \u0275\u0275template(11, OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_8_Conditional_1_th_11_Template, 2, 0, "th", 51)(12, OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_8_Conditional_1_td_12_Template, 2, 1, "td", 26);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(13, 55);
    \u0275\u0275template(14, OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_8_Conditional_1_th_14_Template, 2, 0, "th", 51)(15, OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_8_Conditional_1_td_15_Template, 2, 1, "td", 26);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(16, 56);
    \u0275\u0275template(17, OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_8_Conditional_1_th_17_Template, 2, 0, "th", 51)(18, OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_8_Conditional_1_td_18_Template, 3, 1, "td", 26);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(19, 57);
    \u0275\u0275template(20, OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_8_Conditional_1_th_20_Template, 2, 0, "th", 51)(21, OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_8_Conditional_1_td_21_Template, 3, 1, "td", 26);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(22, 58);
    \u0275\u0275template(23, OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_8_Conditional_1_th_23_Template, 2, 0, "th", 51)(24, OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_8_Conditional_1_td_24_Template, 3, 1, "td", 26);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(25, 59);
    \u0275\u0275template(26, OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_8_Conditional_1_th_26_Template, 2, 0, "th", 51)(27, OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_8_Conditional_1_td_27_Template, 3, 1, "td", 26);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(28, 60);
    \u0275\u0275template(29, OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_8_Conditional_1_th_29_Template, 2, 0, "th", 51)(30, OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_8_Conditional_1_td_30_Template, 3, 4, "td", 26);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(31, 61);
    \u0275\u0275template(32, OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_8_Conditional_1_th_32_Template, 2, 0, "th", 51)(33, OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_8_Conditional_1_td_33_Template, 3, 4, "td", 26);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(34, 62);
    \u0275\u0275template(35, OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_8_Conditional_1_th_35_Template, 2, 0, "th", 51)(36, OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_8_Conditional_1_td_36_Template, 3, 3, "td", 63);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(37, OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_8_Conditional_1_tr_37_Template, 1, 0, "tr", 32)(38, OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_8_Conditional_1_tr_38_Template, 1, 2, "tr", 64);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275property("dataSource", ctx_r1.soldierDataSource);
    \u0275\u0275advance(37);
    \u0275\u0275property("matHeaderRowDef", ctx_r1.soldierDisplayedColumns);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r1.soldierDisplayedColumns);
  }
}
function OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_8_Conditional_0_Template, 5, 0, "div", 22)(1, OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_8_Conditional_1_Template, 39, 3, "table", 49);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275conditional(ctx_r1.soldiers().length === 0 ? 0 : 1);
  }
}
function OneUnitTaskEditor_Conditional_1_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 17)(1, "div", 18)(2, "div", 19)(3, "button", 48);
    \u0275\u0275listener("click", function OneUnitTaskEditor_Conditional_1_Conditional_45_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.reloadSoldiers());
    });
    \u0275\u0275elementStart(4, "mat-icon");
    \u0275\u0275text(5, "refresh");
    \u0275\u0275elementEnd();
    \u0275\u0275text(6, " \u041E\u043D\u043E\u0432\u0438\u0442\u0438 ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(7, OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_7_Template, 4, 0, "div", 21)(8, OneUnitTaskEditor_Conditional_1_Conditional_45_Conditional_8_Template, 2, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(7);
    \u0275\u0275conditional(ctx_r1.isLoadingSoldiers() ? 7 : 8);
  }
}
function OneUnitTaskEditor_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275declareLet(0);
    \u0275\u0275elementStart(1, "mat-card", 1)(2, "mat-card-header")(3, "mat-card-title", 2);
    \u0275\u0275text(4);
    \u0275\u0275conditionalCreate(5, OneUnitTaskEditor_Conditional_1_Conditional_5_Template, 4, 0);
    \u0275\u0275elementStart(6, "div");
    \u0275\u0275conditionalCreate(7, OneUnitTaskEditor_Conditional_1_Conditional_7_Template, 4, 0)(8, OneUnitTaskEditor_Conditional_1_Conditional_8_Template, 4, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 3)(10, "button", 4);
    \u0275\u0275listener("click", function OneUnitTaskEditor_Conditional_1_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onRemoveClick());
    });
    \u0275\u0275elementStart(11, "mat-icon", 5);
    \u0275\u0275text(12, "remove_circle");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(13, "mat-card-content")(14, "div", 6);
    \u0275\u0275conditionalCreate(15, OneUnitTaskEditor_Conditional_1_Conditional_15_Template, 5, 1, "div", 2);
    \u0275\u0275conditionalCreate(16, OneUnitTaskEditor_Conditional_1_Conditional_16_Template, 1, 1);
    \u0275\u0275elementStart(17, "div", 2)(18, "strong");
    \u0275\u0275text(19, "\u041F\u041F\u0414:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span");
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "div", 7)(23, "div", 8)(24, "strong");
    \u0275\u0275text(25, "\u0417\u0430\u0432\u0434\u0430\u043D\u043D\u044F:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "mat-form-field", 9)(27, "mat-select", 10);
    \u0275\u0275listener("selectionChange", function OneUnitTaskEditor_Conditional_1_Template_mat_select_selectionChange_27_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onTaskChange($event.value));
    });
    \u0275\u0275repeaterCreate(28, OneUnitTaskEditor_Conditional_1_For_29_Template, 2, 4, "mat-option", 11, _forTrack0);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(30, "div", 8)(31, "strong");
    \u0275\u0275text(32, "\u0420\u0412\u0417 (\u0420\u0430\u0439\u043E\u043D \u0432\u0438\u043A\u043E\u043D\u0430\u043D\u043D\u044F \u0437\u0430\u0432\u0434\u0430\u043D\u044C):");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "mat-form-field", 9)(34, "mat-select", 12);
    \u0275\u0275listener("selectionChange", function OneUnitTaskEditor_Conditional_1_Template_mat_select_selectionChange_34_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onAreaChange($event.value));
    });
    \u0275\u0275repeaterCreate(35, OneUnitTaskEditor_Conditional_1_For_36_Template, 2, 2, "mat-option", 11, _forTrack0);
    \u0275\u0275elementEnd()()()()()();
    \u0275\u0275elementStart(37, "mat-accordion", 13);
    \u0275\u0275conditionalCreate(38, OneUnitTaskEditor_Conditional_1_Conditional_38_Template, 15, 2, "mat-expansion-panel", 14);
    \u0275\u0275elementStart(39, "mat-expansion-panel", 15);
    \u0275\u0275listener("opened", function OneUnitTaskEditor_Conditional_1_Template_mat_expansion_panel_opened_39_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSoldiersPanelOpened());
    });
    \u0275\u0275elementStart(40, "mat-expansion-panel-header")(41, "mat-panel-title")(42, "mat-icon", 16);
    \u0275\u0275text(43, "group");
    \u0275\u0275elementEnd();
    \u0275\u0275text(44, " \u041E\u0441\u043E\u0431\u043E\u0432\u0438\u0439 \u0441\u043A\u043B\u0430\u0434 ");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(45, OneUnitTaskEditor_Conditional_1_Conditional_45_Template, 9, 1, "div", 17);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const unit_r3 = ctx;
    const ctx_r1 = \u0275\u0275nextContext();
    const readOnly_r29 = \u0275\u0275storeLet(unit_r3.isPublished);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", unit_r3.unitShortName, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(unit_r3.isInvolved ? 5 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(unit_r3.isPublished ? 7 : 8);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", readOnly_r29);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(unit_r3.parentShortName ? 15 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!unit_r3.isInvolved ? 16 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(unit_r3.persistentLocationValue || "\u041D\u0435 \u0432\u043A\u0430\u0437\u0430\u043D\u043E");
    \u0275\u0275advance(6);
    \u0275\u0275property("formControl", ctx_r1.taskControl)("disabled", readOnly_r29);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.unitTasks());
    \u0275\u0275advance(6);
    \u0275\u0275property("formControl", ctx_r1.areaControl)("disabled", readOnly_r29);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.areas());
    \u0275\u0275advance(3);
    \u0275\u0275conditional((ctx_r1.taskControl.value == null ? null : ctx_r1.taskControl.value.withMeans) ? 38 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275conditional(ctx_r1.soldiersPanelOpened() ? 45 : -1);
  }
}
var OneUnitTaskEditor = class _OneUnitTaskEditor {
  dictUnitTasksService = inject(DictUnitTasksService);
  dictAreasService = inject(DictAreasService);
  droneModelTaskService = inject(DroneModelTaskService);
  unitTaskService = inject(UnitTaskService);
  soldierTaskService = inject(SoldierTaskService);
  snackBar = inject(MatSnackBar);
  dialog = inject(MatDialog);
  destroy$ = new Subject();
  remove = new EventEmitter();
  unitChange = new EventEmitter();
  /** Еміт події при зміні стану незбережених змін */
  unsavedChangesChange = new EventEmitter();
  // Сигнал для реактивного відстеження змін unitTask
  unitTaskSignal = signal(null, ...ngDevMode ? [{ debugName: "unitTaskSignal" }] : []);
  // Перелік завдань з довідника
  unitTasks = signal([], ...ngDevMode ? [{ debugName: "unitTasks" }] : []);
  // Перелік областей (РВЗ)
  areas = signal([], ...ngDevMode ? [{ debugName: "areas" }] : []);
  // Дані особового складу (замінено на SoldierTaskDto)
  soldiers = signal([], ...ngDevMode ? [{ debugName: "soldiers" }] : []);
  soldierDataSource = new MatTableDataSource([]);
  soldierDisplayedColumns = [
    "unitTag",
    "fio",
    "nickName",
    "rankShortValue",
    "positionValue",
    "stateValue",
    "unitShortName",
    "assignedUnitShortName",
    "arrivedAt",
    "departedAt",
    "involvedUnitShortName",
    "comment"
  ];
  //  soldierCount = signal<number>(0);
  isLoadingSoldiers = signal(false, ...ngDevMode ? [{ debugName: "isLoadingSoldiers" }] : []);
  soldiersPanelOpened = signal(false, ...ngDevMode ? [{ debugName: "soldiersPanelOpened" }] : []);
  // Дані засобів (Master-Detail)
  means = signal([], ...ngDevMode ? [{ debugName: "means" }] : []);
  meansDataSource = new MatTableDataSource([]);
  meansDisplayedColumns = ["actions", "droneModelValue", "droneTypeName", "quantity"];
  /** Сигнал для відстеження стану завантаження засобів */
  isLoadingMeans = signal(false, ...ngDevMode ? [{ debugName: "isLoadingMeans" }] : []);
  /** Сигнал для відстеження стану збереження засобів */
  isSavingMeans = signal(false, ...ngDevMode ? [{ debugName: "isSavingMeans" }] : []);
  // Стан збереження (для індикації процесу)
  isSaving = signal(false, ...ngDevMode ? [{ debugName: "isSaving" }] : []);
  hasUnsavedChanges = signal(false, ...ngDevMode ? [{ debugName: "hasUnsavedChanges" }] : []);
  // Effect для відстеження змін hasUnsavedChanges і емітування батьківському компоненту
  unsavedChangesEffect = effect(() => {
    this.unsavedChangesChange.emit(this.hasUnsavedChanges());
  }, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "unsavedChangesEffect" } : {}), { allowSignalWrites: true }));
  /** Контрол для статусу публікації
   * Предотвращает переключение визуального контрола
   * при ошибках в изменении статуса публикации из-за
   * асинхронного обновления unitTask после сохранения.
   */
  publishStatusControl = new FormControl(false, { nonNullable: true });
  // Стан редагування засобів
  editingMeanId = signal(null, ...ngDevMode ? [{ debugName: "editingMeanId" }] : []);
  editingMeanField = signal(null, ...ngDevMode ? [{ debugName: "editingMeanField" }] : []);
  editingMeanValue = signal(void 0, ...ngDevMode ? [{ debugName: "editingMeanValue" }] : []);
  sort;
  set unitTask(value) {
    this.unitTaskSignal.set(value);
    this.publishStatusControl.setValue(value.isPublished, { emitEvent: false });
  }
  get unitTask() {
    return this.unitTaskSignal();
  }
  // Form Controls
  taskControl = new FormControl(null);
  areaControl = new FormControl(null);
  ngOnInit() {
    this.dictUnitTasksService.getAll().subscribe({
      next: (tasks) => {
        this.unitTasks.set(tasks);
        this.initializeControls();
      },
      error: (error) => {
        console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u0437\u0430\u0432\u0434\u0430\u043D\u044C:", error);
        const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u0437\u0430\u0432\u0434\u0430\u043D\u044C");
        this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
      }
    });
  }
  /**
   * Ініціалізує контроли значеннями з unitTask (без емітів подій)
   */
  initializeControls() {
    const unitTask = this.unitTask;
    const tasks = this.unitTasks();
    if (unitTask.taskId && tasks.length > 0) {
      const task = tasks.find((t) => t.id === unitTask.taskId);
      if (task) {
        this.taskControl.setValue(task, { emitEvent: false });
        if (task.areaTypeId) {
          this.loadAreasByTask(task.areaTypeId, true);
        }
      }
    }
  }
  ngAfterViewInit() {
    this.soldierDataSource.sort = this.sort;
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  /**
   * Обробник відкриття панелі особового складу (ленива ініціалізація)
   */
  onSoldiersPanelOpened() {
    this.soldiersPanelOpened.set(true);
    this.reloadSoldiers();
  }
  /**
   * Завантажує особовий склад підрозділу для завдання
   */
  reloadSoldiers() {
    this.isLoadingSoldiers.set(true);
    this.soldierTaskService.getByUnitTask(this.unitTask.id).pipe(takeUntil(this.destroy$), finalize(() => this.isLoadingSoldiers.set(false))).subscribe({
      next: (soldiers) => {
        this.soldiers.set(soldiers);
        this.soldierDataSource.data = soldiers;
        this.soldierDataSource.sort = this.sort;
      },
      error: (error) => {
        console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u043E\u0441\u043E\u0431\u043E\u0432\u043E\u0433\u043E \u0441\u043A\u043B\u0430\u0434\u0443:", error);
        const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u043E\u0441\u043E\u0431\u043E\u0432\u043E\u0433\u043E \u0441\u043A\u043B\u0430\u0434\u0443");
        this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
      }
    });
  }
  /**
   * Завантажує засоби (дрони) для завдання підрозділу (Master-Detail)
   */
  loadMeans() {
    if (this.means().length > 0) {
      return;
    }
    this.isLoadingMeans.set(true);
    this.droneModelTaskService.getByUnitTask(this.unitTask.id).pipe(takeUntil(this.destroy$), finalize(() => this.isLoadingMeans.set(false))).subscribe({
      next: (means) => {
        this.means.set(means);
        this.meansDataSource.data = means;
      },
      error: (error) => {
        console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u0437\u0430\u0441\u043E\u0431\u0456\u0432:", error);
        const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u0437\u0430\u0441\u043E\u0431\u0456\u0432");
        this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
      }
    });
  }
  /**
   * Обробник натискання кнопки видалення
   */
  onRemoveClick() {
    const unit = this.unitTask;
    const ref = this.dialog.open(ConfirmDialogComponent, {
      width: "360px",
      maxWidth: "95vw",
      autoFocus: false,
      data: {
        title: "\u0412\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0443 \u0456\u0437 \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F",
        message: `\u0412\u0438 \u0432\u043F\u0435\u0432\u043D\u0435\u043D\u0456, \u0449\u043E \u0445\u043E\u0447\u0435\u0442\u0435 \u0432\u0438\u0434\u0430\u043B\u0438\u0442\u0438 "${unit.unitShortName}" \u0437\u0456 \u0441\u043F\u0438\u0441\u043A\u0443?`,
        confirmText: "\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438",
        cancelText: "\u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438",
        color: "warn",
        icon: "warning"
      }
    });
    ref.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.unitTaskService.delete(unit.id).subscribe({
          next: () => {
            this.remove.emit(unit.id);
          },
          error: (error) => {
            console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0432 \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u0456 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0443:", error);
            const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0443");
            this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
          }
        });
      }
    });
  }
  /**
   * Обробник зміни завдання
   */
  onTaskChange(task) {
    if (!task) {
      const updatedUnit2 = __spreadProps(__spreadValues({}, this.unitTask), {
        taskId: "",
        taskValue: "",
        taskWithMeans: false,
        areaId: "",
        areaValue: "",
        means: []
      });
      this.means.set([]);
      this.meansDataSource.data = [];
      this.areas.set([]);
      this.areaControl.setValue(null, { emitEvent: false });
      this.unitTaskSignal.set(updatedUnit2);
      this.unitChange.emit(updatedUnit2);
      this.hasUnsavedChanges.set(true);
      return;
    }
    this.areaControl.setValue(null, { emitEvent: false });
    this.means.set([]);
    this.meansDataSource.data = [];
    const updatedUnit = __spreadProps(__spreadValues({}, this.unitTask), {
      taskId: task.id,
      taskValue: task.value,
      taskWithMeans: task.withMeans,
      areaId: "",
      // скидаємо — буде обрано після завантаження нового списку РВЗ
      areaValue: "",
      means: []
    });
    this.unitTaskSignal.set(updatedUnit);
    this.unitChange.emit(updatedUnit);
    this.hasUnsavedChanges.set(true);
    if (task.areaTypeId) {
      this.loadAreasByTask(task.areaTypeId);
    }
  }
  /**
   * Обробник зміни області (РВЗ)
   * Автоматично зберігає на сервері якщо всі обов'язкові поля заповнені
   */
  onAreaChange(area) {
    return __async(this, null, function* () {
      const updatedUnit = __spreadProps(__spreadValues({}, this.unitTask), {
        areaId: area ? area.id : "",
        areaValue: area ? area.value : ""
      });
      this.unitTaskSignal.set(updatedUnit);
      this.unitChange.emit(updatedUnit);
      if (area && this.unitTask.taskId) {
        const [success, errorMsg] = yield this.saveUnitTask();
        if (success) {
          this.snackBar.open("\u0417\u0431\u0435\u0440\u0435\u0436\u0435\u043D\u043E", "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 2e3 });
        } else if (errorMsg) {
          this.snackBar.open(errorMsg, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
        }
      } else {
        this.hasUnsavedChanges.set(true);
      }
    });
  }
  /**
   * Завантажує області по areaTypeId
   * @param areaTypeId - ID типу області
   * @param isInitialization - true якщо це початкова ініціалізація (не емітити зміни)
   */
  loadAreasByTask(areaTypeId, isInitialization = false) {
    if (areaTypeId === PPD_AREA_TYPE_GUID) {
      this.handlePpdAreaType(isInitialization);
      return;
    }
    this.loadAreasFromServer(areaTypeId, isInitialization);
  }
  handlePpdAreaType(isInitialization) {
    const persistentLocationId = this.unitTask.persistentLocationId;
    if (!persistentLocationId) {
      this.areas.set([]);
      this.areaControl.setValue(null, { emitEvent: false });
      const errorMessage = "\u0414\u043B\u044F \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0443 \u043D\u0435 \u0432\u043A\u0430\u0437\u0430\u043D\u043E \u041F\u041F\u0414. \u0421\u043F\u043E\u0447\u0430\u0442\u043A\u0443 \u0432\u043A\u0430\u0436\u0456\u0442\u044C \u041F\u041F\u0414 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0443.";
      console.error(errorMessage);
      this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
      return;
    }
    const persistentArea = {
      id: persistentLocationId,
      value: this.unitTask.persistentLocationValue || "\u041F\u041F\u0414",
      areaTypeId: PPD_AREA_TYPE_GUID,
      areaType: "\u041F\u041F\u0414"
    };
    this.areas.set([persistentArea]);
    this.areaControl.setValue(persistentArea, { emitEvent: false });
    if (!isInitialization && this.unitTask.areaId !== persistentLocationId) {
      const updatedUnit = __spreadProps(__spreadValues({}, this.unitTask), {
        areaId: persistentLocationId,
        areaValue: this.unitTask.persistentLocationValue || "\u041F\u041F\u0414"
      });
      this.unitTaskSignal.set(updatedUnit);
      this.unitChange.emit(updatedUnit);
    }
  }
  loadAreasFromServer(areaTypeId, isInitialization) {
    this.dictAreasService.getByAreaType(areaTypeId).pipe(takeUntil(this.destroy$)).subscribe({
      next: (areas) => {
        this.areas.set(areas);
        if (isInitialization) {
          this.applyInitialAreaSelection(areas);
        }
      },
      error: (error) => {
        console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u043E\u0431\u043B\u0430\u0441\u0442\u0435\u0439:", error);
        const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u043E\u0431\u043B\u0430\u0441\u0442\u0435\u0439");
        this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
        this.areas.set([]);
      }
    });
  }
  applyInitialAreaSelection(areas) {
    if (!this.unitTask.areaId) {
      return;
    }
    const area = areas.find((a) => a.id === this.unitTask.areaId);
    if (area) {
      this.areaControl.setValue(area, { emitEvent: false });
      return;
    }
    const errorMessage = `\u041E\u0431\u043B\u0430\u0441\u0442\u044C ${this.unitTask.areaValue}
 ${this.unitTask.areaId}
    \u043D\u0435 \u0437\u043D\u0430\u0439\u0434\u0435\u043D\u0430 \u0432 \u043E\u0442\u0440\u0438\u043C\u0430\u043D\u043E\u043C\u0443 \u043F\u0435\u0440\u0435\u043B\u0456\u043A\u0443.`;
    const updatedUnit = __spreadProps(__spreadValues({}, this.unitTask), {
      areaId: "",
      areaValue: ""
    });
    this.unitTaskSignal.set(updatedUnit);
    this.areaControl.setValue(null, { emitEvent: false });
    this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
    this.hasUnsavedChanges.set(true);
  }
  /**
   * Відкриває діалог вибору моделі БПЛА та додає її до списку засобів
   */
  addMean() {
    const dialogRef = this.dialog.open(DictDroneModelSelectDialogComponent, {
      width: "800px",
      data: {
        title: "\u041E\u0431\u0435\u0440\u0456\u0442\u044C \u043C\u043E\u0434\u0435\u043B\u044C \u0411\u041F\u041B\u0410"
      }
    });
    dialogRef.afterClosed().subscribe((selectedDrone) => {
      if (selectedDrone) {
        const existingMean = this.means().find((m) => m.droneModelId === selectedDrone.id);
        if (existingMean) {
          this.snackBar.open("\u0426\u044F \u043C\u043E\u0434\u0435\u043B\u044C \u0411\u041F\u041B\u0410 \u0432\u0436\u0435 \u0434\u043E\u0434\u0430\u043D\u0430 \u0434\u043E \u0441\u043F\u0438\u0441\u043A\u0443", "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 3e3 });
          return;
        }
        const newMean = {
          id: "",
          // Буде створено при збереженні
          unitTaskId: this.unitTask.id,
          droneModelId: selectedDrone.id,
          droneModelValue: selectedDrone.value,
          droneTypeName: selectedDrone.droneTypeName,
          quantity: selectedDrone.quantity
          // ✅ Використовуємо кількість з діалогу
        };
        const updatedMeans = [...this.means(), newMean];
        this.means.set(updatedMeans);
        this.meansDataSource.data = updatedMeans;
        const updatedUnit = __spreadProps(__spreadValues({}, this.unitTask), {
          meansCount: updatedMeans.length,
          means: updatedMeans
        });
        this.unitChange.emit(updatedUnit);
        this.hasUnsavedChanges.set(true);
      }
    });
  }
  /**
   * Перевіряє чи редагується конкретне поле засобу
   */
  isEditingMean(meanId, field) {
    return this.editingMeanId() === meanId && this.editingMeanField() === field;
  }
  /**
   * Починає редагування поля засобу
   */
  startEditingMean(mean, field, event) {
    event.stopPropagation();
    if (this.isSavingMeans()) {
      return;
    }
    const meanId = mean.id || mean.droneModelId;
    this.editingMeanId.set(meanId);
    this.editingMeanField.set(field);
    this.editingMeanValue.set(mean.quantity);
  }
  /**
   * Скасовує редагування
   */
  cancelEditingMean(event) {
    event.stopPropagation();
    this.editingMeanId.set(null);
    this.editingMeanField.set(null);
    this.editingMeanValue.set(void 0);
  }
  /**
   * Зберігає зміни поля засобу
   */
  saveMeanFieldChange(mean, field, event) {
    return __async(this, null, function* () {
      event.stopPropagation();
      if (this.isSavingMeans()) {
        return;
      }
      const newValue = this.editingMeanValue();
      if (newValue === void 0 || newValue <= 0) {
        this.snackBar.open("\u041A\u0456\u043B\u044C\u043A\u0456\u0441\u0442\u044C \u043C\u0430\u0454 \u0431\u0443\u0442\u0438 \u0431\u0456\u043B\u044C\u0448\u0435 0", "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 3e3 });
        return;
      }
      const updatedMeans = this.means().map((m) => {
        const mId = m.id || m.droneModelId;
        const meanId = mean.id || mean.droneModelId;
        if (mId === meanId) {
          return __spreadProps(__spreadValues({}, m), { quantity: newValue });
        }
        return m;
      });
      this.means.set(updatedMeans);
      this.meansDataSource.data = updatedMeans;
      const updatedUnit = __spreadProps(__spreadValues({}, this.unitTask), {
        means: updatedMeans
      });
      this.unitTaskSignal.set(updatedUnit);
      this.unitChange.emit(updatedUnit);
      this.hasUnsavedChanges.set(true);
      try {
        yield this.saveAndReloadMeans(this.unitTask.id);
      } catch {
        return;
      }
      this.cancelEditingMean(event);
    });
  }
  /**
   * Оновлює значення при редагуванні
   */
  updateEditingMeanValue(value) {
    this.editingMeanValue.set(value);
  }
  /**
   * Видаляє засіб зі списку
   */
  deleteMean(mean) {
    return __async(this, null, function* () {
      if (this.isSavingMeans()) {
        return;
      }
      const updatedMeans = this.means().filter((m) => m.id ? m.id !== mean.id : m.droneModelId !== mean.droneModelId);
      this.means.set(updatedMeans);
      this.meansDataSource.data = updatedMeans;
      const updatedUnit = __spreadProps(__spreadValues({}, this.unitTask), {
        meansCount: updatedMeans.length,
        means: updatedMeans
      });
      this.unitChange.emit(updatedUnit);
      this.hasUnsavedChanges.set(true);
      try {
        yield this.saveAndReloadMeans(this.unitTask.id);
      } catch {
        return;
      }
    });
  }
  /**
   * Зберігає UnitTask + його засоби (means)
   * Викликається з батьківського компонента при загальному збереженні
   */
  saveUnitTask() {
    return __async(this, null, function* () {
      if (!this.unitTask.taskId) {
        const msg = `\u041F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B "${this.unitTask.unitShortName}": \u0437\u0430\u043F\u043E\u0432\u043D\u0456\u0442\u044C \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F`;
        return [false, msg];
      }
      if (!this.unitTask.areaId) {
        const msg = `\u041F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B "${this.unitTask.unitShortName}": \u0437\u0430\u043F\u043E\u0432\u043D\u0456\u0442\u044C \u0440\u0430\u0439\u043E\u043D \u0432\u0438\u043A\u043E\u043D\u0430\u043D\u043D\u044F \u0437\u0430\u0432\u0434\u0430\u043D\u044C (\u0420\u0412\u0417)`;
        return [false, msg];
      }
      this.isSaving.set(true);
      try {
        yield firstValueFrom(this.unitTaskService.update(this.unitTask.id, this.unitTask));
        yield this.saveAndReloadMeans(this.unitTask.id);
        this.hasUnsavedChanges.set(false);
        return [true, ""];
      } catch (error) {
        this.hasUnsavedChanges.set(true);
        console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0431\u0435\u0440\u0435\u0436\u0435\u043D\u043D\u044F UnitTask:", error);
        const errorMessage = S5App_ErrorHandler.handleHttpError(error, `\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0431\u0435\u0440\u0435\u0436\u0435\u043D\u043D\u044F \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0443 "${this.unitTask.unitShortName}"`);
        return [false, errorMessage];
      } finally {
        this.isSaving.set(false);
      }
    });
  }
  /** Зберігаємо засоби */
  saveAndReloadMeans(unitTaskId) {
    return __async(this, null, function* () {
      this.isSavingMeans.set(true);
      try {
        const meansToSave = this.means().map((mean) => ({
          unitTaskId,
          droneModelId: mean.droneModelId,
          quantity: mean.quantity
        }));
        yield firstValueFrom(this.droneModelTaskService.bulkSave(unitTaskId, meansToSave));
        const savedMeans = yield firstValueFrom(this.droneModelTaskService.getByUnitTask(unitTaskId));
        this.means.set(savedMeans);
        this.meansDataSource.data = savedMeans;
      } catch (error) {
        console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0431\u0435\u0440\u0435\u0436\u0435\u043D\u043D\u044F \u0437\u0430\u0441\u043E\u0431\u0456\u0432:", error);
        const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0431\u0435\u0440\u0435\u0436\u0435\u043D\u043D\u044F \u0437\u0430\u0441\u043E\u0431\u0456\u0432");
        this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
        throw error;
      } finally {
        this.isSavingMeans.set(false);
      }
    });
  }
  /**
   * Публікує/знімає з публікації UnitTask.
   * Повертає [true, ''] при успіху або [false, errorMsg] при помилці.
   * Викликається з батьківського компонента або з onPublishStatusChange.
   */
  publishUnitTask(isPublished) {
    return __async(this, null, function* () {
      const currentUnitTask = this.unitTask;
      if (currentUnitTask.isPublished === isPublished) {
        return [true, ""];
      }
      this.isSaving.set(true);
      try {
        yield firstValueFrom(this.unitTaskService.publish(currentUnitTask.id, isPublished));
        const updatedUnitTask = __spreadProps(__spreadValues({}, currentUnitTask), {
          isPublished,
          publishedAtUtc: isPublished ? (/* @__PURE__ */ new Date()).toISOString() : void 0
        });
        this.unitTaskSignal.set(updatedUnitTask);
        this.publishStatusControl.setValue(isPublished, { emitEvent: false });
        return [true, ""];
      } catch (error) {
        console.error("Error changing publish status:", error);
        const errorMessage = S5App_ErrorHandler.handleHttpError(error, `\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u043C\u0456\u043D\u0438 \u0441\u0442\u0430\u0442\u0443\u0441\u0443 \u043F\u0443\u0431\u043B\u0456\u043A\u0430\u0446\u0456\u0457 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0443 "${currentUnitTask.unitShortName}"`);
        return [false, errorMessage];
      } finally {
        this.isSaving.set(false);
      }
    });
  }
  /**
   * Обробник зміни статусу публікації (викликається з шаблону)
   */
  onPublishStatusChange(isPublished) {
    return __async(this, null, function* () {
      if (this.hasUnsavedChanges()) {
        const [saved, errorMsg2] = yield this.saveUnitTask();
        if (!saved) {
          this.snackBar.open(errorMsg2 || "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0431\u0435\u0440\u0435\u0436\u0435\u043D\u043D\u044F", "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
          this.publishStatusControl.setValue(this.unitTask.isPublished, { emitEvent: false });
          return;
        }
      }
      this.publishStatusControl.setValue(this.unitTask.isPublished, { emitEvent: false });
      const [success, errorMsg] = yield this.publishUnitTask(isPublished);
      if (success) {
        const statusText = this.getStatusLabel(isPublished);
        this.snackBar.open(`\u0417\u0430\u0432\u0434\u0430\u043D\u043D\u044F \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0443 "${this.unitTask.unitShortName}" ${statusText}`, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 3e3 });
      } else {
        this.publishStatusControl.setValue(this.unitTask.isPublished, { emitEvent: false });
        this.snackBar.open(errorMsg, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
      }
    });
  }
  /**
   * Отримує читабельну назву статусу публікації
   */
  getStatusLabel(isPublished) {
    return DocTemplateUtils.getStatusLabel(isPublished);
  }
  getSoldierFIO(soldier) {
    return SoldierUtils.formatFIO(soldier.firstName, soldier.midleName, soldier.lastName);
  }
  unitTagTitle(soldier) {
    return SoldierUtils.getUnitTagLabel(SoldierUtils.getUnitTag(soldier, this.unitTask.unitId || ""));
  }
  getRowClass(soldier) {
    return SoldierUtils.getRowClass(soldier, this.unitTask.unitId || "");
  }
  static \u0275fac = function OneUnitTaskEditor_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _OneUnitTaskEditor)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OneUnitTaskEditor, selectors: [["app-one-unit-task-editor"]], viewQuery: function OneUnitTaskEditor_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(MatSort, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.sort = _t.first);
    }
  }, inputs: { unitTask: "unitTask" }, outputs: { remove: "remove", unitChange: "unitChange", unsavedChangesChange: "unsavedChangesChange" }, decls: 2, vars: 1, consts: [[1, "main-content"], [1, "unit-details-card"], [1, "info-item", "inline"], [1, "remove-button-container"], ["mat-icon-button", "", "matTooltip", "\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u0437\u0456 \u0441\u043F\u0438\u0441\u043A\u0443", 1, "remove-button", 3, "click", "disabled"], ["color", "warn"], [1, "unit-info-grid"], [1, "task-assignments"], [1, "task-item"], ["appearance", "outline", 1, "task-select"], ["placeholder", "\u041E\u0431\u0435\u0440\u0456\u0442\u044C \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F", 3, "selectionChange", "formControl", "disabled"], [3, "value"], ["placeholder", "\u041E\u0431\u0435\u0440\u0456\u0442\u044C \u0420\u0412\u0417", 3, "selectionChange", "formControl", "disabled"], [1, "sections-accordion"], [1, "unit-section-panel"], [1, "unit-section-panel", 3, "opened"], ["color", "primary"], [1, "section-content"], [1, "action-container"], [1, "action-buttons"], ["mat-raised-button", "", "color", "accent", 3, "click", "disabled"], [1, "loading-indicator"], [1, "empty-list"], ["mat-table", "", 1, "mat-elevation-z8", 3, "dataSource"], ["matColumnDef", "actions"], ["mat-header-cell", "", "style", "width: 80px", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "droneModelValue"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["matColumnDef", "droneTypeName"], ["matColumnDef", "quantity"], ["mat-cell", "", "class", "editable-cell", 4, "matCellDef"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", "", 2, "width", "80px"], ["mat-cell", ""], ["mat-icon-button", "", "color", "warn", "matTooltip", "\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u0437\u0430\u0441\u0456\u0431", 3, "click", "disabled"], ["mat-header-cell", ""], ["mat-cell", "", 1, "editable-cell"], [1, "edit-mode"], [1, "view-mode"], ["type", "number", "min", "1", "autofocus", "", 1, "inline-input", 3, "ngModelChange", "click", "keydown.enter", "keydown.escape", "ngModel", "disabled"], ["mat-icon-button", "", "matTooltip", "\u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438", 1, "save-btn", 3, "click", "disabled"], ["mat-icon-button", "", "matTooltip", "\u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438", 1, "cancel-btn", 3, "click", "disabled"], [1, "value-text"], ["mat-icon-button", "", "matTooltip", "\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438", 1, "edit-btn", 3, "click", "disabled"], ["mat-header-row", ""], ["mat-row", ""], ["mat-raised-button", "", "color", "primary", 3, "click"], ["mat-table", "", "matSort", "", 1, "mat-elevation-z8", 2, "width", "100%", "margin-top", "1em", 3, "dataSource"], ["matColumnDef", "unitTag"], ["mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["matColumnDef", "fio"], ["matColumnDef", "nickName"], ["matColumnDef", "rankShortValue"], ["matColumnDef", "positionValue"], ["matColumnDef", "stateValue"], ["matColumnDef", "unitShortName"], ["matColumnDef", "assignedUnitShortName"], ["matColumnDef", "involvedUnitShortName"], ["matColumnDef", "arrivedAt"], ["matColumnDef", "departedAt"], ["matColumnDef", "comment"], ["mat-cell", "", "class", "comment-cell", 4, "matCellDef"], ["mat-row", "", 3, "class", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", "", "mat-sort-header", ""], [1, "fio"], [1, "state-badge"], [1, "unit-text"], ["mat-cell", "", 1, "comment-cell"], [1, "comment-text", 3, "matTooltip", "title"]], template: function OneUnitTaskEditor_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275conditionalCreate(1, OneUnitTaskEditor_Conditional_1_Template, 46, 14);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_0_0 = ctx.unitTask) ? 1 : -1, tmp_0_0);
    }
  }, dependencies: [
    CommonModule,
    ReactiveFormsModule,
    DefaultValueAccessor,
    NumberValueAccessor,
    NgControlStatus,
    MinValidator,
    FormControlDirective,
    FormsModule,
    NgModel,
    MatCardModule,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatIconModule,
    MatIcon,
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatFormFieldModule,
    MatFormField,
    MatSelectModule,
    MatSelect,
    MatOption,
    MatInputModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
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
    MatSortModule,
    MatSort,
    MatSortHeader,
    MatTooltipModule,
    MatTooltip,
    MatButtonToggleModule,
    DatePipe
  ], styles: ["\n\n.task-assignments[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 8px;\n  margin-top: 4px;\n  padding: 8px;\n  background-color: #f5f5f5;\n  border-radius: 4px;\n}\n.task-assignments[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.task-assignments[_ngcontent-%COMP%]   .remove-button-container[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n  display: flex;\n  justify-content: flex-end;\n}\n.task-assignments[_ngcontent-%COMP%]   .task-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.task-assignments[_ngcontent-%COMP%]   .task-item[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: rgba(0, 0, 0, 0.6);\n}\n.task-assignments[_ngcontent-%COMP%]   .task-item[_ngcontent-%COMP%]   .task-select[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.task-assignments[_ngcontent-%COMP%]   .task-item[_ngcontent-%COMP%]   .task-select[_ngcontent-%COMP%]     .mat-mdc-text-field-wrapper {\n  background-color: white;\n}\n.task-assignments[_ngcontent-%COMP%]   .task-item[_ngcontent-%COMP%]   .task-select[_ngcontent-%COMP%]     .mat-mdc-form-field-subscript-wrapper {\n  display: none;\n}\n.editable-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.editable-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]   .value-text[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.editable-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]   .edit-btn[_ngcontent-%COMP%] {\n  opacity: 0;\n  transition: opacity 0.2s;\n  width: 32px;\n  height: 32px;\n}\n.editable-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]   .edit-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.editable-cell[_ngcontent-%COMP%]:hover   .view-mode[_ngcontent-%COMP%]   .edit-btn[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .inline-input[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 4px 8px;\n  border: 1px solid #2196f3;\n  border-radius: 4px;\n  font-size: 14px;\n  background-color: #f5f5f5;\n}\n.editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .inline-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #1976d2;\n}\n.editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .save-btn[_ngcontent-%COMP%], \n.editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n}\n.editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .save-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], \n.editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .save-btn[_ngcontent-%COMP%] {\n  color: #4caf50;\n}\n.editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%] {\n  color: #f44336;\n}\n/*# sourceMappingURL=OneUnitTaskEditor.component.css.map */", '@charset "UTF-8";\n\n\n\n[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  overflow: hidden;\n}\n.main-content[_ngcontent-%COMP%] {\n  padding: 24px;\n  width: 95%;\n  flex: 1;\n  min-height: 0;\n  overflow-y: auto;\n}\n.unit-details-card[_ngcontent-%COMP%] {\n  width: 100%;\n  margin: 0 0 20px 0;\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);\n}\n.unit-info-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 16px;\n  margin-bottom: 16px;\n}\n.info-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.info-item.inline[_ngcontent-%COMP%] {\n  flex-direction: row;\n  align-items: center;\n  gap: 8px;\n}\n.info-item.full-width[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n}\n.info-item.comment[_ngcontent-%COMP%] {\n  flex-direction: column;\n  gap: 8px;\n}\n.info-item.comment[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  word-wrap: break-word;\n  word-break: break-word;\n  white-space: pre-wrap;\n  max-width: 100%;\n  overflow-wrap: break-word;\n  -webkit-hyphens: auto;\n  hyphens: auto;\n}\n.info-item[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: rgba(0, 0, 0, 0.6);\n  font-size: 14px;\n  font-weight: 500;\n}\n.info-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 400;\n}\n@media (max-width: 768px) {\n  .main-content[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .unit-info-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .empty-state[_ngcontent-%COMP%] {\n    padding: 32px 16px;\n  }\n  .empty-icon[_ngcontent-%COMP%] {\n    font-size: 48px;\n    width: 48px;\n    height: 48px;\n  }\n}\n.sections-accordion[_ngcontent-%COMP%] {\n  max-width: 900px;\n  margin: 0 auto;\n}\n.unit-section-panel[_ngcontent-%COMP%] {\n  margin-bottom: 8px;\n}\n.unit-section-panel[_ngcontent-%COMP%]   .mat-expansion-panel-header[_ngcontent-%COMP%]   .mat-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n.unit-section-panel[_ngcontent-%COMP%]   mat-panel-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  font-size: 1rem;\n  font-weight: 500;\n}\n.unit-section-panel[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  margin-right: 12px;\n}\n.section-content[_ngcontent-%COMP%] {\n  padding: 0;\n  max-height: 60vh;\n  overflow: auto;\n}\n.section-content[_ngcontent-%COMP%]   .todo-placeholder[_ngcontent-%COMP%] {\n  margin: 16px;\n}\n.section-content[_ngcontent-%COMP%] {\n}\n.todo-placeholder[_ngcontent-%COMP%] {\n  color: #9e9e9e;\n  padding: 15px;\n  border: 1px dashed #e0e0e0;\n  border-radius: 4px;\n  font-style: italic;\n  background-color: #fafafa;\n  margin: 0;\n}\n/*# sourceMappingURL=UnitContent.component.css.map */', "\n\n[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  width: 100%;\n  overflow: hidden;\n}\n.table-container[_ngcontent-%COMP%] {\n  flex: 1 1 auto;\n  overflow: auto;\n  border: 1px solid #ccc;\n}\n.table-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%] {\n  width: 100%;\n  min-width: 800px;\n}\n.action-container[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  align-items: flex-end;\n  flex-wrap: wrap;\n  margin-bottom: 16px;\n  padding: 8px;\n  background: #f5f5f5;\n  border-radius: 8px;\n}\n.action-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.soldier-name[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.fio[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #1976d2;\n}\n.nickname[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #666;\n  font-style: italic;\n}\n.assigned-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  color: #ff9800;\n  margin-left: 4px;\n}\n.state-badge[_ngcontent-%COMP%] {\n  padding: 4px 8px;\n  border-radius: 12px;\n  font-size: 12px;\n  font-weight: 500;\n  background-color: #e3f2fd;\n  color: #1976d2;\n  border: 1px solid #bbdefb;\n}\n.comment-cell[_ngcontent-%COMP%] {\n  max-width: 200px;\n  width: 200px;\n}\n.comment-text[_ngcontent-%COMP%] {\n  display: block;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  max-width: 100%;\n  cursor: help;\n}\n.assigned-unit-cell[_ngcontent-%COMP%], \n.unit-cell[_ngcontent-%COMP%], \n.involved-unit-cell[_ngcontent-%COMP%] {\n  padding: 4px 8px !important;\n}\n.assigned-unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%], \n.unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%], \n.involved-unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  min-height: 32px;\n}\n.assigned-unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]   .unit-text[_ngcontent-%COMP%], \n.unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]   .unit-text[_ngcontent-%COMP%], \n.involved-unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]   .unit-text[_ngcontent-%COMP%] {\n  flex: 1;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.assigned-unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]   .edit-btn[_ngcontent-%COMP%], \n.unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]   .edit-btn[_ngcontent-%COMP%], \n.involved-unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]   .edit-btn[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  line-height: 28px;\n  opacity: 0;\n  transition: opacity 0.2s;\n}\n.assigned-unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]   .edit-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], \n.unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]   .edit-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], \n.involved-unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]   .edit-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n  line-height: 18px;\n}\n.assigned-unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]:hover   .edit-btn[_ngcontent-%COMP%], \n.unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]:hover   .edit-btn[_ngcontent-%COMP%], \n.involved-unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]:hover   .edit-btn[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.assigned-unit-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%], \n.unit-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%], \n.involved-unit-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.assigned-unit-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%], \n.unit-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%], \n.involved-unit-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  line-height: 28px;\n  flex-shrink: 0;\n}\n.assigned-unit-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], \n.unit-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], \n.involved-unit-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n  line-height: 18px;\n}\n.assigned-unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%], \n.unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%], \n.involved-unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%] {\n  flex: 1;\n  margin: 0;\n  font-size: 14px;\n}\n.assigned-unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%]     .mat-mdc-text-field-wrapper, \n.unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%]     .mat-mdc-text-field-wrapper, \n.involved-unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%]     .mat-mdc-text-field-wrapper {\n  padding: 0;\n}\n.assigned-unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%]     .mat-mdc-form-field-flex, \n.unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%]     .mat-mdc-form-field-flex, \n.involved-unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%]     .mat-mdc-form-field-flex {\n  padding: 4px 8px;\n  min-height: 32px;\n}\n.assigned-unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%]     .mat-mdc-form-field-infix, \n.unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%]     .mat-mdc-form-field-infix, \n.involved-unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%]     .mat-mdc-form-field-infix {\n  padding-top: 4px;\n  padding-bottom: 4px;\n  min-height: 24px;\n}\n.assigned-unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%]     .mat-mdc-form-field-subscript-wrapper, \n.unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%]     .mat-mdc-form-field-subscript-wrapper, \n.involved-unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%]     .mat-mdc-form-field-subscript-wrapper {\n  display: none;\n}\n@media (max-width: 768px) {\n  .mat-column-comment[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n@media (max-width: 600px) {\n  .mat-column-assignedUnitShortName[_ngcontent-%COMP%], \n   .mat-column-positionValue[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n.mat-mdc-row[_ngcontent-%COMP%] {\n  transition: background-color 0.2s ease;\n}\n.mat-mdc-row.row-critical[_ngcontent-%COMP%] {\n  background-color: #ffebee !important;\n}\n.mat-mdc-row.row-critical[_ngcontent-%COMP%]:hover {\n  background-color: #ffcdd2 !important;\n}\n.mat-mdc-row.row-critical[_ngcontent-%COMP%]   .state-badge[_ngcontent-%COMP%] {\n  background-color: #b71c1c;\n  color: white;\n  border-color: #b71c1c;\n}\n.mat-mdc-row.row-severe[_ngcontent-%COMP%] {\n  background-color: #fff3e0 !important;\n}\n.mat-mdc-row.row-severe[_ngcontent-%COMP%]:hover {\n  background-color: #ffe0b2 !important;\n}\n.mat-mdc-row.row-severe[_ngcontent-%COMP%]   .state-badge[_ngcontent-%COMP%] {\n  background-color: #ef6c00;\n  color: white;\n  border-color: #ef6c00;\n}\n.mat-mdc-row.row-problematic[_ngcontent-%COMP%] {\n  background-color: #fffde7 !important;\n}\n.mat-mdc-row.row-problematic[_ngcontent-%COMP%]:hover {\n  background-color: #fff9c4 !important;\n}\n.mat-mdc-row.row-problematic[_ngcontent-%COMP%]   .state-badge[_ngcontent-%COMP%] {\n  background-color: #f57f17;\n  color: white;\n  border-color: #f57f17;\n}\n.mat-mdc-row.row-recovery[_ngcontent-%COMP%] {\n  background-color: #e8f5e9 !important;\n}\n.mat-mdc-row.row-recovery[_ngcontent-%COMP%]:hover {\n  background-color: #c8e6c9 !important;\n}\n.mat-mdc-row.row-recovery[_ngcontent-%COMP%]   .state-badge[_ngcontent-%COMP%] {\n  background-color: #2e7d32;\n  color: white;\n  border-color: #2e7d32;\n}\n.mat-mdc-row.row-seconded[_ngcontent-%COMP%] {\n  background-color: #fffde7 !important;\n}\n.mat-mdc-row.row-seconded[_ngcontent-%COMP%]:hover {\n  background-color: #fff9c4 !important;\n}\n/*# sourceMappingURL=Soldier.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OneUnitTaskEditor, [{
    type: Component,
    args: [{ selector: "app-one-unit-task-editor", standalone: true, imports: [
      CommonModule,
      ReactiveFormsModule,
      FormsModule,
      MatCardModule,
      MatIconModule,
      MatButtonModule,
      MatFormFieldModule,
      MatSelectModule,
      MatInputModule,
      MatAutocompleteModule,
      MatExpansionModule,
      MatTableModule,
      MatSortModule,
      DatePipe,
      MatTooltipModule,
      MatButtonToggleModule
    ], template: `<div class="main-content">
  @if (unitTask; as unit) {
    @let readOnly = unit.isPublished;
    <!-- \u0414\u0435\u0442\u0430\u043B\u044C\u043D\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u043E \u043F\u043E\u0434\u0440\u0430\u0437\u0434\u0435\u043B\u0435\u043D\u0438\u0438 -->
    <mat-card class="unit-details-card">
      <mat-card-header>
        <mat-card-title class="info-item inline">
          {{ unit.unitShortName }}
          @if (unit.isInvolved) {
            <mat-icon>groups</mat-icon>
            <span>\u0415\u043A\u0456\u043F\u0430\u0436/\u0413\u0440\u0443\u043F\u0430</span>
          }

          <div>
            @if(unit.isPublished) {
              <mat-icon color="primary">check_circle</mat-icon>
              <span>\u041E\u043F\u0443\u0431\u043B\u0456\u043A\u043E\u0432\u0430\u043D\u043E</span>
            } @else {
              <mat-icon color="warn">edit</mat-icon>
              <span>\u0427\u0435\u0440\u043D\u0435\u0442\u043A\u0430</span>
            }
          </div>

          <div class="remove-button-container">
            <button
              mat-icon-button
              matTooltip="\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u0437\u0456 \u0441\u043F\u0438\u0441\u043A\u0443"
              [disabled]="readOnly"
              (click)="onRemoveClick()"
              class="remove-button"
            >
              <mat-icon color="warn">remove_circle</mat-icon>
            </button>
          </div>
        </mat-card-title>
      </mat-card-header>

      <mat-card-content>
        <div class="unit-info-grid">
          @if (unit.parentShortName) {
            <div class="info-item inline">
              <strong>\u0411\u0430\u0442\u044C\u043A\u0456\u0432\u0441\u044C\u043A\u0438\u0439:</strong>
              <span>{{ unit.parentShortName }}</span>
            </div>
          }
          @if (!unit.isInvolved) {
            @if (unit.assignedShortName) {
              <div class="info-item inline">
                <strong>\u041F\u0440\u0438\u0434\u0430\u043D\u0438\u0439 \u0434\u043E:</strong>
                <span>{{ unit.assignedShortName }}</span>
              </div>
            }
          }

          <div class="info-item inline">
            <strong>\u041F\u041F\u0414:</strong>
            <span>{{ unit.persistentLocationValue || '\u041D\u0435 \u0432\u043A\u0430\u0437\u0430\u043D\u043E' }}</span>
          </div>
        </div>

        <div class="task-assignments">
          <div class="task-item">
            <strong>\u0417\u0430\u0432\u0434\u0430\u043D\u043D\u044F:</strong>
            <mat-form-field appearance="outline" class="task-select">
              <mat-select
                placeholder="\u041E\u0431\u0435\u0440\u0456\u0442\u044C \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F"
                [formControl]="taskControl"
                (selectionChange)="onTaskChange($event.value)"
                [disabled]="readOnly"
              >
                @for (task of unitTasks(); track task.id) {
                  <mat-option [value]="task"
                    >{{ task.value }} ({{ task.areaType }}
                    {{ task.withMeans ? '\u0417\u0430\u0441\u043E\u0431\u0438' : '' }})</mat-option
                  >
                }
              </mat-select>
            </mat-form-field>
          </div>
          <div class="task-item">
            <strong>\u0420\u0412\u0417 (\u0420\u0430\u0439\u043E\u043D \u0432\u0438\u043A\u043E\u043D\u0430\u043D\u043D\u044F \u0437\u0430\u0432\u0434\u0430\u043D\u044C):</strong>
            <mat-form-field appearance="outline" class="task-select">
              <mat-select
                placeholder="\u041E\u0431\u0435\u0440\u0456\u0442\u044C \u0420\u0412\u0417"
                [formControl]="areaControl"
                (selectionChange)="onAreaChange($event.value)"
                [disabled]="readOnly"
              >
                @for (area of areas(); track area.id) {
                  <mat-option [value]="area">{{ area.value }}</mat-option>
                }
              </mat-select>
            </mat-form-field>
          </div>
        </div>
      </mat-card-content>
    </mat-card>

    <mat-accordion class="sections-accordion">
      <!-- \u0417\u0430\u0441\u043E\u0431\u0438 (\u0414\u0440\u043E\u043D\u0438) - \u043F\u043E\u043A\u0430\u0437\u0443\u0454\u043C\u043E \u0442\u0456\u043B\u044C\u043A\u0438 \u044F\u043A\u0449\u043E \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F \u043C\u0430\u0454 withMeans = true -->
      @if (taskControl.value?.withMeans) {
        <mat-expansion-panel class="unit-section-panel" (opened)="loadMeans()">
          <mat-expansion-panel-header>
            <mat-panel-title>
              <mat-icon color="primary">flight</mat-icon>
              \u0417\u0430\u0441\u043E\u0431\u0438
            </mat-panel-title>
          </mat-expansion-panel-header>

          <div class="section-content">
            <div class="action-container">
              <div class="action-buttons">
                <button mat-raised-button color="accent" (click)="addMean()" [disabled]="readOnly">
                  <mat-icon>add</mat-icon>
                  \u0414\u043E\u0434\u0430\u0442\u0438 \u0437\u0430\u0441\u0456\u0431
                </button>
              </div>
            </div>
            @if (isLoadingMeans()) {
              <div class="loading-indicator">
                <mat-icon>hourglass_empty</mat-icon>
                \u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F...
              </div>
            } @else {
              @if (means().length === 0) {
                <div class="empty-list">
                  <mat-icon>flight</mat-icon>
                  <p>\u0417\u0430\u0441\u043E\u0431\u0438 \u043D\u0435 \u0434\u043E\u0434\u0430\u043D\u043E</p>
                </div>
              } @else {
                <table mat-table [dataSource]="meansDataSource" class="mat-elevation-z8">
                  <!-- Actions Column -->
                  <ng-container matColumnDef="actions">
                    <th mat-header-cell *matHeaderCellDef style="width: 80px">\u0414\u0456\u0457</th>
                    <td mat-cell *matCellDef="let mean">
                      <button
                        mat-icon-button
                        color="warn"
                        matTooltip="\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u0437\u0430\u0441\u0456\u0431"
                        [disabled]="isSavingMeans() || readOnly"
                        (click)="deleteMean(mean)"
                      >
                        <mat-icon>delete</mat-icon>
                      </button>
                    </td>
                  </ng-container>

                  <!-- DroneModel Column -->
                  <ng-container matColumnDef="droneModelValue">
                    <th mat-header-cell *matHeaderCellDef>\u041C\u043E\u0434\u0435\u043B\u044C \u0411\u041F\u041B\u0410</th>
                    <td mat-cell *matCellDef="let mean">{{ mean.droneModelValue }}</td>
                  </ng-container>

                  <!-- DroneType Column -->
                  <ng-container matColumnDef="droneTypeName">
                    <th mat-header-cell *matHeaderCellDef>\u0422\u0438\u043F</th>
                    <td mat-cell *matCellDef="let mean">{{ mean.droneTypeName }}</td>
                  </ng-container>

                  <!-- Quantity Column -->
                  <ng-container matColumnDef="quantity">
                    <th mat-header-cell *matHeaderCellDef>\u041A\u0456\u043B\u044C\u043A\u0456\u0441\u0442\u044C</th>
                    <td mat-cell *matCellDef="let mean" class="editable-cell">
                      @if (isEditingMean(mean.id || mean.droneModelId, 'quantity')) {
                        <!-- \u0420\u0435\u0436\u0438\u043C \u0440\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u043D\u043D\u044F -->
                        <div class="edit-mode">
                          <input
                            type="number"
                            [(ngModel)]="editingMeanValue"
                            (ngModelChange)="updateEditingMeanValue($event)"
                            (click)="$event.stopPropagation()"
                            (keydown.enter)="saveMeanFieldChange(mean, 'quantity', $event)"
                            (keydown.escape)="cancelEditingMean($event)"
                            class="inline-input"
                            min="1"
                            [disabled]="isSavingMeans()"
                            autofocus
                          />
                          <button
                            mat-icon-button
                            class="save-btn"
                            [disabled]="isSavingMeans()"
                            (click)="saveMeanFieldChange(mean, 'quantity', $event)"
                            matTooltip="\u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438"
                          >
                            <mat-icon>check</mat-icon>
                          </button>
                          <button
                            mat-icon-button
                            class="cancel-btn"
                            [disabled]="isSavingMeans()"
                            (click)="cancelEditingMean($event)"
                            matTooltip="\u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438"
                          >
                            <mat-icon>close</mat-icon>
                          </button>
                        </div>
                      } @else {
                        <!-- \u0420\u0435\u0436\u0438\u043C \u043F\u0435\u0440\u0435\u0433\u043B\u044F\u0434\u0443 -->
                        <div class="view-mode">
                          <span class="value-text">{{ mean.quantity }}</span>
                          <button
                            mat-icon-button
                            class="edit-btn"
                            [disabled]="readOnly || isSavingMeans()"
                            (click)="startEditingMean(mean, 'quantity', $event)"
                            matTooltip="\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438"
                          >
                            <mat-icon>edit</mat-icon>
                          </button>
                        </div>
                      }
                    </td>
                  </ng-container>

                  <tr mat-header-row *matHeaderRowDef="meansDisplayedColumns"></tr>
                  <tr mat-row *matRowDef="let row; columns: meansDisplayedColumns"></tr>
                </table>
              }
            }
          </div>
        </mat-expansion-panel>
      }

      <!-- \u041E\u0441\u043E\u0431\u043E\u0432\u0438\u0439 \u0441\u043A\u043B\u0430\u0434 -->
      <mat-expansion-panel class="unit-section-panel" (opened)="onSoldiersPanelOpened()">
        <mat-expansion-panel-header>
          <mat-panel-title>
            <mat-icon color="primary">group</mat-icon>
            \u041E\u0441\u043E\u0431\u043E\u0432\u0438\u0439 \u0441\u043A\u043B\u0430\u0434
          </mat-panel-title>
        </mat-expansion-panel-header>

        @if (soldiersPanelOpened()) {
          <div class="section-content">
            <div class="action-container">
              <div class="action-buttons">
                <button mat-raised-button color="primary" (click)="reloadSoldiers()">
                  <mat-icon>refresh</mat-icon>
                  \u041E\u043D\u043E\u0432\u0438\u0442\u0438
                </button>
              </div>
            </div>

            @if (isLoadingSoldiers()) {
              <div class="loading-indicator">
                <mat-icon>hourglass_empty</mat-icon>
                \u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F...
              </div>
            } @else {
              @if (soldiers().length === 0) {
                <div class="empty-list">
                  <mat-icon>group</mat-icon>
                  <p>\u041E\u0441\u043E\u0431\u043E\u0432\u0438\u0439 \u0441\u043A\u043B\u0430\u0434 \u0432\u0456\u0434\u0441\u0443\u0442\u043D\u0456\u0439</p>
                </div>
              } @else {
                <table
                  mat-table
                  [dataSource]="soldierDataSource"
                  matSort
                  class="mat-elevation-z8"
                  style="width: 100%; margin-top: 1em"
                >
                  <ng-container matColumnDef="unitTag">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header>?</th>
                    <td mat-cell *matCellDef="let soldier">
                      {{ unitTagTitle(soldier) }}
                    </td>
                  </ng-container>

                  <!-- FIO Column -->
                  <ng-container matColumnDef="fio">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header>\u041F\u0406\u0411</th>
                    <td mat-cell *matCellDef="let soldier">
                      <span class="fio">{{ getSoldierFIO(soldier) }}</span>
                    </td>
                  </ng-container>

                  <!-- NickName Column -->
                  <ng-container matColumnDef="nickName">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header>\u041F\u043E\u0437\u0438\u0432\u043D\u0438\u0439</th>
                    <td mat-cell *matCellDef="let soldier">{{ soldier.nickName || '-' }}</td>
                  </ng-container>

                  <!-- Rank Column -->
                  <ng-container matColumnDef="rankShortValue">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header>\u0417\u0432\u0430\u043D\u043D\u044F</th>
                    <td mat-cell *matCellDef="let soldier">{{ soldier.rankShortValue }}</td>
                  </ng-container>

                  <!-- Position Column -->
                  <ng-container matColumnDef="positionValue">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header>\u041F\u043E\u0441\u0430\u0434\u0430</th>
                    <td mat-cell *matCellDef="let soldier">{{ soldier.positionValue }}</td>
                  </ng-container>

                  <!-- State Column -->
                  <ng-container matColumnDef="stateValue">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header>\u0421\u0442\u0430\u0442\u0443\u0441</th>
                    <td mat-cell *matCellDef="let soldier">
                      <span class="state-badge">{{ soldier.stateValue }}</span>
                    </td>
                  </ng-container>

                  <!-- Unit Column -->
                  <ng-container matColumnDef="unitShortName">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header>\u041F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B</th>
                    <td mat-cell *matCellDef="let soldier">
                      <span class="unit-text">{{ soldier.unitShortName }}</span>
                    </td>
                  </ng-container>

                  <!-- Assigned Unit Column -->
                  <ng-container matColumnDef="assignedUnitShortName">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header>\u041F\u0440\u0438\u0434\u0430\u043D\u0438\u0439 \u0434\u043E</th>
                    <td mat-cell *matCellDef="let soldier">
                      <span class="unit-text">{{ soldier.assignedUnitShortName || '-' }}</span>
                    </td>
                  </ng-container>

                  <!-- Involved Unit Column -->
                  <ng-container matColumnDef="involvedUnitShortName">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header>\u0415\u043A\u0456\u043F\u0430\u0436/\u0413\u0440\u0443\u043F\u0430</th>
                    <td mat-cell *matCellDef="let soldier">
                      <span class="unit-text">{{ soldier.involvedUnitShortName || '-' }}</span>
                    </td>
                  </ng-container>

                  <!-- ArrivedAt Column -->
                  <ng-container matColumnDef="arrivedAt">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header>\u041F\u0440\u0438\u0431\u0443\u0432</th>
                    <td mat-cell *matCellDef="let soldier">
                      {{ soldier.arrivedAt | date: 'dd.MM.yyyy' }}
                    </td>
                  </ng-container>

                  <!-- DepartedAt Column -->
                  <ng-container matColumnDef="departedAt">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header>\u0412\u0438\u0431\u0443\u0432</th>
                    <td mat-cell *matCellDef="let soldier">
                      {{ soldier.departedAt ? (soldier.departedAt | date: 'dd.MM.yyyy') : '-' }}
                    </td>
                  </ng-container>

                  <!-- Comment Column -->
                  <ng-container matColumnDef="comment">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header>\u041A\u043E\u043C\u0435\u043D\u0442\u0430\u0440</th>
                    <td mat-cell *matCellDef="let soldier" class="comment-cell">
                      <span
                        class="comment-text"
                        [matTooltip]="
                          soldier.comment && soldier.comment.length > 50 ? soldier.comment : ''
                        "
                        [title]="
                          soldier.comment && soldier.comment.length > 50 ? soldier.comment : ''
                        "
                      >
                        {{ soldier.comment || '' }}
                      </span>
                    </td>
                  </ng-container>

                  <tr mat-header-row *matHeaderRowDef="soldierDisplayedColumns"></tr>
                  <tr
                    mat-row
                    *matRowDef="let row; columns: soldierDisplayedColumns"
                    [class]="getRowClass(row)"
                  ></tr>
                </table>
              }
            }
          </div>
        }
      </mat-expansion-panel>
    </mat-accordion>
  }
</div>
`, styles: ["/* src/app/DocumentDataSet/Components/OneUnitTaskEditor.component.scss */\n.task-assignments {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 8px;\n  margin-top: 4px;\n  padding: 8px;\n  background-color: #f5f5f5;\n  border-radius: 4px;\n}\n.task-assignments > div {\n  min-width: 0;\n}\n.task-assignments .remove-button-container {\n  grid-column: 1/-1;\n  display: flex;\n  justify-content: flex-end;\n}\n.task-assignments .task-item {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.task-assignments .task-item strong {\n  font-size: 14px;\n  color: rgba(0, 0, 0, 0.6);\n}\n.task-assignments .task-item .task-select {\n  width: 100%;\n}\n.task-assignments .task-item .task-select ::ng-deep .mat-mdc-text-field-wrapper {\n  background-color: white;\n}\n.task-assignments .task-item .task-select ::ng-deep .mat-mdc-form-field-subscript-wrapper {\n  display: none;\n}\n.editable-cell .view-mode {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.editable-cell .view-mode .value-text {\n  flex: 1;\n}\n.editable-cell .view-mode .edit-btn {\n  opacity: 0;\n  transition: opacity 0.2s;\n  width: 32px;\n  height: 32px;\n}\n.editable-cell .view-mode .edit-btn mat-icon {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.editable-cell:hover .view-mode .edit-btn {\n  opacity: 1;\n}\n.editable-cell .edit-mode {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.editable-cell .edit-mode .inline-input {\n  flex: 1;\n  padding: 4px 8px;\n  border: 1px solid #2196f3;\n  border-radius: 4px;\n  font-size: 14px;\n  background-color: #f5f5f5;\n}\n.editable-cell .edit-mode .inline-input:focus {\n  outline: none;\n  border-color: #1976d2;\n}\n.editable-cell .edit-mode .save-btn,\n.editable-cell .edit-mode .cancel-btn {\n  width: 32px;\n  height: 32px;\n}\n.editable-cell .edit-mode .save-btn mat-icon,\n.editable-cell .edit-mode .cancel-btn mat-icon {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.editable-cell .edit-mode .save-btn {\n  color: #4caf50;\n}\n.editable-cell .edit-mode .cancel-btn {\n  color: #f44336;\n}\n/*# sourceMappingURL=OneUnitTaskEditor.component.css.map */\n", '@charset "UTF-8";\n\n/* src/app/Unit/UnitContent.component.scss */\n:host {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  overflow: hidden;\n}\n.main-content {\n  padding: 24px;\n  width: 95%;\n  flex: 1;\n  min-height: 0;\n  overflow-y: auto;\n}\n.unit-details-card {\n  width: 100%;\n  margin: 0 0 20px 0;\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);\n}\n.unit-info-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 16px;\n  margin-bottom: 16px;\n}\n.info-item {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.info-item.inline {\n  flex-direction: row;\n  align-items: center;\n  gap: 8px;\n}\n.info-item.full-width {\n  grid-column: 1/-1;\n}\n.info-item.comment {\n  flex-direction: column;\n  gap: 8px;\n}\n.info-item.comment span {\n  word-wrap: break-word;\n  word-break: break-word;\n  white-space: pre-wrap;\n  max-width: 100%;\n  overflow-wrap: break-word;\n  -webkit-hyphens: auto;\n  hyphens: auto;\n}\n.info-item strong {\n  color: rgba(0, 0, 0, 0.6);\n  font-size: 14px;\n  font-weight: 500;\n}\n.info-item span {\n  font-size: 16px;\n  font-weight: 400;\n}\n@media (max-width: 768px) {\n  .main-content {\n    padding: 16px;\n  }\n  .unit-info-grid {\n    grid-template-columns: 1fr;\n  }\n  .empty-state {\n    padding: 32px 16px;\n  }\n  .empty-icon {\n    font-size: 48px;\n    width: 48px;\n    height: 48px;\n  }\n}\n.sections-accordion {\n  max-width: 900px;\n  margin: 0 auto;\n}\n.unit-section-panel {\n  margin-bottom: 8px;\n}\n.unit-section-panel .mat-expansion-panel-header .mat-content {\n  display: flex;\n  align-items: center;\n}\n.unit-section-panel mat-panel-title {\n  display: flex;\n  align-items: center;\n  font-size: 1rem;\n  font-weight: 500;\n}\n.unit-section-panel mat-icon {\n  margin-right: 12px;\n}\n.section-content {\n  padding: 0;\n  max-height: 60vh;\n  overflow: auto;\n}\n.section-content .todo-placeholder {\n  margin: 16px;\n}\n.section-content {\n}\n.todo-placeholder {\n  color: #9e9e9e;\n  padding: 15px;\n  border: 1px dashed #e0e0e0;\n  border-radius: 4px;\n  font-style: italic;\n  background-color: #fafafa;\n  margin: 0;\n}\n/*# sourceMappingURL=UnitContent.component.css.map */\n', "/* src/app/Soldier/Soldier.component.scss */\n:host {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  width: 100%;\n  overflow: hidden;\n}\n.table-container {\n  flex: 1 1 auto;\n  overflow: auto;\n  border: 1px solid #ccc;\n}\n.table-container table {\n  width: 100%;\n  min-width: 800px;\n}\n.action-container {\n  display: flex;\n  gap: 16px;\n  align-items: flex-end;\n  flex-wrap: wrap;\n  margin-bottom: 16px;\n  padding: 8px;\n  background: #f5f5f5;\n  border-radius: 8px;\n}\n.action-buttons {\n  display: flex;\n  gap: 8px;\n}\n.soldier-name {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.fio {\n  font-weight: 500;\n  color: #1976d2;\n}\n.nickname {\n  font-size: 12px;\n  color: #666;\n  font-style: italic;\n}\n.assigned-icon {\n  font-size: 16px;\n  color: #ff9800;\n  margin-left: 4px;\n}\n.state-badge {\n  padding: 4px 8px;\n  border-radius: 12px;\n  font-size: 12px;\n  font-weight: 500;\n  background-color: #e3f2fd;\n  color: #1976d2;\n  border: 1px solid #bbdefb;\n}\n.comment-cell {\n  max-width: 200px;\n  width: 200px;\n}\n.comment-text {\n  display: block;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  max-width: 100%;\n  cursor: help;\n}\n.assigned-unit-cell,\n.unit-cell,\n.involved-unit-cell {\n  padding: 4px 8px !important;\n}\n.assigned-unit-cell .view-mode,\n.unit-cell .view-mode,\n.involved-unit-cell .view-mode {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  min-height: 32px;\n}\n.assigned-unit-cell .view-mode .unit-text,\n.unit-cell .view-mode .unit-text,\n.involved-unit-cell .view-mode .unit-text {\n  flex: 1;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.assigned-unit-cell .view-mode .edit-btn,\n.unit-cell .view-mode .edit-btn,\n.involved-unit-cell .view-mode .edit-btn {\n  width: 28px;\n  height: 28px;\n  line-height: 28px;\n  opacity: 0;\n  transition: opacity 0.2s;\n}\n.assigned-unit-cell .view-mode .edit-btn mat-icon,\n.unit-cell .view-mode .edit-btn mat-icon,\n.involved-unit-cell .view-mode .edit-btn mat-icon {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n  line-height: 18px;\n}\n.assigned-unit-cell .view-mode:hover .edit-btn,\n.unit-cell .view-mode:hover .edit-btn,\n.involved-unit-cell .view-mode:hover .edit-btn {\n  opacity: 1;\n}\n.assigned-unit-cell .edit-mode,\n.unit-cell .edit-mode,\n.involved-unit-cell .edit-mode {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.assigned-unit-cell .edit-mode .cancel-btn,\n.unit-cell .edit-mode .cancel-btn,\n.involved-unit-cell .edit-mode .cancel-btn {\n  width: 28px;\n  height: 28px;\n  line-height: 28px;\n  flex-shrink: 0;\n}\n.assigned-unit-cell .edit-mode .cancel-btn mat-icon,\n.unit-cell .edit-mode .cancel-btn mat-icon,\n.involved-unit-cell .edit-mode .cancel-btn mat-icon {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n  line-height: 18px;\n}\n.assigned-unit-cell .inline-field,\n.unit-cell .inline-field,\n.involved-unit-cell .inline-field {\n  flex: 1;\n  margin: 0;\n  font-size: 14px;\n}\n.assigned-unit-cell .inline-field ::ng-deep .mat-mdc-text-field-wrapper,\n.unit-cell .inline-field ::ng-deep .mat-mdc-text-field-wrapper,\n.involved-unit-cell .inline-field ::ng-deep .mat-mdc-text-field-wrapper {\n  padding: 0;\n}\n.assigned-unit-cell .inline-field ::ng-deep .mat-mdc-form-field-flex,\n.unit-cell .inline-field ::ng-deep .mat-mdc-form-field-flex,\n.involved-unit-cell .inline-field ::ng-deep .mat-mdc-form-field-flex {\n  padding: 4px 8px;\n  min-height: 32px;\n}\n.assigned-unit-cell .inline-field ::ng-deep .mat-mdc-form-field-infix,\n.unit-cell .inline-field ::ng-deep .mat-mdc-form-field-infix,\n.involved-unit-cell .inline-field ::ng-deep .mat-mdc-form-field-infix {\n  padding-top: 4px;\n  padding-bottom: 4px;\n  min-height: 24px;\n}\n.assigned-unit-cell .inline-field ::ng-deep .mat-mdc-form-field-subscript-wrapper,\n.unit-cell .inline-field ::ng-deep .mat-mdc-form-field-subscript-wrapper,\n.involved-unit-cell .inline-field ::ng-deep .mat-mdc-form-field-subscript-wrapper {\n  display: none;\n}\n@media (max-width: 768px) {\n  .mat-column-comment {\n    display: none;\n  }\n}\n@media (max-width: 600px) {\n  .mat-column-assignedUnitShortName,\n  .mat-column-positionValue {\n    display: none;\n  }\n}\n.mat-mdc-row {\n  transition: background-color 0.2s ease;\n}\n.mat-mdc-row.row-critical {\n  background-color: #ffebee !important;\n}\n.mat-mdc-row.row-critical:hover {\n  background-color: #ffcdd2 !important;\n}\n.mat-mdc-row.row-critical .state-badge {\n  background-color: #b71c1c;\n  color: white;\n  border-color: #b71c1c;\n}\n.mat-mdc-row.row-severe {\n  background-color: #fff3e0 !important;\n}\n.mat-mdc-row.row-severe:hover {\n  background-color: #ffe0b2 !important;\n}\n.mat-mdc-row.row-severe .state-badge {\n  background-color: #ef6c00;\n  color: white;\n  border-color: #ef6c00;\n}\n.mat-mdc-row.row-problematic {\n  background-color: #fffde7 !important;\n}\n.mat-mdc-row.row-problematic:hover {\n  background-color: #fff9c4 !important;\n}\n.mat-mdc-row.row-problematic .state-badge {\n  background-color: #f57f17;\n  color: white;\n  border-color: #f57f17;\n}\n.mat-mdc-row.row-recovery {\n  background-color: #e8f5e9 !important;\n}\n.mat-mdc-row.row-recovery:hover {\n  background-color: #c8e6c9 !important;\n}\n.mat-mdc-row.row-recovery .state-badge {\n  background-color: #2e7d32;\n  color: white;\n  border-color: #2e7d32;\n}\n.mat-mdc-row.row-seconded {\n  background-color: #fffde7 !important;\n}\n.mat-mdc-row.row-seconded:hover {\n  background-color: #fff9c4 !important;\n}\n/*# sourceMappingURL=Soldier.component.css.map */\n"] }]
  }], null, { remove: [{
    type: Output
  }], unitChange: [{
    type: Output
  }], unsavedChangesChange: [{
    type: Output
  }], sort: [{
    type: ViewChild,
    args: [MatSort]
  }], unitTask: [{
    type: Input,
    args: [{ required: true }]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OneUnitTaskEditor, { className: "OneUnitTaskEditor", filePath: "app/DocumentDataSet/Components/OneUnitTaskEditor.component.ts", lineNumber: 86 });
})();

// src/app/dialogs/CreateDataSet-dialog.component.ts
function CreateDataSetDialogComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-form-field", 4)(1, "mat-label");
    \u0275\u0275text(2, "\u0414\u0430\u0442\u0430 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430 \u0441\u0442\u0430\u0440\u0448\u043E\u0433\u043E \u043D\u0430\u0447\u0430\u043B\u044C\u043D\u0438\u043A\u0430");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 5);
    \u0275\u0275listener("dateChange", function CreateDataSetDialogComponent_Conditional_17_Template_input_dateChange_3_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onParentDocDateChange($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "mat-datepicker-toggle", 6)(5, "mat-datepicker", null, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "mat-form-field", 4)(8, "mat-label");
    \u0275\u0275text(9, "\u041D\u043E\u043C\u0435\u0440 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430 \u0441\u0442\u0430\u0440\u0448\u043E\u0433\u043E \u043D\u0430\u0447\u0430\u043B\u044C\u043D\u0438\u043A\u0430");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "input", 7);
    \u0275\u0275twoWayListener("ngModelChange", function CreateDataSetDialogComponent_Conditional_17_Template_input_ngModelChange_10_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.parentDocNumber, $event) || (ctx_r2.parentDocNumber = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const parentPicker_r4 = \u0275\u0275reference(6);
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("matDatepicker", parentPicker_r4)("value", ctx_r2.parentDocDate);
    \u0275\u0275advance();
    \u0275\u0275property("for", parentPicker_r4);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.parentDocNumber);
  }
}
var CreateDataSetDialogComponent = class _CreateDataSetDialogComponent {
  dialogRef = inject(MatDialogRef);
  documentDate = /* @__PURE__ */ new Date();
  documentNumber = "";
  isParentDocUsed = false;
  parentDocDate = null;
  parentDocNumber = "";
  onDocumentDateChange(event) {
    const manualDate = parseDateString(event.targetElement.value);
    this.documentDate = manualDate ?? event.value;
  }
  onParentDocDateChange(event) {
    const manualDate = parseDateString(event.targetElement.value);
    this.parentDocDate = manualDate ?? event.value;
  }
  isValid() {
    if (!this.documentDate || !this.documentNumber.trim()) {
      return false;
    }
    if (this.isParentDocUsed) {
      return !!this.parentDocDate && !!this.parentDocNumber.trim();
    }
    return true;
  }
  confirm() {
    if (!this.isValid()) {
      return;
    }
    const dateStr = this.documentDate ? new Intl.DateTimeFormat("uk-UA").format(this.documentDate) : "";
    const docNum = this.documentNumber.trim();
    this.dialogRef.close({
      isParentDocUsed: this.isParentDocUsed,
      parentDocDate: this.isParentDocUsed ? this.parentDocDate : null,
      parentDocNumber: this.isParentDocUsed ? this.parentDocNumber : null,
      docDate: this.documentDate,
      docNumber: this.documentNumber,
      name: `\u0414\u0430\u043D\u0456 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430 \u0432\u0456\u0434 ${dateStr} \u2116 ${docNum}`,
      isPublished: false
    });
  }
  cancel() {
    this.dialogRef.close(void 0);
  }
  static \u0275fac = function CreateDataSetDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CreateDataSetDialogComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CreateDataSetDialogComponent, selectors: [["app-create-dataset-dialog"]], features: [\u0275\u0275ProvidersFeature([provideNativeDateAdapter()])], decls: 25, vars: 7, consts: [["docPicker", ""], ["parentPicker", ""], ["mat-dialog-title", ""], [1, "content"], ["appearance", "outline"], ["matInput", "", "appDateMask", "", "placeholder", "\u0434\u0434.\u043C\u043C.\u0440\u0440\u0440\u0440", "required", "", 3, "dateChange", "matDatepicker", "value"], ["matIconSuffix", "", 3, "for"], ["matInput", "", "type", "text", "placeholder", "\u0412\u0432\u0435\u0434\u0456\u0442\u044C \u043D\u043E\u043C\u0435\u0440", "required", "", 3, "ngModelChange", "ngModel"], [1, "checkbox-row"], ["color", "primary", 3, "ngModelChange", "ngModel"], ["align", "end", 1, "actions"], ["mat-button", "", 3, "click"], ["mat-raised-button", "", "color", "primary", 3, "click", "disabled"]], template: function CreateDataSetDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "h2", 2);
      \u0275\u0275text(1, "\u041D\u043E\u0432\u0438\u0439 \u043D\u0430\u0431\u0456\u0440 \u0434\u0430\u043D\u0438\u0445");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(2, "mat-dialog-content", 3)(3, "mat-form-field", 4)(4, "mat-label");
      \u0275\u0275text(5, "\u0414\u0430\u0442\u0430 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "input", 5);
      \u0275\u0275listener("dateChange", function CreateDataSetDialogComponent_Template_input_dateChange_6_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onDocumentDateChange($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275element(7, "mat-datepicker-toggle", 6)(8, "mat-datepicker", null, 0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "mat-form-field", 4)(11, "mat-label");
      \u0275\u0275text(12, "\u041D\u043E\u043C\u0435\u0440 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "input", 7);
      \u0275\u0275twoWayListener("ngModelChange", function CreateDataSetDialogComponent_Template_input_ngModelChange_13_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.documentNumber, $event) || (ctx.documentNumber = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(14, "div", 8)(15, "mat-checkbox", 9);
      \u0275\u0275twoWayListener("ngModelChange", function CreateDataSetDialogComponent_Template_mat_checkbox_ngModelChange_15_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.isParentDocUsed, $event) || (ctx.isParentDocUsed = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275text(16, " \u0427\u0438 \u0456\u0441\u043D\u0443\u0454 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442 \u0441\u0442\u0430\u0440\u0448\u043E\u0433\u043E \u043D\u0430\u0447\u0430\u043B\u044C\u043D\u0438\u043A\u0430 ");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(17, CreateDataSetDialogComponent_Conditional_17_Template, 11, 4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "mat-dialog-actions", 10)(19, "button", 11);
      \u0275\u0275listener("click", function CreateDataSetDialogComponent_Template_button_click_19_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.cancel());
      });
      \u0275\u0275text(20, "\u0421\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "button", 12);
      \u0275\u0275listener("click", function CreateDataSetDialogComponent_Template_button_click_21_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.confirm());
      });
      \u0275\u0275elementStart(22, "mat-icon");
      \u0275\u0275text(23, "arrow_forward");
      \u0275\u0275elementEnd();
      \u0275\u0275text(24, " \u0414\u0430\u043B\u0456 ");
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      const docPicker_r5 = \u0275\u0275reference(9);
      \u0275\u0275advance(6);
      \u0275\u0275property("matDatepicker", docPicker_r5)("value", ctx.documentDate);
      \u0275\u0275advance();
      \u0275\u0275property("for", docPicker_r5);
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.documentNumber);
      \u0275\u0275advance(2);
      \u0275\u0275twoWayProperty("ngModel", ctx.isParentDocUsed);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.isParentDocUsed ? 17 : -1);
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
    MatIconModule,
    MatIcon,
    MatCheckboxModule,
    MatCheckbox,
    MatDatepickerModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    DateMaskDirective
  ], styles: ["\n\n.title[_ngcontent-%COMP%] {\n  text-align: center;\n  margin: 0;\n}\n.content[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 12px;\n  min-width: 280px;\n  max-width: 520px;\n  padding-top: 10px !important;\n}\n  .content .mat-mdc-form-field {\n  width: 100%;\n}\n.actions[_ngcontent-%COMP%] {\n  gap: 8px;\n}\n/*# sourceMappingURL=DialogShared.css.map */", "\n\n.checkbox-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  padding: 4px 0 8px;\n}\n/*# sourceMappingURL=CreateDataSet-dialog.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CreateDataSetDialogComponent, [{
    type: Component,
    args: [{ selector: "app-create-dataset-dialog", standalone: true, imports: [
      CommonModule,
      FormsModule,
      MatDialogModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatIconModule,
      MatCheckboxModule,
      MatDatepickerModule,
      DateMaskDirective
    ], providers: [provideNativeDateAdapter()], template: `
    <h2 mat-dialog-title>\u041D\u043E\u0432\u0438\u0439 \u043D\u0430\u0431\u0456\u0440 \u0434\u0430\u043D\u0438\u0445</h2>

    <mat-dialog-content class="content">

      <mat-form-field appearance="outline">
        <mat-label>\u0414\u0430\u0442\u0430 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430</mat-label>
        <input
          matInput
          appDateMask
          placeholder="\u0434\u0434.\u043C\u043C.\u0440\u0440\u0440\u0440"
          [matDatepicker]="docPicker"
          [value]="documentDate"
          (dateChange)="onDocumentDateChange($event)"
          required
        />
        <mat-datepicker-toggle matIconSuffix [for]="docPicker"></mat-datepicker-toggle>
        <mat-datepicker #docPicker></mat-datepicker>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>\u041D\u043E\u043C\u0435\u0440 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430</mat-label>
        <input
          matInput
          type="text"
          [(ngModel)]="documentNumber"
          placeholder="\u0412\u0432\u0435\u0434\u0456\u0442\u044C \u043D\u043E\u043C\u0435\u0440"
          required
        />
      </mat-form-field>

      <div class="checkbox-row">
        <mat-checkbox [(ngModel)]="isParentDocUsed" color="primary">
          \u0427\u0438 \u0456\u0441\u043D\u0443\u0454 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442 \u0441\u0442\u0430\u0440\u0448\u043E\u0433\u043E \u043D\u0430\u0447\u0430\u043B\u044C\u043D\u0438\u043A\u0430
        </mat-checkbox>
      </div>

      @if (isParentDocUsed) {
        <mat-form-field appearance="outline">
          <mat-label>\u0414\u0430\u0442\u0430 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430 \u0441\u0442\u0430\u0440\u0448\u043E\u0433\u043E \u043D\u0430\u0447\u0430\u043B\u044C\u043D\u0438\u043A\u0430</mat-label>
          <input
            matInput
            appDateMask
            placeholder="\u0434\u0434.\u043C\u043C.\u0440\u0440\u0440\u0440"
            [matDatepicker]="parentPicker"
            [value]="parentDocDate"
            (dateChange)="onParentDocDateChange($event)"
            required
          />
          <mat-datepicker-toggle matIconSuffix [for]="parentPicker"></mat-datepicker-toggle>
          <mat-datepicker #parentPicker></mat-datepicker>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>\u041D\u043E\u043C\u0435\u0440 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430 \u0441\u0442\u0430\u0440\u0448\u043E\u0433\u043E \u043D\u0430\u0447\u0430\u043B\u044C\u043D\u0438\u043A\u0430</mat-label>
          <input
            matInput
            type="text"
            [(ngModel)]="parentDocNumber"
            placeholder="\u0412\u0432\u0435\u0434\u0456\u0442\u044C \u043D\u043E\u043C\u0435\u0440"
            required
          />
        </mat-form-field>
      }

    </mat-dialog-content>

    <mat-dialog-actions align="end" class="actions">
      <button mat-button (click)="cancel()">\u0421\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438</button>
      <button mat-raised-button color="primary" [disabled]="!isValid()" (click)="confirm()">
        <mat-icon>arrow_forward</mat-icon>
        \u0414\u0430\u043B\u0456
      </button>
    </mat-dialog-actions>
  `, styles: ["/* src/app/dialogs/DialogShared.scss */\n.title {\n  text-align: center;\n  margin: 0;\n}\n.content {\n  display: grid;\n  gap: 12px;\n  min-width: 280px;\n  max-width: 520px;\n  padding-top: 10px !important;\n}\n::ng-deep .content .mat-mdc-form-field {\n  width: 100%;\n}\n.actions {\n  gap: 8px;\n}\n/*# sourceMappingURL=DialogShared.css.map */\n", "/* angular:styles/component:css;f11f14954116fe508a378b47d8393f7d2fe27001715853e82d33ce7b92716f43;/home/havrok/projects/work/411/s5/s5app/Menu/S5Server/Front/src/app/dialogs/CreateDataSet-dialog.component.ts */\n.checkbox-row {\n  display: flex;\n  align-items: center;\n  padding: 4px 0 8px;\n}\n/*# sourceMappingURL=CreateDataSet-dialog.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CreateDataSetDialogComponent, { className: "CreateDataSetDialogComponent", filePath: "app/dialogs/CreateDataSet-dialog.component.ts", lineNumber: 117 });
})();

// src/app/DocumentDataSet/Components/UnitsTaskEditor.component.ts
var _c0 = ["parentDateInput"];
var _c1 = ["parentNumberInput"];
var _c2 = ["dateInput"];
var _c3 = ["numberInput"];
var _forTrack02 = ($index, $item) => $item.id;
function UnitsTaskEditor_Conditional_4_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-button-toggle-group", 24);
    \u0275\u0275listener("change", function UnitsTaskEditor_Conditional_4_Conditional_11_Template_mat_button_toggle_group_change_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onPublishStatusChange($event.value));
    });
    \u0275\u0275declareLet(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementStart(3, "mat-button-toggle", 25)(4, "mat-icon");
    \u0275\u0275text(5, "edit");
    \u0275\u0275elementEnd();
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "mat-button-toggle", 25)(8, "mat-icon");
    \u0275\u0275text(9, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    const currentDataSet_r4 = \u0275\u0275readContextLet(1);
    \u0275\u0275property("formControl", ctx_r1.publishStatusControl)("disabled", ctx_r1.isSaving() || ctx_r1.selectedUnits().length === 0);
    const statusText_r5 = currentDataSet_r4.isPublished ? "\u041E\u043F\u0443\u0431\u043B\u0456\u043A\u043E\u0432\u0430\u043D\u043E " + \u0275\u0275pipeBind2(2, 8, currentDataSet_r4.publishedAtUtc, "dd.MM.yyyy") : "\u0427\u0435\u0440\u043D\u0435\u0442\u043A\u0430";
    \u0275\u0275advance(3);
    \u0275\u0275property("value", false)("matTooltip", statusText_r5);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.getStatusLabel(false), " ");
    \u0275\u0275advance();
    \u0275\u0275property("value", true)("matTooltip", statusText_r5);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.getStatusLabel(true), " ");
  }
}
function UnitsTaskEditor_Conditional_4_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "hourglass_empty");
    \u0275\u0275elementEnd();
  }
}
function UnitsTaskEditor_Conditional_4_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "save");
    \u0275\u0275elementEnd();
  }
}
function UnitsTaskEditor_Conditional_4_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19)(1, "mat-form-field", 20)(2, "mat-label");
    \u0275\u0275text(3, "\u0414\u0430\u0442\u0430 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430 \u0441\u0442\u0430\u0440\u0448\u043E\u0433\u043E \u043D\u0430\u0447\u0430\u043B\u044C\u043D\u0438\u043A\u0430");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 21, 3);
    \u0275\u0275listener("dateChange", function UnitsTaskEditor_Conditional_4_Conditional_21_Template_input_dateChange_4_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onParentDocumentDateChange($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(6, "mat-datepicker-toggle", 22)(7, "mat-datepicker", null, 4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "mat-form-field", 20)(10, "mat-label");
    \u0275\u0275text(11, "\u041D\u043E\u043C\u0435\u0440 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430 \u0441\u0442\u0430\u0440\u0448\u043E\u0433\u043E \u043D\u0430\u0447\u0430\u043B\u044C\u043D\u0438\u043A\u0430");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "input", 23, 5);
    \u0275\u0275listener("input", function UnitsTaskEditor_Conditional_4_Conditional_21_Template_input_input_12_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onParentDocumentNumberChange($event));
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const parentPicker_r7 = \u0275\u0275reference(8);
    const ctx_r1 = \u0275\u0275nextContext(2);
    const readOnly_r8 = \u0275\u0275readContextLet(3);
    \u0275\u0275advance(4);
    \u0275\u0275property("matDatepicker", parentPicker_r7)("value", ctx_r1.parentDocumentDate())("disabled", readOnly_r8);
    \u0275\u0275advance(2);
    \u0275\u0275property("for", parentPicker_r7);
    \u0275\u0275advance(6);
    \u0275\u0275property("value", ctx_r1.parentDocumentNumber())("disabled", readOnly_r8);
  }
}
function UnitsTaskEditor_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 6)(1, "mat-card", 9)(2, "mat-card-header", 10)(3, "div", 11)(4, "mat-card-title");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 12);
    \u0275\u0275listener("click", function UnitsTaskEditor_Conditional_4_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openUnitSelect());
    });
    \u0275\u0275text(7, " \u0414\u043E\u0434\u0430\u0442\u0438 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B ");
    \u0275\u0275elementStart(8, "mat-icon");
    \u0275\u0275text(9, "domain");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "div", 13);
    \u0275\u0275conditionalCreate(11, UnitsTaskEditor_Conditional_4_Conditional_11_Template, 11, 11, "mat-button-toggle-group", 14);
    \u0275\u0275elementStart(12, "button", 15);
    \u0275\u0275listener("click", function UnitsTaskEditor_Conditional_4_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveSelectedUnitsAsDataSet());
    });
    \u0275\u0275conditionalCreate(13, UnitsTaskEditor_Conditional_4_Conditional_13_Template, 2, 0, "mat-icon")(14, UnitsTaskEditor_Conditional_4_Conditional_14_Template, 2, 0, "mat-icon");
    \u0275\u0275text(15, " \u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438 ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "mat-card-content")(17, "div", 16)(18, "input", 17);
    \u0275\u0275listener("change", function UnitsTaskEditor_Conditional_4_Template_input_change_18_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onParentDocUsedChange($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "label", 18);
    \u0275\u0275text(20, "\u0427\u0438 \u0456\u0441\u043D\u0443\u0454 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442 \u0441\u0442\u0430\u0440\u0448\u043E\u0433\u043E \u043D\u0430\u0447\u0430\u043B\u044C\u043D\u0438\u043A\u0430");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(21, UnitsTaskEditor_Conditional_4_Conditional_21_Template, 14, 6, "div", 19);
    \u0275\u0275elementStart(22, "div", 19)(23, "mat-form-field", 20)(24, "mat-label");
    \u0275\u0275text(25, "\u0414\u0430\u0442\u0430 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "input", 21, 0);
    \u0275\u0275listener("dateChange", function UnitsTaskEditor_Conditional_4_Template_input_dateChange_26_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onDocumentDateChange($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(28, "mat-datepicker-toggle", 22)(29, "mat-datepicker", null, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "mat-form-field", 20)(32, "mat-label");
    \u0275\u0275text(33, "\u041D\u043E\u043C\u0435\u0440 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "input", 23, 2);
    \u0275\u0275listener("input", function UnitsTaskEditor_Conditional_4_Template_input_input_34_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onDocumentNumberChange($event));
    });
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const picker_r9 = \u0275\u0275reference(30);
    const ctx_r1 = \u0275\u0275nextContext();
    const currentDataSet_r4 = \u0275\u0275readContextLet(1);
    const isPublished_r10 = \u0275\u0275readContextLet(2);
    const readOnly_r8 = \u0275\u0275readContextLet(3);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442 (\u0432\u0438\u0431\u0440\u0430\u043D\u0456 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0438: ", ctx_r1.selectedUnits().length, ")");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.isSaving() || isPublished_r10);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(currentDataSet_r4 ? 11 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", readOnly_r8 || !ctx_r1.hasUnsavedChanges());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isSaving() ? 13 : 14);
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", readOnly_r8)("checked", ctx_r1.isParentDocUsed());
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.isParentDocUsed() ? 21 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275property("matDatepicker", picker_r9)("value", ctx_r1.documentDate())("disabled", readOnly_r8);
    \u0275\u0275advance(2);
    \u0275\u0275property("for", picker_r9);
    \u0275\u0275advance(6);
    \u0275\u0275property("value", ctx_r1.documentNumber())("disabled", readOnly_r8);
  }
}
function UnitsTaskEditor_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "mat-icon");
    \u0275\u0275text(2, "inbox");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u041F\u0435\u0440\u0435\u043B\u0456\u043A \u043F\u043E\u0440\u043E\u0436\u043D\u0456\u0439. \u0414\u043E\u0434\u0430\u0439\u0442\u0435 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0438 \u0437 \u0434\u0435\u0440\u0435\u0432\u0430.");
    \u0275\u0275elementEnd()();
  }
}
function UnitsTaskEditor_Conditional_7_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-one-unit-task-editor", 27);
    \u0275\u0275listener("remove", function UnitsTaskEditor_Conditional_7_For_1_Template_app_one_unit_task_editor_remove_0_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.removeUnitFromSelection($event));
    })("unitChange", function UnitsTaskEditor_Conditional_7_For_1_Template_app_one_unit_task_editor_unitChange_0_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onUnitChange($event));
    })("unsavedChangesChange", function UnitsTaskEditor_Conditional_7_For_1_Template_app_one_unit_task_editor_unsavedChangesChange_0_listener($event) {
      const unitTask_r12 = \u0275\u0275restoreView(_r11).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onUnitUnsavedChanges(unitTask_r12.unitId, $event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const unitTask_r12 = ctx.$implicit;
    \u0275\u0275property("unitTask", unitTask_r12);
  }
}
function UnitsTaskEditor_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, UnitsTaskEditor_Conditional_7_For_1_Template, 1, 1, "app-one-unit-task-editor", 26, _forTrack02);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r1.selectedUnits());
  }
}
var UnitsTaskEditor = class _UnitsTaskEditor {
  destroyRef = inject(DestroyRef);
  snackBar = inject(MatSnackBar);
  dialog = inject(MatDialog);
  dataSetService = inject(TemplateDataSetService);
  unitTaskService = inject(UnitTaskService);
  parentDateInput;
  parentNumberInput;
  dateInput;
  numberInput;
  // Доступ до всіх карток підрозділів
  unitTaskCards;
  // --- Selected Units List with DataSets ---
  selectedUnits = signal([], ...ngDevMode ? [{ debugName: "selectedUnits" }] : []);
  // --- Current Loaded DataSet ---
  dataSet = signal(null, ...ngDevMode ? [{ debugName: "dataSet" }] : []);
  // --- Document Info ---
  // Документ старшого начальника
  isParentDocUsed = signal(false, ...ngDevMode ? [{ debugName: "isParentDocUsed" }] : []);
  parentDocumentDate = signal(null, ...ngDevMode ? [{ debugName: "parentDocumentDate" }] : []);
  parentDocumentNumber = signal("", ...ngDevMode ? [{ debugName: "parentDocumentNumber" }] : []);
  // Основний документ
  documentDate = signal(/* @__PURE__ */ new Date(), ...ngDevMode ? [{ debugName: "documentDate" }] : []);
  documentNumber = signal("", ...ngDevMode ? [{ debugName: "documentNumber" }] : []);
  // --- Save State ---
  isSaving = signal(false, ...ngDevMode ? [{ debugName: "isSaving" }] : []);
  hasUnsavedChanges = signal(false, ...ngDevMode ? [{ debugName: "hasUnsavedChanges" }] : []);
  /** Множина UnitTask ID з незбереженими змінами */
  unitsWithUnsavedChanges = signal(/* @__PURE__ */ new Set(), ...ngDevMode ? [{ debugName: "unitsWithUnsavedChanges" }] : []);
  /** Контрол для статусу публікації
   * Предотвращает переключение визуального контрола
   * при ошибках в изменении статуса публикации из-за
   * асинхронного обновления unitTask после сохранения.
   */
  publishStatusControl = new FormControl(false, { nonNullable: true });
  /** Emits the updated TemplateDataSetDto after a successful save or publish */
  dataSetChanged = output();
  /**
   * Обробник зміни підрозділу з дочірнього компонента
   */
  onUnitChange(updatedUnit) {
    const units = [...this.selectedUnits()];
    const unitIndex = units.findIndex((u) => u.id === updatedUnit.id);
    if (unitIndex !== -1) {
      units[unitIndex] = updatedUnit;
      this.selectedUnits.set(units);
    }
  }
  /**
   * Обробник зміни стану збереження з дочірнього компонента OneUnitTaskEditor
   * Відстежує які карточки мають незбережені зміни
   */
  onUnitUnsavedChanges(unitId, hasUnsaved) {
    const unsavedUnits = new Set(this.unitsWithUnsavedChanges());
    if (hasUnsaved) {
      unsavedUnits.add(unitId);
      this.hasUnsavedChanges.set(true);
    } else {
      unsavedUnits.delete(unitId);
    }
    this.unitsWithUnsavedChanges.set(unsavedUnits);
  }
  /**
   * Обробник зміни прапорця "Чи існує документ старшого начальника"
   */
  onParentDocUsedChange(event) {
    const input = event.target;
    this.isParentDocUsed.set(input.checked);
    this.hasUnsavedChanges.set(true);
  }
  /**
   * Обробник зміни дати документа старшого начальника
   */
  onParentDocumentDateChange(event) {
    const inputElement = event.targetElement;
    const manualDate = parseDateString(inputElement.value);
    const finalDate = manualDate || event.value;
    this.parentDocumentDate.set(finalDate);
    this.hasUnsavedChanges.set(true);
  }
  /**
   * Обробник зміни номера документа старшого начальника
   */
  onParentDocumentNumberChange(event) {
    const input = event.target;
    this.parentDocumentNumber.set(input.value.trim());
    this.hasUnsavedChanges.set(true);
  }
  /**
   * Обробник зміни дати документа
   */
  onDocumentDateChange(event) {
    const inputElement = event.targetElement;
    const manualDate = parseDateString(inputElement.value);
    const finalDate = manualDate || event.value;
    this.documentDate.set(finalDate);
    this.hasUnsavedChanges.set(true);
  }
  /**
   * Обробник зміни номера документа
   */
  onDocumentNumberChange(event) {
    const input = event.target;
    this.documentNumber.set(input.value.trim());
    this.hasUnsavedChanges.set(true);
  }
  /**
   * Перевіряє наявність незбережених змін і запитує підтвердження
   * @returns true якщо можна продовжити, false якщо користувач скасував
   */
  checkUnsavedChanges() {
    if (this.hasUnsavedChanges()) {
      const confirmed = confirm("\u26A0\uFE0F \u0423 \u0432\u0430\u0441 \u0454 \u043D\u0435\u0437\u0431\u0435\u0440\u0435\u0436\u0435\u043D\u0456 \u0437\u043C\u0456\u043D\u0438!\n\n\u042F\u043A\u0449\u043E \u0432\u0438 \u043F\u0440\u043E\u0434\u043E\u0432\u0436\u0438\u0442\u0435, \u0432\u0441\u0456 \u043D\u0435\u0437\u0431\u0435\u0440\u0435\u0436\u0435\u043D\u0456 \u0434\u0430\u043D\u0456 \u0431\u0443\u0434\u0443\u0442\u044C \u0432\u0442\u0440\u0430\u0447\u0435\u043D\u0456.\n\n\u041F\u0440\u043E\u0434\u043E\u0432\u0436\u0438\u0442\u0438?");
      return confirmed;
    }
    return true;
  }
  // ── Вибір підрозділу через діалог ─────
  openUnitSelectDialog(onSelected) {
    const titles = {
      unit: "\u0412\u0438\u0431\u0456\u0440 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0443",
      assigned: "\u041F\u0440\u0438\u0434\u0430\u043D\u0438\u0439 \u0434\u043E \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0443",
      involved: "\u0415\u043A\u0456\u043F\u0430\u0436/\u0413\u0440\u0443\u043F\u0430"
    };
    const dialogRef = this.dialog.open(UnitSelectDialogComponent, {
      width: "900px",
      maxHeight: "90vh",
      data: { title: titles["unit"] }
    });
    dialogRef.afterClosed().subscribe((unit) => {
      if (unit) {
        onSelected(unit);
      }
    });
  }
  openUnitSelect() {
    this.openUnitSelectDialog((unit) => {
      this.addUnitToSelection(unit.id);
    });
  }
  /**
   * Додає підрозділ до списку вибраних
   */
  addUnitToSelection(unitId) {
    const currentList = this.selectedUnits();
    if (currentList.find((u) => u.unitId === unitId)) {
      this.snackBar.open("\u0426\u0435\u0439 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B \u0432\u0436\u0435 \u0434\u043E\u0434\u0430\u043D\u043E \u0434\u043E \u043F\u0435\u0440\u0435\u043B\u0456\u043A\u0443", "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 3e3 });
      return;
    }
    const dataSetId = this.dataSet()?.id;
    if (!dataSetId) {
      this.snackBar.open("\u0421\u043F\u043E\u0447\u0430\u0442\u043A\u0443 \u0437\u0431\u0435\u0440\u0435\u0436\u0456\u0442\u044C \u043D\u0430\u0431\u0456\u0440 \u0434\u0430\u043D\u0438\u0445", "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 3e3 });
      return;
    }
    this.unitTaskService.createDefault(dataSetId, unitId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (unitTask) => {
        this.selectedUnits.set([...currentList, unitTask]);
      },
      error: (error) => {
        console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043E\u0442\u0440\u0438\u043C\u0430\u043D\u043D\u044F \u0447\u0435\u0440\u043D\u0435\u0442\u043A\u0438 \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0443:", error);
        const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043E\u0442\u0440\u0438\u043C\u0430\u043D\u043D\u044F \u0447\u0435\u0440\u043D\u0435\u0442\u043A\u0438 \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0443");
        this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
      }
    });
  }
  /**
   * Удаляет подразделение из списка выбранных
   * Изменение сохраняется автоматически в OneUnitTaskEditor
   * при удалении карточки, поэтому здесь просто обновляем список
   */
  removeUnitFromSelection(nodeId) {
    const currentList = this.selectedUnits();
    this.selectedUnits.set(currentList.filter((u) => u.id !== nodeId));
  }
  /**
   * Завантажує DataSet та список UnitTask
   */
  loadDataSet(dataSetId) {
    if (this.dataSet()?.id === dataSetId) {
      return;
    }
    if (!this.checkUnsavedChanges()) {
      return;
    }
    this.dataSetService.getDataSetById(dataSetId).pipe(switchMap((dataSet) => this.unitTaskService.getAll({ dataSetId: dataSet.id }).pipe(map((unitTasks) => ({ dataSet, unitTasks })))), takeUntilDestroyed(this.destroyRef)).subscribe({
      next: ({ dataSet, unitTasks }) => {
        this.setDataSet(dataSet);
        this.selectedUnits.set(unitTasks);
        this.hasUnsavedChanges.set(false);
      },
      error: (error) => {
        console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u043D\u0430\u0431\u043E\u0440\u0443 \u0434\u0430\u043D\u0438\u0445:", error);
        const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u043D\u0430\u0431\u043E\u0440\u0443 \u0434\u0430\u043D\u0438\u0445");
        this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
      }
    });
  }
  /**
   * Перевіряє обов'язкове поле та показує помилку
   */
  checkRequiredField(value, input, errorMessage) {
    const isEmpty = !value || typeof value === "string" && value.trim() === "";
    if (isEmpty) {
      this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
      this.focusInvalidField(input);
      return false;
    }
    return true;
  }
  /**
   * Зберігає вибрані підрозділи як набір даних
   */
  saveSelectedUnitsAsDataSet() {
    return __async(this, null, function* () {
      if (this.selectedUnits().length === 0) {
        this.snackBar.open("\u041D\u0435\u043C\u0430\u0454 \u0432\u0438\u0431\u0440\u0430\u043D\u0438\u0445 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0456\u0432 \u0434\u043B\u044F \u0437\u0431\u0435\u0440\u0435\u0436\u0435\u043D\u043D\u044F", "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", {
          duration: 3e3
        });
        return false;
      }
      if (this.isParentDocUsed()) {
        if (!this.checkRequiredField(this.parentDocumentDate(), this.parentDateInput, "\u0417\u0430\u043F\u043E\u0432\u043D\u0456\u0442\u044C \u0434\u0430\u0442\u0443 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430 \u0441\u0442\u0430\u0440\u0448\u043E\u0433\u043E \u043D\u0430\u0447\u0430\u043B\u044C\u043D\u0438\u043A\u0430")) {
          return false;
        }
        if (!this.checkRequiredField(this.parentDocumentNumber(), this.parentNumberInput, "\u0417\u0430\u043F\u043E\u0432\u043D\u0456\u0442\u044C \u043D\u043E\u043C\u0435\u0440 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430 \u0441\u0442\u0430\u0440\u0448\u043E\u0433\u043E \u043D\u0430\u0447\u0430\u043B\u044C\u043D\u0438\u043A\u0430")) {
          return false;
        }
      }
      if (!this.checkRequiredField(this.documentDate(), this.dateInput, "\u0417\u0430\u043F\u043E\u0432\u043D\u0456\u0442\u044C \u0434\u0430\u0442\u0443 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430")) {
        return false;
      }
      if (!this.checkRequiredField(this.documentNumber(), this.numberInput, "\u0417\u0430\u043F\u043E\u0432\u043D\u0456\u0442\u044C \u043D\u043E\u043C\u0435\u0440 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430")) {
        return false;
      }
      const dateStr = new Intl.DateTimeFormat("uk-UA").format(this.documentDate());
      const dataSetName = `\u0414\u0430\u043D\u0456 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430 \u0432\u0456\u0434 ${dateStr} \u2116 ${this.documentNumber()}`;
      this.isSaving.set(true);
      const currentDataSet = this.dataSet();
      const updateDto = __spreadProps(__spreadValues({}, currentDataSet), {
        name: dataSetName,
        isParentDocUsed: this.isParentDocUsed(),
        parentDocNumber: this.isParentDocUsed() ? this.parentDocumentNumber() : null,
        parentDocDate: this.isParentDocUsed() ? this.parentDocumentDate() : null,
        docNumber: this.documentNumber(),
        docDate: this.documentDate()
      });
      try {
        const savedDto = yield firstValueFrom(this.dataSetService.updateDataSet(currentDataSet.id, updateDto).pipe(takeUntilDestroyed(this.destroyRef)));
        const saved = yield this.saveUnitTasks();
        if (saved) {
          this.dataSet.set(savedDto);
          this.dataSetChanged.emit(savedDto);
        }
        return saved;
      } catch (error) {
        this.isSaving.set(false);
        console.error("Error saving dataset:", error);
        const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0431\u0435\u0440\u0435\u0436\u0435\u043D\u043D\u044F \u0434\u0430\u043D\u0438\u0445");
        this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
        return false;
      }
    });
  }
  /**
   * Зберігає UnitTask для кожного підрозділу
   * Координує збереження через виклик card.saveUnitTask()
   */
  saveUnitTasks() {
    return __async(this, null, function* () {
      const cards = this.unitTaskCards.toArray();
      if (cards.length === 0) {
        this.snackBar.open("\u041D\u0435\u043C\u0430\u0454 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0456\u0432 \u0434\u043B\u044F \u0437\u0431\u0435\u0440\u0435\u0436\u0435\u043D\u043D\u044F", "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 3e3 });
        this.isSaving.set(false);
        return false;
      }
      try {
        let successCount = 0;
        const errors = [];
        for (const card of cards) {
          const [success, errorMsg] = yield card.saveUnitTask();
          if (success) {
            successCount++;
          } else {
            if (errorMsg) {
              errors.push(errorMsg);
            }
          }
        }
        this.isSaving.set(false);
        if (errors.length === 0) {
          this.hasUnsavedChanges.set(false);
          this.unitsWithUnsavedChanges.set(/* @__PURE__ */ new Set());
          this.snackBar.open(`\u0414\u0430\u043D\u0456 ${successCount} \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0456\u0432 \u0437\u0431\u0435\u0440\u0435\u0436\u0435\u043D\u043E`, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", {
            duration: 3e3
          });
          return true;
        } else {
          this.snackBar.openFromComponent(ErrorListSnackBarComponent, {
            data: errors,
            duration: 1e4
          });
          return false;
        }
      } catch (error) {
        this.isSaving.set(false);
        console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0431\u0435\u0440\u0435\u0436\u0435\u043D\u043D\u044F \u0437\u0430\u0432\u0434\u0430\u043D\u044C \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0456\u0432:", error);
        const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0431\u0435\u0440\u0435\u0436\u0435\u043D\u043D\u044F \u0437\u0430\u0432\u0434\u0430\u043D\u044C \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0456\u0432");
        this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
        return false;
      }
    });
  }
  /**
   * Створює новий набір даних і відкриває діалог вибору підрозділу для першого додавання
   */
  createNewDataSet() {
    if (!this.checkUnsavedChanges()) {
      return;
    }
    const dialogRef = this.dialog.open(CreateDataSetDialogComponent, {
      width: "480px",
      maxHeight: "90vh",
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
      this.setDataSet(null);
      this.selectedUnits.set([]);
      this.openUnitSelectDialog((unit) => {
        this.dataSetService.createDataSet(result).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
          next: (newDataSet) => {
            this.setDataSet(newDataSet);
            this.dataSetChanged.emit(newDataSet);
            this.addUnitToSelection(unit.id);
            this.snackBar.open("\u0421\u0442\u0432\u043E\u0440\u0435\u043D\u043E \u043D\u043E\u0432\u0438\u0439 \u043D\u0430\u0431\u0456\u0440 \u0434\u0430\u043D\u0438\u0445 \u0456 \u0434\u043E\u0434\u0430\u043D\u043E \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B", "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", {
              duration: 3e3
            });
          },
          error: (error) => {
            console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0441\u0442\u0432\u043E\u0440\u0435\u043D\u043D\u044F \u043D\u043E\u0432\u043E\u0433\u043E \u043D\u0430\u0431\u043E\u0440\u0443 \u0434\u0430\u043D\u0438\u0445:", error);
            const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0441\u0442\u0432\u043E\u0440\u0435\u043D\u043D\u044F \u043D\u043E\u0432\u043E\u0433\u043E \u043D\u0430\u0431\u043E\u0440\u0443 \u0434\u0430\u043D\u0438\u0445");
            this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
          }
        });
      });
    });
  }
  /**
   * Обробник зміни статусу публікації
   */
  onPublishStatusChange(isPublished) {
    return __async(this, null, function* () {
      const initialDataSet = this.dataSet();
      if (!initialDataSet) {
        this.publishStatusControl.setValue(false, { emitEvent: false });
        this.snackBar.open("\u041D\u0430\u0431\u0456\u0440 \u0434\u0430\u043D\u0438\u0445 \u043D\u0435 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043E", "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 3e3 });
        return;
      }
      const oldStatus = initialDataSet.isPublished;
      const cards = this.unitTaskCards.toArray();
      if (cards.length === 0) {
        this.publishStatusControl.setValue(oldStatus, { emitEvent: false });
        this.snackBar.open("\u0423 \u043D\u0430\u0431\u043E\u0440\u0456 \u0434\u0430\u043D\u0438\u0445 \u0432\u0456\u0434\u0441\u0443\u0442\u043D\u0456 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0438", "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 3e3 });
        return;
      }
      if (this.hasUnsavedChanges()) {
        const saveSuccess = yield this.saveSelectedUnitsAsDataSet();
        if (!saveSuccess) {
          this.publishStatusControl.setValue(oldStatus, { emitEvent: false });
          return;
        }
      }
      this.isSaving.set(true);
      try {
        const publishErrors = [];
        for (const card of cards) {
          const [success, errorMsg] = yield card.publishUnitTask(isPublished);
          if (!success && errorMsg) {
            publishErrors.push(errorMsg);
          }
        }
        if (publishErrors.length > 0) {
          this.publishStatusControl.setValue(oldStatus, { emitEvent: false });
          this.snackBar.openFromComponent(ErrorListSnackBarComponent, {
            data: publishErrors,
            duration: 1e4
          });
          return;
        }
        const currentDataSet = this.dataSet();
        const updatedDataSet = yield firstValueFrom(this.dataSetService.publish(currentDataSet.id, isPublished).pipe(takeUntilDestroyed(this.destroyRef)));
        this.setDataSet(updatedDataSet);
        this.dataSetChanged.emit(updatedDataSet);
        const statusText = isPublished ? "\u043E\u043F\u0443\u0431\u043B\u0456\u043A\u043E\u0432\u0430\u043D\u043E" : "\u0437\u043D\u044F\u0442\u043E \u0437 \u043F\u0443\u0431\u043B\u0456\u043A\u0430\u0446\u0456\u0457";
        this.snackBar.open(`\u041D\u0430\u0431\u0456\u0440 "${currentDataSet.name}" ${statusText}`, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", {
          duration: 3e3
        });
      } catch (error) {
        this.publishStatusControl.setValue(oldStatus, { emitEvent: false });
        console.error("Error changing publish status:", error);
        const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u043C\u0456\u043D\u0438 \u0441\u0442\u0430\u0442\u0443\u0441\u0443 \u043F\u0443\u0431\u043B\u0456\u043A\u0430\u0446\u0456\u0457");
        this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
      } finally {
        this.isSaving.set(false);
      }
    });
  }
  /**
   * Встановлює поточний DataSet і синхронізує всі поля форми.
   * При null — скидає форму до значень за замовчуванням.
   */
  setDataSet(dataSet) {
    this.dataSet.set(dataSet);
    if (!dataSet) {
      this.isParentDocUsed.set(false);
      this.parentDocumentDate.set(null);
      this.parentDocumentNumber.set("");
      this.documentDate.set(/* @__PURE__ */ new Date());
      this.documentNumber.set("");
      this.publishStatusControl.setValue(false, { emitEvent: false });
      return;
    }
    this.isParentDocUsed.set(dataSet.isParentDocUsed);
    this.parentDocumentDate.set(dataSet.parentDocDate ?? null);
    this.parentDocumentNumber.set(dataSet.parentDocNumber || "");
    this.documentDate.set(dataSet.docDate ?? /* @__PURE__ */ new Date());
    this.documentNumber.set(dataSet.docNumber || "");
    this.publishStatusControl.setValue(dataSet.isPublished, { emitEvent: false });
  }
  /**
   * Фокусує невалідне поле та додає візуальне виділення
   */
  focusInvalidField(inputRef) {
    if (inputRef?.nativeElement) {
      setTimeout(() => {
        inputRef.nativeElement.focus();
        inputRef.nativeElement.select();
      }, 100);
    }
  }
  /**
   * Перевіряє перед закриттям сторінки
   */
  unloadNotification($event) {
    if (this.hasUnsavedChanges()) {
      $event.preventDefault();
    }
  }
  /**
   * Отримує читабельну назву статусу публікації
   */
  getStatusLabel(isPublished) {
    return DocTemplateUtils.getStatusLabel(isPublished);
  }
  /**
   * Форматує дату у читабельний формат
   */
  formatDate(date) {
    return formatDate(date);
  }
  static \u0275fac = function UnitsTaskEditor_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UnitsTaskEditor)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UnitsTaskEditor, selectors: [["app-units-task-editor"]], viewQuery: function UnitsTaskEditor_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5)(_c1, 5)(_c2, 5)(_c3, 5)(OneUnitTaskEditor, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.parentDateInput = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.parentNumberInput = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.dateInput = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.numberInput = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.unitTaskCards = _t);
    }
  }, hostBindings: function UnitsTaskEditor_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("beforeunload", function UnitsTaskEditor_beforeunload_HostBindingHandler($event) {
        return ctx.unloadNotification($event);
      }, \u0275\u0275resolveWindow);
    }
  }, outputs: { dataSetChanged: "dataSetChanged" }, features: [\u0275\u0275ProvidersFeature([])], decls: 8, vars: 5, consts: [["dateInput", ""], ["picker", ""], ["numberInput", ""], ["parentDateInput", ""], ["parentPicker", ""], ["parentNumberInput", ""], ["actionPanel", "", 1, "action-panel-content"], ["contentPanel", "", 1, "selected-units-list"], [1, "empty-list"], [1, "document-card"], [1, "header-layout"], [1, "header-left"], ["mat-raised-button", "", "color", "primary", "matTooltip", "\u0414\u043E\u0434\u0430\u0442\u0438 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B", 3, "click", "disabled"], [1, "header-right"], [1, "status-toggle", 3, "formControl", "disabled"], ["mat-raised-button", "", "color", "primary", "matTooltip", "\u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438 \u0434\u0430\u043D\u0456", 3, "click", "disabled"], [1, "checkbox-field"], ["type", "checkbox", "id", "isParentDocUsed", 3, "change", "disabled", "checked"], ["for", "isParentDocUsed"], [1, "document-fields-row"], ["appearance", "outline", 1, "document-field"], ["matInput", "", "appDateMask", "", "placeholder", "dd.mm.yyyy", "required", "", 3, "dateChange", "matDatepicker", "value", "disabled"], ["matIconSuffix", "", 3, "for"], ["matInput", "", "type", "text", "required", "", 3, "input", "value", "disabled"], [1, "status-toggle", 3, "change", "formControl", "disabled"], [3, "value", "matTooltip"], [3, "unitTask"], [3, "remove", "unitChange", "unsavedChangesChange", "unitTask"]], template: function UnitsTaskEditor_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "app-vertical-layout");
      \u0275\u0275declareLet(1)(2)(3);
      \u0275\u0275conditionalCreate(4, UnitsTaskEditor_Conditional_4_Template, 36, 14, "div", 6);
      \u0275\u0275elementStart(5, "div", 7);
      \u0275\u0275conditionalCreate(6, UnitsTaskEditor_Conditional_6_Template, 5, 0, "div", 8)(7, UnitsTaskEditor_Conditional_7_Template, 2, 0);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      const currentDataSet_r13 = \u0275\u0275storeLet(ctx.dataSet());
      \u0275\u0275advance();
      const isPublished_r14 = \u0275\u0275storeLet((currentDataSet_r13 == null ? null : currentDataSet_r13.isPublished) ?? false);
      \u0275\u0275advance();
      \u0275\u0275storeLet(ctx.selectedUnits().length === 0 || isPublished_r14);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.selectedUnits().length != 0 || currentDataSet_r13 ? 4 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.selectedUnits().length === 0 ? 6 : 7);
    }
  }, dependencies: [
    CommonModule,
    FormsModule,
    NgControlStatus,
    ReactiveFormsModule,
    FormControlDirective,
    MatCardModule,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatDatepickerModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatIconModule,
    MatIcon,
    MatButtonModule,
    MatButton,
    MatButtonToggleModule,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatSuffix,
    MatInputModule,
    MatInput,
    OneUnitTaskEditor,
    VerticalLayoutComponent,
    MatTooltipModule,
    MatTooltip,
    DateMaskDirective,
    DatePipe
  ], styles: ["\n\n[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  overflow: hidden;\n}\n.action-panel-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.document-card[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.document-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%] {\n  background-color: #f5f5f5;\n  padding: 12px 16px;\n}\n.document-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 500;\n}\n.document-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 18px;\n}\n.document-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .checkbox-field[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-bottom: 0;\n}\n.document-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .checkbox-field[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  cursor: pointer;\n}\n.document-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .checkbox-field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n  font-size: 14px;\n  font-weight: 500;\n}\n.document-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .document-fields-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: flex-start;\n}\n@media (max-width: 768px) {\n  .document-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .document-fields-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n}\n.document-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .document-field[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 150px;\n}\n.document-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .document-field[_ngcontent-%COMP%]     .mat-mdc-text-field-wrapper {\n  background-color: white;\n}\n.document-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .document-field[_ngcontent-%COMP%]     .mat-mdc-form-field-subscript-wrapper {\n  display: none;\n}\n.document-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .document-field[_ngcontent-%COMP%]     .mat-mdc-form-field-infix {\n  padding-top: 8px;\n  padding-bottom: 8px;\n  min-height: auto;\n}\n.header-layout[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 16px;\n}\n.header-left[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.header-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-left: auto;\n}\n.selected-units-list[_ngcontent-%COMP%] {\n  padding: 8px;\n  margin: 8px 0;\n  gap: 12px;\n  flex: 1;\n  min-height: 0;\n  overflow-y: auto;\n  overflow-x: hidden;\n  display: flex;\n  flex-direction: column;\n}\n.selected-units-list[_ngcontent-%COMP%]   .empty-list[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  color: #666;\n  text-align: center;\n}\n.selected-units-list[_ngcontent-%COMP%]   .empty-list[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  width: 64px;\n  height: 64px;\n  opacity: 0.3;\n  margin-bottom: 16px;\n}\n.selected-units-list[_ngcontent-%COMP%]   .empty-list[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 14px;\n}\n.status-toggle[_ngcontent-%COMP%]   mat-button-toggle[aria-pressed=true][_ngcontent-%COMP%]:has(mat-icon) {\n  font-weight: 600;\n}\n.status-toggle[_ngcontent-%COMP%]   mat-button-toggle[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n  margin-right: 4px;\n}\n.status-toggle[_ngcontent-%COMP%]   mat-button-toggle[ng-reflect-value=true][aria-pressed=true][_ngcontent-%COMP%] {\n  background-color: #e8f5e8;\n  color: #388e3c;\n}\n.status-toggle[_ngcontent-%COMP%]   mat-button-toggle[ng-reflect-value=true][aria-pressed=true][_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #388e3c;\n}\n.status-toggle[_ngcontent-%COMP%]   mat-button-toggle[ng-reflect-value=false][aria-pressed=true][_ngcontent-%COMP%] {\n  background-color: #fff3e0;\n  color: #f57c00;\n}\n.status-toggle[_ngcontent-%COMP%]   mat-button-toggle[ng-reflect-value=false][aria-pressed=true][_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #f57c00;\n}\n@media (max-width: 768px) {\n  mat-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 12px;\n  }\n  mat-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  mat-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 8px;\n  }\n  mat-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .document-field[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .selected-units-list[_ngcontent-%COMP%] {\n    padding: 8px;\n  }\n}\n/*# sourceMappingURL=UnitsTaskEditor.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UnitsTaskEditor, [{
    type: Component,
    args: [{ selector: "app-units-task-editor", standalone: true, imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      MatCardModule,
      MatDatepickerModule,
      MatIconModule,
      MatButtonModule,
      MatButtonToggleModule,
      MatFormFieldModule,
      MatInputModule,
      OneUnitTaskEditor,
      VerticalLayoutComponent,
      MatTooltipModule,
      DateMaskDirective
    ], providers: [], template: `<app-vertical-layout>
  @let currentDataSet = dataSet();
  @let isPublished = currentDataSet?.isPublished ?? false;
  @let readOnly = selectedUnits().length === 0 || isPublished;
  @if (selectedUnits().length != 0 || currentDataSet) {
    <div actionPanel class="action-panel-content">
      <mat-card class="document-card">
        <mat-card-header class="header-layout">
          <div class="header-left">
            <mat-card-title
              >\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442 (\u0432\u0438\u0431\u0440\u0430\u043D\u0456 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0438: {{ selectedUnits().length }})</mat-card-title
            >
            <button
              mat-raised-button
              color="primary"
              (click)="openUnitSelect()"
              matTooltip="\u0414\u043E\u0434\u0430\u0442\u0438 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B"
              [disabled]="isSaving() || isPublished"
            >
              \u0414\u043E\u0434\u0430\u0442\u0438 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B <mat-icon>domain</mat-icon>
            </button>
          </div>
          <div class="header-right">
            @if (currentDataSet) {
              <mat-button-toggle-group
                [formControl]="publishStatusControl"
                (change)="onPublishStatusChange($event.value)"
                class="status-toggle"
                [disabled]="isSaving() || selectedUnits().length === 0"
              >
                @let statusText =
                  currentDataSet.isPublished
                    ? '\u041E\u043F\u0443\u0431\u043B\u0456\u043A\u043E\u0432\u0430\u043D\u043E ' + (currentDataSet.publishedAtUtc | date: 'dd.MM.yyyy')
                    : '\u0427\u0435\u0440\u043D\u0435\u0442\u043A\u0430';
                <mat-button-toggle [value]="false" [matTooltip]="statusText">
                  <mat-icon>edit</mat-icon>
                  {{ getStatusLabel(false) }}
                </mat-button-toggle>
                <mat-button-toggle [value]="true" [matTooltip]="statusText">
                  <mat-icon>check_circle</mat-icon>
                  {{ getStatusLabel(true) }}
                </mat-button-toggle>
              </mat-button-toggle-group>
            }
            <button
              mat-raised-button
              color="primary"
              (click)="saveSelectedUnitsAsDataSet()"
              [disabled]="readOnly || !hasUnsavedChanges()"
              matTooltip="\u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438 \u0434\u0430\u043D\u0456"
            >
              @if (isSaving()) {
                <mat-icon>hourglass_empty</mat-icon>
              } @else {
                <mat-icon>save</mat-icon>
              }
              \u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438
            </button>
          </div>
        </mat-card-header>
        <mat-card-content>
          <div class="checkbox-field">
            <input
              type="checkbox"
              id="isParentDocUsed"
              [disabled]="readOnly"
              [checked]="isParentDocUsed()"
              (change)="onParentDocUsedChange($event)"
            />
            <label for="isParentDocUsed">\u0427\u0438 \u0456\u0441\u043D\u0443\u0454 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442 \u0441\u0442\u0430\u0440\u0448\u043E\u0433\u043E \u043D\u0430\u0447\u0430\u043B\u044C\u043D\u0438\u043A\u0430</label>
          </div>

          @if (isParentDocUsed()) {
            <div class="document-fields-row">
              <mat-form-field appearance="outline" class="document-field">
                <mat-label>\u0414\u0430\u0442\u0430 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430 \u0441\u0442\u0430\u0440\u0448\u043E\u0433\u043E \u043D\u0430\u0447\u0430\u043B\u044C\u043D\u0438\u043A\u0430</mat-label>
                <input
                  #parentDateInput
                  matInput
                  appDateMask
                  placeholder="dd.mm.yyyy"
                  [matDatepicker]="parentPicker"
                  [value]="parentDocumentDate()"
                  (dateChange)="onParentDocumentDateChange($event)"
                  [disabled]="readOnly"
                  required
                />
                <mat-datepicker-toggle matIconSuffix [for]="parentPicker"></mat-datepicker-toggle>
                <mat-datepicker #parentPicker></mat-datepicker>
              </mat-form-field>

              <mat-form-field appearance="outline" class="document-field">
                <mat-label>\u041D\u043E\u043C\u0435\u0440 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430 \u0441\u0442\u0430\u0440\u0448\u043E\u0433\u043E \u043D\u0430\u0447\u0430\u043B\u044C\u043D\u0438\u043A\u0430</mat-label>
                <input
                  #parentNumberInput
                  matInput
                  type="text"
                  [value]="parentDocumentNumber()"
                  (input)="onParentDocumentNumberChange($event)"
                  [disabled]="readOnly"
                  required
                />
              </mat-form-field>
            </div>
          }

          <div class="document-fields-row">
            <mat-form-field appearance="outline" class="document-field">
              <mat-label>\u0414\u0430\u0442\u0430 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430</mat-label>
              <input
                #dateInput
                matInput
                appDateMask
                placeholder="dd.mm.yyyy"
                [matDatepicker]="picker"
                [value]="documentDate()"
                (dateChange)="onDocumentDateChange($event)"
                [disabled]="readOnly"
                required
              />
              <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
              <mat-datepicker #picker></mat-datepicker>
            </mat-form-field>

            <mat-form-field appearance="outline" class="document-field">
              <mat-label>\u041D\u043E\u043C\u0435\u0440 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430</mat-label>
              <input
                #numberInput
                matInput
                type="text"
                [value]="documentNumber()"
                (input)="onDocumentNumberChange($event)"
                [disabled]="readOnly"
                required
              />
            </mat-form-field>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  }

  <!-- Content Panel -->
  <div contentPanel class="selected-units-list">
    @if (selectedUnits().length === 0) {
      <div class="empty-list">
        <mat-icon>inbox</mat-icon>
        <p>\u041F\u0435\u0440\u0435\u043B\u0456\u043A \u043F\u043E\u0440\u043E\u0436\u043D\u0456\u0439. \u0414\u043E\u0434\u0430\u0439\u0442\u0435 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0438 \u0437 \u0434\u0435\u0440\u0435\u0432\u0430.</p>
      </div>
    } @else {
      @for (unitTask of selectedUnits(); track unitTask.id) {
        <app-one-unit-task-editor
          [unitTask]="unitTask"
          (remove)="removeUnitFromSelection($event)"
          (unitChange)="onUnitChange($event)"
          (unsavedChangesChange)="onUnitUnsavedChanges(unitTask.unitId, $event)"
        >
        </app-one-unit-task-editor>
      }
    }
  </div>
</app-vertical-layout>
`, styles: ["/* src/app/DocumentDataSet/Components/UnitsTaskEditor.component.scss */\n:host {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  overflow: hidden;\n}\n.action-panel-content {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.document-card {\n  margin-bottom: 16px;\n}\n.document-card mat-card-header {\n  background-color: #f5f5f5;\n  padding: 12px 16px;\n}\n.document-card mat-card-header mat-card-title {\n  font-size: 14px;\n  font-weight: 500;\n}\n.document-card mat-card-content {\n  display: flex;\n  flex-direction: column;\n  gap: 18px;\n}\n.document-card mat-card-content .checkbox-field {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-bottom: 0;\n}\n.document-card mat-card-content .checkbox-field input[type=checkbox] {\n  width: 18px;\n  height: 18px;\n  cursor: pointer;\n}\n.document-card mat-card-content .checkbox-field label {\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n  font-size: 14px;\n  font-weight: 500;\n}\n.document-card mat-card-content .document-fields-row {\n  display: flex;\n  gap: 12px;\n  align-items: flex-start;\n}\n@media (max-width: 768px) {\n  .document-card mat-card-content .document-fields-row {\n    flex-direction: column;\n  }\n}\n.document-card mat-card-content .document-field {\n  flex: 1;\n  min-width: 150px;\n}\n.document-card mat-card-content .document-field ::ng-deep .mat-mdc-text-field-wrapper {\n  background-color: white;\n}\n.document-card mat-card-content .document-field ::ng-deep .mat-mdc-form-field-subscript-wrapper {\n  display: none;\n}\n.document-card mat-card-content .document-field ::ng-deep .mat-mdc-form-field-infix {\n  padding-top: 8px;\n  padding-bottom: 8px;\n  min-height: auto;\n}\n.header-layout {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 16px;\n}\n.header-left {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.header-right {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-left: auto;\n}\n.selected-units-list {\n  padding: 8px;\n  margin: 8px 0;\n  gap: 12px;\n  flex: 1;\n  min-height: 0;\n  overflow-y: auto;\n  overflow-x: hidden;\n  display: flex;\n  flex-direction: column;\n}\n.selected-units-list .empty-list {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  color: #666;\n  text-align: center;\n}\n.selected-units-list .empty-list mat-icon {\n  font-size: 64px;\n  width: 64px;\n  height: 64px;\n  opacity: 0.3;\n  margin-bottom: 16px;\n}\n.selected-units-list .empty-list p {\n  margin: 0;\n  font-size: 14px;\n}\n.status-toggle mat-button-toggle[aria-pressed=true]:has(mat-icon) {\n  font-weight: 600;\n}\n.status-toggle mat-button-toggle mat-icon {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n  margin-right: 4px;\n}\n.status-toggle mat-button-toggle[ng-reflect-value=true][aria-pressed=true] {\n  background-color: #e8f5e8;\n  color: #388e3c;\n}\n.status-toggle mat-button-toggle[ng-reflect-value=true][aria-pressed=true] mat-icon {\n  color: #388e3c;\n}\n.status-toggle mat-button-toggle[ng-reflect-value=false][aria-pressed=true] {\n  background-color: #fff3e0;\n  color: #f57c00;\n}\n.status-toggle mat-button-toggle[ng-reflect-value=false][aria-pressed=true] mat-icon {\n  color: #f57c00;\n}\n@media (max-width: 768px) {\n  mat-card mat-card-header {\n    flex-direction: column;\n    gap: 12px;\n  }\n  mat-card mat-card-header button {\n    width: 100%;\n  }\n  mat-card mat-card-content {\n    flex-direction: column;\n    gap: 8px;\n  }\n  mat-card mat-card-content .document-field {\n    width: 100%;\n  }\n  .selected-units-list {\n    padding: 8px;\n  }\n}\n/*# sourceMappingURL=UnitsTaskEditor.component.css.map */\n"] }]
  }], null, { parentDateInput: [{
    type: ViewChild,
    args: ["parentDateInput"]
  }], parentNumberInput: [{
    type: ViewChild,
    args: ["parentNumberInput"]
  }], dateInput: [{
    type: ViewChild,
    args: ["dateInput"]
  }], numberInput: [{
    type: ViewChild,
    args: ["numberInput"]
  }], unitTaskCards: [{
    type: ViewChildren,
    args: [OneUnitTaskEditor]
  }], dataSetChanged: [{ type: Output, args: ["dataSetChanged"] }], unloadNotification: [{
    type: HostListener,
    args: ["window:beforeunload", ["$event"]]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UnitsTaskEditor, { className: "UnitsTaskEditor", filePath: "app/DocumentDataSet/Components/UnitsTaskEditor.component.ts", lineNumber: 72 });
})();

// src/app/DocumentDataSet/DocumentDataSet.page.ts
var _c02 = ["unitsTaskEditor"];
var _c12 = ["dataSetTable"];
var DocumentDataSetComponent = class _DocumentDataSetComponent {
  unitsTaskEditor;
  dataSetTable;
  /**
   * Загружает полный DataSet с особовим складом через API
   */
  onDataSetSelected(dataSet) {
    if (!dataSet) {
      return;
    }
    this.unitsTaskEditor.loadDataSet(dataSet.id);
  }
  /**
   * Створює новий набір даних (очищає форму)
   */
  createNewDataSet() {
    this.unitsTaskEditor.createNewDataSet();
  }
  /** Оновлю таблицю наборів даних */
  loadDataSets() {
    this.dataSetTable.loadDataSets();
  }
  /** Оновлює рядок таблиці після збереження/публікації в редакторі */
  onDataSetChanged(dataSet) {
    this.dataSetTable.updateDataSetRow(dataSet);
  }
  static \u0275fac = function DocumentDataSetComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DocumentDataSetComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DocumentDataSetComponent, selectors: [["app-document-data-set-page"]], viewQuery: function DocumentDataSetComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c02, 5)(_c12, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.unitsTaskEditor = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.dataSetTable = _t.first);
    }
  }, features: [\u0275\u0275ProvidersFeature([provideNativeDateAdapter()])], decls: 15, vars: 0, consts: [["dataSetTable", ""], ["unitsTaskEditor", ""], ["storageKey", "documentDataSet"], ["leftPanel", ""], [1, "panel-header"], ["mat-icon-button", "", "matTooltip", "\u041E\u043D\u043E\u0432\u0438\u0442\u0438 \u043F\u0435\u0440\u0435\u043B\u0456\u043A", 3, "click"], ["mat-raised-button", "", "color", "primary", "matTooltip", "\u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438 \u043D\u0430\u0431\u0456\u0440", 3, "click"], [1, "dataset-table", 3, "dataSetSelected"], ["rightPanel", "", 2, "display", "flex", "flex-direction", "column", "height", "100%"], [3, "dataSetChanged"]], template: function DocumentDataSetComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "app-master-detail-layout", 2)(1, "div", 3)(2, "div", 4)(3, "button", 5);
      \u0275\u0275listener("click", function DocumentDataSetComponent_Template_button_click_3_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.loadDataSets());
      });
      \u0275\u0275elementStart(4, "mat-icon");
      \u0275\u0275text(5, "refresh");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "button", 6);
      \u0275\u0275listener("click", function DocumentDataSetComponent_Template_button_click_6_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.createNewDataSet());
      });
      \u0275\u0275elementStart(7, "mat-icon");
      \u0275\u0275text(8, "add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(9, " \u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438 \u043D\u0430\u0431\u0456\u0440 ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "app-template-dataset-table", 7, 0);
      \u0275\u0275listener("dataSetSelected", function DocumentDataSetComponent_Template_app_template_dataset_table_dataSetSelected_10_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onDataSetSelected($event));
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "div", 8)(13, "app-units-task-editor", 9, 1);
      \u0275\u0275listener("dataSetChanged", function DocumentDataSetComponent_Template_app_units_task_editor_dataSetChanged_13_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onDataSetChanged($event));
      });
      \u0275\u0275elementEnd()()();
    }
  }, dependencies: [
    CommonModule,
    MatTooltipModule,
    MatTooltip,
    MatIconModule,
    MatIcon,
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatTableModule,
    MatSortModule,
    MatMenuModule,
    MatDividerModule,
    MatTabsModule,
    MasterDetailLayoutComponent,
    DocDataSetsTableComponent,
    UnitsTaskEditor
  ], styles: ["\n\n.panel-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n  margin-bottom: 0.5rem;\n  background-color: #e3f2fd;\n  border-bottom: 1px solid #ddd;\n}\n.header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-shrink: 0;\n}\n.unit-tree[_ngcontent-%COMP%], \n.dataset-table[_ngcontent-%COMP%] {\n  height: 100%;\n  padding: 8px;\n}\n.selected-units-list[_ngcontent-%COMP%] {\n  padding: 16px;\n  flex: 1;\n  overflow: auto;\n  display: flex;\n  flex-direction: column;\n}\n.selected-units-list[_ngcontent-%COMP%]   .empty-list[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  color: #666;\n  text-align: center;\n}\n.selected-units-list[_ngcontent-%COMP%]   .empty-list[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  width: 64px;\n  height: 64px;\n  opacity: 0.3;\n  margin-bottom: 16px;\n}\n.selected-units-list[_ngcontent-%COMP%]   .empty-list[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 14px;\n}\n.selected-units-list[_ngcontent-%COMP%]   .units-list[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow: auto;\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.unit-details-card[_ngcontent-%COMP%] {\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);\n  margin-bottom: 12px;\n}\n.unit-details-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.unit-details-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   .remove-button[_ngcontent-%COMP%] {\n  margin-left: auto;\n}\n.unit-details-card[_ngcontent-%COMP%]   .unit-info-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 16px;\n  margin-bottom: 16px;\n}\n.unit-details-card[_ngcontent-%COMP%]   .unit-info-grid[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.unit-details-card[_ngcontent-%COMP%]   .unit-info-grid[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: rgba(0, 0, 0, 0.6);\n  font-size: 14px;\n  font-weight: 500;\n}\n.unit-details-card[_ngcontent-%COMP%]   .unit-info-grid[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 400;\n}\n.unit-details-card[_ngcontent-%COMP%]   .unit-info-grid[_ngcontent-%COMP%]   .info-item.inline[_ngcontent-%COMP%] {\n  flex-direction: row;\n  align-items: center;\n  gap: 8px;\n}\n.unit-details-card[_ngcontent-%COMP%]   .unit-info-grid[_ngcontent-%COMP%]   .info-item.inline[_ngcontent-%COMP%]   .task-select[_ngcontent-%COMP%] {\n  flex: 1;\n  max-width: 300px;\n}\n.unit-details-card[_ngcontent-%COMP%]   .unit-info-grid[_ngcontent-%COMP%]   .info-item.inline[_ngcontent-%COMP%]   .task-select[_ngcontent-%COMP%]     .mat-mdc-text-field-wrapper {\n  padding-bottom: 0;\n}\n.unit-details-card[_ngcontent-%COMP%]   .unit-info-grid[_ngcontent-%COMP%]   .info-item.inline[_ngcontent-%COMP%]   .task-select[_ngcontent-%COMP%]     .mat-mdc-form-field-subscript-wrapper {\n  display: none;\n}\n.unit-details-card[_ngcontent-%COMP%]   .unit-info-grid[_ngcontent-%COMP%]   .info-item.inline[_ngcontent-%COMP%]   .task-select[_ngcontent-%COMP%]     .mat-mdc-form-field-infix {\n  padding-top: 8px;\n  padding-bottom: 8px;\n  min-height: auto;\n}\n.unit-details-card[_ngcontent-%COMP%]   .unit-info-grid[_ngcontent-%COMP%]   .info-item.inline[_ngcontent-%COMP%]   .task-select[_ngcontent-%COMP%]     .mat-mdc-select {\n  font-size: 16px;\n}\n.unit-details-card[_ngcontent-%COMP%]   .unit-info-grid[_ngcontent-%COMP%]   .info-item.full-width[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n}\n.unit-details-card[_ngcontent-%COMP%]   .unit-info-grid[_ngcontent-%COMP%]   .info-item.comment[_ngcontent-%COMP%] {\n  flex-direction: column;\n  gap: 8px;\n}\n.unit-details-card[_ngcontent-%COMP%]   .unit-info-grid[_ngcontent-%COMP%]   .info-item.comment[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  word-wrap: break-word;\n  word-break: break-word;\n  white-space: pre-wrap;\n  max-width: 100%;\n  overflow-wrap: break-word;\n  -webkit-hyphens: auto;\n  hyphens: auto;\n  font-style: italic;\n  color: rgba(0, 0, 0, 0.6);\n}\n.unit-details-card[_ngcontent-%COMP%]   .task-assignments[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  gap: 16px;\n  align-items: flex-start;\n  margin-top: 16px;\n  margin-bottom: 16px;\n  padding: 16px;\n  background-color: #f5f5f5;\n  border-radius: 8px;\n}\n.unit-details-card[_ngcontent-%COMP%]   .task-assignments[_ngcontent-%COMP%]   .task-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  flex: 1;\n  min-width: 0;\n}\n.unit-details-card[_ngcontent-%COMP%]   .task-assignments[_ngcontent-%COMP%]   .task-item[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: rgba(0, 0, 0, 0.6);\n  font-size: 14px;\n  font-weight: 500;\n  white-space: nowrap;\n}\n.unit-details-card[_ngcontent-%COMP%]   .task-assignments[_ngcontent-%COMP%]   .task-item[_ngcontent-%COMP%]   .task-select[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.unit-details-card[_ngcontent-%COMP%]   .task-assignments[_ngcontent-%COMP%]   .task-item[_ngcontent-%COMP%]   .task-select[_ngcontent-%COMP%]     .mat-mdc-text-field-wrapper {\n  padding-bottom: 0;\n  background-color: white;\n}\n.unit-details-card[_ngcontent-%COMP%]   .task-assignments[_ngcontent-%COMP%]   .task-item[_ngcontent-%COMP%]   .task-select[_ngcontent-%COMP%]     .mat-mdc-form-field-subscript-wrapper {\n  display: none;\n}\n.unit-details-card[_ngcontent-%COMP%]   .task-assignments[_ngcontent-%COMP%]   .task-item[_ngcontent-%COMP%]   .task-select[_ngcontent-%COMP%]     .mat-mdc-form-field-infix {\n  padding-top: 8px;\n  padding-bottom: 8px;\n  min-height: auto;\n}\n.unit-details-card[_ngcontent-%COMP%]   .task-assignments[_ngcontent-%COMP%]   .task-item[_ngcontent-%COMP%]   .task-select[_ngcontent-%COMP%]     .mat-mdc-select {\n  font-size: 14px;\n}\n.section-content[_ngcontent-%COMP%] {\n  padding: 16px;\n}\n.section-content[_ngcontent-%COMP%]   table[_ngcontent-%COMP%] {\n  background: white;\n}\n.section-content[_ngcontent-%COMP%]   .fio[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #1976d2;\n}\n.section-content[_ngcontent-%COMP%]   .state-badge[_ngcontent-%COMP%] {\n  padding: 4px 8px;\n  border-radius: 12px;\n  font-size: 12px;\n  font-weight: 500;\n  background-color: #e3f2fd;\n  color: #1976d2;\n  border: 1px solid #bbdefb;\n}\n.section-content[_ngcontent-%COMP%]   .comment-cell[_ngcontent-%COMP%] {\n  max-width: 200px;\n  width: 200px;\n}\n.section-content[_ngcontent-%COMP%]   .comment-text[_ngcontent-%COMP%] {\n  display: block;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  max-width: 100%;\n  cursor: help;\n}\n.section-content[_ngcontent-%COMP%]   .delete-action[_ngcontent-%COMP%] {\n  color: #f44336;\n}\n.section-content[_ngcontent-%COMP%]   .no-soldiers[_ngcontent-%COMP%] {\n  padding: 16px;\n  text-align: center;\n  color: #666;\n  font-style: italic;\n  margin: 0;\n}\n@media (max-width: 768px) {\n  .content-panel[_ngcontent-%COMP%]    > mat-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 12px;\n  }\n  .content-panel[_ngcontent-%COMP%]    > mat-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .content-panel[_ngcontent-%COMP%]    > mat-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 8px;\n  }\n  .content-panel[_ngcontent-%COMP%]    > mat-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .document-field[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .selected-units-list[_ngcontent-%COMP%] {\n    padding: 8px;\n  }\n  .unit-details-card[_ngcontent-%COMP%]   .unit-info-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.status-toggle[_ngcontent-%COMP%]   mat-button-toggle[aria-pressed=true][_ngcontent-%COMP%]:has(mat-icon) {\n  font-weight: 600;\n}\n.status-toggle[_ngcontent-%COMP%]   mat-button-toggle[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n  margin-right: 4px;\n}\n.status-toggle[_ngcontent-%COMP%]   mat-button-toggle[ng-reflect-value=true][aria-pressed=true][_ngcontent-%COMP%] {\n  background-color: #e8f5e8;\n  color: #388e3c;\n}\n.status-toggle[_ngcontent-%COMP%]   mat-button-toggle[ng-reflect-value=true][aria-pressed=true][_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #388e3c;\n}\n.status-toggle[_ngcontent-%COMP%]   mat-button-toggle[ng-reflect-value=false][aria-pressed=true][_ngcontent-%COMP%] {\n  background-color: #fff3e0;\n  color: #f57c00;\n}\n.status-toggle[_ngcontent-%COMP%]   mat-button-toggle[ng-reflect-value=false][aria-pressed=true][_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #f57c00;\n}\n@keyframes _ngcontent-%COMP%_pulse {\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.5;\n  }\n}\n.mat-mdc-cell.row-overdue[_ngcontent-%COMP%] {\n  background-color: #ffcdd2 !important;\n}\n.mat-mdc-cell.row-overdue[_ngcontent-%COMP%]:hover {\n  background-color: #ef9a9a !important;\n}\n/*# sourceMappingURL=DocumentDataSet.page.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DocumentDataSetComponent, [{
    type: Component,
    args: [{ selector: "app-document-data-set-page", imports: [
      CommonModule,
      MatTooltipModule,
      MatIconModule,
      MatButtonModule,
      MatTableModule,
      MatSortModule,
      MatMenuModule,
      MatDividerModule,
      MatTabsModule,
      MasterDetailLayoutComponent,
      DocDataSetsTableComponent,
      UnitsTaskEditor
    ], providers: [provideNativeDateAdapter()], template: '<app-master-detail-layout storageKey="documentDataSet">\n  <!-- Left Panel: \u0414\u0435\u0440\u0435\u0432\u043E \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0456\u0432 \u0442\u0430 \u041D\u0430\u0431\u043E\u0440\u0438 \u0434\u0430\u043D\u0438\u0445 -->\n  <div leftPanel>\n    <div class="panel-header">\n      <button mat-icon-button (click)="loadDataSets()" matTooltip="\u041E\u043D\u043E\u0432\u0438\u0442\u0438 \u043F\u0435\u0440\u0435\u043B\u0456\u043A">\n        <mat-icon>refresh</mat-icon>\n      </button>\n      <button\n        mat-raised-button\n        color="primary"\n        (click)="createNewDataSet()"\n        matTooltip="\u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438 \u043D\u0430\u0431\u0456\u0440"\n      >\n        <mat-icon>add</mat-icon>\n        \u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438 \u043D\u0430\u0431\u0456\u0440\n      </button>\n    </div>\n    <!-- \u0422\u0430\u0431\u043B\u0438\u0446\u0430 \u0437 \u043D\u0430\u0431\u043E\u0440\u0430\u043C\u0438 \u0434\u0430\u043D\u0438\u0445 -->\n    <app-template-dataset-table\n      #dataSetTable\n      (dataSetSelected)="onDataSetSelected($event)"\n      class="dataset-table"\n    ></app-template-dataset-table>\n  </div>\n\n  <!-- Right Panel: \u0414\u0430\u043D\u0456 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430 -->\n  <div rightPanel style="display: flex; flex-direction: column; height: 100%">\n    <app-units-task-editor\n      #unitsTaskEditor\n      (dataSetChanged)="onDataSetChanged($event)"\n    ></app-units-task-editor>\n  </div>\n</app-master-detail-layout>\n', styles: ["/* src/app/DocumentDataSet/DocumentDataSet.page.scss */\n.panel-header {\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n  margin-bottom: 0.5rem;\n  background-color: #e3f2fd;\n  border-bottom: 1px solid #ddd;\n}\n.header-actions {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-shrink: 0;\n}\n.unit-tree,\n.dataset-table {\n  height: 100%;\n  padding: 8px;\n}\n.selected-units-list {\n  padding: 16px;\n  flex: 1;\n  overflow: auto;\n  display: flex;\n  flex-direction: column;\n}\n.selected-units-list .empty-list {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  color: #666;\n  text-align: center;\n}\n.selected-units-list .empty-list mat-icon {\n  font-size: 64px;\n  width: 64px;\n  height: 64px;\n  opacity: 0.3;\n  margin-bottom: 16px;\n}\n.selected-units-list .empty-list p {\n  margin: 0;\n  font-size: 14px;\n}\n.selected-units-list .units-list {\n  flex: 1;\n  overflow: auto;\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.unit-details-card {\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);\n  margin-bottom: 12px;\n}\n.unit-details-card mat-card-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.unit-details-card mat-card-header .remove-button {\n  margin-left: auto;\n}\n.unit-details-card .unit-info-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 16px;\n  margin-bottom: 16px;\n}\n.unit-details-card .unit-info-grid .info-item {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.unit-details-card .unit-info-grid .info-item strong {\n  color: rgba(0, 0, 0, 0.6);\n  font-size: 14px;\n  font-weight: 500;\n}\n.unit-details-card .unit-info-grid .info-item span {\n  font-size: 16px;\n  font-weight: 400;\n}\n.unit-details-card .unit-info-grid .info-item.inline {\n  flex-direction: row;\n  align-items: center;\n  gap: 8px;\n}\n.unit-details-card .unit-info-grid .info-item.inline .task-select {\n  flex: 1;\n  max-width: 300px;\n}\n.unit-details-card .unit-info-grid .info-item.inline .task-select ::ng-deep .mat-mdc-text-field-wrapper {\n  padding-bottom: 0;\n}\n.unit-details-card .unit-info-grid .info-item.inline .task-select ::ng-deep .mat-mdc-form-field-subscript-wrapper {\n  display: none;\n}\n.unit-details-card .unit-info-grid .info-item.inline .task-select ::ng-deep .mat-mdc-form-field-infix {\n  padding-top: 8px;\n  padding-bottom: 8px;\n  min-height: auto;\n}\n.unit-details-card .unit-info-grid .info-item.inline .task-select ::ng-deep .mat-mdc-select {\n  font-size: 16px;\n}\n.unit-details-card .unit-info-grid .info-item.full-width {\n  grid-column: 1/-1;\n}\n.unit-details-card .unit-info-grid .info-item.comment {\n  flex-direction: column;\n  gap: 8px;\n}\n.unit-details-card .unit-info-grid .info-item.comment span {\n  word-wrap: break-word;\n  word-break: break-word;\n  white-space: pre-wrap;\n  max-width: 100%;\n  overflow-wrap: break-word;\n  -webkit-hyphens: auto;\n  hyphens: auto;\n  font-style: italic;\n  color: rgba(0, 0, 0, 0.6);\n}\n.unit-details-card .task-assignments {\n  display: flex;\n  flex-direction: row;\n  gap: 16px;\n  align-items: flex-start;\n  margin-top: 16px;\n  margin-bottom: 16px;\n  padding: 16px;\n  background-color: #f5f5f5;\n  border-radius: 8px;\n}\n.unit-details-card .task-assignments .task-item {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  flex: 1;\n  min-width: 0;\n}\n.unit-details-card .task-assignments .task-item strong {\n  color: rgba(0, 0, 0, 0.6);\n  font-size: 14px;\n  font-weight: 500;\n  white-space: nowrap;\n}\n.unit-details-card .task-assignments .task-item .task-select {\n  width: 100%;\n}\n.unit-details-card .task-assignments .task-item .task-select ::ng-deep .mat-mdc-text-field-wrapper {\n  padding-bottom: 0;\n  background-color: white;\n}\n.unit-details-card .task-assignments .task-item .task-select ::ng-deep .mat-mdc-form-field-subscript-wrapper {\n  display: none;\n}\n.unit-details-card .task-assignments .task-item .task-select ::ng-deep .mat-mdc-form-field-infix {\n  padding-top: 8px;\n  padding-bottom: 8px;\n  min-height: auto;\n}\n.unit-details-card .task-assignments .task-item .task-select ::ng-deep .mat-mdc-select {\n  font-size: 14px;\n}\n.section-content {\n  padding: 16px;\n}\n.section-content table {\n  background: white;\n}\n.section-content .fio {\n  font-weight: 500;\n  color: #1976d2;\n}\n.section-content .state-badge {\n  padding: 4px 8px;\n  border-radius: 12px;\n  font-size: 12px;\n  font-weight: 500;\n  background-color: #e3f2fd;\n  color: #1976d2;\n  border: 1px solid #bbdefb;\n}\n.section-content .comment-cell {\n  max-width: 200px;\n  width: 200px;\n}\n.section-content .comment-text {\n  display: block;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  max-width: 100%;\n  cursor: help;\n}\n.section-content .delete-action {\n  color: #f44336;\n}\n.section-content .no-soldiers {\n  padding: 16px;\n  text-align: center;\n  color: #666;\n  font-style: italic;\n  margin: 0;\n}\n@media (max-width: 768px) {\n  .content-panel > mat-card mat-card-header {\n    flex-direction: column;\n    gap: 12px;\n  }\n  .content-panel > mat-card mat-card-header button {\n    width: 100%;\n  }\n  .content-panel > mat-card mat-card-content {\n    flex-direction: column;\n    gap: 8px;\n  }\n  .content-panel > mat-card mat-card-content .document-field {\n    width: 100%;\n  }\n  .selected-units-list {\n    padding: 8px;\n  }\n  .unit-details-card .unit-info-grid {\n    grid-template-columns: 1fr;\n  }\n}\n.status-toggle mat-button-toggle[aria-pressed=true]:has(mat-icon) {\n  font-weight: 600;\n}\n.status-toggle mat-button-toggle mat-icon {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n  margin-right: 4px;\n}\n.status-toggle mat-button-toggle[ng-reflect-value=true][aria-pressed=true] {\n  background-color: #e8f5e8;\n  color: #388e3c;\n}\n.status-toggle mat-button-toggle[ng-reflect-value=true][aria-pressed=true] mat-icon {\n  color: #388e3c;\n}\n.status-toggle mat-button-toggle[ng-reflect-value=false][aria-pressed=true] {\n  background-color: #fff3e0;\n  color: #f57c00;\n}\n.status-toggle mat-button-toggle[ng-reflect-value=false][aria-pressed=true] mat-icon {\n  color: #f57c00;\n}\n@keyframes pulse {\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.5;\n  }\n}\n.mat-mdc-cell.row-overdue {\n  background-color: #ffcdd2 !important;\n}\n.mat-mdc-cell.row-overdue:hover {\n  background-color: #ef9a9a !important;\n}\n/*# sourceMappingURL=DocumentDataSet.page.css.map */\n"] }]
  }], null, { unitsTaskEditor: [{
    type: ViewChild,
    args: ["unitsTaskEditor"]
  }], dataSetTable: [{
    type: ViewChild,
    args: ["dataSetTable"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DocumentDataSetComponent, { className: "DocumentDataSetComponent", filePath: "app/DocumentDataSet/DocumentDataSet.page.ts", lineNumber: 38 });
})();
export {
  DocumentDataSetComponent
};
//# sourceMappingURL=chunk-6NLGWDNI.js.map
