import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="login-container">
      <div class="login-card">
        <h1>Welcome to BlessBuy</h1>
        <p class="subtitle">Sign in to your account</p>

        <div *ngIf="error" class="error-message">{{ error }}</div>

        <form (ngSubmit)="loginWithEmail()" #emailForm="ngForm">
          <div class="form-group">
            <label for="email">Email Address</label>
            <input
              type="email"
              id="email"
              [(ngModel)]="email"
              name="email"
              placeholder="Enter your email"
              required
            >
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              [(ngModel)]="password"
              name="password"
              placeholder="Enter your password"
              required
            >
          </div>

          <button type="submit" class="btn-primary" [disabled]="loading">
            {{ loading ? 'Signing in...' : 'Sign In' }}
          </button>
        </form>

        <div class="divider">OR</div>

        <button (click)="loginWithGoogle()" class="btn-google" [disabled]="loading || googleSignInDisabled">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Sign in with Google {{ googleSignInDisabled ? '(See Setup Guide)' : '' }}
        </button>

        <p class="signup-link">
          Don't have an account? <a routerLink="/register">Sign up here</a>
        </p>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: calc(100vh - 60px - 300px);
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }

    .login-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
      padding: 40px;
      max-width: 400px;
      width: 100%;
    }

    h1 {
      margin: 0 0 10px 0;
      color: #333;
      text-align: center;
      font-size: 2rem;
    }

    .subtitle {
      text-align: center;
      color: #999;
      margin-bottom: 30px;
    }

    .error-message {
      background: #fee;
      color: #c33;
      padding: 12px;
      border-radius: 4px;
      margin-bottom: 20px;
      font-size: 0.9rem;
    }

    .form-group {
      margin-bottom: 20px;
    }

    label {
      display: block;
      margin-bottom: 8px;
      color: #333;
      font-weight: 500;
      font-size: 0.9rem;
    }

    input {
      width: 100%;
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      box-sizing: border-box;
      transition: border-color 0.3s;
    }

    input:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .btn-primary, .btn-google {
      width: 100%;
      padding: 12px;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.3s;
    }

    .btn-primary {
      background: #667eea;
      color: white;
      margin-bottom: 20px;
    }

    .btn-primary:hover:not(:disabled) {
      background: #5568d3;
    }

    .btn-primary:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .btn-google {
      background: #f5f5f5;
      color: #333;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      border: 1px solid #ddd;
    }

    .btn-google:hover:not(:disabled) {
      background: #eee;
    }

    .btn-google:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .divider {
      text-align: center;
      color: #999;
      margin: 20px 0;
      position: relative;
    }

    .divider::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      width: 100%;
      height: 1px;
      background: #ddd;
      z-index: -1;
    }

    .divider {
      background: white;
      padding: 0 10px;
      display: inline-block;
      width: 100%;
    }

    .signup-link {
      text-align: center;
      margin-top: 20px;
      color: #999;
    }

    .signup-link a {
      color: #667eea;
      text-decoration: none;
      font-weight: bold;
    }

    .signup-link a:hover {
      text-decoration: underline;
    }
  `]
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  loading: boolean = false;
  error: string = '';
  googleSignInDisabled: boolean = false; // Can be set to true if Google not configured

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Redirect to dashboard if already logged in
    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  loginWithEmail() {
    if (!this.email || !this.password) {
      this.error = 'Please enter both email and password';
      return;
    }

    this.loading = true;
    this.error = '';

    try {
      this.authService.loginWithEmail(this.email, this.password)
        .then(() => {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
          this.router.navigate([returnUrl]);
        })
        .catch(error => {
          this.error = error.message || 'Failed to sign in. Please try again.';
          this.loading = false;
        });
    } catch (error: any) {
      this.error = error.message || 'An error occurred. Please try again.';
      this.loading = false;
    }
  }

  loginWithGoogle() {
    this.loading = true;
    this.error = '';

    try {
      this.authService.loginWithGoogle()
        .then(() => {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
          this.router.navigate([returnUrl]);
        })
        .catch(error => {
          console.error('Google sign-in error:', error);
          
          if (error.message?.includes('popup')) {
            this.error = 'Popup blocked: Please disable your popup blocker and try again.';
          } else if (error.message?.includes('cancelled')) {
            this.error = 'Sign-in cancelled.';
          } else if (error.message?.includes('configuration-not-found')) {
            this.error = 'Google Sign-in not configured. Please use email/password instead.';
          } else {
            this.error = error.message || 'Failed to sign in with Google. Please try email/password instead.';
          }
          
          this.loading = false;
        });
    } catch (error: any) {
      this.error = error.message || 'An error occurred. Please try again.';
      this.loading = false;
    }
  }
}
