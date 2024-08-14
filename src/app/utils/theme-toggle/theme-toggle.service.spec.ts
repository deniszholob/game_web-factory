import * as localStorageUtil from '../local-storage/local-storage.util';
import { ThemeToggleService } from './theme-toggle.service';

jest.mock('../local-storage/local-storage.util', () => ({
  getTypedStorageItem: jest.fn(),
  setTypedStorageItem: jest.fn(),
}));

describe('ThemeToggleService', () => {
  let service: ThemeToggleService;

  beforeEach(() => {
    jest.clearAllMocks();
    global.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query === '(prefers-color-scheme: dark)',
      addListener: jest.fn(),
      removeListener: jest.fn(),
    }));
    service = new ThemeToggleService();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should toggle theme correctly', () => {
    (localStorageUtil.getTypedStorageItem as jest.Mock).mockReturnValue(false);
    service = new ThemeToggleService();

    service.toggleTheme(); // Toggle to dark mode
    expect(service.isDarkMode).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    service.toggleTheme(); // Toggle back to light mode
    expect(service.isDarkMode).toBe(false);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('should set theme based on stored preference', () => {
    (localStorageUtil.getTypedStorageItem as jest.Mock).mockReturnValue(true);
    service = new ThemeToggleService();
    expect(service.isDarkMode).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('should set theme based on system preference if no saved preference', () => {
    (localStorageUtil.getTypedStorageItem as jest.Mock).mockReturnValue(null);

    global.matchMedia = jest.fn().mockReturnValue({ matches: false });
    service = new ThemeToggleService();

    expect(service.isDarkMode).toBe(false);
    expect(document.documentElement.classList.contains('dark')).toBe(false);

    service.toggleTheme(); // Now toggle to dark mode
    expect(service.isDarkMode).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('should save the dark mode preference to local storage', () => {
    (localStorageUtil.getTypedStorageItem as jest.Mock).mockReturnValue(false);
    service = new ThemeToggleService();

    const setTypedStorageItemSpy = jest.spyOn(
      localStorageUtil,
      'setTypedStorageItem',
    );

    service.toggleTheme(); // Switch to dark mode
    expect(setTypedStorageItemSpy).toHaveBeenCalledWith('isDarkMode', true);

    service.toggleTheme(); // Switch back to light mode
    expect(setTypedStorageItemSpy).toHaveBeenCalledWith('isDarkMode', false);
  });
});
