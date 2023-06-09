import type { Meta, StoryObj } from '@storybook/react';
import { FormGroup, FormLabelRadio } from '.';
import { useForm } from 'react-hook-form';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'UI/form/LabelRadio',
  component: FormLabelRadio,
  tags: ['autodocs']
} satisfies Meta<typeof FormLabelRadio>;

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
        <FormLabelRadio {...args} register={register}></FormLabelRadio>
      </FormGroup>
    );
  },
  args: {
    id: '2',
    value: 'Ma valeur',
    children: 'Nom du champ',
    name: 'name'
  }
};
