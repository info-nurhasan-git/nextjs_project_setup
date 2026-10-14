"use client";

import Image from "next/image";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import Container from "@/components/ui/Container";
import EmptyState from "@/components/ui/EmptyState";
import { ButtonLink, Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { formatPrice } from "@/lib/format";
import { FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING } from "@/lib/catalog";

export default function CheckoutPage() {
  const { items, total, count, clearCart } = useCart();
  const { user } = useAuth();

  const [form, setForm] = useState({
    customerName: user?.name ?? "",
    email: user?.email ?? "",
    phone: "",
    address: "",
    city: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState<string | null>(null);

  const shipping =
    total >= FREE_SHIPPING_THRESHOLD || total === 0 ? 0 : STANDARD_SHIPPING;
  const grandTotal = total + shipping;

  function update(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: items.map((item) => ({
            productId: item.id,
            name: item.name,
            slug: item.slug,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      clearCart();
      setOrderId(data.order?.id ?? "confirmed");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (orderId) {
    return (
      <>
        <Container className="py-20">
          <div className="mx-auto max-w-xl rounded-3xl border border-emerald-100 bg-white p-10 text-center">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <Icon name="check" size={30} />
            </span>
            <h1 className="mt-5 text-2xl font-bold text-navy-900">
              Order placed successfully!
            </h1>
            <p className="mt-3 text-sm text-navy-500">
              Thank you for shopping with ShopZone. A confirmation has been sent
              to your email.
            </p>
            <p className="mt-4 rounded-xl bg-navy-50 px-4 py-3 text-sm text-navy-600">
              Order reference:{" "}
              <span className="font-mono font-semibold text-navy-900">
                #{orderId.slice(-10).toUpperCase()}
              </span>
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/orders" variant="primary">
                View my orders
              </ButtonLink>
              <ButtonLink href="/products" variant="outline">
                Continue shopping
              </ButtonLink>
            </div>
          </div>
        </Container>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Checkout"
        description="Complete your order in a few simple steps."
        crumbs={[{ label: "Checkout" }]}
      />

      <Container className="py-10">
        {items.length === 0 ? (
          <EmptyState
            icon="cart"
            title="Your cart is empty"
            description="Add some products before proceeding to checkout."
            action={
              <ButtonLink href="/products" variant="primary">
                Browse products
              </ButtonLink>
            }
          />
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1fr_380px]">
            <div className="space-y-6">
              <section className="rounded-3xl border border-navy-100 bg-white p-6">
                <h2 className="flex items-center gap-2 text-lg font-semibold text-navy-900">
                  <Icon name="user" size={18} className="text-royal-600" />
                  Shipping Details
                </h2>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <Field label="Full Name">
                    <input
                      required
                      value={form.customerName}
                      onChange={(event) => update("customerName", event.target.value)}
                      placeholder="Jane Doe"
                      className="input"
                    />
                  </Field>
                  <Field label="Email">
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(event) => update("email", event.target.value)}
                      placeholder="jane@example.com"
                      className="input"
                    />
                  </Field>
                  <Field label="Phone">
                    <input
                      value={form.phone}
                      onChange={(event) => update("phone", event.target.value)}
                      placeholder="+1 555 000 0000"
                      className="input"
                    />
                  </Field>
                  <Field label="City">
                    <input
                      value={form.city}
                      onChange={(event) => update("city", event.target.value)}
                      placeholder="New York"
                      className="input"
                    />
                  </Field>
                  <div className="sm:col-span-2">
                    <Field label="Shipping Address">
                      <textarea
                        required
                        rows={3}
                        value={form.address}
                        onChange={(event) => update("address", event.target.value)}
                        placeholder="123 Main Street, Apt 4B"
                        className="input resize-none"
                      />
                    </Field>
                  </div>
                </div>
              </section>

              <section className="rounded-3xl border border-navy-100 bg-white p-6">
                <h2 className="flex items-center gap-2 text-lg font-semibold text-navy-900">
                  <Icon name="shield" size={18} className="text-royal-600" />
                  Payment Method
                </h2>
                <div className="mt-5 flex items-center gap-3 rounded-2xl border border-royal-200 bg-royal-50 p-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-royal-600">
                    <Icon name="check" size={20} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-navy-900">
                      Cash on Delivery
                    </p>
                    <p className="text-xs text-navy-500">
                      Pay securely when your order arrives.
                    </p>
                  </div>
                </div>
              </section>
            </div>

            <aside className="lg:sticky lg:top-40 lg:self-start">
              <div className="rounded-3xl border border-navy-100 bg-white p-6">
                <h2 className="text-lg font-semibold text-navy-900">
                  Your Order ({count})
                </h2>

                <ul className="mt-4 max-h-64 space-y-3 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <li key={item.id} className="flex items-center gap-3">
                      <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-navy-50">
                        <Image
                          src={item.image || "https://placehold.co/100x100?text=ShopZone"}
                          alt={item.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-1 text-sm font-medium text-navy-800">
                          {item.name}
                        </p>
                        <p className="text-xs text-navy-400">
                          {item.quantity} × {formatPrice(item.price)}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-navy-900">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </li>
                  ))}
                </ul>

                <dl className="mt-5 space-y-3 border-t border-navy-100 pt-5 text-sm">
                  <div className="flex justify-between text-navy-600">
                    <dt>Subtotal</dt>
                    <dd className="font-medium text-navy-900">{formatPrice(total)}</dd>
                  </div>
                  <div className="flex justify-between text-navy-600">
                    <dt>Shipping</dt>
                    <dd className="font-medium text-navy-900">
                      {shipping === 0 ? "Free" : formatPrice(shipping)}
                    </dd>
                  </div>
                  <div className="flex justify-between border-t border-navy-100 pt-3 text-base">
                    <dt className="font-semibold text-navy-900">Total</dt>
                    <dd className="font-bold text-navy-900">
                      {formatPrice(grandTotal)}
                    </dd>
                  </div>
                </dl>

                {error && (
                  <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                  </p>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="mt-5 w-full"
                  disabled={loading}
                  iconRight="arrow-right"
                >
                  {loading ? "Placing order..." : "Place Order"}
                </Button>

                <p className="mt-3 text-center text-xs text-navy-400">
                  By placing your order you agree to our Terms &amp; Conditions.
                </p>
              </div>
            </aside>
          </form>
        )}
      </Container>
    </>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-navy-700">
        {label}
      </span>
      {children}
    </label>
  );
}
