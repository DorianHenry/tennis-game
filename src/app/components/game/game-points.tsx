import { getScorePoint } from '../../../functions/string';
import { selectPlayerCurrentPoint } from '../../../store/selectors';
import { StoreGetPlayer } from '../../../types';
import { useAppSelector } from '../../hooks/redux';

type PropsWithStore = StoreGetPlayer & {
  className?: string;
};

type Props = Omit<PropsWithStore, 'gameId' | 'playerIndex'> & {
  currentPoint: number;
};

export function GamePointWithStore({ gameId, playerIndex, className = '' }: PropsWithStore) {
  const currentPoint = useAppSelector((s) => selectPlayerCurrentPoint(s, gameId, playerIndex));
  return <GamePoint className={className} currentPoint={currentPoint} />;
}

export function GamePoint({ className = '', currentPoint }: Props) {
  return <div className={className}>{getScorePoint(currentPoint)}</div>;
}
