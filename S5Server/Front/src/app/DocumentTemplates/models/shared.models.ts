// Utility типы и константы
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
  static formatDate(dateString: string): string {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateString;
    }
  }
}
