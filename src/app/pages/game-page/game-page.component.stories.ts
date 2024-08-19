import { Meta, StoryObj } from '@storybook/angular';

import { GamePageComponent } from './game-page.component';

type ComponentWithCustomControls = GamePageComponent;

export default {
  // title: 'Components/Game Page',
  component: GamePageComponent,
  // decorators: [moduleMetadata({ imports: [] })],
  parameters: {
    docs: { description: { component: `GamePage` } },
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
} satisfies Meta<ComponentWithCustomControls>

export const GamePage: StoryObj<ComponentWithCustomControls> = {
  render: (args) => ({ props: args }),
}
