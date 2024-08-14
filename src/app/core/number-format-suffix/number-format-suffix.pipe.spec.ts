import { NumberFormatSuffixPipe } from './number-format-suffix.pipe';

describe('NumberFormatSuffixPipe', () => {
  const pipe: NumberFormatSuffixPipe = new NumberFormatSuffixPipe();

  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  it('returns null for input', () => {
    expect(pipe.transform(null)).toStrictEqual(null);
  });
});
