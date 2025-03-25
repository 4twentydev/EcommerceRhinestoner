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
    title: "Rainbow Crystal Lighter",
    description:
      "A stunning rainbow crystal-encrusted lighter that adds a colorful sparkle to your everyday carry. Each crystal is hand-placed for maximum brilliance.",
    price: 39.99,
    formattedPrice: "$39.99",
    image: "/images/products/lighter-rainbow.jpg",
    category: "Accessories",
    isNew: true,
    colors: ["rainbow", "iridescent"],
    sizes: ["One Size"],
    images: [
      "/images/products/lighter-rainbow.jpg"
    ],
    stock: 15,
  },
  {
    id: 2,
    title: "Lime Green Shimmer Lighter",
    description:
      "Make a statement with this vibrant lime green crystal lighter. The holographic effect creates an eye-catching display in any lighting.",
    price: 44.99,
    formattedPrice: "$44.99",
    image: "/images/products/lighter-green.jpg",
    category: "Accessories",
    isNew: true,
    colors: ["green", "holographic"],
    sizes: ["One Size"],
    images: [
      "/images/products/lighter-green.jpg"
    ],
    stock: 12,
  },
  {
    id: 3,
    title: "Rose Gold Crystal Lighter",
    description:
      "Elegance meets functionality with this rose gold crystal lighter. Perfect for those who appreciate luxury in the details.",
    price: 49.99,
    formattedPrice: "$49.99",
    image: "/images/products/lighter-rosegold.jpg",
    category: "Accessories",
    isNew: true,
    colors: ["rose gold"],
    sizes: ["One Size"],
    images: [
      "/images/products/lighter-rosegold.jpg"
    ],
    stock: 10,
  },
  {
    id: 4,
    title: "Turquoise Heart Lighter",
    description:
      "This turquoise crystal lighter features a beautiful pattern with silver hearts. A perfect gift for someone special or a treat for yourself.",
    price: 42.99,
    formattedPrice: "$42.99",
    image: "/images/products/lighter-turquoise.jpg",
    category: "Accessories",
    isNew: false,
    colors: ["turquoise", "silver"],
    sizes: ["One Size"],
    images: [
      "/images/products/lighter-turquoise.jpg"
    ],
    stock: 18,
  },
  {
    id: 5,
    title: "Daisy Dream Lighter",
    description:
      "A delightful lighter adorned with cheerful yellow daisies on a pearl white background. Brings a touch of spring to your everyday life.",
    price: 54.99,
    formattedPrice: "$54.99",
    image: "/images/products/lighter-daisy.png",
    category: "Accessories",
    isNew: true,
    colors: ["white", "yellow"],
    sizes: ["One Size"],
    images: [
      "/images/products/lighter-daisy.png"
    ],
    stock: 8,
  },
  {
    id: 6,
    title: "Black Diamond Lighter",
    description:
      "Sophisticated and sleek, this black diamond crystal lighter exudes modern luxury and fits perfectly in any style.",
    price: 46.99,
    formattedPrice: "$46.99",
    image: "/images/products/lighter-black.jpg",
    category: "Accessories",
    isNew: false,
    colors: ["black"],
    sizes: ["One Size"],
    images: [
      "/images/products/lighter-black.jpg"
    ],
    stock: 20,
  },
  {
    id: 7,
    title: "Cosmic Blue Lighter",
    description:
      "Transport yourself to another galaxy with this cosmic blue crystal lighter featuring embedded smiley faces and moons.",
    price: 45.99,
    formattedPrice: "$45.99",
    image: "/images/products/lighter-cosmic.jpg",
    category: "Accessories",
    isNew: true,
    colors: ["blue", "purple", "iridescent"],
    sizes: ["One Size"],
    images: [
      "/images/products/lighter-cosmic.jpg"
    ],
    stock: 14,
  },
  {
    id: 8,
    title: "Ruby Heart Lighter",
    description:
      "A passionate red crystal lighter adorned with elegant diamond heart details. Perfect for making a bold statement.",
    price: 52.99,
    formattedPrice: "$52.99",
    image: "/images/products/lighter-ruby.jpg",
    category: "Accessories",
    isNew: false,
    colors: ["red", "silver"],
    sizes: ["One Size"],
    images: [
      "/images/products/lighter-ruby.jpg"
    ],
    stock: 9,
  },
  {
    id: 9,
    title: "Ocean Blue Sparkle Lighter",
    description:
      "Capture the essence of the ocean with this brilliant blue crystal lighter that shimmers like water in the sunlight.",
    price: 43.99,
    formattedPrice: "$43.99",
    image: "/images/products/lighter-ocean.jpg",
    category: "Accessories",
    isNew: false,
    colors: ["blue", "iridescent"],
    sizes: ["One Size"],
    images: [
      "/images/products/lighter-ocean.jpg"
    ],
    stock: 16,
  }
];

export const featuredProducts = products.filter(product => product.isNew);

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};
