import { useRouteError } from "react-router-dom";
import "./error.scss";
import { Container } from "../../components/container";
export function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  return (
    <Container className="error-page">
      <div className="stack-text">
        <h1>Oops!</h1>
        <p>Désolé la page n'existe pas</p>
      </div>
    </Container>
  );
}
