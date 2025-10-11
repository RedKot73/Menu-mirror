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
  name: string;
  dataJson: string;
}

export interface RenderRequest {
  dataJson?: string;
  export: 'html' | 'txt' | 'docx' | 'pdf';
}

export interface TemplateDataSet {
  id: string;
  templateId: string;
  name: string;
  dataJson: string;
  createdAtUtc: string;
}

export interface TemplateDataSetListItem {
  id: string;
  name: string;
  createdAtUtc: string;
}

export interface RenderResult {
  bytes: Uint8Array;
  contentType: string;
  fileName: string;
}

export const SUPPORTED_FORMATS = ['html', 'txt', 'docx'] as const;
export const EXPORT_FORMATS = ['html', 'txt', 'docx', 'pdf'] as const;