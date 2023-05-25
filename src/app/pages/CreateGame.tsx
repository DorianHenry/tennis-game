import { CreateGameForm } from '../components/game/CreateGameForm';
import { Container, Layout } from '../components/ui';
import { useLocalStorage } from '../hooks';

export function CreateGame() {
  useLocalStorage();
  return (
    <Layout>
      <Container>
        <CreateGameForm />
      </Container>
    </Layout>
  );
}
