import { GameDetailWithStore } from '../components/game';
import { Container, Layout } from '../components/ui';
import { useLocalStorage } from '../hooks';

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
