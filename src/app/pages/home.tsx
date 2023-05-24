import { Container, Layout } from '../components/ui';
import { GameListWithStore } from '../components/game';
export function Home() {
  return (
    <Layout>
      <Container>
        <GameListWithStore />
      </Container>
    </Layout>
  );
}
