import type { Meta, StoryObj } from '@storybook/react';
import { Label } from '.';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'UI/Label',
  component: Label,
  tags: ['autodocs']
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    children: 'Test',
    type: 'primary'
  }
};

export const Secondary: Story = {
  args: {
    children: 'Test',
    type: 'secondary'
  }
};

export const Default: Story = {
  args: {
    children: 'Test',
    type: 'default'
  }
};
