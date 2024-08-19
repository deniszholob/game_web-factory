import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-game-stats',
  templateUrl: './game-stats.component.html',
  styles: [':host{display:contents}'],
  standalone: true,
  imports: [CommonModule],
})
export class GameStatsComponent {}
