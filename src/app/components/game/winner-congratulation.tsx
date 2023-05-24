import { useContext } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { GameIdContext } from '../../contexts';
import { selectWinner } from '../../../store/selectors';
import { Avatar } from '../ui/avatar';

export function WinnerCongratulation() {
  const gameId = useContext(GameIdContext);
  const winner = useAppSelector((s) => selectWinner(s, gameId));
  if (winner === undefined) {
    return <h3>Pas de joueur gagnant</h3>;
  }
  return (
    <section className="winner-infos">
      <Avatar avatarId={winner.avatarId} />
      <h2>{winner.name} gagne le match !</h2>
    </section>
  );
}
