import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { 
  TemplateDto, 
  TemplateDetailsDto, 
  CreateTemplateDto, 
  SetCategoryDto, 
  SetDefaultDataSetDto,
  RenderRequest,
  ClientHtmlExportRequest,
  TemplateFormat,
  TemplateFormatString,
  DocumentTemplateUtils
} from '../Models/document-template.models';

@Injectable({
  providedIn: 'root'
})
export class DocumentTemplateService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/templates';

  // ===== ОСНОВНЫЕ CRUD ОПЕРАЦИИ =====

  /**
   * GET /api/templates - Получить список всех шаблонов
   */
  getList(): Observable<TemplateDto[]> {
    return this.http.get<TemplateDto[]>(this.baseUrl);
  }

  /**
   * GET /api/templates/{id} - Получить шаблон по ID
   */
  getById(id: string): Observable<TemplateDto> {
    return this.http.get<TemplateDto>(`${this.baseUrl}/${id}`);
  }

  /**
   * GET /api/templates/{id}/details - Получить детальную информацию о шаблоне
   */
  getDetails(id: string): Observable<TemplateDetailsDto> {
    return this.http.get<TemplateDetailsDto>(`${this.baseUrl}/${id}/details`);
  }

  /**
   * POST /api/templates - Создать новый шаблон
   */
  create(dto: CreateTemplateDto): Observable<TemplateDto> {
    const formData = this.buildFormData(dto);
    return this.http.post<TemplateDto>(this.baseUrl, formData);
  }

  /**
   * PUT /api/templates/{id} - Обновить шаблон
   */
  update(id: string, dto: CreateTemplateDto): Observable<void> {
    const formData = this.buildFormData(dto);
    return this.http.put<void>(`${this.baseUrl}/${id}`, formData);
  }

  /**
   * DELETE /api/templates/{id} - Удалить шаблон
   */
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // ===== УПРАВЛЕНИЕ КАТЕГОРИЯМИ И ДАННЫМИ =====

  /**
   * PATCH /api/templates/{id}/category - Установить категорию шаблона
   */
  setCategory(id: string, dto: SetCategoryDto): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${id}/category`, dto);
  }

  /**
   * PATCH /api/templates/{id}/default-data-set - Установить набор данных по умолчанию
   */
  setDefaultDataSet(id: string, dto: SetDefaultDataSetDto): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${id}/default-data-set`, dto);
  }

  // ===== УПРАВЛЕНИЕ ПУБЛИКАЦИЕЙ =====

  /**
   * POST /api/templates/{id}/publish - Опубликовать шаблон
   */
  publish(id: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${id}/publish`, {});
  }

  /**
   * POST /api/templates/{id}/unpublish - Снять с публикации
   */
  unpublish(id: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${id}/unpublish`, {});
  }

  // ===== РАБОТА С КОНТЕНТОМ =====

  /**
   * GET /api/templates/{id}/content - Получить содержимое шаблона как текст
   * Поддерживается только для HTML и TXT форматов
   */
  getTemplateContent(id: string): Observable<string> {
    return this.http.get(`${this.baseUrl}/${id}/content`, { 
      responseType: 'text' 
    });
  }

  /**
   * GET /api/templates/{id}/download - Скачать файл шаблона
   */
  download(id: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${id}/download`, { 
      responseType: 'blob' 
    });
  }

  // ===== ПРЕДПРОСМОТР И ЭКСПОРТ =====

  /**
   * POST /api/templates/{id}/preview/html - Предпросмотр шаблона в HTML
   */
  previewHtml(id: string, request?: RenderRequest): Observable<string> {
    const body = request || { export: 'html' as TemplateFormatString };
    return this.http.post(`${this.baseUrl}/${id}/preview/html`, body, { 
      responseType: 'text' 
    });
  }

  /**
   * POST /api/templates/{id}/export - Экспорт документа по шаблону
   */
  export(id: string, request: RenderRequest): Observable<Blob> {
    return this.http.post(`${this.baseUrl}/${id}/export`, request, { 
      responseType: 'blob' 
    });
  }

  /**
   * POST /api/templates/export-from-html - Экспорт из клиентского HTML
   */
  exportFromClientHtml(request: ClientHtmlExportRequest): Observable<Blob> {
    return this.http.post(`${this.baseUrl}/export-from-html`, request, { 
      responseType: 'blob' 
    });
  }

  // ===== УТИЛИТАРНЫЕ МЕТОДЫ =====

  /**
   * Создает FormData для отправки на сервер
   */
  private buildFormData(dto: CreateTemplateDto): FormData {
    const formData = new FormData();
    
    formData.append('name', dto.name);
    
    if (dto.description) {
      formData.append('description', dto.description);
    }
    
    formData.append('format', dto.format);
    formData.append('templateCategoryId', dto.templateCategoryId);
    formData.append('isPublished', dto.isPublished.toString());
    
    if (dto.defaultDataSetId) {
      formData.append('defaultDataSetId', dto.defaultDataSetId);
    }
    
    if (dto.file) {
      formData.append('file', dto.file);
    }

    return formData;
  }

  /**
   * Скачивает файл и сохраняет его на диск пользователя
   */
  downloadFile(id: string, fileName?: string): Observable<void> {
    return new Observable(observer => {
      this.download(id).subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = fileName || `template_${id}`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
          observer.next();
          observer.complete();
        },
        error: (error) => observer.error(error)
      });
    });
  }

  /**
   * Экспортирует документ и сохраняет на диск
   */
  exportAndDownload(id: string, request: RenderRequest, fileName?: string): Observable<void> {
    return new Observable(observer => {
      this.export(id, request).subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          
          // Определяем расширение файла по формату экспорта
          const format = DocumentTemplateUtils.parseFormat(request.export);
          const extension = DocumentTemplateUtils.getFileExtension(format);
          const defaultFileName = fileName || `document_${id}.${extension}`;
          
          link.download = defaultFileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
          observer.next();
          observer.complete();
        },
        error: (error) => observer.error(error)
      });
    });
  }

  /**
   * Экспортирует из клиентского HTML и сохраняет на диск
   */
  exportFromClientHtmlAndDownload(request: ClientHtmlExportRequest): Observable<void> {
    return new Observable(observer => {
      this.exportFromClientHtml(request).subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          
          const format = DocumentTemplateUtils.parseFormat(request.export);
          const extension = DocumentTemplateUtils.getFileExtension(format);
          const fileName = `${request.name || 'document'}.${extension}`;
          
          link.download = fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
          observer.next();
          observer.complete();
        },
        error: (error) => observer.error(error)
      });
    });
  }

  // ===== ВСПОМОГАТЕЛЬНЫЕ МЕТОДЫ ДЛЯ РАБОТЫ С ФОРМАТАМИ =====

  /**
   * Проверяет, поддерживается ли клиентский рендеринг для шаблона
   */
  supportsClientRendering(template: TemplateDto): boolean {
    const format = DocumentTemplateUtils.parseFormat(template.format);
    return DocumentTemplateUtils.supportsClientRendering(format);
  }

  /**
   * Получает MIME-тип для шаблона
   */
  getContentType(template: TemplateDto): string {
    const format = DocumentTemplateUtils.parseFormat(template.format);
    return DocumentTemplateUtils.getContentTypeByFormat(format);
  }

  /**
   * Получает расширение файла для шаблона
   */
  getFileExtension(template: TemplateDto): string {
    const format = DocumentTemplateUtils.parseFormat(template.format);
    return DocumentTemplateUtils.getFileExtension(format);
  }

  /**
   * Получает список шаблонов с дополнительными данными о формате
   */
  getListWithFormatInfo(): Observable<(TemplateDto & { formatEnum: TemplateFormat })[]> {
    return this.getList().pipe(
      map(templates => templates.map(t => DocumentTemplateUtils.enhanceTemplateDto(t)))
    );
  }

  /**
   * Получает шаблон по ID с дополнительными данными о формате
   */
  getByIdWithFormatInfo(id: string): Observable<TemplateDto & { formatEnum: TemplateFormat }> {
    return this.getById(id).pipe(
      map(template => DocumentTemplateUtils.enhanceTemplateDto(template))
    );
  }
}
