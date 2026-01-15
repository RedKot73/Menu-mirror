// Модели для работы с TemplateDataSet API

import { DictUnitTaskItem } from '../../../ServerService/dictUnitTaskItems.service';
import { UnitDataSetDto } from '../../Unit/services/unit.service';

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

export interface UnitTaskDto extends UnitDataSetDto {
  TaskId: string;
  /** Елементи завдання (DictUnitTaskItem) */
  TaskItems: DictUnitTaskItem[];
  /** Зона виконання завдання */
  AreaId: string;
  /** Зона виконання завдання */
  AreaValue: string;
  /** Перелік засобів ураження */
  Means: string[];
}

/**
 * Полная модель данных документа (сохраняется в dataJson)
 * Использует UnitDataSetDto из unit.service для подразделений
 */
export interface DocumentDataSet {
  parentDocumentDate: string; // ISO date string
  parentDocumentNumber: string;
  documentDate: string; // ISO date string
  documentNumber: string;
  unitsTask: UnitTaskDto[];
  savedAt: string; // ISO date string
}

// Утилиты для работы с TemplateDataSet
export class TemplateDataSetUtils {
  /**
   * Валидирует DataSet перед отправкой
   */
  static validate(dataSet: TemplateDataSetCreateDto): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!dataSet.name || dataSet.name.trim() === '') {
      errors.push('Название набора данных обязательно');
    }

    if (dataSet.name.length > 150) {
      errors.push('Название не должно превышать 150 символов');
    }

    if (!dataSet.dataJson || dataSet.dataJson.trim() === '') {
      errors.push('JSON данные обязательны');
    }

    try {
      JSON.parse(dataSet.dataJson);
    } catch {
      errors.push('JSON данные должны быть в валидном формате');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}
