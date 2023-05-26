import { describe, expect, it } from 'vitest';
import {
  GameStatus,
  classNames,
  getAvatar,
  getLocalTwoNumber,
  getScorePoint,
  getStateByNumber
} from '../functions';

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
  describe('getScorePoint', () => {
    it('should get correct values', () => {
      const [zero, one, two, three, four] = [
        getScorePoint(0),
        getScorePoint(1),
        getScorePoint(2),
        getScorePoint(3),
        getScorePoint(4)
      ];
      expect(zero).toEqual('0');
      expect(one).toEqual('15');
      expect(two).toEqual('30');
      expect(three).toEqual('40');
      expect(four).toEqual('AD');
    });
  });
  describe('get avatar', () => {
    it('should get the correct avatar', () => {
      const [one, two, three, four, five] = [
        getAvatar(1),
        getAvatar(2),
        getAvatar(3),
        getAvatar(4),
        getAvatar(5)
      ];

      expect(one).toEqual('/avatars/girl-1.svg');
      expect(two).toEqual('/avatars/girl-2.svg');
      expect(three).toEqual('/avatars/girl-3.svg');
      expect(four).toEqual('/avatars/boy-1.svg');
      expect(five).toEqual('/avatars/boy-2.svg');
    });
  });
});
