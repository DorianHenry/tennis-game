import { PropsWithChildren } from 'react';
import { classNames } from '../../../../functions';

type Props = {
  className?: string;
};
export function FormGroup({ children, className }: PropsWithChildren<Props>) {
  className = classNames('form-group', className);
  return <div className={className}>{children}</div>;
}
