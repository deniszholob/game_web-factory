// import * as ViewPages from './pages';
import { isDevMode } from '@angular/core';
import { Route } from '@angular/router';

import { WorldComponent } from './components/world/world.component';

const DEV_ROUTE: Route[] = [];
// https://angular.dev/api/core/isDevMode?tab=description
if (isDevMode()) {
  DEV_ROUTE.push({
    path: 'dev',
    loadComponent: () =>
      import('./pages/dev-page/dev-page.component').then(
        (m) => m.DevPageComponent,
      ),
  });
}

export const appRoutes: Route[] = [
  { path: '', component: WorldComponent },
  ...DEV_ROUTE,
  { path: '**', component: WorldComponent },
  //   { path: '**', component: ViewPages.NotFoundComponent },
];
