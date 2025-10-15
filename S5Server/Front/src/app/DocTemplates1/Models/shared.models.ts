// Utility типы и константы
export type TemplateDataSetStatus = 'published' | 'draft';

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

}