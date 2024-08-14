import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { APP_MODIFIED_DATE } from 'src/app/app.modified';
import { ThemeToggleComponent } from 'src/app/components';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [':host{display:contents}'],
  standalone: true,
  imports: [CommonModule, ThemeToggleComponent],
})
export class HeaderComponent {
  protected readonly APP_MODIFIED_DATE: number = APP_MODIFIED_DATE;
}
