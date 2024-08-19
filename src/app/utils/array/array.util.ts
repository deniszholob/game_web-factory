export function safeArrayIndex<T>(arr: T[], i: number): T {
  const arrSize: number = arr.length;
  // Not checking for arr.at(i) for undefined, since actual array values could be set to undefined
  if (arrSize > i && i >= -arrSize) {
    return arr.at(i) as T;
  }
  throw new Error(
    `Array index ${i} is out of bounds in array of size ${arrSize}`,
  );
}

/** @ref https://stackoverflow.com/a/3895478#10050831 */
export function range(
  size: number,
  startAt: number = 0,
): ReadonlyArray<number> {
  return [...Array(size).keys()].map((i: number): number => i + startAt);
}
