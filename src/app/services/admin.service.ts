import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc, Query, query, where, QueryConstraint } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';

export interface Product {
  id?: string;
  name: string;
  price: number;
  category: string;
  image: string;
  affiliateLink: string;
  commission: number;
  description: string;
  features: string[];
  reviews: number;
  rating: number;
  inStock: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private productsCollection = 'products';
  private products$ = new BehaviorSubject<Product[]>([]);

  constructor(private firestore: Firestore) {
    this.loadProducts();
  }

  // Load all products from Firestore
  loadProducts(): void {
    getDocs(collection(this.firestore, this.productsCollection)).then(snapshot => {
      const products: Product[] = [];
      snapshot.forEach(doc => {
        products.push({
          id: doc.id,
          ...doc.data() as Product
        });
      });
      this.products$.next(products);
    }).catch(error => {
      console.error('Error loading products:', error);
    });
  }

  // Get products as observable
  getProducts(): Observable<Product[]> {
    return this.products$.asObservable();
  }

  // Get single product by ID
  async getProductById(id: string): Promise<Product | null> {
    try {
      const docRef = doc(this.firestore, this.productsCollection, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data() as Product
        };
      }
      return null;
    } catch (error) {
      console.error('Error getting product:', error);
      return null;
    }
  }

  // Add new product
  async addProduct(product: Product): Promise<string> {
    try {
      const docRef = await addDoc(collection(this.firestore, this.productsCollection), {
        ...product,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      this.loadProducts(); // Reload products
      return docRef.id;
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  }

  // Update product
  async updateProduct(id: string, product: Partial<Product>): Promise<void> {
    try {
      const docRef = doc(this.firestore, this.productsCollection, id);
      await updateDoc(docRef, {
        ...product,
        updatedAt: new Date()
      });
      this.loadProducts(); // Reload products
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  // Delete product
  async deleteProduct(id: string): Promise<void> {
    try {
      const docRef = doc(this.firestore, this.productsCollection, id);
      await deleteDoc(docRef);
      this.loadProducts(); // Reload products
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }

  // Search products by name or category
  async searchProducts(searchQuery: string, category?: string): Promise<Product[]> {
    try {
      let q: Query;
      if (category) {
        q = query(collection(this.firestore, this.productsCollection), where('category', '==', category));
      } else {
        q = query(collection(this.firestore, this.productsCollection));
      }
      
      const snapshot = await getDocs(q);
      const products: Product[] = [];
      
      snapshot.forEach(doc => {
        const product = { id: doc.id, ...doc.data() as Product };
        if (!searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
          products.push(product);
        }
      });
      
      return products;
    } catch (error) {
      console.error('Error searching products:', error);
      return [];
    }
  }

  // Get products by category
  async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      const q = query(collection(this.firestore, this.productsCollection), where('category', '==', category));
      const snapshot = await getDocs(q);
      const products: Product[] = [];
      
      snapshot.forEach(doc => {
        products.push({
          id: doc.id,
          ...doc.data() as Product
        });
      });
      
      return products;
    } catch (error) {
      console.error('Error getting products by category:', error);
      return [];
    }
  }

  // Bulk add products
  async bulkAddProducts(products: Product[]): Promise<void> {
    try {
      const batch = [];
      for (const product of products) {
        batch.push(addDoc(collection(this.firestore, this.productsCollection), {
          ...product,
          createdAt: new Date(),
          updatedAt: new Date()
        }));
      }
      await Promise.all(batch);
      this.loadProducts(); // Reload products
    } catch (error) {
      console.error('Error bulk adding products:', error);
      throw error;
    }
  }
}
