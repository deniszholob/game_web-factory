import { Pipe, PipeTransform } from '@angular/core';

import { Recipe } from '../models/recipe.enum';
import { InventoryRecipe } from '../services/game.service';

@Pipe({ name: 'appEntityHasProducers', standalone: true, pure: false })
export class EntityHasProducersPipe implements PipeTransform {
  public transform(entityRecipes: Map<Recipe, InventoryRecipe>): boolean {
    const value: boolean = [...entityRecipes.values()].some((ir) =>
      ir.machines.some((m) => m.isCrafting.length > 0),
    );
    // console.log('entityHasProducers', entityRecipes, value);
    return value;
  }
}
