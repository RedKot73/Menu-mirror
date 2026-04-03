// Модели для работы с TemplateDataSet и UnitTask API

// === TemplateDataSet Models (Заголовок документа) ===

/**
 * DTO для створення/оновлення TemplateDataSet
 * Відповідає серверному TemplateDataSetUpSertDto
 */
export interface TemplateDataSetCreateDto {
  isParentDocUsed: boolean;
  parentDocNumber?: string | null;
  parentDocDate?: Date | null;
  docNumber: string;
  docDate: Date;
  name: string;
  isPublished: boolean;
}

/**
 * DTO для читання TemplateDataSet
 * Відповідає серверному TemplateDataSetDto
 */
export interface TemplateDataSetDto extends TemplateDataSetCreateDto {
  id: string;
  publishedAtUtc?: Date;
  createdAtUtc: Date;
  validFrom: Date;
}

/**
 * Сирий JSON-відповідь сервера до десеріалізації —
 * дати представлені як string (відповідно до DateOnly / DateTime в C#).
 */
export interface RawTemplateDataSetUpSertDto {
  name: string;
  isParentDocUsed: boolean;
  parentDocNumber?: string | null;
  parentDocDate?: string | null; // DateOnly → 'yyyy-MM-dd'
  docNumber: string;
  docDate: string;               // DateOnly → 'yyyy-MM-dd'
  isPublished: boolean;
}

/**
 * Сирий JSON-відповідь сервера до десеріалізації —
 * дати представлені як string (відповідно до DateOnly / DateTime в C#).
 */
export interface RawTemplateDataSetDto {
  id: string;
  name: string;
  isParentDocUsed: boolean;
  parentDocNumber: string | null;
  parentDocDate: string | null;  // DateOnly → 'yyyy-MM-dd'
  docNumber: string;
  docDate: string;               // DateOnly → 'yyyy-MM-dd'
  isPublished: boolean;
  publishedAtUtc: string | null; // DateTime → ISO 8601
  createdAtUtc: string;          // DateTime → ISO 8601
  validFrom: string;             // DateTime → ISO 8601
}

// === Утиліти ===
export class TemplateDataSetUtils {
  /**
   * Валідує DataSet перед відправкою
   */
  static validate(dataSet: TemplateDataSetCreateDto): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!dataSet.name || dataSet.name.trim() === '') {
      errors.push("Назва набору даних обов'язкова");
    }

    if (dataSet.name.length > 150) {
      errors.push('Назва не повинна перевищувати 150 символів');
    }

    if (!dataSet.docNumber || dataSet.docNumber.trim() === '') {
      errors.push("Номер документу обов'язковий");
    }

    if (!dataSet.docDate) {
      errors.push("Дата документу обов'язкова");
    }

    // ✅ Валідація ParentDoc полів (аналогічно серверу)
    if (dataSet.isParentDocUsed) {
      if (!dataSet.parentDocNumber || dataSet.parentDocNumber.trim() === '') {
        errors.push("Номер документу старшого начальника обов'язковий, якщо документ існує");
      }
      if (!dataSet.parentDocDate) {
        errors.push("Дата документу старшого начальника обов'язкова, якщо документ існує");
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}
