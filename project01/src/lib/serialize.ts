import type {
  OrderData,
  OrderItemData,
  OrderStatus,
  ProductData,
  UserData,
} from "./types";

function str(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function num(value: unknown, fallback = 0): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function bool(value: unknown): boolean {
  return value === true;
}

function iso(value: unknown): string | undefined {
  if (!value) return undefined;
  const date = value instanceof Date ? value : new Date(value as string);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

export function toProductData(doc: object): ProductData {
  const p = doc as Record<string, unknown>;
  const images = Array.isArray(p.images)
    ? (p.images as unknown[]).map((i) => str(i)).filter(Boolean)
    : [];

  return {
    id: String(p._id),
    name: str(p.name),
    slug: str(p.slug),
    description: str(p.description),
    price: num(p.price),
    discountPrice:
      p.discountPrice === null || p.discountPrice === undefined
        ? null
        : num(p.discountPrice),
    image: str(p.image) || images[0] || "",
    images,
    category: str(p.category, "General"),
    categorySlug: str(p.categorySlug, "general"),
    brand: str(p.brand, "ShopZone"),
    rating: num(p.rating),
    numReviews: num(p.numReviews),
    stock: num(p.stock),
    isFeatured: bool(p.isFeatured),
    isTrending: bool(p.isTrending),
    isNew: bool(p.isNew),
    createdAt: iso(p.createdAt),
  };
}

export function toUserData(doc: object): UserData {
  const u = doc as Record<string, unknown>;
  const role = u.role === "admin" ? "admin" : "user";
  return {
    id: String(u._id),
    name: str(u.name),
    email: str(u.email),
    role,
    avatar: str(u.avatar),
  };
}

export function toOrderData(doc: object): OrderData {
  const o = doc as Record<string, unknown>;
  const rawItems = Array.isArray(o.items) ? (o.items as unknown[]) : [];
  const items: OrderItemData[] = rawItems.map((raw) => {
    const item = raw as Record<string, unknown>;
    return {
      productId: str(item.productId),
      name: str(item.name),
      slug: str(item.slug),
      price: num(item.price),
      quantity: num(item.quantity, 1),
      image: str(item.image),
    };
  });

  const status = str(o.status, "pending") as OrderStatus;

  return {
    id: String(o._id),
    customerName: str(o.customerName),
    email: str(o.email),
    phone: str(o.phone),
    address: str(o.address),
    city: str(o.city),
    items,
    subtotal: num(o.subtotal),
    shipping: num(o.shipping),
    total: num(o.total),
    status,
    createdAt: iso(o.createdAt),
  };
}
