import { LoaderFunctionArgs, json } from 'react-router-dom';
import { selectGame } from '../../store/reducers';
import store from '../../store/store';

export function loadGame({ params }: LoaderFunctionArgs) {
  const { gameId } = params;
  if (!gameId) {
    throw new Response(`Pas de jeu trouvé avec l'id ${gameId}`, { status: 404 });
  }
  const game = selectGame(store.getState(), parseInt(gameId, 10));
  if (!game) {
    throw new Response(`Pas de jeu trouvé avec l'id ${gameId}`, { status: 404 });
  }

  const res = json({ gameId }, 200);
  return res;
}
