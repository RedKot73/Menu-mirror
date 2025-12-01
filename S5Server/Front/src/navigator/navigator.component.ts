import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-navigator',
  template: `
    <mat-toolbar class="sidenav-container">
      <button matButton [matMenuTriggerFor]="dictionaries">Довідники</button>

      <button matButton routerLink="/test" routerLinkActive="active-link">Дані документа</button>

      <button matButton routerLink="/templates" routerLinkActive="active-link">
        Шаблони документів
      </button>

      <button matButton routerLink="/units" routerLinkActive="active-link">Підрозділи</button>
      <button matButton routerLink="/personnel" routerLinkActive="active-link">Особовий склад</button>
      <button matButton routerLink="/orders" routerLinkActive="active-link">Розпорядження</button>
      <button matButton routerLink="/reports" routerLinkActive="active-link">Донесення</button>
      <button matButton routerLink="/users" routerLinkActive="active-link">Користувачі</button>
      <button matButton routerLink="/login" routerLinkActive="active-link">Вхід в систему</button>

      <mat-menu #dictionaries="matMenu">
        <button mat-menu-item [matMenuTriggerFor]="dictDroneForces">Сили безпілотних систем</button>
        <button mat-menu-item [matMenuTriggerFor]="dictGeneralInfo">Загальні</button>
      </mat-menu>

      <mat-menu #dictDroneForces="matMenu">
        <button mat-menu-item routerLink="/dictArea" routerLinkActive="active-menu-item">
          Напрямок ЛБЗ
        </button>
        <button
          mat-menu-item
          routerLink="/dictTemplateCategories"
          routerLinkActive="active-menu-item"
        >
          Категорії шаблонів документів
        </button>
      </mat-menu>

      <mat-menu #dictGeneralInfo="matMenu">
        <button mat-menu-item routerLink="/dictForcesTypes" routerLinkActive="active-menu-item">
          Види збройних сил
        </button>
        <button mat-menu-item routerLink="/dictPosition" routerLinkActive="active-menu-item">
          Посади
        </button>
        <button mat-menu-item routerLink="/dictSoldierStates" routerLinkActive="active-menu-item">
          Статуси особового складу
        </button>
        <button mat-menu-item routerLink="/dictUnitTypes" routerLinkActive="active-menu-item">
          Типи підрозділів
        </button>
        <button mat-menu-item routerLink="/dictRanks" routerLinkActive="active-menu-item">
          Військові звання
        </button>
      </mat-menu>
    </mat-toolbar>
  `,
  styles: `
    .sidenav-container {
      height: auto;/*100%;*/
      background: lightcyan;
      position: sticky;
      top: 0;
      z-index: 1000;
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

    /* Стили для активной ссылки */
    .active-link {
      background-color: #1976d2 !important;
      color: white !important;
      font-weight: bold !important;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }

    /* Эффект при наведении на активную ссылку */
    .active-link:hover {
      background-color: #1565c0 !important;
    }

    /* Дополнительное выделение для обычных кнопок при наведении */
    button[matButton]:not(.active-link):hover {
      background-color: rgba(25, 118, 210, 0.1);
      border-radius: 4px;
    }

    /* Стили для активных пунктов меню */
    .active-menu-item {
      background-color: #e3f2fd !important;
      color: #1976d2 !important;
      font-weight: bold !important;
    }

    .active-menu-item:hover {
      background-color: #bbdefb !important;
    }
   `,
  imports: [RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule, MatMenuModule],
})
export class NavigatorComponent {}
