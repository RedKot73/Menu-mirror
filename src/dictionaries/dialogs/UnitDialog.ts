import { ChangeDetectionStrategy, Component, Inject, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { forkJoin } from 'rxjs';

import { DictForcesTypeService, DictForcesType } from "../../ServerService/dictForcesType.service";
import { UnitDto, UnitService } from "../../ServerService/unit.service";
import { DictUnitTypeService, DictUnitType } from "../../ServerService/dictUnitType.service";

@Component({
    selector: 'unit-dialog',
    imports: [
        MatFormFieldModule, 
        MatInputModule, 
        MatDialogModule, 
        MatButtonModule, 
        FormsModule,
        MatSelectModule,
        MatOptionModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <h2 mat-dialog-title>{{ data.id ? 'Редагувати підрозділ' : 'Створити новий підрозділ' }}</h2>
    <div mat-dialog-content class="content">
      <mat-form-field appearance="outline" floatLabel="always">
        <mat-label>Назва підрозділу</mat-label>
        <input matInput [(ngModel)]="data.name" required>
      </mat-form-field>
      
      <mat-form-field appearance="outline" floatLabel="always">
        <mat-label>Скорочена назва</mat-label>
        <input matInput [(ngModel)]="data.shortName" required>
      </mat-form-field>
      
      <mat-form-field appearance="outline" floatLabel="always">
        <mat-label>Номер військової частини (В/Ч)</mat-label>
        <input matInput [(ngModel)]="data.militaryNumber">
      </mat-form-field>
      
      <mat-form-field appearance="outline" floatLabel="always">
        <mat-label>Основний підрозділ</mat-label>
        <mat-select [(ngModel)]="data.parentId">
          <mat-option [value]="null">Без підпорядкування</mat-option>
          @for (unit of availableParentUnits; track unit.id) {
            <mat-option [value]="unit.id">{{ unit.shortName }}</mat-option>
          }
        </mat-select>
      </mat-form-field>
      
      <mat-form-field appearance="outline" floatLabel="always">
        <mat-label>Приданий до підрозділу</mat-label>
        <mat-select [(ngModel)]="data.assignedUnitId">
          <mat-option [value]="null">Не приданий</mat-option>
          @for (unit of availableAssignedUnits; track unit.id) {
            <mat-option [value]="unit.id">{{ unit.shortName }}</mat-option>
          }
        </mat-select>
      </mat-form-field>
      
      <mat-form-field appearance="outline" floatLabel="always">
        <mat-label>Вид збройних сил</mat-label>
        <mat-select [(ngModel)]="data.forceTypeId">
          <mat-option [value]="null">Відсутній</mat-option>
          @for (force of dictForcesTypes; track force.id) {
            <mat-option [value]="force.id">{{ force.value }}</mat-option>
          }
        </mat-select>
      </mat-form-field>
      
      <mat-form-field appearance="outline" floatLabel="always">
        <mat-label>Тип підрозділу</mat-label>
        <mat-select [(ngModel)]="data.unitTypeId">
          <mat-option [value]="null">Відсутній</mat-option>
          @for (unitType of dictUnitTypes; track unitType.id) {
            <mat-option [value]="unitType.id">{{ unitType.value }}</mat-option>
          }
        </mat-select>
      </mat-form-field>
      
      <mat-form-field appearance="outline" floatLabel="always">
        <mat-label>Порядок сортування</mat-label>
        <input matInput [(ngModel)]="data.orderVal" type="number" required>
      </mat-form-field>
      
      <mat-form-field appearance="outline" floatLabel="always">
        <mat-label>Коментар</mat-label>
        <textarea matInput [(ngModel)]="data.comment" rows="3"></textarea>
      </mat-form-field>
    </div>
    <div mat-dialog-actions align="end" class="actions">
      <button mat-button (click)="onCancel()">Відміна</button>
      <button mat-raised-button color="primary" (click)="onSave()" 
              [disabled]="!data.name.trim() || !data.shortName?.trim()">
        Зберегти
      </button>
    </div>`,
    styles: [`
        .content {
            display: grid;
            gap: 12px;
            min-width: 420px;
            max-width: 600px;
            padding-top: 10px !important;
        }
        .content .mat-mdc-form-field { width: 100%; }
        .actions { gap: 8px; }
        textarea {
            resize: vertical;
            min-height: 60px;
        }
    `],
})
export class UnitDialogComponent implements OnInit {
    private unitService = inject(UnitService);
    private dictForcesTypeService = inject(DictForcesTypeService);
    private dictUnitTypeService = inject(DictUnitTypeService);
    private cdr = inject(ChangeDetectorRef);
    availableParentUnits: UnitDto[] = [];
    availableAssignedUnits: UnitDto[] = [];
    dictForcesTypes: DictForcesType[] = [];
    dictUnitTypes: DictUnitType[] = [];

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: UnitDto,
        private ref: MatDialogRef<UnitDialogComponent>
    ) { 
        // Инициализируем значения по умолчанию
        if (!data.orderVal) data.orderVal = 1;
    }

    ngOnInit() {
        // Загружаем список всех подразделений для выбора родительского и приданного
        this.loadData();
    }

    private loadData() {
        // Используем forkJoin для одновременной загрузки всех данных
        forkJoin({
            units: this.unitService.getAll(),
            forces: this.dictForcesTypeService.getAll(),
            unitTypes: this.dictUnitTypeService.getAll()
        }).subscribe(({ units, forces, unitTypes }) => {
            // Исключаем само редактируемое подразделение из списков выбора
            const filteredUnits = units.filter(u => u.id !== this.data.id);
            
            this.availableParentUnits = filteredUnits;
            this.availableAssignedUnits = filteredUnits;
            this.dictForcesTypes = forces;
            this.dictUnitTypes = unitTypes;
            
            // Принудительно обновляем представление после загрузки всех данных
            this.cdr.detectChanges();
        });
    }

    onCancel() { 
        this.ref.close(); 
    }
    
    onSave() { 
        this.ref.close(this.data); 
    }
}