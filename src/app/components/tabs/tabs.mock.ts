import { safeArrayIndex } from 'src/app/utils';

import { Tab } from './tab.model';

export enum MOCK_TAB_TYPE {
  all,
  tab1 = 'tab1',
  tab2 = 'tab2',
  'tab3 (wow)' = 'tab3 (wow)',
}

export const MOCK_Tabs: Tab<MOCK_TAB_TYPE>[] = [
  { id: MOCK_TAB_TYPE.all, display: 'Show All' },
  { id: MOCK_TAB_TYPE.tab1, display: 'Tab 1' },
  { id: MOCK_TAB_TYPE.tab2, display: '#Tab 2' },
  { id: MOCK_TAB_TYPE['tab3 (wow)'], display: 'Tab 3 - WOW!' },
];
export const MOCK_DEFAULT_Tab: Tab<MOCK_TAB_TYPE> = safeArrayIndex(
  MOCK_Tabs,
  0,
);
