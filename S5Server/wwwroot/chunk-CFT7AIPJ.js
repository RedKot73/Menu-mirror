import {
  MatTree,
  MatTreeModule,
  MatTreeNestedDataSource,
  MatTreeNode,
  MatTreeNodeDef,
  MatTreeNodeToggle
} from "./chunk-56YBMVSO.js";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-2DRDDSRF.js";
import {
  MatTooltip,
  MatTooltipModule
} from "./chunk-TKT7GR2R.js";
import {
  MatSelect,
  MatSelectModule
} from "./chunk-5336NQQD.js";
import {
  MatOption
} from "./chunk-MGHM5LON.js";
import {
  MatSnackBar,
  S5App_ErrorHandler
} from "./chunk-NPKDGQEZ.js";
import {
  MatSort,
  MatSortHeader,
  MatSortModule
} from "./chunk-ZAFJFBI5.js";
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
  MatTableModule,
  SelectionModel
} from "./chunk-4VUQ3EJZ.js";
import {
  FormsModule,
  MatFormField,
  MatFormFieldModule,
  MatIcon,
  MatIconModule,
  MatInputModule
} from "./chunk-Z4Z6CI4E.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  CommonModule,
  Component,
  EventEmitter,
  HttpClient,
  HttpParams,
  Injectable,
  InjectionToken,
  Input,
  MatButtonModule,
  MatIconButton,
  NgModule,
  NgTemplateOutlet,
  Observable,
  Output,
  ReplaySubject,
  Subject,
  ViewChild,
  ViewEncapsulation,
  _IdGenerator,
  __async,
  __spreadProps,
  __spreadValues,
  booleanAttribute,
  effect,
  firstValueFrom,
  inject,
  input,
  numberAttribute,
  output,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵariaProperty,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-CK6AJVHQ.js";

// src/ServerService/dictCityCode.service.ts
var CityCodesProgressStatus;
(function(CityCodesProgressStatus2) {
  CityCodesProgressStatus2[CityCodesProgressStatus2["Start"] = 0] = "Start";
  CityCodesProgressStatus2[CityCodesProgressStatus2["Done"] = 1] = "Done";
  CityCodesProgressStatus2[CityCodesProgressStatus2["Failed"] = 2] = "Failed";
})(CityCodesProgressStatus || (CityCodesProgressStatus = {}));
var DictCityCodeService = class _DictCityCodeService {
  api = "/api/dict-city-codes";
  http = inject(HttpClient);
  createItemsSignal() {
    return signal([]);
  }
  getAll(filter) {
    let params = new HttpParams();
    if (filter?.search) {
      params = params.set("search", filter.search);
    }
    if (filter?.page) {
      params = params.set("page", filter.page.toString());
    }
    if (filter?.pageSize) {
      params = params.set("pageSize", filter.pageSize.toString());
    }
    return this.http.get(this.api, { params });
  }
  getById(id) {
    return this.http.get(`${this.api}/${id}`);
  }
  getCityCodeInfo(id) {
    return this.http.get(`${this.api}/get-citycode-info/${id}`);
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
  lookup(term, cityCategoryId, limit = 10) {
    let params = new HttpParams().set("term", term).set("limit", limit.toString());
    if (cityCategoryId) {
      params = params.set("cityCategoryId", cityCategoryId);
    }
    return this.http.get(`${this.api}/lookup`, { params });
  }
  getSelectList(cityCategoryId) {
    let params = new HttpParams();
    if (cityCategoryId) {
      params = params.set("cityCategoryId", cityCategoryId);
    }
    return this.http.get(`${this.api}/sel_list`, { params });
  }
  getByCategory(cityCategoryId) {
    return this.http.get(`${this.api}/by-category/${cityCategoryId}`);
  }
  getByLevel1(level1) {
    return this.http.get(`${this.api}/by-level1/${level1}`);
  }
  /**
   * Імпорт записів кодифікатора з xlsx файлу
   */
  importCityCodes(file) {
    const formData = new FormData();
    formData.append("file", file);
    return this.http.post(`${this.api}/importCityCodes`, formData);
  }
  /**
   * Підписка на Server-Sent Events для моніторингу прогресу імпорту
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
  static \u0275fac = function DictCityCodeService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DictCityCodeService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DictCityCodeService, factory: _DictCityCodeService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DictCityCodeService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// node_modules/@angular/material/fesm2022/paginator.mjs
function MatPaginator_Conditional_2_Conditional_3_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const pageSizeOption_r3 = ctx.$implicit;
    \u0275\u0275property("value", pageSizeOption_r3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", pageSizeOption_r3, " ");
  }
}
function MatPaginator_Conditional_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-form-field", 14)(1, "mat-select", 16, 0);
    \u0275\u0275listener("selectionChange", function MatPaginator_Conditional_2_Conditional_3_Template_mat_select_selectionChange_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1._changePageSize($event.value));
    });
    \u0275\u0275repeaterCreate(3, MatPaginator_Conditional_2_Conditional_3_For_4_Template, 2, 2, "mat-option", 17, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 18);
    \u0275\u0275listener("click", function MatPaginator_Conditional_2_Conditional_3_Template_div_click_5_listener() {
      \u0275\u0275restoreView(_r1);
      const selectRef_r4 = \u0275\u0275reference(2);
      return \u0275\u0275resetView(selectRef_r4.open());
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("appearance", ctx_r1._formFieldAppearance)("color", ctx_r1.color);
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx_r1.pageSize)("disabled", ctx_r1.disabled);
    \u0275\u0275ariaProperty("aria-labelledby", ctx_r1._pageSizeLabelId);
    \u0275\u0275property("panelClass", ctx_r1.selectConfig.panelClass || "")("disableOptionCentering", ctx_r1.selectConfig.disableOptionCentering);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1._displayedPageSizeOptions);
  }
}
function MatPaginator_Conditional_2_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.pageSize);
  }
}
function MatPaginator_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 13);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, MatPaginator_Conditional_2_Conditional_3_Template, 6, 7, "mat-form-field", 14);
    \u0275\u0275conditionalCreate(4, MatPaginator_Conditional_2_Conditional_4_Template, 2, 1, "div", 15);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275attribute("id", ctx_r1._pageSizeLabelId);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1._intl.itemsPerPageLabel, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1._displayedPageSizeOptions.length > 1 ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1._displayedPageSizeOptions.length <= 1 ? 4 : -1);
  }
}
function MatPaginator_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 19);
    \u0275\u0275listener("click", function MatPaginator_Conditional_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1._buttonClicked(0, ctx_r1._previousButtonsDisabled()));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 8);
    \u0275\u0275element(2, "path", 20);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("matTooltip", ctx_r1._intl.firstPageLabel)("matTooltipDisabled", ctx_r1._previousButtonsDisabled())("disabled", ctx_r1._previousButtonsDisabled())("tabindex", ctx_r1._previousButtonsDisabled() ? -1 : null);
    \u0275\u0275attribute("aria-label", ctx_r1._intl.firstPageLabel);
  }
}
function MatPaginator_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 21);
    \u0275\u0275listener("click", function MatPaginator_Conditional_13_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1._buttonClicked(ctx_r1.getNumberOfPages() - 1, ctx_r1._nextButtonsDisabled()));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 8);
    \u0275\u0275element(2, "path", 22);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("matTooltip", ctx_r1._intl.lastPageLabel)("matTooltipDisabled", ctx_r1._nextButtonsDisabled())("disabled", ctx_r1._nextButtonsDisabled())("tabindex", ctx_r1._nextButtonsDisabled() ? -1 : null);
    \u0275\u0275attribute("aria-label", ctx_r1._intl.lastPageLabel);
  }
}
var MatPaginatorIntl = class _MatPaginatorIntl {
  changes = new Subject();
  itemsPerPageLabel = "Items per page:";
  nextPageLabel = "Next page";
  previousPageLabel = "Previous page";
  firstPageLabel = "First page";
  lastPageLabel = "Last page";
  getRangeLabel = (page, pageSize, length) => {
    if (length == 0 || pageSize == 0) {
      return `0 of ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${startIndex + 1} \u2013 ${endIndex} of ${length}`;
  };
  static \u0275fac = function MatPaginatorIntl_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatPaginatorIntl)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _MatPaginatorIntl,
    factory: _MatPaginatorIntl.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatPaginatorIntl, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var DEFAULT_PAGE_SIZE = 50;
var MAT_PAGINATOR_DEFAULT_OPTIONS = new InjectionToken("MAT_PAGINATOR_DEFAULT_OPTIONS");
var MatPaginator = class _MatPaginator {
  _intl = inject(MatPaginatorIntl);
  _changeDetectorRef = inject(ChangeDetectorRef);
  _formFieldAppearance;
  _pageSizeLabelId = inject(_IdGenerator).getId("mat-paginator-page-size-label-");
  _intlChanges;
  _isInitialized = false;
  _initializedStream = new ReplaySubject(1);
  color;
  get pageIndex() {
    return this._pageIndex;
  }
  set pageIndex(value) {
    this._pageIndex = Math.max(value || 0, 0);
    this._changeDetectorRef.markForCheck();
  }
  _pageIndex = 0;
  get length() {
    return this._length;
  }
  set length(value) {
    this._length = value || 0;
    this._changeDetectorRef.markForCheck();
  }
  _length = 0;
  get pageSize() {
    return this._pageSize;
  }
  set pageSize(value) {
    this._pageSize = Math.max(value || 0, 0);
    this._updateDisplayedPageSizeOptions();
  }
  _pageSize;
  get pageSizeOptions() {
    return this._pageSizeOptions;
  }
  set pageSizeOptions(value) {
    this._pageSizeOptions = (value || []).map((p) => numberAttribute(p, 0));
    this._updateDisplayedPageSizeOptions();
  }
  _pageSizeOptions = [];
  hidePageSize = false;
  showFirstLastButtons = false;
  selectConfig = {};
  disabled = false;
  page = new EventEmitter();
  _displayedPageSizeOptions;
  initialized = this._initializedStream;
  constructor() {
    const _intl = this._intl;
    const defaults = inject(MAT_PAGINATOR_DEFAULT_OPTIONS, {
      optional: true
    });
    this._intlChanges = _intl.changes.subscribe(() => this._changeDetectorRef.markForCheck());
    if (defaults) {
      const {
        pageSize,
        pageSizeOptions,
        hidePageSize,
        showFirstLastButtons
      } = defaults;
      if (pageSize != null) {
        this._pageSize = pageSize;
      }
      if (pageSizeOptions != null) {
        this._pageSizeOptions = pageSizeOptions;
      }
      if (hidePageSize != null) {
        this.hidePageSize = hidePageSize;
      }
      if (showFirstLastButtons != null) {
        this.showFirstLastButtons = showFirstLastButtons;
      }
    }
    this._formFieldAppearance = defaults?.formFieldAppearance || "outline";
  }
  ngOnInit() {
    this._isInitialized = true;
    this._updateDisplayedPageSizeOptions();
    this._initializedStream.next();
  }
  ngOnDestroy() {
    this._initializedStream.complete();
    this._intlChanges.unsubscribe();
  }
  nextPage() {
    if (this.hasNextPage()) {
      this._navigate(this.pageIndex + 1);
    }
  }
  previousPage() {
    if (this.hasPreviousPage()) {
      this._navigate(this.pageIndex - 1);
    }
  }
  firstPage() {
    if (this.hasPreviousPage()) {
      this._navigate(0);
    }
  }
  lastPage() {
    if (this.hasNextPage()) {
      this._navigate(this.getNumberOfPages() - 1);
    }
  }
  hasPreviousPage() {
    return this.pageIndex >= 1 && this.pageSize != 0;
  }
  hasNextPage() {
    const maxPageIndex = this.getNumberOfPages() - 1;
    return this.pageIndex < maxPageIndex && this.pageSize != 0;
  }
  getNumberOfPages() {
    if (!this.pageSize) {
      return 0;
    }
    return Math.ceil(this.length / this.pageSize);
  }
  _changePageSize(pageSize) {
    const startIndex = this.pageIndex * this.pageSize;
    const previousPageIndex = this.pageIndex;
    this.pageIndex = Math.floor(startIndex / pageSize) || 0;
    this.pageSize = pageSize;
    this._emitPageEvent(previousPageIndex);
  }
  _nextButtonsDisabled() {
    return this.disabled || !this.hasNextPage();
  }
  _previousButtonsDisabled() {
    return this.disabled || !this.hasPreviousPage();
  }
  _updateDisplayedPageSizeOptions() {
    if (!this._isInitialized) {
      return;
    }
    if (!this.pageSize) {
      this._pageSize = this.pageSizeOptions.length != 0 ? this.pageSizeOptions[0] : DEFAULT_PAGE_SIZE;
    }
    this._displayedPageSizeOptions = this.pageSizeOptions.slice();
    if (this._displayedPageSizeOptions.indexOf(this.pageSize) === -1) {
      this._displayedPageSizeOptions.push(this.pageSize);
    }
    this._displayedPageSizeOptions.sort((a, b) => a - b);
    this._changeDetectorRef.markForCheck();
  }
  _emitPageEvent(previousPageIndex) {
    this.page.emit({
      previousPageIndex,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      length: this.length
    });
  }
  _navigate(index) {
    const previousIndex = this.pageIndex;
    if (index !== previousIndex) {
      this.pageIndex = index;
      this._emitPageEvent(previousIndex);
    }
  }
  _buttonClicked(targetIndex, isDisabled) {
    if (!isDisabled) {
      this._navigate(targetIndex);
    }
  }
  static \u0275fac = function MatPaginator_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatPaginator)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatPaginator,
    selectors: [["mat-paginator"]],
    hostAttrs: ["role", "group", 1, "mat-mdc-paginator"],
    inputs: {
      color: "color",
      pageIndex: [2, "pageIndex", "pageIndex", numberAttribute],
      length: [2, "length", "length", numberAttribute],
      pageSize: [2, "pageSize", "pageSize", numberAttribute],
      pageSizeOptions: "pageSizeOptions",
      hidePageSize: [2, "hidePageSize", "hidePageSize", booleanAttribute],
      showFirstLastButtons: [2, "showFirstLastButtons", "showFirstLastButtons", booleanAttribute],
      selectConfig: "selectConfig",
      disabled: [2, "disabled", "disabled", booleanAttribute]
    },
    outputs: {
      page: "page"
    },
    exportAs: ["matPaginator"],
    decls: 14,
    vars: 14,
    consts: [["selectRef", ""], [1, "mat-mdc-paginator-outer-container"], [1, "mat-mdc-paginator-container"], [1, "mat-mdc-paginator-page-size"], [1, "mat-mdc-paginator-range-actions"], ["aria-atomic", "true", "aria-live", "polite", "role", "status", 1, "mat-mdc-paginator-range-label"], ["matIconButton", "", "type", "button", "matTooltipPosition", "above", "disabledInteractive", "", 1, "mat-mdc-paginator-navigation-first", 3, "matTooltip", "matTooltipDisabled", "disabled", "tabindex"], ["matIconButton", "", "type", "button", "matTooltipPosition", "above", "disabledInteractive", "", 1, "mat-mdc-paginator-navigation-previous", 3, "click", "matTooltip", "matTooltipDisabled", "disabled", "tabindex"], ["viewBox", "0 0 24 24", "focusable", "false", "aria-hidden", "true", 1, "mat-mdc-paginator-icon"], ["d", "M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"], ["matIconButton", "", "type", "button", "matTooltipPosition", "above", "disabledInteractive", "", 1, "mat-mdc-paginator-navigation-next", 3, "click", "matTooltip", "matTooltipDisabled", "disabled", "tabindex"], ["d", "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"], ["matIconButton", "", "type", "button", "matTooltipPosition", "above", "disabledInteractive", "", 1, "mat-mdc-paginator-navigation-last", 3, "matTooltip", "matTooltipDisabled", "disabled", "tabindex"], ["aria-hidden", "true", 1, "mat-mdc-paginator-page-size-label"], [1, "mat-mdc-paginator-page-size-select", 3, "appearance", "color"], [1, "mat-mdc-paginator-page-size-value"], ["hideSingleSelectionIndicator", "", 3, "selectionChange", "value", "disabled", "aria-labelledby", "panelClass", "disableOptionCentering"], [3, "value"], [1, "mat-mdc-paginator-touch-target", 3, "click"], ["matIconButton", "", "type", "button", "matTooltipPosition", "above", "disabledInteractive", "", 1, "mat-mdc-paginator-navigation-first", 3, "click", "matTooltip", "matTooltipDisabled", "disabled", "tabindex"], ["d", "M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"], ["matIconButton", "", "type", "button", "matTooltipPosition", "above", "disabledInteractive", "", 1, "mat-mdc-paginator-navigation-last", 3, "click", "matTooltip", "matTooltipDisabled", "disabled", "tabindex"], ["d", "M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"]],
    template: function MatPaginator_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 1)(1, "div", 2);
        \u0275\u0275conditionalCreate(2, MatPaginator_Conditional_2_Template, 5, 4, "div", 3);
        \u0275\u0275elementStart(3, "div", 4)(4, "div", 5);
        \u0275\u0275text(5);
        \u0275\u0275elementEnd();
        \u0275\u0275conditionalCreate(6, MatPaginator_Conditional_6_Template, 3, 5, "button", 6);
        \u0275\u0275elementStart(7, "button", 7);
        \u0275\u0275listener("click", function MatPaginator_Template_button_click_7_listener() {
          return ctx._buttonClicked(ctx.pageIndex - 1, ctx._previousButtonsDisabled());
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(8, "svg", 8);
        \u0275\u0275element(9, "path", 9);
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(10, "button", 10);
        \u0275\u0275listener("click", function MatPaginator_Template_button_click_10_listener() {
          return ctx._buttonClicked(ctx.pageIndex + 1, ctx._nextButtonsDisabled());
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(11, "svg", 8);
        \u0275\u0275element(12, "path", 11);
        \u0275\u0275elementEnd()();
        \u0275\u0275conditionalCreate(13, MatPaginator_Conditional_13_Template, 3, 5, "button", 12);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(2);
        \u0275\u0275conditional(!ctx.hidePageSize ? 2 : -1);
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate1(" ", ctx._intl.getRangeLabel(ctx.pageIndex, ctx.pageSize, ctx.length), " ");
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.showFirstLastButtons ? 6 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("matTooltip", ctx._intl.previousPageLabel)("matTooltipDisabled", ctx._previousButtonsDisabled())("disabled", ctx._previousButtonsDisabled())("tabindex", ctx._previousButtonsDisabled() ? -1 : null);
        \u0275\u0275attribute("aria-label", ctx._intl.previousPageLabel);
        \u0275\u0275advance(3);
        \u0275\u0275property("matTooltip", ctx._intl.nextPageLabel)("matTooltipDisabled", ctx._nextButtonsDisabled())("disabled", ctx._nextButtonsDisabled())("tabindex", ctx._nextButtonsDisabled() ? -1 : null);
        \u0275\u0275attribute("aria-label", ctx._intl.nextPageLabel);
        \u0275\u0275advance(3);
        \u0275\u0275conditional(ctx.showFirstLastButtons ? 13 : -1);
      }
    },
    dependencies: [MatFormField, MatSelect, MatOption, MatIconButton, MatTooltip],
    styles: [".mat-mdc-paginator{display:block;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;color:var(--mat-paginator-container-text-color, var(--mat-sys-on-surface));background-color:var(--mat-paginator-container-background-color, var(--mat-sys-surface));font-family:var(--mat-paginator-container-text-font, var(--mat-sys-body-small-font));line-height:var(--mat-paginator-container-text-line-height, var(--mat-sys-body-small-line-height));font-size:var(--mat-paginator-container-text-size, var(--mat-sys-body-small-size));font-weight:var(--mat-paginator-container-text-weight, var(--mat-sys-body-small-weight));letter-spacing:var(--mat-paginator-container-text-tracking, var(--mat-sys-body-small-tracking));--mat-form-field-container-height: var(--mat-paginator-form-field-container-height, 40px);--mat-form-field-container-vertical-padding: var(--mat-paginator-form-field-container-vertical-padding, 8px)}.mat-mdc-paginator .mat-mdc-select-value{font-size:var(--mat-paginator-select-trigger-text-size, var(--mat-sys-body-small-size))}.mat-mdc-paginator .mat-mdc-form-field-subscript-wrapper{display:none}.mat-mdc-paginator .mat-mdc-select{line-height:1.5}.mat-mdc-paginator-outer-container{display:flex}.mat-mdc-paginator-container{display:flex;align-items:center;justify-content:flex-end;padding:0 8px;flex-wrap:wrap;width:100%;min-height:var(--mat-paginator-container-size, 56px)}.mat-mdc-paginator-page-size{display:flex;align-items:baseline;margin-right:8px}[dir=rtl] .mat-mdc-paginator-page-size{margin-right:0;margin-left:8px}.mat-mdc-paginator-page-size-label{margin:0 4px}.mat-mdc-paginator-page-size-select{margin:0 4px;width:var(--mat-paginator-page-size-select-width, 84px)}.mat-mdc-paginator-range-label{margin:0 32px 0 24px}.mat-mdc-paginator-range-actions{display:flex;align-items:center}.mat-mdc-paginator-icon{display:inline-block;width:28px;fill:var(--mat-paginator-enabled-icon-color, var(--mat-sys-on-surface-variant))}.mat-mdc-icon-button[aria-disabled] .mat-mdc-paginator-icon{fill:var(--mat-paginator-disabled-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}[dir=rtl] .mat-mdc-paginator-icon{transform:rotate(180deg)}@media(forced-colors: active){.mat-mdc-icon-button[aria-disabled] .mat-mdc-paginator-icon,.mat-mdc-paginator-icon{fill:currentColor}.mat-mdc-paginator-range-actions .mat-mdc-icon-button{outline:solid 1px}.mat-mdc-paginator-range-actions .mat-mdc-icon-button[aria-disabled]{color:GrayText}}.mat-mdc-paginator-touch-target{display:var(--mat-paginator-touch-target-display, block);position:absolute;top:50%;left:50%;width:var(--mat-paginator-page-size-select-width, 84px);height:var(--mat-paginator-page-size-select-touch-target-height, 48px);background-color:rgba(0,0,0,0);transform:translate(-50%, -50%);cursor:pointer}\n"],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatPaginator, [{
    type: Component,
    args: [{
      selector: "mat-paginator",
      exportAs: "matPaginator",
      host: {
        "class": "mat-mdc-paginator",
        "role": "group"
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      imports: [MatFormField, MatSelect, MatOption, MatIconButton, MatTooltip],
      template: '<div class="mat-mdc-paginator-outer-container">\n  <div class="mat-mdc-paginator-container">\n    @if (!hidePageSize) {\n      <div class="mat-mdc-paginator-page-size">\n        <div class="mat-mdc-paginator-page-size-label" [attr.id]="_pageSizeLabelId" aria-hidden="true">\n          {{_intl.itemsPerPageLabel}}\n        </div>\n\n        @if (_displayedPageSizeOptions.length > 1) {\n          <mat-form-field\n            [appearance]="_formFieldAppearance!"\n            [color]="color"\n            class="mat-mdc-paginator-page-size-select">\n            <mat-select\n              #selectRef\n              [value]="pageSize"\n              [disabled]="disabled"\n              [aria-labelledby]="_pageSizeLabelId"\n              [panelClass]="selectConfig.panelClass || \'\'"\n              [disableOptionCentering]="selectConfig.disableOptionCentering"\n              (selectionChange)="_changePageSize($event.value)"\n              hideSingleSelectionIndicator>\n              @for (pageSizeOption of _displayedPageSizeOptions; track pageSizeOption) {\n                <mat-option [value]="pageSizeOption">\n                  {{pageSizeOption}}\n                </mat-option>\n              }\n            </mat-select>\n          <div class="mat-mdc-paginator-touch-target" (click)="selectRef.open()"></div>\n          </mat-form-field>\n        }\n\n        @if (_displayedPageSizeOptions.length <= 1) {\n          <div class="mat-mdc-paginator-page-size-value">{{pageSize}}</div>\n        }\n      </div>\n    }\n\n    <div class="mat-mdc-paginator-range-actions">\n      <div class="mat-mdc-paginator-range-label" aria-atomic="true" aria-live="polite" role="status">\n        {{_intl.getRangeLabel(pageIndex, pageSize, length)}}\n      </div>\n\n      <!--\n      The buttons use `disabledInteractive` so that they can retain focus if they become disabled,\n      otherwise focus is moved to the document body. However, users should not be able to navigate\n      into these buttons, so `tabindex` is set to -1 when disabled.\n      -->\n\n      @if (showFirstLastButtons) {\n        <button matIconButton type="button"\n                class="mat-mdc-paginator-navigation-first"\n                (click)="_buttonClicked(0, _previousButtonsDisabled())"\n                [attr.aria-label]="_intl.firstPageLabel"\n                [matTooltip]="_intl.firstPageLabel"\n                [matTooltipDisabled]="_previousButtonsDisabled()"\n                matTooltipPosition="above"\n                [disabled]="_previousButtonsDisabled()"\n                [tabindex]="_previousButtonsDisabled() ? -1 : null"\n                disabledInteractive>\n          <svg class="mat-mdc-paginator-icon"\n              viewBox="0 0 24 24"\n              focusable="false"\n              aria-hidden="true">\n            <path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"/>\n          </svg>\n        </button>\n      }\n      <button matIconButton type="button"\n              class="mat-mdc-paginator-navigation-previous"\n              (click)="_buttonClicked(pageIndex - 1, _previousButtonsDisabled())"\n              [attr.aria-label]="_intl.previousPageLabel"\n              [matTooltip]="_intl.previousPageLabel"\n              [matTooltipDisabled]="_previousButtonsDisabled()"\n              matTooltipPosition="above"\n              [disabled]="_previousButtonsDisabled()"\n              [tabindex]="_previousButtonsDisabled() ? -1 : null"\n              disabledInteractive>\n        <svg class="mat-mdc-paginator-icon"\n             viewBox="0 0 24 24"\n             focusable="false"\n             aria-hidden="true">\n          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>\n        </svg>\n      </button>\n      <button matIconButton type="button"\n              class="mat-mdc-paginator-navigation-next"\n              (click)="_buttonClicked(pageIndex + 1, _nextButtonsDisabled())"\n              [attr.aria-label]="_intl.nextPageLabel"\n              [matTooltip]="_intl.nextPageLabel"\n              [matTooltipDisabled]="_nextButtonsDisabled()"\n              matTooltipPosition="above"\n              [disabled]="_nextButtonsDisabled()"\n              [tabindex]="_nextButtonsDisabled() ? -1 : null"\n              disabledInteractive>\n        <svg class="mat-mdc-paginator-icon"\n             viewBox="0 0 24 24"\n             focusable="false"\n             aria-hidden="true">\n          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>\n        </svg>\n      </button>\n      @if (showFirstLastButtons) {\n        <button matIconButton type="button"\n                class="mat-mdc-paginator-navigation-last"\n                (click)="_buttonClicked(getNumberOfPages() - 1, _nextButtonsDisabled())"\n                [attr.aria-label]="_intl.lastPageLabel"\n                [matTooltip]="_intl.lastPageLabel"\n                [matTooltipDisabled]="_nextButtonsDisabled()"\n                matTooltipPosition="above"\n                [disabled]="_nextButtonsDisabled()"\n                [tabindex]="_nextButtonsDisabled() ? -1 : null"\n                disabledInteractive>\n          <svg class="mat-mdc-paginator-icon"\n              viewBox="0 0 24 24"\n              focusable="false"\n              aria-hidden="true">\n            <path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"/>\n          </svg>\n        </button>\n      }\n    </div>\n  </div>\n</div>\n',
      styles: [".mat-mdc-paginator{display:block;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;color:var(--mat-paginator-container-text-color, var(--mat-sys-on-surface));background-color:var(--mat-paginator-container-background-color, var(--mat-sys-surface));font-family:var(--mat-paginator-container-text-font, var(--mat-sys-body-small-font));line-height:var(--mat-paginator-container-text-line-height, var(--mat-sys-body-small-line-height));font-size:var(--mat-paginator-container-text-size, var(--mat-sys-body-small-size));font-weight:var(--mat-paginator-container-text-weight, var(--mat-sys-body-small-weight));letter-spacing:var(--mat-paginator-container-text-tracking, var(--mat-sys-body-small-tracking));--mat-form-field-container-height: var(--mat-paginator-form-field-container-height, 40px);--mat-form-field-container-vertical-padding: var(--mat-paginator-form-field-container-vertical-padding, 8px)}.mat-mdc-paginator .mat-mdc-select-value{font-size:var(--mat-paginator-select-trigger-text-size, var(--mat-sys-body-small-size))}.mat-mdc-paginator .mat-mdc-form-field-subscript-wrapper{display:none}.mat-mdc-paginator .mat-mdc-select{line-height:1.5}.mat-mdc-paginator-outer-container{display:flex}.mat-mdc-paginator-container{display:flex;align-items:center;justify-content:flex-end;padding:0 8px;flex-wrap:wrap;width:100%;min-height:var(--mat-paginator-container-size, 56px)}.mat-mdc-paginator-page-size{display:flex;align-items:baseline;margin-right:8px}[dir=rtl] .mat-mdc-paginator-page-size{margin-right:0;margin-left:8px}.mat-mdc-paginator-page-size-label{margin:0 4px}.mat-mdc-paginator-page-size-select{margin:0 4px;width:var(--mat-paginator-page-size-select-width, 84px)}.mat-mdc-paginator-range-label{margin:0 32px 0 24px}.mat-mdc-paginator-range-actions{display:flex;align-items:center}.mat-mdc-paginator-icon{display:inline-block;width:28px;fill:var(--mat-paginator-enabled-icon-color, var(--mat-sys-on-surface-variant))}.mat-mdc-icon-button[aria-disabled] .mat-mdc-paginator-icon{fill:var(--mat-paginator-disabled-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}[dir=rtl] .mat-mdc-paginator-icon{transform:rotate(180deg)}@media(forced-colors: active){.mat-mdc-icon-button[aria-disabled] .mat-mdc-paginator-icon,.mat-mdc-paginator-icon{fill:currentColor}.mat-mdc-paginator-range-actions .mat-mdc-icon-button{outline:solid 1px}.mat-mdc-paginator-range-actions .mat-mdc-icon-button[aria-disabled]{color:GrayText}}.mat-mdc-paginator-touch-target{display:var(--mat-paginator-touch-target-display, block);position:absolute;top:50%;left:50%;width:var(--mat-paginator-page-size-select-width, 84px);height:var(--mat-paginator-page-size-select-touch-target-height, 48px);background-color:rgba(0,0,0,0);transform:translate(-50%, -50%);cursor:pointer}\n"]
    }]
  }], () => [], {
    color: [{
      type: Input
    }],
    pageIndex: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    length: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    pageSize: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    pageSizeOptions: [{
      type: Input
    }],
    hidePageSize: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    showFirstLastButtons: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    selectConfig: [{
      type: Input
    }],
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    page: [{
      type: Output
    }]
  });
})();
var MatPaginatorModule = class _MatPaginatorModule {
  static \u0275fac = function MatPaginatorModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatPaginatorModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _MatPaginatorModule,
    imports: [MatButtonModule, MatSelectModule, MatTooltipModule, MatPaginator],
    exports: [MatPaginator]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [MatButtonModule, MatSelectModule, MatTooltipModule, MatPaginator]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatPaginatorModule, [{
    type: NgModule,
    args: [{
      imports: [MatButtonModule, MatSelectModule, MatTooltipModule, MatPaginator],
      exports: [MatPaginator]
    }]
  }], null, null);
})();

// src/dictionaries/CityCode/dictCityCode.component.ts
var _c0 = () => [10, 25, 50, 100, 200];
function DictCityCodeComponent_th_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 14);
    \u0275\u0275text(1, "\u041E\u0431\u043B\u0430\u0441\u0442\u044C");
    \u0275\u0275elementEnd();
  }
}
function DictCityCodeComponent_td_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r2.level1);
  }
}
function DictCityCodeComponent_th_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 14);
    \u0275\u0275text(1, "\u0420\u0430\u0439\u043E\u043D");
    \u0275\u0275elementEnd();
  }
}
function DictCityCodeComponent_td_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r3.level2);
  }
}
function DictCityCodeComponent_th_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 14);
    \u0275\u0275text(1, "\u0413\u0440\u043E\u043C\u0430\u0434\u0430");
    \u0275\u0275elementEnd();
  }
}
function DictCityCodeComponent_td_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r4.level3);
  }
}
function DictCityCodeComponent_th_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 14);
    \u0275\u0275text(1, "\u041C\u0456\u0441\u0442\u043E/\u0421\u0435\u043B\u043E");
    \u0275\u0275elementEnd();
  }
}
function DictCityCodeComponent_td_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r5.level4);
  }
}
function DictCityCodeComponent_th_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 14);
    \u0275\u0275text(1, "\u0420\u0430\u0439\u043E\u043D \u043C\u0456\u0441\u0442\u0430");
    \u0275\u0275elementEnd();
  }
}
function DictCityCodeComponent_td_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r6.levelExt);
  }
}
function DictCityCodeComponent_th_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 14);
    \u0275\u0275text(1, "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0456\u044F");
    \u0275\u0275elementEnd();
  }
}
function DictCityCodeComponent_td_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r7 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r7.category);
  }
}
function DictCityCodeComponent_th_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 14);
    \u0275\u0275text(1, "\u041D\u0430\u0437\u0432\u0430");
    \u0275\u0275elementEnd();
  }
}
function DictCityCodeComponent_td_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r8 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r8.value);
  }
}
function DictCityCodeComponent_tr_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 16);
  }
}
function DictCityCodeComponent_tr_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 17);
    \u0275\u0275listener("click", function DictCityCodeComponent_tr_23_Template_tr_click_0_listener() {
      const row_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r10 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r10.selectionMode() && ctx_r10.selectItem(row_r10));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r10 = \u0275\u0275nextContext();
    \u0275\u0275classProp("selectable-row", ctx_r10.selectionMode());
  }
}
var DictCityCodeComponent = class _DictCityCodeComponent {
  dictCityCodeService = inject(DictCityCodeService);
  items = this.dictCityCodeService.createItemsSignal();
  dataSource = new MatTableDataSource([]);
  // Input: режим выбора (скрывает кнопки действий, разрешает выбор)
  selectionMode = input(false, ...ngDevMode ? [{ debugName: "selectionMode" }] : []);
  // Output: событие выбора записи
  itemSelected = output();
  displayedColumns = [
    //'parentId',
    "level1",
    "level2",
    "level3",
    "level4",
    "levelExt",
    "category",
    "value"
  ];
  snackBar = inject(MatSnackBar);
  searchTerm = "";
  searchTimeout;
  // Пагинация
  totalCount = signal(0, ...ngDevMode ? [{ debugName: "totalCount" }] : []);
  pageSize = signal(100, ...ngDevMode ? [{ debugName: "pageSize" }] : []);
  pageIndex = signal(0, ...ngDevMode ? [{ debugName: "pageIndex" }] : []);
  sort;
  paginator;
  constructor() {
    effect(() => {
      this.dataSource.data = this.items();
    });
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.reload();
  }
  onSearchChange() {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    this.searchTimeout = window.setTimeout(() => {
      this.pageIndex.set(0);
      this.reload();
    }, 500);
  }
  onPageChange(event) {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.reload();
  }
  selectItem(item) {
    this.itemSelected.emit(item);
  }
  reload() {
    const filter = {
      page: this.pageIndex() + 1,
      pageSize: this.pageSize()
    };
    if (this.searchTerm) {
      filter.search = this.searchTerm;
    }
    this.dictCityCodeService.getAll(filter).subscribe({
      next: (result) => {
        this.items.set(result.items);
        this.totalCount.set(result.totalCount);
        this.pageIndex.set(result.page - 1);
        this.pageSize.set(result.pageSize);
      },
      error: (error) => {
        console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u043A\u043E\u0434\u0438\u0444\u0456\u043A\u0430\u0442\u043E\u0440\u0430:", error);
        const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u043A\u043E\u0434\u0438\u0444\u0456\u043A\u0430\u0442\u043E\u0440\u0430:");
        this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
      }
    });
  }
  static \u0275fac = function DictCityCodeComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DictCityCodeComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DictCityCodeComponent, selectors: [["dict-city-codes"]], viewQuery: function DictCityCodeComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(MatSort, 5)(MatPaginator, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.sort = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.paginator = _t.first);
    }
  }, inputs: { selectionMode: [1, "selectionMode"] }, outputs: { itemSelected: "itemSelected" }, decls: 26, vars: 9, consts: [["paginator", ""], ["mat-table", "", "matSort", "", 1, "mat-elevation-z8", 3, "dataSource"], ["matColumnDef", "level1"], ["mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "level2"], ["matColumnDef", "level3"], ["matColumnDef", "level4"], ["matColumnDef", "levelExt"], ["matColumnDef", "category"], ["matColumnDef", "value"], ["mat-header-row", "", 4, "matHeaderRowDef", "matHeaderRowDefSticky"], ["mat-row", "", 3, "selectable-row", "click", 4, "matRowDef", "matRowDefColumns"], ["showFirstLastButtons", "", 1, "paginator", 3, "page", "length", "pageSize", "pageSizeOptions", "pageIndex"], ["mat-header-cell", "", "mat-sort-header", ""], ["mat-cell", ""], ["mat-header-row", ""], ["mat-row", "", 3, "click"]], template: function DictCityCodeComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "table", 1);
      \u0275\u0275elementContainerStart(1, 2);
      \u0275\u0275template(2, DictCityCodeComponent_th_2_Template, 2, 0, "th", 3)(3, DictCityCodeComponent_td_3_Template, 2, 1, "td", 4);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(4, 5);
      \u0275\u0275template(5, DictCityCodeComponent_th_5_Template, 2, 0, "th", 3)(6, DictCityCodeComponent_td_6_Template, 2, 1, "td", 4);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(7, 6);
      \u0275\u0275template(8, DictCityCodeComponent_th_8_Template, 2, 0, "th", 3)(9, DictCityCodeComponent_td_9_Template, 2, 1, "td", 4);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(10, 7);
      \u0275\u0275template(11, DictCityCodeComponent_th_11_Template, 2, 0, "th", 3)(12, DictCityCodeComponent_td_12_Template, 2, 1, "td", 4);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(13, 8);
      \u0275\u0275template(14, DictCityCodeComponent_th_14_Template, 2, 0, "th", 3)(15, DictCityCodeComponent_td_15_Template, 2, 1, "td", 4);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(16, 9);
      \u0275\u0275template(17, DictCityCodeComponent_th_17_Template, 2, 0, "th", 3)(18, DictCityCodeComponent_td_18_Template, 2, 1, "td", 4);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(19, 10);
      \u0275\u0275template(20, DictCityCodeComponent_th_20_Template, 2, 0, "th", 3)(21, DictCityCodeComponent_td_21_Template, 2, 1, "td", 4);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275template(22, DictCityCodeComponent_tr_22_Template, 1, 0, "tr", 11)(23, DictCityCodeComponent_tr_23_Template, 1, 2, "tr", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "mat-paginator", 13, 0);
      \u0275\u0275listener("page", function DictCityCodeComponent_Template_mat_paginator_page_24_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onPageChange($event));
      });
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275property("dataSource", ctx.dataSource);
      \u0275\u0275advance(22);
      \u0275\u0275property("matHeaderRowDef", ctx.displayedColumns)("matHeaderRowDefSticky", true);
      \u0275\u0275advance();
      \u0275\u0275property("matRowDefColumns", ctx.displayedColumns);
      \u0275\u0275advance();
      \u0275\u0275property("length", ctx.totalCount())("pageSize", ctx.pageSize())("pageSizeOptions", \u0275\u0275pureFunction0(8, _c0))("pageIndex", ctx.pageIndex());
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
    MatSortModule,
    MatSort,
    MatSortHeader,
    MatPaginatorModule,
    MatPaginator,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  height: 100%;\n}\ntable[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.mat-mdc-row[_ngcontent-%COMP%] {\n  cursor: pointer;\n  transition: background-color 0.2s;\n}\n.mat-mdc-row[_ngcontent-%COMP%]:hover {\n  background-color: #f5f5f5;\n}\n.mat-mdc-row.selected[_ngcontent-%COMP%] {\n  background-color: #e3f2fd !important;\n}\n.mat-mdc-row.selected[_ngcontent-%COMP%]:hover {\n  background-color: #bbdefb !important;\n}\n.dict-page-container[_ngcontent-%COMP%] {\n  height: calc(100vh - 64px);\n  overflow-y: auto;\n  padding: 16px;\n  padding-bottom: 32px;\n}\n.dict-page-container[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.dict-page-container[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.dict-page-container[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]    + button[_ngcontent-%COMP%] {\n  margin-left: 8px;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-top: 1em;\n  margin-bottom: 16px;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]   .value-text[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]   .edit-btn[_ngcontent-%COMP%] {\n  opacity: 0;\n  transition: opacity 0.2s;\n  width: 32px;\n  height: 32px;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]   .edit-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]:hover   .view-mode[_ngcontent-%COMP%]   .edit-btn[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .inline-input[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 4px 8px;\n  border: 1px solid #2196f3;\n  border-radius: 4px;\n  font-size: 14px;\n  background-color: #f5f5f5;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .inline-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #1976d2;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .save-btn[_ngcontent-%COMP%], \n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  flex-shrink: 0;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .save-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], \n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .save-btn[_ngcontent-%COMP%] {\n  color: #4caf50;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%] {\n  color: #f44336;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .clickable-row[_ngcontent-%COMP%] {\n  cursor: pointer;\n  transition: background-color 0.2s;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .clickable-row[_ngcontent-%COMP%]:hover {\n  background-color: #f5f5f5;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .clickable-row.selected[_ngcontent-%COMP%] {\n  background-color: #e3f2fd;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .clickable-row.selected[_ngcontent-%COMP%]:hover {\n  background-color: #bbdefb;\n}\n/*# sourceMappingURL=dict-page.styles.css.map */", "\n\n[_nghost-%COMP%] {\n  display: block;\n  height: 100%;\n}\ntable[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.paginator[_ngcontent-%COMP%] {\n  min-height: 128px;\n}\n.selectable-row[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.selectable-row[_ngcontent-%COMP%]:hover {\n  background-color: rgba(0, 0, 0, 0.04);\n}\n/*# sourceMappingURL=dictCityCode.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DictCityCodeComponent, [{
    type: Component,
    args: [{ selector: "dict-city-codes", imports: [
      MatTableModule,
      MatButtonModule,
      MatSortModule,
      MatPaginatorModule,
      MatIconModule,
      MatFormFieldModule,
      MatInputModule,
      FormsModule
    ], template: '<table mat-table [dataSource]="dataSource" matSort class="mat-elevation-z8">\n  <!-- ParentId Column -->\n  <!--\n  <ng-container matColumnDef="parentId">\n    <th mat-header-cell *matHeaderCellDef mat-sort-header>\u0411\u0430\u0442\u044C\u043A\u0456\u0432\u0441\u044C\u043A\u0438\u0439</th>\n    <td mat-cell *matCellDef="let item">{{ item.parentId }}</td>\n  </ng-container>\n-->\n  <!-- Level1 Column -->\n  <ng-container matColumnDef="level1">\n    <th mat-header-cell *matHeaderCellDef mat-sort-header>\u041E\u0431\u043B\u0430\u0441\u0442\u044C</th>\n    <td mat-cell *matCellDef="let item">{{ item.level1 }}</td>\n  </ng-container>\n  <!-- Level2 Column -->\n  <ng-container matColumnDef="level2">\n    <th mat-header-cell *matHeaderCellDef mat-sort-header>\u0420\u0430\u0439\u043E\u043D</th>\n    <td mat-cell *matCellDef="let item">{{ item.level2 }}</td>\n  </ng-container>\n  <!-- Level3 Column -->\n  <ng-container matColumnDef="level3">\n    <th mat-header-cell *matHeaderCellDef mat-sort-header>\u0413\u0440\u043E\u043C\u0430\u0434\u0430</th>\n    <td mat-cell *matCellDef="let item">{{ item.level3 }}</td>\n  </ng-container>\n  <!-- Level4 Column -->\n  <ng-container matColumnDef="level4">\n    <th mat-header-cell *matHeaderCellDef mat-sort-header>\u041C\u0456\u0441\u0442\u043E/\u0421\u0435\u043B\u043E</th>\n    <td mat-cell *matCellDef="let item">{{ item.level4 }}</td>\n  </ng-container>\n\n  <!-- Level4 Column -->\n  <ng-container matColumnDef="levelExt">\n    <th mat-header-cell *matHeaderCellDef mat-sort-header>\u0420\u0430\u0439\u043E\u043D \u043C\u0456\u0441\u0442\u0430</th>\n    <td mat-cell *matCellDef="let item">{{ item.levelExt }}</td>\n  </ng-container>\n\n  <!-- Category Column -->\n  <ng-container matColumnDef="category">\n    <th mat-header-cell *matHeaderCellDef mat-sort-header>\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0456\u044F</th>\n    <td mat-cell *matCellDef="let item">{{ item.category }}</td>\n  </ng-container>\n  <!-- Value Column -->\n  <ng-container matColumnDef="value">\n    <th mat-header-cell *matHeaderCellDef mat-sort-header>\u041D\u0430\u0437\u0432\u0430</th>\n    <td mat-cell *matCellDef="let item">{{ item.value }}</td>\n  </ng-container>\n\n  <tr mat-header-row *matHeaderRowDef="displayedColumns; sticky: true"></tr>\n  <tr\n    mat-row\n    *matRowDef="let row; columns: displayedColumns"\n    (click)="selectionMode() && selectItem(row)"\n    [class.selectable-row]="selectionMode()"\n  ></tr>\n</table>\n\n<mat-paginator\n  #paginator\n  class="paginator"\n  [length]="totalCount()"\n  [pageSize]="pageSize()"\n  [pageSizeOptions]="[10, 25, 50, 100, 200]"\n  [pageIndex]="pageIndex()"\n  (page)="onPageChange($event)"\n  showFirstLastButtons\n>\n</mat-paginator>\n', styles: ["/* src/dictionaries/dict-page.styles.scss */\n:host {\n  display: block;\n  height: 100%;\n}\ntable {\n  width: 100%;\n}\n.mat-mdc-row {\n  cursor: pointer;\n  transition: background-color 0.2s;\n}\n.mat-mdc-row:hover {\n  background-color: #f5f5f5;\n}\n.mat-mdc-row.selected {\n  background-color: #e3f2fd !important;\n}\n.mat-mdc-row.selected:hover {\n  background-color: #bbdefb !important;\n}\n.dict-page-container {\n  height: calc(100vh - 64px);\n  overflow-y: auto;\n  padding: 16px;\n  padding-bottom: 32px;\n}\n.dict-page-container h2 {\n  margin-bottom: 16px;\n}\n.dict-page-container .action-buttons {\n  margin-bottom: 16px;\n}\n.dict-page-container .action-buttons button + button {\n  margin-left: 8px;\n}\n.dict-page-container table {\n  width: 100%;\n  margin-top: 1em;\n  margin-bottom: 16px;\n}\n.dict-page-container table .editable-cell .view-mode {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.dict-page-container table .editable-cell .view-mode .value-text {\n  flex: 1;\n}\n.dict-page-container table .editable-cell .view-mode .edit-btn {\n  opacity: 0;\n  transition: opacity 0.2s;\n  width: 32px;\n  height: 32px;\n}\n.dict-page-container table .editable-cell .view-mode .edit-btn mat-icon {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.dict-page-container table .editable-cell:hover .view-mode .edit-btn {\n  opacity: 1;\n}\n.dict-page-container table .editable-cell .edit-mode {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.dict-page-container table .editable-cell .edit-mode .inline-input {\n  flex: 1;\n  padding: 4px 8px;\n  border: 1px solid #2196f3;\n  border-radius: 4px;\n  font-size: 14px;\n  background-color: #f5f5f5;\n}\n.dict-page-container table .editable-cell .edit-mode .inline-input:focus {\n  outline: none;\n  border-color: #1976d2;\n}\n.dict-page-container table .editable-cell .edit-mode .save-btn,\n.dict-page-container table .editable-cell .edit-mode .cancel-btn {\n  width: 32px;\n  height: 32px;\n  flex-shrink: 0;\n}\n.dict-page-container table .editable-cell .edit-mode .save-btn mat-icon,\n.dict-page-container table .editable-cell .edit-mode .cancel-btn mat-icon {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.dict-page-container table .editable-cell .edit-mode .save-btn {\n  color: #4caf50;\n}\n.dict-page-container table .editable-cell .edit-mode .cancel-btn {\n  color: #f44336;\n}\n.dict-page-container table .clickable-row {\n  cursor: pointer;\n  transition: background-color 0.2s;\n}\n.dict-page-container table .clickable-row:hover {\n  background-color: #f5f5f5;\n}\n.dict-page-container table .clickable-row.selected {\n  background-color: #e3f2fd;\n}\n.dict-page-container table .clickable-row.selected:hover {\n  background-color: #bbdefb;\n}\n/*# sourceMappingURL=dict-page.styles.css.map */\n", "/* angular:styles/component:css;975c3cb0a33ab14b31883380852c4699c0b060135e8f0beb9b8340d55f052909;/home/havrok/projects/work/411/s5/s5app/Menu/S5Server/Front/src/dictionaries/CityCode/dictCityCode.component.ts */\n:host {\n  display: block;\n  height: 100%;\n}\ntable {\n  width: 100%;\n}\n.paginator {\n  min-height: 128px;\n}\n.selectable-row {\n  cursor: pointer;\n}\n.selectable-row:hover {\n  background-color: rgba(0, 0, 0, 0.04);\n}\n/*# sourceMappingURL=dictCityCode.component.css.map */\n"] }]
  }], () => [], { selectionMode: [{ type: Input, args: [{ isSignal: true, alias: "selectionMode", required: false }] }], itemSelected: [{ type: Output, args: ["itemSelected"] }], sort: [{
    type: ViewChild,
    args: [MatSort]
  }], paginator: [{
    type: ViewChild,
    args: [MatPaginator]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DictCityCodeComponent, { className: "DictCityCodeComponent", filePath: "dictionaries/CityCode/dictCityCode.component.ts", lineNumber: 64 });
})();

// src/ServerService/cityCodeTree.service.ts
var CityCodeTreeService = class _CityCodeTreeService {
  http = inject(HttpClient);
  api = "/api/dict-city-code-tree";
  /**
   * Отримати повне дерево кодифікатора або піддерево з вказаного вузла
   * @param parentId ID батьківського вузла (null = з кореня)
   * @param maxDepth Максимальна глибина дерева (0 = без обмежень)
   */
  getTree(parentId, maxDepth) {
    let params = new HttpParams();
    if (parentId) {
      params = params.set("parentId", parentId);
    }
    if (maxDepth && maxDepth > 0) {
      params = params.set("maxDepth", maxDepth.toString());
    }
    return this.http.get(this.api, { params });
  }
  /**
   * Отримати піддерево для конкретного вузла
   * @param id ID вузла
   * @param maxDepth Максимальна глибина (0 = без обмежень)
   */
  getSubtree(id, maxDepth) {
    let params = new HttpParams();
    if (maxDepth && maxDepth > 0) {
      params = params.set("maxDepth", maxDepth.toString());
    }
    return this.http.get(`${this.api}/${id}`, { params });
  }
  /**
   * Отримати шлях (breadcrumb) до вузла від кореня
   * @param id ID вузла
   */
  getPath(id) {
    return this.http.get(`${this.api}/${id}/path`);
  }
  /**
   * Пошук у дереві за текстом
   * @param search Текст для пошуку
   * @param categoryId Фільтр за категорією (опціонально)
   */
  search(search, categoryId) {
    let params = new HttpParams().set("search", search);
    if (categoryId) {
      params = params.set("categoryId", categoryId);
    }
    return this.http.get(`${this.api}/search`, { params });
  }
  /**
   * Отримати плоский список всіх вузлів дерева
   * @param parentId ID батьківського вузла (null = з кореня)
   */
  getFlat(parentId) {
    let params = new HttpParams();
    if (parentId) {
      params = params.set("parentId", parentId);
    }
    return this.http.get(`${this.api}/flat`, { params });
  }
  /**
   * Отримати статистику дерева
   * @param parentId ID батьківського вузла (null = з кореня)
   */
  getStats(parentId) {
    let params = new HttpParams();
    if (parentId) {
      params = params.set("parentId", parentId);
    }
    return this.http.get(`${this.api}/stats`, { params });
  }
  /**
   * Знайти вузол за ID і повернути його з контекстом (батьки + діти)
   * @param id ID вузла
   * @param includeParents Включити батьківські вузли (шлях)
   * @param includeChildren Включити дочірні вузли
   * @param childrenDepth Глибина дочірніх вузлів (0 = всі)
   */
  getNodeContext(id, includeParents = true, includeChildren = true, childrenDepth = 1) {
    const params = new HttpParams().set("includeParents", includeParents.toString()).set("includeChildren", includeChildren.toString()).set("childrenDepth", childrenDepth.toString());
    return this.http.get(`${this.api}/${id}/context`, { params });
  }
  static \u0275fac = function CityCodeTreeService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CityCodeTreeService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _CityCodeTreeService, factory: _CityCodeTreeService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CityCodeTreeService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/dictionaries/CityCode/city-code-tree-node.component.ts
var _c02 = (a0) => ({ $implicit: a0 });
function CityCodeTreeNodeComponent_Conditional_0_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 10);
  }
}
function CityCodeTreeNodeComponent_Conditional_0_Conditional_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.isExpanded() ? "expand_more" : "chevron_right", " ");
  }
}
function CityCodeTreeNodeComponent_Conditional_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 9);
    \u0275\u0275listener("click", function CityCodeTreeNodeComponent_Conditional_0_Conditional_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.onToggle());
    });
    \u0275\u0275conditionalCreate(1, CityCodeTreeNodeComponent_Conditional_0_Conditional_1_Conditional_1_Template, 1, 0, "mat-spinner", 10)(2, CityCodeTreeNodeComponent_Conditional_0_Conditional_1_Conditional_2_Template, 2, 1, "mat-icon", 11);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tmpNode_r4 = \u0275\u0275nextContext();
    \u0275\u0275attribute("aria-label", "\u0420\u043E\u0437\u0433\u043E\u0440\u043D\u0443\u0442\u0438/\u0437\u0433\u043E\u0440\u043D\u0443\u0442\u0438 " + tmpNode_r4.value);
    \u0275\u0275advance();
    \u0275\u0275conditional(tmpNode_r4.isLoading ? 1 : 2);
  }
}
function CityCodeTreeNodeComponent_Conditional_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 3);
  }
}
function CityCodeTreeNodeComponent_Conditional_0_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tmpNode_r4 = \u0275\u0275nextContext();
    \u0275\u0275property("title", tmpNode_r4.category);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(tmpNode_r4.category);
  }
}
function CityCodeTreeNodeComponent_Conditional_0_Conditional_8_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function CityCodeTreeNodeComponent_Conditional_0_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275template(1, CityCodeTreeNodeComponent_Conditional_0_Conditional_8_ng_container_1_Template, 1, 0, "ng-container", 12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tmpNode_r4 = \u0275\u0275nextContext();
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r2.nodeActionsTemplate())("ngTemplateOutletContext", \u0275\u0275pureFunction1(2, _c02, tmpNode_r4));
  }
}
function CityCodeTreeNodeComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275conditionalCreate(1, CityCodeTreeNodeComponent_Conditional_0_Conditional_1_Template, 3, 2, "button", 2)(2, CityCodeTreeNodeComponent_Conditional_0_Conditional_2_Template, 1, 0, "div", 3);
    \u0275\u0275elementStart(3, "div", 4)(4, "button", 5);
    \u0275\u0275listener("click", function CityCodeTreeNodeComponent_Conditional_0_Template_button_click_4_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      ctx_r2.onSelect();
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(5, "span", 6);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, CityCodeTreeNodeComponent_Conditional_0_Conditional_7_Template, 2, 2, "span", 7);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(8, CityCodeTreeNodeComponent_Conditional_0_Conditional_8_Template, 2, 4, "div", 8);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tmpNode_r4 = ctx;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("padding-left", tmpNode_r4.level * 20, "px");
    \u0275\u0275classProp("leaf-node", !tmpNode_r4.hasChildren);
    \u0275\u0275advance();
    \u0275\u0275conditional(tmpNode_r4.hasChildren ? 1 : 2);
    \u0275\u0275advance(3);
    \u0275\u0275attribute("aria-label", "\u0412\u0438\u0431\u0440\u0430\u0442\u0438 " + tmpNode_r4.value);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(tmpNode_r4.value);
    \u0275\u0275advance();
    \u0275\u0275conditional(tmpNode_r4.category ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.nodeActionsTemplate() ? 8 : -1);
  }
}
var CityCodeTreeNodeComponent = class _CityCodeTreeNodeComponent {
  // Входні дані
  node = input.required(...ngDevMode ? [{ debugName: "node" }] : []);
  isExpanded = input(false, ...ngDevMode ? [{ debugName: "isExpanded" }] : []);
  // Content Projection: шаблон для дій вузла (необов'язковий)
  nodeActionsTemplate = input(void 0, ...ngDevMode ? [{ debugName: "nodeActionsTemplate" }] : []);
  // Події
  toggleNode = output();
  selectNode = output();
  onToggle() {
    this.toggleNode.emit(this.node());
  }
  onSelect() {
    this.selectNode.emit(this.node());
  }
  static \u0275fac = function CityCodeTreeNodeComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CityCodeTreeNodeComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CityCodeTreeNodeComponent, selectors: [["dict-city-code-tree-node"]], inputs: { node: [1, "node"], isExpanded: [1, "isExpanded"], nodeActionsTemplate: [1, "nodeActionsTemplate"] }, outputs: { toggleNode: "toggleNode", selectNode: "selectNode" }, decls: 1, vars: 1, consts: [[1, "node-content", 3, "leaf-node", "padding-left"], [1, "node-content"], ["mat-icon-button", "", 1, "toggle-button"], [1, "leaf-spacer"], [1, "city-info"], ["type", "button", 1, "city-main", 3, "click"], [1, "city-name"], [1, "city-category", 3, "title"], [1, "node-actions"], ["mat-icon-button", "", 1, "toggle-button", 3, "click"], ["diameter", "20"], [1, "mat-icon-rtl-mirror"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"]], template: function CityCodeTreeNodeComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, CityCodeTreeNodeComponent_Conditional_0_Template, 9, 9, "div", 0);
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275conditional((tmp_0_0 = ctx.node()) ? 0 : -1, tmp_0_0);
    }
  }, dependencies: [CommonModule, NgTemplateOutlet, MatButtonModule, MatIconButton, MatIconModule, MatIcon, MatProgressSpinnerModule, MatProgressSpinner, MatTooltipModule], styles: ['@charset "UTF-8";\n\n\n\n.node-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  padding: 8px 4px;\n  border-radius: 4px;\n  transition: background-color 0.2s ease;\n}\n.node-content[_ngcontent-%COMP%]:hover {\n  background-color: rgba(0, 0, 0, 0.04);\n}\n.toggle-button[_ngcontent-%COMP%] {\n  margin-right: 8px;\n  flex-shrink: 0;\n}\n.leaf-spacer[_ngcontent-%COMP%] {\n  width: 48px;\n  flex-shrink: 0;\n}\n.city-info[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  min-width: 0;\n}\n.city-main[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-wrap: wrap;\n  background: none;\n  border: none;\n  padding: 4px 8px;\n  cursor: pointer;\n  border-radius: 4px;\n  transition: background-color 0.2s ease;\n  text-align: left;\n  width: 100%;\n}\n.city-main[_ngcontent-%COMP%]:hover {\n  background-color: rgba(0, 0, 0, 0.04);\n}\n.city-name[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #333;\n  flex: 1;\n}\n.city-details[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 12px;\n  color: #666;\n  padding-left: 8px;\n}\n.city-category[_ngcontent-%COMP%] {\n  padding: 2px 6px;\n  background-color: #e3f2fd;\n  color: #1976d2;\n  border-radius: 3px;\n  font-weight: 500;\n}\n.city-id[_ngcontent-%COMP%] {\n  color: #999;\n  font-family: "Courier New", monospace;\n}\n.node-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n  margin-left: 8px;\n  flex-shrink: 0;\n}\n.leaf-node[_ngcontent-%COMP%]   .city-name[_ngcontent-%COMP%] {\n  color: #555;\n}\n/*# sourceMappingURL=city-code-tree-node.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CityCodeTreeNodeComponent, [{
    type: Component,
    args: [{ selector: "dict-city-code-tree-node", standalone: true, imports: [
      CommonModule,
      MatButtonModule,
      MatIconModule,
      MatProgressSpinnerModule,
      MatTooltipModule
    ], template: `@if (node(); as tmpNode) {
<div
  class="node-content"
  [class.leaf-node]="!tmpNode.hasChildren"
  [style.padding-left.px]="tmpNode.level * 20"
>
  @if (tmpNode.hasChildren) {
  <button
    mat-icon-button
    [attr.aria-label]="'\u0420\u043E\u0437\u0433\u043E\u0440\u043D\u0443\u0442\u0438/\u0437\u0433\u043E\u0440\u043D\u0443\u0442\u0438 ' + tmpNode.value"
    class="toggle-button"
    (click)="onToggle()"
  >
    @if (tmpNode.isLoading) {
    <mat-spinner diameter="20"></mat-spinner>
    } @else {
    <mat-icon class="mat-icon-rtl-mirror">
      {{ isExpanded() ? 'expand_more' : 'chevron_right' }}
    </mat-icon>
    }
  </button>
  } @else {
  <div class="leaf-spacer"></div>
  }

  <div class="city-info">
    <button
      class="city-main"
      type="button"
      (click)="onSelect(); $event.stopPropagation()"
      [attr.aria-label]="'\u0412\u0438\u0431\u0440\u0430\u0442\u0438 ' + tmpNode.value"
    >
      <span class="city-name">{{ tmpNode.value }}</span>
        @if (tmpNode.category) {
        <span class="city-category" [title]="tmpNode.category">{{ tmpNode.category }}</span>
        }
    </button>
        <!-- 
    <div class="city-details">
        @if (tmpNode.category) {
        <span class="city-category" [title]="tmpNode.category">{{ tmpNode.category }}</span>
        }
        <span class="city-id" [title]="'ID: ' + tmpNode.id">{{ tmpNode.id }}</span>
    </div>
        -->
  </div>

  @if (nodeActionsTemplate()) {
  <div class="node-actions">
    <ng-container
      *ngTemplateOutlet="nodeActionsTemplate(); context: { $implicit: tmpNode }"
    ></ng-container>
  </div>
  }
</div>
}
`, styles: ['@charset "UTF-8";\n\n/* src/dictionaries/CityCode/city-code-tree-node.component.scss */\n.node-content {\n  display: flex;\n  align-items: center;\n  padding: 8px 4px;\n  border-radius: 4px;\n  transition: background-color 0.2s ease;\n}\n.node-content:hover {\n  background-color: rgba(0, 0, 0, 0.04);\n}\n.toggle-button {\n  margin-right: 8px;\n  flex-shrink: 0;\n}\n.leaf-spacer {\n  width: 48px;\n  flex-shrink: 0;\n}\n.city-info {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  min-width: 0;\n}\n.city-main {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-wrap: wrap;\n  background: none;\n  border: none;\n  padding: 4px 8px;\n  cursor: pointer;\n  border-radius: 4px;\n  transition: background-color 0.2s ease;\n  text-align: left;\n  width: 100%;\n}\n.city-main:hover {\n  background-color: rgba(0, 0, 0, 0.04);\n}\n.city-name {\n  font-weight: 500;\n  color: #333;\n  flex: 1;\n}\n.city-details {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 12px;\n  color: #666;\n  padding-left: 8px;\n}\n.city-category {\n  padding: 2px 6px;\n  background-color: #e3f2fd;\n  color: #1976d2;\n  border-radius: 3px;\n  font-weight: 500;\n}\n.city-id {\n  color: #999;\n  font-family: "Courier New", monospace;\n}\n.node-actions {\n  display: flex;\n  gap: 4px;\n  margin-left: 8px;\n  flex-shrink: 0;\n}\n.leaf-node .city-name {\n  color: #555;\n}\n/*# sourceMappingURL=city-code-tree-node.component.css.map */\n'] }]
  }], null, { node: [{ type: Input, args: [{ isSignal: true, alias: "node", required: true }] }], isExpanded: [{ type: Input, args: [{ isSignal: true, alias: "isExpanded", required: false }] }], nodeActionsTemplate: [{ type: Input, args: [{ isSignal: true, alias: "nodeActionsTemplate", required: false }] }], toggleNode: [{ type: Output, args: ["toggleNode"] }], selectNode: [{ type: Output, args: ["selectNode"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CityCodeTreeNodeComponent, { className: "CityCodeTreeNodeComponent", filePath: "dictionaries/CityCode/city-code-tree-node.component.ts", lineNumber: 29 });
})();

// src/dictionaries/CityCode/CityCodeTree.component.ts
function CityCodeTreeComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "mat-spinner", 2);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u0434\u0435\u0440\u0435\u0432\u0430 \u043A\u043E\u0434\u0438\u0444\u0456\u043A\u0430\u0442\u043E\u0440\u0430...");
    \u0275\u0275elementEnd()();
  }
}
function CityCodeTreeComponent_Conditional_1_mat_tree_node_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-tree-node", 4)(1, "dict-city-code-tree-node", 5);
    \u0275\u0275listener("toggleNode", function CityCodeTreeComponent_Conditional_1_mat_tree_node_1_Template_dict_city_code_tree_node_toggleNode_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleNode($event));
    })("selectNode", function CityCodeTreeComponent_Conditional_1_mat_tree_node_1_Template_dict_city_code_tree_node_selectNode_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.selectNode($event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const node_r3 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("node", node_r3)("isExpanded", ctx_r1.expansionModel.isSelected(node_r3.id))("nodeActionsTemplate", ctx_r1.nodeActionsTemplate());
  }
}
function CityCodeTreeComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-tree", 1);
    \u0275\u0275template(1, CityCodeTreeComponent_Conditional_1_mat_tree_node_1_Template, 2, 3, "mat-tree-node", 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("dataSource", ctx_r1.dataSource)("childrenAccessor", ctx_r1.childrenAccessor)("expansionKey", ctx_r1.expansionKey);
  }
}
var CityCodeTreeComponent = class _CityCodeTreeComponent {
  cityCodeTreeService = inject(CityCodeTreeService);
  snackBar = inject(MatSnackBar);
  // Input: кастомний шаблон для дій вузла
  nodeActionsTemplate = input(void 0, ...ngDevMode ? [{ debugName: "nodeActionsTemplate" }] : []);
  // Inputs для налаштування
  maxDepth = input(0, ...ngDevMode ? [{ debugName: "maxDepth" }] : []);
  // 0 = без обмежень
  // Output для вибору вузла
  nodeSelected = output();
  dataSource = new MatTreeNestedDataSource();
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  expansionModel = new SelectionModel(true);
  searchText = signal("", ...ngDevMode ? [{ debugName: "searchText" }] : []);
  childrenAccessor = (node) => node.children || [];
  expansionKey = (node) => node.id;
  ngOnInit() {
    this.loadRootData();
  }
  hasChild = (_, node) => node.hasChildren;
  loadRootData() {
    return __async(this, null, function* () {
      this.loading.set(true);
      try {
        const rootItems = yield firstValueFrom(this.cityCodeTreeService.getTree(void 0, this.maxDepth()));
        if (rootItems) {
          const treeNodes = this.mapToTreeNodes(rootItems, 0);
          this.dataSource.data = treeNodes;
        }
      } catch (error) {
        console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u043A\u043E\u0440\u0435\u043D\u0435\u0432\u0438\u0445 \u0434\u0430\u043D\u0438\u0445:", error);
        const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u043A\u043E\u0440\u0435\u043D\u0435\u0432\u0438\u0445 \u0434\u0430\u043D\u0438\u0445");
        this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
      } finally {
        this.loading.set(false);
      }
    });
  }
  mapToTreeNodes(items, level) {
    return items.map((item) => __spreadProps(__spreadValues({}, item), {
      level,
      children: item.children?.length > 0 ? this.mapToTreeNodes(item.children, level + 1) : [],
      isLoaded: item.children?.length > 0,
      isLoading: false
    }));
  }
  toggleNode(node) {
    return __async(this, null, function* () {
      if (this.expansionModel.isSelected(node.id)) {
        this.expansionModel.deselect(node.id);
      } else {
        this.expansionModel.select(node.id);
        if (node.hasChildren && !node.isLoaded && !node.isLoading) {
          yield this.loadChildren(node);
        }
      }
    });
  }
  loadChildren(parentNode) {
    return __async(this, null, function* () {
      if (parentNode.isLoading || parentNode.isLoaded) {
        return;
      }
      parentNode.isLoading = true;
      try {
        const subtree = yield firstValueFrom(this.cityCodeTreeService.getTree(parentNode.id, this.maxDepth()));
        if (subtree && subtree.length > 0) {
          const childNodes = this.mapToTreeNodes(subtree, parentNode.level + 1);
          parentNode.children = childNodes;
          parentNode.isLoaded = true;
          this.dataSource.data = [...this.dataSource.data];
        }
      } catch (error) {
        console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u0434\u043E\u0447\u0456\u0440\u043D\u0456\u0445 \u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0456\u0432:", error);
        const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u0434\u043E\u0447\u0456\u0440\u043D\u0456\u0445 \u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0456\u0432");
        this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
      } finally {
        parentNode.isLoading = false;
      }
    });
  }
  onSearch() {
    return __async(this, null, function* () {
      const searchValue = this.searchText().trim();
      if (!searchValue) {
        yield this.loadRootData();
        return;
      }
      this.loading.set(true);
      try {
        const results = yield firstValueFrom(this.cityCodeTreeService.search(searchValue));
        if (results) {
          const treeNodes = this.mapToTreeNodes(results, 0);
          this.dataSource.data = treeNodes;
          this.expandAll();
        }
      } catch (error) {
        console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043F\u043E\u0448\u0443\u043A\u0443:", error);
        const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043F\u043E\u0448\u0443\u043A\u0443");
        this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
      } finally {
        this.loading.set(false);
      }
    });
  }
  clearSearch() {
    this.searchText.set("");
    this.loadRootData();
  }
  refresh() {
    this.expansionModel.clear();
    this.searchText.set("");
    this.loadRootData();
  }
  expandAll() {
    this.forEachNode((node) => {
      if (node.hasChildren) {
        this.expansionModel.select(node.id);
      }
    });
  }
  collapseAll() {
    this.expansionModel.clear();
  }
  selectNode(node) {
    this.nodeSelected.emit({
      id: node.id,
      parentId: node.parentId,
      categoryId: node.categoryId,
      category: node.category,
      value: node.value,
      hasChildren: node.hasChildren,
      children: node.children
    });
  }
  // Допоміжні методи
  forEachNode(processor, nodes = this.dataSource.data) {
    nodes.forEach((node) => {
      processor(node);
      if (node.children && node.children.length > 0) {
        this.forEachNode(processor, node.children);
      }
    });
  }
  static \u0275fac = function CityCodeTreeComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CityCodeTreeComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CityCodeTreeComponent, selectors: [["dict-city-code-tree"]], inputs: { nodeActionsTemplate: [1, "nodeActionsTemplate"], maxDepth: [1, "maxDepth"] }, outputs: { nodeSelected: "nodeSelected" }, decls: 2, vars: 1, consts: [[1, "loading-container"], [1, "city-code-tree", 3, "dataSource", "childrenAccessor", "expansionKey"], ["diameter", "40"], ["matTreeNodeToggle", "", "class", "tree-node", 4, "matTreeNodeDef"], ["matTreeNodeToggle", "", 1, "tree-node"], [3, "toggleNode", "selectNode", "node", "isExpanded", "nodeActionsTemplate"]], template: function CityCodeTreeComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, CityCodeTreeComponent_Conditional_0_Template, 4, 0, "div", 0)(1, CityCodeTreeComponent_Conditional_1_Template, 2, 3, "mat-tree", 1);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.loading() ? 0 : 1);
    }
  }, dependencies: [
    MatTreeModule,
    MatTreeNodeDef,
    MatTreeNodeToggle,
    MatTree,
    MatTreeNode,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressSpinner,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CityCodeTreeNodeComponent
  ], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  height: 100%;\n}\nh2[_ngcontent-%COMP%] {\n  margin: 0 0 8px 0;\n  font-size: 18px;\n  font-weight: 500;\n}\n.action-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.loading-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 40px;\n  gap: 16px;\n  height: 100%;\n}\n.loading-container[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #666;\n  font-size: 14px;\n}\n.city-code-tree[_ngcontent-%COMP%] {\n  background: transparent;\n  width: 100%;\n}\n.city-code-tree[_ngcontent-%COMP%]   .mat-tree-node[_ngcontent-%COMP%] {\n  min-height: 48px;\n}\n/*# sourceMappingURL=CityCodeTree.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CityCodeTreeComponent, [{
    type: Component,
    args: [{ selector: "dict-city-code-tree", standalone: true, imports: [
      MatTreeModule,
      MatButtonModule,
      MatIconModule,
      MatProgressSpinnerModule,
      MatTooltipModule,
      MatFormFieldModule,
      MatInputModule,
      FormsModule,
      CityCodeTreeNodeComponent
      //VerticalLayoutComponent,
    ], template: '<!-- Embedded mode -->\n@if (loading()) {\n  <div class="loading-container">\n    <mat-spinner diameter="40"></mat-spinner>\n    <span>\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u0434\u0435\u0440\u0435\u0432\u0430 \u043A\u043E\u0434\u0438\u0444\u0456\u043A\u0430\u0442\u043E\u0440\u0430...</span>\n  </div>\n} @else {\n  <mat-tree\n    [dataSource]="dataSource"\n    [childrenAccessor]="childrenAccessor"\n    [expansionKey]="expansionKey"\n    class="city-code-tree"\n  >\n    <!-- \u0423\u043D\u0456\u0432\u0435\u0440\u0441\u0430\u043B\u044C\u043D\u0438\u0439 \u0432\u0443\u0437\u043E\u043B \u0434\u0435\u0440\u0435\u0432\u0430 -->\n    <mat-tree-node *matTreeNodeDef="let node" matTreeNodeToggle class="tree-node">\n      <dict-city-code-tree-node\n        [node]="node"\n        [isExpanded]="expansionModel.isSelected(node.id)"\n        [nodeActionsTemplate]="nodeActionsTemplate()"\n        (toggleNode)="toggleNode($event)"\n        (selectNode)="selectNode($event)"\n      >\n      </dict-city-code-tree-node>\n    </mat-tree-node>\n  </mat-tree>\n}\n', styles: ["/* src/dictionaries/CityCode/CityCodeTree.component.scss */\n:host {\n  display: block;\n  height: 100%;\n}\nh2 {\n  margin: 0 0 8px 0;\n  font-size: 18px;\n  font-weight: 500;\n}\n.action-buttons {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.loading-container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 40px;\n  gap: 16px;\n  height: 100%;\n}\n.loading-container span {\n  color: #666;\n  font-size: 14px;\n}\n.city-code-tree {\n  background: transparent;\n  width: 100%;\n}\n.city-code-tree .mat-tree-node {\n  min-height: 48px;\n}\n/*# sourceMappingURL=CityCodeTree.component.css.map */\n"] }]
  }], null, { nodeActionsTemplate: [{ type: Input, args: [{ isSignal: true, alias: "nodeActionsTemplate", required: false }] }], maxDepth: [{ type: Input, args: [{ isSignal: true, alias: "maxDepth", required: false }] }], nodeSelected: [{ type: Output, args: ["nodeSelected"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CityCodeTreeComponent, { className: "CityCodeTreeComponent", filePath: "dictionaries/CityCode/CityCodeTree.component.ts", lineNumber: 37 });
})();

export {
  CityCodesProgressStatus,
  DictCityCodeService,
  DictCityCodeComponent,
  CityCodeTreeComponent
};
//# sourceMappingURL=chunk-CFT7AIPJ.js.map
