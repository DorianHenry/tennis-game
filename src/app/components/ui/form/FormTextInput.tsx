import { PropsWithChildren } from 'react';
import { FieldValues } from 'react-hook-form';
import { InputProps } from '../../../../types/form';

type Props<T> = PropsWithChildren<InputProps<T>> & {
  defaultValue?: string;
};
export function FormTextInput<T extends FieldValues>({
  name,
  register,
  defaultValue = '',
  children
}: Props<T>) {
  return (
    <>
      <label htmlFor={name} className="form-label">
        {children}
      </label>
      <input id={name} defaultValue={defaultValue} className="form-control" {...register(name)} />
    </>
  );
}
