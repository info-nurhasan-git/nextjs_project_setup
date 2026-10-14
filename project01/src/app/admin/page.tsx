import PageHeader from "@/components/PageHeader";
import Container from "@/components/ui/Container";
import AdminDashboard, { type AdminStats } from "@/components/admin/AdminDashboard";
import { requireAdmin } from "@/lib/dal";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import Order from "@/models/Order";
import User from "@/models/User";
import { toProductData, toOrderData } from "@/lib/serialize";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin Dashboard",
  description: "Manage products and orders.",
};

export default async function AdminPage() {
  await requireAdmin();
  await connectDB();

  const [productDocs, orderDocs, productCount, orderCount, userCount, revenueRows, lowStock] =
    await Promise.all([
      Product.find().sort({ createdAt: -1 }).lean(),
      Order.find().sort({ createdAt: -1 }).lean(),
      Product.countDocuments(),
      Order.countDocuments(),
      User.countDocuments(),
      Order.aggregate<{ _id: null; total: number }>([
        { $match: { status: { $ne: "cancelled" } } },
        { $group: { _id: null, total: { $sum: "$total" } } },
      ]),
      Product.countDocuments({ stock: { $lte: 5 } }),
    ]);

  const stats: AdminStats = {
    productCount,
    orderCount,
    userCount,
    revenue: revenueRows[0]?.total ?? 0,
    lowStock,
  };

  return (
    <>
      <PageHeader
        title="Admin Dashboard"
        description="Manage your products, orders and store performance."
        crumbs={[{ label: "Admin" }]}
      />
      <Container className="py-10">
        <AdminDashboard
          stats={stats}
          products={productDocs.map((doc) => toProductData(doc))}
          orders={orderDocs.map((doc) => toOrderData(doc))}
        />
      </Container>
    </>
  );
}
