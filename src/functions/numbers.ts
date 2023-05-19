import type { Time } from "../types";

/**
 * Check if the two numbers have at least a differnce of two points
 */
export function hasAtLeastTwoDifference(number1: number, number2: number) {
  return Math.abs(number1 - number2) >= 2;
}

export function getTimeWithSeconds(duration: number): Time {
  const hours = ~~(duration / 3600);
  const minutes = ~~((duration % 3600) / 60);
  const seconds = ~~duration % 60;
  return {
    hours,
    minutes,
    seconds,
  };
}
