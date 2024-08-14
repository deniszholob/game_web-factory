import { CommonModule } from '@angular/common';
import { Component, computed, input, InputSignal, Signal } from '@angular/core';
import {
  FACTORIO_ICON_INFO,
  FACTORIO_WIKI_ICON_INFO,
  FactorioIcon,
  FactorioIconInfo,
  FactorioWikiIcon,
  FactorioWikiIconInfo,
  isFactorioIcon,
} from 'src/app/shared';

export enum IconSizes {
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
}

@Component({
  selector: 'app-factorio-icon',
  templateUrl: './factorio-icon.component.html',
  styles: [':host{display:contents}'],
  standalone: true,
  imports: [CommonModule],
})
export class FactorioIconComponent {
  protected readonly IconSizes = IconSizes;

  public icon: InputSignal<FactorioIcon | FactorioWikiIcon> = input.required();
  public size: InputSignal<IconSizes> = input<IconSizes>(IconSizes.md);

  protected iconData: Signal<FactorioIconInfo | FactorioWikiIconInfo> =
    computed(
      // (): IconInfo => getFactorioIconInfo(this.icon()),
      (): FactorioIconInfo | FactorioWikiIconInfo => {
        const icon: FactorioIcon | FactorioWikiIcon = this.icon();
        return isFactorioIcon(icon)
          ? FACTORIO_ICON_INFO[icon]
          : FACTORIO_WIKI_ICON_INFO[icon];
      },
    );
}
