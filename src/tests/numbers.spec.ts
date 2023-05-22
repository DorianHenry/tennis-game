import { describe, expect, it } from 'vitest';
import { getTimeWithSeconds, hasAtLeastTwoDifference } from '../functions/numbers';

describe('numbers helpers', () => {
  it('should calculate if has at least two difference between two numbers', () => {
    expect(hasAtLeastTwoDifference(6, 6)).toBe(false);
    expect(hasAtLeastTwoDifference(5, 6)).toBe(false);
    expect(hasAtLeastTwoDifference(6, 8)).toBe(true);
  });
});

describe('getTimeWithSeconds', () => {
  it('should return correct seconds', () => {
    const { seconds } = getTimeWithSeconds(40);
    expect(seconds).toBe(40);
  });
  it('should return correct munutes', () => {
    const { minutes, seconds } = getTimeWithSeconds(65);
    expect(minutes).toBe(1);
    expect(seconds).toBe(5);
  });
  it('should return a corerct time', () => {
    const { hours, minutes, seconds } = getTimeWithSeconds(7753);
    expect(hours).toBe(2);
    expect(minutes).toBe(9);
    expect(seconds).toBe(13);
  });
});
