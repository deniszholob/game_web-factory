import { Meta, StoryObj } from '@storybook/angular';

import { WorldComponent } from './world.component';

type ComponentWithCustomControls = WorldComponent;

export default {
  title: 'Components/World',
  component: WorldComponent,
  // decorators: [moduleMetadata({ imports: [] })],
  parameters: {
    docs: { description: { component: `World` } },
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

export const World: StoryObj<ComponentWithCustomControls> = {
  render: (args) => ({ props: args }),
};
