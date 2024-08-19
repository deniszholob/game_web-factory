import { ClampPercentPipe } from './clamp-percent.pipe';

describe('ClampPercentPipe', () => {
  const pipe: ClampPercentPipe = new ClampPercentPipe();

  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  it('returns null for input', () => {
    expect(pipe.transform(null)).toStrictEqual(null);
  });
});
