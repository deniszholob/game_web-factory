import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { APP_MODIFIED_DATE } from './app.modified';
import { HeaderComponent } from './layout';
import { NgTemplateTypedDirective } from './utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [':host{display:contents}'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgTemplateTypedDirective,
    HeaderComponent,
  ],
})
export class AppComponent {
  protected readonly APP_MODIFIED_DATE: number = APP_MODIFIED_DATE;
}
