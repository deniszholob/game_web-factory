import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dev-page',
  templateUrl: './dev-page.component.html',
  styles: [':host{display:contents}'],
  standalone: true,
  imports: [CommonModule],
})
export class DevPageComponent {}
