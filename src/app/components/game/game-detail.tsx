import { useParams } from 'react-router-dom';
import type { StoreGetGame } from '../../../types';
import { PlayersPresentation } from './player';
import { Card } from '../ui/card';
import { ChronometerWithStore } from './chronometer';
import { GameMatch } from './game-match';
import { useAppSelector } from '../../hooks/redux';
import { selectMatchStatus } from '../../../store/selectors';
import { GameStatus } from '../../../enums';

type Props = StoreGetGame & {
  matchStatus: GameStatus;
};
export function GameDetailWithStore() {
  const { gameId } = useParams();
  if (!gameId) {
    throw new Response(`Pas de jeux avec l'id ${gameId}`, { status: 404 });
  }
  const gameIdN = parseInt(gameId, 10);
  const matchStatus = useAppSelector((s) => selectMatchStatus(s, gameIdN));
  return <GameDetail gameId={gameIdN} matchStatus={matchStatus} />;
}

export function GameDetail({ gameId, matchStatus }: Props) {
  const isMatchFinish = matchStatus === GameStatus.FINISH;
  return (
    <div className="stack-section">
      <div className="mw-800 mx-auto w-100">
        <Card classNameBody="stack-text">
          <PlayersPresentation gameId={gameId} showAddPoint={!isMatchFinish} />
          <ChronometerWithStore position="center" gameId={gameId} setTimer={!isMatchFinish} />
        </Card>
      </div>
      <div>
        <Card>
          <GameMatch gameId={gameId} />
        </Card>
      </div>
    </div>
  );
}
