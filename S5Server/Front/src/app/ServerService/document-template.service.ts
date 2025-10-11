import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { 
  TemplateListItem, 
  CreateTemplateDto, 
  DataSetCreateDto, 
  RenderRequest, 
  TemplateDataSet,
  TemplateDataSetListItem 
} from '../models/document-template.models';

@Injectable({
  providedIn: 'root'
})
export class DocumentTemplateService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/templates';

  // === CRUD операции для шаблонов ===

  getTemplates(): Observable<TemplateListItem[]> {
    return this.http.get<TemplateListItem[]>(this.baseUrl)
      .pipe(catchError(this.handleError));
  }

  getTemplate(id: string): Observable<TemplateListItem> {
    return this.http.get<TemplateListItem>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  createTemplate(dto: CreateTemplateDto, file: File): Observable<TemplateListItem> {
    const formData = new FormData();
    formData.append('name', dto.name);
    formData.append('format', dto.format);
    if (dto.description) {
      formData.append('description', dto.description);
    }
    formData.append('file', file);

    return this.http.post<TemplateListItem>(this.baseUrl, formData)
      .pipe(catchError(this.handleError));
  }

  updateTemplate(id: string, dto: CreateTemplateDto, file?: File): Observable<void> {
    const formData = new FormData();
    formData.append('name', dto.name);
    formData.append('format', dto.format);
    if (dto.description) {
      formData.append('description', dto.description);
    }
    if (file) {
      formData.append('file', file);
    }

    return this.http.put<void>(`${this.baseUrl}/${id}`, formData)
      .pipe(catchError(this.handleError));
  }

  deleteTemplate(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // === Работа с файлами ===

  downloadTemplate(id: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${id}/download`, { 
      responseType: 'blob' 
    }).pipe(catchError(this.handleError));
  }

  // === Предварительный просмотр ===

  previewHtml(id: string, dataJson?: string): Observable<string> {
    const request: RenderRequest = { 
      dataJson: dataJson || '{}', 
      export: 'html' 
    };
    
    return this.http.post(`${this.baseUrl}/${id}/preview/html`, request, {
      responseType: 'text'
    }).pipe(catchError(this.handleError));
  }

  // === Экспорт документов ===

  exportDocument(id: string, exportFormat: 'html' | 'txt' | 'docx' | 'pdf', dataJson?: string): Observable<Blob> {
    const request: RenderRequest = { 
      dataJson: dataJson || '{}', 
      export: exportFormat 
    };
    
    return this.http.post(`${this.baseUrl}/${id}/export`, request, {
      responseType: 'blob'
    }).pipe(catchError(this.handleError));
  }

  // === Наборы данных ===

  getDataSets(templateId: string): Observable<TemplateDataSetListItem[]> {
    return this.http.get<TemplateDataSetListItem[]>(`${this.baseUrl}/${templateId}/data-sets`)
      .pipe(catchError(this.handleError));
  }

  createDataSet(templateId: string, dto: DataSetCreateDto): Observable<TemplateDataSetListItem> {
    return this.http.post<TemplateDataSetListItem>(`${this.baseUrl}/${templateId}/data-sets`, dto)
      .pipe(catchError(this.handleError));
  }

  getDataSet(dataSetId: string): Observable<TemplateDataSet> {
    return this.http.get<TemplateDataSet>(`${this.baseUrl}/data-sets/${dataSetId}`)
      .pipe(catchError(this.handleError));
  }

  deleteDataSet(dataSetId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/data-sets/${dataSetId}`)
      .pipe(catchError(this.handleError));
  }

  // === Утилиты ===

  /**
   * Скачивает файл из Blob с указанным именем
   */
  downloadBlob(blob: Blob, fileName: string): void {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  /**
   * Валидация JSON строки
   */
  isValidJson(jsonString: string): boolean {
    try {
      JSON.parse(jsonString);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Форматирование JSON строки
   */
  formatJson(jsonString: string): string {
    try {
      return JSON.stringify(JSON.parse(jsonString), null, 2);
    } catch {
      return jsonString;
    }
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Произошла неизвестная ошибка';
    
    if (error.error instanceof ErrorEvent) {
      // Клиентская ошибка
      errorMessage = `Ошибка: ${error.error.message}`;
    } else {
      // Серверная ошибка
      switch (error.status) {
        case 400:
          errorMessage = 'Неверные данные запроса';
          break;
        case 404:
          errorMessage = 'Шаблон не найден';
          break;
        case 409:
          errorMessage = 'Конфликт данных (например, дублирование имени)';
          break;
        case 499:
          errorMessage = 'Запрос отменен';
          break;
        case 500:
          errorMessage = 'Внутренняя ошибка сервера';
          break;
        case 501:
          errorMessage = 'Операция не поддерживается';
          break;
        default:
          errorMessage = `Ошибка сервера: ${error.status}`;
      }
      
      // Если есть детали ошибки в ответе
      if (error.error?.title) {
        errorMessage = error.error.title;
        if (error.error.detail) {
          errorMessage += `: ${error.error.detail}`;
        }
      }
    }
    
    console.error('DocumentTemplateService Error:', error);
    return throwError(() => new Error(errorMessage));
  }
}