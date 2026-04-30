import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { App } from './app';
import { GEMINI_API_KEY } from './gemini.service';

describe('App', () => {
  beforeEach(async () => {
    // Mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
      value: vi.fn((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
      configurable: true,
    });

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [{ provide: GEMINI_API_KEY, useValue: 'test-key' }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Material 3 Theming');
  });
});
