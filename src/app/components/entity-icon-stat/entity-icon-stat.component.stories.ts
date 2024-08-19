import { Meta, StoryObj } from '@storybook/angular';

import { EntityIconStatComponent } from './entity-icon-stat.component';

type ComponentWithCustomControls = EntityIconStatComponent;

export default {
  title: 'Components/Entity Icon Stat',
  component: EntityIconStatComponent,
  // decorators: [moduleMetadata({ imports: [] })],
  parameters: {
    docs: { description: { component: `EntityIconStat` } },
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
  args: {
    entityIconStat: {
      icon: 'fa-solid fa-bolt',
      count: 60000,
      unit: 'J',
      display: 'Energy',
    },
  },
} satisfies Meta<ComponentWithCustomControls>;

export const EntityIconStat: StoryObj<ComponentWithCustomControls> = {
  render: (args) => ({ props: args }),
};
