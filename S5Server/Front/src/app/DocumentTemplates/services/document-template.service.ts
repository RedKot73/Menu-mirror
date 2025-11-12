import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CreateTemplateDto, RenderRequest, TemplateDto } from '../models/document-template.models';
/*
import {
  TemplateDataSetDto,
  TemplateDataSetCreateDto,
  TemplateDataSetListItem
} from '../DocumentTemplates/models/template-dataset.models';
import { HandlebarsTemplateService } from '../DocumentTemplates/services/handlebars-template.service';
*/
import { DocTemplateUtils, TemplateFormat } from '../models/shared.models';
import { ErrorHandler } from '../../shared/models/ErrorHandler';

@Injectable({
  providedIn: 'root',
})
export class DocumentTemplateService {
  private readonly http = inject(HttpClient);
  //private readonly handlebarsService = inject(HandlebarsTemplateService);
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

  // === Предварительный просмотр ===

  previewHtml(id: string, dataJson?: string): Observable<string> {
    const request: RenderRequest = {
      dataJson: dataJson || '{}',
      export: 'html',
    };

    return this.http
      .post(`${this.baseUrl}/${id}/preview/html`, request, {
        responseType: 'text',
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const message = ErrorHandler.handleHttpError(
            error,
            'Не вдалося сформувати попередній перегляд'
          );
          return throwError(() => new Error(message));
        })
      );
  }

  // === Экспорт документов ===

  exportDocument(id: string, exportFormat: TemplateFormat, dataJson?: string): Observable<Blob> {
    const request: RenderRequest = {
      dataJson: dataJson || '{}',
      export: DocTemplateUtils.formatToString(exportFormat),
    };

    return this.http
      .post(`${this.baseUrl}/${id}/export`, request, {
        responseType: 'blob',
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const message = ErrorHandler.handleHttpError(error, 'Не вдалося експортувати документ');
          return throwError(() => new Error(message));
        })
      );
  }

  // === Гибридный рендеринг (NEW) ===

  /**
   * Проверяет, поддерживается ли клиентский рендеринг для указанного формата
   */
  /*
  supportsClientRendering(format: TemplateFormat): boolean {
    return this.handlebarsService.supportsClientRendering(format);
  }
  */
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

  /**
   * Клиентский рендеринг с использованием Handlebars (только HTML/TXT)
   */
  /*
  renderClientSide(templateContent: string,
    dataJson: string,
    format: TemplateFormat): Observable<string> {
    return new Observable(observer => {
      try {
        const data = JSON.parse(dataJson || '{}');
        const result = this.handlebarsService.renderTemplate(templateContent, data, format);
        
        if (result.success) {
          observer.next(result.content!);
          observer.complete();
        } else {
          observer.error(new Error(result.error));
        }
      } catch (error: unknown) {
        observer.error(error);
      }
    });
    }
  */

  /**
   * Серверный рендеринг (для DOCX/PDF или fallback)
   */
  renderServerSide(id: string, dataJson: string, exportFormat: TemplateFormat): Observable<Blob> {
    const request: RenderRequest = {
      dataJson: dataJson || '{}',
      export: DocTemplateUtils.formatToString(exportFormat),
    };

    return this.http
      .post(`${this.baseUrl}/${id}/export`, request, {
        responseType: 'blob',
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const message = ErrorHandler.handleHttpError(error, 'Не вдалося згенерувати документ');
          return throwError(() => new Error(message));
        })
      );
  }

  /**
   * Универсальный метод предпросмотра с автоматическим выбором рендеринга
   */
  /*
  previewTemplate(id: string,
    dataJson: string,
    format: TemplateFormat): Observable<string | Blob> {
    if (this.supportsClientRendering(format)) {
      // Клиентский рендеринг для HTML/TXT
      return this.getTemplateContent(id).pipe(
        switchMap((templateContent: string) => 
          this.renderClientSide(templateContent, dataJson, format)
        )
      );
    } else {
      // Серверный рендеринг для DOCX/PDF
      return this.exportDocument(id, format, dataJson);
    }
    }
  */

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

  // Приватний метод handleError видалено: використовується загальний ErrorHandler.handleHttpError
}
