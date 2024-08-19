import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GameService } from 'src/app/shared/game-logic/game.service';
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
import { NumberFormatSuffixPipe } from 'src/app/utils';

import {
  FactorioIconComponent,
  IconSizes,
} from '../factorio-icon/factorio-icon.component';

@Component({
  selector: 'app-game-inventory',
  templateUrl: './game-inventory.component.html',
  styles: [':host{display:contents}'],
  standalone: true,
  imports: [CommonModule, FactorioIconComponent, NumberFormatSuffixPipe],
})
export class GameInventoryComponent {
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

  constructor(protected gameService: GameService) {}
}
