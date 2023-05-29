import { PropsWithChildren } from 'react';
import { classNames } from '../../../functions';

type Props = {
  className?: string;
};
export function Container({ children, className = '', ...props }: PropsWithChildren<Props>) {
  className = classNames('container', className);
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}
