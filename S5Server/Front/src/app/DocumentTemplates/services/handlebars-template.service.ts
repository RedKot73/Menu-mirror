import { Injectable } from '@angular/core';
import Handlebars from 'handlebars';
import { DatasetData, TemplateRenderResult } from '../models/template.types';
//import { /*DocTemplateUtils,*/ TemplateFormat } from '../models/shared.models';

/*
export interface ClientTemplateProcessor {
  format: TemplateFormat.Html | TemplateFormat.Txt;
  supportsClientRendering: true;
}

export interface ServerTemplateProcessor {
  format: TemplateFormat.Docx; //| TemplateFormat.Pdf;
  supportsClientRendering: false;
}

export type TemplateProcessor = ClientTemplateProcessor | ServerTemplateProcessor;
*/

@Injectable({
  providedIn: 'root'
})
export class HandlebarsTemplateService {

  constructor() {
    this.registerHelpers();
  }

  /**
   * Получает процессор для указанного формата
   */
  /*
  getTemplateProcessor(format: TemplateFormat): TemplateProcessor {
    if (format === TemplateFormat.Html || format === TemplateFormat.Txt) {
      return {
        format: format,
        supportsClientRendering: true
      };
    }
    
    return {
      format: format,
      supportsClientRendering: false
    };
  }
  */

  /**
   * Компилирует и рендерит шаблон с данными на клиенте (только для HTML/TXT)
   */
  renderTemplate(templateContent: string, data: DatasetData/*, format: TemplateFormat*/): TemplateRenderResult {
    try {
      /*
      // Проверяем поддержку клиентского рендеринга
      if (!DocTemplateUtils.supportsClientRendering(format)) {
        return {
          success: false,
          error: `Формат ${format} не поддерживает клиентский рендеринг. Используйте серверный API.`
        };
      }
      */

      // Валидация шаблона
      /*
      const validation = this.validateTemplate(templateContent);
      if (!validation.isValid) {
        return {
          success: false,
          error: `Ошибка в шаблоне: ${validation.errors.join(', ')}`
        };
      }
      */
      //data = { title: "My New Post", body: "This is my first post!" }

      // Компиляция шаблона
      const template = Handlebars.compile(templateContent);
      
      // Рендеринг с данными
      const renderedContent = template(data);
      
      return {
        success: true,
        content: renderedContent
      };

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка';
      return {
        success: false,
        error: `Ошибка рендеринга: ${errorMessage}`
      };
    }
  }

  /**
   * Валидирует синтаксис Handlebars шаблона
   */
/*  
  validateTemplate(templateContent: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    try {
      // Проверяем компиляцию шаблона
      Handlebars.compile(templateContent);
      
      // Дополнительные проверки синтаксиса
      const brackets = this.checkBracketBalance(templateContent);
      if (!brackets.balanced) {
        errors.push('Несбалансированные скобки в шаблоне');
      }

      // Проверяем парные теги (if/unless с else и /if)
      const tags = this.checkHandlebarsTags(templateContent);
      if (tags.length > 0) {
        errors.push(...tags);
      }

      return {
        isValid: errors.length === 0,
        errors
      };

    } catch (error: any) {
      errors.push(error.message);
      return {
        isValid: false,
        errors
      };
    }
  }
*/
  /**
   * Получает список переменных из шаблона
   */
/*  
  extractTemplateVariables(templateContent: string): string[] {
    const variables = new Set<string>();
    
    // Регулярное выражение для поиска переменных {{variable}}
    const simpleVarRegex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*(?:\.[a-zA-Z_$][a-zA-Z0-9_$]*)*)\s*\}\}/g;
    let match;
    
    while ((match = simpleVarRegex.exec(templateContent)) !== null) {
      const variable = match[1].trim();
      // Исключаем служебные помощники
      if (!this.isHandlebarsHelper(variable)) {
        variables.add(variable);
      }
    }

    // Ищем переменные в блочных помощниках like {{#each items}}
    const blockVarRegex = /\{\{\\#(?:each|with)\s+([a-zA-Z_$][a-zA-Z0-9_$]*(?:\.[a-zA-Z_$][a-zA-Z0-9_$]*)*)/g;
    while ((match = blockVarRegex.exec(templateContent)) !== null) {
      variables.add(match[1].trim());
    }

    return Array.from(variables).sort();
  }
*/
  /**
   * Создает пример данных на основе переменных в шаблоне
   */
/*  
  generateSampleData(templateContent: string): any {
    const variables = this.extractTemplateVariables(templateContent);
    const sampleData: any = {};

    variables.forEach(variable => {
      const parts = variable.split('.');
      let current = sampleData;
      
      for (let i = 0; i < parts.length - 1; i++) {
        if (!current[parts[i]]) {
          current[parts[i]] = {};
        }
        current = current[parts[i]];
      }
      
      const lastPart = parts[parts.length - 1];
      current[lastPart] = this.getSampleValueForVariable(variable);
    });

    return sampleData;
  }
*/
  /**
   * Регистрирует кастомные помощники Handlebars
   */
  private registerHelpers(): void {
    // Помощник для форматирования дат
    Handlebars.registerHelper('formatDate', function(date: any, format: string) {
      if (!date) {return '';}
      
      const d = new Date(date);
      if (isNaN(d.getTime())) {return date;}
      
      switch (format) {
        case 'short':
          return d.toLocaleDateString('ru-RU');
        case 'long':
          return d.toLocaleDateString('ru-RU', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          });
        case 'datetime':
          return d.toLocaleString('ru-RU');
        default:
          return d.toLocaleDateString('ru-RU');
      }
    });

    // Помощник для форматирования чисел
    Handlebars.registerHelper('formatNumber', function(number: any, decimals?: number) {
      if (typeof number !== 'number') {return number;}
      return number.toLocaleString('ru-RU', { 
        minimumFractionDigits: decimals || 0,
        maximumFractionDigits: decimals || 2
      });
    });

    // Помощник для условий с операторами
    Handlebars.registerHelper('ifCond', function(this: any, v1: any, operator: string, v2: any, options: any) {
      switch (operator) {
        case '==':
          return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '===':
          return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
          return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '!==':
          return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
          return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
          return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
          return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
          return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        default:
          return options.inverse(this);
      }
    });

    // Помощник для индексов в циклах
    Handlebars.registerHelper('inc', function(value: number) {
      return value + 1;
    });
  }
/*
  private checkBracketBalance(content: string): { balanced: boolean } {
    let count = 0;
    let inHandlebars = false;
    
    for (let i = 0; i < content.length - 1; i++) {
      if (content[i] === '{' && content[i + 1] === '{') {
        count++;
        inHandlebars = true;
        i++; // Пропускаем следующий символ
      } else if (content[i] === '}' && content[i + 1] === '}' && inHandlebars) {
        count--;
        i++; // Пропускаем следующий символ
      }
    }
    
    return { balanced: count === 0 };
  }

  private checkHandlebarsTags(content: string): string[] {
    const errors: string[] = [];
    const stack: string[] = [];
    
    // Ищем открывающие и закрывающие теги
    const tagRegex = /\{\{\s*([#\\/]?)(\w+).*?\}\}/g;
    let match;
    
    while ((match = tagRegex.exec(content)) !== null) {
      const prefix = match[1];
      const tagName = match[2];
      
      if (prefix === '#') {
        // Открывающий тег
        stack.push(tagName);
      } else if (prefix === '/') {
        // Закрывающий тег
        if (stack.length === 0) {
          errors.push(`Неожиданный закрывающий тег: {{/${tagName}}}`);
        } else {
          const expected = stack.pop();
          if (expected !== tagName) {
            errors.push(`Несоответствие тегов: ожидался {{/${expected}}}, найден {{/${tagName}}}`);
          }
        }
      }
    }
    
    // Проверяем незакрытые теги
    if (stack.length > 0) {
      errors.push(`Незакрытые теги: ${stack.map(tag => `{{#${tag}}}`).join(', ')}`);
    }
    
    return errors;
  }
*/
  private isHandlebarsHelper(variable: string): boolean {
    const helpers = ['if', 'unless', 'each', 'with', 'lookup', 'log', 'formatDate', 'formatNumber', 'ifCond', 'inc'];
    return helpers.includes(variable.split('.')[0]);
  }
/*
  private getSampleValueForVariable(variable: string): any {
    const varName = variable.toLowerCase();
    
    // Примеры данных на основе имени переменной
    if (varName.includes('date') || varName.includes('дата')) {
      return new Date().toISOString();
    }
    if (varName.includes('name') || varName.includes('имя') || varName.includes('название')) {
      return 'Пример названия';
    }
    if (varName.includes('email') || varName.includes('почта')) {
      return 'example@example.com';
    }
    if (varName.includes('phone') || varName.includes('телефон')) {
      return '+7 (999) 123-45-67';
    }
    if (varName.includes('amount') || varName.includes('sum') || varName.includes('сумма')) {
      return 1000.50;
    }
    if (varName.includes('count') || varName.includes('количество')) {
      return 5;
    }
    if (varName.includes('list') || varName.includes('items') || varName.includes('элементы')) {
      return ['Элемент 1', 'Элемент 2', 'Элемент 3'];
    }
    
    return 'Пример значения';
  }
  */
}