# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LobeChat is an open-source, modern-design AI chat framework supporting multiple LLM providers (OpenAI, Claude, Gemini, etc.), speech synthesis, multi-modal interactions, and extensible plugin system. It supports deployment as web app, PWA, Electron desktop app, or Docker container.

## Architecture

### Monorepo Structure

- **Root**: Next.js 15 app with App Router, React 19, TypeScript
- **packages/**: Shared libraries (database, model-runtime, utils, types, etc.)
- **apps/desktop/**: Electron desktop application
- **Database**: Dual mode - PGLite (client-side) and PostgreSQL (server-side)

### Key Technologies

- Next.js 15 (App Router), React 19, TypeScript
- tRPC for type-safe APIs, Drizzle ORM, Zustand for state
- antd + @lobehub/ui components, antd-style for CSS-in-JS
- Vitest for testing, i18next for internationalization
- Multiple LLM runtimes via packages/model-runtime

## Development Commands

### Core Development

```bash
# Development servers
bun dev                    # Main app (port 3010)
bun dev:desktop           # Desktop app (port 3015)

# Building
bun build                 # Production web build
bun build:electron        # Electron build
bun build:docker          # Docker build

# Code quality
bun lint                  # Full lint (TS + style + typecheck + circular)
bun type-check           # TypeScript validation only
bun prettier             # Format all files
```

### Package Management

- Primary: `pnpm` for dependency management
- Scripts: `bun` to run npm scripts
- Tools: `bunx` to run executable packages

### Database Operations

```bash
bun db:generate          # Generate schema + client migrations
bun db:migrate           # Run server migrations
bun db:studio           # Open Drizzle Studio
```

### Testing

**CRITICAL**: Never run `bun test` - it runs 3000+ tests (~10min). Always filter:

```bash
# Correct testing patterns
bunx vitest run --silent='passed-only' '[file-pattern]'
bunx vitest run --silent='passed-only' -t "test name"

# Package-specific tests
cd packages/database && bunx vitest run --silent='passed-only' '[file-pattern]'

# Test environments
TEST_SERVER_DB=1 bunx vitest run  # Server DB tests (packages/database only)
```

## Code Architecture Patterns

### Service Layer Architecture

**Three-layer pattern**: UI → Services → Database

```
src/services/           # Client services (environment-adaptive)
├── {domain}/client.ts  # PGLite direct access
├── {domain}/server.ts  # tRPC remote calls
└── {domain}/types.ts   # Shared interfaces
```

### API Layer Organization

```
src/app/(backend)/
├── api/               # REST endpoints
├── trpc/              # tRPC routers by runtime
│   ├── edge/         # Edge Functions
│   ├── lambda/       # Node.js Lambda
│   ├── async/        # Long-running tasks
│   └── desktop/      # Electron-specific
└── webapi/           # LLM provider APIs
```

### Database Layer

```
packages/database/src/
├── schemas/          # Drizzle table definitions
├── models/           # Single-table CRUD operations
└── repositories/     # Complex queries/aggregations
```

### State Management

- **Zustand**: Global state with slices pattern
- **nuqs**: URL search params state
- **SWR**: Server state fetching

## Key Development Rules

### Code Language Convention

- **Existing Chinese comments**: Continue in Chinese for consistency
- **New files/no Chinese**: MUST use American English
- **Mixed scenarios**: Follow existing file's language

### TypeScript Guidelines

- Avoid explicit types when inference works
- Use `interface` for object shapes, `type` for unions
- Prefer `as const satisfies Interface` over plain `as const`
- Use directory imports with explicit `index` path: `@/db/index` not `@/db`

### Testing Strategy

**Test Environments**:
- **Client tests**: Happy DOM + PGLite (main vitest.config.mts)
- **Server tests**: Node + PostgreSQL (packages/database + TEST_SERVER_DB=1)

**Key Principles**:
- Test behavior, not implementation details
- Mock dependencies (I/O, network), keep realistic data
- Use `vi.resetModules()` to avoid module pollution
- Test error types/behavior, not specific error messages

### Component Development

- Use `@lobehub/ui` and `antd` components over raw HTML
- Use `antd-style` tokens instead of hardcoded colors
- Use `react-layout-kit` for flex layouts
- Import icons from `lucide-react`, `@ant-design/icons`, or `@lobehub/icons`

### Git Workflow

- Use rebase for `git pull`
- Commit messages with gitmoji prefixes
- Branch format: `username/feat/feature-name`
- Use `.github/PULL_REQUEST_TEMPLATE.md` for PRs

### Internationalization

- Add keys to `src/locales/default/namespace.ts`
- Only translate `locales/zh-CN/namespace.json` for preview
- Never run `pnpm i18n` - let CI handle automation

## Cursor Rules Integration

All rule files in `.cursor/rules/` provide detailed guidance:

**Core Development**:
- `backend-architecture.mdc` - Three-layer architecture, data flow patterns
- `react-component.mdc` - Component development with antd-style and Lobe UI
- `drizzle-schema-style-guide.mdc` - Database schema patterns
- `define-database-model.mdc` - Model and CRUD patterns

**State & UI**:
- `zustand-slice-organization.mdc` - Store structure and organization
- `zustand-action-patterns.mdc` - State update patterns

**Testing & Quality**:
- `testing-guide/testing-guide.mdc` - Comprehensive testing strategy and patterns
- `code-review.mdc` - Review standards and processes

**Desktop Development**:
- `desktop-feature-implementation.mdc` - Electron main/renderer patterns
- `desktop-window-management.mdc` - Window lifecycle management
- `desktop-controller-tests.mdc` - Testing Electron controllers

## Environment Modes

- `NEXT_PUBLIC_CLIENT_DB=pglite` - Client-side PGLite mode
- `NEXT_PUBLIC_IS_DESKTOP_APP=1` - Electron desktop mode
- `NEXT_PUBLIC_SERVICE_MODE=server` - Server-backed mode
- `TEST_SERVER_DB=1` - Server database testing (packages/database only)

## GitHub Actions & Deployment

### Common Workflow Issues & Solutions

**Authentication Failures**:
- Use `secrets.GITHUB_TOKEN` instead of custom `secrets.GH_TOKEN`
- Add workflow permissions: `contents: write`, `pull-requests: write`, `issues: write`
- Built-in token works for standard repository operations

**Dependency Version Conflicts**:
- Remove local `packages/*/node_modules` to force hoisting
- Run `pnpm install` from monorepo root for consistent versions
- Update test snapshots with `bunx vitest -u` after dependency upgrades

**Vercel Deployment CSS Errors**:
- Replace static CSS imports with dynamic `import()` in useEffect
- Add `@ts-ignore` for CSS modules without TypeScript declarations
- Prevents "Unexpected token '<', '<!DOCTYPE'" deployment errors

### Fork-Specific Configuration

For doublegate/lobe-chat fork:
- Docker registry: `ghcr.io/doublegate/lobe-chat`
- Git identity: doublegate instead of upstream bot accounts
- Repository references: `doublegate/lobe-chat` throughout workflows

## Quick Reference

- **Find files**: Use Claude's Glob tool for patterns, Grep for content
- **Run single test**: `bunx vitest run --silent='passed-only' 'filename.test.ts'`
- **Add UI component**: Check `@lobehub/ui` and `antd` first
- **Debug build**: Use `bun build:analyze` for bundle analysis
- **Database changes**: Always run `bun db:generate` after schema changes
- **Lint before commit**: `bun lint` runs all quality checks
- **Fix test failures**: Remove local node_modules, reinstall from root, update snapshots
- **Deploy to Vercel**: Use dynamic CSS imports for problematic modules
