# LobeChat Tasks Memory
*Last Updated: 2025-09-16*

## Completed Tasks (Session: 2025-09-16)

### 1. ✅ Upstream Merge & Sync
- Merged 24 commits from lobehub/lobe-chat upstream
- Resolved CHANGELOG.md merge conflict
- Preserved local v1.129.0 optimizations
- Successfully pushed to GitHub

### 2. ✅ Security Vulnerability Fixes
- Installed pnpm on CachyOS Linux
- Ran `pnpm audit` to identify 8 vulnerabilities
- Applied fixes via `pnpm audit --fix`
- Added package.json overrides for security patches
- Verified all vulnerabilities resolved

### 3. ✅ Lint & Type Error Resolution (Major)
**Phase 1 (Sub-agent 1)**:
- Reduced TypeScript errors from 326+ to 8
- Fixed UAParser v2.0 compatibility
- Temporarily disabled broken stylelint
- Fixed 80+ variable casing errors

**Phase 2 (Sub-agent 2)**:
- Achieved 100% ESLint compliance
- Re-enabled stylelint with working config
- Further reduced TypeScript errors to 4
- Fixed 140+ theme property issues

### 4. ✅ Vercel Build Error Fix
- Identified xlsx local package reference issue
- Fixed packages/file-loaders/package.json
- Changed to official SheetJS CDN URL
- Verified Excel loading functionality preserved
- Deployment now succeeds on Vercel

### 5. ✅ Release v1.130.0
- Updated package.json version
- Created comprehensive CHANGELOG entry
- Generated detailed RELEASE_NOTES.md
- Created annotated git tag
- Pushed all changes and tags to GitHub

## Pending/Future Tasks

### High Priority
1. **Fix Remaining TypeScript Errors (4)**
   - Database ORM type signatures
   - Zustand store middleware conflicts
   - PDF.js version compatibility

2. **System Date Investigation**
   - System shows 2025 (intended behavior per user)
   - Ensure all timestamps use correct year

### Medium Priority
1. **Stylelint Upgrade**
   - Consider upgrading from v14.16.1 to v16.x
   - Update all style rules to latest standards

2. **Dependency Updates**
   - Review and update other dependencies
   - Ensure React 19 compatibility across all packages

3. **Performance Testing**
   - Verify 30-40% build improvement on Vercel
   - Run Lighthouse audits for runtime performance

### Low Priority
1. **Documentation Updates**
   - Update CLAUDE.md with latest patterns
   - Add troubleshooting guide for common issues

2. **Test Coverage**
   - Increase test coverage for critical paths
   - Add E2E tests for deployment scenarios

## Recurring Maintenance Tasks

### Before Each Session
1. Check system date/time
2. Pull latest from upstream
3. Run `pnpm audit` for new vulnerabilities
4. Check Vercel deployment status

### During Development
1. Run `bun lint` before commits
2. Run `bun type-check` for type validation
3. Keep TodoWrite list updated
4. Document significant changes

### After Major Changes
1. Update version in package.json
2. Update CHANGELOG.md
3. Create release notes
4. Tag and push to GitHub
5. Verify Vercel deployment

## Command Reference

### Essential Commands
```bash
# Development
bun dev                 # Start dev server
bun lint               # Run all linters
bun type-check         # Check TypeScript

# Dependencies
pnpm install           # Install packages
pnpm audit            # Check vulnerabilities
pnpm audit --fix      # Auto-fix vulnerabilities

# Git Operations
git fetch upstream main
git merge upstream/main
git tag -a vX.X.X -m "Release message"
git push origin main --tags

# Testing
bunx vitest run --silent='passed-only' [pattern]
```

### Troubleshooting Commands
```bash
# Clear caches
rm -rf .next/ node_modules/
pnpm install

# Check build locally
bun build

# Verify lockfile
pnpm install --frozen-lockfile
```

## Lessons Learned

### Do's
- Always enable pnpm lockfile for reproducible builds
- Use official CDN URLs for packages not in npm
- Run security audits regularly
- Keep ESLint and Stylelint enabled
- Test Vercel builds locally first

### Don'ts
- Don't commit local package references (file:...)
- Don't disable linters without fixing issues
- Don't ignore TypeScript errors
- Don't skip security vulnerability fixes
- Don't push without running lint checks

## Contact & Resources
- **GitHub**: github.com/doublegate/lobe-chat
- **Vercel Dashboard**: vercel.com (check deployment status)
- **Upstream**: github.com/lobehub/lobe-chat
- **Security Advisories**: GitHub Dependabot alerts