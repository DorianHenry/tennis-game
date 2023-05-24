import { useContext } from 'react';
import { getScorePoint } from '../../../functions';
import { selectIsTieBreak, selectPlayerCurrentPoint } from '../../../store/selectors';
import { useAppSelector } from '../../hooks/redux';
import { GameIdContext, PlayerIndexContext } from '../../contexts';

type PropsWithStore = {
  className?: string;
};

type Props = Omit<PropsWithStore, 'gameId' | 'playerIndex'> & {
  currentPoint: number;
  isTieBreak: boolean;
};

export function GamePointWithStore({ className = '' }: PropsWithStore) {
  const gameId = useContext(GameIdContext);
  const playerIndex = useContext(PlayerIndexContext);
  const currentPoint = useAppSelector((s) => selectPlayerCurrentPoint(s, gameId, playerIndex));
  const isTieBreak = useAppSelector((s) => selectIsTieBreak(s, gameId));
  return <GamePoint className={className} currentPoint={currentPoint} isTieBreak={isTieBreak} />;
}

export function GamePoint({ className = '', currentPoint, isTieBreak }: Props) {
  const point = isTieBreak ? currentPoint : getScorePoint(currentPoint);
  return <div className={className}>{point}</div>;
}
