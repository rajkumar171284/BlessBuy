import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container py-5" *ngIf="product">

  <a routerLink="/products" class="btn btn-link p-0 mb-3">
    ← Back to Products
  </a>

  <div class="card shadow-sm p-4">
    <div class="row g-4">

      <!-- LEFT IMAGE -->
      <div class="col-md-6 text-center">
        <img 
          [src]="product.image" 
          [alt]="product.name" 
          class="img-fluid rounded product-img"
        >
      </div>

      <!-- RIGHT INFO -->
      <div class="col-md-6">

        <h2 class="fw-bold mb-2">{{ product.name }}</h2>
        <p class="text-muted">{{ product.category }}</p>

        <!-- RATING -->
        <div class="d-flex align-items-center mb-3">
          <span class="text-warning fs-4">★★★★★</span>
          <span class="ms-2 text-muted">
            ({{ product.reviews }} reviews)
          </span>
        </div>

        <!-- PRICE + COMMISSION -->
        <div class="border-top border-bottom py-3 mb-3">
          <h3 class="text-primary fw-bold mb-0">₹{{ product.price }}</h3>
          <p class="text-success fw-semibold mt-2">
            Earn <span class="text-success">{{ product.commission }}%</span> commission
          </p>
        </div>

        <!-- DESCRIPTION -->
        <div class="mb-4">
          <h5 class="fw-bold">Description</h5>
          <p class="text-secondary">{{ product.description }}</p>
        </div>

        <!-- FEATURES -->
        <div class="mb-4">
          <h5 class="fw-bold">Features</h5>
          <ul class="list-group list-group-flush">
            <li class="list-group-item" *ngFor="let feature of product.features">
              ✔ {{ feature }}
            </li>
          </ul>
        </div>

        <!-- ACTION BUTTONS -->
        <div class="d-flex gap-3 flex-wrap mt-4">

          <a 
            [href]="product.affiliateLink" 
            target="_blank" 
            class="btn btn-primary btn-lg px-4"
          >
            Buy on Amazon
          </a>

          <button class="btn btn-outline-danger btn-lg px-4">
            ♥ Add to Wishlist
          </button>
        </div>

        <!-- AFFILIATE NOTE -->
        <div class="alert alert-info mt-4">
          <strong>Note:</strong> This is an affiliate product. 
          You pay the same price — BlessBuy earns a small commission.
        </div>

      </div>
    </div>
  </div>
</div>

<!-- LOADER -->
<div *ngIf="isLoading" class="d-flex flex-column align-items-center py-5">
  <div class="spinner-border text-primary" role="status"></div>
  <p class="mt-3 text-primary fw-bold">Loading product...</p>
</div>

<!-- NOT FOUND -->
<div *ngIf="!isLoading && !product" class="text-center py-5 text-muted">
  Product not found
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
.product-img {
  max-height: 400px;
  object-fit: contain;
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
    .product-img {
  max-height: 400px;
  object-fit: contain;
}

.list-group-item {
  border: none;
  padding-left: 0;
}

.btn-lg {
  font-size: 1rem;
  font-weight: 600;
}

.alert-info {
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .product-img {
    max-height: 300px;
  }
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
