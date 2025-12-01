# Firebase Setup Instructions

Your Firebase configuration has been added to the project. Now complete these final steps:

## 1. Enable Authentication Methods

1. Go to [Firebase Console](https://console.firebase.google.com/project/blessbuy-a89a5)
2. Navigate to **Build** → **Authentication**
3. Click **Get started**
4. Enable:
   - ✅ **Email/Password**
   - ✅ **Google** (Add your OAuth 2.0 credentials)

## 2. Deploy Firestore Security Rules

1. Install Firebase CLI (if not already installed):
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase in your project:
   ```bash
   firebase init
   ```
   - Select "Firestore" and "Hosting"
   - Choose your project: `blessbuy-a89a5`

4. Deploy the security rules:
   ```bash
   firebase deploy --only firestore:rules
   ```

## 3. Create Firestore Collections

Go to Firestore Console and create these collections:

### users
- Contains user profiles
- Documents: `{uid}`
- Fields: email, displayName, photoURL, referralCode, totalClicks, totalEarnings, createdAt

### products
- Contains product catalog
- Fields: name, price, category, image, affiliateLink, commission, description, features, reviews

### admins (optional)
- Contains admin user IDs
- Documents: `{uid}`

## 4. Test the Application

1. Start the dev server:
   ```bash
   npm start
   ```

2. Test the flow:
   - ✅ Go to `/register` - Create a new account
   - ✅ Go to `/login` - Sign in with email
   - ✅ Try Google Sign-in
   - ✅ Navigate to `/dashboard` - Should be protected
   - ✅ Verify user profile is created in Firestore

## 5. Environment Variables (Production)

When deploying to production, ensure:
- Firebase API Key is restricted in [Google Cloud Console](https://console.cloud.google.com/)
- Only allow web domain from your hosting URL
- Update `environment.prod.ts` if using different Firebase project

## Firebase CLI Commands

```bash
# Deploy all
firebase deploy

# Deploy only functions
firebase deploy --only functions

# Deploy only firestore rules
firebase deploy --only firestore:rules

# Deploy only hosting
firebase deploy --only hosting

# View logs
firebase functions:log
```

## Troubleshooting

### "Permission denied" errors
- Check Firestore security rules are deployed
- Verify user is authenticated before accessing protected routes

### Google Sign-in not working
- Make sure Google Sign-in is enabled in Firebase Auth
- Add your domain to authorized redirect URIs

### Firestore quota exceeded
- Check if you're within free tier limits
- Monitor usage in Firebase Console

## Next Steps

1. ✅ Connect Amazon Product Advertising API
2. ✅ Set up Cloud Functions for backend
3. ✅ Add product analytics dashboard
4. ✅ Implement commission tracking
5. ✅ Deploy to Firebase Hosting
