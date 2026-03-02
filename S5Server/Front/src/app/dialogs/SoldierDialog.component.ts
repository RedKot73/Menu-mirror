import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { AsyncPipe } from '@angular/common';
import { forkJoin, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, startWith, finalize } from 'rxjs/operators';

import { SoldierCreateDto } from '../Soldier/services/soldier.service';
import { UnitService } from '../Unit/services/unit.service';
import { DictRankService } from '../../ServerService/dictRanks.service';
import { DictPositionService } from '../../ServerService/dictPosition.service';
import { DictSoldierStatesService } from '../../ServerService/dictSoldierStates.service';
import { LookupDto } from '../shared/models/lookup.models';
import { DateMaskDirective } from '../shared/directives/date-mask.directive';

/** Дані, що передаються у діалог */
export interface SoldierDialogData {
  /** ID бійця (для режиму редагування) */
  id?: string;
  /** Модель для створення/редагування */
  model: SoldierCreateDto;
}

/** Результат діалогу */
export interface SoldierDialogResult {
  model: SoldierCreateDto;
  continue: boolean;
}

@Component({
  selector: 'app-soldier-dialog',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    AsyncPipe,
    DateMaskDirective,
  ],
  providers: [provideNativeDateAdapter()],
  template: `
    <h2 mat-dialog-title>{{ data.id ? 'Редагувати бійця' : 'Створити нового бійця' }}</h2>
    <mat-dialog-content class="dialog-content">
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Прізвище</mat-label>
        <input matInput [(ngModel)]="model.firstName" required />
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Ім'я</mat-label>
        <input matInput [(ngModel)]="model.midleName" />
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>По батькові</mat-label>
        <input matInput [(ngModel)]="model.lastName" />
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Позивний</mat-label>
        <input matInput [(ngModel)]="model.nickName" />
      </mat-form-field>

      <!-- Підрозділ (автокомпліт) -->
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Підрозділ</mat-label>
        <input
          matInput
          [formControl]="unitControl"
          [matAutocomplete]="unitAuto"
          placeholder="Основний підрозділ"
          required
        />
        <mat-autocomplete
          #unitAuto="matAutocomplete"
          [displayWith]="displayLookup"
          (optionSelected)="onUnitSelected($event.option.value)"
        >
          @if (loadingUnit) {
            <mat-option disabled>Завантаження...</mat-option>
          }
          @for (unit of filteredUnits | async; track unit.id) {
            <mat-option [value]="unit">{{ unit.value }}</mat-option>
          }
        </mat-autocomplete>
      </mat-form-field>

      <!-- Приданий до підрозділу (автокомпліт) -->
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Приданий до підрозділу</mat-label>
        <input
          matInput
          [formControl]="assignedUnitControl"
          [matAutocomplete]="assignedAuto"
          placeholder="Приданий до підрозділу"
        />
        <mat-autocomplete
          #assignedAuto="matAutocomplete"
          [displayWith]="displayLookup"
          (optionSelected)="onAssignedUnitSelected($event.option.value)"
        >
          <mat-option [value]="null">Не приданий</mat-option>
          @if (loadingAssigned) {
            <mat-option disabled>Завантаження...</mat-option>
          }
          @for (unit of filteredAssigned | async; track unit.id) {
            <mat-option [value]="unit">{{ unit.value }}</mat-option>
          }
        </mat-autocomplete>
      </mat-form-field>

      <!-- Екіпаж/Група (автокомпліт) -->
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Екіпаж/Група</mat-label>
        <input
          matInput
          [formControl]="involvedUnitControl"
          [matAutocomplete]="involvedAuto"
          placeholder="Екіпаж/Група"
        />
        <mat-autocomplete
          #involvedAuto="matAutocomplete"
          [displayWith]="displayLookup"
          (optionSelected)="onInvolvedUnitSelected($event.option.value)"
        >
          <mat-option [value]="null">Не призначено</mat-option>
          @if (loadingInvolved) {
            <mat-option disabled>Завантаження...</mat-option>
          }
          @for (unit of filteredInvolved | async; track unit.id) {
            <mat-option [value]="unit">{{ unit.value }}</mat-option>
          }
        </mat-autocomplete>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Прибув до підрозділу</mat-label>
        <input
          matInput
          appDateMask
          [matDatepicker]="arrivedPicker"
          [value]="model.arrivedAt"
          (dateChange)="onArrivedAtChange($event)"
          required
        />
        <mat-datepicker-toggle matIconSuffix [for]="arrivedPicker"></mat-datepicker-toggle>
        <mat-datepicker #arrivedPicker></mat-datepicker>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Вибув з підрозділу</mat-label>
        <input
          matInput
          appDateMask
          [matDatepicker]="departedPicker"
          [value]="model.departedAt"
          (dateChange)="onDepartedAtChange($event)"
        />
        <mat-datepicker-toggle matIconSuffix [for]="departedPicker"></mat-datepicker-toggle>
        <mat-datepicker #departedPicker></mat-datepicker>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Звання</mat-label>
        <mat-select [(ngModel)]="model.rankId" required>
          @for (rank of dictRanks; track rank.id) {
            <mat-option [value]="rank.id">{{ rank.value }}</mat-option>
          }
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Посада</mat-label>
        <mat-select [(ngModel)]="model.positionId" required>
          @for (pos of dictPositions; track pos.id) {
            <mat-option [value]="pos.id">{{ pos.value }}</mat-option>
          }
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Статус</mat-label>
        <mat-select [(ngModel)]="model.stateId" required>
          @for (state of dictStates; track state.id) {
            <mat-option [value]="state.id">{{ state.value }}</mat-option>
          }
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Коментар</mat-label>
        <textarea matInput [(ngModel)]="model.comment" rows="3"></textarea>
      </mat-form-field>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Відміна</button>
      <button mat-flat-button color="primary" [disabled]="!isFormValid" (click)="save(false)">
        Зберегти
      </button>
      @if (!data.id) {
        <button mat-flat-button color="accent" [disabled]="!isFormValid" (click)="save(true)">
          Зберегти і продовжити
        </button>
      }
    </mat-dialog-actions>
  `,
  styleUrls: ['../../Login/dialogs/dialog-shared.scss'],
  styles: [
    `
      .dialog-content {
        display: grid;
        gap: 4px;
        min-width: 420px;
        max-width: 600px;
      }
      textarea {
        resize: vertical;
        min-height: 60px;
      }
    `,
  ],
})
export class SoldierDialogComponent implements OnInit {
  private dialogRef = inject(MatDialogRef<SoldierDialogComponent>);
  private unitService = inject(UnitService);
  private dictRankService = inject(DictRankService);
  private dictPositionService = inject(DictPositionService);
  private dictStatesService = inject(DictSoldierStatesService);

  readonly data = inject<SoldierDialogData>(MAT_DIALOG_DATA);
  readonly model: SoldierCreateDto;

  // Довідники
  dictRanks: LookupDto[] = [];
  dictPositions: LookupDto[] = [];
  dictStates: LookupDto[] = [];

  // Автокомпліт: підрозділ
  unitControl = new FormControl<LookupDto | string | null>(null);
  filteredUnits!: Observable<LookupDto[]>;
  loadingUnit = false;

  // Автокомпліт: приданий підрозділ
  assignedUnitControl = new FormControl<LookupDto | string | null>(null);
  filteredAssigned!: Observable<LookupDto[]>;
  loadingAssigned = false;

  // Автокомпліт: екіпаж/група
  involvedUnitControl = new FormControl<LookupDto | string | null>(null);
  filteredInvolved!: Observable<LookupDto[]>;
  loadingInvolved = false;

  constructor() {
    // Створюємо копію моделі, щоб не мутувати вхідні дані
    this.model = { ...this.data.model };

    // Налаштовуємо автокомпліт для всіх трьох підрозділів
    this.filteredUnits = this.buildUnitAutocomplete(this.unitControl, 'loadingUnit');
    this.filteredAssigned = this.buildUnitAutocomplete(this.assignedUnitControl, 'loadingAssigned');
    this.filteredInvolved = this.buildUnitAutocomplete(this.involvedUnitControl, 'loadingInvolved');
  }

  ngOnInit(): void {
    this.loadDictionaries();
    this.loadExistingUnits();
  }

  // ── Довідники ─────────────────────────

  private loadDictionaries(): void {
    forkJoin({
      ranks: this.dictRankService.getSelectList(),
      positions: this.dictPositionService.getSelectList(),
      states: this.dictStatesService.getSelectList(),
    }).subscribe(({ ranks, positions, states }) => {
      this.dictRanks = ranks;
      this.dictPositions = positions;
      this.dictStates = states;
    });
  }

  /** Завантажити назви підрозділів для режиму редагування */
  private loadExistingUnits(): void {
    if (this.model.unitId) {
      this.unitService.getById(this.model.unitId).subscribe((unit) => {
        const lookup: LookupDto = { id: unit.id, value: unit.shortName || unit.name };
        this.unitControl.setValue(lookup);
      });
    }
    if (this.model.assignedUnitId) {
      this.unitService.getById(this.model.assignedUnitId).subscribe((unit) => {
        const lookup: LookupDto = { id: unit.id, value: unit.shortName || unit.name };
        this.assignedUnitControl.setValue(lookup);
      });
    }
    if (this.model.involvedUnitId) {
      this.unitService.getById(this.model.involvedUnitId).subscribe((unit) => {
        const lookup: LookupDto = { id: unit.id, value: unit.shortName || unit.name };
        this.involvedUnitControl.setValue(lookup);
      });
    }
  }

  // ── Автокомпліт ───────────────────────

  /** Спільна фабрика потоку автокомпліту для підрозділів */
  private buildUnitAutocomplete(
    control: FormControl<LookupDto | string | null>,
    loadingFlag: 'loadingUnit' | 'loadingAssigned' | 'loadingInvolved',
  ): Observable<LookupDto[]> {
    return control.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((value) => {
        const term = typeof value === 'string' ? value : value?.value ?? '';
        if (term && term.length >= 2) {
          this[loadingFlag] = true;
          return this.unitService
            .lookup(term, 10)
            .pipe(finalize(() => (this[loadingFlag] = false)));
        }
        return of([]);
      }),
    );
  }

  /** Функція відображення для mat-autocomplete */
  displayLookup = (item: LookupDto | null): string => (item ? item.value : '');

  onUnitSelected(unit: LookupDto | null): void {
    this.model.unitId = unit?.id ?? '';
  }

  onAssignedUnitSelected(unit: LookupDto | null): void {
    this.model.assignedUnitId = unit?.id ?? undefined;
  }

  onInvolvedUnitSelected(unit: LookupDto | null): void {
    this.model.involvedUnitId = unit?.id ?? undefined;
  }

  // ── Дати ──────────────────────────────

  onArrivedAtChange(event: MatDatepickerInputEvent<Date>): void {
    if (event.value) {
      this.model.arrivedAt = event.value;
    }
  }

  onDepartedAtChange(event: MatDatepickerInputEvent<Date>): void {
    this.model.departedAt = event.value || undefined;
  }

  // ── Валідація та збереження ────────────

  get isFormValid(): boolean {
    return !!(
      this.model.firstName?.trim() &&
      this.model.unitId &&
      this.model.rankId &&
      this.model.positionId &&
      this.model.stateId
    );
  }

  save(andContinue: boolean): void {
    if (this.isFormValid) {
      this.dialogRef.close({ model: this.model, continue: andContinue } as SoldierDialogResult);
    }
  }
}
