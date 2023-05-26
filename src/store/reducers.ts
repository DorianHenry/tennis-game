import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Game, GameId, NewPlayer, NumberOfSets, StoreState } from '../types';
import { gameTest } from '../initial-values';
import { LOCAL_STORAGE_NAME } from '../constante';
import {
  getRandomId,
  GameStatus,
  getNewGame,
  getPointScore,
  getPlayers,
  getGameScore,
  isWinningMatch,
  isTieBreak
} from '../functions';

const initialState: StoreState = {
  gameList: JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_NAME) || JSON.stringify(gameTest)
  ) as Game[]
};

export const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    incerementChrono(state, action: PayloadAction<{ gameId: GameId }>) {
      state.gameList = state.gameList.map((g) => {
        if (g.id === action.payload.gameId) {
          return { ...g, chrono: g.chrono + 1 };
        }
        return g;
      });
    },
    addGame(
      state,
      action: PayloadAction<{ player1: NewPlayer; player2: NewPlayer; numberOfSets: NumberOfSets }>
    ) {
      const { player1, player2, numberOfSets } = action.payload;
      const newGame: Game = getNewGame(player1, player2, numberOfSets, getRandomId());
      state.gameList = [...state.gameList, newGame];
    },
    addPoint(state, action: PayloadAction<{ gameId: GameId; playerIndex: number }>) {
      const game = state.gameList.find((g) => g.id === action.payload.gameId);
      if (!game) {
        throw new Error(`game with id ${action.payload.gameId} does not exist`);
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
        otherPlayer,
        isTieBreak: game.isTieBreak
      });

      state.gameList = state.gameList.map((g) => {
        if (g.id !== action.payload.gameId) {
          return g;
        }

        g.players[action.payload.playerIndex].currentPoint = newWinningScore;
        g.players[otherPlayerIndex].currentPoint = newOtherScore;

        if (g.isTieBreak) {
          g.players[0].hasService = !g.players[0].hasService;
          g.players[1].hasService = !g.players[1].hasService;
        }

        if (!winGame) {
          return g;
        }

        const { newSet, winSet, winnerSetPoint, loserSetPoint } = getGameScore({
          winningPlayer,
          otherPlayer,
          currentSet: game.currentSet
        });

        g.players[action.payload.playerIndex].sets = newSet;
        g.players[0].hasService = !g.players[0].hasService;
        g.players[1].hasService = !g.players[1].hasService;

        g.isTieBreak = isTieBreak(winnerSetPoint, loserSetPoint);

        if (!winSet) {
          return g;
        }

        const winMatch = isWinningMatch(newSet, game.numberOfSets);

        if (!winMatch) {
          g.currentSet++;
          return g;
        }

        g.winner = winningPlayer;
        g.players[action.payload.playerIndex].winTheMatch = true;
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
