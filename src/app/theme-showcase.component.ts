import { Component, signal, effect, inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-theme-showcase',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    FormsModule,
  ],
  template: `
    <mat-toolbar color="primary">
      <span>M3 Theme Showcase</span>
      <span class="spacer"></span>
      <mat-slide-toggle [ngModel]="isDarkMode()" (ngModelChange)="toggleDarkMode()">
        <mat-icon>{{ isDarkMode() ? 'dark_mode' : 'light_mode' }}</mat-icon>
      </mat-slide-toggle>
    </mat-toolbar>

    <div class="container mt-4">
      <mat-card class="mb-4">
        <mat-card-header>
          <mat-card-title>Color Palettes</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="d-flex gap-2 flex-wrap mt-2">
            <button mat-flat-button color="primary">Primary</button>
            <button mat-flat-button color="accent">Accent (Secondary)</button>
            <button mat-flat-button color="warn">Warn</button>
          </div>
        </mat-card-content>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-card-title>Form Components</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form class="mt-2">
            <mat-form-field appearance="outline" class="w-100">
              <mat-label>Outlined Input</mat-label>
              <input matInput placeholder="Enter text" />
              <mat-icon matSuffix>edit</mat-icon>
            </mat-form-field>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .spacer {
        flex: 1 1 auto;
      }
      .container {
        padding: 20px;
        max-width: 800px;
        margin: 0 auto;
      }
      .mb-4 {
        margin-bottom: 1.5rem;
      }
      .mt-4 {
        margin-top: 1.5rem;
      }
      .mt-2 {
        margin-top: 0.5rem;
      }
      .d-flex {
        display: flex;
      }
      .gap-2 {
        gap: 0.5rem;
      }
      .flex-wrap {
        flex-wrap: wrap;
      }
      .w-100 {
        width: 100%;
      }
    `,
  ],
})
export class ThemeShowcaseComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly renderer = inject(Renderer2);

  isDarkMode = signal(false);

  constructor() {
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        if (this.isDarkMode()) {
          this.renderer.addClass(document.body, 'dark-theme');
        } else {
          this.renderer.removeClass(document.body, 'dark-theme');
        }
      }
    });
  }

  toggleDarkMode() {
    this.isDarkMode.update((v) => !v);
  }
}
