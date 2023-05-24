import { useParams } from 'react-router-dom';
import { PlayersPresentation } from './player';
import { Card } from '../ui/card';
import { ChronometerWithStore } from './chronometer';
import { GameMatch } from './game-match';
import { useAppSelector } from '../../hooks/redux';
import { selectMatchStatus } from '../../../store/selectors';
import { GameStatus } from '../../../enums';
import { ButtonLink } from '../ui/button';
import { LabelGameSets, LabelGameStatus } from './labels';
import { GameIdContext } from '../../contexts';

type Props = {
  matchStatus: GameStatus;
};
export function GameDetailWithStore() {
  const { gameId } = useParams();
  if (!gameId) {
    throw new Response(`Pas de jeux avec l'id ${gameId}`, { status: 404 });
  }
  const gameIdN = parseInt(gameId, 10);
  const matchStatus = useAppSelector((s) => selectMatchStatus(s, gameIdN));
  return (
    <GameIdContext.Provider value={gameIdN}>
      <GameDetail matchStatus={matchStatus} />
    </GameIdContext.Provider>
  );
}

export function GameDetail({ matchStatus }: Props) {
  const isMatchFinish = matchStatus === GameStatus.FINISH;
  return (
    <div className="stack-section">
      <header className="text-center stack-text">
        <h1>Détail du match</h1>
      </header>
      <div className="mw-800 mx-auto w-100">
        <Card classNameBody="stack-text">
          <div className="text-center">
            <LabelGameStatus />
          </div>
          <PlayersPresentation showAddPoint={!isMatchFinish} />
        </Card>
      </div>
      <div className="stack-inner">
        <div className="grid-game-match">
          <section className="grid-game-match__score stack-text">
            <header className="flex-between">
              <h2>Tableau du score</h2>
              <LabelGameSets />
            </header>
            <Card>
              <GameMatch />
            </Card>
          </section>
          <aside className="stack-text">
            <header>
              <h2>Chrono</h2>
            </header>
            <Card>
              <ChronometerWithStore position="center" setTimer={!isMatchFinish} />
            </Card>
          </aside>
        </div>
      </div>
      <footer className="text-center">
        <ButtonLink to={`/`} size="lg">
          Retour aux matchs
        </ButtonLink>
      </footer>
    </div>
  );
}
