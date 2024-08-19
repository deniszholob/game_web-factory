import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  FactorioIconComponent,
  GameInventoryComponent,
  Tab,
  TabsComponent,
} from 'src/app/components';
import { GameStatsComponent } from 'src/app/components/game-stats/game-stats.component';
import { GameTechComponent } from 'src/app/components/game-tech/game-tech.component';
import { ItemInfoComponent } from 'src/app/components/item-info/item-info.component';
import { Entity } from 'src/app/shared';

import { GameService } from '../../shared/game-logic/game.service';
import {
  CONTROL_TAB_INFO,
  CONTROL_TAB_INFO_OPTIONS,
  ControlTab,
  ControlTabInfo,
} from './control-tab.enum';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styles: [':host{display:contents}'],
  standalone: true,
  imports: [
    CommonModule,
    FactorioIconComponent,
    TabsComponent,
    // TabContentDirective,
    GameInventoryComponent,
    GameTechComponent,
    GameStatsComponent,
    ItemInfoComponent,
  ],
})
export class GamePageComponent implements OnInit {
  // protected readonly IconSizes = IconSizes;
  // protected readonly ENTITY_TYPE_OPTIONS = ENTITY_TYPE_OPTIONS;
  // protected readonly ENTITY_TYPE_INFO = ENTITY_TYPE_INFO;
  // protected readonly ENTITY_OPTIONS = ENTITY_OPTIONS;
  // protected readonly ENTITY_INFO = ENTITY_INFO;
  // protected readonly RECIPE_INFO = RECIPE_INFO;
  // protected readonly RECIPE_INFO_OPTIONS = RECIPE_INFO_OPTIONS;
  // protected readonly groupedEntities = groupEntitiesByType(ENTITY_OPTIONS);

  protected selectedEntity?: Entity = undefined;
  // protected inventoryEntityInfo: InventoryEntityInfo = MOCK_InventoryEntityInfo;

  // protected inventoryEntity: Record<Entity, InventoryEntityInfo> =
  //   this.gameService.inventoryForEntities;

  @ViewChild('customTabTemplate', { static: true })
  protected customTabTemplate?: TemplateRef<any>; // TODO: any

  protected ControlTab = ControlTab;
  protected tabs: Tab<ControlTab, string>[] = [];
  protected activeTab: ControlTab = ControlTab.Tech;
  // protected activeTab: ControlTab = ControlTab.Inventory;

  protected CONTROL_TAB_INFO = CONTROL_TAB_INFO;

  constructor(protected gameService: GameService) {}

  public ngOnInit(): void {
    const template = this.customTabTemplate;
    if (template) {
      this.tabs = CONTROL_TAB_INFO_OPTIONS.map(
        (tab: ControlTabInfo): Tab<ControlTab, string> => ({
          id: tab.id,
          display: tab.display,
          custom: { template, context: tab.icon },
          // badge: null,
        }),
      );
    }
  }

  protected setEntityInfo(entity: Entity): void {
    this.selectedEntity = entity;
  }

  protected onActiveTabChange(tab: ControlTab): void {
    // this.activeTab = tab.id as ControlTab;
    // this.controlSectionTitle = tab.display;
    // console.log({ tab });
  }
}
