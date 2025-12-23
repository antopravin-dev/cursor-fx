# Publishing cursor-fx to npm - Step-by-Step Guide

## Pre-Publishing Checklist

Before publishing, make sure you've completed these steps:

### 1. Update Package Metadata

Edit `package.json` and replace placeholder values:

```json
{
  "author": "Your Name <your.email@example.com>",  // Replace with your info
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/cursor-fx.git"  // Replace with your GitHub URL
  }
}
```

### 2. Update README Links

In `README.md`, replace these placeholder links at the bottom:

```markdown
- [GitHub Repository](https://github.com/yourusername/cursor-fx)
**Made with ✨ by [Your Name](https://github.com/yourusername)**
```

### 3. Verify Build Works

```bash
pnpm build
```

This should create the `dist/` folder with:
- `dist/core/` - Core engine files
- `dist/react/` - React components
- `dist/vanilla/` - Vanilla JS implementation
- `dist/bubbles/` - Bubble PNG assets
- `dist/snowflakes/` - Snowflake PNG assets

---

## Publishing Steps

### Step 1: Create npm Account (if you don't have one)

1. Go to https://www.npmjs.com/signup
2. Create an account with:
   - Username (this will be public)
   - Email address
   - Password
3. Verify your email address

### Step 2: Login to npm via CLI

Open your terminal and run:

```bash
npm login
```

You'll be prompted for:
- Username
- Password
- Email (this is public)
- One-time password (if you have 2FA enabled)

**Verify you're logged in:**
```bash
npm whoami
```

This should display your npm username.

### Step 3: Check Package Name Availability

Before publishing, verify the package name `cursor-fx` is available:

```bash
npm search cursor-fx
```

If the name is taken, you'll need to either:
- Choose a different name (update `name` in `package.json`)
- Use a scoped package: `@yourusername/cursor-fx`

**To use a scoped package:**
```json
{
  "name": "@yourusername/cursor-fx"
}
```

### Step 4: Test the Package Locally (Optional but Recommended)

Before publishing to npm, test the package locally:

```bash
# Build the package
pnpm build

# Create a tarball (same as what npm publish creates)
npm pack
```

This creates a file like `cursor-fx-1.0.0.tgz`. You can:
1. Install it in a test project: `npm install /path/to/cursor-fx-1.0.0.tgz`
2. Verify the package contents: `tar -tzf cursor-fx-1.0.0.tgz`

**What should be included:**
- `package/dist/` - All built files
- `package/README.md`
- `package/LICENSE`
- `package/package.json`

**What should NOT be included:**
- `src/` folder
- `examples/` folder
- `node_modules/`
- Development config files

### Step 5: Publish to npm

When you're ready to publish:

```bash
# This will automatically run 'pnpm build' before publishing (via prepublishOnly script)
npm publish
```

**For scoped packages (if using @username/cursor-fx):**
```bash
# Public scoped package
npm publish --access public

# Private scoped package (requires paid npm plan)
npm publish --access restricted
```

**Expected output:**
```
npm notice
npm notice 📦  cursor-fx@1.0.0
npm notice Tarball Contents
npm notice ===
npm notice 1.1kB  LICENSE
npm notice 12.3kB README.md
npm notice 2.1kB  package.json
npm notice ...    (list of files)
npm notice Tarball Details
npm notice name:          cursor-fx
npm notice version:       1.0.0
npm notice package size:  XX.X kB
npm notice unpacked size: XXX.X kB
npm notice total files:   XX
npm notice
+ cursor-fx@1.0.0
```

### Step 6: Verify Publication

1. **Check on npm website:**
   - Visit: https://www.npmjs.com/package/cursor-fx
   - (or https://www.npmjs.com/package/@yourusername/cursor-fx for scoped)

2. **Test installation:**
   ```bash
   # Create a test directory
   mkdir test-cursor-fx
   cd test-cursor-fx
   npm init -y

   # Install your published package
   npm install cursor-fx

   # Verify it works
   node -e "console.log(require('cursor-fx'))"
   ```

---

## Updating the Package (Future Versions)

When you want to publish updates:

### 1. Update Version Number

Use npm's versioning commands:

```bash
# Patch version (1.0.0 -> 1.0.1) - bug fixes
npm version patch

# Minor version (1.0.0 -> 1.1.0) - new features, backwards compatible
npm version minor

# Major version (1.0.0 -> 2.0.0) - breaking changes
npm version major
```

This will:
- Update `package.json` version
- Create a git commit
- Create a git tag

### 2. Publish Update

```bash
npm publish
```

### 3. Push to GitHub

```bash
git push
git push --tags
```

---

## Common Issues and Solutions

### Issue: "You do not have permission to publish"

**Solution:** The package name is already taken. Either:
- Choose a different name
- Use a scoped package: `@yourusername/cursor-fx`

### Issue: "This package has been marked as private"

**Solution:** Check `package.json` and remove:
```json
"private": true
```

### Issue: "No README data"

**Solution:** Make sure `README.md` exists and is listed in the `files` array in `package.json` (already configured).

### Issue: "Cannot publish over existing version"

**Solution:** You've already published this version. Update the version:
```bash
npm version patch
npm publish
```

### Issue: Build files missing after publish

**Solution:**
1. Verify `dist/` is built: `pnpm build`
2. Check `.npmignore` doesn't exclude `dist/`
3. Verify `files` array in `package.json` includes `"dist"`

---

## Best Practices

1. **Always test locally** before publishing (use `npm pack`)
2. **Use semantic versioning** correctly:
   - Patch (x.x.X): Bug fixes
   - Minor (x.X.x): New features (backwards compatible)
   - Major (X.x.x): Breaking changes
3. **Document changes** in a CHANGELOG.md file
4. **Tag releases** in git for easy version tracking
5. **Never publish** secrets, credentials, or `.env` files
6. **Test in fresh environment** after publishing

---

## Quick Reference Commands

```bash
# Login to npm
npm login

# Check if logged in
npm whoami

# Build package
pnpm build

# Test package locally
npm pack

# Publish to npm
npm publish

# Publish scoped package
npm publish --access public

# Update version (patch)
npm version patch

# Update version (minor)
npm version minor

# Update version (major)
npm version major
```

---

## Need Help?

- npm documentation: https://docs.npmjs.com/
- npm support: https://www.npmjs.com/support
- Package naming guidelines: https://docs.npmjs.com/cli/v10/configuring-npm/package-json#name

---

**Congratulations on publishing your package!** 🎉
