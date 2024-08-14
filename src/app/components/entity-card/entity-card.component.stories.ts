import { Meta, StoryObj } from '@storybook/angular';

import { EntityCardComponent } from './entity-card.component';
import { Entity, ENTITY_OPTIONS } from 'src/app/shared';

type ComponentWithCustomControls = EntityCardComponent;

export default {
  title: 'Components/Entity Card',
  component: EntityCardComponent,
  // decorators: [moduleMetadata({ imports: [] })],
  parameters: {
    docs: { description: { component: `EntityCard` } },
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
    entity: Entity.RawIron,
  },
} satisfies Meta<ComponentWithCustomControls>;

export const EntityCard: StoryObj<ComponentWithCustomControls> = {
  render: (args) => ({ props: args }),
};
