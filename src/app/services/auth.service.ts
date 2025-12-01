import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, User } from '@angular/fire/auth';
import { Firestore, collection, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: Date;
  referralCode: string;
  totalClicks: number;
  totalEarnings: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser$ = new BehaviorSubject<User | null>(null);
  private userProfile$ = new BehaviorSubject<UserProfile | null>(null);
  private authInitialized = false;

  constructor(
    private auth: Auth,
    private firestore: Firestore
  ) {
    // Lazy initialize on first use
  }

  private initializeAuth() {
    if (this.authInitialized) return;
    this.authInitialized = true;
    
    try {
      onAuthStateChanged(this.auth, async (user) => {
        this.currentUser$.next(user);
        if (user) {
          await this.loadUserProfile(user.uid);
        } else {
          this.userProfile$.next(null);
        }
      });
    } catch (error) {
      console.error('Error initializing auth:', error);
      // Retry after delay
      this.authInitialized = false;
      setTimeout(() => this.initializeAuth(), 1000);
    }
  }

  // Get current user
  getCurrentUser(): Observable<User | null> {
    if (!this.authInitialized) {
      this.initializeAuth();
    }
    return this.currentUser$.asObservable();
  }

  // Get user profile
  getUserProfile(): Observable<UserProfile | null> {
    if (!this.authInitialized) {
      this.initializeAuth();
    }
    return this.userProfile$.asObservable();
  }

  // Register with email and password
  registerWithEmail(email: string, password: string, displayName: string): Promise<User | null> {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(async (result) => {
        await this.createUserProfile(result.user, displayName);
        return result.user;
      })
      .catch((error) => {
        if (error.code === 'auth/configuration-not-found') {
          throw new Error('Firebase configuration error. Please check your setup.');
        }
        throw error;
      });
  }

  // Login with email and password
  loginWithEmail(email: string, password: string): Promise<User | null> {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((result) => result.user)
      .catch((error) => {
        if (error.code === 'auth/configuration-not-found') {
          throw new Error('Firebase configuration error. Please refresh the page and try again.');
        }
        throw error;
      });
  }

  // Login with Google
  loginWithGoogle(): Promise<User | null> {
    const provider = new GoogleAuthProvider();
    
    // Set custom parameters for better Google Sign-in UX
    provider.setCustomParameters({
      'login_hint': 'user@example.com'
    });

    return signInWithPopup(this.auth, provider)
      .then(async (result) => {
        const user = result.user;
        try {
          // Check if user profile exists
          const profileDoc = await getDoc(doc(this.firestore, 'users', user.uid));
          if (!profileDoc.exists()) {
            await this.createUserProfile(user, user.displayName || '');
          } else {
            await this.loadUserProfile(user.uid);
          }
        } catch (firestoreError: any) {
          if (firestoreError.message?.includes('offline')) {
            console.warn('Firestore offline - profile will sync when connection restored');
            // Still allow login to proceed, profile will load when online
          } else {
            throw firestoreError;
          }
        }
        return user;
      })
      .catch((error) => {
        console.error('Google Sign-in error:', error.code, error.message);
        
        // Handle configuration error
        if (error.code === 'auth/configuration-not-found') {
          throw new Error('Google Sign-in not configured. Please use email/password instead.');
        }
        
        // Handle popup blocked error
        if (error.code === 'auth/popup-blocked') {
          throw new Error('Popup was blocked. Please allow popups for this site and try again.');
        }
        
        // Handle other errors
        if (error.code === 'auth/popup-closed-by-user') {
          throw new Error('Sign-in was cancelled. Please try again.');
        }
        
        throw error;
      });
  }

  // Logout
  logout(): Promise<void> {
    return signOut(this.auth);
  }

  // Create user profile in Firestore
  private async createUserProfile(user: User, displayName: string): Promise<void> {
    const referralCode = this.generateReferralCode();
    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email || '',
      displayName: displayName || user.email?.split('@')[0] || 'User',
      photoURL: user.photoURL || undefined,
      createdAt: new Date(),
      referralCode,
      totalClicks: 0,
      totalEarnings: 0
    };

    const usersCollection = collection(this.firestore, 'users');
    await setDoc(doc(usersCollection, user.uid), userProfile);
    this.userProfile$.next(userProfile);
  }

  // Load user profile from Firestore
  private async loadUserProfile(uid: string): Promise<void> {
    try {
      const usersCollection = collection(this.firestore, 'users');
      const userDoc = await getDoc(doc(usersCollection, uid));
      
      if (userDoc.exists()) {
        const profileData = userDoc.data() as UserProfile;
        this.userProfile$.next(profileData);
      }
    } catch (error: any) {
      if (error.code === 'failed-precondition' || error.message?.includes('offline')) {
        console.warn('Firestore offline - profile will load when connection restored');
        // Don't throw, allow app to continue in offline mode
      } else {
        console.error('Error loading user profile:', error);
      }
    }
  }

  // Generate unique referral code
  private generateReferralCode(): string {
    return 'REF_' + Math.random().toString(36).substring(2, 11).toUpperCase();
  }

  // Update referral stats
  async recordAffiliateClick(productId: string): Promise<void> {
    const user = this.auth.currentUser;
    if (!user) return;

    const clicksCollection = collection(this.firestore, 'users', user.uid, 'clicks');
    await setDoc(doc(clicksCollection), {
      productId,
      timestamp: new Date(),
      referralCode: this.userProfile$.value?.referralCode
    });

    // Update total clicks
    const userRef = doc(this.firestore, 'users', user.uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const currentClicks = userDoc.data()['totalClicks'] || 0;
      // Note: In production, use increment() to avoid race conditions
      // await updateDoc(userRef, { totalClicks: increment(1) });
    }
  }
}
