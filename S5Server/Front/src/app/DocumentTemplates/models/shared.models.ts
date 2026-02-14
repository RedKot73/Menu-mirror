// Utility типы и константы
import { DatePipe } from '@angular/common';
export type TemplateDataSetStatus = 'published' | 'draft';

// Утилитарный класс для работы с форматами
export class DocTemplateUtils {
  /**
   * Получает статус публикации как строку
   */
  static getStatusString(isPublished: boolean): TemplateDataSetStatus {
    return isPublished ? 'published' : 'draft';
  }

  /**
   * Получает читаемое название статуса
   */
  static getStatusLabel(isPublished: boolean): string {
    return isPublished ? 'Опубліковано' : 'Чернетка';
  }

  /**
   * Форматирует дату для отображения
   */
  static formatDate(dateValue: string | Date | null | undefined, includeTime = false): string {
    if (!dateValue) { return ''; }

    const pipe = new DatePipe('uk-UA');
    const format = includeTime ? 'dd.MM.yyyy HH:mm' : 'dd.MM.yyyy';
    
    // DatePipe сам умеет проверять валидность даты и возвращает null, если она плохая
    return pipe.transform(dateValue, format) ?? String(dateValue);
  }

/**
 * Парсит строку формата ДД.ММ.ГГГГ в объект Date.
 * Возвращает null, если формат неверен или дата невалидна (например, 31.02).
 */
static parseDateString(value: string): Date | null {
  if (!value) { return null; }

  // Регулярка для строгого соответствия ДД.ММ.ГГГГ
  const match = value.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  if (!match) { return null; }

  const day = parseInt(match[1], 10);
  const month = parseInt(match[2], 10) - 1; // Месяцы в JS 0-11
  const year = parseInt(match[3], 10);

  const date = new Date(year, month, day);

  // Проверка на "перекат" (например, 31.02.2024 JS превратит в 02.03.2024)
  // Если после создания даты день или месяц не совпадают с исходными — дата "кривая"
  if (date.getFullYear() === year && date.getMonth() === month && date.getDate() === day) {
    return date;
  }

  return null;
}

}
