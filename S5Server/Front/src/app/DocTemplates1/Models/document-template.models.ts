// Enum для форматов шаблонов (соответствует DocumentTemplate.TemplateFormat)
export enum TemplateFormat {
  Html = 'Html',
  Txt = 'Txt',
  Docx = 'Docx',
  Pdf = 'Pdf'
}

// Строковые представления форматов для API
export type TemplateFormatString = 'html' | 'txt' | 'docx' | 'pdf';

// Детальная информация о шаблоне (соответствует TemplateDetailsDto)
export interface TemplateDto {
  id: string;
  name: string;
  description?: string;
  format: string; // Приходит как строка с сервера (lowercase)
  templateCategoryId: string;
  templateCategoryName?: string;
  isPublished: boolean;
  publishedAtUtc?: string; // ISO date string
  defaultDataSetId?: string;
  defaultDataSetName?: string;
  createdAtUtc: string; // ISO date string
  updatedAtUtc: string; // ISO date string
}

// DTO для создания нового шаблона (соответствует CreateTemplateDto)
export interface CreateTemplateDto {
  name: string;
  description?: string;
  format: string; // Отправляется как строка на сервер (lowercase)
  templateCategoryId: string;
  isPublished: boolean;
  defaultDataSetId?: string;
  file?: File; // В TypeScript File object вместо IFormFile
}

// DTO для установки категории (соответствует SetCategoryDto)
export interface SetCategoryDto {
  templateCategoryId?: string;
}

// DTO для установки набора данных по умолчанию (соответствует SetDefaultDataSetDto)
export interface SetDefaultDataSetDto {
  defaultDataSetId?: string;
}

// Запрос на рендеринг (соответствует RenderRequest в контроллере)
export interface RenderRequest {
  dataJson?: string;
  export: TemplateFormatString; // 'html' | 'txt' | 'docx' | 'pdf'
}

// Запрос на экспорт клиентского HTML (соответствует ClientHtmlExportRequest)
export interface ClientHtmlExportRequest {
  name: string;
  html: string;
  export: TemplateFormatString; // 'html' | 'txt' | 'pdf' | 'docx'
}

// Утилитарный класс для работы с форматами
export class DocumentTemplateUtils {
  
  /**
   * Преобразует enum TemplateFormat в строковое представление для API
   */
  static formatToString(format: TemplateFormat): TemplateFormatString {
    switch (format) {
      case TemplateFormat.Html:
        return 'html';
      case TemplateFormat.Txt:
        return 'txt';
      case TemplateFormat.Docx:
        return 'docx';
      case TemplateFormat.Pdf:
        return 'pdf';
      default:
        return 'html';
    }
  }

  /**
   * Преобразует строковое представление формата в enum TemplateFormat
   */
  static parseFormat(formatString: string): TemplateFormat {
    switch (formatString.toLowerCase()) {
      case 'html':
        return TemplateFormat.Html;
      case 'txt':
        return TemplateFormat.Txt;
      case 'docx':
        return TemplateFormat.Docx;
      case 'pdf':
        return TemplateFormat.Pdf;
      default:
        return TemplateFormat.Html;
    }
  }

  /**
   * Попытка распарсить строку в TemplateFormat
   */
  static tryParseFormat(formatString?: string): { success: boolean; format: TemplateFormat } {
    if (!formatString) {
      return { success: false, format: TemplateFormat.Html };
    }

    switch (formatString.toLowerCase()) {
      case 'html':
        return { success: true, format: TemplateFormat.Html };
      case 'txt':
        return { success: true, format: TemplateFormat.Txt };
      case 'docx':
        return { success: true, format: TemplateFormat.Docx };
      case 'pdf':
        return { success: true, format: TemplateFormat.Pdf };
      default:
        return { success: false, format: TemplateFormat.Html };
    }
  }

  /**
   * Получает MIME-тип по формату (соответствует GetContentTypeByFormat в C#)
   */
  static getContentTypeByFormat(format: TemplateFormat): string {
    switch (format) {
      case TemplateFormat.Html:
        return 'text/html';
      case TemplateFormat.Txt:
        return 'text/plain';
      case TemplateFormat.Docx:
        return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      case TemplateFormat.Pdf:
        return 'application/pdf';
      default:
        return 'application/octet-stream';
    }
  }

  /**
   * Проверяет, поддерживается ли клиентский рендеринг для данного формата
   */
  static supportsClientRendering(format: TemplateFormat): boolean {
    return format === TemplateFormat.Html || format === TemplateFormat.Txt;
  }

  /**
   * Получает расширение файла по формату
   */
  static getFileExtension(format: TemplateFormat): string {
    switch (format) {
      case TemplateFormat.Html:
        return 'html';
      case TemplateFormat.Txt:
        return 'txt';
      case TemplateFormat.Docx:
        return 'docx';
      case TemplateFormat.Pdf:
        return 'pdf';
      default:
        return 'html';
    }
  }

  /**
   * Конвертирует TemplateDto в более удобный объект с типизированным форматом
   */
  static enhanceTemplateDto(dto: TemplateDto): TemplateDto & { formatEnum: TemplateFormat } {
    return {
      ...dto,
      formatEnum: this.parseFormat(dto.format)
    };
  }
}

// Интерфейс для работы с формами создания/редактирования
export interface TemplateFormData {
  name: string;
  description?: string;
  format: TemplateFormat;
  templateCategoryId: string;
  isPublished: boolean;
  defaultDataSetId?: string;
  file?: File;
}

// Типы для UI селекторов форматов
export interface FormatOption {
  value: TemplateFormat;
  label: string;
  description?: string;
}

export const TEMPLATE_FORMAT_OPTIONS: FormatOption[] = [
  { 
    value: TemplateFormat.Html, 
    label: 'HTML', 
    description: 'Веб-сторінка' 
  },
  { 
    value: TemplateFormat.Txt, 
    label: 'Текст', 
    description: 'Текстовий файл' 
  },
  { 
    value: TemplateFormat.Docx, 
    label: 'Word (DOCX)', 
    description: 'Microsoft Word документ' 
  },
  { 
    value: TemplateFormat.Pdf, 
    label: 'PDF', 
    description: 'Портативный документ' 
  }
];
