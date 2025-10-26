/**
 * Общие типы для работы с шаблонами и данными
 */

/**
 * Тип данных для dataset - объект с произвольными ключами и значениями
 */
export type DatasetData = Record<string, unknown>;

/**
 * Результат рендеринга шаблона
 */
export interface TemplateRenderResult {
  success: boolean;
  content?: string;
  error?: string;
}
