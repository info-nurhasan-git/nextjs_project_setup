import "server-only";
import mongoose from "mongoose";
import connectDB from "./mongodb";
import Product from "@/models/Product";
import { toProductData } from "./serialize";
import { slugify } from "./format";
import type { ProductData, SortOption } from "./types";

export type ProductQuery = {
  category?: string;
  search?: string;
  sort?: SortOption;
  featured?: boolean;
  trending?: boolean;
  isNew?: boolean;
  onSale?: boolean;
  ids?: string[];
  limit?: number;
};

type ProductFilter = Record<string, unknown>;

function buildSort(sort?: SortOption): Record<string, 1 | -1> {
  switch (sort) {
    case "price-asc":
      return { price: 1 };
    case "price-desc":
      return { price: -1 };
    case "rating":
      return { rating: -1 };
    case "popular":
      return { numReviews: -1 };
    default:
      return { createdAt: -1 };
  }
}

export async function getProducts(
  options: ProductQuery = {}
): Promise<ProductData[]> {
  await connectDB();

  const filter: ProductFilter = {};
  if (options.category) filter.categorySlug = options.category;
  if (options.featured) filter.isFeatured = true;
  if (options.trending) filter.isTrending = true;
  if (options.isNew) filter.isNew = true;
  if (options.onSale) {
    filter.discountPrice = { $ne: null, $gt: 0 };
  }
  if (options.ids && options.ids.length > 0) {
    const validIds = options.ids.filter((id) => mongoose.isValidObjectId(id));
    filter._id = { $in: validIds };
  }
  if (options.search) {
    const escaped = options.search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    filter.name = { $regex: escaped, $options: "i" };
  }

  let query = Product.find(filter).sort(buildSort(options.sort));
  if (options.limit && options.limit > 0) query = query.limit(options.limit);

  const docs = await query.lean();
  return docs.map((doc) => toProductData(doc));
}

export async function getProductBySlugOrId(
  idOrSlug: string
): Promise<ProductData | null> {
  await connectDB();

  const or: ProductFilter[] = [{ slug: idOrSlug }];
  if (mongoose.isValidObjectId(idOrSlug)) or.push({ _id: idOrSlug });

  const doc = await Product.findOne({ $or: or }).lean();
  return doc ? toProductData(doc) : null;
}

export async function getRelatedProducts(
  categorySlug: string,
  excludeId: string,
  limit = 4
): Promise<ProductData[]> {
  await connectDB();

  const docs = await Product.find({
    categorySlug,
    _id: { $ne: mongoose.isValidObjectId(excludeId) ? excludeId : undefined },
  })
    .limit(limit)
    .lean();

  return docs.map((doc) => toProductData(doc));
}

export async function generateUniqueSlug(
  name: string,
  explicit?: string
): Promise<string> {
  await connectDB();
  const base = slugify(explicit || name) || `product-${Date.now()}`;
  let slug = base;
  let counter = 2;
  while (await Product.exists({ slug })) {
    slug = `${base}-${counter}`;
    counter += 1;
  }
  return slug;
}

export async function getCategoryCounts(): Promise<Record<string, number>> {
  await connectDB();
  const rows = await Product.aggregate<{ _id: string; count: number }>([
    { $group: { _id: "$categorySlug", count: { $sum: 1 } } },
  ]);
  return rows.reduce<Record<string, number>>((acc, row) => {
    acc[row._id] = row.count;
    return acc;
  }, {});
}
