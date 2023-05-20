import { Avatar } from "../ui/avatar";
import type { Player as PlayerType } from "../../../types";

export function Player({
  player,
  isInverse = false,
}: {
  player: PlayerType;
  isInverse?: boolean;
}) {
  const inverseClass = isInverse ? "player--inverse" : "";
  return (
    <div className={`player ${inverseClass}`}>
      <p className="player__name">{player.name}</p>
      <div className="player__avatar">
        <Avatar avatarId={1} />
      </div>
    </div>
  );
}

export function PlayersPresentation({
  players,
}: {
  players: [PlayerType, PlayerType];
}) {
  return (
    <div className="grid-players">
      <Player player={players[0]} />
      <div className="text-divide">:</div>
      <Player player={players[1]} isInverse={true} />
    </div>
  );
}
