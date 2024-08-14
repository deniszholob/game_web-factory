import { Meta, StoryObj } from '@storybook/angular';
import { AppComponent } from './app.component';

type ComponentWithCustomControls = AppComponent;

const meta: Meta<ComponentWithCustomControls> = {
  title: 'App',
  component: AppComponent,
  // decorators: [moduleMetadata({imports: []})],
  parameters: {
    docs: { description: { component: `App` } },
    // layout: 'fullscreen',
  },
  argTypes: {
    // Output
    // inputChange: { action: 'inputChange', table: { disable: true } }
    // Hide
    // someControl: { table: { disable: true } }
  },
  args: {},
};
export default meta;

export const App: StoryObj<ComponentWithCustomControls> = {
  render: (args) => ({ props: args }),
};
