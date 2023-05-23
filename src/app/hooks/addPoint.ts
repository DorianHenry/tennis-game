import { useDispatch } from 'react-redux';
import { StoreGetPlayer } from '../../types';
import { useCallback } from 'react';
import { addPoint } from '../../store/reducers';

export function useAddPoint({ gameId, playerIndex }: StoreGetPlayer) {
  const dispatch = useDispatch();
  return useCallback(() => {
    dispatch(addPoint({ gameId, playerIndex }));
  }, [gameId, playerIndex, dispatch]);
}
