// Utility типы и константы
export type TemplateDataSetStatus = 'published' | 'draft';
// Enum для форматов шаблонов (соответствует DocumentTemplate.TemplateFormat)
export enum TemplateFormat {
    Html = 'Html',
    Txt = 'Txt',
    Docx = 'Docx',
    //Pdf = 'Pdf'
}

// Строковые представления форматов для API
export type TemplateFormatString = 'html' | 'txt' | 'docx';// | 'pdf';
export const EXPORT_FORMATS = ['html', 'txt', 'docx', 'pdf'] as const;
export const SUPPORTED_FORMATS = ['html', 'txt', 'docx'] as const;

// Утилитарный класс для работы с форматами
export class DocTemplateUtils {
    /**
     * Получает статус публикации как строку
     */
    static getStatusString(isPublished: boolean): TemplateDataSetStatus {
        return isPublished ? 'published' : 'draft';
    }

    /**
     * Получает читаемое название статуса
     */
    static getStatusLabel(isPublished: boolean): string {
        return isPublished ? 'Опубліковано' : 'Чернетка';
    }

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
            /*
          case TemplateFormat.Pdf:
            return 'pdf';
            */
            default:
                return 'html';
        }
    }

    /**
     * Получает читаемое название формата
     */
    static getFormatLabel(format: string): string {
        const templateFormat = DocTemplateUtils.parseFormat(format);
        switch (templateFormat) {
            case TemplateFormat.Html:
                return 'HTML';
            case TemplateFormat.Txt:
                return 'Текст';
            case TemplateFormat.Docx:
                return 'Word';
            /*
        case TemplateFormat.Pdf:
            return 'PDF';
            */
            default:
                return format.toUpperCase();
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
            /*
          case 'pdf':
            return TemplateFormat.Pdf;
            */
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
            /*
          case 'pdf':
            return { success: true, format: TemplateFormat.Pdf };
            */
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
            /*
          case TemplateFormat.Pdf:
            return 'application/pdf';
            */
            default:
                return 'application/octet-stream';
        }
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
            /*
          case TemplateFormat.Pdf:
            return 'pdf';
            */
            default:
                return 'html';
        }
    }

    /**
     * Проверяет, поддерживается ли клиентский рендеринг для данного формата
     */
    static supportsClientRendering(format: TemplateFormat): boolean {
        return format === TemplateFormat.Html || format === TemplateFormat.Txt;
    }

    /**
     * Форматирует дату для отображения
     */
    static formatDate(dateString: string): string {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('ru-RU', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch {
            return dateString;
        }
    }
}

