import {
  Entity,
  ENTITY_OPTIONS,
  Recipe,
  RECIPE_INFO,
  RECIPE_OPTIONS,
  Tech,
  TECH_OPTIONS,
} from 'src/app/shared';

import {
  findEntityRecipes,
  GameState,
  GameTechState,
  InventoryEntityInfo,
  RecipeMachinesInfo,
  RecipeProductionInfo,
} from './game-state.model';
import { TechState } from './tech-state.enum';

export const MOCK_GameState: GameState = gameStateMock();
export function gameStateMock(): GameState {
  return {
    entityInventory: ENTITY_OPTIONS.reduce<Record<Entity, InventoryEntityInfo>>(
      (acc: Record<Entity, InventoryEntityInfo>, entity: Entity) => {
        acc[entity] = {
          id: entity,
          count: 0,
          recipes: findEntityRecipes(entity, 'all'),
          unlocked: false,
          defaultRecipe: undefined,
        };
        return acc;
      },
      {} as Record<Entity, InventoryEntityInfo>,
    ),
    recipeProduction: RECIPE_OPTIONS.reduce<
      Record<Recipe, RecipeProductionInfo>
    >(
      (acc: Record<Recipe, RecipeProductionInfo>, recipe: Recipe) => {
        acc[recipe] = {
          id: recipe,
          machines: Array.from(RECIPE_INFO[recipe].producedIn.keys()).map(
            (producer: Entity): RecipeMachinesInfo => ({
              id: producer,
              count: 0,
              crafting: 0,
            }),
          ),
          autoCraftingEnabled: false,
          manualCraftingProgress: undefined,
        };
        return acc;
      },
      {} as Record<Recipe, RecipeProductionInfo>,
    ),
    techInfo: TECH_OPTIONS.reduce<Record<Tech, GameTechState>>(
      (acc: Record<Tech, GameTechState>, tech: Tech) => {
        acc[tech] = {
          state: TechState.Locked,
          researchProgress: 0,
        };
        return acc;
      },
      {} as Record<Tech, GameTechState>,
    ),
  } as const;
}

export const MOCK_InventoryEntityInfo: InventoryEntityInfo = {
  id: Entity.Assembler1,
  count: 0,
  recipes: [Recipe.Assembler1],
  unlocked: false,
  defaultRecipe: undefined,
};

export const MOCK_RecipeProductionInfo: RecipeProductionInfo = {
  id: Recipe.Assembler1,
  machines: [],
  autoCraftingEnabled: false, // Can be moved down to the machine level for more granularity
  manualCraftingProgress: undefined,
};

export const MOCK_RecipeMachinesInfo: RecipeMachinesInfo = {
  id: Entity.Assembler1,
  count: 0,
  crafting: 0,
};
