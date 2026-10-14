export function formatPrice(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number.isFinite(value) ? value : 0);
}

export function formatDate(value?: string): string {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export function effectivePrice(price: number, discountPrice?: number | null) {
  return discountPrice != null && discountPrice > 0 && discountPrice < price
    ? discountPrice
    : price;
}

export function discountPercent(price: number, discountPrice?: number | null) {
  if (discountPrice == null || discountPrice <= 0 || discountPrice >= price) {
    return 0;
  }
  return Math.round(((price - discountPrice) / price) * 100);
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
