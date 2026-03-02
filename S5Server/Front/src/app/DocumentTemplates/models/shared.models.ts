// Utility типи та константи
import { formatDate, parseDateString } from '../../shared/utils/date.utils';
export type TemplateDataSetStatus = 'published' | 'draft';

// Реекспорт для зворотної сумісності
export { formatDate, parseDateString } from '../../shared/utils/date.utils';

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

  /** @deprecated використовуйте formatDate() напряму */
  static formatDate = formatDate;

  /** @deprecated використовуйте parseDateString() напряму */
  static parseDateString = parseDateString;
}
