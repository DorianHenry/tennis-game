import { DefaultValues } from 'react-hook-form';
import { CreateFormData } from '../../functions';
import { useAppSelector } from '.';
import { selectPotentialtyGame } from '../../store';
import { GameId } from '../../types';

type Props = {
  gameIdParams: string | undefined;
};

type Return = {
  gameIdN: GameId | null;
  isEdit: boolean;
  defaultValues: DefaultValues<CreateFormData>;
};
export function useGameFormDefaultValues({ gameIdParams }: Props): Return {
  const game = useAppSelector((s) => selectPotentialtyGame(s, parseFloat(gameIdParams || '')));
  if (!game) {
    return {
      gameIdN: null,
      isEdit: false,
      defaultValues: {
        players: [
          {
            name: undefined,
            avatarId: 1
          },
          {
            name: undefined,
            avatarId: 1
          }
        ]
      }
    };
  }

  const players = game.players.map((player) => {
    return {
      name: player.name,
      avatarId: player.avatarId
    };
  });
  console.log(players);
  return {
    gameIdN: parseFloat(gameIdParams as string),
    isEdit: true,
    defaultValues: { players }
  };
}
