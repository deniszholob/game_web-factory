import { CommonModule } from '@angular/common';
import { Component, effect, input, InputSignal } from '@angular/core';
import {
  Entity,
  ENTITY_INFO,
  ENTITY_OPTIONS,
  ENTITY_TYPE_INFO,
  ENTITY_TYPE_OPTIONS,
  EntityType,
  groupEntitiesByType,
  Recipe,
  RECIPE_INFO,
  RECIPE_INFO_OPTIONS,
} from 'src/app/shared';
import { GameService } from 'src/app/shared/game-logic/game.service';
import { ClampPercentPipe, NumberFormatSuffixPipe } from 'src/app/utils';
import { wrapValue } from 'src/app/utils/number/number.util';

import { EntityCardComponent } from '../entity-card/entity-card.component';
import {
  FactorioIconComponent,
  IconSizes,
} from '../factorio-icon/factorio-icon.component';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';

@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styles: [':host{display:contents}'],
  standalone: true,
  imports: [
    CommonModule,
    FactorioIconComponent,
    NumberFormatSuffixPipe,
    ClampPercentPipe,
    RecipeCardComponent,
    EntityCardComponent,
  ],
})
export class ItemInfoComponent {
  protected readonly IconSizes = IconSizes;

  protected readonly EntityType = EntityType;
  protected readonly ENTITY_TYPE_OPTIONS = ENTITY_TYPE_OPTIONS;
  protected readonly ENTITY_TYPE_INFO = ENTITY_TYPE_INFO;

  protected readonly Entity = Entity;
  protected readonly ENTITY_OPTIONS = ENTITY_OPTIONS;
  protected readonly ENTITY_INFO = ENTITY_INFO;

  protected readonly Recipe = Recipe;
  protected readonly RECIPE_INFO = RECIPE_INFO;
  protected readonly RECIPE_INFO_OPTIONS = RECIPE_INFO_OPTIONS;

  protected readonly groupedEntities = groupEntitiesByType(ENTITY_OPTIONS);

  public entity: InputSignal<Entity> = input.required<Entity>();
  protected selectedEntity?: Entity;
  protected selectedEntityRecipes: Recipe[] = [];
  protected selectedRecipe?: Recipe;

  private _shownRecipeIdx?: number = undefined;
  protected set shownRecipeIdx(idx: number | undefined) {
    if (idx == null) {
      this._shownRecipeIdx = undefined;
      return;
    }
    idx = wrapValue(idx, this.selectedEntityRecipes.length);
    this._shownRecipeIdx = idx;
    this.selectedRecipe = this.selectedEntityRecipes[idx];
    this.gameService.gameState.entityInventory[this.entity()].defaultRecipe =
      this.selectedRecipe;
  }
  protected get shownRecipeIdx(): number | undefined {
    return this._shownRecipeIdx;
  }

  constructor(protected gameService: GameService) {
    effect((): void => {
      this.selectedEntity = this.entity();
      this.selectedEntityRecipes =
        this.gameService.gameState.entityInventory[this.selectedEntity].recipes;

      if (this.selectedEntityRecipes.length <= 0) {
        this.shownRecipeIdx = undefined;
        return;
      }

      const defaultRecipe: Recipe | undefined =
        this.gameService.gameState.entityInventory[this.entity()].defaultRecipe;
      const defaultRecipeIdx: number = this.selectedEntityRecipes.findIndex(
        (r) => r === defaultRecipe,
      );
      if (defaultRecipeIdx !== -1) {
        this.shownRecipeIdx = defaultRecipeIdx;
        return;
      }

      this.shownRecipeIdx = 0;
    });
  }

  protected previousRecipe(): void {
    if (this.shownRecipeIdx == null) return;
    this.shownRecipeIdx--;
  }

  protected nextRecipe(): void {
    if (this.shownRecipeIdx == null) return;
    this.shownRecipeIdx++;
  }
}
