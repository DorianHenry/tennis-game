import { GameForm } from '../components/game/GameForm';
import { Container, Layout } from '../components/ui';
import { useLocalStorage } from '../hooks';

export function FormPage() {
  useLocalStorage();
  return (
    <Layout>
      <Container>
        <GameForm />
      </Container>
    </Layout>
  );
}
