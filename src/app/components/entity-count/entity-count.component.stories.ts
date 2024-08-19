import { Meta, StoryObj } from '@storybook/angular';

import { EntityCountComponent, IconCount } from './entity-count.component';
import { Entity, FactorioIcon } from 'src/app/shared';

type ComponentWithCustomControls = EntityCountComponent;

export default {
  title: 'Components/Entity Count',
  component: EntityCountComponent,
  // decorators: [moduleMetadata({ imports: [] })],
  parameters: {
    docs: { description: { component: `EntityCount` } },
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
    iconCount: {
      icon: FactorioIcon.RawCopper,
      display: 'Display',
      count: 10,
    } satisfies IconCount,
  },
} satisfies Meta<ComponentWithCustomControls>;

export const EntityCount: StoryObj<ComponentWithCustomControls> = {
  render: (args) => ({ props: args }),
};
