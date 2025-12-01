import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div class="container-fluid">
        <a routerLink="/" class="navbar-brand fw-bold" style="color: #667eea; font-size: 1.5rem;">BlessBuy</a>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarContent">
          <ul class="navbar-nav ms-auto gap-2">
            <li class="nav-item">
              <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" class="nav-link">Home</a>
            </li>
            <li class="nav-item">
              <a routerLink="/products" routerLinkActive="active" class="nav-link">Products</a>
            </li>
            <li class="nav-item">
              <a href="#about" class="nav-link">About</a>
            </li>
            <li class="nav-item">
              <a href="#contact" class="nav-link">Contact</a>
            </li>
            
            <li class="nav-item ms-lg-3" *ngIf="isAuthenticated; else notAuthenticated">
              <div class="dropdown">
                <button class="btn btn-sm btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown">
                  👤 {{ userName }}
                </button>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li><a routerLink="/dashboard" class="dropdown-item">Dashboard</a></li>
                  <li><a routerLink="/admin/products" class="dropdown-item">Admin Panel</a></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><a (click)="logout()" class="dropdown-item text-danger cursor-pointer">Logout</a></li>
                </ul>
              </div>
            </li>
            <ng-template #notAuthenticated>
              <li class="nav-item">
                <a routerLink="/login" class="nav-link btn btn-outline-primary btn-sm ms-lg-2">Sign In</a>
              </li>
              <li class="nav-item">
                <a routerLink="/register" class="nav-link btn btn-primary btn-sm ms-2">Sign Up</a>
              </li>
            </ng-template>
          </ul>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .nav-link {
      color: #333 !important;
      font-weight: 500;
      transition: color 0.3s;
    }

    .nav-link:hover,
    .nav-link.active {
      color: #667eea !important;
    }

    .dropdown-item:hover {
      background-color: #f8f9fa;
      color: #667eea;
    }

    .cursor-pointer {
      cursor: pointer;
    }
  `]
})
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean = false;
  userName: string = '';

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

  logout() {
    this.authService.logout();
  }
}
