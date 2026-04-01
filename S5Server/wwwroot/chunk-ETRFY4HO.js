import {
  ChangePasswordDialogComponent,
  UsersService
} from "./chunk-L7V54S6K.js";
import {
  MasterDetailLayoutComponent
} from "./chunk-X6L72PG3.js";
import {
  MatChip,
  MatChipRemove,
  MatChipRow,
  MatChipsModule
} from "./chunk-GNFVOQPW.js";
import {
  SoldierService
} from "./chunk-MU5M35L7.js";
import {
  SoldierUtils
} from "./chunk-W4R4MX4T.js";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardTitle
} from "./chunk-WOSA5N46.js";
import {
  MatTooltip,
  MatTooltipModule
} from "./chunk-ROBCPIX2.js";
import {
  _MatInternalFormField
} from "./chunk-575Y4FGD.js";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-6M4I25T2.js";
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
  MatSnackBar,
  MatSnackBarModule
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
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle
} from "./chunk-O3FG6F5X.js";
import "./chunk-GFPGE5B5.js";
import {
  BidiModule,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  CommonModule,
  Component,
  DatePipe,
  DefaultValueAccessor,
  ElementRef,
  EventEmitter,
  FocusMonitor,
  FormsModule,
  HostAttributeToken,
  Inject,
  InjectionToken,
  Input,
  MatButton,
  MatButtonModule,
  MatError,
  MatFormField,
  MatFormFieldModule,
  MatHint,
  MatIconButton,
  MatInput,
  MatInputModule,
  MatLabel,
  MatRipple,
  MatSuffix,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgControlStatus,
  NgModel,
  NgModule,
  Output,
  RequiredValidator,
  Subject,
  ViewChild,
  ViewEncapsulation,
  _CdkPrivateStyleLoader,
  _IdGenerator,
  _StructuralStylesLoader,
  _animationsDisabled,
  booleanAttribute,
  computed,
  debounceTime,
  distinctUntilChanged,
  forwardRef,
  inject,
  numberAttribute,
  setClassMetadata,
  signal,
  takeUntil,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵdomProperty,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate4,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-IBDYQGEV.js";

// node_modules/@angular/material/fesm2022/slide-toggle.mjs
var _c0 = ["switch"];
var _c1 = ["*"];
function MatSlideToggle_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 11);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 13);
    \u0275\u0275element(2, "path", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "svg", 15);
    \u0275\u0275element(4, "path", 16);
    \u0275\u0275elementEnd()();
  }
}
var MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS = new InjectionToken("mat-slide-toggle-default-options", {
  providedIn: "root",
  factory: () => ({
    disableToggleValue: false,
    hideIcon: false,
    disabledInteractive: false
  })
});
var MatSlideToggleChange = class {
  source;
  checked;
  constructor(source, checked) {
    this.source = source;
    this.checked = checked;
  }
};
var MatSlideToggle = class _MatSlideToggle {
  _elementRef = inject(ElementRef);
  _focusMonitor = inject(FocusMonitor);
  _changeDetectorRef = inject(ChangeDetectorRef);
  defaults = inject(MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS);
  _onChange = (_) => {
  };
  _onTouched = () => {
  };
  _validatorOnChange = () => {
  };
  _uniqueId;
  _checked = false;
  _createChangeEvent(isChecked) {
    return new MatSlideToggleChange(this, isChecked);
  }
  _labelId;
  get buttonId() {
    return `${this.id || this._uniqueId}-button`;
  }
  _switchElement;
  focus() {
    this._switchElement.nativeElement.focus();
  }
  _noopAnimations = _animationsDisabled();
  _focused;
  name = null;
  id;
  labelPosition = "after";
  ariaLabel = null;
  ariaLabelledby = null;
  ariaDescribedby;
  required;
  color;
  disabled = false;
  disableRipple = false;
  tabIndex = 0;
  get checked() {
    return this._checked;
  }
  set checked(value) {
    this._checked = value;
    this._changeDetectorRef.markForCheck();
  }
  hideIcon;
  disabledInteractive;
  change = new EventEmitter();
  toggleChange = new EventEmitter();
  get inputId() {
    return `${this.id || this._uniqueId}-input`;
  }
  constructor() {
    inject(_CdkPrivateStyleLoader).load(_StructuralStylesLoader);
    const tabIndex = inject(new HostAttributeToken("tabindex"), {
      optional: true
    });
    const defaults = this.defaults;
    this.tabIndex = tabIndex == null ? 0 : parseInt(tabIndex) || 0;
    this.color = defaults.color || "accent";
    this.id = this._uniqueId = inject(_IdGenerator).getId("mat-mdc-slide-toggle-");
    this.hideIcon = defaults.hideIcon ?? false;
    this.disabledInteractive = defaults.disabledInteractive ?? false;
    this._labelId = this._uniqueId + "-label";
  }
  ngAfterContentInit() {
    this._focusMonitor.monitor(this._elementRef, true).subscribe((focusOrigin) => {
      if (focusOrigin === "keyboard" || focusOrigin === "program") {
        this._focused = true;
        this._changeDetectorRef.markForCheck();
      } else if (!focusOrigin) {
        Promise.resolve().then(() => {
          this._focused = false;
          this._onTouched();
          this._changeDetectorRef.markForCheck();
        });
      }
    });
  }
  ngOnChanges(changes) {
    if (changes["required"]) {
      this._validatorOnChange();
    }
  }
  ngOnDestroy() {
    this._focusMonitor.stopMonitoring(this._elementRef);
  }
  writeValue(value) {
    this.checked = !!value;
  }
  registerOnChange(fn) {
    this._onChange = fn;
  }
  registerOnTouched(fn) {
    this._onTouched = fn;
  }
  validate(control) {
    return this.required && control.value !== true ? {
      "required": true
    } : null;
  }
  registerOnValidatorChange(fn) {
    this._validatorOnChange = fn;
  }
  setDisabledState(isDisabled) {
    this.disabled = isDisabled;
    this._changeDetectorRef.markForCheck();
  }
  toggle() {
    this.checked = !this.checked;
    this._onChange(this.checked);
  }
  _emitChangeEvent() {
    this._onChange(this.checked);
    this.change.emit(this._createChangeEvent(this.checked));
  }
  _handleClick() {
    if (!this.disabled) {
      this.toggleChange.emit();
      if (!this.defaults.disableToggleValue) {
        this.checked = !this.checked;
        this._onChange(this.checked);
        this.change.emit(new MatSlideToggleChange(this, this.checked));
      }
    }
  }
  _getAriaLabelledBy() {
    if (this.ariaLabelledby) {
      return this.ariaLabelledby;
    }
    return this.ariaLabel ? null : this._labelId;
  }
  static \u0275fac = function MatSlideToggle_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatSlideToggle)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatSlideToggle,
    selectors: [["mat-slide-toggle"]],
    viewQuery: function MatSlideToggle_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c0, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._switchElement = _t.first);
      }
    },
    hostAttrs: [1, "mat-mdc-slide-toggle"],
    hostVars: 13,
    hostBindings: function MatSlideToggle_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275domProperty("id", ctx.id);
        \u0275\u0275attribute("tabindex", null)("aria-label", null)("name", null)("aria-labelledby", null);
        \u0275\u0275classMap(ctx.color ? "mat-" + ctx.color : "");
        \u0275\u0275classProp("mat-mdc-slide-toggle-focused", ctx._focused)("mat-mdc-slide-toggle-checked", ctx.checked)("_mat-animation-noopable", ctx._noopAnimations);
      }
    },
    inputs: {
      name: "name",
      id: "id",
      labelPosition: "labelPosition",
      ariaLabel: [0, "aria-label", "ariaLabel"],
      ariaLabelledby: [0, "aria-labelledby", "ariaLabelledby"],
      ariaDescribedby: [0, "aria-describedby", "ariaDescribedby"],
      required: [2, "required", "required", booleanAttribute],
      color: "color",
      disabled: [2, "disabled", "disabled", booleanAttribute],
      disableRipple: [2, "disableRipple", "disableRipple", booleanAttribute],
      tabIndex: [2, "tabIndex", "tabIndex", (value) => value == null ? 0 : numberAttribute(value)],
      checked: [2, "checked", "checked", booleanAttribute],
      hideIcon: [2, "hideIcon", "hideIcon", booleanAttribute],
      disabledInteractive: [2, "disabledInteractive", "disabledInteractive", booleanAttribute]
    },
    outputs: {
      change: "change",
      toggleChange: "toggleChange"
    },
    exportAs: ["matSlideToggle"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => _MatSlideToggle),
      multi: true
    }, {
      provide: NG_VALIDATORS,
      useExisting: _MatSlideToggle,
      multi: true
    }]), \u0275\u0275NgOnChangesFeature],
    ngContentSelectors: _c1,
    decls: 14,
    vars: 27,
    consts: [["switch", ""], ["mat-internal-form-field", "", 3, "labelPosition"], ["role", "switch", "type", "button", 1, "mdc-switch", 3, "click", "tabIndex", "disabled"], [1, "mat-mdc-slide-toggle-touch-target"], [1, "mdc-switch__track"], [1, "mdc-switch__handle-track"], [1, "mdc-switch__handle"], [1, "mdc-switch__shadow"], [1, "mdc-elevation-overlay"], [1, "mdc-switch__ripple"], ["mat-ripple", "", 1, "mat-mdc-slide-toggle-ripple", "mat-focus-indicator", 3, "matRippleTrigger", "matRippleDisabled", "matRippleCentered"], [1, "mdc-switch__icons"], [1, "mdc-label", 3, "click", "for"], ["viewBox", "0 0 24 24", "aria-hidden", "true", 1, "mdc-switch__icon", "mdc-switch__icon--on"], ["d", "M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z"], ["viewBox", "0 0 24 24", "aria-hidden", "true", 1, "mdc-switch__icon", "mdc-switch__icon--off"], ["d", "M20 13H4v-2h16v2z"]],
    template: function MatSlideToggle_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275projectionDef();
        \u0275\u0275elementStart(0, "div", 1)(1, "button", 2, 0);
        \u0275\u0275listener("click", function MatSlideToggle_Template_button_click_1_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx._handleClick());
        });
        \u0275\u0275element(3, "div", 3)(4, "span", 4);
        \u0275\u0275elementStart(5, "span", 5)(6, "span", 6)(7, "span", 7);
        \u0275\u0275element(8, "span", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "span", 9);
        \u0275\u0275element(10, "span", 10);
        \u0275\u0275elementEnd();
        \u0275\u0275conditionalCreate(11, MatSlideToggle_Conditional_11_Template, 5, 0, "span", 11);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(12, "label", 12);
        \u0275\u0275listener("click", function MatSlideToggle_Template_label_click_12_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView($event.stopPropagation());
        });
        \u0275\u0275projection(13);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        const switch_r2 = \u0275\u0275reference(2);
        \u0275\u0275property("labelPosition", ctx.labelPosition);
        \u0275\u0275advance();
        \u0275\u0275classProp("mdc-switch--selected", ctx.checked)("mdc-switch--unselected", !ctx.checked)("mdc-switch--checked", ctx.checked)("mdc-switch--disabled", ctx.disabled)("mat-mdc-slide-toggle-disabled-interactive", ctx.disabledInteractive);
        \u0275\u0275property("tabIndex", ctx.disabled && !ctx.disabledInteractive ? -1 : ctx.tabIndex)("disabled", ctx.disabled && !ctx.disabledInteractive);
        \u0275\u0275attribute("id", ctx.buttonId)("name", ctx.name)("aria-label", ctx.ariaLabel)("aria-labelledby", ctx._getAriaLabelledBy())("aria-describedby", ctx.ariaDescribedby)("aria-required", ctx.required || null)("aria-checked", ctx.checked)("aria-disabled", ctx.disabled && ctx.disabledInteractive ? "true" : null);
        \u0275\u0275advance(9);
        \u0275\u0275property("matRippleTrigger", switch_r2)("matRippleDisabled", ctx.disableRipple || ctx.disabled)("matRippleCentered", true);
        \u0275\u0275advance();
        \u0275\u0275conditional(!ctx.hideIcon ? 11 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("for", ctx.buttonId);
        \u0275\u0275attribute("id", ctx._labelId);
      }
    },
    dependencies: [MatRipple, _MatInternalFormField],
    styles: ['.mdc-switch{align-items:center;background:none;border:none;cursor:pointer;display:inline-flex;flex-shrink:0;margin:0;outline:none;overflow:visible;padding:0;position:relative;width:var(--mat-slide-toggle-track-width, 52px)}.mdc-switch.mdc-switch--disabled{cursor:default;pointer-events:none}.mdc-switch.mat-mdc-slide-toggle-disabled-interactive{pointer-events:auto}label:empty{display:none}.mdc-switch__track{overflow:hidden;position:relative;width:100%;height:var(--mat-slide-toggle-track-height, 32px);border-radius:var(--mat-slide-toggle-track-shape, var(--mat-sys-corner-full))}.mdc-switch--disabled.mdc-switch .mdc-switch__track{opacity:var(--mat-slide-toggle-disabled-track-opacity, 0.12)}.mdc-switch__track::before,.mdc-switch__track::after{border:1px solid rgba(0,0,0,0);border-radius:inherit;box-sizing:border-box;content:"";height:100%;left:0;position:absolute;width:100%;border-width:var(--mat-slide-toggle-track-outline-width, 2px);border-color:var(--mat-slide-toggle-track-outline-color, var(--mat-sys-outline))}.mdc-switch--selected .mdc-switch__track::before,.mdc-switch--selected .mdc-switch__track::after{border-width:var(--mat-slide-toggle-selected-track-outline-width, 2px);border-color:var(--mat-slide-toggle-selected-track-outline-color, transparent)}.mdc-switch--disabled .mdc-switch__track::before,.mdc-switch--disabled .mdc-switch__track::after{border-width:var(--mat-slide-toggle-disabled-unselected-track-outline-width, 2px);border-color:var(--mat-slide-toggle-disabled-unselected-track-outline-color, var(--mat-sys-on-surface))}@media(forced-colors: active){.mdc-switch__track{border-color:currentColor}}.mdc-switch__track::before{transition:transform 75ms 0ms cubic-bezier(0, 0, 0.2, 1);transform:translateX(0);background:var(--mat-slide-toggle-unselected-track-color, var(--mat-sys-surface-variant))}.mdc-switch--selected .mdc-switch__track::before{transition:transform 75ms 0ms cubic-bezier(0.4, 0, 0.6, 1);transform:translateX(100%)}[dir=rtl] .mdc-switch--selected .mdc-switch--selected .mdc-switch__track::before{transform:translateX(-100%)}.mdc-switch--selected .mdc-switch__track::before{opacity:var(--mat-slide-toggle-hidden-track-opacity, 0);transition:var(--mat-slide-toggle-hidden-track-transition, opacity 75ms)}.mdc-switch--unselected .mdc-switch__track::before{opacity:var(--mat-slide-toggle-visible-track-opacity, 1);transition:var(--mat-slide-toggle-visible-track-transition, opacity 75ms)}.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::before{background:var(--mat-slide-toggle-unselected-hover-track-color, var(--mat-sys-surface-variant))}.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::before{background:var(--mat-slide-toggle-unselected-focus-track-color, var(--mat-sys-surface-variant))}.mdc-switch:enabled:active .mdc-switch__track::before{background:var(--mat-slide-toggle-unselected-pressed-track-color, var(--mat-sys-surface-variant))}.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__track::before,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__track::before,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__track::before,.mdc-switch.mdc-switch--disabled .mdc-switch__track::before{background:var(--mat-slide-toggle-disabled-unselected-track-color, var(--mat-sys-surface-variant))}.mdc-switch__track::after{transform:translateX(-100%);background:var(--mat-slide-toggle-selected-track-color, var(--mat-sys-primary))}[dir=rtl] .mdc-switch__track::after{transform:translateX(100%)}.mdc-switch--selected .mdc-switch__track::after{transform:translateX(0)}.mdc-switch--selected .mdc-switch__track::after{opacity:var(--mat-slide-toggle-visible-track-opacity, 1);transition:var(--mat-slide-toggle-visible-track-transition, opacity 75ms)}.mdc-switch--unselected .mdc-switch__track::after{opacity:var(--mat-slide-toggle-hidden-track-opacity, 0);transition:var(--mat-slide-toggle-hidden-track-transition, opacity 75ms)}.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::after{background:var(--mat-slide-toggle-selected-hover-track-color, var(--mat-sys-primary))}.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::after{background:var(--mat-slide-toggle-selected-focus-track-color, var(--mat-sys-primary))}.mdc-switch:enabled:active .mdc-switch__track::after{background:var(--mat-slide-toggle-selected-pressed-track-color, var(--mat-sys-primary))}.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__track::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__track::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__track::after,.mdc-switch.mdc-switch--disabled .mdc-switch__track::after{background:var(--mat-slide-toggle-disabled-selected-track-color, var(--mat-sys-on-surface))}.mdc-switch__handle-track{height:100%;pointer-events:none;position:absolute;top:0;transition:transform 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);left:0;right:auto;transform:translateX(0);width:calc(100% - var(--mat-slide-toggle-handle-width))}[dir=rtl] .mdc-switch__handle-track{left:auto;right:0}.mdc-switch--selected .mdc-switch__handle-track{transform:translateX(100%)}[dir=rtl] .mdc-switch--selected .mdc-switch__handle-track{transform:translateX(-100%)}.mdc-switch__handle{display:flex;pointer-events:auto;position:absolute;top:50%;transform:translateY(-50%);left:0;right:auto;transition:width 75ms cubic-bezier(0.4, 0, 0.2, 1),height 75ms cubic-bezier(0.4, 0, 0.2, 1),margin 75ms cubic-bezier(0.4, 0, 0.2, 1);width:var(--mat-slide-toggle-handle-width);height:var(--mat-slide-toggle-handle-height);border-radius:var(--mat-slide-toggle-handle-shape, var(--mat-sys-corner-full))}[dir=rtl] .mdc-switch__handle{left:auto;right:0}.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle{width:var(--mat-slide-toggle-unselected-handle-size, 16px);height:var(--mat-slide-toggle-unselected-handle-size, 16px);margin:var(--mat-slide-toggle-unselected-handle-horizontal-margin, 0 8px)}.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle:has(.mdc-switch__icons){margin:var(--mat-slide-toggle-unselected-with-icon-handle-horizontal-margin, 0 4px)}.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle{width:var(--mat-slide-toggle-selected-handle-size, 24px);height:var(--mat-slide-toggle-selected-handle-size, 24px);margin:var(--mat-slide-toggle-selected-handle-horizontal-margin, 0 24px)}.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle:has(.mdc-switch__icons){margin:var(--mat-slide-toggle-selected-with-icon-handle-horizontal-margin, 0 24px)}.mat-mdc-slide-toggle .mdc-switch__handle:has(.mdc-switch__icons){width:var(--mat-slide-toggle-with-icon-handle-size, 24px);height:var(--mat-slide-toggle-with-icon-handle-size, 24px)}.mat-mdc-slide-toggle .mdc-switch:active:not(.mdc-switch--disabled) .mdc-switch__handle{width:var(--mat-slide-toggle-pressed-handle-size, 28px);height:var(--mat-slide-toggle-pressed-handle-size, 28px)}.mat-mdc-slide-toggle .mdc-switch--selected:active:not(.mdc-switch--disabled) .mdc-switch__handle{margin:var(--mat-slide-toggle-selected-pressed-handle-horizontal-margin, 0 22px)}.mat-mdc-slide-toggle .mdc-switch--unselected:active:not(.mdc-switch--disabled) .mdc-switch__handle{margin:var(--mat-slide-toggle-unselected-pressed-handle-horizontal-margin, 0 2px)}.mdc-switch--disabled.mdc-switch--selected .mdc-switch__handle::after{opacity:var(--mat-slide-toggle-disabled-selected-handle-opacity, 1)}.mdc-switch--disabled.mdc-switch--unselected .mdc-switch__handle::after{opacity:var(--mat-slide-toggle-disabled-unselected-handle-opacity, 0.38)}.mdc-switch__handle::before,.mdc-switch__handle::after{border:1px solid rgba(0,0,0,0);border-radius:inherit;box-sizing:border-box;content:"";width:100%;height:100%;left:0;position:absolute;top:0;transition:background-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1),border-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);z-index:-1}@media(forced-colors: active){.mdc-switch__handle::before,.mdc-switch__handle::after{border-color:currentColor}}.mdc-switch--selected:enabled .mdc-switch__handle::after{background:var(--mat-slide-toggle-selected-handle-color, var(--mat-sys-on-primary))}.mdc-switch--selected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after{background:var(--mat-slide-toggle-selected-hover-handle-color, var(--mat-sys-primary-container))}.mdc-switch--selected:enabled:focus:not(:active) .mdc-switch__handle::after{background:var(--mat-slide-toggle-selected-focus-handle-color, var(--mat-sys-primary-container))}.mdc-switch--selected:enabled:active .mdc-switch__handle::after{background:var(--mat-slide-toggle-selected-pressed-handle-color, var(--mat-sys-primary-container))}.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:hover:not(:focus):not(:active) .mdc-switch__handle::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:focus:not(:active) .mdc-switch__handle::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:active .mdc-switch__handle::after,.mdc-switch--selected.mdc-switch--disabled .mdc-switch__handle::after{background:var(--mat-slide-toggle-disabled-selected-handle-color, var(--mat-sys-surface))}.mdc-switch--unselected:enabled .mdc-switch__handle::after{background:var(--mat-slide-toggle-unselected-handle-color, var(--mat-sys-outline))}.mdc-switch--unselected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after{background:var(--mat-slide-toggle-unselected-hover-handle-color, var(--mat-sys-on-surface-variant))}.mdc-switch--unselected:enabled:focus:not(:active) .mdc-switch__handle::after{background:var(--mat-slide-toggle-unselected-focus-handle-color, var(--mat-sys-on-surface-variant))}.mdc-switch--unselected:enabled:active .mdc-switch__handle::after{background:var(--mat-slide-toggle-unselected-pressed-handle-color, var(--mat-sys-on-surface-variant))}.mdc-switch--unselected.mdc-switch--disabled .mdc-switch__handle::after{background:var(--mat-slide-toggle-disabled-unselected-handle-color, var(--mat-sys-on-surface))}.mdc-switch__handle::before{background:var(--mat-slide-toggle-handle-surface-color)}.mdc-switch__shadow{border-radius:inherit;bottom:0;left:0;position:absolute;right:0;top:0}.mdc-switch:enabled .mdc-switch__shadow{box-shadow:var(--mat-slide-toggle-handle-elevation-shadow)}.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__shadow,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__shadow,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__shadow,.mdc-switch.mdc-switch--disabled .mdc-switch__shadow{box-shadow:var(--mat-slide-toggle-disabled-handle-elevation-shadow)}.mdc-switch__ripple{left:50%;position:absolute;top:50%;transform:translate(-50%, -50%);z-index:-1;width:var(--mat-slide-toggle-state-layer-size, 40px);height:var(--mat-slide-toggle-state-layer-size, 40px)}.mdc-switch__ripple::after{content:"";opacity:0}.mdc-switch--disabled .mdc-switch__ripple::after{display:none}.mat-mdc-slide-toggle-disabled-interactive .mdc-switch__ripple::after{display:block}.mdc-switch:hover .mdc-switch__ripple::after{transition:75ms opacity cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:focus .mdc-switch__ripple::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:active .mdc-switch__ripple::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:hover:not(:focus) .mdc-switch__ripple::after,.mdc-switch--unselected:enabled:hover:not(:focus) .mdc-switch__ripple::after{background:var(--mat-slide-toggle-unselected-hover-state-layer-color, var(--mat-sys-on-surface));opacity:var(--mat-slide-toggle-unselected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity))}.mdc-switch--unselected:enabled:focus .mdc-switch__ripple::after{background:var(--mat-slide-toggle-unselected-focus-state-layer-color, var(--mat-sys-on-surface));opacity:var(--mat-slide-toggle-unselected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity))}.mdc-switch--unselected:enabled:active .mdc-switch__ripple::after{background:var(--mat-slide-toggle-unselected-pressed-state-layer-color, var(--mat-sys-on-surface));opacity:var(--mat-slide-toggle-unselected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));transition:opacity 75ms linear}.mdc-switch--selected:enabled:hover:not(:focus) .mdc-switch__ripple::after{background:var(--mat-slide-toggle-selected-hover-state-layer-color, var(--mat-sys-primary));opacity:var(--mat-slide-toggle-selected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity))}.mdc-switch--selected:enabled:focus .mdc-switch__ripple::after{background:var(--mat-slide-toggle-selected-focus-state-layer-color, var(--mat-sys-primary));opacity:var(--mat-slide-toggle-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity))}.mdc-switch--selected:enabled:active .mdc-switch__ripple::after{background:var(--mat-slide-toggle-selected-pressed-state-layer-color, var(--mat-sys-primary));opacity:var(--mat-slide-toggle-selected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));transition:opacity 75ms linear}.mdc-switch__icons{position:relative;height:100%;width:100%;z-index:1;transform:translateZ(0)}.mdc-switch--disabled.mdc-switch--unselected .mdc-switch__icons{opacity:var(--mat-slide-toggle-disabled-unselected-icon-opacity, 0.38)}.mdc-switch--disabled.mdc-switch--selected .mdc-switch__icons{opacity:var(--mat-slide-toggle-disabled-selected-icon-opacity, 0.38)}.mdc-switch__icon{bottom:0;left:0;margin:auto;position:absolute;right:0;top:0;opacity:0;transition:opacity 30ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-switch--unselected .mdc-switch__icon{width:var(--mat-slide-toggle-unselected-icon-size, 16px);height:var(--mat-slide-toggle-unselected-icon-size, 16px);fill:var(--mat-slide-toggle-unselected-icon-color, var(--mat-sys-surface-variant))}.mdc-switch--unselected.mdc-switch--disabled .mdc-switch__icon{fill:var(--mat-slide-toggle-disabled-unselected-icon-color, var(--mat-sys-surface-variant))}.mdc-switch--selected .mdc-switch__icon{width:var(--mat-slide-toggle-selected-icon-size, 16px);height:var(--mat-slide-toggle-selected-icon-size, 16px);fill:var(--mat-slide-toggle-selected-icon-color, var(--mat-sys-on-primary-container))}.mdc-switch--selected.mdc-switch--disabled .mdc-switch__icon{fill:var(--mat-slide-toggle-disabled-selected-icon-color, var(--mat-sys-on-surface))}.mdc-switch--selected .mdc-switch__icon--on,.mdc-switch--unselected .mdc-switch__icon--off{opacity:1;transition:opacity 45ms 30ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-slide-toggle{-webkit-user-select:none;user-select:none;display:inline-block;-webkit-tap-highlight-color:rgba(0,0,0,0);outline:0}.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple,.mat-mdc-slide-toggle .mdc-switch__ripple::after{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:50%;pointer-events:none}.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple:not(:empty),.mat-mdc-slide-toggle .mdc-switch__ripple::after:not(:empty){transform:translateZ(0)}.mat-mdc-slide-toggle.mat-mdc-slide-toggle-focused .mat-focus-indicator::before{content:""}.mat-mdc-slide-toggle .mat-internal-form-field{color:var(--mat-slide-toggle-label-text-color, var(--mat-sys-on-surface));font-family:var(--mat-slide-toggle-label-text-font, var(--mat-sys-body-medium-font));line-height:var(--mat-slide-toggle-label-text-line-height, var(--mat-sys-body-medium-line-height));font-size:var(--mat-slide-toggle-label-text-size, var(--mat-sys-body-medium-size));letter-spacing:var(--mat-slide-toggle-label-text-tracking, var(--mat-sys-body-medium-tracking));font-weight:var(--mat-slide-toggle-label-text-weight, var(--mat-sys-body-medium-weight))}.mat-mdc-slide-toggle .mat-ripple-element{opacity:.12}.mat-mdc-slide-toggle .mat-focus-indicator::before{border-radius:50%}.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle-track,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__icon,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::before,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::after,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::before,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::after{transition:none}.mat-mdc-slide-toggle .mdc-switch:enabled+.mdc-label{cursor:pointer}.mat-mdc-slide-toggle .mdc-switch--disabled+label{color:var(--mat-slide-toggle-disabled-label-text-color, var(--mat-sys-on-surface))}.mat-mdc-slide-toggle-touch-target{position:absolute;top:50%;left:50%;height:var(--mat-slide-toggle-touch-target-size, 48px);width:100%;transform:translate(-50%, -50%);display:var(--mat-slide-toggle-touch-target-display, block)}[dir=rtl] .mat-mdc-slide-toggle-touch-target{left:auto;right:50%;transform:translate(50%, -50%)}\n'],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatSlideToggle, [{
    type: Component,
    args: [{
      selector: "mat-slide-toggle",
      host: {
        "class": "mat-mdc-slide-toggle",
        "[id]": "id",
        "[attr.tabindex]": "null",
        "[attr.aria-label]": "null",
        "[attr.name]": "null",
        "[attr.aria-labelledby]": "null",
        "[class.mat-mdc-slide-toggle-focused]": "_focused",
        "[class.mat-mdc-slide-toggle-checked]": "checked",
        "[class._mat-animation-noopable]": "_noopAnimations",
        "[class]": 'color ? "mat-" + color : ""'
      },
      exportAs: "matSlideToggle",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => MatSlideToggle),
        multi: true
      }, {
        provide: NG_VALIDATORS,
        useExisting: MatSlideToggle,
        multi: true
      }],
      imports: [MatRipple, _MatInternalFormField],
      template: `<div mat-internal-form-field [labelPosition]="labelPosition">
  <button
    class="mdc-switch"
    role="switch"
    type="button"
    [class.mdc-switch--selected]="checked"
    [class.mdc-switch--unselected]="!checked"
    [class.mdc-switch--checked]="checked"
    [class.mdc-switch--disabled]="disabled"
    [class.mat-mdc-slide-toggle-disabled-interactive]="disabledInteractive"
    [tabIndex]="disabled && !disabledInteractive ? -1 : tabIndex"
    [disabled]="disabled && !disabledInteractive"
    [attr.id]="buttonId"
    [attr.name]="name"
    [attr.aria-label]="ariaLabel"
    [attr.aria-labelledby]="_getAriaLabelledBy()"
    [attr.aria-describedby]="ariaDescribedby"
    [attr.aria-required]="required || null"
    [attr.aria-checked]="checked"
    [attr.aria-disabled]="disabled && disabledInteractive ? 'true' : null"
    (click)="_handleClick()"
    #switch>
    <div class="mat-mdc-slide-toggle-touch-target"></div>
    <span class="mdc-switch__track"></span>
    <span class="mdc-switch__handle-track">
      <span class="mdc-switch__handle">
        <span class="mdc-switch__shadow">
          <span class="mdc-elevation-overlay"></span>
        </span>
        <span class="mdc-switch__ripple">
          <span class="mat-mdc-slide-toggle-ripple mat-focus-indicator" mat-ripple
            [matRippleTrigger]="switch"
            [matRippleDisabled]="disableRipple || disabled"
            [matRippleCentered]="true"></span>
        </span>
        @if (!hideIcon) {
          <span class="mdc-switch__icons">
            <svg
              class="mdc-switch__icon mdc-switch__icon--on"
              viewBox="0 0 24 24"
              aria-hidden="true">
              <path d="M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z" />
            </svg>
            <svg
              class="mdc-switch__icon mdc-switch__icon--off"
              viewBox="0 0 24 24"
              aria-hidden="true">
              <path d="M20 13H4v-2h16v2z" />
            </svg>
          </span>
        }
      </span>
    </span>
  </button>

  <!--
    Clicking on the label will trigger another click event from the button.
    Stop propagation here so other listeners further up in the DOM don't execute twice.
  -->
  <label class="mdc-label" [for]="buttonId" [attr.id]="_labelId" (click)="$event.stopPropagation()">
    <ng-content></ng-content>
  </label>
</div>
`,
      styles: ['.mdc-switch{align-items:center;background:none;border:none;cursor:pointer;display:inline-flex;flex-shrink:0;margin:0;outline:none;overflow:visible;padding:0;position:relative;width:var(--mat-slide-toggle-track-width, 52px)}.mdc-switch.mdc-switch--disabled{cursor:default;pointer-events:none}.mdc-switch.mat-mdc-slide-toggle-disabled-interactive{pointer-events:auto}label:empty{display:none}.mdc-switch__track{overflow:hidden;position:relative;width:100%;height:var(--mat-slide-toggle-track-height, 32px);border-radius:var(--mat-slide-toggle-track-shape, var(--mat-sys-corner-full))}.mdc-switch--disabled.mdc-switch .mdc-switch__track{opacity:var(--mat-slide-toggle-disabled-track-opacity, 0.12)}.mdc-switch__track::before,.mdc-switch__track::after{border:1px solid rgba(0,0,0,0);border-radius:inherit;box-sizing:border-box;content:"";height:100%;left:0;position:absolute;width:100%;border-width:var(--mat-slide-toggle-track-outline-width, 2px);border-color:var(--mat-slide-toggle-track-outline-color, var(--mat-sys-outline))}.mdc-switch--selected .mdc-switch__track::before,.mdc-switch--selected .mdc-switch__track::after{border-width:var(--mat-slide-toggle-selected-track-outline-width, 2px);border-color:var(--mat-slide-toggle-selected-track-outline-color, transparent)}.mdc-switch--disabled .mdc-switch__track::before,.mdc-switch--disabled .mdc-switch__track::after{border-width:var(--mat-slide-toggle-disabled-unselected-track-outline-width, 2px);border-color:var(--mat-slide-toggle-disabled-unselected-track-outline-color, var(--mat-sys-on-surface))}@media(forced-colors: active){.mdc-switch__track{border-color:currentColor}}.mdc-switch__track::before{transition:transform 75ms 0ms cubic-bezier(0, 0, 0.2, 1);transform:translateX(0);background:var(--mat-slide-toggle-unselected-track-color, var(--mat-sys-surface-variant))}.mdc-switch--selected .mdc-switch__track::before{transition:transform 75ms 0ms cubic-bezier(0.4, 0, 0.6, 1);transform:translateX(100%)}[dir=rtl] .mdc-switch--selected .mdc-switch--selected .mdc-switch__track::before{transform:translateX(-100%)}.mdc-switch--selected .mdc-switch__track::before{opacity:var(--mat-slide-toggle-hidden-track-opacity, 0);transition:var(--mat-slide-toggle-hidden-track-transition, opacity 75ms)}.mdc-switch--unselected .mdc-switch__track::before{opacity:var(--mat-slide-toggle-visible-track-opacity, 1);transition:var(--mat-slide-toggle-visible-track-transition, opacity 75ms)}.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::before{background:var(--mat-slide-toggle-unselected-hover-track-color, var(--mat-sys-surface-variant))}.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::before{background:var(--mat-slide-toggle-unselected-focus-track-color, var(--mat-sys-surface-variant))}.mdc-switch:enabled:active .mdc-switch__track::before{background:var(--mat-slide-toggle-unselected-pressed-track-color, var(--mat-sys-surface-variant))}.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__track::before,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__track::before,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__track::before,.mdc-switch.mdc-switch--disabled .mdc-switch__track::before{background:var(--mat-slide-toggle-disabled-unselected-track-color, var(--mat-sys-surface-variant))}.mdc-switch__track::after{transform:translateX(-100%);background:var(--mat-slide-toggle-selected-track-color, var(--mat-sys-primary))}[dir=rtl] .mdc-switch__track::after{transform:translateX(100%)}.mdc-switch--selected .mdc-switch__track::after{transform:translateX(0)}.mdc-switch--selected .mdc-switch__track::after{opacity:var(--mat-slide-toggle-visible-track-opacity, 1);transition:var(--mat-slide-toggle-visible-track-transition, opacity 75ms)}.mdc-switch--unselected .mdc-switch__track::after{opacity:var(--mat-slide-toggle-hidden-track-opacity, 0);transition:var(--mat-slide-toggle-hidden-track-transition, opacity 75ms)}.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::after{background:var(--mat-slide-toggle-selected-hover-track-color, var(--mat-sys-primary))}.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::after{background:var(--mat-slide-toggle-selected-focus-track-color, var(--mat-sys-primary))}.mdc-switch:enabled:active .mdc-switch__track::after{background:var(--mat-slide-toggle-selected-pressed-track-color, var(--mat-sys-primary))}.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__track::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__track::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__track::after,.mdc-switch.mdc-switch--disabled .mdc-switch__track::after{background:var(--mat-slide-toggle-disabled-selected-track-color, var(--mat-sys-on-surface))}.mdc-switch__handle-track{height:100%;pointer-events:none;position:absolute;top:0;transition:transform 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);left:0;right:auto;transform:translateX(0);width:calc(100% - var(--mat-slide-toggle-handle-width))}[dir=rtl] .mdc-switch__handle-track{left:auto;right:0}.mdc-switch--selected .mdc-switch__handle-track{transform:translateX(100%)}[dir=rtl] .mdc-switch--selected .mdc-switch__handle-track{transform:translateX(-100%)}.mdc-switch__handle{display:flex;pointer-events:auto;position:absolute;top:50%;transform:translateY(-50%);left:0;right:auto;transition:width 75ms cubic-bezier(0.4, 0, 0.2, 1),height 75ms cubic-bezier(0.4, 0, 0.2, 1),margin 75ms cubic-bezier(0.4, 0, 0.2, 1);width:var(--mat-slide-toggle-handle-width);height:var(--mat-slide-toggle-handle-height);border-radius:var(--mat-slide-toggle-handle-shape, var(--mat-sys-corner-full))}[dir=rtl] .mdc-switch__handle{left:auto;right:0}.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle{width:var(--mat-slide-toggle-unselected-handle-size, 16px);height:var(--mat-slide-toggle-unselected-handle-size, 16px);margin:var(--mat-slide-toggle-unselected-handle-horizontal-margin, 0 8px)}.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle:has(.mdc-switch__icons){margin:var(--mat-slide-toggle-unselected-with-icon-handle-horizontal-margin, 0 4px)}.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle{width:var(--mat-slide-toggle-selected-handle-size, 24px);height:var(--mat-slide-toggle-selected-handle-size, 24px);margin:var(--mat-slide-toggle-selected-handle-horizontal-margin, 0 24px)}.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle:has(.mdc-switch__icons){margin:var(--mat-slide-toggle-selected-with-icon-handle-horizontal-margin, 0 24px)}.mat-mdc-slide-toggle .mdc-switch__handle:has(.mdc-switch__icons){width:var(--mat-slide-toggle-with-icon-handle-size, 24px);height:var(--mat-slide-toggle-with-icon-handle-size, 24px)}.mat-mdc-slide-toggle .mdc-switch:active:not(.mdc-switch--disabled) .mdc-switch__handle{width:var(--mat-slide-toggle-pressed-handle-size, 28px);height:var(--mat-slide-toggle-pressed-handle-size, 28px)}.mat-mdc-slide-toggle .mdc-switch--selected:active:not(.mdc-switch--disabled) .mdc-switch__handle{margin:var(--mat-slide-toggle-selected-pressed-handle-horizontal-margin, 0 22px)}.mat-mdc-slide-toggle .mdc-switch--unselected:active:not(.mdc-switch--disabled) .mdc-switch__handle{margin:var(--mat-slide-toggle-unselected-pressed-handle-horizontal-margin, 0 2px)}.mdc-switch--disabled.mdc-switch--selected .mdc-switch__handle::after{opacity:var(--mat-slide-toggle-disabled-selected-handle-opacity, 1)}.mdc-switch--disabled.mdc-switch--unselected .mdc-switch__handle::after{opacity:var(--mat-slide-toggle-disabled-unselected-handle-opacity, 0.38)}.mdc-switch__handle::before,.mdc-switch__handle::after{border:1px solid rgba(0,0,0,0);border-radius:inherit;box-sizing:border-box;content:"";width:100%;height:100%;left:0;position:absolute;top:0;transition:background-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1),border-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);z-index:-1}@media(forced-colors: active){.mdc-switch__handle::before,.mdc-switch__handle::after{border-color:currentColor}}.mdc-switch--selected:enabled .mdc-switch__handle::after{background:var(--mat-slide-toggle-selected-handle-color, var(--mat-sys-on-primary))}.mdc-switch--selected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after{background:var(--mat-slide-toggle-selected-hover-handle-color, var(--mat-sys-primary-container))}.mdc-switch--selected:enabled:focus:not(:active) .mdc-switch__handle::after{background:var(--mat-slide-toggle-selected-focus-handle-color, var(--mat-sys-primary-container))}.mdc-switch--selected:enabled:active .mdc-switch__handle::after{background:var(--mat-slide-toggle-selected-pressed-handle-color, var(--mat-sys-primary-container))}.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:hover:not(:focus):not(:active) .mdc-switch__handle::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:focus:not(:active) .mdc-switch__handle::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:active .mdc-switch__handle::after,.mdc-switch--selected.mdc-switch--disabled .mdc-switch__handle::after{background:var(--mat-slide-toggle-disabled-selected-handle-color, var(--mat-sys-surface))}.mdc-switch--unselected:enabled .mdc-switch__handle::after{background:var(--mat-slide-toggle-unselected-handle-color, var(--mat-sys-outline))}.mdc-switch--unselected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after{background:var(--mat-slide-toggle-unselected-hover-handle-color, var(--mat-sys-on-surface-variant))}.mdc-switch--unselected:enabled:focus:not(:active) .mdc-switch__handle::after{background:var(--mat-slide-toggle-unselected-focus-handle-color, var(--mat-sys-on-surface-variant))}.mdc-switch--unselected:enabled:active .mdc-switch__handle::after{background:var(--mat-slide-toggle-unselected-pressed-handle-color, var(--mat-sys-on-surface-variant))}.mdc-switch--unselected.mdc-switch--disabled .mdc-switch__handle::after{background:var(--mat-slide-toggle-disabled-unselected-handle-color, var(--mat-sys-on-surface))}.mdc-switch__handle::before{background:var(--mat-slide-toggle-handle-surface-color)}.mdc-switch__shadow{border-radius:inherit;bottom:0;left:0;position:absolute;right:0;top:0}.mdc-switch:enabled .mdc-switch__shadow{box-shadow:var(--mat-slide-toggle-handle-elevation-shadow)}.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__shadow,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__shadow,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__shadow,.mdc-switch.mdc-switch--disabled .mdc-switch__shadow{box-shadow:var(--mat-slide-toggle-disabled-handle-elevation-shadow)}.mdc-switch__ripple{left:50%;position:absolute;top:50%;transform:translate(-50%, -50%);z-index:-1;width:var(--mat-slide-toggle-state-layer-size, 40px);height:var(--mat-slide-toggle-state-layer-size, 40px)}.mdc-switch__ripple::after{content:"";opacity:0}.mdc-switch--disabled .mdc-switch__ripple::after{display:none}.mat-mdc-slide-toggle-disabled-interactive .mdc-switch__ripple::after{display:block}.mdc-switch:hover .mdc-switch__ripple::after{transition:75ms opacity cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:focus .mdc-switch__ripple::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:active .mdc-switch__ripple::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:hover:not(:focus) .mdc-switch__ripple::after,.mdc-switch--unselected:enabled:hover:not(:focus) .mdc-switch__ripple::after{background:var(--mat-slide-toggle-unselected-hover-state-layer-color, var(--mat-sys-on-surface));opacity:var(--mat-slide-toggle-unselected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity))}.mdc-switch--unselected:enabled:focus .mdc-switch__ripple::after{background:var(--mat-slide-toggle-unselected-focus-state-layer-color, var(--mat-sys-on-surface));opacity:var(--mat-slide-toggle-unselected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity))}.mdc-switch--unselected:enabled:active .mdc-switch__ripple::after{background:var(--mat-slide-toggle-unselected-pressed-state-layer-color, var(--mat-sys-on-surface));opacity:var(--mat-slide-toggle-unselected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));transition:opacity 75ms linear}.mdc-switch--selected:enabled:hover:not(:focus) .mdc-switch__ripple::after{background:var(--mat-slide-toggle-selected-hover-state-layer-color, var(--mat-sys-primary));opacity:var(--mat-slide-toggle-selected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity))}.mdc-switch--selected:enabled:focus .mdc-switch__ripple::after{background:var(--mat-slide-toggle-selected-focus-state-layer-color, var(--mat-sys-primary));opacity:var(--mat-slide-toggle-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity))}.mdc-switch--selected:enabled:active .mdc-switch__ripple::after{background:var(--mat-slide-toggle-selected-pressed-state-layer-color, var(--mat-sys-primary));opacity:var(--mat-slide-toggle-selected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));transition:opacity 75ms linear}.mdc-switch__icons{position:relative;height:100%;width:100%;z-index:1;transform:translateZ(0)}.mdc-switch--disabled.mdc-switch--unselected .mdc-switch__icons{opacity:var(--mat-slide-toggle-disabled-unselected-icon-opacity, 0.38)}.mdc-switch--disabled.mdc-switch--selected .mdc-switch__icons{opacity:var(--mat-slide-toggle-disabled-selected-icon-opacity, 0.38)}.mdc-switch__icon{bottom:0;left:0;margin:auto;position:absolute;right:0;top:0;opacity:0;transition:opacity 30ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-switch--unselected .mdc-switch__icon{width:var(--mat-slide-toggle-unselected-icon-size, 16px);height:var(--mat-slide-toggle-unselected-icon-size, 16px);fill:var(--mat-slide-toggle-unselected-icon-color, var(--mat-sys-surface-variant))}.mdc-switch--unselected.mdc-switch--disabled .mdc-switch__icon{fill:var(--mat-slide-toggle-disabled-unselected-icon-color, var(--mat-sys-surface-variant))}.mdc-switch--selected .mdc-switch__icon{width:var(--mat-slide-toggle-selected-icon-size, 16px);height:var(--mat-slide-toggle-selected-icon-size, 16px);fill:var(--mat-slide-toggle-selected-icon-color, var(--mat-sys-on-primary-container))}.mdc-switch--selected.mdc-switch--disabled .mdc-switch__icon{fill:var(--mat-slide-toggle-disabled-selected-icon-color, var(--mat-sys-on-surface))}.mdc-switch--selected .mdc-switch__icon--on,.mdc-switch--unselected .mdc-switch__icon--off{opacity:1;transition:opacity 45ms 30ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-slide-toggle{-webkit-user-select:none;user-select:none;display:inline-block;-webkit-tap-highlight-color:rgba(0,0,0,0);outline:0}.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple,.mat-mdc-slide-toggle .mdc-switch__ripple::after{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:50%;pointer-events:none}.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple:not(:empty),.mat-mdc-slide-toggle .mdc-switch__ripple::after:not(:empty){transform:translateZ(0)}.mat-mdc-slide-toggle.mat-mdc-slide-toggle-focused .mat-focus-indicator::before{content:""}.mat-mdc-slide-toggle .mat-internal-form-field{color:var(--mat-slide-toggle-label-text-color, var(--mat-sys-on-surface));font-family:var(--mat-slide-toggle-label-text-font, var(--mat-sys-body-medium-font));line-height:var(--mat-slide-toggle-label-text-line-height, var(--mat-sys-body-medium-line-height));font-size:var(--mat-slide-toggle-label-text-size, var(--mat-sys-body-medium-size));letter-spacing:var(--mat-slide-toggle-label-text-tracking, var(--mat-sys-body-medium-tracking));font-weight:var(--mat-slide-toggle-label-text-weight, var(--mat-sys-body-medium-weight))}.mat-mdc-slide-toggle .mat-ripple-element{opacity:.12}.mat-mdc-slide-toggle .mat-focus-indicator::before{border-radius:50%}.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle-track,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__icon,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::before,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::after,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::before,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::after{transition:none}.mat-mdc-slide-toggle .mdc-switch:enabled+.mdc-label{cursor:pointer}.mat-mdc-slide-toggle .mdc-switch--disabled+label{color:var(--mat-slide-toggle-disabled-label-text-color, var(--mat-sys-on-surface))}.mat-mdc-slide-toggle-touch-target{position:absolute;top:50%;left:50%;height:var(--mat-slide-toggle-touch-target-size, 48px);width:100%;transform:translate(-50%, -50%);display:var(--mat-slide-toggle-touch-target-display, block)}[dir=rtl] .mat-mdc-slide-toggle-touch-target{left:auto;right:50%;transform:translate(50%, -50%)}\n']
    }]
  }], () => [], {
    _switchElement: [{
      type: ViewChild,
      args: ["switch"]
    }],
    name: [{
      type: Input
    }],
    id: [{
      type: Input
    }],
    labelPosition: [{
      type: Input
    }],
    ariaLabel: [{
      type: Input,
      args: ["aria-label"]
    }],
    ariaLabelledby: [{
      type: Input,
      args: ["aria-labelledby"]
    }],
    ariaDescribedby: [{
      type: Input,
      args: ["aria-describedby"]
    }],
    required: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    color: [{
      type: Input
    }],
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    disableRipple: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    tabIndex: [{
      type: Input,
      args: [{
        transform: (value) => value == null ? 0 : numberAttribute(value)
      }]
    }],
    checked: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    hideIcon: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    disabledInteractive: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    change: [{
      type: Output
    }],
    toggleChange: [{
      type: Output
    }]
  });
})();
var MatSlideToggleModule = class _MatSlideToggleModule {
  static \u0275fac = function MatSlideToggleModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatSlideToggleModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _MatSlideToggleModule,
    imports: [MatSlideToggle],
    exports: [MatSlideToggle, BidiModule]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [MatSlideToggle, BidiModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatSlideToggleModule, [{
    type: NgModule,
    args: [{
      imports: [MatSlideToggle],
      exports: [MatSlideToggle, BidiModule]
    }]
  }], null, null);
})();

// src/app/dialogs/SoldierSelect-dialog.component.ts
function SoldierSelectDialogComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 11);
    \u0275\u0275listener("click", function SoldierSelectDialogComponent_Conditional_12_Template_button_click_0_listener() {
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
function SoldierSelectDialogComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "mat-icon", 12);
    \u0275\u0275text(2, "refresh");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F...");
    \u0275\u0275elementEnd()();
  }
}
function SoldierSelectDialogComponent_Conditional_19_th_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 24);
    \u0275\u0275text(1, "\u0417\u0432\u0430\u043D\u043D\u044F");
    \u0275\u0275elementEnd();
  }
}
function SoldierSelectDialogComponent_Conditional_19_td_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r3.rankShortValue);
  }
}
function SoldierSelectDialogComponent_Conditional_19_th_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 24);
    \u0275\u0275text(1, "\u041F\u0406\u0411");
    \u0275\u0275elementEnd();
  }
}
function SoldierSelectDialogComponent_Conditional_19_td_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.formatFIO(item_r4));
  }
}
function SoldierSelectDialogComponent_Conditional_19_th_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 24);
    \u0275\u0275text(1, "\u041F\u043E\u0437\u0438\u0432\u043D\u0438\u0439");
    \u0275\u0275elementEnd();
  }
}
function SoldierSelectDialogComponent_Conditional_19_td_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r5.nickName);
  }
}
function SoldierSelectDialogComponent_Conditional_19_th_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 24);
    \u0275\u0275text(1, "\u041F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B");
    \u0275\u0275elementEnd();
  }
}
function SoldierSelectDialogComponent_Conditional_19_td_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r6.unitShortName);
  }
}
function SoldierSelectDialogComponent_Conditional_19_th_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 24);
    \u0275\u0275text(1, "\u041F\u043E\u0441\u0430\u0434\u0430");
    \u0275\u0275elementEnd();
  }
}
function SoldierSelectDialogComponent_Conditional_19_td_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r7 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r7.positionValue);
  }
}
function SoldierSelectDialogComponent_Conditional_19_tr_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 26);
  }
}
function SoldierSelectDialogComponent_Conditional_19_tr_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 27);
    \u0275\u0275listener("click", function SoldierSelectDialogComponent_Conditional_19_tr_17_Template_tr_click_0_listener() {
      const row_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.selectSoldier(row_r9));
    });
    \u0275\u0275elementEnd();
  }
}
function SoldierSelectDialogComponent_Conditional_19_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23)(1, "mat-icon");
    \u0275\u0275text(2, "people_outline");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u0412\u0456\u0439\u0441\u044C\u043A\u043E\u0432\u043E\u0441\u043B\u0443\u0436\u0431\u043E\u0432\u0446\u0456\u0432 \u043D\u0435 \u0437\u043D\u0430\u0439\u0434\u0435\u043D\u043E");
    \u0275\u0275elementEnd()();
  }
}
function SoldierSelectDialogComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 13);
    \u0275\u0275elementContainerStart(1, 14);
    \u0275\u0275template(2, SoldierSelectDialogComponent_Conditional_19_th_2_Template, 2, 0, "th", 15)(3, SoldierSelectDialogComponent_Conditional_19_td_3_Template, 2, 1, "td", 16);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(4, 17);
    \u0275\u0275template(5, SoldierSelectDialogComponent_Conditional_19_th_5_Template, 2, 0, "th", 15)(6, SoldierSelectDialogComponent_Conditional_19_td_6_Template, 2, 1, "td", 16);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(7, 18);
    \u0275\u0275template(8, SoldierSelectDialogComponent_Conditional_19_th_8_Template, 2, 0, "th", 15)(9, SoldierSelectDialogComponent_Conditional_19_td_9_Template, 2, 1, "td", 16);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(10, 19);
    \u0275\u0275template(11, SoldierSelectDialogComponent_Conditional_19_th_11_Template, 2, 0, "th", 15)(12, SoldierSelectDialogComponent_Conditional_19_td_12_Template, 2, 1, "td", 16);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(13, 20);
    \u0275\u0275template(14, SoldierSelectDialogComponent_Conditional_19_th_14_Template, 2, 0, "th", 15)(15, SoldierSelectDialogComponent_Conditional_19_td_15_Template, 2, 1, "td", 16);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(16, SoldierSelectDialogComponent_Conditional_19_tr_16_Template, 1, 0, "tr", 21)(17, SoldierSelectDialogComponent_Conditional_19_tr_17_Template, 1, 0, "tr", 22);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(18, SoldierSelectDialogComponent_Conditional_19_Conditional_18_Template, 5, 0, "div", 23);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("dataSource", ctx_r1.dataSource);
    \u0275\u0275advance(16);
    \u0275\u0275property("matHeaderRowDef", ctx_r1.displayedColumns)("matHeaderRowDefSticky", true);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r1.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.items().length === 0 ? 18 : -1);
  }
}
var SoldierSelectDialogComponent = class _SoldierSelectDialogComponent {
  constructor(dialogRef, data) {
    this.dialogRef = dialogRef;
    this.data = data;
    if (data?.title) {
      this.dialogTitle.set(data.title);
    }
    this.reload();
  }
  soldierService = inject(SoldierService);
  snackBar = inject(MatSnackBar);
  items = signal([], ...ngDevMode ? [{ debugName: "items" }] : []);
  dataSource = new MatTableDataSource([]);
  displayedColumns = ["rankShortValue", "fio", "nickName", "unitShortName", "positionValue"];
  isLoading = signal(false, ...ngDevMode ? [{ debugName: "isLoading" }] : []);
  searchTerm = signal("", ...ngDevMode ? [{ debugName: "searchTerm" }] : []);
  dialogTitle = signal("\u0412\u0438\u0431\u0456\u0440 \u0432\u0456\u0439\u0441\u044C\u043A\u043E\u0432\u043E\u0441\u043B\u0443\u0436\u0431\u043E\u0432\u0446\u044F", ...ngDevMode ? [{ debugName: "dialogTitle" }] : []);
  searchTimeout;
  reload() {
    this.isLoading.set(true);
    const search = this.searchTerm() || void 0;
    const unitId = this.data?.unitId;
    this.soldierService.getAll(search, unitId).subscribe({
      next: (soldiers) => {
        this.items.set(soldiers);
        this.dataSource.data = soldiers;
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u0432\u0456\u0439\u0441\u044C\u043A\u043E\u0432\u043E\u0441\u043B\u0443\u0436\u0431\u043E\u0432\u0446\u0456\u0432:", error);
        const errorMessage = S5App_ErrorHandler.handleHttpError(error, "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u0432\u0456\u0439\u0441\u044C\u043A\u043E\u0432\u043E\u0441\u043B\u0443\u0436\u0431\u043E\u0432\u0446\u0456\u0432");
        this.snackBar.open(errorMessage, "\u0417\u0430\u043A\u0440\u0438\u0442\u0438", { duration: 5e3 });
        this.isLoading.set(false);
      }
    });
  }
  onSearchChange() {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    this.searchTimeout = setTimeout(() => {
      this.reload();
    }, 500);
  }
  clearSearch() {
    this.searchTerm.set("");
    this.reload();
  }
  selectSoldier(soldier) {
    this.dialogRef.close(soldier);
  }
  onCancel() {
    this.dialogRef.close();
  }
  formatFIO(item) {
    return SoldierUtils.formatFIO(item.firstName, item.midleName, item.lastName);
  }
  static \u0275fac = function SoldierSelectDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SoldierSelectDialogComponent)(\u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SoldierSelectDialogComponent, selectors: [["soldier-select-dialog"]], decls: 23, vars: 5, consts: [["mat-dialog-title", ""], [1, "dialog-content"], [1, "action-panel"], ["appearance", "outline", 1, "search-field"], ["matInput", "", "placeholder", "\u041F\u0440\u0456\u0437\u0432\u0438\u0449\u0435, \u0456\u043C'\u044F \u0430\u0431\u043E \u043F\u043E\u0437\u0438\u0432\u043D\u0438\u0439", 3, "ngModelChange", "ngModel"], ["mat-icon-button", "", "matSuffix", ""], ["mat-raised-button", "", "color", "primary", 3, "click"], [1, "table-container"], [1, "loading-container"], ["align", "end"], ["mat-button", "", 3, "click"], ["mat-icon-button", "", "matSuffix", "", 3, "click"], [1, "loading-spinner"], ["mat-table", "", "matSort", "", 1, "selection-table", 3, "dataSource"], ["matColumnDef", "rankShortValue"], ["mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "fio"], ["matColumnDef", "nickName"], ["matColumnDef", "unitShortName"], ["matColumnDef", "positionValue"], ["mat-header-row", "", 4, "matHeaderRowDef", "matHeaderRowDefSticky"], ["mat-row", "", "class", "selectable-row", 3, "click", 4, "matRowDef", "matRowDefColumns"], [1, "no-data"], ["mat-header-cell", "", "mat-sort-header", ""], ["mat-cell", ""], ["mat-header-row", ""], ["mat-row", "", 1, "selectable-row", 3, "click"]], template: function SoldierSelectDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "h2", 0);
      \u0275\u0275text(1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(2, "mat-dialog-content")(3, "div", 1)(4, "div", 2)(5, "mat-form-field", 3)(6, "mat-label");
      \u0275\u0275text(7, "\u041F\u043E\u0448\u0443\u043A");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "input", 4);
      \u0275\u0275twoWayListener("ngModelChange", function SoldierSelectDialogComponent_Template_input_ngModelChange_8_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event);
        return $event;
      });
      \u0275\u0275listener("ngModelChange", function SoldierSelectDialogComponent_Template_input_ngModelChange_8_listener() {
        return ctx.onSearchChange();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "button", 5)(10, "mat-icon");
      \u0275\u0275text(11, "search");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(12, SoldierSelectDialogComponent_Conditional_12_Template, 3, 1, "button", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "button", 6);
      \u0275\u0275listener("click", function SoldierSelectDialogComponent_Template_button_click_13_listener() {
        return ctx.reload();
      });
      \u0275\u0275elementStart(14, "mat-icon");
      \u0275\u0275text(15, "refresh");
      \u0275\u0275elementEnd();
      \u0275\u0275text(16, " \u041E\u043D\u043E\u0432\u0438\u0442\u0438 ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "div", 7);
      \u0275\u0275conditionalCreate(18, SoldierSelectDialogComponent_Conditional_18_Template, 5, 0, "div", 8)(19, SoldierSelectDialogComponent_Conditional_19_Template, 19, 5);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(20, "mat-dialog-actions", 9)(21, "button", 10);
      \u0275\u0275listener("click", function SoldierSelectDialogComponent_Template_button_click_21_listener() {
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
  ], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n.dialog-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 70vh;\n  max-height: 70vh;\n  min-height: 400px;\n}\n.action-panel[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n  margin-bottom: 16px;\n  padding: 8px;\n  background-color: #fafafa;\n  border-radius: 4px;\n}\n.search-field[_ngcontent-%COMP%] {\n  flex: 1;\n  max-width: 400px;\n}\n.table-container[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow: auto;\n  border: 1px solid #e0e0e0;\n  border-radius: 4px;\n}\n.selection-table[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.selectable-row[_ngcontent-%COMP%] {\n  cursor: pointer;\n  transition: background-color 0.2s;\n}\n.selectable-row[_ngcontent-%COMP%]:hover {\n  background-color: #f5f5f5;\n}\n.loading-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 40px;\n  gap: 16px;\n}\n.loading-container[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%] {\n  font-size: 48px;\n  width: 48px;\n  height: 48px;\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n  color: #1976d2;\n}\n.loading-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #666;\n}\n.no-data[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 40px;\n  color: #666;\n}\n.no-data[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  width: 48px;\n  height: 48px;\n  color: #ccc;\n  margin-bottom: 16px;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SoldierSelectDialogComponent, [{
    type: Component,
    args: [{ selector: "soldier-select-dialog", standalone: true, imports: [
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
              placeholder="\u041F\u0440\u0456\u0437\u0432\u0438\u0449\u0435, \u0456\u043C'\u044F \u0430\u0431\u043E \u043F\u043E\u0437\u0438\u0432\u043D\u0438\u0439"
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
              <ng-container matColumnDef="rankShortValue">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>\u0417\u0432\u0430\u043D\u043D\u044F</th>
                <td mat-cell *matCellDef="let item">{{ item.rankShortValue }}</td>
              </ng-container>

              <ng-container matColumnDef="fio">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>\u041F\u0406\u0411</th>
                <td mat-cell *matCellDef="let item">{{ formatFIO(item) }}</td>
              </ng-container>

              <ng-container matColumnDef="nickName">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>\u041F\u043E\u0437\u0438\u0432\u043D\u0438\u0439</th>
                <td mat-cell *matCellDef="let item">{{ item.nickName }}</td>
              </ng-container>

              <ng-container matColumnDef="unitShortName">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>\u041F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B</th>
                <td mat-cell *matCellDef="let item">{{ item.unitShortName }}</td>
              </ng-container>

              <ng-container matColumnDef="positionValue">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>\u041F\u043E\u0441\u0430\u0434\u0430</th>
                <td mat-cell *matCellDef="let item">{{ item.positionValue }}</td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns; sticky: true"></tr>
              <tr
                mat-row
                *matRowDef="let row; columns: displayedColumns"
                (click)="selectSoldier(row)"
                class="selectable-row"
              ></tr>
            </table>

            @if (items().length === 0) {
              <div class="no-data">
                <mat-icon>people_outline</mat-icon>
                <p>\u0412\u0456\u0439\u0441\u044C\u043A\u043E\u0432\u043E\u0441\u043B\u0443\u0436\u0431\u043E\u0432\u0446\u0456\u0432 \u043D\u0435 \u0437\u043D\u0430\u0439\u0434\u0435\u043D\u043E</p>
              </div>
            }
          }
        </div>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">\u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438</button>
    </mat-dialog-actions>
  `, styles: ["/* angular:styles/component:css;f5713d9374928af95e30e916d51c66949655b97fe628cd28149f0037bdebb20b;/home/havrok/projects/work/411/s5/s5app/Menu/S5Server/Front/src/app/dialogs/SoldierSelect-dialog.component.ts */\n:host {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n.dialog-content {\n  display: flex;\n  flex-direction: column;\n  height: 70vh;\n  max-height: 70vh;\n  min-height: 400px;\n}\n.action-panel {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n  margin-bottom: 16px;\n  padding: 8px;\n  background-color: #fafafa;\n  border-radius: 4px;\n}\n.search-field {\n  flex: 1;\n  max-width: 400px;\n}\n.table-container {\n  flex: 1;\n  overflow: auto;\n  border: 1px solid #e0e0e0;\n  border-radius: 4px;\n}\n.selection-table {\n  width: 100%;\n}\n.selectable-row {\n  cursor: pointer;\n  transition: background-color 0.2s;\n}\n.selectable-row:hover {\n  background-color: #f5f5f5;\n}\n.loading-container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 40px;\n  gap: 16px;\n}\n.loading-container .loading-spinner {\n  font-size: 48px;\n  width: 48px;\n  height: 48px;\n  animation: spin 1s linear infinite;\n  color: #1976d2;\n}\n.loading-container p {\n  color: #666;\n}\n.no-data {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 40px;\n  color: #666;\n}\n.no-data mat-icon {\n  font-size: 48px;\n  width: 48px;\n  height: 48px;\n  color: #ccc;\n  margin-bottom: 16px;\n}\n@keyframes spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n"] }]
  }], () => [{ type: MatDialogRef }, { type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SoldierSelectDialogComponent, { className: "SoldierSelectDialogComponent", filePath: "app/dialogs/SoldierSelect-dialog.component.ts", lineNumber: 232 });
})();

// src/Login/dialogs/CreateUserDialog.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function CreateUserDialogComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 6);
  }
}
function CreateUserDialogComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 7);
    \u0275\u0275text(1, "error");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("matTooltip", ctx_r0.userNameError);
  }
}
function CreateUserDialogComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 8);
    \u0275\u0275text(1, "check_circle");
    \u0275\u0275elementEnd();
  }
}
function CreateUserDialogComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.userNameError);
  }
}
function CreateUserDialogComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 6);
  }
}
function CreateUserDialogComponent_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 7);
    \u0275\u0275text(1, "error");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("matTooltip", ctx_r0.passwordErrors.join("\n"));
  }
}
function CreateUserDialogComponent_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 11);
    \u0275\u0275text(1, "check_circle");
    \u0275\u0275elementEnd();
  }
}
function CreateUserDialogComponent_Conditional_29_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const err_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(err_r2);
  }
}
function CreateUserDialogComponent_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275repeaterCreate(1, CreateUserDialogComponent_Conditional_29_For_2_Template, 2, 1, "p", 14, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.passwordErrors);
  }
}
function CreateUserDialogComponent_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.passwordHints);
  }
}
function CreateUserDialogComponent_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 14);
    \u0275\u0275text(1, "\u041F\u0430\u0440\u043E\u043B\u0456 \u043D\u0435 \u0437\u0431\u0456\u0433\u0430\u044E\u0442\u044C\u0441\u044F");
    \u0275\u0275elementEnd();
  }
}
function CreateUserDialogComponent_For_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const role_r3 = ctx.$implicit;
    \u0275\u0275property("value", role_r3.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(role_r3.value);
  }
}
var CreateUserDialogComponent = class _CreateUserDialogComponent {
  dialogRef = inject(MatDialogRef);
  dialog = inject(MatDialog);
  usersService = inject(UsersService);
  data = inject(MAT_DIALOG_DATA);
  model = {
    soldierId: "",
    userName: "",
    password: ""
  };
  selectedSoldier = null;
  selectedRole = "";
  confirmPassword = "";
  // Validation state
  checkingUserName = false;
  userNameAvailable = false;
  userNameError = "";
  checkingPassword = false;
  passwordValid = false;
  passwordErrors = [];
  passwordHints = "";
  userNameSubject = new Subject();
  passwordSubject = new Subject();
  destroy$ = new Subject();
  ngOnInit() {
    this.usersService.getPasswordRequirements().subscribe((req) => {
      this.passwordHints = this.buildRequirementsHint(req);
    });
    this.userNameSubject.pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.destroy$)).subscribe((value) => {
      if (!value || value.length < 3) {
        this.checkingUserName = false;
        this.userNameAvailable = false;
        this.userNameError = value ? "\u041C\u0456\u043D\u0456\u043C\u0443\u043C 3 \u0441\u0438\u043C\u0432\u043E\u043B\u0438" : "";
        return;
      }
      this.checkingUserName = true;
      this.usersService.checkUsername(value).subscribe({
        next: (res) => {
          this.checkingUserName = false;
          this.userNameAvailable = res.isAvailable;
          this.userNameError = res.isAvailable ? "" : res.message;
        },
        error: () => {
          this.checkingUserName = false;
          this.userNameError = "";
        }
      });
    });
    this.passwordSubject.pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.destroy$)).subscribe((value) => {
      if (!value) {
        this.checkingPassword = false;
        this.passwordValid = false;
        this.passwordErrors = [];
        return;
      }
      this.checkingPassword = true;
      this.usersService.validatePassword(value, this.model.userName).subscribe({
        next: (res) => {
          this.checkingPassword = false;
          this.passwordValid = res.isValid;
          this.passwordErrors = res.errors ?? [];
        },
        error: () => {
          this.checkingPassword = false;
          this.passwordErrors = [];
        }
      });
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onUserNameChange(value) {
    this.userNameAvailable = false;
    this.userNameError = "";
    this.userNameSubject.next(value);
  }
  onPasswordChange(value) {
    this.passwordValid = false;
    this.passwordErrors = [];
    this.passwordSubject.next(value);
  }
  get soldierDisplay() {
    if (!this.selectedSoldier) {
      return "";
    }
    const s = this.selectedSoldier;
    const rank = s.rankShortValue ? s.rankShortValue + " " : "";
    return `${rank}${this.formatFIO(s)} (${s.unitShortName})`;
  }
  openSoldierSelect() {
    const dialogRef = this.dialog.open(SoldierSelectDialogComponent, {
      width: "900px",
      maxHeight: "90vh"
    });
    dialogRef.afterClosed().subscribe((soldier) => {
      if (soldier) {
        this.selectedSoldier = soldier;
        this.model.soldierId = soldier.id;
        if (!this.model.userName && soldier.nickName) {
          this.model.userName = soldier.nickName;
          this.onUserNameChange(soldier.nickName);
        }
      }
    });
  }
  get passwordMismatch() {
    return !!this.confirmPassword && this.model.password !== this.confirmPassword;
  }
  get canSave() {
    return !!this.model.soldierId && !!this.model.userName && this.userNameAvailable && !!this.model.password && this.passwordValid && this.model.password === this.confirmPassword;
  }
  save() {
    if (this.canSave) {
      if (this.selectedRole) {
        this.model.roles = [this.selectedRole];
      }
      this.dialogRef.close(this.model);
    }
  }
  buildRequirementsHint(req) {
    const parts = [];
    if (req.requiredLength > 0) {
      parts.push(`\u043C\u0456\u043D. ${req.requiredLength} \u0441\u0438\u043C\u0432\u043E\u043B\u0456\u0432`);
    }
    if (req.requireDigit) {
      parts.push("\u0446\u0438\u0444\u0440\u0430");
    }
    if (req.requireLowercase) {
      parts.push("\u043C\u0430\u043B\u0435\u043D\u044C\u043A\u0430 \u043B\u0456\u0442\u0435\u0440\u0430");
    }
    if (req.requireUppercase) {
      parts.push("\u0432\u0435\u043B\u0438\u043A\u0430 \u043B\u0456\u0442\u0435\u0440\u0430");
    }
    if (req.requireNonAlphanumeric) {
      parts.push("\u0441\u043F\u0435\u0446\u0441\u0438\u043C\u0432\u043E\u043B");
    }
    return parts.length ? "\u0412\u0438\u043C\u043E\u0433\u0438: " + parts.join(", ") : "";
  }
  formatFIO(item) {
    return SoldierUtils.formatFIO(item.firstName, item.midleName, item.lastName);
  }
  static \u0275fac = function CreateUserDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CreateUserDialogComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CreateUserDialogComponent, selectors: [["app-create-user-dialog"]], decls: 47, vars: 13, consts: [["mat-dialog-title", ""], [1, "dialog-content"], ["appearance", "outline", 1, "full-width"], ["matInput", "", "readonly", "", "required", "", 3, "value"], ["mat-icon-button", "", "matSuffix", "", "color", "primary", "matTooltip", "\u0412\u0438\u0431\u0440\u0430\u0442\u0438", 3, "click"], ["matInput", "", "required", "", 3, "ngModelChange", "ngModel"], ["matSuffix", "", "diameter", "18"], ["matSuffix", "", "color", "warn", 3, "matTooltip"], ["matSuffix", "", "matTooltip", "\u041B\u043E\u0433\u0456\u043D \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0438\u0439", 1, "icon-success"], ["matInput", "", "type", "email", 3, "ngModelChange", "ngModel"], ["matInput", "", "type", "password", "required", "", 3, "ngModelChange", "ngModel"], ["matSuffix", "", "matTooltip", "\u041F\u0430\u0440\u043E\u043B\u044C \u0432\u0456\u0434\u043F\u043E\u0432\u0456\u0434\u0430\u0454 \u0432\u0438\u043C\u043E\u0433\u0430\u043C", 1, "icon-success"], [1, "validation-errors"], [1, "hint-text"], [1, "error-text"], [3, "ngModelChange", "ngModel"], [3, "value"], ["align", "end"], ["mat-button", "", "mat-dialog-close", ""], ["mat-flat-button", "", "color", "primary", 3, "click", "disabled"]], template: function CreateUserDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "h2", 0);
      \u0275\u0275text(1, "\u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438 \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0430");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(2, "mat-dialog-content", 1)(3, "mat-form-field", 2)(4, "mat-label");
      \u0275\u0275text(5, "\u0412\u0456\u0439\u0441\u044C\u043A\u043E\u0432\u043E\u0441\u043B\u0443\u0436\u0431\u043E\u0432\u0435\u0446\u044C");
      \u0275\u0275elementEnd();
      \u0275\u0275element(6, "input", 3);
      \u0275\u0275elementStart(7, "button", 4);
      \u0275\u0275listener("click", function CreateUserDialogComponent_Template_button_click_7_listener() {
        return ctx.openSoldierSelect();
      });
      \u0275\u0275elementStart(8, "mat-icon");
      \u0275\u0275text(9, "person_search");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(10, "mat-form-field", 2)(11, "mat-label");
      \u0275\u0275text(12, "\u041B\u043E\u0433\u0456\u043D");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "input", 5);
      \u0275\u0275twoWayListener("ngModelChange", function CreateUserDialogComponent_Template_input_ngModelChange_13_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.model.userName, $event) || (ctx.model.userName = $event);
        return $event;
      });
      \u0275\u0275listener("ngModelChange", function CreateUserDialogComponent_Template_input_ngModelChange_13_listener($event) {
        return ctx.onUserNameChange($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(14, CreateUserDialogComponent_Conditional_14_Template, 1, 0, "mat-spinner", 6)(15, CreateUserDialogComponent_Conditional_15_Template, 2, 1, "mat-icon", 7)(16, CreateUserDialogComponent_Conditional_16_Template, 2, 0, "mat-icon", 8);
      \u0275\u0275conditionalCreate(17, CreateUserDialogComponent_Conditional_17_Template, 2, 1, "mat-error");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "mat-form-field", 2)(19, "mat-label");
      \u0275\u0275text(20, "Email");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "input", 9);
      \u0275\u0275twoWayListener("ngModelChange", function CreateUserDialogComponent_Template_input_ngModelChange_21_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.model.email, $event) || (ctx.model.email = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(22, "mat-form-field", 2)(23, "mat-label");
      \u0275\u0275text(24, "\u041F\u0430\u0440\u043E\u043B\u044C");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "input", 10);
      \u0275\u0275twoWayListener("ngModelChange", function CreateUserDialogComponent_Template_input_ngModelChange_25_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.model.password, $event) || (ctx.model.password = $event);
        return $event;
      });
      \u0275\u0275listener("ngModelChange", function CreateUserDialogComponent_Template_input_ngModelChange_25_listener($event) {
        return ctx.onPasswordChange($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(26, CreateUserDialogComponent_Conditional_26_Template, 1, 0, "mat-spinner", 6)(27, CreateUserDialogComponent_Conditional_27_Template, 2, 1, "mat-icon", 7)(28, CreateUserDialogComponent_Conditional_28_Template, 2, 0, "mat-icon", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(29, CreateUserDialogComponent_Conditional_29_Template, 3, 0, "div", 12);
      \u0275\u0275conditionalCreate(30, CreateUserDialogComponent_Conditional_30_Template, 2, 1, "p", 13);
      \u0275\u0275elementStart(31, "mat-form-field", 2)(32, "mat-label");
      \u0275\u0275text(33, "\u041F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0436\u0435\u043D\u043D\u044F \u043F\u0430\u0440\u043E\u043B\u044F");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "input", 10);
      \u0275\u0275twoWayListener("ngModelChange", function CreateUserDialogComponent_Template_input_ngModelChange_34_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.confirmPassword, $event) || (ctx.confirmPassword = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(35, CreateUserDialogComponent_Conditional_35_Template, 2, 0, "p", 14);
      \u0275\u0275elementStart(36, "mat-form-field", 2)(37, "mat-label");
      \u0275\u0275text(38, "\u0420\u043E\u043B\u044C");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "mat-select", 15);
      \u0275\u0275twoWayListener("ngModelChange", function CreateUserDialogComponent_Template_mat_select_ngModelChange_39_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.selectedRole, $event) || (ctx.selectedRole = $event);
        return $event;
      });
      \u0275\u0275repeaterCreate(40, CreateUserDialogComponent_For_41_Template, 2, 2, "mat-option", 16, _forTrack0);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(42, "mat-dialog-actions", 17)(43, "button", 18);
      \u0275\u0275text(44, "\u0421\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(45, "button", 19);
      \u0275\u0275listener("click", function CreateUserDialogComponent_Template_button_click_45_listener() {
        return ctx.save();
      });
      \u0275\u0275text(46, " \u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438 ");
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275property("value", ctx.soldierDisplay);
      \u0275\u0275advance(7);
      \u0275\u0275twoWayProperty("ngModel", ctx.model.userName);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.checkingUserName ? 14 : ctx.userNameError ? 15 : ctx.model.userName && ctx.userNameAvailable ? 16 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.userNameError ? 17 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.model.email);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.model.password);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.checkingPassword ? 26 : ctx.passwordErrors.length ? 27 : ctx.model.password && ctx.passwordValid ? 28 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.passwordErrors.length ? 29 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.passwordHints ? 30 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.confirmPassword);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.passwordMismatch ? 35 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.selectedRole);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.data.roles);
      \u0275\u0275advance(5);
      \u0275\u0275property("disabled", !ctx.canSave);
    }
  }, dependencies: [
    CommonModule,
    FormsModule,
    DefaultValueAccessor,
    NgControlStatus,
    RequiredValidator,
    NgModel,
    MatDialogModule,
    MatDialogClose,
    MatDialogTitle,
    MatDialogActions,
    MatDialogContent,
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatError,
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
    MatIcon,
    MatProgressSpinnerModule,
    MatProgressSpinner,
    MatTooltipModule,
    MatTooltip
  ], styles: ["\n\n.dialog-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  min-width: 320px;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.error-text[_ngcontent-%COMP%] {\n  color: var(--mat-warn-color, #f44336);\n  font-size: 12px;\n  margin: -4px 0 4px 0;\n}\n.hint-text[_ngcontent-%COMP%] {\n  color: #666;\n  font-size: 12px;\n  margin: -4px 0 8px 0;\n}\n.validation-errors[_ngcontent-%COMP%] {\n  margin: -4px 0 4px 0;\n}\n.icon-success[_ngcontent-%COMP%] {\n  color: #4caf50;\n}", "\n\n.dialog-content[_ngcontent-%COMP%] {\n  min-width: 360px;\n}"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CreateUserDialogComponent, [{
    type: Component,
    args: [{ selector: "app-create-user-dialog", imports: [
      CommonModule,
      FormsModule,
      MatDialogModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatSelectModule,
      MatIconModule,
      MatProgressSpinnerModule,
      MatTooltipModule
    ], template: `
    <h2 mat-dialog-title>\u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438 \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0430</h2>
    <mat-dialog-content class="dialog-content">
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>\u0412\u0456\u0439\u0441\u044C\u043A\u043E\u0432\u043E\u0441\u043B\u0443\u0436\u0431\u043E\u0432\u0435\u0446\u044C</mat-label>
        <input matInput [value]="soldierDisplay" readonly required />
        <button
          mat-icon-button
          matSuffix
          color="primary"
          (click)="openSoldierSelect()"
          matTooltip="\u0412\u0438\u0431\u0440\u0430\u0442\u0438"
        >
          <mat-icon>person_search</mat-icon>
        </button>
      </mat-form-field>

      <!-- \u041B\u043E\u0433\u0456\u043D \u0437 \u043F\u0435\u0440\u0435\u0432\u0456\u0440\u043A\u043E\u044E \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u043E\u0441\u0442\u0456 -->
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>\u041B\u043E\u0433\u0456\u043D</mat-label>
        <input
          matInput
          [(ngModel)]="model.userName"
          required
          (ngModelChange)="onUserNameChange($event)"
        />
        @if (checkingUserName) {
          <mat-spinner matSuffix diameter="18"></mat-spinner>
        } @else if (userNameError) {
          <mat-icon matSuffix color="warn" [matTooltip]="userNameError">error</mat-icon>
        } @else if (model.userName && userNameAvailable) {
          <mat-icon matSuffix class="icon-success" matTooltip="\u041B\u043E\u0433\u0456\u043D \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0438\u0439"
            >check_circle</mat-icon
          >
        }
        @if (userNameError) {
          <mat-error>{{ userNameError }}</mat-error>
        }
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Email</mat-label>
        <input matInput type="email" [(ngModel)]="model.email" />
      </mat-form-field>

      <!-- \u041F\u0430\u0440\u043E\u043B\u044C \u0437 \u043F\u0435\u0440\u0435\u0432\u0456\u0440\u043A\u043E\u044E \u0432\u0438\u043C\u043E\u0433 -->
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>\u041F\u0430\u0440\u043E\u043B\u044C</mat-label>
        <input
          matInput
          type="password"
          [(ngModel)]="model.password"
          required
          (ngModelChange)="onPasswordChange($event)"
        />
        @if (checkingPassword) {
          <mat-spinner matSuffix diameter="18"></mat-spinner>
        } @else if (passwordErrors.length) {
          <mat-icon matSuffix color="warn" [matTooltip]="passwordErrors.join('\\n')"
            >error</mat-icon
          >
        } @else if (model.password && passwordValid) {
          <mat-icon matSuffix class="icon-success" matTooltip="\u041F\u0430\u0440\u043E\u043B\u044C \u0432\u0456\u0434\u043F\u043E\u0432\u0456\u0434\u0430\u0454 \u0432\u0438\u043C\u043E\u0433\u0430\u043C"
            >check_circle</mat-icon
          >
        }
      </mat-form-field>
      @if (passwordErrors.length) {
        <div class="validation-errors">
          @for (err of passwordErrors; track err) {
            <p class="error-text">{{ err }}</p>
          }
        </div>
      }
      @if (passwordHints) {
        <p class="hint-text">{{ passwordHints }}</p>
      }

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>\u041F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0436\u0435\u043D\u043D\u044F \u043F\u0430\u0440\u043E\u043B\u044F</mat-label>
        <input matInput type="password" [(ngModel)]="confirmPassword" required />
      </mat-form-field>

      @if (passwordMismatch) {
        <p class="error-text">\u041F\u0430\u0440\u043E\u043B\u0456 \u043D\u0435 \u0437\u0431\u0456\u0433\u0430\u044E\u0442\u044C\u0441\u044F</p>
      }

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>\u0420\u043E\u043B\u044C</mat-label>
        <mat-select [(ngModel)]="selectedRole">
          @for (role of data.roles; track role.id) {
            <mat-option [value]="role.value">{{ role.value }}</mat-option>
          }
        </mat-select>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>\u0421\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438</button>
      <button mat-flat-button color="primary" [disabled]="!canSave" (click)="save()">
        \u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438
      </button>
    </mat-dialog-actions>
  `, styles: ["/* src/Login/dialogs/dialog-shared.scss */\n.dialog-content {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  min-width: 320px;\n}\n.full-width {\n  width: 100%;\n}\n.error-text {\n  color: var(--mat-warn-color, #f44336);\n  font-size: 12px;\n  margin: -4px 0 4px 0;\n}\n.hint-text {\n  color: #666;\n  font-size: 12px;\n  margin: -4px 0 8px 0;\n}\n.validation-errors {\n  margin: -4px 0 4px 0;\n}\n.icon-success {\n  color: #4caf50;\n}\n", "/* angular:styles/component:css;d41978f454f8445fd780e3d2eaacd18435752233bf8a4f06a1a456523d42661d;/home/havrok/projects/work/411/s5/s5app/Menu/S5Server/Front/src/Login/dialogs/CreateUserDialog.component.ts */\n.dialog-content {\n  min-width: 360px;\n}\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CreateUserDialogComponent, { className: "CreateUserDialogComponent", filePath: "Login/dialogs/CreateUserDialog.component.ts", lineNumber: 155 });
})();

// src/Login/dialogs/ChangeLoginDialog.component.ts
function ChangeLoginDialogComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 4);
  }
}
function ChangeLoginDialogComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 5);
    \u0275\u0275text(1, "error");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("matTooltip", ctx_r0.userNameError);
  }
}
function ChangeLoginDialogComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 6);
    \u0275\u0275text(1, "check_circle");
    \u0275\u0275elementEnd();
  }
}
function ChangeLoginDialogComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.userNameError);
  }
}
function ChangeLoginDialogComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-form-field", 2)(1, "mat-label");
    \u0275\u0275text(2, "\u041F\u0430\u0440\u043E\u043B\u044C \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0430");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 10);
    \u0275\u0275twoWayListener("ngModelChange", function ChangeLoginDialogComponent_Conditional_15_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.model.currentPassword, $event) || (ctx_r0.model.currentPassword = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "mat-hint");
    \u0275\u0275text(5, "\u0414\u043B\u044F \u043F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0436\u0435\u043D\u043D\u044F \u0437\u043C\u0456\u043D\u0438 \u043B\u043E\u0433\u0456\u043D\u0443");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.model.currentPassword);
  }
}
var ChangeLoginDialogComponent = class _ChangeLoginDialogComponent {
  dialogRef = inject(MatDialogRef);
  usersService = inject(UsersService);
  data = inject(MAT_DIALOG_DATA);
  model = { currentPassword: "", newUserName: "" };
  // Validation state
  checkingUserName = false;
  userNameAvailable = false;
  userNameError = "";
  userNameSubject = new Subject();
  destroy$ = new Subject();
  ngOnInit() {
    this.userNameSubject.pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.destroy$)).subscribe((value) => {
      if (!value || value.length < 3) {
        this.checkingUserName = false;
        this.userNameAvailable = false;
        this.userNameError = value ? "\u041C\u0456\u043D\u0456\u043C\u0443\u043C 3 \u0441\u0438\u043C\u0432\u043E\u043B\u0438" : "";
        return;
      }
      if (value === this.data.userName) {
        this.checkingUserName = false;
        this.userNameAvailable = false;
        this.userNameError = "\u041D\u043E\u0432\u0438\u0439 \u043B\u043E\u0433\u0456\u043D \u0441\u043F\u0456\u0432\u043F\u0430\u0434\u0430\u0454 \u0437 \u043F\u043E\u0442\u043E\u0447\u043D\u0438\u043C";
        return;
      }
      this.checkingUserName = true;
      this.usersService.checkUsername(value, this.data.userId).subscribe({
        next: (res) => {
          this.checkingUserName = false;
          this.userNameAvailable = res.isAvailable;
          this.userNameError = res.isAvailable ? "" : res.message;
        },
        error: () => {
          this.checkingUserName = false;
          this.userNameError = "";
        }
      });
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onUserNameChange(value) {
    this.userNameAvailable = false;
    this.userNameError = "";
    this.userNameSubject.next(value);
  }
  get canSave() {
    const passwordOk = this.data.adminChange || !!this.model.currentPassword;
    return !!this.model.newUserName && this.userNameAvailable && passwordOk;
  }
  save() {
    if (this.canSave) {
      this.dialogRef.close(this.model);
    }
  }
  static \u0275fac = function ChangeLoginDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ChangeLoginDialogComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ChangeLoginDialogComponent, selectors: [["app-change-login-dialog"]], decls: 21, vars: 6, consts: [["mat-dialog-title", ""], [1, "dialog-content"], ["appearance", "outline", 1, "full-width"], ["matInput", "", "required", "", 3, "ngModelChange", "ngModel"], ["matSuffix", "", "diameter", "18"], ["matSuffix", "", "color", "warn", 3, "matTooltip"], ["matSuffix", "", "matTooltip", "\u041B\u043E\u0433\u0456\u043D \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0438\u0439", 1, "icon-success"], ["align", "end"], ["mat-button", "", "mat-dialog-close", ""], ["mat-flat-button", "", "color", "primary", 3, "click", "disabled"], ["matInput", "", "type", "password", "required", "", 3, "ngModelChange", "ngModel"]], template: function ChangeLoginDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "h2", 0);
      \u0275\u0275text(1, "\u0417\u043C\u0456\u043D\u0438\u0442\u0438 \u043B\u043E\u0433\u0456\u043D");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(2, "mat-dialog-content", 1)(3, "p");
      \u0275\u0275text(4, "\u041A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447: ");
      \u0275\u0275elementStart(5, "strong");
      \u0275\u0275text(6);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "mat-form-field", 2)(8, "mat-label");
      \u0275\u0275text(9, "\u041D\u043E\u0432\u0438\u0439 \u043B\u043E\u0433\u0456\u043D");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "input", 3);
      \u0275\u0275twoWayListener("ngModelChange", function ChangeLoginDialogComponent_Template_input_ngModelChange_10_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.model.newUserName, $event) || (ctx.model.newUserName = $event);
        return $event;
      });
      \u0275\u0275listener("ngModelChange", function ChangeLoginDialogComponent_Template_input_ngModelChange_10_listener($event) {
        return ctx.onUserNameChange($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(11, ChangeLoginDialogComponent_Conditional_11_Template, 1, 0, "mat-spinner", 4)(12, ChangeLoginDialogComponent_Conditional_12_Template, 2, 1, "mat-icon", 5)(13, ChangeLoginDialogComponent_Conditional_13_Template, 2, 0, "mat-icon", 6);
      \u0275\u0275conditionalCreate(14, ChangeLoginDialogComponent_Conditional_14_Template, 2, 1, "mat-error");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(15, ChangeLoginDialogComponent_Conditional_15_Template, 6, 1, "mat-form-field", 2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "mat-dialog-actions", 7)(17, "button", 8);
      \u0275\u0275text(18, "\u0421\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "button", 9);
      \u0275\u0275listener("click", function ChangeLoginDialogComponent_Template_button_click_19_listener() {
        return ctx.save();
      });
      \u0275\u0275text(20, " \u0417\u043C\u0456\u043D\u0438\u0442\u0438 ");
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.data.userName);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.model.newUserName);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.checkingUserName ? 11 : ctx.userNameError ? 12 : ctx.model.newUserName && ctx.userNameAvailable ? 13 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.userNameError ? 14 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.data.adminChange ? 15 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", !ctx.canSave);
    }
  }, dependencies: [FormsModule, DefaultValueAccessor, NgControlStatus, RequiredValidator, NgModel, MatDialogModule, MatDialogClose, MatDialogTitle, MatDialogActions, MatDialogContent, MatFormFieldModule, MatFormField, MatLabel, MatHint, MatError, MatSuffix, MatInputModule, MatInput, MatButtonModule, MatButton, MatIconModule, MatIcon, MatProgressSpinnerModule, MatProgressSpinner, MatTooltipModule, MatTooltip], styles: ["\n\n.dialog-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  min-width: 320px;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.error-text[_ngcontent-%COMP%] {\n  color: var(--mat-warn-color, #f44336);\n  font-size: 12px;\n  margin: -4px 0 4px 0;\n}\n.hint-text[_ngcontent-%COMP%] {\n  color: #666;\n  font-size: 12px;\n  margin: -4px 0 8px 0;\n}\n.validation-errors[_ngcontent-%COMP%] {\n  margin: -4px 0 4px 0;\n}\n.icon-success[_ngcontent-%COMP%] {\n  color: #4caf50;\n}"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChangeLoginDialogComponent, [{
    type: Component,
    args: [{ selector: "app-change-login-dialog", imports: [
      FormsModule,
      MatDialogModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatIconModule,
      MatProgressSpinnerModule,
      MatTooltipModule
    ], template: `
    <h2 mat-dialog-title>\u0417\u043C\u0456\u043D\u0438\u0442\u0438 \u043B\u043E\u0433\u0456\u043D</h2>
    <mat-dialog-content class="dialog-content">
      <p>\u041A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447: <strong>{{ data.userName }}</strong></p>

      <!-- \u041D\u043E\u0432\u0438\u0439 \u043B\u043E\u0433\u0456\u043D \u0437 \u043F\u0435\u0440\u0435\u0432\u0456\u0440\u043A\u043E\u044E \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u043E\u0441\u0442\u0456 -->
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>\u041D\u043E\u0432\u0438\u0439 \u043B\u043E\u0433\u0456\u043D</mat-label>
        <input
          matInput
          [(ngModel)]="model.newUserName"
          required
          (ngModelChange)="onUserNameChange($event)"
        />
        @if (checkingUserName) {
          <mat-spinner matSuffix diameter="18"></mat-spinner>
        } @else if (userNameError) {
          <mat-icon matSuffix color="warn" [matTooltip]="userNameError">error</mat-icon>
        } @else if (model.newUserName && userNameAvailable) {
          <mat-icon matSuffix class="icon-success" matTooltip="\u041B\u043E\u0433\u0456\u043D \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0438\u0439"
            >check_circle</mat-icon
          >
        }
        @if (userNameError) {
          <mat-error>{{ userNameError }}</mat-error>
        }
      </mat-form-field>

      @if(!data.adminChange) {
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>\u041F\u0430\u0440\u043E\u043B\u044C \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0430</mat-label>
        <input matInput type="password" [(ngModel)]="model.currentPassword" required />
        <mat-hint>\u0414\u043B\u044F \u043F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0436\u0435\u043D\u043D\u044F \u0437\u043C\u0456\u043D\u0438 \u043B\u043E\u0433\u0456\u043D\u0443</mat-hint>
      </mat-form-field>
      }
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>\u0421\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438</button>
      <button mat-flat-button color="primary" [disabled]="!canSave" (click)="save()">
        \u0417\u043C\u0456\u043D\u0438\u0442\u0438
      </button>
    </mat-dialog-actions>
  `, styles: ["/* src/Login/dialogs/dialog-shared.scss */\n.dialog-content {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  min-width: 320px;\n}\n.full-width {\n  width: 100%;\n}\n.error-text {\n  color: var(--mat-warn-color, #f44336);\n  font-size: 12px;\n  margin: -4px 0 4px 0;\n}\n.hint-text {\n  color: #666;\n  font-size: 12px;\n  margin: -4px 0 8px 0;\n}\n.validation-errors {\n  margin: -4px 0 4px 0;\n}\n.icon-success {\n  color: #4caf50;\n}\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ChangeLoginDialogComponent, { className: "ChangeLoginDialogComponent", filePath: "Login/dialogs/ChangeLoginDialog.component.ts", lineNumber: 80 });
})();

// src/Login/Users.page.ts
var _forTrack02 = ($index, $item) => $item.id;
function UsersPage_For_15_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const user_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(user_r2.soldier.unitShortName);
  }
}
function UsersPage_For_15_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 22);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const user_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(user_r2.soldier.positionValue);
  }
}
function UsersPage_For_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275listener("click", function UsersPage_For_15_Template_div_click_0_listener() {
      const user_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectUser(user_r2));
    })("keydown.enter", function UsersPage_For_15_Template_div_keydown_enter_0_listener() {
      const user_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectUser(user_r2));
    });
    \u0275\u0275elementStart(1, "div", 15)(2, "mat-icon", 16);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 17)(5, "span", 18);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 19);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div", 20);
    \u0275\u0275conditionalCreate(10, UsersPage_For_15_Conditional_10_Template, 2, 1, "span", 21);
    \u0275\u0275conditionalCreate(11, UsersPage_For_15_Conditional_11_Template, 2, 1, "span", 22);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_10_0;
    const user_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("selected", ((tmp_10_0 = ctx_r2.selectedUser()) == null ? null : tmp_10_0.id) === user_r2.id)("locked", user_r2.isLocked);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("locked", user_r2.isLocked);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", user_r2.isLocked ? "lock" : "person", " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate4(" ", user_r2.soldier.rankShortValue ? user_r2.soldier.rankShortValue + " " : "", " ", user_r2.soldier.firstName, " ", user_r2.soldier.midleName, " ", user_r2.soldier.lastName, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(user_r2.userName);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(user_r2.soldier.unitShortName ? 10 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(user_r2.soldier.positionValue ? 11 : -1);
  }
}
function UsersPage_ForEmpty_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275text(1, "\u041A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0456\u0432 \u043D\u0435 \u0437\u043D\u0430\u0439\u0434\u0435\u043D\u043E");
    \u0275\u0275elementEnd();
  }
}
function UsersPage_Conditional_18_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-chip", 23);
    \u0275\u0275text(1, "\u0417\u0430\u0431\u043B\u043E\u043A\u043E\u0432\u0430\u043D\u043E");
    \u0275\u0275elementEnd();
  }
}
function UsersPage_Conditional_18_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 39);
    \u0275\u0275listener("click", function UsersPage_Conditional_18_Conditional_26_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.onToggleLockout(false));
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "lock_open");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " \u0420\u043E\u0437\u0431\u043B\u043E\u043A\u0443\u0432\u0430\u0442\u0438 ");
    \u0275\u0275elementEnd();
  }
}
function UsersPage_Conditional_18_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 28);
    \u0275\u0275listener("click", function UsersPage_Conditional_18_Conditional_27_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.onToggleLockout(true));
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "lock");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " \u0417\u0430\u0431\u043B\u043E\u043A\u0443\u0432\u0430\u0442\u0438 ");
    \u0275\u0275elementEnd();
  }
}
function UsersPage_Conditional_18_Conditional_76_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30);
    \u0275\u0275element(1, "span", 31);
    \u0275\u0275elementStart(2, "mat-chip", 40);
    \u0275\u0275text(3, "\u041F\u043E\u0442\u0440\u0456\u0431\u043D\u0430 \u0437\u043C\u0456\u043D\u0430 \u043F\u0430\u0440\u043E\u043B\u044F");
    \u0275\u0275elementEnd()();
  }
}
function UsersPage_Conditional_18_For_84_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-chip-row", 41);
    \u0275\u0275listener("removed", function UsersPage_Conditional_18_For_84_Template_mat_chip_row_removed_0_listener() {
      const role_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.removeRole(role_r8));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "button", 42)(3, "mat-icon");
    \u0275\u0275text(4, "cancel");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const role_r8 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", role_r8, " ");
  }
}
function UsersPage_Conditional_18_ForEmpty_85_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 34);
    \u0275\u0275text(1, "\u0420\u043E\u043B\u0456 \u043D\u0435 \u043F\u0440\u0438\u0437\u043D\u0430\u0447\u0435\u043D\u043E");
    \u0275\u0275elementEnd();
  }
}
function UsersPage_Conditional_18_For_93_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 37);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const role_r9 = ctx.$implicit;
    \u0275\u0275property("value", role_r9.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(role_r9.value);
  }
}
function UsersPage_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12)(1, "mat-card")(2, "mat-card-header")(3, "mat-card-title")(4, "mat-icon");
    \u0275\u0275text(5, "person");
    \u0275\u0275elementEnd();
    \u0275\u0275text(6);
    \u0275\u0275conditionalCreate(7, UsersPage_Conditional_18_Conditional_7_Template, 2, 0, "mat-chip", 23);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "mat-card-content")(9, "div", 24)(10, "button", 25);
    \u0275\u0275listener("click", function UsersPage_Conditional_18_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onChangePassword(false));
    });
    \u0275\u0275elementStart(11, "mat-icon");
    \u0275\u0275text(12, "key");
    \u0275\u0275elementEnd();
    \u0275\u0275text(13, " \u0417\u043C\u0456\u043D\u0438\u0442\u0438 \u043F\u0430\u0440\u043E\u043B\u044C ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "button", 25);
    \u0275\u0275listener("click", function UsersPage_Conditional_18_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onChangeLogin(false));
    });
    \u0275\u0275elementStart(15, "mat-icon");
    \u0275\u0275text(16, "edit");
    \u0275\u0275elementEnd();
    \u0275\u0275text(17, " \u0417\u043C\u0456\u043D\u0438\u0442\u0438 \u041B\u043E\u0433\u0456\u043D ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "button", 25);
    \u0275\u0275listener("click", function UsersPage_Conditional_18_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onChangePassword(true));
    });
    \u0275\u0275elementStart(19, "mat-icon");
    \u0275\u0275text(20, "lock_reset");
    \u0275\u0275elementEnd();
    \u0275\u0275text(21, " \u0421\u043A\u0438\u043D\u0443\u0442\u0438 \u043F\u0430\u0440\u043E\u043B\u044C ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "button", 25);
    \u0275\u0275listener("click", function UsersPage_Conditional_18_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onChangeLogin(true));
    });
    \u0275\u0275elementStart(23, "mat-icon");
    \u0275\u0275text(24, "manage_accounts");
    \u0275\u0275elementEnd();
    \u0275\u0275text(25, " \u0421\u043A\u0438\u043D\u0443\u0442\u0438 \u041B\u043E\u0433\u0456\u043D ");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(26, UsersPage_Conditional_18_Conditional_26_Template, 4, 0, "button", 26)(27, UsersPage_Conditional_18_Conditional_27_Template, 4, 0, "button", 27);
    \u0275\u0275elementStart(28, "button", 28);
    \u0275\u0275listener("click", function UsersPage_Conditional_18_Template_button_click_28_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onDeleteUser());
    });
    \u0275\u0275elementStart(29, "mat-icon");
    \u0275\u0275text(30, "delete");
    \u0275\u0275elementEnd();
    \u0275\u0275text(31, " \u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438 ");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(32, "mat-card")(33, "mat-card-header")(34, "mat-card-title");
    \u0275\u0275text(35, "\u041E\u0431\u043B\u0456\u043A\u043E\u0432\u0438\u0439 \u0437\u0430\u043F\u0438\u0441");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "mat-card-content")(37, "div", 29)(38, "div", 30)(39, "span", 31);
    \u0275\u0275text(40, "\u041B\u043E\u0433\u0456\u043D:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "span", 32);
    \u0275\u0275text(42);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(43, "div", 30)(44, "span", 31);
    \u0275\u0275text(45, "Email:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "span", 32);
    \u0275\u0275text(47);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(48, "div", 30)(49, "span", 31);
    \u0275\u0275text(50, "\u041F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "span", 32);
    \u0275\u0275text(52);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(53, "div", 30)(54, "span", 31);
    \u0275\u0275text(55, "\u041F\u043E\u0441\u0430\u0434\u0430:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(56, "span", 32);
    \u0275\u0275text(57);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(58, "div", 30)(59, "span", 31);
    \u0275\u0275text(60, "\u041E\u0441\u0442\u0430\u043D\u043D\u0456\u0439 \u0432\u0445\u0456\u0434:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "span", 32);
    \u0275\u0275text(62);
    \u0275\u0275pipe(63, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(64, "div", 30)(65, "span", 31);
    \u0275\u0275text(66, "\u0420\u0435\u0454\u0441\u0442\u0440\u0430\u0446\u0456\u044F:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(67, "span", 32);
    \u0275\u0275text(68);
    \u0275\u0275pipe(69, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(70, "div", 30)(71, "span", 31);
    \u0275\u0275text(72, "\u041E\u0441\u0442\u0430\u043D\u043D\u044F \u0437\u043C\u0456\u043D\u0430 \u043F\u0430\u0440\u043E\u043B\u044F:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(73, "span", 32);
    \u0275\u0275text(74);
    \u0275\u0275pipe(75, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(76, UsersPage_Conditional_18_Conditional_76_Template, 4, 0, "div", 30);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(77, "mat-card")(78, "mat-card-header")(79, "mat-card-title");
    \u0275\u0275text(80, "\u0420\u043E\u043B\u0456");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(81, "mat-card-content")(82, "div", 33);
    \u0275\u0275repeaterCreate(83, UsersPage_Conditional_18_For_84_Template, 5, 1, "mat-chip-row", null, \u0275\u0275repeaterTrackByIdentity, false, UsersPage_Conditional_18_ForEmpty_85_Template, 2, 0, "span", 34);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(86, "div", 35)(87, "mat-form-field", 36)(88, "mat-label");
    \u0275\u0275text(89, "\u0414\u043E\u0434\u0430\u0442\u0438 \u0440\u043E\u043B\u044C");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(90, "mat-select", null, 0);
    \u0275\u0275repeaterCreate(92, UsersPage_Conditional_18_For_93_Template, 2, 2, "mat-option", 37, _forTrack02);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(94, "button", 38);
    \u0275\u0275listener("click", function UsersPage_Conditional_18_Template_button_click_94_listener() {
      \u0275\u0275restoreView(_r4);
      const roleSelect_r10 = \u0275\u0275reference(91);
      const ctx_r2 = \u0275\u0275nextContext();
      ctx_r2.addRole(roleSelect_r10.value);
      return \u0275\u0275resetView(roleSelect_r10.value = "");
    });
    \u0275\u0275elementStart(95, "mat-icon");
    \u0275\u0275text(96, "add_circle");
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const user_r11 = ctx;
    const roleSelect_r10 = \u0275\u0275reference(91);
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate4(" ", user_r11.soldier.rankShortValue ? user_r11.soldier.rankShortValue + " " : "", " ", user_r11.soldier.firstName, " ", user_r11.soldier.midleName, " ", user_r11.soldier.lastName, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(user_r11.isLocked ? 7 : -1);
    \u0275\u0275advance(19);
    \u0275\u0275conditional(user_r11.isLocked ? 26 : 27);
    \u0275\u0275advance(16);
    \u0275\u0275textInterpolate(user_r11.userName);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(user_r11.email || "\u2014");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(user_r11.soldier.unitShortName || "\u2014");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(user_r11.soldier.positionValue || "\u2014");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(user_r11.lastLoginDate ? \u0275\u0275pipeBind2(63, 16, user_r11.lastLoginDate, "dd.MM.yyyy HH:mm") : "\u041D\u0456\u043A\u043E\u043B\u0438");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(69, 19, user_r11.registrationDate, "dd.MM.yyyy"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(user_r11.lastPasswordChangeDate ? \u0275\u0275pipeBind2(75, 22, user_r11.lastPasswordChangeDate, "dd.MM.yyyy HH:mm") : "\u041D\u0456\u043A\u043E\u043B\u0438");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(user_r11.requirePasswordChange ? 76 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275repeater(ctx_r2.userRoles());
    \u0275\u0275advance(9);
    \u0275\u0275repeater(ctx_r2.availableRoles());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !roleSelect_r10.value);
  }
}
function UsersPage_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "mat-icon");
    \u0275\u0275text(2, "person_search");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u041E\u0431\u0435\u0440\u0456\u0442\u044C \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0430 \u0437 \u043F\u0435\u0440\u0435\u043B\u0456\u043A\u0443");
    \u0275\u0275elementEnd()();
  }
}
var UsersPage = class _UsersPage {
  usersService = inject(UsersService);
  dialog = inject(MatDialog);
  snackBar = inject(MatSnackBar);
  users = signal([], ...ngDevMode ? [{ debugName: "users" }] : []);
  selectedUser = signal(null, ...ngDevMode ? [{ debugName: "selectedUser" }] : []);
  allRoles = signal([], ...ngDevMode ? [{ debugName: "allRoles" }] : []);
  showInactive = signal(false, ...ngDevMode ? [{ debugName: "showInactive" }] : []);
  /** Ролі вибраного користувача */
  userRoles = signal([], ...ngDevMode ? [{ debugName: "userRoles" }] : []);
  /** Ролі, які ще можна додати */
  availableRoles = computed(() => {
    const assigned = new Set(this.userRoles());
    return this.allRoles().filter((r) => !assigned.has(r.value));
  }, ...ngDevMode ? [{ debugName: "availableRoles" }] : []);
  ngOnInit() {
    this.loadUsers();
    this.loadRoles();
  }
  loadUsers() {
    this.usersService.getAll(this.showInactive()).subscribe({
      next: (list) => this.users.set(list),
      error: () => this.notify("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0456\u0432")
    });
  }
  selectUser(user) {
    this.selectedUser.set(user);
    this.loadUserRoles(user.id);
  }
  // ── Roles ─────────────────────────────
  loadRoles() {
    this.usersService.getAllRoles().subscribe({
      next: (roles) => this.allRoles.set(roles)
    });
  }
  loadUserRoles(userId) {
    this.usersService.getById(userId).subscribe({
      next: (detail) => {
        if (detail.roles) {
          this.userRoles.set(detail.roles);
        } else {
          this.userRoles.set([]);
        }
      }
    });
  }
  addRole(roleName) {
    const userId = this.selectedUser()?.id;
    if (!userId || !roleName) {
      return;
    }
    this.usersService.addUserToRole(userId, roleName).subscribe({
      next: () => {
        this.userRoles.update((roles) => [...roles, roleName]);
        this.notify(`\u0420\u043E\u043B\u044C "${roleName}" \u0434\u043E\u0434\u0430\u043D\u043E`);
      },
      error: () => this.notify("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0434\u043E\u0434\u0430\u0432\u0430\u043D\u043D\u044F \u0440\u043E\u043B\u0456")
    });
  }
  removeRole(roleName) {
    const userId = this.selectedUser()?.id;
    if (!userId) {
      return;
    }
    this.usersService.removeUserFromRole(userId, roleName).subscribe({
      next: () => {
        this.userRoles.update((roles) => roles.filter((r) => r !== roleName));
        this.notify(`\u0420\u043E\u043B\u044C "${roleName}" \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u043E`);
      },
      error: () => this.notify("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F \u0440\u043E\u043B\u0456")
    });
  }
  // ── Actions ───────────────────────────
  onCreateUser() {
    const dialogRef = this.dialog.open(CreateUserDialogComponent, {
      width: "480px",
      data: { roles: this.allRoles() }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.usersService.create(result).subscribe({
          next: () => {
            this.notify("\u041A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0430 \u0441\u0442\u0432\u043E\u0440\u0435\u043D\u043E");
            this.loadUsers();
          },
          error: (err) => {
            const msg = err.error?.detail || "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0441\u0442\u0432\u043E\u0440\u0435\u043D\u043D\u044F \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0430";
            this.notify(msg);
          }
        });
      }
    });
  }
  /** Зміна пароля користувача
   * Якщо adminChange = true, то це адміністративна зміна логіну без підтвердження поточного пароля.
   * Використовується для примусового скидання логіну користувача адміністратором.
   * Якщо false (за замовчуванням), то користувач повинен ввести свій поточний пароль для підтвердження зміни логіну.
   */
  onChangePassword(adminChange = false) {
    const user = this.selectedUser();
    if (!user) {
      return;
    }
    const dialogRef = this.dialog.open(ChangePasswordDialogComponent, {
      width: "400px",
      data: { userName: user.userName, adminChange }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (adminChange) {
          this.usersService.adminResetPassword(user.id, result).subscribe({
            next: () => {
              this.notify("\u041F\u0430\u0440\u043E\u043B\u044C \u0437\u043C\u0456\u043D\u0435\u043D\u043E");
              this.loadUsers();
            },
            error: (err) => {
              const msg = err.error?.detail || "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u043C\u0456\u043D\u0438 \u043F\u0430\u0440\u043E\u043B\u044F";
              this.notify(msg);
            }
          });
        } else {
          this.usersService.changePassword(user.id, result).subscribe({
            next: () => this.notify("\u041F\u0430\u0440\u043E\u043B\u044C \u0437\u043C\u0456\u043D\u0435\u043D\u043E"),
            error: (err) => {
              const msg = err.error?.detail || "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u043C\u0456\u043D\u0438 \u043F\u0430\u0440\u043E\u043B\u044F";
              this.notify(msg);
            }
          });
        }
      }
    });
  }
  /** Зміна логіну користувача
   * Якщо adminChange = true, то це адміністративна зміна логіну без підтвердження поточного пароля.
   * Використовується для примусового скидання логіну користувача адміністратором.
   * Якщо false (за замовчуванням), то користувач повинен ввести свій поточний пароль для підтвердження зміни логіну.
   */
  onChangeLogin(adminChange = false) {
    const user = this.selectedUser();
    if (!user) {
      return;
    }
    const dialogRef = this.dialog.open(ChangeLoginDialogComponent, {
      width: "400px",
      data: { userId: user.id, userName: user.userName, adminChange }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (adminChange) {
          this.usersService.adminChangeUsername(user.id, result.newUserName).subscribe({
            next: () => {
              this.notify("\u041B\u043E\u0433\u0456\u043D \u0437\u043C\u0456\u043D\u0435\u043D\u043E");
              this.loadUsers();
            },
            error: (err) => {
              const msg = err.error?.detail || "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u043C\u0456\u043D\u0438 \u043B\u043E\u0433\u0456\u043D\u0443";
              this.notify(msg);
            }
          });
        } else {
          this.usersService.changeUsername(user.id, result).subscribe({
            next: () => {
              this.notify("\u041B\u043E\u0433\u0456\u043D \u0437\u043C\u0456\u043D\u0435\u043D\u043E");
              this.loadUsers();
            },
            error: (err) => {
              const msg = err.error?.detail || "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u043C\u0456\u043D\u0438 \u043B\u043E\u0433\u0456\u043D\u0443";
              this.notify(msg);
            }
          });
        }
      }
    });
  }
  /** Блокування/розблокування користувача */
  onToggleLockout(lock) {
    const user = this.selectedUser();
    if (!user) {
      return;
    }
    const action = lock ? "\u0437\u0430\u0431\u043B\u043E\u043A\u0443\u0432\u0430\u0442\u0438" : "\u0440\u043E\u0437\u0431\u043B\u043E\u043A\u0443\u0432\u0430\u0442\u0438";
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "400px",
      data: {
        title: lock ? "\u0411\u043B\u043E\u043A\u0443\u0432\u0430\u043D\u043D\u044F" : "\u0420\u043E\u0437\u0431\u043B\u043E\u043A\u0443\u0432\u0430\u043D\u043D\u044F",
        message: `\u0412\u0438 \u0432\u043F\u0435\u0432\u043D\u0435\u043D\u0456, \u0449\u043E \u0445\u043E\u0447\u0435\u0442\u0435 ${action} \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0430 "${user.userName}"?`
      }
    });
    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.usersService.setLockout(user.id, { lock }).subscribe({
          next: () => {
            this.notify(lock ? "\u041A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0430 \u0437\u0430\u0431\u043B\u043E\u043A\u043E\u0432\u0430\u043D\u043E" : "\u041A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0430 \u0440\u043E\u0437\u0431\u043B\u043E\u043A\u043E\u0432\u0430\u043D\u043E");
            this.selectUser(this.selectedUser());
            this.loadUsers();
          },
          error: () => this.notify("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u043C\u0456\u043D\u0438 \u0441\u0442\u0430\u0442\u0443\u0441\u0443")
        });
      }
    });
  }
  /** Видалення користувача */
  onDeleteUser() {
    const user = this.selectedUser();
    if (!user) {
      return;
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "400px",
      data: {
        title: "\u0412\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0430",
        message: `\u0412\u0438 \u0432\u043F\u0435\u0432\u043D\u0435\u043D\u0456, \u0449\u043E \u0445\u043E\u0447\u0435\u0442\u0435 \u0432\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0430 "${user.userName}"? \u0426\u044E \u0434\u0456\u044E \u043D\u0435\u043C\u043E\u0436\u043B\u0438\u0432\u043E \u0441\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438.`,
        color: "warn"
      }
    });
    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.usersService.delete(user.id).subscribe({
          next: () => {
            this.notify("\u041A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0430 \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u043E");
            this.selectedUser.set(null);
            this.loadUsers();
          },
          error: () => this.notify("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F")
        });
      }
    });
  }
  notify(msg) {
    this.snackBar.open(msg, "OK", { duration: 3e3 });
  }
  static \u0275fac = function UsersPage_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UsersPage)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UsersPage, selectors: [["app-users-page"]], decls: 20, vars: 3, consts: [["roleSelect", ""], ["storageKey", "usersPage"], ["leftPanel", ""], [1, "panel-header"], ["mat-icon-button", "", "matTooltip", "\u041E\u043D\u043E\u0432\u0438\u0442\u0438 \u043F\u0435\u0440\u0435\u043B\u0456\u043A", 3, "click"], ["matTooltip", "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u0438 \u0437\u0430\u0431\u043B\u043E\u043A\u043E\u0432\u0430\u043D\u0438\u0445", 3, "change", "checked"], [1, "spacer"], ["mat-raised-button", "", "color", "primary", "matTooltip", "\u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438", 3, "click"], [1, "user-list"], ["tabindex", "0", 1, "user-card", 3, "selected", "locked"], [1, "empty-list"], ["rightPanel", "", 2, "display", "flex", "flex-direction", "column", "height", "100%"], [1, "detail-panel"], [1, "no-selection"], ["tabindex", "0", 1, "user-card", 3, "click", "keydown.enter"], [1, "user-card-main"], [1, "user-icon"], [1, "user-info"], [1, "user-name"], [1, "user-login"], [1, "user-card-meta"], [1, "user-unit"], [1, "user-position"], ["color", "warn", "highlighted", ""], [1, "actions-row"], ["mat-stroked-button", "", 3, "click"], ["mat-stroked-button", "", "color", "primary"], ["mat-stroked-button", "", "color", "warn"], ["mat-stroked-button", "", "color", "warn", 3, "click"], [1, "info-grid"], [1, "info-row"], [1, "info-label"], [1, "info-value"], [1, "roles-section"], [1, "no-roles"], [1, "add-role"], ["appearance", "outline", 1, "role-select"], [3, "value"], ["mat-icon-button", "", "color", "primary", "matTooltip", "\u0414\u043E\u0434\u0430\u0442\u0438 \u0440\u043E\u043B\u044C", 3, "click", "disabled"], ["mat-stroked-button", "", "color", "primary", 3, "click"], ["color", "accent", "highlighted", ""], [3, "removed"], ["matChipRemove", ""]], template: function UsersPage_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "app-master-detail-layout", 1)(1, "div", 2)(2, "div", 3)(3, "button", 4);
      \u0275\u0275listener("click", function UsersPage_Template_button_click_3_listener() {
        return ctx.loadUsers();
      });
      \u0275\u0275elementStart(4, "mat-icon");
      \u0275\u0275text(5, "refresh");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "mat-slide-toggle", 5);
      \u0275\u0275listener("change", function UsersPage_Template_mat_slide_toggle_change_6_listener($event) {
        ctx.showInactive.set($event.checked);
        return ctx.loadUsers();
      });
      \u0275\u0275text(7, " \u0417\u0430\u0431\u043B\u043E\u043A\u043E\u0432\u0430\u043D\u0456 ");
      \u0275\u0275elementEnd();
      \u0275\u0275element(8, "span", 6);
      \u0275\u0275elementStart(9, "button", 7);
      \u0275\u0275listener("click", function UsersPage_Template_button_click_9_listener() {
        return ctx.onCreateUser();
      });
      \u0275\u0275elementStart(10, "mat-icon");
      \u0275\u0275text(11, "person_add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(12, " \u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438 ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(13, "div", 8);
      \u0275\u0275repeaterCreate(14, UsersPage_For_15_Template, 12, 14, "div", 9, _forTrack02, false, UsersPage_ForEmpty_16_Template, 2, 0, "div", 10);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "div", 11);
      \u0275\u0275conditionalCreate(18, UsersPage_Conditional_18_Template, 97, 25, "div", 12)(19, UsersPage_Conditional_19_Template, 5, 0, "div", 13);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      let tmp_2_0;
      \u0275\u0275advance(6);
      \u0275\u0275property("checked", ctx.showInactive());
      \u0275\u0275advance(8);
      \u0275\u0275repeater(ctx.users());
      \u0275\u0275advance(4);
      \u0275\u0275conditional((tmp_2_0 = ctx.selectedUser()) ? 18 : 19, tmp_2_0);
    }
  }, dependencies: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatIconModule,
    MatIcon,
    MatTooltipModule,
    MatTooltip,
    MatCardModule,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatChipsModule,
    MatChip,
    MatChipRemove,
    MatChipRow,
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatSelectModule,
    MatSelect,
    MatOption,
    MatInputModule,
    MatSlideToggleModule,
    MatSlideToggle,
    MatDialogModule,
    MatSnackBarModule,
    MasterDetailLayoutComponent,
    DatePipe
  ], styles: ["\n\n.panel-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 12px;\n  border-bottom: 1px solid #e0e0e0;\n}\n.spacer[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.user-list[_ngcontent-%COMP%] {\n  overflow-y: auto;\n  flex: 1;\n}\n.user-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  padding: 10px 14px;\n  border-bottom: 1px solid #eee;\n  cursor: pointer;\n  transition: background 0.15s;\n}\n.user-card[_ngcontent-%COMP%]:hover {\n  background: #f0f7ff;\n}\n.user-card.selected[_ngcontent-%COMP%] {\n  background: #e3f2fd;\n  border-left: 3px solid #1976d2;\n}\n.user-card.locked[_ngcontent-%COMP%] {\n  opacity: 0.65;\n}\n.user-card-main[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.user-icon[_ngcontent-%COMP%] {\n  color: #616161;\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n}\n.user-icon.locked[_ngcontent-%COMP%] {\n  color: #f44336;\n}\n.user-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.user-name[_ngcontent-%COMP%] {\n  font-weight: 500;\n  font-size: 14px;\n}\n.user-login[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #757575;\n}\n.user-card-meta[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  margin-top: 4px;\n  padding-left: 30px;\n}\n.user-unit[_ngcontent-%COMP%], \n.user-position[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #9e9e9e;\n}\n.empty-list[_ngcontent-%COMP%] {\n  padding: 24px;\n  text-align: center;\n  color: #9e9e9e;\n}\n.detail-panel[_ngcontent-%COMP%] {\n  padding: 16px;\n  overflow-y: auto;\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.detail-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.detail-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin: 0;\n  font-size: 18px;\n}\n.info-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto 1fr;\n  gap: 6px 16px;\n  padding: 8px 0;\n}\n.info-row[_ngcontent-%COMP%] {\n  display: contents;\n}\n.info-label[_ngcontent-%COMP%] {\n  color: #757575;\n  font-size: 13px;\n  white-space: nowrap;\n}\n.info-value[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 500;\n}\n.roles-section[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  margin-bottom: 12px;\n}\n.no-roles[_ngcontent-%COMP%] {\n  color: #9e9e9e;\n  font-size: 13px;\n}\n.add-role[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.role-select[_ngcontent-%COMP%] {\n  width: 200px;\n}\n.actions-row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  padding: 8px 0;\n}\n.no-selection[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  color: #bdbdbd;\n}\n.no-selection[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  width: 64px;\n  height: 64px;\n  margin-bottom: 16px;\n}\n.no-selection[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 16px;\n}"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UsersPage, [{
    type: Component,
    args: [{ selector: "app-users-page", imports: [
      CommonModule,
      FormsModule,
      MatButtonModule,
      MatIconModule,
      MatTooltipModule,
      MatCardModule,
      MatChipsModule,
      MatFormFieldModule,
      MatSelectModule,
      MatInputModule,
      MatSlideToggleModule,
      MatDialogModule,
      MatSnackBarModule,
      MasterDetailLayoutComponent
    ], template: `<app-master-detail-layout storageKey="usersPage">
  <!-- Left Panel: \u041F\u0435\u0440\u0435\u043B\u0456\u043A \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0456\u0432 -->
  <div leftPanel>
    <div class="panel-header">
      <button mat-icon-button (click)="loadUsers()" matTooltip="\u041E\u043D\u043E\u0432\u0438\u0442\u0438 \u043F\u0435\u0440\u0435\u043B\u0456\u043A">
        <mat-icon>refresh</mat-icon>
      </button>
      <mat-slide-toggle
        [checked]="showInactive()"
        (change)="showInactive.set($event.checked); loadUsers()"
        matTooltip="\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u0438 \u0437\u0430\u0431\u043B\u043E\u043A\u043E\u0432\u0430\u043D\u0438\u0445"
      >
        \u0417\u0430\u0431\u043B\u043E\u043A\u043E\u0432\u0430\u043D\u0456
      </mat-slide-toggle>
      <span class="spacer"></span>
      <button mat-raised-button color="primary" (click)="onCreateUser()" matTooltip="\u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438">
        <mat-icon>person_add</mat-icon>
        \u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438
      </button>
    </div>

    <div class="user-list">
      @for (user of users(); track user.id) {
        <div
          class="user-card"
          [class.selected]="selectedUser()?.id === user.id"
          [class.locked]="user.isLocked"
          (click)="selectUser(user)"
          (keydown.enter)="selectUser(user)"
          tabindex="0"
        >
          <div class="user-card-main">
            <mat-icon class="user-icon" [class.locked]="user.isLocked">
              {{ user.isLocked ? 'lock' : 'person' }}
            </mat-icon>
            <div class="user-info">
              <span class="user-name">
                {{ user.soldier.rankShortValue ? user.soldier.rankShortValue + ' ' : '' }}
                {{ user.soldier.firstName }}
                {{ user.soldier.midleName }}
                {{ user.soldier.lastName }}
              </span>
              <span class="user-login">{{ user.userName }}</span>
            </div>
          </div>
          <div class="user-card-meta">
            @if (user.soldier.unitShortName) {
              <span class="user-unit">{{ user.soldier.unitShortName }}</span>
            }
            @if (user.soldier.positionValue) {
              <span class="user-position">{{ user.soldier.positionValue }}</span>
            }
          </div>
        </div>
      } @empty {
        <div class="empty-list">\u041A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0456\u0432 \u043D\u0435 \u0437\u043D\u0430\u0439\u0434\u0435\u043D\u043E</div>
      }
    </div>
  </div>

  <!-- Right Panel: \u0414\u0435\u0442\u0430\u043B\u0456 \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0430 -->
  <div rightPanel style="display: flex; flex-direction: column; height: 100%">
    @if (selectedUser(); as user) {
      <div class="detail-panel">
        <mat-card>
          <mat-card-header>
            <mat-card-title>
              <mat-icon>person</mat-icon>
              {{ user.soldier.rankShortValue ? user.soldier.rankShortValue + ' ' : '' }}
              {{ user.soldier.firstName }}
              {{ user.soldier.midleName }}
              {{ user.soldier.lastName }}
              @if (user.isLocked) {
                <mat-chip color="warn" highlighted>\u0417\u0430\u0431\u043B\u043E\u043A\u043E\u0432\u0430\u043D\u043E</mat-chip>
              }
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="actions-row">
              <button mat-stroked-button (click)="onChangePassword(false)">
                <mat-icon>key</mat-icon>
                \u0417\u043C\u0456\u043D\u0438\u0442\u0438 \u043F\u0430\u0440\u043E\u043B\u044C
              </button>
              <button mat-stroked-button (click)="onChangeLogin(false)">
                <mat-icon>edit</mat-icon>
                \u0417\u043C\u0456\u043D\u0438\u0442\u0438 \u041B\u043E\u0433\u0456\u043D
              </button>

              <button mat-stroked-button (click)="onChangePassword(true)">
                <mat-icon>lock_reset</mat-icon>
                \u0421\u043A\u0438\u043D\u0443\u0442\u0438 \u043F\u0430\u0440\u043E\u043B\u044C
              </button>
              <button mat-stroked-button (click)="onChangeLogin(true)">
                <mat-icon>manage_accounts</mat-icon>
                \u0421\u043A\u0438\u043D\u0443\u0442\u0438 \u041B\u043E\u0433\u0456\u043D
              </button>

              @if (user.isLocked) {
                <button mat-stroked-button color="primary" (click)="onToggleLockout(false)">
                  <mat-icon>lock_open</mat-icon>
                  \u0420\u043E\u0437\u0431\u043B\u043E\u043A\u0443\u0432\u0430\u0442\u0438
                </button>
              } @else {
                <button mat-stroked-button color="warn" (click)="onToggleLockout(true)">
                  <mat-icon>lock</mat-icon>
                  \u0417\u0430\u0431\u043B\u043E\u043A\u0443\u0432\u0430\u0442\u0438
                </button>
              }
              <button mat-stroked-button color="warn" (click)="onDeleteUser()">
                <mat-icon>delete</mat-icon>
                \u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438
              </button>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- \u041E\u0441\u043D\u043E\u0432\u043D\u0430 \u0456\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0456\u044F -->
        <mat-card>
          <mat-card-header>
            <mat-card-title>\u041E\u0431\u043B\u0456\u043A\u043E\u0432\u0438\u0439 \u0437\u0430\u043F\u0438\u0441</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="info-grid">
              <div class="info-row">
                <span class="info-label">\u041B\u043E\u0433\u0456\u043D:</span>
                <span class="info-value">{{ user.userName }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Email:</span>
                <span class="info-value">{{ user.email || '\u2014' }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">\u041F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B:</span>
                <span class="info-value">{{ user.soldier.unitShortName || '\u2014' }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">\u041F\u043E\u0441\u0430\u0434\u0430:</span>
                <span class="info-value">{{ user.soldier.positionValue || '\u2014' }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">\u041E\u0441\u0442\u0430\u043D\u043D\u0456\u0439 \u0432\u0445\u0456\u0434:</span>
                <span class="info-value">{{
                  user.lastLoginDate ? (user.lastLoginDate | date: 'dd.MM.yyyy HH:mm') : '\u041D\u0456\u043A\u043E\u043B\u0438'
                }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">\u0420\u0435\u0454\u0441\u0442\u0440\u0430\u0446\u0456\u044F:</span>
                <span class="info-value">{{ user.registrationDate | date: 'dd.MM.yyyy' }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">\u041E\u0441\u0442\u0430\u043D\u043D\u044F \u0437\u043C\u0456\u043D\u0430 \u043F\u0430\u0440\u043E\u043B\u044F:</span>
                <span class="info-value">{{
                  user.lastPasswordChangeDate
                    ? (user.lastPasswordChangeDate | date: 'dd.MM.yyyy HH:mm')
                    : '\u041D\u0456\u043A\u043E\u043B\u0438'
                }}</span>
              </div>
              @if (user.requirePasswordChange) {
                <div class="info-row">
                  <span class="info-label"></span>
                  <mat-chip color="accent" highlighted>\u041F\u043E\u0442\u0440\u0456\u0431\u043D\u0430 \u0437\u043C\u0456\u043D\u0430 \u043F\u0430\u0440\u043E\u043B\u044F</mat-chip>
                </div>
              }
            </div>
          </mat-card-content>
        </mat-card>

        <!-- \u0420\u043E\u043B\u0456 -->
        <mat-card>
          <mat-card-header>
            <mat-card-title>\u0420\u043E\u043B\u0456</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="roles-section">
              @for (role of userRoles(); track role) {
                <mat-chip-row (removed)="removeRole(role)">
                  {{ role }}
                  <button matChipRemove>
                    <mat-icon>cancel</mat-icon>
                  </button>
                </mat-chip-row>
              } @empty {
                <span class="no-roles">\u0420\u043E\u043B\u0456 \u043D\u0435 \u043F\u0440\u0438\u0437\u043D\u0430\u0447\u0435\u043D\u043E</span>
              }
            </div>
            <div class="add-role">
              <mat-form-field appearance="outline" class="role-select">
                <mat-label>\u0414\u043E\u0434\u0430\u0442\u0438 \u0440\u043E\u043B\u044C</mat-label>
                <mat-select #roleSelect>
                  @for (role of availableRoles(); track role.id) {
                    <mat-option [value]="role.value">{{ role.value }}</mat-option>
                  }
                </mat-select>
              </mat-form-field>
              <button
                mat-icon-button
                color="primary"
                (click)="addRole(roleSelect.value); roleSelect.value = ''"
                [disabled]="!roleSelect.value"
                matTooltip="\u0414\u043E\u0434\u0430\u0442\u0438 \u0440\u043E\u043B\u044C"
              >
                <mat-icon>add_circle</mat-icon>
              </button>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    } @else {
      <div class="no-selection">
        <mat-icon>person_search</mat-icon>
        <p>\u041E\u0431\u0435\u0440\u0456\u0442\u044C \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0430 \u0437 \u043F\u0435\u0440\u0435\u043B\u0456\u043A\u0443</p>
      </div>
    }
  </div>
</app-master-detail-layout>
`, styles: ["/* src/Login/Users.page.scss */\n.panel-header {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 12px;\n  border-bottom: 1px solid #e0e0e0;\n}\n.spacer {\n  flex: 1;\n}\n.user-list {\n  overflow-y: auto;\n  flex: 1;\n}\n.user-card {\n  display: flex;\n  flex-direction: column;\n  padding: 10px 14px;\n  border-bottom: 1px solid #eee;\n  cursor: pointer;\n  transition: background 0.15s;\n}\n.user-card:hover {\n  background: #f0f7ff;\n}\n.user-card.selected {\n  background: #e3f2fd;\n  border-left: 3px solid #1976d2;\n}\n.user-card.locked {\n  opacity: 0.65;\n}\n.user-card-main {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.user-icon {\n  color: #616161;\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n}\n.user-icon.locked {\n  color: #f44336;\n}\n.user-info {\n  display: flex;\n  flex-direction: column;\n}\n.user-name {\n  font-weight: 500;\n  font-size: 14px;\n}\n.user-login {\n  font-size: 12px;\n  color: #757575;\n}\n.user-card-meta {\n  display: flex;\n  gap: 12px;\n  margin-top: 4px;\n  padding-left: 30px;\n}\n.user-unit,\n.user-position {\n  font-size: 11px;\n  color: #9e9e9e;\n}\n.empty-list {\n  padding: 24px;\n  text-align: center;\n  color: #9e9e9e;\n}\n.detail-panel {\n  padding: 16px;\n  overflow-y: auto;\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.detail-header {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.detail-header h3 {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin: 0;\n  font-size: 18px;\n}\n.info-grid {\n  display: grid;\n  grid-template-columns: auto 1fr;\n  gap: 6px 16px;\n  padding: 8px 0;\n}\n.info-row {\n  display: contents;\n}\n.info-label {\n  color: #757575;\n  font-size: 13px;\n  white-space: nowrap;\n}\n.info-value {\n  font-size: 13px;\n  font-weight: 500;\n}\n.roles-section {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  margin-bottom: 12px;\n}\n.no-roles {\n  color: #9e9e9e;\n  font-size: 13px;\n}\n.add-role {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.role-select {\n  width: 200px;\n}\n.actions-row {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  padding: 8px 0;\n}\n.no-selection {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  color: #bdbdbd;\n}\n.no-selection mat-icon {\n  font-size: 64px;\n  width: 64px;\n  height: 64px;\n  margin-bottom: 16px;\n}\n.no-selection p {\n  font-size: 16px;\n}\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UsersPage, { className: "UsersPage", filePath: "Login/Users.page.ts", lineNumber: 48 });
})();
export {
  UsersPage
};
