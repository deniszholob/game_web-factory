import { Meta, StoryObj } from '@storybook/angular';

import { TabsComponent } from './tabs.component';

import { MOCK_DEFAULT_Tab, MOCK_TAB_TYPE, MOCK_Tabs } from './tabs.mock';

type ComponentWithCustomControls = TabsComponent<MOCK_TAB_TYPE>;
export default {
  title: 'Components/Tabs',
  component: TabsComponent,
  // decorators: [moduleMetadata({imports: []})],
  parameters: {
    docs: { description: { component: `Tabs` } },
    // layout: 'fullscreen',
  },
  argTypes: {
    /** === Output Actions === */
    selectedTabsChange: {
      action: 'selectedTabsChange',
      table: { disable: true },
    },
    activeTabChange: { action: 'activeTabChange', table: { disable: true } },
    /** === Control Disable === */
    selectedTabs: { control: { disable: true } },
    activeTab: { control: { disable: true } },
  },
  args: {
    multi: false,
    tabsId: 'tabs',
    tabs: MOCK_Tabs,
    selectedTabs: [MOCK_DEFAULT_Tab.id],
    activeTab: MOCK_DEFAULT_Tab.id,
  },
} satisfies Meta<ComponentWithCustomControls>;

export const Tabs: StoryObj<ComponentWithCustomControls> = {
  render: (args) => ({ props: args }),
};
