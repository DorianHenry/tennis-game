import { CreateGameForm } from '../components/game/CreateGameForm';
import { Container, Layout } from '../components/ui';

export function CreateGame() {
  return (
    <Layout>
      <Container>
        <CreateGameForm />
      </Container>
    </Layout>
  );
}
