# Password Protection Setup

The investor deck is now password protected. Here's how to configure it.

## How It Works

- Client-side password protection (better than nothing, but not 100% secure)
- Password is checked against an environment variable
- Once authenticated, access is stored in sessionStorage (clears when browser closes)
- Password is embedded in the build (not visible in source code, but could be extracted)

## Setup Instructions

### Option 1: GitHub Pages (Current Setup)

1. **Set GitHub Secret:**
   - Go to your GitHub repository
   - Navigate to **Settings → Secrets and variables → Actions**
   - Click **New repository secret**
   - Name: `INVESTOR_DECK_PASSWORD`
   - Value: Your desired password (e.g., `Altyr2024!`)
   - Click **Add secret**

2. **The password will be used during build:**
   - The GitHub Actions workflow will inject it as `VITE_INVESTOR_PASSWORD`
   - It gets compiled into the build
   - Users will need to enter this password to access the deck

3. **Default Password:**
   - If no secret is set, it defaults to `Altyr2024!`
   - **Change this immediately** by setting the GitHub secret

### Option 2: Local Development

Create a `.env` file in the `investor_site` directory:

```bash
VITE_INVESTOR_PASSWORD=your-password-here
```

**Note:** `.env` files are gitignored and won't be committed.

### Option 3: More Secure Options

For better security, consider:

1. **Move to Vercel:**
   - Vercel has built-in password protection
   - Go to Project Settings → Deployment Protection
   - Enable "Password Protection"
   - Set password directly in Vercel dashboard

2. **Use Cloudflare Access:**
   - If using Cloudflare for DNS
   - Set up Access policies
   - More enterprise-grade security

3. **Server-side Protection:**
   - Host on a platform with server-side auth
   - Use HTTP Basic Auth
   - Or implement proper authentication

## Changing the Password

1. Update the GitHub secret `INVESTOR_DECK_PASSWORD`
2. Push a new commit (or manually trigger deployment)
3. The new password will be active after deployment

## Security Notes

⚠️ **Important:** This is client-side protection. It:
- ✅ Prevents casual browsing
- ✅ Requires password to view content
- ✅ Clears on browser close
- ❌ Can be bypassed by determined users (viewing source code)
- ❌ Password is in the JavaScript bundle (obfuscated but extractable)

For sensitive financial information, consider:
- Moving to Vercel with built-in protection
- Using server-side authentication
- Restricting access by IP
- Using a proper authentication system

## Testing

1. Clear your browser's sessionStorage
2. Visit `https://investors.altyr.com`
3. You should see the password prompt
4. Enter the password to access the deck

