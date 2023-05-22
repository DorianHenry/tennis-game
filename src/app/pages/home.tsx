import { Container } from '../components/ui/container';
import { GameListWithStore } from '../components/game/game-list';
import { Layout } from '../components/ui/layout';
export function Home() {
  return (
    <Layout>
      <Container>
        <GameListWithStore />
      </Container>
    </Layout>
  );
}
