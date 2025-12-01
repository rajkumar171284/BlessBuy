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
    <div class="container py-5">

  <!-- TRENDING SECTION -->
  <div class="d-flex justify-content-between align-items-center mb-3">
    <h2 class="section-title">🔥 Trending Now</h2>
    <button class="btn btn-outline-primary btn-sm" (click)="viewTrending()">View All</button>
  </div>

  <div class="scroll-container mb-5">
    <div class="scroll-item" *ngFor="let t of trendingProducts" 
         [routerLink]="['/product', t.id]">
      <div class="trend-card shadow-sm border border-primary rounded-3">
        <img [src]="t.image" class="trend-img">
        <p class="trend-name">{{ t.name }}</p>
        <p class="trend-price">₹{{ t.price }}</p>
        <span class="badge bg-success small-badge">{{ t.commission }}% Commission</span>
      </div>
    </div>
  </div>

  <!-- FEATURED SECTION -->
  <div class="d-flex justify-content-between align-items-center mb-3 mt-5">
    <h2 class="section-title">⭐ Featured Products</h2>
    <button class="btn btn-outline-primary btn-sm" (click)="viewFeatured()">View All</button>
  </div>

  <div class="scroll-container mb-5">
    <div class="scroll-item" *ngFor="let f of featuredProducts"
         [routerLink]="['/product', f.id]">
      <div class="trend-card shadow-sm border border-primary rounded-3">
        <img [src]="f.image" class="trend-img">
        <p class="trend-name">{{ f.name }}</p>
        <p class="trend-price">₹{{ f.price }}</p>
        <span class="badge bg-success small-badge">{{ f.commission }}% Commission</span>
      </div>
    </div>
  </div>

<h2 class="text-center mb-4">All Products</h2>

<div class="row g-3">

  <!-- SIDEBAR FILTERS -->
  <div class="col-12 col-md-3">
    <div class="filter-box shadow-sm border border-secondary rounded-3">

      <h5 class="filter-title">Filters</h5>

      <label class="form-label mt-2">Search</label>
      <input class="form-control" [(ngModel)]="searchTerm" (ngModelChange)="filterProducts()">

      <label class="form-label mt-3">Category</label>
      <select class="form-select" [(ngModel)]="selectedCategory" (ngModelChange)="filterProducts()">
        <option value="">All</option>
        <option value="electronics">Electronics</option>
        <option value="fashion">Fashion</option>
        <option value="home">Home & Garden</option>
      </select>

      <label class="form-label mt-3">Price Range</label>
      <select class="form-select" [(ngModel)]="priceRange" (change)="filterProducts()">
        <option value="">Any</option>
        <option value="0-499">₹0 - ₹499</option>
        <option value="500-999">₹500 - ₹999</option>
        <option value="1000-5000">₹1000 - ₹5000</option>
      </select>

      <label class="form-label mt-3">Sort By</label>
      <select class="form-select" [(ngModel)]="sortOption" (change)="sortProducts()">
        <option value="">Default</option>
        <option value="price_low">Price: Low to High</option>
        <option value="price_high">Price: High to Low</option>
        <option value="commission_high">Commission: High %</option>
      </select>

    </div>
  </div>

  <!-- PRODUCT GRID -->
  <div class="col-12 col-md-9">
    <div class="row g-3">
      <div class="col-12 col-sm-6 col-lg-4 col-xl-3" *ngFor="let product of filteredProducts">
        <div class="card h-100 shadow-sm hover-shadow border border-primary rounded-3">
          <img [src]="product.image" class="card-img-top">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="text-muted small">{{ product.category }}</p>

            <p class="price-tag">₹{{ product.price }}</p>
            <p class="small">Commission: 
              <span class="badge bg-success">{{ product.commission }}%</span>
            </p>

            <div class="mt-auto d-grid gap-2">
              <a [routerLink]="['/product', product.id]" class="btn btn-outline-primary btn-sm">View Details</a>
              <a [href]="product.affiliateLink" target="_blank" class="btn btn-primary btn-sm">Buy Now</a>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div *ngIf="filteredProducts.length === 0" class="text-center py-5">
      <p class="text-muted">No products found.</p>
    </div>

  </div>
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
      transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      will-change: box-shadow, transform;
    }
    
    .hover-shadow:hover {
      box-shadow: 0 8px 16px rgba(0,0,0,0.15) !important;
    }

    .card-img-top {
      transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      will-change: transform;
    }

    .card:hover .card-img-top {
      transform: scale(1.05);
    }

    .section-title {
  font-weight: 700;
  font-size: 1.6rem;
  color: #333;
}
/* Horizontal Scroll */
.scroll-container {
  display: flex;
  overflow-x: auto;
  gap: 20px;
  padding-bottom: 5px;
}

.scroll-container::-webkit-scrollbar {
  height: 8px;
}

.scroll-container::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 10px;
}

.scroll-item {
  min-width: 180px;
  cursor: pointer;
}

.trend-card {
  border-radius: 12px;
  padding: 15px;
  background: #fff;
  text-align: center;
  transition: 0.25s ease;
}

.trend-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.15);
}

.trend-img {
  width: 100%;
  height: 140px;
  object-fit: contain;
}

.trend-name {
  margin-top: 10px;
  font-size: 0.95rem;
  font-weight: 600;
}

.trend-price {
  font-size: 1rem;
  font-weight: 700;
  color: #007bff;
}
.small-badge {
  font-size: 0.75rem;
  margin-top: 5px;
}

/* Filters */
.filter-box {
  padding: 20px;
  border-radius: 12px;
  background: #fff;
}

.filter-title {
  font-weight: 600;
  border-bottom: 2px solid #eee;
  padding-bottom: 5px;
}

/* Product Price */
.price-tag {
  font-size: 1.25rem;
  font-weight: 700;
  color: #007bff;
}


  `]
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  searchTerm: string = '';
  selectedCategory: string = '';
  isLoading: boolean = true;
  trendingProducts: any = [];
  featuredProducts: any = [];
  sortOption = '';
  priceRange = '';

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProductsObservable().subscribe(products => {
      this.products = products;

      this.trendingProducts = products.slice(0, 6);
      this.featuredProducts = products.slice(6, 12);

      this.filterProducts();
      this.isLoading = false;
    });
  }

  filterProducts() {
  this.filteredProducts = this.products.filter(product => {
    
    // Search Filter
    const matchesSearch =
      !this.searchTerm ||
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase());

    // Category Filter
    const matchesCategory =
      !this.selectedCategory ||
      product.category === this.selectedCategory;

    // Price Range Filter
    const matchesPrice =
      !this.priceRange ||
      (
        product.price >= +this.priceRange.split('-')[0] &&
        product.price <= +this.priceRange.split('-')[1]
      );

    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Apply sorting separately
  this.sortProducts();
}

  sortProducts() {
    if (this.sortOption === 'price_low') {
      this.filteredProducts.sort((a, b) => a.price - b.price);
    }
    else if (this.sortOption === 'price_high') {
      this.filteredProducts.sort((a, b) => b.price - a.price);
    }
    else if (this.sortOption === 'commission_high') {
      this.filteredProducts.sort((a, b) => b.commission - a.commission);
    }
  }
  viewTrending() {
  this.filteredProducts = this.trendingProducts;
}

viewFeatured() {
  this.filteredProducts = this.featuredProducts;
}
}
