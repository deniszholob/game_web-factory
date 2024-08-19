import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FactorioIcon, FactorioWikiIcon } from 'src/app/shared';
import { NumberFormatSuffixPipe } from 'src/app/utils';

import { FactorioIconComponent } from '../factorio-icon/factorio-icon.component';

export interface IconCount {
  icon: FactorioWikiIcon | FactorioIcon;
  display: string;
  count?: number;
}

@Component({
  selector: 'app-entity-count',
  templateUrl: './entity-count.component.html',
  styles: [':host{display:contents}'],
  standalone: true,
  imports: [CommonModule, FactorioIconComponent, NumberFormatSuffixPipe],
})
export class EntityCountComponent {
  public iconCount = input.required<IconCount>();
}
