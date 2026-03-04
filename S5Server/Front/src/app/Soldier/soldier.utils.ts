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
}
