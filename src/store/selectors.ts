import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import type { Game, GameId } from '../types';
import { memoize, memoizeWithArgs } from 'proxy-memoize';

const selectGameById = memoizeWithArgs((state: RootState, gameId: GameId) => {
  const game = state.games.gameList.find((g) => g.id === gameId);
  if (!game) {
    throw new Error(`Le match ${gameId} n'existe pas`);
  }
  return game;
});
const selectPossiblyGameById = memoizeWithArgs((state: RootState, gameId: GameId) => {
  const game = state.games.gameList.find((g) => g.id === gameId);
  if (!game) {
    return null;
  }
  return game;
});
export const selectGames = (state: RootState) => state.games.gameList;
export const selectGame = createSelector([selectGameById], (game) => game);
export const selectPotentialtyGame = createSelector([selectPossiblyGameById], (game) => game);
export const selectGamesIds = memoize((state: RootState) => state.games.gameList.map((g) => g.id));
export const selectChrono = createSelector([selectGameById], (game) => game.chrono);
export const selectMatchStatus = createSelector([selectGameById], (game) => game.status);
export const selectPlayers = createSelector([selectGameById], (game) => game.players);
export const selectIsTieBreak = createSelector([selectGameById], (game) => game.isTieBreak);
export const selectPlayerByIndex = memoizeWithArgs(
  (state: RootState, gameId: GameId, playerIndex: number) => {
    const game = selectGameById(state, gameId);
    const player = game.players[playerIndex];
    if (!player) {
      throw new Error(`Le joueur avec l'index ${playerIndex} n'existe pas`);
    }
    return player;
  }
);
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
export const selectPlayerHasService = createSelector([selectPlayerByIndex], (player) => {
  return player.hasService;
});
export const selectCurrentSet = createSelector([selectGameById], (game) => game.currentSet);
export const selectNumberOfSets = createSelector([selectGameById], (game) => game.numberOfSets);
export const selectWinner = createSelector([selectGameById], (game) => game.winner);
export const selectIsPlayerWinTheMatch = createSelector(
  [selectPlayerByIndex],
  (player) => player.winTheMatch
);
