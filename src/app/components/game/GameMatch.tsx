import { useContext } from 'react';
import { GameStatus, classNames } from '../../../functions';
import { GameIdContext, PlayerIndexContext } from '../context/game';
import { PlayerName, GameSetWithStore, GamePointWithStore } from './';
import { useAppSelector } from '../../hooks';
import { selectMatchStatus, selectPlayerHasService } from '../../../store';

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
  const hasService = useAppSelector((s) => selectPlayerHasService(s, gameId, playerIndex));
  const isFirstPlayer = playerIndex === 0;
  const className = classNames(
    'set-score',
    isFirstPlayer && 'set-score--top',
    !isFirstPlayer && 'set-score--bottom'
  );
  return (
    <div className="game-match__item">
      <div className="flex-inline game-match__player">
        <PlayerName />
        {hasService && gameStatus !== GameStatus.FINISH && (
          <img width="15" src="/ball.svg" alt="service" />
        )}
      </div>

      <GameSetWithStore className={className} />
      {gameStatus !== GameStatus.FINISH && (
        <GamePointWithStore className={`${className} set-score--point`} />
      )}
    </div>
  );
}
