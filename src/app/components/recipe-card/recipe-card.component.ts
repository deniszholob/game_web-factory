import { CommonModule } from '@angular/common';
import { Component, computed, input, InputSignal, Signal } from '@angular/core';
import {
  Entity,
  ENTITY_INFO,
  ENTITY_TYPE_INFO,
  FactorioWikiIcon,
  GameService,
  InventoryEntityMachinesInfo,
  InventoryRecipe,
  RECIPE_INFO,
  RecipeInfo,
} from 'src/app/shared';

import {
  FactorioIconComponent,
  IconSizes,
} from '../factorio-icon/factorio-icon.component';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styles: [':host{display:contents}'],
  standalone: true,
  imports: [CommonModule, FactorioIconComponent],
})
export class RecipeCardComponent {
  protected readonly FactorioIcon = FactorioWikiIcon;
  protected readonly IconSizes = IconSizes;

  protected readonly ENTITY_TYPE_INFO = ENTITY_TYPE_INFO;
  protected readonly ENTITY_INFO = ENTITY_INFO;

  public inventoryEntity: InputSignal<Entity> = input.required<Entity>();

  public inventoryRecipe: InputSignal<InventoryRecipe> =
    input.required<InventoryRecipe>();

  public recipeInfo: Signal<RecipeInfo> = computed(
    (): RecipeInfo => RECIPE_INFO[this.inventoryRecipe().id],
  );

  public producers: Signal<InventoryEntityMachinesInfo[]> = computed(
    (): InventoryEntityMachinesInfo[] => {
      const q = this.inventoryRecipe().machines;
      // console.log(this.inventoryRecipe());
      return q;
    },
  );

  constructor(protected gameService: GameService) {}
}
