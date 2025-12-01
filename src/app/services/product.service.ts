import { Injectable } from '@angular/core';
import { AdminService, Product } from './admin.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private adminService: AdminService) {}

  getProducts(): Product[] {
    // In a real scenario, you'd use async/await or observables
    // For now, we'll fetch from the admin service
    let products: Product[] = [];
    this.adminService.getProducts().subscribe(p => {
      products = p;
    });
    return products;
  }

  getProductsObservable(): Observable<Product[]> {
    return this.adminService.getProducts();
  }

  getProductById(id: string): Product | undefined {
    let product: Product | undefined;
    this.adminService.getProductById(id).then(p => {
      product = p || undefined;
    });
    return product;
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return new Observable(observer => {
      this.adminService.getProductsByCategory(category).then(products => {
        observer.next(products);
        observer.complete();
      }).catch(error => {
        observer.error(error);
      });
    });
  }

  searchProducts(term: string): Observable<Product[]> {
    return new Observable(observer => {
      this.adminService.searchProducts(term).then(products => {
        observer.next(products);
        observer.complete();
      }).catch(error => {
        observer.error(error);
      });
    });
  }
}
