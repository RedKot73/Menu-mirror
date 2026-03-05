import { Component, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { UnitDto } from './services/unit.service';
import { SoldiersComponent } from '../Soldier/Soldier.component';

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
  // Вхідні властивості
  selectedUnit = input<UnitDto | null>(null);

  /** Ленива ініціалізація панелі особового складу */
  soldiersPanelOpened = signal(false);
}
