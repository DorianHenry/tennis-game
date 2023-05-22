import { Link, useParams } from 'react-router-dom';
import { Container } from '../components/ui/container';
import { selectGame } from '../../store/reducers';
import { useAppSelector } from '../hooks/redux';
import { Layout } from '../components/ui/layout';

export function Game() {
  const { gameId } = useParams();
  const game = useAppSelector((s) => selectGame(s, parseInt(gameId || '', 10)));

  if (!game) {
    throw new Response(`Pas de jeu trouvé avec l'id`, { status: 404 });
  }

  return (
    <Layout>
      <Container>
        <h1>Game !</h1>
        <Link className="btn btn-primary" to={`/`}>
          Retour
        </Link>
      </Container>
    </Layout>
  );
}
