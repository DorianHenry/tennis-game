import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import './error.scss';
import { Container, ButtonLink, Card } from '../../components/ui';
export function ErrorPage() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div className="error-page">
        <Container>
          <Card className="card--lg mw-800 mx-auto">
            <div className="stack-text">
              <h1 className="error-page__title">{error.status}</h1>
              <p>{error.data}</p>
              <p>
                <ButtonLink to="/" btnType="secondary" size="lg">
                  Retour aux jeux
                </ButtonLink>
              </p>
            </div>
          </Card>
        </Container>
      </div>
    );
  }
  return (
    <Container className="error-page">
      <div className="stack-text">
        <h2>Désolé une erreur est survenue</h2>
        <div className="text-center">
          <ButtonLink to={'/'} btnType="secondary" size="lg">
            Retour aux jeux
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
