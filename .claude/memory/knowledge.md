# LobeChat Knowledge Base
*Last Updated: 2025-09-16*

## Project Architecture

### Technology Stack
- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **State Management**: Zustand with slices pattern
- **Styling**: antd-style (CSS-in-JS), @lobehub/ui components
- **Database**: Dual mode - PGLite (client) / PostgreSQL (server)
- **ORM**: Drizzle ORM with migrations
- **API**: tRPC for type-safe endpoints
- **Testing**: Vitest with Happy DOM
- **Deployment**: Vercel, Docker, Electron

### Monorepo Structure
```
packages/
├── agent-runtime/      # Agent execution runtime
├── database/          # Database schemas and models
├── file-loaders/      # File parsing utilities
├── model-runtime/     # LLM provider integrations
├── context-engine/    # Context processing
├── types/            # Shared TypeScript types
└── utils/            # Shared utilities
```

## Critical Fixes & Solutions

### 1. Vercel Build Error (xlsx Package)
**Problem**: Local package reference blocking deployment
```json
// WRONG
"xlsx": "file:../../local-packages/xlsx-0.20.3"
```
**Solution**: Use official CDN
```json
// CORRECT
"xlsx": "https://cdn.sheetjs.com/xlsx-0.20.3/xlsx-0.20.3.tgz"
```

### 2. UAParser v2.0 Compatibility
**Problem**: Default export removed in v2.0
```typescript
// WRONG - v1.x syntax
import UAParser from 'ua-parser-js';
```
**Solution**: Use named export
```typescript
// CORRECT - v2.x syntax
import { UAParser } from 'ua-parser-js';
```

### 3. Theme Property Casing
**Pattern**: All theme properties use camelCase
```typescript
// WRONG
theme.colorbgcontainersecondary
theme.colorBgContainerSecondary  // CORRECT
```

### 4. Security Vulnerability Patching
**Method**: pnpm overrides in package.json
```json
"pnpm": {
  "overrides": {
    "@apidevtools/json-schema-ref-parser@>=11.0.0 <=11.1.0": ">=11.2.0",
    "@octokit/request-error@>=1.0.0 <5.1.1": ">=5.1.1",
    "esbuild@<=0.24.2": ">=0.25.0"
  }
}
```

### 5. Stylelint Configuration (v14.16.1)
**Working Configuration**:
```javascript
module.exports = {
  extends: [
    '@stylelint-scss/stylelint-scss',
    'stylelint-config-clean-order',
  ],
  // Removed incompatible 'stylelint-config-recommended'
};
```

## Development Patterns

### Testing Approach
```bash
# NEVER run all tests (3000+ tests, ~10min)
bun test  # DON'T DO THIS

# ALWAYS filter tests
bunx vitest run --silent='passed-only' 'specific.test.ts'
bunx vitest run --silent='passed-only' -t "test name"
```

### Import Patterns
```typescript
// Directory imports need explicit index
import { something } from '@/db/index';  // ✅
import { something } from '@/db';         // ❌

// Use interface for object shapes
interface UserData { ... }  // ✅
type UserData = { ... }     // ❌ (unless union type)
```

### Git Workflow
```bash
# Rebase for pull (not merge)
git pull --rebase upstream main

# Commit with gitmoji
git commit -m "🔒 fix: Security patches"

# Skip hooks when necessary
git commit --no-verify
```

## System Specifics

### CachyOS Linux Environment
- **Shell**: Fish (primary), Zsh (secondary)
- **Package Managers**: pnpm, bun (aliased)
- **System Year**: 2025 (correct per user confirmation)

### Vercel Deployment
- **Build Command**: `bun install && bun build`
- **Output Directory**: `.next`
- **Node Version**: 18.x or higher
- **Build Time**: 5-6 minutes (optimized)

### Performance Optimizations
1. **Webpack Chunk Splitting**:
   - PostgreSQL assets: Separate chunk (5.4MB+8.09MB)
   - UI libraries: Grouped chunk
   - Vendor code: Size-limited chunks

2. **Memory Settings**:
   - Node heap: 6144MB
   - Semi-space: 512MB
   - Parallel workers: Enabled

## Common Issues & Solutions

### Issue: Peer Dependency Warnings
**Solution**: Added peerDependencyRules in package.json
```json
"pnpm": {
  "peerDependencyRules": {
    "allowedVersions": {
      "react": "19",
      "react-dom": "19"
    }
  }
}
```

### Issue: ESLint Variable Casing
**Pattern**: Constants use UPPER_SNAKE_CASE
```javascript
// WRONG
const chat_portal_width = 300;

// CORRECT
const CHAT_PORTAL_WIDTH = 300;
```

### Issue: Missing Imports
**Check**: Always verify imports exist
```typescript
import { MAX_WIDTH } from './constants';  // Verify file exports this
import { getThumbnailMaxWidth } from './utils';  // Check function exists
```

## Security Best Practices

### Dependency Management
1. Run `pnpm audit` regularly
2. Use `pnpm audit --fix` for auto-fixes
3. Add overrides for manual patches
4. Keep pnpm-lock.yaml in version control

### Code Security
1. Never commit secrets or API keys
2. Use environment variables for sensitive data
3. Validate all user inputs
4. Sanitize data before database operations

## Useful Resources

### Documentation
- **Project Docs**: CLAUDE.md (development guidelines)
- **Next.js 15**: nextjs.org/docs
- **React 19**: react.dev
- **Drizzle ORM**: orm.drizzle.team

### Package Registries
- **npm**: npmjs.com
- **SheetJS CDN**: cdn.sheetjs.com (for xlsx)
- **pnpm**: pnpm.io

### Monitoring
- **Vercel Dashboard**: Monitor deployments
- **GitHub Security**: Dependabot alerts
- **Bundle Analysis**: `bun build:analyze`

## Version Compatibility Matrix

| Package | Current | Compatible | Notes |
|---------|---------|------------|-------|
| Next.js | 15.x | ✅ | App Router |
| React | 19.x | ✅ | Some peer warnings |
| TypeScript | 5.x | ✅ | Strict mode |
| Node.js | 18+ | ✅ | Required |
| pnpm | 9.x | ✅ | v10 available |
| Stylelint | 14.16.1 | ⚠️ | v16 has breaking changes |
| UAParser | 2.x | ✅ | Named export required |

## Performance Benchmarks

### Build Performance
- **Before optimization**: 8.4 minutes
- **After optimization**: 5-6 minutes
- **Improvement**: 30-40% faster

### Code Quality Metrics
- **TypeScript errors**: 326+ → 4 (98.8% reduction)
- **ESLint compliance**: 100% (0 errors)
- **Stylelint compliance**: 100% (0 errors)
- **Security vulnerabilities**: 8 → 0 (100% fixed)