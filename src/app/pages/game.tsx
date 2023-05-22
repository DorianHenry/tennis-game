import { GameDetailWithStore } from '../components/game/game-detail';
import { Container } from '../components/ui/container';
import { Layout } from '../components/ui/layout';
import { useLocalStorage } from '../hooks/local-storage';

export function Game() {
  useLocalStorage();
  return (
    <Layout>
      <Container>
        <GameDetailWithStore />
      </Container>
    </Layout>
  );
}
