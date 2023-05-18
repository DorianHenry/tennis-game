import type { Point } from "./types";

export enum GameState {
  ONGOING,
  FINISH,
}

export const scrorePoints = new Map<number, Point>([
  [0, "0"],
  [1, "15"],
  [2, "30"],
  [4, "40"],
  [5, "AD"],
]);
