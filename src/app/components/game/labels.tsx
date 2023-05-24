import { useContext } from 'react';
import { GameStatus } from '../../../enums';
import { getStateByNumber } from '../../../functions/string';
import { selectMatchStatus, selectNumberOfSets } from '../../../store/selectors';
import { useAppSelector } from '../../hooks/redux';
import { Label, LabelType } from '../ui/label';
import { GameIdContext } from '../../contexts';

export function LabelGameStatus() {
  const gameId = useContext(GameIdContext);
  const status = useAppSelector((s) => selectMatchStatus(s, gameId));
  const labelType = status === GameStatus.FINISH ? 'primary' : 'default';
  return <Label type={labelType}>{getStateByNumber(status)}</Label>;
}
type LabelGameProps = {
  labelType?: LabelType;
};
export function LabelGameSets({ labelType = 'secondary' }: LabelGameProps) {
  const gameId = useContext(GameIdContext);
  const nbrOfSets = useAppSelector((s) => selectNumberOfSets(s, gameId));
  return <Label type={labelType}>{nbrOfSets} sets gagnant</Label>;
}
