import { PropsWithChildren } from "react";
import { Container } from "./container";

type Props = {
  className?: string;
};
export function Layout({ children, className }: PropsWithChildren<Props>) {
  return (
    <div className={`page-layout py-page`}>
      <header className="page-layout__header">
        <Container>
          <img src="/logo.svg" alt="logo DJMS tennis" />
        </Container>
      </header>

      <main className="page-layout__main">{children}</main>
    </div>
  );
}
