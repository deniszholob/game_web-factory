import { Meta, StoryObj } from '@storybook/angular';
import { NgTemplateTypeExampleComponent } from './ng-template-type-example.component';

type ComponentWithCustomControls = NgTemplateTypeExampleComponent;

export default {
  title: 'Utils/Ng Template Type Example',
  component: NgTemplateTypeExampleComponent,
  args: {
    data: 'data',
    id: 1,
  },
} satisfies Meta<ComponentWithCustomControls>;

export const NgTemplateTypeExample: StoryObj<ComponentWithCustomControls> = {};
