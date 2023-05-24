import { PropsWithChildren } from 'react';
import { UseControllerProps, useController } from 'react-hook-form';

type Props = JSX.IntrinsicElements['input'] & {
  id: string;
};
export function FormTextInput({
  children,
  id,
  ...props
}: UseControllerProps<PropsWithChildren<Props>>) {
  const { field, fieldState } = useController(props);
  return (
    <div className="form-group">
      <label htmlFor={id}>{children}</label>
      <input type="text" {...field} className="form-control" />
    </div>
  );
}
