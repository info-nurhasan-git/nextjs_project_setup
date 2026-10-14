import type { Category, Review } from "./types";

export const CATEGORIES: Category[] = [
  {
    slug: "electronics",
    name: "Electronics",
    description: "Laptops, phones, audio and the latest gadgets.",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "fashion",
    name: "Fashion",
    description: "Trending apparel, footwear and everyday style.",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "home-kitchen",
    name: "Home & Kitchen",
    description: "Everything to make your space feel like home.",
    image:
      "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "sports-fitness",
    name: "Sports & Fitness",
    description: "Gear up with equipment built for performance.",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "accessories",
    name: "Accessories",
    description: "Watches, bags and finishing touches that matter.",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "beauty-personal-care",
    name: "Beauty & Personal Care",
    description: "Skincare, fragrance and daily self-care essentials.",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((category) => category.slug === slug);
}

export type FeatureIcon =
  | "truck"
  | "shield"
  | "refresh"
  | "headset"
  | "tag";

export type Feature = {
  icon: FeatureIcon;
  title: string;
  description: string;
};

export const FEATURES: Feature[] = [
  {
    icon: "truck",
    title: "Fast & Reliable Delivery",
    description: "Free express shipping on orders over $50, delivered on time.",
  },
  {
    icon: "shield",
    title: "Secure Payment Options",
    description: "Encrypted checkout with trusted payment providers.",
  },
  {
    icon: "refresh",
    title: "Easy Returns & Refunds",
    description: "30-day hassle-free returns with instant refund options.",
  },
  {
    icon: "headset",
    title: "24/7 Customer Support",
    description: "Real humans ready to help whenever you need us.",
  },
  {
    icon: "tag",
    title: "Quality Products at Great Prices",
    description: "Curated, quality-checked products at honest prices.",
  },
];

export const REVIEWS: Review[] = [
  {
    id: "r1",
    name: "Amelia Carter",
    role: "Verified Buyer",
    avatar: "https://i.pravatar.cc/150?img=47",
    rating: 5,
    text: "The quality exceeded my expectations and delivery was incredibly fast. ShopZone is now my go-to store.",
  },
  {
    id: "r2",
    name: "Daniel Okafor",
    role: "Verified Buyer",
    avatar: "https://i.pravatar.cc/150?img=12",
    rating: 5,
    text: "Clean website, easy checkout and the product arrived exactly as described. Highly recommended.",
  },
  {
    id: "r3",
    name: "Sofia Ramirez",
    role: "Verified Buyer",
    avatar: "https://i.pravatar.cc/150?img=32",
    rating: 4,
    text: "Great deals and a really smooth returns process. I had a question and support replied within minutes.",
  },
  {
    id: "r4",
    name: "Liam Bennett",
    role: "Verified Buyer",
    avatar: "https://i.pravatar.cc/150?img=15",
    rating: 5,
    text: "I keep coming back for the offers. The packaging was premium and everything felt well taken care of.",
  },
  {
    id: "r5",
    name: "Priya Nair",
    role: "Verified Buyer",
    avatar: "https://i.pravatar.cc/150?img=45",
    rating: 5,
    text: "Ordered a gift and it arrived beautifully packaged the next day. Fantastic experience overall.",
  },
  {
    id: "r6",
    name: "Marco Rossi",
    role: "Verified Buyer",
    avatar: "https://i.pravatar.cc/150?img=59",
    rating: 4,
    text: "Competitive prices and a loyalty program that actually rewards you. Solid all-round shopping site.",
  },
];

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/categories", label: "Categories" },
  { href: "/offers", label: "Offers" },
  { href: "/contact", label: "Contact" },
];

export const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export const CUSTOMER_SERVICE_LINKS = [
  { href: "/contact", label: "FAQ" },
  { href: "/contact", label: "Shipping Policy" },
  { href: "/contact", label: "Returns & Refunds" },
];

export const LEGAL_LINKS = [
  { href: "/contact", label: "Privacy Policy" },
  { href: "/contact", label: "Terms & Conditions" },
];

export const FREE_SHIPPING_THRESHOLD = 50;
export const STANDARD_SHIPPING = 6.99;
