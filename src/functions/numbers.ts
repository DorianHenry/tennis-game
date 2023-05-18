/**
 * Check if the two numbers have at least a differnce of two points
 */
export function hasAtLeastTwoDifference(number1: number, number2: number) {
  return Math.abs(number1 - number2) >= 2;
}
