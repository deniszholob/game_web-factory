import { safeArrayIndex } from './array.util';

describe('array-functions', () => {
  describe('safeArrayIndex', () => {
    it('safeArrayIndex with string[]', () => {
      const arA: string[] = ['bob', 'alice'];
      expect(safeArrayIndex(arA, 0)).toStrictEqual('bob');
      expect(safeArrayIndex(arA, 1)).toStrictEqual('alice');
      expect(() => safeArrayIndex(arA, 2)).toThrow(
        'Array index 2 is out of bounds in array of size 2',
      );

      expect(safeArrayIndex(arA, -2)).toStrictEqual('bob');
      expect(safeArrayIndex(arA, -1)).toStrictEqual('alice');
      expect(() => safeArrayIndex(arA, -3)).toThrow(
        'Array index -3 is out of bounds in array of size 2',
      );
    });

    it('safeArrayIndex with (undefined | null)[]', () => {
      const arA: (undefined | null)[] = [undefined, null];
      expect(safeArrayIndex(arA, 0)).toStrictEqual(undefined);
      expect(safeArrayIndex(arA, 1)).toStrictEqual(null);
      expect(() => safeArrayIndex(arA, 2)).toThrow(
        'Array index 2 is out of bounds in array of size 2',
      );
    });

    it('safeArrayIndex with empty []', () => {
      expect(() => safeArrayIndex([], 0)).toThrow(
        'Array index 0 is out of bounds in array of size 0',
      );
    });
  });
});
