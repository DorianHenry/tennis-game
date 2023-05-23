import type { Time } from '../types';

/**
 * Check if the two numbers have at least a differnce of two points
 */
export function hasAtLeastTwoDifference(number1: number, number2: number) {
  return Math.abs(number1 - number2) >= 2;
}

/**
 * Return a object with the seconds minutes and hours based on seconds
 */
export function getTimeWithSeconds(duration: number): Time {
  const hours = ~~(duration / 3600);
  const minutes = ~~((duration % 3600) / 60);
  const seconds = ~~duration % 60;
  return {
    hours,
    minutes,
    seconds
  };
}
/**
 * Return a random number with the current timestamp
 */
export function getRandomId(): number {
  return new Date().getTime();
}
