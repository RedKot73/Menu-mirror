import {
  SoldierDialogComponent
} from "./chunk-2ED3NQE2.js";
import {
  UnitTableComponent
} from "./chunk-OMLV6Q2Y.js";
import {
  Crew_GUID,
  NULL_GUID,
  PPD_AREA_TYPE_GUID
} from "./chunk-3ZAQBUCH.js";
import {
  MatChipsModule
} from "./chunk-DW2ITXUJ.js";
import {
  MatDivider,
  MatDividerModule
} from "./chunk-U3E6ZCOL.js";
import {
  DictAreasService
} from "./chunk-3MFPYL36.js";
import {
  MatTree,
  MatTreeModule,
  MatTreeNestedDataSource,
  MatTreeNode,
  MatTreeNodeDef,
  MatTreeNodeToggle
} from "./chunk-4QNTRHKZ.js";
import {
  MatButtonToggle,
  MatButtonToggleGroup,
  MatButtonToggleModule
} from "./chunk-7GRXXPXN.js";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-HFCL4LX6.js";
import {
  InlineEditManager,
  resolveUnitOperation
} from "./chunk-VMWK5EAB.js";
import {
  UnitService
} from "./chunk-VT2WVTG5.js";
import {
  MatAccordion,
  MatExpansionModule,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "./chunk-Q5XZMGKH.js";
import {
  MatAutocomplete,
  MatAutocompleteModule,
  MatAutocompleteTrigger
} from "./chunk-A2TDGZNL.js";
import {
  SoldierService
} from "./chunk-TAPS6EZF.js";
import {
  SoldierUtils,
  UnitTag
} from "./chunk-KM64JSWM.js";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardTitle
} from "./chunk-ZWWMZKX6.js";
import {
  MatTooltip,
  MatTooltipModule
} from "./chunk-LFLZCNEV.js";
import {
  MatMenu,
  MatMenuItem,
  MatMenuModule,
  MatMenuTrigger
} from "./chunk-UIYIUELW.js";
import "./chunk-5OFTEHZD.js";
import {
  Router
} from "./chunk-3EEZP2Q7.js";
import {
  MatSelect,
  MatSelectModule
} from "./chunk-4P4RSBWD.js";
import {
  MatOption,
  MatOptionModule
} from "./chunk-2P3X7Y6Y.js";
import {
  MatSnackBar,
  S5App_ErrorHandler
} from "./chunk-BOCU6YDT.js";
import {
  DictForcesTypeService
} from "./chunk-PSKFUJ6R.js";
import "./chunk-F5BRNWTS.js";
import {
  DictUnitTypeService
} from "./chunk-SIRDTH4Q.js";
import {
  ConfirmDialogComponent
} from "./chunk-TXKUHQZM.js";
import {
  MatSort,
  MatSortHeader,
  MatSortModule
} from "./chunk-5DKE6E4J.js";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle
} from "./chunk-EMY5UD7C.js";
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
} from "./chunk-NPUDLI5V.js";
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
  NgControlStatus,
  NgModel,
  NumberValueAccessor,
  ReactiveFormsModule,
  RequiredValidator
} from "./chunk-IC3HW47I.js";
import "./chunk-GOHAIDCM.js";
import {
  AsyncPipe,
  BreakpointObserver,
  Breakpoints,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  CommonModule,
  Component,
  DatePipe,
  HostListener,
  Inject,
  Input,
  MatButton,
  MatButtonModule,
  MatIconButton,
  NgTemplateOutlet,
  Output,
  SlicePipe,
  ViewChild,
  __async,
  __spreadProps,
  __spreadValues,
  computed,
  debounceTime,
  distinctUntilChanged,
  effect,
  finalize,
  firstValueFrom,
  inject,
  input,
  of,
  output,
  setClassMetadata,
  signal,
  startWith,
  switchMap,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainer,
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
  ɵɵpureFunction1,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵresolveWindow,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-IKDNLDBK.js";

// src/app/Unit/unit-tree-node.component.ts
var _c0 = (a0) => ({ $implicit: a0 });
function UnitTreeNodeComponent_Conditional_0_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 13);
  }
}
function UnitTreeNodeComponent_Conditional_0_Conditional_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.isExpanded() ? "expand_more" : "chevron_right", " ");
  }
}
function UnitTreeNodeComponent_Conditional_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 12);
    \u0275\u0275listener("click", function UnitTreeNodeComponent_Conditional_0_Conditional_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.onToggle());
    });
    \u0275\u0275conditionalCreate(1, UnitTreeNodeComponent_Conditional_0_Conditional_1_Conditional_1_Template, 1, 0, "mat-spinner", 13)(2, UnitTreeNodeComponent_Conditional_0_Conditional_1_Conditional_2_Template, 2, 1, "mat-icon", 14);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tmpNode_r4 = \u0275\u0275nextContext();
    \u0275\u0275attribute("aria-label", "\u0420\u043E\u0437\u0433\u043E\u0440\u043D\u0443\u0442\u0438/\u0437\u0433\u043E\u0440\u043D\u0443\u0442\u0438 " + tmpNode_r4.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(tmpNode_r4.isLoading ? 1 : 2);
  }
}
function UnitTreeNodeComponent_Conditional_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 3);
  }
}
function UnitTreeNodeComponent_Conditional_0_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 8);
    \u0275\u0275text(1, "groups");
    \u0275\u0275elementEnd();
  }
}
function UnitTreeNodeComponent_Conditional_0_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tmpNode_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(tmpNode_r4.unitType);
  }
}
function UnitTreeNodeComponent_Conditional_0_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 10);
    \u0275\u0275text(1, "assignment_ind");
    \u0275\u0275elementEnd();
  }
}
function UnitTreeNodeComponent_Conditional_0_Conditional_11_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function UnitTreeNodeComponent_Conditional_0_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275template(1, UnitTreeNodeComponent_Conditional_0_Conditional_11_ng_container_1_Template, 1, 0, "ng-container", 15);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tmpNode_r4 = \u0275\u0275nextContext();
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r2.nodeActionsTemplate())("ngTemplateOutletContext", \u0275\u0275pureFunction1(2, _c0, tmpNode_r4));
  }
}
function UnitTreeNodeComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275conditionalCreate(1, UnitTreeNodeComponent_Conditional_0_Conditional_1_Template, 3, 2, "button", 2)(2, UnitTreeNodeComponent_Conditional_0_Conditional_2_Template, 1, 0, "div", 3);
    \u0275\u0275elementStart(3, "div", 4)(4, "button", 5);
    \u0275\u0275listener("click", function UnitTreeNodeComponent_Conditional_0_Template_button_click_4_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      ctx_r2.onSelect();
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(5, "span", 6);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 7);
    \u0275\u0275conditionalCreate(8, UnitTreeNodeComponent_Conditional_0_Conditional_8_Template, 2, 0, "mat-icon", 8);
    \u0275\u0275conditionalCreate(9, UnitTreeNodeComponent_Conditional_0_Conditional_9_Template, 2, 1, "span", 9);
    \u0275\u0275conditionalCreate(10, UnitTreeNodeComponent_Conditional_0_Conditional_10_Template, 2, 0, "mat-icon", 10);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(11, UnitTreeNodeComponent_Conditional_0_Conditional_11_Template, 2, 4, "div", 11);
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
    \u0275\u0275attribute("aria-label", "\u0412\u0438\u0431\u0440\u0430\u0442\u0438 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B " + tmpNode_r4.shortName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(tmpNode_r4.shortName);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(tmpNode_r4.isInvolved ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(tmpNode_r4.unitType ? 9 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(tmpNode_r4.assignedUnitId ? 10 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.nodeActionsTemplate() ? 11 : -1);
  }
}
var UnitTreeNodeComponent = class _UnitTreeNodeComponent {
  // Входные данные
  node = input.required(...ngDevMode ? [{ debugName: "node" }] : []);
  isExpanded = input(false, ...ngDevMode ? [{ debugName: "isExpanded" }] : []);
  // Content Projection: шаблон для действий узла (необязательный)
  nodeActionsTemplate = input(void 0, ...ngDevMode ? [{ debugName: "nodeActionsTemplate" }] : []);
  // События
  toggleNode = output();
  selectNode = output();
  addChild = output();
  editNode = output();
  deleteNode = output();
  onToggle() {
    this.toggleNode.emit(this.node());
  }
  onSelect() {
    this.selectNode.emit(this.node());
  }
  onAddChild(event) {
    event.stopPropagation();
    this.addChild.emit(this.node());
  }
  onEdit(event) {
    event.stopPropagation();
    this.editNode.emit(this.node());
  }
  onDelete(event) {
    event.stopPropagation();
    this.deleteNode.emit(this.node());
  }
  static \u0275fac = function UnitTreeNodeComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UnitTreeNodeComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UnitTreeNodeComponent, selectors: [["unit-tree-node"]], inputs: { node: [1, "node"], isExpanded: [1, "isExpanded"], nodeActionsTemplate: [1, "nodeActionsTemplate"] }, outputs: { toggleNode: "toggleNode", selectNode: "selectNode", addChild: "addChild", editNode: "editNode", deleteNode: "deleteNode" }, decls: 1, vars: 1, consts: [[1, "node-content", 3, "leaf-node", "padding-left"], [1, "node-content"], ["mat-icon-button", "", 1, "toggle-button"], [1, "leaf-spacer"], [1, "unit-info"], ["type", "button", 1, "unit-main", 3, "click"], [1, "unit-name"], [1, "unit-details"], ["matTooltip", "\u0415\u043A\u0456\u043F\u0430\u0436/\u0413\u0440\u0443\u043F\u0430", 1, "involved-icon"], [1, "unit-type"], ["matTooltip", "\u041F\u0440\u0438\u0434\u0430\u043D\u0438\u0439 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B", 1, "assigned-icon"], [1, "node-actions"], ["mat-icon-button", "", 1, "toggle-button", 3, "click"], ["diameter", "20"], [1, "mat-icon-rtl-mirror"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"]], template: function UnitTreeNodeComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, UnitTreeNodeComponent_Conditional_0_Template, 12, 11, "div", 0);
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275conditional((tmp_0_0 = ctx.node()) ? 0 : -1, tmp_0_0);
    }
  }, dependencies: [CommonModule, NgTemplateOutlet, MatButtonModule, MatIconButton, MatIconModule, MatIcon, MatProgressSpinnerModule, MatProgressSpinner, MatTooltipModule, MatTooltip], styles: ['@charset "UTF-8";\n\n\n\n.node-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  padding: 8px 4px;\n  border-radius: 4px;\n  transition: background-color 0.2s ease;\n}\n.node-content[_ngcontent-%COMP%]:hover {\n  background-color: rgba(0, 0, 0, 0.04);\n}\n.toggle-button[_ngcontent-%COMP%] {\n  margin-right: 8px;\n  flex-shrink: 0;\n}\n.leaf-node[_ngcontent-%COMP%] {\n  opacity: 0.85;\n}\n.leaf-spacer[_ngcontent-%COMP%] {\n  width: 48px;\n  flex-shrink: 0;\n}\n.unit-info[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  cursor: pointer;\n  padding: 4px 8px;\n  border-radius: 4px;\n  transition: background-color 0.2s ease;\n}\n.unit-info[_ngcontent-%COMP%]:hover {\n  background-color: rgba(0, 0, 0, 0.04);\n}\n.unit-main[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.unit-name[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #333;\n}\n.unit-details[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-wrap: wrap;\n  font-size: 12px;\n  color: #666;\n}\n.unit-details[_ngcontent-%COMP%]   .involved-icon[_ngcontent-%COMP%] {\n  color: #1976d2;\n  vertical-align: middle;\n}\n.unit-type[_ngcontent-%COMP%] {\n  background: #e3f2fd;\n  color: #1976d2;\n  padding: 2px 6px;\n  border-radius: 12px;\n  font-size: 11px;\n  font-weight: 500;\n}\n.assigned-icon[_ngcontent-%COMP%] {\n  color: #388e3c;\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n}\n.node-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  opacity: 0;\n  transition: opacity 0.2s ease;\n  flex-shrink: 0;\n}\n.node-content[_ngcontent-%COMP%]:hover   .node-actions[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n@media (max-width: 768px) {\n  .node-actions[_ngcontent-%COMP%] {\n    opacity: 1;\n  }\n}\n/*# sourceMappingURL=unit-tree-node.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UnitTreeNodeComponent, [{
    type: Component,
    args: [{ selector: "unit-tree-node", standalone: true, imports: [
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
    [attr.aria-label]="'\u0420\u043E\u0437\u0433\u043E\u0440\u043D\u0443\u0442\u0438/\u0437\u0433\u043E\u0440\u043D\u0443\u0442\u0438 ' + tmpNode.name"
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

  <div class="unit-info">
    <button
      class="unit-main"
      type="button"
      (click)="onSelect(); $event.stopPropagation()"
      [attr.aria-label]="'\u0412\u0438\u0431\u0440\u0430\u0442\u0438 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B ' + tmpNode.shortName"
    >
      <span class="unit-name">{{ tmpNode.shortName }}</span>
    </button>
    <div class="unit-details">
        @if (tmpNode.isInvolved) {
        <mat-icon class="involved-icon" matTooltip="\u0415\u043A\u0456\u043F\u0430\u0436/\u0413\u0440\u0443\u043F\u0430">groups</mat-icon>
        } @if (tmpNode.unitType) {
        <span class="unit-type">{{ tmpNode.unitType }}</span>
        } @if (tmpNode.assignedUnitId) {
        <mat-icon class="assigned-icon" matTooltip="\u041F\u0440\u0438\u0434\u0430\u043D\u0438\u0439 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B">assignment_ind</mat-icon>
        }
    </div>
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
`, styles: ['@charset "UTF-8";\n\n/* src/app/Unit/unit-tree-node.component.scss */\n.node-content {\n  display: flex;\n  align-items: center;\n  padding: 8px 4px;\n  border-radius: 4px;\n  transition: background-color 0.2s ease;\n}\n.node-content:hover {\n  background-color: rgba(0, 0, 0, 0.04);\n}\n.toggle-button {\n  margin-right: 8px;\n  flex-shrink: 0;\n}\n.leaf-node {\n  opacity: 0.85;\n}\n.leaf-spacer {\n  width: 48px;\n  flex-shrink: 0;\n}\n.unit-info {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  cursor: pointer;\n  padding: 4px 8px;\n  border-radius: 4px;\n  transition: background-color 0.2s ease;\n}\n.unit-info:hover {\n  background-color: rgba(0, 0, 0, 0.04);\n}\n.unit-main {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.unit-name {\n  font-weight: 500;\n  color: #333;\n}\n.unit-details {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-wrap: wrap;\n  font-size: 12px;\n  color: #666;\n}\n.unit-details .involved-icon {\n  color: #1976d2;\n  vertical-align: middle;\n}\n.unit-type {\n  background: #e3f2fd;\n  color: #1976d2;\n  padding: 2px 6px;\n  border-radius: 12px;\n  font-size: 11px;\n  font-weight: 500;\n}\n.assigned-icon {\n  color: #388e3c;\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n}\n.node-actions {\n  display: flex;\n  align-items: center;\n  opacity: 0;\n  transition: opacity 0.2s ease;\n  flex-shrink: 0;\n}\n.node-content:hover .node-actions {\n  opacity: 1;\n}\n@media (max-width: 768px) {\n  .node-actions {\n    opacity: 1;\n  }\n}\n/*# sourceMappingURL=unit-tree-node.component.css.map */\n'] }]
  }], null, { node: [{ type: Input, args: [{ isSignal: true, alias: "node", required: true }] }], isExpanded: [{ type: Input, args: [{ isSignal: true, alias: "isExpanded", required: false }] }], nodeActionsTemplate: [{ type: Input, args: [{ isSignal: true, alias: "nodeActionsTemplate", required: false }] }], toggleNode: [{ type: Output, args: ["toggleNode"] }], selectNode: [{ type: Output, args: ["selectNode"] }], addChild: [{ type: Output, args: ["addChild"] }], editNode: [{ type: Output, args: ["editNode"] }], deleteNode: [{ type: Output, args: ["deleteNode"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UnitTreeNodeComponent, { className: "UnitTreeNodeComponent", filePath: "app/Unit/unit-tree-node.component.ts", lineNumber: 30 });
})();

// src/app/Unit/UnitTree.component.ts
function UnitTreeComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "mat-spinner", 2);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u0434\u0435\u0440\u0435\u0432\u0430 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0456\u0432...");
    \u0275\u0275elementEnd()();
  }
}
function UnitTreeComponent_Conditional_1_mat_tree_node_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-tree-node", 5)(1, "unit-tree-node", 6);
    \u0275\u0275listener("toggleNode", function UnitTreeComponent_Conditional_1_mat_tree_node_2_Template_unit_tree_node_toggleNode_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleNode($event));
    })("selectNode", function UnitTreeComponent_Conditional_1_mat_tree_node_2_Template_unit_tree_node_selectNode_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.selectUnit($event));
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
function UnitTreeComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1)(1, "mat-tree", 3);
    \u0275\u0275template(2, UnitTreeComponent_Conditional_1_mat_tree_node_2_Template, 2, 3, "mat-tree-node", 4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("dataSource", ctx_r1.dataSource)("childrenAccessor", ctx_r1.childrenAccessor)("expansionKey", ctx_r1.expansionKey);
  }
}
var UnitTreeComponent = class _UnitTreeComponent {
  unitService = inject(UnitService);
  //private dialog = inject(MatDialog);
  snackBar = inject(MatSnackBar);
  //private router = inject(Router);
  // Input: кастомный шаблон для действий узла
  nodeActionsTemplate = input(void 0, ...ngDevMode ? [{ debugName: "nodeActionsTemplate" }] : []);
  // Output для выбора подразделения
  unitSelected = output();
  // Output для уведомления об обновлении подразделения
  unitUpdated = output();
  dataSource = new MatTreeNestedDataSource();
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  expansionModel = new SelectionModel(true);
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
        const rootItems = yield firstValueFrom(this.unitService.getTreeItems(void 0, NULL_GUID));
        if (rootItems) {
          const treeNodes = rootItems.map((item) => __spreadProps(__spreadValues({}, item), {
            children: item.hasChildren ? [] : void 0,
            isLoaded: false,
            isLoading: false,
            level: 0
          }));
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
        const children = yield firstValueFrom(this.unitService.getTreeItems(void 0, parentNode.id));
        if (children) {
          const childNodes = children.map((item) => __spreadProps(__spreadValues({}, item), {
            children: item.hasChildren ? [] : void 0,
            isLoaded: false,
            isLoading: false,
            level: parentNode.level + 1
          }));
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
  refresh() {
    this.expansionModel.clear();
    this.loadRootData();
  }
  // Вспомогательные методы для локального обновления дерева
  /**
   * Универсальный метод для поиска узла по ID и выполнения callback-функции
   * @param nodeId ID узла для поиска
   * @param processor Callback-функция для обработки найденного узла
   * @param nodes Массив узлов для поиска (по умолчанию корневые узлы)
   * @returns Результат выполнения processor или null если узел не найден
   */
  findAndProcessNodeById(nodeId, processor, nodes = this.dataSource.data) {
    for (const node of nodes) {
      if (node.id === nodeId) {
        return processor(node);
      }
      if (node.children && node.children.length > 0) {
        const result = this.findAndProcessNodeById(nodeId, processor, node.children);
        if (result !== null) {
          return result;
        }
      }
    }
    return null;
  }
  /**
   * Универсальный метод для поиска и удаления узла с callback-паттерном
   * @param nodeId ID узла для удаления
   * @param nodes Массив узлов для поиска
   * @returns true если узел найден и удален
   */
  removeNodeById(nodeId, nodes = this.dataSource.data) {
    return this.findAndProcessNodesById(nodeId, (parentArray, index) => {
      parentArray.splice(index, 1);
      return true;
    }, nodes) ?? false;
  }
  /**
   * Специализированный метод для операций с массивами узлов (удаление, перемещение и т.д.)
   * @param nodeId ID узла для поиска
   * @param processor Callback-функция получающая родительский массив и индекс узла
   * @param nodes Массив узлов для поиска
   * @returns Результат выполнения processor или null если узел не найден
   */
  findAndProcessNodesById(nodeId, processor, nodes = this.dataSource.data) {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].id === nodeId) {
        return processor(nodes, i);
      }
      if (nodes[i].children && nodes[i].children.length > 0) {
        const result = this.findAndProcessNodesById(nodeId, processor, nodes[i].children);
        if (result !== null) {
          return result;
        }
      }
    }
    return null;
  }
  updateNodeById(nodeId, updatedData) {
    return this.findAndProcessNodeById(nodeId, (node) => {
      Object.assign(node, updatedData);
      return true;
    }) ?? false;
  }
  forceTreeUpdate() {
    this.dataSource.data = [...this.dataSource.data];
  }
  selectUnit(node) {
    this.unitSelected.emit({
      id: node.id,
      name: node.name,
      shortName: node.shortName,
      militaryNumber: node.militaryNumber,
      forceType: node.forceType,
      unitType: node.unitType,
      forceTypeId: node.forceTypeId,
      unitTypeId: node.unitTypeId,
      parentId: node.parentId,
      assignedUnitId: node.assignedUnitId,
      orderVal: node.orderVal,
      comment: node.comment,
      isInvolved: node.isInvolved,
      hasChildren: node.hasChildren
    });
  }
  static \u0275fac = function UnitTreeComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UnitTreeComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UnitTreeComponent, selectors: [["unit-tree"]], inputs: { nodeActionsTemplate: [1, "nodeActionsTemplate"] }, outputs: { unitSelected: "unitSelected", unitUpdated: "unitUpdated" }, decls: 2, vars: 1, consts: [[1, "loading-container"], [1, "tree-container"], ["diameter", "40"], [1, "unit-tree", 3, "dataSource", "childrenAccessor", "expansionKey"], ["matTreeNodeToggle", "", "class", "tree-node", 4, "matTreeNodeDef"], ["matTreeNodeToggle", "", 1, "tree-node"], [3, "toggleNode", "selectNode", "node", "isExpanded", "nodeActionsTemplate"]], template: function UnitTreeComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, UnitTreeComponent_Conditional_0_Template, 4, 0, "div", 0)(1, UnitTreeComponent_Conditional_1_Template, 3, 3, "div", 1);
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
    UnitTreeNodeComponent
  ], styles: ["\n\n[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  overflow: hidden;\n}\n.tree-container[_ngcontent-%COMP%] {\n  flex: 1;\n  min-height: 0;\n  overflow: auto;\n  padding: 8px;\n}\n.tree-header[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 16px;\n  padding-bottom: 8px;\n  border-bottom: 1px solid #e0e0e0;\n}\n.tree-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #333;\n  font-weight: 500;\n}\n.loading-container[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 40px;\n  gap: 16px;\n}\n.loading-container[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #666;\n  font-size: 14px;\n}\n.unit-tree[_ngcontent-%COMP%] {\n  background: transparent;\n}\n.unit-tree[_ngcontent-%COMP%]   .mat-tree-node[_ngcontent-%COMP%] {\n  min-height: auto;\n}\n.tree-node[_ngcontent-%COMP%] {\n  margin: 2px 0;\n}\n@media (max-width: 768px) {\n  .tree-container[_ngcontent-%COMP%] {\n    padding: 8px;\n  }\n  .tree-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 8px;\n    align-items: stretch;\n  }\n  .tree-header[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=UnitTree.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UnitTreeComponent, [{
    type: Component,
    args: [{ selector: "unit-tree", standalone: true, imports: [
      MatTreeModule,
      MatButtonModule,
      MatIconModule,
      MatProgressSpinnerModule,
      MatTooltipModule,
      UnitTreeNodeComponent
    ], template: '@if (loading()) {\n<div class="loading-container">\n  <mat-spinner diameter="40"></mat-spinner>\n  <span>\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u0434\u0435\u0440\u0435\u0432\u0430 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0456\u0432...</span>\n</div>\n} @else {\n<div class="tree-container">\n  <mat-tree\n    [dataSource]="dataSource"\n    [childrenAccessor]="childrenAccessor"\n    [expansionKey]="expansionKey"\n    class="unit-tree"\n  >\n    <!-- \u0423\u043D\u0438\u0432\u0435\u0440\u0441\u0430\u043B\u044C\u043D\u044B\u0439 \u0443\u0437\u0435\u043B \u0434\u0435\u0440\u0435\u0432\u0430 -->\n    <mat-tree-node *matTreeNodeDef="let node" matTreeNodeToggle class="tree-node">\n      <unit-tree-node\n        [node]="node"\n        [isExpanded]="expansionModel.isSelected(node.id)"\n        [nodeActionsTemplate]="nodeActionsTemplate()"\n        (toggleNode)="toggleNode($event)"\n        (selectNode)="selectUnit($event)"\n      >\n      </unit-tree-node>\n    </mat-tree-node>\n  </mat-tree>\n</div>\n}\n', styles: ["/* src/app/Unit/UnitTree.component.scss */\n:host {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  overflow: hidden;\n}\n.tree-container {\n  flex: 1;\n  min-height: 0;\n  overflow: auto;\n  padding: 8px;\n}\n.tree-header {\n  flex-shrink: 0;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 16px;\n  padding-bottom: 8px;\n  border-bottom: 1px solid #e0e0e0;\n}\n.tree-header h3 {\n  margin: 0;\n  color: #333;\n  font-weight: 500;\n}\n.loading-container {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 40px;\n  gap: 16px;\n}\n.loading-container span {\n  color: #666;\n  font-size: 14px;\n}\n.unit-tree {\n  background: transparent;\n}\n.unit-tree .mat-tree-node {\n  min-height: auto;\n}\n.tree-node {\n  margin: 2px 0;\n}\n@media (max-width: 768px) {\n  .tree-container {\n    padding: 8px;\n  }\n  .tree-header {\n    flex-direction: column;\n    gap: 8px;\n    align-items: stretch;\n  }\n  .tree-header button {\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=UnitTree.component.css.map */\n"] }]
  }], null, { nodeActionsTemplate: [{ type: Input, args: [{ isSignal: true, alias: "nodeActionsTemplate", required: false }] }], unitSelected: [{ type: Output, args: ["unitSelected"] }], unitUpdated: [{ type: Output, args: ["unitUpdated"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UnitTreeComponent, { className: "UnitTreeComponent", filePath: "app/Unit/UnitTree.component.ts", lineNumber: 32 });
})();

// src/app/Soldier/Soldier.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function SoldiersComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 32);
    \u0275\u0275listener("click", function SoldiersComponent_Conditional_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.add());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "person_add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " \u0414\u043E\u0434\u0430\u0442\u0438 \u0431\u0456\u0439\u0446\u044F ");
    \u0275\u0275elementEnd();
  }
}
function SoldiersComponent_th_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 33);
    \u0275\u0275text(1, "\u0414\u0456\u0457");
    \u0275\u0275elementEnd();
  }
}
function SoldiersComponent_td_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 34)(1, "button", 35);
    \u0275\u0275listener("click", function SoldiersComponent_td_11_Template_button_click_1_listener($event) {
      \u0275\u0275restoreView(_r3);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "mat-icon");
    \u0275\u0275text(3, "more_vert");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "mat-menu", null, 0)(6, "button", 36);
    \u0275\u0275listener("click", function SoldiersComponent_td_11_Template_button_click_6_listener() {
      const soldier_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.edit(soldier_r4));
    });
    \u0275\u0275elementStart(7, "mat-icon", 37);
    \u0275\u0275text(8, "edit");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span");
    \u0275\u0275text(10, "\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(11, "mat-divider");
    \u0275\u0275elementStart(12, "button", 38);
    \u0275\u0275listener("click", function SoldiersComponent_td_11_Template_button_click_12_listener() {
      const soldier_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.delete(soldier_r4));
    });
    \u0275\u0275elementStart(13, "mat-icon");
    \u0275\u0275text(14, "delete");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span");
    \u0275\u0275text(16, "\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const soldierMenu_r5 = \u0275\u0275reference(5);
    \u0275\u0275advance();
    \u0275\u0275property("matMenuTriggerFor", soldierMenu_r5);
  }
}
function SoldiersComponent_th_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 39);
    \u0275\u0275text(1, "?");
    \u0275\u0275elementEnd();
  }
}
function SoldiersComponent_td_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 34);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const soldier_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.unitTagTitle(soldier_r6), " ");
  }
}
function SoldiersComponent_th_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 39);
    \u0275\u0275text(1, "\u041F\u0406\u0411");
    \u0275\u0275elementEnd();
  }
}
function SoldiersComponent_td_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 34)(1, "span", 40);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const soldier_r7 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatFIO(soldier_r7));
  }
}
function SoldiersComponent_th_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 39);
    \u0275\u0275text(1, "\u041F\u043E\u0437\u0438\u0432\u043D\u0438\u0439");
    \u0275\u0275elementEnd();
  }
}
function SoldiersComponent_td_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 34);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const soldier_r8 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(soldier_r8.nickName);
  }
}
function SoldiersComponent_th_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 39);
    \u0275\u0275text(1, "\u0417\u0432\u0430\u043D\u043D\u044F");
    \u0275\u0275elementEnd();
  }
}
function SoldiersComponent_td_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 34);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const soldier_r9 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(soldier_r9.rankShortValue);
  }
}
function SoldiersComponent_th_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 39);
    \u0275\u0275text(1, "\u041F\u043E\u0441\u0430\u0434\u0430");
    \u0275\u0275elementEnd();
  }
}
function SoldiersComponent_td_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 34);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const soldier_r10 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(soldier_r10.positionValue);
  }
}
function SoldiersComponent_th_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 39);
    \u0275\u0275text(1, "\u0421\u0442\u0430\u0442\u0443\u0441");
    \u0275\u0275elementEnd();
  }
}
function SoldiersComponent_td_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 34)(1, "span", 41);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const soldier_r11 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(soldier_r11.stateValue);
  }
}
function SoldiersComponent_th_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 39);
    \u0275\u0275text(1, "\u041F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B");
    \u0275\u0275elementEnd();
  }
}
function SoldiersComponent_td_32_Conditional_1_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 48);
    \u0275\u0275text(1, "\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F...");
    \u0275\u0275elementEnd();
  }
}
function SoldiersComponent_td_32_Conditional_1_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 49);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const unit_r14 = ctx.$implicit;
    \u0275\u0275property("value", unit_r14);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(unit_r14.value);
  }
}
function SoldiersComponent_td_32_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 43)(1, "mat-form-field", 45);
    \u0275\u0275element(2, "input", 46);
    \u0275\u0275elementStart(3, "mat-autocomplete", 47, 1);
    \u0275\u0275listener("optionSelected", function SoldiersComponent_td_32_Conditional_1_Template_mat_autocomplete_optionSelected_3_listener($event) {
      \u0275\u0275restoreView(_r12);
      const soldier_r13 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSelect(soldier_r13, ctx_r1.UnitTag.UnitId, $event));
    });
    \u0275\u0275conditionalCreate(5, SoldiersComponent_td_32_Conditional_1_Conditional_5_Template, 2, 0, "mat-option", 48);
    \u0275\u0275repeaterCreate(6, SoldiersComponent_td_32_Conditional_1_For_7_Template, 2, 2, "mat-option", 49, _forTrack0);
    \u0275\u0275pipe(8, "async");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "button", 50);
    \u0275\u0275listener("click", function SoldiersComponent_td_32_Conditional_1_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r12);
      const soldier_r13 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.inlineEdit.clear(soldier_r13.id));
    });
    \u0275\u0275elementStart(10, "mat-icon");
    \u0275\u0275text(11, "close");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const unitAuto_r15 = \u0275\u0275reference(4);
    const soldier_r13 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("formControl", ctx_r1.getControl(soldier_r13, ctx_r1.UnitTag.UnitId))("matAutocomplete", unitAuto_r15);
    \u0275\u0275advance();
    \u0275\u0275property("displayWith", ctx_r1.inlineEdit.displayLookupFn);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.inlineEdit.loading(soldier_r13.id) ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(\u0275\u0275pipeBind1(8, 4, ctx_r1.inlineEdit.options(soldier_r13.id)));
  }
}
function SoldiersComponent_td_32_Conditional_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 53);
    \u0275\u0275listener("click", function SoldiersComponent_td_32_Conditional_2_Conditional_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r16);
      const soldier_r13 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.startEditing(soldier_r13, ctx_r1.UnitTag.UnitId));
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "edit");
    \u0275\u0275elementEnd()();
  }
}
function SoldiersComponent_td_32_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44)(1, "span", 51);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, SoldiersComponent_td_32_Conditional_2_Conditional_3_Template, 3, 0, "button", 52);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const soldier_r13 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(soldier_r13.unitShortName);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.isReadOnly() ? 3 : -1);
  }
}
function SoldiersComponent_td_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 42);
    \u0275\u0275conditionalCreate(1, SoldiersComponent_td_32_Conditional_1_Template, 12, 6, "div", 43)(2, SoldiersComponent_td_32_Conditional_2_Template, 4, 2, "div", 44);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const soldier_r13 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isEditing(soldier_r13.id, ctx_r1.UnitTag.UnitId) ? 1 : 2);
  }
}
function SoldiersComponent_th_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 39);
    \u0275\u0275text(1, "\u041F\u0440\u0438\u0434\u0430\u043D\u0438\u0439 \u0434\u043E");
    \u0275\u0275elementEnd();
  }
}
function SoldiersComponent_td_35_Conditional_1_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 48);
    \u0275\u0275text(1, "\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F...");
    \u0275\u0275elementEnd();
  }
}
function SoldiersComponent_td_35_Conditional_1_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 49);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const unit_r19 = ctx.$implicit;
    \u0275\u0275property("value", unit_r19);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(unit_r19.value);
  }
}
function SoldiersComponent_td_35_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 43)(1, "mat-form-field", 45);
    \u0275\u0275element(2, "input", 55);
    \u0275\u0275elementStart(3, "mat-autocomplete", 47, 2);
    \u0275\u0275listener("optionSelected", function SoldiersComponent_td_35_Conditional_1_Template_mat_autocomplete_optionSelected_3_listener($event) {
      \u0275\u0275restoreView(_r17);
      const soldier_r18 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSelect(soldier_r18, ctx_r1.UnitTag.AssignedId, $event));
    });
    \u0275\u0275elementStart(5, "mat-option", 49);
    \u0275\u0275text(6, "\u041D\u0435 \u043F\u0440\u0438\u0434\u0430\u043D\u0438\u0439");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, SoldiersComponent_td_35_Conditional_1_Conditional_7_Template, 2, 0, "mat-option", 48);
    \u0275\u0275repeaterCreate(8, SoldiersComponent_td_35_Conditional_1_For_9_Template, 2, 2, "mat-option", 49, _forTrack0);
    \u0275\u0275pipe(10, "async");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "button", 50);
    \u0275\u0275listener("click", function SoldiersComponent_td_35_Conditional_1_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r17);
      const soldier_r18 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.inlineEdit.clear(soldier_r18.id));
    });
    \u0275\u0275elementStart(12, "mat-icon");
    \u0275\u0275text(13, "close");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const assignedAuto_r20 = \u0275\u0275reference(4);
    const soldier_r18 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("formControl", ctx_r1.getControl(soldier_r18, ctx_r1.UnitTag.AssignedId))("matAutocomplete", assignedAuto_r20);
    \u0275\u0275advance();
    \u0275\u0275property("displayWith", ctx_r1.inlineEdit.displayLookupFn);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", null);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.inlineEdit.loading(soldier_r18.id) ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(\u0275\u0275pipeBind1(10, 5, ctx_r1.inlineEdit.options(soldier_r18.id)));
  }
}
function SoldiersComponent_td_35_Conditional_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 53);
    \u0275\u0275listener("click", function SoldiersComponent_td_35_Conditional_2_Conditional_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r21);
      const soldier_r18 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.startEditing(soldier_r18, ctx_r1.UnitTag.AssignedId));
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "edit");
    \u0275\u0275elementEnd()();
  }
}
function SoldiersComponent_td_35_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44)(1, "span", 51);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, SoldiersComponent_td_35_Conditional_2_Conditional_3_Template, 3, 0, "button", 52);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const soldier_r18 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(soldier_r18.assignedUnitShortName || "-");
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.isReadOnly() ? 3 : -1);
  }
}
function SoldiersComponent_td_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 54);
    \u0275\u0275conditionalCreate(1, SoldiersComponent_td_35_Conditional_1_Template, 14, 7, "div", 43)(2, SoldiersComponent_td_35_Conditional_2_Template, 4, 2, "div", 44);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const soldier_r18 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isEditing(soldier_r18.id, ctx_r1.UnitTag.AssignedId) ? 1 : 2);
  }
}
function SoldiersComponent_th_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 39);
    \u0275\u0275text(1, "\u0415\u043A\u0456\u043F\u0430\u0436/\u0413\u0440\u0443\u043F\u0430");
    \u0275\u0275elementEnd();
  }
}
function SoldiersComponent_td_38_Conditional_1_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 48);
    \u0275\u0275text(1, "\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F...");
    \u0275\u0275elementEnd();
  }
}
function SoldiersComponent_td_38_Conditional_1_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 49);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const unit_r24 = ctx.$implicit;
    \u0275\u0275property("value", unit_r24);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(unit_r24.value);
  }
}
function SoldiersComponent_td_38_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 43)(1, "mat-form-field", 45);
    \u0275\u0275element(2, "input", 57);
    \u0275\u0275elementStart(3, "mat-autocomplete", 47, 3);
    \u0275\u0275listener("optionSelected", function SoldiersComponent_td_38_Conditional_1_Template_mat_autocomplete_optionSelected_3_listener($event) {
      \u0275\u0275restoreView(_r22);
      const soldier_r23 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSelect(soldier_r23, ctx_r1.UnitTag.InvolvedId, $event));
    });
    \u0275\u0275elementStart(5, "mat-option", 49);
    \u0275\u0275text(6, "\u041D\u0435 \u043F\u0440\u0438\u0437\u043D\u0430\u0447\u0435\u043D\u043E");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, SoldiersComponent_td_38_Conditional_1_Conditional_7_Template, 2, 0, "mat-option", 48);
    \u0275\u0275repeaterCreate(8, SoldiersComponent_td_38_Conditional_1_For_9_Template, 2, 2, "mat-option", 49, _forTrack0);
    \u0275\u0275pipe(10, "async");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "button", 50);
    \u0275\u0275listener("click", function SoldiersComponent_td_38_Conditional_1_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r22);
      const soldier_r23 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.inlineEdit.clear(soldier_r23.id));
    });
    \u0275\u0275elementStart(12, "mat-icon");
    \u0275\u0275text(13, "close");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const involvedAuto_r25 = \u0275\u0275reference(4);
    const soldier_r23 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("formControl", ctx_r1.getControl(soldier_r23, ctx_r1.UnitTag.InvolvedId))("matAutocomplete", involvedAuto_r25);
    \u0275\u0275advance();
    \u0275\u0275property("displayWith", ctx_r1.inlineEdit.displayLookupFn);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", null);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.inlineEdit.loading(soldier_r23.id) ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(\u0275\u0275pipeBind1(10, 5, ctx_r1.inlineEdit.options(soldier_r23.id)));
  }
}
function SoldiersComponent_td_38_Conditional_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 53);
    \u0275\u0275listener("click", function SoldiersComponent_td_38_Conditional_2_Conditional_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r26);
      const soldier_r23 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.startEditing(soldier_r23, ctx_r1.UnitTag.InvolvedId));
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "edit");
    \u0275\u0275elementEnd()();
  }
}
function SoldiersComponent_td_38_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44)(1, "span", 51);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, SoldiersComponent_td_38_Conditional_2_Conditional_3_Template, 3, 0, "button", 52);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const soldier_r23 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(soldier_r23.involvedUnitShortName || "-");
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.isReadOnly() ? 3 : -1);
  }
}
function SoldiersComponent_td_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 56);
    \u0275\u0275conditionalCreate(1, SoldiersComponent_td_38_Conditional_1_Template, 14, 7, "div", 43)(2, SoldiersComponent_td_38_Conditional_2_Template, 4, 2, "div", 44);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const soldier_r23 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isEditing(soldier_r23.id, ctx_r1.UnitTag.InvolvedId) ? 1 : 2);
  }
}
function SoldiersComponent_th_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 39);
    \u0275\u0275text(1, "\u041F\u0440\u0438\u0431\u0443\u0432");
    \u0275\u0275elementEnd();
  }
}
function SoldiersComponent_td_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 34);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const soldier_r27 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, soldier_r27.arrivedAt, "dd.MM.yyyy"));
  }
}
function SoldiersComponent_th_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 39);
    \u0275\u0275text(1, "\u0412\u0438\u0431\u0443\u0432");
    \u0275\u0275elementEnd();
  }
}
function SoldiersComponent_td_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 34);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const soldier_r28 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", soldier_r28.departedAt ? \u0275\u0275pipeBind2(2, 1, soldier_r28.departedAt, "dd.MM.yyyy") : "-", " ");
  }
}
function SoldiersComponent_th_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 39);
    \u0275\u0275text(1, "\u041A\u043E\u043C\u0435\u043D\u0442\u0430\u0440");
    \u0275\u0275elementEnd();
  }
}
function SoldiersComponent_td_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 58)(1, "span", 59);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "slice");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const soldier_r29 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("matTooltip", soldier_r29.comment && soldier_r29.comment.length > 50 ? soldier_r29.comment : "")("title", soldier_r29.comment && soldier_r29.comment.length > 50 ? soldier_r29.comment : "");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", soldier_r29.comment ? soldier_r29.comment.length > 50 ? \u0275\u0275pipeBind3(3, 3, soldier_r29.comment, 0, 50) + "..." : soldier_r29.comment : "-", " ");
  }
}
function SoldiersComponent_tr_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 60);
  }
}
function SoldiersComponent_tr_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 61);
  }
  if (rf & 2) {
    const row_r30 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r1.getRowClass(row_r30));
  }
}
var SoldiersComponent = class _SoldiersComponent {
  soldierService = inject(SoldierService);
  unitService = inject(UnitService);
  // Делаем UnitTag доступным в шаблоне
  UnitTag = UnitTag;
  snackBar = inject(MatSnackBar);
  // Input для ID подразделения
  unitId = input(null, ...ngDevMode ? [{ debugName: "unitId" }] : []);
  // Режим тільки для читання
  isReadOnly = input(false, ...ngDevMode ? [{ debugName: "isReadOnly" }] : []);
  // Дані для відображення
  items = signal([], ...ngDevMode ? [{ debugName: "items" }] : []);
  dataSource = new MatTableDataSource([]);
  displayedColumns = [];
  dialog = inject(MatDialog);
  inlineEdit = new InlineEditManager((column, term) => this.unitService.lookup(term, column === UnitTag.InvolvedId));
  sort;
  constructor() {
    effect(() => {
      const id = this.unitId();
      if (id) {
        this.loadSoldiers(id);
      } else {
        this.items.set([]);
      }
    });
    effect(() => {
      const baseColumns = [
        "unitTag",
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
        "comment"
      ];
      this.displayedColumns = this.isReadOnly() ? baseColumns : ["menu", ...baseColumns];
    });
    effect(() => {
      this.dataSource.data = this.items();
    });
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  reload() {
    const id = this.unitId();
    if (id) {
      this.loadSoldiers(id);
    }
  }
  loadSoldiers(unitId) {
    this.soldierService.getByUnit(unitId).subscribe({
      next: (data) => this.items.set(data),
      error: (error) => {
        const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u043E\u0441\u043E\u0431\u043E\u0432\u043E\u0433\u043E \u0441\u043A\u043B\u0430\u0434\u0443");
        this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
      }
    });
  }
  // CREATE
  add() {
    const openDialog = () => {
      const dialogRef = this.dialog.open(SoldierDialogComponent, {
        width: "600px",
        data: {
          model: {
            firstName: "",
            midleName: "",
            lastName: "",
            nickName: "",
            unitId: this.unitId() || "",
            arrivedAt: /* @__PURE__ */ new Date(),
            rankId: "",
            positionId: "",
            stateId: ""
          }
        }
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.soldierService.create(result.model).subscribe({
            next: () => {
              this.reload();
              this.snackBar.open("\u0411\u0456\u0439\u0446\u044F \u0443\u0441\u043F\u0456\u0448\u043D\u043E \u0441\u0442\u0432\u043E\u0440\u0435\u043D\u043E", "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 3e3 });
              if (result.continue) {
                setTimeout(() => openDialog(), 100);
              }
            },
            error: (error) => {
              const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0441\u0442\u0432\u043E\u0440\u0435\u043D\u043D\u044F \u0431\u0456\u0439\u0446\u044F");
              this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
            }
          });
        }
      });
    };
    openDialog();
  }
  // UPDATE
  edit(soldier) {
    const dialogRef = this.dialog.open(SoldierDialogComponent, {
      width: "600px",
      data: {
        id: soldier.id,
        model: soldier
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.soldierService.update(soldier.id, result.model).subscribe({
          next: () => {
            this.reload();
            this.snackBar.open("\u0411\u0456\u0439\u0446\u044F \u0443\u0441\u043F\u0456\u0448\u043D\u043E \u043E\u043D\u043E\u0432\u043B\u0435\u043D\u043E", "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 3e3 });
          },
          error: (error) => {
            const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043E\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u044F \u0431\u0456\u0439\u0446\u044F");
            this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
          }
        });
      }
    });
  }
  // DELETE
  delete(soldier) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      width: "360px",
      maxWidth: "95vw",
      autoFocus: false,
      data: {
        title: "\u0412\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F \u0431\u0456\u0439\u0446\u044F",
        message: `\u0412\u0438 \u0432\u043F\u0435\u0432\u043D\u0435\u043D\u0456, \u0449\u043E \u0445\u043E\u0447\u0435\u0442\u0435 \u0432\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u0431\u0456\u0439\u0446\u044F "${this.formatFIO(soldier)}"?`,
        confirmText: "\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438",
        cancelText: "\u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438",
        color: "warn",
        icon: "warning"
      }
    });
    ref.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.soldierService.delete(soldier.id).subscribe({
          next: () => {
            this.reload();
            this.snackBar.open("\u0411\u0456\u0439\u0446\u044F \u0443\u0441\u043F\u0456\u0448\u043D\u043E \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u043E", "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 3e3 });
          },
          error: (error) => {
            const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F \u0431\u0456\u0439\u0446\u044F");
            this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
          }
        });
      }
    });
  }
  // === Inline edit helpers ===
  isEditing(soldierId, column) {
    return !this.isReadOnly() && this.inlineEdit.isMode(soldierId, column);
  }
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
        this.updateRow(updated);
        this.inlineEdit.clear(soldier.id);
        this.reload();
        this.snackBar.open(result.message, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 2e3 });
      },
      error: (error) => {
        const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043E\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u044F \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0443");
        this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
      }
    });
  }
  updateRow(updated) {
    const current = this.items();
    const next = current.map((s) => s.id === updated.id ? updated : s);
    this.items.set(next);
  }
  formatFIO(item) {
    return SoldierUtils.formatFIO(item.firstName, item.midleName, item.lastName);
  }
  unitTagTitle(soldier) {
    return SoldierUtils.getUnitTagLabel(SoldierUtils.getUnitTag(soldier, this.unitId() || ""));
  }
  getRowClass(soldier) {
    return SoldierUtils.getRowClass(soldier, this.unitId() || "");
  }
  static \u0275fac = function SoldiersComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SoldiersComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SoldiersComponent, selectors: [["app-page-soldiers"]], viewQuery: function SoldiersComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(MatSort, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.sort = _t.first);
    }
  }, inputs: { unitId: [1, "unitId"], isReadOnly: [1, "isReadOnly"] }, decls: 50, vars: 5, consts: [["soldierMenu", "matMenu"], ["unitAuto", "matAutocomplete"], ["assignedAuto", "matAutocomplete"], ["involvedAuto", "matAutocomplete"], [1, "action-container"], [1, "action-buttons"], ["mat-raised-button", "", "color", "primary", 3, "click"], ["mat-raised-button", "", "color", "accent"], [1, "table-container"], ["mat-table", "", "matSort", "", 1, "mat-elevation-z8", 3, "dataSource"], ["matColumnDef", "menu"], ["mat-header-cell", "", "style", "width: 60px", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "unitTag"], ["mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["matColumnDef", "fio"], ["matColumnDef", "nickName"], ["matColumnDef", "rankShortValue"], ["matColumnDef", "positionValue"], ["matColumnDef", "stateValue"], ["matColumnDef", "unitShortName"], ["mat-cell", "", "class", "unit-cell", 4, "matCellDef"], ["matColumnDef", "assignedUnitShortName"], ["mat-cell", "", "class", "assigned-unit-cell", 4, "matCellDef"], ["matColumnDef", "involvedUnitShortName"], ["mat-cell", "", "class", "involved-unit-cell", 4, "matCellDef"], ["matColumnDef", "arrivedAt"], ["matColumnDef", "departedAt"], ["matColumnDef", "comment"], ["mat-cell", "", "class", "comment-cell", 4, "matCellDef"], ["mat-header-row", "", 4, "matHeaderRowDef", "matHeaderRowDefSticky"], ["mat-row", "", 3, "class", 4, "matRowDef", "matRowDefColumns"], ["mat-raised-button", "", "color", "accent", 3, "click"], ["mat-header-cell", "", 2, "width", "60px"], ["mat-cell", ""], ["mat-icon-button", "", "matTooltip", "\u0414\u0456\u0457 \u0437 \u0431\u0456\u0439\u0446\u0435\u043C", 3, "click", "matMenuTriggerFor"], ["mat-menu-item", "", 3, "click"], ["color", "accent"], ["mat-menu-item", "", 1, "delete-action", 3, "click"], ["mat-header-cell", "", "mat-sort-header", ""], [1, "fio"], [1, "state-badge"], ["mat-cell", "", 1, "unit-cell"], [1, "edit-mode"], [1, "view-mode"], ["appearance", "outline", 1, "inline-field"], ["type", "text", "matInput", "", "placeholder", "\u041E\u0441\u043D\u043E\u0432\u043D\u0438\u0439 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B", 3, "formControl", "matAutocomplete"], [3, "optionSelected", "displayWith"], ["disabled", ""], [3, "value"], ["mat-icon-button", "", "matTooltip", "\u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438", 1, "cancel-btn", 3, "click"], [1, "unit-text"], ["mat-icon-button", "", "matTooltip", "\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438", 1, "edit-btn"], ["mat-icon-button", "", "matTooltip", "\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438", 1, "edit-btn", 3, "click"], ["mat-cell", "", 1, "assigned-unit-cell"], ["type", "text", "matInput", "", "placeholder", "\u041D\u0435 \u043F\u0440\u0438\u0434\u0430\u043D\u0438\u0439", 3, "formControl", "matAutocomplete"], ["mat-cell", "", 1, "involved-unit-cell"], ["type", "text", "matInput", "", "placeholder", "\u041D\u0435 \u043F\u0440\u0438\u0437\u043D\u0430\u0447\u0435\u043D\u043E", 3, "formControl", "matAutocomplete"], ["mat-cell", "", 1, "comment-cell"], [1, "comment-text", 3, "matTooltip", "title"], ["mat-header-row", ""], ["mat-row", ""]], template: function SoldiersComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 4)(1, "div", 5)(2, "button", 6);
      \u0275\u0275listener("click", function SoldiersComponent_Template_button_click_2_listener() {
        return ctx.reload();
      });
      \u0275\u0275elementStart(3, "mat-icon");
      \u0275\u0275text(4, "refresh");
      \u0275\u0275elementEnd();
      \u0275\u0275text(5, " \u041E\u043D\u043E\u0432\u0438\u0442\u0438 ");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(6, SoldiersComponent_Conditional_6_Template, 4, 0, "button", 7);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "div", 8)(8, "table", 9);
      \u0275\u0275elementContainerStart(9, 10);
      \u0275\u0275template(10, SoldiersComponent_th_10_Template, 2, 0, "th", 11)(11, SoldiersComponent_td_11_Template, 17, 1, "td", 12);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(12, 13);
      \u0275\u0275template(13, SoldiersComponent_th_13_Template, 2, 0, "th", 14)(14, SoldiersComponent_td_14_Template, 2, 1, "td", 12);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(15, 15);
      \u0275\u0275template(16, SoldiersComponent_th_16_Template, 2, 0, "th", 14)(17, SoldiersComponent_td_17_Template, 3, 1, "td", 12);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(18, 16);
      \u0275\u0275template(19, SoldiersComponent_th_19_Template, 2, 0, "th", 14)(20, SoldiersComponent_td_20_Template, 2, 1, "td", 12);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(21, 17);
      \u0275\u0275template(22, SoldiersComponent_th_22_Template, 2, 0, "th", 14)(23, SoldiersComponent_td_23_Template, 2, 1, "td", 12);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(24, 18);
      \u0275\u0275template(25, SoldiersComponent_th_25_Template, 2, 0, "th", 14)(26, SoldiersComponent_td_26_Template, 2, 1, "td", 12);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(27, 19);
      \u0275\u0275template(28, SoldiersComponent_th_28_Template, 2, 0, "th", 14)(29, SoldiersComponent_td_29_Template, 3, 1, "td", 12);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(30, 20);
      \u0275\u0275template(31, SoldiersComponent_th_31_Template, 2, 0, "th", 14)(32, SoldiersComponent_td_32_Template, 3, 1, "td", 21);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(33, 22);
      \u0275\u0275template(34, SoldiersComponent_th_34_Template, 2, 0, "th", 14)(35, SoldiersComponent_td_35_Template, 3, 1, "td", 23);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(36, 24);
      \u0275\u0275template(37, SoldiersComponent_th_37_Template, 2, 0, "th", 14)(38, SoldiersComponent_td_38_Template, 3, 1, "td", 25);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(39, 26);
      \u0275\u0275template(40, SoldiersComponent_th_40_Template, 2, 0, "th", 14)(41, SoldiersComponent_td_41_Template, 3, 4, "td", 12);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(42, 27);
      \u0275\u0275template(43, SoldiersComponent_th_43_Template, 2, 0, "th", 14)(44, SoldiersComponent_td_44_Template, 3, 4, "td", 12);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(45, 28);
      \u0275\u0275template(46, SoldiersComponent_th_46_Template, 2, 0, "th", 14)(47, SoldiersComponent_td_47_Template, 4, 7, "td", 29);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275template(48, SoldiersComponent_tr_48_Template, 1, 0, "tr", 30)(49, SoldiersComponent_tr_49_Template, 1, 2, "tr", 31);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275conditional(!ctx.isReadOnly() ? 6 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275property("dataSource", ctx.dataSource);
      \u0275\u0275advance(40);
      \u0275\u0275property("matHeaderRowDef", ctx.displayedColumns)("matHeaderRowDefSticky", true);
      \u0275\u0275advance();
      \u0275\u0275property("matRowDefColumns", ctx.displayedColumns);
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
    MatButton,
    MatIconButton,
    MatSortModule,
    MatSort,
    MatSortHeader,
    MatIconModule,
    MatIcon,
    MatFormFieldModule,
    MatFormField,
    MatInputModule,
    MatInput,
    MatTooltipModule,
    MatTooltip,
    MatMenuModule,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatDividerModule,
    MatDivider,
    MatAutocompleteModule,
    MatAutocomplete,
    MatOption,
    MatAutocompleteTrigger,
    FormsModule,
    DefaultValueAccessor,
    NgControlStatus,
    ReactiveFormsModule,
    FormControlDirective,
    SlicePipe,
    DatePipe,
    AsyncPipe
  ], styles: ["\n\n[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  width: 100%;\n  overflow: hidden;\n}\n.table-container[_ngcontent-%COMP%] {\n  flex: 1 1 auto;\n  overflow: auto;\n  border: 1px solid #ccc;\n}\n.table-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%] {\n  width: 100%;\n  min-width: 800px;\n}\n.action-container[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  align-items: flex-end;\n  flex-wrap: wrap;\n  margin-bottom: 16px;\n  padding: 8px;\n  background: #f5f5f5;\n  border-radius: 8px;\n}\n.action-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.soldier-name[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.fio[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #1976d2;\n}\n.nickname[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #666;\n  font-style: italic;\n}\n.assigned-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  color: #ff9800;\n  margin-left: 4px;\n}\n.state-badge[_ngcontent-%COMP%] {\n  padding: 4px 8px;\n  border-radius: 12px;\n  font-size: 12px;\n  font-weight: 500;\n  background-color: #e3f2fd;\n  color: #1976d2;\n  border: 1px solid #bbdefb;\n}\n.comment-cell[_ngcontent-%COMP%] {\n  max-width: 200px;\n  width: 200px;\n}\n.comment-text[_ngcontent-%COMP%] {\n  display: block;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  max-width: 100%;\n  cursor: help;\n}\n.assigned-unit-cell[_ngcontent-%COMP%], \n.unit-cell[_ngcontent-%COMP%], \n.involved-unit-cell[_ngcontent-%COMP%] {\n  padding: 4px 8px !important;\n}\n.assigned-unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%], \n.unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%], \n.involved-unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  min-height: 32px;\n}\n.assigned-unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]   .unit-text[_ngcontent-%COMP%], \n.unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]   .unit-text[_ngcontent-%COMP%], \n.involved-unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]   .unit-text[_ngcontent-%COMP%] {\n  flex: 1;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.assigned-unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]   .edit-btn[_ngcontent-%COMP%], \n.unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]   .edit-btn[_ngcontent-%COMP%], \n.involved-unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]   .edit-btn[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  line-height: 28px;\n  opacity: 0;\n  transition: opacity 0.2s;\n}\n.assigned-unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]   .edit-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], \n.unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]   .edit-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], \n.involved-unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]   .edit-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n  line-height: 18px;\n}\n.assigned-unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]:hover   .edit-btn[_ngcontent-%COMP%], \n.unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]:hover   .edit-btn[_ngcontent-%COMP%], \n.involved-unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]:hover   .edit-btn[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.assigned-unit-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%], \n.unit-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%], \n.involved-unit-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.assigned-unit-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%], \n.unit-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%], \n.involved-unit-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  line-height: 28px;\n  flex-shrink: 0;\n}\n.assigned-unit-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], \n.unit-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], \n.involved-unit-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n  line-height: 18px;\n}\n.assigned-unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%], \n.unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%], \n.involved-unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%] {\n  flex: 1;\n  margin: 0;\n  font-size: 14px;\n}\n.assigned-unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%]     .mat-mdc-text-field-wrapper, \n.unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%]     .mat-mdc-text-field-wrapper, \n.involved-unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%]     .mat-mdc-text-field-wrapper {\n  padding: 0;\n}\n.assigned-unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%]     .mat-mdc-form-field-flex, \n.unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%]     .mat-mdc-form-field-flex, \n.involved-unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%]     .mat-mdc-form-field-flex {\n  padding: 4px 8px;\n  min-height: 32px;\n}\n.assigned-unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%]     .mat-mdc-form-field-infix, \n.unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%]     .mat-mdc-form-field-infix, \n.involved-unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%]     .mat-mdc-form-field-infix {\n  padding-top: 4px;\n  padding-bottom: 4px;\n  min-height: 24px;\n}\n.assigned-unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%]     .mat-mdc-form-field-subscript-wrapper, \n.unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%]     .mat-mdc-form-field-subscript-wrapper, \n.involved-unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%]     .mat-mdc-form-field-subscript-wrapper {\n  display: none;\n}\n@media (max-width: 768px) {\n  .mat-column-comment[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n@media (max-width: 600px) {\n  .mat-column-assignedUnitShortName[_ngcontent-%COMP%], \n   .mat-column-positionValue[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n.mat-mdc-row[_ngcontent-%COMP%] {\n  transition: background-color 0.2s ease;\n}\n.mat-mdc-row.row-critical[_ngcontent-%COMP%] {\n  background-color: #ffebee !important;\n}\n.mat-mdc-row.row-critical[_ngcontent-%COMP%]:hover {\n  background-color: #ffcdd2 !important;\n}\n.mat-mdc-row.row-critical[_ngcontent-%COMP%]   .state-badge[_ngcontent-%COMP%] {\n  background-color: #b71c1c;\n  color: white;\n  border-color: #b71c1c;\n}\n.mat-mdc-row.row-severe[_ngcontent-%COMP%] {\n  background-color: #fff3e0 !important;\n}\n.mat-mdc-row.row-severe[_ngcontent-%COMP%]:hover {\n  background-color: #ffe0b2 !important;\n}\n.mat-mdc-row.row-severe[_ngcontent-%COMP%]   .state-badge[_ngcontent-%COMP%] {\n  background-color: #ef6c00;\n  color: white;\n  border-color: #ef6c00;\n}\n.mat-mdc-row.row-problematic[_ngcontent-%COMP%] {\n  background-color: #fffde7 !important;\n}\n.mat-mdc-row.row-problematic[_ngcontent-%COMP%]:hover {\n  background-color: #fff9c4 !important;\n}\n.mat-mdc-row.row-problematic[_ngcontent-%COMP%]   .state-badge[_ngcontent-%COMP%] {\n  background-color: #f57f17;\n  color: white;\n  border-color: #f57f17;\n}\n.mat-mdc-row.row-recovery[_ngcontent-%COMP%] {\n  background-color: #e8f5e9 !important;\n}\n.mat-mdc-row.row-recovery[_ngcontent-%COMP%]:hover {\n  background-color: #c8e6c9 !important;\n}\n.mat-mdc-row.row-recovery[_ngcontent-%COMP%]   .state-badge[_ngcontent-%COMP%] {\n  background-color: #2e7d32;\n  color: white;\n  border-color: #2e7d32;\n}\n.mat-mdc-row.row-seconded[_ngcontent-%COMP%] {\n  background-color: #fffde7 !important;\n}\n.mat-mdc-row.row-seconded[_ngcontent-%COMP%]:hover {\n  background-color: #fff9c4 !important;\n}\n/*# sourceMappingURL=Soldier.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SoldiersComponent, [{
    type: Component,
    args: [{ selector: "app-page-soldiers", imports: [
      MatTableModule,
      MatButtonModule,
      MatSortModule,
      MatIconModule,
      MatFormFieldModule,
      MatInputModule,
      MatTooltipModule,
      MatMenuModule,
      MatDividerModule,
      MatAutocompleteModule,
      FormsModule,
      ReactiveFormsModule,
      SlicePipe,
      DatePipe,
      AsyncPipe
    ], template: `<div class="action-container">
  <div class="action-buttons">
    <button mat-raised-button color="primary" (click)="reload()">
      <mat-icon>refresh</mat-icon>
      \u041E\u043D\u043E\u0432\u0438\u0442\u0438
    </button>
    @if (!isReadOnly()) {
      <button mat-raised-button color="accent" (click)="add()">
        <mat-icon>person_add</mat-icon>
        \u0414\u043E\u0434\u0430\u0442\u0438 \u0431\u0456\u0439\u0446\u044F
      </button>
    }
  </div>
</div>

<div class="table-container">
  <table mat-table [dataSource]="dataSource" matSort class="mat-elevation-z8">
    <!-- Menu Column -->
    <ng-container matColumnDef="menu">
      <th mat-header-cell *matHeaderCellDef style="width: 60px">\u0414\u0456\u0457</th>
      <td mat-cell *matCellDef="let soldier">
        <button
          mat-icon-button
          [matMenuTriggerFor]="soldierMenu"
          matTooltip="\u0414\u0456\u0457 \u0437 \u0431\u0456\u0439\u0446\u0435\u043C"
          (click)="$event.stopPropagation()"
        >
          <mat-icon>more_vert</mat-icon>
        </button>

        <mat-menu #soldierMenu="matMenu">
          <button mat-menu-item (click)="edit(soldier)">
            <mat-icon color="accent">edit</mat-icon>
            <span>\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438</span>
          </button>
          <mat-divider></mat-divider>
          <button mat-menu-item (click)="delete(soldier)" class="delete-action">
            <mat-icon>delete</mat-icon>
            <span>\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438</span>
          </button>
        </mat-menu>
      </td>
    </ng-container>

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
        <span class="fio">{{ formatFIO(soldier) }}</span>
      </td>
    </ng-container>

    <ng-container matColumnDef="nickName">
      <th mat-header-cell *matHeaderCellDef mat-sort-header>\u041F\u043E\u0437\u0438\u0432\u043D\u0438\u0439</th>
      <td mat-cell *matCellDef="let soldier">{{ soldier.nickName }}</td>
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
      <td mat-cell *matCellDef="let soldier" class="unit-cell">
        @if (isEditing(soldier.id, UnitTag.UnitId)) {
          <!-- \u0420\u0435\u0436\u0438\u043C \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F -->
          <div class="edit-mode">
            <mat-form-field appearance="outline" class="inline-field">
              <input
                type="text"
                matInput
                [formControl]="getControl(soldier, UnitTag.UnitId)"
                [matAutocomplete]="unitAuto"
                placeholder="\u041E\u0441\u043D\u043E\u0432\u043D\u0438\u0439 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B"
              />
              <mat-autocomplete
                #unitAuto="matAutocomplete"
                [displayWith]="inlineEdit.displayLookupFn"
                (optionSelected)="onSelect(soldier, UnitTag.UnitId, $event)"
              >
                @if (inlineEdit.loading(soldier.id)) {
                  <mat-option disabled>\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F...</mat-option>
                }
                @for (unit of inlineEdit.options(soldier.id) | async; track unit.id) {
                  <mat-option [value]="unit">{{ unit.value }}</mat-option>
                }
              </mat-autocomplete>
            </mat-form-field>
            <button
              mat-icon-button
              class="cancel-btn"
              (click)="inlineEdit.clear(soldier.id)"
              matTooltip="\u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438"
            >
              <mat-icon>close</mat-icon>
            </button>
          </div>
        } @else {
          <!-- \u0420\u0435\u0436\u0438\u043C \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0430 -->
          <div class="view-mode">
            <span class="unit-text">{{ soldier.unitShortName }}</span>
            @if (!isReadOnly()) {
              <button
                mat-icon-button
                class="edit-btn"
                (click)="startEditing(soldier, UnitTag.UnitId)"
                matTooltip="\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438"
              >
                <mat-icon>edit</mat-icon>
              </button>
            }
          </div>
        }
      </td>
    </ng-container>

    <!-- Assigned Unit Column -->
    <ng-container matColumnDef="assignedUnitShortName">
      <th mat-header-cell *matHeaderCellDef mat-sort-header>\u041F\u0440\u0438\u0434\u0430\u043D\u0438\u0439 \u0434\u043E</th>
      <td mat-cell *matCellDef="let soldier" class="assigned-unit-cell">
        @if (isEditing(soldier.id, UnitTag.AssignedId)) {
          <!-- \u0420\u0435\u0436\u0438\u043C \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F -->
          <div class="edit-mode">
            <mat-form-field appearance="outline" class="inline-field">
              <input
                type="text"
                matInput
                [formControl]="getControl(soldier, UnitTag.AssignedId)"
                [matAutocomplete]="assignedAuto"
                placeholder="\u041D\u0435 \u043F\u0440\u0438\u0434\u0430\u043D\u0438\u0439"
              />
              <mat-autocomplete
                #assignedAuto="matAutocomplete"
                [displayWith]="inlineEdit.displayLookupFn"
                (optionSelected)="onSelect(soldier, UnitTag.AssignedId, $event)"
              >
                <mat-option [value]="null">\u041D\u0435 \u043F\u0440\u0438\u0434\u0430\u043D\u0438\u0439</mat-option>
                @if (inlineEdit.loading(soldier.id)) {
                  <mat-option disabled>\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F...</mat-option>
                }
                @for (unit of inlineEdit.options(soldier.id) | async; track unit.id) {
                  <mat-option [value]="unit">{{ unit.value }}</mat-option>
                }
              </mat-autocomplete>
            </mat-form-field>
            <button
              mat-icon-button
              class="cancel-btn"
              (click)="inlineEdit.clear(soldier.id)"
              matTooltip="\u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438"
            >
              <mat-icon>close</mat-icon>
            </button>
          </div>
        } @else {
          <!-- \u0420\u0435\u0436\u0438\u043C \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0430 -->
          <div class="view-mode">
            <span class="unit-text">{{ soldier.assignedUnitShortName || '-' }}</span>
            @if (!isReadOnly()) {
              <button
                mat-icon-button
                class="edit-btn"
                (click)="startEditing(soldier, UnitTag.AssignedId)"
                matTooltip="\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438"
              >
                <mat-icon>edit</mat-icon>
              </button>
            }
          </div>
        }
      </td>
    </ng-container>

    <!-- Involved Unit Column -->
    <ng-container matColumnDef="involvedUnitShortName">
      <th mat-header-cell *matHeaderCellDef mat-sort-header>\u0415\u043A\u0456\u043F\u0430\u0436/\u0413\u0440\u0443\u043F\u0430</th>
      <td mat-cell *matCellDef="let soldier" class="involved-unit-cell">
        @if (isEditing(soldier.id, UnitTag.InvolvedId)) {
          <!-- \u0420\u0435\u0436\u0438\u043C \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F -->
          <div class="edit-mode">
            <mat-form-field appearance="outline" class="inline-field">
              <input
                type="text"
                matInput
                [formControl]="getControl(soldier, UnitTag.InvolvedId)"
                [matAutocomplete]="involvedAuto"
                placeholder="\u041D\u0435 \u043F\u0440\u0438\u0437\u043D\u0430\u0447\u0435\u043D\u043E"
              />
              <mat-autocomplete
                #involvedAuto="matAutocomplete"
                [displayWith]="inlineEdit.displayLookupFn"
                (optionSelected)="onSelect(soldier, UnitTag.InvolvedId, $event)"
              >
                <mat-option [value]="null">\u041D\u0435 \u043F\u0440\u0438\u0437\u043D\u0430\u0447\u0435\u043D\u043E</mat-option>
                @if (inlineEdit.loading(soldier.id)) {
                  <mat-option disabled>\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F...</mat-option>
                }
                @for (unit of inlineEdit.options(soldier.id) | async; track unit.id) {
                  <mat-option [value]="unit">{{ unit.value }}</mat-option>
                }
              </mat-autocomplete>
            </mat-form-field>
            <button
              mat-icon-button
              class="cancel-btn"
              (click)="inlineEdit.clear(soldier.id)"
              matTooltip="\u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438"
            >
              <mat-icon>close</mat-icon>
            </button>
          </div>
        } @else {
          <!-- \u0420\u0435\u0436\u0438\u043C \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0430 -->
          <div class="view-mode">
            <span class="unit-text">{{ soldier.involvedUnitShortName || '-' }}</span>
            @if (!isReadOnly()) {
              <button
                mat-icon-button
                class="edit-btn"
                (click)="startEditing(soldier, UnitTag.InvolvedId)"
                matTooltip="\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438"
              >
                <mat-icon>edit</mat-icon>
              </button>
            }
          </div>
        }
      </td>
    </ng-container>

    <!-- ArrivedAt Column -->
    <ng-container matColumnDef="arrivedAt">
      <th mat-header-cell *matHeaderCellDef mat-sort-header>\u041F\u0440\u0438\u0431\u0443\u0432</th>
      <td mat-cell *matCellDef="let soldier">{{ soldier.arrivedAt | date: 'dd.MM.yyyy' }}</td>
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
          [matTooltip]="soldier.comment && soldier.comment.length > 50 ? soldier.comment : ''"
          [title]="soldier.comment && soldier.comment.length > 50 ? soldier.comment : ''"
        >
          {{
            soldier.comment
              ? soldier.comment.length > 50
                ? (soldier.comment | slice: 0 : 50) + '...'
                : soldier.comment
              : '-'
          }}
        </span>
      </td>
    </ng-container>

    <tr mat-header-row *matHeaderRowDef="displayedColumns; sticky: true"></tr>
    <tr
      mat-row
      *matRowDef="let row; columns: displayedColumns"
      [class]="getRowClass(row)"
    ></tr>
  </table>
</div>
`, styles: ["/* src/app/Soldier/Soldier.component.scss */\n:host {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  width: 100%;\n  overflow: hidden;\n}\n.table-container {\n  flex: 1 1 auto;\n  overflow: auto;\n  border: 1px solid #ccc;\n}\n.table-container table {\n  width: 100%;\n  min-width: 800px;\n}\n.action-container {\n  display: flex;\n  gap: 16px;\n  align-items: flex-end;\n  flex-wrap: wrap;\n  margin-bottom: 16px;\n  padding: 8px;\n  background: #f5f5f5;\n  border-radius: 8px;\n}\n.action-buttons {\n  display: flex;\n  gap: 8px;\n}\n.soldier-name {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.fio {\n  font-weight: 500;\n  color: #1976d2;\n}\n.nickname {\n  font-size: 12px;\n  color: #666;\n  font-style: italic;\n}\n.assigned-icon {\n  font-size: 16px;\n  color: #ff9800;\n  margin-left: 4px;\n}\n.state-badge {\n  padding: 4px 8px;\n  border-radius: 12px;\n  font-size: 12px;\n  font-weight: 500;\n  background-color: #e3f2fd;\n  color: #1976d2;\n  border: 1px solid #bbdefb;\n}\n.comment-cell {\n  max-width: 200px;\n  width: 200px;\n}\n.comment-text {\n  display: block;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  max-width: 100%;\n  cursor: help;\n}\n.assigned-unit-cell,\n.unit-cell,\n.involved-unit-cell {\n  padding: 4px 8px !important;\n}\n.assigned-unit-cell .view-mode,\n.unit-cell .view-mode,\n.involved-unit-cell .view-mode {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  min-height: 32px;\n}\n.assigned-unit-cell .view-mode .unit-text,\n.unit-cell .view-mode .unit-text,\n.involved-unit-cell .view-mode .unit-text {\n  flex: 1;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.assigned-unit-cell .view-mode .edit-btn,\n.unit-cell .view-mode .edit-btn,\n.involved-unit-cell .view-mode .edit-btn {\n  width: 28px;\n  height: 28px;\n  line-height: 28px;\n  opacity: 0;\n  transition: opacity 0.2s;\n}\n.assigned-unit-cell .view-mode .edit-btn mat-icon,\n.unit-cell .view-mode .edit-btn mat-icon,\n.involved-unit-cell .view-mode .edit-btn mat-icon {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n  line-height: 18px;\n}\n.assigned-unit-cell .view-mode:hover .edit-btn,\n.unit-cell .view-mode:hover .edit-btn,\n.involved-unit-cell .view-mode:hover .edit-btn {\n  opacity: 1;\n}\n.assigned-unit-cell .edit-mode,\n.unit-cell .edit-mode,\n.involved-unit-cell .edit-mode {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.assigned-unit-cell .edit-mode .cancel-btn,\n.unit-cell .edit-mode .cancel-btn,\n.involved-unit-cell .edit-mode .cancel-btn {\n  width: 28px;\n  height: 28px;\n  line-height: 28px;\n  flex-shrink: 0;\n}\n.assigned-unit-cell .edit-mode .cancel-btn mat-icon,\n.unit-cell .edit-mode .cancel-btn mat-icon,\n.involved-unit-cell .edit-mode .cancel-btn mat-icon {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n  line-height: 18px;\n}\n.assigned-unit-cell .inline-field,\n.unit-cell .inline-field,\n.involved-unit-cell .inline-field {\n  flex: 1;\n  margin: 0;\n  font-size: 14px;\n}\n.assigned-unit-cell .inline-field ::ng-deep .mat-mdc-text-field-wrapper,\n.unit-cell .inline-field ::ng-deep .mat-mdc-text-field-wrapper,\n.involved-unit-cell .inline-field ::ng-deep .mat-mdc-text-field-wrapper {\n  padding: 0;\n}\n.assigned-unit-cell .inline-field ::ng-deep .mat-mdc-form-field-flex,\n.unit-cell .inline-field ::ng-deep .mat-mdc-form-field-flex,\n.involved-unit-cell .inline-field ::ng-deep .mat-mdc-form-field-flex {\n  padding: 4px 8px;\n  min-height: 32px;\n}\n.assigned-unit-cell .inline-field ::ng-deep .mat-mdc-form-field-infix,\n.unit-cell .inline-field ::ng-deep .mat-mdc-form-field-infix,\n.involved-unit-cell .inline-field ::ng-deep .mat-mdc-form-field-infix {\n  padding-top: 4px;\n  padding-bottom: 4px;\n  min-height: 24px;\n}\n.assigned-unit-cell .inline-field ::ng-deep .mat-mdc-form-field-subscript-wrapper,\n.unit-cell .inline-field ::ng-deep .mat-mdc-form-field-subscript-wrapper,\n.involved-unit-cell .inline-field ::ng-deep .mat-mdc-form-field-subscript-wrapper {\n  display: none;\n}\n@media (max-width: 768px) {\n  .mat-column-comment {\n    display: none;\n  }\n}\n@media (max-width: 600px) {\n  .mat-column-assignedUnitShortName,\n  .mat-column-positionValue {\n    display: none;\n  }\n}\n.mat-mdc-row {\n  transition: background-color 0.2s ease;\n}\n.mat-mdc-row.row-critical {\n  background-color: #ffebee !important;\n}\n.mat-mdc-row.row-critical:hover {\n  background-color: #ffcdd2 !important;\n}\n.mat-mdc-row.row-critical .state-badge {\n  background-color: #b71c1c;\n  color: white;\n  border-color: #b71c1c;\n}\n.mat-mdc-row.row-severe {\n  background-color: #fff3e0 !important;\n}\n.mat-mdc-row.row-severe:hover {\n  background-color: #ffe0b2 !important;\n}\n.mat-mdc-row.row-severe .state-badge {\n  background-color: #ef6c00;\n  color: white;\n  border-color: #ef6c00;\n}\n.mat-mdc-row.row-problematic {\n  background-color: #fffde7 !important;\n}\n.mat-mdc-row.row-problematic:hover {\n  background-color: #fff9c4 !important;\n}\n.mat-mdc-row.row-problematic .state-badge {\n  background-color: #f57f17;\n  color: white;\n  border-color: #f57f17;\n}\n.mat-mdc-row.row-recovery {\n  background-color: #e8f5e9 !important;\n}\n.mat-mdc-row.row-recovery:hover {\n  background-color: #c8e6c9 !important;\n}\n.mat-mdc-row.row-recovery .state-badge {\n  background-color: #2e7d32;\n  color: white;\n  border-color: #2e7d32;\n}\n.mat-mdc-row.row-seconded {\n  background-color: #fffde7 !important;\n}\n.mat-mdc-row.row-seconded:hover {\n  background-color: #fff9c4 !important;\n}\n/*# sourceMappingURL=Soldier.component.css.map */\n"] }]
  }], () => [], { unitId: [{ type: Input, args: [{ isSignal: true, alias: "unitId", required: false }] }], isReadOnly: [{ type: Input, args: [{ isSignal: true, alias: "isReadOnly", required: false }] }], sort: [{
    type: ViewChild,
    args: [MatSort]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SoldiersComponent, { className: "SoldiersComponent", filePath: "app/Soldier/Soldier.component.ts", lineNumber: 58 });
})();

// src/app/Unit/UnitContent.component.ts
function UnitContentComponent_Conditional_1_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "groups");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "\u0415\u043A\u0456\u043F\u0430\u0436/\u0413\u0440\u0443\u043F\u0430");
    \u0275\u0275elementEnd();
  }
}
function UnitContentComponent_Conditional_1_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "strong");
    \u0275\u0275text(2, "\u0411\u0430\u0442\u044C\u043A\u0456\u0432\u0441\u044C\u043A\u0438\u0439:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const unit_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(unit_r2.parentShortName);
  }
}
function UnitContentComponent_Conditional_1_Conditional_8_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "strong");
    \u0275\u0275text(2, "\u0412\u0456\u0439\u0441\u044C\u043A\u043E\u0432\u0430 \u0447\u0430\u0441\u0442\u0438\u043D\u0430:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const unit_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(unit_r2.militaryNumber);
  }
}
function UnitContentComponent_Conditional_1_Conditional_8_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "strong");
    \u0275\u0275text(2, "\u041F\u0440\u0438\u0434\u0430\u043D\u0438\u0439 \u0434\u043E:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const unit_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(unit_r2.assignedShortName);
  }
}
function UnitContentComponent_Conditional_1_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, UnitContentComponent_Conditional_1_Conditional_8_Conditional_0_Template, 5, 1, "div", 2);
    \u0275\u0275elementStart(1, "div", 2)(2, "strong");
    \u0275\u0275text(3, "\u0422\u0438\u043F \u0441\u0438\u043B:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 2)(7, "strong");
    \u0275\u0275text(8, "\u0422\u0438\u043F \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0443:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(11, UnitContentComponent_Conditional_1_Conditional_8_Conditional_11_Template, 5, 1, "div", 2);
  }
  if (rf & 2) {
    const unit_r2 = \u0275\u0275nextContext();
    \u0275\u0275conditional(unit_r2.militaryNumber ? 0 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(unit_r2.forceType || "\u041D\u0435 \u0432\u043A\u0430\u0437\u0430\u043D\u043E");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(unit_r2.unitType || "\u041D\u0435 \u0432\u043A\u0430\u0437\u0430\u043D\u043E");
    \u0275\u0275advance();
    \u0275\u0275conditional(unit_r2.assignedShortName ? 11 : -1);
  }
}
function UnitContentComponent_Conditional_1_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4)(1, "strong");
    \u0275\u0275text(2, "\u041A\u043E\u043C\u0435\u043D\u0442\u0430\u0440:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const unit_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(unit_r2.comment);
  }
}
function UnitContentComponent_Conditional_1_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-page-soldiers", 9);
  }
  if (rf & 2) {
    const unit_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("unitId", unit_r2.id);
  }
}
function UnitContentComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-card", 1)(1, "mat-card-header")(2, "mat-card-title", 2);
    \u0275\u0275text(3);
    \u0275\u0275conditionalCreate(4, UnitContentComponent_Conditional_1_Conditional_4_Template, 4, 0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "mat-card-content")(6, "div", 3);
    \u0275\u0275conditionalCreate(7, UnitContentComponent_Conditional_1_Conditional_7_Template, 5, 1, "div", 2);
    \u0275\u0275conditionalCreate(8, UnitContentComponent_Conditional_1_Conditional_8_Template, 12, 4);
    \u0275\u0275elementStart(9, "div", 2)(10, "strong");
    \u0275\u0275text(11, "\u041F\u041F\u0414:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(14, UnitContentComponent_Conditional_1_Conditional_14_Template, 5, 1, "div", 4);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "mat-accordion", 5)(16, "mat-expansion-panel", 6);
    \u0275\u0275listener("opened", function UnitContentComponent_Conditional_1_Template_mat_expansion_panel_opened_16_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.soldiersPanelOpened.set(true));
    });
    \u0275\u0275elementStart(17, "mat-expansion-panel-header")(18, "mat-panel-title")(19, "mat-icon", 7);
    \u0275\u0275text(20, "group");
    \u0275\u0275elementEnd();
    \u0275\u0275text(21, " \u041E\u0441\u043E\u0431\u043E\u0432\u0438\u0439 \u0441\u043A\u043B\u0430\u0434 ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 8);
    \u0275\u0275conditionalCreate(23, UnitContentComponent_Conditional_1_Conditional_23_Template, 1, 1, "app-page-soldiers", 9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "mat-expansion-panel", 10)(25, "mat-expansion-panel-header")(26, "mat-panel-title")(27, "mat-icon", 7);
    \u0275\u0275text(28, "gavel");
    \u0275\u0275elementEnd();
    \u0275\u0275text(29, " \u0411\u043E\u0439\u043E\u0432\u0456 \u0440\u043E\u0437\u043F\u043E\u0440\u044F\u0434\u0436\u0435\u043D\u043D\u044F ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "div", 8)(31, "p", 11);
    \u0275\u0275text(32, "[TODO: \u0422\u0443\u0442 \u0431\u0443\u0434\u0435 \u0441\u043F\u0438\u0441\u043E\u043A \u0431\u043E\u0439\u043E\u0432\u0438\u0445 \u0440\u043E\u0437\u043F\u043E\u0440\u044F\u0434\u0436\u0435\u043D\u044C \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0443]");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(33, "mat-expansion-panel", 10)(34, "mat-expansion-panel-header")(35, "mat-panel-title")(36, "mat-icon", 7);
    \u0275\u0275text(37, "send");
    \u0275\u0275elementEnd();
    \u0275\u0275text(38, " \u0411\u043E\u0439\u043E\u0432\u0456 \u0434\u043E\u043D\u0435\u0441\u0435\u043D\u043D\u044F ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "div", 8)(40, "p", 11);
    \u0275\u0275text(41, "[TODO: \u0422\u0443\u0442 \u0431\u0443\u0434\u0435 \u0441\u043F\u0438\u0441\u043E\u043A \u0431\u043E\u0439\u043E\u0432\u0438\u0445 \u0434\u043E\u043D\u0435\u0441\u0435\u043D\u044C \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0443]");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(42, "mat-expansion-panel", 10)(43, "mat-expansion-panel-header")(44, "mat-panel-title")(45, "mat-icon", 7);
    \u0275\u0275text(46, "info");
    \u0275\u0275elementEnd();
    \u0275\u0275text(47, " \u0414\u043E\u0434\u0430\u0442\u043A\u043E\u0432\u0430 \u0456\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0456\u044F ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(48, "div", 8)(49, "p", 11);
    \u0275\u0275text(50, " [TODO: \u0426\u044F \u0441\u0435\u043A\u0446\u0456\u044F \u0437\u0430\u0440\u0435\u0437\u0435\u0440\u0432\u043E\u0432\u0430\u043D\u0430 \u0434\u043B\u044F \u043C\u0430\u0439\u0431\u0443\u0442\u043D\u0456\u0445 \u0434\u0430\u043D\u0438\u0445, \u044F\u043A\u0456 \u0449\u0435 \u043D\u0435 \u0432\u0438\u0437\u043D\u0430\u0447\u0435\u043D\u0456.] ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const unit_r2 = ctx;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", unit_r2.shortName, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(unit_r2.isInvolved ? 4 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(unit_r2.parentShortName ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!unit_r2.isInvolved ? 8 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(unit_r2.persistentLocation || "\u041D\u0435 \u0432\u043A\u0430\u0437\u0430\u043D\u043E");
    \u0275\u0275advance();
    \u0275\u0275conditional(unit_r2.comment ? 14 : -1);
    \u0275\u0275advance(9);
    \u0275\u0275conditional(ctx_r2.soldiersPanelOpened() ? 23 : -1);
  }
}
var UnitContentComponent = class _UnitContentComponent {
  // Вхідні властивості
  selectedUnit = input(null, ...ngDevMode ? [{ debugName: "selectedUnit" }] : []);
  /** Ленива ініціалізація панелі особового складу */
  soldiersPanelOpened = signal(false, ...ngDevMode ? [{ debugName: "soldiersPanelOpened" }] : []);
  static \u0275fac = function UnitContentComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UnitContentComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UnitContentComponent, selectors: [["unit-content"]], inputs: { selectedUnit: [1, "selectedUnit"] }, decls: 2, vars: 1, consts: [[1, "main-content"], [1, "unit-details-card"], [1, "info-item", "inline"], [1, "unit-info-grid"], [1, "info-item", "full-width", "comment"], [1, "sections-accordion"], [1, "unit-section-panel", 3, "opened"], ["color", "primary"], [1, "section-content"], [3, "unitId"], [1, "unit-section-panel"], [1, "todo-placeholder"]], template: function UnitContentComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275conditionalCreate(1, UnitContentComponent_Conditional_1_Template, 51, 7);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_0_0 = ctx.selectedUnit()) ? 1 : -1, tmp_0_0);
    }
  }, dependencies: [
    MatButtonModule,
    MatIconModule,
    MatIcon,
    MatCardModule,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatDividerModule,
    MatExpansionModule,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    SoldiersComponent
  ], styles: ['@charset "UTF-8";\n\n\n\n[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  overflow: hidden;\n}\n.main-content[_ngcontent-%COMP%] {\n  padding: 24px;\n  width: 95%;\n  flex: 1;\n  min-height: 0;\n  overflow-y: auto;\n}\n.unit-details-card[_ngcontent-%COMP%] {\n  width: 100%;\n  margin: 0 0 20px 0;\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);\n}\n.unit-info-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 16px;\n  margin-bottom: 16px;\n}\n.info-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.info-item.inline[_ngcontent-%COMP%] {\n  flex-direction: row;\n  align-items: center;\n  gap: 8px;\n}\n.info-item.full-width[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n}\n.info-item.comment[_ngcontent-%COMP%] {\n  flex-direction: column;\n  gap: 8px;\n}\n.info-item.comment[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  word-wrap: break-word;\n  word-break: break-word;\n  white-space: pre-wrap;\n  max-width: 100%;\n  overflow-wrap: break-word;\n  -webkit-hyphens: auto;\n  hyphens: auto;\n}\n.info-item[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: rgba(0, 0, 0, 0.6);\n  font-size: 14px;\n  font-weight: 500;\n}\n.info-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 400;\n}\n@media (max-width: 768px) {\n  .main-content[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .unit-info-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .empty-state[_ngcontent-%COMP%] {\n    padding: 32px 16px;\n  }\n  .empty-icon[_ngcontent-%COMP%] {\n    font-size: 48px;\n    width: 48px;\n    height: 48px;\n  }\n}\n.sections-accordion[_ngcontent-%COMP%] {\n  max-width: 900px;\n  margin: 0 auto;\n}\n.unit-section-panel[_ngcontent-%COMP%] {\n  margin-bottom: 8px;\n}\n.unit-section-panel[_ngcontent-%COMP%]   .mat-expansion-panel-header[_ngcontent-%COMP%]   .mat-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n.unit-section-panel[_ngcontent-%COMP%]   mat-panel-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  font-size: 1rem;\n  font-weight: 500;\n}\n.unit-section-panel[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  margin-right: 12px;\n}\n.section-content[_ngcontent-%COMP%] {\n  padding: 0;\n  max-height: 60vh;\n  overflow: auto;\n}\n.section-content[_ngcontent-%COMP%]   .todo-placeholder[_ngcontent-%COMP%] {\n  margin: 16px;\n}\n.section-content[_ngcontent-%COMP%] {\n}\n.todo-placeholder[_ngcontent-%COMP%] {\n  color: #9e9e9e;\n  padding: 15px;\n  border: 1px dashed #e0e0e0;\n  border-radius: 4px;\n  font-style: italic;\n  background-color: #fafafa;\n  margin: 0;\n}\n/*# sourceMappingURL=UnitContent.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UnitContentComponent, [{
    type: Component,
    args: [{ selector: "unit-content", standalone: true, imports: [
      MatButtonModule,
      MatIconModule,
      MatCardModule,
      MatDividerModule,
      MatExpansionModule,
      SoldiersComponent
    ], template: `<div class="main-content">
  @if (selectedUnit(); as unit) {
    <!-- \u0414\u0435\u0442\u0430\u043B\u044C\u043D\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u043E \u043F\u043E\u0434\u0440\u0430\u0437\u0434\u0435\u043B\u0435\u043D\u0438\u0438 -->
    <mat-card class="unit-details-card">
      <mat-card-header>
        <mat-card-title class="info-item inline">
          {{ unit.shortName }}
          @if (unit.isInvolved) {
            <mat-icon>groups</mat-icon>
            <span>\u0415\u043A\u0456\u043F\u0430\u0436/\u0413\u0440\u0443\u043F\u0430</span>
          }
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
            @if (unit.militaryNumber) {
              <div class="info-item inline">
                <strong>\u0412\u0456\u0439\u0441\u044C\u043A\u043E\u0432\u0430 \u0447\u0430\u0441\u0442\u0438\u043D\u0430:</strong>
                <span>{{ unit.militaryNumber }}</span>
              </div>
            }

            <div class="info-item inline">
              <strong>\u0422\u0438\u043F \u0441\u0438\u043B:</strong>
              <span>{{ unit.forceType || '\u041D\u0435 \u0432\u043A\u0430\u0437\u0430\u043D\u043E' }}</span>
            </div>

            <div class="info-item inline">
              <strong>\u0422\u0438\u043F \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0443:</strong>
              <span>{{ unit.unitType || '\u041D\u0435 \u0432\u043A\u0430\u0437\u0430\u043D\u043E' }}</span>
            </div>

            @if (unit.assignedShortName) {
              <div class="info-item inline">
                <strong>\u041F\u0440\u0438\u0434\u0430\u043D\u0438\u0439 \u0434\u043E:</strong>
                <span>{{ unit.assignedShortName }}</span>
              </div>
            }
          }

          <div class="info-item inline">
            <strong>\u041F\u041F\u0414:</strong>
            <span>{{ unit.persistentLocation || '\u041D\u0435 \u0432\u043A\u0430\u0437\u0430\u043D\u043E' }}</span>
          </div>

          <!-- 
          <div class="info-item inline">
            <strong>\u041F\u043E\u0440\u044F\u0434\u043E\u043A:</strong>
            <span>{{ unit.orderVal }}</span>
          </div>
          -->

          @if (unit.comment) {
            <div class="info-item full-width comment">
              <strong>\u041A\u043E\u043C\u0435\u043D\u0442\u0430\u0440:</strong>
              <span>{{ unit.comment }}</span>
            </div>
          }
        </div>
      </mat-card-content>
    </mat-card>

    <mat-accordion class="sections-accordion">
      <!-- \u041E\u0441\u043E\u0431\u043E\u0432\u0438\u0439 \u0441\u043A\u043B\u0430\u0434 -->
      <mat-expansion-panel class="unit-section-panel" (opened)="soldiersPanelOpened.set(true)">
        <mat-expansion-panel-header>
          <mat-panel-title>
            <mat-icon color="primary">group</mat-icon>
            \u041E\u0441\u043E\u0431\u043E\u0432\u0438\u0439 \u0441\u043A\u043B\u0430\u0434
          </mat-panel-title>
        </mat-expansion-panel-header>

        <div class="section-content">
          @if (soldiersPanelOpened()) {
            <app-page-soldiers [unitId]="unit.id"></app-page-soldiers>
          }
        </div>
      </mat-expansion-panel>

      <!-- \u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u0441\u0435\u043A\u0446\u0438\u0438 \u0441 expansion panels -->
      <mat-expansion-panel class="unit-section-panel">
        <mat-expansion-panel-header>
          <mat-panel-title>
            <mat-icon color="primary">gavel</mat-icon>
            \u0411\u043E\u0439\u043E\u0432\u0456 \u0440\u043E\u0437\u043F\u043E\u0440\u044F\u0434\u0436\u0435\u043D\u043D\u044F
          </mat-panel-title>
        </mat-expansion-panel-header>

        <div class="section-content">
          <p class="todo-placeholder">[TODO: \u0422\u0443\u0442 \u0431\u0443\u0434\u0435 \u0441\u043F\u0438\u0441\u043E\u043A \u0431\u043E\u0439\u043E\u0432\u0438\u0445 \u0440\u043E\u0437\u043F\u043E\u0440\u044F\u0434\u0436\u0435\u043D\u044C \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0443]</p>
        </div>
      </mat-expansion-panel>

      <mat-expansion-panel class="unit-section-panel">
        <mat-expansion-panel-header>
          <mat-panel-title>
            <mat-icon color="primary">send</mat-icon>
            \u0411\u043E\u0439\u043E\u0432\u0456 \u0434\u043E\u043D\u0435\u0441\u0435\u043D\u043D\u044F
          </mat-panel-title>
        </mat-expansion-panel-header>

        <div class="section-content">
          <p class="todo-placeholder">[TODO: \u0422\u0443\u0442 \u0431\u0443\u0434\u0435 \u0441\u043F\u0438\u0441\u043E\u043A \u0431\u043E\u0439\u043E\u0432\u0438\u0445 \u0434\u043E\u043D\u0435\u0441\u0435\u043D\u044C \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0443]</p>
        </div>
      </mat-expansion-panel>

      <mat-expansion-panel class="unit-section-panel">
        <mat-expansion-panel-header>
          <mat-panel-title>
            <mat-icon color="primary">info</mat-icon>
            \u0414\u043E\u0434\u0430\u0442\u043A\u043E\u0432\u0430 \u0456\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0456\u044F
          </mat-panel-title>
        </mat-expansion-panel-header>

        <div class="section-content">
          <p class="todo-placeholder">
            [TODO: \u0426\u044F \u0441\u0435\u043A\u0446\u0456\u044F \u0437\u0430\u0440\u0435\u0437\u0435\u0440\u0432\u043E\u0432\u0430\u043D\u0430 \u0434\u043B\u044F \u043C\u0430\u0439\u0431\u0443\u0442\u043D\u0456\u0445 \u0434\u0430\u043D\u0438\u0445, \u044F\u043A\u0456 \u0449\u0435 \u043D\u0435 \u0432\u0438\u0437\u043D\u0430\u0447\u0435\u043D\u0456.]
          </p>
        </div>
      </mat-expansion-panel>
    </mat-accordion>
  }
</div>
`, styles: ['@charset "UTF-8";\n\n/* src/app/Unit/UnitContent.component.scss */\n:host {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  overflow: hidden;\n}\n.main-content {\n  padding: 24px;\n  width: 95%;\n  flex: 1;\n  min-height: 0;\n  overflow-y: auto;\n}\n.unit-details-card {\n  width: 100%;\n  margin: 0 0 20px 0;\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);\n}\n.unit-info-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 16px;\n  margin-bottom: 16px;\n}\n.info-item {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.info-item.inline {\n  flex-direction: row;\n  align-items: center;\n  gap: 8px;\n}\n.info-item.full-width {\n  grid-column: 1/-1;\n}\n.info-item.comment {\n  flex-direction: column;\n  gap: 8px;\n}\n.info-item.comment span {\n  word-wrap: break-word;\n  word-break: break-word;\n  white-space: pre-wrap;\n  max-width: 100%;\n  overflow-wrap: break-word;\n  -webkit-hyphens: auto;\n  hyphens: auto;\n}\n.info-item strong {\n  color: rgba(0, 0, 0, 0.6);\n  font-size: 14px;\n  font-weight: 500;\n}\n.info-item span {\n  font-size: 16px;\n  font-weight: 400;\n}\n@media (max-width: 768px) {\n  .main-content {\n    padding: 16px;\n  }\n  .unit-info-grid {\n    grid-template-columns: 1fr;\n  }\n  .empty-state {\n    padding: 32px 16px;\n  }\n  .empty-icon {\n    font-size: 48px;\n    width: 48px;\n    height: 48px;\n  }\n}\n.sections-accordion {\n  max-width: 900px;\n  margin: 0 auto;\n}\n.unit-section-panel {\n  margin-bottom: 8px;\n}\n.unit-section-panel .mat-expansion-panel-header .mat-content {\n  display: flex;\n  align-items: center;\n}\n.unit-section-panel mat-panel-title {\n  display: flex;\n  align-items: center;\n  font-size: 1rem;\n  font-weight: 500;\n}\n.unit-section-panel mat-icon {\n  margin-right: 12px;\n}\n.section-content {\n  padding: 0;\n  max-height: 60vh;\n  overflow: auto;\n}\n.section-content .todo-placeholder {\n  margin: 16px;\n}\n.section-content {\n}\n.todo-placeholder {\n  color: #9e9e9e;\n  padding: 15px;\n  border: 1px dashed #e0e0e0;\n  border-radius: 4px;\n  font-style: italic;\n  background-color: #fafafa;\n  margin: 0;\n}\n/*# sourceMappingURL=UnitContent.component.css.map */\n'] }]
  }], null, { selectedUnit: [{ type: Input, args: [{ isSignal: true, alias: "selectedUnit", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UnitContentComponent, { className: "UnitContentComponent", filePath: "app/Unit/UnitContent.component.ts", lineNumber: 24 });
})();

// src/app/dialogs/DictAreaSelect-dialog.component.ts
function DictAreaSelectDialogComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 11);
    \u0275\u0275listener("click", function DictAreaSelectDialogComponent_Conditional_12_Template_button_click_0_listener() {
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
function DictAreaSelectDialogComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "mat-icon", 12);
    \u0275\u0275text(2, "refresh");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F...");
    \u0275\u0275elementEnd()();
  }
}
function DictAreaSelectDialogComponent_Conditional_19_th_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 24);
    \u0275\u0275text(1, "\u041D\u0430\u0437\u0432\u0430");
    \u0275\u0275elementEnd();
  }
}
function DictAreaSelectDialogComponent_Conditional_19_td_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r3.value);
  }
}
function DictAreaSelectDialogComponent_Conditional_19_th_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 24);
    \u0275\u0275text(1, "\u0422\u0438\u043F \u0420\u0412\u0417");
    \u0275\u0275elementEnd();
  }
}
function DictAreaSelectDialogComponent_Conditional_19_td_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r4.areaType);
  }
}
function DictAreaSelectDialogComponent_Conditional_19_th_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 24);
    \u0275\u0275text(1, "\u041A\u043E\u0434\u0438\u0444\u0456\u043A\u0430\u0442\u043E\u0440");
    \u0275\u0275elementEnd();
  }
}
function DictAreaSelectDialogComponent_Conditional_19_td_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getCityCodeDisplay(item_r5.cityCodeInfo));
  }
}
function DictAreaSelectDialogComponent_Conditional_19_th_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 24);
    \u0275\u0275text(1, "\u041A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442\u0438");
    \u0275\u0275elementEnd();
  }
}
function DictAreaSelectDialogComponent_Conditional_19_td_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r6.coords);
  }
}
function DictAreaSelectDialogComponent_Conditional_19_tr_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 27);
  }
}
function DictAreaSelectDialogComponent_Conditional_19_tr_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 28);
    \u0275\u0275listener("click", function DictAreaSelectDialogComponent_Conditional_19_tr_14_Template_tr_click_0_listener() {
      const row_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.selectArea(row_r8));
    });
    \u0275\u0275elementEnd();
  }
}
function DictAreaSelectDialogComponent_Conditional_19_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23)(1, "mat-icon");
    \u0275\u0275text(2, "folder_open");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u0420\u0430\u0439\u043E\u043D\u0438 \u043D\u0435 \u0437\u043D\u0430\u0439\u0434\u0435\u043D\u043E");
    \u0275\u0275elementEnd()();
  }
}
function DictAreaSelectDialogComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 13);
    \u0275\u0275elementContainerStart(1, 14);
    \u0275\u0275template(2, DictAreaSelectDialogComponent_Conditional_19_th_2_Template, 2, 0, "th", 15)(3, DictAreaSelectDialogComponent_Conditional_19_td_3_Template, 2, 1, "td", 16);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(4, 17);
    \u0275\u0275template(5, DictAreaSelectDialogComponent_Conditional_19_th_5_Template, 2, 0, "th", 15)(6, DictAreaSelectDialogComponent_Conditional_19_td_6_Template, 2, 1, "td", 16);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(7, 18);
    \u0275\u0275template(8, DictAreaSelectDialogComponent_Conditional_19_th_8_Template, 2, 0, "th", 15)(9, DictAreaSelectDialogComponent_Conditional_19_td_9_Template, 2, 1, "td", 16);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(10, 19);
    \u0275\u0275template(11, DictAreaSelectDialogComponent_Conditional_19_th_11_Template, 2, 0, "th", 15)(12, DictAreaSelectDialogComponent_Conditional_19_td_12_Template, 2, 1, "td", 20);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(13, DictAreaSelectDialogComponent_Conditional_19_tr_13_Template, 1, 0, "tr", 21)(14, DictAreaSelectDialogComponent_Conditional_19_tr_14_Template, 1, 0, "tr", 22);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(15, DictAreaSelectDialogComponent_Conditional_19_Conditional_15_Template, 5, 0, "div", 23);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("dataSource", ctx_r1.dataSource);
    \u0275\u0275advance(13);
    \u0275\u0275property("matHeaderRowDef", ctx_r1.displayedColumns)("matHeaderRowDefSticky", true);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r1.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.items().length === 0 ? 15 : -1);
  }
}
var DictAreaSelectDialogComponent = class _DictAreaSelectDialogComponent {
  dialogRef;
  data;
  dictAreasService = inject(DictAreasService);
  snackBar = inject(MatSnackBar);
  items = signal([], ...ngDevMode ? [{ debugName: "items" }] : []);
  dataSource = new MatTableDataSource([]);
  displayedColumns = ["value", "areaType", "cityCode", "coords"];
  isLoading = signal(false, ...ngDevMode ? [{ debugName: "isLoading" }] : []);
  searchTerm = signal("", ...ngDevMode ? [{ debugName: "searchTerm" }] : []);
  dialogTitle = signal("\u0412\u0438\u0431\u0456\u0440 \u0440\u0430\u0439\u043E\u043D\u0443 \u0432\u0438\u043A\u043E\u043D\u0430\u043D\u043D\u044F \u0437\u0430\u0432\u0434\u0430\u043D\u044C", ...ngDevMode ? [{ debugName: "dialogTitle" }] : []);
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
    const search = this.searchTerm() || void 0;
    const areaTypeId = this.data?.areaTypeId;
    this.dictAreasService.getAll(search, areaTypeId).subscribe({
      next: (areas) => {
        this.items.set(areas);
        this.dataSource.data = areas;
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u0440\u0430\u0439\u043E\u043D\u0456\u0432:", error);
        const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u0440\u0430\u0439\u043E\u043D\u0456\u0432");
        this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
        this.isLoading.set(false);
      }
    });
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
  selectArea(area) {
    this.dialogRef.close(area);
  }
  getCityCodeDisplay(cityCodeInfo) {
    return this.dictAreasService.buildCityCodeDisplayValue(cityCodeInfo);
  }
  onCancel() {
    this.dialogRef.close();
  }
  static \u0275fac = function DictAreaSelectDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DictAreaSelectDialogComponent)(\u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DictAreaSelectDialogComponent, selectors: [["dict-area-select-dialog"]], decls: 23, vars: 5, consts: [["mat-dialog-title", ""], [1, "dialog-content"], [1, "action-panel"], ["appearance", "outline", 1, "search-field"], ["matInput", "", "placeholder", "\u0412\u0432\u0435\u0434\u0456\u0442\u044C \u043D\u0430\u0437\u0432\u0443 \u0434\u043B\u044F \u043F\u043E\u0448\u0443\u043A\u0443", 3, "ngModelChange", "ngModel"], ["mat-icon-button", "", "matSuffix", ""], ["mat-raised-button", "", "color", "primary", 3, "click"], [1, "table-container"], [1, "loading-container"], ["align", "end"], ["mat-button", "", 3, "click"], ["mat-icon-button", "", "matSuffix", "", 3, "click"], [1, "loading-spinner"], ["mat-table", "", "matSort", "", 1, "selection-table", 3, "dataSource"], ["matColumnDef", "value"], ["mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "areaType"], ["matColumnDef", "cityCode"], ["matColumnDef", "coords"], ["mat-cell", "", "class", "coords-column", 4, "matCellDef"], ["mat-header-row", "", 4, "matHeaderRowDef", "matHeaderRowDefSticky"], ["mat-row", "", "class", "selectable-row", 3, "click", 4, "matRowDef", "matRowDefColumns"], [1, "no-data"], ["mat-header-cell", "", "mat-sort-header", ""], ["mat-cell", ""], ["mat-cell", "", 1, "coords-column"], ["mat-header-row", ""], ["mat-row", "", 1, "selectable-row", 3, "click"]], template: function DictAreaSelectDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "h2", 0);
      \u0275\u0275text(1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(2, "mat-dialog-content")(3, "div", 1)(4, "div", 2)(5, "mat-form-field", 3)(6, "mat-label");
      \u0275\u0275text(7, "\u041F\u043E\u0448\u0443\u043A");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "input", 4);
      \u0275\u0275twoWayListener("ngModelChange", function DictAreaSelectDialogComponent_Template_input_ngModelChange_8_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event);
        return $event;
      });
      \u0275\u0275listener("ngModelChange", function DictAreaSelectDialogComponent_Template_input_ngModelChange_8_listener() {
        return ctx.onSearchChange();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "button", 5)(10, "mat-icon");
      \u0275\u0275text(11, "search");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(12, DictAreaSelectDialogComponent_Conditional_12_Template, 3, 1, "button", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "button", 6);
      \u0275\u0275listener("click", function DictAreaSelectDialogComponent_Template_button_click_13_listener() {
        return ctx.reload();
      });
      \u0275\u0275elementStart(14, "mat-icon");
      \u0275\u0275text(15, "refresh");
      \u0275\u0275elementEnd();
      \u0275\u0275text(16, " \u041E\u043D\u043E\u0432\u0438\u0442\u0438 ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "div", 7);
      \u0275\u0275conditionalCreate(18, DictAreaSelectDialogComponent_Conditional_18_Template, 5, 0, "div", 8)(19, DictAreaSelectDialogComponent_Conditional_19_Template, 16, 5);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(20, "mat-dialog-actions", 9)(21, "button", 10);
      \u0275\u0275listener("click", function DictAreaSelectDialogComponent_Template_button_click_21_listener() {
        return ctx.onCancel();
      });
      \u0275\u0275text(22, "\u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438");
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
      \u0275\u0275advance(6);
      \u0275\u0275conditional(ctx.isLoading() ? 18 : 19);
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
    NgControlStatus,
    NgModel
  ], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n.dialog-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 70vh;\n  max-height: 70vh;\n  min-height: 400px;\n}\n.action-panel[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n  margin-bottom: 16px;\n  padding: 8px;\n  background-color: #fafafa;\n  border-radius: 4px;\n}\n.search-field[_ngcontent-%COMP%] {\n  flex: 1;\n  max-width: 400px;\n}\n.table-container[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow: auto;\n  border: 1px solid #e0e0e0;\n  border-radius: 4px;\n}\n.selection-table[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.selectable-row[_ngcontent-%COMP%] {\n  cursor: pointer;\n  transition: background-color 0.2s;\n}\n.selectable-row[_ngcontent-%COMP%]:hover {\n  background-color: #f5f5f5;\n}\n.coords-column[_ngcontent-%COMP%] {\n  max-width: 200px;\n  white-space: pre-wrap;\n  word-break: break-word;\n  line-height: 1.4;\n}\n.loading-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 40px;\n  gap: 16px;\n}\n.loading-container[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%] {\n  font-size: 48px;\n  width: 48px;\n  height: 48px;\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n  color: #1976d2;\n}\n.loading-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #666;\n}\n.no-data[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 40px;\n  color: #666;\n}\n.no-data[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  width: 48px;\n  height: 48px;\n  color: #ccc;\n  margin-bottom: 16px;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n/*# sourceMappingURL=DictAreaSelect-dialog.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DictAreaSelectDialogComponent, [{
    type: Component,
    args: [{ selector: "dict-area-select-dialog", standalone: true, imports: [
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
        <div class="table-container">
          @if (isLoading()) {
            <div class="loading-container">
              <mat-icon class="loading-spinner">refresh</mat-icon>
              <p>\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F...</p>
            </div>
          } @else {
            <table mat-table [dataSource]="dataSource" matSort class="selection-table">
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

              <!-- Coords Column -->
              <ng-container matColumnDef="coords">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>\u041A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442\u0438</th>
                <td mat-cell *matCellDef="let item" class="coords-column">{{ item.coords }}</td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns; sticky: true"></tr>
              <tr
                mat-row
                *matRowDef="let row; columns: displayedColumns"
                (click)="selectArea(row)"
                class="selectable-row"
              ></tr>
            </table>

            @if (items().length === 0) {
              <div class="no-data">
                <mat-icon>folder_open</mat-icon>
                <p>\u0420\u0430\u0439\u043E\u043D\u0438 \u043D\u0435 \u0437\u043D\u0430\u0439\u0434\u0435\u043D\u043E</p>
              </div>
            }
          }
        </div>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">\u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438</button>
    </mat-dialog-actions>
  `, styles: ["/* angular:styles/component:css;09ec6b9b702a627037e89f55c781d922a33b6c59c21aa39343d407ce72d679ed;/home/havrok/projects/work/411/s5/s5app/Menu/S5Server/Front/src/app/dialogs/DictAreaSelect-dialog.component.ts */\n:host {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n.dialog-content {\n  display: flex;\n  flex-direction: column;\n  height: 70vh;\n  max-height: 70vh;\n  min-height: 400px;\n}\n.action-panel {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n  margin-bottom: 16px;\n  padding: 8px;\n  background-color: #fafafa;\n  border-radius: 4px;\n}\n.search-field {\n  flex: 1;\n  max-width: 400px;\n}\n.table-container {\n  flex: 1;\n  overflow: auto;\n  border: 1px solid #e0e0e0;\n  border-radius: 4px;\n}\n.selection-table {\n  width: 100%;\n}\n.selectable-row {\n  cursor: pointer;\n  transition: background-color 0.2s;\n}\n.selectable-row:hover {\n  background-color: #f5f5f5;\n}\n.coords-column {\n  max-width: 200px;\n  white-space: pre-wrap;\n  word-break: break-word;\n  line-height: 1.4;\n}\n.loading-container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 40px;\n  gap: 16px;\n}\n.loading-container .loading-spinner {\n  font-size: 48px;\n  width: 48px;\n  height: 48px;\n  animation: spin 1s linear infinite;\n  color: #1976d2;\n}\n.loading-container p {\n  color: #666;\n}\n.no-data {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 40px;\n  color: #666;\n}\n.no-data mat-icon {\n  font-size: 48px;\n  width: 48px;\n  height: 48px;\n  color: #ccc;\n  margin-bottom: 16px;\n}\n@keyframes spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n/*# sourceMappingURL=DictAreaSelect-dialog.component.css.map */\n"] }]
  }], () => [{ type: MatDialogRef }, { type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DictAreaSelectDialogComponent, { className: "DictAreaSelectDialogComponent", filePath: "app/dialogs/DictAreaSelect-dialog.component.ts", lineNumber: 238 });
})();

// src/app/dialogs/UnitDialog.ts
var _forTrack02 = ($index, $item) => $item.id;
function UnitDialogComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 11);
    \u0275\u0275text(1, "\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F...");
    \u0275\u0275elementEnd();
  }
}
function UnitDialogComponent_For_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 10);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const unit_r2 = ctx.$implicit;
    \u0275\u0275property("value", unit_r2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(unit_r2.value);
  }
}
function UnitDialogComponent_For_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 10);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const force_r3 = ctx.$implicit;
    \u0275\u0275property("value", force_r3.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(force_r3.value);
  }
}
function UnitDialogComponent_Conditional_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 11);
    \u0275\u0275text(1, "\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F...");
    \u0275\u0275elementEnd();
  }
}
function UnitDialogComponent_For_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 10);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const unitType_r4 = ctx.$implicit;
    \u0275\u0275property("value", unitType_r4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(unitType_r4.value);
  }
}
function UnitDialogComponent_Conditional_54_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 23);
    \u0275\u0275listener("click", function UnitDialogComponent_Conditional_54_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r5 = \u0275\u0275nextContext();
      ctx_r5.clearPersistentLocation();
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "close");
    \u0275\u0275elementEnd()();
  }
}
function UnitDialogComponent_Conditional_63_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 11);
    \u0275\u0275text(1, "\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F...");
    \u0275\u0275elementEnd();
  }
}
function UnitDialogComponent_For_65_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 10);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const unit_r7 = ctx.$implicit;
    \u0275\u0275property("value", unit_r7);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(unit_r7.value);
  }
}
var UnitDialogComponent = class _UnitDialogComponent {
  data;
  ref;
  unitService = inject(UnitService);
  dictForcesTypeService = inject(DictForcesTypeService);
  dictUnitTypeService = inject(DictUnitTypeService);
  dictAreasService = inject(DictAreasService);
  cdr = inject(ChangeDetectorRef);
  snackBar = inject(MatSnackBar);
  dialog = inject(MatDialog);
  dictForcesTypes = [];
  // Для автокомплита родительского подразделения
  parentSearchControl = new FormControl(null);
  filteredParentUnits;
  isLoadingParents = false;
  selectedParent = null;
  // Для автокомплита приданного подразделения
  assignedSearchControl = new FormControl(null);
  filteredAssignedUnits;
  isLoadingAssigned = false;
  selectedAssigned = null;
  // Для автокомплита типа подразделения
  unitTypeSearchControl = new FormControl(null);
  filteredUnitTypes;
  isLoadingUnitTypes = false;
  selectedUnitType = null;
  // Для вибору пункту постійної дислокації (ППД) через діалог
  selectedPersistentLocation = null;
  constructor(data, ref) {
    this.data = data;
    this.ref = ref;
    if (!data.orderVal) {
      data.orderVal = 1;
    }
    this.filteredParentUnits = this.parentSearchControl.valueChanges.pipe(startWith(""), debounceTime(300), distinctUntilChanged(), switchMap((value) => {
      const searchTerm = typeof value === "string" ? value : value && typeof value === "object" && "value" in value ? value.value : "";
      if (searchTerm && searchTerm.length >= 2) {
        this.isLoadingParents = true;
        return this.unitService.lookup(searchTerm, false).pipe(finalize(() => this.isLoadingParents = false));
      }
      return of([]);
    }));
    this.filteredAssignedUnits = this.assignedSearchControl.valueChanges.pipe(startWith(""), debounceTime(300), distinctUntilChanged(), switchMap((value) => {
      const searchTerm = typeof value === "string" ? value : value && typeof value === "object" && "value" in value ? value.value : "";
      if (searchTerm && searchTerm.length >= 2) {
        this.isLoadingAssigned = true;
        return this.unitService.lookup(searchTerm, false).pipe(finalize(() => this.isLoadingAssigned = false));
      }
      return of([]);
    }));
    this.filteredUnitTypes = this.unitTypeSearchControl.valueChanges.pipe(startWith(""), debounceTime(300), distinctUntilChanged(), switchMap((value) => {
      const searchTerm = typeof value === "string" ? value : value && typeof value === "object" && "value" in value ? value.value : "";
      if (searchTerm && searchTerm.length >= 2) {
        this.isLoadingUnitTypes = true;
        return this.dictUnitTypeService.lookup(searchTerm, 10).pipe(finalize(() => this.isLoadingUnitTypes = false));
      }
      return of([]);
    }));
  }
  ngOnInit() {
    this.loadData();
    if (this.data.parentId) {
      this.unitService.getById(this.data.parentId).subscribe({
        next: (parent) => {
          this.selectedParent = { id: parent.id, value: parent.shortName || parent.name };
          this.parentSearchControl.setValue(this.selectedParent);
        },
        error: (error) => {
          const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0438\u0442\u0438 \u043E\u0441\u043D\u043E\u0432\u043D\u0438\u0439 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B");
          this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
        }
      });
    }
    if (this.data.assignedUnitId) {
      this.unitService.getById(this.data.assignedUnitId).subscribe({
        next: (assigned) => {
          this.selectedAssigned = { id: assigned.id, value: assigned.shortName || assigned.name };
          this.assignedSearchControl.setValue(this.selectedAssigned);
        },
        error: (error) => {
          const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0438\u0442\u0438 \u043F\u0440\u0438\u0434\u0430\u043D\u0438\u0439 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B");
          this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
        }
      });
    }
    if (this.data.unitTypeId) {
      this.dictUnitTypeService.get(this.data.unitTypeId).subscribe({
        next: (unitType) => {
          this.selectedUnitType = { id: unitType.id, value: unitType.value };
          this.unitTypeSearchControl.setValue(this.selectedUnitType);
        },
        error: (error) => {
          const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0438\u0442\u0438 \u0442\u0438\u043F \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0443");
          this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
        }
      });
    }
    if (this.data.persistentLocationId) {
      this.dictAreasService.getById(this.data.persistentLocationId).subscribe({
        next: (area) => {
          this.selectedPersistentLocation = area;
        },
        error: (error) => {
          const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0438\u0442\u0438 \u043F\u0443\u043D\u043A\u0442 \u043F\u043E\u0441\u0442\u0456\u0439\u043D\u043E\u0457 \u0434\u0438\u0441\u043B\u043E\u043A\u0430\u0446\u0456\u0457");
          this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
        }
      });
    }
  }
  loadData() {
    this.dictForcesTypeService.getAll().subscribe({
      next: (forces) => {
        this.dictForcesTypes = forces;
        this.cdr.detectChanges();
      },
      error: (error) => {
        const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0438\u0442\u0438 \u0441\u043F\u0438\u0441\u043E\u043A \u0432\u0438\u0434\u0456\u0432 \u0437\u0431\u0440\u043E\u0439\u043D\u0438\u0445 \u0441\u0438\u043B");
        this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
      }
    });
  }
  // Методы для автокомплита родительского подразделения
  displayParentFn = (parent) => {
    return parent ? parent.value : "";
  };
  onParentSelected(event) {
    const selectedUnit = event.option.value;
    this.selectedParent = selectedUnit;
    this.data.parentId = selectedUnit ? selectedUnit.id : void 0;
  }
  // Методы для автокомплита приданного подразделения
  displayAssignedFn = (assigned) => {
    return assigned ? assigned.value : "";
  };
  onAssignedSelected(event) {
    const selectedUnit = event.option.value;
    this.selectedAssigned = selectedUnit;
    this.data.assignedUnitId = selectedUnit ? selectedUnit.id : void 0;
  }
  // Методы для автокомплита типа подразделения
  displayUnitTypeFn = (unitType) => {
    return unitType ? unitType.value : "";
  };
  onUnitTypeSelected(event) {
    const selectedType = event.option.value;
    this.selectedUnitType = selectedType;
    this.data.unitTypeId = selectedType ? selectedType.id : void 0;
  }
  // Методи для вибору пункту постійної дислокації через діалог
  openPersistentLocationDialog() {
    const dialogRef = this.dialog.open(DictAreaSelectDialogComponent, {
      width: "900px",
      data: {
        areaTypeId: PPD_AREA_TYPE_GUID,
        title: "\u0412\u0438\u0431\u0456\u0440 \u043F\u0443\u043D\u043A\u0442\u0443 \u043F\u043E\u0441\u0442\u0456\u0439\u043D\u043E\u0457 \u0434\u0438\u0441\u043B\u043E\u043A\u0430\u0446\u0456\u0457 (\u041F\u041F\u0414)"
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedPersistentLocation = result;
        this.data.persistentLocationId = result.id;
        this.data.persistentLocation = result.value;
        this.cdr.detectChanges();
      }
    });
  }
  clearPersistentLocation() {
    this.selectedPersistentLocation = null;
    this.data.persistentLocationId = void 0;
    this.data.persistentLocation = void 0;
    this.cdr.detectChanges();
  }
  onCancel() {
    this.ref.close();
  }
  onSave() {
    this.ref.close(this.data);
  }
  static \u0275fac = function UnitDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UnitDialogComponent)(\u0275\u0275directiveInject(MAT_DIALOG_DATA), \u0275\u0275directiveInject(MatDialogRef));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UnitDialogComponent, selectors: [["unit-dialog"]], decls: 80, vars: 32, consts: [["parentAuto", "matAutocomplete"], ["unitTypeAuto", "matAutocomplete"], ["assignedAuto", "matAutocomplete"], ["mat-dialog-title", ""], ["mat-dialog-content", "", 1, "content"], ["appearance", "outline", "floatLabel", "always"], ["matInput", "", "required", "", 3, "ngModelChange", "ngModel"], ["matInput", "", 3, "ngModelChange", "ngModel"], ["type", "text", "matInput", "", "placeholder", "\u0411\u0430\u0442\u044C\u043A\u0456\u0432\u0441\u044C\u043A\u0438\u0439 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B", 3, "formControl", "matAutocomplete"], [3, "optionSelected", "displayWith"], [3, "value"], ["disabled", ""], [3, "ngModelChange", "ngModel"], ["type", "text", "matInput", "", "placeholder", "\u0422\u0438\u043F \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0443", 3, "formControl", "matAutocomplete"], ["matInput", "", "readonly", "", "placeholder", "\u041D\u0430\u0442\u0438\u0441\u043D\u0456\u0442\u044C \u0434\u043B\u044F \u0432\u0438\u0431\u043E\u0440\u0443", 2, "cursor", "pointer", 3, "click", "value"], ["mat-icon-button", "", "matSuffix", "", "type", "button", "matTooltip", "\u0412\u0438\u0431\u0440\u0430\u0442\u0438 \u041F\u041F\u0414", 3, "click"], ["mat-icon-button", "", "matSuffix", "", "type", "button", "matTooltip", "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u0438"], ["type", "text", "matInput", "", "placeholder", "\u041F\u0440\u0438\u0434\u0430\u043D\u0438\u0439 \u0434\u043E \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0443", 3, "formControl", "matAutocomplete"], ["matInput", "", "type", "number", "required", "", 3, "ngModelChange", "ngModel"], ["matInput", "", "rows", "3", 3, "ngModelChange", "ngModel"], ["mat-dialog-actions", "", "align", "end", 1, "actions"], ["mat-button", "", 3, "click"], ["mat-raised-button", "", "color", "primary", 3, "click", "disabled"], ["mat-icon-button", "", "matSuffix", "", "type", "button", "matTooltip", "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u0438", 3, "click"]], template: function UnitDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "h2", 3);
      \u0275\u0275text(1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(2, "div", 4)(3, "mat-form-field", 5)(4, "mat-label");
      \u0275\u0275text(5, "\u041D\u0430\u0437\u0432\u0430 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0443");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "input", 6);
      \u0275\u0275twoWayListener("ngModelChange", function UnitDialogComponent_Template_input_ngModelChange_6_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.data.name, $event) || (ctx.data.name = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "mat-form-field", 5)(8, "mat-label");
      \u0275\u0275text(9, "\u0421\u043A\u043E\u0440\u043E\u0447\u0435\u043D\u0430 \u043D\u0430\u0437\u0432\u0430");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "input", 6);
      \u0275\u0275twoWayListener("ngModelChange", function UnitDialogComponent_Template_input_ngModelChange_10_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.data.shortName, $event) || (ctx.data.shortName = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "mat-form-field", 5)(12, "mat-label");
      \u0275\u0275text(13, "\u041D\u043E\u043C\u0435\u0440 \u0432\u0456\u0439\u0441\u044C\u043A\u043E\u0432\u043E\u0457 \u0447\u0430\u0441\u0442\u0438\u043D\u0438 (\u0412/\u0427)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "input", 7);
      \u0275\u0275twoWayListener("ngModelChange", function UnitDialogComponent_Template_input_ngModelChange_14_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.data.militaryNumber, $event) || (ctx.data.militaryNumber = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "mat-form-field", 5)(16, "mat-label");
      \u0275\u0275text(17, "\u041E\u0441\u043D\u043E\u0432\u043D\u0438\u0439 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B");
      \u0275\u0275elementEnd();
      \u0275\u0275element(18, "input", 8);
      \u0275\u0275elementStart(19, "mat-autocomplete", 9, 0);
      \u0275\u0275listener("optionSelected", function UnitDialogComponent_Template_mat_autocomplete_optionSelected_19_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onParentSelected($event));
      });
      \u0275\u0275elementStart(21, "mat-option", 10);
      \u0275\u0275text(22, "\u0411\u0435\u0437 \u043F\u0456\u0434\u043F\u043E\u0440\u044F\u0434\u043A\u0443\u0432\u0430\u043D\u043D\u044F");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(23, UnitDialogComponent_Conditional_23_Template, 2, 0, "mat-option", 11);
      \u0275\u0275repeaterCreate(24, UnitDialogComponent_For_25_Template, 2, 2, "mat-option", 10, _forTrack02);
      \u0275\u0275pipe(26, "async");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(27, "mat-form-field", 5)(28, "mat-label");
      \u0275\u0275text(29, "\u0412\u0438\u0434 \u0437\u0431\u0440\u043E\u0439\u043D\u0438\u0445 \u0441\u0438\u043B");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "mat-select", 12);
      \u0275\u0275twoWayListener("ngModelChange", function UnitDialogComponent_Template_mat_select_ngModelChange_30_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.data.forceTypeId, $event) || (ctx.data.forceTypeId = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementStart(31, "mat-option", 10);
      \u0275\u0275text(32, "\u0412\u0456\u0434\u0441\u0443\u0442\u043D\u0456\u0439");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(33, UnitDialogComponent_For_34_Template, 2, 2, "mat-option", 10, _forTrack02);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(35, "mat-form-field", 5)(36, "mat-label");
      \u0275\u0275text(37, "\u0422\u0438\u043F \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0443");
      \u0275\u0275elementEnd();
      \u0275\u0275element(38, "input", 13);
      \u0275\u0275elementStart(39, "mat-autocomplete", 9, 1);
      \u0275\u0275listener("optionSelected", function UnitDialogComponent_Template_mat_autocomplete_optionSelected_39_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onUnitTypeSelected($event));
      });
      \u0275\u0275elementStart(41, "mat-option", 10);
      \u0275\u0275text(42, "\u0412\u0456\u0434\u0441\u0443\u0442\u043D\u0456\u0439");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(43, UnitDialogComponent_Conditional_43_Template, 2, 0, "mat-option", 11);
      \u0275\u0275repeaterCreate(44, UnitDialogComponent_For_45_Template, 2, 2, "mat-option", 10, _forTrack02);
      \u0275\u0275pipe(46, "async");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(47, "mat-form-field", 5)(48, "mat-label");
      \u0275\u0275text(49, "\u041F\u0443\u043D\u043A\u0442 \u043F\u043E\u0441\u0442\u0456\u0439\u043D\u043E\u0457 \u0434\u0438\u0441\u043B\u043E\u043A\u0430\u0446\u0456\u0457 (\u041F\u041F\u0414)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(50, "input", 14);
      \u0275\u0275listener("click", function UnitDialogComponent_Template_input_click_50_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.openPersistentLocationDialog());
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(51, "button", 15);
      \u0275\u0275listener("click", function UnitDialogComponent_Template_button_click_51_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.openPersistentLocationDialog());
      });
      \u0275\u0275elementStart(52, "mat-icon");
      \u0275\u0275text(53, "search");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(54, UnitDialogComponent_Conditional_54_Template, 3, 0, "button", 16);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(55, "mat-form-field", 5)(56, "mat-label");
      \u0275\u0275text(57, "\u041F\u0440\u0438\u0434\u0430\u043D\u0438\u0439 \u0434\u043E \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0443");
      \u0275\u0275elementEnd();
      \u0275\u0275element(58, "input", 17);
      \u0275\u0275elementStart(59, "mat-autocomplete", 9, 2);
      \u0275\u0275listener("optionSelected", function UnitDialogComponent_Template_mat_autocomplete_optionSelected_59_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onAssignedSelected($event));
      });
      \u0275\u0275elementStart(61, "mat-option", 10);
      \u0275\u0275text(62, "\u041D\u0435 \u043F\u0440\u0438\u0434\u0430\u043D\u0438\u0439");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(63, UnitDialogComponent_Conditional_63_Template, 2, 0, "mat-option", 11);
      \u0275\u0275repeaterCreate(64, UnitDialogComponent_For_65_Template, 2, 2, "mat-option", 10, _forTrack02);
      \u0275\u0275pipe(66, "async");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(67, "mat-form-field", 5)(68, "mat-label");
      \u0275\u0275text(69, "\u041F\u043E\u0440\u044F\u0434\u043E\u043A \u0441\u043E\u0440\u0442\u0443\u0432\u0430\u043D\u043D\u044F");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(70, "input", 18);
      \u0275\u0275twoWayListener("ngModelChange", function UnitDialogComponent_Template_input_ngModelChange_70_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.data.orderVal, $event) || (ctx.data.orderVal = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(71, "mat-form-field", 5)(72, "mat-label");
      \u0275\u0275text(73, "\u041A\u043E\u043C\u0435\u043D\u0442\u0430\u0440");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(74, "textarea", 19);
      \u0275\u0275twoWayListener("ngModelChange", function UnitDialogComponent_Template_textarea_ngModelChange_74_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.data.comment, $event) || (ctx.data.comment = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(75, "div", 20)(76, "button", 21);
      \u0275\u0275listener("click", function UnitDialogComponent_Template_button_click_76_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onCancel());
      });
      \u0275\u0275text(77, "\u0412\u0456\u0434\u043C\u0456\u043D\u0430");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(78, "button", 22);
      \u0275\u0275listener("click", function UnitDialogComponent_Template_button_click_78_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onSave());
      });
      \u0275\u0275text(79, " \u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438 ");
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      const parentAuto_r8 = \u0275\u0275reference(20);
      const unitTypeAuto_r9 = \u0275\u0275reference(40);
      const assignedAuto_r10 = \u0275\u0275reference(60);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate(ctx.data.id ? "\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B" : "\u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438 \u043D\u043E\u0432\u0438\u0439 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B");
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.data.name);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.data.shortName);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.data.militaryNumber);
      \u0275\u0275advance(4);
      \u0275\u0275property("formControl", ctx.parentSearchControl)("matAutocomplete", parentAuto_r8);
      \u0275\u0275advance();
      \u0275\u0275property("displayWith", ctx.displayParentFn);
      \u0275\u0275advance(2);
      \u0275\u0275property("value", null);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.isLoadingParents ? 23 : -1);
      \u0275\u0275advance();
      \u0275\u0275repeater(\u0275\u0275pipeBind1(26, 26, ctx.filteredParentUnits));
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.data.forceTypeId);
      \u0275\u0275advance();
      \u0275\u0275property("value", null);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.dictForcesTypes);
      \u0275\u0275advance(5);
      \u0275\u0275property("formControl", ctx.unitTypeSearchControl)("matAutocomplete", unitTypeAuto_r9);
      \u0275\u0275advance();
      \u0275\u0275property("displayWith", ctx.displayUnitTypeFn);
      \u0275\u0275advance(2);
      \u0275\u0275property("value", null);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.isLoadingUnitTypes ? 43 : -1);
      \u0275\u0275advance();
      \u0275\u0275repeater(\u0275\u0275pipeBind1(46, 28, ctx.filteredUnitTypes));
      \u0275\u0275advance(6);
      \u0275\u0275property("value", ctx.data.persistentLocation || "\u041D\u0435 \u0432\u043A\u0430\u0437\u0430\u043D\u043E");
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.data.persistentLocationId ? 54 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275property("formControl", ctx.assignedSearchControl)("matAutocomplete", assignedAuto_r10);
      \u0275\u0275advance();
      \u0275\u0275property("displayWith", ctx.displayAssignedFn);
      \u0275\u0275advance(2);
      \u0275\u0275property("value", null);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.isLoadingAssigned ? 63 : -1);
      \u0275\u0275advance();
      \u0275\u0275repeater(\u0275\u0275pipeBind1(66, 30, ctx.filteredAssignedUnits));
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.data.orderVal);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.data.comment);
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", !ctx.data.name.trim() || !(ctx.data.shortName == null ? null : ctx.data.shortName.trim()));
    }
  }, dependencies: [
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatSuffix,
    MatInputModule,
    MatInput,
    MatDialogModule,
    MatDialogTitle,
    MatDialogActions,
    MatDialogContent,
    MatButtonModule,
    MatButton,
    MatIconButton,
    FormsModule,
    DefaultValueAccessor,
    NumberValueAccessor,
    NgControlStatus,
    RequiredValidator,
    NgModel,
    ReactiveFormsModule,
    FormControlDirective,
    MatSelectModule,
    MatSelect,
    MatOption,
    MatOptionModule,
    MatAutocompleteModule,
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatIconModule,
    MatIcon,
    MatTooltipModule,
    MatTooltip,
    AsyncPipe
  ], styles: ["\n\n.content[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 12px;\n  min-width: 420px;\n  max-width: 600px;\n  padding-top: 10px !important;\n}\n.content[_ngcontent-%COMP%]   .mat-mdc-form-field[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.actions[_ngcontent-%COMP%] {\n  gap: 8px;\n}\ntextarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  min-height: 60px;\n}\n/*# sourceMappingURL=UnitDialog.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UnitDialogComponent, [{
    type: Component,
    args: [{ selector: "unit-dialog", imports: [
      MatFormFieldModule,
      MatInputModule,
      MatDialogModule,
      MatButtonModule,
      FormsModule,
      ReactiveFormsModule,
      MatSelectModule,
      MatOptionModule,
      MatAutocompleteModule,
      AsyncPipe,
      MatIconModule,
      MatTooltipModule
    ], changeDetection: ChangeDetectionStrategy.OnPush, template: `<h2 mat-dialog-title>{{ data.id ? '\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B' : '\u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438 \u043D\u043E\u0432\u0438\u0439 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B' }}</h2>
<div mat-dialog-content class="content">
  <mat-form-field appearance="outline" floatLabel="always">
    <mat-label>\u041D\u0430\u0437\u0432\u0430 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0443</mat-label>
    <input matInput [(ngModel)]="data.name" required />
  </mat-form-field>

  <mat-form-field appearance="outline" floatLabel="always">
    <mat-label>\u0421\u043A\u043E\u0440\u043E\u0447\u0435\u043D\u0430 \u043D\u0430\u0437\u0432\u0430</mat-label>
    <input matInput [(ngModel)]="data.shortName" required />
  </mat-form-field>

  <mat-form-field appearance="outline" floatLabel="always">
    <mat-label>\u041D\u043E\u043C\u0435\u0440 \u0432\u0456\u0439\u0441\u044C\u043A\u043E\u0432\u043E\u0457 \u0447\u0430\u0441\u0442\u0438\u043D\u0438 (\u0412/\u0427)</mat-label>
    <input matInput [(ngModel)]="data.militaryNumber" />
  </mat-form-field>

  <mat-form-field appearance="outline" floatLabel="always">
    <mat-label>\u041E\u0441\u043D\u043E\u0432\u043D\u0438\u0439 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B</mat-label>
    <input
      type="text"
      matInput
      [formControl]="parentSearchControl"
      [matAutocomplete]="parentAuto"
      placeholder="\u0411\u0430\u0442\u044C\u043A\u0456\u0432\u0441\u044C\u043A\u0438\u0439 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B"
    />
    <mat-autocomplete
      #parentAuto="matAutocomplete"
      [displayWith]="displayParentFn"
      (optionSelected)="onParentSelected($event)"
    >
      <mat-option [value]="null">\u0411\u0435\u0437 \u043F\u0456\u0434\u043F\u043E\u0440\u044F\u0434\u043A\u0443\u0432\u0430\u043D\u043D\u044F</mat-option>
      @if (isLoadingParents) {
        <mat-option disabled>\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F...</mat-option>
      }
      @for (unit of filteredParentUnits | async; track unit.id) {
        <mat-option [value]="unit">{{ unit.value }}</mat-option>
      }
    </mat-autocomplete>
  </mat-form-field>

  <mat-form-field appearance="outline" floatLabel="always">
    <mat-label>\u0412\u0438\u0434 \u0437\u0431\u0440\u043E\u0439\u043D\u0438\u0445 \u0441\u0438\u043B</mat-label>
    <mat-select [(ngModel)]="data.forceTypeId">
      <mat-option [value]="null">\u0412\u0456\u0434\u0441\u0443\u0442\u043D\u0456\u0439</mat-option>
      @for (force of dictForcesTypes; track force.id) {
        <mat-option [value]="force.id">{{ force.value }}</mat-option>
      }
    </mat-select>
  </mat-form-field>

  <mat-form-field appearance="outline" floatLabel="always">
    <mat-label>\u0422\u0438\u043F \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0443</mat-label>
    <input
      type="text"
      matInput
      [formControl]="unitTypeSearchControl"
      [matAutocomplete]="unitTypeAuto"
      placeholder="\u0422\u0438\u043F \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0443"
    />
    <mat-autocomplete
      #unitTypeAuto="matAutocomplete"
      [displayWith]="displayUnitTypeFn"
      (optionSelected)="onUnitTypeSelected($event)"
    >
      <mat-option [value]="null">\u0412\u0456\u0434\u0441\u0443\u0442\u043D\u0456\u0439</mat-option>
      @if (isLoadingUnitTypes) {
        <mat-option disabled>\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F...</mat-option>
      }
      @for (unitType of filteredUnitTypes | async; track unitType.id) {
        <mat-option [value]="unitType">{{ unitType.value }}</mat-option>
      }
    </mat-autocomplete>
  </mat-form-field>

  <mat-form-field appearance="outline" floatLabel="always">
    <mat-label>\u041F\u0443\u043D\u043A\u0442 \u043F\u043E\u0441\u0442\u0456\u0439\u043D\u043E\u0457 \u0434\u0438\u0441\u043B\u043E\u043A\u0430\u0446\u0456\u0457 (\u041F\u041F\u0414)</mat-label>
    <input
      matInput
      [value]="data.persistentLocation || '\u041D\u0435 \u0432\u043A\u0430\u0437\u0430\u043D\u043E'"
      readonly
      (click)="openPersistentLocationDialog()"
      placeholder="\u041D\u0430\u0442\u0438\u0441\u043D\u0456\u0442\u044C \u0434\u043B\u044F \u0432\u0438\u0431\u043E\u0440\u0443"
      style="cursor: pointer"
    />
    <button
      mat-icon-button
      matSuffix
      (click)="openPersistentLocationDialog()"
      type="button"
      matTooltip="\u0412\u0438\u0431\u0440\u0430\u0442\u0438 \u041F\u041F\u0414"
    >
      <mat-icon>search</mat-icon>
    </button>
    @if (data.persistentLocationId) {
      <button
        mat-icon-button
        matSuffix
        (click)="clearPersistentLocation(); $event.stopPropagation()"
        type="button"
        matTooltip="\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u0438"
      >
        <mat-icon>close</mat-icon>
      </button>
    }
  </mat-form-field>

  <mat-form-field appearance="outline" floatLabel="always">
    <mat-label>\u041F\u0440\u0438\u0434\u0430\u043D\u0438\u0439 \u0434\u043E \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0443</mat-label>
    <input
      type="text"
      matInput
      [formControl]="assignedSearchControl"
      [matAutocomplete]="assignedAuto"
      placeholder="\u041F\u0440\u0438\u0434\u0430\u043D\u0438\u0439 \u0434\u043E \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0443"
    />
    <mat-autocomplete
      #assignedAuto="matAutocomplete"
      [displayWith]="displayAssignedFn"
      (optionSelected)="onAssignedSelected($event)"
    >
      <mat-option [value]="null">\u041D\u0435 \u043F\u0440\u0438\u0434\u0430\u043D\u0438\u0439</mat-option>
      @if (isLoadingAssigned) {
        <mat-option disabled>\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F...</mat-option>
      }
      @for (unit of filteredAssignedUnits | async; track unit.id) {
        <mat-option [value]="unit">{{ unit.value }}</mat-option>
      }
    </mat-autocomplete>
  </mat-form-field>

  <mat-form-field appearance="outline" floatLabel="always">
    <mat-label>\u041F\u043E\u0440\u044F\u0434\u043E\u043A \u0441\u043E\u0440\u0442\u0443\u0432\u0430\u043D\u043D\u044F</mat-label>
    <input matInput [(ngModel)]="data.orderVal" type="number" required />
  </mat-form-field>

  <mat-form-field appearance="outline" floatLabel="always">
    <mat-label>\u041A\u043E\u043C\u0435\u043D\u0442\u0430\u0440</mat-label>
    <textarea matInput [(ngModel)]="data.comment" rows="3"></textarea>
  </mat-form-field>
</div>
<div mat-dialog-actions align="end" class="actions">
  <button mat-button (click)="onCancel()">\u0412\u0456\u0434\u043C\u0456\u043D\u0430</button>
  <button
    mat-raised-button
    color="primary"
    (click)="onSave()"
    [disabled]="!data.name.trim() || !data.shortName?.trim()"
  >
    \u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438
  </button>
</div>
`, styles: ["/* src/app/dialogs/UnitDialog.scss */\n.content {\n  display: grid;\n  gap: 12px;\n  min-width: 420px;\n  max-width: 600px;\n  padding-top: 10px !important;\n}\n.content .mat-mdc-form-field {\n  width: 100%;\n}\n.actions {\n  gap: 8px;\n}\ntextarea {\n  resize: vertical;\n  min-height: 60px;\n}\n/*# sourceMappingURL=UnitDialog.css.map */\n"] }]
  }], () => [{ type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }, { type: MatDialogRef }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UnitDialogComponent, { className: "UnitDialogComponent", filePath: "app/dialogs/UnitDialog.ts", lineNumber: 61 });
})();

// src/app/dialogs/InvolvedUnitDialog.ts
var _forTrack03 = ($index, $item) => $item.id;
function InvolvedUnitDialogComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 9);
    \u0275\u0275text(1, "\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F...");
    \u0275\u0275elementEnd();
  }
}
function InvolvedUnitDialogComponent_For_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const location_r2 = ctx.$implicit;
    \u0275\u0275property("value", location_r2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(location_r2.value);
  }
}
var InvolvedUnitDialogComponent = class _InvolvedUnitDialogComponent {
  data;
  ref;
  dictAreasService = inject(DictAreasService);
  snackBar = inject(MatSnackBar);
  // Для автокомпліту пункту постійної дислокації (ППД)
  persistentLocationSearchControl = new FormControl(null);
  filteredPersistentLocations;
  isLoadingPersistentLocations = false;
  selectedPersistentLocation = null;
  constructor(data, ref) {
    this.data = data;
    this.ref = ref;
    if (data.shortName) {
      data.name = data.shortName;
    }
    this.filteredPersistentLocations = this.persistentLocationSearchControl.valueChanges.pipe(startWith(""), debounceTime(300), distinctUntilChanged(), switchMap((value) => {
      const searchTerm = typeof value === "string" ? value : value && typeof value === "object" && "value" in value ? value.value : "";
      if (searchTerm && searchTerm.length >= 2) {
        this.isLoadingPersistentLocations = true;
        return this.dictAreasService.lookup(searchTerm, PPD_AREA_TYPE_GUID, 10).pipe(finalize(() => this.isLoadingPersistentLocations = false));
      }
      return of([]);
    }));
  }
  ngOnInit() {
    if (this.data.persistentLocationId) {
      this.dictAreasService.getById(this.data.persistentLocationId).subscribe({
        next: (area) => {
          this.selectedPersistentLocation = { id: area.id, value: area.value };
          this.persistentLocationSearchControl.setValue(this.selectedPersistentLocation);
        },
        error: (error) => {
          const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0438\u0442\u0438 \u043F\u0443\u043D\u043A\u0442 \u043F\u043E\u0441\u0442\u0456\u0439\u043D\u043E\u0457 \u0434\u0438\u0441\u043B\u043E\u043A\u0430\u0446\u0456\u0457");
          this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
        }
      });
    }
  }
  // Методи для автокомпліту пункту постійної дислокації
  displayPersistentLocationFn = (location) => {
    return location ? location.value : "";
  };
  onPersistentLocationSelected(event) {
    const selectedLocation = event.option.value;
    this.selectedPersistentLocation = selectedLocation;
    this.data.persistentLocationId = selectedLocation ? selectedLocation.id : void 0;
  }
  onShortNameChange() {
    this.data.name = this.data.shortName || "";
  }
  onCancel() {
    this.ref.close();
  }
  onSave() {
    this.data.name = this.data.shortName || "";
    this.ref.close(this.data);
  }
  static \u0275fac = function InvolvedUnitDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InvolvedUnitDialogComponent)(\u0275\u0275directiveInject(MAT_DIALOG_DATA), \u0275\u0275directiveInject(MatDialogRef));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _InvolvedUnitDialogComponent, selectors: [["app-involved-unit-dialog"]], decls: 32, vars: 11, consts: [["persistentLocationAuto", "matAutocomplete"], ["mat-dialog-title", ""], ["mat-dialog-content", "", 1, "content"], ["appearance", "outline", "floatLabel", "always"], ["matInput", "", "required", "", 3, "ngModelChange", "ngModel"], ["matInput", "", "type", "number", "required", "", 3, "ngModelChange", "ngModel"], ["type", "text", "matInput", "", "placeholder", "\u041D\u0430\u0441\u0435\u043B\u0435\u043D\u0438\u0439 \u043F\u0443\u043D\u043A\u0442", 3, "formControl", "matAutocomplete"], [3, "optionSelected", "displayWith"], [3, "value"], ["disabled", ""], ["matInput", "", "rows", "3", 3, "ngModelChange", "ngModel"], ["mat-dialog-actions", "", "align", "end", 1, "actions"], ["mat-button", "", 3, "click"], ["mat-raised-button", "", "color", "primary", 3, "click", "disabled"]], template: function InvolvedUnitDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "h2", 1);
      \u0275\u0275text(1, "\u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438 \u0415\u043A\u0456\u043F\u0430\u0436/\u0413\u0440\u0443\u043F\u0443");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(2, "div", 2)(3, "mat-form-field", 3)(4, "mat-label");
      \u0275\u0275text(5, "\u041D\u0430\u0437\u0432\u0430");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "input", 4);
      \u0275\u0275twoWayListener("ngModelChange", function InvolvedUnitDialogComponent_Template_input_ngModelChange_6_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.data.shortName, $event) || (ctx.data.shortName = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("ngModelChange", function InvolvedUnitDialogComponent_Template_input_ngModelChange_6_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onShortNameChange());
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "mat-form-field", 3)(8, "mat-label");
      \u0275\u0275text(9, "\u041F\u043E\u0440\u044F\u0434\u043E\u043A \u0441\u043E\u0440\u0442\u0443\u0432\u0430\u043D\u043D\u044F");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "input", 5);
      \u0275\u0275twoWayListener("ngModelChange", function InvolvedUnitDialogComponent_Template_input_ngModelChange_10_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.data.orderVal, $event) || (ctx.data.orderVal = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "mat-form-field", 3)(12, "mat-label");
      \u0275\u0275text(13, "\u041F\u0443\u043D\u043A\u0442 \u043F\u043E\u0441\u0442\u0456\u0439\u043D\u043E\u0457 \u0434\u0438\u0441\u043B\u043E\u043A\u0430\u0446\u0456\u0457 (\u041F\u041F\u0414)");
      \u0275\u0275elementEnd();
      \u0275\u0275element(14, "input", 6);
      \u0275\u0275elementStart(15, "mat-autocomplete", 7, 0);
      \u0275\u0275listener("optionSelected", function InvolvedUnitDialogComponent_Template_mat_autocomplete_optionSelected_15_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onPersistentLocationSelected($event));
      });
      \u0275\u0275elementStart(17, "mat-option", 8);
      \u0275\u0275text(18, "\u041D\u0435 \u0432\u043A\u0430\u0437\u0430\u043D\u043E");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(19, InvolvedUnitDialogComponent_Conditional_19_Template, 2, 0, "mat-option", 9);
      \u0275\u0275repeaterCreate(20, InvolvedUnitDialogComponent_For_21_Template, 2, 2, "mat-option", 8, _forTrack03);
      \u0275\u0275pipe(22, "async");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(23, "mat-form-field", 3)(24, "mat-label");
      \u0275\u0275text(25, "\u041A\u043E\u043C\u0435\u043D\u0442\u0430\u0440");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "textarea", 10);
      \u0275\u0275twoWayListener("ngModelChange", function InvolvedUnitDialogComponent_Template_textarea_ngModelChange_26_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.data.comment, $event) || (ctx.data.comment = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(27, "div", 11)(28, "button", 12);
      \u0275\u0275listener("click", function InvolvedUnitDialogComponent_Template_button_click_28_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onCancel());
      });
      \u0275\u0275text(29, "\u0412\u0456\u0434\u043C\u0456\u043D\u0430");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "button", 13);
      \u0275\u0275listener("click", function InvolvedUnitDialogComponent_Template_button_click_30_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onSave());
      });
      \u0275\u0275text(31, " \u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438 ");
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      const persistentLocationAuto_r3 = \u0275\u0275reference(16);
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.data.shortName);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.data.orderVal);
      \u0275\u0275advance(4);
      \u0275\u0275property("formControl", ctx.persistentLocationSearchControl)("matAutocomplete", persistentLocationAuto_r3);
      \u0275\u0275advance();
      \u0275\u0275property("displayWith", ctx.displayPersistentLocationFn);
      \u0275\u0275advance(2);
      \u0275\u0275property("value", null);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.isLoadingPersistentLocations ? 19 : -1);
      \u0275\u0275advance();
      \u0275\u0275repeater(\u0275\u0275pipeBind1(22, 9, ctx.filteredPersistentLocations));
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.data.comment);
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", !(ctx.data.shortName == null ? null : ctx.data.shortName.trim()));
    }
  }, dependencies: [MatFormFieldModule, MatFormField, MatLabel, MatInputModule, MatInput, MatDialogModule, MatDialogTitle, MatDialogActions, MatDialogContent, MatButtonModule, MatButton, FormsModule, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, RequiredValidator, NgModel, ReactiveFormsModule, FormControlDirective, MatAutocompleteModule, MatAutocomplete, MatOption, MatAutocompleteTrigger, AsyncPipe], styles: ["\n\n.content[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 12px;\n  min-width: 420px;\n  max-width: 600px;\n  padding-top: 10px !important;\n}\n.content[_ngcontent-%COMP%]   .mat-mdc-form-field[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.actions[_ngcontent-%COMP%] {\n  gap: 8px;\n}\ntextarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  min-height: 60px;\n}\n/*# sourceMappingURL=involvedUnitDialog.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InvolvedUnitDialogComponent, [{
    type: Component,
    args: [{ selector: "app-involved-unit-dialog", imports: [
      MatFormFieldModule,
      MatInputModule,
      MatDialogModule,
      MatButtonModule,
      FormsModule,
      ReactiveFormsModule,
      MatAutocompleteModule,
      AsyncPipe
    ], changeDetection: ChangeDetectionStrategy.OnPush, template: '<h2 mat-dialog-title>\u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438 \u0415\u043A\u0456\u043F\u0430\u0436/\u0413\u0440\u0443\u043F\u0443</h2>\n<div mat-dialog-content class="content">\n  <mat-form-field appearance="outline" floatLabel="always">\n    <mat-label>\u041D\u0430\u0437\u0432\u0430</mat-label>\n    <input matInput [(ngModel)]="data.shortName" (ngModelChange)="onShortNameChange()" required />\n  </mat-form-field>\n\n  <mat-form-field appearance="outline" floatLabel="always">\n    <mat-label>\u041F\u043E\u0440\u044F\u0434\u043E\u043A \u0441\u043E\u0440\u0442\u0443\u0432\u0430\u043D\u043D\u044F</mat-label>\n    <input matInput [(ngModel)]="data.orderVal" type="number" required />\n  </mat-form-field>\n\n  <mat-form-field appearance="outline" floatLabel="always">\n    <mat-label>\u041F\u0443\u043D\u043A\u0442 \u043F\u043E\u0441\u0442\u0456\u0439\u043D\u043E\u0457 \u0434\u0438\u0441\u043B\u043E\u043A\u0430\u0446\u0456\u0457 (\u041F\u041F\u0414)</mat-label>\n    <input\n      type="text"\n      matInput\n      [formControl]="persistentLocationSearchControl"\n      [matAutocomplete]="persistentLocationAuto"\n      placeholder="\u041D\u0430\u0441\u0435\u043B\u0435\u043D\u0438\u0439 \u043F\u0443\u043D\u043A\u0442"\n    />\n    <mat-autocomplete\n      #persistentLocationAuto="matAutocomplete"\n      [displayWith]="displayPersistentLocationFn"\n      (optionSelected)="onPersistentLocationSelected($event)"\n    >\n      <mat-option [value]="null">\u041D\u0435 \u0432\u043A\u0430\u0437\u0430\u043D\u043E</mat-option>\n      @if (isLoadingPersistentLocations) {\n        <mat-option disabled>\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F...</mat-option>\n      }\n      @for (location of filteredPersistentLocations | async; track location.id) {\n        <mat-option [value]="location">{{ location.value }}</mat-option>\n      }\n    </mat-autocomplete>\n  </mat-form-field>\n\n  <mat-form-field appearance="outline" floatLabel="always">\n    <mat-label>\u041A\u043E\u043C\u0435\u043D\u0442\u0430\u0440</mat-label>\n    <textarea matInput [(ngModel)]="data.comment" rows="3"></textarea>\n  </mat-form-field>\n</div>\n<div mat-dialog-actions align="end" class="actions">\n  <button mat-button (click)="onCancel()">\u0412\u0456\u0434\u043C\u0456\u043D\u0430</button>\n  <button mat-raised-button color="primary" (click)="onSave()" [disabled]="!data.shortName?.trim()">\n    \u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438\n  </button>\n</div>\n', styles: ["/* src/app/dialogs/involvedUnitDialog.scss */\n.content {\n  display: grid;\n  gap: 12px;\n  min-width: 420px;\n  max-width: 600px;\n  padding-top: 10px !important;\n}\n.content .mat-mdc-form-field {\n  width: 100%;\n}\n.actions {\n  gap: 8px;\n}\ntextarea {\n  resize: vertical;\n  min-height: 60px;\n}\n/*# sourceMappingURL=involvedUnitDialog.css.map */\n"] }]
  }], () => [{ type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }, { type: MatDialogRef }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(InvolvedUnitDialogComponent, { className: "InvolvedUnitDialogComponent", filePath: "app/dialogs/InvolvedUnitDialog.ts", lineNumber: 38 });
})();

// src/app/Unit/Unit.page.ts
var _c02 = ["containerRef"];
function UnitsComponent_ng_template_21_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 32);
    \u0275\u0275listener("click", function UnitsComponent_ng_template_21_Conditional_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const node_r4 = \u0275\u0275nextContext().$implicit;
      const menuTrigger_r5 = \u0275\u0275reference(2);
      const ctx_r5 = \u0275\u0275nextContext();
      menuTrigger_r5.closeMenu();
      return \u0275\u0275resetView(ctx_r5.addChild(node_r4));
    });
    \u0275\u0275elementStart(1, "mat-icon", 29);
    \u0275\u0275text(2, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "\u0414\u043E\u0434\u0430\u0442\u0438 \u0434\u043E\u0447\u0456\u0440\u043D\u0456\u0439 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "button", 33);
    \u0275\u0275listener("click", function UnitsComponent_ng_template_21_Conditional_7_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r3);
      const node_r4 = \u0275\u0275nextContext().$implicit;
      const menuTrigger_r5 = \u0275\u0275reference(2);
      const ctx_r5 = \u0275\u0275nextContext();
      menuTrigger_r5.closeMenu();
      return \u0275\u0275resetView(ctx_r5.addInvolvedChild(node_r4));
    });
    \u0275\u0275elementStart(6, "mat-icon");
    \u0275\u0275text(7, "groups");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span");
    \u0275\u0275text(9, "\u0414\u043E\u0434\u0430\u0442\u0438 \u0415\u043A\u0456\u043F\u0430\u0436/\u0413\u0440\u0443\u043F\u0430");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "button", 34);
    \u0275\u0275listener("click", function UnitsComponent_ng_template_21_Conditional_7_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r3);
      const node_r4 = \u0275\u0275nextContext().$implicit;
      const menuTrigger_r5 = \u0275\u0275reference(2);
      const ctx_r5 = \u0275\u0275nextContext();
      menuTrigger_r5.closeMenu();
      return \u0275\u0275resetView(ctx_r5.importSoldiers(node_r4));
    });
    \u0275\u0275elementStart(11, "mat-icon", 29);
    \u0275\u0275text(12, "upload_file");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span");
    \u0275\u0275text(14, "\u0406\u043C\u043F\u043E\u0440\u0442 \u041E\u0421");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const node_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", node_r4.isInvolved);
  }
}
function UnitsComponent_ng_template_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 24)(1, "button", 25, 2);
    \u0275\u0275listener("click", function UnitsComponent_ng_template_21_Template_button_click_1_listener($event) {
      \u0275\u0275restoreView(_r2);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(3, "mat-icon");
    \u0275\u0275text(4, "more_vert");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "mat-menu", null, 3);
    \u0275\u0275conditionalCreate(7, UnitsComponent_ng_template_21_Conditional_7_Template, 15, 1);
    \u0275\u0275elementStart(8, "button", 26);
    \u0275\u0275listener("click", function UnitsComponent_ng_template_21_Template_button_click_8_listener() {
      const node_r4 = \u0275\u0275restoreView(_r2).$implicit;
      const menuTrigger_r5 = \u0275\u0275reference(2);
      const ctx_r5 = \u0275\u0275nextContext();
      menuTrigger_r5.closeMenu();
      return \u0275\u0275resetView(ctx_r5.edit(node_r4));
    });
    \u0275\u0275elementStart(9, "mat-icon", 27);
    \u0275\u0275text(10, "edit");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span");
    \u0275\u0275text(12, "\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "button", 28);
    \u0275\u0275listener("click", function UnitsComponent_ng_template_21_Template_button_click_13_listener() {
      const node_r4 = \u0275\u0275restoreView(_r2).$implicit;
      const menuTrigger_r5 = \u0275\u0275reference(2);
      const ctx_r5 = \u0275\u0275nextContext();
      menuTrigger_r5.closeMenu();
      return \u0275\u0275resetView(ctx_r5.moveUpDown(node_r4, true));
    });
    \u0275\u0275elementStart(14, "mat-icon", 29);
    \u0275\u0275text(15, "arrow_upward");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span");
    \u0275\u0275text(17, "\u0412\u0438\u0449\u0435");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "button", 30);
    \u0275\u0275listener("click", function UnitsComponent_ng_template_21_Template_button_click_18_listener() {
      const node_r4 = \u0275\u0275restoreView(_r2).$implicit;
      const menuTrigger_r5 = \u0275\u0275reference(2);
      const ctx_r5 = \u0275\u0275nextContext();
      menuTrigger_r5.closeMenu();
      return \u0275\u0275resetView(ctx_r5.moveUpDown(node_r4, false));
    });
    \u0275\u0275elementStart(19, "mat-icon", 29);
    \u0275\u0275text(20, "arrow_downward");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "span");
    \u0275\u0275text(22, "\u041D\u0438\u0436\u0447\u0435");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(23, "mat-divider");
    \u0275\u0275elementStart(24, "button", 31);
    \u0275\u0275listener("click", function UnitsComponent_ng_template_21_Template_button_click_24_listener() {
      const node_r4 = \u0275\u0275restoreView(_r2).$implicit;
      const menuTrigger_r5 = \u0275\u0275reference(2);
      const ctx_r5 = \u0275\u0275nextContext();
      menuTrigger_r5.closeMenu();
      return \u0275\u0275resetView(ctx_r5.delete(node_r4));
    });
    \u0275\u0275elementStart(25, "mat-icon");
    \u0275\u0275text(26, "delete");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "span");
    \u0275\u0275text(28, "\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const node_r4 = ctx.$implicit;
    const nodeMenu_r7 = \u0275\u0275reference(6);
    \u0275\u0275advance();
    \u0275\u0275property("matMenuTriggerFor", nodeMenu_r7);
    \u0275\u0275advance(6);
    \u0275\u0275conditional(!node_r4.isInvolved ? 7 : -1);
    \u0275\u0275advance(17);
    \u0275\u0275property("disabled", node_r4.hasChildren);
  }
}
function UnitsComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "unit-tree", 35);
    \u0275\u0275listener("unitSelected", function UnitsComponent_Conditional_23_Template_unit_tree_unitSelected_0_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r5 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r5.onUnitSelected($event));
    })("unitUpdated", function UnitsComponent_Conditional_23_Template_unit_tree_unitUpdated_0_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r5 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r5.onUnitUpdated($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const nodeActions_r9 = \u0275\u0275reference(22);
    \u0275\u0275property("nodeActionsTemplate", nodeActions_r9);
  }
}
function UnitsComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "unit-table", 36);
    \u0275\u0275listener("unitSelected", function UnitsComponent_Conditional_24_Template_unit_table_unitSelected_0_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r5 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r5.onUnitSelected($event));
    })("unitUpdated", function UnitsComponent_Conditional_24_Template_unit_table_unitUpdated_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r5 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r5.onUnitUpdated());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const nodeActions_r9 = \u0275\u0275reference(22);
    \u0275\u0275property("nodeActionsTemplate", nodeActions_r9);
  }
}
function UnitsComponent_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "unit-content", 22);
  }
  if (rf & 2) {
    const ctx_r5 = \u0275\u0275nextContext();
    \u0275\u0275property("selectedUnit", ctx_r5.selectedUnit());
  }
}
function UnitsComponent_Conditional_37_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 39);
    \u0275\u0275listener("click", function UnitsComponent_Conditional_37_Conditional_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r5 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r5.toggleNavPanel());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "menu");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " \u041F\u043E\u043A\u0430\u0437\u0430\u0442\u0438 \u0434\u0435\u0440\u0435\u0432\u043E \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0456\u0432 ");
    \u0275\u0275elementEnd();
  }
}
function UnitsComponent_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23)(1, "mat-icon", 37);
    \u0275\u0275text(2, "account_tree");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2");
    \u0275\u0275text(4, "\u041E\u0431\u0435\u0440\u0456\u0442\u044C \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "\u0412\u0438\u0431\u0435\u0440\u0456\u0442\u044C \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B \u0443 \u0434\u0435\u0440\u0435\u0432\u0456 \u043B\u0456\u0432\u043E\u0440\u0443\u0447 \u0434\u043B\u044F \u043F\u0435\u0440\u0435\u0433\u043B\u044F\u0434\u0443 \u0434\u0435\u0442\u0430\u043B\u044C\u043D\u043E\u0457 \u0456\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0456\u0457");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, UnitsComponent_Conditional_37_Conditional_7_Template, 4, 0, "button", 38);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r5 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275conditional(ctx_r5.isNavPanelCollapsed() ? 7 : -1);
  }
}
var UnitsComponent = class _UnitsComponent {
  unitService = inject(UnitService);
  dialog = inject(MatDialog);
  breakpointObserver = inject(BreakpointObserver);
  snackBar = inject(MatSnackBar);
  router = inject(Router);
  // ViewChild references
  containerRef;
  unitTree;
  // State signals
  selectedUnit = signal(null, ...ngDevMode ? [{ debugName: "selectedUnit" }] : []);
  viewMode = signal(this.getSavedViewMode(), ...ngDevMode ? [{ debugName: "viewMode" }] : []);
  // Panel signals (replacing sidenav signals)
  navPanelWidth = signal(this.getSavedNavPanelWidth(), ...ngDevMode ? [{ debugName: "navPanelWidth" }] : []);
  contentPanelWidth = computed(() => {
    const isCollapsed = this.isNavPanelCollapsed();
    const navWidth = this.navPanelWidth();
    if (isCollapsed) {
      return 100;
    }
    return 100 - navWidth;
  }, ...ngDevMode ? [{ debugName: "contentPanelWidth" }] : []);
  isDragging = signal(false, ...ngDevMode ? [{ debugName: "isDragging" }] : []);
  isNavPanelCollapsed = signal(this.getSavedNavPanelState(), ...ngDevMode ? [{ debugName: "isNavPanelCollapsed" }] : []);
  // Panel constants
  SPLITTER_WIDTH_PX = 6;
  MIN_PANEL_WIDTH_PERCENT = 20;
  MAX_PANEL_WIDTH_PERCENT = 100 - this.MIN_PANEL_WIDTH_PERCENT;
  lastNavPanelWidth = this.getSavedNavPanelWidth();
  startX = 0;
  startNavWidth = 0;
  containerWidth = 0;
  // Event handlers
  onMouseMoveHandler = this.onMouseMove.bind(this);
  onMouseUpHandler = this.onMouseUp.bind(this);
  // Computed signals
  selectedUnitTitle = computed(() => {
    const unit = this.selectedUnit();
    return unit ? `${unit.name} (${unit.shortName})` : "\u041F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0438";
  }, ...ngDevMode ? [{ debugName: "selectedUnitTitle" }] : []);
  // Computed signal for tree loading state
  loading = computed(() => {
    return this.unitTree?.loading() ?? false;
  }, ...ngDevMode ? [{ debugName: "loading" }] : []);
  isMobile = computed(() => this.breakpointObserver.isMatched([Breakpoints.Handset]), ...ngDevMode ? [{ debugName: "isMobile" }] : []);
  constructor() {
    effect(() => {
      if (this.isMobile() && !this.isNavPanelCollapsed()) {
        this.isNavPanelCollapsed.set(true);
      }
    });
  }
  // --- Lifecycle Hooks ---
  ngAfterViewInit() {
    this.updateContainerWidth();
  }
  ngOnDestroy() {
    if (this.isDragging()) {
      this.cleanupDragListeners();
      this.isDragging.set(false);
    }
  }
  // --- Methods ---
  /** Updates the width of the container, minus the splitter width. */
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
    newNavWidth = Math.max(this.MIN_PANEL_WIDTH_PERCENT, Math.min(this.MAX_PANEL_WIDTH_PERCENT, newNavWidth));
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
  getSavedNavPanelState() {
    const saved = localStorage.getItem("unitNavPanelCollapsed");
    return saved !== null ? saved === "true" : false;
  }
  getSavedNavPanelWidth() {
    const saved = localStorage.getItem("unitNavPanelWidth");
    return saved !== null ? parseInt(saved, 10) : 50;
  }
  saveNavPanelState(collapsed) {
    localStorage.setItem("unitNavPanelCollapsed", collapsed.toString());
  }
  saveNavPanelWidth(width) {
    localStorage.setItem("unitNavPanelWidth", width.toString());
  }
  getSavedViewMode() {
    const saved = localStorage.getItem("unitViewMode");
    return saved === "table" ? "table" : "tree";
  }
  saveViewMode(mode) {
    localStorage.setItem("unitViewMode", mode);
  }
  onViewModeChange(mode) {
    this.viewMode.set(mode);
    this.saveViewMode(mode);
  }
  /** Переключает состояние навигационной панели (свернута/развернута) */
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
  /**
   * Recalculate container width on window resize to ensure correct boundary checks
   * and percentage calculations on the next drag operation.
   */
  onWindowResize() {
    this.updateContainerWidth();
    const currentNavWidth = this.navPanelWidth();
    const clampedNavWidth = Math.max(this.MIN_PANEL_WIDTH_PERCENT, Math.min(this.MAX_PANEL_WIDTH_PERCENT, currentNavWidth));
    if (clampedNavWidth !== currentNavWidth) {
      this.navPanelWidth.set(clampedNavWidth);
    }
  }
  onUnitSelected(unit) {
    this.unitService.getById(unit.id).subscribe((fullUnit) => {
      this.selectedUnit.set(fullUnit);
      if (this.isMobile()) {
        this.isNavPanelCollapsed.set(true);
      }
    });
  }
  onUnitUpdated(unit) {
    const currentSelected = this.selectedUnit();
    if (unit && currentSelected && currentSelected.id === unit.id) {
      this.unitService.getById(unit.id).subscribe((fullUnit) => {
        this.selectedUnit.set(fullUnit);
      });
    }
  }
  /**
   * Обновляет дерево подразделений
   */
  refresh() {
    this.unitTree?.refresh();
  }
  /**
   * Открывает диалог создания нового корневого подразделения
   */
  CreateUnit() {
    const dialogRef = this.dialog.open(UnitDialogComponent, {
      width: "600px",
      data: {
        id: "",
        name: "",
        shortName: "",
        militaryNumber: "",
        forceTypeId: void 0,
        unitTypeId: void 0,
        parentId: NULL_GUID,
        assignedUnitId: void 0,
        orderVal: 1,
        isInvolved: false,
        comment: ""
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.unitService.create({
          name: result.name,
          shortName: result.shortName,
          militaryNumber: result.militaryNumber,
          forceTypeId: result.forceTypeId,
          unitTypeId: result.unitTypeId,
          parentId: result.parentId,
          assignedUnitId: result.assignedUnitId,
          orderVal: result.orderVal,
          isInvolved: result.isInvolved,
          comment: result.comment
        }).subscribe({
          next: () => {
            if (this.unitTree) {
              this.unitTree.refresh();
            }
            this.onUnitUpdated();
            this.snackBar.open("\u041F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B \u0443\u0441\u043F\u0456\u0448\u043D\u043E \u0441\u0442\u0432\u043E\u0440\u0435\u043D\u043E", "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 3e3 });
          },
          error: (error) => {
            console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0441\u0442\u0432\u043E\u0440\u0435\u043D\u043D\u044F \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0443:", error);
            const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0441\u0442\u0432\u043E\u0440\u0435\u043D\u043D\u044F \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0443");
            this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
          }
        });
      }
    });
  }
  /**
   * Добавляет дочерний подразделение к узлу
   */
  addChild(node) {
    const dialogRef = this.dialog.open(UnitDialogComponent, {
      width: "600px",
      data: {
        id: "",
        name: "",
        shortName: "",
        militaryNumber: "",
        forceTypeId: node.forceTypeId,
        unitTypeId: void 0,
        parentId: node.id,
        assignedUnitId: void 0,
        orderVal: 1,
        isInvolved: false,
        comment: ""
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.unitService.create({
          name: result.name,
          shortName: result.shortName,
          militaryNumber: result.militaryNumber,
          forceTypeId: result.forceTypeId,
          unitTypeId: result.unitTypeId,
          parentId: result.parentId,
          assignedUnitId: result.assignedUnitId,
          orderVal: result.orderVal,
          isInvolved: result.isInvolved,
          comment: result.comment
        }).subscribe({
          next: () => {
            if (this.unitTree) {
              this.unitTree.refresh();
            }
            this.onUnitUpdated();
            this.snackBar.open("\u0414\u043E\u0447\u0456\u0440\u043D\u0456\u0439 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B \u0443\u0441\u043F\u0456\u0448\u043D\u043E \u0441\u0442\u0432\u043E\u0440\u0435\u043D\u043E", "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", {
              duration: 3e3
            });
          },
          error: (error) => {
            console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0441\u0442\u0432\u043E\u0440\u0435\u043D\u043D\u044F \u0434\u043E\u0447\u0456\u0440\u043D\u044C\u043E\u0433\u043E \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0443:", error);
            const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0441\u0442\u0432\u043E\u0440\u0435\u043D\u043D\u044F \u0434\u043E\u0447\u0456\u0440\u043D\u044C\u043E\u0433\u043E \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0443");
            this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
          }
        });
      }
    });
  }
  /**
   * Додає оперативний підрозділ до вузла
   */
  addInvolvedChild(node) {
    const dialogRef = this.dialog.open(InvolvedUnitDialogComponent, {
      width: "600px",
      data: {
        id: "",
        name: "",
        shortName: "",
        militaryNumber: "",
        forceTypeId: node.forceTypeId,
        unitTypeId: Crew_GUID,
        parentId: node.id,
        assignedUnitId: void 0,
        orderVal: 1,
        isInvolved: true,
        comment: ""
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.unitService.create({
          name: result.shortName,
          shortName: result.shortName,
          militaryNumber: "",
          forceTypeId: node.forceTypeId,
          unitTypeId: Crew_GUID,
          parentId: node.id,
          assignedUnitId: void 0,
          orderVal: result.orderVal,
          isInvolved: true,
          comment: result.comment
        }).subscribe({
          next: () => {
            if (this.unitTree) {
              this.unitTree.refresh();
            }
            this.onUnitUpdated();
            this.snackBar.open("\u0415\u043A\u0456\u043F\u0430\u0436/\u0413\u0440\u0443\u043F\u0430 \u0443\u0441\u043F\u0456\u0448\u043D\u043E \u0441\u0442\u0432\u043E\u0440\u0435\u043D\u043E", "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", {
              duration: 3e3
            });
          },
          error: (error) => {
            console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0441\u0442\u0432\u043E\u0440\u0435\u043D\u043D\u044F \u0415\u043A\u0456\u043F\u0430\u0436/\u0413\u0440\u0443\u043F\u0430:", error);
            const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0441\u0442\u0432\u043E\u0440\u0435\u043D\u043D\u044F \u0415\u043A\u0456\u043F\u0430\u0436/\u0413\u0440\u0443\u043F\u0430");
            this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
          }
        });
      }
    });
  }
  /**
   * Редактирует подразделение
   */
  edit(node) {
    if (node.isInvolved) {
      this.editInvolvedUnit(node);
      return;
    }
    this.editRegularUnit(node);
  }
  /**
   * Редактирует обычное подразделение
   */
  editRegularUnit(node) {
    const dialogRef = this.dialog.open(UnitDialogComponent, {
      width: "600px",
      data: __spreadValues({}, node)
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const unit = result;
        this.unitService.update(unit.id, unit).subscribe({
          next: () => {
            if (this.unitTree) {
              this.unitTree.refresh();
            }
            this.onUnitUpdated();
            this.snackBar.open("\u041F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B \u0443\u0441\u043F\u0456\u0448\u043D\u043E \u043E\u043D\u043E\u0432\u043B\u0435\u043D\u043E", "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 3e3 });
          },
          error: (error) => {
            console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043E\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u044F \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0443:", error);
            const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043E\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u044F \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0443");
            this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
          }
        });
      }
    });
  }
  /**
   * Редагує оперативний підрозділ
   */
  editInvolvedUnit(node) {
    const dialogRef = this.dialog.open(InvolvedUnitDialogComponent, {
      width: "600px",
      data: __spreadValues({}, node)
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const unit = result;
        this.unitService.update(unit.id, unit).subscribe({
          next: () => {
            if (this.unitTree) {
              this.unitTree.refresh();
            }
            this.onUnitUpdated();
            this.snackBar.open("\u041F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B \u0443\u0441\u043F\u0456\u0448\u043D\u043E \u043E\u043D\u043E\u0432\u043B\u0435\u043D\u043E", "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 3e3 });
          },
          error: (error) => {
            console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043E\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u044F \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0443:", error);
            const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043E\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u044F \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0443");
            this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
          }
        });
      }
    });
  }
  /**
   * Удаляет подразделение
   */
  delete(node) {
    const hasChildren = node.hasChildren || false;
    if (hasChildren) {
      this.dialog.open(ConfirmDialogComponent, {
        width: "360px",
        data: {
          title: "\u041D\u0435\u043C\u043E\u0436\u043B\u0438\u0432\u043E \u0432\u0438\u0434\u0430\u043B\u0438\u0442\u0438",
          message: `\u041F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B "${node.name}" \u043C\u0430\u0454 \u0434\u043E\u0447\u0456\u0440\u043D\u0456 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0438. \u0421\u043F\u043E\u0447\u0430\u0442\u043A\u0443 \u0432\u0438\u0434\u0430\u043B\u0456\u0442\u044C \u0430\u0431\u043E \u043F\u0435\u0440\u0435\u043C\u0456\u0441\u0442\u0456\u0442\u044C \u0434\u043E\u0447\u0456\u0440\u043D\u0456 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0438.`,
          confirmText: "OK",
          cancelText: "",
          color: "primary",
          icon: "warning"
        }
      });
      return;
    }
    const ref = this.dialog.open(ConfirmDialogComponent, {
      width: "360px",
      autoFocus: false,
      data: {
        title: "\u0412\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0443",
        message: `\u0412\u0438 \u0432\u043F\u0435\u0432\u043D\u0435\u043D\u0456, \u0449\u043E \u0445\u043E\u0447\u0435\u0442\u0435 \u0432\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B "${node.name}"?`,
        confirmText: "\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438",
        cancelText: "\u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438",
        color: "warn",
        icon: "warning"
      }
    });
    ref.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.unitService.delete(node.id).subscribe({
          next: () => {
            if (this.unitTree) {
              this.unitTree.refresh();
            }
            this.onUnitUpdated();
            this.snackBar.open("\u041F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B \u0443\u0441\u043F\u0456\u0448\u043D\u043E \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u043E", "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 3e3 });
          },
          error: (error) => {
            console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0443:", error);
            const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0443");
            this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
          }
        });
      }
    });
  }
  moveUpDown(node, moveUp) {
    this.unitService.moveUpDown(node.id, moveUp).subscribe({
      next: () => {
        if (this.unitTree) {
          this.unitTree.refresh();
        }
        this.onUnitUpdated();
        this.snackBar.open(`\u041F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B \u0443\u0441\u043F\u0456\u0448\u043D\u043E \u043F\u0435\u0440\u0435\u043C\u0456\u0449\u0435\u043D\u043E ${moveUp ? "\u0432\u0433\u043E\u0440\u0443" : "\u0432\u043D\u0438\u0437"}`, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", {
          duration: 3e3
        });
      },
      error: (error) => {
        console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043F\u0435\u0440\u0435\u043C\u0456\u0449\u0435\u043D\u043D\u044F \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0443:", error);
        const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043F\u0435\u0440\u0435\u043C\u0456\u0449\u0435\u043D\u043D\u044F \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0443");
        this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
      }
    });
  }
  importSoldiers(node) {
    this.router.navigate(["/unit/import"], {
      queryParams: { unitId: node.id }
    });
  }
  static \u0275fac = function UnitsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UnitsComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UnitsComponent, selectors: [["app-units-page"]], viewQuery: function UnitsComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c02, 5)(UnitTreeComponent, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.containerRef = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.unitTree = _t.first);
    }
  }, hostBindings: function UnitsComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("resize", function UnitsComponent_resize_HostBindingHandler() {
        return ctx.onWindowResize();
      }, \u0275\u0275resolveWindow);
    }
  }, decls: 38, vars: 22, consts: [["containerRef", ""], ["nodeActions", ""], ["menuTrigger", "matMenuTrigger"], ["nodeMenu", "matMenu"], [1, "container"], [1, "panel", "nav-panel"], [1, "panel-header"], [1, "header-actions"], [1, "view-toggle", 3, "change", "value"], ["value", "tree", "matTooltip", "\u0414\u0435\u0440\u0435\u0432\u043E\u043F\u043E\u0434\u0456\u0431\u043D\u0435 \u043F\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u043D\u044F"], ["value", "table", "matTooltip", "\u0422\u0430\u0431\u043B\u0438\u0447\u043D\u0435 \u043F\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u043D\u044F"], ["mat-raised-button", "", "color", "primary", 3, "click", "disabled"], [1, "panel-content"], [1, "unit-tree", 3, "nodeActionsTemplate"], [1, "unit-table", 3, "nodeActionsTemplate"], [1, "splitter", 3, "mousedown"], [1, "splitter-handle"], [1, "splitter-controls"], [1, "toggle-btn", 3, "click", "title"], [1, "arrow"], [1, "panel", "content-panel"], [1, "unit-toolbar"], [1, "panel-content", 3, "selectedUnit"], [1, "empty-state"], [1, "node-actions"], ["mat-icon-button", "", "matTooltip", "\u0414\u0456\u0457 \u0437 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u043E\u043C", 3, "click", "matMenuTriggerFor"], ["mat-menu-item", "", "matTooltip", "\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B", 3, "click"], ["color", "accent"], ["mat-menu-item", "", "matTooltip", "\u041F\u0435\u0440\u0435\u043C\u0456\u0441\u0442\u0438\u0442\u0438 \u0432\u0438\u0449\u0435", 3, "click"], ["color", "primary"], ["mat-menu-item", "", "matTooltip", "\u041F\u0435\u0440\u0435\u043C\u0456\u0441\u0442\u0438\u0442\u0438 \u043D\u0438\u0436\u0447\u0435", 3, "click"], ["mat-menu-item", "", "matTooltip", "\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B", 1, "delete-action", 3, "click", "disabled"], ["mat-menu-item", "", "matTooltip", "\u0414\u043E\u0434\u0430\u0442\u0438 \u0434\u043E\u0447\u0456\u0440\u043D\u0456\u0439 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B", 3, "click"], ["mat-menu-item", "", "matTooltip", "\u0414\u043E\u0434\u0430\u0442\u0438 \u0415\u043A\u0456\u043F\u0430\u0436/\u0413\u0440\u0443\u043F\u0430", 3, "click", "disabled"], ["mat-menu-item", "", "matTooltip", "\u0406\u043C\u043F\u043E\u0440\u0442\u0443\u0432\u0430\u0442\u0438 \u043E\u0441\u043E\u0431\u043E\u0432\u0438\u0439 \u0441\u043A\u043B\u0430\u0434", 3, "click"], [1, "unit-tree", 3, "unitSelected", "unitUpdated", "nodeActionsTemplate"], [1, "unit-table", 3, "unitSelected", "unitUpdated", "nodeActionsTemplate"], [1, "empty-icon"], ["mat-raised-button", "", "color", "primary"], ["mat-raised-button", "", "color", "primary", 3, "click"]], template: function UnitsComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 4, 0)(2, "div", 5)(3, "div", 6)(4, "div", 7)(5, "mat-button-toggle-group", 8);
      \u0275\u0275listener("change", function UnitsComponent_Template_mat_button_toggle_group_change_5_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onViewModeChange($event.value));
      });
      \u0275\u0275elementStart(6, "mat-button-toggle", 9)(7, "mat-icon");
      \u0275\u0275text(8, "account_tree");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "mat-button-toggle", 10)(10, "mat-icon");
      \u0275\u0275text(11, "view_list");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(12, "button", 11);
      \u0275\u0275listener("click", function UnitsComponent_Template_button_click_12_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.refresh());
      });
      \u0275\u0275elementStart(13, "mat-icon");
      \u0275\u0275text(14, "refresh");
      \u0275\u0275elementEnd();
      \u0275\u0275text(15, " \u041E\u043D\u043E\u0432\u0438\u0442\u0438 ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "button", 11);
      \u0275\u0275listener("click", function UnitsComponent_Template_button_click_16_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.CreateUnit());
      });
      \u0275\u0275elementStart(17, "mat-icon");
      \u0275\u0275text(18, "add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(19, " \u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438 ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(20, "div", 12);
      \u0275\u0275template(21, UnitsComponent_ng_template_21_Template, 29, 3, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
      \u0275\u0275conditionalCreate(23, UnitsComponent_Conditional_23_Template, 1, 1, "unit-tree", 13)(24, UnitsComponent_Conditional_24_Template, 1, 1, "unit-table", 14);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(25, "div", 15);
      \u0275\u0275listener("mousedown", function UnitsComponent_Template_div_mousedown_25_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.startDrag($event));
      });
      \u0275\u0275element(26, "div", 16);
      \u0275\u0275elementStart(27, "div", 17)(28, "button", 18);
      \u0275\u0275listener("click", function UnitsComponent_Template_button_click_28_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.toggleNavPanel());
      });
      \u0275\u0275elementStart(29, "span", 19);
      \u0275\u0275text(30);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(31, "div", 20)(32, "div", 6)(33, "div", 21)(34, "h3");
      \u0275\u0275text(35);
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(36, UnitsComponent_Conditional_36_Template, 1, 1, "unit-content", 22)(37, UnitsComponent_Conditional_37_Template, 8, 1, "div", 23);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275styleProp("width", ctx.navPanelWidth(), "%");
      \u0275\u0275classProp("collapsed", ctx.isNavPanelCollapsed());
      \u0275\u0275advance();
      \u0275\u0275classProp("hidden", ctx.isNavPanelCollapsed());
      \u0275\u0275advance(2);
      \u0275\u0275property("value", ctx.viewMode());
      \u0275\u0275advance(7);
      \u0275\u0275property("disabled", ctx.loading());
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", ctx.loading());
      \u0275\u0275advance(4);
      \u0275\u0275classProp("hidden", ctx.isNavPanelCollapsed());
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.viewMode() === "tree" ? 23 : 24);
      \u0275\u0275advance(2);
      \u0275\u0275classProp("dragging", ctx.isDragging());
      \u0275\u0275advance(3);
      \u0275\u0275property("title", ctx.isNavPanelCollapsed() ? "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u0438 \u0434\u0435\u0440\u0435\u0432\u043E \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0456\u0432" : "\u041F\u0440\u0438\u0445\u043E\u0432\u0430\u0442\u0438 \u0434\u0435\u0440\u0435\u0432\u043E \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0456\u0432");
      \u0275\u0275advance();
      \u0275\u0275classProp("collapsed", ctx.isNavPanelCollapsed());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.isNavPanelCollapsed() ? "\u25B6" : "\u25C0", " ");
      \u0275\u0275advance();
      \u0275\u0275styleProp("width", ctx.contentPanelWidth(), "%");
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.selectedUnitTitle());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.selectedUnit() ? 36 : 37);
    }
  }, dependencies: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatIcon,
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatButtonToggleModule,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatMenuModule,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatDividerModule,
    MatDivider,
    MatTooltipModule,
    MatTooltip,
    UnitTreeComponent,
    UnitTableComponent,
    UnitContentComponent
  ], styles: ['@charset "UTF-8";\n\n\n\n.container[_ngcontent-%COMP%] {\n  display: flex;\n  height: 100vh;\n  width: 100%;\n  overflow: hidden;\n}\n.panel[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n  overflow: hidden;\n  transition: width 0.3s ease;\n}\n.nav-panel[_ngcontent-%COMP%] {\n  background-color: #f5f5f5;\n  min-width: 200px;\n  max-width: 80%;\n}\n.content-panel[_ngcontent-%COMP%] {\n  display: flex;\n  flex: 1;\n  background-color: #fafafa;\n}\n.panel-header[_ngcontent-%COMP%] {\n  padding: 16px;\n  background-color: #e3f2fd;\n  border-bottom: 1px solid #ddd;\n  flex-shrink: 0;\n  flex-wrap: wrap;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n}\n.panel-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 16px;\n  font-weight: 500;\n  color: #1976d2;\n  flex-shrink: 0;\n}\n.panel-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-shrink: 0;\n}\n.panel-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   .view-toggle[_ngcontent-%COMP%] {\n  height: 36px;\n}\n.panel-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   .view-toggle[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n}\n.panel-header[_ngcontent-%COMP%]   .unit-toolbar[_ngcontent-%COMP%] {\n  width: 100%;\n  margin: -16px;\n  background-color: #1976d2;\n  color: white;\n  padding: 16px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.panel-header[_ngcontent-%COMP%]   .unit-toolbar[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  color: white;\n  font-size: 20px;\n  font-weight: 500;\n}\n.panel-header[_ngcontent-%COMP%]   .unit-toolbar[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  color: white;\n}\n.panel-content[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 0;\n  overflow: hidden;\n}\n.panel-content[_ngcontent-%COMP%]   .unit-tree[_ngcontent-%COMP%] {\n  height: 100%;\n  padding: 8px;\n}\n.panel-content[_ngcontent-%COMP%]   .unit-table[_ngcontent-%COMP%] {\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n}\n.panel-content[_ngcontent-%COMP%]   .unit-table-container[_ngcontent-%COMP%] {\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 32px;\n}\n.panel-content[_ngcontent-%COMP%]   .unit-table-container[_ngcontent-%COMP%]   .placeholder-text[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 16px;\n  color: #757575;\n  font-size: 16px;\n}\n.panel-content[_ngcontent-%COMP%]   .unit-table-container[_ngcontent-%COMP%]   .placeholder-text[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  width: 64px;\n  height: 64px;\n  color: #bdbdbd;\n}\n.splitter[_ngcontent-%COMP%] {\n  width: 6px;\n  background-color: #e0e0e0;\n  cursor: col-resize;\n  position: relative;\n  flex-shrink: 0;\n  -webkit-user-select: none;\n  user-select: none;\n  transition: background-color 0.2s ease;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n.splitter[_ngcontent-%COMP%]:hover {\n  background-color: #2196f3;\n}\n.splitter.dragging[_ngcontent-%COMP%] {\n  background-color: #1976d2;\n}\n.splitter-handle[_ngcontent-%COMP%] {\n  width: 3px;\n  height: 40px;\n  background-color: #666;\n  border-radius: 2px;\n  margin-bottom: 8px;\n}\n.splitter[_ngcontent-%COMP%]:hover   .splitter-handle[_ngcontent-%COMP%] {\n  background-color: white;\n}\n.splitter.dragging[_ngcontent-%COMP%]   .splitter-handle[_ngcontent-%COMP%] {\n  background-color: white;\n}\n.splitter-controls[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.toggle-btn[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n  border: none;\n  border-radius: 3px;\n  background-color: #f5f5f5;\n  color: #666;\n  cursor: pointer;\n  font-size: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s ease;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);\n}\n.toggle-btn[_ngcontent-%COMP%]:hover {\n  background-color: #2196f3;\n  color: white;\n  transform: scale(1.1);\n}\n.arrow[_ngcontent-%COMP%] {\n  font-size: 8px;\n  font-weight: bold;\n  transition: transform 0.2s ease;\n}\n.arrow.collapsed[_ngcontent-%COMP%] {\n  transform: translateX(1px);\n}\n.panel.collapsed[_ngcontent-%COMP%] {\n  min-width: 0 !important;\n  width: 0 !important;\n  max-width: 0 !important;\n  overflow: hidden;\n}\n.panel-header.hidden[_ngcontent-%COMP%], \n.panel-content.hidden[_ngcontent-%COMP%] {\n  display: none !important;\n}\n.hidden[_ngcontent-%COMP%] {\n  display: none !important;\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 48px 24px;\n  color: rgba(0, 0, 0, 0.6);\n}\n.empty-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  width: 64px;\n  height: 64px;\n  margin-bottom: 16px;\n  opacity: 0.5;\n}\n.empty-state[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0 0 8px 0;\n  font-weight: 400;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 24px 0;\n  font-size: 14px;\n}\n/*# sourceMappingURL=Unit.page.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UnitsComponent, [{
    type: Component,
    args: [{ selector: "app-units-page", imports: [
      CommonModule,
      MatCardModule,
      MatChipsModule,
      MatIconModule,
      MatButtonModule,
      MatButtonToggleModule,
      MatMenuModule,
      MatDividerModule,
      MatTooltipModule,
      UnitTreeComponent,
      UnitTableComponent,
      UnitContentComponent
    ], template: `<div class="container" #containerRef>
  <div
    class="panel nav-panel"
    [style.width.%]="navPanelWidth()"
    [class.collapsed]="isNavPanelCollapsed()"
  >
    <div class="panel-header" [class.hidden]="isNavPanelCollapsed()">
      <div class="header-actions">
        <mat-button-toggle-group
          [value]="viewMode()"
          (change)="onViewModeChange($event.value)"
          class="view-toggle"
        >
          <mat-button-toggle value="tree" matTooltip="\u0414\u0435\u0440\u0435\u0432\u043E\u043F\u043E\u0434\u0456\u0431\u043D\u0435 \u043F\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u043D\u044F">
            <mat-icon>account_tree</mat-icon>
          </mat-button-toggle>
          <mat-button-toggle value="table" matTooltip="\u0422\u0430\u0431\u043B\u0438\u0447\u043D\u0435 \u043F\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u043D\u044F">
            <mat-icon>view_list</mat-icon>
          </mat-button-toggle>
        </mat-button-toggle-group>
        <button mat-raised-button color="primary" (click)="refresh()" [disabled]="loading()">
          <mat-icon>refresh</mat-icon>
          \u041E\u043D\u043E\u0432\u0438\u0442\u0438
        </button>
        <button mat-raised-button color="primary" (click)="CreateUnit()" [disabled]="loading()">
          <mat-icon>add</mat-icon>
          \u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438
        </button>
      </div>
    </div>
    <div class="panel-content" [class.hidden]="isNavPanelCollapsed()">
      <!-- \u041C\u0435\u043D\u044E \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0439 \u0441 \u0443\u0437\u043B\u043E\u043C - \u043E\u0431\u0449\u0435\u0435 \u0434\u043B\u044F \u043E\u0431\u043E\u0438\u0445 \u043F\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u0438\u0439 -->
      <ng-template #nodeActions let-node>
        <div class="node-actions">
          <button
            mat-icon-button
            [matMenuTriggerFor]="nodeMenu"
            matTooltip="\u0414\u0456\u0457 \u0437 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u043E\u043C"
            (click)="$event.stopPropagation()"
            #menuTrigger="matMenuTrigger"
          >
            <mat-icon>more_vert</mat-icon>
          </button>

          <mat-menu #nodeMenu="matMenu">
            @if(!node.isInvolved){
            <button
              mat-menu-item
              matTooltip="\u0414\u043E\u0434\u0430\u0442\u0438 \u0434\u043E\u0447\u0456\u0440\u043D\u0456\u0439 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B"
              (click)="menuTrigger.closeMenu(); addChild(node)"
            >
              <mat-icon color="primary">add</mat-icon>
              <span>\u0414\u043E\u0434\u0430\u0442\u0438 \u0434\u043E\u0447\u0456\u0440\u043D\u0456\u0439 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B</span>
            </button>
            <button
              mat-menu-item
              matTooltip="\u0414\u043E\u0434\u0430\u0442\u0438 \u0415\u043A\u0456\u043F\u0430\u0436/\u0413\u0440\u0443\u043F\u0430"
              (click)="menuTrigger.closeMenu(); addInvolvedChild(node)"
              [disabled]="node.isInvolved"
            >
              <mat-icon>groups</mat-icon>
              <span>\u0414\u043E\u0434\u0430\u0442\u0438 \u0415\u043A\u0456\u043F\u0430\u0436/\u0413\u0440\u0443\u043F\u0430</span>
            </button>
            <button
              mat-menu-item
              matTooltip="\u0406\u043C\u043F\u043E\u0440\u0442\u0443\u0432\u0430\u0442\u0438 \u043E\u0441\u043E\u0431\u043E\u0432\u0438\u0439 \u0441\u043A\u043B\u0430\u0434"
              (click)="menuTrigger.closeMenu(); importSoldiers(node)"
            >
              <mat-icon color="primary">upload_file</mat-icon>
              <span>\u0406\u043C\u043F\u043E\u0440\u0442 \u041E\u0421</span>
            </button>
            }
            <button
              mat-menu-item
              matTooltip="\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B"
              (click)="menuTrigger.closeMenu(); edit(node)"
            >
              <mat-icon color="accent">edit</mat-icon>
              <span>\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438</span>
            </button>
            <button
              mat-menu-item
              matTooltip="\u041F\u0435\u0440\u0435\u043C\u0456\u0441\u0442\u0438\u0442\u0438 \u0432\u0438\u0449\u0435"
              (click)="menuTrigger.closeMenu(); moveUpDown(node, true)"
            >
              <mat-icon color="primary">arrow_upward</mat-icon>
              <span>\u0412\u0438\u0449\u0435</span>
            </button>
            <button
              mat-menu-item
              matTooltip="\u041F\u0435\u0440\u0435\u043C\u0456\u0441\u0442\u0438\u0442\u0438 \u043D\u0438\u0436\u0447\u0435"
              (click)="menuTrigger.closeMenu(); moveUpDown(node, false)"
            >
              <mat-icon color="primary">arrow_downward</mat-icon>
              <span>\u041D\u0438\u0436\u0447\u0435</span>
            </button>
            <mat-divider></mat-divider>
            <button
              mat-menu-item
              matTooltip="\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B"
              (click)="menuTrigger.closeMenu(); delete(node)"
              [disabled]="node.hasChildren"
              class="delete-action"
            >
              <mat-icon>delete</mat-icon>
              <span>\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438</span>
            </button>
          </mat-menu>
        </div>
      </ng-template>

      @if (viewMode() === 'tree') {
      <!-- \u0414\u0435\u0440\u0435\u0432\u043E \u043F\u043E\u0434\u0440\u0430\u0437\u0434\u0435\u043B\u0435\u043D\u0438\u0439 -->
      <unit-tree
        (unitSelected)="onUnitSelected($event)"
        (unitUpdated)="onUnitUpdated($event)"
        [nodeActionsTemplate]="nodeActions"
        class="unit-tree"
      >
      </unit-tree>
      } @else {
      <!-- \u0422\u0430\u0431\u043B\u0438\u0447\u043D\u0435 \u043F\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u043D\u044F -->
      <unit-table
        (unitSelected)="onUnitSelected($event)"
        (unitUpdated)="onUnitUpdated()"
        [nodeActionsTemplate]="nodeActions"
        class="unit-table"
      ></unit-table>
      }
    </div>
  </div>

  <div class="splitter" [class.dragging]="isDragging()" (mousedown)="startDrag($event)">
    <div class="splitter-handle"></div>
    <div class="splitter-controls">
      <button
        class="toggle-btn"
        (click)="toggleNavPanel()"
        [title]="
          isNavPanelCollapsed() ? '\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u0438 \u0434\u0435\u0440\u0435\u0432\u043E \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0456\u0432' : '\u041F\u0440\u0438\u0445\u043E\u0432\u0430\u0442\u0438 \u0434\u0435\u0440\u0435\u0432\u043E \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0456\u0432'
        "
      >
        <span class="arrow" [class.collapsed]="isNavPanelCollapsed()">
          {{ isNavPanelCollapsed() ? '\u25B6' : '\u25C0' }}
        </span>
      </button>
    </div>
  </div>

  <div class="panel content-panel" [style.width.%]="contentPanelWidth()">
    <div class="panel-header">
      <!-- Toolbar \u0441 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u043E\u043C -->
      <div class="unit-toolbar">
        <h3>{{ selectedUnitTitle() }}</h3>
      </div>
    </div>
    <!-- \u041E\u0441\u043D\u043E\u0432\u043D\u043E\u0435 \u0441\u043E\u0434\u0435\u0440\u0436\u0438\u043C\u043E\u0435 -->
    @if(selectedUnit()){
    <unit-content class="panel-content" [selectedUnit]="selectedUnit()"> </unit-content>
    }@else {
    <div class="empty-state">
      <mat-icon class="empty-icon">account_tree</mat-icon>
      <h2>\u041E\u0431\u0435\u0440\u0456\u0442\u044C \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B</h2>
      <p>\u0412\u0438\u0431\u0435\u0440\u0456\u0442\u044C \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B \u0443 \u0434\u0435\u0440\u0435\u0432\u0456 \u043B\u0456\u0432\u043E\u0440\u0443\u0447 \u0434\u043B\u044F \u043F\u0435\u0440\u0435\u0433\u043B\u044F\u0434\u0443 \u0434\u0435\u0442\u0430\u043B\u044C\u043D\u043E\u0457 \u0456\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0456\u0457</p>
      @if (isNavPanelCollapsed()) {
      <button mat-raised-button color="primary" (click)="toggleNavPanel()">
        <mat-icon>menu</mat-icon>
        \u041F\u043E\u043A\u0430\u0437\u0430\u0442\u0438 \u0434\u0435\u0440\u0435\u0432\u043E \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0456\u0432
      </button>
      }
    </div>
    }
  </div>
</div>
`, styles: ['@charset "UTF-8";\n\n/* src/app/Unit/Unit.page.scss */\n.container {\n  display: flex;\n  height: 100vh;\n  width: 100%;\n  overflow: hidden;\n}\n.panel {\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n  overflow: hidden;\n  transition: width 0.3s ease;\n}\n.nav-panel {\n  background-color: #f5f5f5;\n  min-width: 200px;\n  max-width: 80%;\n}\n.content-panel {\n  display: flex;\n  flex: 1;\n  background-color: #fafafa;\n}\n.panel-header {\n  padding: 16px;\n  background-color: #e3f2fd;\n  border-bottom: 1px solid #ddd;\n  flex-shrink: 0;\n  flex-wrap: wrap;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n}\n.panel-header h3 {\n  margin: 0;\n  font-size: 16px;\n  font-weight: 500;\n  color: #1976d2;\n  flex-shrink: 0;\n}\n.panel-header .header-actions {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-shrink: 0;\n}\n.panel-header .header-actions .view-toggle {\n  height: 36px;\n}\n.panel-header .header-actions .view-toggle mat-icon {\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n}\n.panel-header .unit-toolbar {\n  width: 100%;\n  margin: -16px;\n  background-color: #1976d2;\n  color: white;\n  padding: 16px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.panel-header .unit-toolbar h3 {\n  margin: 0;\n  color: white;\n  font-size: 20px;\n  font-weight: 500;\n}\n.panel-header .unit-toolbar button {\n  color: white;\n}\n.panel-content {\n  flex: 1;\n  padding: 0;\n  overflow: hidden;\n}\n.panel-content .unit-tree {\n  height: 100%;\n  padding: 8px;\n}\n.panel-content .unit-table {\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n}\n.panel-content .unit-table-container {\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 32px;\n}\n.panel-content .unit-table-container .placeholder-text {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 16px;\n  color: #757575;\n  font-size: 16px;\n}\n.panel-content .unit-table-container .placeholder-text mat-icon {\n  font-size: 64px;\n  width: 64px;\n  height: 64px;\n  color: #bdbdbd;\n}\n.splitter {\n  width: 6px;\n  background-color: #e0e0e0;\n  cursor: col-resize;\n  position: relative;\n  flex-shrink: 0;\n  -webkit-user-select: none;\n  user-select: none;\n  transition: background-color 0.2s ease;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n.splitter:hover {\n  background-color: #2196f3;\n}\n.splitter.dragging {\n  background-color: #1976d2;\n}\n.splitter-handle {\n  width: 3px;\n  height: 40px;\n  background-color: #666;\n  border-radius: 2px;\n  margin-bottom: 8px;\n}\n.splitter:hover .splitter-handle {\n  background-color: white;\n}\n.splitter.dragging .splitter-handle {\n  background-color: white;\n}\n.splitter-controls {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.toggle-btn {\n  width: 20px;\n  height: 20px;\n  border: none;\n  border-radius: 3px;\n  background-color: #f5f5f5;\n  color: #666;\n  cursor: pointer;\n  font-size: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s ease;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);\n}\n.toggle-btn:hover {\n  background-color: #2196f3;\n  color: white;\n  transform: scale(1.1);\n}\n.arrow {\n  font-size: 8px;\n  font-weight: bold;\n  transition: transform 0.2s ease;\n}\n.arrow.collapsed {\n  transform: translateX(1px);\n}\n.panel.collapsed {\n  min-width: 0 !important;\n  width: 0 !important;\n  max-width: 0 !important;\n  overflow: hidden;\n}\n.panel-header.hidden,\n.panel-content.hidden {\n  display: none !important;\n}\n.hidden {\n  display: none !important;\n}\n.empty-state {\n  text-align: center;\n  padding: 48px 24px;\n  color: rgba(0, 0, 0, 0.6);\n}\n.empty-icon {\n  font-size: 64px;\n  width: 64px;\n  height: 64px;\n  margin-bottom: 16px;\n  opacity: 0.5;\n}\n.empty-state h2 {\n  margin: 0 0 8px 0;\n  font-weight: 400;\n}\n.empty-state p {\n  margin: 0 0 24px 0;\n  font-size: 14px;\n}\n/*# sourceMappingURL=Unit.page.css.map */\n'] }]
  }], () => [], { containerRef: [{
    type: ViewChild,
    args: ["containerRef"]
  }], unitTree: [{
    type: ViewChild,
    args: [UnitTreeComponent]
  }], onWindowResize: [{
    type: HostListener,
    args: ["window:resize"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UnitsComponent, { className: "UnitsComponent", filePath: "app/Unit/Unit.page.ts", lineNumber: 59 });
})();
export {
  UnitsComponent
};
//# sourceMappingURL=chunk-HYSDAMCF.js.map
