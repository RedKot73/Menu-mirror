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

}
