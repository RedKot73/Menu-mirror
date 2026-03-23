// Utility типи та константи
export type TemplateDataSetStatus = 'published' | 'draft';

// Реекспорт для зворотної сумісності
//export { formatDate, parseDateString } from '../../shared/utils/date.utils';

/**
 * Утилітарний клас для DocumentTemplates.
 * Датові утиліти — у shared/utils/date.utils.ts
 */
export class DocTemplateUtils {
  static getStatusString(isPublished: boolean): TemplateDataSetStatus {
    return isPublished ? 'published' : 'draft';
  }

  static getStatusLabel(isPublished: boolean): string {
    return isPublished ? 'Опубліковано' : 'Чернетка';
  }
}
