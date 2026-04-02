import {
  HttpErrorResponse
} from "./chunk-WAYE7YII.js";

// src/app/shared/models/ErrorHandler.ts
var HTTP_STATUS_MESSAGES = {
  // 4xx Client Errors
  400: "\u041D\u0435\u0432\u0456\u0440\u043D\u0456 \u0434\u0430\u043D\u0456 \u0437\u0430\u043F\u0438\u0442\u0443",
  401: "\u041D\u0435\u043E\u0431\u0445\u0456\u0434\u043D\u0430 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0456\u044F",
  403: "\u0414\u043E\u0441\u0442\u0443\u043F \u0437\u0430\u0431\u043E\u0440\u043E\u043D\u0435\u043D\u043E",
  404: "\u0420\u0435\u0441\u0443\u0440\u0441 \u043D\u0435 \u0437\u043D\u0430\u0439\u0434\u0435\u043D\u043E",
  405: "\u041C\u0435\u0442\u043E\u0434 \u043D\u0435 \u0434\u043E\u0437\u0432\u043E\u043B\u0435\u043D\u043E",
  408: "\u0427\u0430\u0441 \u043E\u0447\u0456\u043A\u0443\u0432\u0430\u043D\u043D\u044F \u0437\u0430\u043F\u0438\u0442\u0443 \u0432\u0438\u0447\u0435\u0440\u043F\u0430\u043D\u043E",
  409: "\u041A\u043E\u043D\u0444\u043B\u0456\u043A\u0442 \u0434\u0430\u043D\u0438\u0445 (\u043C\u043E\u0436\u043B\u0438\u0432\u043E, \u0434\u0443\u0431\u043B\u044E\u0432\u0430\u043D\u043D\u044F)",
  410: "\u0420\u0435\u0441\u0443\u0440\u0441 \u0431\u0456\u043B\u044C\u0448\u0435 \u043D\u0435 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0438\u0439",
  422: "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0432\u0430\u043B\u0456\u0434\u0430\u0446\u0456\u0457 \u0434\u0430\u043D\u0438\u0445",
  429: "\u0417\u0430\u043D\u0430\u0434\u0442\u043E \u0431\u0430\u0433\u0430\u0442\u043E \u0437\u0430\u043F\u0438\u0442\u0456\u0432",
  // 4xx Special
  499: "\u0417\u0430\u043F\u0438\u0442 \u0441\u043A\u0430\u0441\u043E\u0432\u0430\u043D\u043E",
  // 5xx Server Errors
  500: "\u0412\u043D\u0443\u0442\u0440\u0456\u0448\u043D\u044F \u043F\u043E\u043C\u0438\u043B\u043A\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0430",
  501: "\u041E\u043F\u0435\u0440\u0430\u0446\u0456\u044F \u043D\u0435 \u043F\u0456\u0434\u0442\u0440\u0438\u043C\u0443\u0454\u0442\u044C\u0441\u044F",
  502: "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0448\u043B\u044E\u0437\u0443",
  503: "\u0421\u0435\u0440\u0432\u0456\u0441 \u0442\u0438\u043C\u0447\u0430\u0441\u043E\u0432\u043E \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0438\u0439",
  504: "\u0427\u0430\u0441 \u043E\u0447\u0456\u043A\u0443\u0432\u0430\u043D\u043D\u044F \u0448\u043B\u044E\u0437\u0443 \u0432\u0438\u0447\u0435\u0440\u043F\u0430\u043D\u043E",
  // 0 Network Error
  0: "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437'\u0454\u0434\u043D\u0430\u043D\u043D\u044F \u0437 \u0441\u0435\u0440\u0432\u0435\u0440\u043E\u043C"
};
var S5App_ErrorHandler = class {
  /**
   * Обробляє помилку валідації JSON та повертає читабельне повідомлення
   * @param error - Помилка, яка виникла при парсингу JSON
   * @returns Форматоване повідомлення про помилку
   */
  static handleJsonError(error, defaultMessage = "\u041D\u0435\u0432\u0456\u0434\u043E\u043C\u0430 \u043F\u043E\u043C\u0438\u043B\u043A\u0430 \u043F\u0440\u0438 \u043E\u0431\u0440\u043E\u0431\u0446\u0456 \u0434\u0430\u043D\u0438\u0445", logError = true) {
    let message = defaultMessage;
    if (error instanceof Error) {
      message = `\u041D\u0435\u0432\u0430\u043B\u0456\u0434\u043D\u0438\u0439 JSON \u0444\u043E\u0440\u043C\u0430\u0442: ${error.message}`;
    }
    if (logError) {
      console.error("JSON Error:", message);
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
  static handleHttpError(error, defaultMessage = "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0430", logError = true) {
    if (logError) {
      console.error("HTTP Error:", error);
    }
    if (error instanceof HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        return `\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043A\u043B\u0456\u0454\u043D\u0442\u0430: ${error.error.message}`;
      }
      if (error.error?.title) {
        let message = error.error.title;
        if (error.error.detail) {
          message += `: ${error.error.detail}`;
        }
        return message;
      }
      if (error.error?.message) {
        return error.error.message;
      }
      if (error.status === 400 && error.error?.errors) {
        return "\u041D\u0435\u0432\u0456\u0440\u043D\u0456 \u0434\u0430\u043D\u0456 \u0437\u0430\u043F\u0438\u0442\u0443: " + JSON.stringify(error.error.errors);
      }
      const statusMessage = HTTP_STATUS_MESSAGES[error.status];
      if (statusMessage) {
        return statusMessage;
      }
      return defaultMessage !== "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0430" ? `${defaultMessage} (\u043A\u043E\u0434: ${error.status})` : `\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0430: ${error.status}`;
    }
    const err = error;
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
  static handleGenericError(error, defaultMessage = "\u0412\u0438\u043D\u0438\u043A\u043B\u0430 \u043F\u043E\u043C\u0438\u043B\u043A\u0430") {
    if (error instanceof Error) {
      return error.message;
    }
    if (typeof error === "string") {
      return error;
    }
    return defaultMessage;
  }
};

export {
  S5App_ErrorHandler
};
//# sourceMappingURL=chunk-SWYNU52L.js.map
