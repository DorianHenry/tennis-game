import { PropsWithChildren } from "react";
import { NavLink, To } from "react-router-dom";
import { classNames } from "../../../functions/string";
type Props = {
  type?: "primary" | "default";
  to: To;
};
export function ButtonLink({
  children,
  type = "primary",
  to,
  ...props
}: PropsWithChildren<Props>) {
  const classNameConact = classNames("btn", `btn--${type}`);
  return (
    <NavLink to={to} className={classNameConact} {...props}>
      {children}
    </NavLink>
  );
}
