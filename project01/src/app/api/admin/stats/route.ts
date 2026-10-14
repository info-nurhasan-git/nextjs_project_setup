import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import Order from "@/models/Order";
import User from "@/models/User";
import { getCurrentUser } from "@/lib/dal";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }

  await connectDB();

  const [productCount, orderCount, userCount, revenueRows, lowStock] =
    await Promise.all([
      Product.countDocuments(),
      Order.countDocuments(),
      User.countDocuments(),
      Order.aggregate<{ _id: null; total: number }>([
        { $match: { status: { $ne: "cancelled" } } },
        { $group: { _id: null, total: { $sum: "$total" } } },
      ]),
      Product.countDocuments({ stock: { $lte: 5 } }),
    ]);

  const revenue = revenueRows[0]?.total ?? 0;

  return Response.json({
    productCount,
    orderCount,
    userCount,
    revenue,
    lowStock,
  });
}
