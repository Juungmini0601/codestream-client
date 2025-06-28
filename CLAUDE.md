# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Development server:**
```bash
pnpm dev
```

**Build for production:**
```bash
pnpm build
```

**Preview production build:**
```bash
pnpm preview
```

**Type checking:**
```bash
vue-tsc -b
```

## Project Architecture

This is a Vue 3 + TypeScript + Vite client application with the following tech stack:

- **Framework**: Vue 3 with Composition API using `<script setup>` syntax
- **Routing**: Vue Router 4 with hash-based navigation
- **State Management**: Pinia for global state
- **Build tool**: Vite with path aliases configured (`@` → `src/`)
- **Type checking**: TypeScript with Vue TSC
- **Linting**: ESLint + Prettier + Biome for code formatting
- **Package manager**: pnpm

**Architecture patterns:**
- **Router**: Located in `src/routes/index.ts` with layout-based routing
- **Layouts**: Layout system using `src/routes/layouts/` with LayoutProvider pattern
- **Pages**: Route components in `src/routes/pages/`
- **Components**: Reusable components in `src/components/`

**Key files:**
- `src/main.ts` - Application entry point with router setup
- `src/App.vue` - Root component using RouterView
- `src/routes/index.ts` - Router configuration with layout metadata
- `src/routes/layouts/LayoutProvider.vue` - Layout switching logic
- `vite.config.ts` - Vite configuration with `@` path alias

**Path aliases:**
- `@/*` maps to `src/*` (configured in both Vite and TypeScript)

**TypeScript configuration:**
- Split into `tsconfig.app.json` (application) and `tsconfig.node.json` (build tools)
- Node.js types included for Vite configuration