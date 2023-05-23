import { GameStatus } from '../../../enums';
import { getStateByNumber } from '../../../functions/string';
import { selectMatchStatus, selectNumberOfSets } from '../../../store/selectors';
import { StoreGetGame } from '../../../types';
import { useAppSelector } from '../../hooks/redux';
import { Label, LabelType } from '../ui/label';

export function LabelGameStatus({ gameId }: StoreGetGame) {
  const status = useAppSelector((s) => selectMatchStatus(s, gameId));
  const labelType = status === GameStatus.FINISH ? 'primary' : 'default';
  return <Label type={labelType}>{getStateByNumber(status)}</Label>;
}
type LabelGameProps = StoreGetGame & {
  labelType: LabelType;
};
export function LabelGameSets({ gameId, labelType = 'secondary' }: LabelGameProps) {
  const nbrOfSets = useAppSelector((s) => selectNumberOfSets(s, gameId));
  return <Label type={labelType}>{nbrOfSets} sets gagnant</Label>;
}
