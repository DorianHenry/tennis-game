import { PropsWithChildren } from "react";

export function Card({ children }: PropsWithChildren) {
  return (
    <div className="card">
      <div className="card__body">{children}</div>
    </div>
  );
}
