// Bulk Add Products - Paste this in browser console (F12) at http://localhost:4200/admin/products
// This will automatically add all 10 sample products

const products = [
  {
    name: "Wireless Bluetooth Headphones Pro",
    price: 89.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=400&fit=crop",
    affiliateLink: "https://amazon.com/dp/B08CBXQHVQ",
    commission: 5,
    description: "Premium wireless headphones with active noise cancellation, 40-hour battery life, and superior sound quality.",
    features: ["Active Noise Cancellation", "Bluetooth 5.0", "40hr Battery", "Premium Sound", "Comfortable Fit"],
    reviews: 1250,
    rating: 4.8,
    inStock: true
  },
  {
    name: "USB-C Fast Charging Adapter 65W",
    price: 34.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=400&fit=crop",
    affiliateLink: "https://amazon.com/dp/B087CDWLHQ",
    commission: 8,
    description: "Fast 65W USB-C charger with multiple ports, compatible with laptops, tablets, and phones.",
    features: ["65W Power Output", "Multiple Ports", "Compact Design", "Travel-Friendly", "Safety Certified"],
    reviews: 892,
    rating: 4.6,
    inStock: true
  },
  {
    name: "Premium Cotton T-Shirt Collection",
    price: 24.99,
    category: "fashion",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=400&fit=crop",
    affiliateLink: "https://amazon.com/dp/B08QV8Z3LQ",
    commission: 10,
    description: "100% organic cotton t-shirts available in multiple colors and sizes. Soft, breathable, and durable.",
    features: ["100% Organic Cotton", "Machine Washable", "Available in 15 Colors", "Unisex Sizing", "Eco-Friendly"],
    reviews: 567,
    rating: 4.7,
    inStock: true
  },
  {
    name: "Stainless Steel Insulated Water Bottle",
    price: 39.99,
    category: "home",
    image: "https://images.unsplash.com/photo-1602143407151-7e36dd5f5a0e?w=500&h=400&fit=crop",
    affiliateLink: "https://amazon.com/dp/B08N2X3LDN",
    commission: 6,
    description: "Double-walled insulated bottle keeps drinks cold for 24 hours or hot for 12 hours. Leak-proof design.",
    features: ["Double-Wall Insulated", "Leak-Proof Lid", "24oz Capacity", "Eco-Friendly", "Lightweight"],
    reviews: 2103,
    rating: 4.9,
    inStock: true
  },
  {
    name: "The Art of Coding - Complete Guide",
    price: 49.99,
    category: "books",
    image: "https://images.unsplash.com/photo-1507842217343-583f20270319?w=500&h=400&fit=crop",
    affiliateLink: "https://amazon.com/dp/B08YKQY75L",
    commission: 15,
    description: "Comprehensive guide to modern software development practices, design patterns, and best practices.",
    features: ["500+ Pages", "Hardcover", "Illustrated Examples", "Best Practices", "Practical Projects"],
    reviews: 342,
    rating: 4.5,
    inStock: true
  },
  {
    name: "Adjustable Phone & Tablet Stand",
    price: 19.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=400&fit=crop",
    affiliateLink: "https://amazon.com/dp/B087CDWLHQ",
    commission: 12,
    description: "Universal adjustable stand for smartphones and tablets. 360° rotation with non-slip base.",
    features: ["360° Rotation", "Adjustable Height", "Non-Slip Base", "Universal Compatibility", "Lightweight"],
    reviews: 745,
    rating: 4.4,
    inStock: true
  },
  {
    name: "Mechanical Gaming Keyboard RGB",
    price: 129.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1587829191301-e8342d7e0fcb?w=500&h=400&fit=crop",
    affiliateLink: "https://amazon.com/dp/B08YKQY75L",
    commission: 7,
    description: "Premium mechanical gaming keyboard with RGB lighting, programmable keys, and aluminum frame.",
    features: ["Mechanical Switches", "RGB Lighting", "Programmable Keys", "Aluminum Frame", "USB Connection"],
    reviews: 1456,
    rating: 4.7,
    inStock: true
  },
  {
    name: "4K Ultra HD Webcam",
    price: 159.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&h=400&fit=crop",
    affiliateLink: "https://amazon.com/dp/B08N2X3LDN",
    commission: 8,
    description: "Professional 4K webcam with auto-focus, noise-canceling microphone, and wide-angle lens.",
    features: ["4K Resolution", "Auto-Focus", "Noise-Canceling Mic", "Wide-Angle Lens", "USB Plug and Play"],
    reviews: 678,
    rating: 4.6,
    inStock: true
  },
  {
    name: "Minimalist Wallet with RFID Protection",
    price: 29.99,
    category: "fashion",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=400&fit=crop",
    affiliateLink: "https://amazon.com/dp/B08QV8Z3LQ",
    commission: 11,
    description: "Slim minimalist wallet with RFID blocking technology. Premium leather construction.",
    features: ["RFID Blocking", "Slim Design", "Premium Leather", "Multiple Card Slots", "Durable"],
    reviews: 523,
    rating: 4.8,
    inStock: true
  },
  {
    name: "Bamboo Desk Organizer Set",
    price: 44.99,
    category: "home",
    image: "https://images.unsplash.com/photo-1589939705882-3f81e6e0ba00?w=500&h=400&fit=crop",
    affiliateLink: "https://amazon.com/dp/B08YKQY75L",
    commission: 9,
    description: "Eco-friendly bamboo desk organizer set with multiple compartments. Perfect for home office.",
    features: ["100% Bamboo", "Multiple Compartments", "Eco-Friendly", "Easy Assembly", "Space-Saving"],
    reviews: 412,
    rating: 4.5,
    inStock: true
  }
];

console.log('📦 Ready to add', products.length, 'products');
console.log('Products array:', products);
