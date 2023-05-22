import { PropsWithChildren } from 'react';
import { classNames } from '../../../functions/string';

type Props = {
  className?: string;
  classNameBody?: string;
};

export function Card({ children, className = '', classNameBody = '' }: PropsWithChildren<Props>) {
  const classNameConact = classNames('card', className);
  const classNameBodyConact = classNames('card__body', classNameBody);
  return (
    <div className={classNameConact}>
      <div className={classNameBodyConact}>{children}</div>
    </div>
  );
}
