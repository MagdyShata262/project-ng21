# Project Instructions: ProjectNg21

This file contains team-shared instructions, conventions, and architectural patterns for the ProjectNg21 codebase.

## Project Overview
- **Framework:** Angular v21.2.0
- **Build Tool:** Angular CLI / @angular/build (Vitest for testing)
- **Styling:** SCSS, Vanilla CSS preferred.
- **State Management:** Angular Signals (v21+ features like `linkedSignal`, `resource`, and Signal Forms).

## Architectural Patterns
- **Components:** Use standalone components. Follow the modern Angular pattern (Signals for state, `inject()` for DI).
- **Naming Conventions:** Standard Angular naming (e.g., `feature-name.component.ts`), but note that this project uses `app.ts` for the root component.
- **Reactivity:** Prioritize Signals over RxJS where appropriate (e.g., component state, simple async data). Use RxJS for complex event streams.

## Workflow
- **Testing:** Use Vitest for unit tests. Run `ng test` to verify changes.
- **Linting/Formatting:** Prettier is used for formatting.
