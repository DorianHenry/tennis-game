import { useEffect, useRef, useState } from 'react';
import store, { RootState } from '../../store/store';
import { GameId } from '../../types';

function selectWinner(state: RootState, gameId: GameId) {
  const game = state.games.gameList.find((g) => g.id === gameId);
  return game?.winner;
}

export function useModalMatchWin({
  gameId
}: {
  gameId: GameId;
}): [boolean, React.Dispatch<React.SetStateAction<boolean>>] {
  const [isOpen, setOpen] = useState(false);
  const currentValueRef = useRef(selectWinner(store.getState(), gameId));
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const previousValue = currentValueRef.current;
      currentValueRef.current = selectWinner(store.getState(), gameId);
      if (currentValueRef.current !== undefined && previousValue !== currentValueRef.current) {
        setOpen(true);
      }
    });
    return () => {
      unsubscribe();
    };
  });

  return [isOpen, setOpen];
}
