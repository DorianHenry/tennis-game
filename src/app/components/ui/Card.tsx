import { PropsWithChildren } from 'react';
import { classNames } from '../../../functions';

type Props = {
  className?: string;
  classNameBody?: string;
};

export function Card({ children, className = '', classNameBody = '' }: PropsWithChildren<Props>) {
  className = classNames('card', className);
  classNameBody = classNames('card__body', classNameBody);
  return (
    <div className={className}>
      <div className={classNameBody}>{children}</div>
    </div>
  );
}
