import { Routes } from '@angular/router';
import { Component } from '@angular/core';

// Simple standalone stub components for each route
@Component({
  selector: 'app-page-orders',
  standalone: true,
  template: '<h2>Розпорядження</h2><p>Сторінка "Розпорядження" (заглушка)</p>',
})
class OrdersPage {}
@Component({
  selector: 'app-page-reports',
  standalone: true,
  template: '<h2>Донесення</h2><p>Сторінка "Донесення" (заглушка)</p>',
})
class ReportsPage {}
@Component({
  selector: 'app-page-users',
  standalone: true,
  template: '<h2>Користувачі</h2><p>Сторінка "Користувачі" (заглушка)</p>',
})
class UsersPage {}

export const routes: Routes = [
  {
    path: 'test',
    loadComponent: () => import('../app/test/Test.page').then((m) => m.TestComponent),
    title: 'Тестова сторінка',
  },
  {
    path: 'dictArea',
    loadComponent: () =>
      import('../dictionaries/dictAreaPage.component').then((m) => m.dictAreaPage),
    title: 'Напрямок ЛБЗ',
  },
  {
    path: 'dictForcesTypes',
    loadComponent: () =>
      import('../dictionaries/dictForcesType.component').then((m) => m.DictForcesTypeComponent),
    title: 'Види збройних сил',
  },
  {
    path: 'dictPosition',
    loadComponent: () =>
      import('../dictionaries/dictPosition.component').then((m) => m.dictPosition),
    title: 'Посади',
  },
  {
    path: 'dictRanks',
    loadComponent: () => import('../dictionaries/dictRanks.component').then((m) => m.dictRanks),
    title: 'Військові звання',
  },
  {
    path: 'dictSoldierStates',
    loadComponent: () =>
      import('../dictionaries/dictSoldierStates.component').then((m) => m.dictSoldierStates),
    title: 'Статуси особового складу',
  },
  {
    path: 'dictUnitTypes',
    loadComponent: () =>
      import('../dictionaries/dictUnitTypes.component').then((m) => m.DictUnitTypesComponent),
    title: 'Типи підрозділів',
  },
  {
    path: 'dictTemplateCategories',
    loadComponent: () =>
      import('../dictionaries/dictTemplateCategories.component').then(
        (m) => m.DictTemplateCategoriesComponent
      ),
    title: 'Категорії шаблонів документів',
  },
  {
    path: 'units',
    title: 'Підрозділи',
    loadComponent: () => import('../app/Unit/Unit.page').then((m) => m.UnitsComponent),
  },
  {
    path: 'unit/import',
    title: 'Імпорт особового складу',
    loadComponent: () =>
      import('../app/Unit/ImportProgress.page').then((m) => m.ImportProgressPage),
  },
  {
    path: 'templates',
    title: 'Шаблони документів',
    loadComponent: () =>
      import('./DocumentTemplates/DocTemplatesTree.page').then((m) => m.DocTemplatesTree),
  },
  { path: 'orders', title: 'Розпорядження', component: OrdersPage },
  { path: 'reports', title: 'Донесення', component: ReportsPage },
  { path: 'users', title: 'Користувачі', component: UsersPage },
  {
    path: 'login',
    title: 'Вхід в систему',
    loadComponent: () => import('../Login/LoginPage.component').then((m) => m.LoginPage),
  },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', redirectTo: '' },
];
