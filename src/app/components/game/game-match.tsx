import { useContext } from 'react';
import { GameStatus, classNames } from '../../../functions';
import { GameIdContext, PlayerIndexContext } from '../../contexts';
import { GamePointWithStore } from './game-points';
import { GameSetWithStore } from './game-set';
import { PlayerName } from './player';
import { useAppSelector } from '../../hooks/redux';
import { selectMatchStatus } from '../../../store/selectors';

export function GameMatch() {
  return (
    <div className="game-match">
      {Array.from({ length: 2 }).map((_, i) => {
        return (
          <PlayerIndexContext.Provider key={`player-match-${i}`} value={i}>
            <PlayerMatchScore />
          </PlayerIndexContext.Provider>
        );
      })}
    </div>
  );
}
function PlayerMatchScore() {
  const gameId = useContext(GameIdContext);
  const playerIndex = useContext(PlayerIndexContext);
  const gameStatus = useAppSelector((s) => selectMatchStatus(s, gameId));
  const isFirstPlayer = playerIndex === 0;
  const className = classNames(
    'set-score',
    isFirstPlayer && 'set-score--top',
    !isFirstPlayer && 'set-score--bottom'
  );
  return (
    <div className="game-match__item">
      <PlayerName className="game-match__player" />

      <GameSetWithStore className={className} />
      {gameStatus !== GameStatus.FINISH && (
        <GamePointWithStore className={`${className} set-score--point`} />
      )}
    </div>
  );
}
