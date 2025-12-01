import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="product-detail-container" *ngIf="product">
      <a routerLink="/products" class="back-link">← Back to Products</a>
      
      <div class="product-detail">
        <div class="product-image">
          <img [src]="product.image" [alt]="product.name">
        </div>

        <div class="product-info">
          <h1>{{ product.name }}</h1>
          <p class="category">{{ product.category }}</p>
          
          <div class="rating">
            <span class="stars">★★★★★</span>
            <span class="rating-text">({{ product.reviews }} reviews)</span>
          </div>

          <div class="price-section">
            <p class="price">\${{ product.price }}</p>
            <p class="commission">Earn {{ product.commission }}% commission</p>
          </div>

          <div class="description">
            <h3>Description</h3>
            <p>{{ product.description }}</p>
          </div>

          <div class="features">
            <h3>Features</h3>
            <ul>
              <li *ngFor="let feature of product.features">{{ feature }}</li>
            </ul>
          </div>

          <div class="actions">
            <a [href]="product.affiliateLink" target="_blank" class="buy-btn">Buy on Amazon</a>
            <button class="add-to-wishlist">♥ Add to Wishlist</button>
          </div>

          <div class="affiliate-info">
            <p><strong>Note:</strong> This is an affiliate link. We earn a commission when you make a purchase, at no extra cost to you.</p>
          </div>
        </div>
      </div>
    </div>

    <div *ngIf="isLoading" class="loader">
      <div class="spinner"></div>
      <p>Loading product...</p>
    </div>

    <div *ngIf="!isLoading && !product" class="loading">
      <p>Product not found</p>
    </div>
  `,
  styles: [`
    .product-detail-container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 40px 20px;
    }

    .back-link {
      color: #667eea;
      text-decoration: none;
      margin-bottom: 20px;
      display: inline-block;
      font-weight: bold;
    }

    .back-link:hover {
      text-decoration: underline;
    }

    .product-detail {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      background: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .product-image img {
      width: 100%;
      border-radius: 8px;
    }

    .product-info h1 {
      font-size: 2rem;
      margin-bottom: 10px;
      color: #333;
    }

    .category {
      color: #999;
      margin-bottom: 15px;
    }

    .rating {
      margin-bottom: 20px;
    }

    .stars {
      font-size: 1.5rem;
      color: #f39c12;
    }

    .rating-text {
      margin-left: 10px;
      color: #666;
    }

    .price-section {
      margin: 20px 0;
      padding: 20px 0;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
    }

    .price {
      font-size: 2rem;
      font-weight: bold;
      color: #667eea;
      margin: 0;
    }

    .commission {
      color: #f39c12;
      font-weight: bold;
      margin: 10px 0 0 0;
    }

    .description, .features {
      margin: 20px 0;
    }

    .features ul {
      list-style: none;
      padding: 0;
    }

    .features li {
      padding: 8px 0;
      border-bottom: 1px solid #eee;
    }

    .actions {
      display: flex;
      gap: 10px;
      margin: 30px 0;
      flex-wrap: wrap;
    }

    .buy-btn, .add-to-wishlist {
      flex: 1;
      min-width: 150px;
      padding: 15px;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.3s;
    }

    .buy-btn {
      background: #667eea;
      color: white;
      text-decoration: none;
      text-align: center;
    }

    .buy-btn:hover {
      background: #5568d3;
    }

    .add-to-wishlist {
      background: #f0f0f0;
      color: #333;
    }

    .add-to-wishlist:hover {
      background: #e0e0e0;
    }

    .affiliate-info {
      background: #f0f7ff;
      border-left: 4px solid #667eea;
      padding: 15px;
      border-radius: 4px;
      color: #333;
      font-size: 0.9rem;
    }

    .loading {
      text-align: center;
      padding: 40px;
      color: #999;
    }

    .loader {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 100px 20px;
    }

    .spinner {
      width: 60px;
      height: 60px;
      border: 4px solid #f0f0f0;
      border-top: 4px solid #667eea;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 20px;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .loader p {
      color: #667eea;
      font-weight: bold;
      font-size: 1.1rem;
    }
  `]
})
export class ProductDetailComponent implements OnInit {
  product: any;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.route.params.subscribe(params => {
      const productId = params['id'];
      this.productService.getProductById(productId).subscribe(
        (product) => {
          this.product = product;
          this.isLoading = false;
        },
        (error) => {
          console.error('Error loading product:', error);
          this.product = undefined;
          this.isLoading = false;
        }
      );
    });
  }
}
