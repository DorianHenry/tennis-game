import { GameState } from "../enums";
import { AvatarId, Point } from "../types";

export const gameStateMap = new Map<GameState, string>([
  [GameState.ONGOING, "En cours"],
  [GameState.FINISH, "Match terminé"],
]);

export function getStateByNumber(state: GameState) {
  return gameStateMap.get(state);
}

export const scrorePoints = new Map<Point, string>([
  [0, "0"],
  [1, "15"],
  [2, "30"],
  [3, "40"],
  [4, "AD"],
]);

export function getScorePoint(scorePoint: Point) {
  return scrorePoints.get(scorePoint);
}

export const avatarMap = new Map<AvatarId, string>([
  [1, "/avatars/girl-1.svg"],
  [2, "/avatars/girl-2.svg"],
  [3, "/avatars/girl-3.svg"],
  [4, "/avatars/girl-4.svg"],
  [5, "/avatars/girl-5.svg"],
]);

export function getAvatar(avatarId: AvatarId) {
  return avatarMap.get(avatarId);
}

/**
 * Generate className with different arguments boolean null and string
 */
export function classNames(...classnames: unknown[]) {
  return classnames
    .filter((classname) => classname !== null && classname !== false)
    .join(" ");
}

/**
 * Return a string with minimum two digits
 */
export function getLocalTwoNumber(number: number) {
  return number.toLocaleString(undefined, {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
}
