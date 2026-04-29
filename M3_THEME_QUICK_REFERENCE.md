# Material Design 3 Theme - Quick Reference

## Files Overview

| File                                  | Purpose                                          |
| ------------------------------------- | ------------------------------------------------ |
| `src/_m3-theme.scss`                  | Theme definitions, color palettes, theme objects |
| `src/theme.scss`                      | Applies themes to DOM (imports `_m3-theme.scss`) |
| `src/app/theme.service.ts`            | Service for programmatic theme switching         |
| `src/app/theme-switcher.component.ts` | UI component + theme preview component           |
| `M3_THEME_GUIDE.md`                   | Comprehensive theme documentation                |

---

## Quick Start

### 1. Import ThemeService

```typescript
import { ThemeService } from './app/theme.service';

export class MyComponent {
  themeService = inject(ThemeService);
  currentTheme = this.themeService.currentTheme;
}
```

### 2. Add Theme Switcher UI

```html
<app-theme-switcher />
```

### 3. Use in Template

```html
Current theme: {{ currentTheme() }}
<button (click)="themeService.toggleTheme()">Toggle Theme</button>
```

---

## Theme Switching

### TypeScript

```typescript
// Set specific theme
themeService.setTheme('dark');
themeService.setTheme('light');
themeService.setTheme('high-contrast-light');
themeService.setTheme('high-contrast-dark');

// Toggle light/dark
themeService.toggleTheme();

// Get current theme
const current = themeService.currentTheme();
```

### DOM (Manual)

```typescript
// Set theme
document.documentElement.setAttribute('data-theme', 'dark');

// Remove theme (light mode)
document.documentElement.removeAttribute('data-theme');
```

---

## CSS Color Variables

### Apply Theme Colors

```scss
.component {
  background: var(--md-sys-color-surface);
  color: var(--md-sys-color-on-surface);
  border: 1px solid var(--md-sys-color-outline);
}
```

### Common Variables

| Variable                    | Light Value | Usage                    |
| --------------------------- | ----------- | ------------------------ |
| `--md-sys-color-primary`    | `#7e3cbf`   | Primary actions, buttons |
| `--md-sys-color-secondary`  | `#625b71`   | Secondary actions        |
| `--md-sys-color-tertiary`   | `#7141bf`   | Accents, highlights      |
| `--md-sys-color-error`      | `#b3261e`   | Errors, warnings         |
| `--md-sys-color-surface`    | `#fffbfe`   | Component backgrounds    |
| `--md-sys-color-on-surface` | `#1c1a20`   | Text on surfaces         |
| `--md-sys-color-outline`    | `#79747e`   | Borders, dividers        |

---

## Material Components

All Material components automatically use the theme:

```typescript
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  imports: [MatButtonModule, MatCardModule],
  template: `
    <mat-card>
      <button mat-raised-button color="primary">Primary</button>
      <button mat-raised-button color="accent">Accent</button>
    </mat-card>
  `,
})
export class ThemedComponents {}
```

---

## Customize Colors

Edit `src/_m3-theme.scss`:

```scss
// Change primary color palette
$primary-palette: (
  0: #000000,
  20: #3d0a7a,
  // Dark tone
  40: #7e3cbf,
  // Main primary (buttons)
  60: #bd54e0,
  // Light tone
  80: #ea86d4,
  100: #ffffff, // ... other tones
);

// Update theme object
$light-theme: mat.define-theme(
  (
    color: (
      theme-type: light,
      primary: $primary-palette,
      // Updated
       // ... other palettes
    ),
  )
);
```

---

## Accessibility

### High Contrast Themes

Automatically enable higher contrast colors for better readability:

```typescript
// Manual activation
themeService.setTheme('high-contrast-light');
themeService.setTheme('high-contrast-dark');
```

### System Preference

Automatically respects system settings:

- `prefers-color-scheme: dark` → Dark theme
- `prefers-contrast: more` → High contrast theme

---

## Common Tasks

### Switch Theme on Button Click

```typescript
@Component({
  template: ` <button (click)="toggleTheme()">Toggle Theme</button> `,
})
export class AppComponent {
  themeService = inject(ThemeService);

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
```

### Show Current Theme Name

```html
<p>Current theme: {{ currentTheme() }}</p>
```

### Apply Component-Specific Styling

```scss
.feature-card {
  background-color: var(--md-sys-color-surface);
  border-radius: 12px;
  border: 1px solid var(--md-sys-color-outline-variant);
  padding: 1rem;

  &:hover {
    background-color: var(--md-sys-color-surface-dim);
  }
}
```

### Persist User's Theme Choice

Automatically saved! `ThemeService` persists to `localStorage`:

```typescript
// Users' theme choice is automatically saved
themeService.setTheme('dark');
// On next visit, user's theme is restored
```

---

## Theme Preview

Use the preview component to see all colors:

```typescript
import { ThemePreviewComponent } from './app/theme-switcher.component';

@Component({
  template: `<app-theme-preview />`,
  imports: [ThemePreviewComponent],
})
export class PreviewPage {}
```

---

## Resources

- **Full Guide**: See `M3_THEME_GUIDE.md`
- **Material Design 3**: https://m3.material.io/
- **Angular Material**: https://material.angular.io/guide/theming
- **Service Tests**: `src/app/theme.service.spec.ts`

---

## Theme Modes

| Mode         | Selector                             | When Used           | Best For                     |
| ------------ | ------------------------------------ | ------------------- | ---------------------------- |
| **Light**    | No attribute                         | Default             | Daytime, bright environments |
| **Dark**     | `[data-theme="dark"]`                | Dark mode users     | Night, low-light             |
| **HC Light** | `[data-theme="high-contrast-light"]` | High contrast needs | Vision impairments           |
| **HC Dark**  | `[data-theme="high-contrast-dark"]`  | HC + dark           | Dark + high contrast         |
