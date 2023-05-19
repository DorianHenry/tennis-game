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
import { expectedNewSet, gameTest } from "./store.mock";
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
    expect(lastGame.players[1].sets).toEqual(expectedNewSet);
    expect(lastGame.players[0].sets).toEqual(expectedNewSet);
    expect(lastGame.id).toBeDefined();
    expect(lastGame.currentSet).toBe(0);
    expect(lastGame.status).toEqual(GameState.ONGOING);
    expect(games.length).toBe(3);
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
    const currentTest = gameTest[1];

    expect(cGame.players[0].sets).toEqual(currentTest.players[0].sets);
    expect(cGame.players[1].sets).toEqual(currentTest.players[1].sets);

    expect(cGame.status).toBe(GameState.ONGOING);
    expect(cGame.winner).toBeUndefined();

    store.dispatch(addPoint({ gameId: cGame.id, playerIndex: 0 }));

    games = store.getState().games.gameList;
    updatedGame = games.find((g) => g.id === 2) as Game;
    expect(cGame.status).toBe(GameState.ONGOING);
    expect(updatedGame.players[0].currentPoint).toBe(0);
    expect(updatedGame.players[0].sets).toEqual([
      {
        point: 6,
        win: true,
      },
      {
        point: 0,
        win: false,
      },
      {
        point: 6,
        win: false,
      },
    ]);
    expect(cGame.players[1].sets).toEqual([
      {
        win: false,
        point: 4,
      },
      {
        win: true,
        point: 6,
      },
      {
        win: false,
        point: 5,
      },
    ]);

    for (let i = 0; i <= 3; i++) {
      store.dispatch(addPoint({ gameId: cGame.id, playerIndex: 0 }));
    }

    games = store.getState().games.gameList;
    updatedGame = games.find((g) => g.id === 2) as Game;

    expect(updatedGame.players[0].sets).toEqual([
      {
        win: true,
        point: 6,
      },
      {
        point: 0,
        win: false,
      },
      {
        point: 7,
        win: true,
      },
    ]);

    expect(updatedGame.winner).toEqual(updatedGame.players[0]);
    expect(updatedGame.status).toBe(GameState.FINISH);
  });
  it("should handle all the game", () => {
    games = store.getState().games.gameList;
    const cGame = games.find((g) => g.id === 1) as Game;
    expect(cGame.players[1].sets).toEqual(expectedNewSet);
    expect(cGame.players[0].sets).toEqual(expectedNewSet);

    for (let i = 0; i < 25; i++) {
      store.dispatch(addPoint({ gameId: cGame.id, playerIndex: 0 }));
    }

    games = store.getState().games.gameList;
    updatedGame = games.find((g) => g.id === 1) as Game;
    expect(updatedGame.players[0].sets).toEqual([
      { point: 6, win: true },
      { point: 0, win: false },
      { point: 0, win: false },
    ]);
    expect(updatedGame.players[0].currentPoint).toBe(1);
    expect(updatedGame.currentSet).toBe(1);

    for (let i = 0; i < 2; i++) {
      store.dispatch(addPoint({ gameId: cGame.id, playerIndex: 0 }));
    }
    for (let i = 0; i < 5; i++) {
      store.dispatch(addPoint({ gameId: cGame.id, playerIndex: 1 }));
    }

    games = store.getState().games.gameList;
    updatedGame = games.find((g) => g.id === 1) as Game;

    expect(updatedGame.players[0].currentPoint).toBe(0);
    expect(updatedGame.players[1].currentPoint).toBe(0);

    expect(updatedGame.players[0].sets).toEqual([
      { point: 6, win: true },
      { point: 0, win: false },
      { point: 0, win: false },
    ]);

    expect(updatedGame.players[1].sets).toEqual([
      { win: false, point: 0 },
      { point: 1, win: false },
      { point: 0, win: false },
    ]);

    for (let i = 0; i < 100; i++) {
      store.dispatch(addPoint({ gameId: cGame.id, playerIndex: 1 }));
    }

    games = store.getState().games.gameList;
    updatedGame = games.find((g) => g.id === 1) as Game;

    expect(updatedGame.players[0].sets).toEqual([
      { point: 6, win: true },
      { point: 0, win: false },
      { point: 0, win: false },
    ]);

    expect(updatedGame.players[1].sets).toEqual([
      { point: 0, win: false },
      { point: 6, win: true },
      { point: 6, win: true },
    ]);
    expect(updatedGame.currentSet).toBe(2);
    expect(updatedGame.winner).toBe(updatedGame.players[1]);
    expect(updatedGame.status).toBe(GameState.FINISH);
  });
});
