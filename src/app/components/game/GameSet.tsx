import type { SetScore } from '../../../types';
import { selectCurrentSet, selectPlayerSets } from '../../../store';
import { useAppSelector } from '../../hooks';
import { classNames } from '../../../functions';
import { useContext } from 'react';
import { GameIdContext, PlayerIndexContext } from '../../contexts';

type Props = {
  className?: string;
};

type SetProps = {
  set: SetScore;
  className?: string;
  currentSet: number;
  index: number;
};
export function GameSetWithStore({ className = '' }: Props) {
  const gameId = useContext(GameIdContext);
  const playerIndex = useContext(PlayerIndexContext);
  const sets = useAppSelector((s) => selectPlayerSets(s, gameId, playerIndex));
  const currentSet = useAppSelector((s) => selectCurrentSet(s, gameId));
  return (
    <>
      {sets.map((set, i) => (
        <GameSet
          key={`game-set-${playerIndex}-${i}`}
          currentSet={currentSet}
          set={set}
          index={i}
          className={className}
        />
      ))}
    </>
  );
}

function GameSet({ set, className = '', currentSet, index }: SetProps) {
  const customClassName = classNames(
    className,
    set.win && 'set-score--win',
    currentSet === index && 'set-score--current'
  );
  if (currentSet < index) {
    return <></>;
  }
  return <div className={customClassName}>{set.point}</div>;
}
