import {
  CityCodeTreeComponent,
  CityCodesProgressStatus,
  DictCityCodeComponent,
  DictCityCodeService
} from "./chunk-B52ZY6PM.js";
import {
  VerticalLayoutComponent
} from "./chunk-LFWMOBMI.js";
import "./chunk-M2QED7BJ.js";
import {
  MatButtonToggle,
  MatButtonToggleGroup,
  MatButtonToggleModule
} from "./chunk-3OA2QICU.js";
import {
  MatProgressBar,
  MatProgressBarModule
} from "./chunk-UMDIL5OD.js";
import {
  MatTooltip,
  MatTooltipModule
} from "./chunk-W5GTBRLP.js";
import "./chunk-QPOXXU4H.js";
import "./chunk-UNUAAJ6H.js";
import "./chunk-6L6S6KYZ.js";
import "./chunk-SWYNU52L.js";
import {
  MatSnackBar
} from "./chunk-4WDEZQCM.js";
import "./chunk-M6BC2PYI.js";
import "./chunk-BZXRQG5G.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-OWDCNZN3.js";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle
} from "./chunk-PALKAU2I.js";
import "./chunk-KRVND5CP.js";
import {
  CommonModule,
  Component,
  DefaultValueAccessor,
  FormsModule,
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
  ViewChild,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
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
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-WAYE7YII.js";

// src/app/dialogs/ImportCityCodes-dialog.component.ts
function ImportCityCodesDialogComponent_Conditional_6_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "check_circle");
    \u0275\u0275elementEnd();
  }
}
function ImportCityCodesDialogComponent_Conditional_6_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "error");
    \u0275\u0275elementEnd();
  }
}
function ImportCityCodesDialogComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275conditionalCreate(1, ImportCityCodesDialogComponent_Conditional_6_Conditional_1_Template, 2, 0, "mat-icon")(2, ImportCityCodesDialogComponent_Conditional_6_Conditional_2_Template, 2, 0, "mat-icon");
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("success", !ctx_r0.hasFailed())("error", ctx_r0.hasFailed());
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r0.hasFailed() ? 1 : 2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.message());
  }
}
function ImportCityCodesDialogComponent_Conditional_7_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7)(1, "div", 9);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "mat-progress-bar", 10);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("\u041E\u0431\u0440\u043E\u0431\u043B\u0435\u043D\u043E: ", ctx_r0.processedRows(), " \u0437 ", ctx_r0.totalRows());
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx_r0.progressPercent());
  }
}
function ImportCityCodesDialogComponent_Conditional_7_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275element(1, "mat-progress-bar", 11);
    \u0275\u0275elementStart(2, "div", 9);
    \u0275\u0275text(3, "\u041F\u0456\u0434\u0433\u043E\u0442\u043E\u0432\u043A\u0430 \u0434\u043E \u0456\u043C\u043F\u043E\u0440\u0442\u0443...");
    \u0275\u0275elementEnd()();
  }
}
function ImportCityCodesDialogComponent_Conditional_7_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "mat-icon");
    \u0275\u0275text(2, "info");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.message());
  }
}
function ImportCityCodesDialogComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, ImportCityCodesDialogComponent_Conditional_7_Conditional_0_Template, 4, 3, "div", 7)(1, ImportCityCodesDialogComponent_Conditional_7_Conditional_1_Template, 4, 0, "div", 7);
    \u0275\u0275conditionalCreate(2, ImportCityCodesDialogComponent_Conditional_7_Conditional_2_Template, 5, 1, "div", 8);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r0.totalRows() > 0 ? 0 : 1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.message() ? 2 : -1);
  }
}
function ImportCityCodesDialogComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 12);
    \u0275\u0275listener("click", function ImportCityCodesDialogComponent_Conditional_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.close());
    });
    \u0275\u0275text(1, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438");
    \u0275\u0275elementEnd();
  }
}
function ImportCityCodesDialogComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 13);
    \u0275\u0275listener("click", function ImportCityCodesDialogComponent_Conditional_10_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.close());
    });
    \u0275\u0275text(1, "\u0421\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438");
    \u0275\u0275elementEnd();
  }
}
var ImportCityCodesDialogComponent = class _ImportCityCodesDialogComponent {
  dialogRef = inject(MatDialogRef);
  cityCodeService = inject(DictCityCodeService);
  file = inject(MAT_DIALOG_DATA);
  processedRows = signal(0, ...ngDevMode ? [{ debugName: "processedRows" }] : []);
  totalRows = signal(0, ...ngDevMode ? [{ debugName: "totalRows" }] : []);
  message = signal("", ...ngDevMode ? [{ debugName: "message" }] : []);
  isCompleted = signal(false, ...ngDevMode ? [{ debugName: "isCompleted" }] : []);
  hasFailed = signal(false, ...ngDevMode ? [{ debugName: "hasFailed" }] : []);
  progressSubscription;
  progressPercent = () => {
    const total = this.totalRows();
    const processed = this.processedRows();
    return total > 0 ? Math.round(processed / total * 100) : 0;
  };
  constructor() {
    this.startImport();
  }
  startImport() {
    this.progressSubscription = this.cityCodeService.subscribeToImportProgress().subscribe({
      next: (progress) => {
        this.handleProgress(progress);
      },
      error: (error) => {
        console.error("SSE connection error:", error);
        this.message.set("\u0412\u0442\u0440\u0430\u0447\u0435\u043D\u043E \u0437\u02BC\u0454\u0434\u043D\u0430\u043D\u043D\u044F \u0437 \u0441\u0435\u0440\u0432\u0435\u0440\u043E\u043C");
        this.hasFailed.set(true);
        this.isCompleted.set(true);
      }
    });
    setTimeout(() => {
      this.cityCodeService.importCityCodes(this.file).subscribe({
        next: (response) => {
          if (!response.started) {
            this.hasFailed.set(true);
            this.isCompleted.set(true);
            this.message.set(response.error || "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u0440\u043E\u0437\u043F\u043E\u0447\u0430\u0442\u0438 \u0456\u043C\u043F\u043E\u0440\u0442");
            this.unsubscribe();
          }
        },
        error: (error) => {
          console.error("Import error:", error);
          this.hasFailed.set(true);
          this.isCompleted.set(true);
          this.message.set(error.message || "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043F\u0440\u0438 \u0456\u043C\u043F\u043E\u0440\u0442\u0456");
          this.unsubscribe();
        }
      });
    }, 100);
  }
  handleProgress(progress) {
    this.processedRows.set(progress.processed);
    this.totalRows.set(progress.total);
    if (progress.message) {
      this.message.set(progress.message);
    }
    switch (progress.status) {
      case CityCodesProgressStatus.Start:
        this.message.set("\u0406\u043C\u043F\u043E\u0440\u0442 \u0440\u043E\u0437\u043F\u043E\u0447\u0430\u0442\u043E...");
        this.isCompleted.set(false);
        this.hasFailed.set(false);
        break;
      case CityCodesProgressStatus.Done:
        this.isCompleted.set(true);
        this.hasFailed.set(false);
        this.message.set("\u0406\u043C\u043F\u043E\u0440\u0442 \u0443\u0441\u043F\u0456\u0448\u043D\u043E \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043E");
        this.unsubscribe();
        break;
      case CityCodesProgressStatus.Failed:
        this.isCompleted.set(true);
        this.hasFailed.set(true);
        if (!this.message()) {
          this.message.set("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043F\u0456\u0434 \u0447\u0430\u0441 \u0456\u043C\u043F\u043E\u0440\u0442\u0443");
        }
        this.unsubscribe();
        break;
      default:
        console.warn("\u041D\u0435\u0432\u0456\u0434\u043E\u043C\u0438\u0439 \u0441\u0442\u0430\u0442\u0443\u0441 \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0443:", progress.status);
        break;
    }
  }
  unsubscribe() {
    if (this.progressSubscription) {
      this.progressSubscription.unsubscribe();
      this.progressSubscription = void 0;
    }
  }
  close() {
    this.unsubscribe();
    this.dialogRef.close(this.isCompleted() && !this.hasFailed());
  }
  ngOnDestroy() {
    this.unsubscribe();
  }
  static \u0275fac = function ImportCityCodesDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ImportCityCodesDialogComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ImportCityCodesDialogComponent, selectors: [["app-import-city-codes-dialog"]], decls: 11, vars: 2, consts: [["mat-dialog-title", ""], [1, "import-progress"], [1, "status-message", 3, "success", "error"], ["align", "end"], ["mat-raised-button", "", "color", "primary"], ["mat-button", ""], [1, "status-message"], [1, "progress-info"], [1, "status-message", "info"], [1, "progress-text"], ["mode", "determinate", 3, "value"], ["mode", "indeterminate"], ["mat-raised-button", "", "color", "primary", 3, "click"], ["mat-button", "", 3, "click"]], template: function ImportCityCodesDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "h2", 0)(1, "mat-icon");
      \u0275\u0275text(2, "cloud_upload");
      \u0275\u0275elementEnd();
      \u0275\u0275text(3, " \u0406\u043C\u043F\u043E\u0440\u0442 \u043A\u043E\u0434\u0438\u0444\u0456\u043A\u0430\u0442\u043E\u0440\u0430 ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "mat-dialog-content")(5, "div", 1);
      \u0275\u0275conditionalCreate(6, ImportCityCodesDialogComponent_Conditional_6_Template, 5, 6, "div", 2)(7, ImportCityCodesDialogComponent_Conditional_7_Template, 3, 2);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "mat-dialog-actions", 3);
      \u0275\u0275conditionalCreate(9, ImportCityCodesDialogComponent_Conditional_9_Template, 2, 0, "button", 4)(10, ImportCityCodesDialogComponent_Conditional_10_Template, 2, 0, "button", 5);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275conditional(ctx.isCompleted() ? 6 : 7);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.isCompleted() ? 9 : 10);
    }
  }, dependencies: [CommonModule, MatDialogModule, MatDialogTitle, MatDialogActions, MatDialogContent, MatButtonModule, MatButton, MatProgressBarModule, MatProgressBar, MatIconModule, MatIcon], styles: ["\n\n.import-progress[_ngcontent-%COMP%] {\n  min-width: 400px;\n  padding: 20px 0;\n}\n.progress-info[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.progress-text[_ngcontent-%COMP%] {\n  margin-bottom: 8px;\n  font-size: 14px;\n  color: rgba(0, 0, 0, 0.6);\n}\n.status-message[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 12px;\n  border-radius: 4px;\n  margin-top: 16px;\n}\n.status-message.success[_ngcontent-%COMP%] {\n  background-color: #e8f5e9;\n  color: #2e7d32;\n}\n.status-message.error[_ngcontent-%COMP%] {\n  background-color: #ffebee;\n  color: #c62828;\n}\n.status-message.info[_ngcontent-%COMP%] {\n  background-color: #e3f2fd;\n  color: #1565c0;\n}\n.status-message[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n}\n.status-message[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  flex: 1;\n}\n/*# sourceMappingURL=ImportCityCodes-dialog.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ImportCityCodesDialogComponent, [{
    type: Component,
    args: [{ selector: "app-import-city-codes-dialog", standalone: true, imports: [CommonModule, MatDialogModule, MatButtonModule, MatProgressBarModule, MatIconModule], template: `
    <h2 mat-dialog-title>
      <mat-icon>cloud_upload</mat-icon>
      \u0406\u043C\u043F\u043E\u0440\u0442 \u043A\u043E\u0434\u0438\u0444\u0456\u043A\u0430\u0442\u043E\u0440\u0430
    </h2>

    <mat-dialog-content>
      <div class="import-progress">
        @if (isCompleted()) {
        <div class="status-message" [class.success]="!hasFailed()" [class.error]="hasFailed()">
          @if (!hasFailed()) {
          <mat-icon>check_circle</mat-icon>
          } @else {
          <mat-icon>error</mat-icon>
          }
          <span>{{ message() }}</span>
        </div>
        } @else { @if (totalRows() > 0) {
        <div class="progress-info">
          <div class="progress-text">\u041E\u0431\u0440\u043E\u0431\u043B\u0435\u043D\u043E: {{ processedRows() }} \u0437 {{ totalRows() }}</div>
          <mat-progress-bar mode="determinate" [value]="progressPercent()"></mat-progress-bar>
        </div>
        } @else {
        <div class="progress-info">
          <mat-progress-bar mode="indeterminate"></mat-progress-bar>
          <div class="progress-text">\u041F\u0456\u0434\u0433\u043E\u0442\u043E\u0432\u043A\u0430 \u0434\u043E \u0456\u043C\u043F\u043E\u0440\u0442\u0443...</div>
        </div>
        } @if (message()) {
        <div class="status-message info">
          <mat-icon>info</mat-icon>
          <span>{{ message() }}</span>
        </div>
        } }
      </div>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      @if (isCompleted()) {
      <button mat-raised-button color="primary" (click)="close()">\u0417\u0430\u043A\u0440\u0438\u0442\u0438</button>
      } @else {
      <button mat-button (click)="close()">\u0421\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438</button>
      }
    </mat-dialog-actions>
  `, styles: ["/* angular:styles/component:css;3b23a84fb086f1a004c228ca492dc7daddad5705b02de32bba6546837b9270dd;/home/havrok/projects/work/411/s5/s5app/Menu/S5Server/Front/src/app/dialogs/ImportCityCodes-dialog.component.ts */\n.import-progress {\n  min-width: 400px;\n  padding: 20px 0;\n}\n.progress-info {\n  margin-bottom: 16px;\n}\n.progress-text {\n  margin-bottom: 8px;\n  font-size: 14px;\n  color: rgba(0, 0, 0, 0.6);\n}\n.status-message {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 12px;\n  border-radius: 4px;\n  margin-top: 16px;\n}\n.status-message.success {\n  background-color: #e8f5e9;\n  color: #2e7d32;\n}\n.status-message.error {\n  background-color: #ffebee;\n  color: #c62828;\n}\n.status-message.info {\n  background-color: #e3f2fd;\n  color: #1565c0;\n}\n.status-message mat-icon {\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n}\n.status-message span {\n  flex: 1;\n}\n/*# sourceMappingURL=ImportCityCodes-dialog.component.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ImportCityCodesDialogComponent, { className: "ImportCityCodesDialogComponent", filePath: "app/dialogs/ImportCityCodes-dialog.component.ts", lineNumber: 116 });
})();

// src/dictionaries/CityCode/CityCodePage.component.ts
var _c0 = ["fileInput"];
function CityCodePageComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 6);
    \u0275\u0275listener("click", function CityCodePageComponent_Conditional_14_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.clearSearch());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "close");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275attribute("aria-label", "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u0438 \u043F\u043E\u0448\u0443\u043A");
  }
}
function CityCodePageComponent_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "dict-city-codes");
  }
}
function CityCodePageComponent_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "dict-city-code-tree");
  }
}
var CityCodePageComponent = class _CityCodePageComponent {
  tableComponent;
  treeComponent;
  fileInput;
  dialog = inject(MatDialog);
  snackBar = inject(MatSnackBar);
  dictCityCodeService = inject(DictCityCodeService);
  viewMode = signal(this.getSavedViewMode(), ...ngDevMode ? [{ debugName: "viewMode" }] : []);
  searchTerm = signal("", ...ngDevMode ? [{ debugName: "searchTerm" }] : []);
  VIEW_MODE_STORAGE_KEY = "cityCodeViewMode";
  onViewModeChange(mode) {
    this.viewMode.set(mode);
    this.saveViewMode(mode);
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
  /**
   * Відкриває діалог вибору файлу для імпорту
   */
  openFileDialog() {
    if (this.fileInput) {
      this.fileInput.nativeElement.click();
    }
  }
  /**
   * Обробка вибору файлу для імпорту
   */
  onFileSelected(event) {
    const input = event.target;
    const file = input.files?.[0];
    if (!file) {
      return;
    }
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (ext !== "xlsx") {
      this.snackBar.open("\u041F\u0456\u0434\u0442\u0440\u0438\u043C\u0443\u0454\u0442\u044C\u0441\u044F \u0442\u0456\u043B\u044C\u043A\u0438 \u0444\u043E\u0440\u043C\u0430\u0442 .xlsx", "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
      input.value = "";
      return;
    }
    const dialogRef = this.dialog.open(ImportCityCodesDialogComponent, {
      width: "500px",
      disableClose: true,
      data: file
    });
    dialogRef.afterClosed().subscribe((success) => {
      if (success) {
        if (this.viewMode() === "table" && this.tableComponent) {
          this.tableComponent.reload();
        } else if (this.viewMode() === "tree" && this.treeComponent) {
          this.treeComponent.refresh();
        }
        this.snackBar.open("\u0406\u043C\u043F\u043E\u0440\u0442 \u0443\u0441\u043F\u0456\u0448\u043D\u043E \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043E", "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 3e3 });
      }
    });
    input.value = "";
  }
  getSavedViewMode() {
    const saved = localStorage.getItem(this.VIEW_MODE_STORAGE_KEY);
    return saved || "table";
  }
  saveViewMode(mode) {
    localStorage.setItem(this.VIEW_MODE_STORAGE_KEY, mode);
  }
  static \u0275fac = function CityCodePageComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CityCodePageComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CityCodePageComponent, selectors: [["dict-city-code-page"]], viewQuery: function CityCodePageComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(DictCityCodeComponent, 5)(CityCodeTreeComponent, 5)(_c0, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.tableComponent = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.treeComponent = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.fileInput = _t.first);
    }
  }, decls: 33, vars: 5, consts: [["fileInput", ""], ["type", "file", "accept", ".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", 2, "display", "none", 3, "change"], ["actionPanel", ""], [1, "action-buttons"], ["appearance", "outline", 1, "search-field"], ["matInput", "", "placeholder", "\u0412\u0432\u0435\u0434\u0456\u0442\u044C \u043D\u0430\u0437\u0432\u0443 \u0434\u043B\u044F \u043F\u043E\u0448\u0443\u043A\u0443", 3, "ngModelChange", "keyup.enter", "ngModel"], ["mat-icon-button", "", "matSuffix", "", 3, "click"], ["mat-icon-button", "", "matSuffix", ""], ["mat-raised-button", "", "color", "primary", 3, "click"], ["mat-raised-button", "", "color", "accent", 3, "click"], [1, "view-toggle", 3, "change", "value"], ["value", "table", "matTooltip", "\u0422\u0430\u0431\u043B\u0438\u0447\u043D\u0435 \u043F\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u043D\u044F"], ["value", "tree", "matTooltip", "\u0414\u0435\u0440\u0435\u0432\u043E\u043F\u043E\u0434\u0456\u0431\u043D\u0435 \u043F\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u043D\u044F"], ["contentPanel", ""]], template: function CityCodePageComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "input", 1, 0);
      \u0275\u0275listener("change", function CityCodePageComponent_Template_input_change_0_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onFileSelected($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(2, "app-vertical-layout")(3, "div", 2)(4, "h2");
      \u0275\u0275text(5, "\u041A\u043E\u0434\u0438\u0444\u0456\u043A\u0430\u0442\u043E\u0440 \u0430\u0434\u043C\u0456\u043D\u0456\u0441\u0442\u0440\u0430\u0442\u0438\u0432\u043D\u043E-\u0442\u0435\u0440\u0438\u0442\u043E\u0440\u0456\u0430\u043B\u044C\u043D\u0438\u0445 \u043E\u0434\u0438\u043D\u0438\u0446\u044C");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div", 3)(7, "mat-form-field", 4)(8, "mat-label");
      \u0275\u0275text(9, "\u041F\u043E\u0448\u0443\u043A");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "input", 5);
      \u0275\u0275twoWayListener("ngModelChange", function CityCodePageComponent_Template_input_ngModelChange_10_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("keyup.enter", function CityCodePageComponent_Template_input_keyup_enter_10_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onSearch());
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "button", 6);
      \u0275\u0275listener("click", function CityCodePageComponent_Template_button_click_11_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onSearch());
      });
      \u0275\u0275elementStart(12, "mat-icon");
      \u0275\u0275text(13, "search");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(14, CityCodePageComponent_Conditional_14_Template, 3, 1, "button", 7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "button", 8);
      \u0275\u0275listener("click", function CityCodePageComponent_Template_button_click_15_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onRefresh());
      });
      \u0275\u0275elementStart(16, "mat-icon");
      \u0275\u0275text(17, "refresh");
      \u0275\u0275elementEnd();
      \u0275\u0275text(18, " \u041E\u043D\u043E\u0432\u0438\u0442\u0438 ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "button", 9);
      \u0275\u0275listener("click", function CityCodePageComponent_Template_button_click_19_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.openFileDialog());
      });
      \u0275\u0275elementStart(20, "mat-icon");
      \u0275\u0275text(21, "upload_file");
      \u0275\u0275elementEnd();
      \u0275\u0275text(22, " \u0406\u043C\u043F\u043E\u0440\u0442\u0443\u0432\u0430\u0442\u0438 ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "mat-button-toggle-group", 10);
      \u0275\u0275listener("change", function CityCodePageComponent_Template_mat_button_toggle_group_change_23_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onViewModeChange($event.value));
      });
      \u0275\u0275elementStart(24, "mat-button-toggle", 11)(25, "mat-icon");
      \u0275\u0275text(26, "view_list");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(27, "mat-button-toggle", 12)(28, "mat-icon");
      \u0275\u0275text(29, "account_tree");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(30, "div", 13);
      \u0275\u0275conditionalCreate(31, CityCodePageComponent_Conditional_31_Template, 1, 0, "dict-city-codes")(32, CityCodePageComponent_Conditional_32_Template, 1, 0, "dict-city-code-tree");
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(10);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchTerm);
      \u0275\u0275advance();
      \u0275\u0275attribute("aria-label", "\u041F\u043E\u0448\u0443\u043A");
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.searchTerm() ? 14 : -1);
      \u0275\u0275advance(9);
      \u0275\u0275property("value", ctx.viewMode());
      \u0275\u0275advance(8);
      \u0275\u0275conditional(ctx.viewMode() === "table" ? 31 : 32);
    }
  }, dependencies: [
    CommonModule,
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
    VerticalLayoutComponent,
    DictCityCodeComponent,
    CityCodeTreeComponent
  ], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  height: 100%;\n}\nh2[_ngcontent-%COMP%] {\n  margin: 0 0 8px 0;\n  font-size: 18px;\n  font-weight: 500;\n}\n.action-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.search-field[_ngcontent-%COMP%] {\n  width: 300px;\n}\n.view-toggle[_ngcontent-%COMP%] {\n  margin-left: 8px;\n}\ndict-city-codes[_ngcontent-%COMP%], \ndict-city-code-tree[_ngcontent-%COMP%] {\n  display: block;\n  height: 100%;\n}\n/*# sourceMappingURL=CityCodePage.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CityCodePageComponent, [{
    type: Component,
    args: [{ selector: "dict-city-code-page", standalone: true, imports: [
      CommonModule,
      MatButtonModule,
      MatIconModule,
      MatButtonToggleModule,
      MatFormFieldModule,
      MatInputModule,
      MatTooltipModule,
      FormsModule,
      VerticalLayoutComponent,
      DictCityCodeComponent,
      CityCodeTreeComponent
    ], template: `<!-- \u041F\u0440\u0438\u0445\u043E\u0432\u0430\u043D\u0438\u0439 input \u0434\u043B\u044F \u0432\u0438\u0431\u043E\u0440\u0443 \u0444\u0430\u0439\u043B\u0443 -->
<input
  #fileInput
  type="file"
  accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  style="display: none"
  (change)="onFileSelected($event)"
/>

<app-vertical-layout>
  <!-- Action Panel (Top) -->
  <div actionPanel>
    <h2>\u041A\u043E\u0434\u0438\u0444\u0456\u043A\u0430\u0442\u043E\u0440 \u0430\u0434\u043C\u0456\u043D\u0456\u0441\u0442\u0440\u0430\u0442\u0438\u0432\u043D\u043E-\u0442\u0435\u0440\u0438\u0442\u043E\u0440\u0456\u0430\u043B\u044C\u043D\u0438\u0445 \u043E\u0434\u0438\u043D\u0438\u0446\u044C</h2>
    <div class="action-buttons">
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

      <button mat-raised-button color="accent" (click)="openFileDialog()">
        <mat-icon>upload_file</mat-icon>
        \u0406\u043C\u043F\u043E\u0440\u0442\u0443\u0432\u0430\u0442\u0438
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
  </div>

  <!-- Content Panel (Main) -->
  <div contentPanel>
    @if (viewMode() === 'table') {
      <!-- \u0422\u0430\u0431\u043B\u0438\u0447\u043D\u0435 \u043F\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u043D\u044F -->
      <dict-city-codes></dict-city-codes>
    } @else {
      <!-- \u0414\u0435\u0440\u0435\u0432\u043E\u043F\u043E\u0434\u0456\u0431\u043D\u0435 \u043F\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u043D\u044F -->
      <dict-city-code-tree></dict-city-code-tree>
    }
  </div>
</app-vertical-layout>
`, styles: ["/* src/dictionaries/CityCode/CityCodePage.component.scss */\n:host {\n  display: block;\n  height: 100%;\n}\nh2 {\n  margin: 0 0 8px 0;\n  font-size: 18px;\n  font-weight: 500;\n}\n.action-buttons {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.search-field {\n  width: 300px;\n}\n.view-toggle {\n  margin-left: 8px;\n}\ndict-city-codes,\ndict-city-code-tree {\n  display: block;\n  height: 100%;\n}\n/*# sourceMappingURL=CityCodePage.component.css.map */\n"] }]
  }], null, { tableComponent: [{
    type: ViewChild,
    args: [DictCityCodeComponent]
  }], treeComponent: [{
    type: ViewChild,
    args: [CityCodeTreeComponent]
  }], fileInput: [{
    type: ViewChild,
    args: ["fileInput"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CityCodePageComponent, { className: "CityCodePageComponent", filePath: "dictionaries/CityCode/CityCodePage.component.ts", lineNumber: 40 });
})();
export {
  CityCodePageComponent
};
//# sourceMappingURL=chunk-6UCAJVC2.js.map
