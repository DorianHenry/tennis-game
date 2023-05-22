import { GameDetailWithStore } from '../components/game/game-detail';
import { Container } from '../components/ui/container';
import { Layout } from '../components/ui/layout';

export function Game() {
  return (
    <Layout>
      <Container>
        <GameDetailWithStore />
      </Container>
    </Layout>
  );
}
