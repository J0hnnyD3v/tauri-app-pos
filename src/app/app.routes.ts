import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./auth/pages/layout-page/layout-page.component'),
    children: [
      {
        path: 'login',
        title: 'Página de Inicio de Sesión',
        loadComponent: () => import('./auth/pages/login-page/login-page.component'),
      },
      { path: '**', redirectTo: 'login', },
    ],
  },
  {
    path: 'app',
    loadComponent: () => import('./app-layout-page/app-layout-page.component').then(c => c.AppLayoutPageComponent),
    children: [
      {
        path: 'check-in',
        title: 'Panel de información',
        loadComponent: () => import('./check-in/pages/check-in-page/check-in-page.component'),
      },
      {
        path: '',
        redirectTo: 'check-in',
        pathMatch: 'full',
      },
      { path: '**', redirectTo: '/app/check-in', },
    ]
  },
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full',
  },
  { path: '**', redirectTo: '/auth', },
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full',
  },
  { path: '**', redirectTo: '/auth', },
];
