import { Meta, StoryObj } from '@storybook/angular';

import { ItemInfoComponent } from './item-info.component';
import { Entity } from 'src/app/shared';

type ComponentWithCustomControls = ItemInfoComponent;

export default {
  title: 'Components/Item Info',
  component: ItemInfoComponent,
  // decorators: [moduleMetadata({ imports: [] })],
  parameters: {
    docs: { description: { component: `ItemInfo` } },
    // layout: 'fullscreen',
  },
  argTypes: {
    /** === Input Mapping === */
    entity: {
      options: [...Object.values(Entity)],
      // mapping: YourEnum & { '---': undefined },
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
    entity: Entity.Assembler1,
  },
} satisfies Meta<ComponentWithCustomControls>;

export const ItemInfo: StoryObj<ComponentWithCustomControls> = {
  render: (args) => ({ props: args }),
};
