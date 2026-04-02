import {
  DatePipe
} from "./chunk-WAYE7YII.js";

// src/app/Soldier/Soldier.constant.ts
var SoldierStatusIds = {
  KILLED: "00000000-0000-0000-0000-000000000200",
  // 200 Вбито
  WOUNDED: "00000000-0000-0000-0000-000000000300",
  // 300 Поранено
  DESERTER: "00000000-0000-0000-0000-000000000500",
  // 500 СЗЧ/Відмова
  MISSING: "00000000-0000-0000-0000-000000000600",
  // 600 Зниклий безвісти
  CAPTURED: "00000000-0000-0000-0000-000000000800",
  // 800 В полоні
  RELEASED_FROM_CAPTIVITY: "00000000-0000-0000-0000-000000001000"
  // 1000 Звільнено з полону
};
var UnitTag = {
  /** Колонка Штатний ОС */
  UnitId: 1,
  /** Колонка Приданий ОС */
  AssignedId: 2,
  /** Колонка Оперативний ОС */
  InvolvedId: 4
};
function isSevereStatus(stateId) {
  return stateId === SoldierStatusIds.KILLED || stateId === SoldierStatusIds.WOUNDED || stateId === SoldierStatusIds.MISSING || stateId === SoldierStatusIds.CAPTURED;
}
function isProblematicStatus(stateId) {
  return stateId === SoldierStatusIds.DESERTER;
}
function isRecoveryStatus(stateId) {
  return stateId === SoldierStatusIds.RELEASED_FROM_CAPTIVITY;
}

// src/app/Soldier/soldier.utils.ts
var SoldierUnitTag;
(function(SoldierUnitTag2) {
  SoldierUnitTag2[SoldierUnitTag2["Own"] = 0] = "Own";
  SoldierUnitTag2[SoldierUnitTag2["Seconded"] = 1] = "Seconded";
  SoldierUnitTag2[SoldierUnitTag2["Assigned"] = 2] = "Assigned";
  SoldierUnitTag2[SoldierUnitTag2["Involved"] = 3] = "Involved";
})(SoldierUnitTag || (SoldierUnitTag = {}));
var UNIT_TAG_LABELS = {
  [SoldierUnitTag.Own]: "",
  [SoldierUnitTag.Seconded]: "\u0412\u0456\u0434\u0440\u044F\u0434\u0436\u0435\u043D\u0438\u0439",
  [SoldierUnitTag.Assigned]: "\u041F\u0440\u0438\u0434\u0430\u043D\u0438\u0439",
  [SoldierUnitTag.Involved]: "\u0417\u0430\u0434\u0456\u044F\u043D\u0438\u0439"
};
var SoldierUtils = class {
  /**
   * Отримати першу букву по батькові
   */
  static getFirstLetter(value) {
    return value && value.length > 0 ? value[0] : "";
  }
  /**
   * Сформувати ПІБ (скорочений формат)
   * @param firstName - Ім'я
   * @param midleName - По батькові
   * @param lastName - Прізвище
   * @returns ПІБ у форматі "Прізвище І.П." або тільки "Прізвище" якщо немає імені/по батькові
   */
  static formatFIO(firstName, midleName, lastName) {
    if (!midleName && !lastName) {
      return firstName;
    }
    const mInitial = this.getFirstLetter(midleName);
    const lInitial = this.getFirstLetter(lastName);
    const initials = [mInitial, lInitial].filter(Boolean).join(".");
    return initials ? `${firstName} ${initials}.` : firstName;
  }
  /**
   * Сформувати повне ПІБ
   * @param firstName - Ім'я
   * @param midleName - По батькові
   * @param lastName - Прізвище
   * @returns Повне ПІБ
   */
  static formatFullFIO(firstName, midleName, lastName) {
    const parts = [firstName];
    if (midleName) {
      parts.push(midleName);
    }
    if (lastName) {
      parts.push(lastName);
    }
    return parts.join(" ");
  }
  /** Визначити числовий код належності бійця до підрозділу */
  static getUnitTag(soldier, unitId) {
    switch (unitId) {
      case soldier.unitId:
        if (soldier.assignedUnitId || soldier.involvedUnitId) {
          return SoldierUnitTag.Seconded;
        }
        return SoldierUnitTag.Own;
      case soldier.assignedUnitId:
        return SoldierUnitTag.Assigned;
      case soldier.involvedUnitId:
        return SoldierUnitTag.Involved;
      default:
        return SoldierUnitTag.Own;
    }
  }
  /** Отримати текстовий підпис для коду належності */
  static getUnitTagLabel(tag) {
    return UNIT_TAG_LABELS[tag];
  }
  /**
   * CSS-клас рядка таблиці бійця.
   * Пріоритет: severe > problematic > recovery > seconded
   */
  static getRowClass(soldier, unitId) {
    if (isSevereStatus(soldier.stateId)) {
      return "row-severe";
    }
    if (isProblematicStatus(soldier.stateId)) {
      return "row-problematic";
    }
    if (isRecoveryStatus(soldier.stateId)) {
      return "row-recovery";
    }
    if (this.getUnitTag(soldier, unitId) === SoldierUnitTag.Seconded) {
      return "row-seconded";
    }
    return "";
  }
};

// src/app/shared/utils/date.utils.ts
function formatDate(dateValue, includeTime = false) {
  if (!dateValue) {
    return "";
  }
  const pipe = new DatePipe("uk-UA");
  const format = includeTime ? "dd.MM.yyyy HH:mm" : "dd.MM.yyyy";
  return pipe.transform(dateValue, format) ?? String(dateValue);
}
function parseDateString(value) {
  if (!value) {
    return null;
  }
  const match = value.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  if (!match) {
    return null;
  }
  const day = parseInt(match[1], 10);
  const month = parseInt(match[2], 10) - 1;
  const year = parseInt(match[3], 10);
  const date = new Date(year, month, day);
  if (date.getFullYear() === year && date.getMonth() === month && date.getDate() === day) {
    return date;
  }
  return null;
}
function parseDateOnly(value) {
  if (!value) {
    return null;
  }
  const parts = value.split("-");
  if (parts.length < 3) {
    return null;
  }
  const [year, month, day] = parts.map(Number);
  return new Date(year, month - 1, day);
}
function toDateOnly(value) {
  if (value === null || value === void 0) {
    return value;
  }
  if (value instanceof Date) {
    const y = value.getFullYear();
    const m = String(value.getMonth() + 1).padStart(2, "0");
    const d = String(value.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }
  return value;
}

export {
  UnitTag,
  isSevereStatus,
  isProblematicStatus,
  isRecoveryStatus,
  formatDate,
  parseDateString,
  parseDateOnly,
  toDateOnly,
  SoldierUtils
};
//# sourceMappingURL=chunk-BKMWEMBD.js.map
