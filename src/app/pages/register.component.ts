import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="register-container">
      <div class="register-card">
        <h1>Create Account</h1>
        <p class="subtitle">Join BlessBuy to start earning</p>

        <div *ngIf="error" class="error-message">{{ error }}</div>
        <div *ngIf="success" class="success-message">{{ success }}</div>

        <form (ngSubmit)="register()" #registerForm="ngForm">
          <div class="form-group">
            <label for="displayName">Full Name</label>
            <input
              type="text"
              id="displayName"
              [(ngModel)]="displayName"
              name="displayName"
              placeholder="Enter your full name"
              required
            >
          </div>

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
              placeholder="Create a strong password"
              required
            >
            <small>At least 6 characters recommended</small>
          </div>

          <div class="form-group">
            <label for="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              [(ngModel)]="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              required
            >
          </div>

          <button type="submit" class="btn-primary" [disabled]="loading">
            {{ loading ? 'Creating account...' : 'Sign Up' }}
          </button>
        </form>

        <p class="login-link">
          Already have an account? <a routerLink="/login">Sign in here</a>
        </p>
      </div>
    </div>
  `,
  styles: [`
    .register-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: calc(100vh - 60px - 300px);
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }

    .register-card {
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

    .success-message {
      background: #efe;
      color: #3c3;
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

    small {
      display: block;
      color: #999;
      font-size: 0.8rem;
      margin-top: 5px;
    }

    .btn-primary {
      width: 100%;
      padding: 12px;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
      background: #667eea;
      color: white;
      transition: background 0.3s;
    }

    .btn-primary:hover:not(:disabled) {
      background: #5568d3;
    }

    .btn-primary:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .login-link {
      text-align: center;
      margin-top: 20px;
      color: #999;
    }

    .login-link a {
      color: #667eea;
      text-decoration: none;
      font-weight: bold;
    }

    .login-link a:hover {
      text-decoration: underline;
    }
  `]
})
export class RegisterComponent {
  displayName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  loading: boolean = false;
  error: string = '';
  success: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register() {
    if (!this.displayName || !this.email || !this.password || !this.confirmPassword) {
      this.error = 'Please fill in all fields';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }

    if (this.password.length < 6) {
      this.error = 'Password must be at least 6 characters';
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = '';

    this.authService.registerWithEmail(this.email, this.password, this.displayName)
      .then(() => {
        this.success = 'Account created successfully! Redirecting...';
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1500);
      })
      .catch(error => {
        this.error = error.message || 'Failed to create account. Please try again.';
        this.loading = false;
      });
  }
}
