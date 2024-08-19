import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, input, Output } from '@angular/core';

import { Tab, TabId } from './tab.model';

type Change = {
  changedMulti: boolean;
  changedSingle: boolean;
};

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styles: [':host{display:contents}'],
  standalone: true,
  imports: [CommonModule],
})
export class TabsComponent<TI extends TabId, Ctx = unknown> {
  /** Multi vs single tab select */
  @Input()
  public multi: boolean = false;
  /** HTML/Cypress data id */
  @Input()
  public tabsId: string = '';
  /** Set all available tabs to choose from/work with */
  @Input()
  public tabs: readonly Tab<TI>[] = [];

  public class = input<string>();

  /** Use for multi select */
  private _selectedTabs: TI[] = [];
  @Input()
  public set selectedTabs(selectedTabs: TI[]) {
    this._selectedTabs = [...selectedTabs];
    const changedSingle: boolean = this.setActiveTab(
      selectedTabs.length === 1 ? selectedTabs[0] : undefined,
    );
    this.emitChanges({ changedMulti: false, changedSingle });
  }
  public get selectedTabs(): TI[] {
    return this._selectedTabs;
  }
  @Output()
  public selectedTabsChange: EventEmitter<TI[]> = new EventEmitter<TI[]>();

  /** Use for single select */
  private _activeTab?: TI;
  @Input()
  public set activeTab(activeTab: TI | undefined) {
    this._activeTab = activeTab;
    let changedMulti: boolean = false;
    if (activeTab == null) {
      changedMulti = !this._selectedTabs.length;
      this._selectedTabs = [];
    } else {
      changedMulti = this.selectTabSingle(activeTab).changedMulti;
    }
    this.emitChanges({ changedMulti, changedSingle: false });
  }
  public get activeTab(): TI | undefined {
    return this._activeTab;
  }
  @Output()
  public activeTabChange: EventEmitter<TI> = new EventEmitter<TI>();

  // Custom Template
  // TODO: Probly remove (double check this is not used)
  // @ContentChild(TabContentDirective, { read: TemplateRef })
  // public tabCustomContent: TemplateRef<Ctx> | null = null;

  /** UI click action */
  protected onTabClick(tab: Tab<TI>): void {
    const changedSingle: boolean = this.setActiveTab(tab.id);
    const change: Change = this.multi
      ? this.selectTabMulti(tab.id)
      : this.selectTabSingle(tab.id);
    this.emitChanges({
      changedMulti: change.changedMulti,
      changedSingle: change.changedSingle || changedSingle,
    });
  }

  /** @returns boolean representing if active tab changed */
  private setActiveTab(tab?: TI): boolean {
    const changedSingle: boolean = this._activeTab !== tab;
    this._activeTab = tab;
    return changedSingle;
  }

  /** Sets selection to 1 tab
   * @returns if array changed
   */
  private selectTabSingle(tab: TI): Change {
    const changedMulti: boolean =
      this.selectedTabs.length > 1 || tab !== this.selectedTabs[0];
    this._selectedTabs = [tab];
    return { changedMulti, changedSingle: false };
  }

  /** Toggles tan if in array, adds if not
   * @returns if array changed
   */
  private selectTabMulti(tab: TI): Change {
    let changedSingle: boolean = false;
    const tabIdx: number = this.selectedTabs.indexOf(tab);
    if (tabIdx >= 0) {
      this._selectedTabs.splice(tabIdx, 1);
      changedSingle = this.setActiveTab(undefined);
    } else {
      this._selectedTabs.push(tab);
    }
    return { changedMulti: true, changedSingle };
  }

  /** Fires emitter if selection changed */
  private emitChanges(change: Change): void {
    if (change.changedMulti) {
      this.selectedTabsChange.emit(this.selectedTabs);
    }
    if (change.changedSingle) {
      this.activeTabChange.emit(this.activeTab);
    }
  }
}
