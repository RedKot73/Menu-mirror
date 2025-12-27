import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import {
  CreateTemplateDto, TemplateDto,
} from '../models/document-template.models';
import { ErrorHandler } from '../../shared/models/ErrorHandler';

@Injectable({
  providedIn: 'root',
})
export class DocumentTemplateService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/templates';

  // === CRUD операции для шаблонов ===

  getTemplates(): Observable<TemplateDto[]> {
    return this.http.get<TemplateDto[]>(this.baseUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = ErrorHandler.handleHttpError(error, 'Помилка сервера шаблонів');
        return throwError(() => new Error(message));
      })
    );
  }

  getTemplate(id: string): Observable<TemplateDto> {
    return this.http.get<TemplateDto>(`${this.baseUrl}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = ErrorHandler.handleHttpError(error, 'Шаблон не знайдено');
        return throwError(() => new Error(message));
      })
    );
  }

  createTemplate(dto: CreateTemplateDto): Observable<TemplateDto> {
    const formData = this.buildFormData(dto);

    return this.http.post<TemplateDto>(this.baseUrl, formData).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = ErrorHandler.handleHttpError(error, 'Не вдалося створити шаблон');
        return throwError(() => new Error(message));
      })
    );
  }

  updateTemplate(id: string, dto: CreateTemplateDto): Observable<void> {
    const formData = this.buildFormData(dto);

    return this.http.put<void>(`${this.baseUrl}/${id}`, formData).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = ErrorHandler.handleHttpError(error, 'Не вдалося оновити шаблон');
        return throwError(() => new Error(message));
      })
    );
  }

  deleteTemplate(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = ErrorHandler.handleHttpError(error, 'Не вдалося видалити шаблон');
        return throwError(() => new Error(message));
      })
    );
  }

  publishTemplate(id: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${id}/publish`, {}).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = ErrorHandler.handleHttpError(error, 'Не вдалося опублікувати шаблон');
        return throwError(() => new Error(message));
      })
    );
  }

  unpublishTemplate(id: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${id}/unpublish`, {}).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = ErrorHandler.handleHttpError(error, 'Не вдалося зняти публікацію шаблону');
        return throwError(() => new Error(message));
      })
    );
  }

  // === Работа с файлами ===

  downloadFile(id: string): Observable<Blob> {
    return this.http
      .get(`${this.baseUrl}/${id}/download`, {
        responseType: 'blob',
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const message = ErrorHandler.handleHttpError(
            error,
            'Не вдалося завантажити файл шаблону'
          );
          return throwError(() => new Error(message));
        })
      );
  }

  // === Гибридный рендеринг (NEW) ===

  /**
   * Получает содержимое шаблона для клиентского рендеринга
   */
  getTemplateContent(id: string): Observable<string> {
    return this.http
      .get(`${this.baseUrl}/${id}/content`, {
        responseType: 'text',
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const message = ErrorHandler.handleHttpError(error, 'Не вдалося отримати вміст шаблону');
          return throwError(() => new Error(message));
        })
      );
  }

  /**
   * Сохраняет отредактированное содержимое шаблона
   */
  saveTemplateContent(id: string, content: string): Observable<void> {
    return this.http
      .put<void>(
        `${this.baseUrl}/${id}/content`,
        { content },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const message = ErrorHandler.handleHttpError(error, 'Не вдалося зберегти вміст шаблону');
          return throwError(() => new Error(message));
        })
      );
  }

  // === Утилиты ===
  /**
   * Скачивает файл из Blob с указанным именем
   */
  /**
   * Создает FormData для отправки на сервер
   */
  private buildFormData(dto: CreateTemplateDto): FormData {
    const formData = new FormData();

    formData.append('name', dto.name);

    if (dto.description) {
      formData.append('description', dto.description);
    }

    //formData.append('format', dto.format);
    formData.append('templateCategoryId', dto.templateCategoryId);
    formData.append('isPublished', dto.isPublished.toString());

    return formData;
  }

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
}
