import { classNames } from '../../../functions/string';

import type { StoreGetGame, StoreGetPlayer } from '../../../types';
import { GamePointWithStore } from './game-points';
import { GameSetWithStore } from './game-set';
import { PlayerName } from './player';

export function GameMatch({ gameId }: StoreGetGame) {
  return (
    <div className="game-match stack-inner">
      <header>
        <h2>Le match</h2>
      </header>
      <section>
        {Array.from({ length: 2 }).map((_, i) => {
          return <PlayerMatchScore gameId={gameId} key={`player-match-${i}`} playerIndex={i} />;
        })}
      </section>
    </div>
  );
}
function PlayerMatchScore({ playerIndex, gameId }: StoreGetPlayer) {
  const isFirstPlayer = playerIndex === 0;
  const className = classNames(
    'set-score',
    isFirstPlayer && 'set-score--top',
    !isFirstPlayer && 'set-score--bottom'
  );
  return (
    <div className="game-match__item">
      <PlayerName gameId={gameId} playerIndex={playerIndex} />
      <GamePointWithStore
        className={`${className} set-score--point`}
        gameId={gameId}
        playerIndex={playerIndex}
      />
      <GameSetWithStore className={className} gameId={gameId} playerIndex={playerIndex} />
    </div>
  );
}
