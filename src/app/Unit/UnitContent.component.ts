import { Component, input, output } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { UnitDto } from "../../ServerService/unit.service";

@Component({
    selector: "unit-content",
    standalone: true,
    imports: [
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatDividerModule,
        MatExpansionModule
    ],
    styleUrl: './UnitContent.component.scss',
    template: `
        <div class="main-content">
            @if (selectedUnit(); as unit) {
                <!-- Детальная информация о подразделении -->
                <mat-card class="unit-details-card">
                    <mat-card-header>
                        <mat-card-title>{{ unit.name }}</mat-card-title>
                        <mat-card-subtitle>{{ unit.shortName }}</mat-card-subtitle>
                    </mat-card-header>
                    
                    <mat-card-content>
                        <div class="unit-info-grid">
                            <div class="info-item inline">
                                <strong>Військова частина:</strong>
                                <span>{{ unit.militaryNumber || 'Не вказано' }}</span>
                            </div>
                            
                            <div class="info-item inline">
                                <strong>Тип сил:</strong>
                                <span>{{ unit.forceType || 'Не вказано' }}</span>
                            </div>
                            
                            <div class="info-item inline">
                                <strong>Тип підрозділу:</strong>
                                <span>{{ unit.unitType || 'Не вказано' }}</span>
                            </div>
                            
                            <div class="info-item inline">
                                <strong>Порядок:</strong>
                                <span>{{ unit.orderVal }}</span>
                            </div>
                            
                            @if (unit.parentShortName) {
                                <div class="info-item inline">
                                    <strong>Батьківський підрозділ:</strong>
                                    <span>{{ unit.parentShortName }}</span>
                                </div>
                            }
                            
                            @if (unit.assignedShortName) {
                                <div class="info-item inline">
                                    <strong>Приданий до:</strong>
                                    <span>{{ unit.assignedShortName }}</span>
                                </div>
                            }
                            
                            @if (unit.comment) {
                                <div class="info-item full-width comment">
                                    <strong>Коментар:</strong>
                                    <span>{{ unit.comment }}</span>
                                </div>
                            }
                        </div>
                    </mat-card-content>
                </mat-card>

                <!-- Дополнительные секции с expansion panels -->
                <mat-accordion class="sections-accordion">
                    
                    <mat-expansion-panel class="unit-section-panel">
                        <mat-expansion-panel-header>
                            <mat-panel-title>
                                <mat-icon color="primary">group</mat-icon>
                                Особовий склад
                            </mat-panel-title>
                        </mat-expansion-panel-header>

                        <div class="section-content">
                            <p class="todo-placeholder">
                                [TODO: Тут буде таблиця або список особового складу підрозділу]
                            </p>
                        </div>
                    </mat-expansion-panel>

                    <mat-expansion-panel class="unit-section-panel">
                        <mat-expansion-panel-header>
                            <mat-panel-title>
                                <mat-icon color="primary">gavel</mat-icon>
                                Бойові розпорядження
                            </mat-panel-title>
                        </mat-expansion-panel-header>
                        
                        <div class="section-content">
                            <p class="todo-placeholder">
                                [TODO: Тут буде список бойових розпоряджень підрозділу]
                            </p>
                        </div>
                    </mat-expansion-panel>

                    <mat-expansion-panel class="unit-section-panel">
                        <mat-expansion-panel-header>
                            <mat-panel-title>
                                <mat-icon color="primary">send</mat-icon>
                                Бойові донесення
                            </mat-panel-title>
                        </mat-expansion-panel-header>
                        
                        <div class="section-content">
                            <p class="todo-placeholder">
                                [TODO: Тут буде список бойових донесень підрозділу]
                            </p>
                        </div>
                    </mat-expansion-panel>
                    
                    <mat-expansion-panel class="unit-section-panel">
                        <mat-expansion-panel-header>
                            <mat-panel-title>
                                <mat-icon color="primary">info</mat-icon>
                                Додаткова інформація
                            </mat-panel-title>
                        </mat-expansion-panel-header>
                        
                        <div class="section-content">
                            <p class="todo-placeholder">
                                [TODO: Ця секція зарезервована для майбутніх даних, які ще не визначені.]
                            </p>
                        </div>
                    </mat-expansion-panel>

                </mat-accordion>
            } @else {
                <!-- Стан коли нічого не вибрано -->
                <div class="empty-state">
                    <mat-icon class="empty-icon">account_tree</mat-icon>
                    <h2>Оберіть підрозділ</h2>
                    <p>Виберіть підрозділ у дереві ліворуч для перегляду детальної інформації</p>
                    @if (!sidenavOpen()) {
                        <button mat-raised-button color="primary" (click)="showSidenav.emit()">
                            <mat-icon>menu</mat-icon>
                            Показати дерево підрозділів
                        </button>
                    }
                </div>
            }
        </div>
    `
})
export class UnitContentComponent {
    // Входные свойства
    selectedUnit = input<UnitDto | null>(null);
    sidenavOpen = input<boolean>(false);

    // Выходные события
    showSidenav = output<void>();
}