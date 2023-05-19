import { Link, useParams } from "react-router-dom";
import { Container } from "../components/container";

export function Game() {
  const { gameId } = useParams();
  return (
    <Container>
      <h1>Game !</h1>
      <Link className="btn btn-primary" to={`/`}>
        Retour
      </Link>
    </Container>
  );
}
