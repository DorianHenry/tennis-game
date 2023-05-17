import { PropsWithChildren } from "react";

type Props = {
  className?: string;
};
export function Container({ children, className }: PropsWithChildren<Props>) {
  return <div className={`container + ${className}`}>{children}</div>;
}
