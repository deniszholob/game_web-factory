import { clamp, wrapValue } from './number.util';

describe('number', () => {
  describe('wrapValue', () => {
    it('should test myUtilFunction', () => {
      expect(wrapValue).toBeDefined();
    });

    it('should calc', () => {
      expect(wrapValue(13, 64)).toBe(13);
      expect(wrapValue(-13, 64)).toBe(51);
    });
  });

  describe('clamp', () => {
    it('should test myUtilFunction', () => {
      const min = 0;
      const max = 100;

      clamp(-50, min, max); // Will return: 0
      clamp(50, min, max); // Will return: 50
      clamp(500, min, max); // Will return: 100
      expect(wrapValue).toBeDefined();
    });
  });
});
