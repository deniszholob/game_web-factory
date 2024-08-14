import { getTypedStorageItem, setTypedStorageItem } from './local-storage.util';

interface MockLocalStorageSchema {
  testKey: unknown;
}

describe('local-storage', () => {
  const key: keyof MockLocalStorageSchema = 'testKey';

  beforeEach(() => {
    localStorage.clear();
  });

  it('should set and get a string', () => {
    const value = 'test string';
    setTypedStorageItem<MockLocalStorageSchema>(key, value);
    const result = getTypedStorageItem<MockLocalStorageSchema>(key);
    expect(result).toBe(value);
  });

  it('should set and get a number', () => {
    const value = 0;
    setTypedStorageItem<MockLocalStorageSchema>(key, value);
    const result = getTypedStorageItem<MockLocalStorageSchema>(key);
    expect(result).toBe(value);
  });

  it('should set and get a boolean', () => {
    const value = true;
    setTypedStorageItem<MockLocalStorageSchema>(key, value);
    const result = getTypedStorageItem<MockLocalStorageSchema>(key);
    expect(result).toBe(value);
  });

  it('should set and get an object', () => {
    const value = { a: 1, b: 'string' };
    setTypedStorageItem<MockLocalStorageSchema>(key, value);
    const result = getTypedStorageItem<MockLocalStorageSchema>(key);
    expect(result).toEqual(value);
  });

  it('should set and get an array', () => {
    const value = [1, 'string', true];
    setTypedStorageItem<MockLocalStorageSchema>(key, value);
    const result = getTypedStorageItem<MockLocalStorageSchema>(key);
    expect(result).toEqual(value);
  });

  it('should set and get a nested object', () => {
    const value = { a: { b: { c: 'nested' } } };
    setTypedStorageItem<MockLocalStorageSchema>(key, value);
    const result = getTypedStorageItem<MockLocalStorageSchema>(key);
    expect(result).toEqual(value);
  });

  it('should set and get a Date', () => {
    const value = new Date();
    setTypedStorageItem<MockLocalStorageSchema>(key, value);
    const result = getTypedStorageItem<MockLocalStorageSchema>(key);
    expect(result).toEqual(value);
  });

  it('should set and get a regular expression', () => {
    const value = /test/gi;
    setTypedStorageItem<MockLocalStorageSchema>(key, value);
    const result = getTypedStorageItem<MockLocalStorageSchema>(key);
    expect(result).toEqual(value);
  });

  it('should handle "null"', () => {
    const value = 'null';
    setTypedStorageItem<MockLocalStorageSchema>(key, value);
    const result = getTypedStorageItem<MockLocalStorageSchema>(key);
    expect(result).toEqual(value);
  });

  it('should handle "undefined"', () => {
    const value = 'undefined';
    setTypedStorageItem<MockLocalStorageSchema>(key, value);
    const result = getTypedStorageItem<MockLocalStorageSchema>(key);
    expect(result).toEqual(value);
  });

  it('should handle null', () => {
    const value = null;
    setTypedStorageItem<MockLocalStorageSchema>(key, value);
    const result = getTypedStorageItem<MockLocalStorageSchema>(key);
    expect(result).toBeNull();
  });

  it('should handle undefined', () => {
    const value = undefined;
    setTypedStorageItem<MockLocalStorageSchema>(key, value);
    const result = getTypedStorageItem<MockLocalStorageSchema>(key);
    expect(result).toBeUndefined();
  });

  it('should handle unset value', () => {
    const result = getTypedStorageItem<MockLocalStorageSchema>(key);
    expect(result).toBeUndefined();
  });

  it('should handle unparsable JSON', () => {
    localStorage.setItem(key, '{invalidJson}');
    const result = getTypedStorageItem<MockLocalStorageSchema>(key);
    expect(result).toEqual('{invalidJson}');
  });
});
