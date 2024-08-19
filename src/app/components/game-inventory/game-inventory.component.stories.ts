import { Meta, StoryObj } from '@storybook/angular';

import { GameInventoryComponent } from './game-inventory.component';

type ComponentWithCustomControls = GameInventoryComponent;

export default {
  title: 'Components/Game Inventory',
  component: GameInventoryComponent,
  // decorators: [moduleMetadata({ imports: [] })],
  parameters: {
    docs: { description: { component: `GameInventory` } },
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

export const GameInventory: StoryObj<ComponentWithCustomControls> = {
  render: (args) => ({ props: args }),
};
