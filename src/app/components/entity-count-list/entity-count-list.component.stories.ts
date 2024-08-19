import { Meta, StoryObj } from '@storybook/angular';

import { EntityCountListComponent } from './entity-count-list.component';
import { Entity, FactorioIcon } from 'src/app/shared';

type ComponentWithCustomControls = EntityCountListComponent;

export default {
  title: 'Components/Entity Count List',
  component: EntityCountListComponent,
  // decorators: [moduleMetadata({ imports: [] })],
  parameters: {
    docs: { description: { component: `EntityCountList` } },
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
    entityCountList: {
      title: 'Mock Title',
      entityCounts: [
        { icon: FactorioIcon.RawIron, display: 'Iron', count: 1 },
        { icon: FactorioIcon.RawCopper, display: 'Copper', count: 2 },
        { icon: FactorioIcon.RawStone, display: 'Stone', count: 3 },
      ],
    },
  },
} satisfies Meta<ComponentWithCustomControls>;

export const EntityCountList: StoryObj<ComponentWithCustomControls> = {
  render: (args) => ({ props: args }),
};
