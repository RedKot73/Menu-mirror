// Детальная информация о шаблоне (соответствует TemplateDetailsDto)
export interface TemplateDto {
  id: string;
  name: string;
  description?: string;
  templateCategoryId: string;
  templateCategoryName?: string;
  isPublished: boolean;
  publishedAtUtc?: string; // ISO date string
  createdAtUtc: string; // ISO date string
  validFrom: string; // ISO date string
}

// DTO для создания нового шаблона (соответствует CreateTemplateDto)
export interface CreateTemplateDto {
  name: string;
  description?: string;
  templateCategoryId: string;
  isPublished: boolean;
}

// DTO для установки категории (соответствует SetCategoryDto)
export interface SetCategoryDto {
  templateCategoryId?: string;
}

// Запрос на экспорт клиентского HTML (соответствует ClientHtmlExportRequest)
export interface ClientHtmlExportRequest {
  name: string;
  html: string;
}

// Интерфейс для работы с формами создания/редактирования
export interface TemplateFormData {
  name: string;
  description?: string;
  templateCategoryId: string;
  isPublished: boolean;
  file?: File;
}
