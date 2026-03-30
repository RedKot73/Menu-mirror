import { Component, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { UnitDto } from '../../ServerService/unit.service';
import { SoldiersComponent } from '../Soldier/Soldier.component';
import { UnitAreasComponent } from './UnitAreas.component';
import { UnitAdjacentComponent } from './UnitAdjacent.component';
import { UnitTasksComponent } from './UnitTasks.component';

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
    UnitAreasComponent,
    UnitAdjacentComponent,
    UnitTasksComponent,
  ],
  templateUrl: './UnitContent.component.html',
  styleUrl: './UnitContent.component.scss',
})
export class UnitContentComponent {
  // Вхідні властивості
  selectedUnit = input<UnitDto | null>(null);

  /** Ленива ініціалізація панелі особового складу */
  soldiersPanelOpened = signal(false);
  unitAreasPanelOpened = signal(false);
  adjacentPanelOpened = signal(false);
  tasksPanelOpened = signal(false);
}
