import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Game, GameId, NewPlayer, StoreState } from '../types';
import { gameTest } from '../values';
import {
  getNewGame,
  getPointScore,
  getPlayers,
  getRandomId,
  getGameScore,
  isWinningMatch
} from '../functions/games';
import { GameStatus } from '../enums';
import { LOCAL_STORAGE_NAME } from '../constante';

let gameList = gameTest;
try {
  gameList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME) || '') as Game[];
} catch (e) {
  console.warn(e);
}
const initialState: StoreState = {
  gameList
};

export const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    incerementChrono(state, action: PayloadAction<{ gameId: GameId }>) {
      state.gameList = state.gameList.map((g) => {
        if (g.id === action.payload.gameId) {
          const newChrono = g.chrono + 1;
          return { ...g, chrono: newChrono };
        }
        return g;
      });
    },
    addGame(state, action: PayloadAction<{ player1: NewPlayer; player2: NewPlayer }>) {
      const { player1, player2 } = action.payload;
      const newGame: Game = getNewGame(player1, player2, getRandomId());
      state.gameList = [...state.gameList, newGame];
    },
    addPoint(state, action: PayloadAction<{ gameId: GameId; playerIndex: number }>) {
      const game = state.gameList.find((g) => g.id === action.payload.gameId);
      if (!game) {
        throw new Error(`game width id ${action.payload.gameId} does not exist`);
      }

      if (game.status === GameStatus.FINISH) {
        return;
      }
      const { winningPlayer, otherPlayer, otherPlayerIndex } = getPlayers(
        action.payload.playerIndex,
        game.players
      );
      const { newWinningScore, newOtherScore, winGame } = getPointScore({
        winningPlayer,
        otherPlayer
      });

      state.gameList = state.gameList.map((g) => {
        if (g.id !== action.payload.gameId) {
          return g;
        }
        g.players[action.payload.playerIndex].currentPoint = newWinningScore;
        g.players[otherPlayerIndex].currentPoint = newOtherScore;
        if (!winGame) {
          return g;
        }
        const { newSet, winSet } = getGameScore({
          winningPlayer,
          otherPlayer,
          currentSet: game.currentSet
        });
        g.players[action.payload.playerIndex].sets = newSet;
        if (!winSet) {
          return g;
        }
        const winMatch = isWinningMatch(newSet);
        if (!winMatch) {
          g.currentSet++;
          return g;
        }
        g.winner = winningPlayer;
        g.status = GameStatus.FINISH;
        return g;
      });
    },
    replaceAllGames(state, action: PayloadAction<{ games: Game[] }>) {
      state.gameList = action.payload.games;
    }
  }
});
export const { incerementChrono, addGame, addPoint, replaceAllGames } = gamesSlice.actions;

export default gamesSlice.reducer;
