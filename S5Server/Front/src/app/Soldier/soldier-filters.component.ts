import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { UnitDto } from '../../ServerService/unit.service';

@Component({
    selector: 'soldier-filters',
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatOptionModule,
        MatIconModule,
        FormsModule
    ],
    template: `
        <div class="filters-container">
            <mat-form-field appearance="outline" class="search-field">
                <mat-label>Пошук за ПІБ</mat-label>
                <input matInput 
                       [(ngModel)]="searchText" 
                       (ngModelChange)="onSearchInput()"
                       placeholder="Введіть прізвище, ім'я або позивний">
                <mat-icon matSuffix>search</mat-icon>
            </mat-form-field>

            <mat-form-field appearance="outline" class="filter-field">
                <mat-label>Приданий до</mat-label>
                <mat-select [(ngModel)]="selectedAssignedUnitId" (ngModelChange)="onAssignedUnitFilterChange()">
                    <mat-option [value]="''">Всі</mat-option>
                    <mat-option [value]="'null'">Не придані</mat-option>
                    @for (unit of allUnits; track unit.id) {
                        <mat-option [value]="unit.id">{{ unit.shortName }}</mat-option>
                    }
                </mat-select>
            </mat-form-field>

            <div class="action-buttons">
                <button mat-raised-button color="primary" (click)="reload.emit()">
                    <mat-icon>refresh</mat-icon>
                    Оновити
                </button>
                <button mat-raised-button color="accent" (click)="add.emit()">
                    <mat-icon>person_add</mat-icon>
                    Додати бійця
                </button>
            </div>
        </div>
    `,
    styles: [`
        .filters-container {
            display: flex;
            gap: 16px;
            align-items: flex-end;
            flex-wrap: wrap;
            margin-bottom: 16px;
            padding: 16px;
            background: #f5f5f5;
            border-radius: 8px;
        }
        
        .search-field {
            min-width: 300px;
            flex: 1;
        }
        
        .filter-field {
            min-width: 200px;
        }
        
        .action-buttons {
            display: flex;
            gap: 8px;
        }
        
        @media (max-width: 768px) {
            .filters-container {
                flex-direction: column;
                align-items: stretch;
            }
            
            .search-field,
            .filter-field {
                min-width: unset;
                width: 100%;
            }
            
            .action-buttons {
                justify-content: center;
            }
        }
    `]
})
export class SoldierFiltersComponent {
    @Input() allUnits: UnitDto[] = [];
    @Output() searchChanged = new EventEmitter<string>();
    @Output() assignedUnitFilterChanged = new EventEmitter<string | null>();
    @Output() reload = new EventEmitter<void>();
    @Output() add = new EventEmitter<void>();

    searchText = '';
    selectedUnitId: string | null = '';
    selectedAssignedUnitId: string | null = '';

    private searchSubject = new Subject<string>();

    constructor() {
        // Настраиваем debounce для поиска
        this.searchSubject.pipe(
            debounceTime(500),
            distinctUntilChanged()
        ).subscribe(searchText => {
            this.searchChanged.emit(searchText);
        });
    }

    onSearchInput() {
        this.searchSubject.next(this.searchText);
    }

    onAssignedUnitFilterChange() {
        let assignedUnitId: string | null;
        if (this.selectedAssignedUnitId === '') {
            assignedUnitId = null; // Все
        } else if (this.selectedAssignedUnitId === 'null') {
            assignedUnitId = 'null'; // Не придані
        } else {
            assignedUnitId = this.selectedAssignedUnitId;
        }
        this.assignedUnitFilterChanged.emit(assignedUnitId);
    }
}