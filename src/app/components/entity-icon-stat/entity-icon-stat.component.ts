import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { NumberFormatSuffixPipe } from 'src/app/utils';

interface EntityIconStat {
  icon: string;
  count: number;
  unit: string;
  display: string;
}

@Component({
  selector: 'app-entity-icon-stat',
  templateUrl: './entity-icon-stat.component.html',
  styles: [':host{display:contents}'],
  standalone: true,
  imports: [CommonModule, NumberFormatSuffixPipe],
})
export class EntityIconStatComponent {
  public entityIconStat = input.required<EntityIconStat>();
}
