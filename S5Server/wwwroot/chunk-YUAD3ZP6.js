import {
  MatTooltip,
  MatTooltipModule
} from "./chunk-TKT7GR2R.js";
import {
  BreakpointObserver,
  Breakpoints,
  CommonModule,
  Component,
  HostListener,
  Input,
  ViewChild,
  computed,
  effect,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵresolveWindow,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-CK6AJVHQ.js";

// src/app/shared/components/MasterDetailLayout.component.ts
var _c0 = ["containerRef"];
var _c1 = [[["", "leftPanel", ""]], [["", "rightPanel", ""]]];
var _c2 = ["[leftPanel]", "[rightPanel]"];
var MasterDetailLayoutComponent = class _MasterDetailLayoutComponent {
  breakpointObserver;
  /**
   * Уникальный ключ для сохранения состояния в localStorage
   */
  storageKey = "masterDetail";
  /**
   * Начальная ширина левой панели в процентах (по умолчанию 50%)
   */
  initialNavWidth = 50;
  /**
   * Минимальная ширина панелей в процентах (по умолчанию 20%)
   */
  minPanelWidth = 20;
  containerRef;
  // Signals
  navPanelWidth = signal(this.initialNavWidth, ...ngDevMode ? [{ debugName: "navPanelWidth" }] : []);
  contentPanelWidth = computed(() => {
    const isCollapsed = this.isNavPanelCollapsed();
    const navWidth = this.navPanelWidth();
    if (isCollapsed) {
      return 100;
    }
    return 100 - navWidth;
  }, ...ngDevMode ? [{ debugName: "contentPanelWidth" }] : []);
  isDragging = signal(false, ...ngDevMode ? [{ debugName: "isDragging" }] : []);
  isNavPanelCollapsed = signal(false, ...ngDevMode ? [{ debugName: "isNavPanelCollapsed" }] : []);
  // Private properties
  SPLITTER_WIDTH_PX = 6;
  maxPanelWidth = 100;
  lastNavPanelWidth = this.initialNavWidth;
  startX = 0;
  startNavWidth = 0;
  containerWidth = 0;
  // Event handlers
  onMouseMoveHandler = this.onMouseMove.bind(this);
  onMouseUpHandler = this.onMouseUp.bind(this);
  // Mobile detection
  isMobile = computed(() => this.breakpointObserver.isMatched([Breakpoints.Handset]), ...ngDevMode ? [{ debugName: "isMobile" }] : []);
  constructor(breakpointObserver) {
    this.breakpointObserver = breakpointObserver;
    effect(() => {
      if (this.isMobile() && !this.isNavPanelCollapsed()) {
        this.isNavPanelCollapsed.set(true);
      }
    });
  }
  ngAfterViewInit() {
    this.loadSavedState();
    this.updateContainerWidth();
  }
  ngOnDestroy() {
    if (this.isDragging()) {
      this.cleanupDragListeners();
      this.isDragging.set(false);
    }
  }
  updateContainerWidth() {
    if (this.containerRef) {
      this.containerWidth = this.containerRef.nativeElement.offsetWidth - this.SPLITTER_WIDTH_PX;
    }
  }
  startDrag(event) {
    if (event.target.closest(".toggle-btn")) {
      return;
    }
    if (this.isNavPanelCollapsed()) {
      return;
    }
    event.preventDefault();
    this.isDragging.set(true);
    this.updateContainerWidth();
    this.startX = event.clientX;
    this.startNavWidth = this.navPanelWidth();
    document.addEventListener("mousemove", this.onMouseMoveHandler);
    document.addEventListener("mouseup", this.onMouseUpHandler);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  }
  onMouseMove(event) {
    if (!this.isDragging() || this.containerWidth <= 0) {
      return;
    }
    const deltaX = event.clientX - this.startX;
    const deltaPercent = deltaX / this.containerWidth * 100;
    let newNavWidth = this.startNavWidth + deltaPercent;
    this.maxPanelWidth = 100 - this.minPanelWidth;
    newNavWidth = Math.max(this.minPanelWidth, Math.min(this.maxPanelWidth, newNavWidth));
    this.navPanelWidth.set(newNavWidth);
  }
  onMouseUp() {
    this.isDragging.set(false);
    this.saveNavPanelWidth(this.navPanelWidth());
    this.cleanupDragListeners();
  }
  cleanupDragListeners() {
    document.removeEventListener("mousemove", this.onMouseMoveHandler);
    document.removeEventListener("mouseup", this.onMouseUpHandler);
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  }
  toggleNavPanel() {
    if (this.isNavPanelCollapsed()) {
      this.navPanelWidth.set(this.lastNavPanelWidth);
      this.isNavPanelCollapsed.set(false);
      this.saveNavPanelState(false);
    } else {
      this.lastNavPanelWidth = this.navPanelWidth();
      this.saveNavPanelWidth(this.lastNavPanelWidth);
      this.navPanelWidth.set(0);
      this.isNavPanelCollapsed.set(true);
      this.saveNavPanelState(true);
    }
  }
  onWindowResize() {
    this.updateContainerWidth();
    const currentNavWidth = this.navPanelWidth();
    this.maxPanelWidth = 100 - this.minPanelWidth;
    const clampedNavWidth = Math.max(this.minPanelWidth, Math.min(this.maxPanelWidth, currentNavWidth));
    if (clampedNavWidth !== currentNavWidth) {
      this.navPanelWidth.set(clampedNavWidth);
    }
  }
  // LocalStorage methods
  loadSavedState() {
    const collapsed = this.getSavedNavPanelState();
    const width = this.getSavedNavPanelWidth();
    this.isNavPanelCollapsed.set(collapsed);
    if (!collapsed) {
      this.navPanelWidth.set(width);
    }
    this.lastNavPanelWidth = width;
  }
  getSavedNavPanelState() {
    const saved = localStorage.getItem(`${this.storageKey}_collapsed`);
    return saved !== null ? saved === "true" : false;
  }
  getSavedNavPanelWidth() {
    const saved = localStorage.getItem(`${this.storageKey}_width`);
    return saved !== null ? parseInt(saved, 10) : this.initialNavWidth;
  }
  saveNavPanelState(collapsed) {
    localStorage.setItem(`${this.storageKey}_collapsed`, collapsed.toString());
  }
  saveNavPanelWidth(width) {
    localStorage.setItem(`${this.storageKey}_width`, width.toString());
  }
  static \u0275fac = function MasterDetailLayoutComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MasterDetailLayoutComponent)(\u0275\u0275directiveInject(BreakpointObserver));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MasterDetailLayoutComponent, selectors: [["app-master-detail-layout"]], viewQuery: function MasterDetailLayoutComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.containerRef = _t.first);
    }
  }, hostBindings: function MasterDetailLayoutComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("resize", function MasterDetailLayoutComponent_resize_HostBindingHandler() {
        return ctx.onWindowResize();
      }, \u0275\u0275resolveWindow);
    }
  }, inputs: { storageKey: "storageKey", initialNavWidth: "initialNavWidth", minPanelWidth: "minPanelWidth" }, ngContentSelectors: _c2, decls: 12, vars: 13, consts: [["containerRef", ""], [1, "master-detail-container"], [1, "panel", "nav-panel"], [1, "splitter", 3, "mousedown"], [1, "splitter-handle"], [1, "splitter-controls"], [1, "toggle-btn", 3, "click", "matTooltip", "matTooltipPosition"], [1, "arrow"], [1, "panel", "content-panel"]], template: function MasterDetailLayoutComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275projectionDef(_c1);
      \u0275\u0275elementStart(0, "div", 1, 0)(2, "div", 2);
      \u0275\u0275projection(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 3);
      \u0275\u0275listener("mousedown", function MasterDetailLayoutComponent_Template_div_mousedown_4_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.startDrag($event));
      });
      \u0275\u0275element(5, "div", 4);
      \u0275\u0275elementStart(6, "div", 5)(7, "button", 6);
      \u0275\u0275listener("click", function MasterDetailLayoutComponent_Template_button_click_7_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.toggleNavPanel());
      });
      \u0275\u0275elementStart(8, "span", 7);
      \u0275\u0275text(9);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(10, "div", 8);
      \u0275\u0275projection(11, 1);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275styleProp("width", ctx.navPanelWidth(), "%");
      \u0275\u0275classProp("collapsed", ctx.isNavPanelCollapsed());
      \u0275\u0275advance(2);
      \u0275\u0275classProp("dragging", ctx.isDragging());
      \u0275\u0275advance(3);
      \u0275\u0275property("matTooltip", ctx.isNavPanelCollapsed() ? "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u0438" : "\u041F\u0440\u0438\u0445\u043E\u0432\u0430\u0442\u0438")("matTooltipPosition", "above");
      \u0275\u0275advance();
      \u0275\u0275classProp("collapsed", ctx.isNavPanelCollapsed());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.isNavPanelCollapsed() ? "\u25B6" : "\u25C0", " ");
      \u0275\u0275advance();
      \u0275\u0275styleProp("width", ctx.contentPanelWidth(), "%");
    }
  }, dependencies: [CommonModule, MatTooltipModule, MatTooltip], styles: ["\n\n.master-detail-container[_ngcontent-%COMP%] {\n  display: flex;\n  height: 100%;\n  width: 100%;\n  overflow: hidden;\n  position: relative;\n}\n.panel[_ngcontent-%COMP%] {\n  height: 100%;\n  overflow: hidden;\n  position: relative;\n  transition: width 0.3s ease;\n}\n.nav-panel[_ngcontent-%COMP%] {\n  background: #fafafa;\n  border-right: 1px solid #e0e0e0;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n}\n.nav-panel.collapsed[_ngcontent-%COMP%] {\n  width: 0 !important;\n  min-width: 0;\n  border-right: none;\n}\n.content-panel[_ngcontent-%COMP%] {\n  flex: 1;\n  background: white;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n}\n.splitter[_ngcontent-%COMP%] {\n  width: 6px;\n  background: #e0e0e0;\n  cursor: col-resize;\n  position: relative;\n  flex-shrink: 0;\n  z-index: 10;\n  transition: background-color 0.2s;\n}\n.splitter[_ngcontent-%COMP%]:hover {\n  background: #bdbdbd;\n}\n.splitter.dragging[_ngcontent-%COMP%] {\n  background: #2196f3;\n}\n.splitter-handle[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.splitter-controls[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  z-index: 11;\n}\n.toggle-btn[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 32px;\n  padding: 0;\n  background: white;\n  border: 1px solid #e0e0e0;\n  border-radius: 4px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  transition: all 0.2s;\n}\n.toggle-btn[_ngcontent-%COMP%]:hover {\n  background: #f5f5f5;\n  border-color: #bdbdbd;\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);\n}\n.toggle-btn[_ngcontent-%COMP%]:active {\n  transform: scale(0.95);\n}\n.arrow[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #666;\n  transition: transform 0.2s;\n}\n@media (max-width: 768px) {\n  .splitter[_ngcontent-%COMP%] {\n    width: 4px;\n  }\n  .toggle-btn[_ngcontent-%COMP%] {\n    width: 20px;\n    height: 28px;\n  }\n}\n/*# sourceMappingURL=MasterDetailLayout.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MasterDetailLayoutComponent, [{
    type: Component,
    args: [{ selector: "app-master-detail-layout", standalone: true, imports: [CommonModule, MatTooltipModule], template: `
    <div class="master-detail-container" #containerRef>
      <!-- Left Panel (Master) -->
      <div
        class="panel nav-panel"
        [style.width.%]="navPanelWidth()"
        [class.collapsed]="isNavPanelCollapsed()"
      >
        <ng-content select="[leftPanel]"></ng-content>
      </div>

      <!-- Resizable Splitter -->
      <div class="splitter" [class.dragging]="isDragging()" (mousedown)="startDrag($event)">
        <div class="splitter-handle"></div>
        <div class="splitter-controls">
          <button
            class="toggle-btn"
            (click)="toggleNavPanel()"
            [matTooltip]="isNavPanelCollapsed() ? '\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u0438' : '\u041F\u0440\u0438\u0445\u043E\u0432\u0430\u0442\u0438'"
            [matTooltipPosition]="'above'"
          >
            <span class="arrow" [class.collapsed]="isNavPanelCollapsed()">
              {{ isNavPanelCollapsed() ? '\u25B6' : '\u25C0' }}
            </span>
          </button>
        </div>
      </div>

      <!-- Right Panel (Detail) -->
      <div class="panel content-panel" [style.width.%]="contentPanelWidth()">
        <ng-content select="[rightPanel]"></ng-content>
      </div>
    </div>
  `, styles: ["/* angular:styles/component:css;95f8f3fcf4b1908f241a7a0f21c737f9ecc2fd41c27a9b9f73be63c2e29ef492;/home/havrok/projects/work/411/s5/s5app/Menu/S5Server/Front/src/app/shared/components/MasterDetailLayout.component.ts */\n.master-detail-container {\n  display: flex;\n  height: 100%;\n  width: 100%;\n  overflow: hidden;\n  position: relative;\n}\n.panel {\n  height: 100%;\n  overflow: hidden;\n  position: relative;\n  transition: width 0.3s ease;\n}\n.nav-panel {\n  background: #fafafa;\n  border-right: 1px solid #e0e0e0;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n}\n.nav-panel.collapsed {\n  width: 0 !important;\n  min-width: 0;\n  border-right: none;\n}\n.content-panel {\n  flex: 1;\n  background: white;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n}\n.splitter {\n  width: 6px;\n  background: #e0e0e0;\n  cursor: col-resize;\n  position: relative;\n  flex-shrink: 0;\n  z-index: 10;\n  transition: background-color 0.2s;\n}\n.splitter:hover {\n  background: #bdbdbd;\n}\n.splitter.dragging {\n  background: #2196f3;\n}\n.splitter-handle {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.splitter-controls {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  z-index: 11;\n}\n.toggle-btn {\n  width: 24px;\n  height: 32px;\n  padding: 0;\n  background: white;\n  border: 1px solid #e0e0e0;\n  border-radius: 4px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  transition: all 0.2s;\n}\n.toggle-btn:hover {\n  background: #f5f5f5;\n  border-color: #bdbdbd;\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);\n}\n.toggle-btn:active {\n  transform: scale(0.95);\n}\n.arrow {\n  font-size: 12px;\n  color: #666;\n  transition: transform 0.2s;\n}\n@media (max-width: 768px) {\n  .splitter {\n    width: 4px;\n  }\n  .toggle-btn {\n    width: 20px;\n    height: 28px;\n  }\n}\n/*# sourceMappingURL=MasterDetailLayout.component.css.map */\n"] }]
  }], () => [{ type: BreakpointObserver }], { storageKey: [{
    type: Input
  }], initialNavWidth: [{
    type: Input
  }], minPanelWidth: [{
    type: Input
  }], containerRef: [{
    type: ViewChild,
    args: ["containerRef"]
  }], onWindowResize: [{
    type: HostListener,
    args: ["window:resize"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MasterDetailLayoutComponent, { className: "MasterDetailLayoutComponent", filePath: "app/shared/components/MasterDetailLayout.component.ts", lineNumber: 179 });
})();

export {
  MasterDetailLayoutComponent
};
//# sourceMappingURL=chunk-YUAD3ZP6.js.map
