import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  inject,
  ChangeDetectorRef,
} from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { forkJoin, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, startWith, finalize } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';

import { SoldierDto } from '../Soldier/services/soldier.service';
import { UnitService } from '../Unit/services/unit.service';
import { DictRankService } from '../../ServerService/dictRanks.service';
import { DictPositionService } from '../../ServerService/dictPosition.service';
import { DictSoldierStatesService } from '../../ServerService/dictSoldierStates.service';
import { LookupDto } from '../shared/models/lookup.models';

@Component({
  selector: 'soldier-dialog',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    AsyncPipe,
  ],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './SoldierDialog.html',
  styleUrl: './SoldierDialog.scss',
})
export class SoldierDialogComponent implements OnInit {
  private unitService = inject(UnitService);
  private dictRankService = inject(DictRankService);
  private dictPositionService = inject(DictPositionService);
  private dictSoldierStatesService = inject(DictSoldierStatesService);
  private cdr = inject(ChangeDetectorRef);

  dictRanks: LookupDto[] = [];
  dictPositions: LookupDto[] = [];
  dictStates: LookupDto[] = [];

  // Для автокомплита основного подразделения
  unitSearchControl = new FormControl<LookupDto | string | null>(null);
  filteredUnits: Observable<LookupDto[]>;
  isLoadingUnits = false;
  selectedUnit: LookupDto | null = null;

  // Для автокомплита приданного подразделения
  assignedUnitSearchControl = new FormControl<LookupDto | string | null>(null);
  filteredAssignedUnits: Observable<LookupDto[]>;
  isLoadingAssignedUnits = false;
  selectedAssignedUnit: LookupDto | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: SoldierDto,
    private ref: MatDialogRef<SoldierDialogComponent>
  ) {
    // Настраиваем автокомплит для основного подразделения
    this.filteredUnits = this.unitSearchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((value) => {
        const searchTerm =
          typeof value === 'string'
            ? value
            : value && typeof value === 'object' && 'value' in value
            ? value.value
            : '';
        if (searchTerm && searchTerm.length >= 2) {
          this.isLoadingUnits = true;
          return this.unitService
            .lookup(searchTerm, 10)
            .pipe(finalize(() => (this.isLoadingUnits = false)));
        }
        return of([]);
      })
    );

    // Настраиваем автокомплит для приданного подразделения
    this.filteredAssignedUnits = this.assignedUnitSearchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((value) => {
        const searchTerm =
          typeof value === 'string'
            ? value
            : value && typeof value === 'object' && 'value' in value
            ? value.value
            : '';
        if (searchTerm && searchTerm.length >= 2) {
          this.isLoadingAssignedUnits = true;
          return this.unitService
            .lookup(searchTerm, 10)
            .pipe(finalize(() => (this.isLoadingAssignedUnits = false)));
        }
        return of([]);
      })
    );
  }

  ngOnInit() {
    this.loadData();

    // Если уже есть unitId, найдем и установим соответствующий объект
    if (this.data.unitId) {
      this.unitService.getById(this.data.unitId).subscribe((unit) => {
        this.selectedUnit = { id: unit.id, value: unit.shortName || unit.name };
        this.unitSearchControl.setValue(this.selectedUnit);
      });
    }

    // Если уже есть assignedUnitId, найдем и установим соответствующий объект
    if (this.data.assignedUnitId) {
      this.unitService.getById(this.data.assignedUnitId).subscribe((assignedUnit) => {
        this.selectedAssignedUnit = {
          id: assignedUnit.id,
          value: assignedUnit.shortName || assignedUnit.name,
        };
        this.assignedUnitSearchControl.setValue(this.selectedAssignedUnit);
      });
    }
  }

  private loadData() {
    // Используем forkJoin для одновременной загрузки всех данных
    forkJoin({
      ranks: this.dictRankService.getSelectList(),
      positions: this.dictPositionService.getSelectList(),
      states: this.dictSoldierStatesService.getSelectList(),
    }).subscribe(({ ranks, positions, states }) => {
      this.dictRanks = ranks;
      this.dictPositions = positions;
      this.dictStates = states;

      // Принудительно обновляем представление после загрузки всех данных
      this.cdr.detectChanges();
    });
  }

  // Методы для автокомплита основного подразделения
  displayUnitFn = (unit: LookupDto | null): string => {
    return unit ? unit.value : '';
  };

  onUnitSelected(event: { option: { value: LookupDto | null } }) {
    const selectedUnit = event.option.value;
    this.selectedUnit = selectedUnit;
    this.data.unitId = selectedUnit ? selectedUnit.id : '';
  }

  // Методы для автокомплита приданного подразделения
  displayAssignedUnitFn = (assignedUnit: LookupDto | null): string => {
    return assignedUnit ? assignedUnit.value : '';
  };

  onAssignedUnitSelected(event: { option: { value: LookupDto | null } }) {
    const selectedUnit = event.option.value;
    this.selectedAssignedUnit = selectedUnit;
    this.data.assignedUnitId = selectedUnit ? selectedUnit.id : undefined;
  }

  onArrivedAtChange(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      this.data.arrivedAt = event.value;
    }
  }

  onDepartedAtChange(event: MatDatepickerInputEvent<Date>) {
    this.data.departedAt = event.value || undefined;
  }

  isFormValid(): boolean {
    return !!(
      this.data.firstName?.trim() &&
      this.data.unitId &&
      this.data.rankId &&
      this.data.positionId &&
      this.data.stateId
    );
  }

  onCancel() {
    this.ref.close();
  }

  onSave() {
    this.ref.close({ data: this.data, continue: false });
  }

  onSaveAndContinue() {
    this.ref.close({ data: this.data, continue: true });
  }
}
