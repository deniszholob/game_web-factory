import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {
  CraftingInfo,
  Entity,
  ENTITY_INFO,
  ENTITY_OPTIONS,
  MANUAL_CRAFTING_INFO,
  Recipe,
  RECIPE_INFO,
  RECIPE_INFO_OPTIONS,
  RecipeInfo,
} from 'src/app/shared';

import { INITIAL_RESOURCES } from './game.data';

export interface InventoryEntityMachinesInfo {
  id: Entity;
  /** Both knows how many machines there are and which ones are crafting */
  isCrafting: boolean[];
}

interface Problem {
  id: string;
  message: string;
}

export interface InventoryRecipe {
  id: Recipe;
  machines: InventoryEntityMachinesInfo[];
}

export interface InventoryEntityInfo {
  id: Entity;
  // recipes: Map<Recipe, InventoryEntityMachinesInfo[]>;
  recipes: Map<Recipe, InventoryRecipe>;
  manualRecipe?: Recipe;
  /** Number of items */
  count: number;
  /** Rate of items per second */
  rate: number;
  productionRate: number;
  consumptionRate: number;
  isCrafting: boolean;
  craftingProgress: number;
  // machines: Map<Recipe, InventoryEntityMachinesInfo>;
  // machines: InventoryEntityMachinesInfo[];
  autoCraftingEnabled: boolean;
  hasMachines: boolean;
  problems: Problem[];
}

export interface InventoryRecipeInfo {
  // id: Recipe;
  progress: number;
  // canMake:boolean;
  inProgress: boolean;
}

@Injectable({ providedIn: 'root' })
export class GameService {
  public addToRecipeProducers(
    inventoryEntity: Entity,
    inventoryEntityRecipe: Recipe,
    producerEntity: Entity,
    producerIdx: number,
  ): void {
    // Make sure we have the producer in stock
    if (this.inventoryForEntities[producerEntity].count <= 0) return;

    this.inventoryForEntities[producerEntity].count -= 1;
    this.inventoryForEntities[inventoryEntity].recipes
      .get(inventoryEntityRecipe)
      ?.machines[producerIdx]?.isCrafting.push(false);
    this.inventoryForEntities[inventoryEntity].autoCraftingEnabled = true;
    this.updateAutoCraft(this.inventoryForEntities[inventoryEntity]);
  }

  public removeFromRecipeProducers(
    inventoryEntity: Entity,
    inventoryEntityRecipe: Recipe,
    producerEntity: Entity,
    producerIdx: number,
  ): void {
    const crafting = this.inventoryForEntities[inventoryEntity].recipes.get(
      inventoryEntityRecipe,
    )?.machines[producerIdx]?.isCrafting;
    // console.log(crafting, 'crafting before');
    if (crafting?.length) {
      this.inventoryForEntities[inventoryEntity].recipes
        .get(inventoryEntityRecipe)
        ?.machines[producerIdx]?.isCrafting.pop();

      // console.log(crafting, 'crafting after');
      if (crafting.length <= 0)
        this.inventoryForEntities[inventoryEntity].autoCraftingEnabled = false;
      this.inventoryForEntities[producerEntity].count += 1;
    }
  }

  public selectedEntity?: Entity = undefined;

  private readonly _inventoryForEntities: Record<Entity, InventoryEntityInfo> =
    ENTITY_OPTIONS.reduce<Record<Entity, InventoryEntityInfo>>(
      (acc: Record<Entity, InventoryEntityInfo>, entity: Entity) => {
        acc[entity] = entityToInventoryEntityInfo(entity);
        return acc;
      },
      {} as Record<Entity, InventoryEntityInfo>,
    );

  public get inventoryForEntities(): Record<Entity, InventoryEntityInfo> {
    return this._inventoryForEntities;
  }

  // TODO: Complex Recipes
  // private readonly _inventoryRecipe: Record<Recipe, InventoryRecipeInfo> =
  //   RECIPE_OPTIONS.reduce<Record<Recipe, InventoryRecipeInfo>>(
  //     (acc: Record<Recipe, InventoryRecipeInfo>, recipe: Recipe) => {
  //       acc[recipe] = {
  //         //id: recipe,
  //         progress: 0,
  //         inProgress: false,
  //       };
  //       return acc;
  //     },
  //     {} as Record<Recipe, InventoryRecipeInfo>,
  //   );

  // public get inventoryRecipe(): Record<Recipe, InventoryRecipeInfo> {
  //   return this._inventoryRecipe;
  // }

  private makeRecipe$ = new Subject<Entity>();

  constructor() {
    INITIAL_RESOURCES.forEach((r) => {
      this.inventoryForEntities[r.id].count += r.count;
    });

    this.makeRecipe$.subscribe((entity) => {
      this.makeInventoryEntityAutomatically(entity);
    });
  }

  private updateAutoCraft(inventoryEntityInfo: InventoryEntityInfo) {
    if (inventoryEntityInfo.autoCraftingEnabled) {
      setTimeout(() => {
        this.makeRecipe$.next(inventoryEntityInfo.id);
      });
    }
  }

  public toggleAutoCrafting(entity: Entity): void {
    this.inventoryForEntities[entity].autoCraftingEnabled =
      !this.inventoryForEntities[entity].autoCraftingEnabled;

    if (this.inventoryForEntities[entity].autoCraftingEnabled) {
      this.makeInventoryEntityAutomatically(entity);
    }
  }

  public makeInventoryEntityAutomatically(inventoryEntity: Entity) {
    const inventoryEntityInfo: InventoryEntityInfo =
      this.inventoryForEntities[inventoryEntity];

    // debugger;

    inventoryEntityInfo.recipes.forEach((inventoryRecipe: InventoryRecipe) => {
      const recipeFactorySet: InventoryEntityMachinesInfo[] =
        inventoryRecipe.machines;
      const recipe = inventoryRecipe.id;

      let hasIngredients: boolean = true;
      const problemId = `Recipe:${recipe}:Insufficient-Ingredient`;

      for (const factory of recipeFactorySet) {
        if (!hasIngredients) break;

        const factoryCount = factory.isCrafting.length;
        if (factoryCount > 0) {
          for (let i = 0; i < factoryCount; i++) {
            if (!this.recipeHasIngredients(RECIPE_INFO[recipe])) {
              hasIngredients = false;
              break;
            }

            if (factory.isCrafting.at(i) === true) continue;

            factory.isCrafting[i] = true;
            this.makeRecipe(
              inventoryEntityInfo,
              RECIPE_INFO[recipe],
              true,
              ENTITY_INFO[factory.id].factoryData ?? MANUAL_CRAFTING_INFO,
              () => {
                if (factory.isCrafting.at(i) != null)
                  factory.isCrafting[i] = false;
                this.updateAutoCraft(inventoryEntityInfo);
              },
            );
          }
        }
      }

      if (!hasIngredients) {
        inventoryEntityInfo.problems.push({
          id: problemId,
          message: `Not enough ingredients to make ${RECIPE_INFO[recipe].display}`,
        });
        this.updateAutoCraft(inventoryEntityInfo);
      } else {
        const removeProblem = inventoryEntityInfo.problems.findIndex(
          (p) => p.id === problemId,
        );
        if (removeProblem !== -1)
          inventoryEntityInfo.problems.splice(removeProblem, 1);
      }
    });
  }

  public makeInventoryEntityManually(inventoryEntity: Entity) {
    const inventoryEntityInfo: InventoryEntityInfo =
      this.inventoryForEntities[inventoryEntity];
    if (inventoryEntityInfo.isCrafting) return;
    const recipe = inventoryEntityInfo.manualRecipe;
    if (!recipe) return;
    const recipeInfo = RECIPE_INFO[recipe];
    if (recipeInfo.machineRequired) return;
    if (!this.recipeHasIngredients(recipeInfo)) return;

    inventoryEntityInfo.isCrafting = true;
    this.makeRecipe(
      inventoryEntityInfo,
      recipeInfo,
      false,
      MANUAL_CRAFTING_INFO,
      () => {
        inventoryEntityInfo.isCrafting = false;
        inventoryEntityInfo.craftingProgress = 0;
      },
    );
  }

  public recipeHasIngredients(recipe: RecipeInfo): boolean {
    return recipe.consumes.every(
      (c) => this.inventoryForEntities[c.id].count >= c.count,
    );
  }

  private makeRecipe(
    inventoryEntityInfo: InventoryEntityInfo,
    recipeInfo: RecipeInfo,
    automated: boolean,
    craftingInfo: CraftingInfo,
    done: () => void,
  ): void {
    recipeInfo.consumes.forEach((c) => {
      this.inventoryForEntities[c.id].count -= c.count;
    });

    const startTime = Date.now();
    const duration = (recipeInfo.time * 1000) / craftingInfo.craftSpeed; // Convert to milliseconds, craft speed of 2 means less time

    // ========

    const updateProgress = () => {
      // console.log('updating progress', recipe);
      const elapsed = Date.now() - startTime;
      const progress = (elapsed / duration) * 100;

      if (!automated)
        inventoryEntityInfo.craftingProgress = Math.min(progress, 100);

      if (elapsed < duration) {
        requestAnimationFrame(updateProgress);
      } else {
        // Recipe Done
        recipeInfo.produces.forEach((p) => {
          this.inventoryForEntities[p.id].count += p.count;
        });
        done();
      }
    };
    requestAnimationFrame(updateProgress);
  }

  // public makeRecipe(recipe: RecipeInfo) {
  //   // console.log('making recipe', recipe);
  //   if (this.inventoryRecipe[recipe.id].inProgress) return;
  //   // console.log('Not inprogress', this.inventoryRecipe[recipe.id].inProgress);
  //   // Should que up and await for dependencies to complete
  //   if (!this.canMakeRecipe(recipe)) return;
  //   // console.log('can make', this.canMakeRecipe(recipe));

  //   this.inventoryRecipe[recipe.id].inProgress = true;

  //   //Make recipe
  //   recipe.consumes.forEach((c) => {
  //     this.inventoryEntity[c.id].count -= c.count;
  //   });

  //   const startTime = Date.now();
  //   const duration = recipe.time * 1000; // Convert to milliseconds

  //   const updateProgress = () => {
  //     // console.log('updating progress', recipe);
  //     const elapsed = Date.now() - startTime;
  //     const progress = (elapsed / duration) * 100;
  //     this.inventoryRecipe[recipe.id].progress = Math.min(progress, 100);

  //     if (elapsed < duration) {
  //       requestAnimationFrame(updateProgress);
  //     } else {
  //       this.completeRecipe(recipe);
  //     }
  //   };

  //   requestAnimationFrame(updateProgress);

  //   // const interval = setInterval(() => {
  //   //   const inventoryRecipe = this.inventoryRecipe[recipe.id];
  //   //   inventoryRecipe.progress += 100 / recipe.time;
  //   //   console.log(
  //   //     inventoryRecipe.progress,
  //   //     this.inventoryRecipe[recipe.id].progress,
  //   //   );
  //   //   if (inventoryRecipe.progress >= 100) {
  //   //     clearInterval(interval);
  //   //     inventoryRecipe.progress = 0;

  //   //     recipe.produces.forEach((p) => {
  //   //       this.inventoryEntity[p.id].count += p.count;
  //   //     });
  //   //   }
  //   // }, 100);

  //   // const r = this.resources[resource];
  //   // if (r) r.count += 1;
  // }

  // private completeRecipe(recipe: RecipeInfo) {
  //   this.inventoryRecipe[recipe.id].inProgress = false;
  //   this.inventoryRecipe[recipe.id].progress = 0;
  //   recipe.produces.forEach((p) => {
  //     this.inventoryEntity[p.id].count += p.count;
  //   });
  // }

  // public addMachine(item: Entity, recipe: Recipe, machine: Entity) {
  //   // const machineType: EntityType = RECIPE_INFO[recipe].producedIn;
  //   const machineInfo: EntityInfo = ENTITY_INFO[machine];

  //   if (!machineInfo) return;

  //   const entityRecipeMachinesInfo =
  //     this.inventoryEntity[item].recipes.get(recipe);

  //   if (!entityRecipeMachinesInfo) {
  //     throw new Error(`Recipe ${recipe} not found in entity ${item}`);
  //     // this.inventoryEntity[entity].recipes.set(recipe, [
  //     //   {
  //     //     id: machine.id,
  //     //     count: 1,
  //     //   },
  //     // ]);

  //     // console.log(this.inventoryEntity[entity]);
  //     // this.inventoryEntity[entity].autoCraftingEnabled = true;
  //     // return;
  //   }

  //   // Make sure we have the machine made
  //   if (this.inventoryEntity[machineInfo.id].count <= 0) return;
  //   this.inventoryEntity[machineInfo.id].count -= 1;

  //   const recipeMachine = entityRecipeMachinesInfo.find(
  //     (m) => m.id === machineInfo.id,
  //   );

  //   if (!recipeMachine) {
  //     entityRecipeMachinesInfo.push({
  //       id: machineInfo.id,
  //       isCrafting: [false],
  //     });
  //     this.inventoryEntity[item].hasMachines = true;
  //     return;
  //   }

  //   recipeMachine.isCrafting.push(false);
  // }

  public removeMachine() // entity: Entity,
  // recipe: Recipe,
  : void {
    // recipeMachine.count++;
    alert('TODO: remove machine');
    // this.inventoryEntity[entity].hasMachines = false;
  }
}

function getComplexRecipes(): Recipe[] {
  return RECIPE_INFO_OPTIONS.filter((recipe) => recipe.produces.length > 1).map(
    (recipe) => recipe.id,
  );
}

function findEntityRecipes(entity: Entity): Recipe[] {
  return RECIPE_INFO_OPTIONS.filter(
    (recipe) =>
      recipe.produces.length === 1 &&
      recipe.produces.find((product) => product.id === entity),
  ).map((recipe) => recipe.id);
}

function entityToInventoryEntityInfo(entity: Entity): InventoryEntityInfo {
  const entityRecipes: Recipe[] = findEntityRecipes(entity);
  if (!entityRecipes.length) {
    console.warn(`Recipe not found for entity ${entity}`);
  }

  const inventoryRecipes = new Map<Recipe, InventoryRecipe>();
  entityRecipes.forEach((recipe) => {
    inventoryRecipes.set(recipe, {
      id: recipe,
      machines: [...RECIPE_INFO[recipe].producedIn].map((producer) => ({
        id: producer,
        isCrafting: [],
      })),
    });
  });

  const inventoryEntity: InventoryEntityInfo = {
    id: entity,
    recipes: inventoryRecipes,
    // recipes: new Map<Recipe, InventoryEntityMachinesInfo[]>(
    //   entityRecipes.map(
    //     (recipe: Recipe): [Recipe, InventoryEntityMachinesInfo[]] => [
    //       recipe,
    //       [],
    //     ],
    //   ),
    // ),
    manualRecipe: entityRecipes[0],
    count: 0,
    rate: 0,
    productionRate: 0,
    consumptionRate: 0,
    craftingProgress: 0,
    isCrafting: false,
    autoCraftingEnabled: false,
    problems: [],
    hasMachines: false,
    // machines: new Map(),
  };

  // console.log(inventoryEntity);
  return inventoryEntity;

  // throw new Error(`No recipe found for entity ${entity}`);
}
