import { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { getCurrentUser } from "@/lib/dal";
import { orderSchema } from "@/lib/validation";
import { toOrderData } from "@/lib/serialize";
import { FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return Response.json({ orders: [] });

  await connectDB();

  const status = new URL(request.url).searchParams.get("status");
  const filter: Record<string, unknown> =
    user.role === "admin" ? {} : { userId: user.id };
  if (status) filter.status = status;

  const orders = await Order.find(filter).sort({ createdAt: -1 }).lean();
  return Response.json({ orders: orders.map((order) => toOrderData(order)) });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = orderSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json(
      {
        error: "Please check the highlighted fields.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const user = await getCurrentUser();
  const data = parsed.data;

  const subtotal = data.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping =
    subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : STANDARD_SHIPPING;
  const total = subtotal + shipping;

  try {
    await connectDB();

    const order = await Order.create({
      userId: user?.id ?? null,
      customerName: data.customerName,
      email: data.email,
      phone: data.phone,
      address: data.address,
      city: data.city,
      items: data.items,
      subtotal,
      shipping,
      total,
      status: "pending",
    });

    await Promise.all(
      data.items.map((item) =>
        Product.updateOne(
          { _id: item.productId, stock: { $gte: item.quantity } },
          { $inc: { stock: -item.quantity } }
        ).catch(() => null)
      )
    );

    return Response.json(
      { order: toOrderData(order.toObject()) },
      { status: 201 }
    );
  } catch {
    return Response.json(
      { error: "Could not place the order. Please try again." },
      { status: 500 }
    );
  }
}
