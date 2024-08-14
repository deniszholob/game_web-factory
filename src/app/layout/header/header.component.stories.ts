import { Meta, StoryObj } from '@storybook/angular';

import { HeaderComponent } from './header.component';

type ComponentWithCustomControls = HeaderComponent;

export default {
  title: 'Layout/Header',
  component: HeaderComponent,
  // decorators: [moduleMetadata({ imports: [] })],
  parameters: {
    docs: { description: { component: `Header` } },
    // layout: 'fullscreen',
  },
  argTypes: {
    /** === Input Mapping === */
    // input: { options: ['---', ...Object.values(YourEnum)], mapping: YourEnum & { '---': undefined }, control: { type: 'select' }}
    /** === Output Actions === */
    // inputChange: { action: 'inputChange', table: { disable: true } }
    /** === Control Hide === */
    // someControl: { table: { disable: true } }
    /** === Control Disable === */
    // someControl: { control: { disable: true } }
  },
  args: {},
} satisfies Meta<ComponentWithCustomControls>;

export const Header: StoryObj<ComponentWithCustomControls> = {
  render: (args) => ({ props: args }),
};
