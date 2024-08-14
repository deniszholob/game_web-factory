import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import {
  NgTemplateContext,
  NgTemplateContextImplicit,
  NgTemplateTypedDirective,
} from './ng-template-typed.directive';

// Use if need more variables to pass in and don't want to do it all in implicit as an object
interface MyContext extends NgTemplateContext {
  $implicit: string;
  myVar: number;
}
// Simpler version: just define the type, can be an object that contains all variables
type MyImplicitContext = NgTemplateContextImplicit<string>;

@Component({
  selector: 'app-template-type-example',
  template: `
    <h1>MyImplicitContext Example</h1>
    <ng-template
      #MyImplicitContextTemplate="ngTemplateType"
      [ngTemplateType]="MyImplicitContext"
      let-value
    >
      {{ value }}
    </ng-template>

    <ng-container
      *ngTemplateOutlet="
        MyImplicitContextTemplate.template;
        context: { $implicit: data }
      "
    >
    </ng-container>

    <h1>MyContext Example</h1>
    <ng-template
      #MyContextTemplate="ngTemplateType"
      [ngTemplateType]="MyContext"
      let-value
      let-myVar="myVar"
    >
      {{ value }}
      {{ myVar }}
    </ng-template>

    <ng-container
      *ngTemplateOutlet="
        MyContextTemplate.template;
        context: { $implicit: data, myVar: id }
      "
    >
    </ng-container>
  `,
  standalone: true,
  styles: [':host{display:contents}'],
  imports: [CommonModule, NgTemplateTypedDirective],
})
export class NgTemplateTypeExampleComponent {
  // Make "Types" available to the template
  protected readonly MyImplicitContext!: MyImplicitContext;
  protected readonly MyContext!: MyContext;

  // Actual Data
  protected data: string = 'Data';
  protected id: number = 1;
}
