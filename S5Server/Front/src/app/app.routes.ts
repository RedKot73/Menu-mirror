import { Routes } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-page-users',
  standalone: true,
  template: '<h2>Користувачі</h2><p>Сторінка "Користувачі" (заглушка)</p>',
})
class UsersPage {}

export const routes: Routes = [
  {
    path: 'DocumentDataSet',
    loadComponent: () =>
      import('../app/DocumentDataSet/DocumentDataSet.page').then((m) => m.DocumentDataSetComponent),
    title: 'Дані документів',
  },
  {
    path: 'dictDroneTypes',
    loadComponent: () =>
      import('../dictionaries/dictDroneType.component').then((m) => m.DictDroneTypeComponent),
    title: 'Типи БПЛА',
  },
  {
    path: 'dictDroneModels',
    loadComponent: () =>
      import('../dictionaries/dictDroneModel.component').then((m) => m.DictDroneModelComponent),
    title: 'Моделі БПЛА',
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
      import('../dictionaries/dictPosition.component').then((m) => m.DictPositionComponent),
    title: 'Посади',
  },
  {
    path: 'dictRanks',
    loadComponent: () =>
      import('../dictionaries/dictRanks.component').then((m) => m.DictRanksComponent),
    title: 'Військові звання',
  },
  {
    path: 'dictSoldierStates',
    loadComponent: () =>
      import('../dictionaries/dictSoldierStates.component').then((m) => m.DictSoldierStatesComponent),
    title: 'Статуси особового складу',
  },
  {
    path: 'dictUnitTypes',
    loadComponent: () =>
      import('../dictionaries/dictUnitTypes.component').then((m) => m.DictUnitTypesComponent),
    title: 'Типи підрозділів',
  },
  {
    path: 'dictAreaTypes',
    loadComponent: () =>
      import('../dictionaries/dictAreaType.component').then((m) => m.DictAreaTypeComponent),
    title: 'Типи Напрямку ЛБЗ',
  },
  {
    path: 'dictArea',
    loadComponent: () =>
      import('../dictionaries/dictAreaPage.component').then((m) => m.DictAreaPage),
    title: 'Напрямок ЛБЗ',
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
    path: 'dictUnitTasks',
    loadComponent: () =>
      import('../dictionaries/dictUnitTask.page').then((m) => m.DictUnitTaskPage),
    title: 'Завдання підрозділів',
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
      import('./Unit/Import/ImportProgress.page').then((m) => m.ImportProgressPage),
  },
  {
    path: 'personnel',
    title: 'Особовий склад',
    loadComponent: () => import('../app/Personnel/Personnel.page').then((m) => m.PersonnelPage),
  },
  {
    path: 'templates',
    title: 'Шаблони документів',
    loadComponent: () =>
      import('./DocumentTemplates/DocTemplatesTree.page').then((m) => m.DocTemplatesTree),
  },
  { path: 'users', title: 'Користувачі', component: UsersPage },
  {
    path: 'login',
    title: 'Вхід в систему',
    loadComponent: () => import('../Login/LoginPage.component').then((m) => m.LoginPage),
  },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', redirectTo: '' },
];
