// Модели для работы с TemplateDataSet API

// DTO для передачи данных TemplateDataSet (соответствует TemplateDataSetDto)
export interface TemplateDataSetDto {
  id: string;
  name: string;
  dataJson: string;
  isPublished: boolean;
  publishedAtUtc?: string; // ISO date string
  createdAtUtc: string; // ISO date string
  updatedAtUtc?: string; // ISO date string
}

// DTO для создания нового TemplateDataSet (соответствует TemplateDataSetCreateDto)
export interface TemplateDataSetCreateDto {
  name: string;
  dataJson: string;
  isPublished: boolean;
}

// Упрощенная модель для списков (опциональная, для оптимизации)
export interface TemplateDataSetListItem {
  id: string;
  name: string;
  isPublished: boolean;
  publishedAtUtc?: string; // ISO date string
  createdAtUtc: string;
  updatedAtUtc?: string;
}

// Модель для обновления TemplateDataSet
export interface TemplateDataSetUpdateDto {
  name: string;
  dataJson: string;
  isPublished: boolean;
}

// Утилиты для работы с TemplateDataSet
export class TemplateDataSetUtils {
  /**
   * Проверяет, является ли JSON строка валидной
   */
  static isValidJson(jsonString: string): boolean {
    try {
      JSON.parse(jsonString);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Форматирует JSON строку с отступами
   */
  static formatJson(jsonString: string, spaces: number = 2): string {
    try {
      const parsed = JSON.parse(jsonString);
      return JSON.stringify(parsed, null, spaces);
    } catch {
      return jsonString;
    }
  }

  /**
   * Создает пустой DataSet для формы
   */
  static createEmpty(): Partial<TemplateDataSetCreateDto> {
    return {
      name: '',
      dataJson: '{}',
      isPublished: false
    };
  }

  /**
   * Валидирует DataSet перед отправкой
   */
  static validate(dataSet: TemplateDataSetCreateDto): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!dataSet.name || dataSet.name.trim() === '') {
      errors.push('Название набора данных обязательно');
    }

    if (dataSet.name && dataSet.name.length > 150) {
      errors.push('Название не должно превышать 150 символов');
    }

    if (!dataSet.dataJson || dataSet.dataJson.trim() === '') {
      errors.push('JSON данные обязательны');
    }

    if (dataSet.dataJson && !this.isValidJson(dataSet.dataJson)) {
      errors.push('JSON данные должны быть в валидном формате');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Преобразует DTO в формат для отправки на сервер
   */
  static toServerDto(dto: TemplateDataSetCreateDto): TemplateDataSetCreateDto {
    return {
      name: dto.name.trim(),
      dataJson: dto.dataJson.trim(),
      isPublished: dto.isPublished
    };
  }

  /**
   * Создает DTO для обновления из существующего DataSet
   */
  static toUpdateDto(dataSet: TemplateDataSetDto): TemplateDataSetUpdateDto {
    return {
      name: dataSet.name,
      dataJson: dataSet.dataJson,
      isPublished: dataSet.isPublished
    };
  }
}

// Интерфейс для результата валидации
export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

// Интерфейс для фильтрации DataSets
export interface TemplateDataSetFilter {
  isPublished?: boolean;
  searchText?: string;
  dateFrom?: string;
  dateTo?: string;
}

// Интерфейс для сортировки DataSets
export interface TemplateDataSetSort {
  field: 'name' | 'createdAtUtc' | 'updatedAtUtc' | 'isPublished';
  direction: 'asc' | 'desc';
}
