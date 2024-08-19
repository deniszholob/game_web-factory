import {
  Entity,
  EntityCount,
  Recipe,
  RECIPE_INFO_OPTIONS,
  RecipeInfo,
  Tech,
} from 'src/app/shared';

import { TechState } from './tech-state.enum';

export interface GameState {
  entityInventory: Record<Entity, InventoryEntityInfo>;
  recipeProduction: Record<Recipe, RecipeProductionInfo>;
  techInfo: Record<Tech, GameTechState>;
}

export interface GameTechState {
  state: TechState;
  researchProgress: number;
}

export interface InventoryEntityInfo {
  id: Entity;
  count: number;
  unlocked: boolean;
  recipes: Recipe[];
  /** Used to default recipe cards to this recipe */
  defaultRecipe?: Recipe;

  // hasMachines: boolean;
  // problems: Problem[];

  // recipes: Map<Recipe, InventoryRecipe>;
  // manualRecipe?: Recipe;
  // machines: Map<Recipe, InventoryEntityMachinesInfo>;
  // machines: InventoryEntityMachinesInfo[];
  // recipes: Map<Recipe, InventoryEntityMachinesInfo[]>;
  // rate: number; // per second
  // productionRate: number;
  // consumptionRate: number;
}

export interface RecipeProductionInfo {
  id: Recipe;
  machines: RecipeMachinesInfo[];
  autoCraftingEnabled: boolean;
  manualCraftingProgress?: number;
}

export interface RecipeMachinesInfo {
  id: Entity;
  count: number;
  crafting: number;
}

export function findEntityRecipes(
  entity: Entity,
  filter: 'all' | 'onlySimple' | 'onlyComplex',
): Recipe[] {
  return RECIPE_INFO_OPTIONS.filter((recipe: RecipeInfo): boolean => {
    let condition: boolean = true;
    if (filter === 'onlySimple') condition = recipe.produces.length === 1;
    if (filter === 'onlyComplex') condition = recipe.produces.length > 1;

    const search: EntityCount | undefined = recipe.produces.find(
      (product: EntityCount): boolean => product.id === entity,
    );
    return condition && search != null;
  }).map((recipe: RecipeInfo): Recipe => recipe.id);
}
