import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService, Product } from '../services/admin.service';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-container">
      <h1>Product Management</h1>
      
      <div class="admin-tabs">
        <button 
          class="tab-btn" 
          [class.active]="activeTab === 'list'"
          (click)="activeTab = 'list'"
        >
          📋 Products List
        </button>
        <button 
          class="tab-btn"
          [class.active]="activeTab === 'add'"
          (click)="activeTab = 'add'"
        >
          ➕ Add Product
        </button>
      </div>

      <!-- Products List Tab -->
      <div *ngIf="activeTab === 'list'" class="tab-content">
        <div class="search-bar">
          <input 
            type="text" 
            placeholder="Search products..." 
            [(ngModel)]="searchTerm"
            (ngModelChange)="filterProducts()"
          >
          <select [(ngModel)]="filterCategory" (ngModelChange)="filterProducts()">
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="home">Home & Garden</option>
            <option value="books">Books</option>
          </select>
        </div>

        <div class="products-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Commission</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let product of filteredProducts">
                <td>{{ product.name }}</td>
                <td>{{ product.category }}</td>
                <td>\${{ product.price }}</td>
                <td>{{ product.commission }}%</td>
                <td>
                  <span class="badge" [class.in-stock]="product.inStock" [class.out-stock]="!product.inStock">
                    {{ product.inStock ? 'In Stock' : 'Out of Stock' }}
                  </span>
                </td>
                <td class="actions">
                  <button class="btn-edit" (click)="editProduct(product)">✏️ Edit</button>
                  <button class="btn-delete" (click)="deleteProduct(product.id!)">🗑️ Delete</button>
                </td>
              </tr>
            </tbody>
          </table>

          <div *ngIf="filteredProducts.length === 0" class="no-products">
            <p>No products found</p>
          </div>
        </div>
      </div>

      <!-- Add/Edit Product Tab -->
      <div *ngIf="activeTab === 'add'" class="tab-content">
        <form (ngSubmit)="saveProduct()" #productForm="ngForm">
          <div class="form-grid">
            <div class="form-group">
              <label for="name">Product Name *</label>
              <input 
                type="text" 
                id="name"
                [(ngModel)]="currentProduct.name" 
                name="name"
                placeholder="Enter product name"
                required
              >
            </div>

            <div class="form-group">
              <label for="price">Price *</label>
              <input 
                type="number" 
                id="price"
                [(ngModel)]="currentProduct.price" 
                name="price"
                placeholder="0.00"
                step="0.01"
                required
              >
            </div>

            <div class="form-group">
              <label for="category">Category *</label>
              <select [(ngModel)]="currentProduct.category" name="category" required>
                <option value="">Select category</option>
                <option value="electronics">Electronics</option>
                <option value="fashion">Fashion</option>
                <option value="home">Home & Garden</option>
                <option value="books">Books</option>
              </select>
            </div>

            <div class="form-group">
              <label for="commission">Commission % *</label>
              <input 
                type="number" 
                id="commission"
                [(ngModel)]="currentProduct.commission" 
                name="commission"
                placeholder="5"
                step="0.1"
                required
              >
            </div>

            <div class="form-group">
              <label for="image">Image URL *</label>
              <input 
                type="url" 
                id="image"
                [(ngModel)]="currentProduct.image" 
                name="image"
                placeholder="https://example.com/image.jpg"
                required
              >
              <small>Preview:</small>
              <img *ngIf="currentProduct.image" [src]="currentProduct.image" class="image-preview" alt="Preview">
            </div>

            <div class="form-group">
              <label for="affiliateLink">Affiliate Link *</label>
              <input 
                type="url" 
                id="affiliateLink"
                [(ngModel)]="currentProduct.affiliateLink" 
                name="affiliateLink"
                placeholder="https://amazon.com/..."
                required
              >
            </div>

            <div class="form-group">
              <label for="rating">Rating</label>
              <input 
                type="number" 
                id="rating"
                [(ngModel)]="currentProduct.rating" 
                name="rating"
                min="0"
                max="5"
                step="0.1"
              >
            </div>

            <div class="form-group">
              <label for="reviews">Number of Reviews</label>
              <input 
                type="number" 
                id="reviews"
                [(ngModel)]="currentProduct.reviews" 
                name="reviews"
                min="0"
              >
            </div>

            <div class="form-group checkbox">
              <input 
                type="checkbox" 
                id="inStock"
                [(ngModel)]="currentProduct.inStock" 
                name="inStock"
              >
              <label for="inStock">In Stock</label>
            </div>

            <div class="form-group full-width">
              <label for="description">Description</label>
              <textarea 
                id="description"
                [(ngModel)]="currentProduct.description" 
                name="description"
                placeholder="Enter product description"
                rows="4"
              ></textarea>
            </div>

            <div class="form-group full-width">
              <label for="features">Features (comma-separated)</label>
              <textarea 
                id="features"
                [(ngModel)]="featuresString" 
                name="features"
                placeholder="Feature 1, Feature 2, Feature 3"
                rows="3"
              ></textarea>
            </div>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn-primary" [disabled]="saving">
              {{ saving ? 'Saving...' : (currentProduct.id ? 'Update Product' : 'Add Product') }}
            </button>
            <button type="button" class="btn-secondary" (click)="resetForm()">Cancel</button>
          </div>

          <div *ngIf="message" class="message" [class.success]="messageType === 'success'">
            {{ message }}
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .admin-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px;
    }

    h1 {
      color: #333;
      margin-bottom: 30px;
    }

    .admin-tabs {
      display: flex;
      gap: 10px;
      margin-bottom: 30px;
      border-bottom: 2px solid #eee;
    }

    .tab-btn {
      padding: 12px 20px;
      border: none;
      background: white;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 500;
      color: #999;
      border-bottom: 3px solid transparent;
      transition: all 0.3s;
    }

    .tab-btn.active {
      color: #667eea;
      border-bottom-color: #667eea;
    }

    .tab-btn:hover {
      color: #667eea;
    }

    .tab-content {
      background: white;
      border: 1px solid #eee;
      border-radius: 8px;
      padding: 30px;
    }

    .search-bar {
      display: flex;
      gap: 15px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }

    .search-bar input, .search-bar select {
      flex: 1;
      min-width: 200px;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }

    .products-table {
      overflow-x: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th, td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #eee;
    }

    th {
      background: #f5f5f5;
      font-weight: bold;
      color: #333;
    }

    tr:hover {
      background: #fafafa;
    }

    .badge {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.85rem;
      font-weight: bold;
    }

    .badge.in-stock {
      background: #efe;
      color: #3c3;
    }

    .badge.out-stock {
      background: #fee;
      color: #c33;
    }

    .actions {
      display: flex;
      gap: 10px;
    }

    .btn-edit, .btn-delete {
      padding: 6px 12px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
      font-size: 0.9rem;
      transition: all 0.3s;
    }

    .btn-edit {
      background: #667eea;
      color: white;
    }

    .btn-edit:hover {
      background: #5568d3;
    }

    .btn-delete {
      background: #fee;
      color: #c33;
    }

    .btn-delete:hover {
      background: #fdd;
    }

    .no-products {
      text-align: center;
      padding: 40px;
      color: #999;
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 20px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
    }

    .form-group.full-width {
      grid-column: 1 / -1;
    }

    .form-group.checkbox {
      flex-direction: row;
      align-items: center;
    }

    .form-group.checkbox input {
      width: auto;
      margin-right: 10px;
    }

    .form-group.checkbox label {
      margin: 0;
    }

    label {
      margin-bottom: 8px;
      font-weight: 500;
      color: #333;
    }

    input, select, textarea {
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      font-family: inherit;
    }

    input:focus, select:focus, textarea:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .image-preview {
      max-width: 100%;
      max-height: 200px;
      margin-top: 10px;
      border-radius: 4px;
    }

    small {
      font-size: 0.85rem;
      color: #999;
      margin-top: 5px;
    }

    .form-actions {
      display: flex;
      gap: 10px;
      margin-top: 30px;
    }

    .btn-primary, .btn-secondary {
      padding: 12px 30px;
      border: none;
      border-radius: 4px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s;
    }

    .btn-primary {
      background: #667eea;
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      background: #5568d3;
    }

    .btn-primary:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .btn-secondary {
      background: #f0f0f0;
      color: #333;
    }

    .btn-secondary:hover {
      background: #e0e0e0;
    }

    .message {
      margin-top: 20px;
      padding: 15px;
      border-radius: 4px;
      background: #fee;
      color: #c33;
    }

    .message.success {
      background: #efe;
      color: #3c3;
    }

    @media (max-width: 768px) {
      .admin-container {
        padding: 20px 10px;
      }

      .form-grid {
        grid-template-columns: 1fr;
      }

      table {
        font-size: 0.9rem;
      }

      th, td {
        padding: 8px;
      }
    }
  `]
})
export class AdminProductsComponent implements OnInit {
  activeTab: 'list' | 'add' = 'list';
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  filterCategory: string = '';
  currentProduct: Product = this.getEmptyProduct();
  featuresString: string = '';
  saving: boolean = false;
  message: string = '';
  messageType: 'success' | 'error' = 'success';

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.adminService.getProducts().subscribe(products => {
      this.products = products;
      this.filterProducts();
    });
  }

  filterProducts() {
    this.filteredProducts = this.products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = !this.filterCategory || p.category === this.filterCategory;
      return matchesSearch && matchesCategory;
    });
  }

  editProduct(product: Product) {
    this.currentProduct = { ...product };
    this.featuresString = product.features.join(', ');
    this.activeTab = 'add';
  }

  async saveProduct() {
    if (!this.currentProduct.name || !this.currentProduct.price || !this.currentProduct.category) {
      this.message = 'Please fill in all required fields';
      this.messageType = 'error';
      return;
    }

    this.saving = true;
    this.message = '';

    try {
      this.currentProduct.features = this.featuresString
        .split(',')
        .map(f => f.trim())
        .filter(f => f.length > 0);

      if (this.currentProduct.id) {
        await this.adminService.updateProduct(this.currentProduct.id, this.currentProduct);
        this.message = 'Product updated successfully!';
      } else {
        await this.adminService.addProduct(this.currentProduct);
        this.message = 'Product added successfully!';
      }

      this.messageType = 'success';
      setTimeout(() => {
        this.resetForm();
        this.activeTab = 'list';
      }, 1500);
    } catch (error) {
      this.message = 'Error saving product. Please try again.';
      this.messageType = 'error';
    } finally {
      this.saving = false;
    }
  }

  async deleteProduct(id: string) {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await this.adminService.deleteProduct(id);
        this.message = 'Product deleted successfully!';
        this.messageType = 'success';
      } catch (error) {
        this.message = 'Error deleting product. Please try again.';
        this.messageType = 'error';
      }
    }
  }

  resetForm() {
    this.currentProduct = this.getEmptyProduct();
    this.featuresString = '';
    this.message = '';
  }

  private getEmptyProduct(): Product {
    return {
      name: '',
      price: 0,
      category: '',
      image: '',
      affiliateLink: '',
      commission: 5,
      description: '',
      features: [],
      reviews: 0,
      rating: 5,
      inStock: true
    };
  }
}
