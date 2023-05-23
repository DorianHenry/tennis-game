import { describe, expect, it } from 'vitest';
import {
  classNames,
  getAvatar,
  getLocalTwoNumber,
  getScorePoint,
  getStateByNumber
} from '../functions/string';
import { GameStatus } from '../enums';

describe('string methods', () => {
  describe('className', () => {
    it('should return a correct className', () => {
      const className = classNames('container', 'test', false && 'test2');
      expect(className).toBe('container test');

      const className2 = classNames('container', 'test', true && 'test2', null);
      expect(className2).toBe('container test test2');
    });
  });

  describe('gets methods', () => {
    it('should return correct GameStatus', () => {
      const finish = getStateByNumber(GameStatus.FINISH);
      expect(finish).toBe('Match terminé');
    });
    it('should return correct avatar', () => {
      const avatar = getAvatar(1);
      expect(avatar).toBe('/avatars/girl-1.svg');
    });
    it('should return correct score points', () => {
      expect(getScorePoint(0)).toBe('0');
      expect(getScorePoint(1)).toBe('15');
      expect(getScorePoint(2)).toBe('30');
      expect(getScorePoint(3)).toBe('40');
      expect(getScorePoint(4)).toBe('AD');
    });
  });

  describe('getLocalTwoNumber', () => {
    it('should return minimum two number digits', () => {
      expect(getLocalTwoNumber(1)).toBe('01');
      expect(getLocalTwoNumber(11)).toBe('11');
      expect(getLocalTwoNumber(1125)).toBe('1125');
      expect(getLocalTwoNumber(1.12)).toBe('01,12');
    });
  });
});
