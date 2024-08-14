import { typedNullCheck } from './object.util';

describe('object-functions', () => {
  describe('typedNullCheck', () => {
    it('typedNullCheck with strings', () => {
      const arA: string[] = ['a'];
      const arB: (null | undefined)[] = [null, undefined];
      const arC: (string | null | undefined)[] = [...arA, ...arB];

      // Compiler should check that the types match even before runtime errors can occur.
      const arAf: string[] = arA.filter(typedNullCheck);
      const arBf: string[] = arB.filter(typedNullCheck);
      const arCf: string[] = arC.filter(typedNullCheck);

      expect(arAf).toStrictEqual(arA);
      expect(arBf).toStrictEqual([]);
      expect(arCf).toStrictEqual(arA);
    });

    it('typedNullCheck with numbers', () => {
      const arA: number[] = [0];
      const arB: (null | undefined)[] = [null, undefined];
      const arC: (number | null | undefined)[] = [...arA, ...arB];

      // Compiler should check that the types match even before runtime errors can occur.
      const arAf: number[] = arA.filter(typedNullCheck);
      const arBf: number[] = arB.filter(typedNullCheck);
      const arCf: number[] = arC.filter(typedNullCheck);

      expect(arAf).toStrictEqual(arA);
      expect(arBf).toStrictEqual([]);
      expect(arCf).toStrictEqual(arA);
    });
  });
});
