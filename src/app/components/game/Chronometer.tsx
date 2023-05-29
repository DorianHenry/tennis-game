import { useAppSelector, useIncrementChrono } from '../../hooks';
import { getTimeWithSeconds, classNames, getLocalTwoNumber } from '../../../functions';
import { useContext } from 'react';
import { selectChrono } from '../../../store';
import { GameIdContext } from '../../contexts';

type Position = 'left' | 'center' | 'right';
type ChronoPropsStore = {
  position?: Position;
  setTimer?: boolean;
};

type ChronoProps = {
  duration: number;
  position?: Position;
};

export function ChronometerWithStore({ position = 'left', setTimer = false }: ChronoPropsStore) {
  const gameId = useContext(GameIdContext);

  const seconds = useAppSelector((s) => selectChrono(s, gameId));
  useIncrementChrono({ setTimer, gameId });

  if (seconds !== undefined) {
    return <Chronometer duration={seconds} position={position} />;
  }
  return <></>;
}

export function Chronometer({ duration, position }: ChronoProps) {
  const { seconds, minutes, hours } = getTimeWithSeconds(duration);
  const className = classNames('chrono', `chrono--${position}`);
  return (
    <div className={className}>
      <div className="chrono__h">
        <span className="chrono__time">{getLocalTwoNumber(hours)}</span>
        <span className="chrono__text">Heures</span>
      </div>
      <div className="chrono__m">
        <span className="chrono__time">{getLocalTwoNumber(minutes)}</span>
        <span className="chrono__text">Minutes</span>
      </div>
      <div className="chrono__s">
        <span className="chrono__time">{getLocalTwoNumber(seconds)}</span>
        <span className="chrono__text">Secondes</span>
      </div>
    </div>
  );
}
