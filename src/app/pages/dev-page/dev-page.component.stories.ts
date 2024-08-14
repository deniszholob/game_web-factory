import { Meta, StoryObj } from '@storybook/angular';

import { DevPageComponent } from './dev-page.component';

type ComponentWithCustomControls = DevPageComponent;

export default {
  title: 'Pages/Dev Page',
  component: DevPageComponent,
  // decorators: [moduleMetadata({imports: []})],
  parameters: {
    docs: { description: { component: `DevPage` } },
    // layout: 'fullscreen',
  },
  argTypes: {
    // Inputs
    // input: { options: ['---', ...Object.values(YourEnum)], mapping: YourEnum & { '---': undefined }, control: { type: 'select' }}
    // Output
    // inputChange: { action: 'inputChange', table: { disable: true } }
    // Hide
    // someControl: { table: { disable: true } }
  },
  args: {},
} satisfies Meta<ComponentWithCustomControls>;

export const DevPage: StoryObj<ComponentWithCustomControls> = {
  render: (args) => ({ props: args }),
};
