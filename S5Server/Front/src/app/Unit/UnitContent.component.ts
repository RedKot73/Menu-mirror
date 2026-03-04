import { Component, input, /*output,*/ inject, effect } from '@angular/core';
import { signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UnitDto } from './services/unit.service';
import { SoldiersComponent } from '../Soldier/Soldier.component';
import { SoldierService, SoldierDto } from '../Soldier/services/soldier.service';
import { S5App_ErrorHandler } from '../shared/models/ErrorHandler';

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

  soldiers = signal<SoldierDto[]>([]);

  constructor() {
    // Завантажуємо дані при зміні підрозділу
    effect(() => {
      const unit = this.selectedUnit();
      if (unit?.id) {
        this.reloadSoldiers();
      } else {
        this.soldiers.set([]);
      }
    });
  }

  // Публічні методи для перезавантаження даних (викликаються з дочірнього компонента)
  reloadSoldiers(): void {
    const unit = this.selectedUnit();
    if (unit?.id) {
      //this.soldierService.getAll(undefined, unit.id).subscribe({
      this.soldierService.getByUnit(unit.id).subscribe({
        next: (data: SoldierDto[]) => this.soldiers.set(data),
        error: (error) => {
          console.error('Помилка завантаження особового складу:', error);
          const errorMessage = S5App_ErrorHandler.handleHttpError(
            error,
            'Помилка завантаження особового складу',
          );
          this.snackBar.open(errorMessage, 'Закрити', { duration: 5000 });
        },
      });
    }
  }
}
