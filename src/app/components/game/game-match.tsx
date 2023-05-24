import { useContext } from 'react';
import { classNames } from '../../../functions/string';
import { PlayerIndexContext } from '../../contexts';
import { GamePointWithStore } from './game-points';
import { GameSetWithStore } from './game-set';
import { PlayerName } from './player';

export function GameMatch() {
  return (
    <div className="game-match stack-inner">
      <section>
        {Array.from({ length: 2 }).map((_, i) => {
          return (
            <PlayerIndexContext.Provider key={`player-match-${i}`} value={i}>
              <PlayerMatchScore />
            </PlayerIndexContext.Provider>
          );
        })}
      </section>
    </div>
  );
}
function PlayerMatchScore() {
  const playerIndex = useContext(PlayerIndexContext);
  const isFirstPlayer = playerIndex === 0;
  const className = classNames(
    'set-score',
    isFirstPlayer && 'set-score--top',
    !isFirstPlayer && 'set-score--bottom'
  );
  return (
    <div className="game-match__item">
      <PlayerName className="game-match__player" />
      <GamePointWithStore className={`${className} set-score--point`} />
      <GameSetWithStore className={className} />
    </div>
  );
}
