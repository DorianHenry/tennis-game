import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import type { GameId } from '../types';
import { memoize } from 'proxy-memoize';

const selectGameById = (state: RootState, gameId: GameId) => {
  const game = state.games.gameList.find((g) => g.id === gameId);
  if (!game) {
    throw new Error(`Le match ${gameId} n existe pas`);
  }
  return game;
};

const selectPlayerByIndex = (state: RootState, gameId: GameId, playerIndex: number) => {
  const game = selectGameById(state, gameId);
  const player = game.players[playerIndex];
  if (!player) {
    throw new Error(`Le joueur avec l'index ${playerIndex} n'existe pas`);
  }
  return player;
};
export const selectGames = (state: RootState) => state.games.gameList;

export const selectGame = createSelector([selectGameById], (game) => game);
export const selectGamesIds = memoize((state: RootState) => state.games.gameList.map((g) => g.id));
export const selectChrono = createSelector([selectGameById], (game) => game.chrono);
export const selectMatchStatus = createSelector([selectGameById], (game) => game.status);
export const selectPlayers = createSelector([selectGameById], (game) => game.players);
export const selectPlayer = createSelector([selectPlayerByIndex], (player) => player);
export const selectPlayerSets = createSelector([selectPlayerByIndex], (player) => player.sets);
export const selectPlayerName = createSelector([selectPlayerByIndex], (player) => player.name);
export const selectPlayerAvatar = createSelector(
  [selectPlayerByIndex],
  (player) => player.avatarId
);
export const selectPlayerCurrentPoint = createSelector(
  [selectPlayerByIndex],
  (player) => player.currentPoint
);
