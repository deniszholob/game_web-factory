import { Injectable } from '@angular/core';

import {
  getTypedStorageItem,
  LocalStorageSchema,
  setTypedStorageItem,
} from '../local-storage/local-storage.util';

const LOCAL_STORAGE_KEY: keyof LocalStorageSchema = 'isDarkMode';
const TAILWIND_DARK_THEME_CLASS = 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeToggleService {
  private _isDarkMode: boolean = false;

  public get isDarkMode(): boolean {
    return this._isDarkMode;
  }

  constructor() {
    this.setTheme();
  }

  public toggleTheme(): void {
    const savedMode: boolean | null = this.getIsDarkMode();
    if (savedMode == null) this.setTheme();

    this._isDarkMode = !this._isDarkMode;
    document.documentElement.classList.toggle(
      TAILWIND_DARK_THEME_CLASS,
      this._isDarkMode,
    );
    this.setIsDarkMode();
  }

  private setTheme(): void {
    const savedMode: boolean | null = this.getIsDarkMode();
    switch (savedMode) {
      case true: {
        this._isDarkMode = true;
        document.documentElement.classList.add(TAILWIND_DARK_THEME_CLASS);
        break;
      }
      case false: {
        this._isDarkMode = false;
        document.documentElement.classList.remove(TAILWIND_DARK_THEME_CLASS);
        break;
      }
      default: {
        this._isDarkMode = window.matchMedia(
          '(prefers-color-scheme: dark)',
        ).matches;
        this._isDarkMode
          ? document.documentElement.classList.add(TAILWIND_DARK_THEME_CLASS)
          : document.documentElement.classList.remove(
              TAILWIND_DARK_THEME_CLASS,
            );
      }
    }
  }

  private getIsDarkMode(): boolean | null {
    return getTypedStorageItem(LOCAL_STORAGE_KEY);
  }

  private setIsDarkMode(): void {
    setTypedStorageItem(LOCAL_STORAGE_KEY, this._isDarkMode);
  }
}
