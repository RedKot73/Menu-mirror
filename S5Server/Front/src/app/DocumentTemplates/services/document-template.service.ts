import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
    TemplateDto,
    CreateTemplateDto,
    SetCategoryDto,
    SetDefaultDataSetDto,
    RenderRequest,
    ClientHtmlExportRequest
} from '../models/document-template.models';
import {
    TemplateFormat,
    TemplateFormatString,
    DocTemplateUtils
} from '../models/shared.models';

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
        return this.http.get<TemplateDto[]>(this.baseUrl)
            .pipe(catchError(this.handleError));
    }

    /**
     * GET /api/templates/{id} - Получить шаблон по ID
     */
    getById(id: string): Observable<TemplateDto> {
        return this.http.get<TemplateDto>(`${this.baseUrl}/${id}`)
            .pipe(catchError(this.handleError));
    }

    /**
   * POST /api/templates - Создать новый шаблон
   */
    create(dto: CreateTemplateDto): Observable<TemplateDto> {
        const formData = this.buildFormData(dto);
        return this.http.post<TemplateDto>(this.baseUrl, formData)
            .pipe(catchError(this.handleError));
    }

    /**
     * PUT /api/templates/{id} - Обновить шаблон
     */
    update(id: string, dto: CreateTemplateDto): Observable<void> {
        const formData = this.buildFormData(dto);
        return this.http.put<void>(`${this.baseUrl}/${id}`, formData)
            .pipe(catchError(this.handleError));
    }

    /**
     * DELETE /api/templates/{id} - Удалить шаблон
     */
    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`)
            .pipe(catchError(this.handleError));
    }

    deleteTemplate(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`)
            .pipe(catchError(this.handleError));
    }
    // ===== УПРАВЛЕНИЕ КАТЕГОРИЯМИ И ДАННЫМИ =====

    /**
     * PATCH /api/templates/{id}/category - Установить категорию шаблона
     */
    setCategory(id: string, dto: SetCategoryDto): Observable<void> {
        return this.http.patch<void>(`${this.baseUrl}/${id}/category`, dto)
            .pipe(catchError(this.handleError));
    }

    /**
     * PATCH /api/templates/{id}/default-data-set - Установить набор данных по умолчанию
     */
    setDefaultDataSet(id: string, dto: SetDefaultDataSetDto): Observable<void> {
        return this.http.patch<void>(`${this.baseUrl}/${id}/default-data-set`, dto)
            .pipe(catchError(this.handleError));
    }

    // ===== УПРАВЛЕНИЕ ПУБЛИКАЦИЕЙ =====

    /**
     * POST /api/templates/{id}/publish - Опубликовать шаблон
     */
    publish(id: string): Observable<void> {
        return this.http.post<void>(`${this.baseUrl}/${id}/publish`, {})
            .pipe(catchError(this.handleError));
    }

    /**
     * POST /api/templates/{id}/unpublish - Снять с публикации
     */
    unpublish(id: string): Observable<void> {
        return this.http.post<void>(`${this.baseUrl}/${id}/unpublish`, {})
            .pipe(catchError(this.handleError));
    }

    // ===== РАБОТА С КОНТЕНТОМ =====

    /**
     * GET /api/templates/{id}/content - Получить содержимое шаблона как текст
     * Поддерживается только для HTML и TXT форматов
     */
    getTemplateContent(id: string): Observable<string> {
        return this.http.get(`${this.baseUrl}/${id}/content`, {
            responseType: 'text'
        })
        .pipe(catchError(this.handleError));
    }

    /**
     * GET /api/templates/{id}/download - Скачать файл шаблона
     */
    downloadTemplate(id: string): Observable<Blob> {
        return this.http.get(`${this.baseUrl}/${id}/download`, {
            responseType: 'blob'
        })
        .pipe(catchError(this.handleError));
    }
/*
    download(id: string): Observable<Blob> {
        return this.http.get(`${this.baseUrl}/${id}/download`, {
            responseType: 'blob'
        })
        .pipe(catchError(this.handleError));
    }
*/
    // ===== ПРЕДПРОСМОТР И ЭКСПОРТ =====

    /**
     * POST /api/templates/{id}/preview/html - Предпросмотр шаблона в HTML
     */
    previewHtml(id: string, request?: RenderRequest): Observable<string> {
        const body = request || { export: 'html' as TemplateFormatString };
        return this.http.post(`${this.baseUrl}/${id}/preview/html`, body, {
            responseType: 'text'
        })
        .pipe(catchError(this.handleError));
    }

    /**
     * POST /api/templates/{id}/export - Экспорт документа по шаблону
     */
    export(id: string, request: RenderRequest): Observable<Blob> {
        return this.http.post(`${this.baseUrl}/${id}/export`, request, {
            responseType: 'blob'
        })
        .pipe(catchError(this.handleError));
    }

    /**
     * POST /api/templates/export-from-html - Экспорт из клиентского HTML
     */
    exportFromClientHtml(request: ClientHtmlExportRequest): Observable<Blob> {
        return this.http.post(`${this.baseUrl}/export-from-html`, request, {
            responseType: 'blob'
        })
        .pipe(catchError(this.handleError));
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
            this.downloadTemplate(id).subscribe({
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
                    const format = DocTemplateUtils.parseFormat(request.export);
                    const extension = DocTemplateUtils.getFileExtension(format);
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

                    const format = DocTemplateUtils.parseFormat(request.export);
                    const extension = DocTemplateUtils.getFileExtension(format);
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
        const format = DocTemplateUtils.parseFormat(template.format);
        return DocTemplateUtils.supportsClientRendering(format);
    }

    /**
     * Получает MIME-тип для шаблона
     */
    getContentType(template: TemplateDto): string {
        const format = DocTemplateUtils.parseFormat(template.format);
        return DocTemplateUtils.getContentTypeByFormat(format);
    }

    /**
     * Получает расширение файла для шаблона
     */
    getFileExtension(template: TemplateDto): string {
        const format = DocTemplateUtils.parseFormat(template.format);
        return DocTemplateUtils.getFileExtension(format);
    }

    /**
     * Конвертирует TemplateDto в более удобный объект с типизированным форматом
     */
    static enhanceTemplateDto(dto: TemplateDto): TemplateDto & { formatEnum: TemplateFormat } {
        return {
            ...dto,
            formatEnum: DocTemplateUtils.parseFormat(dto.format)
        };
    }

    /**
     * Получает список шаблонов с дополнительными данными о формате
     */
    getListWithFormatInfo(): Observable<(TemplateDto & { formatEnum: TemplateFormat })[]> {
        return this.getList().pipe(
            map(templates => templates.map(t => DocumentTemplateService.enhanceTemplateDto(t)))
        );
    }

    /**
     * Получает шаблон по ID с дополнительными данными о формате
     */
    getByIdWithFormatInfo(id: string): Observable<TemplateDto & { formatEnum: TemplateFormat }> {
        return this.getById(id).pipe(
            map(template => DocumentTemplateService.enhanceTemplateDto(template))
        );
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
