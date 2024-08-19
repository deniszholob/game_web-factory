import { isDevMode } from '@angular/core';

export enum ControlTab {
  'Inventory' = 'Inventory',
  'Resources' = 'Resources',
  'Recipes' = 'Recipes',
  'Tech' = 'Tech',
  'Stats' = 'Stats',
  'Dev' = 'Dev',
}

export const CONTROL_TAB_OPTIONS: ControlTab[] = Object.values(ControlTab);

export interface ControlTabInfo {
  id: ControlTab;
  display: string;
  icon: string;
}

export const CONTROL_TAB_INFO: Record<ControlTab, ControlTabInfo> = {
  [ControlTab.Inventory]: {
    id: ControlTab.Inventory,
    display: 'Inventory',
    icon: 'fa-solid fa-warehouse text-rose-500',
  },
  [ControlTab.Resources]: {
    id: ControlTab.Resources,
    display: 'Resources',
    icon: 'fa-solid fa-database text-amber-500',
  },
  [ControlTab.Recipes]: {
    id: ControlTab.Recipes,
    display: 'Recipes',
    icon: 'fa-solid fa-clipboard text-blue-500',
  },
  [ControlTab.Tech]: {
    id: ControlTab.Tech,
    display: 'Technology',
    // icon: 'fa-solid fa-microchip text-cyan-500',
    icon: 'fa-solid fa-flask text-purple-500',
  },
  [ControlTab.Stats]: {
    id: ControlTab.Stats,
    display: 'Stats',
    icon: 'fa-solid fa-chart-line text-green-500',
  },
  [ControlTab.Dev]: {
    id: ControlTab.Dev,
    display: 'Dev',
    icon: 'fa-solid fa-gear text-grey-500',
  },
} as const;

const availableTabs: ControlTab[] = [
  ControlTab.Inventory,
  // ControlTab.Resources,
  // ControlTab.Recipes,
  ControlTab.Tech,
  ControlTab.Stats,
];
if (isDevMode()) {
  availableTabs.push(ControlTab.Dev);
}

export const CONTROL_TAB_INFO_OPTIONS: ControlTabInfo[] =
  CONTROL_TAB_OPTIONS.map(
    (o: ControlTab): ControlTabInfo => CONTROL_TAB_INFO[o],
  ).filter((o: ControlTabInfo): boolean => availableTabs.includes(o.id));

export function isControlTab(value: string): value is ControlTab {
  return CONTROL_TAB_OPTIONS.includes(value as ControlTab);
}
