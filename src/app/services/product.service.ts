import { Injectable } from '@angular/core';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  affiliateLink: string;
  commission: number;
  description: string;
  features: string[];
  reviews: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: '1',
      name: 'Wireless Bluetooth Headphones',
      price: 79.99,
      category: 'electronics',
      image: 'https://via.placeholder.com/300x200?text=Headphones',
      affiliateLink: 'https://amazon.com/dp/example1',
      commission: 5,
      description: 'Premium wireless headphones with noise cancellation and 30-hour battery life.',
      features: ['Noise Cancellation', 'Bluetooth 5.0', '30hr Battery', 'Premium Sound'],
      reviews: 1250
    },
    {
      id: '2',
      name: 'USB-C Fast Charger',
      price: 29.99,
      category: 'electronics',
      image: 'https://via.placeholder.com/300x200?text=Charger',
      affiliateLink: 'https://amazon.com/dp/example2',
      commission: 8,
      description: 'Fast 65W USB-C charger compatible with all devices.',
      features: ['65W Power', 'Universal Compatible', 'Compact Design', 'Safety Features'],
      reviews: 892
    },
    {
      id: '3',
      name: 'Casual Cotton T-Shirt',
      price: 24.99,
      category: 'fashion',
      image: 'https://via.placeholder.com/300x200?text=TShirt',
      affiliateLink: 'https://amazon.com/dp/example3',
      commission: 10,
      description: 'Premium quality cotton t-shirt available in multiple colors.',
      features: ['100% Cotton', 'Machine Washable', 'Available in 10 Colors', 'Unisex'],
      reviews: 567
    },
    {
      id: '4',
      name: 'Stainless Steel Water Bottle',
      price: 34.99,
      category: 'home',
      image: 'https://via.placeholder.com/300x200?text=WaterBottle',
      affiliateLink: 'https://amazon.com/dp/example4',
      commission: 6,
      description: 'Insulated water bottle keeps drinks cold for 24 hours or hot for 12 hours.',
      features: ['Double-Wall Insulated', 'Leak-Proof', '24oz Capacity', 'Eco-Friendly'],
      reviews: 2103
    },
    {
      id: '5',
      name: 'The Art of Coding',
      price: 44.99,
      category: 'books',
      image: 'https://via.placeholder.com/300x200?text=Book',
      affiliateLink: 'https://amazon.com/dp/example5',
      commission: 15,
      description: 'A comprehensive guide to modern software development practices.',
      features: ['500 Pages', 'Hardcover', 'Illustrated Examples', 'Best Practices'],
      reviews: 342
    },
    {
      id: '6',
      name: 'Smartphone Stand',
      price: 19.99,
      category: 'electronics',
      image: 'https://via.placeholder.com/300x200?text=PhoneStand',
      affiliateLink: 'https://amazon.com/dp/example6',
      commission: 12,
      description: 'Adjustable smartphone stand for desk and table.',
      features: ['360° Rotation', 'Adjustable Height', 'Portable', 'Universal'],
      reviews: 745
    }
  ];

  constructor() {}

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: string): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  getProductsByCategory(category: string): Product[] {
    return this.products.filter(p => p.category === category);
  }

  searchProducts(term: string): Product[] {
    return this.products.filter(p =>
      p.name.toLowerCase().includes(term.toLowerCase())
    );
  }
}
