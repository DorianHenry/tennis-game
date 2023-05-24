import { useAppSelector } from '../../hooks/redux';
import type { GameId } from '../../../types';
import { GameListItemWithStore } from './game-list-item';
import { selectGamesIds } from '../../../store/selectors';
import { Card } from '../ui/card';
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
  if (gameIds.length > 0) {
    return (
      <div className="grid-list-games">
        {gameIds.map((gameId) => (
          <GameListItemWithStore key={`game-${gameId}`} gameId={gameId} />
        ))}
      </div>
    );
  }
  return <NoGamesFound />;
}

function NoGamesFound() {
  return (
    <Card className="text-center">
      <h2>Aucun matchs encodés</h2>
    </Card>
  );
}
