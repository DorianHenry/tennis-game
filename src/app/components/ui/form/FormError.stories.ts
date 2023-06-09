import type { Meta, StoryObj } from '@storybook/react';
import { FormError } from '.';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'UI/form/FormError',
  component: FormError,
  tags: ['autodocs']
} satisfies Meta<typeof FormError>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    message: 'Une erreur'
  }
};
