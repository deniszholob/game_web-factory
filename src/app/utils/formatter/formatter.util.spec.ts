import { toTitleCase, toWordCase } from './formatter.util';

describe('Formatter Functions', () => {
  it('should convert toTitleCase', () => {
    expect(toTitleCase('abc')).toStrictEqual('Abc');
  });

  it('should convert toWordCase', () => {
    expect(toWordCase('a b c')).toStrictEqual('A B C');
  });
});
