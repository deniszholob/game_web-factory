import { NumberFormatSuffixPipe } from './number-format-suffix.pipe';

describe('NumberFormatSuffixPipe', () => {
  const pipe: NumberFormatSuffixPipe = new NumberFormatSuffixPipe();

  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  it('returns null for input', () => {
    expect(pipe.transform(null)).toStrictEqual(null);
    expect(pipe.transform(undefined)).toStrictEqual(null);
  });

  it('returns correct string for >1000 values', () => {
    const testval = 99955;
    expect(pipe.transform(testval, 0)).toStrictEqual('99K');
    expect(pipe.transform(testval, 1)).toStrictEqual('99.9K');
    expect(pipe.transform(testval, 2)).toStrictEqual('99.95K');
  });

  it('returns correct string for <1000 values', () => {
    const testval = 955;
    expect(pipe.transform(testval, 0)).toStrictEqual('955');
    expect(pipe.transform(testval, 1)).toStrictEqual('955');
    expect(pipe.transform(testval, 2)).toStrictEqual('955');
  });
});
