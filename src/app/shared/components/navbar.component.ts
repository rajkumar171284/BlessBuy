import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <div class="container">
        <a routerLink="/" class="logo">BlessBuy</a>
        
        <ul class="nav-links">
          <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a></li>
          <li><a routerLink="/products" routerLinkActive="active">Products</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <div class="auth-section">
          <div *ngIf="isAuthenticated; else notAuthenticated">
            <button class="user-menu" (click)="toggleUserMenu()">
              <span class="user-avatar">👤</span>
              <span class="user-name">{{ userName }}</span>
            </button>
            <div *ngIf="showUserMenu" class="user-dropdown">
              <a routerLink="/dashboard">Dashboard</a>
              <a routerLink="/admin/products">Admin Panel</a>
              <a href="#settings">Settings</a>
              <hr>
              <a (click)="logout()" class="logout-btn">Logout</a>
            </div>
          </div>
          <ng-template #notAuthenticated>
            <a routerLink="/login" class="login-btn">Sign In</a>
            <a routerLink="/register" class="signup-btn">Sign Up</a>
          </ng-template>
        </div>

        <button class="menu-toggle" (click)="toggleMenu()">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 60px;
    }

    .logo {
      font-size: 1.5rem;
      font-weight: bold;
      color: #667eea;
      text-decoration: none;
    }

    .nav-links {
      display: flex;
      list-style: none;
      gap: 30px;
      margin: 0;
      padding: 0;
    }

    .nav-links a {
      text-decoration: none;
      color: #333;
      font-weight: 500;
      transition: color 0.3s;
    }

    .nav-links a:hover,
    .nav-links a.active {
      color: #667eea;
    }

    .auth-section {
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .login-btn, .signup-btn {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
      text-decoration: none;
      transition: all 0.3s;
    }

    .login-btn {
      color: #667eea;
      background: transparent;
      border: 1px solid #667eea;
    }

    .login-btn:hover {
      background: #667eea;
      color: white;
    }

    .signup-btn {
      background: #667eea;
      color: white;
    }

    .signup-btn:hover {
      background: #5568d3;
    }

    .user-menu {
      display: flex;
      align-items: center;
      gap: 8px;
      background: #f0f0f0;
      border: 1px solid #ddd;
      padding: 6px 12px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
      color: #333;
      transition: background 0.3s;
      position: relative;
    }

    .user-menu:hover {
      background: #e0e0e0;
    }

    .user-avatar {
      font-size: 1.2rem;
    }

    .user-dropdown {
      position: absolute;
      top: 100%;
      right: 0;
      background: white;
      border: 1px solid #ddd;
      border-radius: 4px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      margin-top: 10px;
      min-width: 150px;
      z-index: 100;
    }

    .user-dropdown a {
      display: block;
      padding: 12px 16px;
      color: #333;
      text-decoration: none;
      border: none;
      background: none;
      cursor: pointer;
      width: 100%;
      text-align: left;
      transition: background 0.3s;
    }

    .user-dropdown a:hover {
      background: #f0f0f0;
      color: #667eea;
    }

    .user-dropdown hr {
      margin: 5px 0;
      border: none;
      border-top: 1px solid #eee;
    }

    .logout-btn {
      color: #c33 !important;
    }

    .logout-btn:hover {
      background: #fee !important;
    }

    .menu-toggle {
      display: none;
      background: none;
      border: none;
      cursor: pointer;
      flex-direction: column;
      gap: 5px;
    }

    .menu-toggle span {
      width: 25px;
      height: 3px;
      background: #333;
      border-radius: 2px;
    }

    @media (max-width: 768px) {
      .nav-links {
        display: none;
      }

      .menu-toggle {
        display: flex;
      }

      .auth-section {
        flex-direction: column;
        gap: 10px;
      }
    }
  `]
})
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean = false;
  userName: string = '';
  showUserMenu: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(user => {
      this.isAuthenticated = !!user;
    });

    this.authService.getUserProfile().subscribe(profile => {
      if (profile) {
        this.userName = profile.displayName || 'User';
      }
    });
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  toggleMenu() {
    // Menu toggle logic will be implemented later for mobile
  }

  logout() {
    this.authService.logout();
    this.showUserMenu = false;
  }
}
