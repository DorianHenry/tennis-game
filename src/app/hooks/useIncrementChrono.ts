import { useEffect } from 'react';
import { useAppDispatch } from '.';
import { incerementChrono } from '../../store';
import { GameId } from '../../types';

type Props = {
  setTimer?: boolean;
  gameId: GameId;
};
export function useIncrementChrono({ setTimer = false, gameId }: Props) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (setTimer) {
      const interval = setInterval(async () => {
        await dispatch(incerementChrono({ gameId }));
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  });
}
