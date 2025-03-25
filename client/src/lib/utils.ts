import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  formattedPrice: string;
  image: string;
  category: string;
  isNew?: boolean;
  colors?: string[];
  sizes?: string[];
  images?: string[];
  stock?: number;
};

export const products: Product[] = [
  {
    id: 1,
    title: "Stealth Leather Jacket",
    description: "Premium leather jacket with modern cut and design. Features multiple pockets, durable zippers, and a comfortable inner lining. Perfect for urban settings and cool weather.",
    price: 239.99,
    formattedPrice: "$239.99",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600",
    category: "Apparel",
    isNew: true,
    colors: ["#1F2937", "#1E40AF", "#B91C1C"],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1626497764746-6dc36546b388?auto=format&fit=crop&q=80&w=800"
    ],
    stock: 15
  },
  {
    id: 2,
    title: "Echo Smart Watch",
    description: "Advanced smartwatch with health tracking, notifications, and apps. Features a bright AMOLED display, water resistance, and 3-day battery life. Compatible with iOS and Android.",
    price: 179.99,
    formattedPrice: "$179.99",
    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&q=80&w=600",
    category: "Electronics",
    isNew: true,
    colors: ["#1F2937", "#1E40AF", "#B91C1C"],
    sizes: ["One Size"],
    images: [
      "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1609187757531-7e4f63690901?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&q=80&w=800"
    ],
    stock: 20
  },
  {
    id: 3,
    title: "Vertex Sneakers",
    description: "Ultra-comfortable sneakers designed for both style and function. Features breathable materials, cushioned insoles, and durable outsoles. Perfect for urban environments and casual wear.",
    price: 129.99,
    formattedPrice: "$129.99",
    image: "https://images.unsplash.com/photo-1608748434939-b2a38d590757?auto=format&fit=crop&q=80&w=600",
    category: "Footwear",
    isNew: true,
    colors: ["#1F2937", "#1E40AF", "#B91C1C"],
    sizes: ["7", "8", "9", "10", "11"],
    images: [
      "https://images.unsplash.com/photo-1608748434939-b2a38d590757?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1605034313761-73ea4a0cfbf3?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800"
    ],
    stock: 12
  },
  {
    id: 4,
    title: "Quantum Backpack",
    description: "Water-resistant backpack with anti-theft design and built-in charging ports. Features padded laptop compartment, hidden pockets, and ergonomic straps. Ideal for commuters and travelers.",
    price: 89.99,
    formattedPrice: "$89.99",
    image: "https://images.unsplash.com/photo-1563903530908-afdd155d057a?auto=format&fit=crop&q=80&w=600",
    category: "Accessories",
    isNew: true,
    colors: ["#1F2937", "#1E40AF", "#B91C1C"],
    sizes: ["One Size"],
    images: [
      "https://images.unsplash.com/photo-1563903530908-afdd155d057a?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1576512259505-df8677a146ff?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1606522754091-a3bbf9ad4cb3?auto=format&fit=crop&q=80&w=800"
    ],
    stock: 18
  },
  {
    id: 5,
    title: "Urban Headphones",
    description: "Noise-cancelling headphones with premium sound quality and long battery life. Features comfortable ear cups, Bluetooth connectivity, and foldable design for portability.",
    price: 149.99,
    formattedPrice: "$149.99",
    image: "https://images.unsplash.com/photo-1564859228273-274232fdb516?auto=format&fit=crop&q=80&w=600",
    category: "Electronics",
    colors: ["#1F2937", "#1E40AF", "#B91C1C"],
    sizes: ["One Size"],
    images: [
      "https://images.unsplash.com/photo-1564859228273-274232fdb516?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1578319439584-104c94d37305?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=800"
    ],
    stock: 10
  },
  {
    id: 6,
    title: "Minimalist Wallet",
    description: "RFID-blocking leather wallet with minimalist design. Features slim profile, multiple card slots, and cash compartment. Perfect for modern, streamlined carry.",
    price: 49.99,
    formattedPrice: "$49.99",
    image: "https://images.unsplash.com/photo-1568745376006-ff19c8e8b396?auto=format&fit=crop&q=80&w=600",
    category: "Accessories",
    colors: ["#1F2937", "#8B4513", "#B91C1C"],
    sizes: ["One Size"],
    images: [
      "https://images.unsplash.com/photo-1568745376006-ff19c8e8b396?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1589782431745-433807ce2b1d?auto=format&fit=crop&q=80&w=800"
    ],
    stock: 25
  },
  {
    id: 7,
    title: "Wireless Earbuds",
    description: "Premium wireless earbuds with crystal-clear sound quality and 24-hour battery life. Features noise isolation, touch controls, and comfortable fit for extended wear.",
    price: 99.99,
    formattedPrice: "$99.99",
    image: "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?auto=format&fit=crop&q=80&w=600",
    category: "Electronics",
    colors: ["#1F2937", "#1E40AF", "#FFFFFF"],
    sizes: ["One Size"],
    images: [
      "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1561924085-13c8476e2a0b?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5871b?auto=format&fit=crop&q=80&w=800"
    ],
    stock: 15
  },
  {
    id: 8,
    title: "Minimal Desk Lamp",
    description: "Sleek desk lamp with adjustable brightness and color temperature. Features modern design, touch controls, and energy-efficient LED lighting. Perfect for home offices and reading.",
    price: 79.99,
    formattedPrice: "$79.99",
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&q=80&w=600",
    category: "Home",
    colors: ["#1F2937", "#FFFFFF", "#B91C1C"],
    sizes: ["One Size"],
    images: [
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1513506291646-af2c227291d5?auto=format&fit=crop&q=80&w=800"
    ],
    stock: 8
  }
];

export const featuredProducts = products.filter(product => product.isNew);

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};
