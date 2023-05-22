import { PropsWithChildren } from 'react';
import { classNames } from '../../../functions/string';

type Props = {
  className?: string;
};
export function Container({ children, className = '', ...props }: PropsWithChildren<Props>) {
  const classNameConact = classNames('container', className);
  return (
    <div className={classNameConact} {...props}>
      {children}
    </div>
  );
}
