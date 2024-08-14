import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ThemeToggleService } from 'src/app/utils';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  // styles: [':host{display:contents}'],
  standalone: true,
  imports: [CommonModule],
})
export class ThemeToggleComponent {
  constructor(protected themeToggleService: ThemeToggleService) {}
}
