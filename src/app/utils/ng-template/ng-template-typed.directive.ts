import { Directive, Input, TemplateRef } from '@angular/core';
/**
 * @ref https://github.com/angular/angular/issues/28731
 * @ref https://github.com/angular/components/issues/22290
 * @ref https://nartc.me/blog/typed-mat-cell-def/
 * @ref https://angular.dev/guide/directives/structural-directives#typing-the-directives-context
 *
 * @usage
 * **.ts**
 ```ts
    // Use if need more variables to pass in and don't want to do it all in implicit as an object
    interface MyContext extends NgTemplateContext {
      $implicit: string;
      myVar: number;
    }
    // Simpler version: just define the type, can be an object that contains all variables
    type MyImplicitContext = NgTemplateContextImplicit<string>;
    ...
    imports: [NgTemplateTypedDirective],
    ...
    // Make "Types" available to the template
    protected readonly MyImplicitContext!: MyImplicitContext;
    protected readonly MyContext!: MyContext;

    // Actual Data
    protected data: string = 'Data';
    protected id: number = 1;
  ```
 * **.html**
  ```html
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
  ```

 * **.html**
  ```
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
  ```
 */
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'ng-template',
  exportAs: 'ngTemplateType',
  standalone: true,
})
export class NgTemplateTypedDirective<T extends NgTemplateContext> {
  @Input()
  public ngTemplateType!: T;

  constructor(public template: TemplateRef<T>) {}

  public static ngTemplateContextGuard<T extends NgTemplateContext>(
    _dir: NgTemplateTypedDirective<T>,
    ctx: unknown,
  ): ctx is T {
    return true;
  }
}

/** Extend for custom context */
export interface NgTemplateContext {
  $implicit?: unknown;
}

/** Use this 99% of the time
 *
 * Simple context that puts the type onto the implicit
 */
export interface NgTemplateContextImplicit<T> extends NgTemplateContext {
  $implicit: T;
}
