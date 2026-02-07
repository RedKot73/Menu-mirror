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
  parentDocNumber: string; // Номер документу старшого начальника
  parentDocDate: string; // Дата документу старшого начальника (ISO date string)
  docNumber: string; // Номер документу
  docDate: string; // Дата документу (ISO date string)
  isPublished: boolean;
  publishedAtUtc?: string; // ISO date string
  createdAtUtc: string; // ISO date string
  updatedAtUtc?: string; // ISO date string
}

/**
 * DTO для створення нового TemplateDataSet
 */
export interface TemplateDataSetCreateDto {
  name: string;
  isParentDocUsed?: boolean;
  parentDocNumber?: string;
  parentDocDate?: string; // ISO date string
  docNumber: string;
  docDate: string; // ISO date string
  isPublished?: boolean;
}

/**
 * DTO для оновлення TemplateDataSet
 */
export interface TemplateDataSetUpdateDto {
  name: string;
  isParentDocUsed: boolean;
  parentDocNumber: string;
  parentDocDate: string; // ISO date string
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

/**
 * DTO для snap-shot бійця в UnitTask
 */
export interface SoldierTaskDto {
  id: string;
  unitTaskId: string;
  soldierId: string;
  externId?: number;
  firstName: string;
  midleName?: string;
  lastName?: string;
  fio: string;
  nickName?: string;
  unitId: string;
  unitShortName: string;
  assignedUnitId?: string;
  assignedUnitShortName?: string;
  involvedUnitId?: string;
  involvedUnitShortName?: string;
  rankId: string;
  rankShortValue: string;
  positionId: string;
  positionValue: string;
  stateId: string;
  stateValue: string;
  comment?: string;
  changedBy: string;
  validFrom: string;
}

/**
 * DTO для моделі БПЛА в завданні підрозділу
 */
export interface DroneModelTaskDto {
  id: string;
  unitTaskId: string;
  droneModelId: string;
  droneModelValue: string;
  quantity: number;
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

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Форматує дату для відображення
   */
  static formatDate(dateString: string): string {
    if (!dateString) {
      return '';
    }
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('uk-UA');
    } catch {
      return dateString;
    }
  }
}
