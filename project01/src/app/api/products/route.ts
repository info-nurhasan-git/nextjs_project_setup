import { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { getProducts, generateUniqueSlug } from "@/lib/products";
import { getCurrentUser } from "@/lib/dal";
import { productSchema } from "@/lib/validation";
import { toProductData } from "@/lib/serialize";
import { slugify } from "@/lib/format";
import type { SortOption } from "@/lib/types";

export const dynamic = "force-dynamic";

const SORT_OPTIONS: SortOption[] = [
  "newest",
  "price-asc",
  "price-desc",
  "rating",
  "popular",
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sortParam = searchParams.get("sort") as SortOption | null;
  const idsParam = searchParams.get("ids");

  const products = await getProducts({
    category: searchParams.get("category") ?? undefined,
    search: searchParams.get("q") ?? undefined,
    sort: sortParam && SORT_OPTIONS.includes(sortParam) ? sortParam : undefined,
    featured: searchParams.get("featured") === "true" || undefined,
    trending: searchParams.get("trending") === "true" || undefined,
    isNew: searchParams.get("new") === "true" || undefined,
    onSale: searchParams.get("onSale") === "true" || undefined,
    ids: idsParam ? idsParam.split(",").filter(Boolean) : undefined,
    limit: Number(searchParams.get("limit")) || undefined,
  });

  return Response.json(products);
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = productSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json(
      {
        error: "Please check the highlighted fields.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  try {
    await connectDB();
    const data = parsed.data;
    const slug = await generateUniqueSlug(data.name, data.slug);

    const product = await Product.create({
      ...data,
      slug,
      categorySlug: data.categorySlug || slugify(data.category),
      image: data.image || data.images?.[0] || "",
      discountPrice:
        data.discountPrice && data.discountPrice > 0 ? data.discountPrice : null,
    });

    return Response.json(
      { product: toProductData(product.toObject()) },
      { status: 201 }
    );
  } catch {
    return Response.json(
      { error: "Could not create the product." },
      { status: 500 }
    );
  }
}
