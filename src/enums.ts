import { Point } from "./types";

export enum GameState {
  ONGOING,
  FINISH,
}

export const scrorePoints = new Map<Point, string>([
  [0, "0"],
  [1, "15"],
  [2, "30"],
  [3, "40"],
  [4, "AD"],
]);
