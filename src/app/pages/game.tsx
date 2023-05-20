import { Link } from "react-router-dom";
import { Container } from "../components/ui/container";

export function Game() {
  // const { gameId } = useParams();
  return (
    <Container>
      <h1>Game !</h1>
      <Link className="btn btn-primary" to={`/`}>
        Retour
      </Link>
    </Container>
  );
}
