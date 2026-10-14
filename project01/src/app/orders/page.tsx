import Link from "next/link";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import Container from "@/components/ui/Container";
import EmptyState from "@/components/ui/EmptyState";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons";
import OrderStatusBadge from "@/components/orders/OrderStatusBadge";
import { requireUser } from "@/lib/dal";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import { toOrderData } from "@/lib/serialize";
import { formatPrice, formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "My Orders",
  description: "View and track your ShopZone orders.",
};

export default async function OrdersPage() {
  const user = await requireUser();

  await connectDB();
  const docs = await Order.find({ userId: user.id }).sort({ createdAt: -1 }).lean();
  const orders = docs.map((doc) => toOrderData(doc));

  return (
    <>
      <PageHeader
        title="My Orders"
        description="Track the status of your recent orders."
        crumbs={[{ label: "Orders" }]}
      />

      <Container className="py-10">
        {orders.length === 0 ? (
          <EmptyState
            icon="package"
            title="No orders yet"
            description="When you place an order, it will appear here for you to track."
            action={
              <ButtonLink href="/products" variant="primary">
                Start shopping
              </ButtonLink>
            }
          />
        ) : (
          <div className="space-y-5">
            {orders.map((order) => (
              <article
                key={order.id}
                className="overflow-hidden rounded-3xl border border-navy-100 bg-white"
              >
                <header className="flex flex-wrap items-center justify-between gap-3 border-b border-navy-100 bg-navy-50/60 px-5 py-4">
                  <div>
                    <p className="font-mono text-sm font-semibold text-navy-900">
                      #{order.id.slice(-10).toUpperCase()}
                    </p>
                    <p className="mt-0.5 flex items-center gap-1.5 text-xs text-navy-400">
                      <Icon name="clock" size={13} />
                      {order.createdAt ? formatDate(order.createdAt) : "—"}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <OrderStatusBadge status={order.status} />
                    <span className="text-sm font-bold text-navy-900">
                      {formatPrice(order.total)}
                    </span>
                  </div>
                </header>

                <ul className="divide-y divide-navy-50">
                  {order.items.map((item, index) => (
                    <li key={`${order.id}-${index}`} className="flex items-center gap-3 px-5 py-3">
                      <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-navy-50">
                        <Image
                          src={item.image || "https://placehold.co/100x100?text=ShopZone"}
                          alt={item.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </span>
                      <div className="min-w-0 flex-1">
                        {item.slug ? (
                          <Link
                            href={`/products/${item.slug}`}
                            className="line-clamp-1 text-sm font-medium text-navy-800 hover:text-royal-700"
                          >
                            {item.name}
                          </Link>
                        ) : (
                          <p className="line-clamp-1 text-sm font-medium text-navy-800">
                            {item.name}
                          </p>
                        )}
                        <p className="text-xs text-navy-400">
                          Qty {item.quantity} × {formatPrice(item.price)}
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-navy-900">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
