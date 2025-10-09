import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-navigator',
  template: `
    <mat-toolbar class="sidenav-container">
      <button matButton [matMenuTriggerFor]="dictionaries">Довідники</button>
      <button matButton routerLink="/test" >Тестова сторінка</button>
      <button matButton routerLink="/units" >Підрозділи</button>
      <button matButton routerLink="/orders" >Розпорядження</button>
      <button matButton routerLink="/reports" >Донесення</button>
      <button matButton routerLink="/users" >Користувачі</button>
      <button matButton routerLink="/login" >Вхід в систему</button>

      <mat-menu #dictionaries="matMenu">
        <button mat-menu-item [matMenuTriggerFor]="dictDroneForces">Сили безпілотних систем</button>
        <button mat-menu-item [matMenuTriggerFor]="dictGeneralInfo">Загальні</button>
      </mat-menu>

      <mat-menu #dictDroneForces="matMenu">
        <button mat-menu-item routerLink="/dictArea">Напрямок ЛБЗ</button>
      </mat-menu>

      <mat-menu #dictGeneralInfo="matMenu">
        <button mat-menu-item routerLink="/dictForcesTypes">Види збройних сил</button>
        <button mat-menu-item routerLink="/dictPosition">Посади</button>
        <button mat-menu-item routerLink="/dictSoldierStates">Статуси особового складу</button>
        <button mat-menu-item routerLink="/dictUnitTypes">Типи підрозділів</button>
        <button mat-menu-item routerLink="/dictRanks">Військові звання</button>
      </mat-menu>
    </mat-toolbar>
  `,
  styles: `
    .sidenav-container {
      height: auto;/*100%;*/
      background: lightcyan;
    }
    
    .sidenav {
      width: 200px;
    }
    
    .sidenav .mat-toolbar {
      background: inherit;
    }
    
    .mat-toolbar.mat-primary {
      position: sticky;
      top: 0;
      z-index: 1;
    }
   `,
  imports: [
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
  ]
})
export class NavigatorComponent {
}
