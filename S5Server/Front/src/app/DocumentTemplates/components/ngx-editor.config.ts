import { Toolbar } from 'ngx-editor';

/**
 * Базовая конфигурация панели инструментов ngx-editor для редактирования
 */
export const NGX_EDITOR_TOOLBAR: Toolbar = [
  ['bold', 'italic', 'underline', 'strike'],
  ['code', 'blockquote'],
  ['ordered_list', 'bullet_list'],
  [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
  ['link', 'image'],
  ['text_color', 'background_color'],
  ['align_left', 'align_center', 'align_right', 'align_justify'],
  ['horizontal_rule', 'format_clear'],
  ['undo', 'redo']
];

/**
 * Пустая панель инструментов для режима только чтения
 */
export const NGX_EDITOR_TOOLBAR_READONLY: Toolbar = [];
