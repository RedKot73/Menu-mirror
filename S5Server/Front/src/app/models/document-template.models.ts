// Модели для работы с DocumentTemplatesController

export interface TemplateListItem {
  id: string;
  name: string;
  description?: string;
  format: 'html' | 'txt' | 'docx';
  createdAtUtc: string;
  updatedAtUtc: string;
}

export interface CreateTemplateDto {
  name: string;
  description?: string;
  format: 'html' | 'txt' | 'docx';
}

export interface DataSetCreateDto {
  templateId: string;
  name: string;
  dataJson: string;
  isPublished: boolean;
}

export interface RenderRequest {
  dataJson?: string;
  export: 'html' | 'txt' | 'docx' | 'pdf';
  useClientRendering?: boolean; // Новый флаг для указания типа рендеринга
}

export interface ClientRenderRequest {
  templateContent: string;
  dataJson: string;
  format: 'html' | 'txt';
}

export interface ServerRenderRequest {
  templateId: string;
  dataJson: string;
  export: 'docx' | 'pdf';
}

export interface TemplateDataSet {
  id: string;
  templateId: string;
  templateName?: string;
  name: string;
  dataJson: string;
  isPublished: boolean;
  createdAtUtc: string;
  updatedAtUtc: string;
}

export interface TemplateDataSetDto {
  id: string;
  templateId: string;
  templateName?: string;
  name: string;
  dataJson: string;
  isPublished: boolean;
  createdAtUtc: string;
  updatedAtUtc: string;
}

export interface TemplateDataSetListItem {
  id: string;
  templateId: string;
  templateName?: string;
  name: string;
  isPublished: boolean;
  createdAtUtc: string;
  updatedAtUtc: string;
}

export interface RenderResult {
  bytes: Uint8Array;
  contentType: string;
  fileName: string;
}

export const SUPPORTED_FORMATS = ['html', 'txt', 'docx'] as const;
export const EXPORT_FORMATS = ['html', 'txt', 'docx', 'pdf'] as const;