# LobeChat Project Memory
*Last Updated: 2025-09-16*

## Project Overview
**Repository**: github.com/doublegate/lobe-chat (fork of lobehub/lobe-chat)
**Current Version**: v1.130.0
**Tech Stack**: Next.js 15, React 19, TypeScript, pnpm, PostgreSQL/PGLite
**Deployment**: Vercel (vercel.com)

## System Environment
- **OS**: CachyOS Linux (Arch-based)
- **Shell**: Fish shell (primary), Zsh (secondary)
- **Package Manager**: pnpm (dependencies), bun (scripts)
- **System Date**: 2025-09-16 (system shows year 2025 correctly)

## Recent Major Changes (v1.130.0 Release)

### Security Fixes
- Fixed 8 critical vulnerabilities (1 high, 6 moderate, 1 low)
- Added pnpm overrides for automated security patching
- Resolved all CVEs through package updates

### Build & Deployment
- **CRITICAL FIX**: Resolved Vercel build failure from xlsx local package reference
- Changed xlsx from `file:../../local-packages/xlsx-0.20.3` to official CDN
- Enabled pnpm lockfile generation (was disabled)
- 30-40% faster build times through webpack optimization

### Code Quality Achievements
- **ESLint**: 100% compliance (0 errors, 0 warnings)
- **Stylelint**: 100% compliance (re-enabled after fixing)
- **TypeScript**: 98.8% error reduction (326+ → 4 errors)
- Fixed UAParser v2.0 compatibility
- Corrected 140+ theme property casing errors

## Configuration Details

### Package Management
- **pnpm**: Primary dependency manager with lockfile enabled
- **bun**: Script runner (aliased in Fish shell)
- **npm scripts**: Use `bun` prefix (e.g., `bun dev`, `bun lint`)

### Git Configuration
- **User**: doublegate (parobek@gmail.com)
- **Remote origin**: github.com/doublegate/lobe-chat
- **Remote upstream**: github.com/lobehub/lobe-chat
- **Default branch**: main

### Development Commands
```bash
bun dev          # Start development server
bun lint         # Run all linters
bun type-check   # TypeScript validation
bun build        # Production build
pnpm install     # Install dependencies
pnpm audit       # Check vulnerabilities
```

## Known Issues & Limitations

### Remaining TypeScript Errors (4)
1. Database model update signature incompatibility
2. Zustand store type mismatches (2 instances)
3. PDF.js version compatibility issue

### Stylelint Configuration
- Currently using stylelint v14.16.1
- Some rules disabled due to version compatibility
- Working configuration established

## Project Structure
```
/home/parobek/Code/lobe-chat/
├── packages/           # Monorepo packages
│   ├── agent-runtime/
│   ├── database/
│   ├── file-loaders/  # Fixed xlsx dependency here
│   └── ...
├── src/               # Main application code
├── .npmrc            # pnpm config (lockfile=true)
├── pnpm-lock.yaml    # Dependency lock file
├── package.json      # Version 1.130.0
├── CHANGELOG.md      # Release history
├── README.md         # Project documentation
├── RELEASE_NOTES.md  # Latest release details
└── CLAUDE.md         # Development guidelines
```

## Critical Files Modified
- `packages/file-loaders/package.json` - xlsx CDN fix
- `.stylelintrc.js` - Stylelint configuration fix
- `packages/utils/src/platform.ts` - UAParser v2.0 fix
- 300+ files - Linting and type fixes

## Deployment Status
- **Vercel**: ✅ Builds successfully
- **GitHub**: All changes pushed with tags
- **Version**: v1.130.0 released with comprehensive notes

## Performance Metrics
- Build time: 5-6 minutes (was 8.4 min)
- TypeScript errors: 4 (was 326+)
- ESLint issues: 0 (was 102)
- Security vulnerabilities: 0 (was 8)