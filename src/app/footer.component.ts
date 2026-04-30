import { Component, ChangeDetectionStrategy, inject, resource, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GeminiService } from './gemini.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  template: `
    <footer class="app-footer py-5">
      <div class="container">
        <div class="row gy-4">
          <div class="col-lg-4">
            <h5 class="footer-title">About ProjectNg21</h5>
            <p class="footer-copy">
              A polished Material 3 Angular showcase with theme switching, accessibility support,
              and responsive design.
            </p>
            <div class="d-flex gap-2 footer-social">
              <button mat-icon-button color="primary" aria-label="GitHub" type="button">
                <mat-icon>code</mat-icon>
              </button>
              <button mat-icon-button color="primary" aria-label="LinkedIn" type="button">
                <mat-icon>public</mat-icon>
              </button>
              <button mat-icon-button color="primary" aria-label="Twitter" type="button">
                <mat-icon>chat_bubble</mat-icon>
              </button>
            </div>
          </div>

          <div class="col-lg-3">
            <h5 class="footer-title">Quick Links</h5>
            <ul class="list-unstyled footer-links">
              <li><a class="text-reset" href="#">Home</a></li>
              <li><a class="text-reset" href="#">Features</a></li>
              <li><a class="text-reset" href="#">Pricing</a></li>
              <li><a class="text-reset" href="#">About</a></li>
            </ul>
          </div>

          <div class="col-lg-5">
            <h5 class="footer-title">Newsletter</h5>
            <p class="footer-copy">
              Get theme updates and design insights delivered to your inbox.
            </p>

            <div class="footer-newsletter">
              <mat-form-field appearance="outline" class="w-100 mb-3">
                <mat-label>Email address</mat-label>
                <input
                  matInput
                  type="email"
                  placeholder="you@example.com"
                  [value]="email()"
                  (input)="setEmail($event.target.value)"
                />
              </mat-form-field>

              <button
                mat-flat-button
                color="primary"
                class="w-100"
                type="button"
                (click)="subscribe()"
              >
                Subscribe
              </button>

              <p *ngIf="isSubscribed()" class="footer-subscribed mt-3 mb-0">
                Thanks! You will receive the latest theme tips shortly.
              </p>
            </div>
          </div>
        </div>

        <mat-divider class="my-4"></mat-divider>

        <div class="row align-items-center gy-2">
          <div class="col-md-6">
            <p class="mb-0 copyright-text">
              &copy; {{ currentYear() }} ProjectNg21. All rights reserved.
            </p>
          </div>
          <div class="col-md-6 text-md-end">
            <small class="footer-status">
              <strong>Smart Status:</strong>
              {{ smartStatus.value() || 'Loading AI status...' }}
            </small>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [
    `
      .app-footer {
        background-color: var(--md-sys-color-surface-container);
        color: var(--md-sys-color-on-surface);
      }

      .footer-title {
        color: var(--md-sys-color-on-surface);
        font-size: 1rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.08em;
      }

      .footer-copy,
      .footer-links a,
      .footer-status,
      .copyright-text {
        color: var(--md-sys-color-on-surface-variant);
      }

      .footer-links {
        padding: 0;
        margin: 0;
      }

      .footer-links li {
        margin-bottom: 0.75rem;
      }

      .footer-links a {
        color: inherit;
        text-decoration: none;
        transition: color 0.2s ease;
      }

      .footer-links a:hover {
        color: var(--md-sys-color-primary);
      }

      .footer-social button {
        background-color: rgba(126, 60, 191, 0.08);
        color: var(--md-sys-color-primary);
      }

      .footer-social button:hover {
        background-color: rgba(126, 60, 191, 0.16);
      }

      .footer-newsletter p {
        margin-bottom: 1rem;
      }

      .footer-subscribed {
        color: var(--md-sys-color-primary);
        font-weight: 500;
      }

      .copyright-text {
        margin-bottom: 0;
      }

      .footer-status {
        font-size: 0.9rem;
      }

      @media (max-width: 767.98px) {
        .footer-status {
          display: block;
        }
      }
    `,
  ],
})
export class FooterComponent {
  private readonly geminiService = inject(GeminiService);

  readonly currentYear = signal(new Date().getFullYear());
  readonly email = signal('');
  readonly isSubscribed = signal(false);

  readonly smartStatus = resource<string, undefined>({
    loader: async () => {
      try {
        return await this.geminiService.generateText(
          'Generate a concise friendly footer status message for an Angular 21 Material 3 theme showcase app.',
        );
      } catch {
        return 'AI status currently unavailable.';
      }
    },
  });

  setEmail(value: string): void {
    this.email.set(value);
  }

  subscribe(): void {
    if (!this.email().trim()) {
      return;
    }

    this.isSubscribed.set(true);
  }
}
