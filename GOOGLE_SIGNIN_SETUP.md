# Firebase Google Sign-In Configuration Guide

## ⚠️ If You See: "auth/popup-blocked" Error

This means Google Sign-in popup is being blocked. Follow these steps to fix it:

---

## 📋 Step 1: Configure Google OAuth in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/project/blessbuy-a89a5)
2. Navigate to **Build** → **Authentication**
3. Go to **Settings** → **Authorized domains**
4. Add these domains:
   - `localhost`
   - `127.0.0.1`
   - `blessbuy-a89a5.firebaseapp.com` (your Firebase hosting domain)
   - Your custom domain (if you have one)

---

## 📋 Step 2: Enable Google as Auth Provider

1. In **Authentication** tab
2. Click **Get started** (if not already done)
3. Click **Google** provider
4. Toggle **Enable** switch
5. Fill in:
   - **Project support email**: Your email
   - **Public-facing name**: BlessBuy
6. Click **Save**

---

## 📋 Step 3: Configure OAuth Consent Screen

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials/consent)
2. Make sure project `blessbuy-a89a5` is selected
3. Click **Create Consent Screen** or **Edit App**
4. Fill in:
   - **App name**: BlessBuy
   - **User support email**: Your email
   - **Developer contact**: Your email
5. Add scopes:
   - `email`
   - `profile`
6. Click **Save and Continue**

---

## 📋 Step 4: Create OAuth 2.0 Credentials

1. Go to [API Credentials](https://console.cloud.google.com/apis/credentials)
2. Click **Create Credentials** → **OAuth 2.0 Client ID**
3. Select **Web application**
4. Add authorized redirect URIs:
   ```
   http://localhost:4200
   http://localhost:58974
   http://127.0.0.1:4200
   http://127.0.0.1:58974
   https://blessbuy-a89a5.firebaseapp.com
   https://blessbuy-a89a5.web.app
   ```
5. Click **Create**
6. Copy your **Client ID** (you don't need it right now, Firebase handles it)

---

## 🌐 Step 5: Browser Popup Settings

### For Chrome:
1. Click lock icon 🔒 in address bar
2. Click **Site settings**
3. Scroll to **Popups and redirects**
4. Set to **Allow**

### For Firefox:
1. Click shield icon in address bar
2. Go to **Settings** → **Privacy & Security**
3. Under **Permissions**, find **Popups & windows**
4. Add `localhost:58974` to allowed sites

### For Safari:
1. Go to **Safari** → **Settings** → **Websites**
2. Select **Pop-up Windows**
3. Set **localhost** to **Allow**

---

## 🔄 Step 6: Test Google Sign-In

1. Refresh your app: `http://localhost:58974`
2. Go to **Sign In** page
3. Click **"Sign in with Google"** button
4. Popup should appear without blocking
5. Complete Google sign-in

---

## 🐛 Troubleshooting

### Still Getting "popup-blocked" Error?

**Option 1: Clear Browser Cache**
```bash
# Chrome: Press Ctrl+Shift+Delete
# Firefox: Press Ctrl+Shift+Delete
# Safari: Cmd+Option+E
```

**Option 2: Disable Popup Blocker**
- Many ad blockers block Google OAuth popups
- Disable extensions like Adblock, uBlock Origin temporarily
- Whitelist `localhost:58974`

**Option 3: Use Redirect Instead of Popup**
- Contact support if you need redirect flow instead of popup

**Option 4: Check Console for Errors**
- Press `F12` to open DevTools
- Go to **Console** tab
- Look for detailed error messages
- Send us the exact error

---

## ✅ Firebase Console Checklist

- [ ] Google provider is **Enabled** in Authentication
- [ ] `localhost` is in Authorized domains
- [ ] OAuth Consent Screen is configured
- [ ] Your Firebase domain is in Authorized domains
- [ ] OAuth credentials are created in Google Cloud

---

## 📱 Local Development Setup

Your app is running on: `http://localhost:58974`

Make sure you use this exact URL:
- ✅ `http://localhost:58974` (correct)
- ❌ `http://127.0.0.1:58974` (won't work with Google OAuth)
- ❌ `http://192.168.x.x:58974` (won't work)

---

## 🚀 Once Google Sign-In Works

You can:
1. Register new accounts with Google
2. Sign in with Google
3. Your user profile auto-creates in Firestore
4. Access protected pages like `/dashboard` and `/admin/products`

---

## ❓ Still Having Issues?

1. **Check Firebase Console** - Is Google enabled?
2. **Check Authorized Domains** - Is localhost added?
3. **Check Popup Blocker** - Is it disabled?
4. **Check Browser Console** - Are there other errors? (F12)
5. **Hard Refresh** - Ctrl+Shift+R or Cmd+Shift+R

If still stuck, try:
- Use **Email/Password** sign-in instead (always works)
- Test on a different browser
- Clear all browser cookies/cache for localhost
