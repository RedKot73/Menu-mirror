import { HttpErrorResponse } from '@angular/common/http';

/**
 * Довідник стандартних повідомлень для HTTP статусів
 */
const HTTP_STATUS_MESSAGES: Record<number, string> = {
  // 4xx Client Errors
  400: 'Невірні дані запиту',
  401: 'Необхідна авторизація',
  403: 'Доступ заборонено',
  404: 'Ресурс не знайдено',
  405: 'Метод не дозволено',
  408: 'Час очікування запиту вичерпано',
  409: 'Конфлікт даних (можливо, дублювання)',
  410: 'Ресурс більше не доступний',
  422: 'Помилка валідації даних',
  429: 'Занадто багато запитів',

  // 4xx Special
  499: 'Запит скасовано',

  // 5xx Server Errors
  500: 'Внутрішня помилка сервера',
  501: 'Операція не підтримується',
  502: 'Помилка шлюзу',
  503: 'Сервіс тимчасово недоступний',
  504: 'Час очікування шлюзу вичерпано',

  // 0 Network Error
  0: "Помилка з'єднання з сервером",
};

/**
 * Утилітний клас для обробки помилок
 */
export class S5App_ErrorHandler {
  /**
   * Обробляє помилку валідації JSON та повертає читабельне повідомлення
   * @param error - Помилка, яка виникла при парсингу JSON
   * @returns Форматоване повідомлення про помилку
   */
  static handleJsonError(
    error: unknown,
    defaultMessage: string = 'Невідома помилка при обробці даних',
    logError: boolean = true
  ): string {
    let message = defaultMessage;
    if (error instanceof Error) {
      message = `Невалідний JSON формат: ${error.message}`;
    }

    if (logError) {
      console.error('JSON Error:', message);
    }
    return message;
  }

  /**
   * Обробляє помилку HTTP запиту з детальним аналізом статусів та структури відповіді
   * @param error - Помилка HTTP запиту
   * @param defaultMessage - Повідомлення за замовчуванням
   * @param logError - Чи логувати помилку в консоль (за замовчуванням true)
   * @returns Форматоване повідомлення про помилку
   */
  static handleHttpError(
    error: unknown,
    defaultMessage: string = 'Помилка сервера',
    logError: boolean = true
  ): string {
    if (logError) {
      console.error('HTTP Error:', error);
    }

    // Перевіряємо чи це HttpErrorResponse
    if (error instanceof HttpErrorResponse) {
      // Клиентська помилка (мережа, CORS тощо)
      if (error.error instanceof ErrorEvent) {
        return `Помилка клієнта: ${error.error.message}`;
      }

      // Серверна помилка - спочатку перевіряємо структуровані дані
      // RFC 7807 Problem Details (title + detail)
      if (error.error?.title) {
        let message = error.error.title;
        if (error.error.detail) {
          message += `: ${error.error.detail}`;
        }
        return message;
      }

      // Простий message у відповіді (пріоритет над загальними повідомленнями статусу)
      if (error.error?.message) {
        return error.error.message;
      }

      // Спеціальні випадки з додатковою інформацією
      if (error.status === 400 && error.error?.errors) {
        return 'Невірні дані запиту: ' + JSON.stringify(error.error.errors);
      }

      // Обробка за HTTP статусом через довідник
      const statusMessage = HTTP_STATUS_MESSAGES[error.status];

      if (statusMessage) {
        // Знайдено стандартне повідомлення для цього статусу
        return statusMessage;
      }

      // Невідомий статус - використовуємо defaultMessage або загальне повідомлення
      return defaultMessage !== 'Помилка сервера'
        ? `${defaultMessage} (код: ${error.status})`
        : `Помилка сервера: ${error.status}`;
    }

    // Fallback для інших типів помилок
    const err = error as { error?: { message?: string }; message?: string };
    if (err?.error?.message) {
      return err.error.message;
    }
    if (err?.message) {
      return err.message;
    }

    return defaultMessage;
  }

  /**
   * Обробляє загальну помилку та повертає читабельне повідомлення
   * @param error - Будь-яка помилка
   * @param defaultMessage - Повідомлення за замовчуванням
   * @returns Форматоване повідомлення про помилку
   */
  static handleGenericError(error: unknown, defaultMessage: string = 'Виникла помилка'): string {
    if (error instanceof Error) {
      return error.message;
    }
    if (typeof error === 'string') {
      return error;
    }
    return defaultMessage;
  }
}
