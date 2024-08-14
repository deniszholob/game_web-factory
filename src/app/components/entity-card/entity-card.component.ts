import { CommonModule } from '@angular/common';
import { Component, computed, input, InputSignal, Signal } from '@angular/core';
import { Entity, ENTITY_INFO, EntityInfo } from 'src/app/shared';

import { FactorioIconComponent } from '../factorio-icon/factorio-icon.component';

@Component({
  selector: 'app-entity-card',
  templateUrl: './entity-card.component.html',
  // styles: [':host{display:contents}'],
  standalone: true,
  imports: [CommonModule, FactorioIconComponent],
})
export class EntityCardComponent {
  public entity: InputSignal<Entity> = input.required();

  protected entityInfo: Signal<EntityInfo> = computed(
    (): EntityInfo => ENTITY_INFO[this.entity()],
  );
}
