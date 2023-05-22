import { useParams } from 'react-router-dom';
import { GameId } from '../../../types';
import { PlayersPresentation } from './player';
import { Card } from '../ui/card';
import { ChronometerWithStore } from './chronometer';
import React from 'react';

type Props = {
  gameId: GameId;
};
export const GameDetailWithStore = React.memo(() => {
  const { gameId } = useParams();
  if (!gameId) {
    throw new Error('pas de game id donné');
  }
  return <GameDetail gameId={parseInt(gameId, 10)} />;
});

export const GameDetail = React.memo(({ gameId }: Props) => {
  return (
    <>
      <div className="mw-800 mx-auto">
        <Card classNameBody="stack-text">
          <PlayersPresentation gameId={gameId} />
          <ChronometerWithStore position="center" gameId={gameId} setTimer={true} />
        </Card>
      </div>
    </>
  );
});
