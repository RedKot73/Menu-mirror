import { DatePipe } from '@angular/common';

/**
 * Загальні утиліти для роботи з датами.
 *
 * formatDate      — відображення дати у форматі dd.MM.yyyy (з часом або без)
 * parseDateString — парсинг рядка ДД.ММ.ГГГГ → Date
 * toDateOnly      — Date → 'yyyy-MM-dd' для серверного DateOnly
 */

// ── Відображення ─────────────────────────

/**
 * Форматує дату для відображення в UI (uk-UA).
 * @param dateValue  Date, ISO-рядок або null/undefined
 * @param includeTime якщо true — додає HH:mm
 */
export function formatDate(
  dateValue: string | Date | null | undefined,
  includeTime = false,
): string {
  if (!dateValue) {
    return '';
  }

  const pipe = new DatePipe('uk-UA');
  const format = includeTime ? 'dd.MM.yyyy HH:mm' : 'dd.MM.yyyy';

  return pipe.transform(dateValue, format) ?? String(dateValue);
}

// ── Парсинг ──────────────────────────────

/**
 * Парсить рядок формату ДД.ММ.ГГГГ в Date.
 * Повертає null, якщо формат або дата невалідні (наприклад, 31.02).
 */
export function parseDateString(value: string): Date | null {
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

  // Перевірка на «перекидання» (31.02 → 03.03)
  if (date.getFullYear() === year && date.getMonth() === month && date.getDate() === day) {
    return date;
  }

  return null;
}

// ── Серіалізація для сервера ─────────────

/**
 * Конвертує Date | string | null | undefined → рядок 'yyyy-MM-dd'
 * для серверного типу DateOnly.
 * Якщо значення вже string або null/undefined — повертає як є.
 */
export function toDateOnly(value: Date | string | null | undefined): string | null | undefined {
  if (value === null || value === undefined) {
    return value;
  }
  if (value instanceof Date) {
    const y = value.getFullYear();
    const m = String(value.getMonth() + 1).padStart(2, '0');
    const d = String(value.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
  return value; // вже string
}
