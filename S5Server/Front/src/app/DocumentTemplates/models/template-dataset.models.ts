// Модели для работы с TemplateDataSet и UnitTask API

// === TemplateDataSet Models (Заголовок документа) ===

/**
 * DTO для передачи данных TemplateDataSet
 * Відповідає серверному TemplateDataSetDto
 */
export interface TemplateDataSetDto {
  id: string;
  name: string;
  isParentDocUsed: boolean; // Чи існує документ старшого начальника
  parentDocNumber?: string | null; // Номер документу старшого начальника (nullable)
  parentDocDate?: string | null; // Дата документу старшого начальника (ISO date string, nullable)
  docNumber: string; // Номер документу
  docDate: string; // Дата документу (ISO date string)
  isPublished: boolean;
  publishedAtUtc?: string; // ISO date string
  createdAtUtc: string; // ISO date string
  validFrom: string; // ISO date string
}

/**
 * DTO для створення/оновлення TemplateDataSet
 */
export interface TemplateDataSetUpSertDto {
  name: string;
  isParentDocUsed: boolean;
  parentDocNumber?: string | null; // Nullable, обов'язковий тільки якщо isParentDocUsed = true
  parentDocDate?: string | null; // Nullable, обов'язковий тільки якщо isParentDocUsed = true
  docNumber: string;
  docDate: string; // ISO date string
  isPublished: boolean;
}

// === UnitTask Models (Snap-shot підрозділу з завданням) ===

/**
 * DTO для створення UnitTask
 */
export interface UnitTaskCreateDto {
  dataSetId: string;
  unitId: string;
  taskId: string;
  areaId: string;
}

/**
 * Базовий DTO для UnitTask (без списку бійців)
 * Відповідає серверному UnitTaskDto
 */
export interface UnitTaskDto {
  id: string;
  dataSetId?: string;
  unitId: string;
  unitShortName: string;
  parentId?: string;
  parentShortName: string;
  assignedUnitId?: string;
  assignedShortName?: string;
  unitTypeId?: string;
  unitTypeName?: string;
  isInvolved: boolean;
  persistentLocationId?: string;
  persistentLocationValue?: string;
  taskId: string;
  taskValue: string;
  areaId: string;
  areaValue?: string; // ✅ Назва району
  meansCount: number; // ✅ Кількість засобів (Master-Detail)
  means?: DroneModelTaskDto[]; // ✅ OPTIONAL: завантажується окремо при розгортанні
  isPublished: boolean;
  publishedAtUtc?: string;
  changedBy: string;
  validFrom: string;
}

// SoldierTaskDto — визначено у soldierTask.service.ts (extends SoldierBaseDto)

/**
 * DTO для моделі БПЛА в завданні підрозділу
 */
export interface DroneModelTaskDto {
  id: string;
  unitTaskId: string;
  droneModelId: string;
  droneModelValue: string;
  droneTypeName: string;
  quantity: number;
}

// === Утиліти ===
export class TemplateDataSetUtils {
  /**
   * Валідує DataSet перед відправкою
   */
  static validate(dataSet: TemplateDataSetUpSertDto): { valid: boolean; errors: string[] } {
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
