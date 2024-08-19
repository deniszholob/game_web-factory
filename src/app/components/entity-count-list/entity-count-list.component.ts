import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

import {
  EntityCountComponent,
  IconCount,
} from '../entity-count/entity-count.component';

export interface IconCountList {
  title: string;
  entityCounts: IconCount[];
}

@Component({
  selector: 'app-entity-count-list',
  templateUrl: './entity-count-list.component.html',
  styles: [':host{display:contents}'],
  standalone: true,
  imports: [CommonModule, EntityCountComponent],
})
export class EntityCountListComponent {
  public entityCountList = input.required<IconCountList>();
}
