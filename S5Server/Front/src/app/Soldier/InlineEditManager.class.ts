import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, switchMap, startWith, finalize } from 'rxjs/operators';
import { LookupDto } from '../shared/models/lookup.models';
import { UnitTag } from './Soldier.constant';

/**
 * Режими редагування для інлайн-редагування.
 */
export type EditMode =
  | typeof UnitTag.UnitId
  | typeof UnitTag.AssignedId
  | typeof UnitTag.OperationalId;

export interface RowEditState {
  mode: EditMode;
  control: FormControl<string | LookupDto | null>;
  options$: Observable<LookupDto[]>;
  loading: boolean;
}

/**
 * Менеджер стану інлайн-редагування для одного рядка (одна колонка за раз).
 */
export class InlineEditManager {
  constructor(
    private lookupFn: (mode: EditMode, term: string, soldierId: string) => Observable<LookupDto[]>
  ) {}

  private state = new Map<string, RowEditState>();

  ensure(soldierId: string, mode: EditMode, initialValue: string | null): RowEditState {
    const existing = this.state.get(soldierId);
    if (existing && existing.mode === mode) {
      return existing;
    }

    return this.start(soldierId, mode, initialValue);
  }

  isMode(soldierId: string, mode: EditMode): boolean {
    return this.state.get(soldierId)?.mode === mode;
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

  private start(soldierId: string, mode: EditMode, initialValue: string | null): RowEditState {
    const control = new FormControl<string | LookupDto | null>(initialValue ?? '');

    const options$ = control.valueChanges.pipe(
      startWith(initialValue ?? ''),
      debounceTime(300),
      switchMap((value: string | LookupDto | null) => {
        const term = this.extractTerm(value);

        if (term.length < 2) {
          this.setLoading(soldierId, false);
          return of([]);
        }

        this.setLoading(soldierId, true);
        return this.lookupFn(mode, term, soldierId).pipe(
          finalize(() => this.setLoading(soldierId, false))
        );
      })
    );

    const nextState: RowEditState = { mode, control, options$, loading: false };
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
