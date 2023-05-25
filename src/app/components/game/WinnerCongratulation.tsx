import { useContext } from 'react';
import { useAppSelector } from '../../hooks';
import { GameIdContext } from '../../contexts';
import { selectWinner } from '../../../store';
import { Avatar } from '../ui';

export function WinnerCongratulation() {
  const gameId = useContext(GameIdContext);
  const winner = useAppSelector((s) => selectWinner(s, gameId));
  if (winner === undefined) {
    return <h3>Pas de joueur gagnant</h3>;
  }
  return (
    <section className="winner-infos stack-text">
      <Avatar avatarId={winner.avatarId} />
      <h2>{winner.name} a gagné le match !</h2>
    </section>
  );
}
