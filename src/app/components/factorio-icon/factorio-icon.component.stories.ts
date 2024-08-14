import { Meta, StoryObj } from '@storybook/angular';

import { FactorioIconComponent, IconSizes } from './factorio-icon.component';
import {
  FactorioWikiIcon,
  FactorioIcon as FactorioLocalIcon,
  FACTORIO_ICON_OPTIONS,
  FACTORIO_WIKI_ICON_OPTIONS,
} from 'src/app/shared';

type ComponentWithCustomControls = FactorioIconComponent & {
  icons: (FactorioWikiIcon | FactorioLocalIcon)[];
};

export default {
  title: 'Components/Factorio Icon',
  component: FactorioIconComponent,
  // decorators: [moduleMetadata({ imports: [] })],
  parameters: {
    docs: { description: { component: `FactorioIcon` } },
    // layout: 'fullscreen',
  },
  argTypes: {
    /** === Input Mapping === */
    icon: {
      options: [
        '---',
        ...Object.values(FactorioLocalIcon),
        ...Object.values(FactorioWikiIcon),
      ],
      // mapping: FactorioIconData & { '---': undefined },
      control: { type: 'select' },
    },
    size: {
      options: ['---', ...Object.values(IconSizes)],
      // mapping: FactorioIconData & { '---': undefined },
      control: { type: 'select' },
    },
    /** === Output Actions === */
    // inputChange: { action: 'inputChange', table: { disable: true } }
    /** === Control Hide === */
    // someControl: { table: { disable: true } }
    /** === Control Disable === */
    // someControl: { control: { disable: true } }
  },
  args: {
    size: IconSizes.lg,
    icon: FactorioLocalIcon.DepositCoal,
    icons: [...FACTORIO_ICON_OPTIONS, ...FACTORIO_WIKI_ICON_OPTIONS],
  },
} satisfies Meta<ComponentWithCustomControls>;

export const FactorioIcon: StoryObj<ComponentWithCustomControls> = {
  args: { icons: undefined, size: IconSizes.xl },
};

export const FactorioIconList: StoryObj<ComponentWithCustomControls> = {
  args: { icon: undefined },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div 
          *ngFor="let icon of icons"
          style="display: flex; flex-wrap: wrap; flex-direction: column; justify-content: center; align-items: center; gap: 1rem;"
        >
          <app-factorio-icon [icon]="icon" [size]="size"></app-factorio-icon>
          <div>{{icon}}</div>
        </div>
      </div>
    `,
  }),
};
