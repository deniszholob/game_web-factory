import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { ENTITY_INFO, RecipeInfo } from 'src/app/shared';
import { GameService } from 'src/app/shared/game-logic/game.service';
import { ClampPercentPipe, NumberFormatSuffixPipe } from 'src/app/utils';

import { IconCount } from '../entity-count/entity-count.component';
import {
  EntityCountListComponent,
  IconCountList,
} from '../entity-count-list/entity-count-list.component';
import { FactorioIconComponent } from '../factorio-icon/factorio-icon.component';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styles: [':host{display:contents}'],
  standalone: true,
  imports: [
    CommonModule,
    FactorioIconComponent,
    ClampPercentPipe,
    NumberFormatSuffixPipe,
    EntityCountListComponent,
  ],
})
export class RecipeCardComponent {
  protected ENTITY_INFO = ENTITY_INFO;
  public recipe = input.required<RecipeInfo>();
  public shownRecipeIdx = input<number>();

  public existUnlockedMachines = computed((): boolean => {
    return this.gameService.gameState.recipeProduction[
      this.recipe().id
    ].machines.some(
      (factory) =>
        this.gameService.gameState.entityInventory[factory.id].unlocked,
    );
  });

  public unlockedFactories = computed(() => {
    return this.gameService.gameState.recipeProduction[
      this.recipe().id
    ].machines.filter(
      (factory) =>
        this.gameService.gameState.entityInventory[factory.id].unlocked,
    );
  });

  protected cardInfo = computed((): IconCountList[] => {
    return [
      {
        title: 'Produces',
        entityCounts: this.recipe().produces.map(
          (entity): IconCount => ({
            icon: ENTITY_INFO[entity.id].icon,
            display: ENTITY_INFO[entity.id].display,
            count: entity.count,
          }),
        ),
      },
      {
        title: 'Consumes',
        entityCounts: this.recipe().consumes.map(
          (entity): IconCount => ({
            icon: ENTITY_INFO[entity.id].icon,
            display: ENTITY_INFO[entity.id].display,
            count: entity.count,
          }),
        ),
      },
    ];
  });

  constructor(protected gameService: GameService) {}
}
