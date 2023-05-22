import { useAppSelector } from '../../hooks/redux';
import type { GameId } from '../../../types';
import { GameListItemWithStore } from './game-list-item';
import { selectGamesIds } from '../../../store/selectors';
export function GameListWithStore() {
  const gameIds = useAppSelector(selectGamesIds);
  return (
    <div className="stack-inner">
      <h1>Liste des jeux </h1>
      <GameList gameIds={gameIds} />
    </div>
  );
}

export function GameList({ gameIds }: { gameIds: GameId[] }) {
  return (
    <div className="grid-list-games">
      {gameIds.length &&
        gameIds.map((gameId) => <GameListItemWithStore key={`game-${gameId}`} gameId={gameId} />)}
    </div>
  );
}
