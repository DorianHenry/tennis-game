import { PropsWithChildren } from 'react';
import { Container } from './container';
import { classNames } from '../../../functions/string';
import { Link } from 'react-router-dom';

type Props = {
  className?: string;
};
export function Layout({ children, className = '' }: PropsWithChildren<Props>) {
  const classNameConact = classNames('page-layout', 'py-page', className);
  return (
    <div className={classNameConact}>
      <header className="page-layout__header">
        <Container>
          <Link to="/">
            <img src="/logo.svg" alt="logo DJMS tennis" />
          </Link>
        </Container>
      </header>

      <main className="page-layout__main">{children}</main>
    </div>
  );
}
