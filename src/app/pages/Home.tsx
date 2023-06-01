import { Container, Layout } from '../components/ui';
import { GameListWithStore } from '../components/game';
import { useLocalStorage } from '../hooks';
export function Home() {
  useLocalStorage();
  return (
    <Layout>
      <Container>
        <GameListWithStore />
      </Container>
    </Layout>
  );
}
