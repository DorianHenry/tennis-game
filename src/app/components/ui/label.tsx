import { PropsWithChildren } from 'react';

type Props = {
  type?: 'default' | 'primary';
};
export function Label({ children, type = 'default' }: PropsWithChildren<Props>) {
  return <span className={`label label--${type}`}>{children}</span>;
}
