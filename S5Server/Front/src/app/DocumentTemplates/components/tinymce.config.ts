import { EditorComponent } from '@tinymce/tinymce-angular';

/**
 * Базова конфігурація TinyMCE для редагування шаблонів
 */
export const TINYMCE_BASE_CONFIG: EditorComponent['init'] = {
    plugins: [
        'lists', 'link', 'code', 'table', 'help', 'wordcount',
        'searchreplace', 'fullscreen'
    ],
    toolbar: [
        'undo redo | blocks | bold italic underline strikethrough',
        'alignleft aligncenter alignright | bullist numlist | link table | code | help'
    ],
    menubar: false,
    min_height: 400,
    resize: true,
    statusbar: true,
    branding: false,
    promotion: false,
    content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; font-size: 14px; }',
    // Налаштування для Handlebars
    valid_elements: '*[*]',
    extended_valid_elements: '*[*]',
    custom_elements: '*[*]',
    verify_html: false
};

/**
 * Конфігурація TinyMCE для readonly режиму (тільки перегляд)
 */
export const TINYMCE_READONLY_CONFIG: EditorComponent['init'] = {
    ...TINYMCE_BASE_CONFIG,
    toolbar: false,
    menubar: false,
    statusbar: false,
    readonly: true
};
