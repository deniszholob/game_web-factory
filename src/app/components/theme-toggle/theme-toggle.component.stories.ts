import { Meta, StoryObj } from '@storybook/angular';

import { ThemeToggleComponent } from './theme-toggle.component';

type ComponentWithCustomControls = ThemeToggleComponent;

export default {
  title: 'Components/Theme Toggle',
  component: ThemeToggleComponent,
  // decorators: [moduleMetadata({ imports: [] })],
  parameters: {
    docs: { description: { component: `ThemeToggle` } },
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

export const ThemeToggle: StoryObj<ComponentWithCustomControls> = {
  render: (args) => ({ props: args }),
};
