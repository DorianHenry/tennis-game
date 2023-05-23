import { PropsWithChildren } from 'react';
import { NavLink, To } from 'react-router-dom';
import { classNames } from '../../../functions/string';
type ButtonType = 'primary' | 'default';
type ButtonSize = 'md' | 'sm';
type ButtonLinkProps = {
  btnType?: ButtonType;
  to: To;
};

type ButtonProps = JSX.IntrinsicElements['button'] & {
  loading?: boolean;
  className?: string;
  btnType?: ButtonType;
  size?: ButtonSize;
};
export function ButtonLink({
  children,
  btnType = 'primary',
  to
}: PropsWithChildren<ButtonLinkProps>) {
  const classNameConact = classNames('btn', `btn--${btnType}`);
  return (
    <NavLink to={to} className={classNameConact}>
      {children}
    </NavLink>
  );
}

export function Button({
  children,
  className = '',
  btnType = 'primary',
  loading = false,
  size,
  ...props
}: PropsWithChildren<ButtonProps>) {
  className = classNames('btn', `btn--${btnType}`, className, size && `btn--${size}`);
  return (
    <button className={className} disabled={loading} {...props}>
      {children}
    </button>
  );
}
