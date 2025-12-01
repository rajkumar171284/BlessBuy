import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="container-fluid py-5">
      <h1 class="text-center mb-4">All Products</h1>
      
      <div class="row mb-4 g-2">
        <div class="col-12 col-md-6">
          <input type="text" class="form-control" placeholder="Search products..." [(ngModel)]="searchTerm" (ngModelChange)="filterProducts()">
        </div>
        <div class="col-12 col-md-6">
          <select class="form-select" [(ngModel)]="selectedCategory" (ngModelChange)="filterProducts()">
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="home">Home & Garden</option>
            <option value="books">Books</option>
          </select>
        </div>
      </div>

      <div *ngIf="isLoading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-2">Loading products...</p>
      </div>

      <div class="row g-3" *ngIf="!isLoading">
        <div class="col-12 col-sm-6 col-lg-4 col-xl-3" *ngFor="let product of filteredProducts">
          <div class="card h-100 shadow-sm hover-shadow">
            <img [src]="product.image" class="card-img-top" [alt]="product.name" style="height: 200px; object-fit: cover;">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">{{ product.name }}</h5>
              <p class="card-text text-muted small">{{ product.category }}</p>
              <p class="card-text fw-bold text-primary">\${{ product.price }}</p>
              <p class="card-text small">Commission: <span class="badge bg-success">{{ product.commission }}%</span></p>
              <div class="mt-auto d-grid gap-2">
                <a [routerLink]="['/product', product.id]" class="btn btn-outline-primary btn-sm">View Details</a>
                <a [href]="product.affiliateLink" target="_blank" class="btn btn-primary btn-sm">Buy Now</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div *ngIf="!isLoading && filteredProducts.length === 0" class="text-center py-5">
        <p class="text-muted">No products found. Try adjusting your filters.</p>
      </div>
    </div>
  `,
  styles: [`
    .products-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px;
    }

    h1 {
      text-align: center;
      margin-bottom: 30px;
      color: #333;
    }

    .filters {
      display: flex;
      gap: 15px;
      margin-bottom: 30px;
      flex-wrap: wrap;
    }

    input, select {
      flex: 1;
      min-width: 200px;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
    }

    .product-card {
      background: white;
      border: 1px solid #eee;
      border-radius: 8px;
      overflow: hidden;
      transition: transform 0.3s, box-shadow 0.3s;
    }

    .product-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .product-card img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .product-card h3 {
      padding: 15px;
      margin: 0;
      font-size: 1.1rem;
      color: #333;
    }

    .category {
      padding: 0 15px;
      font-size: 0.9rem;
      color: #999;
      margin: 0;
    }

    .price {
      padding: 10px 15px;
      font-size: 1.5rem;
      font-weight: bold;
      color: #667eea;
      margin: 0;
    }

    .commission {
      padding: 0 15px;
      font-size: 0.9rem;
      color: #f39c12;
      margin: 0;
    }

    .view-btn, .buy-btn {
      display: block;
      padding: 10px 15px;
      text-align: center;
      text-decoration: none;
      font-size: 0.9rem;
      transition: background 0.3s;
      border: none;
      cursor: pointer;
    }

    .view-btn {
      color: #667eea;
      background: #f0f0f0;
    }

    .view-btn:hover {
      background: #e0e0e0;
    }

    .buy-btn {
      color: white;
      background: #667eea;
      margin-top: 5px;
    }

    .buy-btn:hover {
      background: #5568d3;
    }

    .no-products {
      text-align: center;
      padding: 40px;
      color: #999;
    }

    .loader {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 60px 20px;
    }

    .spinner {
      width: 50px;
      height: 50px;
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

    .hover-shadow {
      transition: box-shadow 0.3s ease;
    }
    
    .hover-shadow:hover {
      box-shadow: 0 8px 16px rgba(0,0,0,0.15) !important;
      transform: translateY(-5px);
    }

    .card-img-top {
      transition: transform 0.3s;
    }

    .card:hover .card-img-top {
      transform: scale(1.05);
    }
  `]
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  searchTerm: string = '';
  selectedCategory: string = '';
  isLoading: boolean = true;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.isLoading = true;
    this.productService.getProductsObservable().subscribe(products => {
      this.products = products;
      this.filterProducts();
      this.isLoading = false;
    });
  }

  filterProducts() {
    this.filteredProducts = this.products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = !this.selectedCategory || product.category === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }
}
