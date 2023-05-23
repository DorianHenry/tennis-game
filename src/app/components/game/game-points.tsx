import { getScorePoint } from '../../../functions/string';
import { selectIsTieBreak, selectPlayerCurrentPoint } from '../../../store/selectors';
import { StoreGetPlayer } from '../../../types';
import { useAppSelector } from '../../hooks/redux';

type PropsWithStore = StoreGetPlayer & {
  className?: string;
};

type Props = Omit<PropsWithStore, 'gameId' | 'playerIndex'> & {
  currentPoint: number;
  isTieBreak: boolean;
};

export function GamePointWithStore({ gameId, playerIndex, className = '' }: PropsWithStore) {
  const currentPoint = useAppSelector((s) => selectPlayerCurrentPoint(s, gameId, playerIndex));
  const isTieBreak = useAppSelector((s) => selectIsTieBreak(s, gameId));
  return <GamePoint className={className} currentPoint={currentPoint} isTieBreak={isTieBreak} />;
}

export function GamePoint({ className = '', currentPoint, isTieBreak }: Props) {
  const point = isTieBreak ? currentPoint : getScorePoint(currentPoint);
  return <div className={className}>{point}</div>;
}
