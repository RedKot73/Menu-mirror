import { ChangeDetectionStrategy, Component, Inject, OnInit, inject } from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, startWith, finalize } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UnitDto } from '../Unit/services/unit.service';
import { DictAreasService } from '../../ServerService/dictAreas.service';
import { LookupDto } from '../shared/models/lookup.models';
import { S5App_ErrorHandler } from '../shared/models/ErrorHandler';
import { PPD_AREA_TYPE_GUID } from '../Unit/unit.constants';

@Component({
  selector: 'app-operational-unit-dialog',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    AsyncPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './OperationalUnitDialog.html',
  styleUrl: './OperationalUnitDialog.scss',
})
export class OperationalUnitDialogComponent implements OnInit {
  private dictAreasService = inject(DictAreasService);
  private snackBar = inject(MatSnackBar);

  // Для автокомпліту пункту постійної дислокації (ППД)
  persistentLocationSearchControl = new FormControl<LookupDto | string | null>(null);
  filteredPersistentLocations: Observable<LookupDto[]>;
  isLoadingPersistentLocations = false;
  selectedPersistentLocation: LookupDto | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: UnitDto,
    private ref: MatDialogRef<OperationalUnitDialogComponent>,
  ) {
    // Синхронізуємо name з shortName
    if (data.shortName) {
      data.name = data.shortName;
    }

    // Настраиваємо автокомпліт для пункту постійної дислокації (ППД)
    this.filteredPersistentLocations = this.persistentLocationSearchControl.valueChanges.pipe(
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
          this.isLoadingPersistentLocations = true;
          // Фільтруємо тільки записи з типом "ППД"
          return this.dictAreasService
            .lookup(searchTerm, PPD_AREA_TYPE_GUID, 10)
            .pipe(finalize(() => (this.isLoadingPersistentLocations = false)));
        }
        return of([]);
      }),
    );
  }

  ngOnInit() {
    // Якщо вже є persistentLocationId, завантажимо та встановимо відповідний об'єкт
    if (this.data.persistentLocationId) {
      this.dictAreasService.getById(this.data.persistentLocationId).subscribe({
        next: (area) => {
          this.selectedPersistentLocation = { id: area.id, value: area.value };
          this.persistentLocationSearchControl.setValue(this.selectedPersistentLocation);
        },
        error: (error) => {
          const errorMessage = S5App_ErrorHandler.handleHttpError(
            error,
            'Не вдалося завантажити пункт постійної дислокації',
          );
          this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
        },
      });
    }
  }

  // Методи для автокомпліту пункту постійної дислокації
  displayPersistentLocationFn = (location: LookupDto | null): string => {
    return location ? location.value : '';
  };

  onPersistentLocationSelected(event: MatAutocompleteSelectedEvent) {
    const selectedLocation = event.option.value as LookupDto | null;
    this.selectedPersistentLocation = selectedLocation;
    this.data.persistentLocationId = selectedLocation ? selectedLocation.id : undefined;
  }

  onShortNameChange() {
    // Автоматично синхронізуємо name з shortName
    this.data.name = this.data.shortName || '';
  }

  onCancel() {
    this.ref.close();
  }

  onSave() {
    // Переконуємось що name = shortName перед збереженням
    this.data.name = this.data.shortName || '';
    this.ref.close(this.data);
  }
}
