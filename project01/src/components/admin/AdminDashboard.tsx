"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "../ui/Button";
import { Icon, type IconName } from "../ui/icons";
import ProductForm, { type ProductPayload } from "./ProductForm";
import OrderStatusBadge from "../orders/OrderStatusBadge";
import { formatPrice, formatDate } from "@/lib/format";
import type { OrderData, OrderStatus, ProductData } from "@/lib/types";

export type AdminStats = {
  productCount: number;
  orderCount: number;
  userCount: number;
  revenue: number;
  lowStock: number;
};

const ORDER_STATUSES: OrderStatus[] = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

type Tab = "overview" | "products" | "orders";

export default function AdminDashboard({
  stats,
  products: initialProducts,
  orders: initialOrders,
}: {
  stats: AdminStats;
  products: ProductData[];
  orders: OrderData[];
}) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("overview");
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState(initialOrders);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<ProductData | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "error"; text: string } | null>(null);

  function notify(type: "ok" | "error", text: string) {
    setMessage({ type, text });
    window.setTimeout(() => setMessage(null), 3500);
  }

  async function saveProduct(payload: ProductPayload) {
    setBusy(true);
    try {
      const res = await fetch(
        editing ? `/api/products/${editing.id}` : "/api/products",
        {
          method: editing ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        notify("error", data.error ?? "Could not save the product.");
        return;
      }
      const saved = data.product as ProductData;
      setProducts((prev) =>
        editing
          ? prev.map((product) => (product.id === saved.id ? saved : product))
          : [saved, ...prev]
      );
      notify("ok", editing ? "Product updated." : "Product created.");
      setFormOpen(false);
      setEditing(null);
      router.refresh();
    } catch {
      notify("error", "Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function deleteProduct(product: ProductData) {
    if (!window.confirm(`Delete "${product.name}"? This cannot be undone.`)) {
      return;
    }
    setBusy(true);
    try {
      const res = await fetch(`/api/products/${product.id}`, { method: "DELETE" });
      if (!res.ok) {
        notify("error", "Could not delete the product.");
        return;
      }
      setProducts((prev) => prev.filter((entry) => entry.id !== product.id));
      notify("ok", "Product deleted.");
      router.refresh();
    } catch {
      notify("error", "Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function updateStatus(order: OrderData, status: OrderStatus) {
    setBusy(true);
    try {
      const res = await fetch(`/api/orders/${order.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        notify("error", "Could not update the order status.");
        return;
      }
      setOrders((prev) =>
        prev.map((entry) => (entry.id === order.id ? { ...entry, status } : entry))
      );
      notify("ok", "Order status updated.");
      router.refresh();
    } catch {
      notify("error", "Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  const statCards: { label: string; value: string; icon: IconName }[] = [
    { label: "Total revenue", value: formatPrice(stats.revenue), icon: "tag" },
    { label: "Orders", value: String(stats.orderCount), icon: "package" },
    { label: "Products", value: String(stats.productCount), icon: "dashboard" },
    { label: "Customers", value: String(stats.userCount), icon: "users" },
  ];

  const tabs: { id: Tab; label: string; icon: IconName }[] = [
    { id: "overview", label: "Overview", icon: "dashboard" },
    { id: "products", label: "Products", icon: "package" },
    { id: "orders", label: "Orders", icon: "truck" },
  ];

  return (
    <div>
      {message && (
        <div
          className={`mb-5 rounded-2xl px-4 py-3 text-sm ${
            message.type === "ok"
              ? "bg-emerald-50 text-emerald-600"
              : "bg-red-50 text-red-600"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="mb-6 flex flex-wrap gap-2 rounded-2xl border border-navy-100 bg-white p-2">
        {tabs.map((entry) => (
          <button
            key={entry.id}
            type="button"
            onClick={() => setTab(entry.id)}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition ${
              tab === entry.id
                ? "bg-royal-600 text-white"
                : "text-navy-600 hover:bg-navy-50"
            }`}
          >
            <Icon name={entry.icon} size={16} />
            {entry.label}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {statCards.map((card) => (
              <div
                key={card.label}
                className="rounded-3xl border border-navy-100 bg-white p-5"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-royal-50 text-royal-600">
                  <Icon name={card.icon} size={20} />
                </span>
                <p className="mt-4 text-2xl font-bold text-navy-900">
                  {card.value}
                </p>
                <p className="text-sm text-navy-500">{card.label}</p>
              </div>
            ))}
          </div>

          {stats.lowStock > 0 && (
            <div className="flex items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-700">
              <Icon name="package" size={18} />
              {stats.lowStock} product{stats.lowStock === 1 ? "" : "s"} running low
              on stock (5 or fewer units).
            </div>
          )}

          <section className="rounded-3xl border border-navy-100 bg-white p-6">
            <h2 className="text-lg font-semibold text-navy-900">Recent orders</h2>
            {orders.length === 0 ? (
              <p className="mt-3 text-sm text-navy-500">No orders yet.</p>
            ) : (
              <ul className="mt-4 divide-y divide-navy-50">
                {orders.slice(0, 5).map((order) => (
                  <li
                    key={order.id}
                    className="flex flex-wrap items-center justify-between gap-3 py-3"
                  >
                    <div>
                      <p className="font-mono text-sm font-semibold text-navy-900">
                        #{order.id.slice(-8).toUpperCase()}
                      </p>
                      <p className="text-xs text-navy-400">
                        {order.customerName} ·{" "}
                        {order.createdAt ? formatDate(order.createdAt) : "—"}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <OrderStatusBadge status={order.status} />
                      <span className="text-sm font-semibold text-navy-900">
                        {formatPrice(order.total)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      )}

      {tab === "products" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-navy-900">
              Products ({products.length})
            </h2>
            <Button
              variant="primary"
              size="sm"
              icon="plus"
              onClick={() => {
                setEditing(null);
                setFormOpen(true);
              }}
            >
              Add product
            </Button>
          </div>

          {formOpen && (
            <section className="rounded-3xl border border-royal-200 bg-white p-6">
              <h3 className="mb-4 text-base font-semibold text-navy-900">
                {editing ? "Edit product" : "New product"}
              </h3>
              <ProductForm
                initial={editing}
                onSubmit={saveProduct}
                onCancel={() => {
                  setFormOpen(false);
                  setEditing(null);
                }}
                busy={busy}
              />
            </section>
          )}

          <div className="overflow-x-auto rounded-3xl border border-navy-100 bg-white">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-navy-100 bg-navy-50/60 text-xs uppercase tracking-wide text-navy-400">
                <tr>
                  <th className="px-5 py-3 font-semibold">Product</th>
                  <th className="px-5 py-3 font-semibold">Category</th>
                  <th className="px-5 py-3 font-semibold">Price</th>
                  <th className="px-5 py-3 font-semibold">Stock</th>
                  <th className="px-5 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-50">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-navy-50">
                          <Image
                            src={
                              product.image ||
                              "https://placehold.co/80x80?text=ShopZone"
                            }
                            alt={product.name}
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        </span>
                        <span className="line-clamp-1 font-medium text-navy-800">
                          {product.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-navy-500">{product.category}</td>
                    <td className="px-5 py-3 text-navy-700">
                      {formatPrice(product.discountPrice ?? product.price)}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={
                          product.stock <= 5 ? "font-semibold text-red-500" : "text-navy-700"
                        }
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            setEditing(product);
                            setFormOpen(true);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="rounded-lg p-2 text-navy-500 transition hover:bg-navy-50 hover:text-royal-700"
                          aria-label="Edit"
                        >
                          <Icon name="eye" size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteProduct(product)}
                          className="rounded-lg p-2 text-navy-500 transition hover:bg-red-50 hover:text-red-600"
                          aria-label="Delete"
                        >
                          <Icon name="trash" size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-5 py-10 text-center text-navy-400">
                      No products yet. Add your first product to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "orders" && (
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-navy-900">
            Orders ({orders.length})
          </h2>
          <div className="overflow-x-auto rounded-3xl border border-navy-100 bg-white">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b border-navy-100 bg-navy-50/60 text-xs uppercase tracking-wide text-navy-400">
                <tr>
                  <th className="px-5 py-3 font-semibold">Order</th>
                  <th className="px-5 py-3 font-semibold">Customer</th>
                  <th className="px-5 py-3 font-semibold">Total</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold">Placed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-50">
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-5 py-3 font-mono text-xs font-semibold text-navy-900">
                      #{order.id.slice(-8).toUpperCase()}
                    </td>
                    <td className="px-5 py-3">
                      <p className="font-medium text-navy-800">
                        {order.customerName}
                      </p>
                      <p className="text-xs text-navy-400">{order.email}</p>
                    </td>
                    <td className="px-5 py-3 font-semibold text-navy-900">
                      {formatPrice(order.total)}
                    </td>
                    <td className="px-5 py-3">
                      <select
                        value={order.status}
                        onChange={(event) =>
                          updateStatus(order, event.target.value as OrderStatus)
                        }
                        disabled={busy}
                        className="rounded-lg border border-navy-200 bg-white px-3 py-1.5 text-xs font-medium text-navy-700 outline-none focus:border-royal-400"
                      >
                        {ORDER_STATUSES.map((status) => (
                          <option key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-5 py-3 text-navy-500">
                      {order.createdAt ? formatDate(order.createdAt) : "—"}
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-5 py-10 text-center text-navy-400">
                      No orders yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
