import type { Meta, StoryObj } from '@storybook/react';
import { FormGroup, FormTextInput } from '.';
import { useForm } from 'react-hook-form';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'UI/form/TextInput',
  component: FormTextInput,
  tags: ['autodocs']
} satisfies Meta<typeof FormTextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  render: (args) => {
    const { register } = useForm({
      mode: 'onTouched'
    });
    return (
      <FormGroup>
        <FormTextInput {...args} register={register}></FormTextInput>
      </FormGroup>
    );
  },
  args: {
    defaultValue: 'Valeur par défaut',
    children: 'Nom du champ',
    name: 'name'
  }
};
