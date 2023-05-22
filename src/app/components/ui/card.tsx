import { PropsWithChildren } from 'react';
import { classNames } from '../../../functions/string';

type Props = {
  className?: string;
};

export function Card({ children, className = '' }: PropsWithChildren<Props>) {
  const classNameConact = classNames('card', className);
  return (
    <div className={classNameConact}>
      <div className="card__body">{children}</div>
    </div>
  );
}
