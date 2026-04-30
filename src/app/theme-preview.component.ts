import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Component, ChangeDetectionStrategy } from '@angular/core';

/**
 * ThemePreviewComponent
 *
 * Displays Material 3 theme colors and demonstrates color usage
 * Useful for verifying theme configuration and color palette
 */
@Component({
  selector: 'app-theme-preview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCardModule, MatButtonModule],
  template: `
    <div class="theme-preview">
      <h3>Material 3 Theme Preview</h3>

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
        <h4>Component Examples</h4>
        <div class="d-flex flex-wrap gap-2">
          <button mat-flat-button color="primary">Primary Flat</button>
          <button mat-flat-button color="accent">Secondary Flat</button>
          <button mat-flat-button color="tertiary">Tertiary Flat</button>
          <button mat-flat-button color="warn">Warn Flat</button>
        </div>
        <div class="d-flex flex-wrap gap-2 mt-2">
          <button mat-stroked-button color="primary">Primary Stroked</button>
          <button mat-button color="primary">Primary Basic</button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .theme-preview {
        h3,
        h4 {
          color: var(--md-sys-color-on-background);
        }
      }

      .color-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 1rem;
        margin: 1.5rem 0;
      }

      .color-card {
        text-align: center;
        padding: 0.75rem;
        background-color: var(--md-sys-color-surface-container-low);
        border: 1px solid var(--md-sys-color-outline-variant);

        p {
          margin: 0.5rem 0 0 0;
          font-weight: 500;
          color: var(--md-sys-color-on-surface);
          font-size: 0.9rem;
        }

        small {
          color: var(--md-sys-color-on-surface-variant);
          word-break: break-all;
          font-size: 0.75rem;
        }
      }

      .color-swatch {
        width: 100%;
        height: 60px;
        border-radius: 8px;
        margin-bottom: 0.5rem;
      }

      .component-examples {
        margin-top: 2rem;
      }
    `,
  ],
})
export class ThemePreviewComponent {}
