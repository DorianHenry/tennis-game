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

export const avatarMap = new Map<number, string>([
  [1, "girl-1.svg"],
  [2, "girl-2.svg"],
  [3, "girl-3.svg"],
  [4, "girl-4.svg"],
  [5, "girl-5.svg"],
]);
