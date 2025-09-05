import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { dictAreaPage } from '../dictionaries/dictAreaPage.component';
import { LoginPage } from '../Login/LoginPage.component';

// Simple standalone stub components for each route
/*
@Component({
    selector: 'page-dict-area',
    template: '<h2>Напрямок ЛБЗ</h2><p>Сторінка "Напрямок ЛБЗ" (заглушка)</p>'
}) class dictAreaPage { }
*/
@Component({
    selector: 'page-military-type', standalone: true,
    template: '<h2>Вид збройних сил</h2><p>Сторінка "Вид збройних сил" (заглушка)</p>'
}) class MilitaryTypePage { }
@Component({
    selector: 'page-position', standalone: true,
    template: '<h2>Посада</h2><p>Сторінка "Посада" (заглушка)</p>'
}) class PositionPage { }
@Component({
    selector: 'page-rank', standalone: true,
    template: '<h2>Військове звання</h2><p>Сторінка "Військове звання" (заглушка)</p>'
}) class RankPage { }
@Component({
    selector: 'page-fighter-status', standalone: true,
    template: '<h2>Статус бійця</h2><p>Сторінка "Статус бійця" (заглушка)</p>'
}) class FighterStatusPage { }
@Component({
    selector: 'page-unit-type', standalone: true,
    template: '<h2>Тип підрозділу</h2><p>Сторінка "Тип підрозділу" (заглушка)</p>'
}) class UnitTypePage { }
@Component({
    selector: 'page-drone-forces', standalone: true,
    template: '<h2>Сили безпілотних систем</h2><p>Сторінка "Сили безпілотних систем" (заглушка)</p>'
}) class DroneForcesPage { }
@Component({
    selector: 'page-general-info', standalone: true,
    template: '<h2>Загальні</h2><p>Сторінка "Загальні" (заглушка)</p>'
}) class GeneralInfoPage { }
@Component({
    selector: 'page-units', standalone: true,
    template: '<h2>Підрозділи</h2><p>Сторінка "Підрозділи" (заглушка)</p>'
}) class UnitsPage { }
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
    { path: 'military-type', title: 'Вид збройних сил', component: MilitaryTypePage },
    { path: 'position', title: 'Посада', component: PositionPage },
    { path: 'rank', title: 'Військове звання', component: RankPage },
    { path: 'fighter-status', title: 'Статус бійця', component: FighterStatusPage },
    { path: 'unit-type', title: 'Тип підрозділу', component: UnitTypePage },
    { path: 'drone-forces', title: 'Сили безпілотних систем', component: DroneForcesPage },
    { path: 'general-info', title: 'Загальні', component: GeneralInfoPage },
    { path: 'units', title: 'Підрозділи', component: UnitsPage },
    { path: 'orders', title: 'Розпорядження', component: OrdersPage },
    { path: 'reports', title: 'Донесення', component: ReportsPage },
    { path: 'users', title: 'Користувачі', component: UsersPage },
    { path: 'login', title: 'Вхід в систему', component: LoginPage },
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: '**', redirectTo: '' }
];
