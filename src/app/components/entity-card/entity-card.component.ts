import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  Signal,
} from '@angular/core';
import {
  Entity,
  ENTITY_INFO,
  ENTITY_TYPE_INFO,
  EntityInfo,
  EntityTypeInfo,
} from 'src/app/shared';
import { GameService } from 'src/app/shared/game-logic/game.service';
import { NumberFormatSuffixPipe } from 'src/app/utils';

import { IconCount } from '../entity-count/entity-count.component';
import { EntityCountListComponent } from '../entity-count-list/entity-count-list.component';
import { EntityIconStatComponent } from '../entity-icon-stat/entity-icon-stat.component';
import {
  FactorioIconComponent,
  IconSizes,
} from '../factorio-icon/factorio-icon.component';

@Component({
  selector: 'app-entity-card',
  templateUrl: './entity-card.component.html',
  // styles: [':host{display:contents}'],
  standalone: true,
  imports: [
    CommonModule,
    FactorioIconComponent,
    NumberFormatSuffixPipe,
    EntityIconStatComponent,
    EntityCountListComponent,
  ],
})
export class EntityCardComponent {
  protected readonly IconSizes = IconSizes;

  public entity: InputSignal<Entity> = input.required();

  protected entityInfo: Signal<EntityInfo> = computed(
    (): EntityInfo => ENTITY_INFO[this.entity()],
  );

  protected entityTypeInfo: Signal<EntityTypeInfo> = computed(
    (): EntityTypeInfo => ENTITY_TYPE_INFO[this.entityInfo().type],
  );

  protected energySources = computed((): IconCount[] =>
    (this.entityInfo().factoryData?.energySources ?? []).map(
      (item): IconCount => ({
        icon: ENTITY_INFO[item].icon,
        display: ENTITY_INFO[item].display,
      }),
    ),
  );

  protected close: OutputEmitterRef<void> = output<void>();

  constructor(protected gameService: GameService) {}

  protected onClose(): void {
    this.close.emit();
    this.gameService.selectedEntity = undefined;
  }
}
