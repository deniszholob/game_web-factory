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
    // /** === Input Mapping === */
    inventoryRecipe: {
      options: [...Object.values(Recipe)],
      // mapping: Recipe,
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
    inventoryRecipe: {
      id: Recipe.Assembler1,
      machines: [
        {
          id: Entity.Assembler1,
          isCrafting: [true, false],
        },
      ],
    },
  },
} satisfies Meta<ComponentWithCustomControls>;

export const RecipeCard: StoryObj<ComponentWithCustomControls> = {
  render: (args) => ({ props: args }),
};
