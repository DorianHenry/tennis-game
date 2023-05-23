import { Avatar } from '../ui/avatar';
import type { GameId, PlayerInfo, StoreGetPlayer } from '../../../types';
import { useAppSelector } from '../../hooks/redux';
import { selectPlayerAvatar, selectPlayerName } from '../../../store/selectors';
import { Button } from '../ui/button';

import { useAddPoint } from '../../hooks/addPoint';

type PlayerProps = StoreGetPlayer & {
  isInverse?: boolean;
  showAddPoint?: boolean;
};

export function Player({
  isInverse = false,
  gameId,
  playerIndex,
  showAddPoint = false
}: PlayerProps) {
  const inverseClass = isInverse ? 'player--inverse' : '';
  const handleClick = useAddPoint({ gameId, playerIndex });
  return (
    <div className={`player ${inverseClass}`}>
      <div className="player__info stack-text stack-text--2">
        <PlayerName gameId={gameId} playerIndex={playerIndex} className="player__name" />
        {showAddPoint && (
          <Button size="sm" onClick={handleClick}>
            Marquer un point
          </Button>
        )}
      </div>

      <div className="player__avatar">
        <PlayerAvatar gameId={gameId} playerIndex={playerIndex} />
      </div>
    </div>
  );
}

export function PlayersPresentation({
  gameId,
  showAddPoint = false
}: {
  gameId: GameId;
  showAddPoint?: boolean;
}) {
  return (
    <div className="grid-players">
      <Player gameId={gameId} playerIndex={0} showAddPoint={showAddPoint} />
      <div className="text-divide">:</div>
      <Player gameId={gameId} playerIndex={1} showAddPoint={showAddPoint} isInverse={true} />
    </div>
  );
}

type PlayerNameProps = StoreGetPlayer & {
  className?: string;
};

export function PlayerName({ gameId, playerIndex, className = '' }: PlayerNameProps) {
  const name = useAppSelector((s) => selectPlayerName(s, gameId, playerIndex));
  return <div className={className}>{name}</div>;
}

export function PlayerAvatar({ gameId, playerIndex }: StoreGetPlayer) {
  const avatarId = useAppSelector((s) => selectPlayerAvatar(s, gameId, playerIndex));
  return <Avatar avatarId={avatarId} />;
}
