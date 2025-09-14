# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

# LobeChat Developer Guide

LobeChat is an open-source, modern AI chat framework built with Next.js 15, React 19, TypeScript, and a modular monorepo architecture. This guide helps developers quickly understand and contribute to the project across web, server, and desktop environments.

## 🚀 Quick Start

### Prerequisites
- **Node.js**: 18.18+ or 20.9+ (LTS recommended)
- **pnpm**: 9+ (primary package manager)
- **bun**: Optional but recommended for running scripts

### Initial Setup
```bash
# Clone and install dependencies
git clone https://github.com/lobehub/lobe-chat.git
cd lobe-chat
pnpm install

# Start development server
pnpm dev
```

The app will be available at `http://localhost:3010` by default.

## 📋 Command Reference

### Core Development Commands
```bash
# Development
pnpm dev               # Start dev server (web app on port 3010)
pnpm dev:desktop       # Start desktop dev (Electron on port 3015)
pnpm start             # Start production server (port 3210)

# Building
pnpm build             # Build for production
pnpm build:electron    # Build for Electron
pnpm build:docker      # Build with Docker optimizations

# Quality Gates
bun run type-check     # TypeScript type checking
pnpm lint              # ESLint + Stylelint + type checking
pnpm lint:ts           # TypeScript linting only
pnpm lint:style        # Stylelint only
pnpm prettier          # Format all files

# Testing
bunx vitest run --silent='passed-only' '[file-pattern]'  # Run specific tests
pnpm test-app          # Run all app tests (avoid - 3000+ tests)
pnpm test-app:coverage # Run with coverage report
```

### Database & Migrations (Drizzle ORM)
```bash
# Schema & Migrations
pnpm db:generate       # Generate migrations from schema changes
pnpm db:migrate        # Apply migrations (server environments)
pnpm db:studio         # Open Drizzle Studio for DB exploration
pnpm db:visualize      # Generate database documentation

# Development Database
pnpm db:generate-client # Compile client-side migrations (PGlite)
```

### Desktop Development (Electron)
```bash
# Electron-specific commands
pnpm desktop:build     # Full desktop build pipeline
pnpm desktop:build-local # Build for local distribution
```

### Package Management
```bash
# Monorepo operations
pnpm -r build          # Build all packages
pnpm -F @lobehub/ui build # Build specific package
pnpm reinstall         # Clean reinstall all dependencies
pnpm clean:node_modules # Remove all node_modules
```

## 🏗️ Architecture Overview

LobeChat uses a multi-runtime architecture supporting browser PWA, server deployment, and desktop applications:

### Layered Architecture
```
┌─────────────────┐
│   UI Layer      │ ← Next.js App Router, React 19 Server/Client Components
├─────────────────┤
│  State Layer    │ ← Zustand stores, client-side state management
├─────────────────┤
│   RPC Layer     │ ← tRPC for type-safe server communication
├─────────────────┤
│  Service Layer  │ ← Business logic, environment-adaptive services
├─────────────────┤
│   Data Layer    │ ← Drizzle ORM with PGlite/PostgreSQL adapters
└─────────────────┘
```

### Runtime Environments
1. **Browser/PWA**: Next.js + PGlite (WASM PostgreSQL)
2. **Server**: Next.js + PostgreSQL + tRPC endpoints  
3. **Desktop**: Electron + local Node.js + PGlite/PostgreSQL

### Data Flow: Chat Message Lifecycle
1. UI Component dispatches Zustand action
2. Action triggers tRPC mutation to server service
3. Service composes LLM request with context from Drizzle
4. Streamed response progressively renders in UI
5. Completed message persisted via Drizzle ORM
6. Side effects (tools, files) recorded and reflected in state

## 🔧 Environment Configuration

### Core Environment Variables
```bash
# LLM Providers (choose one or more)
OPENAI_API_KEY=sk-...          # OpenAI GPT models
ANTHROPIC_API_KEY=sk-ant-...   # Claude models
GOOGLE_API_KEY=AI...          # Gemini models

# Database (server environments)
DATABASE_URL=postgresql://...  # PostgreSQL connection string

# Application
NEXT_PUBLIC_CLIENT_DB=pglite   # Client DB mode: 'pglite' or undefined
ACCESS_CODE=your-access-code   # Optional access protection

# Features (optional)
ENABLED_OAUTH_SSO=1           # Enable OAuth providers
NEXT_PUBLIC_SERVICE_MODE=server # Service routing preference
```

### Deployment Configurations

| Environment | Database | Notes |
|------------|----------|--------|
| **Browser PWA** | PGlite (local) | No external DB required, offline-capable |
| **Server Hosted** | PostgreSQL | Requires DATABASE_URL, run migrations |
| **Electron Desktop** | PGlite or PostgreSQL | Depends on cloud sync settings |

### Security Notes
- Variables prefixed `NEXT_PUBLIC_` are exposed to browsers at build time
- Never use `NEXT_PUBLIC_` for secrets or API keys
- Use environment management tools like direnv for local development

## 🛠️ Development Practices

### State Management (Zustand)
- **Slice-based architecture**: Organize stores by domain (chat, user, agent)
- **Environment adaptation**: Services choose local (PGlite) or remote (tRPC) data access
- **Persistence**: Use Drizzle for durable data, Zustand for ephemeral UI state

### Type Safety (TypeScript + tRPC)
- **End-to-end types**: tRPC provides automatic type inference from server to client
- **Schema validation**: Use Zod for input/output validation in tRPC routes
- **Strict mode**: TypeScript strict mode enabled across all packages

### Component Architecture (React 19 + Next.js 15)
- **Server Components first**: Default to Server Components, use Client Components (`use client`) sparingly
- **Feature-based organization**: Major features in `src/features/`, reusable UI in `src/components/`
- **Co-located tests**: Test files alongside source files with `.test.ts/.tsx` suffix

### Code Style
- **Package manager**: Use `pnpm` for dependency management, `bun` for script execution
- **Imports**: Prefer explicit paths like `@/db/index` over directory imports
- **Async patterns**: Prefer `async/await`, use concurrent execution with `Promise.all` where safe
- **UI Components**: Use `@lobehub/ui` and antd components over raw HTML elements

## 🗄️ Database & Migrations

### Drizzle ORM Workflow
```bash
# 1. Modify schema in packages/database/src/schemas/
# 2. Generate migration
pnpm db:generate

# 3. Apply migration (server/desktop environments)
pnpm db:migrate

# 4. For client environments, compile for PGlite
pnpm db:generate-client
```

### Database Environments
- **PGlite (Browser)**: Migrations applied at runtime, no external dependencies
- **PostgreSQL (Server)**: Standard SQL migrations, requires DATABASE_URL
- **Hybrid (Desktop)**: Supports both depending on cloud sync configuration

### Best Practices
- Keep schema changes backward compatible for PWA auto-updates
- Never run server migrations in browser environments
- Use Repository pattern for complex multi-table queries
- Keep Model layer focused on single-table CRUD operations

## 🧪 Testing

### Testing Strategy
```bash
# Run specific test files (recommended)
bunx vitest run --silent='passed-only' 'user.test.ts'

# Run tests by pattern
bunx vitest run --silent='passed-only' -t "specific test name"

# Package-specific tests
cd packages/database
bunx vitest run --silent='passed-only'

# Server DB tests (special environment)
cd packages/database
TEST_SERVER_DB=1 bunx vitest run --silent='passed-only'
```

### Test Organization
- **Unit tests**: Vitest with Happy DOM environment for browser APIs
- **Co-located**: Test files alongside source files
- **Mock strategy**: Mock I/O operations (file, network), keep realistic data
- **Client/Server**: Separate test environments for PGlite vs PostgreSQL

### Important Testing Notes
- **Avoid mass test runs**: 3000+ test suite takes ~10 minutes
- **Always use file patterns** to target specific tests
- **Never run** `npm test` or bare `vitest` commands
- Use `vi.resetModules()` to solve "ghostly" test failures from module pollution

## 📁 Key Files and Directories

### Monorepo Structure
```
lobe-chat/
├── src/                          # Main application source
│   ├── app/                      # Next.js App Router routes
│   ├── features/                 # Feature components (UI layer)
│   ├── store/                    # Zustand state management
│   ├── services/                 # Client services (environment-adaptive)
│   └── server/                   # Server-side code and tRPC routers
├── apps/desktop/                 # Electron desktop application
├── packages/                     # Monorepo packages
│   ├── database/                 # Drizzle schemas, models, repositories
│   ├── model-runtime/            # AI provider integrations
│   ├── utils/                    # Shared utilities
│   └── types/                    # TypeScript type definitions
├── locales/                      # i18n translation files
├── .cursor/rules/                # Cursor AI development guidelines
├── next.config.ts                # Next.js configuration
├── package.json                  # Root package with scripts
└── pnpm-workspace.yaml          # Monorepo workspace definition
```

### Essential Configuration Files
- **`drizzle.config.ts`**: Database ORM configuration
- **`vitest.config.mts`**: Test framework configuration  
- **`tsconfig.json`**: TypeScript configuration
- **`.cursor/rules/`**: AI-assisted development rules and patterns
- **`CLAUDE.md`**: Shared development guidelines and tech stack overview

## 🔍 Troubleshooting

### Common Issues
```bash
# Port conflicts
pkill -f "next|node.*3010"  # Kill processes on default ports

# Dependency issues
pnpm store prune           # Clean pnpm store
pnpm reinstall            # Full dependency reinstall

# Type errors
bun run type-check        # Explicit type checking
pnpm db:generate          # Regenerate DB types after schema changes

# Test failures
vi.resetModules()         # In test files to clear module cache
bunx vitest run --silent='passed-only' # Use specific test patterns

# Build cache issues
rm -rf .next              # Clear Next.js cache
pnpm build                # Rebuild from clean state
```

### Development Tips
- Use `bun` instead of `npm` for faster script execution
- Leverage the `@` path alias for clean imports (`@/utils`, `@/database`)
- Check `.cursor/rules/` for AI-assisted development patterns
- Monitor console for React Strict Mode warnings in development
- Use Drizzle Studio (`pnpm db:studio`) for database inspection

### Performance Optimization
- Use React Suspense boundaries for async operations
- Memoize expensive Zustand selectors
- Prefer Server Components for data-heavy operations
- Stream LLM responses to improve perceived performance

## 🤝 Contributing

### Code Contribution Workflow
1. **Follow Git conventions**: Use gitmoji prefixes, rebase workflow
2. **Development practices**: Read `CLAUDE.md` and `.cursor/rules/` for patterns
3. **Testing**: Ensure new features include appropriate tests
4. **Type safety**: Maintain strict TypeScript compliance
5. **Documentation**: Update relevant docs for API or architecture changes

### Key Development Principles
- **Environment adaptability**: Code should work across browser, server, and desktop
- **Type safety**: Leverage tRPC and TypeScript for compile-time guarantees  
- **Performance**: Consider streaming, caching, and bundle size
- **Security**: Separate client/server boundaries, validate all inputs
- **Accessibility**: Follow modern React and web standards

For detailed development guidelines, see `CLAUDE.md` and the `.cursor/rules/` directory.