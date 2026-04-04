import {
  SoldierDialogComponent
} from "./chunk-HHSPZOUC.js";
import "./chunk-MJM6ET7F.js";
import {
  MatDivider,
  MatDividerModule
} from "./chunk-W77X6VAQ.js";
import "./chunk-3LZJNAAQ.js";
import {
  InlineEditManager,
  resolveUnitOperation
} from "./chunk-V24SZ7RF.js";
import {
  UnitService
} from "./chunk-3ARLYWIN.js";
import {
  MatAutocomplete,
  MatAutocompleteModule,
  MatAutocompleteTrigger
} from "./chunk-PLSWGHNG.js";
import {
  SoldierService
} from "./chunk-W7GCYCUF.js";
import {
  SoldierUtils,
  UnitTag,
  isProblematicStatus,
  isRecoveryStatus,
  isSevereStatus
} from "./chunk-47E2724L.js";
import {
  MatTooltip,
  MatTooltipModule
} from "./chunk-TKT7GR2R.js";
import {
  MatMenu,
  MatMenuItem,
  MatMenuModule,
  MatMenuTrigger
} from "./chunk-SNKAS4TF.js";
import "./chunk-JONXD3QV.js";
import {
  MatSelectModule
} from "./chunk-5336NQQD.js";
import {
  MatOption,
  MatOptionModule
} from "./chunk-MGHM5LON.js";
import {
  MatSnackBar,
  S5App_ErrorHandler
} from "./chunk-NPKDGQEZ.js";
import "./chunk-VVIVTAJ6.js";
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
  DefaultValueAccessor,
  FormControlDirective,
  FormsModule,
  MatFormField,
  MatFormFieldModule,
  MatIcon,
  MatIconModule,
  MatInput,
  MatInputModule,
  NgControlStatus,
  ReactiveFormsModule
} from "./chunk-Z4Z6CI4E.js";
import "./chunk-N27GZOTW.js";
import {
  AsyncPipe,
  Component,
  DatePipe,
  MatButton,
  MatButtonModule,
  MatIconButton,
  SlicePipe,
  ViewChild,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
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
  ɵɵviewQuery
} from "./chunk-CK6AJVHQ.js";

// src/app/Personnel/Personnel.page.ts
var _forTrack0 = ($index, $item) => $item.id;
function PersonnelPage_th_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 31);
    \u0275\u0275text(1, "\u0414\u0456\u0457");
    \u0275\u0275elementEnd();
  }
}
function PersonnelPage_td_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 32)(1, "button", 33);
    \u0275\u0275listener("click", function PersonnelPage_td_14_Template_button_click_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "mat-icon");
    \u0275\u0275text(3, "more_vert");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "mat-menu", null, 0)(6, "button", 34);
    \u0275\u0275listener("click", function PersonnelPage_td_14_Template_button_click_6_listener() {
      const soldier_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.edit(soldier_r2));
    });
    \u0275\u0275elementStart(7, "mat-icon", 35);
    \u0275\u0275text(8, "edit");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span");
    \u0275\u0275text(10, "\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(11, "mat-divider");
    \u0275\u0275elementStart(12, "button", 36);
    \u0275\u0275listener("click", function PersonnelPage_td_14_Template_button_click_12_listener() {
      const soldier_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.delete(soldier_r2));
    });
    \u0275\u0275elementStart(13, "mat-icon");
    \u0275\u0275text(14, "delete");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span");
    \u0275\u0275text(16, "\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const soldierMenu_r4 = \u0275\u0275reference(5);
    \u0275\u0275advance();
    \u0275\u0275property("matMenuTriggerFor", soldierMenu_r4);
  }
}
function PersonnelPage_th_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 37);
    \u0275\u0275text(1, "\u041F\u0406\u0411");
    \u0275\u0275elementEnd();
  }
}
function PersonnelPage_td_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 32)(1, "span", 38);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const soldier_r5 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatFIO(soldier_r5));
  }
}
function PersonnelPage_th_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 37);
    \u0275\u0275text(1, "\u041F\u043E\u0437\u0438\u0432\u043D\u0438\u0439");
    \u0275\u0275elementEnd();
  }
}
function PersonnelPage_td_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const soldier_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(soldier_r6.nickName);
  }
}
function PersonnelPage_th_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 37);
    \u0275\u0275text(1, "\u0417\u0432\u0430\u043D\u043D\u044F");
    \u0275\u0275elementEnd();
  }
}
function PersonnelPage_td_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const soldier_r7 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(soldier_r7.rankShortValue);
  }
}
function PersonnelPage_th_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 37);
    \u0275\u0275text(1, "\u041F\u043E\u0441\u0430\u0434\u0430");
    \u0275\u0275elementEnd();
  }
}
function PersonnelPage_td_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const soldier_r8 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(soldier_r8.positionValue);
  }
}
function PersonnelPage_th_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 37);
    \u0275\u0275text(1, "\u0421\u0442\u0430\u0442\u0443\u0441");
    \u0275\u0275elementEnd();
  }
}
function PersonnelPage_td_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 32)(1, "span", 39);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const soldier_r9 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(soldier_r9.stateValue);
  }
}
function PersonnelPage_th_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 37);
    \u0275\u0275text(1, "\u041F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B");
    \u0275\u0275elementEnd();
  }
}
function PersonnelPage_td_32_Conditional_1_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 46);
    \u0275\u0275text(1, "\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F...");
    \u0275\u0275elementEnd();
  }
}
function PersonnelPage_td_32_Conditional_1_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 47);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const unit_r12 = ctx.$implicit;
    \u0275\u0275property("value", unit_r12);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(unit_r12.value);
  }
}
function PersonnelPage_td_32_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 41)(1, "mat-form-field", 43);
    \u0275\u0275element(2, "input", 44);
    \u0275\u0275elementStart(3, "mat-autocomplete", 45, 1);
    \u0275\u0275listener("optionSelected", function PersonnelPage_td_32_Conditional_1_Template_mat_autocomplete_optionSelected_3_listener($event) {
      \u0275\u0275restoreView(_r10);
      const soldier_r11 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onSelect(soldier_r11, ctx_r2.UnitTag.UnitId, $event));
    });
    \u0275\u0275conditionalCreate(5, PersonnelPage_td_32_Conditional_1_Conditional_5_Template, 2, 0, "mat-option", 46);
    \u0275\u0275repeaterCreate(6, PersonnelPage_td_32_Conditional_1_For_7_Template, 2, 2, "mat-option", 47, _forTrack0);
    \u0275\u0275pipe(8, "async");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "button", 48);
    \u0275\u0275listener("click", function PersonnelPage_td_32_Conditional_1_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r10);
      const soldier_r11 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.inlineEdit.clear(soldier_r11.id));
    });
    \u0275\u0275elementStart(10, "mat-icon");
    \u0275\u0275text(11, "close");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const unitAuto_r13 = \u0275\u0275reference(4);
    const soldier_r11 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("formControl", ctx_r2.getControl(soldier_r11, ctx_r2.UnitTag.UnitId))("matAutocomplete", unitAuto_r13);
    \u0275\u0275advance();
    \u0275\u0275property("displayWith", ctx_r2.inlineEdit.displayLookupFn);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.inlineEdit.loading(soldier_r11.id) ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(\u0275\u0275pipeBind1(8, 4, ctx_r2.inlineEdit.options(soldier_r11.id)));
  }
}
function PersonnelPage_td_32_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 42)(1, "span", 49);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 50);
    \u0275\u0275listener("click", function PersonnelPage_td_32_Conditional_2_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r14);
      const soldier_r11 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.startEditing(soldier_r11, ctx_r2.UnitTag.UnitId));
    });
    \u0275\u0275elementStart(4, "mat-icon");
    \u0275\u0275text(5, "edit");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const soldier_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(soldier_r11.unitShortName);
  }
}
function PersonnelPage_td_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 40);
    \u0275\u0275conditionalCreate(1, PersonnelPage_td_32_Conditional_1_Template, 12, 6, "div", 41)(2, PersonnelPage_td_32_Conditional_2_Template, 6, 1, "div", 42);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const soldier_r11 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.inlineEdit.isMode(soldier_r11.id, ctx_r2.UnitTag.UnitId) ? 1 : 2);
  }
}
function PersonnelPage_th_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 37);
    \u0275\u0275text(1, "\u041F\u0440\u0438\u0434\u0430\u043D\u0438\u0439 \u0434\u043E");
    \u0275\u0275elementEnd();
  }
}
function PersonnelPage_td_35_Conditional_1_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 46);
    \u0275\u0275text(1, "\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F...");
    \u0275\u0275elementEnd();
  }
}
function PersonnelPage_td_35_Conditional_1_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 47);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const unit_r17 = ctx.$implicit;
    \u0275\u0275property("value", unit_r17);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(unit_r17.value);
  }
}
function PersonnelPage_td_35_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 41)(1, "mat-form-field", 43);
    \u0275\u0275element(2, "input", 52);
    \u0275\u0275elementStart(3, "mat-autocomplete", 45, 2);
    \u0275\u0275listener("optionSelected", function PersonnelPage_td_35_Conditional_1_Template_mat_autocomplete_optionSelected_3_listener($event) {
      \u0275\u0275restoreView(_r15);
      const soldier_r16 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onSelect(soldier_r16, ctx_r2.UnitTag.AssignedId, $event));
    });
    \u0275\u0275elementStart(5, "mat-option", 47);
    \u0275\u0275text(6, "\u041D\u0435 \u043F\u0440\u0438\u0434\u0430\u043D\u0438\u0439");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, PersonnelPage_td_35_Conditional_1_Conditional_7_Template, 2, 0, "mat-option", 46);
    \u0275\u0275repeaterCreate(8, PersonnelPage_td_35_Conditional_1_For_9_Template, 2, 2, "mat-option", 47, _forTrack0);
    \u0275\u0275pipe(10, "async");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "button", 48);
    \u0275\u0275listener("click", function PersonnelPage_td_35_Conditional_1_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r15);
      const soldier_r16 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.inlineEdit.clear(soldier_r16.id));
    });
    \u0275\u0275elementStart(12, "mat-icon");
    \u0275\u0275text(13, "close");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const assignedAuto_r18 = \u0275\u0275reference(4);
    const soldier_r16 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("formControl", ctx_r2.getControl(soldier_r16, ctx_r2.UnitTag.AssignedId))("matAutocomplete", assignedAuto_r18);
    \u0275\u0275advance();
    \u0275\u0275property("displayWith", ctx_r2.inlineEdit.displayLookupFn);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", null);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.inlineEdit.loading(soldier_r16.id) ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(\u0275\u0275pipeBind1(10, 5, ctx_r2.inlineEdit.options(soldier_r16.id)));
  }
}
function PersonnelPage_td_35_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 42)(1, "span", 49);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 50);
    \u0275\u0275listener("click", function PersonnelPage_td_35_Conditional_2_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r19);
      const soldier_r16 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.startEditing(soldier_r16, ctx_r2.UnitTag.AssignedId));
    });
    \u0275\u0275elementStart(4, "mat-icon");
    \u0275\u0275text(5, "edit");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const soldier_r16 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(soldier_r16.assignedUnitShortName || "-");
  }
}
function PersonnelPage_td_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 51);
    \u0275\u0275conditionalCreate(1, PersonnelPage_td_35_Conditional_1_Template, 14, 7, "div", 41)(2, PersonnelPage_td_35_Conditional_2_Template, 6, 1, "div", 42);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const soldier_r16 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.inlineEdit.isMode(soldier_r16.id, ctx_r2.UnitTag.AssignedId) ? 1 : 2);
  }
}
function PersonnelPage_th_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 37);
    \u0275\u0275text(1, "\u0415\u043A\u0456\u043F\u0430\u0436/\u0413\u0440\u0443\u043F\u0430");
    \u0275\u0275elementEnd();
  }
}
function PersonnelPage_td_38_Conditional_1_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 46);
    \u0275\u0275text(1, "\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F...");
    \u0275\u0275elementEnd();
  }
}
function PersonnelPage_td_38_Conditional_1_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 47);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const unit_r22 = ctx.$implicit;
    \u0275\u0275property("value", unit_r22);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(unit_r22.value);
  }
}
function PersonnelPage_td_38_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 41)(1, "mat-form-field", 43);
    \u0275\u0275element(2, "input", 54);
    \u0275\u0275elementStart(3, "mat-autocomplete", 45, 3);
    \u0275\u0275listener("optionSelected", function PersonnelPage_td_38_Conditional_1_Template_mat_autocomplete_optionSelected_3_listener($event) {
      \u0275\u0275restoreView(_r20);
      const soldier_r21 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onSelect(soldier_r21, ctx_r2.UnitTag.InvolvedId, $event));
    });
    \u0275\u0275elementStart(5, "mat-option", 47);
    \u0275\u0275text(6, "\u041D\u0435 \u043F\u0440\u0438\u0437\u043D\u0430\u0447\u0435\u043D\u043E");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, PersonnelPage_td_38_Conditional_1_Conditional_7_Template, 2, 0, "mat-option", 46);
    \u0275\u0275repeaterCreate(8, PersonnelPage_td_38_Conditional_1_For_9_Template, 2, 2, "mat-option", 47, _forTrack0);
    \u0275\u0275pipe(10, "async");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "button", 48);
    \u0275\u0275listener("click", function PersonnelPage_td_38_Conditional_1_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r20);
      const soldier_r21 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.inlineEdit.clear(soldier_r21.id));
    });
    \u0275\u0275elementStart(12, "mat-icon");
    \u0275\u0275text(13, "close");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const involvedAuto_r23 = \u0275\u0275reference(4);
    const soldier_r21 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("formControl", ctx_r2.getControl(soldier_r21, ctx_r2.UnitTag.InvolvedId))("matAutocomplete", involvedAuto_r23);
    \u0275\u0275advance();
    \u0275\u0275property("displayWith", ctx_r2.inlineEdit.displayLookupFn);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", null);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.inlineEdit.loading(soldier_r21.id) ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(\u0275\u0275pipeBind1(10, 5, ctx_r2.inlineEdit.options(soldier_r21.id)));
  }
}
function PersonnelPage_td_38_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 42)(1, "span", 49);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 50);
    \u0275\u0275listener("click", function PersonnelPage_td_38_Conditional_2_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r24);
      const soldier_r21 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.startEditing(soldier_r21, ctx_r2.UnitTag.InvolvedId));
    });
    \u0275\u0275elementStart(4, "mat-icon");
    \u0275\u0275text(5, "edit");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const soldier_r21 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(soldier_r21.involvedUnitShortName || "-");
  }
}
function PersonnelPage_td_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 53);
    \u0275\u0275conditionalCreate(1, PersonnelPage_td_38_Conditional_1_Template, 14, 7, "div", 41)(2, PersonnelPage_td_38_Conditional_2_Template, 6, 1, "div", 42);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const soldier_r21 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.inlineEdit.isMode(soldier_r21.id, ctx_r2.UnitTag.InvolvedId) ? 1 : 2);
  }
}
function PersonnelPage_th_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 37);
    \u0275\u0275text(1, "\u041F\u0440\u0438\u0431\u0443\u0432");
    \u0275\u0275elementEnd();
  }
}
function PersonnelPage_td_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 32);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const soldier_r25 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, soldier_r25.arrivedAt, "dd.MM.yyyy"));
  }
}
function PersonnelPage_th_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 37);
    \u0275\u0275text(1, "\u0412\u0438\u0431\u0443\u0432");
    \u0275\u0275elementEnd();
  }
}
function PersonnelPage_td_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 32);
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
function PersonnelPage_th_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 37);
    \u0275\u0275text(1, "\u041A\u043E\u043C\u0435\u043D\u0442\u0430\u0440");
    \u0275\u0275elementEnd();
  }
}
function PersonnelPage_td_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 55)(1, "span", 56);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "slice");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const soldier_r27 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("matTooltip", soldier_r27.comment && soldier_r27.comment.length > 50 ? soldier_r27.comment : "")("title", soldier_r27.comment && soldier_r27.comment.length > 50 ? soldier_r27.comment : "");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", soldier_r27.comment ? soldier_r27.comment.length > 50 ? \u0275\u0275pipeBind3(3, 3, soldier_r27.comment, 0, 50) + "..." : soldier_r27.comment : "-", " ");
  }
}
function PersonnelPage_tr_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 57);
  }
}
function PersonnelPage_tr_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 58);
  }
  if (rf & 2) {
    const row_r28 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("row-severe", ctx_r2.isSevereStatus(row_r28.stateId))("row-problematic", ctx_r2.isProblematicStatus(row_r28.stateId))("row-recovery", ctx_r2.isRecoveryStatus(row_r28.stateId));
  }
}
var PersonnelPage = class _PersonnelPage {
  soldierService = inject(SoldierService);
  unitService = inject(UnitService);
  dialog = inject(MatDialog);
  snackBar = inject(MatSnackBar);
  items = this.soldierService.createItemsSignal();
  dataSource = new MatTableDataSource([]);
  displayedColumns = [
    "menu",
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
  UnitTag = UnitTag;
  inlineEdit = new InlineEditManager((column, term) => this.unitService.lookup(term, column === UnitTag.InvolvedId));
  // Методы для проверки статусов
  isSevereStatus = isSevereStatus;
  isProblematicStatus = isProblematicStatus;
  isRecoveryStatus = isRecoveryStatus;
  sort;
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.reload();
  }
  reload() {
    this.soldierService.getAll().subscribe((soldiers) => {
      this.items.set(soldiers);
      this.dataSource.data = soldiers;
    });
  }
  // CREATE
  add() {
    const dialogRef = this.dialog.open(SoldierDialogComponent, {
      width: "600px",
      data: {
        model: {
          firstName: "",
          unitId: "",
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
          },
          error: (error) => {
            const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0441\u0442\u0432\u043E\u0440\u0435\u043D\u043D\u044F \u0431\u0456\u0439\u0446\u044F");
            this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
          }
        });
      }
    });
  }
  // UPDATE
  edit(soldier) {
    const dialogRef = this.dialog.open(SoldierDialogComponent, {
      width: "600px",
      data: {
        id: soldier.id,
        model: {
          firstName: soldier.firstName,
          midleName: soldier.midleName,
          lastName: soldier.lastName,
          nickName: soldier.nickName,
          unitId: soldier.unitId,
          arrivedAt: soldier.arrivedAt,
          departedAt: soldier.departedAt,
          assignedUnitId: soldier.assignedUnitId,
          involvedUnitId: soldier.involvedUnitId,
          rankId: soldier.rankId,
          positionId: soldier.positionId,
          stateId: soldier.stateId,
          comment: soldier.comment
        }
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
        this.applyRow(updated);
        this.inlineEdit.clear(soldier.id);
        this.snackBar.open(result.message, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 2e3 });
      },
      error: (error) => {
        const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043E\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u044F \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0443");
        this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
      }
    });
  }
  applyRow(updated) {
    const next = this.items().map((s) => s.id === updated.id ? updated : s);
    this.items.set(next);
    this.dataSource.data = next;
  }
  formatFIO(item) {
    return SoldierUtils.formatFIO(item.firstName, item.midleName, item.lastName);
  }
  static \u0275fac = function PersonnelPage_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PersonnelPage)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PersonnelPage, selectors: [["app-personnel-page"]], viewQuery: function PersonnelPage_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(MatSort, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.sort = _t.first);
    }
  }, decls: 50, vars: 4, consts: [["soldierMenu", "matMenu"], ["unitAuto", "matAutocomplete"], ["assignedAuto", "matAutocomplete"], ["involvedAuto", "matAutocomplete"], [1, "action-container"], [1, "action-buttons"], ["mat-raised-button", "", "color", "primary", 3, "click"], ["mat-raised-button", "", "color", "accent", 3, "click"], [1, "table-container"], ["mat-table", "", "matSort", "", 1, "mat-elevation-z8", 2, "width", "100%", 3, "dataSource"], ["matColumnDef", "menu"], ["mat-header-cell", "", "style", "width: 60px", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "fio"], ["mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["matColumnDef", "nickName"], ["matColumnDef", "rankShortValue"], ["matColumnDef", "positionValue"], ["matColumnDef", "stateValue"], ["matColumnDef", "unitShortName"], ["mat-cell", "", "class", "unit-cell", 4, "matCellDef"], ["matColumnDef", "assignedUnitShortName"], ["mat-cell", "", "class", "assigned-unit-cell", 4, "matCellDef"], ["matColumnDef", "involvedUnitShortName"], ["mat-cell", "", "class", "involved-unit-cell", 4, "matCellDef"], ["matColumnDef", "arrivedAt"], ["matColumnDef", "departedAt"], ["matColumnDef", "comment"], ["mat-cell", "", "class", "comment-cell", 4, "matCellDef"], ["mat-header-row", "", 4, "matHeaderRowDef", "matHeaderRowDefSticky"], ["mat-row", "", 3, "row-severe", "row-problematic", "row-recovery", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", "", 2, "width", "60px"], ["mat-cell", ""], ["mat-icon-button", "", "matTooltip", "\u0414\u0456\u0457 \u0437 \u0431\u0456\u0439\u0446\u0435\u043C", 3, "click", "matMenuTriggerFor"], ["mat-menu-item", "", 3, "click"], ["color", "accent"], ["mat-menu-item", "", 1, "delete-action", 3, "click"], ["mat-header-cell", "", "mat-sort-header", ""], [1, "fio"], [1, "state-badge"], ["mat-cell", "", 1, "unit-cell"], [1, "edit-mode"], [1, "view-mode"], ["appearance", "outline", 1, "inline-field"], ["type", "text", "matInput", "", "placeholder", "\u041E\u0441\u043D\u043E\u0432\u043D\u0438\u0439 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B", 3, "formControl", "matAutocomplete"], [3, "optionSelected", "displayWith"], ["disabled", ""], [3, "value"], ["mat-icon-button", "", "matTooltip", "\u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438", 1, "cancel-btn", 3, "click"], [1, "unit-text"], ["mat-icon-button", "", "matTooltip", "\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438", 1, "edit-btn", 3, "click"], ["mat-cell", "", 1, "assigned-unit-cell"], ["type", "text", "matInput", "", "placeholder", "\u041D\u0435 \u043F\u0440\u0438\u0434\u0430\u043D\u0438\u0439", 3, "formControl", "matAutocomplete"], ["mat-cell", "", 1, "involved-unit-cell"], ["type", "text", "matInput", "", "placeholder", "\u041D\u0435 \u043F\u0440\u0438\u0437\u043D\u0430\u0447\u0435\u043D\u043E", 3, "formControl", "matAutocomplete"], ["mat-cell", "", 1, "comment-cell"], [1, "comment-text", 3, "matTooltip", "title"], ["mat-header-row", ""], ["mat-row", ""]], template: function PersonnelPage_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 4)(1, "div", 5)(2, "button", 6);
      \u0275\u0275listener("click", function PersonnelPage_Template_button_click_2_listener() {
        return ctx.reload();
      });
      \u0275\u0275elementStart(3, "mat-icon");
      \u0275\u0275text(4, "refresh");
      \u0275\u0275elementEnd();
      \u0275\u0275text(5, " \u041E\u043D\u043E\u0432\u0438\u0442\u0438 ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "button", 7);
      \u0275\u0275listener("click", function PersonnelPage_Template_button_click_6_listener() {
        return ctx.add();
      });
      \u0275\u0275elementStart(7, "mat-icon");
      \u0275\u0275text(8, "person_add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(9, " \u0414\u043E\u0434\u0430\u0442\u0438 \u0431\u0456\u0439\u0446\u044F ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(10, "div", 8)(11, "table", 9);
      \u0275\u0275elementContainerStart(12, 10);
      \u0275\u0275template(13, PersonnelPage_th_13_Template, 2, 0, "th", 11)(14, PersonnelPage_td_14_Template, 17, 1, "td", 12);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(15, 13);
      \u0275\u0275template(16, PersonnelPage_th_16_Template, 2, 0, "th", 14)(17, PersonnelPage_td_17_Template, 3, 1, "td", 12);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(18, 15);
      \u0275\u0275template(19, PersonnelPage_th_19_Template, 2, 0, "th", 14)(20, PersonnelPage_td_20_Template, 2, 1, "td", 12);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(21, 16);
      \u0275\u0275template(22, PersonnelPage_th_22_Template, 2, 0, "th", 14)(23, PersonnelPage_td_23_Template, 2, 1, "td", 12);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(24, 17);
      \u0275\u0275template(25, PersonnelPage_th_25_Template, 2, 0, "th", 14)(26, PersonnelPage_td_26_Template, 2, 1, "td", 12);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(27, 18);
      \u0275\u0275template(28, PersonnelPage_th_28_Template, 2, 0, "th", 14)(29, PersonnelPage_td_29_Template, 3, 1, "td", 12);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(30, 19);
      \u0275\u0275template(31, PersonnelPage_th_31_Template, 2, 0, "th", 14)(32, PersonnelPage_td_32_Template, 3, 1, "td", 20);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(33, 21);
      \u0275\u0275template(34, PersonnelPage_th_34_Template, 2, 0, "th", 14)(35, PersonnelPage_td_35_Template, 3, 1, "td", 22);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(36, 23);
      \u0275\u0275template(37, PersonnelPage_th_37_Template, 2, 0, "th", 14)(38, PersonnelPage_td_38_Template, 3, 1, "td", 24);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(39, 25);
      \u0275\u0275template(40, PersonnelPage_th_40_Template, 2, 0, "th", 14)(41, PersonnelPage_td_41_Template, 3, 4, "td", 12);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(42, 26);
      \u0275\u0275template(43, PersonnelPage_th_43_Template, 2, 0, "th", 14)(44, PersonnelPage_td_44_Template, 3, 4, "td", 12);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(45, 27);
      \u0275\u0275template(46, PersonnelPage_th_46_Template, 2, 0, "th", 14)(47, PersonnelPage_td_47_Template, 4, 7, "td", 28);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275template(48, PersonnelPage_tr_48_Template, 1, 0, "tr", 29)(49, PersonnelPage_tr_49_Template, 1, 6, "tr", 30);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(11);
      \u0275\u0275property("dataSource", ctx.dataSource);
      \u0275\u0275advance(37);
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
    MatSelectModule,
    MatOption,
    MatOptionModule,
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
    MatAutocompleteTrigger,
    FormsModule,
    DefaultValueAccessor,
    NgControlStatus,
    ReactiveFormsModule,
    FormControlDirective,
    SlicePipe,
    DatePipe,
    AsyncPipe
  ], styles: ["\n\n.table-container[_ngcontent-%COMP%] {\n  flex: 1 1 auto;\n  overflow: auto;\n  border: 1px solid #ccc;\n}\n.table-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%] {\n  width: 100%;\n  min-width: 800px;\n}\n/*# sourceMappingURL=Personnel.page.css.map */", "\n\n[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  width: 100%;\n  overflow: hidden;\n}\n.table-container[_ngcontent-%COMP%] {\n  flex: 1 1 auto;\n  overflow: auto;\n  border: 1px solid #ccc;\n}\n.table-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%] {\n  width: 100%;\n  min-width: 800px;\n}\n.action-container[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  align-items: flex-end;\n  flex-wrap: wrap;\n  margin-bottom: 16px;\n  padding: 8px;\n  background: #f5f5f5;\n  border-radius: 8px;\n}\n.action-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.soldier-name[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.fio[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #1976d2;\n}\n.nickname[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #666;\n  font-style: italic;\n}\n.assigned-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  color: #ff9800;\n  margin-left: 4px;\n}\n.state-badge[_ngcontent-%COMP%] {\n  padding: 4px 8px;\n  border-radius: 12px;\n  font-size: 12px;\n  font-weight: 500;\n  background-color: #e3f2fd;\n  color: #1976d2;\n  border: 1px solid #bbdefb;\n}\n.comment-cell[_ngcontent-%COMP%] {\n  max-width: 200px;\n  width: 200px;\n}\n.comment-text[_ngcontent-%COMP%] {\n  display: block;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  max-width: 100%;\n  cursor: help;\n}\n.assigned-unit-cell[_ngcontent-%COMP%], \n.unit-cell[_ngcontent-%COMP%], \n.involved-unit-cell[_ngcontent-%COMP%] {\n  padding: 4px 8px !important;\n}\n.assigned-unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%], \n.unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%], \n.involved-unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  min-height: 32px;\n}\n.assigned-unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]   .unit-text[_ngcontent-%COMP%], \n.unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]   .unit-text[_ngcontent-%COMP%], \n.involved-unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]   .unit-text[_ngcontent-%COMP%] {\n  flex: 1;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.assigned-unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]   .edit-btn[_ngcontent-%COMP%], \n.unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]   .edit-btn[_ngcontent-%COMP%], \n.involved-unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]   .edit-btn[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  line-height: 28px;\n  opacity: 0;\n  transition: opacity 0.2s;\n}\n.assigned-unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]   .edit-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], \n.unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]   .edit-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], \n.involved-unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]   .edit-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n  line-height: 18px;\n}\n.assigned-unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]:hover   .edit-btn[_ngcontent-%COMP%], \n.unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]:hover   .edit-btn[_ngcontent-%COMP%], \n.involved-unit-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]:hover   .edit-btn[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.assigned-unit-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%], \n.unit-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%], \n.involved-unit-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.assigned-unit-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%], \n.unit-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%], \n.involved-unit-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  line-height: 28px;\n  flex-shrink: 0;\n}\n.assigned-unit-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], \n.unit-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], \n.involved-unit-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n  line-height: 18px;\n}\n.assigned-unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%], \n.unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%], \n.involved-unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%] {\n  flex: 1;\n  margin: 0;\n  font-size: 14px;\n}\n.assigned-unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%]     .mat-mdc-text-field-wrapper, \n.unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%]     .mat-mdc-text-field-wrapper, \n.involved-unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%]     .mat-mdc-text-field-wrapper {\n  padding: 0;\n}\n.assigned-unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%]     .mat-mdc-form-field-flex, \n.unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%]     .mat-mdc-form-field-flex, \n.involved-unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%]     .mat-mdc-form-field-flex {\n  padding: 4px 8px;\n  min-height: 32px;\n}\n.assigned-unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%]     .mat-mdc-form-field-infix, \n.unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%]     .mat-mdc-form-field-infix, \n.involved-unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%]     .mat-mdc-form-field-infix {\n  padding-top: 4px;\n  padding-bottom: 4px;\n  min-height: 24px;\n}\n.assigned-unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%]     .mat-mdc-form-field-subscript-wrapper, \n.unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%]     .mat-mdc-form-field-subscript-wrapper, \n.involved-unit-cell[_ngcontent-%COMP%]   .inline-field[_ngcontent-%COMP%]     .mat-mdc-form-field-subscript-wrapper {\n  display: none;\n}\n@media (max-width: 768px) {\n  .mat-column-comment[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n@media (max-width: 600px) {\n  .mat-column-assignedUnitShortName[_ngcontent-%COMP%], \n   .mat-column-positionValue[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n.mat-mdc-row[_ngcontent-%COMP%] {\n  transition: background-color 0.2s ease;\n}\n.mat-mdc-row.row-critical[_ngcontent-%COMP%] {\n  background-color: #ffebee !important;\n}\n.mat-mdc-row.row-critical[_ngcontent-%COMP%]:hover {\n  background-color: #ffcdd2 !important;\n}\n.mat-mdc-row.row-critical[_ngcontent-%COMP%]   .state-badge[_ngcontent-%COMP%] {\n  background-color: #b71c1c;\n  color: white;\n  border-color: #b71c1c;\n}\n.mat-mdc-row.row-severe[_ngcontent-%COMP%] {\n  background-color: #fff3e0 !important;\n}\n.mat-mdc-row.row-severe[_ngcontent-%COMP%]:hover {\n  background-color: #ffe0b2 !important;\n}\n.mat-mdc-row.row-severe[_ngcontent-%COMP%]   .state-badge[_ngcontent-%COMP%] {\n  background-color: #ef6c00;\n  color: white;\n  border-color: #ef6c00;\n}\n.mat-mdc-row.row-problematic[_ngcontent-%COMP%] {\n  background-color: #fffde7 !important;\n}\n.mat-mdc-row.row-problematic[_ngcontent-%COMP%]:hover {\n  background-color: #fff9c4 !important;\n}\n.mat-mdc-row.row-problematic[_ngcontent-%COMP%]   .state-badge[_ngcontent-%COMP%] {\n  background-color: #f57f17;\n  color: white;\n  border-color: #f57f17;\n}\n.mat-mdc-row.row-recovery[_ngcontent-%COMP%] {\n  background-color: #e8f5e9 !important;\n}\n.mat-mdc-row.row-recovery[_ngcontent-%COMP%]:hover {\n  background-color: #c8e6c9 !important;\n}\n.mat-mdc-row.row-recovery[_ngcontent-%COMP%]   .state-badge[_ngcontent-%COMP%] {\n  background-color: #2e7d32;\n  color: white;\n  border-color: #2e7d32;\n}\n.mat-mdc-row.row-seconded[_ngcontent-%COMP%] {\n  background-color: #fffde7 !important;\n}\n.mat-mdc-row.row-seconded[_ngcontent-%COMP%]:hover {\n  background-color: #fff9c4 !important;\n}\n/*# sourceMappingURL=Soldier.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PersonnelPage, [{
    type: Component,
    args: [{ selector: "app-personnel-page", standalone: true, imports: [
      MatTableModule,
      MatButtonModule,
      MatSortModule,
      MatIconModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatOptionModule,
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
    <button mat-raised-button color="accent" (click)="add()">
      <mat-icon>person_add</mat-icon>
      \u0414\u043E\u0434\u0430\u0442\u0438 \u0431\u0456\u0439\u0446\u044F
    </button>
  </div>
</div>

<div class="table-container">
    <table mat-table [dataSource]="dataSource" matSort class="mat-elevation-z8" style="width: 100%">
        <!-- Menu Column -->
        <ng-container matColumnDef="menu">
            <th mat-header-cell *matHeaderCellDef style="width: 60px">\u0414\u0456\u0457</th>
            <td mat-cell *matCellDef="let soldier">
                <button mat-icon-button
                        [matMenuTriggerFor]="soldierMenu"
                        matTooltip="\u0414\u0456\u0457 \u0437 \u0431\u0456\u0439\u0446\u0435\u043C"
                        (click)="$event.stopPropagation()">
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
                @if (inlineEdit.isMode(soldier.id, UnitTag.UnitId)) {
                <div class="edit-mode">
                    <mat-form-field appearance="outline" class="inline-field">
                        <input type="text"
                               matInput
                               [formControl]="getControl(soldier, UnitTag.UnitId)"
                               [matAutocomplete]="unitAuto"
                               placeholder="\u041E\u0441\u043D\u043E\u0432\u043D\u0438\u0439 \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B" />
                        <mat-autocomplete #unitAuto="matAutocomplete"
                                          [displayWith]="inlineEdit.displayLookupFn"
                                          (optionSelected)="onSelect(soldier, UnitTag.UnitId, $event)">
                            @if (inlineEdit.loading(soldier.id)) {
                            <mat-option disabled>\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F...</mat-option>
                            } @for (unit of inlineEdit.options(soldier.id) | async; track unit.id) {
                            <mat-option [value]="unit">{{ unit.value }}</mat-option>
                            }
                        </mat-autocomplete>
                    </mat-form-field>
                    <button mat-icon-button
                            class="cancel-btn"
                            (click)="inlineEdit.clear(soldier.id)"
                            matTooltip="\u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438">
                        <mat-icon>close</mat-icon>
                    </button>
                </div>
                } @else {
                <div class="view-mode">
                    <span class="unit-text">{{ soldier.unitShortName }}</span>
                    <button mat-icon-button
                            class="edit-btn"
                            (click)="startEditing(soldier, UnitTag.UnitId)"
                            matTooltip="\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438">
                        <mat-icon>edit</mat-icon>
                    </button>
                </div>
                }
            </td>
        </ng-container>

        <!-- Assigned Unit Column -->
        <ng-container matColumnDef="assignedUnitShortName">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>\u041F\u0440\u0438\u0434\u0430\u043D\u0438\u0439 \u0434\u043E</th>
            <td mat-cell *matCellDef="let soldier" class="assigned-unit-cell">
                @if (inlineEdit.isMode(soldier.id, UnitTag.AssignedId)) {
                <div class="edit-mode">
                    <mat-form-field appearance="outline" class="inline-field">
                        <input type="text"
                               matInput
                               [formControl]="getControl(soldier, UnitTag.AssignedId)"
                               [matAutocomplete]="assignedAuto"
                               placeholder="\u041D\u0435 \u043F\u0440\u0438\u0434\u0430\u043D\u0438\u0439" />
                        <mat-autocomplete #assignedAuto="matAutocomplete"
                                          [displayWith]="inlineEdit.displayLookupFn"
                                          (optionSelected)="onSelect(soldier, UnitTag.AssignedId, $event)">
                            <mat-option [value]="null">\u041D\u0435 \u043F\u0440\u0438\u0434\u0430\u043D\u0438\u0439</mat-option>
                            @if (inlineEdit.loading(soldier.id)) {
                            <mat-option disabled>\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F...</mat-option>
                            } @for (unit of inlineEdit.options(soldier.id) | async; track unit.id) {
                            <mat-option [value]="unit">{{ unit.value }}</mat-option>
                            }
                        </mat-autocomplete>
                    </mat-form-field>
                    <button mat-icon-button
                            class="cancel-btn"
                            (click)="inlineEdit.clear(soldier.id)"
                            matTooltip="\u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438">
                        <mat-icon>close</mat-icon>
                    </button>
                </div>
                } @else {
                <div class="view-mode">
                    <span class="unit-text">{{ soldier.assignedUnitShortName || '-' }}</span>
                    <button mat-icon-button
                            class="edit-btn"
                            (click)="startEditing(soldier, UnitTag.AssignedId)"
                            matTooltip="\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438">
                        <mat-icon>edit</mat-icon>
                    </button>
                </div>
                }
            </td>
        </ng-container>

        <!-- involved Unit Column -->
        <ng-container matColumnDef="involvedUnitShortName">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>\u0415\u043A\u0456\u043F\u0430\u0436/\u0413\u0440\u0443\u043F\u0430</th>
            <td mat-cell *matCellDef="let soldier" class="involved-unit-cell">
                @if (inlineEdit.isMode(soldier.id, UnitTag.InvolvedId)) {
                <div class="edit-mode">
                    <mat-form-field appearance="outline" class="inline-field">
                        <input type="text"
                               matInput
                               [formControl]="getControl(soldier, UnitTag.InvolvedId)"
                               [matAutocomplete]="involvedAuto"
                               placeholder="\u041D\u0435 \u043F\u0440\u0438\u0437\u043D\u0430\u0447\u0435\u043D\u043E" />
                        <mat-autocomplete #involvedAuto="matAutocomplete"
                                          [displayWith]="inlineEdit.displayLookupFn"
                                          (optionSelected)="onSelect(soldier, UnitTag.InvolvedId, $event)">
                            <mat-option [value]="null">\u041D\u0435 \u043F\u0440\u0438\u0437\u043D\u0430\u0447\u0435\u043D\u043E</mat-option>
                            @if (inlineEdit.loading(soldier.id)) {
                            <mat-option disabled>\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F...</mat-option>
                            } @for (unit of inlineEdit.options(soldier.id) | async; track unit.id) {
                            <mat-option [value]="unit">{{ unit.value }}</mat-option>
                            }
                        </mat-autocomplete>
                    </mat-form-field>
                    <button mat-icon-button
                            class="cancel-btn"
                            (click)="inlineEdit.clear(soldier.id)"
                            matTooltip="\u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438">
                        <mat-icon>close</mat-icon>
                    </button>
                </div>
                } @else {
                <div class="view-mode">
                    <span class="unit-text">{{ soldier.involvedUnitShortName || '-' }}</span>
                    <button mat-icon-button
                            class="edit-btn"
                            (click)="startEditing(soldier, UnitTag.InvolvedId)"
                            matTooltip="\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438">
                        <mat-icon>edit</mat-icon>
                    </button>
                </div>
                }
            </td>
        </ng-container>

        <!-- ArrivedAt Column -->
        <ng-container matColumnDef="arrivedAt">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>\u041F\u0440\u0438\u0431\u0443\u0432</th>
            <td mat-cell *matCellDef="let soldier">{{ soldier.arrivedAt | date : 'dd.MM.yyyy' }}</td>
        </ng-container>

        <!-- DepartedAt Column -->
        <ng-container matColumnDef="departedAt">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>\u0412\u0438\u0431\u0443\u0432</th>
            <td mat-cell *matCellDef="let soldier">
                {{ soldier.departedAt ? (soldier.departedAt | date : 'dd.MM.yyyy') : '-' }}
            </td>
        </ng-container>

        <!-- Comment Column -->
        <ng-container matColumnDef="comment">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>\u041A\u043E\u043C\u0435\u043D\u0442\u0430\u0440</th>
            <td mat-cell *matCellDef="let soldier" class="comment-cell">
                <span class="comment-text"
                      [matTooltip]="soldier.comment && soldier.comment.length > 50 ? soldier.comment : ''"
                      [title]="soldier.comment && soldier.comment.length > 50 ? soldier.comment : ''">
                    {{
            soldier.comment
              ? soldier.comment.length > 50
                ? (soldier.comment | slice : 0 : 50) + '...'
                : soldier.comment
              : '-'
                    }}
                </span>
            </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns; sticky: true"></tr>
        <tr mat-row
            *matRowDef="let row; columns: displayedColumns"
            [class.row-severe]="isSevereStatus(row.stateId)"
            [class.row-problematic]="isProblematicStatus(row.stateId)"
            [class.row-recovery]="isRecoveryStatus(row.stateId)"></tr>
    </table>
</div>
`, styles: ["/* src/app/Personnel/Personnel.page.scss */\n.table-container {\n  flex: 1 1 auto;\n  overflow: auto;\n  border: 1px solid #ccc;\n}\n.table-container table {\n  width: 100%;\n  min-width: 800px;\n}\n/*# sourceMappingURL=Personnel.page.css.map */\n", "/* src/app/Soldier/Soldier.component.scss */\n:host {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  width: 100%;\n  overflow: hidden;\n}\n.table-container {\n  flex: 1 1 auto;\n  overflow: auto;\n  border: 1px solid #ccc;\n}\n.table-container table {\n  width: 100%;\n  min-width: 800px;\n}\n.action-container {\n  display: flex;\n  gap: 16px;\n  align-items: flex-end;\n  flex-wrap: wrap;\n  margin-bottom: 16px;\n  padding: 8px;\n  background: #f5f5f5;\n  border-radius: 8px;\n}\n.action-buttons {\n  display: flex;\n  gap: 8px;\n}\n.soldier-name {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.fio {\n  font-weight: 500;\n  color: #1976d2;\n}\n.nickname {\n  font-size: 12px;\n  color: #666;\n  font-style: italic;\n}\n.assigned-icon {\n  font-size: 16px;\n  color: #ff9800;\n  margin-left: 4px;\n}\n.state-badge {\n  padding: 4px 8px;\n  border-radius: 12px;\n  font-size: 12px;\n  font-weight: 500;\n  background-color: #e3f2fd;\n  color: #1976d2;\n  border: 1px solid #bbdefb;\n}\n.comment-cell {\n  max-width: 200px;\n  width: 200px;\n}\n.comment-text {\n  display: block;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  max-width: 100%;\n  cursor: help;\n}\n.assigned-unit-cell,\n.unit-cell,\n.involved-unit-cell {\n  padding: 4px 8px !important;\n}\n.assigned-unit-cell .view-mode,\n.unit-cell .view-mode,\n.involved-unit-cell .view-mode {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  min-height: 32px;\n}\n.assigned-unit-cell .view-mode .unit-text,\n.unit-cell .view-mode .unit-text,\n.involved-unit-cell .view-mode .unit-text {\n  flex: 1;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.assigned-unit-cell .view-mode .edit-btn,\n.unit-cell .view-mode .edit-btn,\n.involved-unit-cell .view-mode .edit-btn {\n  width: 28px;\n  height: 28px;\n  line-height: 28px;\n  opacity: 0;\n  transition: opacity 0.2s;\n}\n.assigned-unit-cell .view-mode .edit-btn mat-icon,\n.unit-cell .view-mode .edit-btn mat-icon,\n.involved-unit-cell .view-mode .edit-btn mat-icon {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n  line-height: 18px;\n}\n.assigned-unit-cell .view-mode:hover .edit-btn,\n.unit-cell .view-mode:hover .edit-btn,\n.involved-unit-cell .view-mode:hover .edit-btn {\n  opacity: 1;\n}\n.assigned-unit-cell .edit-mode,\n.unit-cell .edit-mode,\n.involved-unit-cell .edit-mode {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.assigned-unit-cell .edit-mode .cancel-btn,\n.unit-cell .edit-mode .cancel-btn,\n.involved-unit-cell .edit-mode .cancel-btn {\n  width: 28px;\n  height: 28px;\n  line-height: 28px;\n  flex-shrink: 0;\n}\n.assigned-unit-cell .edit-mode .cancel-btn mat-icon,\n.unit-cell .edit-mode .cancel-btn mat-icon,\n.involved-unit-cell .edit-mode .cancel-btn mat-icon {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n  line-height: 18px;\n}\n.assigned-unit-cell .inline-field,\n.unit-cell .inline-field,\n.involved-unit-cell .inline-field {\n  flex: 1;\n  margin: 0;\n  font-size: 14px;\n}\n.assigned-unit-cell .inline-field ::ng-deep .mat-mdc-text-field-wrapper,\n.unit-cell .inline-field ::ng-deep .mat-mdc-text-field-wrapper,\n.involved-unit-cell .inline-field ::ng-deep .mat-mdc-text-field-wrapper {\n  padding: 0;\n}\n.assigned-unit-cell .inline-field ::ng-deep .mat-mdc-form-field-flex,\n.unit-cell .inline-field ::ng-deep .mat-mdc-form-field-flex,\n.involved-unit-cell .inline-field ::ng-deep .mat-mdc-form-field-flex {\n  padding: 4px 8px;\n  min-height: 32px;\n}\n.assigned-unit-cell .inline-field ::ng-deep .mat-mdc-form-field-infix,\n.unit-cell .inline-field ::ng-deep .mat-mdc-form-field-infix,\n.involved-unit-cell .inline-field ::ng-deep .mat-mdc-form-field-infix {\n  padding-top: 4px;\n  padding-bottom: 4px;\n  min-height: 24px;\n}\n.assigned-unit-cell .inline-field ::ng-deep .mat-mdc-form-field-subscript-wrapper,\n.unit-cell .inline-field ::ng-deep .mat-mdc-form-field-subscript-wrapper,\n.involved-unit-cell .inline-field ::ng-deep .mat-mdc-form-field-subscript-wrapper {\n  display: none;\n}\n@media (max-width: 768px) {\n  .mat-column-comment {\n    display: none;\n  }\n}\n@media (max-width: 600px) {\n  .mat-column-assignedUnitShortName,\n  .mat-column-positionValue {\n    display: none;\n  }\n}\n.mat-mdc-row {\n  transition: background-color 0.2s ease;\n}\n.mat-mdc-row.row-critical {\n  background-color: #ffebee !important;\n}\n.mat-mdc-row.row-critical:hover {\n  background-color: #ffcdd2 !important;\n}\n.mat-mdc-row.row-critical .state-badge {\n  background-color: #b71c1c;\n  color: white;\n  border-color: #b71c1c;\n}\n.mat-mdc-row.row-severe {\n  background-color: #fff3e0 !important;\n}\n.mat-mdc-row.row-severe:hover {\n  background-color: #ffe0b2 !important;\n}\n.mat-mdc-row.row-severe .state-badge {\n  background-color: #ef6c00;\n  color: white;\n  border-color: #ef6c00;\n}\n.mat-mdc-row.row-problematic {\n  background-color: #fffde7 !important;\n}\n.mat-mdc-row.row-problematic:hover {\n  background-color: #fff9c4 !important;\n}\n.mat-mdc-row.row-problematic .state-badge {\n  background-color: #f57f17;\n  color: white;\n  border-color: #f57f17;\n}\n.mat-mdc-row.row-recovery {\n  background-color: #e8f5e9 !important;\n}\n.mat-mdc-row.row-recovery:hover {\n  background-color: #c8e6c9 !important;\n}\n.mat-mdc-row.row-recovery .state-badge {\n  background-color: #2e7d32;\n  color: white;\n  border-color: #2e7d32;\n}\n.mat-mdc-row.row-seconded {\n  background-color: #fffde7 !important;\n}\n.mat-mdc-row.row-seconded:hover {\n  background-color: #fff9c4 !important;\n}\n/*# sourceMappingURL=Soldier.component.css.map */\n"] }]
  }], null, { sort: [{
    type: ViewChild,
    args: [MatSort]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PersonnelPage, { className: "PersonnelPage", filePath: "app/Personnel/Personnel.page.ts", lineNumber: 69 });
})();
export {
  PersonnelPage
};
//# sourceMappingURL=chunk-YK6T2DCT.js.map
