import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {
  CraftingInfo,
  Entity,
  ENTITY_INFO,
  EntityCount,
  EntityInfo,
  MANUAL_CRAFTING_INFO,
  Recipe,
  RECIPE_INFO,
  RecipeInfo,
  Tech,
  TECH_INFO,
  TECH_OPTIONS,
  TechInfo,
} from 'src/app/shared';
import { clamp, timeOutWithProgress } from 'src/app/utils';

import { INITIAL_RESOURCES, INITIAL_TECH, InitialResource } from './game.data';
import {
  GameState,
  GameTechState,
  RecipeMachinesInfo,
  RecipeProductionInfo,
} from './game-state.model';
import { gameStateMock } from './game-state.model.mock';
import { TechState } from './tech-state.enum';

@Injectable({ providedIn: 'root' })
export class GameService {
  private readonly _gameState: GameState = gameStateMock();
  public get gameState(): GameState {
    return this._gameState;
  }

  private _selectedEntity?: Entity = undefined;
  public get selectedEntity(): Entity | undefined {
    // console.log('get selectedEntity', this._selectedEntity);
    return this._selectedEntity;
  }
  public set selectedEntity(entity: Entity | undefined) {
    this._selectedEntity = entity;
    // console.log('set selectedEntity', this._selectedEntity);
  }

  private makeRecipe$: Subject<Recipe> = new Subject<Recipe>();
  private techResearched: Subject<Tech> = new Subject<Tech>();
  public techResearchDone$ = this.techResearched.asObservable();

  private updateTechStates() {
    // console.log('updateTechStates');
    TECH_OPTIONS.forEach((tech: Tech) => {
      const gameTechState: GameTechState = this.gameState.techInfo[tech];
      if (gameTechState.state === TechState.Researched) return;

      const techInfo: TechInfo = TECH_INFO[tech];

      const available: boolean = techInfo.requiredTech.every(
        (t: Tech): boolean =>
          this.gameState.techInfo[t].state === TechState.Researched,
      );

      if (available) {
        gameTechState.state = TechState.Available;
      }
    });
  }

  constructor() {
    INITIAL_RESOURCES.forEach((r: InitialResource): void => {
      this.gameState.entityInventory[r.id].count += r.count;
    });

    this.updateTechStates();

    INITIAL_TECH.forEach((t: Tech): void => {
      this.researchTech(t, true, true);
    });

    this.makeRecipe$
      // .pipe(tap((r) => console.log('makeRecipe$-tap', r)))
      .subscribe((recipe: Recipe): void => {
        this.makeRecipeAutomatically(recipe);
      });
  }

  public unlockEntity(entity: Entity): void {
    this.gameState.entityInventory[entity].unlocked = true;
  }

  private tryAutoCraft(recipe: Recipe): void {
    // console.log('tryAutoCraft', recipe);
    setTimeout((): void => {
      this.makeRecipe$.next(recipe);
    }, 1000);
  }

  public makeRecipeAutomatically(recipe: Recipe): void {
    // console.log('makeRecipeAutomatically', recipe);
    // debugger;
    const recipeProduction: RecipeProductionInfo =
      this.gameState.recipeProduction[recipe];
    if (!recipeProduction.autoCraftingEnabled) return;

    const recipeInfo: RecipeInfo = RECIPE_INFO[recipe];

    // Recipe can be made in multiple machines (tiers)
    recipeProduction.machines.forEach(
      (producerInfo: RecipeMachinesInfo): void => {
        // Check how many producers are freed up
        const producersIdle: number =
          producerInfo.count - producerInfo.crafting;
        if (producersIdle < 1) return;

        const producerCraftingInfo: CraftingInfo | undefined =
          ENTITY_INFO[producerInfo.id].factoryData;

        // TODO:  No crafting info for SolarPanel
        if (!producerCraftingInfo)
          throw new Error('No crafting info for ' + producerInfo.id);

        // TODO: Check how many can actually work based on recourses
        let producersToDoCrafting: number = producersIdle;
        recipeInfo.consumes.forEach(
          (consumedRecipeEntity: EntityCount): void => {
            producersToDoCrafting = Math.min(
              Math.floor(
                // producers = inventory count / recipe count
                this.gameState.entityInventory[consumedRecipeEntity.id].count /
                  consumedRecipeEntity.count,
              ),
              producersToDoCrafting,
            );
          },
        );

        if (producersToDoCrafting < 1) {
          // console.warn('No producers to do crafting', recipe, producerInfo);
          // this.tryAutoCraft(recipe);
          return;
        }

        //TODO: Check how many can actually work based on producer energy requirements
        // producers can take from multiple energy sources but one for each not mixed into one producer
        // figure out how many each energy source can support based on inventory, then go one by one maxing out each energy source
        const producersToPowerWithEnergy: {
          producerCount: number;
          energyEntity: Entity;
          energyCount: number;
        }[] = [];
        if (producerCraftingInfo.energySources.length > 0) {
          const availableEnergySupply = producerCraftingInfo.energySources.map(
            (energyEntity: Entity) => {
              const energyEntityInfo: EntityInfo = ENTITY_INFO[energyEntity];

              const energyCountAvailable: number =
                this.gameState.entityInventory[energyEntity].count;
              const energyValueAvailable: number =
                energyCountAvailable * (energyEntityInfo.energy ?? 0);

              const energyEntityCanSupplyXProducerCount: number = Math.floor(
                energyValueAvailable /
                  recipeEnergyConsumptionForProducer(
                    recipeInfo,
                    producerCraftingInfo,
                  ),
              );

              return { energyEntity, energyEntityCanSupplyXProducerCount };
            },
          );

          // Figure out what energy source to use for how many producers
          // TODO Which source to use first if many?? (settings global/blacklist?) using default array order one by one for now...
          let producersNeedMoreEnergy: number = producersToDoCrafting;

          for (const energyInfo of availableEnergySupply) {
            // 0 = max(0,-2) = 3 producers - 5 can be supported
            // 2 = max(0,2) = 3 producers - 1 can be supported
            // producersToDoCrafting - energyInfo.energyEntityCanSupplyXProducerCount;
            // const producersNeedMoreEnergy:number = Math.max(0, producersToDoCrafting - energyInfo.energyEntityCanSupplyXProducerCount);

            // 3 = min(3,5) = 3 producers, 5 can be supported
            // 1 = min(3,1) = 3 producers, 1 can be supported
            const producersThatCanBePowered: number = Math.min(
              producersNeedMoreEnergy,
              energyInfo.energyEntityCanSupplyXProducerCount,
            );
            if (!producersThatCanBePowered) continue;

            const energyEntityInfo: EntityInfo =
              ENTITY_INFO[energyInfo.energyEntity];

            producersNeedMoreEnergy -= producersThatCanBePowered;
            if (!energyEntityInfo.energy) throw new Error('no energy data');
            producersToPowerWithEnergy.push({
              energyEntity: energyInfo.energyEntity,
              producerCount: producersThatCanBePowered,
              energyCount:
                (producersThatCanBePowered *
                  recipeEnergyConsumptionForProducer(
                    recipeInfo,
                    producerCraftingInfo,
                  )) /
                energyEntityInfo.energy,
            });

            // Every producer has enough energy
            if (producersNeedMoreEnergy < 1) break;
          }

          if (producersToPowerWithEnergy.length < 1) {
            // console.warn(
            //   'No producers to power with energy',
            //   recipe,
            //   producerInfo,
            // );
            // this.tryAutoCraft(recipe);
            return;
          }

          producerInfo.crafting = clamp(
            producerInfo.crafting + producersToPowerWithEnergy.length,
            0,
            producerInfo.count,
          );

          recipeInfo.consumes.forEach((c: EntityCount): void => {
            this.gameState.entityInventory[c.id].count -=
              c.count * producersToPowerWithEnergy.length;
          });

          producersToPowerWithEnergy.forEach(
            (p: {
              energyEntity: Entity;
              producerCount: number;
              energyCount: number;
            }) => {
              this.gameState.entityInventory[p.energyEntity].count -=
                p.energyCount;
            },
          );
        } else {
          producerInfo.crafting = producerInfo.count;
        }

        /** Convert to milliseconds; e.g. craft speed of 2 means less time */
        const duration: number =
          1000 * recipeCraftTimeForProducer(recipeInfo, producerCraftingInfo);

        // Craft with max machines we can
        setTimeout((): void => {
          // debugger;
          // Recipe Done
          recipeInfo.produces.forEach((producedEntity: EntityCount): void => {
            if (producerCraftingInfo.energySources.length > 0) {
              this.gameState.entityInventory[producedEntity.id].count +=
                producedEntity.count * producersToPowerWithEnergy.length;
            } else {
              this.gameState.entityInventory[producedEntity.id].count +=
                producedEntity.count * producerInfo.count;
            }
          });

          if (producerCraftingInfo.energySources.length > 0) {
            producerInfo.crafting = clamp(
              producerInfo.crafting - producersToPowerWithEnergy.length,
              0,
              producerInfo.count,
            );
          } else {
            producerInfo.crafting = 0;
          }

          this.makeRecipe$.next(recipe);
        }, duration);

        // Not all machines are crafting, trigger crafting again
        if (producerInfo.crafting < producerInfo.count) {
          // console.log(
          //   'Not all machines are crafting, trigger crafting again',
          //   recipe,
          //   producerInfo,
          // );
          // this.tryAutoCraft(recipe);
        } else {
          // console.log('All machines are crafting', recipe, producerInfo);
        }
      },
    );
    // console.log('makeRecipeAutomatically-END', recipe);
    this.tryAutoCraft(recipe);
  }

  public toggleAutoCrafting(recipe: Recipe, forceTo?: boolean): void {
    const recipeProduction: RecipeProductionInfo =
      this.gameState.recipeProduction[recipe];

    if (forceTo != null) {
      recipeProduction.autoCraftingEnabled = forceTo;
    } else {
      recipeProduction.autoCraftingEnabled =
        !recipeProduction.autoCraftingEnabled;
    }

    this.makeRecipe$.next(recipe);
  }

  public makeRecipeManually(recipe: Recipe): void {
    const recipeInfo: RecipeInfo = RECIPE_INFO[recipe];
    if (recipeInfo.machineRequired) return;
    const recipeProduction: RecipeProductionInfo =
      this.gameState.recipeProduction[recipe];
    if (recipeProduction.manualCraftingProgress != null) return;

    // Enough ingredients to craft?
    const recipeHasIngredients: boolean = recipeInfo.consumes.every(
      (c) => this.gameState.entityInventory[c.id].count >= c.count,
    );

    if (!recipeHasIngredients) return;

    recipeInfo.consumes.forEach((c: EntityCount): void => {
      this.gameState.entityInventory[c.id].count -= c.count;
    });

    /** Convert to milliseconds; e.g. craft speed of 2 means less time */
    const duration: number =
      1000 * recipeCraftTimeForProducer(recipeInfo, MANUAL_CRAFTING_INFO);

    timeOutWithProgress(
      duration,
      (progress: number): void => {
        recipeProduction.manualCraftingProgress = Math.min(progress, 100);
      },
      (): void => {
        // Recipe Done
        recipeInfo.produces.forEach((p: EntityCount): void => {
          this.gameState.entityInventory[p.id].count += p.count;
        });
        recipeProduction.manualCraftingProgress = 0;
        recipeProduction.manualCraftingProgress = undefined;
      },
    );
  }

  /**
   * 
    // find producer to upgrade to
    // then find how many in inventory
    // transfer current producer from recipe producer to inventory
    // transfer upgraded producer from inventory to recipe machine
   */
  public upgradeRecipeProducers(
    selectedRecipe: Recipe,
    producer: RecipeMachinesInfo,
    producerIdx: number,
  ): void {
    // find producer to upgrade to
    const recipeProducers: RecipeMachinesInfo[] =
      this.gameState.recipeProduction[selectedRecipe].machines;

    if (producerIdx < 0 || producerIdx >= recipeProducers.length) return;

    const producerToUpgrade: RecipeMachinesInfo | undefined =
      recipeProducers[producerIdx - 1];
    if (!producerToUpgrade) return;

    const inventoryCount: number =
      this.gameState.entityInventory[producerToUpgrade.id].count;
    if (!inventoryCount) return;

    const howManyToReplace: number = Math.min(inventoryCount, producer.count);

    this.gameState.entityInventory[producerToUpgrade.id].count -=
      howManyToReplace;
    producerToUpgrade.count += howManyToReplace;

    producer.count -= howManyToReplace;
    this.gameState.entityInventory[producer.id].count += howManyToReplace;
  }

  public addMaxRecipeProducers(
    selectedRecipe: Recipe,
    producer: RecipeMachinesInfo,
  ): void {
    const inventoryCount: number =
      this.gameState.entityInventory[producer.id].count;
    if (inventoryCount > 0) {
      this.gameState.entityInventory[producer.id].count -= inventoryCount;
      producer.count += inventoryCount;
    }
    this.toggleAutoCrafting(selectedRecipe, true);
  }

  public removeAllRecipeProducers(
    selectedRecipe: Recipe,
    producer: RecipeMachinesInfo,
  ): void {
    if (producer.count > 0) {
      this.gameState.entityInventory[producer.id].count += producer.count;
      producer.count = 0;
    }
  }

  public addToRecipeProducers(
    selectedRecipe: Recipe,
    producer: RecipeMachinesInfo,
  ): void {
    const inventoryCount: number =
      this.gameState.entityInventory[producer.id].count;
    if (inventoryCount > 0) {
      this.gameState.entityInventory[producer.id].count -= 1;
      producer.count += 1;
    }
    this.toggleAutoCrafting(selectedRecipe, true);
  }

  public removeFromRecipeProducers(
    selectedRecipe: Recipe,
    producer: RecipeMachinesInfo,
  ): void {
    if (producer.count > 0) {
      producer.count -= 1;
      this.gameState.entityInventory[producer.id].count += 1;
    }
  }

  public researchTech(
    tech: Tech,
    instant: boolean = false,
    force: boolean = false,
  ): void {
    if (!force) {
      const requirementsMet: boolean = TECH_INFO[tech].requiredEntities.every(
        (item: EntityCount): boolean => {
          if (this.gameState.entityInventory[item.id].count < item.count) {
            return false;
          }
          return true;
        },
      );

      if (!requirementsMet) {
        console.error('Requirements not met for tech: ', tech);
        return;
      }

      TECH_INFO[tech].requiredEntities.forEach((item: EntityCount): void => {
        this.gameState.entityInventory[item.id].count -= item.count;
      });
    }
    const duration: number = instant ? 0 : TECH_INFO[tech].time * 1000;
    timeOutWithProgress(
      duration,
      (progress: number): void => {
        this.gameState.techInfo[tech].researchProgress = progress;
      },
      (): void => {
        this.onResearchComplete(tech);
      },
    );

    // TODO: Recalculate which recipes are available?
  }

  private onResearchComplete(tech: Tech): void {
    this.gameState.techInfo[tech].state = TechState.Researched;
    this.techResearched.next(tech);

    TECH_INFO[tech].unlocksEntities.forEach((entity: Entity): void => {
      this.gameState.entityInventory[entity].unlocked = true;
    });

    this.updateTechStates();
  }
}

function recipeEnergyConsumptionForProducer(
  recipeInfo: RecipeInfo,
  producerCraftingInfo: CraftingInfo,
): number {
  return (
    producerCraftingInfo.energyConsumption *
    recipeCraftTimeForProducer(recipeInfo, producerCraftingInfo)
  );
}

/** @ref https://wiki.factorio.com/Mining#Mining_speed_formula */
function recipeCraftTimeForProducer(
  recipeInfo: RecipeInfo,
  producerCraftingInfo: CraftingInfo,
): number {
  return recipeInfo.time / producerCraftingInfo.craftSpeed;
}
