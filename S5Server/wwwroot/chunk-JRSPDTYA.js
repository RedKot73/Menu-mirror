import {
  UnitTag
} from "./chunk-WYAI2G6S.js";
import {
  FormControl
} from "./chunk-GX6V5MPD.js";
import {
  debounceTime,
  distinctUntilChanged,
  finalize,
  of,
  startWith,
  switchMap
} from "./chunk-6223PFVC.js";

// src/app/Soldier/InlineEditManager.class.ts
function resolveUnitOperation(soldierService, soldierId, column, selectedUnit) {
  switch (column) {
    case UnitTag.UnitId:
      if (!selectedUnit) {
        return null;
      }
      return {
        operation: soldierService.move(soldierId, selectedUnit.id),
        message: "\u041F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B \u043E\u043D\u043E\u0432\u043B\u0435\u043D\u043E"
      };
    case UnitTag.AssignedId:
      return {
        operation: soldierService.assignAssigned(soldierId, selectedUnit?.id || null),
        message: "\u041F\u0440\u0438\u0434\u0430\u043D\u043D\u044F \u043E\u043D\u043E\u0432\u043B\u0435\u043D\u043E"
      };
    case UnitTag.InvolvedId:
      return {
        operation: soldierService.assignInvolved(soldierId, selectedUnit?.id || null),
        message: "\u0415\u043A\u0456\u043F\u0430\u0436/\u0413\u0440\u0443\u043F\u0430 \u043E\u043D\u043E\u0432\u043B\u0435\u043D\u043E"
      };
    default:
      return null;
  }
}
var InlineEditManager = class {
  lookupFn;
  constructor(lookupFn) {
    this.lookupFn = lookupFn;
  }
  /** Функція відображення для mat-autocomplete [displayWith] */
  displayLookupFn = (unit) => unit ? unit.value : "";
  /** Стан інлайн-редагування для кожного рядка, ключ - soldierId */
  state = /* @__PURE__ */ new Map();
  /**
   * Отримати початкове значення з полів SoldierDto для інлайн-редагування.
   */
  static getInitialValue(soldier, column) {
    switch (column) {
      case UnitTag.UnitId:
        return soldier.unitShortName || "";
      case UnitTag.AssignedId:
        return soldier.assignedUnitShortName || "";
      case UnitTag.InvolvedId:
        return soldier.involvedUnitShortName || "";
      default:
        return "";
    }
  }
  /** Забезпечує стан інлайн-редагування для заданого солдата та колонки */
  ensure(soldierId, column, initialValue) {
    const existing = this.state.get(soldierId);
    if (existing && existing.column === column) {
      return existing;
    }
    return this.start(soldierId, column, initialValue);
  }
  /** Розпочати редагування: очистити інші рядки + створити/отримати стан */
  startEdit(soldierId, column, initialValue) {
    this.clearOthers(soldierId);
    return this.ensure(soldierId, column, initialValue);
  }
  /** Отримати FormControl для рядка (скорочення ensure().control) */
  getFormControl(soldierId, column, initialValue) {
    return this.ensure(soldierId, column, initialValue).control;
  }
  isMode(soldierId, column) {
    return this.state.get(soldierId)?.column === column;
  }
  options(soldierId) {
    return this.state.get(soldierId)?.options$ ?? of([]);
  }
  loading(soldierId) {
    return this.state.get(soldierId)?.loading ?? false;
  }
  clear(soldierId) {
    this.state.delete(soldierId);
  }
  /** Очищує стан інлайн-редагування для всіх солдатів, крім вказаного */
  clearOthers(exceptSoldierId) {
    for (const key of Array.from(this.state.keys())) {
      if (key !== exceptSoldierId) {
        this.state.delete(key);
      }
    }
  }
  setLoading(soldierId, value) {
    const current = this.state.get(soldierId);
    if (current) {
      current.loading = value;
    }
  }
  start(soldierId, column, initialValue) {
    const control = new FormControl(initialValue ?? "");
    const options$ = control.valueChanges.pipe(startWith(initialValue ?? ""), debounceTime(300), distinctUntilChanged(), switchMap((value) => {
      const term = this.extractTerm(value);
      if (term.length < 2) {
        this.setLoading(soldierId, false);
        return of([]);
      }
      this.setLoading(soldierId, true);
      return this.lookupFn(column, term, soldierId).pipe(finalize(() => this.setLoading(soldierId, false)));
    }));
    const nextState = { column, control, options$, loading: false };
    this.state.set(soldierId, nextState);
    return nextState;
  }
  extractTerm(value) {
    if (typeof value === "string") {
      return value;
    }
    if (value && typeof value === "object" && "value" in value) {
      return value.value ?? "";
    }
    return "";
  }
};

export {
  resolveUnitOperation,
  InlineEditManager
};
//# sourceMappingURL=chunk-JRSPDTYA.js.map
