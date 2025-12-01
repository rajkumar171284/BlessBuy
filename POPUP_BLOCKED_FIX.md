# 🔧 Quick Fix for "auth/popup-blocked" Error

## ⚡ The Problem
Google Sign-in popup is being blocked. This is common and easy to fix.

## ✅ Quick Fix (2 minutes)

### Step 1: Check Your URL
Make sure you're using: **`http://localhost:58974`**
- NOT `127.0.0.1`
- NOT `192.168.x.x`

### Step 2: Disable Popup Blocker
- **Chrome**: Click address bar 🔒 → Site Settings → Popups: **Allow**
- **Firefox**: Shield icon → Settings → Popups: **Allow localhost**
- **Safari**: Preferences → Websites → Pop-ups: **Allow**

### Step 3: Disable Browser Extensions
Many ad blockers block Google OAuth:
- Adblock
- uBlock Origin
- Privacy Badger
- Ghostery

Disable them temporarily for localhost:58974

### Step 4: Refresh & Test
1. Hard refresh: `Ctrl+Shift+R` (or `Cmd+Shift+R` on Mac)
2. Go to `/login`
3. Click "Sign in with Google"
4. Popup should appear

---

## 📋 If Still Not Working

### Option A: Use Email/Password Instead (Recommended)
```
Email: test@example.com
Password: password123
```
- ✅ No popup issues
- ✅ Works immediately
- ✅ Test everything

### Option B: Complete Google Setup
Follow the detailed guide: `GOOGLE_SIGNIN_SETUP.md`
- Takes 5-10 minutes
- Ensures all Firebase settings are correct
- Works everywhere (localhost + production)

---

## 🎯 What You Need to Do RIGHT NOW

### For Quick Testing:
1. ✅ Use Email/Password login
2. ✅ Create account via `/register`
3. ✅ Test all features
4. ✅ Later: Configure Google Sign-in

### For Production Ready:
1. ✅ Follow `GOOGLE_SIGNIN_SETUP.md`
2. ✅ Configure Firebase properly
3. ✅ Test Google Sign-in
4. ✅ Deploy to Firebase Hosting

---

## 💡 Remember

**Email/Password authentication works perfectly without any popup issues!**

So you can:
- ✅ Test your affiliate site completely
- ✅ Add products to Firestore
- ✅ Test the admin panel
- ✅ Test the dashboard
- ✅ Add Google Sign-in later when you're ready

---

## 🚀 Your Next Steps

1. Go to `/register` and create an account with email
2. Go to `/login` and sign in
3. Go to `/admin/products` and add some products
4. Go to `/products` and see them displayed
5. Everything works! 🎉

**Google Sign-in is optional for now. Focus on building your affiliate site!**
