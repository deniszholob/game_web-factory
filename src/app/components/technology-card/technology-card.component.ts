import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { ENTITY_INFO, TECH_INFO, TechInfo } from 'src/app/shared';
import { GameService } from 'src/app/shared/game-logic/game.service';
import {
  TECH_STATE_INFO,
  TechState,
} from 'src/app/shared/game-logic/tech-state.enum';

import { IconCount } from '../entity-count/entity-count.component';
import {
  EntityCountListComponent,
  IconCountList,
} from '../entity-count-list/entity-count-list.component';
import {
  FactorioIconComponent,
  IconSizes,
} from '../factorio-icon/factorio-icon.component';

@Component({
  selector: 'app-technology-card',
  templateUrl: './technology-card.component.html',
  styles: [':host{display:contents}'],
  standalone: true,
  imports: [CommonModule, FactorioIconComponent, EntityCountListComponent],
})
export class TechnologyCardComponent {
  protected IconSizes = IconSizes;
  protected TechState = TechState;
  protected TECH_STATE_INFO = TECH_STATE_INFO;

  public techInfo = input.required<TechInfo>();

  protected techState = computed((): TechState => {
    return this.gameService.gameState.techInfo[this.techInfo().id].state;
  });

  protected cardInfo = computed((): IconCountList[] => {
    return [
      {
        title: 'Unlocks Recipes For',
        entityCounts: this.techInfo().unlocksEntities.map(
          (entity): IconCount => ({
            icon: ENTITY_INFO[entity].icon,
            display: ENTITY_INFO[entity].display,
          }),
        ),
      },
      {
        title: 'Requires Items',
        entityCounts: this.techInfo().requiredEntities.map(
          (entity): IconCount => ({
            icon: ENTITY_INFO[entity.id].icon,
            display: ENTITY_INFO[entity.id].display,
            count: entity.count,
          }),
        ),
      },
      {
        title: 'Prerequisite Tech',
        entityCounts: this.techInfo().requiredTech.map(
          (tech): IconCount => ({
            icon: TECH_INFO[tech].icon,
            display: TECH_INFO[tech].display,
          }),
        ),
      },
    ];
  });

  constructor(protected gameService: GameService) {}
}
