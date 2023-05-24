import { useContext } from 'react';
import { GameIdContext } from '../../contexts';
import type { GameId } from '../../../types';
import { ButtonLink } from '../ui/button';
import { Card } from '../ui/card';
import { ChronometerWithStore } from './chronometer';
import { LabelGameStatus } from './labels';
import { PlayersPresentation } from './player';

export function GameListItemWithStore({ gameId }: { gameId: GameId }) {
  return (
    <GameIdContext.Provider value={gameId}>
      <GameListItem />
    </GameIdContext.Provider>
  );
}

export function GameListItem() {
  const gameId = useContext(GameIdContext);
  return (
    <Card>
      <div className="stack-inner stack-inner--2">
        <header className="flex-between">
          <LabelGameStatus />
          <ChronometerWithStore key={`chrono-${gameId}`} />
        </header>
        <section>
          <PlayersPresentation />
        </section>
        <footer className="text-right">
          <ButtonLink to={`game/${gameId}`}>Voir le match</ButtonLink>
        </footer>
      </div>
    </Card>
  );
}
