import { Meta, StoryObj } from '@storybook/angular';

import { RecipeCardComponent } from './recipe-card.component';
import { Entity, Recipe, RECIPE_INFO } from 'src/app/shared';

type ComponentWithCustomControls = RecipeCardComponent;

export default {
  title: 'Components/Recipe Card',
  component: RecipeCardComponent,
  // decorators: [moduleMetadata({ imports: [] })],
  parameters: {
    docs: { description: { component: `RecipeCard` } },
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
    recipe: {
      id: Recipe.ElectronicCircuit,
      display: 'Recipe Display',
      producedIn: new Set([Entity.Assembler1, Entity.Assembler2]),
      produces: [{ id: Entity.StoneBrick, count: 1 }],
      consumes: [{ id: Entity.DepositStone, count: 1 }],
      machineRequired: true,
      time: 1,
    },
    shownRecipeIdx: 0,
  },
} satisfies Meta<ComponentWithCustomControls>;

export const RecipeCard: StoryObj<ComponentWithCustomControls> = {
  render: (args) => ({ props: args }),
};
