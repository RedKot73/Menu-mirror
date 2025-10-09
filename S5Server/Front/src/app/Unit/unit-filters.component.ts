import { Component, input, output, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { UnitDto } from '../../ServerService/unit.service';
import { NULL_GUID } from './unit.constants';

@Component({
    selector: 'unit-filters',
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatOptionModule,
        MatButtonModule,
        FormsModule
    ],
    template: `
        <div class="filters">
            <mat-form-field appearance="outline">
                <mat-label>Пошук</mat-label>
                <input matInput 
                       [(ngModel)]="searchText" 
                       (input)="onSearchChange()" 
                       placeholder="Назва або скорочення">
            </mat-form-field>
            
            <mat-form-field appearance="outline">
                <mat-label>Фільтр по батьківському підрозділу</mat-label>
                <mat-select [(ngModel)]="selectedParentId" (selectionChange)="onParentFilterChange()">
                    <mat-option [value]="">Всі підрозділи</mat-option>
                    <mat-option [value]="NULL_GUID">Без підпорядкування</mat-option>
                    @for (unit of allUnits(); track unit.id) {
                        <mat-option [value]="unit.id">{{ unit.shortName }}</mat-option>
                    }
                </mat-select>
            </mat-form-field>
            
            <button mat-raised-button color="primary" (click)="onReload()">Оновити</button>
            <button mat-raised-button color="primary" (click)="onAdd()">Створити</button>
        </div>
    `,
    styleUrl: './unit-filters.component.scss'
})
export class UnitFiltersComponent {
    // Константа для шаблона
    readonly NULL_GUID = NULL_GUID;
    
    // Inputs
    allUnits = input.required<UnitDto[]>();
    
    // Outputs
    searchChanged = output<string>();
    parentFilterChanged = output<string | null>();
    reload = output<void>();
    add = output<void>();
    
    // Local state
    searchText = '';
    selectedParentId: string | null = null;
    private searchTimeout?: number;
    
    onSearchChange() {
        // Очищаем предыдущий таймер если он есть
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }
        
        // Устанавливаем задержку 2 секунды для поиска
        this.searchTimeout = setTimeout(() => {
            this.searchChanged.emit(this.searchText);
        }, 2000);
    }
    
    onParentFilterChange() {
        this.parentFilterChanged.emit(this.selectedParentId);
    }
    
    onReload() {
        this.reload.emit();
    }
    
    onAdd() {
        this.add.emit();
    }
}