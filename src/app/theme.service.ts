import { Injectable, effect, inject, signal } from '@angular/core';

/**
 * Theme type definition
 */
export type ThemeType = 'light' | 'dark' | 'high-contrast-light' | 'high-contrast-dark';

/**
 * ThemeService manages Material 3 theme switching and persistence
 *
 * Features:
 * - Synchronize theme state with DOM data-theme attribute
 * - Persist theme preference to localStorage
 * - Support system preference detection (prefers-color-scheme)
 * - Provide observable theme state changes
 *
 * Usage:
 * ```typescript
 * constructor(private themeService: ThemeService) {
 *   this.currentTheme = this.themeService.currentTheme;
 *   this.themeService.setTheme('dark');
 * }
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  /**
   * Current theme signal
   */
  private readonly _currentTheme = signal<ThemeType>('light');
  readonly currentTheme = this._currentTheme.asReadonly();

  private readonly STORAGE_KEY = 'app-theme';
  private readonly SYSTEM_THEME_QUERY = '(prefers-color-scheme: dark)';

  constructor() {
    this.initializeTheme();
    this.syncThemeWithDOM();
  }

  /**
   * Initialize theme from storage or system preference
   */
  private initializeTheme(): void {
    const storedTheme = this.getStoredTheme();

    if (storedTheme) {
      this._currentTheme.set(storedTheme);
    } else if (this.isSystemDarkMode()) {
      this._currentTheme.set('dark');
    } else {
      this._currentTheme.set('light');
    }
  }

  /**
   * Set up effect to sync theme state with DOM
   */
  private syncThemeWithDOM(): void {
    effect(() => {
      const theme = this.currentTheme();
      this.applyThemeToDOM(theme);
      this.storeTheme(theme);
    });
  }

  /**
   * Set the active theme
   */
  setTheme(theme: ThemeType): void {
    this._currentTheme.set(theme);
  }

  /**
   * Toggle between light and dark themes
   */
  toggleTheme(): void {
    const current = this.currentTheme();
    const newTheme = current === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  /**
   * Check if dark mode is preferred by system
   */
  isSystemDarkMode(): boolean {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(this.SYSTEM_THEME_QUERY).matches;
  }

  /**
   * Apply theme to DOM
   */
  private applyThemeToDOM(theme: ThemeType): void {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    if (theme === 'light') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', theme);
    }
  }

  /**
   * Store theme preference in localStorage
   */
  private storeTheme(theme: ThemeType): void {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(this.STORAGE_KEY, theme);
  }

  /**
   * Retrieve theme preference from localStorage
   */
  private getStoredTheme(): ThemeType | null {
    if (typeof localStorage === 'undefined') return null;
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return (stored as ThemeType) || null;
  }
}
