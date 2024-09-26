type Product = {
  id: number; // Add id property
  name: string;
  description: string;
  price: number;
  category: string;
};

type Products = Product[];

export const items: Products = [
  // Smartphones
  {
    id: 1, // Unique ID
    name: "iPhone 14 Pro Max",
    price: 1099,
    description:
      "Flagship smartphone with A16 Bionic chip, 6.7-inch OLED display, and triple camera system.",
    category: "Smartphone",
  },
  {
    id: 2, // Unique ID
    name: "Google Pixel 7",
    price: 899,
    description:
      "Google's latest smartphone with Tensor G2 processor and 50MP dual rear camera.",
    category: "Smartphone",
  },
  {
    id: 3, // Unique ID
    name: "Samsung Galaxy Z Fold 4",
    price: 1799,
    description:
      "Foldable smartphone with a 7.6-inch AMOLED display and Snapdragon 8+ Gen 1 chip.",
    category: "Smartphone",
  },
  {
    id: 4, // Unique ID
    name: "OnePlus 10 Pro",
    price: 799,
    description:
      "High-end smartphone with a 120Hz AMOLED display and Hasselblad triple camera setup.",
    category: "Smartphone",
  },
  {
    id: 5, // Unique ID
    name: "Xiaomi Mi 12 Ultra",
    price: 1099,
    description:
      "Premium smartphone with Snapdragon 8 Gen 1, 120Hz display, and Leica camera system.",
    category: "Smartphone",
  },
  {
    id: 6, // Unique ID
    name: "Sony Xperia 1 IV",
    price: 1299,
    description:
      "4K OLED display smartphone with advanced photography features and real-time eye autofocus.",
    category: "Smartphone",
  },
  {
    id: 7, // Unique ID
    name: "Samsung Galaxy S22 Ultra",
    price: 1199,
    description:
      "High-end smartphone with 108MP camera, S Pen support, and 6.8-inch AMOLED display.",
    category: "Smartphone",
  },
  {
    id: 8, // Unique ID
    name: "Oppo Find X5 Pro",
    price: 1099,
    description:
      "Flagship smartphone with Snapdragon 8 Gen 1, 50MP cameras, and 120Hz AMOLED display.",
    category: "Smartphone",
  },

  // TVs
  {
    id: 9, // Unique ID
    name: 'Samsung QN90A Neo QLED 55"',
    price: 1599,
    description:
      "55-inch 4K Smart TV with Quantum HDR and anti-reflection technology.",
    category: "TV",
  },
  {
    id: 10, // Unique ID
    name: 'Sony Bravia XR A80J 65" OLED',
    price: 1999,
    description:
      "65-inch 4K OLED TV with Cognitive Processor XR for immersive viewing experience.",
    category: "TV",
  },
  {
    id: 11, // Unique ID
    name: 'LG C2 Series 55" OLED TV',
    price: 1499,
    description:
      "55-inch 4K OLED TV with AI-powered 4K upscaling and perfect black levels.",
    category: "TV",
  },
  {
    id: 12, // Unique ID
    name: 'Vizio M-Series 50" 4K TV',
    price: 599,
    description:
      "50-inch 4K TV with Dolby Vision HDR and Quantum Color technology.",
    category: "TV",
  },
  {
    id: 13, // Unique ID
    name: 'TCL 6-Series 65" 4K Roku TV',
    price: 999,
    description:
      "65-inch 4K TV with mini-LED technology and built-in Roku streaming platform.",
    category: "TV",
  },
  {
    id: 14, // Unique ID
    name: 'Hisense U8G 55" 4K ULED TV',
    price: 849,
    description:
      "55-inch 4K ULED TV with Dolby Vision HDR and Android TV interface.",
    category: "TV",
  },
  {
    id: 15, // Unique ID
    name: 'Sony X90J 75" 4K LED TV',
    price: 1799,
    description:
      "75-inch 4K LED TV with Full Array LED and Google TV for an enhanced smart experience.",
    category: "TV",
  },

  // Headphones
  {
    id: 16, // Unique ID
    name: "Sony WH-1000XM4",
    price: 349,
    description:
      "Wireless noise-canceling headphones with premium sound and touch controls.",
    category: "Headphones",
  },
  {
    id: 17, // Unique ID
    name: "Bose QuietComfort 45",
    price: 329,
    description:
      "Over-ear noise-canceling headphones with exceptional comfort and sound quality.",
    category: "Headphones",
  },
  {
    id: 18, // Unique ID
    name: "Apple AirPods Max",
    price: 549,
    description:
      "Over-ear wireless headphones with active noise cancellation and spatial audio.",
    category: "Headphones",
  },
  {
    id: 19, // Unique ID
    name: "Sennheiser Momentum 3",
    price: 399,
    description:
      "Wireless headphones with noise cancellation and high-resolution sound.",
    category: "Headphones",
  },
  {
    id: 20, // Unique ID
    name: "JBL Live 660NC",
    price: 199,
    description:
      "Noise-canceling headphones with long battery life and customizable sound settings.",
    category: "Headphones",
  },
];
