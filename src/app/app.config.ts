import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideRouter, TitleStrategy } from '@angular/router';

import { appRoutes } from './app.routes';
import { AppTitleService } from './core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      appRoutes,
      // withEnabledBlockingInitialNavigation(),
      // withInMemoryScrolling({
      //   anchorScrolling: 'enabled',
      //   scrollPositionRestoration: 'enabled',
      // }),
      // withRouterConfig({
      //   onSameUrlNavigation: 'reload',
      // })
    ),
    importProvidersFrom(BrowserModule),
    { provide: Window, useValue: window },
    { provide: TitleStrategy, useClass: AppTitleService },
  ],
};
