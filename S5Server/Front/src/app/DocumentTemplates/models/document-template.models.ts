import { TemplateFormat, TemplateFormatString } from '../models/shared.models';

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
  /*
  { //В PDF можемо тільки експортувати
    value: TemplateFormat.Pdf, 
    label: 'PDF', 
    description: 'Портативний документ' 
  }
  */
];
