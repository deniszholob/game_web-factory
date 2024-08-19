import { Meta, StoryObj } from '@storybook/angular';

import { TechnologyCardComponent } from './technology-card.component';
import { Entity, FactorioWikiIcon, Tech, TECH_INFO } from 'src/app/shared';

type ComponentWithCustomControls = TechnologyCardComponent;

export default {
  title: 'Components/Technology Card',
  component: TechnologyCardComponent,
  // decorators: [moduleMetadata({ imports: [] })],
  parameters: {
    docs: { description: { component: `TechnologyCard` } },
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
    techInfo: {
      id: Tech.StoneProspecting,
      display: 'Mock Tech',
      icon: FactorioWikiIcon.Toolbeltresearch,
      requiredEntities: [
        { id: Entity.RawStone, count: 1000 },
        { id: Entity.RawIron, count: 13 },
      ],
      unlocksEntities: [Entity.StoneBrick, Entity.FurnaceStone],
      requiredTech: [Tech.StoneProspecting, Tech.Automation2],
      time: 1000,
    },
  },
} satisfies Meta<ComponentWithCustomControls>;

export const TechnologyCard: StoryObj<ComponentWithCustomControls> = {
  render: (args) => ({ props: args }),
};
