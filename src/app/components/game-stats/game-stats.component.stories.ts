import { Meta, StoryObj } from '@storybook/angular';

import { GameStatsComponent } from './game-stats.component';

type ComponentWithCustomControls = GameStatsComponent;

export default {
  title: 'Components/Game Stats',
  component: GameStatsComponent,
  // decorators: [moduleMetadata({ imports: [] })],
  parameters: {
    docs: { description: { component: `GameStats` } },
    // layout: 'fullscreen',
  },
  argTypes: {
    /** === Input Mapping === */
    // input: { options: ['---', ...Object.values(YourEnum)], mapping: YourEnum & { '---': undefined }, control: { type: 'select' }}
    /** === Output Actions === */
    // inputChange: { action: 'inputChange', table: { disable: true } }
    /** === Control Hide === */
    // someControl: { table: { disable: true } }
    /** === Control Disable === */
    // someControl: { control: { disable: true } }
  },
  args: {},
} satisfies Meta<ComponentWithCustomControls>;

export const GameStats: StoryObj<ComponentWithCustomControls> = {
  render: (args) => ({ props: args }),
};
