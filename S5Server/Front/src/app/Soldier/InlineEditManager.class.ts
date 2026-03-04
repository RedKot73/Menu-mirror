import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, startWith, finalize } from 'rxjs/operators';

import { LookupDto } from '../shared/models/lookup.models';
import { UnitTag } from './Soldier.constant';
import { SoldierService, SoldierDto } from './services/soldier.service';

/**
 * Можливі колонки для інлайн-редагування.
 */
export type EditColumn =
  | typeof UnitTag.UnitId
  | typeof UnitTag.AssignedId
  | typeof UnitTag.InvolvedId;

export interface RowEditState {
  column: EditColumn;
  control: FormControl<string | LookupDto | null>;
  /** Поточні опції для автозаповнення */
  options$: Observable<LookupDto[]>;
  loading: boolean;
}

/** Результат визначення операції оновлення підрозділу */
export interface UnitOperationResult {
  operation: Observable<SoldierDto>;
  message: string;
}

/**
 * Визначає HTTP-операцію для зміни підрозділу бійця.
 * Повертає null, якщо операція неможлива (наприклад, переміщення без вибору підрозділу).
 */
export function resolveUnitOperation(
  soldierService: SoldierService,
  soldierId: string,
  column: EditColumn,
  selectedUnit: LookupDto | null,
): UnitOperationResult | null {
  switch (column) {
    case UnitTag.UnitId:
      if (!selectedUnit) {
        return null;
      }
      return {
        operation: soldierService.move(soldierId, selectedUnit.id),
        message: 'Підрозділ оновлено',
      };
    case UnitTag.AssignedId:
      return {
        operation: soldierService.assignAssigned(soldierId, selectedUnit?.id || null),
        message: 'Придання оновлено',
      };
    case UnitTag.InvolvedId:
      return {
        operation: soldierService.assignInvolved(soldierId, selectedUnit?.id || null),
        message: 'Екіпаж/Група оновлено',
      };
    default:
      return null;
  }
}

/**
 * Менеджер стану інлайн-редагування для одного рядка (одна колонка за раз).
 */
export class InlineEditManager {
  constructor(
    private lookupFn: (
      column: EditColumn,
      term: string,
      soldierId: string,
    ) => Observable<LookupDto[]>,
  ) {}

  /** Функція відображення для mat-autocomplete [displayWith] */
  readonly displayLookupFn = (unit: LookupDto | null): string => (unit ? unit.value : '');

  /** Стан інлайн-редагування для кожного рядка, ключ - soldierId */
  private state = new Map<string, RowEditState>();

  /**
   * Отримати початкове значення з полів SoldierDto для інлайн-редагування.
   */
  static getInitialValue(soldier: SoldierDto, column: EditColumn): string {
    switch (column) {
      case UnitTag.UnitId:
        return soldier.unitShortName || '';
      case UnitTag.AssignedId:
        return soldier.assignedUnitShortName || '';
      case UnitTag.InvolvedId:
        return soldier.involvedUnitShortName || '';
      default:
        return '';
    }
  }

  /** Забезпечує стан інлайн-редагування для заданого солдата та колонки */
  ensure(soldierId: string, column: EditColumn, initialValue: string | null): RowEditState {
    const existing = this.state.get(soldierId);
    if (existing && existing.column === column) {
      return existing;
    }

    return this.start(soldierId, column, initialValue);
  }

  /** Розпочати редагування: очистити інші рядки + створити/отримати стан */
  startEdit(soldierId: string, column: EditColumn, initialValue: string | null): RowEditState {
    this.clearOthers(soldierId);
    return this.ensure(soldierId, column, initialValue);
  }

  /** Отримати FormControl для рядка (скорочення ensure().control) */
  getFormControl(
    soldierId: string,
    column: EditColumn,
    initialValue: string | null,
  ): FormControl<string | LookupDto | null> {
    return this.ensure(soldierId, column, initialValue).control;
  }

  isMode(soldierId: string, column: EditColumn): boolean {
    return this.state.get(soldierId)?.column === column;
  }

  options(soldierId: string): Observable<LookupDto[]> {
    return this.state.get(soldierId)?.options$ ?? of([]);
  }

  loading(soldierId: string): boolean {
    return this.state.get(soldierId)?.loading ?? false;
  }

  clear(soldierId: string) {
    this.state.delete(soldierId);
  }

  /** Очищує стан інлайн-редагування для всіх солдатів, крім вказаного */
  clearOthers(exceptSoldierId: string) {
    for (const key of Array.from(this.state.keys())) {
      if (key !== exceptSoldierId) {
        this.state.delete(key);
      }
    }
  }

  setLoading(soldierId: string, value: boolean) {
    const current = this.state.get(soldierId);
    if (current) {
      current.loading = value;
    }
  }

  private start(soldierId: string, column: EditColumn, initialValue: string | null): RowEditState {
    const control = new FormControl<string | LookupDto | null>(initialValue ?? '');

    const options$ = control.valueChanges.pipe(
      startWith(initialValue ?? ''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((value: string | LookupDto | null) => {
        const term = this.extractTerm(value);

        if (term.length < 2) {
          this.setLoading(soldierId, false);
          return of([]);
        }

        this.setLoading(soldierId, true);
        return this.lookupFn(column, term, soldierId).pipe(
          finalize(() => this.setLoading(soldierId, false)),
        );
      }),
    );

    const nextState: RowEditState = { column: column, control, options$, loading: false };
    this.state.set(soldierId, nextState);
    return nextState;
  }

  private extractTerm(value: string | LookupDto | null): string {
    if (typeof value === 'string') {
      return value;
    }

    if (value && typeof value === 'object' && 'value' in value) {
      return value.value ?? '';
    }

    return '';
  }
}
