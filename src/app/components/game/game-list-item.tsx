import { GameStatus } from '../../../enums';
import { selectMatchStatus } from '../../../store/selectors';
import type { GameId } from '../../../types';
import { useAppSelector } from '../../hooks/redux';
import { ButtonLink } from '../ui/button';
import { Card } from '../ui/card';
import { ChronometerWithStore } from './chronometer';
import { LabelGameStatus } from './label-status';
import { PlayersPresentation } from './player';

export function GameListItemWithStore({ gameId }: { gameId: GameId }) {
  const status = useAppSelector((s) => selectMatchStatus(s, gameId));
  return <GameListItem gameId={gameId} status={status} />;
}

export function GameListItem({ gameId, status }: { gameId: GameId; status: GameStatus }) {
  return (
    <Card>
      <div className="stack-inner stack-inner--2">
        <header className="flex-between">
          <LabelGameStatus status={status} />
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
