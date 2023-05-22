import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import './error.scss';
import { Container } from '../../components/ui/container';
import { ButtonLink } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
export function ErrorPage() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div className="error-page">
        <Container>
          <Card className="card--lg mw-800 mx-auto">
            <div className="stack-text">
              <h1 className="error-page__title">{error.status}</h1>
              <p>Désolé la page n'existe pas</p>
              <p>
                <ButtonLink to="/">Retour au site</ButtonLink>
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
        <p>Désolé, quelque chose ne s'est pas bien passé</p>
      </div>
    </Container>
  );
}
