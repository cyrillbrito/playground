// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { SqrtSvgComponent } from './sqrt-svg.component';

export default {
  title: 'SqrtSvg',
  component: SqrtSvgComponent,
} as Meta;

// More on component templates: https://storybook.js.org/docs/angular/writing-stories/introduction#using-args
const Template: Story<SqrtSvgComponent> = (args: SqrtSvgComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {

};
