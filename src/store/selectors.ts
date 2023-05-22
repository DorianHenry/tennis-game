import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import type { GameId } from '../types';
import { memoize } from 'proxy-memoize';

const selectGameById = (state: RootState, gameId: GameId) => {
  const game = state.games.gameList.find((g) => g.id === gameId);
  if (!game) {
    throw new Error('Le match n existe pas');
  }
  return game;
};
export const selectGames = (state: RootState) => state.games.gameList;

export const selectGame = createSelector([selectGames, selectGameById], (state, game) => game);
export const selectGamesIds = memoize((state: RootState) => state.games.gameList.map((g) => g.id));
export const selectChrono = createSelector(
  [selectGames, selectGameById],
  (state, game) => game.chrono
);
export const selectMatchStatus = createSelector(
  [selectGames, selectGameById],
  (state, game) => game.status
);
export const selectPlayers = createSelector(
  [selectGames, selectGameById],
  (state, game) => game.players
);
