import { Container } from "../components/container";
import { Link } from "react-router-dom";
export function Home() {
  return (
    <Container>
      <h1>Hello World </h1>
      <Link to={`game/1`}>Aller vers le match</Link>
    </Container>
  );
}
