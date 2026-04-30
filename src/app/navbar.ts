import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ThemeSwitcherComponent } from './theme-switcher.component';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, MatIconModule, MatButtonModule, ThemeSwitcherComponent],
  template: `
    <nav class="navbar navbar-expand-lg fixed-top custom-navbar">
      <div class="container-fluid">
        <a class="navbar-brand d-flex align-items-center" href="#">
          <mat-icon class="me-2">auto_awesome</mat-icon>
          ProjectNg21
        </a>
        
        <div class="d-flex align-items-center gap-2">
          <app-theme-switcher />
          <button class="navbar-toggler d-lg-none" type="button" (click)="toggleOffcanvas()" aria-label="Toggle navigation">
            <mat-icon>menu</mat-icon>
          </button>
        </div>
        
        <div class="offcanvas offcanvas-end" [class.show]="isOffcanvasOpen()" [style.visibility]="isOffcanvasOpen() ? 'visible' : 'hidden'" tabindex="-1" id="offcanvasNavbar">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
            <button type="button" class="btn-close" (click)="toggleOffcanvas()" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#" (click)="closeOffcanvas()">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" (click)="closeOffcanvas()">Features</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" (click)="closeOffcanvas()">Pricing</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" (click)="closeOffcanvas()">About</a>
              </li>
            </ul>
          </div>
        </div>
        
        @if (isOffcanvasOpen()) {
          <div class="offcanvas-backdrop fade show d-lg-none" (click)="toggleOffcanvas()"></div>
        }
      </div>
    </nav>
  `,
  styles: `
    .custom-navbar {
      background-color: var(--md-sys-color-surface-container);
      color: var(--md-sys-color-on-surface);
      border-bottom: 1px solid var(--md-sys-color-outline-variant);
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      transition: background-color 0.3s ease;

      .navbar-brand {
        color: var(--md-sys-color-primary);
        font-weight: 700;
        font-size: 1.25rem;
        text-decoration: none;
        
        mat-icon {
          color: var(--md-sys-color-primary);
        }
      }

      .navbar-toggler {
        border: none;
        color: var(--md-sys-color-on-surface);
        padding: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        
        &:focus {
          box-shadow: 0 0 0 0.25rem var(--md-sys-color-primary-container);
        }
      }

      .nav-link {
        color: var(--md-sys-color-on-surface-variant);
        font-weight: 500;
        transition: all 0.2s ease-in-out;
        padding: 0.5rem 1rem;
        
        &:hover {
          color: var(--md-sys-color-primary);
        }

        &.active {
          color: var(--md-sys-color-primary);
          border-bottom: 2px solid var(--md-sys-color-primary);
        }
      }
    }

    .offcanvas {
      background-color: var(--md-sys-color-surface);
      color: var(--md-sys-color-on-surface);
      border-left: 1px solid var(--md-sys-color-outline-variant);
      transition: transform 0.3s ease-in-out, visibility 0.3s ease-in-out;

      .offcanvas-header {
        border-bottom: 1px solid var(--md-sys-color-outline-variant);
        
        .offcanvas-title {
          color: var(--md-sys-color-primary);
          font-weight: 600;
        }
      }

      &.show {
        transform: none;
      }
    }

    .offcanvas-backdrop {
      background-color: var(--md-sys-color-scrim);
      opacity: 0.5;
    }

    @media (max-width: 991.98px) {
      .nav-link {
        margin-bottom: 0.5rem;
        
        &.active {
          border-bottom: none;
          background-color: var(--md-sys-color-primary-container);
          color: var(--md-sys-color-on-primary-container);
          border-radius: 8px;
        }
      }
    }
  `,
})
export class NavbarComponent {
  isOffcanvasOpen = signal(false);

  toggleOffcanvas() {
    this.isOffcanvasOpen.update((v) => !v);
  }

  closeOffcanvas() {
    this.isOffcanvasOpen.set(false);
  }
}
