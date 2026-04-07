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
  DictAreaTypeService
} from "./chunk-DCOM7Q2J.js";
import "./chunk-KXVZIITG.js";
import {
  VerticalLayoutComponent
} from "./chunk-YKIDVNWZ.js";
import {
  DictTemplateCategoriesService
} from "./chunk-B4CHDVDK.js";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-TBM54MBO.js";
import {
  MatTooltip,
  MatTooltipModule
} from "./chunk-5FRFCUEI.js";
import "./chunk-JGYX5BI4.js";
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
  MatSnackBar
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
  FormsModule,
  MatFormField,
  MatFormFieldModule,
  MatIcon,
  MatIconModule,
  MatInput,
  MatInputModule,
  MatLabel,
  NgControlStatus,
  NgModel,
  NumberValueAccessor,
  RequiredValidator
} from "./chunk-GX6V5MPD.js";
import {
  AsyncPipe,
  ChangeDetectionStrategy,
  CommonModule,
  Component,
  EventEmitter,
  HttpClient,
  Inject,
  Injectable,
  Input,
  MatButton,
  MatButtonModule,
  MatIconButton,
  NgForOf,
  Output,
  ViewChild,
  __spreadProps,
  __spreadValues,
  effect,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
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
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-6223PFVC.js";

// src/app/dialogs/DictUnitTask-dialog.component.ts
function DictUnitTaskDialogComponent_mat_option_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 13);
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
var DictUnitTaskDialogComponent = class _DictUnitTaskDialogComponent {
  dialogRef;
  data;
  snackBar = inject(MatSnackBar);
  dictAreaTypeService = inject(DictAreaTypeService);
  areaTypes = [];
  constructor(dialogRef, data) {
    this.dialogRef = dialogRef;
    this.data = data;
    if (this.data.withMeans === void 0) {
      this.data.withMeans = false;
    }
    this.loadAreaTypes();
  }
  loadAreaTypes() {
    this.dictAreaTypeService.getAll().subscribe({
      next: (types) => this.areaTypes = types,
      error: (error) => {
        console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u0442\u0438\u043F\u0456\u0432 \u0420\u0412\u0417:", error);
        this.snackBar.open("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u0442\u0438\u043F\u0456\u0432 \u0420\u0412\u0417", "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
      }
    });
  }
  isValid() {
    return !!(this.data.value?.trim() && this.data.amount !== void 0 && this.data.amount >= 0 && this.data.areaTypeId?.trim());
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
  static \u0275fac = function DictUnitTaskDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DictUnitTaskDialogComponent)(\u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DictUnitTaskDialogComponent, selectors: [["app-dict-unit-task-dialog"]], decls: 28, vars: 8, consts: [["mat-dialog-title", ""], [1, "content"], ["appearance", "outline", 1, "full-width"], ["matInput", "", "required", "", 3, "ngModelChange", "ngModel"], ["matInput", "", "type", "number", "required", "", 3, "ngModelChange", "ngModel"], ["matInput", "", "rows", "2", 3, "ngModelChange", "ngModel"], [1, "checkbox-group"], [3, "ngModelChange", "ngModel"], ["required", "", 3, "ngModelChange", "ngModel"], [3, "value", 4, "ngFor", "ngForOf"], ["align", "end", 1, "actions"], ["mat-button", "", 3, "click"], ["mat-raised-button", "", "color", "primary", 3, "click", "disabled"], [3, "value"]], template: function DictUnitTaskDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "h2", 0);
      \u0275\u0275text(1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(2, "mat-dialog-content", 1)(3, "mat-form-field", 2)(4, "mat-label");
      \u0275\u0275text(5, "\u041D\u0430\u0437\u0432\u0430");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "input", 3);
      \u0275\u0275twoWayListener("ngModelChange", function DictUnitTaskDialogComponent_Template_input_ngModelChange_6_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.data.value, $event) || (ctx.data.value = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "mat-form-field", 2)(8, "mat-label");
      \u0275\u0275text(9, "\u0421\u0443\u043C\u0430 (\u0433\u0440\u043D)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "input", 4);
      \u0275\u0275twoWayListener("ngModelChange", function DictUnitTaskDialogComponent_Template_input_ngModelChange_10_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.data.amount, $event) || (ctx.data.amount = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "mat-form-field", 2)(12, "mat-label");
      \u0275\u0275text(13, "\u041A\u043E\u043C\u0435\u043D\u0442\u0430\u0440");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "textarea", 5);
      \u0275\u0275twoWayListener("ngModelChange", function DictUnitTaskDialogComponent_Template_textarea_ngModelChange_14_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.data.comment, $event) || (ctx.data.comment = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "div", 6)(16, "mat-checkbox", 7);
      \u0275\u0275twoWayListener("ngModelChange", function DictUnitTaskDialogComponent_Template_mat_checkbox_ngModelChange_16_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.data.withMeans, $event) || (ctx.data.withMeans = $event);
        return $event;
      });
      \u0275\u0275text(17, " \u0412\u0438\u043A\u043E\u0440\u0438\u0441\u0442\u043E\u0432\u0443\u044E\u0442\u044C\u0441\u044F \u0437\u0430\u0441\u043E\u0431\u0438 \u0443\u0440\u0430\u0436\u0435\u043D\u043D\u044F (\u0411\u041F\u041B\u0410) ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "mat-form-field", 2)(19, "mat-label");
      \u0275\u0275text(20, "\u0422\u0438\u043F \u041D\u0430\u043F\u0440\u044F\u043C\u043A\u0443 \u041B\u0411\u0417/\u0422\u0438\u043F \u0420\u0412\u0417");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "mat-select", 8);
      \u0275\u0275twoWayListener("ngModelChange", function DictUnitTaskDialogComponent_Template_mat_select_ngModelChange_21_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.data.areaTypeId, $event) || (ctx.data.areaTypeId = $event);
        return $event;
      });
      \u0275\u0275template(22, DictUnitTaskDialogComponent_mat_option_22_Template, 2, 3, "mat-option", 9);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(23, "mat-dialog-actions", 10)(24, "button", 11);
      \u0275\u0275listener("click", function DictUnitTaskDialogComponent_Template_button_click_24_listener() {
        return ctx.onCancel();
      });
      \u0275\u0275text(25, "\u0421\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "button", 12);
      \u0275\u0275listener("click", function DictUnitTaskDialogComponent_Template_button_click_26_listener() {
        return ctx.onSave();
      });
      \u0275\u0275text(27, " \u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438 ");
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275textInterpolate(ctx.data.id ? "\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u043D\u043D\u044F \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F" : "\u0421\u0442\u0432\u043E\u0440\u0435\u043D\u043D\u044F \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F");
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.data.value);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.data.amount);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.data.comment);
      \u0275\u0275advance(2);
      \u0275\u0275twoWayProperty("ngModel", ctx.data.withMeans);
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.data.areaTypeId);
      \u0275\u0275advance();
      \u0275\u0275property("ngForOf", ctx.areaTypes);
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", !ctx.isValid());
    }
  }, dependencies: [CommonModule, NgForOf, FormsModule, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, RequiredValidator, NgModel, MatDialogModule, MatDialogTitle, MatDialogActions, MatDialogContent, MatFormFieldModule, MatFormField, MatLabel, MatInputModule, MatInput, MatButtonModule, MatButton, MatCheckboxModule, MatCheckbox, MatSelectModule, MatSelect, MatOption], styles: ["\n\n.title[_ngcontent-%COMP%] {\n  text-align: center;\n  margin: 0;\n}\n.content[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 12px;\n  min-width: 280px;\n  max-width: 520px;\n  padding-top: 10px !important;\n}\n  .content .mat-mdc-form-field {\n  width: 100%;\n}\n.actions[_ngcontent-%COMP%] {\n  gap: 8px;\n}\n/*# sourceMappingURL=DialogShared.css.map */", "\n\n.checkbox-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n/*# sourceMappingURL=DictUnitTask-dialog.component.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DictUnitTaskDialogComponent, [{
    type: Component,
    args: [{ selector: "app-dict-unit-task-dialog", standalone: true, imports: [
      CommonModule,
      FormsModule,
      MatDialogModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatCheckboxModule,
      MatSelectModule
    ], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <h2 mat-dialog-title>{{ data.id ? '\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u043D\u043D\u044F \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F' : '\u0421\u0442\u0432\u043E\u0440\u0435\u043D\u043D\u044F \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F' }}</h2>
    <mat-dialog-content class="content">
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>\u041D\u0430\u0437\u0432\u0430</mat-label>
        <input matInput [(ngModel)]="data.value" required />
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>\u0421\u0443\u043C\u0430 (\u0433\u0440\u043D)</mat-label>
        <input matInput type="number" [(ngModel)]="data.amount" required />
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>\u041A\u043E\u043C\u0435\u043D\u0442\u0430\u0440</mat-label>
        <textarea matInput [(ngModel)]="data.comment" rows="2"></textarea>
      </mat-form-field>

      <div class="checkbox-group">
        <mat-checkbox [(ngModel)]="data.withMeans">
          \u0412\u0438\u043A\u043E\u0440\u0438\u0441\u0442\u043E\u0432\u0443\u044E\u0442\u044C\u0441\u044F \u0437\u0430\u0441\u043E\u0431\u0438 \u0443\u0440\u0430\u0436\u0435\u043D\u043D\u044F (\u0411\u041F\u041B\u0410)
        </mat-checkbox>
      </div>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>\u0422\u0438\u043F \u041D\u0430\u043F\u0440\u044F\u043C\u043A\u0443 \u041B\u0411\u0417/\u0422\u0438\u043F \u0420\u0412\u0417</mat-label>
        <mat-select [(ngModel)]="data.areaTypeId" required>
          <mat-option *ngFor="let areaType of areaTypes" [value]="areaType.id">
            {{ areaType.value }} ({{ areaType.shortValue }})
          </mat-option>
        </mat-select>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end" class="actions">
      <button mat-button (click)="onCancel()">\u0421\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438</button>
      <button mat-raised-button color="primary" (click)="onSave()" [disabled]="!isValid()">
        \u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438
      </button>
    </mat-dialog-actions>
  `, styles: ["/* src/app/dialogs/DialogShared.scss */\n.title {\n  text-align: center;\n  margin: 0;\n}\n.content {\n  display: grid;\n  gap: 12px;\n  min-width: 280px;\n  max-width: 520px;\n  padding-top: 10px !important;\n}\n::ng-deep .content .mat-mdc-form-field {\n  width: 100%;\n}\n.actions {\n  gap: 8px;\n}\n/*# sourceMappingURL=DialogShared.css.map */\n", "/* angular:styles/component:css;0c7e4db75e319735b26ed26cfc706ddc53d3360d9026c5b5bdd3e7db7fdafd61;/home/havrok/projects/work/411/s5/s5app/Menu/S5Server/Front/src/app/dialogs/DictUnitTask-dialog.component.ts */\n.checkbox-group {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n/*# sourceMappingURL=DictUnitTask-dialog.component.css.map */\n"] }]
  }], () => [{ type: MatDialogRef }, { type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DictUnitTaskDialogComponent, { className: "DictUnitTaskDialogComponent", filePath: "app/dialogs/DictUnitTask-dialog.component.ts", lineNumber: 79 });
})();

// src/dictionaries/UnitTask/dictUnitTask.component.ts
function DictUnitTaskComponent_th_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 17);
    \u0275\u0275text(1, "\u041D\u0430\u0437\u0432\u0430");
    \u0275\u0275elementEnd();
  }
}
function DictUnitTaskComponent_td_13_Template(rf, ctx) {
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
function DictUnitTaskComponent_th_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 17);
    \u0275\u0275text(1, "\u0421\u0443\u043C\u0430 (\u0433\u0440\u043D)");
    \u0275\u0275elementEnd();
  }
}
function DictUnitTaskComponent_td_16_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 20)(1, "input", 22);
    \u0275\u0275twoWayListener("ngModelChange", function DictUnitTaskComponent_td_16_Conditional_1_Template_input_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.editingValue, $event) || (ctx_r2.editingValue = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function DictUnitTaskComponent_td_16_Conditional_1_Template_input_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.updateEditingValue($event));
    })("click", function DictUnitTaskComponent_td_16_Conditional_1_Template_input_click_1_listener($event) {
      \u0275\u0275restoreView(_r2);
      return \u0275\u0275resetView($event.stopPropagation());
    })("keydown.enter", function DictUnitTaskComponent_td_16_Conditional_1_Template_input_keydown_enter_1_listener($event) {
      \u0275\u0275restoreView(_r2);
      const item_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.saveFieldChange(item_r4, "amount", $event));
    })("keydown.escape", function DictUnitTaskComponent_td_16_Conditional_1_Template_input_keydown_escape_1_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.cancelEditing($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 23);
    \u0275\u0275listener("click", function DictUnitTaskComponent_td_16_Conditional_1_Template_button_click_2_listener($event) {
      \u0275\u0275restoreView(_r2);
      const item_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.saveFieldChange(item_r4, "amount", $event));
    });
    \u0275\u0275elementStart(3, "mat-icon");
    \u0275\u0275text(4, "check");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "button", 24);
    \u0275\u0275listener("click", function DictUnitTaskComponent_td_16_Conditional_1_Template_button_click_5_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.cancelEditing($event));
    });
    \u0275\u0275elementStart(6, "mat-icon");
    \u0275\u0275text(7, "close");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.editingValue);
  }
}
function DictUnitTaskComponent_td_16_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 21)(1, "span", 25);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 26);
    \u0275\u0275listener("click", function DictUnitTaskComponent_td_16_Conditional_2_Template_button_click_3_listener($event) {
      \u0275\u0275restoreView(_r5);
      const item_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.startEditing(item_r4, "amount", $event));
    });
    \u0275\u0275elementStart(4, "mat-icon");
    \u0275\u0275text(5, "edit");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r4.amount);
  }
}
function DictUnitTaskComponent_td_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 19);
    \u0275\u0275conditionalCreate(1, DictUnitTaskComponent_td_16_Conditional_1_Template, 8, 1, "div", 20)(2, DictUnitTaskComponent_td_16_Conditional_2_Template, 6, 1, "div", 21);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.isEditing(item_r4.id, "amount") ? 1 : 2);
  }
}
function DictUnitTaskComponent_th_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 17);
    \u0275\u0275text(1, "\u0417 \u0437\u0430\u0441\u043E\u0431\u0430\u043C\u0438");
    \u0275\u0275elementEnd();
  }
}
function DictUnitTaskComponent_td_19_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 20)(1, "mat-checkbox", 27);
    \u0275\u0275listener("change", function DictUnitTaskComponent_td_19_Conditional_1_Template_mat_checkbox_change_1_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.updateEditingValue($event.checked));
    })("click", function DictUnitTaskComponent_td_19_Conditional_1_Template_mat_checkbox_click_1_listener($event) {
      \u0275\u0275restoreView(_r6);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 23);
    \u0275\u0275listener("click", function DictUnitTaskComponent_td_19_Conditional_1_Template_button_click_2_listener($event) {
      \u0275\u0275restoreView(_r6);
      const item_r7 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.saveFieldChange(item_r7, "withMeans", $event));
    });
    \u0275\u0275elementStart(3, "mat-icon");
    \u0275\u0275text(4, "check");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "button", 24);
    \u0275\u0275listener("click", function DictUnitTaskComponent_td_19_Conditional_1_Template_button_click_5_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.cancelEditing($event));
    });
    \u0275\u0275elementStart(6, "mat-icon");
    \u0275\u0275text(7, "close");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("checked", ctx_r2.editingValue());
  }
}
function DictUnitTaskComponent_td_19_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 21);
    \u0275\u0275element(1, "mat-checkbox", 28);
    \u0275\u0275elementStart(2, "button", 26);
    \u0275\u0275listener("click", function DictUnitTaskComponent_td_19_Conditional_2_Template_button_click_2_listener($event) {
      \u0275\u0275restoreView(_r8);
      const item_r7 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.startEditing(item_r7, "withMeans", $event));
    });
    \u0275\u0275elementStart(3, "mat-icon");
    \u0275\u0275text(4, "edit");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("checked", item_r7.withMeans);
  }
}
function DictUnitTaskComponent_td_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 19);
    \u0275\u0275conditionalCreate(1, DictUnitTaskComponent_td_19_Conditional_1_Template, 8, 1, "div", 20)(2, DictUnitTaskComponent_td_19_Conditional_2_Template, 5, 1, "div", 21);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r7 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.isEditing(item_r7.id, "withMeans") ? 1 : 2);
  }
}
function DictUnitTaskComponent_th_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 17);
    \u0275\u0275text(1, "\u0422\u0438\u043F \u0420\u0412\u0417");
    \u0275\u0275elementEnd();
  }
}
function DictUnitTaskComponent_td_22_Conditional_1_mat_option_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const areaType_r10 = ctx.$implicit;
    \u0275\u0275property("value", areaType_r10.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", areaType_r10.value, " (", areaType_r10.shortValue, ") ");
  }
}
function DictUnitTaskComponent_td_22_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 20)(1, "mat-form-field", 29)(2, "mat-select", 30);
    \u0275\u0275twoWayListener("ngModelChange", function DictUnitTaskComponent_td_22_Conditional_1_Template_mat_select_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.editingValue, $event) || (ctx_r2.editingValue = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function DictUnitTaskComponent_td_22_Conditional_1_Template_mat_select_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.updateEditingValue($event));
    })("click", function DictUnitTaskComponent_td_22_Conditional_1_Template_mat_select_click_2_listener($event) {
      \u0275\u0275restoreView(_r9);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275template(3, DictUnitTaskComponent_td_22_Conditional_1_mat_option_3_Template, 2, 3, "mat-option", 31);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "button", 23);
    \u0275\u0275listener("click", function DictUnitTaskComponent_td_22_Conditional_1_Template_button_click_4_listener($event) {
      \u0275\u0275restoreView(_r9);
      const item_r11 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.saveFieldChange(item_r11, "areaTypeId", $event));
    });
    \u0275\u0275elementStart(5, "mat-icon");
    \u0275\u0275text(6, "check");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "button", 24);
    \u0275\u0275listener("click", function DictUnitTaskComponent_td_22_Conditional_1_Template_button_click_7_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.cancelEditing($event));
    });
    \u0275\u0275elementStart(8, "mat-icon");
    \u0275\u0275text(9, "close");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.editingValue);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r2.areaTypes());
  }
}
function DictUnitTaskComponent_td_22_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 21)(1, "span", 25);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 26);
    \u0275\u0275listener("click", function DictUnitTaskComponent_td_22_Conditional_2_Template_button_click_3_listener($event) {
      \u0275\u0275restoreView(_r12);
      const item_r11 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.startEditing(item_r11, "areaTypeId", $event));
    });
    \u0275\u0275elementStart(4, "mat-icon");
    \u0275\u0275text(5, "edit");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r11 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r11.areaType || ctx_r2.getAreaTypeShortValue(item_r11.areaTypeId));
  }
}
function DictUnitTaskComponent_td_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 19);
    \u0275\u0275conditionalCreate(1, DictUnitTaskComponent_td_22_Conditional_1_Template, 10, 2, "div", 20)(2, DictUnitTaskComponent_td_22_Conditional_2_Template, 6, 1, "div", 21);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r11 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.isEditing(item_r11.id, "areaTypeId") ? 1 : 2);
  }
}
function DictUnitTaskComponent_th_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 17);
    \u0275\u0275text(1, "\u041A\u043E\u043C\u0435\u043D\u0442\u0430\u0440");
    \u0275\u0275elementEnd();
  }
}
function DictUnitTaskComponent_td_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r13 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r13.comment);
  }
}
function DictUnitTaskComponent_th_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 33);
    \u0275\u0275text(1, "\u0414\u0456\u0457");
    \u0275\u0275elementEnd();
  }
}
function DictUnitTaskComponent_td_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 18)(1, "button", 34);
    \u0275\u0275listener("click", function DictUnitTaskComponent_td_28_Template_button_click_1_listener() {
      const item_r15 = \u0275\u0275restoreView(_r14).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.edit(item_r15));
    });
    \u0275\u0275elementStart(2, "mat-icon");
    \u0275\u0275text(3, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "button", 35);
    \u0275\u0275listener("click", function DictUnitTaskComponent_td_28_Template_button_click_4_listener() {
      const item_r15 = \u0275\u0275restoreView(_r14).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.delete(item_r15));
    });
    \u0275\u0275elementStart(5, "mat-icon");
    \u0275\u0275text(6, "delete");
    \u0275\u0275elementEnd()()();
  }
}
function DictUnitTaskComponent_tr_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 36);
  }
}
function DictUnitTaskComponent_tr_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 37);
    \u0275\u0275listener("click", function DictUnitTaskComponent_tr_30_Template_tr_click_0_listener() {
      const row_r17 = \u0275\u0275restoreView(_r16).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectTask(row_r17));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r17 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("selected", row_r17.id === ctx_r2.selectedTaskId());
  }
}
var DictUnitTaskComponent = class _DictUnitTaskComponent {
  taskSelected = new EventEmitter();
  dictUnitTasksService = inject(DictUnitTasksService);
  dictAreaTypeService = inject(DictAreaTypeService);
  items = this.dictUnitTasksService.createItemsSignal();
  areaTypes = signal([], ...ngDevMode ? [{ debugName: "areaTypes" }] : []);
  dataSource = new MatTableDataSource([]);
  displayedColumns = ["value", "amount", "withMeans", "areaType", "comment", "actions"];
  selectedTaskId = signal(null, ...ngDevMode ? [{ debugName: "selectedTaskId" }] : []);
  editingTaskId = signal(null, ...ngDevMode ? [{ debugName: "editingTaskId" }] : []);
  editingField = signal(null, ...ngDevMode ? [{ debugName: "editingField" }] : []);
  editingValue = signal(void 0, ...ngDevMode ? [{ debugName: "editingValue" }] : []);
  dialog = inject(MatDialog);
  snackBar = inject(MatSnackBar);
  sort;
  constructor() {
    effect(() => {
      this.dataSource.data = this.items();
      if (this.sort) {
        this.dataSource.sort = this.sort;
      }
    });
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.loadAreaTypes();
    this.reload();
  }
  loadAreaTypes() {
    this.dictAreaTypeService.getAll().subscribe({
      next: (types) => this.areaTypes.set(types),
      error: (error) => {
        console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u0442\u0438\u043F\u0456\u0432 \u0420\u0412\u0417:", error);
        const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u0442\u0438\u043F\u0456\u0432 \u0420\u0412\u0417");
        this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
      }
    });
  }
  reload() {
    this.dictUnitTasksService.getAll().subscribe({
      next: (items) => this.items.set(items),
      error: (error) => {
        console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u0437\u0430\u0432\u0434\u0430\u043D\u044C \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0456\u0432:", error);
        const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u0437\u0430\u0432\u0434\u0430\u043D\u044C \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0456\u0432");
        this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
      }
    });
  }
  add() {
    const dialogRef = this.dialog.open(DictUnitTaskDialogComponent, {
      width: "600px",
      data: {
        value: "",
        comment: "",
        amount: 0,
        withMeans: false,
        areaTypeId: ""
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dictUnitTasksService.create(result).subscribe({
          next: () => {
            this.reload();
            this.snackBar.open("\u0417\u0430\u0432\u0434\u0430\u043D\u043D\u044F \u0443\u0441\u043F\u0456\u0448\u043D\u043E \u0441\u0442\u0432\u043E\u0440\u0435\u043D\u043E", "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 3e3 });
          },
          error: (error) => {
            console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0441\u0442\u0432\u043E\u0440\u0435\u043D\u043D\u044F \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F:", error);
            const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0441\u0442\u0432\u043E\u0440\u0435\u043D\u043D\u044F \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F");
            this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
          }
        });
      }
    });
  }
  edit(unitTask) {
    const dialogRef = this.dialog.open(DictUnitTaskDialogComponent, {
      width: "600px",
      data: __spreadValues({}, unitTask)
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dictUnitTasksService.update(result.id, result).subscribe({
          next: () => {
            this.reload();
            this.snackBar.open("\u0417\u0430\u0432\u0434\u0430\u043D\u043D\u044F \u0443\u0441\u043F\u0456\u0448\u043D\u043E \u043E\u043D\u043E\u0432\u043B\u0435\u043D\u043E", "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 3e3 });
          },
          error: (error) => {
            console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043E\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u044F \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F:", error);
            const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043E\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u044F \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F");
            this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
          }
        });
      }
    });
  }
  delete(unitTask) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      width: "360px",
      maxWidth: "95vw",
      autoFocus: false,
      data: {
        title: "\u0412\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F \u0437\u0430\u043F\u0438\u0441\u0443",
        message: `\u0412\u0438 \u0432\u043F\u0435\u0432\u043D\u0435\u043D\u0456, \u0449\u043E \u0445\u043E\u0447\u0435\u0442\u0435 \u0432\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F "${unitTask.value}"?`,
        confirmText: "\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438",
        cancelText: "\u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438",
        color: "warn",
        icon: "warning"
      }
    });
    ref.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.dictUnitTasksService.delete(unitTask.id).subscribe({
          next: () => {
            this.reload();
            this.snackBar.open("\u0417\u0430\u0432\u0434\u0430\u043D\u043D\u044F \u0443\u0441\u043F\u0456\u0448\u043D\u043E \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u043E", "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 3e3 });
          },
          error: (error) => {
            console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F:", error);
            const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F");
            this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
          }
        });
      }
    });
  }
  selectTask(task) {
    this.selectedTaskId.set(task.id);
    this.taskSelected.emit(task);
  }
  getAreaTypeShortValue(areaTypeId) {
    const areaType = this.areaTypes().find((at) => at.id === areaTypeId);
    return areaType?.shortValue || "";
  }
  isEditing(taskId, field) {
    return this.editingTaskId() === taskId && this.editingField() === field;
  }
  startEditing(task, field, event) {
    event.stopPropagation();
    this.editingTaskId.set(task.id);
    this.editingField.set(field);
    if (field === "areaTypeId") {
      this.editingValue.set(task.areaTypeId);
    } else {
      this.editingValue.set(task[field]);
    }
  }
  cancelEditing(event) {
    event.stopPropagation();
    this.editingTaskId.set(null);
    this.editingField.set(null);
    this.editingValue.set(void 0);
  }
  saveFieldChange(task, field, event) {
    event.stopPropagation();
    const updatedTask = __spreadProps(__spreadValues({}, task), { [field]: this.editingValue() });
    this.dictUnitTasksService.update(task.id, updatedTask).subscribe({
      next: () => {
        if (field === "areaTypeId") {
          task.areaTypeId = this.editingValue();
          const areaType = this.areaTypes().find((at) => at.id === this.editingValue());
          if (areaType) {
            task.areaType = areaType.shortValue;
          }
        } else {
          Object.assign(task, { [field]: this.editingValue() });
        }
        this.snackBar.open("\u0417\u043C\u0456\u043D\u0438 \u0437\u0431\u0435\u0440\u0435\u0436\u0435\u043D\u043E", "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 2e3 });
        this.cancelEditing(event);
      },
      error: (error) => {
        console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043E\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u044F \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F:", error);
        const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043E\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u044F \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F");
        this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
        this.cancelEditing(event);
      }
    });
  }
  updateEditingValue(value) {
    this.editingValue.set(value);
  }
  static \u0275fac = function DictUnitTaskComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DictUnitTaskComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DictUnitTaskComponent, selectors: [["dict-unit-tasks"]], viewQuery: function DictUnitTaskComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(MatSort, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.sort = _t.first);
    }
  }, outputs: { taskSelected: "taskSelected" }, decls: 31, vars: 4, consts: [["actionPanel", ""], [1, "action-buttons"], ["mat-raised-button", "", "color", "primary", 3, "click"], ["contentPanel", ""], ["mat-table", "", "matSort", "", 1, "mat-elevation-z8", 3, "dataSource"], ["matColumnDef", "value"], ["mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "amount"], ["mat-cell", "", "class", "editable-cell", 4, "matCellDef"], ["matColumnDef", "withMeans"], ["matColumnDef", "areaType"], ["matColumnDef", "comment"], ["matColumnDef", "actions"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-header-row", "", 4, "matHeaderRowDef", "matHeaderRowDefSticky"], ["mat-row", "", 3, "selected", "click", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", "", "mat-sort-header", ""], ["mat-cell", ""], ["mat-cell", "", 1, "editable-cell"], [1, "edit-mode"], [1, "view-mode"], ["type", "number", "autofocus", "", 1, "inline-input", 3, "ngModelChange", "click", "keydown.enter", "keydown.escape", "ngModel"], ["mat-icon-button", "", "matTooltip", "\u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438", 1, "save-btn", 3, "click"], ["mat-icon-button", "", "matTooltip", "\u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438", 1, "cancel-btn", 3, "click"], [1, "value-text"], ["mat-icon-button", "", "matTooltip", "\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438", 1, "edit-btn", 3, "click"], [3, "change", "click", "checked"], ["disabled", "", 3, "checked"], ["appearance", "outline", 1, "inline-select"], [3, "ngModelChange", "click", "ngModel"], [3, "value", 4, "ngFor", "ngForOf"], [3, "value"], ["mat-header-cell", ""], ["mat-icon-button", "", "color", "accent", 3, "click"], ["mat-icon-button", "", "color", "warn", 3, "click"], ["mat-header-row", ""], ["mat-row", "", 3, "click"]], template: function DictUnitTaskComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "app-vertical-layout")(1, "div", 0)(2, "h2");
      \u0275\u0275text(3, "\u0417\u0430\u0432\u0434\u0430\u043D\u043D\u044F \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0456\u0432");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 1)(5, "button", 2);
      \u0275\u0275listener("click", function DictUnitTaskComponent_Template_button_click_5_listener() {
        return ctx.reload();
      });
      \u0275\u0275text(6, "\u041E\u043D\u043E\u0432\u0438\u0442\u0438");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "button", 2);
      \u0275\u0275listener("click", function DictUnitTaskComponent_Template_button_click_7_listener() {
        return ctx.add();
      });
      \u0275\u0275text(8, "\u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(9, "div", 3)(10, "table", 4);
      \u0275\u0275elementContainerStart(11, 5);
      \u0275\u0275template(12, DictUnitTaskComponent_th_12_Template, 2, 0, "th", 6)(13, DictUnitTaskComponent_td_13_Template, 2, 1, "td", 7);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(14, 8);
      \u0275\u0275template(15, DictUnitTaskComponent_th_15_Template, 2, 0, "th", 6)(16, DictUnitTaskComponent_td_16_Template, 3, 1, "td", 9);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(17, 10);
      \u0275\u0275template(18, DictUnitTaskComponent_th_18_Template, 2, 0, "th", 6)(19, DictUnitTaskComponent_td_19_Template, 3, 1, "td", 9);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(20, 11);
      \u0275\u0275template(21, DictUnitTaskComponent_th_21_Template, 2, 0, "th", 6)(22, DictUnitTaskComponent_td_22_Template, 3, 1, "td", 9);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(23, 12);
      \u0275\u0275template(24, DictUnitTaskComponent_th_24_Template, 2, 0, "th", 6)(25, DictUnitTaskComponent_td_25_Template, 2, 1, "td", 7);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(26, 13);
      \u0275\u0275template(27, DictUnitTaskComponent_th_27_Template, 2, 0, "th", 14)(28, DictUnitTaskComponent_td_28_Template, 7, 0, "td", 7);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275template(29, DictUnitTaskComponent_tr_29_Template, 1, 0, "tr", 15)(30, DictUnitTaskComponent_tr_30_Template, 1, 2, "tr", 16);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(10);
      \u0275\u0275property("dataSource", ctx.dataSource);
      \u0275\u0275advance(19);
      \u0275\u0275property("matHeaderRowDef", ctx.displayedColumns)("matHeaderRowDefSticky", true);
      \u0275\u0275advance();
      \u0275\u0275property("matRowDefColumns", ctx.displayedColumns);
    }
  }, dependencies: [
    CommonModule,
    NgForOf,
    FormsModule,
    DefaultValueAccessor,
    NumberValueAccessor,
    NgControlStatus,
    NgModel,
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
    MatCheckboxModule,
    MatCheckbox,
    MatTooltipModule,
    MatTooltip,
    MatInputModule,
    MatFormField,
    MatFormFieldModule,
    MatSelectModule,
    MatSelect,
    MatOption,
    VerticalLayoutComponent
  ], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  height: 100%;\n}\ntable[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.mat-mdc-row[_ngcontent-%COMP%] {\n  cursor: pointer;\n  transition: background-color 0.2s;\n}\n.mat-mdc-row[_ngcontent-%COMP%]:hover {\n  background-color: #f5f5f5;\n}\n.mat-mdc-row.selected[_ngcontent-%COMP%] {\n  background-color: #e3f2fd !important;\n}\n.mat-mdc-row.selected[_ngcontent-%COMP%]:hover {\n  background-color: #bbdefb !important;\n}\n.dict-page-container[_ngcontent-%COMP%] {\n  height: calc(100vh - 64px);\n  overflow-y: auto;\n  padding: 16px;\n  padding-bottom: 32px;\n}\n.dict-page-container[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.dict-page-container[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.dict-page-container[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]    + button[_ngcontent-%COMP%] {\n  margin-left: 8px;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-top: 1em;\n  margin-bottom: 16px;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]   .value-text[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]   .edit-btn[_ngcontent-%COMP%] {\n  opacity: 0;\n  transition: opacity 0.2s;\n  width: 32px;\n  height: 32px;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .view-mode[_ngcontent-%COMP%]   .edit-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]:hover   .view-mode[_ngcontent-%COMP%]   .edit-btn[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .inline-input[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 4px 8px;\n  border: 1px solid #2196f3;\n  border-radius: 4px;\n  font-size: 14px;\n  background-color: #f5f5f5;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .inline-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #1976d2;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .save-btn[_ngcontent-%COMP%], \n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  flex-shrink: 0;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .save-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], \n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .save-btn[_ngcontent-%COMP%] {\n  color: #4caf50;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .editable-cell[_ngcontent-%COMP%]   .edit-mode[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%] {\n  color: #f44336;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .clickable-row[_ngcontent-%COMP%] {\n  cursor: pointer;\n  transition: background-color 0.2s;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .clickable-row[_ngcontent-%COMP%]:hover {\n  background-color: #f5f5f5;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .clickable-row.selected[_ngcontent-%COMP%] {\n  background-color: #e3f2fd;\n}\n.dict-page-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   .clickable-row.selected[_ngcontent-%COMP%]:hover {\n  background-color: #bbdefb;\n}\n/*# sourceMappingURL=dict-page.styles.css.map */", "\n\n[_nghost-%COMP%] {\n  display: block;\n  height: 100%;\n}\ntable[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.inline-select[_ngcontent-%COMP%] {\n  width: 150px;\n  font-size: 14px;\n}\n.inline-select[_ngcontent-%COMP%]     .mat-mdc-form-field-infix {\n  min-height: 40px;\n}\n/*# sourceMappingURL=dictUnitTask.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DictUnitTaskComponent, [{
    type: Component,
    args: [{ selector: "dict-unit-tasks", standalone: true, imports: [
      CommonModule,
      FormsModule,
      MatTableModule,
      MatButtonModule,
      MatSortModule,
      MatIconModule,
      MatCheckboxModule,
      MatTooltipModule,
      MatInputModule,
      MatFormFieldModule,
      MatSelectModule,
      VerticalLayoutComponent
    ], template: `<app-vertical-layout>
  <!-- Action Panel (Top) -->
  <div actionPanel>
    <h2>\u0417\u0430\u0432\u0434\u0430\u043D\u043D\u044F \u043F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B\u0456\u0432</h2>
    <div class="action-buttons">
      <button mat-raised-button color="primary" (click)="reload()">\u041E\u043D\u043E\u0432\u0438\u0442\u0438</button>
      <button mat-raised-button color="primary" (click)="add()">\u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438</button>
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

      <!-- Amount Column -->
      <ng-container matColumnDef="amount">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>\u0421\u0443\u043C\u0430 (\u0433\u0440\u043D)</th>
        <td mat-cell *matCellDef="let item" class="editable-cell">
          @if (isEditing(item.id, 'amount')) {
            <!-- \u0420\u0435\u0436\u0438\u043C \u0440\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u043D\u043D\u044F -->
            <div class="edit-mode">
              <input
                type="number"
                [(ngModel)]="editingValue"
                (ngModelChange)="updateEditingValue($event)"
                (click)="$event.stopPropagation()"
                (keydown.enter)="saveFieldChange(item, 'amount', $event)"
                (keydown.escape)="cancelEditing($event)"
                class="inline-input"
                autofocus
              />
              <button
                mat-icon-button
                class="save-btn"
                (click)="saveFieldChange(item, 'amount', $event)"
                matTooltip="\u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438"
              >
                <mat-icon>check</mat-icon>
              </button>
              <button
                mat-icon-button
                class="cancel-btn"
                (click)="cancelEditing($event)"
                matTooltip="\u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438"
              >
                <mat-icon>close</mat-icon>
              </button>
            </div>
          } @else {
            <!-- \u0420\u0435\u0436\u0438\u043C \u043F\u0435\u0440\u0435\u0433\u043B\u044F\u0434\u0443 -->
            <div class="view-mode">
              <span class="value-text">{{ item.amount }}</span>
              <button
                mat-icon-button
                class="edit-btn"
                (click)="startEditing(item, 'amount', $event)"
                matTooltip="\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438"
              >
                <mat-icon>edit</mat-icon>
              </button>
            </div>
          }
        </td>
      </ng-container>

      <!-- WithMeans Column -->
      <ng-container matColumnDef="withMeans">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>\u0417 \u0437\u0430\u0441\u043E\u0431\u0430\u043C\u0438</th>
        <td mat-cell *matCellDef="let item" class="editable-cell">
          @if (isEditing(item.id, 'withMeans')) {
            <!-- \u0420\u0435\u0436\u0438\u043C \u0440\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u043D\u043D\u044F -->
            <div class="edit-mode">
              <mat-checkbox
                [checked]="editingValue()"
                (change)="updateEditingValue($event.checked)"
                (click)="$event.stopPropagation()"
              ></mat-checkbox>
              <button
                mat-icon-button
                class="save-btn"
                (click)="saveFieldChange(item, 'withMeans', $event)"
                matTooltip="\u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438"
              >
                <mat-icon>check</mat-icon>
              </button>
              <button
                mat-icon-button
                class="cancel-btn"
                (click)="cancelEditing($event)"
                matTooltip="\u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438"
              >
                <mat-icon>close</mat-icon>
              </button>
            </div>
          } @else {
            <!-- \u0420\u0435\u0436\u0438\u043C \u043F\u0435\u0440\u0435\u0433\u043B\u044F\u0434\u0443 -->
            <div class="view-mode">
              <mat-checkbox [checked]="item.withMeans" disabled></mat-checkbox>
              <button
                mat-icon-button
                class="edit-btn"
                (click)="startEditing(item, 'withMeans', $event)"
                matTooltip="\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438"
              >
                <mat-icon>edit</mat-icon>
              </button>
            </div>
          }
        </td>
      </ng-container>

      <!-- AreaType Column -->
      <ng-container matColumnDef="areaType">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>\u0422\u0438\u043F \u0420\u0412\u0417</th>
        <td mat-cell *matCellDef="let item" class="editable-cell">
          @if (isEditing(item.id, 'areaTypeId')) {
            <!-- \u0420\u0435\u0436\u0438\u043C \u0440\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u043D\u043D\u044F -->
            <div class="edit-mode">
              <mat-form-field appearance="outline" class="inline-select">
                <mat-select
                  [(ngModel)]="editingValue"
                  (ngModelChange)="updateEditingValue($event)"
                  (click)="$event.stopPropagation()"
                >
                  <mat-option *ngFor="let areaType of areaTypes()" [value]="areaType.id">
                    {{ areaType.value }} ({{ areaType.shortValue }})
                  </mat-option>
                </mat-select>
              </mat-form-field>
              <button
                mat-icon-button
                class="save-btn"
                (click)="saveFieldChange(item, 'areaTypeId', $event)"
                matTooltip="\u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438"
              >
                <mat-icon>check</mat-icon>
              </button>
              <button
                mat-icon-button
                class="cancel-btn"
                (click)="cancelEditing($event)"
                matTooltip="\u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438"
              >
                <mat-icon>close</mat-icon>
              </button>
            </div>
          } @else {
            <!-- \u0420\u0435\u0436\u0438\u043C \u043F\u0435\u0440\u0435\u0433\u043B\u044F\u0434\u0443 -->
            <div class="view-mode">
              <span class="value-text">{{
                item.areaType || getAreaTypeShortValue(item.areaTypeId)
              }}</span>
              <button
                mat-icon-button
                class="edit-btn"
                (click)="startEditing(item, 'areaTypeId', $event)"
                matTooltip="\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438"
              >
                <mat-icon>edit</mat-icon>
              </button>
            </div>
          }
        </td>
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
      <tr
        mat-row
        *matRowDef="let row; columns: displayedColumns"
        (click)="selectTask(row)"
        [class.selected]="row.id === selectedTaskId()"
      ></tr>
    </table>
  </div>
</app-vertical-layout>
`, styles: ["/* src/dictionaries/dict-page.styles.scss */\n:host {\n  display: block;\n  height: 100%;\n}\ntable {\n  width: 100%;\n}\n.mat-mdc-row {\n  cursor: pointer;\n  transition: background-color 0.2s;\n}\n.mat-mdc-row:hover {\n  background-color: #f5f5f5;\n}\n.mat-mdc-row.selected {\n  background-color: #e3f2fd !important;\n}\n.mat-mdc-row.selected:hover {\n  background-color: #bbdefb !important;\n}\n.dict-page-container {\n  height: calc(100vh - 64px);\n  overflow-y: auto;\n  padding: 16px;\n  padding-bottom: 32px;\n}\n.dict-page-container h2 {\n  margin-bottom: 16px;\n}\n.dict-page-container .action-buttons {\n  margin-bottom: 16px;\n}\n.dict-page-container .action-buttons button + button {\n  margin-left: 8px;\n}\n.dict-page-container table {\n  width: 100%;\n  margin-top: 1em;\n  margin-bottom: 16px;\n}\n.dict-page-container table .editable-cell .view-mode {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.dict-page-container table .editable-cell .view-mode .value-text {\n  flex: 1;\n}\n.dict-page-container table .editable-cell .view-mode .edit-btn {\n  opacity: 0;\n  transition: opacity 0.2s;\n  width: 32px;\n  height: 32px;\n}\n.dict-page-container table .editable-cell .view-mode .edit-btn mat-icon {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.dict-page-container table .editable-cell:hover .view-mode .edit-btn {\n  opacity: 1;\n}\n.dict-page-container table .editable-cell .edit-mode {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.dict-page-container table .editable-cell .edit-mode .inline-input {\n  flex: 1;\n  padding: 4px 8px;\n  border: 1px solid #2196f3;\n  border-radius: 4px;\n  font-size: 14px;\n  background-color: #f5f5f5;\n}\n.dict-page-container table .editable-cell .edit-mode .inline-input:focus {\n  outline: none;\n  border-color: #1976d2;\n}\n.dict-page-container table .editable-cell .edit-mode .save-btn,\n.dict-page-container table .editable-cell .edit-mode .cancel-btn {\n  width: 32px;\n  height: 32px;\n  flex-shrink: 0;\n}\n.dict-page-container table .editable-cell .edit-mode .save-btn mat-icon,\n.dict-page-container table .editable-cell .edit-mode .cancel-btn mat-icon {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.dict-page-container table .editable-cell .edit-mode .save-btn {\n  color: #4caf50;\n}\n.dict-page-container table .editable-cell .edit-mode .cancel-btn {\n  color: #f44336;\n}\n.dict-page-container table .clickable-row {\n  cursor: pointer;\n  transition: background-color 0.2s;\n}\n.dict-page-container table .clickable-row:hover {\n  background-color: #f5f5f5;\n}\n.dict-page-container table .clickable-row.selected {\n  background-color: #e3f2fd;\n}\n.dict-page-container table .clickable-row.selected:hover {\n  background-color: #bbdefb;\n}\n/*# sourceMappingURL=dict-page.styles.css.map */\n", "/* angular:styles/component:css;23a11187aebebed908f661312ee2bc856ac47c612356f63689ab30322b00380c;/home/havrok/projects/work/411/s5/s5app/Menu/S5Server/Front/src/dictionaries/UnitTask/dictUnitTask.component.ts */\n:host {\n  display: block;\n  height: 100%;\n}\ntable {\n  width: 100%;\n}\n.inline-select {\n  width: 150px;\n  font-size: 14px;\n}\n.inline-select ::ng-deep .mat-mdc-form-field-infix {\n  min-height: 40px;\n}\n/*# sourceMappingURL=dictUnitTask.component.css.map */\n"] }]
  }], () => [], { taskSelected: [{
    type: Output
  }], sort: [{
    type: ViewChild,
    args: [MatSort]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DictUnitTaskComponent, { className: "DictUnitTaskComponent", filePath: "dictionaries/UnitTask/dictUnitTask.component.ts", lineNumber: 73 });
})();

// src/app/dialogs/DictUnitTaskItem-dialog.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function DictUnitTaskItemDialogComponent_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 4);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const category_r1 = ctx.$implicit;
    \u0275\u0275property("value", category_r1.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(category_r1.value);
  }
}
var DictUnitTaskItemDialogComponent = class _DictUnitTaskItemDialogComponent {
  data;
  dialogRef;
  templateCategoriesService;
  snackBar;
  templateCategories$;
  constructor(data, dialogRef, templateCategoriesService, snackBar) {
    this.data = data;
    this.dialogRef = dialogRef;
    this.templateCategoriesService = templateCategoriesService;
    this.snackBar = snackBar;
    this.templateCategories$ = this.templateCategoriesService.getSelectList();
  }
  isValid() {
    return !!(this.data.value?.trim() && this.data.templateCategoryId && this.data.unitTaskId);
  }
  onSave() {
    if (!this.isValid()) {
      this.snackBar.open("\u0417\u0430\u043F\u043E\u0432\u043D\u0456\u0442\u044C \u0432\u0441\u0456 \u043E\u0431\u043E\u0432'\u044F\u0437\u043A\u043E\u0432\u0456 \u043F\u043E\u043B\u044F", "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 3e3 });
      return;
    }
    this.dialogRef.close(this.data);
  }
  onCancel() {
    this.dialogRef.close(null);
  }
  static \u0275fac = function DictUnitTaskItemDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DictUnitTaskItemDialogComponent)(\u0275\u0275directiveInject(MAT_DIALOG_DATA), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(DictTemplateCategoriesService), \u0275\u0275directiveInject(MatSnackBar));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DictUnitTaskItemDialogComponent, selectors: [["app-dict-unit-task-item-dialog"]], decls: 23, vars: 8, consts: [["mat-dialog-title", ""], [1, "content"], ["appearance", "outline", 1, "full-width"], ["required", "", 3, "ngModelChange", "ngModel"], [3, "value"], ["matInput", "", "required", "", "rows", "4", "placeholder", "\u0412\u0432\u0435\u0434\u0456\u0442\u044C \u0442\u0435\u043A\u0441\u0442 \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F \u0434\u043B\u044F \u0434\u0430\u043D\u043E\u0457 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0456\u0457 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0456\u0432", 3, "ngModelChange", "ngModel"], ["matInput", "", "rows", "2", 3, "ngModelChange", "ngModel"], ["align", "end"], ["mat-button", "", 3, "click"], ["mat-raised-button", "", "color", "primary", 3, "click", "disabled"]], template: function DictUnitTaskItemDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "h2", 0);
      \u0275\u0275text(1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(2, "mat-dialog-content", 1)(3, "mat-form-field", 2)(4, "mat-label");
      \u0275\u0275text(5, "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0456\u044F \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "mat-select", 3);
      \u0275\u0275twoWayListener("ngModelChange", function DictUnitTaskItemDialogComponent_Template_mat_select_ngModelChange_6_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.data.templateCategoryId, $event) || (ctx.data.templateCategoryId = $event);
        return $event;
      });
      \u0275\u0275repeaterCreate(7, DictUnitTaskItemDialogComponent_For_8_Template, 2, 2, "mat-option", 4, _forTrack0);
      \u0275\u0275pipe(9, "async");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "mat-form-field", 2)(11, "mat-label");
      \u0275\u0275text(12, "\u0422\u0435\u043A\u0441\u0442 \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "textarea", 5);
      \u0275\u0275twoWayListener("ngModelChange", function DictUnitTaskItemDialogComponent_Template_textarea_ngModelChange_13_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.data.value, $event) || (ctx.data.value = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(14, "mat-form-field", 2)(15, "mat-label");
      \u0275\u0275text(16, "\u041A\u043E\u043C\u0435\u043D\u0442\u0430\u0440");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "textarea", 6);
      \u0275\u0275twoWayListener("ngModelChange", function DictUnitTaskItemDialogComponent_Template_textarea_ngModelChange_17_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.data.comment, $event) || (ctx.data.comment = $event);
        return $event;
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(18, "mat-dialog-actions", 7)(19, "button", 8);
      \u0275\u0275listener("click", function DictUnitTaskItemDialogComponent_Template_button_click_19_listener() {
        return ctx.onCancel();
      });
      \u0275\u0275text(20, "\u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "button", 9);
      \u0275\u0275listener("click", function DictUnitTaskItemDialogComponent_Template_button_click_21_listener() {
        return ctx.onSave();
      });
      \u0275\u0275text(22);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.data.id ? "\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u043D\u043D\u044F \u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0430 \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F" : "\u0421\u0442\u0432\u043E\u0440\u0435\u043D\u043D\u044F \u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0430 \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F", " ");
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.data.templateCategoryId);
      \u0275\u0275advance();
      \u0275\u0275repeater(\u0275\u0275pipeBind1(9, 6, ctx.templateCategories$));
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.data.value);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.data.comment);
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", !ctx.isValid());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.data.id ? "\u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438" : "\u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438", " ");
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
    MatInputModule,
    MatInput,
    MatButtonModule,
    MatButton,
    MatSelectModule,
    MatSelect,
    MatOption,
    AsyncPipe
  ], styles: ["\n\n.title[_ngcontent-%COMP%] {\n  text-align: center;\n  margin: 0;\n}\n.content[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 12px;\n  min-width: 280px;\n  max-width: 520px;\n  padding-top: 10px !important;\n}\n  .content .mat-mdc-form-field {\n  width: 100%;\n}\n.actions[_ngcontent-%COMP%] {\n  gap: 8px;\n}\n/*# sourceMappingURL=DialogShared.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DictUnitTaskItemDialogComponent, [{
    type: Component,
    args: [{ selector: "app-dict-unit-task-item-dialog", standalone: true, imports: [
      CommonModule,
      FormsModule,
      MatDialogModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatSelectModule
    ], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <h2 mat-dialog-title>
      {{ data.id ? '\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u043D\u043D\u044F \u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0430 \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F' : '\u0421\u0442\u0432\u043E\u0440\u0435\u043D\u043D\u044F \u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0430 \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F' }}
    </h2>
    <mat-dialog-content class="content">
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0456\u044F \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430</mat-label>
        <mat-select [(ngModel)]="data.templateCategoryId" required>
          @for (category of templateCategories$ | async; track category.id) {
          <mat-option [value]="category.id">{{ category.value }}</mat-option>
          }
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>\u0422\u0435\u043A\u0441\u0442 \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F</mat-label>
        <textarea
          matInput
          [(ngModel)]="data.value"
          required
          rows="4"
          placeholder="\u0412\u0432\u0435\u0434\u0456\u0442\u044C \u0442\u0435\u043A\u0441\u0442 \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F \u0434\u043B\u044F \u0434\u0430\u043D\u043E\u0457 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0456\u0457 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0456\u0432"
        ></textarea>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>\u041A\u043E\u043C\u0435\u043D\u0442\u0430\u0440</mat-label>
        <textarea matInput [(ngModel)]="data.comment" rows="2"></textarea>
      </mat-form-field>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">\u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438</button>
      <button mat-raised-button color="primary" (click)="onSave()" [disabled]="!isValid()">
        {{ data.id ? '\u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438' : '\u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438' }}
      </button>
    </mat-dialog-actions>
  `, styles: ["/* src/app/dialogs/DialogShared.scss */\n.title {\n  text-align: center;\n  margin: 0;\n}\n.content {\n  display: grid;\n  gap: 12px;\n  min-width: 280px;\n  max-width: 520px;\n  padding-top: 10px !important;\n}\n::ng-deep .content .mat-mdc-form-field {\n  width: 100%;\n}\n.actions {\n  gap: 8px;\n}\n/*# sourceMappingURL=DialogShared.css.map */\n"] }]
  }], () => [{ type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }, { type: MatDialogRef }, { type: DictTemplateCategoriesService }, { type: MatSnackBar }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DictUnitTaskItemDialogComponent, { className: "DictUnitTaskItemDialogComponent", filePath: "app/dialogs/DictUnitTaskItem-dialog.component.ts", lineNumber: 69 });
})();

// src/ServerService/dictUnitTaskItems.service.ts
var DictUnitTaskItemsService = class _DictUnitTaskItemsService {
  api = "/api/dict-unit-task-items";
  http = inject(HttpClient);
  createItemsSignal() {
    return signal([]);
  }
  /**
   * Отримати список елементів завдань підрозділів
   */
  getAll(search, unitTaskId, templateCategoryId) {
    const params = {};
    if (search) {
      params["search"] = search;
    }
    if (unitTaskId) {
      params["unitTaskId"] = unitTaskId;
    }
    if (templateCategoryId) {
      params["templateCategoryId"] = templateCategoryId;
    }
    return this.http.get(this.api, { params });
  }
  /**
   * Отримати елемент завдання підрозділу за ID
   */
  getById(id) {
    return this.http.get(`${this.api}/${id}`);
  }
  /**
   * Створити новий елемент завдання підрозділу
   */
  create(item) {
    return this.http.post(this.api, item);
  }
  /**
   * Оновити елемент завдання підрозділу
   */
  update(id, item) {
    return this.http.put(`${this.api}/${id}`, item);
  }
  /**
   * Видалити елемент завдання підрозділу
   */
  delete(id) {
    return this.http.delete(`${this.api}/${id}`);
  }
  /**
   * Отримати елементи завдання за UnitTaskId
   */
  getByUnitTask(unitTaskId) {
    return this.http.get(`${this.api}/by-unit-task/${unitTaskId}`);
  }
  /**
   * Отримати елементи завдання за TemplateCategoryId
   */
  getByTemplateCategory(templateCategoryId) {
    return this.http.get(`${this.api}/by-template-category/${templateCategoryId}`);
  }
  /**
   * Отримати елемент завдання за UnitTaskId та TemplateCategoryId
   */
  getTaskByTemplate(unitTaskId, templateCategoryId) {
    return this.http.get(`${this.api}/by-task-and-template/${unitTaskId}/${templateCategoryId}`);
  }
  /**
   * Автокомпліт для пошуку елементів завдань
   */
  lookup(term, limit = 10, unitTaskId, templateCategoryId) {
    const params = { term, limit: limit.toString() };
    if (unitTaskId) {
      params["unitTaskId"] = unitTaskId;
    }
    if (templateCategoryId) {
      params["templateCategoryId"] = templateCategoryId;
    }
    return this.http.get(`${this.api}/lookup`, { params });
  }
  /**
   * Список для випадаючого списку (select) по конкретній категорії та завданню
   */
  getSelectList(unitTaskId, templateCategoryId) {
    const params = {};
    if (unitTaskId) {
      params["unitTaskId"] = unitTaskId;
    }
    if (templateCategoryId) {
      params["templateCategoryId"] = templateCategoryId;
    }
    return this.http.get(`${this.api}/sel_list`, { params });
  }
  static \u0275fac = function DictUnitTaskItemsService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DictUnitTaskItemsService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DictUnitTaskItemsService, factory: _DictUnitTaskItemsService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DictUnitTaskItemsService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/dictionaries/UnitTask/dictUnitTaskItems.component.ts
function DictUnitTaskItemsComponent_Conditional_1_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275element(1, "mat-spinner", 7);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0456\u0432...");
    \u0275\u0275elementEnd()();
  }
}
function DictUnitTaskItemsComponent_Conditional_1_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1)(1, "mat-icon", 8);
    \u0275\u0275text(2, "info");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u0423 \u0446\u044C\u043E\u0433\u043E \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F \u043D\u0435\u043C\u0430\u0454 \u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0456\u0432");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 9);
    \u0275\u0275text(6, "\u0415\u043B\u0435\u043C\u0435\u043D\u0442\u0438 \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F \u0432\u0438\u0437\u043D\u0430\u0447\u0430\u044E\u0442\u044C \u0442\u0435\u043A\u0441\u0442 \u0434\u043B\u044F \u0440\u0456\u0437\u043D\u0438\u0445 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0456\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0456\u0432");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 4);
    \u0275\u0275listener("click", function DictUnitTaskItemsComponent_Conditional_1_Conditional_13_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.add());
    });
    \u0275\u0275elementStart(8, "mat-icon");
    \u0275\u0275text(9, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(10, " \u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438 \u043F\u0435\u0440\u0448\u0438\u0439 \u0435\u043B\u0435\u043C\u0435\u043D\u0442 ");
    \u0275\u0275elementEnd()();
  }
}
function DictUnitTaskItemsComponent_Conditional_1_Conditional_14_th_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 21);
    \u0275\u0275text(1, "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0456\u044F \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430");
    \u0275\u0275elementEnd();
  }
}
function DictUnitTaskItemsComponent_Conditional_1_Conditional_14_td_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 22);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r4.templateCategory || item_r4.templateCategoryId, " ");
  }
}
function DictUnitTaskItemsComponent_Conditional_1_Conditional_14_th_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 21);
    \u0275\u0275text(1, "\u0422\u0435\u043A\u0441\u0442 \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F");
    \u0275\u0275elementEnd();
  }
}
function DictUnitTaskItemsComponent_Conditional_1_Conditional_14_td_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 23)(1, "div", 24);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r5.value);
  }
}
function DictUnitTaskItemsComponent_Conditional_1_Conditional_14_th_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 21);
    \u0275\u0275text(1, "\u041A\u043E\u043C\u0435\u043D\u0442\u0430\u0440");
    \u0275\u0275elementEnd();
  }
}
function DictUnitTaskItemsComponent_Conditional_1_Conditional_14_td_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 22);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r6.comment);
  }
}
function DictUnitTaskItemsComponent_Conditional_1_Conditional_14_th_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 25);
    \u0275\u0275text(1, "\u0414\u0456\u0457");
    \u0275\u0275elementEnd();
  }
}
function DictUnitTaskItemsComponent_Conditional_1_Conditional_14_td_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 22)(1, "button", 26);
    \u0275\u0275listener("click", function DictUnitTaskItemsComponent_Conditional_1_Conditional_14_td_13_Template_button_click_1_listener() {
      const item_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.edit(item_r8));
    });
    \u0275\u0275elementStart(2, "mat-icon");
    \u0275\u0275text(3, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "button", 27);
    \u0275\u0275listener("click", function DictUnitTaskItemsComponent_Conditional_1_Conditional_14_td_13_Template_button_click_4_listener() {
      const item_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.delete(item_r8));
    });
    \u0275\u0275elementStart(5, "mat-icon");
    \u0275\u0275text(6, "delete");
    \u0275\u0275elementEnd()()();
  }
}
function DictUnitTaskItemsComponent_Conditional_1_Conditional_14_tr_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 28);
  }
}
function DictUnitTaskItemsComponent_Conditional_1_Conditional_14_tr_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 29);
  }
}
function DictUnitTaskItemsComponent_Conditional_1_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "table", 10);
    \u0275\u0275elementContainerStart(2, 11);
    \u0275\u0275template(3, DictUnitTaskItemsComponent_Conditional_1_Conditional_14_th_3_Template, 2, 0, "th", 12)(4, DictUnitTaskItemsComponent_Conditional_1_Conditional_14_td_4_Template, 2, 1, "td", 13);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(5, 14);
    \u0275\u0275template(6, DictUnitTaskItemsComponent_Conditional_1_Conditional_14_th_6_Template, 2, 0, "th", 12)(7, DictUnitTaskItemsComponent_Conditional_1_Conditional_14_td_7_Template, 3, 1, "td", 15);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(8, 16);
    \u0275\u0275template(9, DictUnitTaskItemsComponent_Conditional_1_Conditional_14_th_9_Template, 2, 0, "th", 12)(10, DictUnitTaskItemsComponent_Conditional_1_Conditional_14_td_10_Template, 2, 1, "td", 13);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(11, 17);
    \u0275\u0275template(12, DictUnitTaskItemsComponent_Conditional_1_Conditional_14_th_12_Template, 2, 0, "th", 18)(13, DictUnitTaskItemsComponent_Conditional_1_Conditional_14_td_13_Template, 7, 0, "td", 13);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(14, DictUnitTaskItemsComponent_Conditional_1_Conditional_14_tr_14_Template, 1, 0, "tr", 19)(15, DictUnitTaskItemsComponent_Conditional_1_Conditional_14_tr_15_Template, 1, 0, "tr", 20);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("dataSource", ctx_r1.dataSource);
    \u0275\u0275advance(13);
    \u0275\u0275property("matHeaderRowDef", ctx_r1.displayedColumns)("matHeaderRowDefSticky", true);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r1.displayedColumns);
  }
}
function DictUnitTaskItemsComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2)(1, "h3");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 3)(4, "button", 4);
    \u0275\u0275listener("click", function DictUnitTaskItemsComponent_Conditional_1_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.reload());
    });
    \u0275\u0275elementStart(5, "mat-icon");
    \u0275\u0275text(6, "refresh");
    \u0275\u0275elementEnd();
    \u0275\u0275text(7, " \u041E\u043D\u043E\u0432\u0438\u0442\u0438 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 4);
    \u0275\u0275listener("click", function DictUnitTaskItemsComponent_Conditional_1_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.add());
    });
    \u0275\u0275elementStart(9, "mat-icon");
    \u0275\u0275text(10, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(11, " \u0414\u043E\u0434\u0430\u0442\u0438 \u0435\u043B\u0435\u043C\u0435\u043D\u0442 ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(12, DictUnitTaskItemsComponent_Conditional_1_Conditional_12_Template, 4, 0, "div", 5)(13, DictUnitTaskItemsComponent_Conditional_1_Conditional_13_Template, 11, 0, "div", 1)(14, DictUnitTaskItemsComponent_Conditional_1_Conditional_14_Template, 16, 4, "div", 6);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u0415\u043B\u0435\u043C\u0435\u043D\u0442\u0438 \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F: ", ctx_r1.selectedTask().value);
    \u0275\u0275advance(10);
    \u0275\u0275conditional(ctx_r1.isLoading() ? 12 : ctx_r1.items().length === 0 ? 13 : 14);
  }
}
function DictUnitTaskItemsComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1)(1, "mat-icon", 8);
    \u0275\u0275text(2, "arrow_back");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u0412\u0438\u0431\u0435\u0440\u0456\u0442\u044C \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F \u0437\u0456 \u0441\u043F\u0438\u0441\u043A\u0443");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 9);
    \u0275\u0275text(6, "\u041E\u0431\u0435\u0440\u0456\u0442\u044C \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F \u0443 \u043B\u0456\u0432\u0456\u0439 \u043F\u0430\u043D\u0435\u043B\u0456, \u0449\u043E\u0431 \u043F\u0435\u0440\u0435\u0433\u043B\u044F\u043D\u0443\u0442\u0438 \u0439\u043E\u0433\u043E \u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0438");
    \u0275\u0275elementEnd()();
  }
}
var DictUnitTaskItemsComponent = class _DictUnitTaskItemsComponent {
  dictUnitTaskItemsService;
  dialog;
  snackBar;
  set task(value) {
    this.selectedTask.set(value);
  }
  selectedTask = signal(null, ...ngDevMode ? [{ debugName: "selectedTask" }] : []);
  items = signal([], ...ngDevMode ? [{ debugName: "items" }] : []);
  isLoading = signal(false, ...ngDevMode ? [{ debugName: "isLoading" }] : []);
  dataSource = new MatTableDataSource([]);
  displayedColumns = ["templateCategory", "value", "comment", "actions"];
  sort;
  constructor(dictUnitTaskItemsService, dialog, snackBar) {
    this.dictUnitTaskItemsService = dictUnitTaskItemsService;
    this.dialog = dialog;
    this.snackBar = snackBar;
    effect(() => {
      this.dataSource.data = this.items();
    });
    effect(() => {
      const task = this.selectedTask();
      if (task) {
        this.loadItems(task.id);
      } else {
        this.items.set([]);
      }
    });
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  loadItems(unitTaskId) {
    this.isLoading.set(true);
    this.dictUnitTaskItemsService.getByUnitTask(unitTaskId).subscribe({
      next: (items) => {
        this.items.set(items);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0456\u0432 \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F:", error);
        const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0456\u0432 \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F");
        this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
        this.isLoading.set(false);
      }
    });
  }
  reload() {
    const task = this.selectedTask();
    if (task) {
      this.loadItems(task.id);
    }
  }
  add() {
    const task = this.selectedTask();
    if (!task) {
      return;
    }
    const dialogRef = this.dialog.open(DictUnitTaskItemDialogComponent, {
      width: "600px",
      data: {
        unitTaskId: task.id,
        value: "",
        comment: "",
        templateCategoryId: ""
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dictUnitTaskItemsService.create(result).subscribe({
          next: () => {
            this.reload();
            this.snackBar.open("\u0415\u043B\u0435\u043C\u0435\u043D\u0442 \u0443\u0441\u043F\u0456\u0448\u043D\u043E \u0441\u0442\u0432\u043E\u0440\u0435\u043D\u043E", "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 3e3 });
          },
          error: (error) => {
            console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0441\u0442\u0432\u043E\u0440\u0435\u043D\u043D\u044F \u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0430:", error);
            const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0441\u0442\u0432\u043E\u0440\u0435\u043D\u043D\u044F \u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0430");
            this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
          }
        });
      }
    });
  }
  edit(item) {
    const dialogRef = this.dialog.open(DictUnitTaskItemDialogComponent, {
      width: "600px",
      data: item
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dictUnitTaskItemsService.update(result.id, result).subscribe({
          next: () => {
            this.reload();
            this.snackBar.open("\u0415\u043B\u0435\u043C\u0435\u043D\u0442 \u0443\u0441\u043F\u0456\u0448\u043D\u043E \u043E\u043D\u043E\u0432\u043B\u0435\u043D\u043E", "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 3e3 });
          },
          error: (error) => {
            console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043E\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u044F \u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0430:", error);
            const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043E\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u044F \u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0430");
            this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
          }
        });
      }
    });
  }
  delete(item) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      width: "360px",
      maxWidth: "95vw",
      autoFocus: false,
      data: {
        title: "\u0412\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F \u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0430",
        message: `\u0412\u0438 \u0432\u043F\u0435\u0432\u043D\u0435\u043D\u0456, \u0449\u043E \u0445\u043E\u0447\u0435\u0442\u0435 \u0432\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u0435\u043B\u0435\u043C\u0435\u043D\u0442 \u0434\u043B\u044F \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0456\u0457 "${item.templateCategory || item.templateCategoryId}"?`,
        confirmText: "\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438",
        cancelText: "\u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438",
        color: "warn",
        icon: "warning"
      }
    });
    ref.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.dictUnitTaskItemsService.delete(item.id).subscribe({
          next: () => {
            this.reload();
            this.snackBar.open("\u0415\u043B\u0435\u043C\u0435\u043D\u0442 \u0443\u0441\u043F\u0456\u0448\u043D\u043E \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u043E", "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 3e3 });
          },
          error: (error) => {
            console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F \u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0430:", error);
            const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F \u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0430");
            this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
          }
        });
      }
    });
  }
  static \u0275fac = function DictUnitTaskItemsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DictUnitTaskItemsComponent)(\u0275\u0275directiveInject(DictUnitTaskItemsService), \u0275\u0275directiveInject(MatDialog), \u0275\u0275directiveInject(MatSnackBar));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DictUnitTaskItemsComponent, selectors: [["dict-unit-task-items"]], viewQuery: function DictUnitTaskItemsComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(MatSort, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.sort = _t.first);
    }
  }, inputs: { task: "task" }, decls: 3, vars: 1, consts: [[1, "dict-task-items-container"], [1, "empty-state"], [1, "header"], [1, "header-actions"], ["mat-raised-button", "", "color", "primary", 3, "click"], [1, "loading-container"], [1, "table-container"], ["diameter", "50"], [1, "empty-icon"], [1, "empty-hint"], ["mat-table", "", "matSort", "", 1, "mat-elevation-z2", 3, "dataSource"], ["matColumnDef", "templateCategory"], ["mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "value"], ["mat-cell", "", "class", "value-cell", 4, "matCellDef"], ["matColumnDef", "comment"], ["matColumnDef", "actions"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-header-row", "", 4, "matHeaderRowDef", "matHeaderRowDefSticky"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", "", "mat-sort-header", ""], ["mat-cell", ""], ["mat-cell", "", 1, "value-cell"], [1, "value-content"], ["mat-header-cell", ""], ["mat-icon-button", "", "color", "accent", "matTooltip", "\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438", 3, "click"], ["mat-icon-button", "", "color", "warn", "matTooltip", "\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438", 3, "click"], ["mat-header-row", ""], ["mat-row", ""]], template: function DictUnitTaskItemsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275conditionalCreate(1, DictUnitTaskItemsComponent_Conditional_1_Template, 15, 2)(2, DictUnitTaskItemsComponent_Conditional_2_Template, 7, 0, "div", 1);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.selectedTask() ? 1 : 2);
    }
  }, dependencies: [
    CommonModule,
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
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatIconModule,
    MatIcon,
    MatTooltipModule,
    MatTooltip,
    MatProgressSpinnerModule,
    MatProgressSpinner
  ], styles: ["\n\n.dict-task-items-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  overflow: hidden;\n  background: white;\n}\n.header[_ngcontent-%COMP%] {\n  padding: 16px;\n  border-bottom: 1px solid #e0e0e0;\n  background: white;\n  flex-shrink: 0;\n}\n.header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 12px 0;\n  font-size: 18px;\n  font-weight: 500;\n  color: #333;\n}\n.header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.table-container[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow: auto;\n  padding: 16px;\n}\n.table-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.table-container[_ngcontent-%COMP%]   .value-cell[_ngcontent-%COMP%] {\n  max-width: 400px;\n}\n.table-container[_ngcontent-%COMP%]   .value-cell[_ngcontent-%COMP%]   .value-content[_ngcontent-%COMP%] {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.loading-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  gap: 16px;\n}\n.loading-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #666;\n}\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  padding: 32px;\n  text-align: center;\n  color: #666;\n}\n.empty-state[_ngcontent-%COMP%]   .empty-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  width: 64px;\n  height: 64px;\n  color: #bdbdbd;\n  margin-bottom: 16px;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 8px 0;\n  font-size: 16px;\n}\n.empty-state[_ngcontent-%COMP%]   .empty-hint[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #999;\n  margin-bottom: 24px;\n}\n/*# sourceMappingURL=dictUnitTaskItems.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DictUnitTaskItemsComponent, [{
    type: Component,
    args: [{ selector: "dict-unit-task-items", standalone: true, imports: [
      CommonModule,
      MatTableModule,
      MatSortModule,
      MatButtonModule,
      MatIconModule,
      MatTooltipModule,
      MatProgressSpinnerModule
    ], template: '<div class="dict-task-items-container">\n  @if (selectedTask()) {\n    <div class="header">\n      <h3>\u0415\u043B\u0435\u043C\u0435\u043D\u0442\u0438 \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F: {{ selectedTask()!.value }}</h3>\n      <div class="header-actions">\n        <button mat-raised-button color="primary" (click)="reload()">\n          <mat-icon>refresh</mat-icon>\n          \u041E\u043D\u043E\u0432\u0438\u0442\u0438\n        </button>\n        <button mat-raised-button color="primary" (click)="add()">\n          <mat-icon>add</mat-icon>\n          \u0414\u043E\u0434\u0430\u0442\u0438 \u0435\u043B\u0435\u043C\u0435\u043D\u0442\n        </button>\n      </div>\n    </div>\n\n    @if (isLoading()) {\n      <div class="loading-container">\n        <mat-spinner diameter="50"></mat-spinner>\n        <p>\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0456\u0432...</p>\n      </div>\n    } @else if (items().length === 0) {\n      <div class="empty-state">\n        <mat-icon class="empty-icon">info</mat-icon>\n        <p>\u0423 \u0446\u044C\u043E\u0433\u043E \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F \u043D\u0435\u043C\u0430\u0454 \u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0456\u0432</p>\n        <p class="empty-hint">\u0415\u043B\u0435\u043C\u0435\u043D\u0442\u0438 \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F \u0432\u0438\u0437\u043D\u0430\u0447\u0430\u044E\u0442\u044C \u0442\u0435\u043A\u0441\u0442 \u0434\u043B\u044F \u0440\u0456\u0437\u043D\u0438\u0445 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0456\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0456\u0432</p>\n        <button mat-raised-button color="primary" (click)="add()">\n          <mat-icon>add</mat-icon>\n          \u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438 \u043F\u0435\u0440\u0448\u0438\u0439 \u0435\u043B\u0435\u043C\u0435\u043D\u0442\n        </button>\n      </div>\n    } @else {\n      <div class="table-container">\n        <table mat-table [dataSource]="dataSource" matSort class="mat-elevation-z2">\n          <!-- Template Category Column -->\n          <ng-container matColumnDef="templateCategory">\n            <th mat-header-cell *matHeaderCellDef mat-sort-header>\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0456\u044F \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430</th>\n            <td mat-cell *matCellDef="let item">\n              {{ item.templateCategory || item.templateCategoryId }}\n            </td>\n          </ng-container>\n\n          <!-- Value Column -->\n          <ng-container matColumnDef="value">\n            <th mat-header-cell *matHeaderCellDef mat-sort-header>\u0422\u0435\u043A\u0441\u0442 \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F</th>\n            <td mat-cell *matCellDef="let item" class="value-cell">\n              <div class="value-content">{{ item.value }}</div>\n            </td>\n          </ng-container>\n\n          <!-- Comment Column -->\n          <ng-container matColumnDef="comment">\n            <th mat-header-cell *matHeaderCellDef mat-sort-header>\u041A\u043E\u043C\u0435\u043D\u0442\u0430\u0440</th>\n            <td mat-cell *matCellDef="let item">{{ item.comment }}</td>\n          </ng-container>\n\n          <!-- Actions Column -->\n          <ng-container matColumnDef="actions">\n            <th mat-header-cell *matHeaderCellDef>\u0414\u0456\u0457</th>\n            <td mat-cell *matCellDef="let item">\n              <button mat-icon-button color="accent" (click)="edit(item)" matTooltip="\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438">\n                <mat-icon>edit</mat-icon>\n              </button>\n              <button mat-icon-button color="warn" (click)="delete(item)" matTooltip="\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438">\n                <mat-icon>delete</mat-icon>\n              </button>\n            </td>\n          </ng-container>\n\n          <tr mat-header-row *matHeaderRowDef="displayedColumns; sticky: true"></tr>\n          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>\n        </table>\n      </div>\n    }\n  } @else {\n    <div class="empty-state">\n      <mat-icon class="empty-icon">arrow_back</mat-icon>\n      <p>\u0412\u0438\u0431\u0435\u0440\u0456\u0442\u044C \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F \u0437\u0456 \u0441\u043F\u0438\u0441\u043A\u0443</p>\n      <p class="empty-hint">\u041E\u0431\u0435\u0440\u0456\u0442\u044C \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F \u0443 \u043B\u0456\u0432\u0456\u0439 \u043F\u0430\u043D\u0435\u043B\u0456, \u0449\u043E\u0431 \u043F\u0435\u0440\u0435\u0433\u043B\u044F\u043D\u0443\u0442\u0438 \u0439\u043E\u0433\u043E \u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0438</p>\n    </div>\n  }\n</div>\n', styles: ["/* src/dictionaries/UnitTask/dictUnitTaskItems.component.scss */\n.dict-task-items-container {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  overflow: hidden;\n  background: white;\n}\n.header {\n  padding: 16px;\n  border-bottom: 1px solid #e0e0e0;\n  background: white;\n  flex-shrink: 0;\n}\n.header h3 {\n  margin: 0 0 12px 0;\n  font-size: 18px;\n  font-weight: 500;\n  color: #333;\n}\n.header .header-actions {\n  display: flex;\n  gap: 8px;\n}\n.table-container {\n  flex: 1;\n  overflow: auto;\n  padding: 16px;\n}\n.table-container table {\n  width: 100%;\n}\n.table-container .value-cell {\n  max-width: 400px;\n}\n.table-container .value-cell .value-content {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.loading-container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  gap: 16px;\n}\n.loading-container p {\n  margin: 0;\n  color: #666;\n}\n.empty-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  padding: 32px;\n  text-align: center;\n  color: #666;\n}\n.empty-state .empty-icon {\n  font-size: 64px;\n  width: 64px;\n  height: 64px;\n  color: #bdbdbd;\n  margin-bottom: 16px;\n}\n.empty-state p {\n  margin: 8px 0;\n  font-size: 16px;\n}\n.empty-state .empty-hint {\n  font-size: 14px;\n  color: #999;\n  margin-bottom: 24px;\n}\n/*# sourceMappingURL=dictUnitTaskItems.component.css.map */\n"] }]
  }], () => [{ type: DictUnitTaskItemsService }, { type: MatDialog }, { type: MatSnackBar }], { task: [{
    type: Input
  }], sort: [{
    type: ViewChild,
    args: [MatSort]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DictUnitTaskItemsComponent, { className: "DictUnitTaskItemsComponent", filePath: "dictionaries/UnitTask/dictUnitTaskItems.component.ts", lineNumber: 36 });
})();

// src/dictionaries/UnitTask/dictUnitTask.page.ts
var DictUnitTaskPage = class _DictUnitTaskPage {
  selectedTask = signal(null, ...ngDevMode ? [{ debugName: "selectedTask" }] : []);
  onTaskSelected(task) {
    this.selectedTask.set(task);
  }
  static \u0275fac = function DictUnitTaskPage_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DictUnitTaskPage)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DictUnitTaskPage, selectors: [["dict-unit-task-page"]], decls: 6, vars: 2, consts: [[1, "page-container"], ["storageKey", "dictUnitTask", 3, "initialNavWidth"], ["leftPanel", "", 1, "left-panel-content"], [3, "taskSelected"], ["rightPanel", "", 1, "right-panel-content"], [3, "task"]], template: function DictUnitTaskPage_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "app-master-detail-layout", 1)(2, "div", 2)(3, "dict-unit-tasks", 3);
      \u0275\u0275listener("taskSelected", function DictUnitTaskPage_Template_dict_unit_tasks_taskSelected_3_listener($event) {
        return ctx.onTaskSelected($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(4, "div", 4);
      \u0275\u0275element(5, "dict-unit-task-items", 5);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("initialNavWidth", 40);
      \u0275\u0275advance(4);
      \u0275\u0275property("task", ctx.selectedTask());
    }
  }, dependencies: [
    CommonModule,
    MasterDetailLayoutComponent,
    DictUnitTaskComponent,
    DictUnitTaskItemsComponent
  ], styles: ["\n\n.page-container[_ngcontent-%COMP%] {\n  height: calc(100vh - 64px);\n  overflow: hidden;\n}\n.left-panel-content[_ngcontent-%COMP%], \n.right-panel-content[_ngcontent-%COMP%] {\n  height: 100%;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n}\n.left-panel-content[_ngcontent-%COMP%] {\n  background: #fafafa;\n}\n.right-panel-content[_ngcontent-%COMP%] {\n  background: white;\n}\n/*# sourceMappingURL=dictUnitTask.page.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DictUnitTaskPage, [{
    type: Component,
    args: [{ selector: "dict-unit-task-page", standalone: true, imports: [
      CommonModule,
      MasterDetailLayoutComponent,
      DictUnitTaskComponent,
      DictUnitTaskItemsComponent
    ], template: '<div class="page-container">\n  <app-master-detail-layout storageKey="dictUnitTask" [initialNavWidth]="40">\n    <!-- Left Panel: \u0421\u043F\u0438\u0441\u043E\u043A \u0437\u0430\u0432\u0434\u0430\u043D\u044C -->\n    <div leftPanel class="left-panel-content">\n      <dict-unit-tasks (taskSelected)="onTaskSelected($event)"></dict-unit-tasks>\n    </div>\n\n    <!-- Right Panel: \u0415\u043B\u0435\u043C\u0435\u043D\u0442\u0438 \u0432\u0438\u0431\u0440\u0430\u043D\u043E\u0433\u043E \u0437\u0430\u0432\u0434\u0430\u043D\u043D\u044F -->\n    <div rightPanel class="right-panel-content">\n      <dict-unit-task-items [task]="selectedTask()"></dict-unit-task-items>\n    </div>\n  </app-master-detail-layout>\n</div>\n', styles: ["/* src/dictionaries/UnitTask/dictUnitTask.page.scss */\n.page-container {\n  height: calc(100vh - 64px);\n  overflow: hidden;\n}\n.left-panel-content,\n.right-panel-content {\n  height: 100%;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n}\n.left-panel-content {\n  background: #fafafa;\n}\n.right-panel-content {\n  background: white;\n}\n/*# sourceMappingURL=dictUnitTask.page.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DictUnitTaskPage, { className: "DictUnitTaskPage", filePath: "dictionaries/UnitTask/dictUnitTask.page.ts", lineNumber: 22 });
})();
export {
  DictUnitTaskPage
};
//# sourceMappingURL=chunk-LBDSK4DV.js.map
