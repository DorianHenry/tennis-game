import { SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CreateFormData } from '../../functions';
import { GameId, NewPlayer } from '../../types';
import { addGame, updateGame } from '../../store';

export function useAddGame() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<CreateFormData> = async ({ players, numberOfSets }) => {
    if (!players || players.length !== 2 || !numberOfSets) {
      throw new Error(`Les champs ne sont pas correctement remplis`);
    }
    const [player1, player2] = players as NewPlayer[];

    if (numberOfSets !== 2 && numberOfSets !== 3) {
      throw new Error(`Le nombre de sets n'est pas corect`);
    }
    await dispatch(addGame({ player1, player2, numberOfSets }));
    navigate('/');
  };
  return onSubmit;
}

export function useEditGame({ gameId }: { gameId: GameId | null }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(gameId);
  const onSubmit: SubmitHandler<CreateFormData> = async ({ players }) => {
    console.log(gameId);
    if (gameId === null) {
      return;
    }
    if (!players || players.length !== 2) {
      throw new Error(`Les champs ne sont pas correctement remplis`);
    }
    const [player1, player2] = players as NewPlayer[];

    await dispatch(updateGame({ player1, player2, gameId }));
    navigate(`/game/${gameId}`);
  };
  return onSubmit;
}
