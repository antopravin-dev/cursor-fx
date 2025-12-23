# Fixing npm Publish 403 Error - 2FA Setup

## The Error
```
npm error 403 Two-factor authentication or granular access token with bypass 2fa enabled is required to publish packages.
```

## Solution: Choose One of Two Options

---

## Option 1: Enable 2FA on npm Account (Recommended)

### Step 1: Enable 2FA on npm Website

1. Go to https://www.npmjs.com/
2. Log in to your account
3. Click on your profile picture (top right) → **Account**
4. Go to **Two-Factor Authentication** section
5. Click **Enable 2FA**

### Step 2: Choose 2FA Mode

You'll be prompted to choose a mode:

- **Authorization and Publishing** (Recommended) - Requires 2FA for login and publishing
- **Authorization Only** - Requires 2FA only for login

**Choose "Authorization and Publishing"**

### Step 3: Set Up Authenticator App

1. Download an authenticator app if you don't have one:
   - Google Authenticator (iOS/Android)
   - Authy (iOS/Android/Desktop)
   - Microsoft Authenticator (iOS/Android)
   - 1Password (has built-in authenticator)

2. Scan the QR code shown on npm with your authenticator app
3. Enter the 6-digit code from your app to verify
4. **SAVE YOUR RECOVERY CODES** - Store them somewhere safe!

### Step 4: Publish with 2FA

Now when you publish, npm will prompt you for a one-time password (OTP):

```bash
npm publish
```

You'll see:
```
npm notice
npm notice Publishing to https://registry.npmjs.org/
This operation requires a one-time password.
Enter OTP:
```

Enter the 6-digit code from your authenticator app.

**Alternative: Use OTP flag directly**
```bash
npm publish --otp=123456
```
(Replace 123456 with the current code from your authenticator app)

---

## Option 2: Use Access Token (For CI/CD or Automation)

This option is better for automated publishing from GitHub Actions, etc.

### Step 1: Generate Access Token

1. Go to https://www.npmjs.com/
2. Log in → Click profile picture → **Access Tokens**
3. Click **Generate New Token** → Choose **Granular Access Token**

### Step 2: Configure Token

Fill out the form:
- **Token name**: `cursor-fx-publish` (or any name you like)
- **Expiration**: Choose duration (e.g., 30 days, 90 days, 1 year, or no expiration)
- **Packages and scopes**:
  - Select **Read and write**
  - Choose **Only select packages and scopes**
  - Under "Packages", select `cursor-fx`

**Important Options:**
- ✅ Check **"Bypass 2FA requirements when publishing or changing package settings"**
- This allows the token to publish without requiring OTP codes

### Step 3: Save the Token

1. Click **Generate Token**
2. **COPY THE TOKEN IMMEDIATELY** - You won't be able to see it again!
3. Store it securely (password manager, secure notes, etc.)

### Step 4: Use Token for Publishing

**Method A: Set token in .npmrc (Local)**

Create or edit `~/.npmrc` (in your home directory, NOT in the project):

```bash
# Edit your global .npmrc
echo "//registry.npmjs.org/:_authToken=YOUR_TOKEN_HERE" >> ~/.npmrc
```

Replace `YOUR_TOKEN_HERE` with your actual token.

**Method B: Use token via environment variable**

```bash
# Set token for current session
export NPM_TOKEN=your_token_here

# Create/edit .npmrc in project
echo "//registry.npmjs.org/:_authToken=\${NPM_TOKEN}" > .npmrc

# Now publish
npm publish
```

**Method C: Login with token**

```bash
npm login
```

When prompted:
- Username: Your npm username
- Password: Paste your access token (not your account password!)
- Email: Your public email

---

## Recommended Approach

For **manual publishing** (what you're doing now):
→ **Use Option 1 (Enable 2FA)**

For **automated publishing** (GitHub Actions, CI/CD):
→ **Use Option 2 (Access Token)**

---

## Quick Fix Right Now

1. Go to https://www.npmjs.com/settings/YOUR_USERNAME/tokens
2. Click "Generate New Token" → "Classic Token"
3. Choose "Automation" type
4. Copy the token
5. Run:
   ```bash
   npm logout
   npm login
   ```
6. When prompted for password, **paste your token** instead
7. Try publishing again:
   ```bash
   npm publish
   ```

---

## Troubleshooting

### "Invalid OTP" Error
- Make sure your device's time is synced correctly (authenticator apps depend on time)
- Wait for the next code if the current one is about to expire
- Try entering the code immediately after it refreshes

### "Token expired" Error
- Generate a new token with longer expiration
- Update your `.npmrc` with the new token

### Still getting 403 Error
- Make sure you're logged in: `npm whoami`
- Check token permissions include write access to `cursor-fx`
- Verify the token has "bypass 2FA" enabled if using access token

---

## Security Best Practices

1. **Never commit** `.npmrc` with tokens to git
2. **Add to .gitignore**:
   ```
   .npmrc
   ```
3. **Use different tokens** for different purposes (local dev, CI/CD, etc.)
4. **Set expiration dates** on tokens
5. **Revoke old tokens** you're no longer using
6. **Store recovery codes** safely for 2FA

---

## After Setting Up

Once you've enabled 2FA or set up a token, try publishing again:

```bash
npm publish
```

Or with OTP:
```bash
npm publish --otp=123456
```

Good luck! 🚀
