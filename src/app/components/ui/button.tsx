import { PropsWithChildren } from 'react';
import { NavLink, To } from 'react-router-dom';
import { classNames } from '../../../functions';
type ButtonType = 'primary' | 'default' | 'secondary';
type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonLinkProps = {
  btnType?: ButtonType;
  to: To;
  size?: ButtonSize;
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
  size,
  to
}: PropsWithChildren<ButtonLinkProps>) {
  const classNameConact = classNames('btn', `btn--${btnType}`, size && `btn--${size}`);
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
