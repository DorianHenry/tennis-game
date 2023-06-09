import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from '.';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'UI/Avatar',
  component: Avatar,
  tags: ['autodocs']
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Fille1: Story = {
  args: {
    avatarId: 1
  }
};

export const Fille2: Story = {
  args: {
    avatarId: 2
  }
};

export const Fille3: Story = {
  args: {
    avatarId: 3
  }
};

export const Homme1: Story = {
  args: {
    avatarId: 4
  }
};

export const Homme2: Story = {
  args: {
    avatarId: 5
  }
};
