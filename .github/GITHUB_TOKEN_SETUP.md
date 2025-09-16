# GitHub Actions Token Setup

## Issue
The GitHub Actions workflow is failing with: `Input required and not supplied: token`

## Solution
You need to add a GitHub Personal Access Token (PAT) as a secret in your repository.

### Steps to Fix:

1. **Create a GitHub Personal Access Token:**
   - Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Click "Generate new token (classic)"
   - Give it a descriptive name (e.g., "LobeChat Actions")
   - Select the following scopes:
     - `repo` (full control of private repositories)
     - `workflow` (update GitHub Action workflows)
   - Generate and copy the token

2. **Add the Token to Repository Secrets:**
   - Go to your repository: https://github.com/doublegate/lobe-chat
   - Navigate to Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `GH_TOKEN`
   - Value: Paste your personal access token
   - Click "Add secret"

3. **Verify:**
   - Push a commit to trigger the workflow
   - The workflow should now have access to the token

## Why This is Needed
The Release CI workflow uses `actions/checkout@v5` with a custom token to:
- Have permission to create releases
- Push tags and commits during semantic release
- Access the repository with elevated permissions

## Security Notes
- Never commit the token directly to code
- Rotate the token periodically
- Use the minimum required permissions
- Consider using GitHub Apps for production deployments