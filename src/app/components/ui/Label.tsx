import { PropsWithChildren } from 'react';
export type LabelType = 'default' | 'primary' | 'secondary';
type Props = {
  type?: LabelType;
};
export function Label({ children, type = 'default' }: PropsWithChildren<Props>) {
  return <span className={`label label--${type}`}>{children}</span>;
}
