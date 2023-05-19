import { Container } from "../components/container";
import { GameListWithStore } from "../components/game/game-list";
import { Layout } from "../components/layout";
export function Home() {
  return (
    <Layout>
      <Container>
        <GameListWithStore />
      </Container>
    </Layout>
  );
}
