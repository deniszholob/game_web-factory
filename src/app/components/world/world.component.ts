import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NumberFormatSuffixPipe } from 'src/app/core';
import {
  Entity,
  ENTITY_INFO,
  ENTITY_OPTIONS,
  ENTITY_TYPE_INFO,
  ENTITY_TYPE_OPTIONS,
  EntityHasProducersPipe,
  GameService,
  groupEntitiesByType,
  InventoryEntityInfo,
} from 'src/app/shared';
import {
  RECIPE_INFO,
  RECIPE_INFO_OPTIONS,
  RECIPE_OPTIONS,
} from 'src/app/shared/models/recipe.enum';

import { EntityCardComponent } from '../entity-card/entity-card.component';
import {
  FactorioIconComponent,
  IconSizes,
} from '../factorio-icon/factorio-icon.component';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';

@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styles: [':host{display:contents}'],
  standalone: true,
  imports: [
    CommonModule,
    EntityCardComponent,
    FactorioIconComponent,
    NumberFormatSuffixPipe,
    RecipeCardComponent,
    EntityHasProducersPipe,
  ],
})
export class WorldComponent {
  protected readonly IconSizes = IconSizes;
  protected readonly ENTITY_TYPE_OPTIONS = ENTITY_TYPE_OPTIONS;
  protected readonly ENTITY_TYPE_INFO = ENTITY_TYPE_INFO;
  protected readonly ENTITY_OPTIONS = ENTITY_OPTIONS;
  protected readonly ENTITY_INFO = ENTITY_INFO;
  protected readonly RECIPE_INFO = RECIPE_INFO;
  protected readonly RECIPE_INFO_OPTIONS = RECIPE_INFO_OPTIONS;
  protected readonly groupedEntities = groupEntitiesByType(ENTITY_OPTIONS);

  protected inventoryEntity: Record<Entity, InventoryEntityInfo> =
    this.gameService.inventoryForEntities;
  // protected inventoryRecipe: Record<Recipe, InventoryRecipeInfo> =
  //   this.gameService.inventoryRecipe;

  constructor(protected gameService: GameService) {
    console.log({
      ENTITY_TYPE_OPTIONS,
      ENTITY_TYPE_INFO,
      ENTITY_OPTIONS,
      ENTITY_INFO,
      RECIPE_OPTIONS,
      RECIPE_INFO,
      groupedEntities: this.groupedEntities,
      inventoryEntity: this.inventoryEntity,
      // inventoryRecipe: this.inventoryRecipe,
    });
  }
}
