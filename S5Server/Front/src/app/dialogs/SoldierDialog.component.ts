import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { forkJoin } from 'rxjs';

import { SoldierCreateDto } from '../../ServerService/soldier.service';
import { UnitDto, UnitService } from '../../ServerService/unit.service';
import { DictRankService } from '../../ServerService/dictRanks.service';
import { DictPositionService } from '../../ServerService/dictPosition.service';
import { DictSoldierStatesService } from '../../ServerService/dictSoldierStates.service';
import { LookupDto } from '../shared/models/lookup.models';
import { DateMaskDirective } from '../shared/directives/date-mask.directive';
import { UnitSelectDialogComponent } from './UnitSelect-dialog.component';

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
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule,
    MatDatepickerModule,
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

      <!-- Підрозділ -->
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Підрозділ</mat-label>
        <input matInput [value]="unitDisplay" readonly required />
        <button
          mat-icon-button
          matSuffix
          color="primary"
          (click)="openUnitSelect('unit')"
          matTooltip="Вибрати підрозділ"
        >
          <mat-icon>domain</mat-icon>
        </button>
      </mat-form-field>

      <!-- Приданий до підрозділу -->
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Приданий до підрозділу</mat-label>
        <input matInput [value]="assignedUnitDisplay" readonly />
        <button
          mat-icon-button
          matSuffix
          color="primary"
          (click)="openUnitSelect('assigned')"
          matTooltip="Вибрати підрозділ"
        >
          <mat-icon>domain</mat-icon>
        </button>
        @if (model.assignedUnitId) {
          <button mat-icon-button matSuffix (click)="clearUnit('assigned')" matTooltip="Очистити">
            <mat-icon>close</mat-icon>
          </button>
        }
      </mat-form-field>

      <!-- Екіпаж/Група -->
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Екіпаж/Група</mat-label>
        <input matInput [value]="involvedUnitDisplay" readonly />
        <button
          mat-icon-button
          matSuffix
          color="primary"
          (click)="openUnitSelect('involved')"
          matTooltip="Вибрати підрозділ"
        >
          <mat-icon>domain</mat-icon>
        </button>
        @if (model.involvedUnitId) {
          <button mat-icon-button matSuffix (click)="clearUnit('involved')" matTooltip="Очистити">
            <mat-icon>close</mat-icon>
          </button>
        }
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
  private dialog = inject(MatDialog);
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

  // Назви підрозділів для відображення
  unitDisplay = '';
  assignedUnitDisplay = '';
  involvedUnitDisplay = '';

  constructor() {
    this.model = { ...this.data.model };
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
        this.unitDisplay = unit.shortName || unit.name;
      });
    }
    if (this.model.assignedUnitId) {
      this.unitService.getById(this.model.assignedUnitId).subscribe((unit) => {
        this.assignedUnitDisplay = unit.shortName || unit.name;
      });
    }
    if (this.model.involvedUnitId) {
      this.unitService.getById(this.model.involvedUnitId).subscribe((unit) => {
        this.involvedUnitDisplay = unit.shortName || unit.name;
      });
    }
  }

  // ── Вибір підрозділу через діалог ─────

  openUnitSelect(field: 'unit' | 'assigned' | 'involved'): void {
    const titles: Record<string, string> = {
      unit: 'Вибір підрозділу',
      assigned: 'Приданий до підрозділу',
      involved: 'Екіпаж/Група',
    };
    const dialogRef = this.dialog.open(UnitSelectDialogComponent, {
      width: '900px',
      maxHeight: '90vh',
      data: { title: titles[field] },
    });
    dialogRef.afterClosed().subscribe((unit: UnitDto | undefined) => {
      if (unit) {
        const display = unit.shortName || unit.name;
        switch (field) {
          case 'unit':
            this.model.unitId = unit.id;
            this.unitDisplay = display;
            break;
          case 'assigned':
            this.model.assignedUnitId = unit.id;
            this.assignedUnitDisplay = display;
            break;
          case 'involved':
            this.model.involvedUnitId = unit.id;
            this.involvedUnitDisplay = display;
            break;
        }
      }
    });
  }

  clearUnit(field: 'assigned' | 'involved'): void {
    if (field === 'assigned') {
      this.model.assignedUnitId = undefined;
      this.assignedUnitDisplay = '';
    } else {
      this.model.involvedUnitId = undefined;
      this.involvedUnitDisplay = '';
    }
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
