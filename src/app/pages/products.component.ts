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
    <div class="products-container">
      <h1>All Products</h1>
      
      <div class="filters">
        <input type="text" placeholder="Search products..." [(ngModel)]="searchTerm" (ngModelChange)="filterProducts()">
        <select [(ngModel)]="selectedCategory" (ngModelChange)="filterProducts()">
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="home">Home & Garden</option>
          <option value="books">Books</option>
        </select>
      </div>

      <div *ngIf="isLoading" class="loader">
        <div class="spinner"></div>
        <p>Loading products...</p>
      </div>

      <div class="products-grid" *ngIf="!isLoading">
        <div class="product-card" *ngFor="let product of filteredProducts">
          <img [src]="product.image" [alt]="product.name">
          <h3>{{ product.name }}</h3>
          <p class="category">{{ product.category }}</p>
          <p class="price">\${{ product.price }}</p>
          <p class="commission">Commission: {{ product.commission }}%</p>
          <a [routerLink]="['/product', product.id]" class="view-btn">View Details</a>
          <a [href]="product.affiliateLink" target="_blank" class="buy-btn">Buy Now</a>
        </div>
      </div>

      <div *ngIf="!isLoading && filteredProducts.length === 0" class="no-products">
        <p>No products found. Try adjusting your filters.</p>
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
