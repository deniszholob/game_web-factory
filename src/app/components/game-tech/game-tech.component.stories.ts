import { Meta, StoryObj } from '@storybook/angular';

import { GameTechComponent } from './game-tech.component';

type ComponentWithCustomControls = GameTechComponent;

export default {
  title: 'Components/Game Tech',
  component: GameTechComponent,
  // decorators: [moduleMetadata({ imports: [] })],
  parameters: {
    docs: { description: { component: `GameTech` } },
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

export const GameTech: StoryObj<ComponentWithCustomControls> = {
  render: (args) => ({ props: args }),
};
