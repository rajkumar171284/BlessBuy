// BlessBuy - Bulk Products Dataset (INR Pricing)
// Run this in Firebase Console or use the bulk import feature

const products = [
  // Electronics - Headphones & Audio
  {
    name: "Wireless Bluetooth Headphones",
    price: 1999,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/Wireless-Bluetooth-Headphones/s?k=wireless+headphones",
    commission: 5,
    description: "Premium quality wireless headphones with active noise cancellation",
    features: ["Noise Cancellation", "40-hour battery", "Bluetooth 5.0", "Foldable design"],
    reviews: 2450,
    rating: 4.5,
    inStock: true
  },
  {
    name: "True Wireless Earbuds",
    price: 2999,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/True-Wireless-Earbuds/s?k=wireless+earbuds",
    commission: 5,
    description: "High-quality true wireless earbuds with touch controls",
    features: ["Touch Control", "6-hour battery", "IPX4 Waterproof", "Fast Charging"],
    reviews: 1850,
    rating: 4.3,
    inStock: true
  },
  {
    name: "Portable Bluetooth Speaker",
    price: 1499,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1589003077984-894e133814c9?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/Portable-Bluetooth-Speaker/s?k=bluetooth+speaker",
    commission: 6,
    description: "Compact and powerful portable Bluetooth speaker",
    features: ["360° Sound", "20-hour battery", "Water resistant", "360° sound"],
    reviews: 3200,
    rating: 4.4,
    inStock: true
  },

  // Mobile Accessories
  {
    name: "USB-C Fast Charging Cable",
    price: 299,
    category: "mobile-accessories",
    image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/USB-C-Charging-Cable/s?k=usb+c+cable",
    commission: 8,
    description: "Durable USB-C cable with fast charging support",
    features: ["60W Fast Charging", "2m length", "Nylon Braided", "Lifetime warranty"],
    reviews: 5600,
    rating: 4.6,
    inStock: true
  },
  {
    name: "30W Fast Charger",
    price: 899,
    category: "mobile-accessories",
    image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/Fast-Charger-30W/s?k=fast+charger",
    commission: 7,
    description: "Ultra-fast 30W power adapter for smartphones",
    features: ["30W Power Output", "Multi-device compatible", "Safe charging", "Compact size"],
    reviews: 4200,
    rating: 4.5,
    inStock: true
  },
  {
    name: "Phone Case - Protective Shield",
    price: 349,
    category: "mobile-accessories",
    image: "https://images.unsplash.com/photo-1517654443271-a3d3b4a1f53c?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/Phone-Case-Protective/s?k=phone+case",
    commission: 8,
    description: "Heavy-duty protective phone case with shock absorption",
    features: ["Shockproof", "Anti-slip grip", "Slim design", "All phones compatible"],
    reviews: 2100,
    rating: 4.3,
    inStock: true
  },
  {
    name: "Tempered Glass Screen Protector",
    price: 199,
    category: "mobile-accessories",
    image: "https://images.unsplash.com/photo-1517654443271-a3d3b4a1f53c?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/Screen-Protector-Tempered-Glass/s?k=screen+protector",
    commission: 10,
    description: "Premium tempered glass screen protector",
    features: ["9H Hardness", "99.9% clarity", "Easy installation", "Anti-fingerprint"],
    reviews: 3400,
    rating: 4.4,
    inStock: true
  },
  {
    name: "Magnetic Phone Mount",
    price: 499,
    category: "mobile-accessories",
    image: "https://images.unsplash.com/photo-1533093264443-140ddc3d238d?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/Magnetic-Phone-Mount/s?k=phone+mount",
    commission: 7,
    description: "Universal magnetic car phone mount",
    features: ["360° rotation", "Dashboard & windshield mount", "Magnetic adhesive", "Quick release"],
    reviews: 2800,
    rating: 4.5,
    inStock: true
  },

  // Smartwatches & Wearables
  {
    name: "Fitness Smartwatch",
    price: 3499,
    category: "wearables",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/Fitness-Smartwatch/s?k=smartwatch",
    commission: 6,
    description: "Advanced fitness tracking smartwatch with heart rate monitor",
    features: ["Heart rate monitor", "Sleep tracking", "7-day battery", "Water resistant"],
    reviews: 2200,
    rating: 4.4,
    inStock: true
  },
  {
    name: "Sports Watch - Waterproof",
    price: 1999,
    category: "wearables",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/Sports-Watch-Waterproof/s?k=sports+watch",
    commission: 6,
    description: "Durable waterproof sports watch for outdoor activities",
    features: ["50m waterproof", "Stopwatch", "Alarm", "LED display"],
    reviews: 1600,
    rating: 4.3,
    inStock: true
  },

  // Clothing - T-Shirts
  {
    name: "Cotton Casual T-Shirt",
    price: 399,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/Cotton-Casual-T-Shirt/s?k=t+shirt",
    commission: 12,
    description: "Premium quality 100% cotton casual t-shirt",
    features: ["100% Cotton", "Comfortable fit", "Machine washable", "Available sizes S-XXL"],
    reviews: 4500,
    rating: 4.5,
    inStock: true
  },
  {
    name: "Graphic Print T-Shirt",
    price: 499,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/Graphic-Print-T-Shirt/s?k=graphic+shirt",
    commission: 12,
    description: "Trendy graphic printed t-shirt with modern designs",
    features: ["100% cotton", "Modern designs", "Premium quality", "Comfortable fit"],
    reviews: 2800,
    rating: 4.4,
    inStock: true
  },
  {
    name: "Sports Dry-Fit T-Shirt",
    price: 599,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1570807352052-56ebc885bf33?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/Sports-Dry-Fit-T-Shirt/s?k=dry+fit+shirt",
    commission: 11,
    description: "Moisture-wicking dry-fit t-shirt for sports and workouts",
    features: ["Dry-fit technology", "Moisture-wicking", "Breathable", "Quick drying"],
    reviews: 1900,
    rating: 4.4,
    inStock: true
  },

  // Clothing - Shirts
  {
    name: "Formal Shirt - Office Wear",
    price: 799,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/Formal-Shirt-Office-Wear/s?k=formal+shirt",
    commission: 12,
    description: "Premium formal shirt perfect for office and business",
    features: ["100% cotton", "Wrinkle-resistant", "Easy iron", "Multiple colors"],
    reviews: 2100,
    rating: 4.4,
    inStock: true
  },
  {
    name: "Casual Linen Shirt",
    price: 899,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/Casual-Linen-Shirt/s?k=linen+shirt",
    commission: 12,
    description: "Breathable linen shirt for casual occasions",
    features: ["100% linen", "Lightweight", "Breathable", "Comfortable"],
    reviews: 1400,
    rating: 4.3,
    inStock: true
  },

  // Clothing - Jeans & Pants
  {
    name: "Blue Denim Jeans",
    price: 1299,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/Blue-Denim-Jeans/s?k=jeans",
    commission: 11,
    description: "Classic blue denim jeans with comfortable fit",
    features: ["100% cotton denim", "Comfortable fit", "Durable", "Multiple sizes"],
    reviews: 3200,
    rating: 4.5,
    inStock: true
  },
  {
    name: "Casual Chino Pants",
    price: 999,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/Casual-Chino-Pants/s?k=chino+pants",
    commission: 11,
    description: "Versatile chino pants for casual and semi-formal wear",
    features: ["Lightweight", "Breathable", "Multiple colors", "Comfortable fit"],
    reviews: 1800,
    rating: 4.3,
    inStock: true
  },

  // Shoes
  {
    name: "Running Sports Shoes",
    price: 2999,
    category: "shoes",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/Running-Sports-Shoes/s?k=running+shoes",
    commission: 10,
    description: "Professional running shoes with excellent cushioning",
    features: ["Memory foam", "Breathable mesh", "Anti-slip sole", "Lightweight"],
    reviews: 2600,
    rating: 4.5,
    inStock: true
  },
  {
    name: "Casual Canvas Sneakers",
    price: 1299,
    category: "shoes",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/Casual-Canvas-Sneakers/s?k=sneakers",
    commission: 11,
    description: "Comfortable casual canvas sneakers for everyday wear",
    features: ["Canvas material", "Rubber sole", "Comfortable", "Versatile"],
    reviews: 1900,
    rating: 4.4,
    inStock: true
  },
  {
    name: "Formal Office Shoes",
    price: 1899,
    category: "shoes",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/Formal-Office-Shoes/s?k=formal+shoes",
    commission: 10,
    description: "Premium formal office shoes for professional look",
    features: ["Leather", "Comfortable insole", "Professional style", "Water resistant"],
    reviews: 1200,
    rating: 4.3,
    inStock: true
  },

  // Home & Kitchen
  {
    name: "Stainless Steel Water Bottle",
    price: 449,
    category: "home-kitchen",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e9?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/Stainless-Steel-Water-Bottle/s?k=water+bottle",
    commission: 10,
    description: "Durable stainless steel water bottle with insulation",
    features: ["Keeps drinks hot/cold", "1L capacity", "Leak-proof", "Eco-friendly"],
    reviews: 3100,
    rating: 4.5,
    inStock: true
  },
  {
    name: "Coffee Maker - Automatic",
    price: 1999,
    category: "home-kitchen",
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02ae2a0e?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/Coffee-Maker-Automatic/s?k=coffee+maker",
    commission: 8,
    description: "Automatic coffee maker for quick morning brew",
    features: ["12-cup capacity", "Programmable timer", "Keep-warm function", "Easy to clean"],
    reviews: 1700,
    rating: 4.3,
    inStock: true
  },
  {
    name: "Non-Stick Frying Pan",
    price: 599,
    category: "home-kitchen",
    image: "https://images.unsplash.com/photo-1578519501866-f06ba577c69e?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/Non-Stick-Frying-Pan/s?k=frying+pan",
    commission: 9,
    description: "High-quality non-stick frying pan for everyday cooking",
    features: ["Non-stick coating", "Heat-resistant", "Induction compatible", "Easy to clean"],
    reviews: 2400,
    rating: 4.4,
    inStock: true
  },
  {
    name: "Mixing Bowls Set - 5 pieces",
    price: 799,
    category: "home-kitchen",
    image: "https://images.unsplash.com/photo-1578519501866-f06ba577c69e?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/Mixing-Bowls-Set/s?k=mixing+bowls",
    commission: 9,
    description: "Durable stainless steel mixing bowls set",
    features: ["5 different sizes", "Stainless steel", "Dishwasher safe", "Non-slip base"],
    reviews: 1600,
    rating: 4.3,
    inStock: true
  },

  // Home Decor
  {
    name: "LED Wall Clock",
    price: 699,
    category: "home-decor",
    image: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/LED-Wall-Clock/s?k=led+clock",
    commission: 10,
    description: "Modern LED wall clock with digital display",
    features: ["LED display", "3 color options", "USB powered", "Modern design"],
    reviews: 2200,
    rating: 4.4,
    inStock: true
  },
  {
    name: "Table Lamp - Desk Light",
    price: 899,
    category: "home-decor",
    image: "https://images.unsplash.com/photo-1565182999555-2dd203b0f112?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/Table-Lamp-Desk-Light/s?k=table+lamp",
    commission: 10,
    description: "Adjustable desk lamp with warm light",
    features: ["Adjustable brightness", "Warm/cool light", "Eye-caring", "Flexible"],
    reviews: 1900,
    rating: 4.4,
    inStock: true
  },
  {
    name: "Wall Shelves - Floating",
    price: 1299,
    category: "home-decor",
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/Wall-Shelves-Floating/s?k=wall+shelves",
    commission: 9,
    description: "Modern floating wall shelves for storage and decor",
    features: ["Easy installation", "Multiple sizes", "Modern design", "Sturdy"],
    reviews: 1400,
    rating: 4.3,
    inStock: true
  },
  {
    name: "Cushion Covers - Pack of 4",
    price: 799,
    category: "home-decor",
    image: "https://images.unsplash.com/photo-1584345604015-4a6ac6a5e893?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/Cushion-Covers/s?k=cushion+covers",
    commission: 11,
    description: "Decorative cushion covers in trendy designs",
    features: ["4 piece set", "100% cotton", "Zipper closure", "Washable"],
    reviews: 2100,
    rating: 4.4,
    inStock: true
  },

  // Books
  {
    name: "Self-Help Book - Success",
    price: 299,
    category: "books",
    image: "https://images.unsplash.com/photo-1507842217343-583f20270319?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/Self-Help-Book-Success/s?k=self+help+books",
    commission: 8,
    description: "Inspiring self-help book on success and personal growth",
    features: ["Bestseller", "250 pages", "Hardcover", "By renowned author"],
    reviews: 1200,
    rating: 4.5,
    inStock: true
  },
  {
    name: "Business Book - Entrepreneurship",
    price: 399,
    category: "books",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/Business-Book-Entrepreneurship/s?k=business+books",
    commission: 8,
    description: "Practical guide to starting and running a business",
    features: ["Real-world examples", "350 pages", "Paperback", "Practical strategies"],
    reviews: 900,
    rating: 4.4,
    inStock: true
  },
  {
    name: "Fiction Novel - Thriller",
    price: 249,
    category: "books",
    image: "https://images.unsplash.com/photo-1507842217343-583f20270319?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/Fiction-Novel-Thriller/s?k=thriller+novels",
    commission: 8,
    description: "Gripping thriller novel with unexpected twists",
    features: ["Page-turner", "300 pages", "Paperback", "Award-winning author"],
    reviews: 1600,
    rating: 4.5,
    inStock: true
  },

  // Sports & Fitness
  {
    name: "Yoga Mat - Premium",
    price: 999,
    category: "sports",
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/Yoga-Mat-Premium/s?k=yoga+mat",
    commission: 10,
    description: "Non-slip premium yoga mat for comfortable practice",
    features: ["6mm thickness", "Non-slip", "Eco-friendly", "Lightweight"],
    reviews: 2100,
    rating: 4.5,
    inStock: true
  },
  {
    name: "Dumbbell Set - Home Gym",
    price: 2499,
    category: "sports",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/Dumbbell-Set-Home-Gym/s?k=dumbbells",
    commission: 9,
    description: "Adjustable dumbbell set for home workout",
    features: ["10kg total weight", "Adjustable", "Non-slip", "Space-saving"],
    reviews: 1800,
    rating: 4.4,
    inStock: true
  },
  {
    name: "Resistance Bands - Set of 5",
    price: 599,
    category: "sports",
    image: "https://images.unsplash.com/photo-1579758629938-03607ccf9628?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/Resistance-Bands/s?k=resistance+bands",
    commission: 10,
    description: "Versatile resistance bands for strength training",
    features: ["5 different resistances", "Durable latex", "Portable", "Home gym"],
    reviews: 2300,
    rating: 4.4,
    inStock: true
  },
  {
    name: "Jumping Rope - Speed",
    price: 299,
    category: "sports",
    image: "https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/Jumping-Rope-Speed/s?k=jump+rope",
    commission: 11,
    description: "Speed jumping rope for cardio and fitness",
    features: ["Ball bearing handles", "Adjustable length", "Fast speed", "Lightweight"],
    reviews: 1400,
    rating: 4.3,
    inStock: true
  },

  // Backpacks & Bags
  {
    name: "Laptop Backpack - 15 inch",
    price: 1499,
    category: "bags",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/Laptop-Backpack-15-inch/s?k=laptop+backpack",
    commission: 10,
    description: "Spacious laptop backpack with multiple compartments",
    features: ["15.6\" laptop compartment", "USB charging port", "Water-resistant", "Ergonomic"],
    reviews: 2400,
    rating: 4.5,
    inStock: true
  },
  {
    name: "Travel Backpack - 40L",
    price: 2299,
    category: "bags",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/Travel-Backpack-40L/s?k=travel+backpack",
    commission: 9,
    description: "Durable travel backpack with expandable capacity",
    features: ["40L capacity", "Expandable", "Multiple pockets", "Comfortable straps"],
    reviews: 1600,
    rating: 4.4,
    inStock: true
  },
  {
    name: "Shoulder Bag - Messenger",
    price: 899,
    category: "bags",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/Shoulder-Bag-Messenger/s?k=messenger+bag",
    commission: 11,
    description: "Stylish messenger bag for daily commute",
    features: ["Canvas material", "Adjustable strap", "Multiple pockets", "Spacious"],
    reviews: 1200,
    rating: 4.3,
    inStock: true
  },

  // Camera & Photography
  {
    name: "Digital Camera - DSLR",
    price: 45999,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1606986628025-35d57e735ae0?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/Digital-Camera-DSLR/s?k=dslr+camera",
    commission: 5,
    description: "Professional DSLR camera for photography enthusiasts",
    features: ["24.2MP sensor", "4K video", "WiFi enabled", "Fast autofocus"],
    reviews: 800,
    rating: 4.5,
    inStock: true
  },
  {
    name: "Mirrorless Camera",
    price: 67999,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1606986628025-35d57e735ae0?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/Mirrorless-Camera/s?k=mirrorless+camera",
    commission: 5,
    description: "Advanced mirrorless camera for professionals",
    features: ["42.4MP sensor", "4K 60fps", "In-body stabilization", "Fast AF"],
    reviews: 650,
    rating: 4.6,
    inStock: true
  },
  {
    name: "Camera Tripod - Professional",
    price: 1499,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/Camera-Tripod-Professional/s?k=tripod",
    commission: 9,
    description: "Sturdy professional camera tripod",
    features: ["Maximum height: 1.6m", "Ball head", "Lightweight aluminum", "Fast setup"],
    reviews: 1100,
    rating: 4.4,
    inStock: true
  },

  // Laptops & Computers
  {
    name: "Gaming Laptop - High Performance",
    price: 89999,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1588872657840-218e412ee5ff?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/Gaming-Laptop-High-Performance/s?k=gaming+laptop",
    commission: 4,
    description: "Powerful gaming laptop with RTX graphics",
    features: ["RTX 3060", "Intel i7", "16GB RAM", "512GB SSD"],
    reviews: 1200,
    rating: 4.5,
    inStock: true
  },
  {
    name: "Laptop Stand - Adjustable",
    price: 699,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/Laptop-Stand-Adjustable/s?k=laptop+stand",
    commission: 10,
    description: "Adjustable laptop stand for ergonomic viewing",
    features: ["Adjustable height", "Aluminum", "Portable", "Supports up to 20kg"],
    reviews: 2100,
    rating: 4.5,
    inStock: true
  },

  // Keyboard & Mouse
  {
    name: "Mechanical Gaming Keyboard",
    price: 3499,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1587829191301-dc798b83add3?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/Mechanical-Gaming-Keyboard/s?k=mechanical+keyboard",
    commission: 7,
    description: "RGB mechanical keyboard for gaming",
    features: ["Mechanical switches", "RGB lighting", "Programmable keys", "Durable"],
    reviews: 1900,
    rating: 4.5,
    inStock: true
  },
  {
    name: "Wireless Mouse - Silent",
    price: 899,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1587829191301-dc798b83add3?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/Wireless-Mouse-Silent/s?k=wireless+mouse",
    commission: 9,
    description: "Silent wireless mouse for office work",
    features: ["Silent clicks", "2.4GHz wireless", "USB receiver", "18-month battery"],
    reviews: 2600,
    rating: 4.4,
    inStock: true
  },

  // Monitors
  {
    name: "4K Monitor - 27 inch",
    price: 24999,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1593642632759-6ab8d3f47b50?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/4K-Monitor-27-inch/s?k=4k+monitor",
    commission: 5,
    description: "Ultra HD 4K monitor for professional work",
    features: ["4K resolution", "60Hz refresh", "IPS panel", "USB-C"],
    reviews: 950,
    rating: 4.5,
    inStock: true
  },
  {
    name: "Gaming Monitor - 144Hz",
    price: 18999,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1593642632759-6ab8d3f47b50?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/Gaming-Monitor-144Hz/s?k=gaming+monitor",
    commission: 5,
    description: "Fast 144Hz gaming monitor with low response time",
    features: ["144Hz refresh", "1ms response time", "Full HD", "AMD FreeSync"],
    reviews: 1300,
    rating: 4.5,
    inStock: true
  },

  // Beauty & Personal Care
  {
    name: "Electric Toothbrush",
    price: 1499,
    category: "personal-care",
    image: "https://images.unsplash.com/photo-1606967271519-d91f37f6b69b?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/Electric-Toothbrush/s?k=electric+toothbrush",
    commission: 8,
    description: "Smart electric toothbrush with multiple modes",
    features: ["3 cleaning modes", "30-day battery", "Smart timer", "Waterproof"],
    reviews: 1700,
    rating: 4.4,
    inStock: true
  },
  {
    name: "Hair Dryer - Professional",
    price: 2299,
    category: "personal-care",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/Hair-Dryer-Professional/s?k=hair+dryer",
    commission: 8,
    description: "Professional hair dryer with ionic technology",
    features: ["1800W power", "Ionic technology", "3 heat settings", "Fast drying"],
    reviews: 1400,
    rating: 4.3,
    inStock: true
  },
  {
    name: "Face Wash - Organic",
    price: 299,
    category: "personal-care",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6aec883?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/Face-Wash-Organic/s?k=face+wash",
    commission: 12,
    description: "Organic face wash with natural ingredients",
    features: ["100% organic", "Gentle formula", "Dermatologist tested", "150ml"],
    reviews: 2200,
    rating: 4.5,
    inStock: true
  },

  // Tools & Hardware
  {
    name: "Power Drill - Cordless",
    price: 3499,
    category: "tools",
    image: "https://images.unsplash.com/photo-1586864388620-0644bc41af8f?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/Power-Drill-Cordless/s?k=power+drill",
    commission: 7,
    description: "Cordless power drill for DIY projects",
    features: ["20V power", "2-speed", "LED light", "Includes accessories"],
    reviews: 1300,
    rating: 4.4,
    inStock: true
  },
  {
    name: "Tool Kit - 100 pieces",
    price: 1299,
    category: "tools",
    image: "https://images.unsplash.com/photo-1586864388620-0644bc41af8f?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/Tool-Kit-100-pieces/s?k=tool+kit",
    commission: 9,
    description: "Comprehensive tool kit with 100 essential tools",
    features: ["100 pieces", "Stainless steel", "Tool box included", "Professional quality"],
    reviews: 1600,
    rating: 4.4,
    inStock: true
  },

  // Pet Supplies
  {
    name: "Dog Bed - Comfortable",
    price: 1299,
    category: "pet-supplies",
    image: "https://images.unsplash.com/photo-1587300411515-d1442411cb1e?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/Dog-Bed-Comfortable/s?k=dog+bed",
    commission: 10,
    description: "Orthopedic dog bed for maximum comfort",
    features: ["Memory foam", "Waterproof cover", "Removable cover", "Multiple sizes"],
    reviews: 1100,
    rating: 4.5,
    inStock: true
  },
  {
    name: "Cat Scratching Post",
    price: 999,
    category: "pet-supplies",
    image: "https://images.unsplash.com/photo-1587300411515-d1442411cb1e?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/Cat-Scratching-Post/s?k=cat+scratching+post",
    commission: 10,
    description: "Multi-level cat scratching post",
    features: ["3 levels", "Sisal rope", "Stable", "Space-saving"],
    reviews: 800,
    rating: 4.3,
    inStock: true
  },

  // Gaming
  {
    name: "Gaming Controller - Wireless",
    price: 2499,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1535869484000-b72b4fce62d0?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/Gaming-Controller-Wireless/s?k=game+controller",
    commission: 7,
    description: "Wireless gaming controller for console gaming",
    features: ["Wireless 2.4GHz", "Long battery life", "Vibration", "Compatible with multiple devices"],
    reviews: 2100,
    rating: 4.5,
    inStock: true
  },
  {
    name: "Gaming Headset - 7.1 Surround",
    price: 3999,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/Gaming-Headset-7.1-Surround/s?k=gaming+headset",
    commission: 6,
    description: "Professional gaming headset with 7.1 surround sound",
    features: ["7.1 surround", "Noise-cancelling mic", "RGB lighting", "Comfortable"],
    reviews: 1600,
    rating: 4.4,
    inStock: true
  },

  // Additional Electronics
  {
    name: "Power Bank - 20000mAh",
    price: 1299,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/Power-Bank-20000mAh/s?k=power+bank",
    commission: 8,
    description: "High-capacity power bank for all devices",
    features: ["20000mAh", "Fast charging", "Multiple ports", "LED display"],
    reviews: 3100,
    rating: 4.5,
    inStock: true
  },
  {
    name: "USB Hub - 7 Port",
    price: 699,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/USB-Hub-7-Port/s?k=usb+hub",
    commission: 9,
    description: "USB 3.0 hub with 7 high-speed ports",
    features: ["7 USB 3.0 ports", "30W power adapter", "Fast data transfer", "Compact"],
    reviews: 1800,
    rating: 4.4,
    inStock: true
  },
  {
    name: "Wireless Charging Pad",
    price: 799,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1586253408268-c1b1b50c2c1c?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/Wireless-Charging-Pad/s?k=wireless+charger",
    commission: 9,
    description: "Fast wireless charging pad for Qi-enabled devices",
    features: ["15W fast charging", "LED indicator", "Non-slip", "Compatible"],
    reviews: 2300,
    rating: 4.4,
    inStock: true
  },
  {
    name: "Desk Organizer - Bamboo",
    price: 599,
    category: "home-decor",
    image: "https://images.unsplash.com/photo-1597597411217-4ee4a0a551b3?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/Desk-Organizer-Bamboo/s?k=desk+organizer",
    commission: 11,
    description: "Eco-friendly bamboo desk organizer",
    features: ["Multiple compartments", "Bamboo material", "Space-saving", "Durable"],
    reviews: 1200,
    rating: 4.3,
    inStock: true
  },
  {
    name: "Bluetooth Speaker Cube",
    price: 1199,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1589003077984-894e133814c9?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/Bluetooth-Speaker-Cube/s?k=bluetooth+speaker+cube",
    commission: 8,
    description: "Compact cube Bluetooth speaker with great sound",
    features: ["Compact design", "360° sound", "10-hour battery", "Water-resistant"],
    reviews: 2500,
    rating: 4.5,
    inStock: true
  },
  {
    name: "Phone Stand - Desktop",
    price: 299,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1533093264443-140ddc3d238d?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/Phone-Stand-Desktop/s?k=phone+stand",
    commission: 10,
    description: "Adjustable desktop phone stand",
    features: ["Adjustable angle", "Non-slip", "Portable", "All phones compatible"],
    reviews: 1900,
    rating: 4.4,
    inStock: true
  },
  {
    name: "Webcam - 1080P HD",
    price: 1499,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1598935706191-1b2b0c9c2c7a?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/Webcam-1080P-HD/s?k=webcam",
    commission: 8,
    description: "Full HD webcam for video calls and streaming",
    features: ["1080P resolution", "30fps", "Built-in mic", "Auto-focus"],
    reviews: 1600,
    rating: 4.4,
    inStock: true
  },
  {
    name: "External SSD - 1TB",
    price: 7999,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&h=500&fit=crop",
    affiliateLink: "https://amazon.in/External-SSD-1TB/s?k=external+ssd",
    commission: 6,
    description: "Fast external SSD for portable storage",
    features: ["1TB capacity", "USB 3.1", "Read/write 450MB/s", "Portable"],
    reviews: 1400,
    rating: 4.5,
    inStock: true
  }
];

// Export for use in Node.js or browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = products;
}
