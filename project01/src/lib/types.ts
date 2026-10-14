export type ProductData = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPrice?: number | null;
  image: string;
  images: string[];
  category: string;
  categorySlug: string;
  brand: string;
  rating: number;
  numReviews: number;
  stock: number;
  isFeatured: boolean;
  isTrending: boolean;
  isNew: boolean;
  createdAt?: string;
};

export type CartItem = {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  quantity: number;
  stock: number;
};

export type UserData = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  avatar?: string;
};

export type OrderItemData = {
  productId: string;
  name: string;
  slug?: string;
  price: number;
  quantity: number;
  image?: string;
};

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export type OrderData = {
  id: string;
  customerName: string;
  email: string;
  phone?: string;
  address: string;
  city?: string;
  items: OrderItemData[];
  subtotal: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  createdAt?: string;
};

export type Category = {
  slug: string;
  name: string;
  description: string;
  image: string;
};

export type Review = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
};

export type SortOption =
  | "newest"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "popular";
