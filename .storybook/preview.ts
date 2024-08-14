import { HttpClientTestingModule } from '@angular/common/http/testing';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import {
  AngularRenderer,
  applicationConfig,
  componentWrapperDecorator,
  Parameters,
  Preview,
} from '@storybook/angular';
// import { themes } from '@storybook/theming';
import { DecoratorFunction } from '@storybook/types';

export const parameters: Parameters = {
  // layout: 'fullscreen', // centered, fullscreen, padded
  docs: {
    canvas: { sourceState: 'shown' }, // start with the source open https://github.com/storybookjs/storybook/issues/10430
    // inlineStories: true,
    // story: { inline: true }, // render the story in an iframe
    // docs: { inlineStories: true, source: { state: 'open' } },
    // source: { type: 'code' }, // forces the raw source code (rather than the rendered JSX).
    toc: true,
    // Sync this with the config theme manager.ts
    // theme: themes.dark,
  },
  // Recommended to not use this. See https://storybook.js.org/docs/8.0/essentials/actions#via-storybooktest-fn-spy-function
  // actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    hideNoControlsWarning: true, // If component has no @Input()
    expanded: true,
    matchers: {
      color: /(background|color)/i,
      date: /Date$/,
    },
  },
  // backgrounds: { default: 'dark' },
};

type SbDecoratorFn = DecoratorFunction<
  AngularRenderer,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Partial<{ [x: string]: any }>
>;

// https://github.com/storybookjs/storybook/issues/21942#issuecomment-1516177565
const DECORATOR_PROVIDERS: SbDecoratorFn = applicationConfig({
  providers: [
    importProvidersFrom(
      BrowserAnimationsModule,
      HttpClientTestingModule,
      RouterTestingModule,
    ),
  ],
});

const DECORATOR_NGXS_CLEAR_STORE: SbDecoratorFn = componentWrapperDecorator(
  (story: string): string => {
    window.localStorage.removeItem('@@STATE');
    return story;
  },
);

// const DECORATOR_APP_WRAPPER: SbDecoratorFn = (storyFunc: any) => {
//   const story = storyFunc();
//   return {
//     ...story,
//     template: `<div class="site">${story.template}</div>`,
//   };
// };

export const decorators: SbDecoratorFn[] = [
  DECORATOR_PROVIDERS,
  DECORATOR_NGXS_CLEAR_STORE,
  // DECORATOR_APP_WRAPPER,
];

export default {
  parameters,
  decorators,
  tags: ['autodocs'],
} satisfies Preview;
