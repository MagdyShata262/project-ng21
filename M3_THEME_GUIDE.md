# Material Design 3 Theme Implementation Guide

## Overview

This project implements a complete Material Design 3 (M3) custom theme for Angular v21.2.0 using the modern `@use` SCSS syntax. The implementation includes:

- **Light & Dark themes** with automatic system preference detection
- **High-contrast themes** for accessibility (WCAG AAA)
- **CSS Custom Properties** for runtime customization
- **ThemeService** for programmatic theme switching
- **Theme switcher UI** component for user selection

---

## File Structure

```
src/
├── _m3-theme.scss           # Theme definitions and color palettes
├── theme.scss               # Theme application to DOM
├── styles.scss              # Global styles (imports theme.scss)
├── app/
│   ├── theme.service.ts     # Angular service for theme management
│   ├── theme.service.spec.ts  # Service tests
│   └── theme-switcher.component.ts  # UI components for theme switching
└── ...
```

---

## Color System

### Palettes

Material 3 uses a sophisticated color system with five main palettes:

| Palette             | Purpose                                | Tones |
| ------------------- | -------------------------------------- | ----- |
| **Primary**         | Main brand color for key actions       | 0-100 |
| **Secondary**       | Supporting color for secondary actions | 0-100 |
| **Tertiary**        | Accent color for highlights            | 0-100 |
| **Neutral**         | Backgrounds, surfaces                  | 0-100 |
| **Neutral Variant** | Alternative neutrals, outlines         | 0-100 |
| **Error**           | Error states and warnings              | 0-100 |

Each palette follows the Material Design 3 tone scale:

- Tone 0: Pure black
- Tone 100: Pure white
- Tone 40: Primary tone (used for main buttons)
- Tone 50: Primary container
- Tone 80: Primary on dark backgrounds
- Tone 90: Primary container on dark backgrounds

### Current Configuration

The default theme uses:

- **Primary**: Purple (`#7e3cbf` on light)
- **Secondary**: Taupe (`#625b71` on light)
- **Tertiary**: Purple variant (`#7141bf` on light)
- **Error**: Red (`#b3261e` on light)

---

## Theme Modes

### 1. Light Theme (Default)

Applied when:

- No `data-theme` attribute is set
- System prefers light mode (`prefers-color-scheme: light`)

Activation:

```typescript
document.documentElement.removeAttribute('data-theme');
// or use ThemeService
themeService.setTheme('light');
```

### 2. Dark Theme

Applied when:

- `[data-theme="dark"]` is set
- System prefers dark mode (`prefers-color-scheme: dark`)
- `.dark-theme` class is present

Activation:

```typescript
document.documentElement.setAttribute('data-theme', 'dark');
themeService.setTheme('dark');
```

### 3. High Contrast Light

For users with high contrast requirements (WCAG AAA):

- Enhanced color separation
- Increased color contrast ratios

Activation:

```typescript
document.documentElement.setAttribute('data-theme', 'high-contrast-light');
themeService.setTheme('high-contrast-light');
```

### 4. High Contrast Dark

High contrast theme with dark background:

Activation:

```typescript
document.documentElement.setAttribute('data-theme', 'high-contrast-dark');
themeService.setTheme('high-contrast-dark');
```

---

## Usage

### Automatic Theme Synchronization

The theme is applied automatically at app startup based on:

1. LocalStorage preference (if previously set by user)
2. System preference (`prefers-color-scheme` media query)
3. Default light theme

No additional setup required in `main.ts`.

### Programmatic Theme Switching

Use `ThemeService` to switch themes:

```typescript
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  template: `<app-theme-switcher />`,
  standalone: true,
  imports: [ThemeSwitcherComponent],
})
export class AppComponent {
  constructor(private themeService: ThemeService) {
    // Theme is automatically initialized
    // User preference is persisted to localStorage
  }

  switchToDark(): void {
    this.themeService.setTheme('dark');
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
```

### Using Theme Colors in Styles

#### SCSS with CSS Variables

```scss
.my-component {
  background-color: var(--md-sys-color-surface);
  color: var(--md-sys-color-on-surface);
  border-color: var(--md-sys-color-outline);
}
```

#### Available CSS Variables

**Colors:**

- `--md-sys-color-primary`
- `--md-sys-color-secondary`
- `--md-sys-color-tertiary`
- `--md-sys-color-error`
- `--md-sys-color-background`
- `--md-sys-color-surface`
- `--md-sys-color-surface-variant`
- `--md-sys-color-outline`
- `--md-sys-color-outline-variant`
- `--md-sys-color-shadow`
- `--md-sys-color-scrim`

**On-colors (text/foreground):**

- `--md-sys-color-on-primary`
- `--md-sys-color-on-secondary`
- `--md-sys-color-on-tertiary`
- `--md-sys-color-on-error`
- `--md-sys-color-on-background`
- `--md-sys-color-on-surface`
- `--md-sys-color-on-surface-variant`

**Container colors:**

- `--md-sys-color-primary-container`
- `--md-sys-color-secondary-container`
- `--md-sys-color-tertiary-container`
- `--md-sys-color-error-container`

### Using Material 3 Components

All Material components automatically use the theme:

```typescript
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-themed-component',
  template: `
    <mat-card>
      <button mat-raised-button color="primary">Themed Button</button>
    </mat-card>
  `,
  standalone: true,
  imports: [MatButtonModule, MatCardModule],
})
export class ThemedComponent {}
```

---

## Customization

### Change Primary Color

Edit `src/_m3-theme.scss`:

```scss
$primary-palette: (
  0: #000000,
  10: #1a0033,
  // Lighter tone
  20: #330066,
  // <-- Modify this
  40: #6600cc,
  // <-- And this for primary button
  60: #9933ff,
  80: #cc99ff,
  90: #e6ccff,
  100: #ffffff,
);
```

Then update the light and dark theme definitions to use the modified palette.

### Add a Custom Color Palette

Create a new palette in `_m3-theme.scss`:

```scss
$custom-palette: (
  0: #000000,
  10: #0d0d0d,
  20: #1a1a1a,
  // ... full tone scale 0-100
  100: #ffffff,
);
```

Then in the theme definition:

```scss
$light-theme: mat.define-theme(
  (
    color: (
      theme-type: light,
      primary: $primary-palette,
      // ... other palettes
    ),
  )
);
```

### Update Typography

Modify the typography configuration in `_m3-theme.scss`:

```scss
typography: (
  brand-family: '"Your Font", sans-serif',
  plain-family: '"Your Font", sans-serif',
  bold-family: '"Your Font", sans-serif',
  weight-bold: 700,
  weight-medium: 500,
  weight-regular: 400
);
```

---

## System Preference Integration

The theme automatically responds to system settings:

### Respects prefers-color-scheme

```css
@media (prefers-color-scheme: dark) {
  /* Dark theme applied automatically */
}
```

### Respects prefers-contrast

```css
@media (prefers-contrast: more) {
  /* High contrast theme applied automatically */
}
```

To test in browser DevTools:

1. Open Chrome/Edge DevTools → Rendering tab
2. Toggle "Emulate CSS media feature prefers-color-scheme"
3. Select "dark" or "light"

---

## Accessibility

### WCAG Compliance

- **Light theme**: WCAG AA compliant
- **High contrast themes**: WCAG AAA compliant (minimum 7:1 contrast ratio)

### Color Contrast

All text uses sufficient contrast ratios:

- Normal text: 4.5:1 minimum
- Large text: 3:1 minimum
- UI components: 3:1 minimum

### Focus Management

Material components include proper focus indicators. When implementing custom components:

```typescript
// Use Material's built-in focus management
@Component({
  host: {
    class: 'focus-visible',
  },
})
export class CustomButton {}
```

---

## Migration from Old Theme

If you're updating from a previous theme setup:

1. **Remove old theme files** (if any)
2. **Keep `src/theme.scss`** (it now imports `_m3-theme.scss`)
3. **Update `src/styles.scss`** to ensure it imports `theme.scss`
4. **Inject ThemeService** in components where theme switching is needed
5. **Replace custom color values** with CSS variables:

   ```scss
   /* Before */
   color: #625b71;

   /* After */
   color: var(--md-sys-color-secondary);
   ```

---

## Troubleshooting

### Theme Not Applying

**Problem**: Styles not applying on page load

**Solution**: Ensure `src/styles.scss` imports `theme.scss`:

```scss
@import 'theme.scss';
```

### High Contrast Theme Not Working

**Problem**: High contrast theme doesn't appear different

**Solution**: The browser may not be requesting high contrast. Manually set the data-attribute:

```typescript
document.documentElement.setAttribute('data-theme', 'high-contrast-light');
```

### Color Variables Undefined

**Problem**: CSS variable showing as invalid/undefined

**Solution**: Verify the variable name matches the declarations in `_m3-theme.scss`. Use:

```scss
// Correct
color: var(--md-sys-color-on-surface);

// Incorrect
color: var(--md-sys-on-surface);
```

### SSR Issues

**Problem**: Theme flashing on SSR page load

**Solution**: The theme is properly initialized by `ThemeService` which checks localStorage before rendering. Ensure ThemeService is injected early in your root component.

---

## References

- [Angular Material Theming Guide](https://material.angular.io/guide/theming)
- [Material Design 3 Color System](https://m3.material.io/styles/color/overview)
- [WCAG Color Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [MDN: prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)
- [MDN: prefers-contrast](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-contrast)

---

## Support

For issues or questions about the Material 3 theme:

1. Check the [troubleshooting section](#troubleshooting)
2. Review `_m3-theme.scss` comments for detailed configuration
3. Consult Angular Material documentation
4. Refer to Material Design 3 specifications
