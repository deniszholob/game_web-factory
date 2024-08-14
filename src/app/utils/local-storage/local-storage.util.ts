// LocalStorage utilities
// @ref: https://medium.com/@gcascio/how-to-add-types-to-your-local-storage-9e47ca0087af

export interface LocalStorageSchema {
  isDarkMode: boolean;
}

export function setTypedStorageItem<
  S extends object = LocalStorageSchema,
  K extends keyof S = keyof S,
>(key: K, value: S[K]): void {
  if (value === undefined) {
    localStorage.removeItem(String(key));
  } else {
    const item: string =
      value instanceof Date
        ? value.toISOString()
        : value instanceof RegExp
          ? value.toString()
          : JSON.stringify(value);
    localStorage.setItem(String(key), item);
  }
}

export function getTypedStorageItem<
  S extends object = LocalStorageSchema,
  K extends keyof S = keyof S,
>(key: K): S[K] | null {
  if (!Object.prototype.hasOwnProperty.call(localStorage, key as string))
    return undefined as S[K];
  const item: string | null = localStorage.getItem(String(key));
  if (item === null) return null;

  try {
    if (item.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)) {
      return new Date(item) as S[K];
    }
    if (item.startsWith('/') && item.lastIndexOf('/') > 0) {
      const body: string = item.slice(1, item.lastIndexOf('/'));
      const flags: string = item.slice(item.lastIndexOf('/') + 1);
      return new RegExp(body, flags) as S[K];
    }
    return JSON.parse(item) as S[K];
  } catch {
    return item as unknown as S[K];
  }
}
