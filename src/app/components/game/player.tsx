import { Avatar } from '../ui/avatar';
import type { GameId, Player as PlayerType } from '../../../types';
import { useAppSelector } from '../../hooks/redux';
import { selectPlayers } from '../../../store/selectors';

export function Player({ player, isInverse = false }: { player: PlayerType; isInverse?: boolean }) {
  const inverseClass = isInverse ? 'player--inverse' : '';
  return (
    <div className={`player ${inverseClass}`}>
      <p className="player__name">{player.name}</p>
      <div className="player__avatar">
        <Avatar avatarId={player.avatarId} />
      </div>
    </div>
  );
}

export function PlayersPresentation({ gameId }: { gameId: GameId }) {
  const players = useAppSelector((s) => selectPlayers(s, gameId)) as [PlayerType, PlayerType];
  return (
    <div className="grid-players">
      <Player player={players[0]} />
      <div className="text-divide">:</div>
      <Player player={players[1]} isInverse={true} />
    </div>
  );
}
