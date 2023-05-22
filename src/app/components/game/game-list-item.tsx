import { GameState } from '../../../enums';
import { getStateByNumber } from '../../../functions/string';
import { selectMatchStatus } from '../../../store/selectors';
import type { GameId } from '../../../types';
import { useAppSelector } from '../../hooks/redux';
import { ButtonLink } from '../ui/button';
import { Card } from '../ui/card';
import { Label } from '../ui/label';
import { ChronometerWithStore } from './chronometer';
import { PlayersPresentation } from './player';

export function GameListItemWithStore({ gameId }: { gameId: GameId }) {
  const status = useAppSelector((s) => selectMatchStatus(s, gameId));
  return <GameListItem gameId={gameId} status={status} />;
}

export function GameListItem({ gameId, status }: { gameId: GameId; status: GameState }) {
  return (
    <Card>
      <div className="stack-inner stack-inner--2">
        <header className="flex-between">
          <Label>{getStateByNumber(status)}</Label>
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
