import type { GameId, StoreGetGame } from '../../../types';
import { ButtonLink } from '../ui/button';
import { Card } from '../ui/card';
import { ChronometerWithStore } from './chronometer';
import { LabelGameStatus } from './labels';
import { PlayersPresentation } from './player';

export function GameListItemWithStore({ gameId }: { gameId: GameId }) {
  return <GameListItem gameId={gameId} />;
}

export function GameListItem({ gameId }: StoreGetGame) {
  return (
    <Card>
      <div className="stack-inner stack-inner--2">
        <header className="flex-between">
          <LabelGameStatus gameId={gameId} />
          <ChronometerWithStore key={`chrono-${gameId}`} gameId={gameId} />
        </header>
        <section>
          <PlayersPresentation gameId={gameId} />
        </section>
        <footer>
          <ButtonLink to={`game/${gameId}`}>Voir le match</ButtonLink>
        </footer>
      </div>
    </Card>
  );
}
