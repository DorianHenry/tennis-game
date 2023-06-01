import { useCallback } from 'react';
import { GameId } from '../../types';
import { useDispatch } from 'react-redux';
import { removeGame } from '../../store';
import { useNavigate } from 'react-router-dom';

type Props = {
  gameId: GameId;
  returnToGameList?: boolean;
};
export function useRemoveGame({ gameId, returnToGameList = false }: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useCallback(async () => {
    await dispatch(removeGame({ gameId }));
    if (returnToGameList) {
      navigate('/');
    }
  }, [dispatch, gameId, navigate, returnToGameList]);
}
