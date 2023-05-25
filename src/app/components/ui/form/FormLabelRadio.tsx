import { PropsWithChildren } from 'react';
import { FieldValues } from 'react-hook-form';
import { InputProps } from '../../../../types/form';
import { Label } from '..';

type Props<T> = PropsWithChildren<InputProps<T>> & {
  defaultChecked?: boolean;
  value: string | number;
  id: string;
};
export function FormLabelRadio<T extends FieldValues>({
  name,
  register,
  defaultChecked = false,
  value,
  id,
  children
}: Props<T>) {
  return (
    <div className="radio-label">
      <input
        value={value}
        className="radio-label__input"
        id={id}
        {...register(name)}
        defaultChecked={defaultChecked}
        type="radio"
      />
      <label className="radio-label__label" htmlFor={id}>
        <Label>{children}</Label>
      </label>
    </div>
  );
}
