import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import { getCurrentUser } from "@/lib/dal";
import { orderStatusSchema } from "@/lib/validation";
import { toOrderData } from "@/lib/serialize";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, ctx: RouteContext<"/api/orders/[id]">) {
  const user = await getCurrentUser();
  if (!user) return Response.json({ error: "Unauthorized." }, { status: 401 });

  const { id } = await ctx.params;
  if (!mongoose.isValidObjectId(id)) {
    return Response.json({ error: "Order not found" }, { status: 404 });
  }

  await connectDB();
  const order = await Order.findById(id).lean();
  if (!order) {
    return Response.json({ error: "Order not found" }, { status: 404 });
  }

  const orderOwner = String(order.userId ?? "");
  if (user.role !== "admin" && orderOwner !== user.id) {
    return Response.json({ error: "Unauthorized." }, { status: 403 });
  }

  return Response.json({ order: toOrderData(order) });
}

export async function PATCH(request: Request, ctx: RouteContext<"/api/orders/[id]">) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await ctx.params;
  if (!mongoose.isValidObjectId(id)) {
    return Response.json({ error: "Order not found" }, { status: 404 });
  }

  const body = await request.json().catch(() => null);
  const parsed = orderStatusSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Invalid status." }, { status: 400 });
  }

  await connectDB();
  const order = await Order.findByIdAndUpdate(
    id,
    { status: parsed.data.status },
    { new: true }
  ).lean();

  if (!order) {
    return Response.json({ error: "Order not found" }, { status: 404 });
  }

  return Response.json({ order: toOrderData(order) });
}
