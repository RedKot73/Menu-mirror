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
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, startWith, finalize } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DictForcesTypeService, DictForcesType } from '../../ServerService/dictForcesType.service';
import { ErrorHandler } from '../shared/models/ErrorHandler';
import { UnitDto, UnitService } from '../Unit/services/unit.service';
import { DictUnitTypeService, DictUnitType } from '../../ServerService/dictUnitType.service';
import { LookupDto } from '../shared/models/lookup.models';

@Component({
  selector: 'unit-dialog',
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
    AsyncPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './UnitDialog.html',
  styleUrl: './UnitDialog.scss',
})
export class UnitDialogComponent implements OnInit {
  private unitService = inject(UnitService);
  private dictForcesTypeService = inject(DictForcesTypeService);
  private dictUnitTypeService = inject(DictUnitTypeService);
  private cdr = inject(ChangeDetectorRef);
  private snackBar = inject(MatSnackBar);

  dictForcesTypes: DictForcesType[] = [];

  // Для автокомплита родительского подразделения
  parentSearchControl = new FormControl<LookupDto | string | null>(null);
  filteredParentUnits: Observable<LookupDto[]>;
  isLoadingParents = false;
  selectedParent: LookupDto | null = null;

  // Для автокомплита приданного подразделения
  assignedSearchControl = new FormControl<LookupDto | string | null>(null);
  filteredAssignedUnits: Observable<LookupDto[]>;
  isLoadingAssigned = false;
  selectedAssigned: LookupDto | null = null;

  // Для автокомплита типа подразделения
  unitTypeSearchControl = new FormControl<LookupDto | string | null>(null);
  filteredUnitTypes: Observable<LookupDto[]>;
  isLoadingUnitTypes = false;
  selectedUnitType: LookupDto | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: UnitDto,
    private ref: MatDialogRef<UnitDialogComponent>
  ) {
    // Инициализируем значения по умолчанию
    if (!data.orderVal) {
      data.orderVal = 1;
    }

    // Настраиваем автокомплит для родительского подразделения
    this.filteredParentUnits = this.parentSearchControl.valueChanges.pipe(
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
          this.isLoadingParents = true;
          return this.unitService
            .lookup(searchTerm, 10)
            .pipe(finalize(() => (this.isLoadingParents = false)));
        }
        return of([]);
      })
    );

    // Настраиваем автокомплит для приданного подразделения
    this.filteredAssignedUnits = this.assignedSearchControl.valueChanges.pipe(
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
          this.isLoadingAssigned = true;
          return this.unitService
            .lookup(searchTerm, 10)
            .pipe(finalize(() => (this.isLoadingAssigned = false)));
        }
        return of([]);
      })
    );

    // Настраиваем автокомплит для типа подразделения
    this.filteredUnitTypes = this.unitTypeSearchControl.valueChanges.pipe(
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
          this.isLoadingUnitTypes = true;
          return this.dictUnitTypeService
            .lookup(searchTerm, 10)
            .pipe(finalize(() => (this.isLoadingUnitTypes = false)));
        }
        return of([]);
      })
    );
  }

  ngOnInit() {
    // Загружаем список всех подразделений для выбора родительского и приданного
    this.loadData();

    // Если уже есть parentId, найдем и установим соответствующий объект
    if (this.data.parentId) {
      this.unitService.getById(this.data.parentId).subscribe({
        next: (parent) => {
          this.selectedParent = { id: parent.id, value: parent.shortName || parent.name };
          this.parentSearchControl.setValue(this.selectedParent);
        },
        error: (error) => {
          const errorMessage = ErrorHandler.handleHttpError(
            error,
            'Не вдалося завантажити основний підрозділ'
          );
          this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
        },
      });
    }

    // Если уже есть assignedUnitId, найдем и установим соответствующий объект
    if (this.data.assignedUnitId) {
      this.unitService.getById(this.data.assignedUnitId).subscribe({
        next: (assigned) => {
          this.selectedAssigned = { id: assigned.id, value: assigned.shortName || assigned.name };
          this.assignedSearchControl.setValue(this.selectedAssigned);
        },
        error: (error) => {
          const errorMessage = ErrorHandler.handleHttpError(
            error,
            'Не вдалося завантажити приданий підрозділ'
          );
          this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
        },
      });
    }

    // Если уже есть unitTypeId, найдем и установим соответствующий объект
    if (this.data.unitTypeId) {
      this.dictUnitTypeService.get(this.data.unitTypeId).subscribe({
        next: (unitType: DictUnitType) => {
          this.selectedUnitType = { id: unitType.id, value: unitType.value };
          this.unitTypeSearchControl.setValue(this.selectedUnitType);
        },
        error: (error) => {
          const errorMessage = ErrorHandler.handleHttpError(
            error,
            'Не вдалося завантажити тип підрозділу'
          );
          this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
        },
      });
    }
  }

  private loadData() {
    this.dictForcesTypeService.getAll().subscribe({
      next: (forces) => {
        this.dictForcesTypes = forces;
        this.cdr.detectChanges();
      },
      error: (error) => {
        const errorMessage = ErrorHandler.handleHttpError(
          error,
          'Не вдалося завантажити список видів збройних сил'
        );
        this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
      },
    });
  }

  // Методы для автокомплита родительского подразделения
  displayParentFn = (parent: LookupDto | null): string => {
    return parent ? parent.value : '';
  };

  onParentSelected(event: MatAutocompleteSelectedEvent) {
    const selectedUnit = event.option.value as LookupDto | null;
    this.selectedParent = selectedUnit;
    this.data.parentId = selectedUnit ? selectedUnit.id : undefined;
  }

  // Методы для автокомплита приданного подразделения
  displayAssignedFn = (assigned: LookupDto | null): string => {
    return assigned ? assigned.value : '';
  };

  onAssignedSelected(event: MatAutocompleteSelectedEvent) {
    const selectedUnit = event.option.value as LookupDto | null;
    this.selectedAssigned = selectedUnit;
    this.data.assignedUnitId = selectedUnit ? selectedUnit.id : undefined;
  }

  // Методы для автокомплита типа подразделения
  displayUnitTypeFn = (unitType: LookupDto | null): string => {
    return unitType ? unitType.value : '';
  };

  onUnitTypeSelected(event: MatAutocompleteSelectedEvent) {
    const selectedType = event.option.value as LookupDto | null;
    this.selectedUnitType = selectedType;
    this.data.unitTypeId = selectedType ? selectedType.id : undefined;
  }

  onCancel() {
    this.ref.close();
  }

  onSave() {
    this.ref.close(this.data);
  }
}
