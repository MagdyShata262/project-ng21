import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { ThemeService, ThemeType } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;
  let mockLocalStorage: Record<string, string>;
  let mockMatchMedia: any;

  beforeEach(() => {
    // Mock localStorage
    mockLocalStorage = {};
    const localStorageMock = {
      getItem: (key: string) => mockLocalStorage[key] || null,
      setItem: (key: string, value: string) => {
        mockLocalStorage[key] = value;
      },
      removeItem: (key: string) => {
        delete mockLocalStorage[key];
      },
      clear: () => {
        mockLocalStorage = {};
      },
    };

    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });

    // Mock matchMedia
    mockMatchMedia = vi.fn((query: string) => ({
      matches: false, // Default to light mode
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    Object.defineProperty(window, 'matchMedia', {
      value: mockMatchMedia,
      writable: true,
      configurable: true,
    });

    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
    TestBed.flushEffects();
  });

  afterEach(() => {
    mockLocalStorage = {};
    vi.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with light theme by default', () => {
    expect(service.currentTheme()).toBe('light');
  });

  it('should set theme correctly', () => {
    service.setTheme('dark');
    expect(service.currentTheme()).toBe('dark');

    service.setTheme('high-contrast-light');
    expect(service.currentTheme()).toBe('high-contrast-light');
  });

  it('should toggle between light and dark themes', () => {
    service.setTheme('light');
    service.toggleTheme();
    expect(service.currentTheme()).toBe('dark');

    service.toggleTheme();
    expect(service.currentTheme()).toBe('light');
  });

  it('should apply theme to DOM', () => {
    service.setTheme('dark');
    TestBed.flushEffects();
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');

    service.setTheme('light');
    TestBed.flushEffects();
    expect(document.documentElement.getAttribute('data-theme')).toBeNull();
  });

  it('should persist theme to localStorage', () => {
    service.setTheme('dark');
    TestBed.flushEffects();
    expect(mockLocalStorage['app-theme']).toBe('dark');

    service.setTheme('high-contrast-light');
    TestBed.flushEffects();
    expect(mockLocalStorage['app-theme']).toBe('high-contrast-light');
  });

  it('should detect system dark mode preference', () => {
    const isDark = service.isSystemDarkMode();
    expect(typeof isDark).toBe('boolean');
  });

  it('should handle all valid theme types', () => {
    const themes: ThemeType[] = ['light', 'dark', 'high-contrast-light', 'high-contrast-dark'];

    themes.forEach((theme) => {
      service.setTheme(theme);
      expect(service.currentTheme()).toBe(theme);
    });
  });
});
