import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: 'dictDroneTypes',
    loadComponent: () =>
      import('../dictionaries/dictDroneType.component').then((m) => m.DictDroneTypeComponent),
    title: 'Типи БПЛА',
    canActivate: [authGuard],
  },
  {
    path: 'dictDroneModels',
    loadComponent: () =>
      import('../dictionaries/dictDroneModel.component').then((m) => m.DictDroneModelComponent),
    title: 'Моделі БПЛА',
    canActivate: [authGuard],
  },
  {
    path: 'dictForcesTypes',
    loadComponent: () =>
      import('../dictionaries/dictForcesType.component').then((m) => m.DictForcesTypeComponent),
    title: 'Види збройних сил',
    canActivate: [authGuard],
  },
  {
    path: 'dictPosition',
    loadComponent: () =>
      import('../dictionaries/dictPosition.component').then((m) => m.DictPositionComponent),
    title: 'Посади',
    canActivate: [authGuard],
  },
  {
    path: 'dictRanks',
    loadComponent: () =>
      import('../dictionaries/dictRanks.component').then((m) => m.DictRanksComponent),
    title: 'Військові звання',
    canActivate: [authGuard],
  },
  {
    path: 'dictSoldierStates',
    loadComponent: () =>
      import('../dictionaries/dictSoldierStates.component').then(
        (m) => m.DictSoldierStatesComponent,
      ),
    title: 'Статуси особового складу',
    canActivate: [authGuard],
  },
  {
    path: 'dictUnitTypes',
    loadComponent: () =>
      import('../dictionaries/dictUnitTypes.component').then((m) => m.DictUnitTypesComponent),
    title: 'Типи підрозділів',
    canActivate: [authGuard],
  },
  {
    path: 'dictAreaTypes',
    loadComponent: () =>
      import('../dictionaries/dictAreaType.component').then((m) => m.DictAreaTypeComponent),
    title: 'Типи Напрямку ЛБЗ',
    canActivate: [authGuard],
  },
  {
    path: 'dictCityCategories',
    loadComponent: () =>
      import('../dictionaries/dictCityCategory.component').then((m) => m.DictCityCategoryComponent),
    title: "Категорії об'єктів адміністративно-територіальних одиниць",
    canActivate: [authGuard],
  },
  {
    path: 'dictCityCodes',
    loadComponent: () =>
      import('../dictionaries/CityCode/CityCodePage.component').then(
        (m) => m.CityCodePageComponent,
      ),
    title: 'Кодифікатор адміністративно-територіальних одиниць',
    canActivate: [authGuard],
  },
  {
    path: 'dictArea',
    loadComponent: () =>
      import('../dictionaries/dictAreaPage.component').then((m) => m.DictAreaPage),
    title: 'Напрямок ЛБЗ',
    canActivate: [authGuard],
  },
  {
    path: 'dictTemplateCategories',
    loadComponent: () =>
      import('../dictionaries/dictTemplateCategories.component').then(
        (m) => m.DictTemplateCategoriesComponent,
      ),
    title: 'Категорії шаблонів документів',
    canActivate: [authGuard],
  },
  {
    path: 'dictUnitTasks',
    loadComponent: () =>
      import('../dictionaries/UnitTask/dictUnitTask.page').then((m) => m.DictUnitTaskPage),
    title: 'Завдання підрозділів',
    canActivate: [authGuard],
  },
  {
    path: 'units',
    title: 'Підрозділи',
    loadComponent: () => import('../app/Unit/Unit.page').then((m) => m.UnitsComponent),
    canActivate: [authGuard],
  },
  {
    path: 'unit/import',
    title: 'Імпорт особового складу',
    loadComponent: () =>
      import('./Unit/Import/ImportProgress.page').then((m) => m.ImportProgressPage),
    canActivate: [authGuard],
  },
  {
    path: 'personnel',
    title: 'Особовий склад',
    loadComponent: () => import('../app/Personnel/Personnel.page').then((m) => m.PersonnelPage),
    canActivate: [authGuard],
  },
  {
    path: 'DocumentDataSet',
    loadComponent: () =>
      import('../app/DocumentDataSet/DocumentDataSet.page').then((m) => m.DocumentDataSetComponent),
    title: 'Дані документів',
    canActivate: [authGuard],
  },
  {
    path: 'templates',
    title: 'Шаблони документів',
    loadComponent: () =>
      import('./DocumentTemplates/DocTemplates.page').then((m) => m.DocTemplatesTree),
    canActivate: [authGuard],
  },
  {
    path: 'users',
    title: 'Користувачі',
    loadComponent: () => import('../Login/Users.page').then((m) => m.UsersPage),
    canActivate: [authGuard],
  },
  {
    path: 'login',
    title: 'Вхід в систему',
    loadComponent: () => import('../Login/LoginPage.component').then((m) => m.LoginPage),
  },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', redirectTo: '' },
];
