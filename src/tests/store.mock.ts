import { Game } from "../types";
import { GameState } from "../enums";

export const gameTest: Game[] = [
  {
    id: 1,
    currentSet: 0,
    status: GameState.ONGOING,
    chrono: 0,
    players: [
      {
        name: "John",
        hasService: true,
        sets: [0, 0, 0],
        currentPoint: 0,
      },
      {
        name: "Jason",
        hasService: false,
        sets: [0, 0, 0],
        currentPoint: 0,
      },
    ],
  },
  {
    id: 2,
    currentSet: 2,
    status: GameState.ONGOING,
    chrono: 300,
    players: [
      {
        name: "Adrien",
        hasService: true,
        sets: [6, 0, 5],
        currentPoint: 3,
      },
      {
        name: "Vincent",
        hasService: false,
        sets: [4, 6, 5],
        currentPoint: 0,
      },
    ],
  },
];
