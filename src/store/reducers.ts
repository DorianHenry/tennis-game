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

/**
 * Get the localStorage value, if not created get the initial value
 */
const initialState: StoreState = {
  gameList: JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_NAME) || JSON.stringify(gameTest)
  ) as Game[]
};

export const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    /**
     * Increment one second to the chrono
     */
    incerementChrono(state, action: PayloadAction<{ gameId: GameId }>) {
      state.gameList = state.gameList.map((g) => {
        if (g.id === action.payload.gameId) {
          return { ...g, chrono: g.chrono + 1 };
        }
        return g;
      });
    },
    /**
     * Create a new match
     */
    addGame(
      state,
      action: PayloadAction<{ player1: NewPlayer; player2: NewPlayer; numberOfSets: NumberOfSets }>
    ) {
      const { player1, player2, numberOfSets } = action.payload;
      const newGame: Game = getNewGame(player1, player2, numberOfSets, getRandomId());
      state.gameList = [...state.gameList, newGame];
    },

    updateGame(
      state,
      action: PayloadAction<{ player1: NewPlayer; player2: NewPlayer; gameId: GameId }>
    ) {
      state.gameList = state.gameList.map((g) => {
        if (g.id !== action.payload.gameId) {
          return g;
        }
        g.players[0].avatarId = action.payload.player1.avatarId;
        g.players[0].name = action.payload.player1.name;

        g.players[1].avatarId = action.payload.player2.avatarId;
        g.players[1].name = action.payload.player2.name;
        return g;
      });
    },
    removeGame(state, action: PayloadAction<{ gameId: GameId }>) {
      state.gameList = state.gameList.filter((g) => g.id !== action.payload.gameId);
    },
    /**
     * Add a point the the match score
     */
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
    /**
     * Reset all the matches with the game passed, used for unit testing
     */
    replaceAllGames(state, action: PayloadAction<{ games: Game[] }>) {
      state.gameList = action.payload.games;
    }
  }
});

export const { incerementChrono, addGame, updateGame, removeGame, addPoint, replaceAllGames } =
  gamesSlice.actions;

export default gamesSlice.reducer;
