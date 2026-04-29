# Project Instructions: ProjectNg21

Team-shared guidelines, conventions, and architectural patterns for the ProjectNg21 codebase.

---

## 1. Project Overview

| Aspect               | Details                                                                   |
| -------------------- | ------------------------------------------------------------------------- |
| **Framework**        | Angular v21.2.0                                                           |
| **Build Tool**       | Angular CLI / @angular/build                                              |
| **Testing**          | Vitest                                                                    |
| **Styling**          | SCSS, Vanilla CSS preferred                                               |
| **State Management** | Angular Signals (v21+ features: `linkedSignal`, `resource`, Signal Forms) |

---

## 2. Architectural Principles

### Components

- Use **standalone components** exclusively
- Follow modern Angular patterns: Signals for state, `inject()` for dependency injection

### State Management

- **Signals** for local component state and simple async data
- **RxJS** for complex event streams only
- Use `computed()` for derived state
- Use `update()` or `set()` instead of `mutate()` on signals
- Keep state transformations pure and predictable

### Reactivity

- Prioritize Signals over RxJS where appropriate
- Use the async pipe to handle observables in templates

### Dependency Injection

- **Prefer `inject()` function** over constructor parameter injection for better readability and type inference

```typescript
private geminiService = inject(GeminiService);
```

---

## 3. Code Style & Naming Conventions

### File Naming

- **Standard files:** Use hyphens to separate words (e.g., `user-profile.component.ts`)
- **Test files:** End with `.spec.ts` (e.g., `user-profile.spec.ts`)
- **Component files:** Match the class name. For a component `UserProfile`: `user-profile.component.ts`, `user-profile.component.html`, `user-profile.component.scss`
- **Exception:** Root component uses `app.ts` (not `app.component.ts`)

### Project Structure

- All UI code: `src/`
- Bootstrap file: `src/main.ts`
- Group related files (component, template, styles, spec) in the same directory
- Organize by **feature areas**, not by type (avoid `components/` or `services/` folders)
- One concept per file (component, directive, or service)
- Small, closely related classes may coexist in one file

---

## 4. TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

---

## 5. Angular Best Practices

### General

- Always use standalone components (NgModules are not used)
- Do NOT set `standalone: true` in decorators—it's the default in Angular v20+
- Implement lazy loading for feature routes
- Use `NgOptimizedImage` for all static images (note: doesn't work with inline base64)

### Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms over Template-driven forms
- Do NOT use `ngClass`; use `class` bindings instead
- Do NOT use `ngStyle`; use `style` bindings instead
- When using external templates/styles, use paths relative to the component TS file
- Do NOT use `@HostBinding` or `@HostListener` decorators; use the `host` object in `@Component` or `@Directive` instead

### Services

- Design services around a single responsibility
- Use `providedIn: 'root'` for singleton services
- Use `inject()` function instead of constructor injection

### Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like `new Date()` are available

---

## 6. Accessibility Requirements

**MANDATORY:** All code must:

- Pass all AXE checks
- Follow WCAG AA minimums, including:
  - Focus management
  - Color contrast ratios
  - Proper ARIA attributes

---

## 7. Material Design 3 Theming

### Architecture

The project uses Angular Material v21.2 with the modern `@use` syntax for SCSS. Theming is organized as follows:

| File                 | Purpose                                                        |
| -------------------- | -------------------------------------------------------------- |
| `src/_m3-theme.scss` | Theme definitions with color palettes and theme configurations |
| `src/theme.scss`     | Theme application (imports and applies themes to the DOM)      |
| `src/styles.scss`    | Global styles (imports theme.scss)                             |

### Color System

Material 3 uses a modern color system with the following palettes:

- **Primary**: Main brand color for key actions and interactive elements
- **Secondary**: Supporting color for secondary actions
- **Tertiary**: Accent color for highlights and differentiation
- **Neutral**: Backgrounds and surfaces
- **Neutral Variant**: Alternative neutrals and outlines
- **Error**: Indicates errors and critical states

Each palette contains tones 0-100, following Material Design 3 specifications.

### Theme Modes

The theme supports three modes:

#### 1. Light Theme (Default)

- Applied automatically at `:root` level
- Respects `prefers-color-scheme: light` media query
- Activatable via `[data-theme="light"]` attribute

#### 2. Dark Theme

- Applied with `[data-theme="dark"]` attribute or `.dark-theme` class
- Respects `prefers-color-scheme: dark` media query
- Automatically activated when system prefers dark mode

#### 3. High Contrast Themes

- Available for accessibility: `[data-theme="high-contrast-light"]` and `[data-theme="high-contrast-dark"]`
- Respects `prefers-contrast: more` media query
- Enhanced color contrast for WCAG AAA compliance

### Customization

To customize the theme, edit `src/_m3-theme.scss`:

1. Modify color palettes (lines ~20-90):

```scss
$primary-palette: (
  40: #7e3cbf,
  // Primary tone
  60: #bd54e0,
  // Primary container
   // ... other tones
);
```

2. Update the theme objects in `mat.define-theme()` calls (lines ~100+)

3. Adjust CSS custom properties in `@mixin` declarations for runtime customization

### CSS Custom Properties

Light theme tokens are exposed as CSS variables (e.g., `--md-sys-color-primary`, `--md-sys-color-surface`) for use in custom styling:

```scss
.custom-element {
  background-color: var(--md-sys-color-surface);
  color: var(--md-sys-color-on-surface);
}
```

### Runtime Theme Switching

To switch themes dynamically from TypeScript:

```typescript
// Light theme
document.documentElement.removeAttribute('data-theme');

// Dark theme
document.documentElement.setAttribute('data-theme', 'dark');

// High contrast light
document.documentElement.setAttribute('data-theme', 'high-contrast-light');

// High contrast dark
document.documentElement.setAttribute('data-theme', 'high-contrast-dark');
```

---

## 8. Development Workflow

### Testing

- Use Vitest for unit tests
- Run `npm test` to verify changes

### Linting & Formatting

- Prettier is used for code formatting
- Follow the official Angular Style Guide (v21+ adapted)
