// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { SqrtSvgTallComponent } from './sqrt-svg-tall.component';

export default {
  title: 'SqrtSvgTall',
  component: SqrtSvgTallComponent,
} as Meta;

// More on component templates: https://storybook.js.org/docs/angular/writing-stories/introduction#using-args
const Template: Story<SqrtSvgTallComponent> = (args: SqrtSvgTallComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
