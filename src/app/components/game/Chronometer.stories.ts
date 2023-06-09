import type { Meta, StoryObj } from '@storybook/react';
import { Chronometer } from '.';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Game/Chronometer',
  component: Chronometer,
  tags: ['autodocs']
} satisfies Meta<typeof Chronometer>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Left: Story = {
  args: {
    duration: 100
  }
};

export const Right: Story = {
  args: {
    duration: 100,
    position: 'right'
  }
};

export const Center: Story = {
  args: {
    duration: 100,
    position: 'center'
  }
};
