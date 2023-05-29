import { PropsWithChildren } from 'react';
import { Container } from './Container';
import { classNames } from '../../../functions';
import { Link } from 'react-router-dom';

type Props = {
  className?: string;
};
export function Layout({ children, className = '' }: PropsWithChildren<Props>) {
  className = classNames('page-layout', 'py-page', className);
  return (
    <div className={className}>
      <header className="page-layout__header">
        <Container>
          <Link to="/">
            <img src="/logo.svg" alt="logo DJMS tennis" />
          </Link>
        </Container>
      </header>

      <main className="page-layout__main">{children}</main>
      <div className="page-layout__illu"></div>
    </div>
  );
}
