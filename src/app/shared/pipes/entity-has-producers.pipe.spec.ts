import { EntityHasProducersPipe } from './entity-has-producers.pipe';

describe('EntityHasProducersPipe', () => {
  const pipe: EntityHasProducersPipe = new EntityHasProducersPipe();

  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  it('returns null for input', () => {
    expect(pipe.transform(null)).toStrictEqual(null);
  });
});
