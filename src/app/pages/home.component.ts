import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="hero">
      <div class="hero-content">
        <h1>Welcome to BlessBuy</h1>
        <p>Discover amazing products and earn rewards</p>
        <a routerLink="/products" class="cta-button">Shop Now</a>
      </div>
    </section>

    <section class="features">
      <div class="feature">
        <h3>Best Deals</h3>
        <p>Find the best prices on top products</p>
      </div>
      <div class="feature">
        <h3>Earn Money</h3>
        <p>Earn commissions on every purchase</p>
      </div>
      <div class="feature">
        <h3>Trusted Partners</h3>
        <p>Shop from trusted affiliate brands</p>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 80px 20px;
      text-align: center;
    }

    .hero-content h1 {
      font-size: 3rem;
      margin-bottom: 10px;
    }

    .hero-content p {
      font-size: 1.2rem;
      margin-bottom: 30px;
    }

    .cta-button {
      display: inline-block;
      background: white;
      color: #667eea;
      padding: 12px 30px;
      border-radius: 50px;
      text-decoration: none;
      font-weight: bold;
      transition: transform 0.3s;
    }

    .cta-button:hover {
      transform: scale(1.05);
    }

    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 30px;
      padding: 60px 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .feature {
      text-align: center;
      padding: 30px;
      border-radius: 8px;
      background: #f5f5f5;
    }

    .feature h3 {
      color: #667eea;
      margin-bottom: 10px;
    }
  `]
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
