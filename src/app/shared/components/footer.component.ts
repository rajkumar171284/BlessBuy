import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h4>BlessBuy</h4>
            <p>Your trusted affiliate marketplace for great deals and commissions.</p>
          </div>

          <div class="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Products</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          <div class="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Affiliate Disclosure</a></li>
              <li><a href="#">Disclaimer</a></li>
            </ul>
          </div>

          <div class="footer-section">
            <h4>Newsletter</h4>
            <input type="email" placeholder="Enter your email" class="email-input">
            <button class="subscribe-btn">Subscribe</button>
          </div>
        </div>

        <div class="footer-bottom">
          <p>&copy; 2025 BlessBuy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: #222;
      color: white;
      margin-top: 60px;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px;
    }

    .footer-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 30px;
      margin-bottom: 30px;
    }

    .footer-section h4 {
      margin-bottom: 15px;
      color: #667eea;
    }

    .footer-section ul {
      list-style: none;
      padding: 0;
    }

    .footer-section li {
      margin-bottom: 10px;
    }

    .footer-section a {
      color: #ccc;
      text-decoration: none;
      transition: color 0.3s;
    }

    .footer-section a:hover {
      color: #667eea;
    }

    .footer-section p {
      color: #ccc;
      margin: 0;
    }

    .email-input {
      width: 100%;
      padding: 10px;
      border: none;
      border-radius: 4px;
      margin-bottom: 10px;
    }

    .subscribe-btn {
      width: 100%;
      padding: 10px;
      background: #667eea;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
      transition: background 0.3s;
    }

    .subscribe-btn:hover {
      background: #5568d3;
    }

    .footer-bottom {
      text-align: center;
      padding-top: 20px;
      border-top: 1px solid #444;
      color: #999;
    }
  `]
})
export class FooterComponent {}
