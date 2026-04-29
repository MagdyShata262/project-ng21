import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { ThemeService, ThemeType } from './theme.service';

/**
 * ThemeSwitcher Component
 *
 * Provides UI controls for switching between Material 3 themes
 * Demonstrates integration with ThemeService and Material components
 *
 * Features:
 * - Theme selection menu
 * - Live theme switching
 * - Display current theme
 * - Accessibility-friendly controls
 *
 * Usage:
 * ```html
 * <app-theme-switcher />
 * ```
 */
@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatTooltipModule,
    MatDividerModule,
  ],
  template: `
    <div class="theme-switcher-container">
      <button
        mat-icon-button
        [matMenuTriggerFor]="themeMenu"
        [attr.aria-label]="'Switch theme, currently ' + currentTheme()"
        matTooltip="Theme Settings"
      >
        <mat-icon>palette</mat-icon>
      </button>

      <mat-menu #themeMenu="matMenu">
        <button
          mat-menu-item
          (click)="selectTheme('light')"
          [attr.aria-pressed]="currentTheme() === 'light'"
        >
          <mat-icon>light_mode</mat-icon>
          <span>Light</span>
        </button>

        <button
          mat-menu-item
          (click)="selectTheme('dark')"
          [attr.aria-pressed]="currentTheme() === 'dark'"
        >
          <mat-icon>dark_mode</mat-icon>
          <span>Dark</span>
        </button>

        <mat-divider></mat-divider>

        <button
          mat-menu-item
          (click)="selectTheme('high-contrast-light')"
          [attr.aria-pressed]="currentTheme() === 'high-contrast-light'"
        >
          <mat-icon>contrast</mat-icon>
          <span>High Contrast Light</span>
        </button>

        <button
          mat-menu-item
          (click)="selectTheme('high-contrast-dark')"
          [attr.aria-pressed]="currentTheme() === 'high-contrast-dark'"
        >
          <mat-icon>contrast</mat-icon>
          <span>High Contrast Dark</span>
        </button>
      </mat-menu>
    </div>
  `,
  styles: [
    `
      .theme-switcher-container {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
    `,
  ],
  host: {
    class: 'theme-switcher',
  },
})
export class ThemeSwitcherComponent {
  private themeService = inject(ThemeService);

  readonly currentTheme = this.themeService.currentTheme;

  selectTheme(theme: ThemeType): void {
    this.themeService.setTheme(theme);
  }
}

/**
 * ThemePreviewComponent
 *
 * Displays Material 3 theme colors and demonstrates color usage
 * Useful for verifying theme configuration and color palette
 */
@Component({
  selector: 'app-theme-preview',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  template: `
    <div class="theme-preview">
      <h2>Material 3 Theme Preview</h2>

      <div class="color-grid">
        <mat-card class="color-card">
          <div class="color-swatch" [style.background-color]="'var(--md-sys-color-primary)'"></div>
          <p>Primary</p>
          <small>var(--md-sys-color-primary)</small>
        </mat-card>

        <mat-card class="color-card">
          <div
            class="color-swatch"
            [style.background-color]="'var(--md-sys-color-secondary)'"
          ></div>
          <p>Secondary</p>
          <small>var(--md-sys-color-secondary)</small>
        </mat-card>

        <mat-card class="color-card">
          <div class="color-swatch" [style.background-color]="'var(--md-sys-color-tertiary)'"></div>
          <p>Tertiary</p>
          <small>var(--md-sys-color-tertiary)</small>
        </mat-card>

        <mat-card class="color-card">
          <div class="color-swatch" [style.background-color]="'var(--md-sys-color-error)'"></div>
          <p>Error</p>
          <small>var(--md-sys-color-error)</small>
        </mat-card>

        <mat-card class="color-card">
          <div class="color-swatch" [style.background-color]="'var(--md-sys-color-surface)'"></div>
          <p>Surface</p>
          <small>var(--md-sys-color-surface)</small>
        </mat-card>

        <mat-card class="color-card">
          <div class="color-swatch" [style.background-color]="'var(--md-sys-color-outline)'"></div>
          <p>Outline</p>
          <small>var(--md-sys-color-outline)</small>
        </mat-card>
      </div>

      <div class="component-examples">
        <h3>Component Examples</h3>

        <button mat-raised-button color="primary">Primary Button</button>
        <button mat-raised-button color="accent">Accent Button</button>
        <button mat-raised-button color="warn">Warn Button</button>
        <button mat-stroked-button>Stroked Button</button>
      </div>
    </div>
  `,
  styles: [
    `
      .theme-preview {
        padding: 2rem;

        h2 {
          margin-top: 0;
          color: var(--md-sys-color-on-background);
        }

        h3 {
          color: var(--md-sys-color-on-background);
          margin-top: 2rem;
        }
      }

      .color-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 1rem;
        margin: 1.5rem 0;
      }

      .color-card {
        text-align: center;
        padding: 1rem;
        background-color: var(--md-sys-color-surface);
        border: 1px solid var(--md-sys-color-outline-variant);

        p {
          margin: 0.5rem 0 0 0;
          font-weight: 500;
          color: var(--md-sys-color-on-surface);
        }

        small {
          color: var(--md-sys-color-on-surface-variant);
          word-break: break-all;
        }
      }

      .color-swatch {
        width: 100%;
        height: 100px;
        border-radius: 8px;
        margin-bottom: 0.5rem;
      }

      .component-examples {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        margin-top: 2rem;
      }
    `,
  ],
})
export class ThemePreviewComponent {}
