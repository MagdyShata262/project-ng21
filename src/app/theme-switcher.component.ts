import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { ThemeService, ThemeType } from './theme.service';

/**
 * ThemeSwitcher Component
 *
 * Provides UI controls for switching between Material 3 themes
 * Demonstrates integration with ThemeService and Material components
 */
@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatMenuModule, MatTooltipModule, MatDividerModule],
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
})
export class ThemeSwitcherComponent {
  private themeService = inject(ThemeService);

  readonly currentTheme = this.themeService.currentTheme;

  selectTheme(theme: ThemeType): void {
    this.themeService.setTheme(theme);
  }
}
