// import * as ViewPages from './pages';
import { isDevMode } from '@angular/core';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  //   { path: '', component: ViewPages.HomeComponent },
  //   { path: '**', component: ViewPages.NotFoundComponent },
];

// https://angular.dev/api/core/isDevMode?tab=description
if (isDevMode()) {
  appRoutes.push({
    path: 'dev',
    loadComponent: () =>
      import('./pages/dev-page/dev-page.component').then(
        (m) => m.DevPageComponent,
      ),
  });
}
