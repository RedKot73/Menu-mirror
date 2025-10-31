import { AngularEditorConfig } from '@kolkov/angular-editor';

/**
 * Базова конфігурація для редактора (редагування шаблонів)
 */
export const ANGULAR_EDITOR_BASE_CONFIG: AngularEditorConfig = {
  editable: true,
  spellcheck: true,
  height: 'auto',
  minHeight: '400px',
  maxHeight: 'auto',
  width: 'auto',
  minWidth: '0',
  translate: 'yes',
  enableToolbar: true,
  showToolbar: true,
  placeholder: 'Введіть текст шаблону...',
  defaultParagraphSeparator: '',
  defaultFontName: '',
  defaultFontSize: '',
  fonts: [
    {class: 'arial', name: 'Arial'},
    {class: 'times-new-roman', name: 'Times New Roman'},
    {class: 'calibri', name: 'Calibri'},
    {class: 'comic-sans-ms', name: 'Comic Sans MS'}
  ],
  customClasses: [
    {
      name: 'quote',
      class: 'quote',
    },
    {
      name: 'redText',
      class: 'redText'
    },
    {
      name: 'titleText',
      class: 'titleText',
      tag: 'h1',
    },
  ],
  uploadUrl: '', // Якщо потрібен upload зображень
  uploadWithCredentials: false,
  sanitize: false, // Важливо для Handlebars - не видаляти {{}}
  toolbarPosition: 'top',
  toolbarHiddenButtons: [
    [
      // Приховуємо деякі кнопки для спрощення інтерфейсу
      'subscript',
      'superscript',
      'insertVideo',
    ],
    [
      'fontSize',
      'backgroundColor',
      'customClasses',
      'insertHorizontalRule',
      'removeFormat',
      //'toggleEditorMode'
    ]
  ]
};

/**
 * Конфігурація для readonly режиму (перегляд результату)
 */
export const ANGULAR_EDITOR_READONLY_CONFIG: AngularEditorConfig = {
  editable: false,
  spellcheck: false,
  height: 'auto',
  minHeight: '400px',
  maxHeight: 'auto',
  width: 'auto',
  minWidth: '0',
  translate: 'yes',
  enableToolbar: false,
  showToolbar: false,
  placeholder: 'Результат обробки з\'явиться тут...',
  defaultParagraphSeparator: '',
  defaultFontName: '',
  defaultFontSize: '',
  sanitize: false,
  toolbarPosition: 'top',
};
