import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { dictAreaPage } from '../dictionaries/dictAreaPage.component';
import { dictForcesType } from '../dictionaries/dictForcesType.component';
import { dictPosition } from '../dictionaries/dictPosition.component';
import { dictSoldierStates } from '../dictionaries/dictSoldierStates.component';
import { dictUnitTypes } from '../dictionaries/dictUnitTypes.component';
import { dictRanks } from '../dictionaries/dictRanks.component';
import { UnitsComponent } from '../app/Unit/Unit.component'//'../Unit/UnitComponent.component';
import { LoginPage } from '../Login/LoginPage.component';

// Simple standalone stub components for each route
@Component({
    selector: 'page-drone-forces', standalone: true,
    template: '<h2>Сили безпілотних систем</h2><p>Сторінка "Сили безпілотних систем" (заглушка)</p>'
}) class DroneForcesPage { }
@Component({
    selector: 'page-general-info', standalone: true,
    template: '<h2>Загальні</h2><p>Сторінка "Загальні" (заглушка)</p>'
}) class GeneralInfoPage { }
@Component({
    selector: 'page-orders', standalone: true,
    template: '<h2>Розпорядження</h2><p>Сторінка "Розпорядження" (заглушка)</p>'
}) class OrdersPage { }
@Component({
    selector: 'page-reports', standalone: true,
    template: '<h2>Донесення</h2><p>Сторінка "Донесення" (заглушка)</p>'
}) class ReportsPage { }
@Component({
    selector: 'page-users', standalone: true,
    template: '<h2>Користувачі</h2><p>Сторінка "Користувачі" (заглушка)</p>'
}) class UsersPage { }

export const routes: Routes = [
    { path: 'dictArea', title: 'Напрямок ЛБЗ', component: dictAreaPage },
    { path: 'dictForcesTypes', title: 'Види збройних сил', component: dictForcesType },
    { path: 'dictPosition', title: 'Посади', component: dictPosition },
    { path: 'dictRanks', title: 'Військові звання', component: dictRanks },
    { path: 'dictSoldierStates', title: 'Статуси особового складу', component: dictSoldierStates },
    { path: 'dictUnitTypes', title: 'Типи підрозділів', component: dictUnitTypes },
    { path: 'drone-forces', title: 'Сили безпілотних систем', component: DroneForcesPage },
    { path: 'general-info', title: 'Загальні', component: GeneralInfoPage },
    { path: 'units', title: 'Підрозділи', component: UnitsComponent },
    { path: 'orders', title: 'Розпорядження', component: OrdersPage },
    { path: 'reports', title: 'Донесення', component: ReportsPage },
    { path: 'users', title: 'Користувачі', component: UsersPage },
    { path: 'login', title: 'Вхід в систему', component: LoginPage },
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: '**', redirectTo: '' }
];
