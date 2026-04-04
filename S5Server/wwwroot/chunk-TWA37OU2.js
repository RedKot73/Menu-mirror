import {
  CommonModule,
  Component,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵprojection,
  ɵɵprojectionDef
} from "./chunk-CK6AJVHQ.js";

// src/app/shared/components/VerticalLayout.component.ts
var _c0 = [[["", "actionPanel", ""]], [["", "contentPanel", ""]], [["", "bottomPanel", ""]]];
var _c1 = ["[actionPanel]", "[contentPanel]", "[bottomPanel]"];
var VerticalLayoutComponent = class _VerticalLayoutComponent {
  static \u0275fac = function VerticalLayoutComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _VerticalLayoutComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _VerticalLayoutComponent, selectors: [["app-vertical-layout"]], ngContentSelectors: _c1, decls: 7, vars: 0, consts: [[1, "vertical-layout-container"], [1, "panel", "action-panel"], [1, "panel", "content-panel"], [1, "panel", "bottom-panel"]], template: function VerticalLayoutComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef(_c0);
      \u0275\u0275domElementStart(0, "div", 0)(1, "div", 1);
      \u0275\u0275projection(2);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(3, "div", 2);
      \u0275\u0275projection(4, 1);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(5, "div", 3);
      \u0275\u0275projection(6, 2);
      \u0275\u0275domElementEnd()();
    }
  }, dependencies: [CommonModule], styles: ["\n\n[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n}\n.vertical-layout-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  height: 100%;\n}\n.action-panel[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  background: #fafafa;\n  border-bottom: 1px solid #e0e0e0;\n  padding: 8px;\n}\n.content-panel[_ngcontent-%COMP%] {\n  flex: 1 1 auto;\n  overflow: auto;\n  background: white;\n  padding: 8px;\n  min-height: 0;\n}\n.bottom-panel[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  background: #fafafa;\n  border-top: 1px solid #e0e0e0;\n}\n/*# sourceMappingURL=VerticalLayout.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(VerticalLayoutComponent, [{
    type: Component,
    args: [{ selector: "app-vertical-layout", standalone: true, imports: [CommonModule], template: `
    <div class="vertical-layout-container">
      <!-- Action Panel (Top) -->
      <div class="panel action-panel">
        <ng-content select="[actionPanel]"></ng-content>
      </div>

      <!-- Content Panel (Main) -->
      <div class="panel content-panel">
        <ng-content select="[contentPanel]"></ng-content>
      </div>

      <!-- Bottom Panel -->
      <div class="panel bottom-panel">
        <ng-content select="[bottomPanel]"></ng-content>
      </div>
    </div>
  `, styles: ["/* angular:styles/component:css;a10b5a9cf93269f8d74763694b9718f79a6e0605124b254e3876a3aa31f7df07;/home/havrok/projects/work/411/s5/s5app/Menu/S5Server/Front/src/app/shared/components/VerticalLayout.component.ts */\n:host {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n}\n.vertical-layout-container {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  height: 100%;\n}\n.action-panel {\n  flex: 0 0 auto;\n  background: #fafafa;\n  border-bottom: 1px solid #e0e0e0;\n  padding: 8px;\n}\n.content-panel {\n  flex: 1 1 auto;\n  overflow: auto;\n  background: white;\n  padding: 8px;\n  min-height: 0;\n}\n.bottom-panel {\n  flex: 0 0 auto;\n  background: #fafafa;\n  border-top: 1px solid #e0e0e0;\n}\n/*# sourceMappingURL=VerticalLayout.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(VerticalLayoutComponent, { className: "VerticalLayoutComponent", filePath: "app/shared/components/VerticalLayout.component.ts", lineNumber: 68 });
})();

export {
  VerticalLayoutComponent
};
//# sourceMappingURL=chunk-TWA37OU2.js.map
