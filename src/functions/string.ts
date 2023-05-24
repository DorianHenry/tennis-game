import { AvatarId, Point } from '../types';

export enum GameStatus {
  ONGOING,
  FINISH
}

export const GameStatusMap = new Map<GameStatus, string>([
  [GameStatus.ONGOING, 'En cours'],
  [GameStatus.FINISH, 'Match terminé']
]);

/**
 * Return the state of the match by the state enum
 */
export function getStateByNumber(state: GameStatus) {
  return GameStatusMap.get(state);
}

export const scrorePoints = new Map<Point, string>([
  [0, '0'],
  [1, '15'],
  [2, '30'],
  [3, '40'],
  [4, 'AD']
]);

/**
 * Return the score point with the score number
 */
export function getScorePoint(scorePoint: Point) {
  return scrorePoints.get(scorePoint);
}

export const avatarMap = new Map<AvatarId, string>([
  [1, '/avatars/girl-1.svg'],
  [2, '/avatars/girl-2.svg'],
  [3, '/avatars/girl-3.svg'],
  [4, '/avatars/girl-4.svg'],
  [5, '/avatars/girl-5.svg']
]);

/**
 * Return the path to the avatar based on his id
 */
export function getAvatar(avatarId: AvatarId) {
  return avatarMap.get(avatarId);
}

/**
 * Return className with different arguments boolean null and string
 */
export function classNames(...classnames: unknown[]) {
  return classnames.filter((classname) => classname !== null && classname !== false).join(' ');
}

/**
 * Return a string with minimum two digits
 */
export function getLocalTwoNumber(number: number) {
  return number.toLocaleString(undefined, {
    minimumIntegerDigits: 2,
    useGrouping: false
  });
}
