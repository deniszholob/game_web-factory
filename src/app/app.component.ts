import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { APP_MODIFIED_DATE } from './app.modified';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [':host{display:contents}'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class AppComponent {
  protected readonly APP_MODIFIED_DATE: number = APP_MODIFIED_DATE;
}
