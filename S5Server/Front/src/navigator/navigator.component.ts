import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../app/auth/auth.service';
import { TotpSetupDialogComponent } from '../app/auth/TotpSetupDialog.component';

@Component({
  selector: 'app-navigator',
  template: `
    <mat-toolbar>
      @if (auth.isAuthenticated()) {
        <button matButton [matMenuTriggerFor]="dictionaries">Довідники</button>
        <button matButton routerLink="/DocumentDataSet" routerLinkActive="active-link">
          Дані документів
        </button>

        <button matButton routerLink="/templates" routerLinkActive="active-link">
          Шаблони документів
        </button>

        <button matButton routerLink="/units" routerLinkActive="active-link">Підрозділи</button>
        <button matButton routerLink="/personnel" routerLinkActive="active-link">
          Особовий склад
        </button>
        <button matButton routerLink="/orders" routerLinkActive="active-link">Розпорядження</button>
        <button matButton routerLink="/reports" routerLinkActive="active-link">Донесення</button>
        <button matButton routerLink="/users" routerLinkActive="active-link">Користувачі</button>

        <span class="spacer"></span>
        <span class="user-info">{{ auth.displayName() }}</span>
        <button matButton (click)="openTotpSetup()">Налаштування 2FA</button>
        <button matButton (click)="onLogout()">Вийти</button>
      } @else {
        <span class="spacer"></span>
        <button matButton routerLink="/login" routerLinkActive="active-link">Вхід в систему</button>
      }

      <mat-menu #dictionaries="matMenu">
        <button mat-menu-item [matMenuTriggerFor]="dictDroneForces">Сили безпілотних систем</button>
        <button mat-menu-item [matMenuTriggerFor]="dictGeneralInfo">Загальні</button>
      </mat-menu>

      <mat-menu #dictDroneForces="matMenu">
        <button mat-menu-item routerLink="/dictDroneTypes" routerLinkActive="active-menu-item">
          Типи БПЛА
        </button>
        <button mat-menu-item routerLink="/dictDroneModels" routerLinkActive="active-menu-item">
          Моделі БПЛА
        </button>
        <button
          mat-menu-item
          routerLink="/dictTemplateCategories"
          routerLinkActive="active-menu-item"
        >
          Категорії шаблонів документів
        </button>
        <button mat-menu-item routerLink="/dictUnitTasks" routerLinkActive="active-menu-item">
          Завдання підрозділів
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
        <button mat-menu-item routerLink="/dictCityCategories" routerLinkActive="active-menu-item">
          Категорії об'єктів адміністративно-територіальних одиниць
        </button>
        <button mat-menu-item routerLink="/dictCityCodes" routerLinkActive="active-menu-item">
          Кодифікатор об'єктів адміністративно-територіальних одиниць
        </button>
        <button mat-menu-item routerLink="/dictAreaTypes" routerLinkActive="active-menu-item">
          Типи району виконання завдань (РВЗ)
        </button>
        <button mat-menu-item routerLink="/dictArea" routerLinkActive="active-menu-item">
          Райони виконання завдань (РВЗ)
        </button>
      </mat-menu>
    </mat-toolbar>
  `,
  styles: `
    mat-toolbar {
      background: lightcyan;
    }

    .spacer {
      flex: 1;
    }

    .user-info {
      font-size: 14px;
      margin-right: 8px;
      opacity: 0.8;
    }

    .active-link {
      background-color: #1976d2 !important;
      color: white !important;
      font-weight: bold !important;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .active-link:hover {
      background-color: #1565c0 !important;
    }

    button[matButton]:not(.active-link):hover {
      background-color: rgba(25, 118, 210, 0.1);
      border-radius: 4px;
    }

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
export class NavigatorComponent {
  readonly auth = inject(AuthService);
  private dialog = inject(MatDialog);

  openTotpSetup(): void {
    this.dialog.open(TotpSetupDialogComponent, {
      width: '500px',
      disableClose: true
    });
  }

  onLogout(): void {
    this.auth.logout().subscribe();
  }
}
