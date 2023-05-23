import { GameStatus } from '../../../enums';
import { getStateByNumber } from '../../../functions/string';
import { Label } from '../ui/label';

export function LabelGameStatus({ status }: { status: GameStatus }) {
  const labelType = status === GameStatus.FINISH ? 'primary' : 'default';
  return <Label type={labelType}>{getStateByNumber(status)}</Label>;
}
