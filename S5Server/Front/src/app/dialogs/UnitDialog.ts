import { ChangeDetectionStrategy, Component, Inject, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { forkJoin, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, startWith, finalize } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';

import { DictForcesTypeService, DictForcesType } from "../../ServerService/dictForcesType.service";
import { UnitDto, UnitService } from "../../ServerService/unit.service";
import { DictUnitTypeService, DictUnitType } from "../../ServerService/dictUnitType.service";
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
        AsyncPipe
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
        <input type="text" 
               matInput 
               [formControl]="parentSearchControl" 
               [matAutocomplete]="parentAuto"
               placeholder="Батьківський підрозділ">
        <mat-autocomplete #parentAuto="matAutocomplete" 
                          [displayWith]="displayParentFn"
                          (optionSelected)="onParentSelected($event)">
          <mat-option [value]="null">Без підпорядкування</mat-option>
          @if (isLoadingParents) {
            <mat-option disabled>Завантаження...</mat-option>
          }
          @for (unit of filteredParentUnits | async; track unit.id) {
            <mat-option [value]="unit">{{ unit.value }}</mat-option>
          }
        </mat-autocomplete>
      </mat-form-field>
      
      <mat-form-field appearance="outline" floatLabel="always">
        <mat-label>Приданий до підрозділу</mat-label>
        <input type="text" 
               matInput 
               [formControl]="assignedSearchControl" 
               [matAutocomplete]="assignedAuto"
               placeholder="Приданий до підрозділу">
        <mat-autocomplete #assignedAuto="matAutocomplete" 
                          [displayWith]="displayAssignedFn"
                          (optionSelected)="onAssignedSelected($event)">
          <mat-option [value]="null">Не приданий</mat-option>
          @if (isLoadingAssigned) {
            <mat-option disabled>Завантаження...</mat-option>
          }
          @for (unit of filteredAssignedUnits | async; track unit.id) {
            <mat-option [value]="unit">{{ unit.value }}</mat-option>
          }
        </mat-autocomplete>
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
    
    dictForcesTypes: DictForcesType[] = [];
    dictUnitTypes: DictUnitType[] = [];
    
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

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: UnitDto,
        private ref: MatDialogRef<UnitDialogComponent>
    ) { 
        // Инициализируем значения по умолчанию
        if (!data.orderVal) data.orderVal = 1;
        
        // Настраиваем автокомплит для родительского подразделения
        this.filteredParentUnits = this.parentSearchControl.valueChanges.pipe(
            startWith(''),
            debounceTime(300),
            distinctUntilChanged(),
            switchMap(value => {
                const searchTerm = typeof value === 'string' ? value : 
                                 (value && typeof value === 'object' && 'value' in value) ? value.value : '';
                if (searchTerm && searchTerm.length >= 2) {
                    this.isLoadingParents = true;
                    return this.unitService.lookup(searchTerm, 10).pipe(
                        finalize(() => this.isLoadingParents = false)
                    );
                }
                return of([]);
            })
        );
        
        // Настраиваем автокомплит для приданного подразделения
        this.filteredAssignedUnits = this.assignedSearchControl.valueChanges.pipe(
            startWith(''),
            debounceTime(300),
            distinctUntilChanged(),
            switchMap(value => {
                const searchTerm = typeof value === 'string' ? value : 
                                 (value && typeof value === 'object' && 'value' in value) ? value.value : '';
                if (searchTerm && searchTerm.length >= 2) {
                    this.isLoadingAssigned = true;
                    return this.unitService.lookup(searchTerm, 10).pipe(
                        finalize(() => this.isLoadingAssigned = false)
                    );
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
            this.unitService.getById(this.data.parentId).subscribe(parent => {
                this.selectedParent = { id: parent.id, value: parent.shortName || parent.name };
                this.parentSearchControl.setValue(this.selectedParent);
            });
        }
        
        // Если уже есть assignedUnitId, найдем и установим соответствующий объект
        if (this.data.assignedUnitId) {
            this.unitService.getById(this.data.assignedUnitId).subscribe(assigned => {
                this.selectedAssigned = { id: assigned.id, value: assigned.shortName || assigned.name };
                this.assignedSearchControl.setValue(this.selectedAssigned);
            });
        }
    }

    private loadData() {
        // Используем forkJoin для одновременной загрузки всех данных
        forkJoin({
            forces: this.dictForcesTypeService.getAll(),
            unitTypes: this.dictUnitTypeService.getAll()
        }).subscribe(({ forces, unitTypes }) => {
            this.dictForcesTypes = forces;
            this.dictUnitTypes = unitTypes;
            
            // Принудительно обновляем представление после загрузки всех данных
            this.cdr.detectChanges();
        });
    }

    // Методы для автокомплита родительского подразделения
    displayParentFn = (parent: LookupDto | null): string => {
        return parent ? parent.value : '';
    }

    onParentSelected(event: any) {
        const selectedUnit = event.option.value as LookupDto | null;
        this.selectedParent = selectedUnit;
        this.data.parentId = selectedUnit ? selectedUnit.id : undefined;
    }
    
    // Методы для автокомплита приданного подразделения
    displayAssignedFn = (assigned: LookupDto | null): string => {
        return assigned ? assigned.value : '';
    }

    onAssignedSelected(event: any) {
        const selectedUnit = event.option.value as LookupDto | null;
        this.selectedAssigned = selectedUnit;
        this.data.assignedUnitId = selectedUnit ? selectedUnit.id : undefined;
    }

    onCancel() { 
        this.ref.close(); 
    }
    
    onSave() { 
        this.ref.close(this.data); 
    }
}