import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { getProductBySlugOrId, generateUniqueSlug } from "@/lib/products";
import { getCurrentUser } from "@/lib/dal";
import { productSchema } from "@/lib/validation";
import { toProductData } from "@/lib/serialize";
import { slugify } from "@/lib/format";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, ctx: RouteContext<"/api/products/[id]">) {
  const { id } = await ctx.params;
  const product = await getProductBySlugOrId(id);

  if (!product) {
    return Response.json({ error: "Product not found" }, { status: 404 });
  }

  return Response.json(product);
}

export async function PATCH(request: Request, ctx: RouteContext<"/api/products/[id]">) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await ctx.params;
  if (!mongoose.isValidObjectId(id)) {
    return Response.json({ error: "Product not found" }, { status: 404 });
  }

  const body = await request.json().catch(() => null);
  const parsed = productSchema.partial().safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "Invalid data.", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  try {
    await connectDB();
    const data = parsed.data;
    const update: Record<string, unknown> = { ...data };

    if (data.name && !data.slug) {
      update.slug = await generateUniqueSlug(data.name);
    }
    if (data.category && !data.categorySlug) {
      update.categorySlug = slugify(data.category);
    }
    if (data.discountPrice != null && data.discountPrice <= 0) {
      update.discountPrice = null;
    }

    const product = await Product.findByIdAndUpdate(id, update, {
      new: true,
    }).lean();

    if (!product) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    return Response.json({ product: toProductData(product) });
  } catch {
    return Response.json(
      { error: "Could not update the product." },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, ctx: RouteContext<"/api/products/[id]">) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await ctx.params;
  if (!mongoose.isValidObjectId(id)) {
    return Response.json({ error: "Product not found" }, { status: 404 });
  }

  await connectDB();
  await Product.findByIdAndDelete(id);

  return Response.json({ ok: true });
}
