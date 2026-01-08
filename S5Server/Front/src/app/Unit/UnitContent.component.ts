import { Component, input, output, inject, effect, computed } from '@angular/core';
import { signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UnitDto } from './services/unit.service';
import { SoldiersComponent, UnitTag } from '../Soldier/Soldier.component';
import { SoldierService, SoldierDto } from '../Soldier/services/soldier.service';
import { ErrorHandler } from '../shared/models/ErrorHandler';

@Component({
  selector: 'unit-content',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    SoldiersComponent,
  ],
  templateUrl: './UnitContent.component.html',
  styleUrl: './UnitContent.component.scss',
})
export class UnitContentComponent {
  private soldierService = inject(SoldierService);
  private snackBar = inject(MatSnackBar);

  // Входные свойства
  selectedUnit = input<UnitDto | null>(null);
  sidenavOpen = input<boolean>(false);

  // Выходные события
  showSidenav = output<void>();
  unitTag = UnitTag;

  // Дані особового складу для кожної вкладки
  soldiers = signal<SoldierDto[]>([]);
  assignedSoldiers = signal<SoldierDto[]>([]);
  involvedSoldiers = signal<SoldierDto[]>([]);

  // Віртуальне властивість - об'єднаний масив всього особового складу
  // Автоматично оновлюється при зміні будь-якого з вихідних масивів
  allSoldiers = computed(() => [
    ...this.soldiers(),
    ...this.assignedSoldiers(),
    ...this.involvedSoldiers(),
  ]);

  constructor() {
    // Завантажуємо дані при зміні підрозділу
    effect(() => {
      const unit = this.selectedUnit();
      if (unit?.id) {
        this.loadSoldiers();
      } else {
        this.soldiers.set([]);
        this.assignedSoldiers.set([]);
        this.involvedSoldiers.set([]);
      }
    });
  }

  // Публічні методи для перезавантаження даних (викликаються з дочірнього компонента)
  reloadSoldiers(): void {
    const unit = this.selectedUnit();
    if (unit?.id) {
      this.soldierService.getAll(undefined, unit.id).subscribe({
        next: (data: SoldierDto[]) => this.soldiers.set(data),
        error: (error) => {
          console.error('Помилка завантаження особового складу:', error);
          const errorMessage = ErrorHandler.handleHttpError(
            error,
            'Помилка завантаження особового складу'
          );
          this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
        },
      });
    }
  }

  reloadAssignedSoldiers(): void {
    const unit = this.selectedUnit();
    if (unit?.id) {
      this.soldierService.getByAssigned(unit.id).subscribe({
        next: (data: SoldierDto[]) => this.assignedSoldiers.set(data),
        error: (error) => {
          console.error('Помилка завантаження приданих:', error);
          const errorMessage = ErrorHandler.handleHttpError(
            error,
            'Помилка завантаження приданих військовослужбовців'
          );
          this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
        },
      });
    }
  }

  reloadInvolvedSoldiers(): void {
    const unit = this.selectedUnit();
    if (unit?.id) {
      this.soldierService.getByInvolved(unit.id).subscribe({
        next: (data: SoldierDto[]) => this.involvedSoldiers.set(data),
        error: (error) => {
          console.error('Помилка завантаження задіяних:', error);
          const errorMessage = ErrorHandler.handleHttpError(
            error,
            'Помилка завантаження задіяних військовослужбовців'
          );
          this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
        },
      });
    }
  }

  private loadSoldiers(): void {
    // Особовий склад (основний)
    this.reloadSoldiers();
    // Особовий склад (приданий)
    this.reloadAssignedSoldiers();
    // Особовий склад (задіяний)
    this.reloadInvolvedSoldiers();
  }
}
