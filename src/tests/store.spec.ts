import { beforeEach, describe, expect, it } from "vitest";
import store from "../store/store";
import { Game } from "../types";
import { GameState } from "../enums";
import {
  addGame,
  addPoint,
  incerementChrono,
  replaceAllGames,
} from "../store/reducers";
import { gameTest } from "./store.mock";
describe("Game store", () => {
  let games: Game[];
  let updatedGame: Game;
  beforeEach(() => {
    store.dispatch(replaceAllGames({ games: gameTest }));
    games = store.getState().games.gameList;
  });
  it("should return defaultValue", () => {
    const firstGame = games.find((g) => g.id === 1);
    expect(firstGame?.id).toBe(1);
    expect(firstGame?.currentSet).toBe(0);
    expect(firstGame?.status).toBe(GameState.ONGOING);
    expect(firstGame?.players[0].name).toBe("John");
  });

  it("should update the chrono", () => {
    const firstGame = games.find((g) => g.id === 1) as Game;
    expect(firstGame?.chrono).toBe(0);
    store.dispatch(incerementChrono({ gameId: firstGame.id }));
    games = store.getState().games.gameList;
    const gameChanged = games.find((g) => g.id === 1) as Game;
    expect(gameChanged?.chrono).toBe(1);

    for (let i = 0; i < 10; i++) {
      store.dispatch(incerementChrono({ gameId: firstGame.id }));
    }
    games = store.getState().games.gameList;
    const gameChangedMulti = games.find((g) => g.id === 1) as Game;
    expect(gameChangedMulti.chrono).toBe(11);
  });

  it("should add a newGame", () => {
    store.dispatch(addGame({ player1: "Thomas", player2: "Boris" }));
    games = store.getState().games.gameList;
    const lastGame = games[games.length - 1];
    expect(lastGame.players[0].name).toBe("Thomas");
    expect(lastGame.players[1].name).toBe("Boris");
    expect(lastGame.id).toBeDefined();
    expect(lastGame.currentSet).toBe(0);
    expect(lastGame.status).toEqual(GameState.ONGOING);
  });

  it("should handle correctly the points", () => {
    const firstGame = games.find((g) => g.id === 1) as Game;
    const firstPlayer = firstGame.players[0];
    expect(firstPlayer.currentPoint).toBe(0);
    for (let i = 0; i <= 2; i++) {
      store.dispatch(addPoint({ gameId: firstGame.id, playerIndex: 0 }));
    }
    games = store.getState().games.gameList;
    updatedGame = games.find((g) => g.id === 1) as Game;

    expect(updatedGame.players[0].currentPoint).toBe(3);
    expect(updatedGame.players[1].currentPoint).toBe(0);

    store.dispatch(addPoint({ gameId: firstGame.id, playerIndex: 0 }));

    games = store.getState().games.gameList;
    updatedGame = games.find((g) => g.id === 1) as Game;

    expect(updatedGame.players[0].currentPoint).toBe(0);
    expect(updatedGame.players[1].currentPoint).toBe(0);
  });

  it("should handle advantage points", () => {
    const firstGame = games.find((g) => g.id === 1) as Game;
    const firstPlayer = firstGame.players[0];
    expect(firstPlayer.currentPoint).toBe(0);
    for (let i = 0; i <= 2; i++) {
      store.dispatch(addPoint({ gameId: firstGame.id, playerIndex: 0 }));
      store.dispatch(addPoint({ gameId: firstGame.id, playerIndex: 1 }));
    }
    games = store.getState().games.gameList;
    updatedGame = games.find((g) => g.id === 1) as Game;

    expect(updatedGame.players[0].currentPoint).toBe(3);
    expect(updatedGame.players[1].currentPoint).toBe(3);

    store.dispatch(addPoint({ gameId: firstGame.id, playerIndex: 0 }));

    games = store.getState().games.gameList;
    updatedGame = games.find((g) => g.id === 1) as Game;

    expect(updatedGame.players[0].currentPoint).toBe(4);
    expect(updatedGame.players[1].currentPoint).toBe(3);

    store.dispatch(addPoint({ gameId: firstGame.id, playerIndex: 1 }));

    games = store.getState().games.gameList;
    updatedGame = games.find((g) => g.id === 1) as Game;

    expect(updatedGame.players[0].currentPoint).toBe(3);
    expect(updatedGame.players[1].currentPoint).toBe(3);

    store.dispatch(addPoint({ gameId: firstGame.id, playerIndex: 1 }));

    games = store.getState().games.gameList;
    updatedGame = games.find((g) => g.id === 1) as Game;

    expect(updatedGame.players[0].currentPoint).toBe(3);
    expect(updatedGame.players[1].currentPoint).toBe(4);

    store.dispatch(addPoint({ gameId: firstGame.id, playerIndex: 1 }));

    games = store.getState().games.gameList;
    updatedGame = games.find((g) => g.id === 1) as Game;

    expect(updatedGame.players[0].currentPoint).toBe(0);
    expect(updatedGame.players[1].currentPoint).toBe(0);
  });

  it("should handle game win", () => {
    const cGame = games.find((g) => g.id === 2) as Game;
    expect(cGame.players[0].currentPoint).toBe(3);
    expect(cGame.players[0].sets).toEqual([6, 0, 5]);
    expect(cGame.players[1].sets).toEqual([4, 6, 5]);

    store.dispatch(addPoint({ gameId: cGame.id, playerIndex: 0 }));

    games = store.getState().games.gameList;
    updatedGame = games.find((g) => g.id === 2) as Game;
    expect(updatedGame.players[0].currentPoint).toBe(0);
    expect(updatedGame.players[0].sets).toEqual([6, 0, 6]);
    expect(cGame.players[1].sets).toEqual([4, 6, 5]);
  });
});
