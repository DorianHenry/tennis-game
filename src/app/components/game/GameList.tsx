import { useAppSelector } from '../../hooks';
import type { GameId } from '../../../types';
import { GameListItemWithStore } from './';
import { selectGamesIds } from '../../../store';
import { ButtonLink, Card } from '../ui';
export function GameListWithStore() {
  const gameIds = useAppSelector(selectGamesIds);
  return (
    <div className="stack-inner">
      <div className="flex-between">
        <h1>Liste des matchs </h1>
        <ButtonLink to={'/edit'} btnType="secondary">
          Ajouter un match
        </ButtonLink>
      </div>

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
