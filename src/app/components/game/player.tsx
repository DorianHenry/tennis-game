import { Avatar } from '../ui/avatar';
import type { GameId } from '../../../types';
import { useAppSelector } from '../../hooks/redux';
import { selectPlayerAvatar, selectPlayerName } from '../../../store/selectors';
import { Button } from '../ui/button';

import { useAddPoint } from '../../hooks/addPoint';
import { useContext } from 'react';
import { GameIdContext, PlayerIndexContext } from '../../contexts';

type PlayerProps = {
  isInverse?: boolean;
  showAddPoint?: boolean;
};

export function Player({ isInverse = false, showAddPoint = false }: PlayerProps) {
  const gameId = useContext(GameIdContext);
  const playerIndex = useContext(PlayerIndexContext);
  const inverseClass = isInverse ? 'player--inverse' : '';
  const handleClick = useAddPoint({ gameId, playerIndex });
  return (
    <div className={`player ${inverseClass}`}>
      <div className="player__info stack-text stack-text--2">
        <PlayerName className="player__name" />
        {showAddPoint && (
          <Button size="sm" onClick={handleClick}>
            Marquer un point
          </Button>
        )}
      </div>

      <div className="player__avatar">
        <PlayerAvatar />
      </div>
    </div>
  );
}

export function PlayersPresentation({ showAddPoint = false }: { showAddPoint?: boolean }) {
  return (
    <div className="grid-players">
      <PlayerIndexContext.Provider value={0}>
        <Player showAddPoint={showAddPoint} />
      </PlayerIndexContext.Provider>
      <div className="text-divide">:</div>
      <PlayerIndexContext.Provider value={1}>
        <Player showAddPoint={showAddPoint} isInverse={true} />
      </PlayerIndexContext.Provider>
    </div>
  );
}

type PlayerNameProps = {
  className?: string;
};

export function PlayerName({ className = '' }: PlayerNameProps) {
  const playerIndex = useContext(PlayerIndexContext);
  const gameId = useContext(GameIdContext);
  const name = useAppSelector((s) => selectPlayerName(s, gameId, playerIndex));
  return <div className={className}>{name}</div>;
}

export function PlayerAvatar() {
  const playerIndex = useContext(PlayerIndexContext);
  const gameId = useContext(GameIdContext);
  const avatarId = useAppSelector((s) => selectPlayerAvatar(s, gameId, playerIndex));
  return <Avatar avatarId={avatarId} />;
}
