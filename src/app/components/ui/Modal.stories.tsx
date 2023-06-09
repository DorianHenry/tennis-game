import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/client-api';
import { Button, Modal } from '.';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'UI/Modal',
  component: Modal,
  tags: ['autodocs']
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  render: (args) => {
    const [{ visible }, updateArgs] = useArgs();
    function onVisibilityChange(visibility: boolean) {
      console.log(visibility);
      updateArgs({ visible: visibility });
    }
    return (
      <>
        <Button onClick={() => updateArgs({ visible: !visible })}>Ouvrir Modal</Button>
        <Modal {...args} onVisibilityChange={onVisibilityChange}></Modal>
      </>
    );
  },
  args: {
    visible: false,
    children: 'hello'
  }
};
