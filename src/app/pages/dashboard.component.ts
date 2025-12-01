import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, UserProfile } from '../services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <div class="dashboard-header">
        <div class="header-content">
          <h1>Welcome, {{ userProfile?.displayName }}!</h1>
          <p>Manage your affiliate account and track your earnings</p>
        </div>
        <button (click)="logout()" class="btn-logout">Logout</button>
      </div>

      <div class="dashboard-grid">
        <!-- Stats Cards -->
        <div class="stats-section">
          <div class="stat-card">
            <div class="stat-icon">📊</div>
            <div class="stat-content">
              <p class="stat-label">Total Clicks</p>
              <p class="stat-value">{{ userProfile?.totalClicks || 0 }}</p>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">💰</div>
            <div class="stat-content">
              <p class="stat-label">Total Earnings</p>
              <p class="stat-value">\${{ userProfile?.totalEarnings || 0 }}</p>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">🎯</div>
            <div class="stat-content">
              <p class="stat-label">Conversion Rate</p>
              <p class="stat-value">{{ conversionRate }}%</p>
            </div>
          </div>
        </div>

        <!-- Referral Code -->
        <div class="referral-section">
          <h2>Your Referral Code</h2>
          <div class="referral-code-box">
            <code>{{ userProfile?.referralCode }}</code>
            <button (click)="copyToClipboard()" class="btn-copy">📋 Copy</button>
          </div>
          <p class="referral-info">Share this code to earn commission from referrals</p>
        </div>

        <!-- Profile Info -->
        <div class="profile-section">
          <h2>Profile Information</h2>
          <div class="profile-info">
            <div class="info-row">
              <span class="label">Display Name:</span>
              <span class="value">{{ userProfile?.displayName }}</span>
            </div>
            <div class="info-row">
              <span class="label">Email:</span>
              <span class="value">{{ userProfile?.email }}</span>
            </div>
            <div class="info-row">
              <span class="label">Member Since:</span>
              <span class="value">{{ userProfile?.createdAt | date: 'short' }}</span>
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="activity-section">
          <h2>Recent Activity</h2>
          <div class="activity-list">
            <div class="activity-item">
              <p>No recent activity yet</p>
              <a href="#" class="link">Start shopping</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="quick-actions">
        <a href="/products" class="action-btn">
          <span class="icon">🛍️</span>
          <span>Browse Products</span>
        </a>
        <a href="#" class="action-btn">
          <span class="icon">📈</span>
          <span>View Analytics</span>
        </a>
        <a href="#" class="action-btn">
          <span class="icon">💳</span>
          <span>Payment Settings</span>
        </a>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px;
    }

    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 40px;
      padding: 30px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 8px;
      color: white;
    }

    .header-content h1 {
      margin: 0 0 10px 0;
      font-size: 2rem;
    }

    .header-content p {
      margin: 0;
      opacity: 0.9;
    }

    .btn-logout {
      background: white;
      color: #667eea;
      border: none;
      padding: 10px 20px;
      border-radius: 4px;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.3s;
    }

    .btn-logout:hover {
      background: #f0f0f0;
    }

    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
      margin-bottom: 40px;
    }

    .stats-section {
      grid-column: 1 / -1;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
    }

    .stat-card {
      background: white;
      border: 1px solid #eee;
      border-radius: 8px;
      padding: 20px;
      display: flex;
      align-items: center;
      gap: 20px;
      transition: transform 0.3s, box-shadow 0.3s;
    }

    .stat-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .stat-icon {
      font-size: 2.5rem;
    }

    .stat-label {
      margin: 0;
      color: #999;
      font-size: 0.9rem;
    }

    .stat-value {
      margin: 10px 0 0 0;
      font-size: 2rem;
      font-weight: bold;
      color: #667eea;
    }

    .referral-section, .profile-section, .activity-section {
      background: white;
      border: 1px solid #eee;
      border-radius: 8px;
      padding: 30px;
    }

    h2 {
      margin: 0 0 20px 0;
      color: #333;
      font-size: 1.3rem;
    }

    .referral-code-box {
      background: #f5f5f5;
      border: 2px dashed #667eea;
      border-radius: 8px;
      padding: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
    }

    code {
      font-family: monospace;
      font-size: 1.2rem;
      color: #667eea;
      font-weight: bold;
    }

    .btn-copy {
      background: #667eea;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
      transition: background 0.3s;
    }

    .btn-copy:hover {
      background: #5568d3;
    }

    .referral-info {
      color: #999;
      font-size: 0.9rem;
      margin: 0;
    }

    .profile-info {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .info-row {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #eee;
    }

    .label {
      color: #999;
      font-weight: 500;
    }

    .value {
      color: #333;
      font-weight: bold;
    }

    .activity-list {
      background: #f9f9f9;
      border-radius: 4px;
      padding: 20px;
      text-align: center;
      color: #999;
    }

    .activity-item p {
      margin: 0 0 10px 0;
    }

    .link {
      color: #667eea;
      text-decoration: none;
      font-weight: bold;
    }

    .link:hover {
      text-decoration: underline;
    }

    .quick-actions {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 15px;
    }

    .action-btn {
      background: white;
      border: 2px solid #667eea;
      color: #667eea;
      padding: 20px;
      border-radius: 8px;
      text-decoration: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
      font-weight: bold;
      transition: all 0.3s;
    }

    .action-btn:hover {
      background: #667eea;
      color: white;
    }

    .icon {
      font-size: 2rem;
    }

    @media (max-width: 768px) {
      .dashboard-header {
        flex-direction: column;
        text-align: center;
        gap: 20px;
      }

      .stats-section {
        grid-template-columns: 1fr;
      }

      .referral-code-box {
        flex-direction: column;
        gap: 15px;
        text-align: center;
      }
    }
  `]
})
export class DashboardComponent implements OnInit, OnDestroy {
  userProfile: UserProfile | null = null;
  conversionRate: number = 0;
  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.getUserProfile()
      .pipe(takeUntil(this.destroy$))
      .subscribe(profile => {
        this.userProfile = profile;
        if (profile) {
          this.calculateConversionRate();
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private calculateConversionRate() {
    // Placeholder calculation - in production, fetch actual conversion data
    const clicks = this.userProfile?.totalClicks || 0;
    const conversions = Math.floor(clicks * 0.15); // Assume 15% conversion rate
    this.conversionRate = clicks > 0 ? Math.round((conversions / clicks) * 100) : 0;
  }

  copyToClipboard() {
    if (this.userProfile?.referralCode) {
      navigator.clipboard.writeText(this.userProfile.referralCode).then(() => {
        alert('Referral code copied to clipboard!');
      });
    }
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/']);
    });
  }
}
