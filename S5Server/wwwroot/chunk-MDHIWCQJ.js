import {
  MatProgressBar,
  MatProgressBarModule
} from "./chunk-JU2PBNUN.js";
import {
  InlineEditManager,
  resolveUnitOperation
} from "./chunk-JTMUGMRH.js";
import {
  UnitService
} from "./chunk-OAESJCME.js";
import {
  MatAccordion,
  MatExpansionModule,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "./chunk-VCXMMO7C.js";
import {
  MatAutocomplete,
  MatAutocompleteModule,
  MatAutocompleteTrigger
} from "./chunk-55LSEEB4.js";
import {
  SoldierService
} from "./chunk-MU5M35L7.js";
import {
  SoldierUtils,
  UnitTag
} from "./chunk-W4R4MX4T.js";
import {
  MatCard,
  MatCardContent,
  MatCardModule
} from "./chunk-WOSA5N46.js";
import {
  MatTooltip,
  MatTooltipModule
} from "./chunk-ROBCPIX2.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-AY2LANKM.js";
import "./chunk-ACLG7KVS.js";
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
  MatTableModule
} from "./chunk-B6WYENQF.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-2EFRQAL5.js";
import "./chunk-GFPGE5B5.js";
import {
  AsyncPipe,
  CommonModule,
  Component,
  DatePipe,
  DefaultValueAccessor,
  FormControlDirective,
  HttpClient,
  Injectable,
  MatButton,
  MatButtonModule,
  MatFormField,
  MatFormFieldModule,
  MatIconButton,
  MatInput,
  MatInputModule,
  NgControlStatus,
  Observable,
  ReactiveFormsModule,
  SlicePipe,
  ViewChild,
  __spreadProps,
  __spreadValues,
  catchError,
  finalize,
  inject,
  setClassMetadata,
  signal,
  take,
  throwError,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
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
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵpipeBind3,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate3,
  ɵɵviewQuery
} from "./chunk-IBDYQGEV.js";

// src/app/Unit/Import/import.service.ts
var ImportSoldierStatus = /* @__PURE__ */ ((ImportSoldierStatus2) => {
  ImportSoldierStatus2[ImportSoldierStatus2["Inserted"] = 0] = "Inserted";
  ImportSoldierStatus2[ImportSoldierStatus2["Updated"] = 1] = "Updated";
  ImportSoldierStatus2[ImportSoldierStatus2["Deleted"] = 2] = "Deleted";
  return ImportSoldierStatus2;
})(ImportSoldierStatus || {});
var ImportProgressStatus = /* @__PURE__ */ ((ImportProgressStatus2) => {
  ImportProgressStatus2[ImportProgressStatus2["Start"] = 0] = "Start";
  ImportProgressStatus2[ImportProgressStatus2["Done"] = 1] = "Done";
  ImportProgressStatus2[ImportProgressStatus2["Failed"] = 2] = "Failed";
  ImportProgressStatus2[ImportProgressStatus2["UnitStart"] = 3] = "UnitStart";
  ImportProgressStatus2[ImportProgressStatus2["UnitDone"] = 4] = "UnitDone";
  ImportProgressStatus2[ImportProgressStatus2["UnitNotFound"] = 5] = "UnitNotFound";
  ImportProgressStatus2[ImportProgressStatus2["RecordDone"] = 6] = "RecordDone";
  return ImportProgressStatus2;
})(ImportProgressStatus || {});
var ImportUnitService = class _ImportUnitService {
  api = "/api/Unit";
  http = inject(HttpClient);
  importSoldiers(id, file) {
    const form = new FormData();
    form.append("soldiers", file);
    return this.http.post(`${this.api}/${id}/importSoldiers`, form).pipe(catchError((error) => {
      const message = S5App_ErrorHandler.handleHttpError(error, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u0456\u043C\u043F\u043E\u0440\u0442\u0443\u0432\u0430\u0442\u0438 \u043E\u0441\u043E\u0431\u043E\u0432\u0438\u0439 \u0441\u043A\u043B\u0430\u0434");
      return throwError(() => new Error(message));
    }));
  }
  getLastUnits() {
    return this.http.get(`${this.api}/get-last-units`).pipe(catchError((error) => {
      const message = S5App_ErrorHandler.handleHttpError(error, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u043E\u0442\u0440\u0438\u043C\u0430\u0442\u0438 \u043E\u0441\u0442\u0430\u043D\u043D\u0456 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0438");
      return throwError(() => new Error(message));
    }));
  }
  getUnits(units) {
    return this.http.post(`${this.api}/get-units`, units).pipe(catchError((error) => {
      const message = S5App_ErrorHandler.handleHttpError(error, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u043E\u0442\u0440\u0438\u043C\u0430\u0442\u0438 \u043F\u0435\u0440\u0435\u043B\u0456\u043A \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0456\u0432");
      return throwError(() => new Error(message));
    }));
  }
  /**
   * Підписка на Server-Sent Events для моніторингу прогресу імпорту
   * @returns Observable з подіями прогресу
   */
  subscribeToImportProgress() {
    return new Observable((observer) => {
      const eventSource = new EventSource(`${this.api}/imports/stream`);
      eventSource.onmessage = (event) => {
        try {
          const progress = JSON.parse(event.data);
          observer.next(progress);
        } catch (error) {
          console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043F\u0430\u0440\u0441\u0438\u043D\u0433\u0443 SSE \u043F\u043E\u0434\u0456\u0457:", error);
        }
      };
      eventSource.onerror = (error) => {
        console.error("SSE connection error:", error);
        eventSource.close();
        observer.error(error);
      };
      return () => {
        eventSource.close();
      };
    });
  }
  static \u0275fac = function ImportUnitService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ImportUnitService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ImportUnitService, factory: _ImportUnitService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ImportUnitService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/Unit/Import/ImportProgress.page.ts
var _c0 = ["fileInput"];
var _forTrack0 = ($index, $item) => $item.name;
var _forTrack1 = ($index, $item) => $item.id;
function ImportProgressPage_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "strong");
    \u0275\u0275text(2, "\u041F\u043E\u0442\u043E\u0447\u043D\u0438\u0439 \u0430\u0440\u043A\u0443\u0448:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.currentSheet());
  }
}
function ImportProgressPage_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "div", 15);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "mat-progress-bar", 16);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3(" \u041E\u0431\u0440\u043E\u0431\u043B\u0435\u043D\u043E: ", ctx_r1.processedRows(), " \u0437 ", ctx_r1.totalRows(), " (", ctx_r1.progressPercent(), "%) ");
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx_r1.progressPercent());
  }
}
function ImportProgressPage_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275element(1, "mat-progress-bar", 17);
    \u0275\u0275elementStart(2, "div", 15);
    \u0275\u0275text(3, "\u041F\u0456\u0434\u0433\u043E\u0442\u043E\u0432\u043A\u0430 \u0434\u043E \u0456\u043C\u043F\u043E\u0440\u0442\u0443...");
    \u0275\u0275elementEnd()();
  }
}
function ImportProgressPage_Conditional_16_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "check_circle");
    \u0275\u0275elementEnd();
  }
}
function ImportProgressPage_Conditional_16_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "error");
    \u0275\u0275elementEnd();
  }
}
function ImportProgressPage_Conditional_16_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "info");
    \u0275\u0275elementEnd();
  }
}
function ImportProgressPage_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275conditionalCreate(1, ImportProgressPage_Conditional_16_Conditional_1_Template, 2, 0, "mat-icon")(2, ImportProgressPage_Conditional_16_Conditional_2_Template, 2, 0, "mat-icon")(3, ImportProgressPage_Conditional_16_Conditional_3_Template, 2, 0, "mat-icon");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("error", ctx_r1.hasFailed())("success", ctx_r1.isCompleted() && !ctx_r1.hasFailed());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isCompleted() && !ctx_r1.hasFailed() ? 1 : ctx_r1.hasFailed() ? 2 : 3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.message(), " ");
  }
}
function ImportProgressPage_Conditional_17_For_5_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const unit_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("(", unit_r3.importedSoldiers.length, " \u043E\u0441\u0456\u0431)");
  }
}
function ImportProgressPage_Conditional_17_For_5_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 22)(1, "mat-icon", 26);
    \u0275\u0275text(2, "error");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " \u041F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B \u043D\u0435 \u0437\u043D\u0430\u0439\u0434\u0435\u043D\u043E ");
    \u0275\u0275elementEnd();
  }
}
function ImportProgressPage_Conditional_17_For_5_Conditional_7_th_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 49);
    \u0275\u0275text(1, "\u041E\u043F\u0435\u0440\u0430\u0446\u0456\u044F");
    \u0275\u0275elementEnd();
  }
}
function ImportProgressPage_Conditional_17_For_5_Conditional_7_td_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 51)(1, "mat-icon", 54);
    \u0275\u0275text(2, "add_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " \u0414\u043E\u0434\u0430\u043D\u043E ");
    \u0275\u0275elementEnd();
  }
}
function ImportProgressPage_Conditional_17_For_5_Conditional_7_td_3_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 52)(1, "mat-icon", 54);
    \u0275\u0275text(2, "update");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " \u041E\u043D\u043E\u0432\u043B\u0435\u043D\u043E ");
    \u0275\u0275elementEnd();
  }
}
function ImportProgressPage_Conditional_17_For_5_Conditional_7_td_3_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 53)(1, "mat-icon", 54);
    \u0275\u0275text(2, "delete");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " \u0412\u0438\u0434\u0430\u043B\u0435\u043D\u043E ");
    \u0275\u0275elementEnd();
  }
}
function ImportProgressPage_Conditional_17_For_5_Conditional_7_td_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 50);
    \u0275\u0275conditionalCreate(1, ImportProgressPage_Conditional_17_For_5_Conditional_7_td_3_Conditional_1_Template, 4, 0, "span", 51)(2, ImportProgressPage_Conditional_17_For_5_Conditional_7_td_3_Conditional_2_Template, 4, 0, "span", 52)(3, ImportProgressPage_Conditional_17_For_5_Conditional_7_td_3_Conditional_3_Template, 4, 0, "span", 53);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r4.status === ctx_r1.ImportSoldierStatus.Inserted ? 1 : item_r4.status === ctx_r1.ImportSoldierStatus.Updated ? 2 : item_r4.status === ctx_r1.ImportSoldierStatus.Deleted ? 3 : -1);
  }
}
function ImportProgressPage_Conditional_17_For_5_Conditional_7_th_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 49);
    \u0275\u0275text(1, "externId");
    \u0275\u0275elementEnd();
  }
}
function ImportProgressPage_Conditional_17_For_5_Conditional_7_td_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 50);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r5.soldier.externId);
  }
}
function ImportProgressPage_Conditional_17_For_5_Conditional_7_th_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 49);
    \u0275\u0275text(1, "\u041F\u0406\u0411");
    \u0275\u0275elementEnd();
  }
}
function ImportProgressPage_Conditional_17_For_5_Conditional_7_td_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 50);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.formatFIO(item_r6.soldier));
  }
}
function ImportProgressPage_Conditional_17_For_5_Conditional_7_th_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 49);
    \u0275\u0275text(1, "\u041F\u043E\u0437\u0438\u0432\u043D\u0438\u0439");
    \u0275\u0275elementEnd();
  }
}
function ImportProgressPage_Conditional_17_For_5_Conditional_7_td_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 50);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r7 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r7.soldier.nickName);
  }
}
function ImportProgressPage_Conditional_17_For_5_Conditional_7_th_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 49);
    \u0275\u0275text(1, "\u0417\u0432\u0430\u043D\u043D\u044F");
    \u0275\u0275elementEnd();
  }
}
function ImportProgressPage_Conditional_17_For_5_Conditional_7_td_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 50);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r8 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r8.soldier.rankShortValue);
  }
}
function ImportProgressPage_Conditional_17_For_5_Conditional_7_th_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 49);
    \u0275\u0275text(1, "\u041F\u043E\u0441\u0430\u0434\u0430");
    \u0275\u0275elementEnd();
  }
}
function ImportProgressPage_Conditional_17_For_5_Conditional_7_td_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 50);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r9 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r9.soldier.positionValue);
  }
}
function ImportProgressPage_Conditional_17_For_5_Conditional_7_th_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 49);
    \u0275\u0275text(1, "\u0421\u0442\u0430\u0442\u0443\u0441");
    \u0275\u0275elementEnd();
  }
}
function ImportProgressPage_Conditional_17_For_5_Conditional_7_td_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 50)(1, "span", 55);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r10 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r10.soldier.stateValue);
  }
}
function ImportProgressPage_Conditional_17_For_5_Conditional_7_th_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 49);
    \u0275\u0275text(1, "\u041F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B");
    \u0275\u0275elementEnd();
  }
}
function ImportProgressPage_Conditional_17_For_5_Conditional_7_td_24_Conditional_1_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 62);
    \u0275\u0275text(1, "\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F...");
    \u0275\u0275elementEnd();
  }
}
function ImportProgressPage_Conditional_17_For_5_Conditional_7_td_24_Conditional_1_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 63);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const unit_r13 = ctx.$implicit;
    \u0275\u0275property("value", unit_r13);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(unit_r13.value);
  }
}
function ImportProgressPage_Conditional_17_For_5_Conditional_7_td_24_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 57)(1, "mat-form-field", 59);
    \u0275\u0275element(2, "input", 60);
    \u0275\u0275elementStart(3, "mat-autocomplete", 61, 1);
    \u0275\u0275listener("optionSelected", function ImportProgressPage_Conditional_17_For_5_Conditional_7_td_24_Conditional_1_Template_mat_autocomplete_optionSelected_3_listener($event) {
      \u0275\u0275restoreView(_r11);
      const item_r12 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.onSelect(item_r12.soldier, ctx_r1.UnitTag.UnitId, $event));
    });
    \u0275\u0275conditionalCreate(5, ImportProgressPage_Conditional_17_For_5_Conditional_7_td_24_Conditional_1_Conditional_5_Template, 2, 0, "mat-option", 62);
    \u0275\u0275repeaterCreate(6, ImportProgressPage_Conditional_17_For_5_Conditional_7_td_24_Conditional_1_For_7_Template, 2, 2, "mat-option", 63, _forTrack1);
    \u0275\u0275pipe(8, "async");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "button", 64);
    \u0275\u0275listener("click", function ImportProgressPage_Conditional_17_For_5_Conditional_7_td_24_Conditional_1_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r11);
      const item_r12 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.inlineEdit.clear(item_r12.soldier.id));
    });
    \u0275\u0275elementStart(10, "mat-icon");
    \u0275\u0275text(11, "close");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const unitAuto_r14 = \u0275\u0275reference(4);
    const item_r12 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275property("formControl", ctx_r1.getControl(item_r12.soldier, ctx_r1.UnitTag.UnitId))("matAutocomplete", unitAuto_r14);
    \u0275\u0275advance();
    \u0275\u0275property("displayWith", ctx_r1.inlineEdit.displayLookupFn);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.inlineEdit.loading(item_r12.soldier.id) ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(\u0275\u0275pipeBind1(8, 4, ctx_r1.inlineEdit.options(item_r12.soldier.id)));
  }
}
function ImportProgressPage_Conditional_17_For_5_Conditional_7_td_24_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 58)(1, "span", 65);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 66);
    \u0275\u0275listener("click", function ImportProgressPage_Conditional_17_For_5_Conditional_7_td_24_Conditional_2_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r15);
      const item_r12 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.startEditing(item_r12.soldier, ctx_r1.UnitTag.UnitId));
    });
    \u0275\u0275elementStart(4, "mat-icon");
    \u0275\u0275text(5, "edit");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r12 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r12.soldier.unitShortName);
  }
}
function ImportProgressPage_Conditional_17_For_5_Conditional_7_td_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 56);
    \u0275\u0275conditionalCreate(1, ImportProgressPage_Conditional_17_For_5_Conditional_7_td_24_Conditional_1_Template, 12, 6, "div", 57)(2, ImportProgressPage_Conditional_17_For_5_Conditional_7_td_24_Conditional_2_Template, 6, 1, "div", 58);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r12 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.inlineEdit.isMode(item_r12.soldier.id, ctx_r1.UnitTag.UnitId) ? 1 : 2);
  }
}
function ImportProgressPage_Conditional_17_For_5_Conditional_7_th_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 49);
    \u0275\u0275text(1, "\u041F\u0440\u0438\u0434\u0430\u043D\u0438\u0439 \u0434\u043E");
    \u0275\u0275elementEnd();
  }
}
function ImportProgressPage_Conditional_17_For_5_Conditional_7_td_27_Conditional_1_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 62);
    \u0275\u0275text(1, "\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F...");
    \u0275\u0275elementEnd();
  }
}
function ImportProgressPage_Conditional_17_For_5_Conditional_7_td_27_Conditional_1_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 63);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const unit_r18 = ctx.$implicit;
    \u0275\u0275property("value", unit_r18);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(unit_r18.value);
  }
}
function ImportProgressPage_Conditional_17_For_5_Conditional_7_td_27_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 57)(1, "mat-form-field", 59);
    \u0275\u0275element(2, "input", 68);
    \u0275\u0275elementStart(3, "mat-autocomplete", 61, 2);
    \u0275\u0275listener("optionSelected", function ImportProgressPage_Conditional_17_For_5_Conditional_7_td_27_Conditional_1_Template_mat_autocomplete_optionSelected_3_listener($event) {
      \u0275\u0275restoreView(_r16);
      const item_r17 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.onSelect(item_r17.soldier, ctx_r1.UnitTag.AssignedId, $event));
    });
    \u0275\u0275elementStart(5, "mat-option", 63);
    \u0275\u0275text(6, "\u041D\u0435 \u043F\u0440\u0438\u0434\u0430\u043D\u0438\u0439");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, ImportProgressPage_Conditional_17_For_5_Conditional_7_td_27_Conditional_1_Conditional_7_Template, 2, 0, "mat-option", 62);
    \u0275\u0275repeaterCreate(8, ImportProgressPage_Conditional_17_For_5_Conditional_7_td_27_Conditional_1_For_9_Template, 2, 2, "mat-option", 63, _forTrack1);
    \u0275\u0275pipe(10, "async");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "button", 64);
    \u0275\u0275listener("click", function ImportProgressPage_Conditional_17_For_5_Conditional_7_td_27_Conditional_1_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r16);
      const item_r17 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.inlineEdit.clear(item_r17.soldier.id));
    });
    \u0275\u0275elementStart(12, "mat-icon");
    \u0275\u0275text(13, "close");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const assignedAuto_r19 = \u0275\u0275reference(4);
    const item_r17 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275property("formControl", ctx_r1.getControl(item_r17.soldier, ctx_r1.UnitTag.AssignedId))("matAutocomplete", assignedAuto_r19);
    \u0275\u0275advance();
    \u0275\u0275property("displayWith", ctx_r1.inlineEdit.displayLookupFn);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", null);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.inlineEdit.loading(item_r17.soldier.id) ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(\u0275\u0275pipeBind1(10, 5, ctx_r1.inlineEdit.options(item_r17.soldier.id)));
  }
}
function ImportProgressPage_Conditional_17_For_5_Conditional_7_td_27_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 58)(1, "span", 65);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 66);
    \u0275\u0275listener("click", function ImportProgressPage_Conditional_17_For_5_Conditional_7_td_27_Conditional_2_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r20);
      const item_r17 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.startEditing(item_r17.soldier, ctx_r1.UnitTag.AssignedId));
    });
    \u0275\u0275elementStart(4, "mat-icon");
    \u0275\u0275text(5, "edit");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r17 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r17.soldier.assignedUnitShortName || "-");
  }
}
function ImportProgressPage_Conditional_17_For_5_Conditional_7_td_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 67);
    \u0275\u0275conditionalCreate(1, ImportProgressPage_Conditional_17_For_5_Conditional_7_td_27_Conditional_1_Template, 14, 7, "div", 57)(2, ImportProgressPage_Conditional_17_For_5_Conditional_7_td_27_Conditional_2_Template, 6, 1, "div", 58);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r17 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.inlineEdit.isMode(item_r17.soldier.id, ctx_r1.UnitTag.AssignedId) ? 1 : 2);
  }
}
function ImportProgressPage_Conditional_17_For_5_Conditional_7_th_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 49);
    \u0275\u0275text(1, "\u0415\u043A\u0456\u043F\u0430\u0436/\u0413\u0440\u0443\u043F\u0430");
    \u0275\u0275elementEnd();
  }
}
function ImportProgressPage_Conditional_17_For_5_Conditional_7_td_30_Conditional_1_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 62);
    \u0275\u0275text(1, "\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F...");
    \u0275\u0275elementEnd();
  }
}
function ImportProgressPage_Conditional_17_For_5_Conditional_7_td_30_Conditional_1_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 63);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const unit_r23 = ctx.$implicit;
    \u0275\u0275property("value", unit_r23);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(unit_r23.value);
  }
}
function ImportProgressPage_Conditional_17_For_5_Conditional_7_td_30_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 57)(1, "mat-form-field", 59);
    \u0275\u0275element(2, "input", 70);
    \u0275\u0275elementStart(3, "mat-autocomplete", 61, 3);
    \u0275\u0275listener("optionSelected", function ImportProgressPage_Conditional_17_For_5_Conditional_7_td_30_Conditional_1_Template_mat_autocomplete_optionSelected_3_listener($event) {
      \u0275\u0275restoreView(_r21);
      const item_r22 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.onSelect(item_r22.soldier, ctx_r1.UnitTag.InvolvedId, $event));
    });
    \u0275\u0275elementStart(5, "mat-option", 63);
    \u0275\u0275text(6, "\u041D\u0435 \u043F\u0440\u0438\u0437\u043D\u0430\u0447\u0435\u043D\u043E");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, ImportProgressPage_Conditional_17_For_5_Conditional_7_td_30_Conditional_1_Conditional_7_Template, 2, 0, "mat-option", 62);
    \u0275\u0275repeaterCreate(8, ImportProgressPage_Conditional_17_For_5_Conditional_7_td_30_Conditional_1_For_9_Template, 2, 2, "mat-option", 63, _forTrack1);
    \u0275\u0275pipe(10, "async");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "button", 64);
    \u0275\u0275listener("click", function ImportProgressPage_Conditional_17_For_5_Conditional_7_td_30_Conditional_1_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r21);
      const item_r22 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.inlineEdit.clear(item_r22.soldier.id));
    });
    \u0275\u0275elementStart(12, "mat-icon");
    \u0275\u0275text(13, "close");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const involvedAuto_r24 = \u0275\u0275reference(4);
    const item_r22 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275property("formControl", ctx_r1.getControl(item_r22.soldier, ctx_r1.UnitTag.InvolvedId))("matAutocomplete", involvedAuto_r24);
    \u0275\u0275advance();
    \u0275\u0275property("displayWith", ctx_r1.inlineEdit.displayLookupFn);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", null);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.inlineEdit.loading(item_r22.soldier.id) ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(\u0275\u0275pipeBind1(10, 5, ctx_r1.inlineEdit.options(item_r22.soldier.id)));
  }
}
function ImportProgressPage_Conditional_17_For_5_Conditional_7_td_30_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 58)(1, "span", 65);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 66);
    \u0275\u0275listener("click", function ImportProgressPage_Conditional_17_For_5_Conditional_7_td_30_Conditional_2_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r25);
      const item_r22 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.startEditing(item_r22.soldier, ctx_r1.UnitTag.InvolvedId));
    });
    \u0275\u0275elementStart(4, "mat-icon");
    \u0275\u0275text(5, "edit");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r22 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r22.soldier.involvedUnitShortName || "-");
  }
}
function ImportProgressPage_Conditional_17_For_5_Conditional_7_td_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 69);
    \u0275\u0275conditionalCreate(1, ImportProgressPage_Conditional_17_For_5_Conditional_7_td_30_Conditional_1_Template, 14, 7, "div", 57)(2, ImportProgressPage_Conditional_17_For_5_Conditional_7_td_30_Conditional_2_Template, 6, 1, "div", 58);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r22 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.inlineEdit.isMode(item_r22.soldier.id, ctx_r1.UnitTag.InvolvedId) ? 1 : 2);
  }
}
function ImportProgressPage_Conditional_17_For_5_Conditional_7_th_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 49);
    \u0275\u0275text(1, "\u041F\u0440\u0438\u0431\u0443\u0432");
    \u0275\u0275elementEnd();
  }
}
function ImportProgressPage_Conditional_17_For_5_Conditional_7_td_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 50);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r26 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r26.soldier.arrivedAt ? \u0275\u0275pipeBind2(2, 1, item_r26.soldier.arrivedAt, "dd.MM.yyyy") : "-", " ");
  }
}
function ImportProgressPage_Conditional_17_For_5_Conditional_7_th_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 49);
    \u0275\u0275text(1, "\u0412\u0438\u0431\u0443\u0432");
    \u0275\u0275elementEnd();
  }
}
function ImportProgressPage_Conditional_17_For_5_Conditional_7_td_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 50);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r27 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r27.soldier.departedAt ? \u0275\u0275pipeBind2(2, 1, item_r27.soldier.departedAt, "dd.MM.yyyy") : "-", " ");
  }
}
function ImportProgressPage_Conditional_17_For_5_Conditional_7_th_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 49);
    \u0275\u0275text(1, "\u041A\u043E\u043C\u0435\u043D\u0442\u0430\u0440");
    \u0275\u0275elementEnd();
  }
}
function ImportProgressPage_Conditional_17_For_5_Conditional_7_td_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 71)(1, "span", 72);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "slice");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r28 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("matTooltip", item_r28.soldier.comment && item_r28.soldier.comment.length > 50 ? item_r28.soldier.comment : "")("title", item_r28.soldier.comment && item_r28.soldier.comment.length > 50 ? item_r28.soldier.comment : "");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r28.soldier.comment ? item_r28.soldier.comment.length > 50 ? \u0275\u0275pipeBind3(3, 3, item_r28.soldier.comment, 0, 50) + "..." : item_r28.soldier.comment : "-", " ");
  }
}
function ImportProgressPage_Conditional_17_For_5_Conditional_7_th_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 49);
    \u0275\u0275text(1, "\u0414\u0430\u0442\u0430 \u043D\u0430\u0440\u043E\u0434\u0436\u0435\u043D\u043D\u044F");
    \u0275\u0275elementEnd();
  }
}
function ImportProgressPage_Conditional_17_For_5_Conditional_7_td_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 50);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r29 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r29.soldier.birthDate);
  }
}
function ImportProgressPage_Conditional_17_For_5_Conditional_7_tr_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 73);
  }
}
function ImportProgressPage_Conditional_17_For_5_Conditional_7_tr_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 74);
  }
}
function ImportProgressPage_Conditional_17_For_5_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 24);
    \u0275\u0275elementContainerStart(1, 27);
    \u0275\u0275template(2, ImportProgressPage_Conditional_17_For_5_Conditional_7_th_2_Template, 2, 0, "th", 28)(3, ImportProgressPage_Conditional_17_For_5_Conditional_7_td_3_Template, 4, 1, "td", 29);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(4, 30);
    \u0275\u0275template(5, ImportProgressPage_Conditional_17_For_5_Conditional_7_th_5_Template, 2, 0, "th", 28)(6, ImportProgressPage_Conditional_17_For_5_Conditional_7_td_6_Template, 2, 1, "td", 29);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(7, 31);
    \u0275\u0275template(8, ImportProgressPage_Conditional_17_For_5_Conditional_7_th_8_Template, 2, 0, "th", 28)(9, ImportProgressPage_Conditional_17_For_5_Conditional_7_td_9_Template, 2, 1, "td", 29);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(10, 32);
    \u0275\u0275template(11, ImportProgressPage_Conditional_17_For_5_Conditional_7_th_11_Template, 2, 0, "th", 28)(12, ImportProgressPage_Conditional_17_For_5_Conditional_7_td_12_Template, 2, 1, "td", 29);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(13, 33);
    \u0275\u0275template(14, ImportProgressPage_Conditional_17_For_5_Conditional_7_th_14_Template, 2, 0, "th", 28)(15, ImportProgressPage_Conditional_17_For_5_Conditional_7_td_15_Template, 2, 1, "td", 29);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(16, 34);
    \u0275\u0275template(17, ImportProgressPage_Conditional_17_For_5_Conditional_7_th_17_Template, 2, 0, "th", 28)(18, ImportProgressPage_Conditional_17_For_5_Conditional_7_td_18_Template, 2, 1, "td", 29);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(19, 35);
    \u0275\u0275template(20, ImportProgressPage_Conditional_17_For_5_Conditional_7_th_20_Template, 2, 0, "th", 28)(21, ImportProgressPage_Conditional_17_For_5_Conditional_7_td_21_Template, 3, 1, "td", 29);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(22, 36);
    \u0275\u0275template(23, ImportProgressPage_Conditional_17_For_5_Conditional_7_th_23_Template, 2, 0, "th", 28)(24, ImportProgressPage_Conditional_17_For_5_Conditional_7_td_24_Template, 3, 1, "td", 37);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(25, 38);
    \u0275\u0275template(26, ImportProgressPage_Conditional_17_For_5_Conditional_7_th_26_Template, 2, 0, "th", 28)(27, ImportProgressPage_Conditional_17_For_5_Conditional_7_td_27_Template, 3, 1, "td", 39);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(28, 40);
    \u0275\u0275template(29, ImportProgressPage_Conditional_17_For_5_Conditional_7_th_29_Template, 2, 0, "th", 28)(30, ImportProgressPage_Conditional_17_For_5_Conditional_7_td_30_Template, 3, 1, "td", 41);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(31, 42);
    \u0275\u0275template(32, ImportProgressPage_Conditional_17_For_5_Conditional_7_th_32_Template, 2, 0, "th", 28)(33, ImportProgressPage_Conditional_17_For_5_Conditional_7_td_33_Template, 3, 4, "td", 29);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(34, 43);
    \u0275\u0275template(35, ImportProgressPage_Conditional_17_For_5_Conditional_7_th_35_Template, 2, 0, "th", 28)(36, ImportProgressPage_Conditional_17_For_5_Conditional_7_td_36_Template, 3, 4, "td", 29);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(37, 44);
    \u0275\u0275template(38, ImportProgressPage_Conditional_17_For_5_Conditional_7_th_38_Template, 2, 0, "th", 28)(39, ImportProgressPage_Conditional_17_For_5_Conditional_7_td_39_Template, 4, 7, "td", 45);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(40, 46);
    \u0275\u0275template(41, ImportProgressPage_Conditional_17_For_5_Conditional_7_th_41_Template, 2, 0, "th", 28)(42, ImportProgressPage_Conditional_17_For_5_Conditional_7_td_42_Template, 2, 1, "td", 29);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(43, ImportProgressPage_Conditional_17_For_5_Conditional_7_tr_43_Template, 1, 0, "tr", 47)(44, ImportProgressPage_Conditional_17_For_5_Conditional_7_tr_44_Template, 1, 0, "tr", 48);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const unit_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("dataSource", unit_r3.importedSoldiers);
    \u0275\u0275advance(43);
    \u0275\u0275property("matHeaderRowDef", ctx_r1.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r1.displayedColumns);
  }
}
function ImportProgressPage_Conditional_17_For_5_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 25);
    \u0275\u0275text(1, "\u041D\u0435\u043C\u0430\u0454 \u0456\u043C\u043F\u043E\u0440\u0442\u043E\u0432\u0430\u043D\u0438\u0445 \u0431\u0456\u0439\u0446\u0456\u0432");
    \u0275\u0275elementEnd();
  }
}
function ImportProgressPage_Conditional_17_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-expansion-panel", 20)(1, "mat-expansion-panel-header")(2, "mat-panel-title");
    \u0275\u0275text(3);
    \u0275\u0275conditionalCreate(4, ImportProgressPage_Conditional_17_For_5_Conditional_4_Template, 2, 1, "span", 21);
    \u0275\u0275conditionalCreate(5, ImportProgressPage_Conditional_17_For_5_Conditional_5_Template, 4, 0, "span", 22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 23);
    \u0275\u0275conditionalCreate(7, ImportProgressPage_Conditional_17_For_5_Conditional_7_Template, 45, 3, "table", 24)(8, ImportProgressPage_Conditional_17_For_5_Conditional_8_Template, 2, 0, "p", 25);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const unit_r3 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", unit_r3.name, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(unit_r3.importedSoldiers ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(unit_r3.status === ctx_r1.ImportProgressStatus.UnitNotFound ? 5 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(unit_r3.importedSoldiers && unit_r3.importedSoldiers.length > 0 ? 7 : 8);
  }
}
function ImportProgressPage_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "h2");
    \u0275\u0275text(2, "\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0438 \u0456\u043C\u043F\u043E\u0440\u0442\u0443");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "mat-accordion", 19);
    \u0275\u0275repeaterCreate(4, ImportProgressPage_Conditional_17_For_5_Template, 9, 4, "mat-expansion-panel", 20, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r1.completedSheets());
  }
}
var ImportProgressPage = class _ImportProgressPage {
  router = inject(Router);
  route = inject(ActivatedRoute);
  importUnitService = inject(ImportUnitService);
  snackBar = inject(MatSnackBar);
  soldierService = inject(SoldierService);
  unitService = inject(UnitService);
  fileInput;
  displayedColumns = [
    "operation",
    "externId",
    "fio",
    "nickName",
    "rankShortValue",
    "positionValue",
    "stateValue",
    "unitShortName",
    "assignedUnitShortName",
    "involvedUnitShortName",
    "arrivedAt",
    "departedAt",
    "birthDate",
    "comment"
  ];
  unitId = null;
  isLoadingUnits = false;
  currentSheet = signal(null, ...ngDevMode ? [{ debugName: "currentSheet" }] : []);
  processedRows = signal(0, ...ngDevMode ? [{ debugName: "processedRows" }] : []);
  totalRows = signal(0, ...ngDevMode ? [{ debugName: "totalRows" }] : []);
  message = signal(null, ...ngDevMode ? [{ debugName: "message" }] : []);
  completedSheets = signal([], ...ngDevMode ? [{ debugName: "completedSheets" }] : []);
  isCompleted = signal(false, ...ngDevMode ? [{ debugName: "isCompleted" }] : []);
  hasFailed = signal(false, ...ngDevMode ? [{ debugName: "hasFailed" }] : []);
  UnitTag = UnitTag;
  inlineEdit = new InlineEditManager((column, term) => this.unitService.lookup(term, column === UnitTag.InvolvedId));
  // Експортуємо enum для використання в шаблоні
  ImportProgressStatus = ImportProgressStatus;
  ImportSoldierStatus = ImportSoldierStatus;
  progressPercent = () => {
    const total = this.totalRows();
    const processed = this.processedRows();
    return total > 0 ? Math.round(processed / total * 100) : 0;
  };
  progressSubscription;
  ngOnInit() {
    this.route.queryParams.pipe(take(1)).subscribe((params) => {
      this.unitId = params["unitId"] || null;
      if (!this.unitId) {
        this.snackBar.open("\u0412\u0456\u0434\u0441\u0443\u0442\u043D\u0456\u0439 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B \u0434\u043B\u044F \u0456\u043C\u043F\u043E\u0440\u0442\u0443", "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
        this.goBack();
        return;
      }
    });
    this.progressSubscription = this.importUnitService.subscribeToImportProgress().subscribe({
      next: (progress) => {
        this.handleProgress(progress);
      },
      error: (error) => {
        console.error("SSE connection error:", error);
        this.message.set("\u0412\u0442\u0440\u0430\u0447\u0435\u043D\u043E \u0437'\u0454\u0434\u043D\u0430\u043D\u043D\u044F \u0437 \u0441\u0435\u0440\u0432\u0435\u0440\u043E\u043C");
        this.hasFailed.set(true);
      }
    });
    setTimeout(() => {
      this.openFileDialog();
    }, 100);
  }
  ngOnDestroy() {
    if (this.progressSubscription) {
      this.progressSubscription.unsubscribe();
    }
  }
  /**
   * Обробка прогресу імпорту
   * @param progress
   */
  handleProgress(progress) {
    switch (progress.status) {
      case 0 /* Start */:
        this.message.set("\u0406\u043C\u043F\u043E\u0440\u0442 \u0440\u043E\u0437\u043F\u043E\u0447\u0430\u0442\u043E...");
        this.isCompleted.set(false);
        this.hasFailed.set(false);
        this.completedSheets.set([]);
        this.currentSheet.set(null);
        this.processedRows.set(0);
        this.totalRows.set(0);
        break;
      case 3 /* UnitStart */:
        this.currentSheet.set(progress.sheet || null);
        this.processedRows.set(0);
        this.totalRows.set(progress.total);
        this.message.set(`\u041E\u0431\u0440\u043E\u0431\u043A\u0430 \u0430\u0440\u043A\u0443\u0448\u0443: ${progress.sheet}`);
        break;
      case 6 /* RecordDone */:
        this.currentSheet.set(progress.sheet || null);
        this.processedRows.set(progress.processed);
        this.totalRows.set(progress.total);
        break;
      case 4 /* UnitDone */:
      case 5 /* UnitNotFound */:
        if (progress.sheet && !this.isLoadingUnits) {
          this.isLoadingUnits = true;
          this.importUnitService.getLastUnits().pipe(finalize(() => {
            this.isLoadingUnits = false;
          })).subscribe({
            next: (units) => {
              const loadedUnitNames = this.completedSheets().map((sheet) => sheet.name);
              const newUnits = units.filter((unitName) => !loadedUnitNames.includes(unitName));
              if (newUnits.length > 0) {
                this.importUnitService.getUnits(newUnits).subscribe({
                  next: (newLoadedUnits) => {
                    const currentSheets = this.completedSheets();
                    this.completedSheets.set([...currentSheets, ...newLoadedUnits]);
                  },
                  error: (error) => {
                    console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0456\u0432:", error);
                    this.snackBar.open("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u0434\u0435\u044F\u043A\u0438\u0445 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0456\u0432", "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", {
                      duration: 3e3
                    });
                  }
                });
              }
            },
            error: (error) => {
              console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043E\u0442\u0440\u0438\u043C\u0430\u043D\u043D\u044F \u0441\u043F\u0438\u0441\u043A\u0443 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0456\u0432:", error);
              this.snackBar.open("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043E\u0442\u0440\u0438\u043C\u0430\u043D\u043D\u044F \u0441\u043F\u0438\u0441\u043A\u0443 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0456\u0432", "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", {
                duration: 3e3
              });
            }
          });
        }
        break;
      case 1 /* Done */:
        this.message.set("\u0406\u043C\u043F\u043E\u0440\u0442 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043E \u0443\u0441\u043F\u0456\u0448\u043D\u043E!");
        this.isCompleted.set(true);
        break;
      case 2 /* Failed */:
        this.message.set(progress.message || "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0456\u043C\u043F\u043E\u0440\u0442\u0443");
        this.hasFailed.set(true);
        this.isCompleted.set(true);
        break;
      default:
        console.warn("\u041D\u0435\u0432\u0456\u0434\u043E\u043C\u0438\u0439 \u0441\u0442\u0430\u0442\u0443\u0441 \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0443:", progress.status);
        break;
    }
  }
  /**
   * Відкриває діалог вибору файлу
   */
  openFileDialog() {
    if (this.fileInput) {
      this.fileInput.nativeElement.click();
    }
  }
  /**
   * Обробка вибору файлу
   */
  onFileSelected(event) {
    const input = event.target;
    const file = input.files?.[0];
    if (!file) {
      this.goBack();
      return;
    }
    this.importUnitService.importSoldiers(this.unitId, file).subscribe({
      next: (response) => {
        if (response.status === "Failed") {
          this.snackBar.open(`\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0456\u043C\u043F\u043E\u0440\u0442\u0443: ${response.error || "\u041D\u0435\u0432\u0456\u0434\u043E\u043C\u0430 \u043F\u043E\u043C\u0438\u043B\u043A\u0430"}`, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 7e3 });
          this.hasFailed.set(true);
        }
      },
      error: (error) => {
        if (error.status === 423) {
          this.snackBar.open("\u0406\u043C\u043F\u043E\u0440\u0442 \u0432\u0436\u0435 \u0432\u0438\u043A\u043E\u043D\u0443\u0454\u0442\u044C\u0441\u044F. \u0417\u0430\u0447\u0435\u043A\u0430\u0439\u0442\u0435 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043D\u044F \u043F\u043E\u0442\u043E\u0447\u043D\u043E\u0457 \u043E\u043F\u0435\u0440\u0430\u0446\u0456\u0457.", "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
        } else {
          const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0456\u043C\u043F\u043E\u0440\u0442\u0443 \u043E\u0441\u043E\u0431\u043E\u0432\u043E\u0433\u043E \u0441\u043A\u043B\u0430\u0434\u0443");
          this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
        }
        this.hasFailed.set(true);
      }
    });
    input.value = "";
  }
  goBack() {
    this.router.navigate(["/units"]);
  }
  // === Inline edit helpers ===
  startEditing(soldier, column) {
    this.inlineEdit.startEdit(soldier.id, column, InlineEditManager.getInitialValue(soldier, column));
  }
  getControl(soldier, column) {
    return this.inlineEdit.getFormControl(soldier.id, column, InlineEditManager.getInitialValue(soldier, column));
  }
  onSelect(soldier, column, event) {
    const result = resolveUnitOperation(this.soldierService, soldier.id, column, event.option.value);
    if (!result) {
      return;
    }
    result.operation.subscribe({
      next: (updated) => {
        this.inlineEdit.clear(soldier.id);
        this.patchSoldier(updated);
        this.snackBar.open(result.message, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 2e3 });
      },
      error: (error) => {
        const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043E\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u044F \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0443");
        this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
      }
    });
  }
  patchSoldier(updated) {
    const next = this.completedSheets().map((unit) => __spreadProps(__spreadValues({}, unit), {
      importedSoldiers: unit.importedSoldiers.map((entry) => entry.soldier.id === updated.id ? __spreadProps(__spreadValues({}, entry), { soldier: updated }) : entry)
    }));
    this.completedSheets.set(next);
  }
  formatFIO(item) {
    return SoldierUtils.formatFIO(item.firstName, item.midleName, item.lastName);
  }
  static \u0275fac = function ImportProgressPage_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ImportProgressPage)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ImportProgressPage, selectors: [["app-import-progress-page"]], viewQuery: function ImportProgressPage_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.fileInput = _t.first);
    }
  }, decls: 23, vars: 4, consts: [["fileInput", ""], ["unitAuto", "matAutocomplete"], ["assignedAuto", "matAutocomplete"], ["involvedAuto", "matAutocomplete"], [1, "import-progress-page"], ["type", "file", "accept", ".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", 2, "display", "none", 3, "change"], [1, "page-header"], ["mat-icon-button", "", "matTooltip", "\u041D\u0430\u0437\u0430\u0434 \u0434\u043E \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0456\u0432", 3, "click"], [1, "progress-card"], [1, "sheet-info"], [1, "progress-info"], [1, "status-message", 3, "error", "success"], [1, "results-section"], [1, "page-footer"], ["mat-raised-button", "", "color", "primary", 3, "click"], [1, "progress-text"], ["mode", "determinate", 3, "value"], ["mode", "indeterminate"], [1, "status-message"], [1, "sections-accordion"], [1, "unit-section-panel"], [1, "soldier-count"], [1, "unit-not-found-badge"], [1, "section-content"], ["mat-table", "", 1, "soldiers-table", 3, "dataSource"], [1, "no-soldiers"], ["inline", "", "color", "warn"], ["matColumnDef", "operation"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "externId"], ["matColumnDef", "fio"], ["matColumnDef", "nickName"], ["matColumnDef", "rankShortValue"], ["matColumnDef", "positionValue"], ["matColumnDef", "stateValue"], ["matColumnDef", "unitShortName"], ["mat-cell", "", "class", "unit-cell", 4, "matCellDef"], ["matColumnDef", "assignedUnitShortName"], ["mat-cell", "", "class", "assigned-unit-cell", 4, "matCellDef"], ["matColumnDef", "involvedUnitShortName"], ["mat-cell", "", "class", "involved-unit-cell", 4, "matCellDef"], ["matColumnDef", "arrivedAt"], ["matColumnDef", "departedAt"], ["matColumnDef", "comment"], ["mat-cell", "", "class", "comment-cell", 4, "matCellDef"], ["matColumnDef", "birthDate"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", ""], ["mat-cell", ""], [1, "operation-badge", "inserted"], [1, "operation-badge", "updated"], [1, "operation-badge", "deleted"], ["inline", ""], [1, "state-badge"], ["mat-cell", "", 1, "unit-cell"], [1, "edit-mode"], [1, "view-mode"], ["appearance", "outline", 1, "inline-field"], ["type", "text", "matInput", "", "placeholder", "\u041E\u0441\u043D\u043E\u0432\u043D\u0438\u0439 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B", 3, "formControl", "matAutocomplete"], [3, "optionSelected", "displayWith"], ["disabled", ""], [3, "value"], ["mat-icon-button", "", "matTooltip", "\u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438", 1, "cancel-btn", 3, "click"], [1, "unit-text"], ["mat-icon-button", "", "matTooltip", "\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438", 1, "edit-btn", 3, "click"], ["mat-cell", "", 1, "assigned-unit-cell"], ["type", "text", "matInput", "", "placeholder", "\u041D\u0435 \u043F\u0440\u0438\u0434\u0430\u043D\u0438\u0439", 3, "formControl", "matAutocomplete"], ["mat-cell", "", 1, "involved-unit-cell"], ["type", "text", "matInput", "", "placeholder", "\u041D\u0435 \u043F\u0440\u0438\u0437\u043D\u0430\u0447\u0435\u043D\u043E", 3, "formControl", "matAutocomplete"], ["mat-cell", "", 1, "comment-cell"], [1, "comment-text", 3, "matTooltip", "title"], ["mat-header-row", ""], ["mat-row", ""]], template: function ImportProgressPage_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 4)(1, "input", 5, 0);
      \u0275\u0275listener("change", function ImportProgressPage_Template_input_change_1_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onFileSelected($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "div", 6)(4, "button", 7);
      \u0275\u0275listener("click", function ImportProgressPage_Template_button_click_4_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.goBack());
      });
      \u0275\u0275elementStart(5, "mat-icon");
      \u0275\u0275text(6, "arrow_back");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "h1")(8, "mat-icon");
      \u0275\u0275text(9, "cloud_upload");
      \u0275\u0275elementEnd();
      \u0275\u0275text(10, " \u0406\u043C\u043F\u043E\u0440\u0442 \u043E\u0441\u043E\u0431\u043E\u0432\u043E\u0433\u043E \u0441\u043A\u043B\u0430\u0434\u0443 ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "mat-card", 8)(12, "mat-card-content");
      \u0275\u0275conditionalCreate(13, ImportProgressPage_Conditional_13_Template, 4, 1, "div", 9);
      \u0275\u0275conditionalCreate(14, ImportProgressPage_Conditional_14_Template, 4, 4, "div", 10)(15, ImportProgressPage_Conditional_15_Template, 4, 0, "div", 10);
      \u0275\u0275conditionalCreate(16, ImportProgressPage_Conditional_16_Template, 5, 6, "div", 11);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(17, ImportProgressPage_Conditional_17_Template, 6, 0, "div", 12);
      \u0275\u0275elementStart(18, "div", 13)(19, "button", 14);
      \u0275\u0275listener("click", function ImportProgressPage_Template_button_click_19_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.goBack());
      });
      \u0275\u0275elementStart(20, "mat-icon");
      \u0275\u0275text(21, "arrow_back");
      \u0275\u0275elementEnd();
      \u0275\u0275text(22, " \u041F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u0438\u0441\u044F \u0434\u043E \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0456\u0432 ");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(13);
      \u0275\u0275conditional(ctx.currentSheet() ? 13 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.totalRows() > 0 ? 14 : !ctx.isCompleted() ? 15 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.message() ? 16 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.completedSheets().length > 0 ? 17 : -1);
    }
  }, dependencies: [
    CommonModule,
    MatProgressBarModule,
    MatProgressBar,
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatIconModule,
    MatIcon,
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
    MatCardModule,
    MatCard,
    MatCardContent,
    MatTooltipModule,
    MatTooltip,
    MatFormFieldModule,
    MatFormField,
    MatInputModule,
    MatInput,
    MatAutocompleteModule,
    MatAutocomplete,
    MatOption,
    MatAutocompleteTrigger,
    ReactiveFormsModule,
    DefaultValueAccessor,
    NgControlStatus,
    FormControlDirective,
    AsyncPipe,
    SlicePipe,
    DatePipe
  ], styles: ["\n\n.import-progress-page[_ngcontent-%COMP%] {\n  padding: 24px;\n  max-width: 1600px;\n  margin: 0 auto;\n  height: 100vh;\n  overflow-y: auto;\n  display: flex;\n  flex-direction: column;\n}\n.import-progress-page[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  margin-bottom: 24px;\n}\n.import-progress-page[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin: 0;\n  font-size: 28px;\n  font-weight: 500;\n}\n.import-progress-page[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 32px;\n  width: 32px;\n  height: 32px;\n}\n.import-progress-page[_ngcontent-%COMP%]   .progress-card[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.import-progress-page[_ngcontent-%COMP%]   .progress-card[_ngcontent-%COMP%]   .sheet-info[_ngcontent-%COMP%] {\n  font-size: 16px;\n  margin-bottom: 16px;\n  padding: 12px;\n  background-color: #f5f5f5;\n  border-radius: 4px;\n}\n.import-progress-page[_ngcontent-%COMP%]   .progress-card[_ngcontent-%COMP%]   .sheet-info[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #1976d2;\n}\n.import-progress-page[_ngcontent-%COMP%]   .progress-card[_ngcontent-%COMP%]   .progress-info[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.import-progress-page[_ngcontent-%COMP%]   .progress-card[_ngcontent-%COMP%]   .progress-info[_ngcontent-%COMP%]   .progress-text[_ngcontent-%COMP%] {\n  margin-bottom: 8px;\n  font-size: 14px;\n  color: #666;\n}\n.import-progress-page[_ngcontent-%COMP%]   .progress-card[_ngcontent-%COMP%]   .progress-info[_ngcontent-%COMP%]   mat-progress-bar[_ngcontent-%COMP%] {\n  height: 8px;\n  border-radius: 4px;\n}\n.import-progress-page[_ngcontent-%COMP%]   .progress-card[_ngcontent-%COMP%]   .status-message[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 12px 16px;\n  border-radius: 4px;\n  font-size: 14px;\n  background-color: #e3f2fd;\n  color: #1976d2;\n}\n.import-progress-page[_ngcontent-%COMP%]   .progress-card[_ngcontent-%COMP%]   .status-message.success[_ngcontent-%COMP%] {\n  background-color: #e8f5e9;\n  color: #2e7d32;\n}\n.import-progress-page[_ngcontent-%COMP%]   .progress-card[_ngcontent-%COMP%]   .status-message.success[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #2e7d32;\n}\n.import-progress-page[_ngcontent-%COMP%]   .progress-card[_ngcontent-%COMP%]   .status-message.error[_ngcontent-%COMP%] {\n  background-color: #ffebee;\n  color: #c62828;\n}\n.import-progress-page[_ngcontent-%COMP%]   .progress-card[_ngcontent-%COMP%]   .status-message.error[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #c62828;\n}\n.import-progress-page[_ngcontent-%COMP%]   .progress-card[_ngcontent-%COMP%]   .status-message[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n}\n.import-progress-page[_ngcontent-%COMP%]   .results-section[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  margin-bottom: 16px;\n}\n.import-progress-page[_ngcontent-%COMP%]   .results-section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-weight: 500;\n  margin-bottom: 16px;\n  color: #333;\n}\n.import-progress-page[_ngcontent-%COMP%]   .results-section[_ngcontent-%COMP%]   .sections-accordion[_ngcontent-%COMP%]   .unit-section-panel[_ngcontent-%COMP%] {\n  margin-bottom: 8px;\n}\n.import-progress-page[_ngcontent-%COMP%]   .results-section[_ngcontent-%COMP%]   .sections-accordion[_ngcontent-%COMP%]   .unit-section-panel[_ngcontent-%COMP%]   mat-panel-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.import-progress-page[_ngcontent-%COMP%]   .results-section[_ngcontent-%COMP%]   .sections-accordion[_ngcontent-%COMP%]   .unit-section-panel[_ngcontent-%COMP%]   mat-panel-title[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n  width: 24px;\n  height: 24px;\n}\n.import-progress-page[_ngcontent-%COMP%]   .results-section[_ngcontent-%COMP%]   .sections-accordion[_ngcontent-%COMP%]   .unit-section-panel[_ngcontent-%COMP%]   mat-panel-title[_ngcontent-%COMP%]   .soldier-count[_ngcontent-%COMP%] {\n  margin-left: auto;\n  font-size: 14px;\n  color: #666;\n  font-weight: normal;\n}\n.import-progress-page[_ngcontent-%COMP%]   .results-section[_ngcontent-%COMP%]   .sections-accordion[_ngcontent-%COMP%]   .unit-section-panel[_ngcontent-%COMP%]   mat-panel-title[_ngcontent-%COMP%]   .unit-not-found-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  margin-left: 12px;\n  padding: 4px 12px;\n  background-color: #fff3e0;\n  color: #e65100;\n  border-radius: 12px;\n  font-size: 13px;\n  font-weight: 500;\n}\n.import-progress-page[_ngcontent-%COMP%]   .results-section[_ngcontent-%COMP%]   .sections-accordion[_ngcontent-%COMP%]   .unit-section-panel[_ngcontent-%COMP%]   mat-panel-title[_ngcontent-%COMP%]   .unit-not-found-badge[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.import-progress-page[_ngcontent-%COMP%]   .results-section[_ngcontent-%COMP%]   .section-content[_ngcontent-%COMP%] {\n  padding: 16px 0;\n}\n.import-progress-page[_ngcontent-%COMP%]   .results-section[_ngcontent-%COMP%]   .section-content[_ngcontent-%COMP%]   .soldiers-table[_ngcontent-%COMP%] {\n  width: 100%;\n  overflow-x: auto;\n}\n.import-progress-page[_ngcontent-%COMP%]   .results-section[_ngcontent-%COMP%]   .section-content[_ngcontent-%COMP%]   .soldiers-table[_ngcontent-%COMP%]   .operation-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  padding: 4px 12px;\n  border-radius: 12px;\n  font-size: 12px;\n  font-weight: 500;\n}\n.import-progress-page[_ngcontent-%COMP%]   .results-section[_ngcontent-%COMP%]   .section-content[_ngcontent-%COMP%]   .soldiers-table[_ngcontent-%COMP%]   .operation-badge[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n}\n.import-progress-page[_ngcontent-%COMP%]   .results-section[_ngcontent-%COMP%]   .section-content[_ngcontent-%COMP%]   .soldiers-table[_ngcontent-%COMP%]   .operation-badge.inserted[_ngcontent-%COMP%] {\n  background-color: #e8f5e9;\n  color: #2e7d32;\n}\n.import-progress-page[_ngcontent-%COMP%]   .results-section[_ngcontent-%COMP%]   .section-content[_ngcontent-%COMP%]   .soldiers-table[_ngcontent-%COMP%]   .operation-badge.updated[_ngcontent-%COMP%] {\n  background-color: #e3f2fd;\n  color: #1976d2;\n}\n.import-progress-page[_ngcontent-%COMP%]   .results-section[_ngcontent-%COMP%]   .section-content[_ngcontent-%COMP%]   .soldiers-table[_ngcontent-%COMP%]   .operation-badge.deleted[_ngcontent-%COMP%] {\n  background-color: #ffebee;\n  color: #c62828;\n}\n.import-progress-page[_ngcontent-%COMP%]   .results-section[_ngcontent-%COMP%]   .section-content[_ngcontent-%COMP%]   .no-soldiers[_ngcontent-%COMP%] {\n  text-align: center;\n  color: #999;\n  font-style: italic;\n  padding: 16px;\n}\n.import-progress-page[_ngcontent-%COMP%]   .page-footer[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  margin-top: 16px;\n  padding-top: 16px;\n  border-top: 1px solid #e0e0e0;\n  display: flex;\n  justify-content: center;\n}\n.import-progress-page[_ngcontent-%COMP%]   .page-footer[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  margin-right: 8px;\n}", "\n\n[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  width: 100%;\n  overflow: hidden;\n}\n.table-container[_ngcontent-%COMP%] {\n  flex: 1 1 auto;\n  overflow: auto;\n  border: 1px solid #ccc;\n}\n.table-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%] {\n  width: 100%;\n  min-width: 800px;\n}\n.action-container[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  align-items: flex-end;\n  flex-wrap: wrap;\n  margin-bottom: 16px;\n  padding: 8px;\n  background: #f5f5f5;\n  border-radius: 8px;\n}\n.action-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.soldier-name[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.fio[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #1976d2;\n}\n.nickname[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #666;\n  font-style: italic;\n}\n.assigned-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  color: #ff9800;\n  margin-left: 4px;\n}\n.state-badge[_ngcontent-%COMP%] {\n  padding: 4px 8px;\n  border-radius: 12px;\n  font-size: 12px;\n  font-weight: 500;\n  background-color: #e3f2fd;\n  color: #1976d2;\n  border: 1px solid #bbdefb;\n}\n.comment-cell[_ngcontent-%COMP%] {\n  max-width: 200px;\n  width: 200px;\n}\n.comment-text[_ngcontent-%COMP%] {\n  display: block;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  max-width: 100%;\n  cursor: help;\n}\n.assigned-unit-cell[_ngcontent-%COMP%], \n.unit-cell[_ngcontent-%COMP%], \n.involved-unit-cell[_ngcontent-%COMP%] {\n  padding: 4px 8px !important;\n}\n.assigned-unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%], \n.unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%], \n.involved-unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  min-height: 32px;\n}\n.assigned-unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]   .unit-text[_ngcontent-%COMP%], \n.unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]   .unit-text[_ngcontent-%COMP%], \n.involved-unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]   .unit-text[_ngcontent-%COMP%] {\n  flex: 1;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.assigned-unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]   .edit-btn[_ngcontent-%COMP%], \n.unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]   .edit-btn[_ngcontent-%COMP%], \n.involved-unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]   .edit-btn[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  line-height: 28px;\n  opacity: 0;\n  transition: opacity 0.2s;\n}\n.assigned-unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]   .edit-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], \n.unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]   .edit-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], \n.involved-unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]   .edit-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n  line-height: 18px;\n}\n.assigned-unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]:hover   .edit-btn[_ngcontent-%COMP%], \n.unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]:hover   .edit-btn[_ngcontent-%COMP%], \n.involved-unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]:hover   .edit-btn[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.assigned-unit-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%], \n.unit-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%], \n.involved-unit-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.assigned-unit-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%], \n.unit-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%], \n.involved-unit-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  line-height: 28px;\n  flex-shrink: 0;\n}\n.assigned-unit-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], \n.unit-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], \n.involved-unit-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n  line-height: 18px;\n}\n.assigned-unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%], \n.unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%], \n.involved-unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%] {\n  flex: 1;\n  margin: 0;\n  font-size: 14px;\n}\n.assigned-unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%]     .mat-mdc-text-field-wrapper, \n.unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%]     .mat-mdc-text-field-wrapper, \n.involved-unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%]     .mat-mdc-text-field-wrapper {\n  padding: 0;\n}\n.assigned-unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%]     .mat-mdc-form-field-flex, \n.unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%]     .mat-mdc-form-field-flex, \n.involved-unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%]     .mat-mdc-form-field-flex {\n  padding: 4px 8px;\n  min-height: 32px;\n}\n.assigned-unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%]     .mat-mdc-form-field-infix, \n.unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%]     .mat-mdc-form-field-infix, \n.involved-unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%]     .mat-mdc-form-field-infix {\n  padding-top: 4px;\n  padding-bottom: 4px;\n  min-height: 24px;\n}\n.assigned-unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%]     .mat-mdc-form-field-subscript-wrapper, \n.unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%]     .mat-mdc-form-field-subscript-wrapper, \n.involved-unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%]     .mat-mdc-form-field-subscript-wrapper {\n  display: none;\n}\n@media (max-width: 768px) {\n  .mat-column-comment[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n@media (max-width: 600px) {\n  .mat-column-assignedUnitShortName[_ngcontent-%COMP%], \n   .mat-column-positionValue[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n.mat-mdc-row[_ngcontent-%COMP%] {\n  transition: background-color 0.2s ease;\n}\n.mat-mdc-row.row-critical[_ngcontent-%COMP%] {\n  background-color: #ffebee !important;\n}\n.mat-mdc-row.row-critical[_ngcontent-%COMP%]:hover {\n  background-color: #ffcdd2 !important;\n}\n.mat-mdc-row.row-critical[_ngcontent-%COMP%]   .state-badge[_ngcontent-%COMP%] {\n  background-color: #b71c1c;\n  color: white;\n  border-color: #b71c1c;\n}\n.mat-mdc-row.row-severe[_ngcontent-%COMP%] {\n  background-color: #fff3e0 !important;\n}\n.mat-mdc-row.row-severe[_ngcontent-%COMP%]:hover {\n  background-color: #ffe0b2 !important;\n}\n.mat-mdc-row.row-severe[_ngcontent-%COMP%]   .state-badge[_ngcontent-%COMP%] {\n  background-color: #ef6c00;\n  color: white;\n  border-color: #ef6c00;\n}\n.mat-mdc-row.row-problematic[_ngcontent-%COMP%] {\n  background-color: #fffde7 !important;\n}\n.mat-mdc-row.row-problematic[_ngcontent-%COMP%]:hover {\n  background-color: #fff9c4 !important;\n}\n.mat-mdc-row.row-problematic[_ngcontent-%COMP%]   .state-badge[_ngcontent-%COMP%] {\n  background-color: #f57f17;\n  color: white;\n  border-color: #f57f17;\n}\n.mat-mdc-row.row-recovery[_ngcontent-%COMP%] {\n  background-color: #e8f5e9 !important;\n}\n.mat-mdc-row.row-recovery[_ngcontent-%COMP%]:hover {\n  background-color: #c8e6c9 !important;\n}\n.mat-mdc-row.row-recovery[_ngcontent-%COMP%]   .state-badge[_ngcontent-%COMP%] {\n  background-color: #2e7d32;\n  color: white;\n  border-color: #2e7d32;\n}\n.mat-mdc-row.row-seconded[_ngcontent-%COMP%] {\n  background-color: #fffde7 !important;\n}\n.mat-mdc-row.row-seconded[_ngcontent-%COMP%]:hover {\n  background-color: #fff9c4 !important;\n}"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ImportProgressPage, [{
    type: Component,
    args: [{ selector: "app-import-progress-page", standalone: true, imports: [
      CommonModule,
      MatProgressBarModule,
      MatButtonModule,
      MatIconModule,
      MatExpansionModule,
      MatTableModule,
      MatCardModule,
      MatTooltipModule,
      MatFormFieldModule,
      MatInputModule,
      MatAutocompleteModule,
      ReactiveFormsModule
    ], template: `<div class="import-progress-page">
  <!-- \u041F\u0440\u0438\u0445\u043E\u0432\u0430\u043D\u0438\u0439 input \u0434\u043B\u044F \u0432\u0438\u0431\u043E\u0440\u0443 \u0444\u0430\u0439\u043B\u0443 -->
  <input
    #fileInput
    type="file"
    accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    style="display: none"
    (change)="onFileSelected($event)"
  />

  <!-- Breadcrumbs / Header -->
  <div class="page-header">
    <button mat-icon-button (click)="goBack()" matTooltip="\u041D\u0430\u0437\u0430\u0434 \u0434\u043E \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0456\u0432">
      <mat-icon>arrow_back</mat-icon>
    </button>
    <h1>
      <mat-icon>cloud_upload</mat-icon>
      \u0406\u043C\u043F\u043E\u0440\u0442 \u043E\u0441\u043E\u0431\u043E\u0432\u043E\u0433\u043E \u0441\u043A\u043B\u0430\u0434\u0443
    </h1>
  </div>

  <!-- Progress Section -->
  <mat-card class="progress-card">
    <mat-card-content>
      @if (currentSheet()) {
        <div class="sheet-info"><strong>\u041F\u043E\u0442\u043E\u0447\u043D\u0438\u0439 \u0430\u0440\u043A\u0443\u0448:</strong> {{ currentSheet() }}</div>
      }
      @if (totalRows() > 0) {
        <div class="progress-info">
          <div class="progress-text">
            \u041E\u0431\u0440\u043E\u0431\u043B\u0435\u043D\u043E: {{ processedRows() }} \u0437 {{ totalRows() }} ({{ progressPercent() }}%)
          </div>
          <mat-progress-bar mode="determinate" [value]="progressPercent()"></mat-progress-bar>
        </div>
      } @else if (!isCompleted()) {
        <div class="progress-info">
          <mat-progress-bar mode="indeterminate"></mat-progress-bar>
          <div class="progress-text">\u041F\u0456\u0434\u0433\u043E\u0442\u043E\u0432\u043A\u0430 \u0434\u043E \u0456\u043C\u043F\u043E\u0440\u0442\u0443...</div>
        </div>
      }
      @if (message()) {
        <div
          class="status-message"
          [class.error]="hasFailed()"
          [class.success]="isCompleted() && !hasFailed()"
        >
          @if (isCompleted() && !hasFailed()) {
            <mat-icon>check_circle</mat-icon>
          } @else if (hasFailed()) {
            <mat-icon>error</mat-icon>
          } @else {
            <mat-icon>info</mat-icon>
          }
          {{ message() }}
        </div>
      }
    </mat-card-content>
  </mat-card>

  <!-- Results Section -->
  @if (completedSheets().length > 0) {
    <div class="results-section">
      <h2>\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0438 \u0456\u043C\u043F\u043E\u0440\u0442\u0443</h2>
      <mat-accordion class="sections-accordion">
        @for (unit of completedSheets(); track unit.name) {
          <mat-expansion-panel class="unit-section-panel">
            <mat-expansion-panel-header>
              <mat-panel-title>
                {{ unit.name }}
                @if (unit.importedSoldiers) {
                  <span class="soldier-count">({{ unit.importedSoldiers.length }} \u043E\u0441\u0456\u0431)</span>
                }
                @if (unit.status === ImportProgressStatus.UnitNotFound) {
                  <span class="unit-not-found-badge">
                    <mat-icon inline color="warn">error</mat-icon>
                    \u041F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B \u043D\u0435 \u0437\u043D\u0430\u0439\u0434\u0435\u043D\u043E
                  </span>
                }
              </mat-panel-title>
            </mat-expansion-panel-header>

            <div class="section-content">
              @if (unit.importedSoldiers && unit.importedSoldiers.length > 0) {
                <table mat-table [dataSource]="unit.importedSoldiers" class="soldiers-table">
                  <!-- \u041E\u043F\u0435\u0440\u0430\u0446\u0456\u044F -->
                  <ng-container matColumnDef="operation">
                    <th mat-header-cell *matHeaderCellDef>\u041E\u043F\u0435\u0440\u0430\u0446\u0456\u044F</th>
                    <td mat-cell *matCellDef="let item">
                      @if (item.status === ImportSoldierStatus.Inserted) {
                        <span class="operation-badge inserted">
                          <mat-icon inline>add_circle</mat-icon>
                          \u0414\u043E\u0434\u0430\u043D\u043E
                        </span>
                      } @else if (item.status === ImportSoldierStatus.Updated) {
                        <span class="operation-badge updated">
                          <mat-icon inline>update</mat-icon>
                          \u041E\u043D\u043E\u0432\u043B\u0435\u043D\u043E
                        </span>
                      } @else if (item.status === ImportSoldierStatus.Deleted) {
                        <span class="operation-badge deleted">
                          <mat-icon inline>delete</mat-icon>
                          \u0412\u0438\u0434\u0430\u043B\u0435\u043D\u043E
                        </span>
                      }
                    </td>
                  </ng-container>

                  <ng-container matColumnDef="externId">
                    <th mat-header-cell *matHeaderCellDef>externId</th>
                    <td mat-cell *matCellDef="let item">{{ item.soldier.externId }}</td>
                  </ng-container>

                  <!-- \u041F\u0406\u0411 -->
                  <ng-container matColumnDef="fio">
                    <th mat-header-cell *matHeaderCellDef>\u041F\u0406\u0411</th>
                    <td mat-cell *matCellDef="let item">{{ formatFIO(item.soldier) }}</td>
                  </ng-container>

                  <ng-container matColumnDef="nickName">
                    <th mat-header-cell *matHeaderCellDef>\u041F\u043E\u0437\u0438\u0432\u043D\u0438\u0439</th>
                    <td mat-cell *matCellDef="let item">{{ item.soldier.nickName }}</td>
                  </ng-container>

                  <!-- Rank Column -->
                  <ng-container matColumnDef="rankShortValue">
                    <th mat-header-cell *matHeaderCellDef>\u0417\u0432\u0430\u043D\u043D\u044F</th>
                    <td mat-cell *matCellDef="let item">{{ item.soldier.rankShortValue }}</td>
                  </ng-container>

                  <!-- Position Column -->
                  <ng-container matColumnDef="positionValue">
                    <th mat-header-cell *matHeaderCellDef>\u041F\u043E\u0441\u0430\u0434\u0430</th>
                    <td mat-cell *matCellDef="let item">{{ item.soldier.positionValue }}</td>
                  </ng-container>

                  <!-- State Column -->
                  <ng-container matColumnDef="stateValue">
                    <th mat-header-cell *matHeaderCellDef>\u0421\u0442\u0430\u0442\u0443\u0441</th>
                    <td mat-cell *matCellDef="let item">
                      <span class="state-badge">{{ item.soldier.stateValue }}</span>
                    </td>
                  </ng-container>

                  <ng-container matColumnDef="unitShortName">
                    <th mat-header-cell *matHeaderCellDef>\u041F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B</th>
                    <td mat-cell *matCellDef="let item" class="unit-cell">
                      @if (inlineEdit.isMode(item.soldier.id, UnitTag.UnitId)) {
                        <div class="edit-mode">
                          <mat-form-field appearance="outline" class="inline-field">
                            <input
                              type="text"
                              matInput
                              [formControl]="getControl(item.soldier, UnitTag.UnitId)"
                              [matAutocomplete]="unitAuto"
                              placeholder="\u041E\u0441\u043D\u043E\u0432\u043D\u0438\u0439 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B"
                            />
                            <mat-autocomplete
                              #unitAuto="matAutocomplete"
                              [displayWith]="inlineEdit.displayLookupFn"
                              (optionSelected)="onSelect(item.soldier, UnitTag.UnitId, $event)"
                            >
                              @if (inlineEdit.loading(item.soldier.id)) {
                                <mat-option disabled>\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F...</mat-option>
                              }
                              @for (
                                unit of inlineEdit.options(item.soldier.id) | async;
                                track unit.id
                              ) {
                                <mat-option [value]="unit">{{ unit.value }}</mat-option>
                              }
                            </mat-autocomplete>
                          </mat-form-field>
                          <button
                            mat-icon-button
                            class="cancel-btn"
                            (click)="inlineEdit.clear(item.soldier.id)"
                            matTooltip="\u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438"
                          >
                            <mat-icon>close</mat-icon>
                          </button>
                        </div>
                      } @else {
                        <div class="view-mode">
                          <span class="unit-text">{{ item.soldier.unitShortName }}</span>
                          <button
                            mat-icon-button
                            class="edit-btn"
                            (click)="startEditing(item.soldier, UnitTag.UnitId)"
                            matTooltip="\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438"
                          >
                            <mat-icon>edit</mat-icon>
                          </button>
                        </div>
                      }
                    </td>
                  </ng-container>

                  <ng-container matColumnDef="assignedUnitShortName">
                    <th mat-header-cell *matHeaderCellDef>\u041F\u0440\u0438\u0434\u0430\u043D\u0438\u0439 \u0434\u043E</th>
                    <td mat-cell *matCellDef="let item" class="assigned-unit-cell">
                      @if (inlineEdit.isMode(item.soldier.id, UnitTag.AssignedId)) {
                        <div class="edit-mode">
                          <mat-form-field appearance="outline" class="inline-field">
                            <input
                              type="text"
                              matInput
                              [formControl]="getControl(item.soldier, UnitTag.AssignedId)"
                              [matAutocomplete]="assignedAuto"
                              placeholder="\u041D\u0435 \u043F\u0440\u0438\u0434\u0430\u043D\u0438\u0439"
                            />
                            <mat-autocomplete
                              #assignedAuto="matAutocomplete"
                              [displayWith]="inlineEdit.displayLookupFn"
                              (optionSelected)="onSelect(item.soldier, UnitTag.AssignedId, $event)"
                            >
                              <mat-option [value]="null">\u041D\u0435 \u043F\u0440\u0438\u0434\u0430\u043D\u0438\u0439</mat-option>
                              @if (inlineEdit.loading(item.soldier.id)) {
                                <mat-option disabled>\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F...</mat-option>
                              }
                              @for (
                                unit of inlineEdit.options(item.soldier.id) | async;
                                track unit.id
                              ) {
                                <mat-option [value]="unit">{{ unit.value }}</mat-option>
                              }
                            </mat-autocomplete>
                          </mat-form-field>
                          <button
                            mat-icon-button
                            class="cancel-btn"
                            (click)="inlineEdit.clear(item.soldier.id)"
                            matTooltip="\u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438"
                          >
                            <mat-icon>close</mat-icon>
                          </button>
                        </div>
                      } @else {
                        <div class="view-mode">
                          <span class="unit-text">{{
                            item.soldier.assignedUnitShortName || '-'
                          }}</span>
                          <button
                            mat-icon-button
                            class="edit-btn"
                            (click)="startEditing(item.soldier, UnitTag.AssignedId)"
                            matTooltip="\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438"
                          >
                            <mat-icon>edit</mat-icon>
                          </button>
                        </div>
                      }
                    </td>
                  </ng-container>

                  <ng-container matColumnDef="involvedUnitShortName">
                    <th mat-header-cell *matHeaderCellDef>\u0415\u043A\u0456\u043F\u0430\u0436/\u0413\u0440\u0443\u043F\u0430</th>
                    <td mat-cell *matCellDef="let item" class="involved-unit-cell">
                      @if (inlineEdit.isMode(item.soldier.id, UnitTag.InvolvedId)) {
                        <div class="edit-mode">
                          <mat-form-field appearance="outline" class="inline-field">
                            <input
                              type="text"
                              matInput
                              [formControl]="getControl(item.soldier, UnitTag.InvolvedId)"
                              [matAutocomplete]="involvedAuto"
                              placeholder="\u041D\u0435 \u043F\u0440\u0438\u0437\u043D\u0430\u0447\u0435\u043D\u043E"
                            />
                            <mat-autocomplete
                              #involvedAuto="matAutocomplete"
                              [displayWith]="inlineEdit.displayLookupFn"
                              (optionSelected)="onSelect(item.soldier, UnitTag.InvolvedId, $event)"
                            >
                              <mat-option [value]="null">\u041D\u0435 \u043F\u0440\u0438\u0437\u043D\u0430\u0447\u0435\u043D\u043E</mat-option>
                              @if (inlineEdit.loading(item.soldier.id)) {
                                <mat-option disabled>\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F...</mat-option>
                              }
                              @for (
                                unit of inlineEdit.options(item.soldier.id) | async;
                                track unit.id
                              ) {
                                <mat-option [value]="unit">{{ unit.value }}</mat-option>
                              }
                            </mat-autocomplete>
                          </mat-form-field>
                          <button
                            mat-icon-button
                            class="cancel-btn"
                            (click)="inlineEdit.clear(item.soldier.id)"
                            matTooltip="\u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438"
                          >
                            <mat-icon>close</mat-icon>
                          </button>
                        </div>
                      } @else {
                        <div class="view-mode">
                          <span class="unit-text">{{
                            item.soldier.involvedUnitShortName || '-'
                          }}</span>
                          <button
                            mat-icon-button
                            class="edit-btn"
                            (click)="startEditing(item.soldier, UnitTag.InvolvedId)"
                            matTooltip="\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438"
                          >
                            <mat-icon>edit</mat-icon>
                          </button>
                        </div>
                      }
                    </td>
                  </ng-container>

                  <!-- ArrivedAt Column -->
                  <ng-container matColumnDef="arrivedAt">
                    <th mat-header-cell *matHeaderCellDef>\u041F\u0440\u0438\u0431\u0443\u0432</th>
                    <td mat-cell *matCellDef="let item">
                      {{
                        item.soldier.arrivedAt ? (item.soldier.arrivedAt | date: 'dd.MM.yyyy') : '-'
                      }}
                    </td>
                  </ng-container>

                  <!-- DepartedAt Column -->
                  <ng-container matColumnDef="departedAt">
                    <th mat-header-cell *matHeaderCellDef>\u0412\u0438\u0431\u0443\u0432</th>
                    <td mat-cell *matCellDef="let item">
                      {{
                        item.soldier.departedAt
                          ? (item.soldier.departedAt | date: 'dd.MM.yyyy')
                          : '-'
                      }}
                    </td>
                  </ng-container>

                  <!-- Comment Column -->
                  <ng-container matColumnDef="comment">
                    <th mat-header-cell *matHeaderCellDef>\u041A\u043E\u043C\u0435\u043D\u0442\u0430\u0440</th>
                    <td mat-cell *matCellDef="let item" class="comment-cell">
                      <span
                        class="comment-text"
                        [matTooltip]="
                          item.soldier.comment && item.soldier.comment.length > 50
                            ? item.soldier.comment
                            : ''
                        "
                        [title]="
                          item.soldier.comment && item.soldier.comment.length > 50
                            ? item.soldier.comment
                            : ''
                        "
                      >
                        {{
                          item.soldier.comment
                            ? item.soldier.comment.length > 50
                              ? (item.soldier.comment | slice: 0 : 50) + '...'
                              : item.soldier.comment
                            : '-'
                        }}
                      </span>
                    </td>
                  </ng-container>

                  <!-- \u0414\u0430\u0442\u0430 \u043D\u0430\u0440\u043E\u0434\u0436\u0435\u043D\u043D\u044F -->
                  <ng-container matColumnDef="birthDate">
                    <th mat-header-cell *matHeaderCellDef>\u0414\u0430\u0442\u0430 \u043D\u0430\u0440\u043E\u0434\u0436\u0435\u043D\u043D\u044F</th>
                    <td mat-cell *matCellDef="let item">{{ item.soldier.birthDate }}</td>
                  </ng-container>

                  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                  <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
                </table>
              } @else {
                <p class="no-soldiers">\u041D\u0435\u043C\u0430\u0454 \u0456\u043C\u043F\u043E\u0440\u0442\u043E\u0432\u0430\u043D\u0438\u0445 \u0431\u0456\u0439\u0446\u0456\u0432</p>
              }
            </div>
          </mat-expansion-panel>
        }
      </mat-accordion>
    </div>
  }

  <!-- Footer Actions -->
  <div class="page-footer">
    <button mat-raised-button color="primary" (click)="goBack()">
      <mat-icon>arrow_back</mat-icon>
      \u041F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u0438\u0441\u044F \u0434\u043E \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0456\u0432
    </button>
  </div>
</div>
`, styles: ["/* src/app/Unit/Import/ImportProgress.page.scss */\n.import-progress-page {\n  padding: 24px;\n  max-width: 1600px;\n  margin: 0 auto;\n  height: 100vh;\n  overflow-y: auto;\n  display: flex;\n  flex-direction: column;\n}\n.import-progress-page .page-header {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  margin-bottom: 24px;\n}\n.import-progress-page .page-header h1 {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin: 0;\n  font-size: 28px;\n  font-weight: 500;\n}\n.import-progress-page .page-header h1 mat-icon {\n  font-size: 32px;\n  width: 32px;\n  height: 32px;\n}\n.import-progress-page .progress-card {\n  margin-bottom: 24px;\n}\n.import-progress-page .progress-card .sheet-info {\n  font-size: 16px;\n  margin-bottom: 16px;\n  padding: 12px;\n  background-color: #f5f5f5;\n  border-radius: 4px;\n}\n.import-progress-page .progress-card .sheet-info strong {\n  color: #1976d2;\n}\n.import-progress-page .progress-card .progress-info {\n  margin-bottom: 16px;\n}\n.import-progress-page .progress-card .progress-info .progress-text {\n  margin-bottom: 8px;\n  font-size: 14px;\n  color: #666;\n}\n.import-progress-page .progress-card .progress-info mat-progress-bar {\n  height: 8px;\n  border-radius: 4px;\n}\n.import-progress-page .progress-card .status-message {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 12px 16px;\n  border-radius: 4px;\n  font-size: 14px;\n  background-color: #e3f2fd;\n  color: #1976d2;\n}\n.import-progress-page .progress-card .status-message.success {\n  background-color: #e8f5e9;\n  color: #2e7d32;\n}\n.import-progress-page .progress-card .status-message.success mat-icon {\n  color: #2e7d32;\n}\n.import-progress-page .progress-card .status-message.error {\n  background-color: #ffebee;\n  color: #c62828;\n}\n.import-progress-page .progress-card .status-message.error mat-icon {\n  color: #c62828;\n}\n.import-progress-page .progress-card .status-message mat-icon {\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n}\n.import-progress-page .results-section {\n  flex: 1;\n  overflow-y: auto;\n  margin-bottom: 16px;\n}\n.import-progress-page .results-section h2 {\n  font-size: 20px;\n  font-weight: 500;\n  margin-bottom: 16px;\n  color: #333;\n}\n.import-progress-page .results-section .sections-accordion .unit-section-panel {\n  margin-bottom: 8px;\n}\n.import-progress-page .results-section .sections-accordion .unit-section-panel mat-panel-title {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.import-progress-page .results-section .sections-accordion .unit-section-panel mat-panel-title mat-icon {\n  font-size: 24px;\n  width: 24px;\n  height: 24px;\n}\n.import-progress-page .results-section .sections-accordion .unit-section-panel mat-panel-title .soldier-count {\n  margin-left: auto;\n  font-size: 14px;\n  color: #666;\n  font-weight: normal;\n}\n.import-progress-page .results-section .sections-accordion .unit-section-panel mat-panel-title .unit-not-found-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  margin-left: 12px;\n  padding: 4px 12px;\n  background-color: #fff3e0;\n  color: #e65100;\n  border-radius: 12px;\n  font-size: 13px;\n  font-weight: 500;\n}\n.import-progress-page .results-section .sections-accordion .unit-section-panel mat-panel-title .unit-not-found-badge mat-icon {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.import-progress-page .results-section .section-content {\n  padding: 16px 0;\n}\n.import-progress-page .results-section .section-content .soldiers-table {\n  width: 100%;\n  overflow-x: auto;\n}\n.import-progress-page .results-section .section-content .soldiers-table .operation-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  padding: 4px 12px;\n  border-radius: 12px;\n  font-size: 12px;\n  font-weight: 500;\n}\n.import-progress-page .results-section .section-content .soldiers-table .operation-badge mat-icon {\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n}\n.import-progress-page .results-section .section-content .soldiers-table .operation-badge.inserted {\n  background-color: #e8f5e9;\n  color: #2e7d32;\n}\n.import-progress-page .results-section .section-content .soldiers-table .operation-badge.updated {\n  background-color: #e3f2fd;\n  color: #1976d2;\n}\n.import-progress-page .results-section .section-content .soldiers-table .operation-badge.deleted {\n  background-color: #ffebee;\n  color: #c62828;\n}\n.import-progress-page .results-section .section-content .no-soldiers {\n  text-align: center;\n  color: #999;\n  font-style: italic;\n  padding: 16px;\n}\n.import-progress-page .page-footer {\n  flex-shrink: 0;\n  margin-top: 16px;\n  padding-top: 16px;\n  border-top: 1px solid #e0e0e0;\n  display: flex;\n  justify-content: center;\n}\n.import-progress-page .page-footer button mat-icon {\n  margin-right: 8px;\n}\n", "/* src/app/Soldier/Soldier.component.scss */\n:host {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  width: 100%;\n  overflow: hidden;\n}\n.table-container {\n  flex: 1 1 auto;\n  overflow: auto;\n  border: 1px solid #ccc;\n}\n.table-container table {\n  width: 100%;\n  min-width: 800px;\n}\n.action-container {\n  display: flex;\n  gap: 16px;\n  align-items: flex-end;\n  flex-wrap: wrap;\n  margin-bottom: 16px;\n  padding: 8px;\n  background: #f5f5f5;\n  border-radius: 8px;\n}\n.action-buttons {\n  display: flex;\n  gap: 8px;\n}\n.soldier-name {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.fio {\n  font-weight: 500;\n  color: #1976d2;\n}\n.nickname {\n  font-size: 12px;\n  color: #666;\n  font-style: italic;\n}\n.assigned-icon {\n  font-size: 16px;\n  color: #ff9800;\n  margin-left: 4px;\n}\n.state-badge {\n  padding: 4px 8px;\n  border-radius: 12px;\n  font-size: 12px;\n  font-weight: 500;\n  background-color: #e3f2fd;\n  color: #1976d2;\n  border: 1px solid #bbdefb;\n}\n.comment-cell {\n  max-width: 200px;\n  width: 200px;\n}\n.comment-text {\n  display: block;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  max-width: 100%;\n  cursor: help;\n}\n.assigned-unit-cell,\n.unit-cell,\n.involved-unit-cell {\n  padding: 4px 8px !important;\n}\n.assigned-unit-cell .view-mode,\n.unit-cell .view-mode,\n.involved-unit-cell .view-mode {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  min-height: 32px;\n}\n.assigned-unit-cell .view-mode .unit-text,\n.unit-cell .view-mode .unit-text,\n.involved-unit-cell .view-mode .unit-text {\n  flex: 1;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.assigned-unit-cell .view-mode .edit-btn,\n.unit-cell .view-mode .edit-btn,\n.involved-unit-cell .view-mode .edit-btn {\n  width: 28px;\n  height: 28px;\n  line-height: 28px;\n  opacity: 0;\n  transition: opacity 0.2s;\n}\n.assigned-unit-cell .view-mode .edit-btn mat-icon,\n.unit-cell .view-mode .edit-btn mat-icon,\n.involved-unit-cell .view-mode .edit-btn mat-icon {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n  line-height: 18px;\n}\n.assigned-unit-cell .view-mode:hover .edit-btn,\n.unit-cell .view-mode:hover .edit-btn,\n.involved-unit-cell .view-mode:hover .edit-btn {\n  opacity: 1;\n}\n.assigned-unit-cell .edit-mode,\n.unit-cell .edit-mode,\n.involved-unit-cell .edit-mode {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.assigned-unit-cell .edit-mode .cancel-btn,\n.unit-cell .edit-mode .cancel-btn,\n.involved-unit-cell .edit-mode .cancel-btn {\n  width: 28px;\n  height: 28px;\n  line-height: 28px;\n  flex-shrink: 0;\n}\n.assigned-unit-cell .edit-mode .cancel-btn mat-icon,\n.unit-cell .edit-mode .cancel-btn mat-icon,\n.involved-unit-cell .edit-mode .cancel-btn mat-icon {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n  line-height: 18px;\n}\n.assigned-unit-cell .inline-field,\n.unit-cell .inline-field,\n.involved-unit-cell .inline-field {\n  flex: 1;\n  margin: 0;\n  font-size: 14px;\n}\n.assigned-unit-cell .inline-field ::ng-deep .mat-mdc-text-field-wrapper,\n.unit-cell .inline-field ::ng-deep .mat-mdc-text-field-wrapper,\n.involved-unit-cell .inline-field ::ng-deep .mat-mdc-text-field-wrapper {\n  padding: 0;\n}\n.assigned-unit-cell .inline-field ::ng-deep .mat-mdc-form-field-flex,\n.unit-cell .inline-field ::ng-deep .mat-mdc-form-field-flex,\n.involved-unit-cell .inline-field ::ng-deep .mat-mdc-form-field-flex {\n  padding: 4px 8px;\n  min-height: 32px;\n}\n.assigned-unit-cell .inline-field ::ng-deep .mat-mdc-form-field-infix,\n.unit-cell .inline-field ::ng-deep .mat-mdc-form-field-infix,\n.involved-unit-cell .inline-field ::ng-deep .mat-mdc-form-field-infix {\n  padding-top: 4px;\n  padding-bottom: 4px;\n  min-height: 24px;\n}\n.assigned-unit-cell .inline-field ::ng-deep .mat-mdc-form-field-subscript-wrapper,\n.unit-cell .inline-field ::ng-deep .mat-mdc-form-field-subscript-wrapper,\n.involved-unit-cell .inline-field ::ng-deep .mat-mdc-form-field-subscript-wrapper {\n  display: none;\n}\n@media (max-width: 768px) {\n  .mat-column-comment {\n    display: none;\n  }\n}\n@media (max-width: 600px) {\n  .mat-column-assignedUnitShortName,\n  .mat-column-positionValue {\n    display: none;\n  }\n}\n.mat-mdc-row {\n  transition: background-color 0.2s ease;\n}\n.mat-mdc-row.row-critical {\n  background-color: #ffebee !important;\n}\n.mat-mdc-row.row-critical:hover {\n  background-color: #ffcdd2 !important;\n}\n.mat-mdc-row.row-critical .state-badge {\n  background-color: #b71c1c;\n  color: white;\n  border-color: #b71c1c;\n}\n.mat-mdc-row.row-severe {\n  background-color: #fff3e0 !important;\n}\n.mat-mdc-row.row-severe:hover {\n  background-color: #ffe0b2 !important;\n}\n.mat-mdc-row.row-severe .state-badge {\n  background-color: #ef6c00;\n  color: white;\n  border-color: #ef6c00;\n}\n.mat-mdc-row.row-problematic {\n  background-color: #fffde7 !important;\n}\n.mat-mdc-row.row-problematic:hover {\n  background-color: #fff9c4 !important;\n}\n.mat-mdc-row.row-problematic .state-badge {\n  background-color: #f57f17;\n  color: white;\n  border-color: #f57f17;\n}\n.mat-mdc-row.row-recovery {\n  background-color: #e8f5e9 !important;\n}\n.mat-mdc-row.row-recovery:hover {\n  background-color: #c8e6c9 !important;\n}\n.mat-mdc-row.row-recovery .state-badge {\n  background-color: #2e7d32;\n  color: white;\n  border-color: #2e7d32;\n}\n.mat-mdc-row.row-seconded {\n  background-color: #fffde7 !important;\n}\n.mat-mdc-row.row-seconded:hover {\n  background-color: #fff9c4 !important;\n}\n"] }]
  }], null, { fileInput: [{
    type: ViewChild,
    args: ["fileInput"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ImportProgressPage, { className: "ImportProgressPage", filePath: "app/Unit/Import/ImportProgress.page.ts", lineNumber: 65 });
})();
export {
  ImportProgressPage
};
