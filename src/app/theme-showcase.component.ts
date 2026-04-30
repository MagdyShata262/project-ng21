import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { ThemeService } from './theme.service';
import { ThemePreviewComponent } from './theme-preview.component';

@Component({
  selector: 'app-theme-showcase',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    FormsModule,
    ThemePreviewComponent,
  ],
  template: `
    <main class="container py-4">
      <header class="mb-5 text-center">
        <h1 class="display-4 fw-bold">Material 3 Theming</h1>
        <p class="lead text-secondary">
          A modern Angular 21 application showcasing Material 3 design system with dynamic theme
          switching.
        </p>
      </header>

      <div class="row g-4">
        <!-- Color Palette Section -->
        <section class="col-md-6">
          <mat-card class="h-100 border-0 shadow-sm">
            <mat-card-header>
              <mat-icon mat-card-avatar color="primary">palette</mat-icon>
              <mat-card-title>Color Palettes</mat-card-title>
              <mat-card-subtitle>Semantic M3 Colors</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content class="pt-3">
              <p>Testing buttons with different theme colors:</p>
              <div class="d-flex flex-wrap gap-2">
                <button mat-flat-button color="primary">Primary</button>
                <button mat-flat-button color="accent">Secondary</button>
                <button mat-flat-button color="warn">Error/Warn</button>
                <button mat-stroked-button>Stroked</button>
                <button mat-button>Basic</button>
              </div>

              <div class="mt-4">
                <p>FABs and Icon Buttons:</p>
                <div class="d-flex flex-wrap gap-2 align-items-center">
                  <button mat-fab color="primary" aria-label="Add">
                    <mat-icon>add</mat-icon>
                  </button>
                  <button mat-mini-fab color="tertiary" aria-label="Favorite">
                    <mat-icon>favorite</mat-icon>
                  </button>
                  <button mat-icon-button color="primary" aria-label="Settings">
                    <mat-icon>settings</mat-icon>
                  </button>
                </div>
              </div>
            </mat-card-content>
          </mat-card>
        </section>

        <!-- Form Components Section -->
        <section class="col-md-6">
          <mat-card class="h-100 border-0 shadow-sm">
            <mat-card-header>
              <mat-icon mat-card-avatar color="primary">edit_note</mat-icon>
              <mat-card-title>Form Controls</mat-card-title>
              <mat-card-subtitle>M3 Input Styles</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content class="pt-3">
              <div class="d-flex flex-column gap-3">
                <mat-form-field appearance="outline">
                  <mat-label>Outlined Input</mat-label>
                  <input matInput placeholder="Enter something..." />
                  <mat-icon matSuffix>person</mat-icon>
                  <mat-hint>Example of an outlined field</mat-hint>
                </mat-form-field>

                <mat-form-field appearance="fill">
                  <mat-label>Filled Input</mat-label>
                  <input matInput placeholder="Filled style" />
                  <mat-icon matSuffix>mail</mat-icon>
                </mat-form-field>

                <div class="d-flex align-items-center gap-4">
                  <mat-slide-toggle [checked]="isDark()" (change)="toggleDark()">
                    Dark Mode
                  </mat-slide-toggle>
                </div>
              </div>
            </mat-card-content>
          </mat-card>
        </section>

        <!-- Theme Preview Section -->
        <section class="col-12">
          <mat-card class="border-0 shadow-sm">
            <mat-card-content class="pt-3">
              <app-theme-preview />
            </mat-card-content>
          </mat-card>
        </section>

        <!-- Dynamic Content Section -->
        <section class="col-12">
          <mat-card class="border-0 shadow-sm bg-body-tertiary">
            <mat-card-header>
              <mat-card-title>System Status</mat-card-title>
            </mat-card-header>
            <mat-card-content class="pt-3">
              <div class="alert alert-info d-flex align-items-center" role="alert">
                <mat-icon class="me-2">info</mat-icon>
                <div>
                  Current Theme: <strong>{{ themeService.currentTheme() }}</strong>
                </div>
              </div>
              <p>
                The theme is automatically synchronized with your system preferences and persisted
                to local storage.
              </p>
            </mat-card-content>
            <mat-card-actions align="end">
              <button mat-button (click)="themeService.setTheme('light')">Reset to Light</button>
              <button mat-flat-button color="primary" (click)="themeService.toggleTheme()">
                Toggle Mode
              </button>
            </mat-card-actions>
          </mat-card>
        </section>
      </div>
    </main>
  `,
  styles: [
    `
      .spacer {
        flex: 1 1 auto;
      }
      .mat-toolbar.sticky-top {
        z-index: 1020;
      }
    `,
  ],
})
export class ThemeShowcaseComponent {
  protected themeService = inject(ThemeService);

  isDark(): boolean {
    return this.themeService.currentTheme().includes('dark');
  }

  toggleDark(): void {
    this.themeService.toggleTheme();
  }
}
