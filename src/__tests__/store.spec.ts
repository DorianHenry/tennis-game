import { beforeEach, describe, expect, it } from 'vitest';
import store from '../store/store';
import { Game } from '../types';
import { addGame, addPoint, incerementChrono, replaceAllGames } from '../store';
import { expectedNewSet, expectedNewSetWomen, gameTest } from './store.mock';
import { GameStatus } from '../functions';
describe('Game store', () => {
  let games: Game[];
  let updatedGame: Game;
  beforeEach(() => {
    store.dispatch(replaceAllGames({ games: gameTest }));
    games = store.getState().games.gameList;
  });
  it('should return defaultValue', () => {
    const firstGame = games.find((g) => g.id === 1);
    expect(firstGame?.id).toBe(1);
    expect(firstGame?.currentSet).toBe(0);
    expect(firstGame?.status).toBe(GameStatus.ONGOING);
    expect(firstGame?.players[0].name).toBe('John');
  });

  it('should update the chrono', () => {
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

  it('should add a newGame', () => {
    store.dispatch(
      addGame({
        numberOfSets: 3,
        player1: { name: 'Thomas', avatarId: 3 },
        player2: { name: 'Boris', avatarId: 5 }
      })
    );
    games = store.getState().games.gameList;
    const lastGame = games[games.length - 1];
    expect(lastGame.players[0].name).toBe('Thomas');
    expect(lastGame.players[1].name).toBe('Boris');
    expect(lastGame.players[0].avatarId).toBe(3);
    expect(lastGame.players[1].avatarId).toBe(5);
    expect(lastGame.players[0].winTheMatch).toBe(false);
    expect(lastGame.players[1].sets).toEqual(expectedNewSet);
    expect(lastGame.players[0].sets).toEqual(expectedNewSet);
    expect(lastGame.id).toBeDefined();
    expect(lastGame.currentSet).toBe(0);
    expect(lastGame.numberOfSets).toBe(3);
    expect(lastGame.status).toEqual(GameStatus.ONGOING);
    expect(games.length).toBe(3);
    store.dispatch(
      addGame({
        numberOfSets: 2,
        player1: { name: 'Test1', avatarId: 3 },
        player2: { name: 'Test2', avatarId: 5 }
      })
    );
    const updatedGames = store.getState().games.gameList;
    expect(updatedGames[updatedGames.length - 1].players[0].sets.length).toEqual(3);
  });

  it('should handle correctly the points', () => {
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

  it('should handle advantage points', () => {
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

  it('should handle tieBreak', () => {
    games = store.getState().games.gameList;
    updatedGame = games.find((g) => g.id === 2) as Game;
    expect(updatedGame.isTieBreak).toBe(false);

    // go to tie break
    store.dispatch(addPoint({ gameId: updatedGame.id, playerIndex: 0 }));
    for (let i = 0; i < 4; i++) {
      store.dispatch(addPoint({ gameId: updatedGame.id, playerIndex: 1 }));
    }
    games = store.getState().games.gameList;
    updatedGame = games.find((g) => g.id === 2) as Game;
    expect(updatedGame.isTieBreak).toBe(true);
    for (let i = 0; i < 6; i++) {
      store.dispatch(addPoint({ gameId: updatedGame.id, playerIndex: 0 }));
      store.dispatch(addPoint({ gameId: updatedGame.id, playerIndex: 1 }));
    }
    games = store.getState().games.gameList;
    updatedGame = games.find((g) => g.id === 2) as Game;
    expect(updatedGame.players[0].currentPoint).toBe(6);
    expect(updatedGame.players[1].currentPoint).toBe(6);
    expect(updatedGame.players[0].sets[updatedGame.currentSet].win).toBe(false);
    expect(updatedGame.players[1].sets[updatedGame.currentSet].win).toBe(false);
    store.dispatch(addPoint({ gameId: updatedGame.id, playerIndex: 0 }));
    games = store.getState().games.gameList;
    updatedGame = games.find((g) => g.id === 2) as Game;
    expect(updatedGame.players[0].currentPoint).toBe(7);
    expect(updatedGame.players[0].sets[updatedGame.currentSet].win).toBe(false);
    store.dispatch(addPoint({ gameId: updatedGame.id, playerIndex: 0 }));
    games = store.getState().games.gameList;
    updatedGame = games.find((g) => g.id === 2) as Game;
    expect(updatedGame.players[0].currentPoint).toBe(0);
    expect(updatedGame.players[1].currentPoint).toBe(0);
    expect(updatedGame.players[0].sets[2].win).toBe(true);
    expect(updatedGame.isTieBreak).toBe(false);
  });

  it('should handle game win', () => {
    const cGame = games.find((g) => g.id === 2) as Game;
    expect(cGame.players[0].currentPoint).toBe(3);
    const currentTest = gameTest[1];

    expect(cGame.players[0].sets).toEqual(currentTest.players[0].sets);
    expect(cGame.players[1].sets).toEqual(currentTest.players[1].sets);

    expect(cGame.status).toBe(GameStatus.ONGOING);
    expect(cGame.winner).toBeUndefined();

    store.dispatch(addPoint({ gameId: cGame.id, playerIndex: 0 }));

    games = store.getState().games.gameList;
    updatedGame = games.find((g) => g.id === 2) as Game;
    expect(cGame.status).toBe(GameStatus.ONGOING);
    expect(updatedGame.players[0].currentPoint).toBe(0);
    expect(updatedGame.players[0].sets).toEqual([
      {
        point: 6,
        win: true
      },
      {
        point: 0,
        win: false
      },
      {
        point: 6,
        win: false
      },
      {
        point: 0,
        win: false
      },
      {
        point: 0,
        win: false
      }
    ]);
    expect(cGame.players[1].sets).toEqual([
      {
        win: false,
        point: 4
      },
      {
        win: true,
        point: 6
      },
      {
        win: false,
        point: 5
      },
      {
        win: false,
        point: 0
      },
      {
        win: false,
        point: 0
      }
    ]);

    for (let i = 0; i <= 3; i++) {
      store.dispatch(addPoint({ gameId: cGame.id, playerIndex: 0 }));
    }

    games = store.getState().games.gameList;
    updatedGame = games.find((g) => g.id === 2) as Game;

    expect(updatedGame.players[0].sets).toEqual([
      {
        win: true,
        point: 6
      },
      {
        point: 0,
        win: false
      },
      {
        point: 7,
        win: true
      },
      {
        point: 0,
        win: false
      },
      {
        point: 0,
        win: false
      }
    ]);

    expect(updatedGame.status).toBe(GameStatus.ONGOING);
    expect(updatedGame.winner).toBeUndefined();
    expect(updatedGame.players[0].winTheMatch).toBe(false);

    for (let i = 0; i < 25; i++) {
      store.dispatch(addPoint({ gameId: cGame.id, playerIndex: 0 }));
    }

    games = store.getState().games.gameList;
    updatedGame = games.find((g) => g.id === 2) as Game;
    expect(updatedGame.winner).toEqual(updatedGame.players[0]);
    expect(updatedGame.players[0].winTheMatch).toBe(true);
    expect(updatedGame.status).toBe(GameStatus.FINISH);
  });
  it('should handle all the game', () => {
    games = store.getState().games.gameList;
    const cGame = games.find((g) => g.id === 1) as Game;
    expect(cGame.players[1].sets).toEqual(expectedNewSetWomen);
    expect(cGame.players[0].sets).toEqual(expectedNewSetWomen);

    for (let i = 0; i < 25; i++) {
      store.dispatch(addPoint({ gameId: cGame.id, playerIndex: 0 }));
    }

    games = store.getState().games.gameList;
    updatedGame = games.find((g) => g.id === 1) as Game;
    expect(updatedGame.players[0].sets).toEqual([
      { point: 6, win: true },
      { point: 0, win: false },
      { point: 0, win: false }
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
      { point: 0, win: false }
    ]);

    expect(updatedGame.players[1].sets).toEqual([
      { win: false, point: 0 },
      { point: 1, win: false },
      { point: 0, win: false }
    ]);

    for (let i = 0; i < 100; i++) {
      store.dispatch(addPoint({ gameId: cGame.id, playerIndex: 1 }));
    }

    games = store.getState().games.gameList;
    updatedGame = games.find((g) => g.id === 1) as Game;

    expect(updatedGame.players[0].sets).toEqual([
      { point: 6, win: true },
      { point: 0, win: false },
      { point: 0, win: false }
    ]);

    expect(updatedGame.players[1].sets).toEqual([
      { point: 0, win: false },
      { point: 6, win: true },
      { point: 6, win: true }
    ]);
    expect(updatedGame.currentSet).toBe(2);
    expect(updatedGame.winner).toBe(updatedGame.players[1]);
    expect(updatedGame.players[1].winTheMatch).toBe(true);
    expect(updatedGame.status).toBe(GameStatus.FINISH);
  });
});
