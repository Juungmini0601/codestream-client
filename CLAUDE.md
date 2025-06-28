# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Development server:**
```bash
pnpm dev
# or
npm run dev
```

**Build for production:**
```bash
pnpm build
# or 
npm run build
```

**Preview production build:**
```bash
pnpm preview
# or
npm run preview
```

**Type checking:**
```bash
vue-tsc -b
```

## Project Architecture

This is a Vue 3 + TypeScript + Vite client application with the following structure:

- **Framework**: Vue 3 with Composition API using `<script setup>` syntax
- **Build tool**: Vite for fast development and optimized builds
- **Type checking**: TypeScript with Vue TSC for component type checking
- **Linting**: ESLint with Prettier integration for code formatting
- **Package manager**: Uses pnpm (note the pnpm-lock.yaml file)

**Key files:**
- `src/main.ts` - Application entry point
- `src/App.vue` - Root Vue component
- `src/components/` - Vue components directory
- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration (references app and node configs)

**TypeScript configuration:**
- Split into `tsconfig.app.json` (application code) and `tsconfig.node.json` (build tools)
- Uses Vue 3 TypeScript setup with proper SFC support

This is a fresh Vue 3 template project, so the codebase follows standard Vue 3 + Vite conventions and patterns.