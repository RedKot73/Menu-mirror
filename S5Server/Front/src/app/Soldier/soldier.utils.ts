import { SoldierDto } from '../../ServerService/soldier.service';
import { isSevereStatus, isProblematicStatus, isRecoveryStatus } from './Soldier.constant';

/** Числовий код належності бійця до підрозділу */
export enum SoldierUnitTag {
  /** Штатний (у своєму підрозділі, без відряджень) */
  Own = 0,
  /** Відряджений (є assignedUnit або involvedUnit) */
  Seconded = 1,
  /** Приданий до поточного підрозділу */
  Assigned = 2,
  /** Задіяний у поточному підрозділі */
  Involved = 3,
}

const UNIT_TAG_LABELS: Record<SoldierUnitTag, string> = {
  [SoldierUnitTag.Own]: '',
  [SoldierUnitTag.Seconded]: 'Відряджений',
  [SoldierUnitTag.Assigned]: 'Приданий',
  [SoldierUnitTag.Involved]: 'Задіяний',
};

/**
 * Утиліти для роботи з даними бійців
 */
export class SoldierUtils {
  /**
   * Отримати першу букву по батькові
   */
  static getFirstLetter(value?: string | null): string {
    return value && value.length > 0 ? value[0] : '';
  }

  /**
   * Сформувати ПІБ (скорочений формат)
   * @param firstName - Ім'я
   * @param midleName - По батькові
   * @param lastName - Прізвище
   * @returns ПІБ у форматі "Прізвище І.П." або тільки "Прізвище" якщо немає імені/по батькові
   */
  static formatFIO(firstName: string, midleName?: string | null, lastName?: string | null): string {
    if (!midleName && !lastName) {
      return firstName;
    }

    const mInitial = this.getFirstLetter(midleName);
    const lInitial = this.getFirstLetter(lastName);

    // Збираємо ініціали, пропускаючи відсутні
    const initials = [mInitial, lInitial].filter(Boolean).join('.');
    return initials ? `${firstName} ${initials}.` : firstName;
  }

  /**
   * Сформувати повне ПІБ
   * @param firstName - Ім'я
   * @param midleName - По батькові
   * @param lastName - Прізвище
   * @returns Повне ПІБ
   */
  static formatFullFIO(
    firstName: string,
    midleName?: string | null,
    lastName?: string | null,
  ): string {
    const parts = [firstName];

    if (midleName) {
      parts.push(midleName);
    }

    if (lastName) {
      parts.push(lastName);
    }

    return parts.join(' ');
  }

  /** Визначити числовий код належності бійця до підрозділу */
  static getUnitTag(soldier: SoldierDto, unitId: string): SoldierUnitTag {
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
  static getUnitTagLabel(tag: SoldierUnitTag): string {
    return UNIT_TAG_LABELS[tag];
  }

  /**
   * CSS-клас рядка таблиці бійця.
   * Пріоритет: severe > problematic > recovery > seconded
   */
  static getRowClass(soldier: SoldierDto, unitId: string): string {
    if (isSevereStatus(soldier.stateId)) {
      return 'row-severe';
    }
    if (isProblematicStatus(soldier.stateId)) {
      return 'row-problematic';
    }
    if (isRecoveryStatus(soldier.stateId)) {
      return 'row-recovery';
    }
    if (this.getUnitTag(soldier, unitId) === SoldierUnitTag.Seconded) {
      return 'row-seconded';
    }
    return '';
  }
}
