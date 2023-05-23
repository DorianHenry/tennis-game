import type { SetScore, StoreGetPlayer } from '../../../types';
import { selectPlayerSets } from '../../../store/selectors';
import { useAppSelector } from '../../hooks/redux';

type Props = StoreGetPlayer & {
  className?: string;
};

export function GameSetWithStore({ gameId, playerIndex, className = '' }: Props) {
  const sets = useAppSelector((s) => selectPlayerSets(s, gameId, playerIndex));
  return (
    <>
      {sets.map((set, i) => (
        <GameSet key={`game-set-${playerIndex}-${i}`} set={set} className={className} />
      ))}
    </>
  );
}

function GameSet({ set, className = '' }: { set: SetScore; className?: string }) {
  return <div className={className}>{set.point}</div>;
}
